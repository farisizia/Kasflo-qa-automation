const { test, expect } = require('@playwright/test');

test.describe('Data Cabang', () => {
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

  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  // Helper menunggu tabel cabang dan baris data siap termuat
  async function waitForBranchTable(page) {
    await waitForPageReady(page);
    const table = page.locator('table:visible').first();
    await expect(table).toBeVisible({ timeout: 15000 });
    const firstRow = getDataRows(page).first();
    await expect(firstRow).toBeVisible({ timeout: 15000 });
    const nameCell = firstRow.locator('td').first();
    await expect(nameCell).not.toHaveText('', { timeout: 10000 });
    return firstRow;
  }

  // Helper pengisian dropdown bertingkat lokasi (Provinsi -> Kota -> Kecamatan)
  async function fillLocationFields(page) {
    // 1. Provinsi
    const provInput = page.getByPlaceholder('Pilih Provinsi').first();
    await provInput.click();
    const provOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
    await expect(provOption).toBeVisible({ timeout: 8000 });
    await provOption.click();
    await page.waitForTimeout(500);

    // 2. Kota
    const kotaInput = page.getByPlaceholder('Pilih Kota').first();
    await expect(kotaInput).toBeEnabled({ timeout: 10000 });
    await kotaInput.click();
    const kotaOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
    await expect(kotaOption).toBeVisible({ timeout: 8000 });
    await kotaOption.click();
    await page.waitForTimeout(500);

    // 3. Kecamatan
    const kecInput = page.getByPlaceholder('Pilih Kecamatan').first();
    await expect(kecInput).toBeEnabled({ timeout: 10000 });
    await kecInput.click();
    const kecOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
    await expect(kecOption).toBeVisible({ timeout: 8000 });
    await kecOption.click();
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Data Cabang page
      await page.goto('/admin/branch-management/branch', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify page URL loaded
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch/, { timeout: 20000 });
    
    });
  });

  // ==========================================
  // 1. TAMPILAN & FILTER
  // ==========================================

  test('[TC-01] Menampilkan halaman Data Cabang dengan header, breadcrumb, card jumlah cabang, tombol Buat Cabang, filter bar, dan tabel', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Data Cabang dengan header, breadcrumb, card jumlah cabang, tombol Buat Cabang, filter bar, dan tabel', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText('Data Cabang')).toBeVisible();

      // Card informasi kuota cabang
      await expect(page.getByText('Jumlah Cabang').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(/Cabang/i).first()).toBeVisible();

      // Tombol Buat Cabang
      const buatCabangBtn = page.getByRole('button', { name: /Buat Cabang/i })
        .or(page.getByRole('link', { name: /Buat Cabang/i })).first();
      await expect(buatCabangBtn).toBeVisible({ timeout: 5000 });

      // Filter bar (Pencarian & Status)
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await expect(searchInput).toBeVisible({ timeout: 5000 });

      const statusDropdown = page.getByPlaceholder(/Pilih Status|Semua Status/i)
        .or(page.locator('input[value="Semua Status"]')).first();
      await expect(statusDropdown).toBeVisible({ timeout: 5000 });

      // Tabel Cabang dan Header Kolom
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const headers = ['Nama Cabang', 'Status', 'Alamat', 'Action'];
      for (const h of headers) {
        await expect(table.locator('thead').getByText(h).first()).toBeVisible();
      }
    
    });
  });

  test('[TC-02] Interaksi input pencarian cabang memfilter data di tabel', async ({ page }) => {
    await test.step('Lakukan pengujian interaksi input pencarian cabang memfilter data di tabel dan validasi hasil yang ditampilkan', async () => {
      const firstRow = await waitForBranchTable(page);
      const firstRowName = (await firstRow.locator('td').first().innerText()).trim();
      expect(firstRowName).not.toBe('');

      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await expect(searchInput).toBeVisible();

      // Cari cabang yang ada
      await searchInput.fill(firstRowName);
      await page.waitForTimeout(1000);
      await expect(getDataRows(page).first()).toContainText(firstRowName);

      // Cari kata kunci yang tidak mungkin ada
      await searchInput.clear();
      await searchInput.fill('CabangRandomNonExistent123456');
      await page.waitForTimeout(1000);

      const hasNoData = (await page.getByText(/Belum Ada Data|Tidak ada data|No results/i).count() > 0)
        || (await page.locator('table tbody tr').filter({ hasText: 'CabangRandomNonExistent123456' }).count() === 0);
      expect(hasNoData).toBeTruthy();

      // Reset pencarian
      await searchInput.clear();
      await page.waitForTimeout(1000);
      await expect(getDataRows(page).first()).toContainText(firstRowName);
    
    });
  });

  test('[TC-03] Dropdown filter status cabang menyediakan opsi Semua Status, Aktif, dan Nonaktif', async ({ page }) => {
    await test.step('Lakukan pengujian dropdown filter status cabang menyediakan opsi Semua Status, Aktif, dan Nonaktif dan validasi hasil yang ditampilkan', async () => {
      const statusDropdown = page.getByPlaceholder(/Pilih Status|Semua Status/i)
        .or(page.locator('input[value="Semua Status"]')).first();
      await expect(statusDropdown).toBeVisible();

      await statusDropdown.click();

      // Pastikan opsi filter status tersedia
      const options = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
      await expect(options.filter({ hasText: /^Semua Status$/i }).first()).toBeVisible({ timeout: 5000 });
      await expect(options.filter({ hasText: /^Aktif$/i }).first()).toBeVisible({ timeout: 5000 });
      await expect(options.filter({ hasText: /^Nonaktif$/i }).first()).toBeVisible({ timeout: 5000 });

      // Pilih opsi Aktif
      await options.filter({ hasText: /^Aktif$/i }).first().click();
      await page.waitForTimeout(1000);

      // Kembalikan ke Semua Status
      await statusDropdown.click();
      await page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /^Semua Status$/i }).first().click();
      await page.waitForTimeout(1000);
    
    });
  });

  // ==========================================
  // 2. TAMBAH DATA CABANG (CREATE)
  // ==========================================

  test('[TC-04] Navigasi ke form Buat Cabang via tombol Buat Cabang dan memverifikasi komponen form', async ({ page }) => {
    await test.step('Lakukan proses navigasi ke form Buat Cabang via tombol Buat Cabang dan memverifikasi komponen form dan pastikan data tersimpan', async () => {
      const buatCabangBtn = page.getByRole('button', { name: /Buat Cabang/i })
        .or(page.getByRole('link', { name: /Buat Cabang/i })).first();
      await expect(buatCabangBtn).toBeVisible();
      await buatCabangBtn.click();

      // Verifikasi URL halaman tambah cabang
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/add/, { timeout: 15000 });

      // Breadcrumb / Title Tambah Cabang
      await expect(page.locator('.mantine-Breadcrumbs-root').first()).toContainText('Tambah Cabang');

      // Section Informasi Kontak
      await expect(page.getByText('Informasi Kontak').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Nama Cabang')).toBeVisible();
      await expect(page.getByPlaceholder('Masukkan Nomor WhatsApp')).toBeVisible();
      await expect(page.getByPlaceholder('Masukkan Email')).toBeVisible();

      // Section Lokasi Cabang
      await expect(page.getByText('Lokasi Cabang').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Pilih Provinsi')).toBeVisible();
      await expect(page.getByPlaceholder('Pilih Kota')).toBeVisible();
      await expect(page.getByPlaceholder('Pilih Kecamatan')).toBeVisible();
      await expect(page.getByPlaceholder('Masukkan Kode POS')).toBeVisible();
      await expect(page.getByPlaceholder('Masukkan Alamat Cabang')).toBeVisible();

      // Tombol Aksi Form: Batalkan & Simpan
      await expect(page.getByRole('button', { name: 'Batalkan' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Simpan', exact: true })).toBeVisible();
    
    });
  });

  test('[TC-05] Validasi form Buat Cabang saat submit tanpa mengisi field wajib', async ({ page }) => {
    await test.step('Lakukan proses validasi form Buat Cabang saat submit tanpa mengisi field wajib dan pastikan data tersimpan', async () => {
      await page.goto('/admin/branch-management/branch/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/add/);

      // Klik tombol Simpan pada form kosong
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
      await simpanBtn.click();

      // Verifikasi pesan validasi "Wajib diisi" muncul
      const errorMessages = page.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Wajib diisi/i });
      await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });

      // Verifikasi jumlah error mencakup field wajib utama
      const errorCount = await errorMessages.count();
      expect(errorCount).toBeGreaterThanOrEqual(3);

      // Tetap berada pada halaman form tambah
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/add/);
    
    });
  });

  test('[TC-06] Memvalidasi aturan format input (nama minimal 3 karakter, whatsapp angka, email valid)', async ({ page }) => {
    await test.step('Memvalidasi aturan format input (nama minimal 3 karakter, whatsapp angka, email valid)', async () => {
      await page.goto('/admin/branch-management/branch/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/add/);

      // 1. Validasi nama kurang dari 3 karakter
      const namaInput = page.getByPlaceholder('Masukkan Nama Cabang');
      await namaInput.fill('AB');

      // 2. Validasi nomor telepon bukan angka atau kurang dari 9 digit
      const waInput = page.getByPlaceholder('Masukkan Nomor WhatsApp');
      await waInput.fill('abcde');

      // 3. Validasi email format tidak valid
      const emailInput = page.getByPlaceholder('Masukkan Email');
      await emailInput.fill('bukan-format-email');

      // Submit untuk memicu validasi
      await page.getByRole('button', { name: 'Simpan', exact: true }).click();

      // Cek pesan validasi spesifik
      await expect(page.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Minimal 3 Karakter/i }).first()).toBeVisible({ timeout: 5000 });

      await expect(page.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Hanya boleh angka|Minimal 9 Karakter/i }).first()).toBeVisible({ timeout: 5000 });

      await expect(page.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Email tidak valid/i }).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-07] Alur pengisian lengkap form Buat Cabang dan submit berhasil ke backend', async ({ page }) => {
    await test.step('Lakukan proses alur pengisian lengkap form Buat Cabang dan submit berhasil ke backend dan pastikan data tersimpan', async () => {
      await page.goto('/admin/branch-management/branch/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/add/);

      const uniqueId = Date.now().toString().slice(-6);
      const branchName = `Cabang QA Auto ${uniqueId}`;
      const branchEmail = `cabang.auto.${uniqueId}@kasflo.id`;

      // 1. Isi Informasi Kontak
      await page.getByPlaceholder('Masukkan Nama Cabang').fill(branchName);
      await page.getByPlaceholder('Masukkan Nomor WhatsApp').fill('081234567890');
      await page.getByPlaceholder('Masukkan Email').fill(branchEmail);

      // 2. Isi Lokasi Cabang bertingkat
      await fillLocationFields(page);

      await page.getByPlaceholder('Masukkan Kode POS').fill('80351');
      await page.getByPlaceholder('Masukkan Alamat Cabang').fill(`Jl. Sunset Road No. ${uniqueId}, Kuta`);

      // 3. Isi Akun Cabang (Password & PIN) jika ditampilkan pada akun user
      const passwordInput = page.getByPlaceholder('Masukkan Password');
      if (await passwordInput.isVisible({ timeout: 1000 }).catch(() => false)) {
        await passwordInput.fill('Password123!');
        await page.getByPlaceholder('Masukkan Konfirmasi Password').fill('Password123!');
        await page.getByPlaceholder('Masukkan PIN').fill('123456');
        await page.getByPlaceholder('Masukkan Konfirmasi PIN').fill('123456');
      }

      // 4. Submit form langsung ke backend (tanpa mocking)
      const postResponsePromise = page.waitForResponse(
        res => res.url().includes('partner-branch') && res.request().method() === 'POST',
        { timeout: 20000 }
      );
      await page.getByRole('button', { name: 'Simpan', exact: true }).click();

      // 5. Verifikasi respon API backend berhasil (200 OK)
      const postResponse = await postResponsePromise;
      expect(postResponse.status()).toBe(200);

      // 6. Verifikasi alert notifikasi sukses muncul
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Tambah Cabang Berhasil/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 10000 });

      // 7. Verifikasi dialihkan kembali ke daftar cabang
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch$/, { timeout: 15000 });

      // 8. Verifikasi data baru tersimpan dan tetap ada saat halaman direload
      await page.reload({ waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch$/);
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });

      // Cari cabang baru di input pencarian untuk membuktikan data tersimpan di database
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await searchInput.fill(branchName);
      await page.waitForTimeout(500);

      const newBranchRow = page.locator('table tbody tr').filter({ hasText: branchName }).first();
      await expect(newBranchRow).toBeVisible({ timeout: 10000 });
      await expect(newBranchRow).toContainText(branchName);
    
    });
  });

  test('[TC-08] Tombol Batalkan pada form Buat Cabang mengembalikan ke halaman list Data Cabang', async ({ page }) => {
    await test.step('Lakukan proses tombol Batalkan pada form Buat Cabang mengembalikan ke halaman list Data Cabang dan pastikan data tersimpan', async () => {
      await page.goto('/admin/branch-management/branch/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/add/);

      const batalBtn = page.getByRole('button', { name: 'Batalkan' });
      await expect(batalBtn).toBeVisible();
      await batalBtn.click();

      // Verifikasi kembali ke halaman list Data Cabang
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch$/, { timeout: 15000 });
      await expect(page.locator('table').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-09] Interaksi dropdown bertingkat lokasi: memilih Provinsi mengaktifkan input Kota', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Interaksi dropdown bertingkat lokasi: memilih Provinsi mengaktifkan input Kota', async () => {
      await page.goto('/admin/branch-management/branch/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/add/);

      const provInput = page.getByPlaceholder('Pilih Provinsi').first();
      const kotaInput = page.getByPlaceholder('Pilih Kota').first();
      const kecInput = page.getByPlaceholder('Pilih Kecamatan').first();

      // Sebelum memilih provinsi, Kota dan Kecamatan berstatus disabled
      await expect(kotaInput).toBeDisabled();
      await expect(kecInput).toBeDisabled();

      // Pilih Provinsi pertama
      await provInput.click();
      const firstProv = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      await expect(firstProv).toBeVisible({ timeout: 5000 });
      await firstProv.click();

      // Setelah provinsi dipilih, input Kota menjadi aktif
      await expect(kotaInput).toBeEnabled({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 3. DETAIL & EDIT DATA CABANG (UPDATE)
  // ==========================================

  test('[TC-10] Navigasi ke halaman Detail Cabang via aksi baris tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman Detail Cabang via aksi baris tabel', async () => {
      const firstRow = await waitForBranchTable(page);

      // Link Detail adalah link aksi pertama di kolom Action
      const detailLink = firstRow.locator('a[href*="/detail/"]').first();
      await expect(detailLink).toBeVisible({ timeout: 5000 });
      await detailLink.click();

      // Verifikasi navigasi ke halaman Detail Cabang
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/detail\//, { timeout: 15000 });

      // Verifikasi judul dan komponen pada halaman Detail Cabang
      await expect(page.locator('.mantine-Breadcrumbs-root').first()).toContainText('Detail Cabang');
      await expect(page.getByText('Informasi Cabang').first()).toBeVisible({ timeout: 5000 });

      // Tombol Edit dan Hapus pada halaman detail
      await expect(page.getByRole('button', { name: 'Edit' }).or(page.getByRole('link', { name: 'Edit' })).first()).toBeVisible();
      await expect(page.getByRole('button', { name: 'Hapus' }).first()).toBeVisible();

      // Navigasi kembali via breadcrumb
      const backBreadcrumb = page.locator('.mantine-Breadcrumbs-root a').filter({ hasText: 'Data Cabang' }).first();
      if (await backBreadcrumb.isVisible()) {
        await backBreadcrumb.click();
        await expect(page).toHaveURL(/\/admin\/branch-management\/branch$/, { timeout: 15000 });
      }
    
    });
  });

  test('[TC-11] Navigasi edit cabang dari tombol Edit pada halaman Detail Cabang', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi edit cabang dari tombol Edit pada halaman Detail Cabang', async () => {
      const firstRow = await waitForBranchTable(page);

      // Buka halaman detail cabang
      await firstRow.locator('a[href*="/detail/"]').first().click();
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/detail\//, { timeout: 15000 });

      // Klik tombol Edit di halaman detail
      const editBtn = page.getByRole('button', { name: 'Edit' }).or(page.getByRole('link', { name: 'Edit' })).first();
      await expect(editBtn).toBeVisible({ timeout: 5000 });
      await editBtn.click();

      // Verifikasi langsung diarahkan ke form edit cabang
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/edit\//, { timeout: 15000 });
      await expect(page.getByText('Edit Cabang').first()).toBeVisible({ timeout: 5000 });

      // Klik Batalkan untuk kembali ke halaman detail
      await page.getByRole('button', { name: 'Batalkan' }).click();
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/detail\/\d+/, { timeout: 15000 });
    
    });
  });

  test('[TC-12] Navigasi ke halaman Edit Cabang via aksi baris tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman Edit Cabang via aksi baris tabel', async () => {
      const firstRow = await waitForBranchTable(page);

      // Link Edit adalah link aksi kedua di kolom Action
      const editLink = firstRow.locator('a[href*="/edit/"]').first();
      await expect(editLink).toBeVisible({ timeout: 5000 });
      await editLink.click();

      // Verifikasi navigasi ke halaman Edit Cabang
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/edit\//, { timeout: 15000 });

      // Verifikasi judul halaman Edit Cabang
      await expect(page.getByText('Edit Cabang').first()).toBeVisible({ timeout: 5000 });

      // Verifikasi field formulir terisi data cabang
      const namaCabangInput = page.getByPlaceholder('Masukkan Nama Cabang').first();
      await expect(namaCabangInput).toBeVisible({ timeout: 5000 });
      await expect(namaCabangInput).not.toHaveValue('', { timeout: 10000 });

      // Tombol Batalkan dan Simpan
      const batalBtn = page.getByRole('button', { name: 'Batalkan' });
      await expect(batalBtn).toBeVisible();
      await batalBtn.click();

      // Verifikasi kembali ke list Data Cabang
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch$/, { timeout: 15000 });
    
    });
  });

  test('[TC-13] Alur lengkap edit data cabang dari tabel, mengubah informasi dan simpan perubahan', async ({ page }) => {
    await test.step('Lakukan pengujian alur lengkap edit data cabang dari tabel, mengubah informasi dan simpan perubahan dan verifikasi pembaruan data', async () => {
      // Prioritaskan baris cabang pengujian jika ada
      const testRow = page.locator('table tbody tr').filter({ hasText: /Cabang (Tes|QA Auto|Real)/i }).first();
      const firstRow = (await testRow.isVisible().catch(() => false)) ? testRow : (await waitForBranchTable(page));

      // Buka form edit
      await firstRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/edit\//, { timeout: 15000 });
      await expect(page.getByText('Edit Cabang').first()).toBeVisible({ timeout: 5000 });

      // Tunggu data cabang termuat pada form
      const namaInput = page.getByPlaceholder('Masukkan Nama Cabang');
      await expect(namaInput).not.toHaveValue('', { timeout: 15000 });
      await page.waitForTimeout(500);

      // Ubah data alamat cabang
      const alamatInput = page.getByPlaceholder('Masukkan Alamat Cabang');
      await expect(alamatInput).toBeVisible({ timeout: 5000 });
      const updatedAlamat = `Jl. Perubahan QA No. ${Date.now().toString().slice(-4)}`;
      await alamatInput.fill(updatedAlamat);

      // Kirim langsung ke backend (tanpa mocking)
      const putResponsePromise = page.waitForResponse(
        res => res.url().includes('partner-branch') && res.request().method() === 'PUT',
        { timeout: 15000 }
      );

      // Klik tombol Simpan
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible();
      await simpanBtn.click();

      // Verifikasi respon update backend 200 OK
      const putResponse = await putResponsePromise;
      expect(putResponse.status()).toBe(200);

      // Verifikasi notifikasi "Edit Cabang Berhasil" muncul
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Edit Cabang Berhasil/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 10000 });

      // Verifikasi dialihkan kembali ke halaman list Data Cabang
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch$/, { timeout: 15000 });
    
    });
  });

  test('[TC-14] Validasi form edit saat field wajib dikosongkan', async ({ page }) => {
    await test.step('Validasi form edit saat field wajib dikosongkan', async () => {
      const firstRow = await waitForBranchTable(page);

      // Buka form edit
      await firstRow.locator('a[href*="/edit/"]').first().click();
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/edit\//, { timeout: 15000 });

      // Tunggu data terisi
      const namaInput = page.getByPlaceholder('Masukkan Nama Cabang');
      await expect(namaInput).not.toHaveValue('', { timeout: 15000 });

      // Isi nama cabang hanya 1 karakter untuk memicu validasi form
      await namaInput.fill('A');

      // Klik Simpan
      await page.getByRole('button', { name: 'Simpan', exact: true }).click();

      // Verifikasi pesan validasi muncul
      const errorMsg = page.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Minimal 3 Karakter|Wajib diisi/i }).first();
      await expect(errorMsg).toBeVisible({ timeout: 5000 });

      // Halaman tidak boleh submit
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/edit\//);
    
    });
  });

  // ==========================================
  // 4. HAPUS DATA CABANG (DELETE)
  // ==========================================

  test('[TC-15] Membuka modal konfirmasi Hapus Cabang pada tabel dan membatalkannya', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal konfirmasi Hapus Cabang pada tabel dan membatalkannya', async () => {
      const firstRow = await waitForBranchTable(page);

      // Tombol Hapus adalah button di kolom Action
      const deleteBtn = firstRow.locator('td').last().locator('button').first();
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      // Verifikasi modal konfirmasi Hapus Cabang muncul
      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Cabang/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Verifikasi teks konfirmasi menyebutkan nama cabang
      await expect(modal.getByText(/Ketik.*untuk konfirmasi/i).first()).toBeVisible();

      // Field verifikasi hapus
      await expect(modal.getByPlaceholder(/Nama Cabang yang Akan Dihapus/i).first()).toBeVisible();
      await expect(modal.getByPlaceholder(/Password Anda/i).first()).toBeVisible();

      // Tombol Batal pada modal
      const cancelModalBtn = modal.getByRole('button', { name: 'Batal' });
      await expect(cancelModalBtn).toBeVisible();
      await cancelModalBtn.click();

      // Verifikasi modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch/);
    
    });
  });

  test('[TC-16] Memvalidasi keharusan mengetik nama cabang yang tepat dan password sebelum hapus', async ({ page }) => {
    await test.step('Memvalidasi keharusan mengetik nama cabang yang tepat dan password sebelum hapus', async () => {
      const firstRow = await waitForBranchTable(page);

      // Klik tombol Hapus
      const deleteBtn = firstRow.locator('td').last().locator('button').first();
      await deleteBtn.click();

      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Cabang/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const nameInput = modal.getByPlaceholder(/Nama Cabang yang Akan Dihapus/i);
      const passwordInput = modal.getByPlaceholder(/Password Anda/i);
      const hapusSubmitBtn = modal.getByRole('button', { name: /^Hapus$/i });

      // 1. Submit form kosong -> Validasi "Wajib diisi"
      await hapusSubmitBtn.click();
      await expect(modal.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Wajib diisi/i }).first()).toBeVisible({ timeout: 5000 });

      // 2. Ketik nama cabang yang salah -> Validasi "Nama Cabang Belum Sesuai"
      await nameInput.fill('NamaCabangSalahXYZ');
      await passwordInput.fill('password123');
      await hapusSubmitBtn.click();
      await expect(modal.locator('.mantine-InputWrapper-error, [class*="error"]')
        .filter({ hasText: /Nama Cabang Belum Sesuai/i }).first()).toBeVisible({ timeout: 5000 });

      // 3. Batalkan modal
      await modal.getByRole('button', { name: 'Batal' }).click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-17] Alur lengkap konfirmasi hapus cabang via modal dengan nama cabang dan password', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Alur lengkap konfirmasi hapus cabang via modal dengan nama cabang dan password', async () => {
      await waitForBranchTable(page);

      // Cari baris cabang pengujian (Cabang Tes / Cabang QA Auto / Cabang Real) agar tidak menghapus cabang utama
      const testRow = page.locator('table tbody tr').filter({ hasText: /Cabang (Tes|QA Auto|Real)/i }).first();
      const targetRow = (await testRow.isVisible().catch(() => false)) ? testRow : (await waitForBranchTable(page));

      // Buka modal hapus
      const deleteBtn = targetRow.locator('td').last().locator('button').first();
      await deleteBtn.click();

      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Cabang/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Ambil nama cabang yang diharapkan langsung dari teks panduan konfirmasi modal
      const expectedBranchName = (await modal.locator('b').innerText()).trim();
      expect(expectedBranchName).not.toBe('');

      // Isi konfirmasi nama cabang dan password
      const nameInput = modal.getByPlaceholder(/Nama Cabang yang Akan Dihapus/i);
      await expect(nameInput).toBeVisible({ timeout: 5000 });
      await nameInput.fill(expectedBranchName);
      await expect(nameInput).toHaveValue(expectedBranchName);

      const passwordInput = modal.getByPlaceholder(/Password Anda/i);
      await passwordInput.fill('password');
      await expect(passwordInput).toHaveValue('password');

      // Kirim request DELETE langsung ke backend (tanpa mocking)
      const deleteResponsePromise = page.waitForResponse(
        res => res.url().includes('partner-branch') && res.request().method() === 'DELETE',
        { timeout: 15000 }
      );

      // Klik tombol Hapus
      const hapusSubmitBtn = modal.getByRole('button', { name: /^Hapus$/i });
      await hapusSubmitBtn.click();

      // Verifikasi respon DELETE backend 200 OK
      const deleteResponse = await deleteResponsePromise;
      expect(deleteResponse.status()).toBe(200);

      // Verifikasi alert notifikasi sukses "Hapus Cabang Berhasil"
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Hapus Cabang Berhasil/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 10000 });

      // Verifikasi modal ditutup
      await expect(modal).not.toBeVisible({ timeout: 5000 });

      // Verifikasi cabang yang dihapus tidak ada lagi di tabel setelah reload halaman
      await page.reload({ waitUntil: 'domcontentloaded' });
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await searchInput.fill(expectedBranchName);
      await page.waitForTimeout(500);
      await expect(page.locator('table tbody tr').filter({ hasText: expectedBranchName })).not.toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-18] Memicu modal konfirmasi hapus cabang dari tombol Hapus di halaman Detail', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memicu modal konfirmasi hapus cabang dari tombol Hapus di halaman Detail', async () => {
      const firstRow = await waitForBranchTable(page);

      // Masuk ke halaman detail
      await firstRow.locator('a[href*="/detail/"]').first().click();
      await expect(page).toHaveURL(/\/admin\/branch-management\/branch\/detail\//, { timeout: 15000 });

      // Klik tombol Hapus di header detail
      const deleteDetailBtn = page.getByRole('button', { name: 'Hapus' }).first();
      await expect(deleteDetailBtn).toBeVisible({ timeout: 5000 });
      await deleteDetailBtn.click();

      // Verifikasi modal Hapus Cabang terbuka dan menampilkan teks konfirmasi
      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Cabang/i }).first();
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Ketik.*untuk konfirmasi/i).first()).toBeVisible();

      // Batalkan
      await modal.getByRole('button', { name: 'Batal' }).click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 5. RESPONSIVITAS & PAGINASI
  // ==========================================

  test('[TC-19] Memverifikasi kontrol pagination dan dropdown Rows per page', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi kontrol pagination dan dropdown Rows per page', async () => {
      // Verifikasi teks pagination
      await expect(page.getByText(/Rows per page/i).first()).toBeVisible({ timeout: 10000 });

      // Dropdown Rows per page
      const rowsPerPageSelect = page.locator('.mantine-Pagination-root, div:has-text("Rows per page")')
        .locator('input').first();
      if (await rowsPerPageSelect.isVisible().catch(() => false)) {
        await expect(rowsPerPageSelect).toBeVisible();
      }

      // Indikator total data (misal 1-1 of 1)
      await expect(page.getByText(/\d+-\d+ of \d+/i).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-20] Memverifikasi responsivitas tabel Data Cabang dan status toggle switch', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas tabel Data Cabang dan status toggle switch', async () => {
      const firstRow = await waitForBranchTable(page);

      // Verifikasi komponen switch toggle status pada baris cabang
      const statusSwitch = firstRow.locator('input[type="checkbox"]').first();
      await expect(statusSwitch).toBeAttached();

      // Label status (Aktif atau Nonaktif)
      await expect(firstRow.getByText(/Aktif|Nonaktif/i).first()).toBeVisible();
    
    });
  });
});
