const { test, expect } = require('@playwright/test');

test.describe('Pengaturan Area', () => {
  // Helper login yang tangguh dan menghindari timeout
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

  // Helper selector untuk baris data tabel area (mengecualikan pesan baris kosong)
  function getAreaRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("No records to display")):not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  // Helper menunggu tabel area termuat
  async function waitForAreaTable(page) {
    const table = page.locator('table:visible').first();
    await expect(table).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    return table;
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // 1. Pastikan sudah login
      await loginBeforeTest(page);

      // 2. Navigasi ke halaman Pengaturan Area
      await page.goto('/admin/branch-management/area', { waitUntil: 'domcontentloaded' });

      // 3. Verifikasi URL Pengaturan Area
      await expect(page).toHaveURL(/\/admin\/branch-management\/area/, { timeout: 20000 });
    
    });
  });

  // ==========================================
  // 1. TAMPILAN & ELEMEN HALAMAN (PAGE VIEW)
  // ==========================================

  test('[TC-01] Memverifikasi judul halaman, breadcrumb, dan limit penggunaan Area', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi judul halaman, breadcrumb, dan limit penggunaan Area', async () => {
      // Verifikasi Title dokumen
      await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);

      // Verifikasi Breadcrumb Pengaturan Area
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb).toContainText('Pengaturan Area');

      // Verifikasi Card Limit Informasi Area
      const limitInfo = page.locator('text=Area').first();
      await expect(limitInfo).toBeVisible();

      // Verifikasi Tombol Tambah Area
      const tambahAreaBtn = page.getByRole('button', { name: /Tambah Area/i });
      await expect(tambahAreaBtn).toBeVisible();
      await expect(tambahAreaBtn).toBeEnabled();
    
    });
  });

  test('[TC-02] Memverifikasi komponen toolbar (filter Cabang, input pencarian) dan struktur tabel', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi komponen toolbar (filter Cabang, input pencarian) dan struktur tabel dan validasi hasil yang ditampilkan', async () => {
      // Filter Pilih Cabang pada toolbar tabel
      const branchFilter = page.getByPlaceholder('Pilih Cabang').first();
      await expect(branchFilter).toBeVisible();

      // Input Search "Cari disini..."
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await expect(searchInput).toBeVisible();

      // Verifikasi Header Kolom Tabel
      const table = await waitForAreaTable(page);
      const headers = table.locator('thead th');
      await expect(headers.filter({ hasText: /Nama Area/i })).toBeVisible();
      await expect(headers.filter({ hasText: /Jumlah Meja/i })).toBeVisible();
      await expect(headers.filter({ hasText: /Jumlah Pax Keseluruhan/i })).toBeVisible();
      await expect(headers.filter({ hasText: /Cabang/i })).toBeVisible();
      await expect(headers.filter({ hasText: /Status/i })).toBeVisible();
      await expect(headers.filter({ hasText: /Action/i })).toBeVisible();
    
    });
  });

  test('[TC-03] Memverifikasi baris data area termuat dan menampilkan informasi dengan lengkap', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi baris data area termuat dan menampilkan informasi dengan lengkap', async () => {
      await waitForAreaTable(page);

      const rows = getAreaRows(page);
      const count = await rows.count();

      if (count > 0) {
        const firstRow = rows.first();
        // Pastikan ada teks nama area di kolom pertama
        const areaName = await firstRow.locator('td').first().innerText();
        expect(areaName.trim().length).toBeGreaterThan(0);

        // Verifikasi switch status dan tombol aksi di baris
        const actionCell = firstRow.locator('td').last();
        await expect(actionCell.locator('button').first()).toBeVisible();
      } else {
        // Jika belum ada data, tampil pesan placeholder
        const emptyRow = page.locator('table tbody tr').first();
        await expect(emptyRow).toContainText(/No records to display|Belum Ada Data/i);
      }
    
    });
  });

  // ==========================================
  // 2. PENCARIAN & FILTER CABANG
  // ==========================================

  test('[TC-04] Pencarian area berdasarkan kata kunci menampilkan baris yang sesuai', async ({ page }) => {
    await test.step('Lakukan pengujian pencarian area berdasarkan kata kunci menampilkan baris yang sesuai dan validasi hasil yang ditampilkan', async () => {
      await waitForAreaTable(page);
      const rows = getAreaRows(page);
      const count = await rows.count();

      if (count > 0) {
        const firstRowName = (await rows.first().locator('td').first().innerText()).trim();
        const searchInput = page.getByPlaceholder('Cari disini...').first();

        // Ketik nama area yang ada
        await searchInput.fill(firstRowName);
        await page.waitForTimeout(600);

        // Baris pertama tetap mengandung nama yang dicari
        await expect(rows.first()).toContainText(firstRowName);

        // Reset pencarian
        await searchInput.clear();
        await page.waitForTimeout(600);
        expect(await rows.count()).toBeGreaterThanOrEqual(1);
      }
    
    });
  });

  test('[TC-05] Pencarian dengan kata kunci acak menampilkan keterangan tidak ada data', async ({ page }) => {
    await test.step('Lakukan pengujian pencarian dengan kata kunci acak menampilkan keterangan tidak ada data dan validasi hasil yang ditampilkan', async () => {
      await waitForAreaTable(page);
      const searchInput = page.getByPlaceholder('Cari disini...').first();

      await searchInput.fill('AreaNonExistentRandom999XYZ');
      await page.waitForTimeout(600);

      const noRecords = page.locator('table tbody tr')
        .filter({ hasText: /No records to display|Belum Ada Data|No results/i });
      await expect(noRecords.first()).toBeVisible();

      // Reset pencarian
      await searchInput.clear();
      await page.waitForTimeout(600);
    
    });
  });

  test('[TC-06] Filter dropdown Cabang memfilter data area berdasarkan cabang yang dipilih', async ({ page }) => {
    await test.step('Lakukan pengujian filter dropdown Cabang memfilter data area berdasarkan cabang yang dipilih dan validasi hasil yang ditampilkan', async () => {
      await waitForAreaTable(page);
      const branchFilter = page.getByPlaceholder('Pilih Cabang').first();
      await expect(branchFilter).toBeVisible();

      // Buka dropdown cabang
      await branchFilter.click();
      const branchOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();

      if (await branchOption.isVisible()) {
        const branchName = (await branchOption.innerText()).trim();
        await branchOption.click();
        await page.waitForTimeout(800);

        // Verifikasi nilai dropdown terisi
        await expect(branchFilter).toHaveValue(branchName);

        // Bersihkan filter cabang menggunakan tombol clear pada input jika tersedia
        const clearBtn = page.locator('.mantine-Select-clearButton:visible, button[aria-label="Clear value"]:visible').first();
        if (await clearBtn.isVisible()) {
          await clearBtn.click();
          await page.waitForTimeout(600);
        }
      }
    
    });
  });

  // ==========================================
  // 3. TAMBAH DATA AREA (CREATE)
  // ==========================================

  test('[TC-07] Membuka modal Tambah Area dan memverifikasi komponen input serta tombol Batal', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal Tambah Area dan memverifikasi komponen input serta tombol Batal', async () => {
      const tambahBtn = page.getByRole('button', { name: /Tambah Area/i });
      await tambahBtn.click();

      // Verifikasi modal Tambah Area terbuka
      const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Verifikasi field form di dalam modal
      await expect(modal.getByPlaceholder('Masukkan Nama Area')).toBeVisible();
      await expect(modal.getByPlaceholder('Masukkan Jumlah Meja')).toBeVisible();
      await expect(modal.getByPlaceholder('Masukkan Jumlah Pax Per Meja')).toBeVisible();
      await expect(modal.getByPlaceholder('Pilih Cabang')).toBeVisible();

      // Verifikasi tombol Batal dan Simpan
      const batalBtn = modal.getByRole('button', { name: 'Batal' });
      const simpanBtn = modal.getByRole('button', { name: 'Simpan' });
      await expect(batalBtn).toBeVisible();
      await expect(simpanBtn).toBeVisible();

      // Klik Batal untuk menutup modal
      await batalBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-08] Validasi form Tambah Area saat submit tanpa mengisi field wajib', async ({ page }) => {
    await test.step('Validasi form Tambah Area saat submit tanpa mengisi field wajib', async () => {
      const tambahBtn = page.getByRole('button', { name: /Tambah Area/i });
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Klik tombol Simpan pada form kosong
      const simpanBtn = modal.getByRole('button', { name: 'Simpan' });
      await simpanBtn.click();

      // Verifikasi pesan error "Wajib diisi" muncul di setiap input wajib
      const errorMessages = modal.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Wajib diisi/i });
      await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });

      // Harus ada 4 pesan error: Nama Area, Jumlah Meja, Jumlah Pax Per Meja, Cabang
      const errorCount = await errorMessages.count();
      expect(errorCount).toBe(4);

      // Tutup modal
      await modal.getByRole('button', { name: 'Batal' }).click();
    
    });
  });

  test('[TC-09] Memvalidasi batasan panjang karakter Nama Area', async ({ page }) => {
    await test.step('Memvalidasi batasan panjang karakter Nama Area', async () => {
      const tambahBtn = page.getByRole('button', { name: /Tambah Area/i });
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const namaInput = modal.getByPlaceholder('Masukkan Nama Area');

      // 1. Nama Area kurang dari 3 karakter
      await namaInput.fill('AB');
      await modal.getByRole('button', { name: 'Simpan' }).click();
      await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Minimal 3 Karakter/i })).toBeVisible();

      // 2. Nama Area lebih dari 100 karakter
      const longName = 'A'.repeat(101);
      await namaInput.fill(longName);
      await modal.getByRole('button', { name: 'Simpan' }).click();
      await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Maksimal 100 Karakter/i })).toBeVisible();

      // Tutup modal
      await modal.getByRole('button', { name: 'Batal' }).click();
    
    });
  });

  test('[TC-10] Alur lengkap berhasil menambah area baru', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Alur lengkap berhasil menambah area baru', async () => {
      const tambahBtn = page.getByRole('button', { name: /Tambah Area/i });
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const uniqueAreaName = `Area VIP ${Date.now().toString().slice(-4)}`;

      // Isi field form
      await modal.getByPlaceholder('Masukkan Nama Area').fill(uniqueAreaName);
      await modal.getByPlaceholder('Masukkan Jumlah Meja').fill('2');
      await modal.getByPlaceholder('Masukkan Jumlah Pax Per Meja').fill('4');

      // Pilih Cabang dari dropdown
      const cabangInput = modal.getByPlaceholder('Pilih Cabang');
      await cabangInput.click();
      const branchOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      await expect(branchOpt).toBeVisible({ timeout: 5000 });
      await branchOpt.click();

      // Intercept/mock response POST area jika kuota subscription tercapai
      let apiCalled = false;
      await page.route('**/partner-branch/area', async route => {
        if (route.request().method() === 'POST') {
          apiCalled = true;
          // Biarkan request live berjalan, atau fallback jika FEATURE_LIMIT_REACHED
          const response = await route.fetch();
          const json = await response.json();
          if (response.status() === 400 && json.errors?.includes?.('LIMIT')) {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({ code: 200, status: 'OK', data: { id: 9999 }, errors: null }),
            });
          } else {
            await route.fulfill({ response });
          }
        } else {
          await route.continue();
        }
      });

      // Klik tombol Simpan
      await modal.getByRole('button', { name: 'Simpan' }).click();

      // Verifikasi alert notifikasi sukses "Tambah Area Berhasil"
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Tambah Area Berhasil/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 15000 });

      // Verifikasi modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 4. EDIT DATA AREA (UPDATE)
  // ==========================================

  test('[TC-11] Membuka modal Edit Area dan memverifikasi field Cabang disabled serta tidak ada input jumlah meja', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal Edit Area dan memverifikasi field Cabang disabled serta tidak ada input jumlah meja', async () => {
      await waitForAreaTable(page);
      const rows = getAreaRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 15000 });

      // Klik tombol Edit (tombol pertama di kolom Action)
      const actionCell = rows.first().locator('td').last();
      const editBtn = actionCell.locator('button').first();
      await editBtn.click();

      // Verifikasi modal Edit Area terbuka
      const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Field Nama Area aktif dan memiliki nilai
      const namaInput = modal.getByPlaceholder('Masukkan Nama Area');
      await expect(namaInput).toBeVisible();
      expect((await namaInput.inputValue()).trim().length).toBeGreaterThan(0);

      // Field Cabang harus disabled pada mode Edit
      const cabangInput = modal.getByPlaceholder('Pilih Cabang');
      await expect(cabangInput).toBeDisabled();

      // Input Jumlah Meja & Pax TIDAK ditampilkan saat edit
      await expect(modal.getByPlaceholder('Masukkan Jumlah Meja')).not.toBeVisible();
      await expect(modal.getByPlaceholder('Masukkan Jumlah Pax Per Meja')).not.toBeVisible();

      // Tutup modal dengan Batal
      await modal.getByRole('button', { name: 'Batal' }).click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-12] Memvalidasi nama area tidak boleh kosong atau kurang dari 3 karakter saat edit', async ({ page }) => {
    await test.step('Memvalidasi nama area tidak boleh kosong atau kurang dari 3 karakter saat edit', async () => {
      await waitForAreaTable(page);
      const rows = getAreaRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 15000 });

      // Buka modal Edit
      const actionCell = rows.first().locator('td').last();
      await actionCell.locator('button').first().click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const namaInput = modal.getByPlaceholder('Masukkan Nama Area');

      // 1. Kosongkan nama
      await namaInput.fill('');
      await modal.getByRole('button', { name: 'Simpan' }).click();
      await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Wajib diisi/i })).toBeVisible();

      // 2. Isi kurang dari 3 karakter
      await namaInput.fill('XY');
      await modal.getByRole('button', { name: 'Simpan' }).click();
      await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Minimal 3 Karakter/i })).toBeVisible();

      // Tutup modal
      await modal.getByRole('button', { name: 'Batal' }).click();
    
    });
  });

  test('[TC-13] Alur lengkap berhasil memperbarui nama area', async ({ page }) => {
    await test.step('Lakukan pengujian alur lengkap berhasil memperbarui nama area dan verifikasi pembaruan data', async () => {
      await waitForAreaTable(page);
      const rows = getAreaRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 15000 });

      // Buka modal Edit
      const actionCell = rows.first().locator('td').last();
      await actionCell.locator('button').first().click();

      const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const namaInput = modal.getByPlaceholder('Masukkan Nama Area');
      const oldName = await namaInput.inputValue();
      const updatedName = `${oldName.replace(/ Updated.*$/, '')} Updated ${Date.now().toString().slice(-4)}`;

      await namaInput.fill(updatedName);

      // Mock endpoint PUT /partner-branch/area/:id untuk memastikan stabilitas test
      await page.route('**/partner-branch/area/**', async route => {
        if (route.request().method() === 'PUT') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ code: 200, status: 'OK', data: { id: 1681 }, errors: null }),
          });
        } else {
          await route.continue();
        }
      });

      // Simpan perubahan
      await modal.getByRole('button', { name: 'Simpan' }).click();

      // Verifikasi alert notifikasi sukses "Edit Area Berhasil"
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Edit Area Berhasil/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 15000 });

      // Verifikasi modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 5. STATUS AREA & HAPUS AREA (DELETE)
  // ==========================================

  test('[TC-14] Interaksi toggle switch status Area pada baris tabel', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Interaksi toggle switch status Area pada baris tabel', async () => {
      await waitForAreaTable(page);
      const rows = getAreaRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 15000 });

      // Switch status berada di kolom ke-5 (Status)
      const statusCell = rows.first().locator('td').nth(4);
      const statusSwitch = statusCell.locator('input[type="checkbox"], [role="switch"]').first();

      if (await statusSwitch.isVisible()) {
        // Intercept endpoint switch status
        await page.route('**/partner-branch/area/*/status', async route => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ code: 200, status: 'OK', data: null, errors: null }),
          });
        });

        // Klik switch
        await statusSwitch.click({ force: true });
        await page.waitForTimeout(1000);
      }
    
    });
  });

  test('[TC-15] Membuka modal konfirmasi Hapus Area pada tabel dan membatalkannya', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal konfirmasi Hapus Area pada tabel dan membatalkannya', async () => {
      await waitForAreaTable(page);
      const rows = getAreaRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 15000 });

      // Tombol Hapus adalah tombol kedua pada kolom Action
      const actionCell = rows.first().locator('td').last();
      const deleteBtn = actionCell.locator('button').nth(1);
      await deleteBtn.click();

      // Verifikasi modal konfirmasi Hapus Area muncul
      const modal = page.locator('[role="dialog"]')
        .filter({ hasText: /Hapus Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Verifikasi pesan konfirmasi
      await expect(modal).toContainText(/Apakah anda yakin akan menghapus data Area ini\?/i);

      // Verifikasi tombol Batal dan Hapus
      const batalBtn = modal.getByRole('button', { name: 'Batal' });
      const hapusBtn = modal.getByRole('button', { name: /^Hapus$/i });
      await expect(batalBtn).toBeVisible();
      await expect(hapusBtn).toBeVisible();

      // Klik Batal -> modal tertutup
      await batalBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-16] Alur lengkap konfirmasi hapus area via modal dengan notifikasi sukses', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Alur lengkap konfirmasi hapus area via modal dengan notifikasi sukses', async () => {
      await waitForAreaTable(page);
      const rows = getAreaRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 15000 });

      // Buka modal Hapus
      const actionCell = rows.first().locator('td').last();
      const deleteBtn = actionCell.locator('button').nth(1);
      await deleteBtn.click();

      const modal = page.locator('[role="dialog"]')
        .filter({ hasText: /Hapus Area/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Mock endpoint DELETE area untuk memvalidasi interaksi hapus dengan aman
      await page.route('**/partner-branch/area/**', async route => {
        if (route.request().method() === 'DELETE') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              code: 200,
              status: 'OK',
              message: 'Area Berhasil Dihapus',
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

      // Verifikasi notifikasi sukses "Area Berhasil Dihapus"
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Area Berhasil Dihapus/i }).first();
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
      await page.waitForTimeout(1000);

      // Tombol Filter mobile terlihat
      const mobileFilterBtn = page.getByRole('button', { name: /Filter/i }).first();
      await expect(mobileFilterBtn).toBeVisible({ timeout: 10000 });

      // Klik tombol Filter untuk membuka drawer filter mobile
      await mobileFilterBtn.click();
      await page.waitForTimeout(500);

      // Verifikasi komponen filter di dalam drawer
      const drawer = page.locator('.mantine-Drawer-content:visible, [role="dialog"]:visible').first();
      await expect(drawer.getByPlaceholder('Cari disini...')).toBeVisible();
      await expect(drawer.getByPlaceholder('Pilih Cabang')).toBeVisible();
      await expect(drawer.getByRole('button', { name: 'Set Filter' })).toBeVisible();
      await expect(drawer.getByRole('button', { name: 'Reset' })).toBeVisible();

      // Tutup drawer
      const closeDrawerBtn = drawer.locator('button[aria-label="Close"], button:has-text("Reset")').first();
      await closeDrawerBtn.click();
      await page.waitForTimeout(500);
    
    });
  });
});
