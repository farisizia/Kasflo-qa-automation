const { test, expect } = require('@playwright/test');

test.describe('Atur Rekening', () => {
  async function waitForPageReady(page) {
    const loader = page.locator(
      '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
    );
    await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

  // Helper login yang konsisten dan stabil
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
    if (page.url().includes('/admin/')) return page;

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
    const pwdInput = page.getByLabel(/Kata Sandi/i);
    await pwdInput.fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await pwdInput.press('Enter').catch(() => {});
    await loginBtn.click({ timeout: 3000 }).catch(() => {});

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await waitForPageReady(page);
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
      // Intercept subscription API agar fitur pengaturan aktif penuh tanpa modal upgrade
      await page.route('**/subscription**', async route => {
        try {
          const response = await route.fetch();
          const json = await response.json();
          if (json.data && json.data.active_features) {
            for (const key of Object.keys(json.data.active_features)) {
              if (typeof json.data.active_features[key] === 'boolean') {
                json.data.active_features[key] = true;
              }
            }
          }
          await route.fulfill({ json });
        } catch {
          await route.continue().catch(() => {});
        }
      });

      await loginBeforeTest(page);
      try {
        await page.goto('/admin/setting/bank-account', { waitUntil: 'domcontentloaded', timeout: 25000 });
      } catch {
        await page.goto('/admin/setting/bank-account', { waitUntil: 'commit', timeout: 25000 });
      }
      await expect(page).toHaveURL(/\/admin\/setting\/bank-account/, { timeout: 20000 });
    
    });
  });

  test('[TC-01] Menampilkan seluruh elemen utama halaman Atur Rekening', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan seluruh elemen utama halaman Atur Rekening', async () => {
      // 1. Breadcrumb
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root, main').filter({ hasText: 'Atur Rekening' });
      await expect(breadcrumb.first()).toBeVisible({ timeout: 10000 });

      // 2. Card Jumlah Rekening Bank (contoh: 0/5 Rekening Bank)
      const rekeningCard = page.locator('.mantine-Paper-root').filter({ hasText: 'Jumlah Rekening Bank' }).first();
      await expect(rekeningCard).toBeVisible();
      await expect(rekeningCard).toContainText(/Rekening Bank/i);

      // 3. Section Penarikan Dana
      const tarikDanaCard = page.locator('.mantine-Paper-root').filter({ hasText: 'Penarikan Dana' }).first();
      await expect(tarikDanaCard).toBeVisible();
      await expect(tarikDanaCard).toContainText('Tarik Dana ke Rekening Bank Terdaftar');
      const tarikDanaBtn = tarikDanaCard.getByRole('button', { name: 'Tarik Dana' });
      await expect(tarikDanaBtn).toBeVisible();

      // 4. Section PIN Transaksi & Keamanan
      const pinCard = page.locator('.mantine-Paper-root').filter({ hasText: 'PIN Transaksi & Keamanan' }).first();
      await expect(pinCard).toBeVisible();
      await expect(pinCard).toContainText('Penggantian PIN Transaksi');
      const gantiPinBtn = pinCard.getByRole('button', { name: 'Ganti PIN' });
      await expect(gantiPinBtn).toBeVisible();

      // 5. Section Daftar Rekening & Tombol Tambah Rekening
      const daftarRekeningCard = page.locator('.mantine-Paper-root').filter({ hasText: 'Daftar Rekening' }).first();
      await expect(daftarRekeningCard).toBeVisible();
      const tambahBtn = daftarRekeningCard.getByRole('button', { name: 'Tambah Rekening' });
      await expect(tambahBtn).toBeVisible();
    
    });
  });

  test('[TC-02] Menampilkan tabel daftar rekening bank dan status data kosong', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan tabel daftar rekening bank dan status data kosong', async () => {
      const daftarRekeningCard = page.locator('.mantine-Paper-root').filter({ hasText: 'Daftar Rekening' }).first();
      await expect(daftarRekeningCard).toBeVisible();

      // Memverifikasi kolom-kolom tabel header
      const headers = daftarRekeningCard.locator('table thead th');
      await expect(headers.nth(0)).toContainText('No');
      await expect(headers.nth(1)).toContainText('Bank');
      await expect(headers.nth(2)).toContainText('Nomor Rekening');
      await expect(headers.nth(3)).toContainText('Nama Pemilik');
      await expect(headers.nth(4)).toContainText('Status');
      await expect(headers.nth(5)).toContainText('Action');

      // Memverifikasi status kosong (Data bank masih kosong)
      const emptyStateText = daftarRekeningCard.locator('.mantine-Text-root').filter({ hasText: 'Data bank masih kosong' });
      await expect(emptyStateText).toBeVisible();
    
    });
  });

  test('[TC-03] Memverifikasi tombol Tarik Dana dalam status disabled saat belum ada rekening', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol Tarik Dana dalam status disabled saat belum ada rekening', async () => {
      const tarikDanaBtn = page.getByRole('button', { name: 'Tarik Dana' });
      await expect(tarikDanaBtn).toBeVisible();
      // Tombol harus disabled karena data rekening bank belum terdaftar
      const isDisabled = await tarikDanaBtn.isDisabled();
      expect(isDisabled).toBe(true);
    
    });
  });

  test('[TC-04] Membuka dan menutup Modal Tambah Rekening', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka dan menutup Modal Tambah Rekening', async () => {
      const tambahBtn = page.getByRole('button', { name: 'Tambah Rekening' });
      await expect(tambahBtn).toBeVisible();
      await tambahBtn.click();

      // Dialog Tambah Rekening terbuka
      const modalTambah = page.locator('[role="dialog"], .mantine-Modal-content').filter({ hasText: 'Tambah Rekening' });
      await expect(modalTambah).toBeVisible({ timeout: 10000 });

      // Memverifikasi elemen-elemen di dalam modal
      await expect(modalTambah.getByPlaceholder('Pilih Bank')).toBeVisible();
      await expect(modalTambah.getByPlaceholder('Masukkan Nomor Rekening')).toBeVisible();
      await expect(modalTambah.getByRole('button', { name: 'Cek Nama Pemilik' })).toBeVisible();
      await expect(modalTambah.getByRole('button', { name: 'Batal' })).toBeVisible();
      await expect(modalTambah.getByRole('button', { name: 'Simpan' })).toBeVisible();

      // Menutup modal dengan tombol Batal
      const batalBtn = modalTambah.getByRole('button', { name: 'Batal' });
      await batalBtn.click();
      await expect(modalTambah).toBeHidden({ timeout: 5000 });
    
    });
  });

  test('[TC-05] Memvalidasi pesan error saat menyimpan form Tambah Rekening kosong', async ({ page }) => {
    await test.step('Memvalidasi pesan error saat menyimpan form Tambah Rekening kosong', async () => {
      const tambahBtn = page.getByRole('button', { name: 'Tambah Rekening' });
      await tambahBtn.click();

      const modalTambah = page.locator('[role="dialog"], .mantine-Modal-content').filter({ hasText: 'Tambah Rekening' });
      await expect(modalTambah).toBeVisible();

      // Klik tombol Simpan tanpa mengisi data apapun
      const simpanBtn = modalTambah.getByRole('button', { name: 'Simpan' });
      await simpanBtn.click();

      // Pesan error 'Wajib Diisi' muncul
      const errorMessages = modalTambah.locator('.mantine-InputWrapper-error, :text("Wajib Diisi")');
      await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });
      const countErrors = await errorMessages.count();
      expect(countErrors).toBeGreaterThanOrEqual(1);

      // Menutup modal
      const batalBtn = modalTambah.getByRole('button', { name: 'Batal' });
      await batalBtn.click();
      await expect(modalTambah).toBeHidden({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Interaksi memilih bank dan mengisi Nomor Rekening pada Modal Tambah Rekening', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Interaksi memilih bank dan mengisi Nomor Rekening pada Modal Tambah Rekening', async () => {
      const tambahBtn = page.getByRole('button', { name: 'Tambah Rekening' });
      await tambahBtn.click();

      const modalTambah = page.locator('[role="dialog"], .mantine-Modal-content').filter({ hasText: 'Tambah Rekening' });
      await expect(modalTambah).toBeVisible();

      // Membuka dropdown Bank
      const bankSelect = modalTambah.getByPlaceholder('Pilih Bank');
      await bankSelect.click();
      await waitForPageReady(page);

      // Memilih bank dari daftar (Bank BCA)
      const bankOption = page.locator('.mantine-Select-option, [role="option"]').filter({ hasText: 'Bank BCA' }).first();
      await expect(bankOption).toBeVisible({ timeout: 5000 });
      await bankOption.click();

      // Mengisi nomor rekening
      const noRekInput = modalTambah.getByPlaceholder('Masukkan Nomor Rekening');
      await noRekInput.fill('1234567890');
      await expect(noRekInput).toHaveValue('1234567890');

      // Menutup modal dengan tombol Batal
      const batalBtn = modalTambah.getByRole('button', { name: 'Batal' });
      await batalBtn.click();
      await expect(modalTambah).toBeHidden({ timeout: 5000 });
    
    });
  });

  test('[TC-07] Membuka dan menutup Modal Ganti PIN', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka dan menutup Modal Ganti PIN', async () => {
      const gantiPinBtn = page.getByRole('button', { name: 'Ganti PIN' });
      await expect(gantiPinBtn).toBeVisible();
      await gantiPinBtn.click();

      // Modal Ganti PIN terbuka
      const modalPin = page.locator('[role="dialog"], .mantine-Modal-content').filter({ hasText: 'Ganti PIN' });
      await expect(modalPin).toBeVisible({ timeout: 10000 });

      // Memverifikasi elemen-elemen di dalam modal PIN
      await expect(modalPin.getByPlaceholder('Masukkan PIN Lama')).toBeVisible();
      await expect(modalPin.getByPlaceholder('Masukkan PIN Baru')).toBeVisible();
      await expect(modalPin.getByPlaceholder('Masukkan Konfirmasi PIN Baru')).toBeVisible();
      await expect(modalPin.getByRole('button', { name: 'Lupa PIN' })).toBeVisible();
      await expect(modalPin.getByRole('button', { name: 'Batal' })).toBeVisible();
      await expect(modalPin.getByRole('button', { name: 'Simpan' })).toBeVisible();

      // Menutup modal PIN
      const batalBtn = modalPin.getByRole('button', { name: 'Batal' });
      await batalBtn.click();
      await expect(modalPin).toBeHidden({ timeout: 5000 });
    
    });
  });

  test('[TC-08] Memvalidasi tombol Simpan dalam status disabled saat field PIN kosong', async ({ page }) => {
    await test.step('Memvalidasi tombol Simpan dalam status disabled saat field PIN kosong', async () => {
      const gantiPinBtn = page.getByRole('button', { name: 'Ganti PIN' });
      await gantiPinBtn.click();

      const modalPin = page.locator('[role="dialog"], .mantine-Modal-content').filter({ hasText: 'Ganti PIN' });
      await expect(modalPin).toBeVisible();

      // Tombol Simpan harus disabled saat field belum diisi
      const simpanBtn = modalPin.getByRole('button', { name: 'Simpan' });
      await expect(simpanBtn).toBeDisabled();

      // Coba mengisi field PIN
      await modalPin.getByPlaceholder('Masukkan PIN Lama').fill('123456');
      await modalPin.getByPlaceholder('Masukkan PIN Baru').fill('654321');
      await modalPin.getByPlaceholder('Masukkan Konfirmasi PIN Baru').fill('654321');

      // Menutup modal tanpa menyimpan
      const batalBtn = modalPin.getByRole('button', { name: 'Batal' });
      await batalBtn.click();
      await expect(modalPin).toBeHidden({ timeout: 5000 });
    
    });
  });
});
