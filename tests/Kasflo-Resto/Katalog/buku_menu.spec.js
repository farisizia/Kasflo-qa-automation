const { test, expect } = require('@playwright/test');

test.describe('Buku Menu', () => {
  // Helper selector for actual data rows (excluding the empty "No results found" placeholder row)
  function getDataRows(page) {
    return page.locator('table tbody tr:not(:has-text("No results found"))');
  }

  // Shared login helper
  async function loginBeforeTest(page) {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByLabel(/Email atau Username/i)).toBeVisible({ timeout: 15000 });

    await page.getByLabel(/Email atau Username/i).fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await loginBtn.click();

    // Wait for client-side navigation to admin area
    await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
    return page;
  }

  // Helper to create a book menu
  async function createBookMenu(page, bookMenuName) {
    const addBtn = page.getByRole('link', { name: 'Tambah Buku Menu' }).or(page.getByRole('button', { name: 'Tambah Buku Menu' })).first();
    await expect(addBtn).toBeVisible({ timeout: 15000 });
    await addBtn.click();

    await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/add/, { timeout: 15000 });

    // 1. Nama Buku Menu
    const nameInput = page.getByPlaceholder('Masukkan Nama Buku Menu').or(page.getByLabel(/Nama Buku Menu/i)).first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await nameInput.fill(bookMenuName);

    // 2. Pilih Cabang jika ada (optional)
    const branchInput = page.locator('input[placeholder*="Pilih Cabang"], input[placeholder*="Cabang"]').first();
    if (await branchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await branchInput.click().catch(() => {});
      const branchOption = page.locator('[role="option"]:visible, .mantine-MultiSelect-option:visible, [data-combobox-option]:visible').first();
      if (await branchOption.isVisible({ timeout: 2000 }).catch(() => false)) {
        await branchOption.click().catch(() => {});
      }
    }

    // 3. Aktifkan minimal 1 menu jika tersedia di tabel
    const menuRow = page.locator('table tbody tr').first();
    if (await menuRow.isVisible({ timeout: 3000 }).catch(() => false)) {
      const switchEl = menuRow.locator('.mantine-Switch-root, input[type="checkbox"]').first();
      if (await switchEl.isVisible({ timeout: 2000 }).catch(() => false)) {
        await switchEl.click().catch(() => {});
      }
    }

    // 4. Klik Simpan
    const saveBtn = page.getByRole('button', { name: 'Simpan' });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();

    await expect(page).toHaveURL(/\/admin\/catalog\/book-menu$/, { timeout: 20000 });
  }

  // Ensure at least 1 book menu exists
  async function ensureBookMenuExists(page) {
    const dataRows = getDataRows(page);
    if (await dataRows.count() === 0) {
      await createBookMenu(page, 'Buku Menu ' + Date.now());
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to book-menu page
      await page.goto('/admin/catalog/book-menu', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify book-menu page loaded
      await expect(page).toHaveURL(/\/admin\/catalog\/book-menu/);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman buku menu dengan tabel', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman buku menu dengan tabel', async () => {
      // Verify page title
      await expect(page.getByText('Buku Menu').first()).toBeVisible();

      // Check if table exists
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verify table headers
      const tableHeader = page.locator('thead');
      await expect(tableHeader.getByText('Nama Buku Menu', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Cabang', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Tambah buku menu baru berhasil', async ({ page }) => {
    await test.step('Lakukan proses tambah buku menu baru berhasil dan pastikan data tersimpan', async () => {
      const bookMenuName = 'Test Buku Menu ' + Date.now();
      await createBookMenu(page, bookMenuName);

      // Verify created book menu is visible in table
      await expect(page.locator('table').getByText(bookMenuName).first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-03] Edit buku menu dengan ikon edit', async ({ page }) => {
    await test.step('Lakukan pengujian edit buku menu dengan ikon edit dan verifikasi pembaruan data', async () => {
      await ensureBookMenuExists(page);

      // Tunggu baris pertama yang memiliki teks nama buku menu
      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const currentName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: currentName }).first();
      const editLink = targetRow.locator('a[href*="/edit/"]').first();
      await expect(editLink).toBeVisible({ timeout: 15000 });
      await editLink.click();

      // Wait for edit page to load
      await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/edit\/.*/, { timeout: 15000 });

      // Modify name
      const updatedName = 'Updated BM ' + Math.floor(Math.random() * 1000);
      const nameInput = page.getByPlaceholder('Masukkan Nama Buku Menu').or(page.getByLabel(/Nama Buku Menu/i)).first();
      await expect(nameInput).toBeVisible({ timeout: 10000 });
      await nameInput.fill(updatedName);

      // Save changes (support both 'Update' and 'Simpan')
      const saveBtn = page.getByRole('button', { name: 'Update' }).or(page.getByRole('button', { name: 'Simpan' }));
      await expect(saveBtn).toBeVisible();
      await saveBtn.click();

      // Verify returning to book menu list page
      await expect(page).toHaveURL(/\/admin\/catalog\/book-menu$/, { timeout: 20000 });
      await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-04] Hapus buku menu dengan ikon trash', async ({ page }) => {
    await test.step('Lakukan proses hapus buku menu dengan ikon trash dan konfirmasi penghapusan data', async () => {
      await ensureBookMenuExists(page);

      // Tunggu baris pertama yang memiliki teks nama buku menu
      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const bmNameToDelete = (await targetCell.innerText()).trim();
      expect(bmNameToDelete.length).toBeGreaterThan(0);

      const targetRow = page.locator('table tbody tr').filter({ hasText: bmNameToDelete }).first();

      // Klik tombol trash pada baris buku menu tersebut
      const deleteBtn = targetRow.locator('td').last().locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 10000 });
      await deleteBtn.click();

      // Modal dialog konfirmasi harus muncul
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Hapus Buku Menu|Apakah anda yakin/i).first()).toBeVisible();

      const confirmBtn = modal.getByRole('button', { name: 'Hapus' });
      await expect(confirmBtn).toBeVisible({ timeout: 5000 });

      // Tunggu request DELETE ke backend selesai dengan response 200 OK
      const [response] = await Promise.all([
        page.waitForResponse(res => res.request().method() === 'DELETE' && res.status() === 200, { timeout: 15000 }),
        confirmBtn.click(),
      ]);
      expect(response.status()).toBe(200);

      // Pastikan modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });

      // Verifikasi bahwa buku menu yang dihapus tidak lagi ada di tabel
      await expect(page.locator('table').getByText(bmNameToDelete)).not.toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-05] Cari/filter buku menu dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter buku menu dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureBookMenuExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const firstBMName = (await targetCell.innerText()).trim();
      expect(firstBMName.length).toBeGreaterThan(0);

      const searchInput = page.locator('input[placeholder="Cari Buku Menu..."]').or(page.getByPlaceholder(/Cari/i)).first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // Search for first book menu name
      await searchInput.fill(firstBMName);

      // Verify table shows matching results
      const matchedRow = page.locator('table tbody tr').filter({ hasText: firstBMName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // Clear search
      await searchInput.clear();
      await expect(page.locator('table tbody tr').filter({ hasText: firstBMName }).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Verifikasi status toggle buku menu memunculkan konfirmasi', async ({ page }) => {
    await test.step('Verifikasi status toggle buku menu memunculkan konfirmasi', async () => {
      await ensureBookMenuExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const firstBMName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: firstBMName }).first();
      const switchWrapper = targetRow.locator('.mantine-Switch-root, label:has(input[type="checkbox"]), .mantine-Switch-track').first();
      await expect(switchWrapper).toBeVisible({ timeout: 10000 });

      // Click toggle to trigger modal
      await switchWrapper.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Nonaktifkan Buku Menu|Aktifkan Buku Menu|Buku Menu|Status/i).first()).toBeVisible();

      // Safely dismiss modal using Batal button
      const cancelBtn = modal.getByRole('button', { name: 'Batal' });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-07] Lihat detail buku menu dengan ikon view', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Lihat detail buku menu dengan ikon view', async () => {
      await ensureBookMenuExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const bmName = (await targetCell.innerText()).trim();

      const targetRow = page.locator('table tbody tr').filter({ hasText: bmName }).first();
      const viewLink = targetRow.locator('a[href*="/detail/"]').first();
      await expect(viewLink).toBeVisible({ timeout: 10000 });
      await viewLink.click();

      // Wait for detail page to load (/admin/catalog/book-menu/detail/<id>)
      await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/detail\/.*/, { timeout: 15000 });

      // Verify book menu name or details appear on detail page
      if (bmName) {
        await expect(page.getByText(bmName, { exact: false }).first()).toBeVisible({ timeout: 10000 });
      }
    
    });
  });
});
