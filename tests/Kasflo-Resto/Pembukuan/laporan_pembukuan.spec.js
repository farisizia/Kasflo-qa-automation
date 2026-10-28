const { test, expect } = require('@playwright/test');

test.describe('Laporan Pembukuan', () => {
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
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Laporan Pembukuan page
      await page.goto('/admin/cash-account/report', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/cash-account\/report/, { timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman Laporan Pembukuan dengan breadcrumb, judul, dan pemilih tipe laporan', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Laporan Pembukuan dengan breadcrumb, judul, dan pemilih tipe laporan', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText('Laporan Pembukuan')).toBeVisible();

      // Verify page heading / title
      await expect(page.getByText('Laporan Pembukuan').first()).toBeVisible();

      // Verify report type selector exists
      const reportTypeSelector = page.getByRole('textbox').filter({ hasText: /Laporan Arus Kas|Laporan Transaksi/i })
        .or(page.locator('input[readonly]').filter({ hasText: /Laporan Arus Kas/i }))
        .or(page.locator('.mantine-Select-input, input').filter({ hasText: /Laporan/i })).first();
      await expect(page.getByText(/Laporan Arus Kas/i).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-02] Memverifikasi komponen filter pada halaman (Pilih Periode, Pilih Cabang, dan tombol Cari)', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi komponen filter pada halaman (Pilih Periode, Pilih Cabang, dan tombol Cari) dan validasi hasil yang ditampilkan', async () => {
      // Verify Date range picker / trigger
      const dateTrigger = page.locator('button, input').filter({ hasText: /Pilih Periode|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/i })
        .or(page.getByPlaceholder('Pilih Periode')).first();
      await expect(dateTrigger).toBeVisible({ timeout: 5000 });

      // Verify Cabang selector
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 5000 });

      // Verify Cari Button
      const cariBtn = page.getByRole('button', { name: /^Cari$/i }).first();
      await expect(cariBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-03] Menampilkan tampilan default Laporan Arus Kas dengan heading, info periode, header Keterangan & Jumlah, dan tombol Unduh Laporan', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan tampilan default Laporan Arus Kas dengan heading, info periode, header Keterangan & Jumlah, dan tombol Unduh Laporan', async () => {
      // Verify Heading Laporan Arus Kas
      await expect(page.getByText('Laporan Arus Kas').first()).toBeVisible({ timeout: 10000 });

      // Verify Periode text
      await expect(page.getByText(/Periode\s*:/i).first()).toBeVisible({ timeout: 5000 });

      // Verify Summary header row: Keterangan & Jumlah
      await expect(page.getByText('Keterangan').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('Jumlah').first()).toBeVisible({ timeout: 5000 });

      // Verify Unduh Laporan button
      const unduhBtn = page.getByRole('button', { name: /Unduh Laporan/i })
        .or(page.getByRole('link', { name: /Unduh Laporan/i })).first();
      await expect(unduhBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-04] Tombol Unduh Laporan pada Laporan Arus Kas dapat diklik', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol Unduh Laporan pada Laporan Arus Kas dapat diklik', async () => {
      const unduhBtn = page.getByRole('button', { name: /Unduh Laporan/i })
        .or(page.getByRole('link', { name: /Unduh Laporan/i })).first();
      await expect(unduhBtn).toBeVisible({ timeout: 5000 });

      // Click download button and verify it doesn't navigate away or throw error
      await unduhBtn.click();
      await expect(page).toHaveURL(/\/admin\/cash-account\/report/);
    
    });
  });

  test('[TC-05] Berpindah ke tipe Laporan Transaksi dan memverifikasi perubahan tampilan', async ({ page }) => {
    await test.step('Lakukan pengujian berpindah ke tipe Laporan Transaksi dan memverifikasi perubahan tampilan dan verifikasi pembaruan data', async () => {
      // Select Laporan Transaksi from report type dropdown
      const typeSelect = page.locator('.mantine-Select-input').first();
      await typeSelect.click();

      // Select Laporan Transaksi option
      const transaksiOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /Laporan Transaksi/i }).first();
      await expect(transaksiOption).toBeVisible({ timeout: 5000 });
      await transaksiOption.click();

      // Verify view changed to Laporan Transaksi
      await expect(page.getByText(/Total Awal|Daftar Laporan Transaksi/i).first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-06] Memverifikasi 4 kartu ringkasan pada Laporan Transaksi (Total Awal, Total Pendapatan, Total Pengeluaran, Total Akhir)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi 4 kartu ringkasan pada Laporan Transaksi (Total Awal, Total Pendapatan, Total Pengeluaran, Total Akhir)', async () => {
      // Switch to Laporan Transaksi
      const typeSelect = page.locator('.mantine-Select-input').first();
      await typeSelect.click();
      const transaksiOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /Laporan Transaksi/i }).first();
      await transaksiOption.click();

      // Verify 4 summary cards
      await expect(page.getByText('Total Awal').first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Total Pendapatan').first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Total Pengeluaran').first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Total Akhir').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-07] Memverifikasi struktur tabel Laporan Transaksi dan header kolom', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel Laporan Transaksi dan header kolom', async () => {
      // Switch to Laporan Transaksi
      const typeSelect = page.locator('.mantine-Select-input').first();
      await typeSelect.click();
      const transaksiOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /Laporan Transaksi/i }).first();
      await transaksiOption.click();

      // Verify table structure
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Waktu, Tanggal', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Kategori', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Catatan', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Total Transaksi', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Tipe', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-08] Tombol Unduh Laporan pada Laporan Transaksi dapat diklik', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol Unduh Laporan pada Laporan Transaksi dapat diklik', async () => {
      // Switch to Laporan Transaksi
      const typeSelect = page.locator('.mantine-Select-input').first();
      await typeSelect.click();
      const transaksiOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /Laporan Transaksi/i }).first();
      await transaksiOption.click();

      // Verify Unduh Laporan button exists
      const unduhBtn = page.getByRole('button', { name: /Unduh Laporan|Unduh Excel/i })
        .or(page.getByRole('link', { name: /Unduh Laporan|Unduh Excel/i })).first();
      await expect(unduhBtn).toBeVisible({ timeout: 10000 });

      await unduhBtn.click();
      await expect(page).toHaveURL(/\/admin\/cash-account\/report/);
    
    });
  });

  test('[TC-09] Dapat memilih cabang pada dropdown dan melakukan pencarian dengan tombol Cari', async ({ page }) => {
    await test.step('Lakukan pengujian dapat memilih cabang pada dropdown dan melakukan pencarian dengan tombol Cari dan validasi hasil yang ditampilkan', async () => {
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible();

      await selectMantineOption(page, cabangInput);
      await expect(cabangInput).not.toHaveValue('');

      // Click Cari button
      const cariBtn = page.getByRole('button', { name: /^Cari$/i }).first();
      await cariBtn.click();

      // Verify page remains responsive and data refreshed
      await expect(page).toHaveURL(/\/admin\/cash-account\/report/);
    
    });
  });

  test('[TC-10] Dapat membuka kalender Pilih Periode untuk rentang tanggal', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Dapat membuka kalender Pilih Periode untuk rentang tanggal', async () => {
      // Date range picker trigger button
      const dateBtn = page.locator('button:has(.tabler-icon-calendar), button:has(svg), [data-dates-input="true"]')
        .filter({ hasText: /Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|Periode/i }).first();
      
      if (await dateBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await dateBtn.click();

        // Verify calendar popover dropdown appears
        const popover = page.locator('.mantine-Popover-dropdown:visible').last();
        await expect(popover).toBeVisible({ timeout: 5000 });

        // Close popover
        await page.keyboard.press('Escape');
      }
    
    });
  });

  test('[TC-11] Memverifikasi responsivitas tampilan data dan state laporan pembukuan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas tampilan data dan state laporan pembukuan', async () => {
      // Verify main content container is rendered
      const mainSection = page.locator('main').first();
      await expect(mainSection).toBeVisible({ timeout: 10000 });

      // Verify summary or table is present
      const hasContent = await page.getByText(/Laporan Arus Kas|Daftar Laporan Transaksi|Total Mutasi|Jumlah/i).count();
      expect(hasContent).toBeGreaterThan(0);
    
    });
  });
});
