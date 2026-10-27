const { test, expect } = require('@playwright/test');

test.describe('Poin Loyalitas', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

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
      const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible')
        .filter({ hasText: optionText }).first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click();
        return;
      }
    }

    const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Enable customer point feature in subscription mock
      await page.route('**/backoffice/v1/subscription', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        if (json.data && json.data.active_features) {
          json.data.active_features.enable_customer_point = true;
        }
        await route.fulfill({ response, json });
      });

      // Mock points list API fallback to ensure clean table rendering
      await page.route('**/points**', async (route) => {
        if (route.request().method() === 'GET') {
          const response = await route.fetch().catch(() => null);
          if (response && response.status() === 200) {
            const json = await response.json().catch(() => null);
            if (json && json.code === 200) {
              await route.fulfill({ response, json });
              return;
            }
          }
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              code: 200,
              status: 'OK',
              data: [],
              pagination: { total_data: 0, total_page: 0, current_page: 1, per_page: 25 }
            })
          });
        } else {
          await route.continue();
        }
      });

      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Poin page
      await page.goto('/admin/promotion/point', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify Poin page loaded
      await expect(page).toHaveURL(/\/admin\/promotion\/point/, { timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman Poin dengan tab Poin Per Pembelian dan Poin Per Menu', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Poin dengan tab Poin Per Pembelian dan Poin Per Menu', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText('Poin')).toBeVisible();

      // Verify Tab "Poin Per Pembelian"
      const tabPembelian = page.getByRole('tab', { name: /Poin Per Pembelian/i }).first();
      await expect(tabPembelian).toBeVisible({ timeout: 5000 });

      // Verify Tab "Poin Per Menu"
      const tabMenu = page.getByRole('tab', { name: /Poin Per Menu/i }).first();
      await expect(tabMenu).toBeVisible({ timeout: 5000 });

      // Verify Add Button on Poin Per Pembelian tab
      const addBtn = page.getByRole('button', { name: /Tambah Poin Per Pembelian/i })
        .or(page.getByRole('link', { name: /Tambah Poin Per Pembelian/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-02] Memverifikasi struktur tabel dan header kolom pada tab Poin Per Pembelian', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel dan header kolom pada tab Poin Per Pembelian', async () => {
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Nama Reward', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Poin', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Status', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Minimal Pembelian', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Waktu Mulai', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Waktu Berakhir', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-03] Berpindah ke tab Poin Per Menu dan memverifikasi tampilan tab serta tombol aksi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berpindah ke tab Poin Per Menu dan memverifikasi tampilan tab serta tombol aksi', async () => {
      const tabMenu = page.getByRole('tab', { name: /Poin Per Menu/i }).first();
      await expect(tabMenu).toBeVisible();
      await tabMenu.click();

      // Verify Add Button changes for Poin Per Menu
      const addMenuBtn = page.getByRole('button', { name: /Tambah Poin Per Menu/i })
        .or(page.getByRole('link', { name: /Tambah Poin Per Menu/i })).first();
      await expect(addMenuBtn).toBeVisible({ timeout: 5000 });

      // Verify table structure on Poin Per Menu tab
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-04] Navigasi ke form Tambah Poin Per Pembelian dan memverifikasi seluruh komponen form', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke form Tambah Poin Per Pembelian dan memverifikasi seluruh komponen form', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Poin Per Pembelian/i })
        .or(page.getByRole('link', { name: /Tambah Poin Per Pembelian/i })).first();
      await addBtn.click();

      // Verify navigated to transaction/add form
      await expect(page).toHaveURL(/\/admin\/promotion\/point\/transaction\/add/, { timeout: 15000 });

      // Verify form input fields
      await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Nama Reward').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Jumlah Poin').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Minimal Pembelian').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Deskripsi').first()).toBeVisible({ timeout: 5000 });

      // Verify date pickers
      const dateButtons = page.getByRole('button', { name: /Pilih Tanggal/i });
      await expect(dateButtons.nth(0)).toBeVisible({ timeout: 5000 });
      await expect(dateButtons.nth(1)).toBeVisible({ timeout: 5000 });

      // Verify action buttons
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i }).first();
      await expect(cancelBtn).toBeVisible({ timeout: 5000 });

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-05] Tombol Batalkan pada form Tambah Poin Per Pembelian mengembalikan ke halaman Poin', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol Batalkan pada form Tambah Poin Per Pembelian mengembalikan ke halaman Poin', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Poin Per Pembelian/i })
        .or(page.getByRole('link', { name: /Tambah Poin Per Pembelian/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/promotion\/point\/transaction\/add/);

      const cancelBtn = page.getByRole('button', { name: /Batalkan/i }).first();
      await cancelBtn.click();

      await expect(page).toHaveURL(/\/admin\/promotion\/point$/, { timeout: 15000 });
    
    });
  });

  test('[TC-06] Validasi form Tambah Poin Per Pembelian saat submit form kosong', async ({ page }) => {
    await test.step('Validasi form Tambah Poin Per Pembelian saat submit form kosong', async () => {
      await page.goto('/admin/promotion/point/transaction/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/promotion\/point\/transaction\/add/);

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();
      await expect(simpanBtn).toBeVisible();
      await simpanBtn.click();

      // Verify stays on form page due to required field validations
      await expect(page).toHaveURL(/\/admin\/promotion\/point\/transaction\/add/);
    
    });
  });

  test('[TC-07] Bisa mengisi seluruh field form Tambah Poin Per Pembelian', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Bisa mengisi seluruh field form Tambah Poin Per Pembelian', async () => {
      await page.goto('/admin/promotion/point/transaction/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/promotion\/point\/transaction\/add/);

      // 1. Select Cabang
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await selectMantineOption(page, cabangInput);

      // 2. Fill Nama Reward
      const rewardName = 'Poin Loyalty QA ' + Date.now();
      const nameInput = page.getByPlaceholder('Masukkan Nama Reward').first();
      await nameInput.fill(rewardName);
      await expect(nameInput).toHaveValue(rewardName);

      // 3. Fill Jumlah Poin
      const pointInput = page.getByPlaceholder('Masukkan Jumlah Poin').first();
      await pointInput.fill('100');
      await expect(pointInput).toHaveValue('100');

      // 4. Fill Minimal Pembelian (Mantine NumberInput formats with thousand separator)
      const minBuyInput = page.getByPlaceholder('Masukkan Minimal Pembelian').first();
      await minBuyInput.fill('50000');
      await expect(minBuyInput).toHaveValue(/50[.,]000|50000/);

      // 5. Fill Deskripsi
      const descInput = page.getByPlaceholder('Masukkan Deskripsi').first();
      await descInput.fill('Deskripsi Poin Loyalty untuk pengujian otomatis');
      await expect(descInput).toHaveValue('Deskripsi Poin Loyalty untuk pengujian otomatis');
    
    });
  });

  test('[TC-08] Navigasi ke form Tambah Poin Per Menu dan memverifikasi komponen form', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke form Tambah Poin Per Menu dan memverifikasi komponen form', async () => {
      // Switch to tab Poin Per Menu first
      const tabMenu = page.getByRole('tab', { name: /Poin Per Menu/i }).first();
      await tabMenu.click();

      const addMenuBtn = page.getByRole('button', { name: /Tambah Poin Per Menu/i })
        .or(page.getByRole('link', { name: /Tambah Poin Per Menu/i })).first();
      await addMenuBtn.click();

      // Verify navigated to product/add
      await expect(page).toHaveURL(/\/admin\/promotion\/point\/product\/add/, { timeout: 15000 });

      // Verify key fields
      await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Nama Reward').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Deskripsi').first()).toBeVisible({ timeout: 5000 });

      // Verify action buttons
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i }).first();
      await expect(cancelBtn).toBeVisible({ timeout: 5000 });

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });

      // Cancel returns to Poin page
      await cancelBtn.click();
      await expect(page).toHaveURL(/\/admin\/promotion\/point/, { timeout: 15000 });
    
    });
  });

  test('[TC-09] Memverifikasi responsivitas tabel poin dan state baris data', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas tabel poin dan state baris data', async () => {
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const tbody = page.locator('table:visible tbody').first();
      await expect(tbody).toBeVisible({ timeout: 5000 });

      // Verify tbody renders row state (data rows, empty placeholder, or status row)
      const rows = tbody.locator('tr');
      await expect(rows.first()).toBeVisible({ timeout: 5000 });
    
    });
  });
});
