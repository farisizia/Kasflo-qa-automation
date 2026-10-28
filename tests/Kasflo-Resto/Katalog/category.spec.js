const { test, expect } = require('@playwright/test');

test.describe('Kategori Menu', () => {
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

  async function createCategory(page, categoryName) {
    const addBtn = page.getByRole('link', { name: 'Tambah Kategori' }).or(page.getByRole('button', { name: 'Tambah Kategori' })).first();
    await expect(addBtn).toBeVisible({ timeout: 15000 });
    await expect(addBtn).toBeEnabled({ timeout: 10000 });
    await addBtn.click();
    await expect(page).toHaveURL(/.*\/admin\/catalog\/category\/add/, { timeout: 15000 });
    await waitForPageReady(page);

    const nameInput = page.getByPlaceholder('Masukkan Nama Kategori').or(page.getByLabel(/Nama/i)).first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await expect(nameInput).toBeEnabled();
    await nameInput.fill(categoryName);

    const codeInput = page.getByPlaceholder('Masukkan Kode').or(page.getByLabel(/Kode/i)).first();
    await expect(codeInput).toBeVisible({ timeout: 10000 });
    await expect(codeInput).toBeEnabled();
    await codeInput.fill('ic' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10));

    const saveBtn = page.getByRole('button', { name: 'Simpan' });
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    await expect(page).toHaveURL(/\/admin\/catalog\/category$/, { timeout: 20000 });
    await waitForPageReady(page);
  }

  // Helper to ensure at least one category exists in the table
  async function ensureCategoryExists(page, minCount = 1) {
    await waitForPageReady(page);
    const dataRows = getDataRows(page);
    if (await dataRows.count() < minCount) {
      await createCategory(page, 'Init Cat ' + Date.now());
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to category page using relative path
      await page.goto('/admin/catalog/category', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify category page loaded
      await expect(page).toHaveURL(/\/admin\/catalog\/category/);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman kategori dengan tabel', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman kategori dengan tabel', async () => {
      // Verify page title / heading
      await expect(page.getByText('Kategori').first()).toBeVisible();

      // Check if table exists
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verify table headers
      const tableHeader = page.locator('thead');
      await expect(tableHeader.getByText('Kategori', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Kode', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Urutan', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Tambah kategori baru berhasil', async ({ page }) => {
    await test.step('Lakukan proses tambah kategori baru berhasil dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: 'Tambah Kategori' }).or(page.getByRole('button', { name: 'Tambah Kategori' })).first();
      await expect(addBtn).toBeVisible({ timeout: 15000 });
      await expect(addBtn).toBeEnabled({ timeout: 10000 });
      await addBtn.click();

      // Wait for form page to load
      await expect(page).toHaveURL(/.*\/admin\/catalog\/category\/add/, { timeout: 15000 });
      await waitForPageReady(page);

      // Fill form fields
      const categoryName = 'Test Cat ' + Date.now();
      const nameInput = page.getByPlaceholder('Masukkan Nama Kategori').or(page.getByLabel(/Nama/i)).first();
      await expect(nameInput).toBeVisible({ timeout: 10000 });
      await expect(nameInput).toBeEnabled();
      await nameInput.fill(categoryName);

      const codeInput = page.getByPlaceholder('Masukkan Kode').or(page.getByLabel(/Kode/i)).first();
      await expect(codeInput).toBeVisible({ timeout: 10000 });
      await expect(codeInput).toBeEnabled();
      await codeInput.fill('tc' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10));

      // Click Simpan button
      const saveBtn = page.getByRole('button', { name: 'Simpan' });
      await expect(saveBtn).toBeVisible();
      await expect(saveBtn).toBeEnabled();
      await saveBtn.click();

      // Verify returning to category list page and new item is visible
      await expect(page).toHaveURL(/\/admin\/catalog\/category$/, { timeout: 20000 });
      await waitForPageReady(page);
      await expect(page.locator('table').getByText(categoryName).first()).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-03] Edit kategori dengan ikon edit', async ({ page }) => {
    await test.step('Lakukan pengujian edit kategori dengan ikon edit dan verifikasi pembaruan data', async () => {
      await ensureCategoryExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const originalName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: originalName }).first();
      const editLink = targetRow.locator('a[href*="/edit/"]').first();
      await expect(editLink).toBeVisible({ timeout: 15000 });
      await editLink.click();

      // Wait for edit page to load
      await expect(page).toHaveURL(/.*\/admin\/catalog\/category\/edit\/.*/, { timeout: 15000 });
      await waitForPageReady(page);

      // Find name input and modify
      const updatedName = 'Updated Cat ' + Date.now();
      const nameInput = page.getByPlaceholder('Masukkan Nama Kategori').or(page.getByLabel(/Nama/i)).first();
      await expect(nameInput).toBeVisible({ timeout: 10000 });
      await expect(nameInput).toBeEnabled();
      await nameInput.fill(updatedName);

      // Save changes
      const saveBtn = page.getByRole('button', { name: 'Simpan' });
      await expect(saveBtn).toBeVisible();
      await expect(saveBtn).toBeEnabled();
      await saveBtn.click();

      // Verify returning to category list page
      await expect(page).toHaveURL(/\/admin\/catalog\/category$/, { timeout: 20000 });
      await waitForPageReady(page);
      await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-04] Hapus kategori dengan ikon trash', async ({ page }) => {
    await test.step('Lakukan proses hapus kategori dengan ikon trash dan konfirmasi penghapusan data', async () => {
      await ensureCategoryExists(page, 2);

      // Tunggu baris pertama yang memiliki teks nama kategori
      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const delCategoryName = (await targetCell.innerText()).trim();
      expect(delCategoryName.length).toBeGreaterThan(0);

      const targetRow = page.locator('table tbody tr').filter({ hasText: delCategoryName }).first();

      // Click trash button (last button in action cell)
      const deleteBtn = targetRow.locator('td').last().locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 10000 });
      await expect(deleteBtn).toBeEnabled({ timeout: 10000 });
      await deleteBtn.click();

      // Confirm deletion in modal
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      const confirmBtn = modal.getByRole('button', { name: 'Hapus' });
      await expect(confirmBtn).toBeVisible({ timeout: 5000 });
      await expect(confirmBtn).toBeEnabled({ timeout: 5000 });

      // Tunggu request DELETE ke backend selesai dengan status 200 OK
      const [response] = await Promise.all([
        page.waitForResponse(res => res.request().method() === 'DELETE' && res.status() === 200, { timeout: 15000 }),
        confirmBtn.click(),
      ]);
      expect(response.status()).toBe(200);

      // Verify modal is closed
      await expect(modal).not.toBeVisible({ timeout: 5000 });

      // Verify the specific category is no longer in the table
      await expect(page.locator('table').getByText(delCategoryName)).not.toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-05] Cari/filter kategori dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter kategori dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureCategoryExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const firstCategoryName = (await targetCell.innerText()).trim();
      expect(firstCategoryName.length).toBeGreaterThan(0);

      const searchInput = page.locator('input[placeholder="Cari Kategori"]').or(page.getByPlaceholder(/Cari/i)).first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // Search for the category name
      await searchInput.fill(firstCategoryName);

      // Verify table shows matching results
      const matchedRow = page.locator('table tbody tr').filter({ hasText: firstCategoryName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // Clear search
      await searchInput.clear();
      await expect(targetCell).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Lihat detail/terapkan menu kategori', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Lihat detail/terapkan menu kategori', async () => {
      await ensureCategoryExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const catName = (await targetCell.innerText()).trim();
      const targetRow = page.locator('table tbody tr').filter({ hasText: catName }).first();

      // "Terapkan Menu" is a link tag: a[href*="/set-product"]
      const terapkanLink = targetRow.getByRole('link', { name: /Terapkan Menu/i }).or(targetRow.locator('a[href*="/set-product"]')).first();
      await expect(terapkanLink).toBeVisible({ timeout: 10000 });
      await terapkanLink.click();

      // Verify navigation to set-product page
      await expect(page).toHaveURL(/.*\/set-product/, { timeout: 15000 });
      await expect(page.getByText(/Terapkan Menu|Pilih Menu|Daftar Menu|Menu/i).first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-07] Verifikasi status toggle kategori memunculkan konfirmasi', async ({ page }) => {
    await test.step('Verifikasi status toggle kategori memunculkan konfirmasi', async () => {
      await ensureCategoryExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const catName = (await targetCell.innerText()).trim();
      const targetRow = page.locator('table tbody tr').filter({ hasText: catName }).first();

      const switchWrapper = targetRow.locator('.mantine-Switch-root, label:has(input[type="checkbox"]), .mantine-Switch-track').first();
      await expect(switchWrapper).toBeVisible({ timeout: 10000 });

      // Click toggle to trigger status change modal
      await switchWrapper.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Nonaktifkan Status|Aktifkan Status|Status/i).first()).toBeVisible();

      // Safely dismiss modal using Batal button
      const cancelBtn = modal.getByRole('button', { name: 'Batal' });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });
});
