# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Manajemen User/manajemen_user.spec.js >> Manajemen User >> [TC-11] [CRUD] Alur lengkap Create, Read, Update, dan Delete User Karyawan
- Location: tests/Manajemen User/manajemen_user.spec.js:359:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin\/user-management\/user$/
Received string:  "https://backoffice-dev.kasflo.id/admin/user-management/user/add"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    32 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
       - unexpected value "https://backoffice-dev.kasflo.id/admin/user-management/user/add"

```

```yaml
- navigation:
  - link "Dashboard":
    - /url: /admin/dashboard
    - img
    - paragraph: Dashboard
  - link "Katalog":
    - /url: /admin/catalog
    - img
    - paragraph: Katalog
    - img
  - link "Bahan Baku":
    - /url: /admin/ingredients
    - img
    - paragraph: Bahan Baku
    - img
  - link "Promosi":
    - /url: /admin/promotion
    - img
    - paragraph: Promosi
    - img
  - link "Pelanggan":
    - /url: /admin/customer
    - img
    - paragraph: Pelanggan
    - img
  - link "Pembukuan":
    - /url: /admin/cash-account
    - img
    - paragraph: Pembukuan
    - img
  - link "Laporan Usaha":
    - /url: /admin/report
    - img
    - paragraph: Laporan Usaha
    - img
  - link "Manajemen User":
    - /url: /admin/user-management
    - img
    - paragraph: Manajemen User
    - img
  - link "Manajemen User":
    - /url: /admin/user-management/user
  - link "Absensi":
    - /url: /admin/user-management/absence
  - link "Pengaturan":
    - /url: /admin/setting
    - img
    - paragraph: Pengaturan
    - img
  - link "Berlangganan":
    - /url: /admin/subscription
    - img
    - paragraph: Berlangganan
