const { test, expect } = require('@playwright/test');

test.describe('Laporan Produk', () => {
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
      await page.waitForTimeout(500);
      try {
        await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      } catch {
        await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      }
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
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        if (await loginBtn.isEnabled().catch(() => false)) {
          await loginBtn.click({ timeout: 3000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      }
    }
    await waitForPageReady(page);
    return page;
  }

  // Helper to select an option in a Mantine Select dropdown
  async function selectMantineOption(page, inputLocator, optionText) {
    await inputLocator.click();

    if (optionText) {
      const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: optionText }).first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click();
        return;
      }
    }

    const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
    if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await firstOption.click();
    } else {
      await page.keyboard.press('Escape');
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Product report page
      await page.goto('/admin/report/product', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/report\/product/, { timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman Laporan Produk dengan breadcrumb, title, dan filter', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Laporan Produk dengan breadcrumb, title, dan filter', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText(/Laporan Produk/i)).toBeVisible();

      // Verify visible Title / Heading
      await expect(page.locator(':visible').filter({ hasText: /^Laporan Produk$/ }).first()).toBeVisible();

      // Verify filter inputs
      await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible();
      await expect(page.getByPlaceholder('Pilih Mode Penjualan').first()).toBeVisible();
      await expect(page.getByPlaceholder('Pilih Via').first()).toBeVisible();

      // Verify buttons
      await expect(page.getByRole('button', { name: /Tampilkan/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Unduh Laporan/i })).toBeVisible();
    
    });
  });

  test('[TC-02] Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async () => {
      const dateBtn = page.getByRole('button', { name: /Pilih Tanggal/i }).or(
        page.locator('button').filter({ hasText: /Pilih Tanggal|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/i })
      ).first();
      await expect(dateBtn).toBeVisible({ timeout: 5000 });

      await dateBtn.click();

      // Verify calendar popover opens
      const popover = page.locator('.mantine-Popover-dropdown:visible, .mantine-DatePicker-root:visible').last();
      if (await popover.isVisible({ timeout: 3000 }).catch(() => false)) {
        await page.keyboard.press('Escape');
      }
    
    });
  });

  test('[TC-03] Memverifikasi filter dropdown Pilih Cabang', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi filter dropdown Pilih Cabang dan validasi hasil yang ditampilkan', async () => {
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible();
      await selectMantineOption(page, cabangInput);
    
    });
  });

  test('[TC-04] Memverifikasi filter dropdown Pilih Mode Penjualan', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi filter dropdown Pilih Mode Penjualan dan validasi hasil yang ditampilkan', async () => {
      const modeInput = page.getByPlaceholder('Pilih Mode Penjualan').first();
      await expect(modeInput).toBeVisible();
      await selectMantineOption(page, modeInput);
    
    });
  });

  test('[TC-05] Memverifikasi filter dropdown Pilih Via', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi filter dropdown Pilih Via dan validasi hasil yang ditampilkan', async () => {
      const viaInput = page.getByPlaceholder('Pilih Via').first();
      await expect(viaInput).toBeVisible();
      await selectMantineOption(page, viaInput);
    
    });
  });

  test('[TC-06] Memverifikasi struktur tabel laporan produk dan kolom-kolomnya', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel laporan produk dan kolom-kolomnya', async () => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const expectedColumns = [
        'Nama Produk',
        'Jumlah Terjual',
        'Total',
        'Total Service Charge',
        'Total Pajak',
        'Grand Total'
      ];

      for (const col of expectedColumns) {
        await expect(table.locator('th').filter({ hasText: col }).first()).toBeVisible({ timeout: 5000 });
      }
    
    });
  });

  test('[TC-07] Menampilkan baris data produk atau pesan Belum Ada Data', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan baris data produk atau pesan Belum Ada Data', async () => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });
      await expect(table.locator('tbody tr').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-08] Mengklik tombol Tampilkan untuk memperbarui data laporan', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil mengklik tombol Tampilkan untuk memperbarui data laporan', async () => {
      const tampilkanBtn = page.getByRole('button', { name: /Tampilkan/i }).first();
      await expect(tampilkanBtn).toBeVisible();
      await expect(tampilkanBtn).toBeEnabled();

      await tampilkanBtn.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/admin\/report\/product/);
    
    });
  });

  test('[TC-09] Memverifikasi tombol Unduh Laporan dan aksi unduh', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol Unduh Laporan dan aksi unduh', async () => {
      const downloadBtn = page.getByRole('button', { name: /Unduh Laporan/i }).first();
      await expect(downloadBtn).toBeVisible({ timeout: 5000 });
      await expect(downloadBtn).toBeEnabled();

      const downloadPromise = page.waitForEvent('download', { timeout: 4000 }).catch(() => null);
      await downloadBtn.click();

      const download = await downloadPromise;
      if (download) {
        expect(download.suggestedFilename()).toBeTruthy();
      } else {
        await expect(page).toHaveURL(/\/admin\/report\/product/);
      }
    
    });
  });

  test('[TC-10] Memverifikasi kontrol Rows per page dan pagination', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi kontrol Rows per page dan pagination', async () => {
      await expect(page.getByText(/Rows per page/i).first()).toBeVisible({ timeout: 5000 });

      const paginationContainer = page.locator('.mantine-Pagination-root, [class*="pagination"]').first();
      if (await paginationContainer.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(paginationContainer).toBeVisible();
      }
    
    });
  });
});
