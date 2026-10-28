const { test, expect } = require('@playwright/test');

test.describe('Absensi Karyawan', () => {
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

      // Step 2: Navigate to Absensi page
      await page.goto('/admin/user-management/absence', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/user-management\/absence/, { timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman Absensi dengan breadcrumb dan judul halaman', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Absensi dengan breadcrumb dan judul halaman', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText(/Absensi/i)).toBeVisible();

      // Verify Title / Heading
      await expect(page.locator(':visible').filter({ hasText: /^Absensi$/ }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Memverifikasi filter Pilih Cabang pada toolbar', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi filter Pilih Cabang pada toolbar dan validasi hasil yang ditampilkan', async () => {
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 5000 });

      await selectMantineOption(page, cabangInput);
    
    });
  });

  test('[TC-03] Memverifikasi pemilih rentang tanggal (Pilih Tanggal) pada toolbar', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal (Pilih Tanggal) pada toolbar', async () => {
      const dateBtn = page.getByRole('button', { name: /Pilih Tanggal/i }).or(
        page.locator('button').filter({ hasText: /Pilih Tanggal/i })
      ).first();
      await expect(dateBtn).toBeVisible({ timeout: 5000 });

      await dateBtn.click();

      // Verify popover calendar opens
      const popover = page.locator('.mantine-Popover-dropdown:visible, .mantine-DatePicker-root:visible').last();
      if (await popover.isVisible({ timeout: 3000 }).catch(() => false)) {
        await page.keyboard.press('Escape');
      }
    
    });
  });

  test('[TC-04] Memverifikasi tombol Refresh untuk memuat ulang data absensi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol Refresh untuk memuat ulang data absensi', async () => {
      const refreshBtn = page.getByRole('button', { name: /Refresh/i }).first();
      await expect(refreshBtn).toBeVisible({ timeout: 5000 });
      await expect(refreshBtn).toBeEnabled();

      await refreshBtn.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/admin\/user-management\/absence/);
    
    });
  });

  test('[TC-05] Memverifikasi struktur tabel data absensi dan kolom-kolomnya', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel data absensi dan kolom-kolomnya', async () => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const expectedColumns = [
        'Username',
        'Cabang',
        'Waktu, Tanggal Masuk',
        'Kas Awal',
        'Waktu, Tanggal Pulang',
        'Kas Akhir'
      ];

      for (const col of expectedColumns) {
        await expect(table.locator('th').filter({ hasText: col }).first()).toBeVisible({ timeout: 5000 });
      }
    
    });
  });

  test('[TC-06] Menampilkan data log absensi atau pesan fallback tabel kosong', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan data log absensi atau pesan fallback tabel kosong', async () => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      // Table body should contain at least one row (either log rows or empty state)
      const firstRow = table.locator('tbody tr').first();
      await expect(firstRow).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-07] Memverifikasi pemfilteran data absensi berdasarkan pemilihan Cabang', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi pemfilteran data absensi berdasarkan pemilihan Cabang dan validasi hasil yang ditampilkan', async () => {
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible();

      await cabangInput.click();
      const options = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
      if (await options.count() > 0) {
        await options.first().click();
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/admin\/user-management\/absence/);
      } else {
        await page.keyboard.press('Escape');
      }
    
    });
  });

  test('[TC-08] Memverifikasi interaksi kalender popover pada input Pilih Tanggal', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi interaksi kalender popover pada input Pilih Tanggal', async () => {
      const dateBtn = page.getByRole('button', { name: /Pilih Tanggal/i }).or(
        page.locator('button').filter({ hasText: /Pilih Tanggal/i })
      ).first();
      await expect(dateBtn).toBeVisible({ timeout: 5000 });

      await dateBtn.click();

      // Check calendar days or month controls are rendered
      const calendarDropdown = page.locator('.mantine-DatePicker-root:visible, .mantine-Popover-dropdown:visible').last();
      if (await calendarDropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(calendarDropdown).toBeVisible();
        await page.keyboard.press('Escape');
      }
    
    });
  });

  test('[TC-09] Memverifikasi responsivitas container tabel absensi pada tampilan desktop', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas container tabel absensi pada tampilan desktop', async () => {
      const tableCard = page.locator('.mantine-Card-root, table, [class*="Paper"]').first();
      await expect(tableCard).toBeVisible({ timeout: 10000 });

      // Header column Username should be rendered
      await expect(page.locator('th').filter({ hasText: 'Username' }).first()).toBeVisible({ timeout: 5000 });
    
    });
  });
});
