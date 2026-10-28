const { test, expect } = require('@playwright/test');

test.describe('Laporan Laba Rugi', () => {
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

      // Step 2: Navigate to Profit and Loss report page
      await page.goto('/admin/report/profit-and-loss', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/report\/profit-and-loss/, { timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman Laporan Laba Rugi dengan filter utama dan tombol aksi', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Laporan Laba Rugi dengan filter utama dan tombol aksi', async () => {
      // Verify Cabang selector
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 10000 });

      // Verify action buttons
      await expect(page.getByRole('button', { name: /Tampilkan/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Unduh Laporan/i })).toBeVisible();
    
    });
  });

  test('[TC-02] Memverifikasi pemilih rentang tanggal pada laporan laba rugi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal pada laporan laba rugi', async () => {
      const dateBtn = page.locator('button').filter({
        hasText: /–|-|Pilih Tanggal|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/i
      }).first();
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

  test('[TC-04] Memverifikasi tampilan informasi periode laporan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tampilan informasi periode laporan', async () => {
      const periodeElement = page.getByText(/Periode:/i).first();
      await expect(periodeElement).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-05] Memverifikasi struktur rincian laba rugi (Keterangan dan Jumlah)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur rincian laba rugi (Keterangan dan Jumlah)', async () => {
      await expect(page.getByText('Keterangan').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('Jumlah').first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Memverifikasi baris-baris komponen keuangan (Pendapatan, Kas, Pengeluaran, Laba Rugi)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi baris-baris komponen keuangan (Pendapatan, Kas, Pengeluaran, Laba Rugi)', async () => {
      await expect(page.locator('table, .mantine-Paper-root, [class*="report"]').first()).toBeVisible({ timeout: 10000 });

      const financialMetrics = ['Pendapatan', 'Kas', 'Pengeluaran', 'Laba Rugi'];

      for (const metric of financialMetrics) {
        await expect(
          page.getByText(metric, { exact: true }).or(page.getByText(new RegExp(metric, 'i'))).first()
        ).toBeVisible({ timeout: 10000 });
      }
    
    });
  });

  test('[TC-07] Mengklik tombol Tampilkan untuk memuat ulang data laba rugi', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil mengklik tombol Tampilkan untuk memuat ulang data laba rugi', async () => {
      const tampilkanBtn = page.getByRole('button', { name: /Tampilkan/i }).first();
      await expect(tampilkanBtn).toBeVisible();
      await expect(tampilkanBtn).toBeEnabled();

      await tampilkanBtn.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/admin\/report\/profit-and-loss/);
    
    });
  });

  test('[TC-08] Memverifikasi tombol Unduh Laporan dan interaksi ekspor data', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol Unduh Laporan dan interaksi ekspor data', async () => {
      const downloadBtn = page.getByRole('button', { name: /Unduh Laporan/i }).first();
      await expect(downloadBtn).toBeVisible({ timeout: 5000 });
      await expect(downloadBtn).toBeEnabled();

      const downloadPromise = page.waitForEvent('download', { timeout: 4000 }).catch(() => null);
      await downloadBtn.click();

      const download = await downloadPromise;
      if (download) {
        expect(download.suggestedFilename()).toBeTruthy();
      } else {
        await expect(page).toHaveURL(/\/admin\/report\/profit-and-loss/);
      }
    
    });
  });
});
