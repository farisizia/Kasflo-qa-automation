const { test, expect } = require('@playwright/test');

test.describe('Manajemen Menu', () => {
  // Helper selector for actual data rows (excluding the empty "No results found" placeholder row)
  function getDataRows(page) {
    return page.locator('table tbody tr:not(:has-text("No results found"))');
  }

  // Shared resilient login helper
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) {
      return page;
    }

    try {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 25000 });
    } catch {
      await page.goto('/', { waitUntil: 'commit', timeout: 25000 });
    }

    if (page.url().includes('/admin/')) {
      return page;
    }

    const emailInput = page.getByLabel(/Email atau Username/i);
    await expect(emailInput).toBeVisible({ timeout: 20000 });

    await emailInput.fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');
    await page.waitForTimeout(500);

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await loginBtn.click();

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await page.waitForTimeout(1000);
        if (await loginBtn.isVisible().catch(() => false)) {
          await loginBtn.click({ timeout: 5000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
      }
    }
    return page;
  }

  // Helper to create a single menu unit
  async function createMenuUnit(page, menuName) {
    const addBtn = page.getByRole('link', { name: 'Tambah Menu Satuan' }).or(page.getByRole('button', { name: 'Tambah Menu Satuan' })).first();
    await expect(addBtn).toBeVisible({ timeout: 15000 });
    await addBtn.click();

    await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/unit\/add/, { timeout: 15000 });

    const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await nameInput.fill(menuName);

    const codeInput = page.getByPlaceholder('Masukkan Kode Menu').or(page.getByLabel(/Kode Menu/i)).first();
    if (await codeInput.isVisible().catch(() => false)) {
      await codeInput.fill('TM' + Math.floor(Math.random() * 9999));
    }

    // Select Kategori dropdown
    const categoryInput = page.locator('input[placeholder*="Kategori"], [placeholder*="Pilih Kategori"]').first();
    if (await categoryInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await categoryInput.click();
      const firstOption = page.locator('[role="option"]').first();
      if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
        await firstOption.click();
      }
    }

    // Fill Harga (required in Buku Menu table if visible, or general input)
    const priceInput = page.locator('table input[placeholder*="Harga"], table input[type="text"]').last();
    if (await priceInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await priceInput.fill('15000');
    } else {
      const genericPriceInput = page.getByPlaceholder(/Harga/i).or(page.getByLabel(/Harga/i)).first();
      if (await genericPriceInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        await genericPriceInput.fill('15000');
      }
    }

    const saveBtn = page.getByRole('button', { name: 'Simpan' });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();

    await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 20000 });
  }

  // Ensure at least 1 menu exists for tests that inspect or view items
  async function ensureMenuExists(page) {
    const dataRows = getDataRows(page);
    if (await dataRows.count() === 0) {
      await createMenuUnit(page, 'Menu ' + Date.now());
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to menu page
      await page.goto('/admin/catalog/menu', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify menu page loaded
      await expect(page).toHaveURL(/\/admin\/catalog\/menu/);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman menu dengan tabel', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman menu dengan tabel', async () => {
      // Verify page title
      await expect(page.getByText('Menu').first()).toBeVisible();

      // Check if table exists
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verify table headers
      const tableHeader = page.locator('thead');
      await expect(tableHeader.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Kode', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Kategori', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
      await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Tambah menu satuan berhasil', async ({ page }) => {
    await test.step('Lakukan proses tambah menu satuan berhasil dan pastikan data tersimpan', async () => {
      const menuName = 'Test Menu ' + Date.now();
      await createMenuUnit(page, menuName);

      // Verify created menu is visible in table
      await expect(page.locator('table').getByText(menuName).first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-03] Tambah menu paketan berhasil', async ({ page }) => {
    await test.step('Lakukan proses tambah menu paketan berhasil dan pastikan data tersimpan', async () => {
      // Beralih ke tab Menu Paketan
      const menuPaketanTab = page.getByRole('tab', { name: 'Menu Paketan' });
      await expect(menuPaketanTab).toBeVisible({ timeout: 10000 });
      await menuPaketanTab.click();

      // Klik tombol Tambah Menu Paketan
      const addPackageBtn = page.getByRole('link', { name: 'Tambah Menu Paketan' }).or(page.getByRole('button', { name: 'Tambah Menu Paketan' })).first();
      await expect(addPackageBtn).toBeVisible({ timeout: 10000 });
      await addPackageBtn.click();

      // Verifikasi navigasi ke halaman form tambah menu paketan
      await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/package\/add/, { timeout: 15000 });

      const packageName = 'Paket Hemat ' + Date.now();

      // 1. Isi Nama Menu Paketan
      const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
      await expect(nameInput).toBeVisible({ timeout: 10000 });
      await nameInput.fill(packageName);

      // 2. Isi Kode Menu
      const codeInput = page.getByPlaceholder('Masukkan Kode Menu').or(page.getByLabel(/Kode Menu/i)).first();
      if (await codeInput.isVisible().catch(() => false)) {
        await codeInput.fill('PKT' + Math.floor(Math.random() * 9999));
      }

      // 3. Isi Harga pada tabel Buku Menu
      const priceInput = page.locator('table').first().locator('input[type="text"]').first();
      await expect(priceInput).toBeVisible({ timeout: 10000 });
      await priceInput.fill('25000');

      // 4. Pilih Isi Menu Paket
      const selectMenuInput = page.locator('input[placeholder*="Pilih Menu"]').first();
      await expect(selectMenuInput).toBeVisible({ timeout: 10000 });
      await selectMenuInput.click();

      // Pilih opsi pertama yang aktif dari dropdown
      const visibleDropdown = page.locator('.mantine-Select-dropdown:visible, .mantine-Combobox-dropdown:visible, [data-combobox-dropdown]:visible').first();
      const firstOption = visibleDropdown.locator('[role="option"]').first();
      await expect(firstOption).toBeVisible({ timeout: 5000 });
      await firstOption.click();

      // 5. Isi Qty isi paket
      const isiPaketTable = page.locator('table').nth(1);
      const qtyInput = isiPaketTable.locator('input[type="text"], input[type="number"]').last();
      await expect(qtyInput).toBeVisible({ timeout: 5000 });
      await qtyInput.fill('1');

      // 6. Klik tombol Simpan
      const saveBtn = page.getByRole('button', { name: 'Simpan' });
      await expect(saveBtn).toBeVisible();
      await saveBtn.click();

      // Verifikasi berhasil disimpan dan kembali ke list menu
      await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 20000 });
      await expect(page.getByText(/Berhasil|Success/i).first()).toBeVisible({ timeout: 10000 });

      // Buka tab Menu Paketan dan pastikan paket baru tampil
      await menuPaketanTab.click();
      await expect(page.locator('table').getByText(packageName).first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-04] Edit menu dengan ikon edit', async ({ page }) => {
    await test.step('Lakukan pengujian edit menu dengan ikon edit dan verifikasi pembaruan data', async () => {
      await ensureMenuExists(page);

      const dataRows = getDataRows(page);
      const firstRow = dataRows.first();
      const editLink = firstRow.locator('a[href*="/edit/"]').first();
      await expect(editLink).toBeVisible({ timeout: 15000 });
      await editLink.click();

      // Wait for edit page to load
      await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/unit\/edit\/.*/, { timeout: 15000 });

      // Find name input and modify
      const updatedName = 'Updated Menu ' + Math.floor(Math.random() * 1000);
      const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
      await expect(nameInput).toBeVisible({ timeout: 10000 });
      await nameInput.fill(updatedName);

      // Save changes
      const saveBtn = page.getByRole('button', { name: 'Simpan' });
      await expect(saveBtn).toBeVisible();
      await saveBtn.click();

      // Verify returning to menu list page
      await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 20000 });
      await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-05] Hapus menu dengan ikon trash', async ({ page }) => {
    await test.step('Lakukan proses hapus menu dengan ikon trash dan konfirmasi penghapusan data', async () => {
      // Pastikan ada menu di tabel
      await ensureMenuExists(page);

      // Tunggu baris pertama yang memiliki teks nama menu (mencegah pembacaan sel kosong akibat virtualisasi tabel)
      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const menuNameToDelete = (await targetCell.innerText()).trim();
      expect(menuNameToDelete.length).toBeGreaterThan(0);

      const targetRow = page.locator('table tbody tr').filter({ hasText: menuNameToDelete }).first();

      // Klik tombol trash pada baris menu tersebut
      const deleteBtn = targetRow.locator('td').last().locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 10000 });
      await deleteBtn.click();

      // Modal dialog konfirmasi harus muncul
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Hapus Menu Satuan|Apakah anda yakin/i).first()).toBeVisible();

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

      // Verifikasi bahwa menu yang dihapus tidak lagi ada di tabel
      await expect(page.locator('table').getByText(menuNameToDelete)).not.toBeVisible({ timeout: 10000 });

      // Verifikasi ulang lewat search box untuk memastikan data benar-benar terhapus di backend
      const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari/i)).first();
      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill(menuNameToDelete);
        await expect(page.locator('table').getByText(menuNameToDelete)).not.toBeVisible({ timeout: 5000 });
        await searchInput.clear();
      }
    
    });
  });

  test('[TC-06] Cari/filter menu dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter menu dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureMenuExists(page);

      const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
      await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      const firstMenuName = (await targetCell.innerText()).trim().split('\n')[0].trim();
      expect(firstMenuName.length).toBeGreaterThan(0);

      const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari/i)).first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // Search for first menu name
      await searchInput.fill(firstMenuName);
      await page.waitForTimeout(500);

      // Verify table shows matching results
      const matchedRow = page.locator('table tbody tr').filter({ hasText: firstMenuName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // Clear search
      await searchInput.clear();
      await page.waitForTimeout(500);
      await expect(targetCell).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-07] Switch tab Menu Satuan ↔ Menu Paketan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Switch tab Menu Satuan ↔ Menu Paketan', async () => {
      const menuSatuanTab = page.getByRole('tab', { name: 'Menu Satuan' });
      await expect(menuSatuanTab).toBeVisible({ timeout: 10000 });

      const menuPaketanTab = page.getByRole('tab', { name: 'Menu Paketan' });
      await expect(menuPaketanTab).toBeVisible({ timeout: 10000 });
      await menuPaketanTab.click();

      // Verify tab switched to Menu Paketan
      await expect(menuPaketanTab).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });

      // Switch back to Menu Satuan tab
      await menuSatuanTab.click();
      await expect(menuSatuanTab).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
      await expect(page.locator('table')).toBeVisible();
    
    });
  });

  test('[TC-08] Verifikasi status toggle menu aktif/non-aktif', async ({ page }) => {
    await test.step('Verifikasi status toggle menu aktif/non-aktif', async () => {
      await ensureMenuExists(page);

      const firstRow = getDataRows(page).first();
      const switchWrapper = firstRow.locator('.mantine-Switch-root, label:has(input[type="checkbox"]), .mantine-Switch-track').first();
      await expect(switchWrapper).toBeVisible({ timeout: 10000 });

      // Click toggle to trigger modal
      await switchWrapper.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content');
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Nonaktifkan Menu|Aktifkan Menu|Menu/i).first()).toBeVisible();

      // Safely dismiss modal using Batal button
      const cancelBtn = modal.getByRole('button', { name: 'Batal' });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-09] Lihat detail menu dengan ikon view', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Lihat detail menu dengan ikon view', async () => {
      await ensureMenuExists(page);

      const firstRow = getDataRows(page).first();
      const menuName = (await firstRow.locator('td').first().textContent() || '').trim();

      // View button is a link with href containing /detail/
      const viewLink = firstRow.locator('a[href*="/detail/"]').first();
      await expect(viewLink).toBeVisible({ timeout: 10000 });
      await viewLink.click();

      // Wait for detail page to load (/admin/catalog/menu/detail/<id>)
      await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/detail\/.*/, { timeout: 15000 });

      // Verify menu name or content appears on detail page
      if (menuName) {
        await expect(page.getByText(menuName, { exact: false }).first()).toBeVisible({ timeout: 10000 });
      }
    
    });
  });
});
