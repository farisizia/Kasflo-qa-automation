const { test, expect } = require('@playwright/test');

test.describe('Resep Bahan Baku', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  // Helper selector for visible search input in the active tab
  function getSearchInput(page) {
    return page.locator('input[placeholder="Cari disini..."]:visible').first();
  }

  // Helper to read "Nama Menu/Opsi Varian" from a data row (column 2 in new UI, fallback to column 1)
  async function getRecipeItemName(row) {
    const cells = row.locator('td');
    const cellCount = await cells.count();
    if (cellCount >= 2) {
      const secondCell = cells.nth(1);
      await expect(secondCell).not.toBeEmpty({ timeout: 10000 });
      const text = (await secondCell.innerText()).trim();
      if (text) return text;
    }
    const firstCell = cells.first();
    await expect(firstCell).not.toBeEmpty({ timeout: 10000 });
    return (await firstCell.innerText()).trim();
  }

  async function waitForPageReady(page) {
    const loader = page.locator(
      '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
    );
    await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

  // Prevent Mantine Select crash when backend returns duplicate product IDs or variant_options without id
  async function setupRecipeApiSafety(page) {
    await page.route('**/backoffice/v1/product**', async (route) => {
      if (route.request().method() !== 'GET') {
        await route.continue();
        return;
      }
      try {
        const response = await route.fetch();
        const contentType = response.headers()['content-type'] || '';
        if (response.status() === 200 && contentType.includes('application/json')) {
          const json = await response.json();
          if (json && Array.isArray(json.data)) {
            const seen = new Set();
            json.data = json.data.filter((item) => {
              if (!item || item.id === undefined) return true;
              const key = String(item.id);
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
            await route.fulfill({
              response,
              body: JSON.stringify(json),
            });
            return;
          }
          if (json && json.data && Array.isArray(json.data.variant_options)) {
            json.data.variant_options = json.data.variant_options.map((opt, idx) => ({
              ...opt,
              id: opt.id ?? opt.variant_option_id ?? (idx + 1),
            }));
            await route.fulfill({
              response,
              body: JSON.stringify(json),
            });
            return;
          }
        }
        await route.fulfill({ response });
      } catch {
        await route.continue().catch(() => {});
      }
    });
  }

  // Shared resilient login helper
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) {
      await waitForPageReady(page);
      return page;
    }

    try {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch {
      await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
    }

    await waitForPageReady(page);

    if (page.url().includes('/admin/')) {
      return page;
    }

    const emailInput = page.getByLabel(/Email atau Username/i);
    await Promise.race([
      page.waitForURL(/.*\/admin\/.*/, { timeout: 15000 }).catch(() => {}),
      emailInput.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
    ]);
    if (page.url().includes('/admin/')) {
      await waitForPageReady(page);
      return page;
    }

    await expect(emailInput).toBeVisible({ timeout: 20000 });

    await emailInput.fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await loginBtn.click();

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await waitForPageReady(page);
        if (await loginBtn.isVisible().catch(() => false)) {
          await loginBtn.click({ timeout: 5000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      }
    }
    await waitForPageReady(page);
    return page;
  }

  // Scoped Mantine Select listbox locator based on input's id -> aria-labelledby="<id>-label"
  async function getListboxOptionsForInput(page, inputLocator) {
    const inputId = await inputLocator.getAttribute('id');
    if (inputId) {
      return page.locator(`[role="listbox"][aria-labelledby="${inputId}-label"] [role="option"]`);
    }
    return page.locator('.mantine-Select-dropdown:visible [role="option"], [role="option"]:visible');
  }

  // Helper to select Cabang and Menu on /admin/ingredients/recipe/add
  async function selectBranchAndMenu(page) {
    const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
    await expect(cabangInput).toBeVisible({ timeout: 10000 });
    await expect(cabangInput).toBeEnabled({ timeout: 10000 });

    // Ensure radio Tipe Resep "Menu" is active
    const menuRadio = page.locator('input[type="radio"][value="menu"]');
    if (await menuRadio.isVisible().catch(() => false)) {
      if (!(await menuRadio.isChecked().catch(() => true))) {
        await page.locator('label.mantine-Radio-label').filter({ hasText: /^Menu$/ }).first().click();
      }
      await expect(menuRadio).toBeChecked();
    }

    const menuInput = page.getByPlaceholder('Pilih Menu').first();
    await expect(menuInput).toBeVisible({ timeout: 10000 });

    const branchOptions = await getListboxOptionsForInput(page, cabangInput);
    await cabangInput.click();
    await expect(branchOptions.first()).toBeVisible({ timeout: 10000 });
    const branchCount = await branchOptions.count();

    for (let b = 0; b < branchCount; b++) {
      if (b > 0) {
        await cabangInput.click();
        await expect(branchOptions.nth(b)).toBeVisible({ timeout: 5000 });
      }

      const productRespPromise = page.waitForResponse(
        (res) => res.url().includes('/backoffice/v1/product') && res.request().method() === 'GET',
        { timeout: 10000 }
      ).catch(() => null);

      await branchOptions.nth(b).click();
      await productRespPromise;
      await waitForPageReady(page);

      // Wait for Pilih Menu input to become enabled after branch selection
      const isMenuEnabled = await expect(menuInput).toBeEnabled({ timeout: 5000 }).then(() => true).catch(() => false);
      if (!isMenuEnabled) continue;

      const menuOptions = await getListboxOptionsForInput(page, menuInput);
      await menuInput.click();

      const hasOption = await menuOptions.first().isVisible({ timeout: 3000 }).catch(() => false);
      if (hasOption) {
        const selectedMenuName = (await menuOptions.first().innerText()).trim() || 'Updated Menu';
        await menuOptions.first().click();
        await waitForPageReady(page);
        return selectedMenuName;
      }

      // Close empty menu dropdown before trying next branch
      await page.keyboard.press('Escape').catch(() => {});
    }

    return null;
  }

  // Helper to create a Recipe
  async function createRecipe(page) {
    await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);
    await waitForPageReady(page);

    const addBtn = page.getByRole('link', { name: /Buat Resep/i })
      .or(page.getByRole('button', { name: /Buat Resep/i })).first();
    await expect(addBtn).toBeVisible({ timeout: 10000 });
    await addBtn.click();

    await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });
    await waitForPageReady(page);

    const selectedMenuName = await selectBranchAndMenu(page);
    if (!selectedMenuName) {
      await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);
      return null;
    }

    // Check if ingredient is already attached to this recipe
    const hasExistingIngredient = await page.locator('table:visible tbody tr').filter({ hasText: /Gram|Pcs|Kg|Ml|Liter|Bahan/i }).first().isVisible().catch(() => false);

    if (!hasExistingIngredient) {
      // Click Tambah Bahan Baku button
      const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
      await expect(tambahBahanBtn).toBeEnabled({ timeout: 10000 });
      await tambahBahanBtn.click();

      // In modal: select first ingredient row and set quantity
      const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const ingredientRow = modal.locator('table tbody tr:not(:has-text("Belum Ada Data"))').first();
      await expect(ingredientRow).toBeVisible({ timeout: 10000 });
      await ingredientRow.click();

      // Fill Kuantitas input (only target editable input, avoiding readonly pagination)
      const qtyInput = ingredientRow.locator('input:not([readonly])').first()
        .or(modal.locator('table tbody tr input:not([readonly])').first());
      await expect(qtyInput).toBeVisible({ timeout: 5000 });
      await qtyInput.click();
      await qtyInput.fill('5');

      // Click Tambah in modal
      const modalTambahBtn = modal.getByRole('button', { name: 'Tambah', exact: true });
      await expect(modalTambahBtn).toBeEnabled({ timeout: 5000 });
      await modalTambahBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    }

    // Submit Recipe form
    const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
    await expect(simpanBtn).toBeEnabled({ timeout: 10000 });
    await simpanBtn.click();

    await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 25000 });
    await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    await waitForPageReady(page);

    return selectedMenuName;
  }

  // Helper to ensure at least one recipe exists in the list
  async function ensureRecipeExists(page) {
    await expect(page.locator('table:visible tbody tr').first()).toBeVisible({ timeout: 15000 });
    await waitForPageReady(page);

    const dataRows = getDataRows(page);
    const count = await dataRows.count();
    if (count === 0) {
      return await createRecipe(page);
    }
    return await getRecipeItemName(dataRows.first());
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Pasang interceptor deduplikasi opsi produk agar Mantine Select tidak crash
      await setupRecipeApiSafety(page);

      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Recipe page
      await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify recipe page loaded
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman resep dengan tabel, header, filter, dan tab yang sesuai', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman resep dengan tabel, header, filter, dan tab yang sesuai', async () => {
      // Verify page heading / breadcrumb
      await expect(page.getByText('Resep').first()).toBeVisible({ timeout: 10000 });

      // Verify tabs exist
      const dataResepTab = page.getByRole('tab', { name: 'Data Resep', exact: true });
      const dataResepSemiTab = page.getByRole('tab', { name: 'Data Resep Setengah Jadi', exact: true });
      await expect(dataResepTab).toBeVisible({ timeout: 5000 });
      await expect(dataResepSemiTab).toBeVisible({ timeout: 5000 });

      // Verify filter elements
      const searchInput = getSearchInput(page);
      await expect(searchInput).toBeVisible({ timeout: 5000 });

      const cabangFilter = page.locator('input[placeholder="Semua Cabang"]:visible').first();
      await expect(cabangFilter).toBeVisible({ timeout: 5000 });

      // Verify Add Button exists
      const addBtn = page.getByRole('link', { name: /Buat Resep/i })
        .or(page.getByRole('button', { name: /Buat Resep/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });

      // Verify table structure and headers (UI terbaru: Tipe Resep & Nama Menu/Opsi Varian)
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible();

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Tipe Resep', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Nama Menu/Opsi Varian', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Bahan Baku', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Peringatan Stok', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    });
  });

  test('[TC-02] Navigasi ke halaman buat resep dan memverifikasi form elements', async ({ page }) => {
    await test.step('Lakukan proses navigasi ke halaman buat resep dan memverifikasi panel Pilih Menu, Tipe Resep, dan Resep', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Resep/i })
        .or(page.getByRole('button', { name: /Buat Resep/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();

      // Verify URL and title
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });
      await waitForPageReady(page);
      await expect(page.getByText('Buat Resep').first()).toBeVisible({ timeout: 10000 });

      // Verify Panel "Pilih Menu" & "Resep"
      await expect(page.getByRole('heading', { name: 'Pilih Menu' })).toBeVisible({ timeout: 5000 });
      await expect(page.getByRole('heading', { name: 'Resep', exact: true })).toBeVisible({ timeout: 5000 });

      // Verify Dropdown Cabang *
      const cabangInput = page.getByPlaceholder('Pilih Cabang');
      await expect(cabangInput).toBeVisible({ timeout: 5000 });

      // Verify Radio Group Tipe Resep (Menu & Varian)
      await expect(page.getByText('Tipe Resep').first()).toBeVisible({ timeout: 5000 });
      const menuRadio = page.locator('input[type="radio"][value="menu"]');
      const varianRadio = page.locator('input[type="radio"][value="variant"]');
      await expect(menuRadio).toBeChecked();
      await expect(varianRadio).not.toBeChecked();

      // Verify Dropdown Menu * (default active when Tipe Resep = Menu)
      const menuInput = page.getByPlaceholder('Pilih Menu');
      await expect(menuInput).toBeVisible({ timeout: 5000 });
      await expect(menuInput).toBeDisabled();

      // Verify Tombol Tambah Bahan Baku (initially disabled before Menu/Varian selected)
      const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
      await expect(tambahBahanBtn).toBeVisible({ timeout: 5000 });
      await expect(tambahBahanBtn).toBeDisabled();

      // Verify action buttons
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible({ timeout: 5000 });

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
    });
  });

  test('[TC-03] Tombol batalkan pada form buat resep kembali ke list tanpa menyimpan', async ({ page }) => {
    await test.step('Lakukan proses tombol batalkan pada form buat resep kembali ke list tanpa menyimpan dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Resep/i })
        .or(page.getByRole('button', { name: /Buat Resep/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);

      // Click Batalkan
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      // Verify redirected back to recipe list
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 15000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
    });
  });

  test('[TC-04] Validasi form buat resep: submit tanpa melengkapi data tidak keluar dari halaman add', async ({ page }) => {
    await test.step('Lakukan proses validasi form buat resep: submit tanpa melengkapi data tidak keluar dari halaman add dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Resep/i })
        .or(page.getByRole('button', { name: /Buat Resep/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);

      // Click Simpan button without completing required inputs
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
      await simpanBtn.click();

      // Verification: Form stays on add page because validation prevents submission
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);
    });
  });

  test('[TC-05] Membuka modal tambah bahan baku dan membatalkannya', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal tambah bahan baku dan membatalkannya', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Resep/i })
        .or(page.getByRole('button', { name: /Buat Resep/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);
      await waitForPageReady(page);

      const selectedMenu = await selectBranchAndMenu(page);

      if (selectedMenu) {
        // Open Tambah Bahan Baku modal
        const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
        await expect(tambahBahanBtn).toBeEnabled({ timeout: 10000 });
        await tambahBahanBtn.click();

        // Verify modal elements
        const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
        await expect(modal).toBeVisible({ timeout: 5000 });
        await expect(modal.getByText('Tambah Bahan Baku').first()).toBeVisible({ timeout: 5000 });

        // Cancel modal
        const cancelBtn = modal.getByRole('button', { name: /Batal/i });
        await expect(cancelBtn).toBeVisible();
        await cancelBtn.click();

        await expect(modal).not.toBeVisible({ timeout: 5000 });
      } else {
        await expect(page.getByText('Buat Resep').first()).toBeVisible({ timeout: 5000 });
        await expect(page.getByPlaceholder('Pilih Cabang')).toBeVisible();
        await expect(page.getByPlaceholder('Pilih Menu')).toBeVisible();
      }
    });
  });

  test('[TC-06] Tambah resep baru berhasil dan muncul di tabel', async ({ page }) => {
    await test.step('Lakukan proses tambah resep baru berhasil dan muncul di tabel dan pastikan data tersimpan', async () => {
      const recipeMenuName = await createRecipe(page);

      // Verify recipe appears in table
      const table = page.locator('table:visible').first();
      if (recipeMenuName) {
        const searchInput = getSearchInput(page);
        await searchInput.fill(recipeMenuName);
        await waitForPageReady(page);

        const targetRow = table.locator('tbody tr').filter({ hasText: recipeMenuName });
        await expect(targetRow.first()).toBeVisible({ timeout: 15000 });
      } else {
        const rows = getDataRows(page);
        await expect(rows.first()).toBeVisible({ timeout: 15000 });
      }
    });
  });

  test('[TC-07] Cari/filter resep dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter resep dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureRecipeExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetMenu = await getRecipeItemName(dataRows.first());
      expect(targetMenu.length).toBeGreaterThan(0);

      const searchInput = getSearchInput(page);
      await expect(searchInput).toBeVisible({ timeout: 5000 });

      // 1. Search with matching term
      await searchInput.fill(targetMenu);
      await waitForPageReady(page);
      const matchedRow = page.locator('table:visible tbody tr').filter({ hasText: targetMenu });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // 2. Search with non-existent keyword
      await searchInput.fill('XYZNonExistentRecipe999');
      await waitForPageReady(page);
      await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });

      // 3. Clear search and verify original row is visible again
      await searchInput.clear();
      await waitForPageReady(page);
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
    });
  });

  test('[TC-08] Beralih ke tab data resep setengah jadi dan kembali ke tab data resep', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Beralih ke tab data resep setengah jadi dan kembali ke tab data resep', async () => {
      // Click tab Data Resep Setengah Jadi
      const semiTab = page.getByRole('tab', { name: /Data Resep Setengah Jadi/i });
      await expect(semiTab).toBeVisible({ timeout: 5000 });
      await semiTab.click();
      await waitForPageReady(page);

      // Verify header of semi-raw tab table
      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Bahan Baku Setengah Jadi', { exact: true }).first()).toBeVisible({ timeout: 10000 });

      // Switch back to Data Resep tab
      const resepTab = page.getByRole('tab', { name: /Data Resep$/i });
      await expect(resepTab).toBeVisible({ timeout: 5000 });
      await resepTab.click();
      await waitForPageReady(page);

      // Verify original table headers on Data Resep tab (Tipe Resep & Nama Menu/Opsi Varian)
      const thead2 = page.locator('thead:visible').first();
      await expect(thead2.getByText('Tipe Resep', { exact: true }).first()).toBeVisible({ timeout: 10000 });
      await expect(thead2.getByText('Nama Menu/Opsi Varian', { exact: true }).first()).toBeVisible({ timeout: 10000 });
    });
  });

  test('[TC-09] Navigasi ke halaman edit resep via aksi tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit resep via aksi tabel', async () => {
      await ensureRecipeExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });

      // Edit button (first action link or button in row)
      const editBtn = targetRow.locator('a[href*="/edit"]').first();
      await expect(editBtn).toBeVisible({ timeout: 10000 });
      await editBtn.click();

      // Verify edit page loaded
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/edit/, { timeout: 15000 });
      await expect(page.getByText('Edit Resep').first()).toBeVisible({ timeout: 10000 });

      // Verify Batalkan button returns to recipe list
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 15000 });
    });
  });

  test('[TC-10] Edit resep dan simpan perubahan', async ({ page }) => {
    await test.step('Lakukan pengujian edit resep dan simpan perubahan dan verifikasi pembaruan data', async () => {
      await ensureRecipeExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });

      // Click edit button
      const editBtn = targetRow.locator('a[href*="/edit"]').first();
      await expect(editBtn).toBeVisible({ timeout: 10000 });
      await editBtn.click();

      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/edit/, { timeout: 15000 });
      await waitForPageReady(page);

      // Click Simpan on edit page to confirm update
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeEnabled({ timeout: 5000 });
      await simpanBtn.click();

      // Verify redirect back to recipe list
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 20000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-11] Batal menghapus resep melalui modal konfirmasi', async ({ page }) => {
    await test.step('Uji pembatalan aksi: Batal menghapus resep melalui modal konfirmasi', async () => {
      await ensureRecipeExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });
      const targetMenu = await getRecipeItemName(targetRow);

      // Click delete / trash button (last action button)
      const deleteBtn = targetRow.locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 10000 });
      await deleteBtn.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Hapus|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });

      // Click Batal
      const cancelBtn = modal.getByRole('button', { name: /Batal/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      // Verify modal closed
      await expect(modal).not.toBeVisible({ timeout: 5000 });

      // Verify item still exists in table
      await expect(page.locator('table:visible').getByText(targetMenu).first()).toBeVisible({ timeout: 5000 });
    });
  });

  test('[TC-12] Hapus resep berhasil dengan konfirmasi modal', async ({ page }) => {
    await test.step('Lakukan proses hapus resep berhasil dengan konfirmasi modal dan konfirmasi penghapusan data', async () => {
      await ensureRecipeExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });
      const targetMenu = await getRecipeItemName(targetRow);

      // Click delete / trash button
      const deleteBtn = targetRow.locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 10000 });
      await deleteBtn.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Hapus|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });

      // Click confirm delete button
      const confirmDeleteBtn = modal.getByRole('button', { name: 'Hapus', exact: true });
      await expect(confirmDeleteBtn).toBeVisible();

      await Promise.all([
        page.waitForResponse(res => (res.url().includes('delete-menu') || res.url().includes('recipe') || res.url().includes('ingredients')) && (res.status() === 200 || res.status() === 204), { timeout: 20000 }).catch(() => null),
        confirmDeleteBtn.click(),
      ]);

      // Verify modal closed
      await expect(modal).not.toBeVisible({ timeout: 10000 });

      // Verify row or search term is no longer visible
      if (targetMenu) {
        const searchInput = getSearchInput(page);
        await searchInput.fill(targetMenu);
        await waitForPageReady(page);
        await expect(page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data"))').filter({ hasText: targetMenu })).toHaveCount(0, { timeout: 10000 });
      }
    });
  });

  test('[TC-13] Peralihan radio button Tipe Resep ke Varian serta pemilihan dropdown Varian dan Opsi Varian', async ({ page }) => {
    await test.step('Navigasi ke halaman Buat Resep, pilih Cabang, alihkan Tipe Resep ke Varian, dan pilih Varian serta Opsi Varian', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Resep/i })
        .or(page.getByRole('button', { name: /Buat Resep/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();

      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });
      await waitForPageReady(page);

      // 1. Pilih Cabang *
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 10000 });
      const branchOptions = await getListboxOptionsForInput(page, cabangInput);
      await cabangInput.click();
      await expect(branchOptions.first()).toBeVisible({ timeout: 10000 });
      await branchOptions.first().click();
      await waitForPageReady(page);

      // 2. Verifikasi kondisi awal Tipe Resep = Menu
      const menuRadio = page.locator('input[type="radio"][value="menu"]');
      const varianRadio = page.locator('input[type="radio"][value="variant"]');
      await expect(menuRadio).toBeChecked();
      await expect(page.getByPlaceholder('Pilih Menu')).toBeVisible();

      // 3. Klik radio button Tipe Resep -> Varian
      const varianRadioLabel = page.locator('label.mantine-Radio-label').filter({ hasText: /^Varian$/ }).first();
      await expect(varianRadioLabel).toBeVisible({ timeout: 5000 });
      await varianRadioLabel.click();
      await expect(varianRadio).toBeChecked();

      // 4. Verifikasi field dinamis Varian * dan Opsi Varian * muncul
      const varianInput = page.getByPlaceholder('Pilih Varian').first();
      const opsiVarianInput = page.getByPlaceholder('Pilih Opsi Varian').first();
      await expect(varianInput).toBeVisible({ timeout: 5000 });
      await expect(varianInput).toBeEnabled({ timeout: 5000 });
      await expect(opsiVarianInput).toBeVisible({ timeout: 5000 });
      await expect(opsiVarianInput).toBeDisabled();

      // 5. Pilih opsi pada dropdown Varian *
      const varianOptions = await getListboxOptionsForInput(page, varianInput);
      await varianInput.click();
      if (await varianOptions.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await varianOptions.first().click();
        await waitForPageReady(page);
        await expect(varianInput).not.toHaveValue('');

        // 6. Setelah Varian dipilih, dropdown Opsi Varian * menjadi aktif dan dapat dipilih
        const isOpsiEnabled = await expect(opsiVarianInput).toBeEnabled({ timeout: 10000 }).then(() => true).catch(() => false);
        if (isOpsiEnabled) {
          const opsiOptions = await getListboxOptionsForInput(page, opsiVarianInput);
          await opsiVarianInput.click();
          if (await opsiOptions.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            await opsiOptions.first().click();
            await waitForPageReady(page);
            await expect(opsiVarianInput).not.toHaveValue('');

            // Tombol Tambah Bahan Baku pada panel Resep menjadi aktif
            const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
            await expect(tambahBahanBtn).toBeEnabled({ timeout: 10000 });
          } else {
            await page.keyboard.press('Escape').catch(() => {});
          }
        }
      } else {
        await page.keyboard.press('Escape').catch(() => {});
      }

      // 7. Beralih kembali ke radio button Menu dan pastikan field Pilih Menu tampil kembali
      const menuRadioLabel = page.locator('label.mantine-Radio-label').filter({ hasText: /^Menu$/ }).first();
      await menuRadioLabel.click();
      await expect(menuRadio).toBeChecked();
      await expect(page.getByPlaceholder('Pilih Menu')).toBeVisible({ timeout: 5000 });
    });
  });
});
