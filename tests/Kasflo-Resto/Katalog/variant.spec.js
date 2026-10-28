const { test, expect } = require('@playwright/test');

test.describe('Varian Menu', () => {
  // Helper selector for actual data rows (excluding the empty "No results found" placeholder row)
  function getDataRows(page) {
    return page.locator('table tbody tr:not(:has-text("No results found"))');
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
    await page.waitForTimeout(500);

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await loginBtn.click();

    await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
    await waitForPageReady(page);
    return page;
  }

  // Helper to create a single variant
  async function createVariant(page, variantName) {
    const addBtn = page.getByRole('link', { name: 'Tambah Varian' }).or(page.getByRole('button', { name: 'Tambah Varian' })).first();
    await expect(addBtn).toBeVisible({ timeout: 15000 });
    await expect(addBtn).toBeEnabled({ timeout: 10000 });
    await addBtn.click();

    await expect(page).toHaveURL(/.*\/admin\/catalog\/variant\/add/, { timeout: 15000 });
    await waitForPageReady(page);

    // 1. Nama Varian Utama
    const nameInput = page.locator('input[placeholder="Masukkan Nama Varian"]').first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await expect(nameInput).toBeEnabled();
    await nameInput.fill(variantName);

    // 2. Mode Varian - Opsional
    await page.getByText('Opsional').first().click();

    // 3. Tipe Varian - Pilih Salah Satu
    await page.getByText('Pilih Salah Satu').first().click();

    // 4. List Varian (Nama pilihan & harga)
    const optionNameInput = page.locator('table input[placeholder="Masukkan Nama Varian"]').first();
    await expect(optionNameInput).toBeVisible({ timeout: 10000 });
    await expect(optionNameInput).toBeEnabled();
    await optionNameInput.fill('Level 1');

    const optionPriceInput = page.locator('table input[placeholder="Masukkan Harga"]').first();
    await expect(optionPriceInput).toBeVisible({ timeout: 10000 });
    await expect(optionPriceInput).toBeEnabled();
    await optionPriceInput.fill('3000');

    // 5. Simpan
    const saveBtn = page.getByRole('button', { name: 'Simpan' });
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();

    await expect(page).toHaveURL(/\/admin\/catalog\/variant$/, { timeout: 20000 });
    await waitForPageReady(page);
  }

  // Ensure at least 1 variant exists for tests that inspect or view items
  async function ensureVariantExists(page) {
    await waitForPageReady(page);
    const dataRows = getDataRows(page);
    if (await dataRows.count() === 0) {
      await createVariant(page, 'Varian ' + Date.now());
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to variant page
      await page.goto('/admin/catalog/variant', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify variant page loaded
      await expect(page).toHaveURL(/\/admin\/catalog\/variant/);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman varian dengan tabel', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman varian dengan tabel', async () => {
      // Verify page title
      await expect(page.getByText('Varian').first()).toBeVisible();

      // Check if table exists
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verify table headers
      const tableHeader = page.locator('thead');
      await expect(tableHeader.getByText('Nama Varian', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Mode Varian', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Tipe Varian', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Tambah varian baru berhasil', async ({ page }) => {
    await test.step('Lakukan proses tambah varian baru berhasil dan pastikan data tersimpan', async () => {
      const variantName = 'Test Varian ' + Date.now();
      await createVariant(page, variantName);

      // Verify created variant is visible in table
      await expect(page.locator('table').getByText(variantName).first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-03] Edit varian dengan ikon edit', async ({ page }) => {
    await test.step('Lakukan pengujian edit varian dengan ikon edit dan verifikasi pembaruan data', async () => {
      await ensureVariantExists(page);

      // Tunggu baris pertama yang memiliki teks nama varian
      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const currentName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: currentName }).first();
      const editLink = targetRow.locator('a[href*="/edit/"]').first();
      await expect(editLink).toBeVisible({ timeout: 15000 });
      await editLink.click();

      // Wait for edit page to load
      await expect(page).toHaveURL(/.*\/admin\/catalog\/variant\/edit\/.*/, { timeout: 15000 });
      await waitForPageReady(page);

      // Modify name
      const updatedName = 'Updated Var ' + Date.now();
      const nameInput = page.locator('input[placeholder="Masukkan Nama Varian"]').first();
      await expect(nameInput).toBeVisible({ timeout: 10000 });
      await expect(nameInput).toBeEnabled();
      await nameInput.fill(updatedName);

      // Save changes (button says 'Update' or 'Simpan')
      const saveBtn = page.getByRole('button', { name: 'Update' }).or(page.getByRole('button', { name: 'Simpan' }));
      await expect(saveBtn).toBeVisible();
      await expect(saveBtn).toBeEnabled();
      await saveBtn.click();

      // Verify returning to variant list page
      await expect(page).toHaveURL(/\/admin\/catalog\/variant$/, { timeout: 20000 });
      await waitForPageReady(page);
      await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-04] Hapus varian dengan ikon trash', async ({ page }) => {
    await test.step('Lakukan proses hapus varian dengan ikon trash dan konfirmasi penghapusan data', async () => {
      await ensureVariantExists(page);

      // Tunggu baris pertama yang memiliki teks nama varian
      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const variantNameToDelete = (await targetCell.innerText()).trim();
      expect(variantNameToDelete.length).toBeGreaterThan(0);

      const targetRow = page.locator('table tbody tr').filter({ hasText: variantNameToDelete }).first();

      // Klik tombol trash pada baris varian tersebut
      const deleteBtn = targetRow.locator('td').last().locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 10000 });
      await expect(deleteBtn).toBeEnabled({ timeout: 10000 });
      await deleteBtn.click();

      // Modal dialog konfirmasi harus muncul
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Hapus Varian|Apakah anda yakin/i).first()).toBeVisible();

      const confirmBtn = modal.getByRole('button', { name: 'Hapus' });
      await expect(confirmBtn).toBeVisible({ timeout: 5000 });
      await expect(confirmBtn).toBeEnabled({ timeout: 5000 });

      // Tunggu request DELETE ke backend selesai dengan response 200 OK
      const [response] = await Promise.all([
        page.waitForResponse(res => res.request().method() === 'DELETE' && res.status() === 200, { timeout: 15000 }),
        confirmBtn.click(),
      ]);
      expect(response.status()).toBe(200);

      // Pastikan modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });

      // Verifikasi bahwa varian yang dihapus tidak lagi ada di tabel
      await expect(page.locator('table').getByText(variantNameToDelete)).not.toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-05] Cari/filter varian dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter varian dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureVariantExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const firstVariantName = (await targetCell.innerText()).trim();
      expect(firstVariantName.length).toBeGreaterThan(0);

      const searchInput = page.locator('input[placeholder="Cari Varian..."]').or(page.getByPlaceholder(/Cari/i)).first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // Search for first variant name
      await searchInput.fill(firstVariantName);

      // Verify table shows matching results
      const matchedRow = page.locator('table tbody tr').filter({ hasText: firstVariantName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // Clear search
      await searchInput.clear();
      await expect(page.locator('table tbody tr').filter({ hasText: firstVariantName }).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Verifikasi status toggle varian memunculkan konfirmasi', async ({ page }) => {
    await test.step('Verifikasi status toggle varian memunculkan konfirmasi', async () => {
      await ensureVariantExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const firstVariantName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: firstVariantName }).first();
      const switchWrapper = targetRow.locator('.mantine-Switch-root, label:has(input[type="checkbox"]), .mantine-Switch-track').first();
      await expect(switchWrapper).toBeVisible({ timeout: 10000 });

      // Click toggle to trigger modal
      await switchWrapper.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Nonaktifkan Varian|Aktifkan Varian|Varian|Status/i).first()).toBeVisible();

      // Safely dismiss modal using Batal button
      const cancelBtn = modal.getByRole('button', { name: 'Batal' });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-07] Lihat detail varian dengan ikon view', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Lihat detail varian dengan ikon view', async () => {
      await ensureVariantExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const variantName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: variantName }).first();
      const viewLink = targetRow.locator('a[href*="/detail/"]').first();
      await expect(viewLink).toBeVisible({ timeout: 10000 });
      await viewLink.click();

      // Wait for detail page to load (/admin/catalog/variant/detail/<id>)
      await expect(page).toHaveURL(/.*\/admin\/catalog\/variant\/detail\/.*/, { timeout: 15000 });

      // Verify variant name or details appear on detail page
      if (variantName) {
        await expect(page.getByText(variantName, { exact: false }).first()).toBeVisible({ timeout: 10000 });
      }
    
    });
  });
});
