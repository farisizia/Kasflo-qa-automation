# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/pajak_biaya_lainnya.spec.js >> Pajak & Biaya Lainnya >> [TC-01] Menampilkan halaman Pajak dan Biaya Lainnya dengan breadcrumb, judul, dan tombol aksi
- Location: tests/Kasflo-Resto/Pengaturan/pajak_biaya_lainnya.spec.js:82:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/admin\/.*/
Received string:  "https://backoffice-dev.kasflo.id/"
Timeout: 20000ms

Call log:
  - Expect "toHaveURL" with timeout 20000ms
    43 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
       - unexpected value "https://backoffice-dev.kasflo.id/"

```

```yaml
- img
- paragraph: Masuk ke dashboard
- text: Email atau Username
- textbox "Email atau Username":
  - /placeholder: "Contoh: kasfloresto@gmail.com atau kasfloresto_123"
  - text: qakasflo@automation.com
- text: Kata Sandi
- textbox "Kata Sandi":
  - /placeholder: "Contoh: Sandi123@!"
  - text: password
- link "Lupa kata sandi?":
  - /url: /forgot-password
  - paragraph: Lupa kata sandi?
- button "Masuk" [disabled]
- paragraph: Belum punya akun Kasflo Resto ?
- link "Daftar":
  - /url: /register
  - paragraph: Daftar
- link "Privacy Policy":
  - /url: https://kasflo.id/privacy-policy
  - paragraph: Privacy Policy
- link "Terms and Condition":
  - /url: https://kasflo.id/terms-and-condition
  - paragraph: Terms and Condition
