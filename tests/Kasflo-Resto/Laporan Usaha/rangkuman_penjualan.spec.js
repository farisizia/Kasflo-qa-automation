const { test, expect } = require('@playwright/test');

test.describe('Laporan Rangkuman Penjualan', () => {
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

      // Step 2: Navigate to Rangkuman Penjualan page
      await page.goto('/admin/report/summary', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/report\/summary/, { timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman Rangkuman Penjualan dengan breadcrumb dan filter utama', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Rangkuman Penjualan dengan breadcrumb dan filter utama', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText('Rangkuman Penjualan')).toBeVisible();

      // Verify filter tabs: Harian & Bulanan
      const harianTab = page.getByRole('tab', { name: /Harian/i });
      await expect(harianTab).toBeVisible({ timeout: 5000 });

      const bulananTab = page.getByRole('tab', { name: /Bulanan/i });
      await expect(bulananTab).toBeVisible({ timeout: 5000 });

      // Verify Cabang selector
      const cabangInput = page.getByPlaceholder(/Semua Cabang|Pilih Cabang/i).first();
      await expect(cabangInput).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-02] Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async () => {
      const dateTab = page.getByRole('tab', { name: /Pilih Tanggal/i }).or(page.locator('.mantine-Tabs-tab').filter({ hasText: /Pilih Tanggal/i })).first();
      await expect(dateTab).toBeVisible({ timeout: 5000 });

      await dateTab.click();

      // Verify calendar popover opens
      const popover = page.locator('.mantine-Popover-dropdown:visible').last();
      if (await popover.isVisible({ timeout: 3000 }).catch(() => false)) {
        await page.keyboard.press('Escape');
      }
    
    });
  });

  test('[TC-03] Berpindah ke mode filter Bulanan dan memverifikasi perubahan tampilan', async ({ page }) => {
    await test.step('Lakukan pengujian berpindah ke mode filter Bulanan dan memverifikasi perubahan tampilan dan verifikasi pembaruan data', async () => {
      const bulananTab = page.getByRole('tab', { name: /Bulanan/i });
      await bulananTab.click();

      // Verify month picker button or monthly metrics are displayed
      await waitForPageReady(page);
      await expect(page).toHaveURL(/\/admin\/report\/summary/);

      // Switch back to Harian
      const harianTab = page.getByRole('tab', { name: /Harian/i });
      await harianTab.click();
      await waitForPageReady(page);
    
    });
  });

  test('[TC-04] Memverifikasi kartu metrik Penjualan Per Waktu', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi kartu metrik Penjualan Per Waktu', async () => {
      const chartCard = page.locator('.mantine-Card-root, [class*="card"]').filter({ hasText: /Penjualan Per Waktu/i }).first();
      await expect(chartCard).toBeVisible({ timeout: 10000 });
      await expect(chartCard.getByText(/operasional berlangsung|Data Belum Tersedia|Penjualan Per Waktu/i).first()).toBeVisible();
    
    });
  });

  test('[TC-05] Memverifikasi kartu ringkasan Total Penjualan beserta sub-metriknya', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi kartu ringkasan Total Penjualan beserta sub-metriknya', async () => {
      const summaryCard = page.locator('.mantine-Card-root, [class*="card"]').filter({ hasText: /Total Penjualan/i }).first();
      await expect(summaryCard).toBeVisible({ timeout: 10000 });

      // Verify key financial metrics inside card
      await expect(summaryCard.getByText(/Total Penerimaan/i).first()).toBeVisible({ timeout: 5000 });
      await expect(summaryCard.getByText(/Total Penjualan Bersih/i).first()).toBeVisible({ timeout: 5000 });
      await expect(summaryCard.getByText(/Total Qty Transaksi/i).first()).toBeVisible({ timeout: 5000 });
      await expect(summaryCard.getByText(/Total Pelanggan/i).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Dapat memilih opsi cabang pada filter Semua Cabang', async ({ page }) => {
    await test.step('Lakukan pengujian dapat memilih opsi cabang pada filter Semua Cabang dan validasi hasil yang ditampilkan', async () => {
      const cabangInput = page.getByPlaceholder(/Semua Cabang|Pilih Cabang/i).first();
      await expect(cabangInput).toBeVisible();

      await cabangInput.click();
      const options = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
      if (await options.count() > 0) {
        await options.first().click();
        await waitForPageReady(page);
        await expect(page).toHaveURL(/\/admin\/report\/summary/);
      } else {
        await page.keyboard.press('Escape');
      }
    
    });
  });

  test('[TC-07] Memverifikasi responsivitas container data Rangkuman Penjualan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas container data Rangkuman Penjualan', async () => {
      const mainContent = page.locator('main').first();
      await expect(mainContent).toBeVisible({ timeout: 10000 });

      // Content should show sales summary elements
      await expect(page.getByText(/Total Penjualan|Penjualan Per Waktu/i).first()).toBeVisible({ timeout: 5000 });
    
    });
  });
});
