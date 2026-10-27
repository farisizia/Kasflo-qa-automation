# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Laporan Usaha/detail_penjualan.spec.js >> Laporan Detail Penjualan >> [TC-05] Memverifikasi input pencarian transaksi (Cari Disini)
- Location: tests/Kasflo-Resto/Laporan Usaha/detail_penjualan.spec.js:148:3

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
  3   | test.describe('Laporan Detail Penjualan', () => {
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
  57  |     if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  58  |       await firstOption.click();
  59  |     } else {
  60  |       await page.keyboard.press('Escape');
  61  |     }
  62  |   }
  63  | 
  64  |   test.beforeEach(async ({ page }) => {
  65  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  66  |       // Step 1: Login
  67  |       await loginBeforeTest(page);
  68  | 
  69  |       // Step 2: Navigate to Detail Penjualan page
  70  |       await page.goto('/admin/report/sale-detail', { waitUntil: 'domcontentloaded' });
  71  | 
  72  |       // Step 3: Verify page URL
  73  |       await expect(page).toHaveURL(/\/admin\/report\/sale-detail/, { timeout: 15000 });
  74  |     
  75  |     });
  76  |   });
  77  | 
  78  |   test('[TC-01] Menampilkan halaman Detail Penjualan dengan breadcrumb, header, dan filter pencarian', async ({ page }) => {
  79  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Detail Penjualan dengan breadcrumb, header, dan filter pencarian', async () => {
  80  |       // Breadcrumb verification
  81  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
  82  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  83  |       await expect(breadcrumb.getByText(/Detail Penjualan/i)).toBeVisible();
  84  | 
  85  |       // Verify Title & description
  86  |       await expect(page.getByText('Detail Penjualan').first()).toBeVisible();
  87  |       await expect(page.getByText(/Penjualan di outletmu selama periode/i).first()).toBeVisible();
  88  | 
  89  |       // Verify filter inputs presence
  90  |       await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible();
  91  |       await expect(page.getByPlaceholder('Pilih Mode Penjualan').first()).toBeVisible();
  92  |       await expect(page.getByPlaceholder('Pilih Aplikasi').first()).toBeVisible();
  93  |       await expect(page.getByPlaceholder('Pilih Status').first()).toBeVisible();
  94  |       await expect(page.getByPlaceholder('Pilih Metode Pembayaran').first()).toBeVisible();
  95  |       await expect(page.getByPlaceholder('Cari Disini').first()).toBeVisible();
  96  | 
  97  |       // Verify action buttons
  98  |       await expect(page.getByRole('button', { name: /Tampilkan/i })).toBeVisible();
  99  |       await expect(page.getByRole('button', { name: /Unduh Laporan/i })).toBeVisible();
  100 |     
  101 |     });
  102 |   });
  103 | 
  104 |   test('[TC-02] Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async ({ page }) => {
  105 |     await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async () => {
  106 |       const dateBtn = page.getByRole('button', { name: /Pilih Tanggal/i }).or(
  107 |         page.locator('button').filter({ hasText: /Pilih Tanggal|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/i })
  108 |       ).first();
  109 |       await expect(dateBtn).toBeVisible({ timeout: 5000 });
  110 | 
  111 |       await dateBtn.click();
  112 | 
  113 |       // Verify calendar popover opens
```