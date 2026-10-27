# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Laporan Usaha/rangkuman_penjualan.spec.js >> Laporan Rangkuman Penjualan >> [TC-06] Dapat memilih opsi cabang pada filter Semua Cabang
- Location: tests/Kasflo-Resto/Laporan Usaha/rangkuman_penjualan.spec.js:152:3

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
  3   | test.describe('Laporan Rangkuman Penjualan', () => {
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
  66  |       // Step 2: Navigate to Rangkuman Penjualan page
  67  |       await page.goto('/admin/report/summary', { waitUntil: 'domcontentloaded' });
  68  | 
  69  |       // Step 3: Verify page loaded
  70  |       await expect(page).toHaveURL(/\/admin\/report\/summary/, { timeout: 15000 });
  71  |     
  72  |     });
  73  |   });
  74  | 
  75  |   test('[TC-01] Menampilkan halaman Rangkuman Penjualan dengan breadcrumb dan filter utama', async ({ page }) => {
  76  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Rangkuman Penjualan dengan breadcrumb dan filter utama', async () => {
  77  |       // Breadcrumb verification
  78  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
  79  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  80  |       await expect(breadcrumb.getByText('Rangkuman Penjualan')).toBeVisible();
  81  | 
  82  |       // Verify filter tabs: Harian & Bulanan
  83  |       const harianTab = page.getByRole('tab', { name: /Harian/i });
  84  |       await expect(harianTab).toBeVisible({ timeout: 5000 });
  85  | 
  86  |       const bulananTab = page.getByRole('tab', { name: /Bulanan/i });
  87  |       await expect(bulananTab).toBeVisible({ timeout: 5000 });
  88  | 
  89  |       // Verify Cabang selector
  90  |       const cabangInput = page.getByPlaceholder(/Semua Cabang|Pilih Cabang/i).first();
  91  |       await expect(cabangInput).toBeVisible({ timeout: 5000 });
  92  |     
  93  |     });
  94  |   });
  95  | 
  96  |   test('[TC-02] Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async ({ page }) => {
  97  |     await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal (Pilih Tanggal)', async () => {
  98  |       const dateTab = page.getByRole('tab', { name: /Pilih Tanggal/i }).or(page.locator('.mantine-Tabs-tab').filter({ hasText: /Pilih Tanggal/i })).first();
  99  |       await expect(dateTab).toBeVisible({ timeout: 5000 });
  100 | 
  101 |       await dateTab.click();
  102 | 
  103 |       // Verify calendar popover opens
  104 |       const popover = page.locator('.mantine-Popover-dropdown:visible').last();
  105 |       if (await popover.isVisible({ timeout: 3000 }).catch(() => false)) {
  106 |         await page.keyboard.press('Escape');
  107 |       }
  108 |     
  109 |     });
  110 |   });
  111 | 
  112 |   test('[TC-03] Berpindah ke mode filter Bulanan dan memverifikasi perubahan tampilan', async ({ page }) => {
  113 |     await test.step('Lakukan pengujian berpindah ke mode filter Bulanan dan memverifikasi perubahan tampilan dan verifikasi pembaruan data', async () => {
```