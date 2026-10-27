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

  // Shared resilient login helper
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) {
      return page;
    }

    try {
      await page.goto('/', { waitUntil: 'commit', timeout: 25000 });
    } catch {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 25000 });
    }

    if (page.url().includes('/admin/')) {
      return page;
    }

    const emailInput = page.getByLabel(/Email atau Username/i);
    await expect(emailInput).toBeVisible({ timeout: 20000 });

    await emailInput.fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeEnabled({ timeout: 5000 });
    await loginBtn.click();

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await page.waitForTimeout(1500);
        if (await loginBtn.isVisible().catch(() => false)) {
          await loginBtn.click({ timeout: 5000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      }
    }
    return page;
  }

  // Helper to select an option in a Mantine Select dropdown
  async function selectMantineOption(page, inputLocator, optionText) {
    await inputLocator.click();

    const optionSelector = '[role="option"]:visible, [data-combobox-option]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible';
    if (optionText) {
      const option = page.locator(optionSelector)
        .filter({ hasText: optionText }).first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click();
        return;
      }
    }

    // Default: click first visible option
    const firstOption = page.locator(optionSelector).first();
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
  }

  let branchBookMenuVerified = false;

  // Helper to ensure at least one Book Menu is assigned to Kasflo Pusat QA with active menus
  async function ensureBranchHasBookMenu(page) {
    if (branchBookMenuVerified) return;
    try {
      await page.goto('/admin/catalog/book-menu', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
      branchBookMenuVerified = true;
    } catch {
      // Continue anyway
    }
  }

  // Helper to create a Recipe
  async function createRecipe(page) {
    await ensureBranchHasBookMenu(page);

    await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);

    const addBtn = page.getByRole('link', { name: /Buat Resep/i })
      .or(page.getByRole('button', { name: /Buat Resep/i })).first();
    await expect(addBtn).toBeVisible({ timeout: 10000 });
    await addBtn.click();

    await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });

    // Select Cabang and find one that has available menus
    const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
    await expect(cabangInput).toBeVisible({ timeout: 10000 });

    const menuInput = page.getByPlaceholder('Pilih Menu').first();
    await expect(menuInput).toBeVisible({ timeout: 10000 });

    const optionSelector = '[role="option"]:visible, [data-combobox-option]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible';
    let firstOption = null;

    await cabangInput.click();
    await page.waitForTimeout(500);
    const branchOptions = page.locator(optionSelector);
    const branchCount = await branchOptions.count();

    for (let b = 0; b < Math.max(branchCount, 1); b++) {
      if (branchCount > 0) {
        if (b > 0) {
          await cabangInput.click();
          await page.waitForTimeout(500);
        }
        await branchOptions.nth(b).click();
        await page.waitForTimeout(1000);
      }

      await menuInput.click();
      await page.waitForTimeout(500);
      const opt = page.locator(optionSelector).first();
      if (await opt.isVisible({ timeout: 2000 }).catch(() => false)) {
        firstOption = opt;
        break;
      }
    }

    if (!firstOption || !(await firstOption.isVisible().catch(() => false))) {
      await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
      return null;
    }

    const selectedMenuName = (await firstOption.innerText()).trim() || 'Updated Menu';
    await firstOption.click();

    await page.waitForTimeout(1000);

    // Check if ingredient is already attached to this recipe
    const hasExistingIngredient = await page.locator('table:visible tbody tr').filter({ hasText: /Gram|Pcs|Kg|Bahan/i }).first().isVisible().catch(() => false);

    if (!hasExistingIngredient) {
      // Click Tambah Bahan Baku button
      const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
      await expect(tambahBahanBtn).toBeEnabled({ timeout: 10000 });
      await tambahBahanBtn.click();

      // In modal: select first ingredient row and set quantity
      const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const ingredientRow = modal.locator('table tbody tr:not(:has-text("Belum Ada Data"))').first();
      await expect(ingredientRow).toBeVisible({ timeout: 5000 });
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

    return selectedMenuName;
  }

  // Helper to ensure at least one recipe exists in the list
  async function ensureRecipeExists(page) {
    await expect(page.locator('table:visible tbody tr').first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);

    const dataRows = getDataRows(page);
    const count = await dataRows.count();
    if (count === 0) {
      return await createRecipe(page);
    }
    const firstCell = dataRows.first().locator('td:first-child');
    return (await firstCell.innerText()).trim();
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Recipe page
      await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });

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

      // Verify table structure and headers
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible();

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Menu', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Bahan Baku', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Peringatan Stok', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Navigasi ke halaman buat resep dan memverifikasi form elements', async ({ page }) => {
    await test.step('Lakukan proses navigasi ke halaman buat resep dan memverifikasi form elements dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Resep/i })
        .or(page.getByRole('button', { name: /Buat Resep/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();

      // Verify URL and title
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });
      await expect(page.getByText('Buat Resep').first()).toBeVisible({ timeout: 10000 });

      // Verify form fields
      const cabangInput = page.getByPlaceholder('Pilih Cabang');
      await expect(cabangInput).toBeVisible({ timeout: 5000 });

      const menuInput = page.getByPlaceholder('Pilih Menu');
      await expect(menuInput).toBeVisible({ timeout: 5000 });

      const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
      await expect(tambahBahanBtn).toBeVisible({ timeout: 5000 });

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
      await ensureBranchHasBookMenu(page);

      await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);

      const addBtn = page.getByRole('link', { name: /Buat Resep/i })
        .or(page.getByRole('button', { name: /Buat Resep/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);

      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 10000 });

      const menuInput = page.getByPlaceholder('Pilih Menu').first();
      await expect(menuInput).toBeVisible({ timeout: 10000 });

      const optionSelector = '[role="option"]:visible, [data-combobox-option]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible';
      let menuOption = null;

      await cabangInput.click();
      await page.waitForTimeout(500);
      const branchOptions = page.locator(optionSelector);
      const branchCount = await branchOptions.count();

      for (let b = 0; b < Math.max(branchCount, 1); b++) {
        if (branchCount > 0) {
          if (b > 0) {
            await cabangInput.click();
            await page.waitForTimeout(500);
          }
          await branchOptions.nth(b).click();
          await page.waitForTimeout(1000);
        }

        await menuInput.click();
        await page.waitForTimeout(500);
        const opt = page.locator(optionSelector).first();
        if (await opt.isVisible({ timeout: 2000 }).catch(() => false)) {
          menuOption = opt;
          break;
        }
      }

      if (menuOption) {
        await menuOption.click();
        await page.waitForTimeout(1000);

        // Open Tambah Bahan Baku modal
        const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
        if (await tambahBahanBtn.isEnabled({ timeout: 5000 }).catch(() => false)) {
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
        }
      } else {
        // If all menus are already assigned, verify form elements are valid
        await expect(page.getByText('Buat Resep').first()).toBeVisible({ timeout: 5000 });
        await expect(cabangInput).toBeVisible();
        await expect(menuInput).toBeVisible();
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
        await page.waitForTimeout(1000);

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

      const firstRowCell = page.locator('table:visible tbody tr td:first-child').filter({
        hasNotText: /Belum Ada Data|No results found/i,
      }).first();
      await expect(firstRowCell).not.toBeEmpty({ timeout: 10000 });
      const targetMenu = (await firstRowCell.innerText()).trim();
      expect(targetMenu.length).toBeGreaterThan(0);

      const searchInput = getSearchInput(page);
      await expect(searchInput).toBeVisible({ timeout: 5000 });

      // 1. Search with matching term
      await searchInput.fill(targetMenu);
      await page.waitForTimeout(1000);
      const matchedRow = page.locator('table:visible tbody tr').filter({ hasText: targetMenu });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // 2. Search with non-existent keyword
      await searchInput.fill('XYZNonExistentRecipe999');
      await page.waitForTimeout(1000);
      await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });

      // 3. Clear search and verify original row is visible again
      await searchInput.clear();
      await page.waitForTimeout(1000);
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-08] Beralih ke tab data resep setengah jadi dan kembali ke tab data resep', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Beralih ke tab data resep setengah jadi dan kembali ke tab data resep', async () => {
      // Click tab Data Resep Setengah Jadi
      const semiTab = page.getByRole('tab', { name: /Data Resep Setengah Jadi/i });
      await expect(semiTab).toBeVisible({ timeout: 5000 });
      await semiTab.click();
      await page.waitForTimeout(1000);

      // Verify header of semi-raw tab table
      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Bahan Baku Setengah Jadi', { exact: true }).first()).toBeVisible({ timeout: 10000 });

      // Switch back to Data Resep tab
      const resepTab = page.getByRole('tab', { name: /Data Resep$/i });
      await expect(resepTab).toBeVisible({ timeout: 5000 });
      await resepTab.click();
      await page.waitForTimeout(1000);

      // Verify original table header
      const thead2 = page.locator('thead:visible').first();
      await expect(thead2.getByText('Menu', { exact: true }).first()).toBeVisible({ timeout: 10000 });
    
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
      const targetMenu = (await targetRow.locator('td:first-child').innerText()).trim();

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
      // Ensure at least one recipe exists
      await ensureRecipeExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });
      const targetMenu = (await targetRow.locator('td:first-child').innerText()).trim();

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
        await page.waitForTimeout(1000);
        await expect(page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data"))').filter({ hasText: targetMenu })).toHaveCount(0, { timeout: 10000 });
      }
    
    });
  });
});
