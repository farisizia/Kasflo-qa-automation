# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/pengaturan_meja.spec.js >> Pengaturan Meja >> [TC-09] Alur lengkap berhasil menambah meja baru
- Location: tests/Kasflo-Resto/Pengaturan/pengaturan_meja.spec.js:273:3

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
  3   | test.describe('Pengaturan Meja', () => {
  4   |   // Helper login yang tangguh dan menghindari timeout
  5   |   async function loginBeforeTest(page) {
  6   |     if (page.url().includes('/admin/')) {
  7   |       return page;
  8   |     }
  9   | 
  10  |     try {
  11  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  12  |     } catch {
  13  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
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
  31  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
  32  |     } catch {
  33  |       if (!page.url().includes('/admin/')) {
  34  |         if (await loginBtn.isEnabled().catch(() => false)) {
  35  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  36  |         }
> 37  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  38  |       }
  39  |     }
  40  |     return page;
  41  |   }
  42  | 
  43  |   // Helper selector kartu meja
  44  |   function getTableCards(page) {
  45  |     return page.locator('[style*="background: rgb(235, 246, 253)"], [style*="#EBF6FD"]');
  46  |   }
  47  | 
  48  |   // Helper menunggu halaman meja siap
  49  |   async function waitForTablePage(page) {
  50  |     await expect(page).toHaveURL(/\/admin\/branch-management\/setting-table/, { timeout: 20000 });
  51  |     await page.waitForTimeout(1000);
  52  |   }
  53  | 
  54  |   test.beforeEach(async ({ page }) => {
  55  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  56  |       // 1. Pastikan login
  57  |       await loginBeforeTest(page);
  58  | 
  59  |       // 2. Navigasi ke Pengaturan Meja
  60  |       await page.goto('/admin/branch-management/setting-table', { waitUntil: 'domcontentloaded' });
  61  | 
  62  |       // 3. Verifikasi URL Pengaturan Meja
  63  |       await waitForTablePage(page);
  64  |     
  65  |     });
  66  |   });
  67  | 
  68  |   // ==========================================
  69  |   // 1. TAMPILAN & ELEMEN HALAMAN (PAGE VIEW)
  70  |   // ==========================================
  71  | 
  72  |   test('[TC-01] Memverifikasi judul dokumen, breadcrumb, dan limit penggunaan Meja', async ({ page }) => {
  73  |     await test.step('Langkah Pengujian UAT: Memverifikasi judul dokumen, breadcrumb, dan limit penggunaan Meja', async () => {
  74  |       // Verifikasi Title dokumen
  75  |       await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);
  76  | 
  77  |       // Verifikasi Breadcrumb Pengaturan Meja
  78  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]').first();
  79  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  80  |       await expect(breadcrumb).toContainText('Pengaturan Meja');
  81  | 
  82  |       // Verifikasi Limit Card Meja
  83  |       const limitInfo = page.locator('text=Meja').first();
  84  |       await expect(limitInfo).toBeVisible();
  85  | 
  86  |       // Verifikasi Tombol Tambah Meja
  87  |       const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
  88  |       await expect(tambahBtn).toBeVisible();
  89  |       await expect(tambahBtn).toBeEnabled();
  90  |     
  91  |     });
  92  |   });
  93  | 
  94  |   test('[TC-02] Memverifikasi komponen filter cabang pada header Pengaturan Meja', async ({ page }) => {
  95  |     await test.step('Lakukan pengujian memverifikasi komponen filter cabang pada header Pengaturan Meja dan validasi hasil yang ditampilkan', async () => {
  96  |       // Filter dropdown Cabang
  97  |       const branchFilter = page.getByPlaceholder('Pilih Cabang').first();
  98  |       await expect(branchFilter).toBeVisible();
  99  |     
  100 |     });
  101 |   });
  102 | 
  103 |   test('[TC-03] Memverifikasi kartu meja menampilkan informasi lengkap (nomor meja, pax, area, cabang, minimal bill, status)', async ({ page }) => {
  104 |     await test.step('Langkah Pengujian UAT: Memverifikasi kartu meja menampilkan informasi lengkap (nomor meja, pax, area, cabang, minimal bill, status)', async () => {
  105 |       const cards = getTableCards(page);
  106 |       const count = await cards.count();
  107 | 
  108 |       if (count > 0) {
  109 |         const firstCard = cards.first();
  110 |         await expect(firstCard).toBeVisible();
  111 | 
  112 |         // Label Pax
  113 |         await expect(firstCard.locator('text=Pax').first()).toBeVisible();
  114 | 
  115 |         // Label Area & Cabang
  116 |         await expect(firstCard.locator('text=Area').first()).toBeVisible();
  117 |         await expect(firstCard.locator('text=Cabang').first()).toBeVisible();
  118 | 
  119 |         // Label Minimal Bill & Status Meja
  120 |         await expect(firstCard.locator('text=Minimal Bill').first()).toBeVisible();
  121 |         await expect(firstCard.locator('text=Status Meja').first()).toBeVisible();
  122 |       } else {
  123 |         // Jika data kosong, tampil teks placeholder
  124 |         await expect(page.getByText(/Data Belum Tersedia|Belum Ada Data/i).first()).toBeVisible();
  125 |       }
  126 |     
  127 |     });
  128 |   });
  129 | 
  130 |   // ==========================================
  131 |   // 2. FILTER CABANG & AREA
  132 |   // ==========================================
  133 | 
  134 |   test('[TC-04] Memilih filter cabang dan memverifikasi dropdown filter area muncul secara kondisional', async ({ page }) => {
  135 |     await test.step('Lakukan pengujian memilih filter cabang dan memverifikasi dropdown filter area muncul secara kondisional dan validasi hasil yang ditampilkan', async () => {
  136 |       const branchFilter = page.getByPlaceholder('Pilih Cabang').first();
  137 |       await branchFilter.click();
```