const { test, expect } = require('@playwright/test');

test.describe('Pajak & Biaya Lainnya', () => {
  async function waitForPageReady(page) {
    const loader = page.locator(
      '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
    );
    await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

  // Helper login yang tangguh dan menghindari timeout redirect
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
    await waitForPageReady(page);
    return page;
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Intercept subscription endpoint agar fitur Pajak & Biaya Tambahan selalu aktif
      await page.route('**/subscription**', async route => {
        try {
          const response = await route.fetch();
          const json = await response.json();
          if (json.data && json.data.active_features) {
            json.data.active_features.enable_setting_tax_and_other_fee = true;
            json.data.active_features.enable_transaction_additional_cost = true;
            json.data.active_features.max_setting_transaction_additional_cost = 10;
          }
          await route.fulfill({ json });
        } catch {
          await route.continue().catch(() => {});
        }
      });

      // 1. Pastikan sudah login
      await loginBeforeTest(page);

      // 2. Navigasi ke halaman Pajak & Biaya Lainnya
      try {
        await page.goto('/admin/setting/tax-and-other', { waitUntil: 'commit', timeout: 25000 });
      } catch {
        await page.goto('/admin/setting/tax-and-other', { waitUntil: 'domcontentloaded', timeout: 25000 });
      }

      // 3. Verifikasi URL halaman
      await expect(page).toHaveURL(/\/admin\/setting\/tax-and-other/, { timeout: 20000 });
    
    });
  });

  // ==========================================
  // 1. TAMPILAN HALAMAN & KOMPONEN UTAMA
  // ==========================================

  test('[TC-01] Menampilkan halaman Pajak dan Biaya Lainnya dengan breadcrumb, judul, dan tombol aksi', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Pajak dan Biaya Lainnya dengan breadcrumb, judul, dan tombol aksi', async () => {
      // Verifikasi Title dokumen
      await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);

      // Verifikasi Breadcrumb
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb).toContainText(/Pajak dan Biaya Lainnya/i);

      // Verifikasi Teks Header Halaman Pajak dan Biaya Lainnya
      const pageTitle = page.getByText(/Pajak (dan|&) Biaya Lainnya/i).first();
      await expect(pageTitle).toBeVisible({ timeout: 10000 });

      // Verifikasi Tombol Simpan dan Simpan Semua Cabang
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();
      await expect(simpanBtn).toBeVisible({ timeout: 10000 });

      const simpanSemuaBtn = page.getByRole('button', { name: /Simpan Semua Cabang/i }).first();
      await expect(simpanSemuaBtn).toBeVisible({ timeout: 10000 });

      // Verifikasi Kartu Informasi
      const infoCard = page.getByText(/Anda dapat merubah pajak & biaya lainnya/i).first();
      await expect(infoCard).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-02] Memverifikasi komponen form Pajak & Service Charge beserta opsi perhitungannya', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi komponen form Pajak & Service Charge beserta opsi perhitungannya', async () => {
      // Verifikasi Bagian Pajak & Service Charge
      await expect(page.getByText('Pajak & Service Charge').first()).toBeVisible({ timeout: 10000 });

      // Verifikasi Dropdown Pilih Outlet
      const outletDropdown = page.getByPlaceholder('Pilih Outlet').first();
      await expect(outletDropdown).toBeAttached();

      // Verifikasi Opsi Radio Perhitungan Pajak
      await expect(page.getByText('Perhitungan Pajak').first()).toBeVisible({ timeout: 5000 });
      const radioSebelumDiskon = page.getByRole('radio', { name: /Sebelum Diskon/i })
        .or(page.locator('label').filter({ hasText: /Sebelum Diskon/i })).first();
      const radioSesudahDiskon = page.getByRole('radio', { name: /Sesudah Diskon/i })
        .or(page.locator('label').filter({ hasText: /Sesudah Diskon/i })).first();

      await expect(radioSebelumDiskon).toBeVisible({ timeout: 5000 });
      await expect(radioSesudahDiskon).toBeVisible({ timeout: 5000 });

      // Verifikasi Input Field Persentase & Biaya
      await expect(page.getByPlaceholder('Masukkan Pajak %').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Service Charge %').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Charge Takeaway').first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-03] Memverifikasi struktur tabel Pengaturan Biaya Tambahan dan tombol Tambah', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel Pengaturan Biaya Tambahan dan tombol Tambah', async () => {
      // Verifikasi Judul Bagian Biaya Tambahan
      await expect(page.getByText('Pengaturan Biaya Tambahan').first()).toBeVisible({ timeout: 10000 });

      // Verifikasi Toggle Switch Dikenakan Pajak
      const switchDikenakanPajak = page.locator('label').filter({ hasText: /Dikenakan Pajak/i }).first();
      await expect(switchDikenakanPajak).toBeVisible({ timeout: 5000 });

      // Verifikasi Tombol Tambah Biaya Tambahan
      const tambahBtn = page.getByRole('button', { name: /Tambah/i }).first();
      await expect(tambahBtn).toBeVisible({ timeout: 5000 });
      await expect(tambahBtn).toBeEnabled();

      // Verifikasi Tabel Biaya Tambahan
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      // Verifikasi Header Tabel
      const thead = table.locator('thead:visible').first();
      await expect(thead.getByText('Nama Biaya Tambahan').first()).toBeVisible();
      await expect(thead.getByText('Deskripsi').first()).toBeVisible();
      await expect(thead.getByText('Status').first()).toBeVisible();
    
    });
  });

  // ==========================================
  // 2. INTERAKSI FORM PAJAK & SERVICE CHARGE
  // ==========================================

  test('[TC-04] Dapat memilih outlet pada dropdown cabang', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Dapat memilih outlet pada dropdown cabang', async () => {
      const outletDropdown = page.getByPlaceholder('Pilih Outlet').first();
      if (await outletDropdown.isVisible({ timeout: 5000 }).catch(() => false)) {
        await outletDropdown.click();

        // Pilih opsi pertama di dropdown outlet
        const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
        await expect(firstOption).toBeVisible({ timeout: 5000 });
        const optionText = await firstOption.innerText();
        await firstOption.click();

        // Verifikasi nilai dropdown terupdate
        await expect(outletDropdown).toHaveValue(optionText.trim());
      }
    
    });
  });

  test('[TC-05] Dapat mengubah metode perhitungan pajak antara Sebelum Diskon dan Sesudah Diskon', async ({ page }) => {
    await test.step('Lakukan pengujian dapat mengubah metode perhitungan pajak antara Sebelum Diskon dan Sesudah Diskon dan verifikasi pembaruan data', async () => {
      const radioSebelum = page.locator('label').filter({ hasText: /Sebelum Diskon/i }).first();
      const radioSesudah = page.locator('label').filter({ hasText: /Sesudah Diskon/i }).first();

      // Klik radio Sebelum Diskon
      await radioSebelum.click();
      const inputSebelum = page.locator('input[type="radio"]').first();
      await expect(inputSebelum).toBeChecked();

      // Klik radio Sesudah Diskon
      await radioSesudah.click();
      const inputSesudah = page.locator('input[type="radio"]').nth(1);
      await expect(inputSesudah).toBeChecked();
    
    });
  });

  test('[TC-06] Dapat mengisi nilai Pajak %, Service Charge %, dan Charge Takeaway', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Dapat mengisi nilai Pajak %, Service Charge %, dan Charge Takeaway', async () => {
      const pajakInput = page.getByPlaceholder('Masukkan Pajak %').first();
      const serviceInput = page.getByPlaceholder('Masukkan Service Charge %').first();
      const takeawayInput = page.getByPlaceholder('Masukkan Charge Takeaway').first();

      // Tunggu hingga form dan nilai awal selesai termuat dari server
      await expect(pajakInput).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(1000);

      // 1. Isi Pajak %
      await pajakInput.click();
      await pajakInput.selectText();
      await page.keyboard.press('Backspace');
      await pajakInput.pressSequentially('15');
      await expect(pajakInput).toHaveValue('15');

      // 2. Isi Service Charge %
      await serviceInput.click();
      await serviceInput.selectText();
      await page.keyboard.press('Backspace');
      await serviceInput.pressSequentially('5');
      await expect(serviceInput).toHaveValue('5');

      // 3. Isi Charge Takeaway (Mantine NumberInput)
      await takeawayInput.click();
      await takeawayInput.selectText();
      await page.keyboard.press('Backspace');
      await takeawayInput.pressSequentially('2000');
      await expect(takeawayInput).toHaveValue(/2[.,]000|2000/);
    
    });
  });

  test('[TC-07] Dapat mengaktifkan dan menonaktifkan toggle switch Dikenakan Pajak', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Dapat mengaktifkan dan menonaktifkan toggle switch Dikenakan Pajak', async () => {
      // Switch Dikenakan Pajak pada section Biaya Tambahan
      const switchRoot = page.locator('.mantine-Switch-root').first();
      await expect(switchRoot).toBeVisible({ timeout: 10000 });

      const switchInput = switchRoot.locator('input[type="checkbox"]');
      const initialState = await switchInput.isChecked();

      // Klik track switch untuk mengubah status
      const switchTrack = switchRoot.locator('.mantine-Switch-track');
      await switchTrack.click();
      await expect(switchInput).toBeChecked({ checked: !initialState });

      // Klik kembali untuk mengembalikan status semula
      await switchTrack.click();
      await expect(switchInput).toBeChecked({ checked: initialState });
    
    });
  });

  // ==========================================
  // 3. PENGATURAN BIAYA TAMBAHAN (TABEL DINAMIS)
  // ==========================================

  test('[TC-08] Menambah baris baru biaya tambahan via tombol Tambah dan mengisi data', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Menambah baris baru biaya tambahan via tombol Tambah dan mengisi data', async () => {
      const table = page.locator('table:visible').first();
      const initialRowsCount = await table.locator('tbody tr:has(input)').count();

      // Klik tombol Tambah
      const tambahBtn = page.getByRole('button', { name: /Tambah/i }).first();
      await tambahBtn.click();

      // Verifikasi baris input baru ditambahkan ke tabel
      const nameInput = table.locator('tbody tr input[placeholder="Masukkan Nama Biaya"]').last();
      await expect(nameInput).toBeVisible({ timeout: 5000 });

      const descInput = table.locator('tbody tr textarea[placeholder="Masukkan Deskripsi"]').last();
      await expect(descInput).toBeVisible({ timeout: 5000 });

      // Isi Nama Biaya dan Deskripsi
      const testCostName = 'Biaya Kemasan QA ' + Date.now();
      await nameInput.fill(testCostName);
      await expect(nameInput).toHaveValue(testCostName);

      await descInput.fill('Biaya packaging ramah lingkungan');
      await expect(descInput).toHaveValue('Biaya packaging ramah lingkungan');

      // Verifikasi jumlah baris bertambah
      const updatedRowsCount = await table.locator('tbody tr:has(input)').count();
      expect(updatedRowsCount).toBe(initialRowsCount + 1);
    
    });
  });

  test('[TC-09] Dapat mengubah status switch Aktif pada baris biaya tambahan', async ({ page }) => {
    await test.step('Lakukan pengujian dapat mengubah status switch Aktif pada baris biaya tambahan dan verifikasi pembaruan data', async () => {
      const table = page.locator('table:visible').first();

      // Tambah baris baru jika belum ada
      if (await table.locator('tbody tr:has(input)').count() === 0) {
        await page.getByRole('button', { name: /Tambah/i }).first().click();
      }

      const row = table.locator('tbody tr:has(input)').last();
      await expect(row).toBeVisible({ timeout: 5000 });

      // Switch status pada baris
      const statusSwitch = row.locator('input[role="switch"], input[type="checkbox"]').first();
      const switchWrapper = row.locator('.mantine-Switch-root, label').first();

      const isInitiallyChecked = await statusSwitch.isChecked();

      // Toggle switch
      await switchWrapper.click();
      await expect(statusSwitch).toBeChecked({ checked: !isInitiallyChecked });

      // Toggle switch kembali
      await switchWrapper.click();
      await expect(statusSwitch).toBeChecked({ checked: isInitiallyChecked });
    
    });
  });

  test('[TC-10] Menghapus baris biaya tambahan via tombol ikon hapus', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Menghapus baris biaya tambahan via tombol ikon hapus', async () => {
      const table = page.locator('table:visible').first();

      // Pastikan terdapat setidaknya satu baris
      const tambahBtn = page.getByRole('button', { name: /Tambah/i }).first();
      await tambahBtn.click();

      const rows = table.locator('tbody tr:has(input)');
      const countBefore = await rows.count();
      expect(countBefore).toBeGreaterThan(0);

      // Klik tombol hapus (ikon trash merah) pada baris terakhir
      const deleteBtn = rows.last().locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      // Verifikasi jumlah baris berkurang
      const countAfter = await table.locator('tbody tr:has(input)').count();
      expect(countAfter).toBe(countBefore - 1);
    
    });
  });

  // ==========================================
  // 4. PENYIMPANAN PENGATURAN (SAVE FLOWS)
  // ==========================================

  test('[TC-11] Berhasil menyimpan pengaturan untuk cabang saat ini via tombol Simpan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan untuk cabang saat ini via tombol Simpan', async () => {
      // Pastikan field form sudah siap dan lakukan perubahan agar form dirty
      const pajakInput = page.getByPlaceholder('Masukkan Pajak %').first();
      await expect(pajakInput).toBeVisible({ timeout: 10000 });
      await pajakInput.click();
      await pajakInput.fill('10');

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });

      // Tunggu respons API PUT tax-setting & additional-cost-setting saat tombol Simpan diklik
      const [response] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('/tax-setting') && res.request().method() === 'PUT' && (res.status() === 200 || res.status() === 201),
          { timeout: 20000 }
        ),
        page.waitForResponse(
          res => res.url().includes('/additional-cost-setting') && res.request().method() === 'PUT',
          { timeout: 20000 }
        ).catch(() => null),
        simpanBtn.click(),
      ]);

      expect([200, 201]).toContain(response.status());

      // Verifikasi payload yang dikirim menerapkan untuk cabang saat ini (is_apply_to_all_branches = 0)
      const requestPayload = JSON.parse(response.request().postData() || '{}');
      expect(requestPayload.is_apply_to_all_branches).toBe(0);

      // Tunggu hingga loading spinner (muter-muter) selesai menghilang
      const loader = page.locator('.mantine-Loader-root');
      await expect(loader.first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
    
    });
  });

  test('[TC-12] Berhasil menyimpan pengaturan untuk semua cabang via tombol Simpan Semua Cabang', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan untuk semua cabang via tombol Simpan Semua Cabang', async () => {
      // Pastikan field form sudah siap dan lakukan perubahan agar form dirty
      const pajakInput = page.getByPlaceholder('Masukkan Pajak %').first();
      await expect(pajakInput).toBeVisible({ timeout: 10000 });
      await pajakInput.click();
      await pajakInput.fill('12');

      const simpanSemuaBtn = page.getByRole('button', { name: /Simpan Semua Cabang/i }).first();
      await expect(simpanSemuaBtn).toBeVisible({ timeout: 5000 });

      // Tunggu respons API PUT tax-setting & additional-cost-setting saat tombol Simpan Semua Cabang diklik
      const [response] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('/tax-setting') && res.request().method() === 'PUT' && (res.status() === 200 || res.status() === 201),
          { timeout: 20000 }
        ),
        page.waitForResponse(
          res => res.url().includes('/additional-cost-setting') && res.request().method() === 'PUT',
          { timeout: 20000 }
        ).catch(() => null),
        simpanSemuaBtn.click(),
      ]);

      expect([200, 201]).toContain(response.status());

      // Verifikasi payload yang dikirim menerapkan untuk semua cabang (is_apply_to_all_branches = 1)
      const requestPayload = JSON.parse(response.request().postData() || '{}');
      expect(requestPayload.is_apply_to_all_branches).toBe(1);

      // Tunggu hingga loading spinner selesai menghilang
      const loader = page.locator('.mantine-Loader-root');
      await expect(loader.first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
    
    });
  });
});
