# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/metode_pembayaran.spec.js >> Metode Pembayaran >> [TC-10] Memverifikasi responsivitas tabel metode pembayaran dan status aktif
- Location: tests/Kasflo-Resto/Pengaturan/metode_pembayaran.spec.js:335:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/admin\/.*/
Received string:  "https://backoffice-dev.kasflo.id/"
Timeout: 20000ms

Call log:
  - Expect "toHaveURL" with timeout 20000ms
    44 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
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
  3   | test.describe('Metode Pembayaran', () => {
  4   |   // Helper login yang tangguh dan menghindari timeout redirect
  5   |   async function loginBeforeTest(page) {
  6   |     if (page.url().includes('/admin/')) {
  7   |       return page;
  8   |     }
  9   | 
  10  |     try {
  11  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
  12  |     } catch {
  13  |       if (page.url().includes('/admin/')) {
  14  |         return page;
  15  |       }
  16  |     }
  17  | 
  18  |     if (page.url().includes('/admin/')) {
  19  |       return page;
  20  |     }
  21  | 
  22  |     const emailInput = page.getByLabel(/Email atau Username/i);
  23  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  24  | 
  25  |     await emailInput.fill('qakasflo@automation.com');
  26  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  27  | 
  28  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  29  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  30  |     await loginBtn.click();
  31  | 
  32  |     try {
  33  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  34  |     } catch {
  35  |       if (!page.url().includes('/admin/')) {
  36  |         await page.waitForTimeout(1500);
  37  |         if (await loginBtn.isEnabled().catch(() => false)) {
  38  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  39  |         }
> 40  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  41  |       }
  42  |     }
  43  |     return page;
  44  |   }
  45  | 
  46  |   // Helper selector untuk baris tabel metode pembayaran (mengecualikan baris kosong)
  47  |   function getPaymentRows(page) {
  48  |     return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  49  |   }
  50  | 
  51  |   test.beforeEach(async ({ page }) => {
  52  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  53  |       // Intercept subscription endpoint agar batas metode pembayaran mencukupi
  54  |       await page.route('**/subscription**', async route => {
  55  |         try {
  56  |           const response = await route.fetch();
  57  |           const json = await response.json();
  58  |           if (json.data && json.data.active_features) {
  59  |             json.data.active_features.max_setting_payment_method = 50;
  60  |           }
  61  |           await route.fulfill({ json });
  62  |         } catch {
  63  |           await route.continue().catch(() => {});
  64  |         }
  65  |       });
  66  | 
  67  |       // 1. Login
  68  |       await loginBeforeTest(page);
  69  | 
  70  |       // 2. Navigasi ke halaman Metode Pembayaran
  71  |       try {
  72  |         await page.goto('/admin/setting/payment-method', { waitUntil: 'commit', timeout: 25000 });
  73  |       } catch {
  74  |         await page.goto('/admin/setting/payment-method', { waitUntil: 'domcontentloaded', timeout: 25000 });
  75  |       }
  76  | 
  77  |       // 3. Verifikasi URL dan tabel termuat
  78  |       await expect(page).toHaveURL(/\/admin\/setting\/payment-method/, { timeout: 20000 });
  79  |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  80  |     
  81  |     });
  82  |   });
  83  | 
  84  |   // ==========================================
  85  |   // 1. TAMPILAN HALAMAN & STRUKTUR TABEL
  86  |   // ==========================================
  87  | 
  88  |   test('[TC-01] Menampilkan halaman Metode Pembayaran dengan breadcrumb, judul, limit kuota, dan tombol tambah', async ({ page }) => {
  89  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Metode Pembayaran dengan breadcrumb, judul, limit kuota, dan tombol tambah', async () => {
  90  |       // Verifikasi Title dokumen
  91  |       await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);
  92  | 
  93  |       // Verifikasi Breadcrumb
  94  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]').first();
  95  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  96  |       await expect(breadcrumb.getByText(/Metode Pembayaran/i).first()).toBeVisible();
  97  | 
  98  |       // Verifikasi Card Jumlah Kuota Metode Pembayaran
  99  |       const quotaCard = page.getByText(/Jumlah Metode Pembayaran/i).first();
  100 |       await expect(quotaCard).toBeVisible({ timeout: 10000 });
  101 |       await expect(page.getByText(/\d+\/\d+ Metode Pembayaran/i).first()).toBeVisible();
  102 | 
  103 |       // Verifikasi Tombol Tambah Metode Pembayaran
  104 |       const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
  105 |       await expect(tambahBtn).toBeVisible({ timeout: 10000 });
  106 |       await expect(tambahBtn).toBeEnabled();
  107 |     
  108 |     });
  109 |   });
  110 | 
  111 |   test('[TC-02] Memverifikasi struktur tabel metode pembayaran dan kolom-kolomnya', async ({ page }) => {
  112 |     await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel metode pembayaran dan kolom-kolomnya', async () => {
  113 |       const table = page.locator('table:visible').first();
  114 |       await expect(table).toBeVisible({ timeout: 10000 });
  115 | 
  116 |       // Verifikasi header tabel
  117 |       const thead = table.locator('thead:visible').first();
  118 |       await expect(thead.getByText('Nama Metode Pembayaran').first()).toBeVisible();
  119 |       await expect(thead.getByText('Tipe Metode Pembayaran').first()).toBeVisible();
  120 |       await expect(thead.getByText('Digunakan Cabang').first()).toBeVisible();
  121 |       await expect(thead.getByText('Status').first()).toBeVisible();
  122 |       await expect(thead.getByText('Action').first()).toBeVisible();
  123 | 
  124 |       // Verifikasi metode pembayaran default Cash & QRIS System ada dalam tabel
  125 |       const rows = getPaymentRows(page);
  126 |       await expect(rows.first()).toBeVisible({ timeout: 10000 });
  127 |       await expect(page.getByText('Cash').first()).toBeVisible();
  128 |       await expect(page.getByText('QRIS System').first()).toBeVisible();
  129 |     
  130 |     });
  131 |   });
  132 | 
  133 |   // ==========================================
  134 |   // 2. TOOLBAR & FILTER STATUS
  135 |   // ==========================================
  136 | 
  137 |   test('[TC-03] Dapat membuka dropdown Filter Status dan memilih opsi status', async ({ page }) => {
  138 |     await test.step('Lakukan pengujian dapat membuka dropdown Filter Status dan memilih opsi status dan validasi hasil yang ditampilkan', async () => {
  139 |       const filterStatus = page.getByPlaceholder('Filter Status').first();
  140 |       await expect(filterStatus).toBeVisible({ timeout: 5000 });
```