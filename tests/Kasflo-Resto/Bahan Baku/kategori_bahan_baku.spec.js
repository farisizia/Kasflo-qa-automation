const { test, expect } = require('@playwright/test');

test.describe('Kategori Bahan Baku', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  // Shared resilient login helper
  async function loginBeforeTest(page) {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const emailInput = page.getByLabel(/Email atau Username/i);
    await expect(emailInput).toBeVisible({ timeout: 15000 });

    await emailInput.fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeEnabled({ timeout: 5000 });
    await loginBtn.click();

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        if (await loginBtn.isEnabled().catch(() => false)) {
          await loginBtn.click({ timeout: 3000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      }
    }
    return page;
  }

  // Helper to ensure at least one ingredient category exists
  async function ensureIngredientCategoryExists(page) {
    const emptyState = page.locator('table tbody tr', { hasText: /Belum Ada Data|No results found/i });
    const hasEmpty = await emptyState.isVisible().catch(() => false);
    if (hasEmpty) {
      const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 10000 });

      const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
      const catName = 'Init Kat Bahan ' + Date.now();
      await nameInput.fill(catName);

      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
      await simpanBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 15000 });
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Ingredient Category page
      await page.goto('/admin/ingredients/category', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/ingredients\/category/);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman kategori bahan baku dengan tabel dan header yang sesuai', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman kategori bahan baku dengan tabel dan header yang sesuai', async () => {
      // Verify page heading / breadcrumb
      await expect(page.getByText('Kategori Bahan Baku').first()).toBeVisible();

      // Check table visibility
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verify table headers
      const thead = page.locator('thead');
      await expect(thead.getByText('Nama Kategori', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Bahan Baku', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();

      // Verify Add button exists
      const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
      await expect(addBtn).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-02] Tambah kategori bahan baku baru berhasil via modal', async ({ page }) => {
    await test.step('Lakukan proses tambah kategori bahan baku baru berhasil via modal dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();

      // Verify modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText('Tambah Kategori').first()).toBeVisible({ timeout: 5000 });

      // Fill form field
      const catName = 'Kat Bahan ' + Date.now();
      const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
      await expect(nameInput).toBeVisible({ timeout: 5000 });
      await nameInput.fill(catName);

      // Click Simpan and wait for POST request response 200 OK
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible();

      const [response] = await Promise.all([
        page.waitForResponse(res => res.url().includes('/ingredients/categories') && res.request().method() === 'POST' && res.status() === 200, { timeout: 20000 }),
        simpanBtn.click(),
      ]);
      expect(response.status()).toBe(200);

      // Verify modal is closed
      await expect(modal).not.toBeVisible({ timeout: 10000 });

      // Search for created category to handle pagination/sorting
      const searchInput = page.getByPlaceholder('Cari disini...');
      if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await searchInput.fill(catName);
        await page.waitForTimeout(500);
      }

      // Verify created category is visible in table
      const targetCell = page.locator('table tbody tr').filter({ hasText: catName });
      await expect(targetCell.first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-03] Validasi input nama kategori kosong pada modal tambah', async ({ page }) => {
    await test.step('Validasi input nama kategori kosong pada modal tambah', async () => {
      const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Leave name input empty and click Simpan
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
      await simpanBtn.click();

      // Verify modal remains open
      await expect(modal).toBeVisible({ timeout: 3000 });

      // Close modal with Batal
      const cancelBtn = modal.getByRole('button', { name: /Batal/i });
      await cancelBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-04] Edit kategori bahan baku berhasil via modal edit', async ({ page }) => {
    await test.step('Lakukan pengujian edit kategori bahan baku berhasil via modal edit dan verifikasi pembaruan data', async () => {
      await ensureIngredientCategoryExists(page);

      // Get the first valid category row
      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const originalName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: originalName }).first();

      // Action 1 (pencil / edit button is the second button in action cell)
      const editBtn = targetRow.locator('button').nth(1);
      await expect(editBtn).toBeVisible({ timeout: 10000 });
      await editBtn.click();

      // Verify edit modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText('Edit Kategori').first()).toBeVisible({ timeout: 5000 });

      // Update category name
      const updatedName = 'Updated Kat ' + Math.floor(Math.random() * 1000);
      const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
      await expect(nameInput).toBeVisible({ timeout: 5000 });
      await nameInput.fill(updatedName);

      // Click Simpan and wait for PUT/PATCH response
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
      const [response] = await Promise.all([
        page.waitForResponse(res => res.url().includes('/ingredients/categories') && (res.request().method() === 'PUT' || res.request().method() === 'PATCH') && res.status() === 200, { timeout: 20000 }),
        simpanBtn.click(),
      ]);
      expect(response.status()).toBe(200);

      // Verify modal closed and updated text appears in table
      await expect(modal).not.toBeVisible({ timeout: 10000 });
      const updatedCell = page.locator('table tbody tr td:first-child').filter({ hasText: updatedName });
      await expect(updatedCell.first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-05] Hapus kategori bahan baku dengan ikon trash', async ({ page }) => {
    await test.step('Lakukan proses hapus kategori bahan baku dengan ikon trash dan konfirmasi penghapusan data', async () => {
      await ensureIngredientCategoryExists(page);

      // Get the first valid category row
      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const delCategoryName = (await targetCell.innerText()).trim();
      expect(delCategoryName.length).toBeGreaterThan(0);

      const targetRow = page.locator('table tbody tr').filter({ hasText: delCategoryName }).first();

      // Action 2 (trash button is the last button in row)
      const deleteBtn = targetRow.locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 10000 });
      await deleteBtn.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Hapus Kategori Bahan Baku|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });

      // Click confirm delete and await DELETE response
      const confirmBtn = modal.getByRole('button', { name: /Hapus|Ya/i }).first();
      await expect(confirmBtn).toBeVisible();

      const [response] = await Promise.all([
        page.waitForResponse(res => res.url().includes('/ingredients/categories') && res.request().method() === 'DELETE' && res.status() === 200, { timeout: 20000 }),
        confirmBtn.click(),
      ]);
      expect(response.status()).toBe(200);

      // Verify modal closed
      await expect(modal).not.toBeVisible({ timeout: 10000 });

      // Verify deleted item is no longer visible in table
      await expect(page.locator('table').getByText(delCategoryName)).not.toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-06] Cari/filter kategori bahan baku dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter kategori bahan baku dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureIngredientCategoryExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const catName = (await targetCell.innerText()).trim();
      expect(catName.length).toBeGreaterThan(0);

      const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari disini/i)).first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // 1. Search with matching term
      await searchInput.fill(catName);
      const matchedRow = page.locator('table tbody tr').filter({ hasText: catName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // 2. Search with non-existent keyword
      await searchInput.fill('XYZTermNotExist999');
      await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });

      // 3. Clear search and verify original row is visible again
      await searchInput.clear();
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-07] Membuka modal terapkan ke bahan baku dan memverifikasi komponennya', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal terapkan ke bahan baku dan memverifikasi komponennya', async () => {
      await ensureIngredientCategoryExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const targetRow = page.locator('table tbody tr').filter({ hasText: (await targetCell.innerText()).trim() }).first();

      // Action 0 is the first button in row ("Terapkan ke Bahan Baku")
      const terapkanBtn = targetRow.locator('button').first();
      await expect(terapkanBtn).toBeVisible({ timeout: 10000 });
      await terapkanBtn.click();

      // Verify modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText('Terapkan ke Bahan Baku').first()).toBeVisible({ timeout: 5000 });

      // Verify action buttons exist in modal
      await expect(modal.getByRole('button', { name: /Batal/i })).toBeVisible();
      await expect(modal.getByRole('button', { name: /Simpan/i })).toBeVisible();

      // Close modal with Batal
      await modal.getByRole('button', { name: /Batal/i }).click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-08] Tombol batal pada modal tambah/edit menutup modal tanpa menyimpan perubahan', async ({ page }) => {
    await test.step('Lakukan pengujian tombol batal pada modal tambah/edit menutup modal tanpa menyimpan perubahan dan verifikasi pembaruan data', async () => {
      const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Fill temporary name
      const tempName = 'Batal Name ' + Date.now();
      await modal.getByPlaceholder('Masukkan Nama Kategori').fill(tempName);

      // Click Batal
      const cancelBtn = modal.getByRole('button', { name: /Batal/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      // Verify modal closed
      await expect(modal).not.toBeVisible({ timeout: 5000 });

      // Verify temporary name was NOT saved in table
      await expect(page.locator('table').getByText(tempName)).not.toBeVisible({ timeout: 5000 });
    
    });
  });
});
