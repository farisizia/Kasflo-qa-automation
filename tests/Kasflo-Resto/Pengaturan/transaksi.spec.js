const { test, expect } = require('@playwright/test');

test.describe('Pengaturan Transaksi', () => {
  // Helper login yang konsisten dan stabil
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) return page;
    try {
      await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
    } catch {
      if (page.url().includes('/admin/')) return page;
    }
    if (page.url().includes('/admin/')) return page;

    const emailInput = page.getByLabel(/Email atau Username/i);
    await expect(emailInput).toBeVisible({ timeout: 20000 });
    await emailInput.fill('qakasflo@automation.com');
    const pwdInput = page.getByLabel(/Kata Sandi/i);
    await pwdInput.fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await pwdInput.press('Enter').catch(() => {});
    await loginBtn.click({ timeout: 3000 }).catch(() => {});

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await page.waitForTimeout(1500);
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
        await page.goto('/admin/setting/transaction', { waitUntil: 'domcontentloaded', timeout: 25000 });
      } catch {
        await page.goto('/admin/setting/transaction', { waitUntil: 'commit', timeout: 25000 });
      }
      await expect(page).toHaveURL(/\/admin\/setting\/transaction/, { timeout: 20000 });

      // Pastikan form dan data outlet telah selesai dimuat dari backend
      const outletInput = page.getByPlaceholder('Pilih Outlet');
      await expect(outletInput).toBeVisible({ timeout: 15000 });
      await expect(outletInput).not.toHaveValue('', { timeout: 10000 }).catch(() => {});
      await expect(page.getByPlaceholder('Masukkan Target Transaksi')).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan seluruh elemen utama halaman Pengaturan Transaksi', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan seluruh elemen utama halaman Pengaturan Transaksi', async () => {
      // 1. Breadcrumb
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root, main').filter({ hasText: 'Transaksi' });
      await expect(breadcrumb.first()).toBeVisible({ timeout: 10000 });

      // 2. Dropdown Pemilih Outlet
      const outletInput = page.getByPlaceholder('Pilih Outlet');
      await expect(outletInput).toBeVisible();

      // 3. Tombol Aksi Simpan dan Simpan Semua Cabang
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible();
      const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
      await expect(simpanSemuaBtn).toBeVisible();

      // 4. Section Target Transaksi Harian Cabang
      const targetSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Target Transaksi Harian Cabang' }).first();
      await expect(targetSection).toBeVisible();
      await expect(targetSection.getByPlaceholder('Masukkan Target Transaksi')).toBeVisible();

      // 5. Section Pengaturan Cash Drawer
      const cashDrawerSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Cash Drawer' }).first();
      await expect(cashDrawerSection).toBeVisible();
      await expect(cashDrawerSection.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer')).toBeVisible();

      // 6. Section Pengaturan Pembulatan
      const pembulatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Pembulatan' }).first();
      await expect(pembulatanSection).toBeVisible();
      await expect(pembulatanSection.locator('label:has-text("Ya")')).toBeVisible();
      await expect(pembulatanSection.locator('label:has-text("Tidak")')).toBeVisible();

      // 7. Section Otentikasi Pembatalan Transaksi
      const otentikasiSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Otentikasi Pembatalan Transaksi' }).first();
      await expect(otentikasiSection).toBeVisible();
      await expect(otentikasiSection).toContainText('Lakukan Otentikasi dengan Kode OTP');

      // 8. Section Pengaturan Catatan Transaksi
      const catatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Catatan Transaksi' }).first();
      await expect(catatanSection).toBeVisible();
      await expect(catatanSection.locator('label:has-text("Ya")')).toBeVisible();
      await expect(catatanSection.locator('label:has-text("Tidak")')).toBeVisible();
    
    });
  });

  test('[TC-02] Menampilkan dan berinteraksi dengan dropdown pemilih outlet', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan dan berinteraksi dengan dropdown pemilih outlet', async () => {
      const outletInput = page.getByPlaceholder('Pilih Outlet');
      await expect(outletInput).toBeVisible();

      // Tunggu hingga nama outlet terisi dari fetch API
      await expect(outletInput).not.toHaveValue('', { timeout: 10000 });
      const currentOutlet = await outletInput.inputValue();
      expect(currentOutlet.length).toBeGreaterThan(0);

      // Klik dropdown outlet untuk melihat daftar pilihan
      await outletInput.click();
      await page.waitForTimeout(500);

      const options = page.locator('.mantine-Select-option, [role="option"]');
      await expect(options.first()).toBeVisible({ timeout: 5000 });
      const count = await options.count();
      expect(count).toBeGreaterThan(0);

      // Pilih opsi pertama untuk memastikan interaksi stabil
      await options.first().click();
      await page.waitForTimeout(500);
    
    });
  });

  test('[TC-03] Mengisi input Target Transaksi Harian Cabang', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengisi input Target Transaksi Harian Cabang', async () => {
      const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
      await expect(targetInput).toBeVisible();

      await page.waitForTimeout(300);
      await targetInput.click();
      await targetInput.press('ControlOrMeta+a');
      await targetInput.press('Backspace');
      await targetInput.fill('');
      await targetInput.pressSequentially('1500000', { delay: 40 });

      // Verifikasi nilai telah terisi dengan format angka / nominal secara auto-retry
      await expect(targetInput).toHaveValue(/1\.500\.000/, { timeout: 10000 });
    
    });
  });

  test('[TC-04] Mengisi input Pengaturan Cash Drawer', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengisi input Pengaturan Cash Drawer', async () => {
      const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
      await expect(cashDrawerInput).toBeVisible();

      await page.waitForTimeout(300);
      await cashDrawerInput.click();
      await cashDrawerInput.press('ControlOrMeta+a');
      await cashDrawerInput.press('Backspace');
      await cashDrawerInput.fill('');
      await cashDrawerInput.pressSequentially('750000', { delay: 40 });

      // Verifikasi nilai telah terisi dengan format angka / nominal secara auto-retry
      await expect(cashDrawerInput).toHaveValue(/750\.000/, { timeout: 10000 });
    
    });
  });

  test('[TC-05] Mengatur opsi radio Pengaturan Pembulatan (Ya / Tidak)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengatur opsi radio Pengaturan Pembulatan (Ya / Tidak)', async () => {
      const pembulatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Pembulatan' }).first();
      await expect(pembulatanSection).toBeVisible();

      // 1. Klik opsi 'Ya' pada Pengaturan Pembulatan menggunakan .mantine-Radio-root
      const yaRadioRoot = pembulatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Ya' });
      await yaRadioRoot.click();
      await page.waitForTimeout(800);

      // Field konfigurasi pembulatan harus muncul
      const modeSelect = page.getByPlaceholder('Pilih Mode Pembulatan');
      await expect(modeSelect).toBeVisible({ timeout: 10000 });
      await expect(page.getByPlaceholder('Pilih Pembulatan Nilai Terdekat')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Pilih Angka Desimal Penjualan')).toBeVisible({ timeout: 5000 });

      // 2. Klik opsi 'Tidak'
      const tidakRadioRoot = pembulatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Tidak' });
      await tidakRadioRoot.click();
      await page.waitForTimeout(800);

      // Field konfigurasi pembulatan harus tersembunyi
      await expect(modeSelect).toBeHidden({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Mengatur toggle Otentikasi Pembatalan Transaksi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengatur toggle Otentikasi Pembatalan Transaksi', async () => {
      const otentikasiSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Otentikasi Pembatalan Transaksi' }).first();
      await expect(otentikasiSection).toBeVisible();

      // Deskripsi pengiriman OTP via WhatsApp
      await expect(otentikasiSection).toContainText('Kirim kode OTP ke Whatsapp Owner');

      // Toggle switch (elemen visible adalah track / root)
      const switchTrack = otentikasiSection.locator('.mantine-Switch-track, .mantine-Switch-root').first();
      await expect(switchTrack).toBeVisible();

      // Klik toggle untuk verifikasi interaksi
      await switchTrack.click();
      await page.waitForTimeout(500);

      // Klik kembali untuk mengembalikan status
      await switchTrack.click();
      await page.waitForTimeout(500);
    
    });
  });

  test('[TC-07] Mengatur opsi radio Pengaturan Catatan Transaksi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengatur opsi radio Pengaturan Catatan Transaksi', async () => {
      const catatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Catatan Transaksi' }).first();
      await expect(catatanSection).toBeVisible();

      // Memverifikasi pertanyaan catatan transaksi
      await expect(catatanSection).toContainText('Apakah wajib memasukkan catatan transaksi');

      // 1. Klik opsi 'Ya'
      const yaRadioRoot = catatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Ya' });
      await yaRadioRoot.click();
      await page.waitForTimeout(300);

      // 2. Klik opsi 'Tidak'
      const tidakRadioRoot = catatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Tidak' });
      await tidakRadioRoot.click();
      await page.waitForTimeout(300);
    
    });
  });

  test('[TC-08] Berhasil menyimpan pengaturan transaksi via tombol Simpan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan transaksi via tombol Simpan', async () => {
      // Ubah target transaksi
      const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
      await targetInput.click();
      await targetInput.press('ControlOrMeta+a');
      await targetInput.press('Backspace');
      await targetInput.fill('');
      await targetInput.pressSequentially('2000000', { delay: 30 });

      // Ubah cash drawer
      const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
      await cashDrawerInput.click();
      await cashDrawerInput.press('ControlOrMeta+a');
      await cashDrawerInput.press('Backspace');
      await cashDrawerInput.fill('');
      await cashDrawerInput.pressSequentially('500000', { delay: 30 });

      // Tangkap request API save
      let savePayload = null;
      page.on('request', req => {
        if (req.method() === 'PUT' && req.url().includes('other-settings')) {
          try {
            savePayload = JSON.parse(req.postData());
          } catch {}
        }
      });

      // Klik tombol Simpan (untuk cabang aktif)
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await simpanBtn.click();

      // Verifikasi toast notifikasi sukses
      const toast = page.locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' });
      await expect(toast).toBeVisible({ timeout: 10000 });

      // Verifikasi payload bahwa is_apply_to_all_branches bernilai 0
      if (savePayload) {
        expect(savePayload.is_apply_to_all_branches).toBe(0);
      }
    
    });
  });

  test('[TC-09] Berhasil menyimpan pengaturan transaksi via tombol Simpan Semua Cabang', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan transaksi via tombol Simpan Semua Cabang', async () => {
      // Ubah nilai input agar form berada dalam kondisi siap simpan dengan nilai berbeda
      const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
      await targetInput.click();
      await targetInput.press('ControlOrMeta+a');
      await targetInput.press('Backspace');
      await targetInput.fill('');
      await targetInput.pressSequentially('2500000', { delay: 30 });

      const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
      await cashDrawerInput.click();
      await cashDrawerInput.press('ControlOrMeta+a');
      await cashDrawerInput.press('Backspace');
      await cashDrawerInput.fill('');
      await cashDrawerInput.pressSequentially('600000', { delay: 30 });

      // Tangkap request API save
      let savePayload = null;
      page.on('request', req => {
        if (req.method() === 'PUT' && req.url().includes('other-settings')) {
          try {
            savePayload = JSON.parse(req.postData());
          } catch {}
        }
      });

      // Klik tombol Simpan Semua Cabang
      const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
      await simpanSemuaBtn.click();

      // Verifikasi toast notifikasi sukses
      const toast = page.locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' });
      await expect(toast).toBeVisible({ timeout: 10000 });

      // Verifikasi payload bahwa is_apply_to_all_branches bernilai 1
      if (savePayload) {
        expect(savePayload.is_apply_to_all_branches).toBe(1);
      }
    
    });
  });
});
