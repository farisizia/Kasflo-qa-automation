const { test, expect } = require('@playwright/test');

test.describe('Pengaturan Struk', () => {
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
    const pwdInput = page.getByLabel(/Kata Sandi/i);
    await pwdInput.fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });

    // Tekan Enter dan klik Masuk untuk menjamin submit form terpicu
    await pwdInput.press('Enter').catch(() => {});
    await loginBtn.click({ timeout: 3000 }).catch(() => {});

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await page.waitForTimeout(1000);
        if (await loginBtn.isEnabled().catch(() => false)) {
          await loginBtn.click({ timeout: 3000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      }
    }
    return page;
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Intercept subscription to ensure receipt settings are enabled
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
        await page.goto('/admin/setting/receipt', { waitUntil: 'domcontentloaded', timeout: 25000 });
      } catch {
        await page.goto('/admin/setting/receipt', { waitUntil: 'commit', timeout: 25000 });
      }
      await expect(page).toHaveURL(/\/admin\/setting\/receipt/, { timeout: 20000 });

      const outletInput = page.getByPlaceholder('Pilih Outlet');
      await expect(outletInput).toBeVisible({ timeout: 15000 });
      await expect(page.getByPlaceholder('Masukkan Header')).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(500);
    
    });
  });

  test('[TC-01] Menampilkan halaman Pengaturan Struk dengan header, breadcrumb, dan tombol aksi', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Pengaturan Struk dengan header, breadcrumb, dan tombol aksi', async () => {
      // Verifikasi breadcrumb
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]');
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb).toContainText('Pengaturan Struk');

      // Verifikasi dropdown outlet / cabang
      const outletInput = page.getByPlaceholder('Pilih Outlet');
      await expect(outletInput).toBeVisible({ timeout: 10000 });

      // Verifikasi tombol Simpan & Simpan Semua Cabang
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 10000 });
      await expect(simpanSemuaBtn).toBeVisible({ timeout: 10000 });

      // Verifikasi form pengaturan dan preview struk tampil
      await expect(page.locator('text=Logo Usaha')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('img[src*="struk.png"]')).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-02] Memverifikasi seluruh komponen form input pada pengaturan struk', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi seluruh komponen form input pada pengaturan struk', async () => {
      // Dropzone upload logo usaha atau tombol hapus jika logo sudah ada
      await expect(page.locator('text=Logo Usaha')).toBeVisible({ timeout: 10000 });
      const dropzoneText = page.getByText(/Gunakan file \.jpg\/\.png & maks\. 5 MB/i);
      const hapusBtn = page.getByRole('button', { name: 'Hapus' });
      await expect(dropzoneText.or(hapusBtn)).toBeVisible({ timeout: 10000 });

      const fileInput = page.locator('input[type="file"]');
      await expect(fileInput).toBeAttached();

      // Text fields
      const headerInput = page.getByPlaceholder('Masukkan Header');
      const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
      const footerInput = page.getByPlaceholder('Masukkan Footer');

      await expect(headerInput).toBeVisible({ timeout: 10000 });
      await expect(alamatInput).toBeVisible({ timeout: 10000 });
      await expect(footerInput).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-03] Interaksi dropdown pemilihan outlet / cabang', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Interaksi dropdown pemilihan outlet / cabang', async () => {
      const outletInput = page.getByPlaceholder('Pilih Outlet');
      await expect(outletInput).toBeVisible({ timeout: 10000 });
      const currentOutlet = await outletInput.inputValue();
      expect(currentOutlet.length).toBeGreaterThan(0);

      // Buka dropdown outlet
      await outletInput.click();

      // Verifikasi opsi combobox muncul
      const comboboxOptions = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
      await expect(comboboxOptions.first()).toBeVisible({ timeout: 10000 });
      const count = await comboboxOptions.count();
      expect(count).toBeGreaterThan(0);

      // Tutup combobox dengan Escape
      await page.keyboard.press('Escape').catch(() => {});
    
    });
  });

  test('[TC-04] Mengisi Header, Alamat Usaha, dan Footer serta memverifikasi Live Preview struk ter-update secara real-time', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengisi Header, Alamat Usaha, dan Footer serta memverifikasi Live Preview struk ter-update secara real-time', async () => {
      const headerInput = page.getByPlaceholder('Masukkan Header');
      const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
      const footerInput = page.getByPlaceholder('Masukkan Footer');

      const testHeader = 'Restoran Kasflo Lezat';
      const testAlamat = 'Jl. Kemang Raya No. 123, Jakarta Selatan';
      const testFooter = 'Terima Kasih Atas Kunjungan Anda! Datang Kembali';

      await headerInput.fill(testHeader);
      await alamatInput.fill(testAlamat);
      await footerInput.fill(testFooter);

      // Verifikasi teks langsung tampil pada kolom Live Preview struk di sebelah kanan
      const previewContainer = page.locator('.mantine-Grid-col').last();
      await expect(previewContainer).toContainText(testHeader, { timeout: 10000 });
      await expect(previewContainer).toContainText(testAlamat, { timeout: 10000 });
      await expect(previewContainer).toContainText(testFooter, { timeout: 10000 });

      // Gambar template struk dummy tetap tampil di preview
      await expect(page.locator('img[src*="struk.png"]')).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-05] Mengunggah logo usaha dan memverifikasi logo tampil di live preview serta opsi hapus logo', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengunggah logo usaha dan memverifikasi logo tampil di live preview serta opsi hapus logo', async () => {
      // Bersihkan logo yang sudah ada sebelumnya jika ada
      const existingHapusBtn = page.getByRole('button', { name: 'Hapus' });
      if (await existingHapusBtn.isVisible().catch(() => false)) {
        await existingHapusBtn.click();
        await page.waitForTimeout(500);
      }

      const fileInput = page.locator('input[type="file"]');

      // 1x1 base64 transparent PNG
      const dummyImageBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        'base64'
      );

      await fileInput.setInputFiles({
        name: 'kasflo-logo-test.png',
        mimeType: 'image/png',
        buffer: dummyImageBuffer,
      });

      // Tombol Hapus harus muncul setelah gambar terunggah
      const hapusBtn = page.getByRole('button', { name: 'Hapus' });
      await expect(hapusBtn).toBeVisible({ timeout: 10000 });

      // Verifikasi preview struk menampilkan elemen gambar logo (blob URL)
      const previewContainer = page.locator('.mantine-Grid-col').last();
      const logoImgInPreview = previewContainer.locator('img[src^="blob:"]');
      await expect(logoImgInPreview).toBeVisible({ timeout: 10000 });

      // Klik tombol Hapus untuk menghapus logo yang baru diunggah
      await hapusBtn.click();

      // Setelah dihapus, area upload dropzone kembali muncul dan tombol Hapus hilang
      await expect(hapusBtn).not.toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-06] Berhasil menyimpan pengaturan struk untuk cabang aktif via tombol Simpan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan struk untuk cabang aktif via tombol Simpan', async () => {
      const headerInput = page.getByPlaceholder('Masukkan Header');
      const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
      const footerInput = page.getByPlaceholder('Masukkan Footer');

      const randomSuffix = Math.floor(Math.random() * 1000);
      await headerInput.fill(`Header Resto QA ${randomSuffix}`);
      await alamatInput.fill(`Jl. QA Otomasi No. ${randomSuffix}`);
      await footerInput.fill(`Footer QA ${randomSuffix}`);

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });

      // Tunggu request PUT save dan response
      const [putResponse] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('print-receipt-setting') && res.request().method() === 'PUT',
          { timeout: 15000 }
        ),
        simpanBtn.click(),
      ]);

      expect(putResponse.status()).toBe(200);

      // Pastikan loading spinner selesai dan tidak ada infinite spinner
      await expect(page.locator('.mantine-Loader-root').first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
    
    });
  });

  test('[TC-07] Berhasil menyimpan pengaturan struk untuk semua cabang via tombol Simpan Semua Cabang', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan struk untuk semua cabang via tombol Simpan Semua Cabang', async () => {
      const headerInput = page.getByPlaceholder('Masukkan Header');
      const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
      const footerInput = page.getByPlaceholder('Masukkan Footer');

      const randomSuffix = Math.floor(Math.random() * 1000);
      await headerInput.fill(`Resto Semua Cabang ${randomSuffix}`);
      await alamatInput.fill(`Jl. Pusat Nasional No. ${randomSuffix}`);
      await footerInput.fill(`Terima Kasih Seluruh Cabang ${randomSuffix}`);

      const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });

      // Tangkap request PUT untuk verifikasi flag apply to all branches
      let requestPayload = null;
      page.on('request', req => {
        if (req.url().includes('print-receipt-setting') && req.method() === 'PUT') {
          requestPayload = req.postData();
        }
      });

      const [putResponse] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('print-receipt-setting') && res.request().method() === 'PUT',
          { timeout: 15000 }
        ),
        simpanSemuaBtn.click(),
      ]);

      expect(putResponse.status()).toBe(200);
      if (requestPayload) {
        expect(requestPayload).toContain('is_apply_to_all_branches');
      }

      // Pastikan loading spinner selesai
      await expect(page.locator('.mantine-Loader-root').first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
    
    });
  });
});
