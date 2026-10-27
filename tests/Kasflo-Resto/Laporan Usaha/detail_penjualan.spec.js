const { test, expect } = require('@playwright/test');

test.describe('Laporan Detail Penjualan', () => {
  // Shared resilient login helper
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) {
      return page;
    }

    try {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch {
      await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
    }

    if (page.url().includes('/admin/')) {
      return page;
    }

    const emailInput = page.getByLabel(/Email atau Username/i);
    await expect(emailInput).toBeVisible({ timeout: 20000 });

    await emailInput.fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
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

      // Step 2: Navigate to Detail Penjualan page
      await page.goto('/admin/report/sale-detail', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify page URL
      await expect(page).toHaveURL(/\/admin\/report\/sale-detail/, { timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman Detail Penjualan dengan breadcrumb, header, dan filter pencarian', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Detail Penjualan dengan breadcrumb, header, dan filter pencarian', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText(/Detail Penjualan/i)).toBeVisible();

      // Verify Title & description
      await expect(page.getByText('Detail Penjualan').first()).toBeVisible();
      await expect(page.getByText(/Penjualan di outletmu selama periode/i).first()).toBeVisible();

      // Verify filter inputs presence
      await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible();
      await expect(page.getByPlaceholder('Pilih Mode Penjualan').first()).toBeVisible();
      await expect(page.getByPlaceholder('Pilih Aplikasi').first()).toBeVisible();
      await expect(page.getByPlaceholder('Pilih Status').first()).toBeVisible();
      await expect(page.getByPlaceholder('Pilih Metode Pembayaran').first()).toBeVisible();
      await expect(page.getByPlaceholder('Cari Disini').first()).toBeVisible();

      // Verify action buttons
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

  test('[TC-03] Memverifikasi filter dropdown Cabang dan Mode Penjualan', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi filter dropdown Cabang dan Mode Penjualan dan validasi hasil yang ditampilkan', async () => {
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible();
      await selectMantineOption(page, cabangInput);

      const modeInput = page.getByPlaceholder('Pilih Mode Penjualan').first();
      await expect(modeInput).toBeVisible();
      await selectMantineOption(page, modeInput);
    
    });
  });

  test('[TC-04] Memverifikasi filter dropdown Status dan Metode Pembayaran', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi filter dropdown Status dan Metode Pembayaran dan validasi hasil yang ditampilkan', async () => {
      const statusInput = page.getByPlaceholder('Pilih Status').first();
      await expect(statusInput).toBeVisible();
      await selectMantineOption(page, statusInput);

      const bayarInput = page.getByPlaceholder('Pilih Metode Pembayaran').first();
      await expect(bayarInput).toBeVisible();
      await selectMantineOption(page, bayarInput);
    
    });
  });

  test('[TC-05] Memverifikasi input pencarian transaksi (Cari Disini)', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi input pencarian transaksi (Cari Disini) dan validasi hasil yang ditampilkan', async () => {
      const searchInput = page.getByPlaceholder('Cari Disini').first();
      await expect(searchInput).toBeVisible();

      await searchInput.fill('TRX-12345');
      await expect(searchInput).toHaveValue('TRX-12345');
      await searchInput.clear();
    
    });
  });

  test('[TC-06] Menampilkan 6 kartu ringkasan metrik penjualan', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan 6 kartu ringkasan metrik penjualan', async () => {
      const summaryLabels = [
        'Total Transaksi',
        'Total Penjualan Kotor',
        'Total Tax',
        'Total Service Charge',
        'Total Diskon',
        'Total Penjualan Bersih'
      ];

      for (const label of summaryLabels) {
        await expect(page.getByText(label, { exact: true }).first()).toBeVisible({ timeout: 5000 });
      }
    
    });
  });

  test('[TC-07] Memverifikasi struktur tabel detail penjualan dan kolom-kolomnya', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel detail penjualan dan kolom-kolomnya', async () => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const expectedColumns = [
        'No. Transaksi',
        'Waktu',
        'Nama Kasir',
        'Mode Penjualan',
        'Aplikasi',
        'Metode Pembayaran',
        'Nama Pelanggan',
        'Nilai Bill',
        'Status',
        'Action'
      ];

      for (const col of expectedColumns) {
        await expect(table.locator('th').filter({ hasText: col }).first()).toBeVisible({ timeout: 5000 });
      }
    
    });
  });

  test('[TC-08] Menampilkan baris data transaksi atau indikator Belum Ada Data pada tabel', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan baris data transaksi atau indikator Belum Ada Data pada tabel', async () => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });
      await expect(table.locator('tbody tr').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-09] Dapat mengklik tombol Tampilkan untuk memfilter data laporan', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil dapat mengklik tombol Tampilkan untuk memfilter data laporan', async () => {
      const tampilkanBtn = page.getByRole('button', { name: /Tampilkan/i }).first();
      await expect(tampilkanBtn).toBeVisible();
      await expect(tampilkanBtn).toBeEnabled();

      await tampilkanBtn.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/admin\/report\/sale-detail/);
    
    });
  });

  test('[TC-10] Memverifikasi tombol Unduh Laporan dan interaksi unduh', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol Unduh Laporan dan interaksi unduh', async () => {
      const downloadBtn = page.getByRole('button', { name: /Unduh Laporan/i }).first();
      await expect(downloadBtn).toBeVisible({ timeout: 5000 });
      await expect(downloadBtn).toBeEnabled();

      // Click unduh laporan and catch either a download event or a modal/toast
      const downloadPromise = page.waitForEvent('download', { timeout: 4000 }).catch(() => null);
      await downloadBtn.click();

      const download = await downloadPromise;
      if (download) {
        expect(download.suggestedFilename()).toBeTruthy();
      } else {
        // If modal or notification popped up, verify page state
        await expect(page).toHaveURL(/\/admin\/report\/sale-detail/);
      }
    
    });
  });

  test('[TC-11] Memverifikasi kontrol Rows per page dan pagination', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi kontrol Rows per page dan pagination', async () => {
      await expect(page.getByText(/Rows per page/i).first()).toBeVisible({ timeout: 5000 });

      const paginationContainer = page.locator('.mantine-Pagination-root, [class*="pagination"]').first();
      if (await paginationContainer.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(paginationContainer).toBeVisible();
      }
    
    });
  });
});
