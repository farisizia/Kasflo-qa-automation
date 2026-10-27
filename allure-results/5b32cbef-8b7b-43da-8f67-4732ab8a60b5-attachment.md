# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Laporan Usaha/laba_rugi.spec.js >> Laporan Laba Rugi >> [TC-03] Memverifikasi filter dropdown Pilih Cabang
- Location: tests/Kasflo-Resto/Laporan Usaha/laba_rugi.spec.js:109:3

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
  3   | test.describe('Laporan Laba Rugi', () => {
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
  69  |       // Step 2: Navigate to Profit and Loss report page
  70  |       await page.goto('/admin/report/profit-and-loss', { waitUntil: 'domcontentloaded' });
  71  | 
  72  |       // Step 3: Verify page loaded
  73  |       await expect(page).toHaveURL(/\/admin\/report\/profit-and-loss/, { timeout: 15000 });
  74  |     
  75  |     });
  76  |   });
  77  | 
  78  |   test('[TC-01] Menampilkan halaman Laporan Laba Rugi dengan filter utama dan tombol aksi', async ({ page }) => {
  79  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Laporan Laba Rugi dengan filter utama dan tombol aksi', async () => {
  80  |       // Verify Cabang selector
  81  |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  82  |       await expect(cabangInput).toBeVisible({ timeout: 10000 });
  83  | 
  84  |       // Verify action buttons
  85  |       await expect(page.getByRole('button', { name: /Tampilkan/i })).toBeVisible();
  86  |       await expect(page.getByRole('button', { name: /Unduh Laporan/i })).toBeVisible();
  87  |     
  88  |     });
  89  |   });
  90  | 
  91  |   test('[TC-02] Memverifikasi pemilih rentang tanggal pada laporan laba rugi', async ({ page }) => {
  92  |     await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal pada laporan laba rugi', async () => {
  93  |       const dateBtn = page.locator('button').filter({
  94  |         hasText: /–|-|Pilih Tanggal|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/i
  95  |       }).first();
  96  |       await expect(dateBtn).toBeVisible({ timeout: 5000 });
  97  | 
  98  |       await dateBtn.click();
  99  | 
  100 |       // Verify calendar popover opens
  101 |       const popover = page.locator('.mantine-Popover-dropdown:visible, .mantine-DatePicker-root:visible').last();
  102 |       if (await popover.isVisible({ timeout: 3000 }).catch(() => false)) {
  103 |         await page.keyboard.press('Escape');
  104 |       }
  105 |     
  106 |     });
  107 |   });
  108 | 
  109 |   test('[TC-03] Memverifikasi filter dropdown Pilih Cabang', async ({ page }) => {
  110 |     await test.step('Lakukan pengujian memverifikasi filter dropdown Pilih Cabang dan validasi hasil yang ditampilkan', async () => {
  111 |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  112 |       await expect(cabangInput).toBeVisible();
  113 |       await selectMantineOption(page, cabangInput);
```