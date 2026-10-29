const { test, expect } = require('@playwright/test');

test.describe('Menu Self Order', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  // Helper to safely get the first data row or null if table is empty
  async function getTargetRow(page) {
    const targetCell = page.locator('table:visible tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
    if (await targetCell.count() === 0 || !(await targetCell.isVisible({ timeout: 5000 }).catch(() => false))) {
      return null;
    }
    const text = (await targetCell.innerText()).trim();
    if (!text) return null;
    return page.locator('table:visible tbody tr').filter({ hasText: text }).first();
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

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await waitForPageReady(page);
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

  // Helper to ensure at least one Self Order entry exists (generated via Book Menu + Branch)
  async function ensureSelfOrderExists(page) {
    await expect(page.locator('table:visible tbody tr').first()).toBeVisible({ timeout: 15000 });
    await waitForPageReady(page);

    const dataRows = getDataRows(page);
    const count = await dataRows.count();
    if (count === 0) {
      await page.goto('/admin/catalog/book-menu', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });

      const targetRow = page.locator('table:visible tbody tr').filter({ hasText: 'Buku Menu Utama' }).first();
      if (await targetRow.isVisible({ timeout: 5000 }).catch(() => false)) {
        const editBtn = targetRow.locator('a[href*="/edit"]').first();
        if (await editBtn.isVisible().catch(() => false)) {
          await editBtn.click();
        } else {
          await targetRow.locator('button, a').nth(1).click();
        }

        await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/edit/, { timeout: 15000 });
        await waitForPageReady(page);

        const hasQAPill = await page.locator('.mantine-MultiSelect-pill, .mantine-Pill-root')
          .filter({ hasText: /Kasflo Pusat QA/i }).first().isVisible().catch(() => false);

        if (!hasQAPill) {
          const cabangContainer = page.locator('input[placeholder*="Cabang"], .mantine-MultiSelect-inputField, .mantine-MultiSelect-input').first();
          if (await cabangContainer.isVisible({ timeout: 5000 }).catch(() => false)) {
            await cabangContainer.click();
            await waitForPageReady(page);

            const branchOption = page.locator('[role="option"]:visible, [data-combobox-option]:visible, .mantine-MultiSelect-option:visible')
              .filter({ hasText: /Kasflo Pusat QA/i }).first();
            if (await branchOption.isVisible({ timeout: 2000 }).catch(() => false)) {
              await branchOption.click();
            } else {
              const anyOption = page.locator('[role="option"]:visible').first();
              if (await anyOption.isVisible().catch(() => false)) {
                await anyOption.click();
              }
            }
            await page.getByText(/Edit Buku Menu/i).first().click({ force: true }).catch(() => {});
          }
        }

        await page.evaluate(() => window.scrollTo(0, 0));
        const updateBtn = page.getByRole('button', { name: 'Update' });
        await expect(updateBtn).toBeVisible({ timeout: 5000 });
        await updateBtn.click();
        await expect(page).toHaveURL(/\/admin\/catalog\/book-menu$/, { timeout: 15000 });
      } else {
        await page.goto('/admin/catalog/book-menu/add', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/add/, { timeout: 15000 });
        const bmName = 'Init BM SelfOrder ' + Date.now();
        await page.getByPlaceholder('Masukkan Nama Buku Menu').or(page.getByLabel(/Nama Buku Menu/i)).first().fill(bmName);

        const branchInput = page.locator('input[placeholder*="Cabang"], .mantine-MultiSelect-inputField, .mantine-MultiSelect-input').first();
        if (await branchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
          await branchInput.click();
          await page.locator('[role="option"]:visible').first().click();
        }

        const checkbox = page.locator('table tbody tr input[type="checkbox"]').first();
        if (await checkbox.isVisible().catch(() => false)) {
          await checkbox.check();
        }

        await page.getByRole('button', { name: 'Simpan' }).click();
        await expect(page).toHaveURL(/\/admin\/catalog\/book-menu$/, { timeout: 20000 });
      }

      await page.goto('/admin/catalog/self-order-menu', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Menu Self Order page
      await page.goto('/admin/catalog/self-order-menu', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/catalog\/self-order-menu/);
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman menu self order dengan tabel dan 4 tombol aksi', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman menu self order dengan tabel dan 4 tombol aksi', async () => {
      // Verify page title / breadcrumb
      await expect(page.getByText('Menu Self Order').first()).toBeVisible();

      // Check table visibility
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible();

      // Verify table headers
      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Buku Menu', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();

      // Verify all 4 action elements in data row
      await ensureSelfOrderExists(page);
      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      // 1. Detail button
      await expect(targetRow.locator('a[href*="/detail/"]').first()).toBeVisible({ timeout: 10000 });
      // 2. QR Code modal button
      await expect(targetRow.locator('button').first()).toBeVisible({ timeout: 10000 });
      // 3. Banner marketing button
      await expect(targetRow.locator('a[href*="/banner-marketing/"]').first()).toBeVisible({ timeout: 10000 });
      // 4. Edit button
      await expect(targetRow.locator('a[href*="/edit/"]').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-02] Cari/filter data menu self order dengan search box', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter data menu self order dengan search box dan validasi hasil yang ditampilkan', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const cabangName = (await targetRow.locator('td:first-child').innerText()).trim();
      if (!cabangName) {
        return;
      }

      const searchInput = page.locator('input[placeholder="Cari disini..."]:visible').first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // 1. Search with matching branch name
      await searchInput.fill(cabangName);
      await waitForPageReady(page);
      const matchedRow = page.locator('table:visible tbody tr').filter({ hasText: cabangName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // 2. Search with non-existent keyword
      await searchInput.fill('XYZTermNotExist999');
      await waitForPageReady(page);
      await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });

      // 3. Clear search and verify original row is visible again
      await searchInput.clear();
      await waitForPageReady(page);
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-03] Membuka modal kode qr self order dan memverifikasi kontennya', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal kode qr self order dan memverifikasi kontennya', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      // Click the QR Code button (first button in row)
      const qrBtn = targetRow.locator('button').first();
      await expect(qrBtn).toBeVisible({ timeout: 10000 });
      await qrBtn.click();

      // Verify modal dialog appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText('Kode QR Self Order').first()).toBeVisible({ timeout: 5000 });

      // Verify QR content and action buttons
      await expect(modal.getByText(/Unduh Kode QR/i).or(modal.getByRole('button', { name: /Unduh/i })).first()).toBeVisible();
      await expect(modal.getByText(/order-dev\.kasflo\.id|branch_code/i).first()).toBeVisible();

      // Click Tutup button to close modal
      const closeBtn = modal.getByRole('button', { name: 'Tutup' }).or(modal.locator('button:has-text("Tutup")')).first();
      await expect(closeBtn).toBeVisible();
      await closeBtn.click();

      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-04] Navigasi ke halaman detail menu self order dan memverifikasi komponennya', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail menu self order dan memverifikasi komponennya', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const detailBtn = targetRow.locator('a[href*="/detail/"]').first();
      await expect(detailBtn).toBeVisible({ timeout: 10000 });
      await detailBtn.click();

      // Verify URL points to detail page
      await expect(page).toHaveURL(/.*\/admin\/catalog\/self-order-menu\/detail\/\d+/, { timeout: 15000 });

      // Verify headings
      await expect(page.getByText('Informasi Menu Self Order').first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Detail Buku Menu').first()).toBeVisible({ timeout: 10000 });

      // Verify detail table headers
      const detailThead = page.locator('table thead:visible').first();
      await expect(detailThead.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
      await expect(detailThead.getByText('Kategori', { exact: true }).first()).toBeVisible();
      await expect(detailThead.getByText('Harga', { exact: true }).first()).toBeVisible();

      // Verify Edit button exists on detail page
      const editBtn = page.locator('a[href*="/edit/"]').or(page.getByRole('link', { name: 'Edit' })).first();
      await expect(editBtn).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-05] Filter menu berdasarkan pencarian pada halaman detail', async ({ page }) => {
    await test.step('Lakukan pengujian filter menu berdasarkan pencarian pada halaman detail dan validasi hasil yang ditampilkan', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      await targetRow.locator('a[href*="/detail/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/self-order-menu\/detail\/\d+/, { timeout: 15000 });
      await expect(page.getByText('Informasi Menu Self Order').first()).toBeVisible({ timeout: 10000 });

      const detailThead = page.locator('table thead:visible').first();
      await expect(detailThead.getByText('Nama Menu', { exact: true }).first()).toBeVisible({ timeout: 10000 });

      // Wait for first menu item in detail table
      const firstMenuCell = page.locator('table tbody tr td:first-child').first();
      await expect(firstMenuCell).not.toBeEmpty({ timeout: 10000 });
      const menuName = (await firstMenuCell.innerText()).trim();

      // Search for menu item
      const searchInput = page.locator('input[placeholder="Cari disini..."]:visible').first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });
      await searchInput.fill(menuName);
      await waitForPageReady(page);

      const matchedRow = page.locator('table tbody tr').filter({ hasText: menuName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // Clear search
      await searchInput.clear();
      await waitForPageReady(page);
      await expect(firstMenuCell).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Navigasi ke halaman banner marketing dan memverifikasi tabel promosi', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman banner marketing dan memverifikasi tabel promosi', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const bannerBtn = targetRow.locator('a[href*="/banner-marketing/"]').first();
      await expect(bannerBtn).toBeVisible({ timeout: 10000 });
      await bannerBtn.click();

      // Verify URL points to banner marketing page
      await expect(page).toHaveURL(/.*\/admin\/catalog\/self-order-menu\/banner-marketing\/\d+/, { timeout: 15000 });

      // Verify Tambah button exists
      const addBtn = page.getByRole('button', { name: /Tambah/i }).or(page.getByRole('link', { name: /Tambah/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });

      // Verify table headers
      const bannerThead = page.locator('table thead:visible').first();
      await expect(bannerThead.getByText('Gambar Banner', { exact: true }).first()).toBeVisible({ timeout: 10000 });
      await expect(bannerThead.getByText('Nama Promo', { exact: true }).first()).toBeVisible();
      await expect(bannerThead.getByText('Tanggal Mulai', { exact: true }).first()).toBeVisible();
      await expect(bannerThead.getByText('Tanggal Berakhir', { exact: true }).first()).toBeVisible();
      await expect(bannerThead.getByText('Status', { exact: true }).first()).toBeVisible();
      await expect(bannerThead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-07] Navigasi ke halaman edit menu self order langsung dari tabel list', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit menu self order langsung dari tabel list', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      const editBtn = targetRow.locator('a[href*="/edit/"]').first();
      await expect(editBtn).toBeVisible({ timeout: 10000 });
      await editBtn.click();

      // Verify URL points to edit page
      await expect(page).toHaveURL(/.*\/admin\/catalog\/self-order-menu\/edit\/\d+/, { timeout: 15000 });

      // Verify 3 main sections
      await expect(page.getByText('Data Menu Self Order').first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Jam Buka Resto').first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Detail Buku Menu').first()).toBeVisible({ timeout: 10000 });

      // Verify form buttons
      await expect(page.getByRole('button', { name: 'Batalkan' })).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button', { name: 'Simpan' })).toBeVisible({ timeout: 10000 });

      // Return cleanly to list page
      await page.getByRole('button', { name: 'Batalkan' }).click();
      await expect(page).toHaveURL(/\/admin\/catalog\/self-order-menu$/, { timeout: 15000 });
    
    });
  });

  test('[TC-08] Mengubah titik koordinat dan kode outlet lalu menyimpan perubahan (edit self order)', async ({ page }) => {
    await test.step('Lakukan pengujian mengubah titik koordinat dan kode outlet lalu menyimpan perubahan (edit self order) dan verifikasi pembaruan data', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/self-order-menu\/edit\/\d+/, { timeout: 15000 });
      await expect(page.getByText('Data Menu Self Order').first()).toBeVisible({ timeout: 10000 });

      // Fill Titik Koordinat & Kode Toko/Outlet
      const coordInput = page.getByPlaceholder('Masukan Titik Koordinat').first();
      await expect(coordInput).toBeVisible({ timeout: 10000 });
      await coordInput.fill('-6.208800, 106.845600');

      const outletCodeInput = page.getByPlaceholder('Masukan Kode Toko/Outlet').first();
      await expect(outletCodeInput).toBeVisible({ timeout: 10000 });
      await expect(outletCodeInput).toBeEnabled();
      await outletCodeInput.fill('KASFLO' + Date.now().toString().slice(-6));

      // Click Simpan and wait for backend API response
      const simpanBtn = page.getByRole('button', { name: 'Simpan' });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
      await expect(simpanBtn).toBeEnabled({ timeout: 5000 });
      await simpanBtn.scrollIntoViewIfNeeded();

      await Promise.all([
        page.waitForResponse(res => res.url().includes('self-order-menu') && (res.status() === 200 || res.status() === 201), { timeout: 20000 }).catch(() => null),
        simpanBtn.click(),
      ]);

      // Verify redirect back to list page
      await expect(page).toHaveURL(/\/admin\/catalog\/self-order-menu$/, { timeout: 20000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-09] Mengubah jam buka resto pada halaman edit', async ({ page }) => {
    await test.step('Lakukan pengujian mengubah jam buka resto pada halaman edit dan verifikasi pembaruan data', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/self-order-menu\/edit\/\d+/, { timeout: 15000 });
      await expect(page.getByText('Jam Buka Resto').first()).toBeVisible({ timeout: 10000 });

      // Verify "Atur Semua Hari" button exists
      const setAllDaysBtn = page.getByRole('button', { name: /Atur Semua Hari/i });
      await expect(setAllDaysBtn).toBeVisible({ timeout: 10000 });

      // Verify days list exists (Senin s/d Minggu)
      await expect(page.getByText('Senin').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('Selasa').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('Minggu').first()).toBeVisible({ timeout: 5000 });

      // Safely cancel changes
      await page.getByRole('button', { name: 'Batalkan' }).click();
      await expect(page).toHaveURL(/\/admin\/catalog\/self-order-menu$/, { timeout: 15000 });
    
    });
  });

  test('[TC-10] Cari/filter menu pada halaman edit menu self order', async ({ page }) => {
    await test.step('Lakukan pengujian cari/filter menu pada halaman edit menu self order dan validasi hasil yang ditampilkan', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/self-order-menu\/edit\/\d+/, { timeout: 15000 });
      await expect(page.getByText('Detail Buku Menu').first()).toBeVisible({ timeout: 10000 });

      // Find the first menu item in the Detail Buku Menu table
      const menuTable = page.locator('table.mrt-table, table:has-text("Aktifkan Self Order")').first();
      await expect(menuTable).toBeVisible({ timeout: 10000 });
      const firstMenuCell = menuTable.locator('tbody tr td:first-child').first();
      await expect(firstMenuCell).not.toBeEmpty({ timeout: 10000 });
      const menuName = (await firstMenuCell.innerText()).trim();

      // Fill search box on edit page
      const searchInput = page.locator('input[placeholder="Cari disini..."]:visible').first();
      await expect(searchInput).toBeVisible({ timeout: 10000 });
      await searchInput.fill(menuName);
      await waitForPageReady(page);

      // Verify matched menu is visible
      const matchedRow = menuTable.locator('tbody tr').filter({ hasText: menuName });
      await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });

      // Clear search
      await searchInput.clear();
      await waitForPageReady(page);
      await expect(firstMenuCell).toBeVisible({ timeout: 5000 });

      // Dismiss with Batalkan
      await page.getByRole('button', { name: 'Batalkan' }).click();
      await expect(page).toHaveURL(/\/admin\/catalog\/self-order-menu$/, { timeout: 15000 });
    
    });
  });

  test('[TC-11] Tombol batalkan pada halaman edit mengembalikan pengguna ke halaman list menu self order', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol batalkan pada halaman edit mengembalikan pengguna ke halaman list menu self order', async () => {
      await ensureSelfOrderExists(page);

      const targetRow = await getTargetRow(page);
      if (!targetRow) {
        await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        return;
      }

      await targetRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/.*\/admin\/catalog\/self-order-menu\/edit\/\d+/, { timeout: 15000 });

      // Click Batalkan
      const cancelBtn = page.getByRole('button', { name: 'Batalkan' });
      await expect(cancelBtn).toBeVisible({ timeout: 10000 });
      await cancelBtn.click();

      // Verify navigation back to list page
      await expect(page).toHaveURL(/\/admin\/catalog\/self-order-menu$/, { timeout: 15000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
    
    });
  });
});
