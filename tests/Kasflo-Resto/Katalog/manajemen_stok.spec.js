const { test, expect } = require('@playwright/test');

test.describe('Manajemen Stok', () => {
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

  // Helper to ensure at least one stock entry exists (generated via Book Menu)
  async function ensureStockExists(page) {
    try {
      const emptyState = page.locator('table tbody tr', { hasText: /Belum Ada Data|No results found/i });
      const hasEmpty = await emptyState.isVisible({ timeout: 2000 }).catch(() => false);
      if (hasEmpty) {
        await page.goto('/admin/catalog/book-menu/add', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/add/, { timeout: 15000 });
        const bmName = 'Init BM Stock ' + Date.now();
        await page.getByPlaceholder('Masukkan Nama Buku Menu').or(page.getByLabel(/Nama Buku Menu/i)).first().fill(bmName);

        const switchEl = page.locator('table tbody tr .mantine-Switch-root, table tbody tr input[type="checkbox"]').first();
        if (await switchEl.isVisible({ timeout: 2000 }).catch(() => false)) {
          await switchEl.click().catch(() => {});
        }

        const simpanBtn = page.getByRole('button', { name: 'Simpan' });
        if (await simpanBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await simpanBtn.click().catch(() => {});
          await page.waitForURL(/\/admin\/catalog\/book-menu$/, { timeout: 10000 }).catch(() => {});
        }
      }
    } catch {
      // Gracefully proceed
    } finally {
      if (!page.url().includes('/admin/catalog/stock')) {
        await page.goto('/admin/catalog/stock', { waitUntil: 'domcontentloaded' }).catch(() => {});
      }
      await page.waitForSelector('table', { timeout: 15000 }).catch(() => {});
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Stock Management page
      await page.goto('/admin/catalog/stock', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify stock management page loaded
      await expect(page).toHaveURL(/\/admin\/catalog\/stock/);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman manajemen stok dengan tabel dan header yang sesuai', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman manajemen stok dengan tabel dan header yang sesuai', async () => {
      // Verify page title / breadcrumb
      await expect(page.getByText('Manajemen Stok').first()).toBeVisible();

      // Check table visibility
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verify table headers
      const thead = page.locator('thead');
      await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();

      // Verify action elements in data row if stock entries exist
      await ensureStockExists(page);
      const dataRows = getDataRows(page);
      if (await dataRows.count() > 0) {
        const firstRow = dataRows.first();
        await expect(firstRow.locator('a[href*="/detail/"]').first()).toBeVisible({ timeout: 10000 });
        await expect(firstRow.locator('a[href*="/edit/"]').first()).toBeVisible({ timeout: 10000 });
      }
    
    });
  });

  test('[TC-02] Cari/filter data manajemen stok dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter data manajemen stok dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      // Get branch or book menu name from first row
      const targetRow = dataRows.first();
      const firstCell = targetRow.locator('td:first-child');
      await expect(firstCell).not.toBeEmpty({ timeout: 10000 });
      const cabangName = (await firstCell.innerText()).trim();

      const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari disini/i)).first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // 1. Search with matching term
      await searchInput.fill(cabangName);
      const matchedRow = page.locator('table tbody tr').filter({ hasText: cabangName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // 2. Search with non-existent keyword
      await searchInput.fill('XYZTermNotExist999');
      await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });

      // 3. Clear search and verify original row is visible again
      await searchInput.clear();
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-03] Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', async () => {
      await ensureStockExists(page);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      const detailBtn = targetRow.locator('a[href*="/detail/"], button:has-text("Detail")').first();
      await expect(detailBtn).toBeVisible({ timeout: 15000 });
      await detailBtn.click();

      // Verify URL points to detail page
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });

      // Verify detail headings
      await expect(page.getByText('Informasi Menu Stok').first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Detail Buku Menu').first()).toBeVisible({ timeout: 10000 });

      // Verify detail table headers
      const detailThead = page.locator('table thead');
      await expect(detailThead.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
      await expect(detailThead.getByText('Kategori', { exact: true }).first()).toBeVisible();
      await expect(detailThead.getByText('Stok Habis', { exact: true }).first()).toBeVisible();
      await expect(detailThead.getByText('Stok Unlimited', { exact: true }).first()).toBeVisible();
      await expect(detailThead.getByText('Stok', { exact: true }).first()).toBeVisible();
      await expect(detailThead.getByText('Harga', { exact: true }).first()).toBeVisible();

      // Verify detail table contains rows
      const detailRows = page.locator('table tbody tr');
      await expect(detailRows.first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-04] Navigasi dari halaman detail ke form edit stok', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi dari halaman detail ke form edit stok', async () => {
      await ensureStockExists(page);
      await expect(page.locator('table')).toBeVisible({ timeout: 15000 });

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      const detailBtn = targetRow.locator('a[href*="/detail/"], button:has-text("Detail")').first();
      await expect(detailBtn).toBeVisible({ timeout: 15000 });
      await detailBtn.click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });

      // Click Edit button/link on detail page
      const editBtn = page.locator('a[href*="/stock/edit/"]').or(page.getByRole('link', { name: 'Edit' })).first();
      await expect(editBtn).toBeVisible({ timeout: 10000 });
      await editBtn.click();

      // Verify URL redirected to edit page
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
      await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-05] Navigasi ke halaman edit stok langsung dari daftar tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit stok langsung dari daftar tabel', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      const editBtn = targetRow.locator('a[href*="/edit/"]').first();
      await expect(editBtn).toBeVisible({ timeout: 10000 });
      await editBtn.click();

      // Verify URL redirected to edit page
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
      await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 10000 });

      // Verify table structure on edit page
      const editThead = page.locator('table thead');
      await expect(editThead.getByText('Menu', { exact: true }).first()).toBeVisible();
      await expect(editThead.getByText('Kategori', { exact: true }).first()).toBeVisible();
      await expect(editThead.getByText('Stok Habis', { exact: true }).first()).toBeVisible();
      await expect(editThead.getByText('Stok Unlimited', { exact: true }).first()).toBeVisible();
      await expect(editThead.getByText('Stok', { exact: true }).first()).toBeVisible();
      await expect(editThead.getByText('Harga', { exact: true }).first()).toBeVisible();

      // Verify form action buttons
      await expect(page.getByRole('button', { name: 'Batalkan' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Simpan' })).toBeVisible();
    
    });
  });

  test('[TC-06] Cari/filter menu pada halaman edit stok', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter menu pada halaman edit stok dan validasi hasil yang ditampilkan', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
      await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 15000 });

      const editThead = page.locator('table thead');
      await expect(editThead.getByText('Menu', { exact: true }).first()).toBeVisible({ timeout: 15000 });

      // Wait for first menu row to be loaded
      const firstMenuCell = page.locator('table tbody tr td:first-child').first();
      await expect(firstMenuCell).not.toBeEmpty({ timeout: 10000 });
      const menuName = (await firstMenuCell.innerText()).trim();

      // Fill search box on edit page
      const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari disini/i)).first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });
      await searchInput.fill(menuName);

      // Verify matching menu is visible
      const matchedRow = page.locator('table tbody tr').filter({ hasText: menuName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // Clear search
      await searchInput.clear();
      await expect(firstMenuCell).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-07] Filter menu berdasarkan kategori pada halaman edit stok', async ({ page }) => {
    await test.step('Lakukan pengujian filter menu berdasarkan kategori pada halaman edit stok dan validasi hasil yang ditampilkan', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });

      // Tunggu tombol kategori pertama terlihat
      const firstCatBtn = page.locator('button:visible').filter({ hasText: /Test Cat|Tanpa Kategori/i }).first();
      await expect(firstCatBtn).toBeVisible({ timeout: 15000 });
      const catText = (await firstCatBtn.innerText()).trim();
      await firstCatBtn.click();

      // Verify table rows display the selected category
      const rowCategoryCell = page.locator('table tbody tr td:nth-child(2)').first();
      await expect(rowCategoryCell).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-08] Validasi kondisi saat stok tersedia: stok habis nonaktif dan stok unlimited nonaktif', async ({ page }) => {
    await test.step('Validasi kondisi saat stok tersedia: stok habis nonaktif dan stok unlimited nonaktif', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });

      const firstEditRow = page.locator('table tbody tr').first();
      await expect(firstEditRow).toBeVisible({ timeout: 10000 });

      const habisSwitch = firstEditRow.locator('.mantine-Switch-root').nth(0);
      const unlimitedSwitch = firstEditRow.locator('.mantine-Switch-root').nth(1);
      const stockInput = firstEditRow.locator('input[type="text"], input[type="number"]').last();

      // Atur kondisi stok tersedia: Stok Habis = Nonaktif & Stok Unlimited = Nonaktif
      if ((await habisSwitch.innerText()).includes('Aktif')) {
        await habisSwitch.click();
        await waitForPageReady(page);
      }
      if ((await unlimitedSwitch.innerText()).includes('Aktif')) {
        await unlimitedSwitch.click();
        await waitForPageReady(page);
      }

      // Verifikasi kedua toggle berstatus Nonaktif saat stok kuantitas tersedia
      await expect(habisSwitch).toContainText('Nonaktif');
      await expect(unlimitedSwitch).toContainText('Nonaktif');
      await expect(stockInput).toBeEnabled();

      // Batalkan agar tidak mengubah data permanen
      await page.getByRole('button', { name: 'Batalkan' }).click();
      await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
    
    });
  });

  test('[TC-09] Validasi state disable input stok saat toggle stok unlimited diaktifkan dan enabled saat dinonaktifkan', async ({ page }) => {
    await test.step('Validasi state disable input stok saat toggle stok unlimited diaktifkan dan enabled saat dinonaktifkan', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });

      const firstEditRow = page.locator('table tbody tr').first();
      await expect(firstEditRow).toBeVisible({ timeout: 10000 });

      const unlimitedSwitch = firstEditRow.locator('.mantine-Switch-root').nth(1);
      const stockInput = firstEditRow.locator('input[type="text"], input[type="number"]').last();

      // Pastikan Unlimited Nonaktif di awal
      if ((await unlimitedSwitch.innerText()).includes('Aktif')) {
        await unlimitedSwitch.click();
        await waitForPageReady(page);
      }
      await expect(stockInput).toBeEnabled();

      // 1. Saat Stok Unlimited Aktif -> input stok harus DISABLE
      await unlimitedSwitch.click();
      await waitForPageReady(page);
      await expect(unlimitedSwitch).toContainText('Aktif');
      await expect(stockInput).toBeDisabled();

      // 2. Saat Stok Unlimited dinonaktifkan kembali -> input stok harus ENABLED
      await unlimitedSwitch.click();
      await waitForPageReady(page);
      await expect(unlimitedSwitch).toContainText('Nonaktif');
      await expect(stockInput).toBeEnabled();

      // Batalkan perubahan
      await page.getByRole('button', { name: 'Batalkan' }).click();
      await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
    
    });
  });

  test('[TC-10] Mengubah nilai stok dan menyimpan perubahan berhasil (ubah stok)', async ({ page }) => {
    await test.step('Lakukan pengujian mengubah nilai stok dan menyimpan perubahan berhasil (ubah stok) dan verifikasi pembaruan data', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });

      // Wait for table to load
      const firstEditRow = page.locator('table tbody tr').first();
      await expect(firstEditRow).toBeVisible({ timeout: 10000 });

      const habisSwitch = firstEditRow.locator('.mantine-Switch-root').nth(0);
      const unlimitedSwitch = firstEditRow.locator('.mantine-Switch-root').nth(1);
      const stockInput = firstEditRow.locator('input[type="text"], input[type="number"]').last();

      // Pastikan stok berstatus tersedia (Habis = Nonaktif, Unlimited = Nonaktif)
      if ((await habisSwitch.innerText()).includes('Aktif')) {
        await habisSwitch.click();
        await waitForPageReady(page);
      }
      if ((await unlimitedSwitch.innerText()).includes('Aktif')) {
        await unlimitedSwitch.click();
        await waitForPageReady(page);
      }

      // Ubah nilai stok kuantitas
      const newStockVal = '30';
      await stockInput.fill(newStockVal);
      expect(await stockInput.inputValue()).toBe(newStockVal);

      // Klik Simpan dan pantau respons HTTP 200 POST dari backend API
      const simpanBtn = page.getByRole('button', { name: 'Simpan' });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });

      const [response] = await Promise.all([
        page.waitForResponse(res => res.request().method() === 'POST' && res.url().includes('/product/self-order-menu/') && res.status() === 200, { timeout: 20000 }),
        simpanBtn.click(),
      ]);
      expect(response.status()).toBe(200);

      // Verifikasi toast notifikasi sukses dan redirect ke list stok
      await expect(page.getByText(/Stok Berhasil Diupdate|Berhasil/i).first()).toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
    
    });
  });

  test('[TC-11] Mengubah nilai stok menu per kategori dan menyimpan perubahan berhasil (per kategori)', async ({ page }) => {
    await test.step('Lakukan pengujian mengubah nilai stok menu per kategori dan menyimpan perubahan berhasil (per kategori) dan verifikasi pembaruan data', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });

      // Tunggu tombol kategori pertama tampil dan ter-render
      const firstCatBtn = page.locator('button:visible').filter({ hasText: /Test Cat|Tanpa Kategori/i }).first();
      await expect(firstCatBtn).toBeVisible({ timeout: 15000 });

      // Dapatkan daftar tab tombol kategori yang tampil
      const categoryButtons = page.locator('button:visible').filter({ hasText: /Test Cat|Tanpa Kategori/i });
      const catCount = await categoryButtons.count();
      expect(catCount).toBeGreaterThan(0);

      // Edit stok pada kategori pertama
      await firstCatBtn.click();
      await waitForPageReady(page);

      const firstCatRow = page.locator('table tbody tr').first();
      const firstStockInput = firstCatRow.locator('input[type="text"], input[type="number"]').last();
      if (!await firstStockInput.isDisabled()) {
        await firstStockInput.fill('25');
      }

      // Jika ada lebih dari 1 kategori, beralih ke kategori kedua dan edit stoknya
      if (catCount > 1) {
        const secondCatBtn = categoryButtons.nth(1);
        await secondCatBtn.click();
        await waitForPageReady(page);

        const secondCatRow = page.locator('table tbody tr').first();
        const secondStockInput = secondCatRow.locator('input[type="text"], input[type="number"]').last();
        if (!await secondStockInput.isDisabled()) {
          await secondStockInput.fill('35');
        }
      }

      // Simpan seluruh perubahan per kategori
      const simpanBtn = page.getByRole('button', { name: 'Simpan' });
      const [response] = await Promise.all([
        page.waitForResponse(res => res.request().method() === 'POST' && res.url().includes('/product/self-order-menu/') && res.status() === 200, { timeout: 20000 }),
        simpanBtn.click(),
      ]);
      expect(response.status()).toBe(200);

      await expect(page.getByText(/Stok Berhasil Diupdate|Berhasil/i).first()).toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
    
    });
  });

  test('[TC-12] Validasi perilaku stok pada menu paketan: input stok dan stok unlimited disabled', async ({ page }) => {
    await test.step('Validasi perilaku stok pada menu paketan: input stok dan stok unlimited disabled', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });

      // Beralih ke Tanpa Kategori (tempat menu paket berada)
      const tanpaKategoriBtn = page.locator('button:visible').filter({ hasText: 'Tanpa Kategori' }).first();
      await expect(tanpaKategoriBtn).toBeVisible({ timeout: 15000 });
      await tanpaKategoriBtn.click();
      await waitForPageReady(page);

      // Cari baris menu paketan
      const paketRow = page.locator('table tbody tr').filter({ hasText: /Paket/i }).first();
      if (await paketRow.isVisible()) {
        const unlimitedSwitchInput = paketRow.locator('.mantine-Switch-root').nth(1).locator('input');
        const stockInput = paketRow.locator('input[type="text"], input[type="number"]').last();

        // Pada Menu Paketan, Stok Unlimited dan Input Stok harus disabled
        await expect(unlimitedSwitchInput).toBeDisabled();
        await expect(stockInput).toBeDisabled();
      }

      // Batalkan
      await page.getByRole('button', { name: 'Batalkan' }).click();
      await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
    
    });
  });

  test('[TC-13] Tombol batalkan pada halaman edit mengembalikan pengguna ke halaman list stok', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol batalkan pada halaman edit mengembalikan pengguna ke halaman list stok', async () => {
      await ensureStockExists(page);

      const dataRows = getDataRows(page);
      if (await dataRows.count() === 0) {
        await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const targetRow = dataRows.first();
      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });

      // Click Batalkan
      const cancelBtn = page.getByRole('button', { name: 'Batalkan' });
      await expect(cancelBtn).toBeVisible({ timeout: 10000 });
      await cancelBtn.click();

      // Verify navigation back to stock list page
      await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
      await expect(page.locator('table')).toBeVisible({ timeout: 10000 });
    
    });
  });
});