- paragraph: 2026. PT Topindo Solusi Komunika Tbk
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Pajak & Biaya Lainnya', () => {
  4   |   // Helper login yang tangguh dan menghindari timeout redirect
  5   |   async function loginBeforeTest(page) {
  6   |     if (page.url().includes('/admin/')) {
  7   |       return page;
  8   |     }
  9   | 
  10  |     try {
  11  |       await page.goto('/', { waitUntil: 'commit', timeout: 25000 });
  12  |     } catch {
  13  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 25000 });
  14  |     }
  15  | 
  16  |     if (page.url().includes('/admin/')) {
  17  |       return page;
  18  |     }
  19  | 
  20  |     const emailInput = page.getByLabel(/Email atau Username/i);
  21  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  22  | 
  23  |     await emailInput.fill('qakasflo@automation.com');
  24  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  25  | 
  26  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  27  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  28  |     await loginBtn.click();
  29  | 
  30  |     try {
  31  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  32  |     } catch {
  33  |       if (!page.url().includes('/admin/')) {
  34  |         await page.waitForTimeout(1500);
  35  |         if (await loginBtn.isEnabled().catch(() => false)) {
  36  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  37  |         }
> 38  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  39  |       }
  40  |     }
  41  |     return page;
  42  |   }
  43  | 
  44  |   test.beforeEach(async ({ page }) => {
  45  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  46  |       // Intercept subscription endpoint agar fitur Pajak & Biaya Tambahan selalu aktif
  47  |       await page.route('**/subscription**', async route => {
  48  |         try {
  49  |           const response = await route.fetch();
  50  |           const json = await response.json();
  51  |           if (json.data && json.data.active_features) {
  52  |             json.data.active_features.enable_setting_tax_and_other_fee = true;
  53  |             json.data.active_features.enable_transaction_additional_cost = true;
  54  |             json.data.active_features.max_setting_transaction_additional_cost = 10;
  55  |           }
  56  |           await route.fulfill({ json });
  57  |         } catch {
  58  |           await route.continue().catch(() => {});
  59  |         }
  60  |       });
  61  | 
  62  |       // 1. Pastikan sudah login
  63  |       await loginBeforeTest(page);
  64  | 
  65  |       // 2. Navigasi ke halaman Pajak & Biaya Lainnya
  66  |       try {
  67  |         await page.goto('/admin/setting/tax-and-other', { waitUntil: 'commit', timeout: 25000 });
  68  |       } catch {
  69  |         await page.goto('/admin/setting/tax-and-other', { waitUntil: 'domcontentloaded', timeout: 25000 });
  70  |       }
  71  | 
  72  |       // 3. Verifikasi URL halaman
  73  |       await expect(page).toHaveURL(/\/admin\/setting\/tax-and-other/, { timeout: 20000 });
  74  |     
  75  |     });
  76  |   });
  77  | 
  78  |   // ==========================================
  79  |   // 1. TAMPILAN HALAMAN & KOMPONEN UTAMA
  80  |   // ==========================================
  81  | 
  82  |   test('[TC-01] Menampilkan halaman Pajak dan Biaya Lainnya dengan breadcrumb, judul, dan tombol aksi', async ({ page }) => {
  83  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Pajak dan Biaya Lainnya dengan breadcrumb, judul, dan tombol aksi', async () => {
  84  |       // Verifikasi Title dokumen
  85  |       await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);
  86  | 
  87  |       // Verifikasi Breadcrumb
  88  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]').first();
  89  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  90  |       await expect(breadcrumb).toContainText(/Pajak dan Biaya Lainnya/i);
  91  | 
  92  |       // Verifikasi Teks Header Halaman Pajak dan Biaya Lainnya
  93  |       const pageTitle = page.getByText(/Pajak (dan|&) Biaya Lainnya/i).first();
  94  |       await expect(pageTitle).toBeVisible({ timeout: 10000 });
  95  | 
  96  |       // Verifikasi Tombol Simpan dan Simpan Semua Cabang
  97  |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();
  98  |       await expect(simpanBtn).toBeVisible({ timeout: 10000 });
  99  | 
  100 |       const simpanSemuaBtn = page.getByRole('button', { name: /Simpan Semua Cabang/i }).first();
  101 |       await expect(simpanSemuaBtn).toBeVisible({ timeout: 10000 });
  102 | 
  103 |       // Verifikasi Kartu Informasi
  104 |       const infoCard = page.getByText(/Anda dapat merubah pajak & biaya lainnya/i).first();
  105 |       await expect(infoCard).toBeVisible({ timeout: 10000 });
  106 |     
  107 |     });
  108 |   });
  109 | 
  110 |   test('[TC-02] Memverifikasi komponen form Pajak & Service Charge beserta opsi perhitungannya', async ({ page }) => {
  111 |     await test.step('Langkah Pengujian UAT: Memverifikasi komponen form Pajak & Service Charge beserta opsi perhitungannya', async () => {
  112 |       // Verifikasi Bagian Pajak & Service Charge
  113 |       await expect(page.getByText('Pajak & Service Charge').first()).toBeVisible({ timeout: 10000 });
  114 | 
  115 |       // Verifikasi Dropdown Pilih Outlet
  116 |       const outletDropdown = page.getByPlaceholder('Pilih Outlet').first();
  117 |       await expect(outletDropdown).toBeAttached();
  118 | 
  119 |       // Verifikasi Opsi Radio Perhitungan Pajak
  120 |       await expect(page.getByText('Perhitungan Pajak').first()).toBeVisible({ timeout: 5000 });
  121 |       const radioSebelumDiskon = page.getByRole('radio', { name: /Sebelum Diskon/i })
  122 |         .or(page.locator('label').filter({ hasText: /Sebelum Diskon/i })).first();
  123 |       const radioSesudahDiskon = page.getByRole('radio', { name: /Sesudah Diskon/i })
  124 |         .or(page.locator('label').filter({ hasText: /Sesudah Diskon/i })).first();
  125 | 
  126 |       await expect(radioSebelumDiskon).toBeVisible({ timeout: 5000 });
  127 |       await expect(radioSesudahDiskon).toBeVisible({ timeout: 5000 });
  128 | 
  129 |       // Verifikasi Input Field Persentase & Biaya
  130 |       await expect(page.getByPlaceholder('Masukkan Pajak %').first()).toBeVisible({ timeout: 5000 });
  131 |       await expect(page.getByPlaceholder('Masukkan Service Charge %').first()).toBeVisible({ timeout: 5000 });
  132 |       await expect(page.getByPlaceholder('Masukkan Charge Takeaway').first()).toBeVisible({ timeout: 5000 });
  133 |     
  134 |     });
  135 |   });
  136 | 
  137 |   test('[TC-03] Memverifikasi struktur tabel Pengaturan Biaya Tambahan dan tombol Tambah', async ({ page }) => {
  138 |     await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel Pengaturan Biaya Tambahan dan tombol Tambah', async () => {
```