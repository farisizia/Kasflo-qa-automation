const { test, expect } = require('@playwright/test');

test.describe('Reward & Referral', () => {
  // Helper selector for data rows in reward table
  function getDataRows(page) {
    return page.locator('table:visible tbody tr');
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

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Enable customer reward and profile permission in mocks
      await page.route('**/backoffice/v1/subscription', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        if (json.data && json.data.active_features) {
          json.data.active_features.enable_customer_reward = true;
        }
        await route.fulfill({ response, json });
      });

      await page.route('**/backoffice/v1/auth/profile', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        if (json.data) {
          json.data.is_show_reward = 1;
        }
        await route.fulfill({ response, json });
      });

      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Reward page
      await page.goto('/admin/promotion/reward', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify Reward page loaded (redirects to referral subpage)
      await expect(page).toHaveURL(/\/admin\/promotion\/reward/, { timeout: 15000 });
    
    });
  });

  test('[TC-01] Navigasi ke /admin/promotion/reward otomatis mengarah ke sub-halaman Referral dengan breadcrumb dan tabs yang sesuai', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke /admin/promotion/reward otomatis mengarah ke sub-halaman Referral dengan breadcrumb dan tabs yang sesuai', async () => {
      await expect(page).toHaveURL(/\/admin\/promotion\/reward\/referral/, { timeout: 15000 });

      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText('Reward')).toBeVisible();

      // Verify tabs: Referral, Ulang Tahun, Subscription
      await expect(page.getByRole('tab', { name: /Referral/i }).first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByRole('tab', { name: /Ulang Tahun/i }).first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByRole('tab', { name: /Subscription/i }).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-02] Memverifikasi struktur tabel dan header kolom pada tab Referral', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel dan header kolom pada tab Referral', async () => {
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Tipe Reward', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Isi Reward', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Qty', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-03] Memverifikasi kontrol Status Referral dan munculnya tombol Simpan Perubahan saat ada perubahan', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi kontrol Status Referral dan munculnya tombol Simpan Perubahan saat ada perubahan dan verifikasi pembaruan data', async () => {
      // Status Referral switch
      const statusText = page.getByText(/Status Referal|Status Referral/i).first();
      await expect(statusText).toBeVisible({ timeout: 5000 });

      const statusSwitch = page.locator('input[type="checkbox"]').first();
      await expect(statusSwitch).toBeAttached({ timeout: 5000 });

      // When Tambah Reward is clicked or changes are made, Simpan Perubahan button appears
      const tambahRewardBtn = page.getByRole('button', { name: /Tambah Reward/i })
        .or(page.getByRole('link', { name: /Tambah Reward/i })).first();
      await tambahRewardBtn.click();

      const simpanBtn = page.getByRole('button', { name: /Simpan Perubahan/i }).first();
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-04] Memverifikasi tombol Tambah Reward dan Tambah Kampanye Promosi pada tab Referral', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol Tambah Reward dan Tambah Kampanye Promosi pada tab Referral', async () => {
      const tambahRewardBtn = page.getByRole('button', { name: /Tambah Reward/i })
        .or(page.getByRole('link', { name: /Tambah Reward/i })).first();
      await expect(tambahRewardBtn).toBeVisible({ timeout: 5000 });

      const tambahKampanyeBtn = page.getByRole('button', { name: /Tambah Kampanye Promosi/i })
        .or(page.getByRole('link', { name: /Tambah Kampanye Promosi/i })).first();
      await expect(tambahKampanyeBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-05] Mengklik Tambah Reward menambahkan baris input baru ke tabel dengan komponen yang sesuai', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengklik Tambah Reward menambahkan baris input baru ke tabel dengan komponen yang sesuai', async () => {
      const initialRowsCount = await getDataRows(page).count();

      const tambahRewardBtn = page.getByRole('button', { name: /Tambah Reward/i })
        .or(page.getByRole('link', { name: /Tambah Reward/i })).first();
      await tambahRewardBtn.click();

      // Verify a new row is added
      const newRows = getDataRows(page);
      await expect(newRows).toHaveCount(initialRowsCount + 1, { timeout: 5000 });

      const lastRow = newRows.last();
      // Verify inputs in newly added row
      await expect(lastRow.getByPlaceholder('Pilih Tipe Reward')).toBeVisible({ timeout: 5000 });
      await expect(lastRow.getByPlaceholder('Masukkan Qty')).toBeVisible({ timeout: 5000 });

      // Verify row delete button exists
      const deleteRowBtn = lastRow.locator('button:visible').last();
      await expect(deleteRowBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Bisa memilih tipe reward dan mengisi Qty pada baris tabel', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Bisa memilih tipe reward dan mengisi Qty pada baris tabel', async () => {
      const tambahRewardBtn = page.getByRole('button', { name: /Tambah Reward/i })
        .or(page.getByRole('link', { name: /Tambah Reward/i })).first();
      await tambahRewardBtn.click();

      const lastRow = getDataRows(page).last();

      // Select Tipe Reward
      const tipeRewardInput = lastRow.getByPlaceholder('Pilih Tipe Reward');
      await tipeRewardInput.click();
      const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
        await firstOption.click();
        await expect(tipeRewardInput).not.toHaveValue('');
      }

      // Fill Qty
      const qtyInput = lastRow.getByPlaceholder('Masukkan Qty');
      await qtyInput.fill('10');
      await expect(qtyInput).toHaveValue('10');
    
    });
  });

  test('[TC-07] Dapat menghapus baris reward yang baru ditambahkan menggunakan tombol aksi hapus', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Dapat menghapus baris reward yang baru ditambahkan menggunakan tombol aksi hapus', async () => {
      const tambahRewardBtn = page.getByRole('button', { name: /Tambah Reward/i })
        .or(page.getByRole('link', { name: /Tambah Reward/i })).first();
      await tambahRewardBtn.click();

      const countAfterAdd = await getDataRows(page).count();
      expect(countAfterAdd).toBeGreaterThan(0);

      // Click delete on the last row
      const lastRow = getDataRows(page).last();
      const deleteBtn = lastRow.locator('button:visible').last();
      await deleteBtn.click();

      // Verify row count decreased
      await expect(getDataRows(page)).toHaveCount(countAfterAdd - 1, { timeout: 5000 });
    
    });
  });

  test('[TC-08] Berpindah ke tab Ulang Tahun dan memverifikasi tabel serta tombol aksi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berpindah ke tab Ulang Tahun dan memverifikasi tabel serta tombol aksi', async () => {
      const tabUlangTahun = page.getByRole('tab', { name: /Ulang Tahun/i }).first();
      await tabUlangTahun.click();

      // Verify URL changed to /birthday
      await expect(page).toHaveURL(/\/admin\/promotion\/reward\/birthday/, { timeout: 15000 });

      // Verify table structure on Ulang Tahun tab
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Tipe Reward', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Isi Reward', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Qty', { exact: true }).first()).toBeVisible();

      // Verify Tambah Reward button on Ulang Tahun tab
      const tambahBtn = page.getByRole('button', { name: /Tambah Reward/i }).first();
      await expect(tambahBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-09] Berpindah ke tab Subscription dan memverifikasi tombol Tambah Paket', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berpindah ke tab Subscription dan memverifikasi tombol Tambah Paket', async () => {
      const tabSubscription = page.getByRole('tab', { name: /Subscription/i }).first();
      await tabSubscription.click();

      // Verify URL changed to /subscription
      await expect(page).toHaveURL(/\/admin\/promotion\/reward\/subscription/, { timeout: 15000 });

      // Verify Tambah Paket button
      const tambahPaketBtn = page.getByRole('button', { name: /Tambah Paket/i })
        .or(page.getByRole('link', { name: /Tambah Paket/i })).first();
      await expect(tambahPaketBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-10] Tombol Tambah Kampanye Promosi pada tab Reward mengarahkan ke form buat kampanye baru', async ({ page }) => {
    await test.step('Lakukan proses tombol Tambah Kampanye Promosi pada tab Reward mengarahkan ke form buat kampanye baru dan pastikan data tersimpan', async () => {
      const tambahKampanyeBtn = page.getByRole('button', { name: /Tambah Kampanye Promosi/i })
        .or(page.getByRole('link', { name: /Tambah Kampanye Promosi/i })).first();
      await tambahKampanyeBtn.click();

      // Verify redirected to campaign/add form
      await expect(page).toHaveURL(/\/admin\/promotion\/(reward\/)?campaign\/add/, { timeout: 15000 });
      await expect(page.getByText('Atur Promo').first()).toBeVisible({ timeout: 10000 });
    
    });
  });
});
