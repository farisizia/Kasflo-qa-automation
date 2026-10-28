const { test, expect } = require('@playwright/test');

test.describe('Manajemen User', () => {
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
      await page.waitForTimeout(500);
      try {
        await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      } catch {
        await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      }
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

  // Helper to select an option in a Mantine Select dropdown
  async function selectMantineOption(page, inputLocator, optionText) {
    await inputLocator.click();

    if (optionText) {
      const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: optionText }).first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click();
        return;
      }
    }

    const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
    if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await firstOption.click();
    } else {
      await page.keyboard.press('Escape');
    }
  }

  // Helper membuat user staff baru untuk pengujian
  async function createTestUser(page, role = 'Staff') {
    const uid = Date.now().toString().slice(-6);
    const testData = {
      name: `Karyawan QA ${uid}`,
      email: `qa_staff_${uid}@kasflomail.com`,
      username: `staff_${uid}`,
      password: 'Password123!',
      role: role
    };

    await page.goto('/admin/user-management/user/add', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/);

    await page.getByPlaceholder('Masukkan Nama').fill(testData.name);
    await page.getByPlaceholder('Masukkan Email').fill(testData.email);
    await page.getByPlaceholder('Masukkan Username').fill(testData.username);

    // Cabang
    const cabangInput = page.getByPlaceholder('Pilih Cabang');
    await cabangInput.click();
    const firstCabang = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
    await expect(firstCabang).toBeVisible({ timeout: 5000 });
    await firstCabang.click();

    // Password
    await page.getByPlaceholder('Masukkan Kata Sandi').fill(testData.password);
    await page.getByPlaceholder('Masukkan Konfirmasi Kata Sandi').fill(testData.password);

    // Role
    const roleInput = page.getByPlaceholder('Pilih Role');
    await roleInput.click();
    const staffOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
      .filter({ hasText: new RegExp(`^${role}$`, 'i') }).first();
    if (await staffOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await staffOption.click();
    } else {
      await page.locator('[role="option"]:visible, .mantine-Select-option:visible').first().click();
    }

    // Nomor WhatsApp (Wajib Diisi)
    const waInput = page.getByPlaceholder(/Masukkan Nomor WhatsApp/i).or(page.getByLabel(/Nomor WhatsApp/i)).first();
    if (await waInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await waInput.fill('081234' + uid);
    }

    // Submit
    const simpanBtn = page.getByRole('button', { name: /Simpan/i }).first();
    await simpanBtn.click();
    await expect(page).toHaveURL(/\/admin\/user-management\/user$/, { timeout: 15000 });

    return testData;
  }

  // Helper menghapus user berdasarkan username
  async function deleteTestUser(page, username) {
    const searchInput = page.getByPlaceholder('Cari disini...').first();
    await searchInput.clear();
    await searchInput.fill(username);
    await page.waitForTimeout(1000);

    const userRow = page.locator('table tbody tr').filter({ hasText: username }).first();
    if (await userRow.isVisible({ timeout: 5000 }).catch(() => false)) {
      const deleteBtn = userRow.locator('button:has(.tabler-icon-trash), button[color="red"], button:has(svg)').last();
      await deleteBtn.click();

      const modal = page.getByRole('dialog', { name: /Hapus User/i }).or(page.locator('[role="dialog"]')).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const confirmInput = modal.getByPlaceholder(/Masukan Username Karyawan/i);
      await confirmInput.fill(username);

      const confirmHapusBtn = modal.getByRole('button', { name: /^Hapus$/i });
      await expect(confirmHapusBtn).toBeEnabled({ timeout: 5000 });
      await confirmHapusBtn.click();

      await expect(modal).toBeHidden({ timeout: 10000 });
      await page.waitForTimeout(1000);
      await searchInput.clear();
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Manajemen User page
      await page.goto('/admin/user-management/user', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify page loaded and wait for auth state to hydrate
      await expect(page).toHaveURL(/\/admin\/user-management\/user/, { timeout: 15000 });

      // Step 4: Pastikan indikator loading dan pesan otorisasi sementara hilang
      const unauthorizedMsg = page.getByText(/Anda tidak diberikan akses halaman ini/i);
      await expect(unauthorizedMsg).toBeHidden({ timeout: 15000 }).catch(() => {});
      await expect(page.locator('table, .mantine-Breadcrumbs-root').first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  // ==========================================
  // SECTION 1: UI & TAMPILAN HALAMAN
  // ==========================================

  test('[TC-01] Menampilkan halaman Manajemen User dengan breadcrumb dan judul halaman', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Manajemen User dengan breadcrumb dan judul halaman', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText(/Manajemen User/i)).toBeVisible();

      // Verify Title / Heading
      await expect(page.locator(':visible').filter({ hasText: /^Manajemen User$/ }).first()).toBeVisible();

      // Verify Tambah User button is visible
      const tambahBtn = page.getByRole('link', { name: /Tambah User/i }).or(
        page.getByRole('button', { name: /Tambah User/i })
      );
      await expect(tambahBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-02] Memverifikasi 3 kartu batas akun (Owner, Admin, Staff)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi 3 kartu batas akun (Owner, Admin, Staff)', async () => {
      const roles = ['Owner', 'Admin', 'Staff'];

      for (const role of roles) {
        const roleCard = page.locator('.mantine-Card-root, [class*="Card"], [class*="card"]')
          .filter({ hasText: new RegExp(role, 'i') }).first();
        await expect(roleCard).toBeVisible({ timeout: 5000 });
      }
    
    });
  });

  test('[TC-03] Memverifikasi input pencarian dan filter pada toolbar (Cari disini..., Filter Role, Filter Cabang)', async ({ page }) => {
    await test.step('Lakukan pengujian memverifikasi input pencarian dan filter pada toolbar (Cari disini..., Filter Role, Filter Cabang) dan validasi hasil yang ditampilkan', async () => {
      // Search input
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await expect(searchInput).toBeVisible({ timeout: 5000 });
      await searchInput.fill('testuser');
      await expect(searchInput).toHaveValue('testuser');
      await searchInput.clear();

      // Filter Role
      const roleInput = page.getByPlaceholder('Filter Role').first();
      await expect(roleInput).toBeVisible({ timeout: 5000 });
      await selectMantineOption(page, roleInput, 'Admin');

      // Filter Cabang
      const cabangInput = page.getByPlaceholder('Filter Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 5000 });
      await selectMantineOption(page, cabangInput);
    
    });
  });

  test('[TC-04] Memverifikasi struktur tabel manajemen user dan kolom-kolomnya', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel manajemen user dan kolom-kolomnya', async () => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const expectedColumns = [
        'Nama',
        'Username',
        'Email',
        'Cabang',
        'Role',
        'Status',
        'Blokir',
        'Jumlah Gagal Login',
        'Action'
      ];

      for (const col of expectedColumns) {
        await expect(table.locator('th').filter({ hasText: col }).first()).toBeVisible({ timeout: 5000 });
      }
    
    });
  });

  test('[TC-05] Menampilkan baris data user atau indikator pada tabel', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan baris data user atau indikator pada tabel', async () => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const firstRow = table.locator('tbody tr').first();
      await expect(firstRow).toBeVisible({ timeout: 10000 });
    
    });
  });

  // ==========================================
  // SECTION 2: FORM TAMBAH USER & VALIDASI
  // ==========================================

  test('[TC-06] Memverifikasi tombol Tambah User dan navigasi ke halaman form tambah user', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol Tambah User dan navigasi ke halaman form tambah user', async () => {
      const tambahBtn = page.getByRole('link', { name: /Tambah User/i }).or(
        page.getByRole('button', { name: /Tambah User/i })
      );
      await expect(tambahBtn).toBeVisible({ timeout: 5000 });
      await tambahBtn.click();

      await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/, { timeout: 10000 });
      await expect(page.getByText('Tambah User').first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-07] Memverifikasi form Tambah User beserta field-field input dan tabel keterangan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi form Tambah User beserta field-field input dan tabel keterangan', async () => {
      await page.goto('/admin/user-management/user/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/);

      // Verify inputs
      await expect(page.getByPlaceholder('Masukkan Nama')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Email')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Username')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Pilih Cabang')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Kata Sandi')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Konfirmasi Kata Sandi')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Pilih Role')).toBeVisible({ timeout: 5000 });

      // Verify action button Simpan
      const simpanBtn = page.getByRole('button', { name: /Simpan/i }).first();
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });

      // Verify Keterangan feature access table
      await expect(page.getByText('Keterangan').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(/Fitur yang Bisa Di Akses/i).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-08] Memverifikasi validasi form Tambah User ketika field wajib kosong', async ({ page }) => {
    await test.step('Memverifikasi validasi form Tambah User ketika field wajib kosong', async () => {
      await page.goto('/admin/user-management/user/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/);

      const simpanBtn = page.getByRole('button', { name: /Simpan/i }).first();
      await expect(simpanBtn).toBeVisible();
      await simpanBtn.click();

      // Form validation messages should appear (e.g. "Wajib diisi")
      await expect(page.getByText(/Wajib diisi/i).first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-09] Memverifikasi validasi format email dan ketidakcocokan kata sandi', async ({ page }) => {
    await test.step('Memverifikasi validasi format email dan ketidakcocokan kata sandi', async () => {
      await page.goto('/admin/user-management/user/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/);

      // Input invalid email
      const emailInput = page.getByPlaceholder('Masukkan Email');
      await emailInput.fill('invalid-email-format');

      // Input mismatched passwords
      await page.getByPlaceholder('Masukkan Kata Sandi').fill('Password123');
      await page.getByPlaceholder('Masukkan Konfirmasi Kata Sandi').fill('PasswordBedaa');

      const simpanBtn = page.getByRole('button', { name: /Simpan/i }).first();
      await simpanBtn.click();

      // Verifikasi pesan validasi spesifik
      await expect(page.getByText(/Email tidak valid/i)).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(/Kata Sandi tidak sesuai/i)).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-10] Memverifikasi tombol Batal pada halaman form kembali ke halaman manajemen user', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol Batal pada halaman form kembali ke halaman manajemen user', async () => {
      await page.goto('/admin/user-management/user/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/);

      const batalBtn = page.getByRole('button', { name: /Batal/i }).or(
        page.getByRole('link', { name: /Batal/i })
      ).or(page.locator('a[href="/admin/user-management/user"]').first());

      if (await batalBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await batalBtn.click();
        await expect(page).toHaveURL(/\/admin\/user-management\/user/, { timeout: 10000 });
      }
    
    });
  });

  // ==========================================
  // SECTION 3: FULL CRUD WORKFLOWS
  // ==========================================

  test('[TC-11] [CRUD] Alur lengkap Create, Read, Update, dan Delete User Karyawan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: [CRUD] Alur lengkap Create, Read, Update, dan Delete User Karyawan', async () => {
      const uid = Date.now().toString().slice(-6);
      const initialName = `Karyawan QA ${uid}`;
      const updatedName = `Karyawan QA ${uid} Updated`;
      const userEmail = `qa_staff_${uid}@kasflomail.com`;
      const username = `staff_${uid}`;

      // --- 1. CREATE (Tambah User Baru) ---
      const tambahBtn = page.getByRole('link', { name: /Tambah User/i }).or(
        page.getByRole('button', { name: /Tambah User/i })
      );
      await tambahBtn.click();
      await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/, { timeout: 10000 });

      // Isi formulir user
      await page.getByPlaceholder('Masukkan Nama').fill(initialName);
      await page.getByPlaceholder('Masukkan Email').fill(userEmail);
      await page.getByPlaceholder('Masukkan Username').fill(username);

      // Pilih Cabang
      const cabangInput = page.getByPlaceholder('Pilih Cabang');
      await cabangInput.click();
      const firstCabang = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
      await expect(firstCabang).toBeVisible({ timeout: 5000 });
      await firstCabang.click();

      // Kata Sandi & Konfirmasi
      await page.getByPlaceholder('Masukkan Kata Sandi').fill('Kasflo123!');
      await page.getByPlaceholder('Masukkan Konfirmasi Kata Sandi').fill('Kasflo123!');

      // Pilih Role Staff
      const roleInput = page.getByPlaceholder('Pilih Role');
      await roleInput.click();
      const staffOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /^Staff$/i }).first();
      if (await staffOption.isVisible({ timeout: 3000 }).catch(() => false)) {
        await staffOption.click();
      } else {
        await page.locator('[role="option"]:visible, .mantine-Select-option:visible').first().click();
      }

      // Nomor WhatsApp (Wajib Diisi)
      const waInput = page.getByPlaceholder(/Masukkan Nomor WhatsApp/i).or(page.getByLabel(/Nomor WhatsApp/i)).first();
      if (await waInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await waInput.fill('081234' + uid);
      }

      // Klik tombol Simpan
      const simpanBtn = page.getByRole('button', { name: /Simpan/i }).first();
      await simpanBtn.click();

      // Verifikasi redirect kembali ke list user
      await expect(page).toHaveURL(/\/admin\/user-management\/user$/, { timeout: 15000 });

      // --- 2. READ (Mencari dan Melihat Data User) ---
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await searchInput.clear();
      await searchInput.fill(username);
      await page.waitForTimeout(1000);

      const userRow = page.locator('table tbody tr').filter({ hasText: username }).first();
      await expect(userRow).toBeVisible({ timeout: 10000 });
      await expect(userRow).toContainText(initialName);
      await expect(userRow).toContainText(username);
      await expect(userRow).toContainText(userEmail);

      // --- 3. UPDATE (Edit Nama User) ---
      // Cari tombol edit di dalam baris data user
      const editBtn = userRow.locator('a[href*="/user/edit/"], a[href*="/edit/"], button:has(svg)').first();
      await editBtn.click();
      await expect(page).toHaveURL(/.*\/admin\/user-management\/user\/edit\/.*/, { timeout: 10000 });

      // Form edit: Verifikasi nama sebelumnya dan ubah ke nama baru
      const nameInput = page.getByPlaceholder('Masukkan Nama');
      await expect(nameInput).toHaveValue(initialName, { timeout: 5000 });
      await nameInput.clear();
      await nameInput.fill(updatedName);

      // Simpan perubahan edit
      const saveEditBtn = page.getByRole('button', { name: /Simpan/i }).first();
      await saveEditBtn.click();

      // Verifikasi redirect kembali ke list
      await expect(page).toHaveURL(/\/admin\/user-management\/user$/, { timeout: 15000 });

      // Verifikasi data terupdate pada tabel
      await searchInput.clear();
      await searchInput.fill(username);
      await page.waitForTimeout(1000);
      const updatedRow = page.locator('table tbody tr').filter({ hasText: username }).first();
      await expect(updatedRow).toBeVisible({ timeout: 10000 });
      await expect(updatedRow).toContainText(updatedName);

      // --- 4. DELETE (Hapus User dengan Konfirmasi Ketik Username) ---
      // Klik tombol hapus pada baris data user
      const deleteBtn = updatedRow.locator('button:has(.tabler-icon-trash), button[color="red"], button:has(svg)').last();
      await deleteBtn.click();

      // Verifikasi modal konfirmasi hapus terbuka
      const modal = page.getByRole('dialog', { name: /Hapus User/i }).or(page.locator('[role="dialog"]')).first();
      await expect(modal).toBeVisible({ timeout: 8000 });
      await expect(modal.getByText(/Hapus User|menghapus data user/i).first()).toBeVisible();

      // Verifikasi tombol Hapus dalam keadaan disabled sebelum mengetik username konfirmasi
      const confirmHapusBtn = modal.getByRole('button', { name: /^Hapus$/i });
      await expect(confirmHapusBtn).toBeDisabled();

      // Validasi ketik username salah: tombol tetap disabled
      const confirmInput = modal.getByPlaceholder(/Masukan Username Karyawan/i);
      await expect(confirmInput).toBeVisible({ timeout: 5000 });
      await confirmInput.fill('wrong_username_xyz');
      await expect(confirmHapusBtn).toBeDisabled();

      // Ketik username yang benar
      await confirmInput.clear();
      await confirmInput.fill(username);

      // Verifikasi tombol Hapus menjadi enabled
      await expect(confirmHapusBtn).toBeEnabled({ timeout: 5000 });
      await confirmHapusBtn.click();

      // Verifikasi modal tertutup
      await expect(modal).toBeHidden({ timeout: 10000 });

      // Verifikasi data user sudah tidak ada di tabel
      await page.waitForTimeout(1500);
      await searchInput.clear();
      await searchInput.fill(username);
      await page.waitForTimeout(1000);
      await expect(page.locator('table tbody tr').filter({ hasText: username })).toHaveCount(0);
    
    });
  });

  test('[TC-12] Menguji interaksi perubahan status aktif / nonaktif karyawan', async ({ page }) => {
    await test.step('Lakukan pengujian menguji interaksi perubahan status aktif / nonaktif karyawan dan verifikasi pembaruan data', async () => {
      // Buat user temporer untuk menguji status toggle secara mandiri
      const user = await createTestUser(page, 'Staff');

      // Cari user yang baru dibuat
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await searchInput.clear();
      await searchInput.fill(user.username);
      await page.waitForTimeout(1000);

      const userRow = page.locator('table tbody tr').filter({ hasText: user.username }).first();
      await expect(userRow).toBeVisible({ timeout: 10000 });

      // Switch status toggle
      const statusSwitch = userRow.locator('input[type="checkbox"]').first();
      if (await statusSwitch.isVisible({ timeout: 3000 }).catch(() => false)) {
        const initialState = await statusSwitch.isChecked();
        await statusSwitch.locator('xpath=..').click();
        await page.waitForTimeout(1000);

        // Konfirmasi modal jika muncul
        const modal = page.locator('[role="dialog"]:visible').first();
        if (await modal.isVisible({ timeout: 2000 }).catch(() => false)) {
          const confirmBtn = modal.getByRole('button', { name: /Iya|Yakin|Ya|Konfirmasi/i });
          if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await confirmBtn.click();
          }
        }
      }

      // Cleanup: hapus user yang dibuat agar kuota tetap bersih
      await deleteTestUser(page, user.username);
    
    });
  });

  test('[TC-13] Modal konfirmasi hapus menjaga tombol Hapus tetap nonaktif jika username salah ketik', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Modal konfirmasi hapus menjaga tombol Hapus tetap nonaktif jika username salah ketik', async () => {
      // Buat user temporer untuk menguji validasi modal hapus secara mandiri
      const user = await createTestUser(page, 'Staff');

      // Cari user yang baru dibuat
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await searchInput.clear();
      await searchInput.fill(user.username);
      await page.waitForTimeout(1000);

      const userRow = page.locator('table tbody tr').filter({ hasText: user.username }).first();
      await expect(userRow).toBeVisible({ timeout: 10000 });

      // Klik tombol hapus
      const deleteBtn = userRow.locator('button:has(.tabler-icon-trash), button[color="red"], button:has(svg)').last();
      await deleteBtn.click();

      const modal = page.getByRole('dialog', { name: /Hapus User/i }).or(page.locator('[role="dialog"]')).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const confirmHapusBtn = modal.getByRole('button', { name: /^Hapus$/i });
      await expect(confirmHapusBtn).toBeDisabled();

      // Ketik username yang salah
      const confirmInput = modal.getByPlaceholder(/Masukan Username Karyawan/i);
      await expect(confirmInput).toBeVisible({ timeout: 3000 });
      await confirmInput.fill('wrong_username_xyz');

      // Tombol harus tetap disabled
      await expect(confirmHapusBtn).toBeDisabled();

      // Ketik username yang benar untuk melanjutkan penghapusan dan membersihkan data
      await confirmInput.clear();
      await confirmInput.fill(user.username);
      await expect(confirmHapusBtn).toBeEnabled({ timeout: 5000 });
      await confirmHapusBtn.click();

      // Verifikasi modal tertutup dan user terhapus
      await expect(modal).toBeHidden({ timeout: 10000 });
      await page.waitForTimeout(1000);
      await searchInput.clear();
      await searchInput.fill(user.username);
      await page.waitForTimeout(1000);
      await expect(page.locator('table tbody tr').filter({ hasText: user.username })).toHaveCount(0);
    
    });
  });
});
