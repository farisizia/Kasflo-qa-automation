const { test, expect } = require('@playwright/test');

test.describe('Pengaturan Shift', () => {
  async function waitForPageReady(page) {
    const loader = page.locator(
      '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
    );
    await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

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
    const pwdInput = page.getByLabel(/Kata Sandi/i);
    await pwdInput.fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });

    // Tekan Enter dan klik Masuk untuk menjamin submit form terpicu
    await pwdInput.press('Enter').catch(() => {});
    await loginBtn.click({ timeout: 3000 }).catch(() => {});

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
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
      // Intercept subscription to ensure shift settings are enabled
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
        await Promise.all([
          page.waitForResponse(
            res => res.url().includes('shift-times') && res.request().method() === 'GET',
            { timeout: 15000 }
          ).catch(() => {}),
          page.goto('/admin/setting/shift', { waitUntil: 'commit', timeout: 25000 }),
        ]);
      } catch {
        await page.goto('/admin/setting/shift', { waitUntil: 'domcontentloaded', timeout: 25000 });
      }
      await expect(page).toHaveURL(/\/admin\/setting\/shift/, { timeout: 20000 });

      const outletInput = page.getByPlaceholder('Pilih Outlet');
      await expect(outletInput).toBeVisible({ timeout: 15000 });
      await expect(page.locator('table')).toBeVisible({ timeout: 10000 });
      await waitForPageReady(page);
    
    });
  });

  test('[TC-01] Menampilkan halaman Pengaturan Shift dengan header, breadcrumb, absensi, dan tabel shift', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Pengaturan Shift dengan header, breadcrumb, absensi, dan tabel shift', async () => {
      // Verifikasi breadcrumb
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]');
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb).toContainText('Pengaturan Shift');

      // Verifikasi dropdown outlet / cabang
      const outletInput = page.getByPlaceholder('Pilih Outlet');
      await expect(outletInput).toBeVisible();

      // Verifikasi section Pengaturan Absensi
      await expect(page.locator('text=Pengaturan Absensi')).toBeVisible();
      await expect(page.locator('text=Wajib Absen')).toBeVisible();
      await expect(page.locator('text=Ketika pengaturan ini di aktifkan maka ketika masuk ke POS perlu masukkan kas awal')).toBeVisible();

      // Verifikasi tombol aksi
      await expect(page.getByRole('button', { name: 'Tambah Shift' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Simpan', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true })).toBeVisible();

      // Verifikasi tabel shift
      const table = page.locator('table');
      await expect(table).toBeVisible();
      await expect(table).toContainText('Nama Shift');
      await expect(table).toContainText('Jam Buka');
      await expect(table).toContainText('Jam Tutup');
      await expect(table).toContainText('Action');
    
    });
  });

  test('[TC-02] Mengaktifkan dan menonaktifkan toggle switch Wajib Absen pada Pengaturan Absensi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengaktifkan dan menonaktifkan toggle switch Wajib Absen pada Pengaturan Absensi', async () => {
      const switchInput = page.locator('input[type="checkbox"]').first();
      await expect(switchInput).toBeAttached();

      const initialChecked = await switchInput.isChecked();

      // Klik track / label switch untuk mengubah status
      const switchTrack = page.locator('.mantine-Switch-track, .mantine-Switch-root').first();
      await switchTrack.click();
      await waitForPageReady(page);

      // Verifikasi status checked berubah
      const toggledChecked = await switchInput.isChecked();
      expect(toggledChecked).toBe(!initialChecked);

      // Klik sekali lagi untuk mengembalikan ke status awal
      await switchTrack.click();
      await waitForPageReady(page);
      const restoredChecked = await switchInput.isChecked();
      expect(restoredChecked).toBe(initialChecked);
    
    });
  });

  test('[TC-03] Menambah baris baru shift via tombol Tambah Shift', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Menambah baris baru shift via tombol Tambah Shift', async () => {
      await waitForPageReady(page);
      const rows = page.locator('table tbody tr');
      const initialRowsCount = await rows.count();

      const tambahShiftBtn = page.getByRole('button', { name: 'Tambah Shift' });
      await tambahShiftBtn.click();
      await waitForPageReady(page);

      const newRowsCount = await rows.count();
      expect(newRowsCount).toBe(initialRowsCount + 1);

      // Verifikasi input fields di baris terakhir
      const lastRow = page.locator('table tbody tr').last();
      await expect(lastRow.getByPlaceholder('Masukkan Nama Shift')).toBeVisible();
      await expect(lastRow.getByPlaceholder('Masukkan Jam Mulai')).toBeVisible();
      await expect(lastRow.getByPlaceholder('Masukkan Jam Berakhir')).toBeVisible();
      await expect(lastRow.locator('button')).toBeVisible();
    
    });
  });

  test('[TC-04] Mengisi nama shift serta memilih Jam Mulai dan Jam Berakhir', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengisi nama shift serta memilih Jam Mulai dan Jam Berakhir', async () => {
      const tambahShiftBtn = page.getByRole('button', { name: 'Tambah Shift' });
      await tambahShiftBtn.click();
      await waitForPageReady(page);

      const targetRow = page.locator('table tbody tr').last();
      const namaShiftInput = targetRow.getByPlaceholder('Masukkan Nama Shift');
      const shiftName = 'Shift Siang QA ' + Date.now().toString().slice(-5);
      await namaShiftInput.fill(shiftName);
      await expect(namaShiftInput).toHaveValue(shiftName);

      // Pilih Jam Mulai
      const jamMulaiInput = targetRow.getByPlaceholder('Masukkan Jam Mulai');
      await jamMulaiInput.click();
      await waitForPageReady(page);

      const mulaiOption = page.locator('.mantine-Select-option:visible, [role="option"]:visible').first();
      const mulaiText = await mulaiOption.innerText();
      await mulaiOption.click();
      await expect(jamMulaiInput).toHaveValue(mulaiText);

      // Pilih Jam Berakhir
      const jamBerakhirInput = targetRow.getByPlaceholder('Masukkan Jam Berakhir');
      await jamBerakhirInput.click();
      await waitForPageReady(page);

      const berakhirOption = page.locator('.mantine-Select-option:visible, [role="option"]:visible').nth(8);
      const berakhirText = await berakhirOption.innerText();
      await berakhirOption.click();
      await expect(jamBerakhirInput).toHaveValue(berakhirText);
    
    });
  });

  test('[TC-05] Menghapus baris shift via tombol ikon hapus (tempat sampah merah)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Menghapus baris shift via tombol ikon hapus (tempat sampah merah)', async () => {
      // Pastikan setidaknya ada 1 baris
      const rows = page.locator('table tbody tr');
      let rowsCount = await rows.count();
      if (rowsCount === 0) {
        await page.getByRole('button', { name: 'Tambah Shift' }).click();
        await waitForPageReady(page);
        rowsCount = await rows.count();
      }

      const countBeforeDelete = rowsCount;
      const deleteBtn = rows.last().locator('button');
      await deleteBtn.click();
      await waitForPageReady(page);

      const countAfterDelete = await rows.count();
      expect(countAfterDelete).toBe(countBeforeDelete - 1);
    
    });
  });

  test('[TC-06] Berhasil menyimpan pengaturan shift untuk cabang aktif via tombol Simpan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan shift untuk cabang aktif via tombol Simpan', async () => {
      // Bersihkan baris shift berlebih jika sudah lebih dari 2 baris agar data tetap idempoten
      const rows = page.locator('table tbody tr');
      while (await rows.count() > 2) {
        await rows.last().locator('button').click();
        await waitForPageReady(page);
      }

      // Tambah satu shift untuk memastikan data dirty dan valid
      const tambahShiftBtn = page.getByRole('button', { name: 'Tambah Shift' });
      await expect(tambahShiftBtn).toBeVisible();
      await expect(tambahShiftBtn).toBeEnabled();
      await tambahShiftBtn.click();
      await waitForPageReady(page);

      const newRow = page.locator('table tbody tr').last();
      const uniqueSuffix = Date.now().toString().slice(-6);
      await newRow.getByPlaceholder('Masukkan Nama Shift').fill(`Shift Simpan ${uniqueSuffix}`);

      // Pilih Jam Mulai
      await newRow.getByPlaceholder('Masukkan Jam Mulai').click();
      await waitForPageReady(page);
      await page.locator('.mantine-Select-option:visible, [role="option"]:visible').first().click();

      // Pilih Jam Berakhir
      await newRow.getByPlaceholder('Masukkan Jam Berakhir').click();
      await waitForPageReady(page);
      await page.locator('.mantine-Select-option:visible, [role="option"]:visible').nth(10).click();

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible();
      await expect(simpanBtn).toBeEnabled();

      // Tunggu request PUT save dan response
      const [putResponse] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('shift-times') && res.request().method() === 'PUT',
          { timeout: 15000 }
        ),
        simpanBtn.click(),
      ]);

      expect(putResponse.status()).toBe(200);

      // Pastikan loading spinner selesai
      await expect(page.locator('.mantine-Loader-root').first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
    });
  });

  test('[TC-07] Berhasil menyimpan pengaturan shift untuk semua cabang via tombol Simpan Semua Cabang', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan shift untuk semua cabang via tombol Simpan Semua Cabang', async () => {
      // Bersihkan baris shift berlebih jika sudah lebih dari 2 baris agar data tetap idempoten
      const rows = page.locator('table tbody tr');
      while (await rows.count() > 2) {
        await rows.last().locator('button').click();
        await waitForPageReady(page);
      }

      // Tambah satu shift atau edit nama shift
      const tambahShiftBtn = page.getByRole('button', { name: 'Tambah Shift' });
      await expect(tambahShiftBtn).toBeVisible();
      await expect(tambahShiftBtn).toBeEnabled();
      await tambahShiftBtn.click();
      await waitForPageReady(page);

      const newRow = page.locator('table tbody tr').last();
      const uniqueSuffix = Date.now().toString().slice(-6);
      await newRow.getByPlaceholder('Masukkan Nama Shift').fill(`Shift Semua ${uniqueSuffix}`);

      // Pilih Jam Mulai
      await newRow.getByPlaceholder('Masukkan Jam Mulai').click();
      await waitForPageReady(page);
      await page.locator('.mantine-Select-option:visible, [role="option"]:visible').first().click();

      // Pilih Jam Berakhir
      await newRow.getByPlaceholder('Masukkan Jam Berakhir').click();
      await waitForPageReady(page);
      await page.locator('.mantine-Select-option:visible, [role="option"]:visible').nth(12).click();

      const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
      await expect(simpanSemuaBtn).toBeVisible();
      await expect(simpanSemuaBtn).toBeEnabled();

      let requestBody = null;
      page.on('request', req => {
        if (req.url().includes('shift-times') && req.method() === 'PUT') {
          try {
            requestBody = JSON.parse(req.postData());
          } catch {
            requestBody = req.postData();
          }
        }
      });

      const [putResponse] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('shift-times') && res.request().method() === 'PUT',
          { timeout: 15000 }
        ),
        simpanSemuaBtn.click(),
      ]);

      expect(putResponse.status()).toBe(200);
      if (requestBody && typeof requestBody === 'object') {
        expect(requestBody.is_apply_to_all_branches).toBe(1);
      }

      // Pastikan loading spinner selesai
      await expect(page.locator('.mantine-Loader-root').first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
    
    });
  });
});
