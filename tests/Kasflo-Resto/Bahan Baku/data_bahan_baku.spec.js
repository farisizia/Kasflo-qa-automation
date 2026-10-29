const { test, expect } = require('@playwright/test');

test.describe('Data Bahan Baku', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  async function waitForPageReady(page) {
    const loader = page.locator(
      '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
    );
    await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

  // Shared resilient login helper
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) {
      await waitForPageReady(page);
      return page;
    }

    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
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
    await waitForPageReady(page);

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await loginBtn.click();

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await waitForPageReady(page);
        if (await loginBtn.isVisible().catch(() => false)) {
          await loginBtn.click({ timeout: 5000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
      }
    }
    await waitForPageReady(page);
    return page;
  }

  // Helper to select an option in a Mantine Select dropdown
  async function selectMantineOption(page, inputLocator, optionText) {
    await inputLocator.click();

    if (optionText) {
      const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible')
        .filter({ hasText: optionText }).first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click();
        return;
      }
    }

    // Default: click first visible option
    const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
  }

  // Helper to create a Raw Ingredient
  async function createRawIngredient(page, ingredientName) {
    const addBtn = page.getByRole('link', { name: /Buat Bahan Baku/i })
      .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
    await expect(addBtn).toBeVisible({ timeout: 10000 });
    await addBtn.click();

    await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients\/raw\/add/, { timeout: 15000 });

    // Select Cabang (Required field)
    const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
    await expect(cabangInput).toBeVisible({ timeout: 10000 });
    const currentVal = await cabangInput.inputValue().catch(() => '');
    if (!currentVal) {
      await selectMantineOption(page, cabangInput);
    }

    // Fill Nama Bahan Baku (Required field)
    const nameInput = page.getByPlaceholder('Masukkan Nama Bahan Baku').first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await nameInput.fill(ingredientName);

    // Select Satuan (Required field: e.g. Gram or first available unit)
    const satuanInput = page.locator('input[placeholder="Pilih Satuan"]').first();
    if (await satuanInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      const currentSatuan = await satuanInput.inputValue().catch(() => '');
      if (!currentSatuan) {
        await selectMantineOption(page, satuanInput, 'Gram');
      }
    }

    // Configure Atur Stok & HPP / Kelola Stok Opname & HPP (Required to enable main Simpan button)
    const aturBtn = page.getByRole('button', { name: /Kelola Stok.*HPP|Atur Stok/i });
    await expect(aturBtn).toBeVisible({ timeout: 10000 });
    await aturBtn.click();

    const drawer = page.locator('.mantine-Drawer-content, [role="dialog"]').last();
    await expect(drawer).toBeVisible({ timeout: 5000 });

    const stokInput = drawer.getByPlaceholder('Masukkan Jumlah Stok');
    await expect(stokInput).toBeVisible({ timeout: 5000 });
    await stokInput.fill('100');

    const hargaInput = drawer.getByPlaceholder('Masukkan Harga Beli');
    await expect(hargaInput).toBeVisible({ timeout: 5000 });
    await hargaInput.fill('5000');

    const sumberDanaInput = drawer.getByPlaceholder('Pilih Sumber Dana');
    await expect(sumberDanaInput).toBeVisible({ timeout: 5000 });
    await selectMantineOption(page, sumberDanaInput);

    // Save drawer settings
    const drawerSimpanBtn = drawer.getByRole('button', { name: 'Simpan', exact: true });
    await expect(drawerSimpanBtn).toBeEnabled({ timeout: 5000 });
    await drawerSimpanBtn.click();
    await expect(drawer).not.toBeVisible({ timeout: 5000 });

    // Submit main form
    const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
    await expect(simpanBtn).toBeEnabled({ timeout: 10000 });
    await simpanBtn.click();

    await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients$/, { timeout: 25000 });
    await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  }

  // Helper to ensure at least one raw ingredient exists in the list
  async function ensureRawIngredientExists(page) {
    const dataRows = getDataRows(page);
    const count = await dataRows.count();
    if (count === 0) {
      await createRawIngredient(page, 'Init Bahan Baku ' + Date.now());
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Data Bahan Baku page
      await page.goto('/admin/ingredients/ingredients', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients/);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman data bahan baku dengan tabel, header, filter, dan tab yang sesuai', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman data bahan baku dengan tabel, header, filter, dan tab yang sesuai', async () => {
      // Verify page heading / breadcrumb
      await expect(page.getByText('Data Bahan Baku').first()).toBeVisible({ timeout: 10000 });

      // Verify tabs exist
      const rawTab = page.getByRole('tab', { name: 'Bahan Baku Mentah', exact: true });
      const semiRawTab = page.getByRole('tab', { name: 'Bahan Baku Setengah Jadi', exact: true });
      await expect(rawTab).toBeVisible({ timeout: 10000 });
      await expect(semiRawTab).toBeVisible({ timeout: 10000 });

      // Verify filter elements
      const searchInput = page.getByPlaceholder('Cari disini...').or(page.locator('input[placeholder*="Cari"]')).first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      const cabangFilter = page.locator('input[placeholder*="Cabang"]').first();
      await expect(cabangFilter).toBeVisible({ timeout: 10000 });

      // Verify Add Button exists
      const addBtn = page.getByRole('link', { name: /Buat Bahan Baku/i })
        .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });

      // Verify table structure and headers
      const table = page.locator('table');
      await expect(table).toBeVisible();

      const thead = page.locator('thead');
      await expect(thead.getByText('Nama Bahan Baku', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Tipe Bahan Baku', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Kategori', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Stok Saat Ini', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Satuan', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Navigasi ke halaman buat bahan baku mentah dan memverifikasi form elements', async ({ page }) => {
    await test.step('Lakukan proses navigasi ke halaman buat bahan baku mentah dan memverifikasi form elements dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Bahan Baku/i })
        .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();

      // Verify URL and title
      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients\/raw\/add/, { timeout: 15000 });
      await expect(page.getByText('Buat Bahan Baku Mentah').first()).toBeVisible({ timeout: 10000 });

      // Verify form fields
      const namaInput = page.getByPlaceholder('Masukkan Nama Bahan Baku');
      await expect(namaInput).toBeVisible({ timeout: 5000 });

      const satuanInput = page.locator('input[placeholder="Pilih Satuan"]');
      await expect(satuanInput).toBeVisible({ timeout: 5000 });

      const cabangInput = page.locator('input[placeholder="Pilih Cabang"]');
      await expect(cabangInput).toBeVisible({ timeout: 5000 });

      // Verify action buttons
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible({ timeout: 5000 });

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-03] Tombol batalkan pada form buat bahan baku mentah kembali ke list tanpa menyimpan', async ({ page }) => {
    await test.step('Lakukan proses tombol batalkan pada form buat bahan baku mentah kembali ke list tanpa menyimpan dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Bahan Baku/i })
        .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients\/raw\/add/);

      // Fill temporary name
      const tempName = 'Batal Bahan ' + Date.now();
      await page.getByPlaceholder('Masukkan Nama Bahan Baku').fill(tempName);

      // Click Batalkan
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      // Verify redirected back to ingredients list
      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients$/, { timeout: 15000 });
      await expect(page.locator('table')).toBeVisible({ timeout: 10000 });

      // Verify temporary item is not saved in table
      await expect(page.locator('table').getByText(tempName)).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-04] Validasi form buat bahan baku mentah: tombol simpan disabled jika input wajib belum diisi', async ({ page }) => {
    await test.step('Lakukan proses validasi form buat bahan baku mentah: tombol simpan disabled jika input wajib belum diisi dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Bahan Baku/i })
        .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients\/raw\/add/);

      // When required fields are empty, Simpan button should be disabled
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeDisabled({ timeout: 5000 });
    
    });
  });

  test('[TC-05] Tambah bahan baku mentah baru berhasil dan muncul di tabel', async ({ page }) => {
    await test.step('Lakukan proses tambah bahan baku mentah baru berhasil dan muncul di tabel dan pastikan data tersimpan', async () => {
      const newIngredientName = 'Bahan Mentah Auto ' + Date.now();
      await createRawIngredient(page, newIngredientName);

      // Search for new ingredient to ensure visibility
      const searchInput = page.getByPlaceholder('Cari disini...');
      await searchInput.fill(newIngredientName);

      // Verify new ingredient appears in table
      const table = page.locator('table');
      const newRow = table.locator('tbody tr').filter({ hasText: newIngredientName });
      await expect(newRow.first()).toBeVisible({ timeout: 15000 });

      // Verify type is 'Bahan Baku Mentah'
      await expect(newRow.getByText(/Mentah/i).first()).toBeVisible();
    
    });
  });

  test('[TC-06] Cari/filter data bahan baku dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter data bahan baku dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureRawIngredientExists(page);

      // Pick first available ingredient name
      const firstRowCell = page.locator('table tbody tr td:first-child').filter({
        hasNotText: /Belum Ada Data|No results found/i,
      }).first();
      await expect(firstRowCell).not.toBeEmpty({ timeout: 10000 });
      const targetName = (await firstRowCell.innerText()).trim();
      expect(targetName.length).toBeGreaterThan(0);

      const searchInput = page.getByPlaceholder('Cari disini...');
      await expect(searchInput).toBeVisible({ timeout: 5000 });

      // 1. Search with matching term
      await searchInput.fill(targetName);
      const matchedRow = page.locator('table tbody tr').filter({ hasText: targetName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // 2. Search with non-existent keyword
      await searchInput.fill('XYZTermNotExist999');
      await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });

      // 3. Clear search and verify original row is visible again
      await searchInput.clear();
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-07] Beralih ke tab bahan baku setengah jadi dan kembali ke bahan baku mentah', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Beralih ke tab bahan baku setengah jadi dan kembali ke bahan baku mentah', async () => {
      // Click tab Bahan Baku Setengah Jadi
      const semiRawTab = page.getByRole('tab', { name: 'Bahan Baku Setengah Jadi', exact: true });
      await semiRawTab.click();

      // Verify Add button leads to semi-raw add URL
      const addBtnSemi = page.getByRole('link', { name: /Buat Bahan Baku/i })
        .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
      await expect(addBtnSemi).toBeVisible({ timeout: 10000 });
      await expect(addBtnSemi).toHaveAttribute('href', /.*\/semi-raw\/add/);

      // Switch back to Bahan Baku Mentah tab
      const rawTab = page.getByRole('tab', { name: 'Bahan Baku Mentah', exact: true });
      await rawTab.click();

      // Verify Add button leads back to raw add URL
      const addBtnRaw = page.getByRole('link', { name: /Buat Bahan Baku/i })
        .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
      await expect(addBtnRaw).toBeVisible({ timeout: 10000 });
      await expect(addBtnRaw).toHaveAttribute('href', /.*\/raw\/add/);
    
    });
  });

  test('[TC-08] Navigasi ke halaman buat bahan baku setengah jadi dan memverifikasi form elements', async ({ page }) => {
    await test.step('Lakukan proses navigasi ke halaman buat bahan baku setengah jadi dan memverifikasi form elements dan pastikan data tersimpan', async () => {
      // Click tab Bahan Baku Setengah Jadi
      const semiRawTab = page.getByRole('tab', { name: 'Bahan Baku Setengah Jadi', exact: true });
      await semiRawTab.click();

      // Click Buat Bahan Baku
      const addBtn = page.getByRole('link', { name: /Buat Bahan Baku/i })
        .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
      await addBtn.click();

      // Verify URL and title
      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients\/semi-raw\/add/, { timeout: 15000 });
      await expect(page.getByText('Buat Bahan Baku Setengah Jadi').first()).toBeVisible({ timeout: 10000 });

      // Verify key fields
      await expect(page.getByPlaceholder('Masukkan Nama Bahan Baku')).toBeVisible({ timeout: 5000 });
      await expect(page.locator('input[placeholder="Pilih Satuan"]')).toBeVisible({ timeout: 5000 });

      // Click Batalkan to return
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients$/, { timeout: 15000 });
    
    });
  });

  test('[TC-09] Navigasi ke halaman edit bahan baku mentah via aksi tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit bahan baku mentah via aksi tabel', async () => {
      await ensureRawIngredientExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({
        hasNotText: /Belum Ada Data|No results found/i,
      }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const targetName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: targetName }).first();

      // Pencil / Edit icon button (second button in the action column, or link)
      const editBtn = targetRow.locator('button, a').filter({ has: page.locator('svg') }).nth(1);
      await expect(editBtn).toBeVisible({ timeout: 10000 });
      await editBtn.click();

      // Verify edit page loaded
      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients\/raw\/edit\/.*/, { timeout: 15000 });
      await expect(page.getByText(/Edit Bahan Baku Mentah/i).first()).toBeVisible({ timeout: 10000 });

      // Verify input contains original name
      const nameInput = page.getByPlaceholder('Masukkan Nama Bahan Baku');
      await expect(nameInput).toBeVisible({ timeout: 5000 });
      await expect(nameInput).toHaveValue(targetName);

      // Return to ingredients list via breadcrumb link
      const backBreadcrumb = page.getByRole('link', { name: 'Data Bahan Baku' }).first();
      await expect(backBreadcrumb).toBeVisible({ timeout: 5000 });
      await backBreadcrumb.click();

      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients$/, { timeout: 15000 });
    
    });
  });

  test('[TC-10] Edit bahan baku mentah dan simpan perubahan', async ({ page }) => {
    await test.step('Lakukan pengujian edit bahan baku mentah dan simpan perubahan dan verifikasi pembaruan data', async () => {
      await ensureRawIngredientExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({
        hasNotText: /Belum Ada Data|No results found/i,
      }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const originalName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: originalName }).first();

      // Click edit button
      const editBtn = targetRow.locator('button, a').filter({ has: page.locator('svg') }).nth(1);
      await expect(editBtn).toBeVisible({ timeout: 10000 });
      await editBtn.click();

      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients\/raw\/edit\/.*/, { timeout: 15000 });

      // Update name
      const updatedName = 'Updated Bahan ' + Date.now();
      const nameInput = page.getByPlaceholder('Masukkan Nama Bahan Baku');
      await expect(nameInput).toBeVisible({ timeout: 5000 });
      await nameInput.click();
      await nameInput.fill(updatedName);
      await nameInput.blur();

      // Click Update button
      const updateBtn = page.getByRole('button', { name: 'Update', exact: true });
      await expect(updateBtn).toBeEnabled({ timeout: 5000 });
      await updateBtn.click();

      // Wait for redirect back to list table
      await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients$/, { timeout: 20000 });
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });

      // Filter by updated name to verify in table
      const searchInput = page.getByPlaceholder('Cari disini...');
      await searchInput.fill(updatedName);

      const updatedRow = page.locator('table tbody tr').filter({ hasText: updatedName });
      await expect(updatedRow.first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-11] Batal menghapus bahan baku mentah melalui modal konfirmasi', async ({ page }) => {
    await test.step('Uji pembatalan aksi: Batal menghapus bahan baku mentah melalui modal konfirmasi', async () => {
      await ensureRawIngredientExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({
        hasNotText: /Belum Ada Data|No results found/i,
      }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const targetName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: targetName }).first();

      // Click trash / delete button (last action button)
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
      await expect(page.locator('table').getByText(targetName)).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-12] Hapus bahan baku mentah berhasil dengan konfirmasi modal', async ({ page }) => {
    await test.step('Lakukan proses hapus bahan baku mentah berhasil dengan konfirmasi modal dan konfirmasi penghapusan data', async () => {
      // Create an ingredient specifically to be deleted
      const itemToDelete = 'Delete Target ' + Date.now();
      await createRawIngredient(page, itemToDelete);

      // Search for item to ensure it is isolated and visible
      const searchInput = page.getByPlaceholder('Cari disini...');
      await searchInput.fill(itemToDelete);

      // Locate the row of the item
      const targetRow = page.locator('table tbody tr').filter({ hasText: itemToDelete }).first();
      await expect(targetRow).toBeVisible({ timeout: 15000 });

      // Click trash / delete button
      const deleteBtn = targetRow.locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 10000 });
      await deleteBtn.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Hapus|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });

      // Click confirm delete button
      const confirmDeleteBtn = modal.getByRole('button', { name: /Hapus|Ya/i }).first();
      await expect(confirmDeleteBtn).toBeVisible();

      await Promise.all([
        page.waitForResponse(res => res.url().includes('/ingredients/ingredients') && res.request().method() === 'DELETE' && (res.status() === 200 || res.status() === 204), { timeout: 20000 }).catch(() => null),
        confirmDeleteBtn.click(),
      ]);

      // Verify modal closed
      await expect(modal).not.toBeVisible({ timeout: 10000 });

      // Verify deleted item is no longer visible in table
      await expect(page.locator('table').getByText(itemToDelete)).not.toBeVisible({ timeout: 10000 });
    
    });
  });
});
