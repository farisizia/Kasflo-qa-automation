# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Laporan Usaha/produk.spec.js >> Laporan Produk >> [TC-03] Memverifikasi filter dropdown Pilih Cabang
- Location: tests/Kasflo-Resto/Laporan Usaha/produk.spec.js:123:3

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
  3   | test.describe('Laporan Produk', () => {
  4   |   // Shared resilient login helper
  5   |   async function loginBeforeTest(page) {
  6   |     if (page.url().includes('/admin/')) {
  7   |       return page;
  8   |     }
  9   | 
  10  |     try {
  11  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  12  |     } catch {
  13  |       await page.waitForTimeout(500);
  14  |       try {
  15  |         await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  16  |       } catch {
> 17  |         await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      |                    ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
  18  |       }
  19  |     }
  20  | 
  21  |     if (page.url().includes('/admin/')) {
  22  |       return page;
  23  |     }
  24  | 
  25  |     const emailInput = page.getByLabel(/Email atau Username/i);
  26  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  27  | 
  28  |     await emailInput.fill('qakasflo@automation.com');
  29  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  30  | 
  31  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  32  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  33  |     await loginBtn.click();
  34  | 
  35  |     try {
  36  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
  37  |     } catch {
  38  |       if (!page.url().includes('/admin/')) {
  39  |         if (await loginBtn.isEnabled().catch(() => false)) {
  40  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  41  |         }
  42  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  43  |       }
  44  |     }
  45  |     return page;
  46  |   }
  47  | 
  48  |   // Helper to select an option in a Mantine Select dropdown
  49  |   async function selectMantineOption(page, inputLocator, optionText) {
  50  |     await inputLocator.click();
  51  | 
  52  |     if (optionText) {
  53  |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
  54  |         .filter({ hasText: optionText }).first();
  55  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  56  |         await option.click();
  57  |         return;
  58  |       }
  59  |     }
  60  | 
  61  |     const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  62  |     if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  63  |       await firstOption.click();
  64  |     } else {
  65  |       await page.keyboard.press('Escape');
  66  |     }
  67  |   }
  68  | 
  69  |   test.beforeEach(async ({ page }) => {
  70  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  71  |       // Step 1: Login
  72  |       await loginBeforeTest(page);
  73  | 
  74  |       // Step 2: Navigate to Product report page
  75  |       await page.goto('/admin/report/product', { waitUntil: 'domcontentloaded' });
  76  | 
  77  |       // Step 3: Verify page loaded
  78  |       await expect(page).toHaveURL(/\/admin\/report\/product/, { timeout: 15000 });
  79  |     
  80  |     });
  81  |   });
  82  | 
  83  |   test('[TC-01] Menampilkan halaman Laporan Produk dengan breadcrumb, title, dan filter', async ({ page }) => {
  84  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Laporan Produk dengan breadcrumb, title, dan filter', async () => {
  85  |       // Breadcrumb verification
  86  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
  87  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  88  |       await expect(breadcrumb.getByText(/Laporan Produk/i)).toBeVisible();
  89  | 
  90  |       // Verify visible Title / Heading
  91  |       await expect(page.locator(':visible').filter({ hasText: /^Laporan Produk$/ }).first()).toBeVisible();
  92  | 
  93  |       // Verify filter inputs
  94  |       await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible();
  95  |       await expect(page.getByPlaceholder('Pilih Mode Penjualan').first()).toBeVisible();
  96  |       await expect(page.getByPlaceholder('Pilih Via').first()).toBeVisible();
  97  | 
  98  |       // Verify buttons
  99  |       await expect(page.getByRole('button', { name: /Tampilkan/i })).toBeVisible();
  100 |       await expect(page.getByRole('button', { name: /Unduh Laporan/i })).toBeVisible();
  101 |     
  102 |     });
  103 |   });
  104 | 
  105 |   test('[TC-02] Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async ({ page }) => {
  106 |     await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async () => {
  107 |       const dateBtn = page.getByRole('button', { name: /Pilih Tanggal/i }).or(
  108 |         page.locator('button').filter({ hasText: /Pilih Tanggal|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/i })
  109 |       ).first();
  110 |       await expect(dateBtn).toBeVisible({ timeout: 5000 });
  111 | 
  112 |       await dateBtn.click();
  113 | 
  114 |       // Verify calendar popover opens
  115 |       const popover = page.locator('.mantine-Popover-dropdown:visible, .mantine-DatePicker-root:visible').last();
  116 |       if (await popover.isVisible({ timeout: 3000 }).catch(() => false)) {
  117 |         await page.keyboard.press('Escape');
```