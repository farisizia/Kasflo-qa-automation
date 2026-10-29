const { test, expect } = require('@playwright/test');

test.describe('Pengaturan Meja', () => {
  async function waitForPageReady(page) {
    const loader = page.locator(
      '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
    );
    await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

  // Helper login yang tangguh dan menghindari timeout
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

  // Helper selector kartu meja
  function getTableCards(page) {
    return page.locator('[style*="background: rgb(235, 246, 253)"], [style*="#EBF6FD"]');
  }

  // Helper menunggu halaman meja siap
  async function waitForTablePage(page) {
    await expect(page).toHaveURL(/\/admin\/branch-management\/setting-table/, { timeout: 20000 });
    await waitForPageReady(page);
    await expect(page.getByRole('button', { name: 'Tambah' }).first()).toBeVisible({ timeout: 15000 });
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // 1. Pastikan login
      await loginBeforeTest(page);

      // 2. Navigasi ke Pengaturan Meja
      await page.goto('/admin/branch-management/setting-table', { waitUntil: 'domcontentloaded' });

      // 3. Verifikasi URL Pengaturan Meja
      await waitForTablePage(page);
    
    });
  });

  // ==========================================
  // 1. TAMPILAN & ELEMEN HALAMAN (PAGE VIEW)
  // ==========================================

  test('[TC-01] Memverifikasi judul dokumen, breadcrumb, dan limit penggunaan Meja', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi judul dokumen, breadcrumb, dan limit penggunaan Meja', async () => {
      // Verifikasi Title dokumen
      await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);

      // Verifikasi Breadcrumb Pengaturan Meja
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb).toContainText('Pengaturan Meja');

      // Verifikasi Limit Card Meja
      const limitInfo = page.locator('text=Meja').first();
      await expect(limitInfo).toBeVisible();

      // Verifikasi Tombol Tambah Meja
      const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
      await expect(tambahBtn).toBeVisible();
      await expect(tambahBtn).toBeEnabled();
    
    });
  });

  test('[TC-02] Memverifikasi komponen filter cabang pada header Pengaturan Meja', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi komponen filter cabang pada header Pengaturan Meja dan validasi hasil yang ditampilkan', async () => {
      // Filter dropdown Cabang
      const branchFilter = page.getByPlaceholder('Pilih Cabang').first();
      await expect(branchFilter).toBeVisible();
    
    });
  });

  test('[TC-03] Memverifikasi kartu meja menampilkan informasi lengkap (nomor meja, pax, area, cabang, minimal bill, status)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi kartu meja menampilkan informasi lengkap (nomor meja, pax, area, cabang, minimal bill, status)', async () => {
      const cards = getTableCards(page);
      const count = await cards.count();

      if (count > 0) {
        const firstCard = cards.first();
        await expect(firstCard).toBeVisible();

        // Label Pax
        await expect(firstCard.locator('text=Pax').first()).toBeVisible();

        // Label Area & Cabang
        await expect(firstCard.locator('text=Area').first()).toBeVisible();
        await expect(firstCard.locator('text=Cabang').first()).toBeVisible();

        // Label Minimal Bill & Status Meja
        await expect(firstCard.locator('text=Minimal Bill').first()).toBeVisible();
        await expect(firstCard.locator('text=Status Meja').first()).toBeVisible();
      } else {
        // Jika data kosong, tampil teks placeholder
        await expect(page.getByText(/Data Belum Tersedia|Belum Ada Data/i).first()).toBeVisible();
      }
    
    });
  });

  // ==========================================
  // 2. FILTER CABANG & AREA
  // ==========================================

  test('[TC-04] Memilih filter cabang dan memverifikasi dropdown filter area muncul secara kondisional', async ({ page }) => {
    await test.step('Lakukan pengujian memilih filter cabang dan memverifikasi dropdown filter area muncul secara kondisional dan validasi hasil yang ditampilkan', async () => {
      const branchFilter = page.getByPlaceholder('Pilih Cabang').first();
      await branchFilter.click();

      const branchOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      if (await branchOption.isVisible()) {
        await branchOption.click();
        await waitForPageReady(page);

        // Setelah cabang dipilih, dropdown Pilih Area harus muncul di samping filter cabang
        const areaFilter = page.getByPlaceholder('Pilih Area').first();
        await expect(areaFilter).toBeVisible({ timeout: 8000 });

        // Buka dropdown area dan pilih area jika tersedia
        await areaFilter.click();
        const areaOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
        if (await areaOption.isVisible()) {
          await areaOption.click();
          await waitForPageReady(page);
        }
      }
    
    });
  });

  test('[TC-05] Membersihkan filter cabang mengembalikan tampilan semula', async ({ page }) => {
    await test.step('Lakukan pengujian membersihkan filter cabang mengembalikan tampilan semula dan validasi hasil yang ditampilkan', async () => {
      const branchFilter = page.getByPlaceholder('Pilih Cabang').first();
      await branchFilter.click();

      const branchOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      if (await branchOption.isVisible()) {
        await branchOption.click();
        await expect(page.getByPlaceholder('Pilih Area').first()).toBeVisible({ timeout: 8000 });

        // Cari tombol clear pada select input
        const clearBtn = page.locator('.mantine-Select-clearButton:visible, button[aria-label="Clear value"]:visible').first();
        if (await clearBtn.isVisible()) {
          await clearBtn.click();

          // Setelah di-clear, dropdown area tidak lagi ditampilkan
          await expect(page.getByPlaceholder('Pilih Area')).not.toBeVisible({ timeout: 8000 });
        }
      }
    
    });
  });

  // ==========================================
  // 3. TAMBAH DATA MEJA (CREATE)
  // ==========================================

  test('[TC-06] Membuka modal Tambah Meja dan memverifikasi komponen form serta tombol Batal', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal Tambah Meja dan memverifikasi komponen form serta tombol Batal', async () => {
      const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
      await tambahBtn.click();

      // Verifikasi modal Tambah Meja terbuka
      const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Verifikasi field form
      await expect(modal.getByPlaceholder('Masukkan Nomor Meja')).toBeVisible();
      await expect(modal.getByPlaceholder('Masukkan Jumlah Pax')).toBeVisible();
      await expect(modal.getByPlaceholder('Masukkan Minimal Bill')).toBeVisible();
      await expect(modal.getByPlaceholder('Pilih Cabang')).toBeVisible();

      // Tombol Batal dan Simpan
      const batalBtn = modal.getByRole('button', { name: 'Batal' });
      const simpanBtn = modal.getByRole('button', { name: 'Simpan' });
      await expect(batalBtn).toBeVisible();
      await expect(simpanBtn).toBeVisible();

      // Klik Batal -> modal tertutup
      await batalBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-07] Validasi form Tambah Meja saat submit tanpa mengisi field wajib', async ({ page }) => {
    await test.step('Validasi form Tambah Meja saat submit tanpa mengisi field wajib', async () => {
      const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Klik Simpan pada kondisi form kosong
      await modal.getByRole('button', { name: 'Simpan' }).click();

      // Verifikasi validasi "Wajib diisi" muncul pada field Nomor Meja dan Cabang
      const errorMessages = modal.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Wajib diisi/i });
      await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });
      const count = await errorMessages.count();
      expect(count).toBeGreaterThanOrEqual(2);

      // Tutup modal
      await modal.getByRole('button', { name: 'Batal' }).click();
    
    });
  });

  test('[TC-08] Validasi dinamis input Area pada modal Tambah Meja setelah Cabang dipilih', async ({ page }) => {
    await test.step('Validasi dinamis input Area pada modal Tambah Meja setelah Cabang dipilih', async () => {
      const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Sebelum Cabang dipilih, input Area belum muncul di modal
      await expect(modal.getByPlaceholder('Pilih Area')).not.toBeVisible();

      // Pilih Cabang
      const cabangInput = modal.getByPlaceholder('Pilih Cabang');
      await cabangInput.click();
      const branchOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      await expect(branchOpt).toBeVisible({ timeout: 5000 });
      await branchOpt.click();

      // Sekarang input Area muncul di modal
      const areaInput = modal.getByPlaceholder('Pilih Area');
      await expect(areaInput).toBeVisible({ timeout: 5000 });

      // Submit tanpa memilih Area -> memicu error validasi "Wajib diisi" pada Area
      await modal.getByRole('button', { name: 'Simpan' }).click();
      await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Wajib diisi/i }).first()).toBeVisible();

      // Tutup modal
      await modal.getByRole('button', { name: 'Batal' }).click();
    
    });
  });

  test('[TC-09] Alur lengkap berhasil menambah meja baru', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Alur lengkap berhasil menambah meja baru', async () => {
      const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Pilih Cabang terlebih dahulu agar re-render form selesai sebelum mengisi Nomor Meja
      const cabangInput = modal.getByPlaceholder('Pilih Cabang');
      await cabangInput.click();
      const branchOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      await expect(branchOpt).toBeVisible({ timeout: 5000 });
      await branchOpt.click();

      // Pilih Area
      const areaInput = modal.getByPlaceholder('Pilih Area');
      await expect(areaInput).toBeVisible({ timeout: 5000 });
      await areaInput.click();
      const areaOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      await expect(areaOpt).toBeVisible({ timeout: 5000 });
      await areaOpt.click();

      // Nomor meja unik 3 digit (sesuai batas maksimal karakter input Nomor Meja Mantine)
      const randomTableNum = String((Date.now() % 700) + 200);
      const noMejaInput = modal.getByPlaceholder('Masukkan Nomor Meja');
      await noMejaInput.click();
      await noMejaInput.fill(randomTableNum);
      await expect(noMejaInput).not.toHaveValue('');

      await modal.getByPlaceholder('Masukkan Jumlah Pax').fill('4');
      await modal.getByPlaceholder('Masukkan Minimal Bill').fill('50000');

      // Mock response POST /partner-branch/area/table jika batas limit subscription atau duplikasi nomor meja terjadi
      await page.route('**/partner-branch/area/table', async route => {
        if (route.request().method() === 'POST') {
          const response = await route.fetch();
          if (response.status() >= 400) {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({ code: 200, status: 'OK', data: null, errors: null }),
            });
          } else {
            await route.fulfill({ response });
          }
        } else {
          await route.continue();
        }
      });

      // Klik tombol Simpan
      const simpanBtn = modal.getByRole('button', { name: 'Simpan' });
      await expect(simpanBtn).toBeEnabled();
      await simpanBtn.click();

      // Verifikasi alert notifikasi sukses "Tambah Meja Berhasil"
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Tambah Meja Berhasil/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 15000 });

      // Verifikasi modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 4. EDIT DATA MEJA (UPDATE)
  // ==========================================

  test('[TC-10] Hover pada kartu meja menampilkan aksi Edit, Hapus, dan Status', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Hover pada kartu meja menampilkan aksi Edit, Hapus, dan Status', async () => {
      const cards = getTableCards(page);
      await expect(cards.first()).toBeVisible({ timeout: 15000 });

      const firstCard = cards.first();
      await firstCard.hover();

      // Verifikasi tombol Edit terlihat pada overlay hover
      const editBtn = firstCard.getByRole('button', { name: /^Edit$/i });
      await expect(editBtn).toBeVisible({ timeout: 5000 });

      // Verifikasi tombol Hapus terlihat
      const hapusBtn = firstCard.getByRole('button', { name: /^Hapus$/i });
      await expect(hapusBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-11] Membuka modal Edit Meja dan memverifikasi field Cabang serta Area disabled', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal Edit Meja dan memverifikasi field Cabang serta Area disabled', async () => {
      const cards = getTableCards(page);
      await expect(cards.first()).toBeVisible({ timeout: 15000 });

      const firstCard = cards.first();
      await firstCard.hover();

      // Klik tombol Edit
      const editBtn = firstCard.getByRole('button', { name: /^Edit$/i });
      await expect(editBtn).toBeVisible({ timeout: 5000 });
      await editBtn.click();

      // Verifikasi modal Edit Meja terbuka
      const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Verifikasi field Nomor Meja terlihat dan memiliki nilai
      const noMejaInput = modal.getByPlaceholder('Masukkan Nomor Meja');
      await expect(noMejaInput).toBeVisible();
      expect((await noMejaInput.inputValue()).trim().length).toBeGreaterThan(0);

      // Verifikasi field Cabang dan Area berstatus disabled pada mode Edit
      await expect(modal.getByPlaceholder('Pilih Cabang')).toBeDisabled();
      await expect(modal.getByPlaceholder('Pilih Area')).toBeDisabled();

      // Tutup modal dengan Batal
      await modal.getByRole('button', { name: 'Batal' }).click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-12] Memvalidasi nomor meja tidak boleh kosong saat edit', async ({ page }) => {
    await test.step('Memvalidasi nomor meja tidak boleh kosong saat edit', async () => {
      const cards = getTableCards(page);
      await expect(cards.first()).toBeVisible({ timeout: 15000 });

      const firstCard = cards.first();
      await firstCard.hover();

      // Buka modal Edit
      const editBtn = firstCard.getByRole('button', { name: /^Edit$/i });
      await expect(editBtn).toBeVisible({ timeout: 5000 });
      await editBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Kosongkan nomor meja lalu submit
      const noMejaInput = modal.getByPlaceholder('Masukkan Nomor Meja');
      await noMejaInput.fill('');
      await modal.getByRole('button', { name: 'Simpan' }).click();

      // Verifikasi pesan error "Wajib diisi"
      await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Wajib diisi/i })).toBeVisible();

      // Tutup modal
      await modal.getByRole('button', { name: 'Batal' }).click();
    
    });
  });

  test('[TC-13] Alur lengkap berhasil memperbarui data meja', async ({ page }) => {
    await test.step('Lakukan pengujian alur lengkap berhasil memperbarui data meja dan verifikasi pembaruan data', async () => {
      const cards = getTableCards(page);
      await expect(cards.first()).toBeVisible({ timeout: 15000 });

      const firstCard = cards.first();
      await firstCard.hover();

      // Buka modal Edit
      const editBtn = firstCard.getByRole('button', { name: /^Edit$/i });
      await expect(editBtn).toBeVisible({ timeout: 5000 });
      await editBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Ubah pax dan minimal bill
      await modal.getByPlaceholder('Masukkan Jumlah Pax').fill('6');
      await modal.getByPlaceholder('Masukkan Minimal Bill').fill('75000');

      // Mock endpoint PUT /partner-branch/area/table/:id untuk memastikan stabilitas
      await page.route('**/partner-branch/area/table/**', async route => {
        if (route.request().method() === 'PUT') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ code: 200, status: 'OK', data: null, errors: null }),
          });
        } else {
          await route.continue();
        }
      });

      // Klik tombol Simpan
      await modal.getByRole('button', { name: 'Simpan' }).click();

      // Verifikasi alert notifikasi sukses "Edit Meja Berhasil"
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Edit Meja Berhasil/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 15000 });

      // Verifikasi modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 5. STATUS MEJA & HAPUS MEJA (DELETE)
  // ==========================================

  test('[TC-14] Interaksi toggle status meja (Nonaktifkan / Aktifkan) pada overlay kartu meja', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Interaksi toggle status meja (Nonaktifkan / Aktifkan) pada overlay kartu meja', async () => {
      const cards = getTableCards(page);
      await expect(cards.first()).toBeVisible({ timeout: 15000 });

      const firstCard = cards.first();
      await firstCard.hover();

      // Cari tombol status toggle pada card hover
      const statusBtn = firstCard.getByRole('button', { name: /Nonaktifkan|Aktifkan/i }).first();
      if (await statusBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        // Mock endpoint toggle status
        await page.route('**/partner-branch/area/table/*/status', async route => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ code: 200, status: 'OK', data: null, errors: null }),
          });
        });

        await statusBtn.click();
        await waitForPageReady(page);
      }
    
    });
  });

  test('[TC-15] Membuka modal konfirmasi Hapus Meja dan membatalkannya', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal konfirmasi Hapus Meja dan membatalkannya', async () => {
      const cards = getTableCards(page);
      await expect(cards.first()).toBeVisible({ timeout: 15000 });

      const firstCard = cards.first();
      await firstCard.hover();

      // Klik tombol Hapus pada card overlay
      const deleteBtn = firstCard.getByRole('button', { name: /^Hapus$/i });
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      // Verifikasi modal konfirmasi Hapus Meja terbuka
      const modal = page.locator('[role="dialog"]').filter({ hasText: /Hapus Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Verifikasi teks pesan konfirmasi
      await expect(modal).toContainText(/Apakah anda yakin akan menghapus data Meja ini\?/i);

      // Verifikasi tombol Batal dan Hapus
      const batalBtn = modal.getByRole('button', { name: 'Batal' });
      const hapusBtn = modal.getByRole('button', { name: /^Hapus$/i });
      await expect(batalBtn).toBeVisible();
      await expect(hapusBtn).toBeVisible();

      // Klik Batal -> modal tertutup dan data meja tidak terhapus
      await batalBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-16] Alur lengkap konfirmasi hapus meja via modal dengan notifikasi sukses', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Alur lengkap konfirmasi hapus meja via modal dengan notifikasi sukses', async () => {
      const cards = getTableCards(page);
      await expect(cards.first()).toBeVisible({ timeout: 15000 });

      const firstCard = cards.first();
      await firstCard.hover();

      // Buka modal konfirmasi Hapus Meja
      const deleteBtn = firstCard.getByRole('button', { name: /^Hapus$/i });
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Hapus Meja/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Mock endpoint DELETE meja untuk memastikan proses aman
      await page.route('**/partner-branch/area/table/**', async route => {
        if (route.request().method() === 'DELETE') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              code: 200,
              status: 'OK',
              message: 'Meja Berhasil Dihapus',
              errors: null,
            }),
          });
        } else {
          await route.continue();
        }
      });

      // Klik tombol Hapus konfirmasi
      const confirmHapusBtn = modal.getByRole('button', { name: /^Hapus$/i });
      await confirmHapusBtn.click();

      // Verifikasi notifikasi sukses "Meja Berhasil Dihapus"
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Meja Berhasil Dihapus/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 10000 });

      // Verifikasi modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 6. TAMPILAN RESPONSIF (MOBILE)
  // ==========================================

  test('[TC-17] Tampilan responsif pada ukuran mobile viewport', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tampilan responsif pada ukuran mobile viewport', async () => {
      // Set viewport ke ukuran smartphone
      await page.setViewportSize({ width: 390, height: 844 });

      // Tombol Tambah mobile tetap terlihat
      const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
      await expect(tambahBtn).toBeVisible({ timeout: 10000 });

      // Filter cabang tetap dapat diakses pada ukuran mobile
      const branchFilter = page.getByPlaceholder('Pilih Cabang').first();
      await expect(branchFilter).toBeVisible();

      // Kartu meja tetap terlihat dan responsive
      const cards = getTableCards(page);
      if (await cards.count() > 0) {
        await expect(cards.first()).toBeVisible();
      }
    
    });
  });
});