- main:
  - img
  - paragraph: Manajamen User
  - button "Business":
    - text: Business
    - img
  - button "Saldo QRIS":
    - text: Saldo QRIS
    - img
  - button "Kasflo Automation OWNER":
    - img
    - paragraph: Kasflo Automation
    - paragraph: OWNER
    - img
  - link:
    - /url: /admin/dashboard
    - img
  - text: /
  - link "Manajemen User":
    - /url: /admin/user-management/user
  - text: /
  - paragraph: Tambah User
  - paragraph: Error, Mohon Periksa Kembali Form Anda
  - button "Batalkan"
  - button "Simpan"
  - heading "Data User" [level=5]
  - text: Nama
  - textbox "Nama":
    - /placeholder: Masukkan Nama
    - text: Karyawan QA 117284
  - text: Email
  - textbox "Email":
    - /placeholder: Masukkan Email
    - text: qa_staff_117284@kasflomail.com
  - text: Username
  - textbox "Username":
    - /placeholder: Masukkan Username
    - text: staff_117284
  - text: Cabang
  - textbox "Cabang":
    - /placeholder: Pilih Cabang
    - text: Kasflo Pusat QA
  - button:
    - img
  - link:
    - /url: /admin/branch-management/branch/add
    - img
  - text: Kata Sandi
  - textbox "Kata Sandi":
    - /placeholder: Masukkan Kata Sandi
    - text: Kasflo123!
  - text: Konfirmasi Kata Sandi
  - textbox "Konfirmasi Kata Sandi":
    - /placeholder: Masukkan Konfirmasi Kata Sandi
    - text: Kasflo123!
  - text: Role
  - textbox "Role":
    - /placeholder: Pilih Role
    - text: Staff
  - img
  - text: Nomor WhatsApp
  - textbox "Nomor WhatsApp" [invalid]:
    - /placeholder: Masukkan Nomor WhatsApp
  - paragraph: Wajib Diisi
  - text: Status User
  - switch "Aktif" [checked]
  - text: Aktif
  - heading "Keterangan" [level=5]
  - table:
    - rowgroup:
      - row "Fitur yang Bisa Di Akses Owner Admin Staff":
        - cell "Fitur yang Bisa Di Akses"
        - cell "Owner"
        - cell "Admin"
        - cell "Staff"
    - rowgroup:
      - row "Platform POS Akses Penuh Akses Penuh Akses Penuh":
        - cell "Platform POS"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
      - row "Dashboard Owner Akses Penuh Tidak Ada Akses Tidak Ada Akses":
        - cell "Dashboard Owner"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Dashboard Cabang Akses Penuh Akses Penuh Tidak Ada Akses":
        - cell "Dashboard Cabang"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Pembukuan Akses Penuh Tidak Ada Akses Tidak Ada Akses":
        - cell "Pembukuan"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Pembukuan Cabang Akses Penuh Akses Penuh Tidak Ada Akses":
        - cell "Pembukuan Cabang"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Manajemen Cabang Akses Penuh Tidak Ada Akses Tidak Ada Akses":
        - cell "Manajemen Cabang"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Manajemen Area & Meja Cabang Akses Penuh Akses Penuh Tidak Ada Akses":
        - cell "Manajemen Area & Meja Cabang"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Manajemen User Akses Penuh Tidak Ada Akses Tidak Ada Akses":
        - cell "Manajemen User"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Katalog Akses Penuh Tidak Ada Akses Tidak Ada Akses":
        - cell "Katalog"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Katalog Cabang Akses Penuh Akses Penuh Tidak Ada Akses":
        - cell "Katalog Cabang"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Metode Pembayaran Akses Penuh Tidak Ada Akses Tidak Ada Akses":
        - cell "Metode Pembayaran"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Promosi Akses Penuh Tidak Ada Akses Tidak Ada Akses":
        - cell "Promosi"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Promosi Cabang Akses Penuh Akses Penuh Tidak Ada Akses":
        - cell "Promosi Cabang"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Laporan Usaha Akses Penuh Tidak Ada Akses Tidak Ada Akses":
        - cell "Laporan Usaha"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
      - row "Laporan Usaha Cabang Akses Penuh Akses Penuh Tidak Ada Akses":
        - cell "Laporan Usaha Cabang"
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Akses Penuh":
          - img
          - text: Akses Penuh
        - cell "Tidak Ada Akses":
          - img
          - text: Tidak Ada Akses
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  306 |       await expect(simpanBtn).toBeVisible();
  307 |       await simpanBtn.click();
  308 | 
  309 |       // Form validation messages should appear (e.g. "Wajib diisi")
  310 |       await expect(page.getByText(/Wajib diisi/i).first()).toBeVisible({ timeout: 5000 });
  311 |     
  312 |     });
  313 |   });
  314 | 
  315 |   test('[TC-09] Memverifikasi validasi format email dan ketidakcocokan kata sandi', async ({ page }) => {
  316 |     await test.step('Memverifikasi validasi format email dan ketidakcocokan kata sandi', async () => {
  317 |       await page.goto('/admin/user-management/user/add', { waitUntil: 'domcontentloaded' });
  318 |       await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/);
  319 | 
  320 |       // Input invalid email
  321 |       const emailInput = page.getByPlaceholder('Masukkan Email');
  322 |       await emailInput.fill('invalid-email-format');
  323 | 
  324 |       // Input mismatched passwords
  325 |       await page.getByPlaceholder('Masukkan Kata Sandi').fill('Password123');
  326 |       await page.getByPlaceholder('Masukkan Konfirmasi Kata Sandi').fill('PasswordBedaa');
  327 | 
  328 |       const simpanBtn = page.getByRole('button', { name: /Simpan/i }).first();
  329 |       await simpanBtn.click();
  330 | 
  331 |       // Verifikasi pesan validasi spesifik
  332 |       await expect(page.getByText(/Email tidak valid/i)).toBeVisible({ timeout: 5000 });
  333 |       await expect(page.getByText(/Kata Sandi tidak sesuai/i)).toBeVisible({ timeout: 5000 });
  334 |     
  335 |     });
  336 |   });
  337 | 
  338 |   test('[TC-10] Memverifikasi tombol Batal pada halaman form kembali ke halaman manajemen user', async ({ page }) => {
  339 |     await test.step('Langkah Pengujian UAT: Memverifikasi tombol Batal pada halaman form kembali ke halaman manajemen user', async () => {
  340 |       await page.goto('/admin/user-management/user/add', { waitUntil: 'domcontentloaded' });
  341 |       await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/);
  342 | 
  343 |       const batalBtn = page.getByRole('button', { name: /Batal/i }).or(
  344 |         page.getByRole('link', { name: /Batal/i })
  345 |       ).or(page.locator('a[href="/admin/user-management/user"]').first());
  346 | 
  347 |       if (await batalBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  348 |         await batalBtn.click();
  349 |         await expect(page).toHaveURL(/\/admin\/user-management\/user/, { timeout: 10000 });
  350 |       }
  351 |     
  352 |     });
  353 |   });
  354 | 
  355 |   // ==========================================
  356 |   // SECTION 3: FULL CRUD WORKFLOWS
  357 |   // ==========================================
  358 | 
  359 |   test('[TC-11] [CRUD] Alur lengkap Create, Read, Update, dan Delete User Karyawan', async ({ page }) => {
  360 |     await test.step('Langkah Pengujian UAT: [CRUD] Alur lengkap Create, Read, Update, dan Delete User Karyawan', async () => {
  361 |       const uid = Date.now().toString().slice(-6);
  362 |       const initialName = `Karyawan QA ${uid}`;
  363 |       const updatedName = `Karyawan QA ${uid} Updated`;
  364 |       const userEmail = `qa_staff_${uid}@kasflomail.com`;
  365 |       const username = `staff_${uid}`;
  366 | 
  367 |       // --- 1. CREATE (Tambah User Baru) ---
  368 |       const tambahBtn = page.getByRole('link', { name: /Tambah User/i }).or(
  369 |         page.getByRole('button', { name: /Tambah User/i })
  370 |       );
  371 |       await tambahBtn.click();
  372 |       await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/, { timeout: 10000 });
  373 | 
  374 |       // Isi formulir user
  375 |       await page.getByPlaceholder('Masukkan Nama').fill(initialName);
  376 |       await page.getByPlaceholder('Masukkan Email').fill(userEmail);
  377 |       await page.getByPlaceholder('Masukkan Username').fill(username);
  378 | 
  379 |       // Pilih Cabang
  380 |       const cabangInput = page.getByPlaceholder('Pilih Cabang');
  381 |       await cabangInput.click();
  382 |       const firstCabang = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  383 |       await expect(firstCabang).toBeVisible({ timeout: 5000 });
  384 |       await firstCabang.click();
  385 | 
  386 |       // Kata Sandi & Konfirmasi
  387 |       await page.getByPlaceholder('Masukkan Kata Sandi').fill('Kasflo123!');
  388 |       await page.getByPlaceholder('Masukkan Konfirmasi Kata Sandi').fill('Kasflo123!');
  389 | 
  390 |       // Pilih Role Staff
  391 |       const roleInput = page.getByPlaceholder('Pilih Role');
  392 |       await roleInput.click();
  393 |       const staffOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
  394 |         .filter({ hasText: /^Staff$/i }).first();
  395 |       if (await staffOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  396 |         await staffOption.click();
  397 |       } else {
  398 |         await page.locator('[role="option"]:visible, .mantine-Select-option:visible').first().click();
  399 |       }
  400 | 
  401 |       // Klik tombol Simpan
  402 |       const simpanBtn = page.getByRole('button', { name: /Simpan/i }).first();
  403 |       await simpanBtn.click();
  404 | 
  405 |       // Verifikasi redirect kembali ke list user
> 406 |       await expect(page).toHaveURL(/\/admin\/user-management\/user$/, { timeout: 15000 });
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  407 | 
  408 |       // --- 2. READ (Mencari dan Melihat Data User) ---
  409 |       const searchInput = page.getByPlaceholder('Cari disini...').first();
  410 |       await searchInput.clear();
  411 |       await searchInput.fill(username);
  412 |       await page.waitForTimeout(1000);
  413 | 
  414 |       const userRow = page.locator('table tbody tr').filter({ hasText: username }).first();
  415 |       await expect(userRow).toBeVisible({ timeout: 10000 });
  416 |       await expect(userRow).toContainText(initialName);
  417 |       await expect(userRow).toContainText(username);
  418 |       await expect(userRow).toContainText(userEmail);
  419 | 
  420 |       // --- 3. UPDATE (Edit Nama User) ---
  421 |       // Cari tombol edit di dalam baris data user
  422 |       const editBtn = userRow.locator('a[href*="/user/edit/"], a[href*="/edit/"], button:has(svg)').first();
  423 |       await editBtn.click();
  424 |       await expect(page).toHaveURL(/.*\/admin\/user-management\/user\/edit\/.*/, { timeout: 10000 });
  425 | 
  426 |       // Form edit: Verifikasi nama sebelumnya dan ubah ke nama baru
  427 |       const nameInput = page.getByPlaceholder('Masukkan Nama');
  428 |       await expect(nameInput).toHaveValue(initialName, { timeout: 5000 });
  429 |       await nameInput.clear();
  430 |       await nameInput.fill(updatedName);
  431 | 
  432 |       // Simpan perubahan edit
  433 |       const saveEditBtn = page.getByRole('button', { name: /Simpan/i }).first();
  434 |       await saveEditBtn.click();
  435 | 
  436 |       // Verifikasi redirect kembali ke list
  437 |       await expect(page).toHaveURL(/\/admin\/user-management\/user$/, { timeout: 15000 });
  438 | 
  439 |       // Verifikasi data terupdate pada tabel
  440 |       await searchInput.clear();
  441 |       await searchInput.fill(username);
  442 |       await page.waitForTimeout(1000);
  443 |       const updatedRow = page.locator('table tbody tr').filter({ hasText: username }).first();
  444 |       await expect(updatedRow).toBeVisible({ timeout: 10000 });
  445 |       await expect(updatedRow).toContainText(updatedName);
  446 | 
  447 |       // --- 4. DELETE (Hapus User dengan Konfirmasi Ketik Username) ---
  448 |       // Klik tombol hapus pada baris data user
  449 |       const deleteBtn = updatedRow.locator('button:has(.tabler-icon-trash), button[color="red"], button:has(svg)').last();
  450 |       await deleteBtn.click();
  451 | 
  452 |       // Verifikasi modal konfirmasi hapus terbuka
  453 |       const modal = page.getByRole('dialog', { name: /Hapus User/i }).or(page.locator('[role="dialog"]')).first();
  454 |       await expect(modal).toBeVisible({ timeout: 8000 });
  455 |       await expect(modal.getByText(/Hapus User|menghapus data user/i).first()).toBeVisible();
  456 | 
  457 |       // Verifikasi tombol Hapus dalam keadaan disabled sebelum mengetik username konfirmasi
  458 |       const confirmHapusBtn = modal.getByRole('button', { name: /^Hapus$/i });
  459 |       await expect(confirmHapusBtn).toBeDisabled();
  460 | 
  461 |       // Validasi ketik username salah: tombol tetap disabled
  462 |       const confirmInput = modal.getByPlaceholder(/Masukan Username Karyawan/i);
  463 |       await expect(confirmInput).toBeVisible({ timeout: 5000 });
  464 |       await confirmInput.fill('wrong_username_xyz');
  465 |       await expect(confirmHapusBtn).toBeDisabled();
  466 | 
  467 |       // Ketik username yang benar
  468 |       await confirmInput.clear();
  469 |       await confirmInput.fill(username);
  470 | 
  471 |       // Verifikasi tombol Hapus menjadi enabled
  472 |       await expect(confirmHapusBtn).toBeEnabled({ timeout: 5000 });
  473 |       await confirmHapusBtn.click();
  474 | 
  475 |       // Verifikasi modal tertutup
  476 |       await expect(modal).toBeHidden({ timeout: 10000 });
  477 | 
  478 |       // Verifikasi data user sudah tidak ada di tabel
  479 |       await page.waitForTimeout(1500);
  480 |       await searchInput.clear();
  481 |       await searchInput.fill(username);
  482 |       await page.waitForTimeout(1000);
  483 |       await expect(page.locator('table tbody tr').filter({ hasText: username })).toHaveCount(0);
  484 |     
  485 |     });
  486 |   });
  487 | 
  488 |   test('[TC-12] Menguji interaksi perubahan status aktif / nonaktif karyawan', async ({ page }) => {
  489 |     await test.step('Lakukan pengujian menguji interaksi perubahan status aktif / nonaktif karyawan dan verifikasi pembaruan data', async () => {
  490 |       // Buat user temporer untuk menguji status toggle secara mandiri
  491 |       const user = await createTestUser(page, 'Staff');
  492 | 
  493 |       // Cari user yang baru dibuat
  494 |       const searchInput = page.getByPlaceholder('Cari disini...').first();
  495 |       await searchInput.clear();
  496 |       await searchInput.fill(user.username);
  497 |       await page.waitForTimeout(1000);
  498 | 
  499 |       const userRow = page.locator('table tbody tr').filter({ hasText: user.username }).first();
  500 |       await expect(userRow).toBeVisible({ timeout: 10000 });
  501 | 
  502 |       // Switch status toggle
  503 |       const statusSwitch = userRow.locator('input[type="checkbox"]').first();
  504 |       if (await statusSwitch.isVisible({ timeout: 3000 }).catch(() => false)) {
  505 |         const initialState = await statusSwitch.isChecked();
  506 |         await statusSwitch.locator('xpath=..').click();
```