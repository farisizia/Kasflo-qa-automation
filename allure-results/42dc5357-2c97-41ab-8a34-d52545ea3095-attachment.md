# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pembukuan/laporan_pembukuan.spec.js >> Laporan Pembukuan >> [TC-01] Menampilkan halaman Laporan Pembukuan dengan breadcrumb, judul, dan pemilih tipe laporan
- Location: tests/Kasflo-Resto/Pembukuan/laporan_pembukuan.spec.js:75:3

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
Call log:
  - navigating to "https://backoffice-dev.kasflo.id/", waiting until "commit"

```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Laporan Pembukuan', () => {
  4   |   // Shared resilient login helper
  5   |   async function loginBeforeTest(page) {
  6   |     if (page.url().includes('/admin/')) {
  7   |       return page;
  8   |     }
  9   | 
  10  |     try {
  11  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  12  |     } catch {
> 13  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      |                  ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
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
  37  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  38  |       }
  39  |     }
  40  |     return page;
  41  |   }
  42  | 
  43  |   // Helper to select an option in a Mantine Select dropdown
  44  |   async function selectMantineOption(page, inputLocator, optionText) {
  45  |     await inputLocator.click();
  46  | 
  47  |     if (optionText) {
  48  |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
  49  |         .filter({ hasText: optionText }).first();
  50  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  51  |         await option.click();
  52  |         return;
  53  |       }
  54  |     }
  55  | 
  56  |     const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  57  |     await expect(firstOption).toBeVisible({ timeout: 5000 });
  58  |     await firstOption.click();
  59  |   }
  60  | 
  61  |   test.beforeEach(async ({ page }) => {
  62  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  63  |       // Step 1: Login
  64  |       await loginBeforeTest(page);
  65  | 
  66  |       // Step 2: Navigate to Laporan Pembukuan page
  67  |       await page.goto('/admin/cash-account/report', { waitUntil: 'domcontentloaded' });
  68  | 
  69  |       // Step 3: Verify page loaded
  70  |       await expect(page).toHaveURL(/\/admin\/cash-account\/report/, { timeout: 15000 });
  71  |     
  72  |     });
  73  |   });
  74  | 
  75  |   test('[TC-01] Menampilkan halaman Laporan Pembukuan dengan breadcrumb, judul, dan pemilih tipe laporan', async ({ page }) => {
  76  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Laporan Pembukuan dengan breadcrumb, judul, dan pemilih tipe laporan', async () => {
  77  |       // Breadcrumb verification
  78  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
  79  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  80  |       await expect(breadcrumb.getByText('Laporan Pembukuan')).toBeVisible();
  81  | 
  82  |       // Verify page heading / title
  83  |       await expect(page.getByText('Laporan Pembukuan').first()).toBeVisible();
  84  | 
  85  |       // Verify report type selector exists
  86  |       const reportTypeSelector = page.getByRole('textbox').filter({ hasText: /Laporan Arus Kas|Laporan Transaksi/i })
  87  |         .or(page.locator('input[readonly]').filter({ hasText: /Laporan Arus Kas/i }))
  88  |         .or(page.locator('.mantine-Select-input, input').filter({ hasText: /Laporan/i })).first();
  89  |       await expect(page.getByText(/Laporan Arus Kas/i).first()).toBeVisible({ timeout: 5000 });
  90  |     
  91  |     });
  92  |   });
  93  | 
  94  |   test('[TC-02] Memverifikasi komponen filter pada halaman (Pilih Periode, Pilih Cabang, dan tombol Cari)', async ({ page }) => {
  95  |     await test.step('Lakukan pengujian memverifikasi komponen filter pada halaman (Pilih Periode, Pilih Cabang, dan tombol Cari) dan validasi hasil yang ditampilkan', async () => {
  96  |       // Verify Date range picker / trigger
  97  |       const dateTrigger = page.locator('button, input').filter({ hasText: /Pilih Periode|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/i })
  98  |         .or(page.getByPlaceholder('Pilih Periode')).first();
  99  |       await expect(dateTrigger).toBeVisible({ timeout: 5000 });
  100 | 
  101 |       // Verify Cabang selector
  102 |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  103 |       await expect(cabangInput).toBeVisible({ timeout: 5000 });
  104 | 
  105 |       // Verify Cari Button
  106 |       const cariBtn = page.getByRole('button', { name: /^Cari$/i }).first();
  107 |       await expect(cariBtn).toBeVisible({ timeout: 5000 });
  108 |     
  109 |     });
  110 |   });
  111 | 
  112 |   test('[TC-03] Menampilkan tampilan default Laporan Arus Kas dengan heading, info periode, header Keterangan & Jumlah, dan tombol Unduh Laporan', async ({ page }) => {
  113 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan tampilan default Laporan Arus Kas dengan heading, info periode, header Keterangan & Jumlah, dan tombol Unduh Laporan', async () => {
```