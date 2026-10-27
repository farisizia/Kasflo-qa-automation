# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pembukuan/data_pembukuan.spec.js >> Data Pembukuan >> [TC-08] Mengklik tombol aksi pada baris data membuka modal Detail Data Pembukuan
- Location: tests/Kasflo-Resto/Pembukuan/data_pembukuan.spec.js:276:3

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
Call log:
  - navigating to "https://backoffice-dev.kasflo.id/", waiting until "commit"

```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const path = require('path');
  3   | const fs = require('fs');
  4   | 
  5   | test.describe('Data Pembukuan', () => {
  6   |   // Helper selector for actual data rows (excluding empty placeholder row)
  7   |   function getDataRows(page) {
  8   |     return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  9   |   }
  10  | 
  11  |   // Shared resilient login helper
  12  |   async function loginBeforeTest(page) {
  13  |     if (page.url().includes('/admin/')) {
  14  |       return page;
  15  |     }
  16  | 
  17  |     try {
  18  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  19  |     } catch {
> 20  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      |                  ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
  21  |     }
  22  | 
  23  |     if (page.url().includes('/admin/')) {
  24  |       return page;
  25  |     }
  26  | 
  27  |     const emailInput = page.getByLabel(/Email atau Username/i);
  28  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  29  | 
  30  |     await emailInput.fill('qakasflo@automation.com');
  31  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  32  | 
  33  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  34  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  35  |     await loginBtn.click();
  36  | 
  37  |     try {
  38  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
  39  |     } catch {
  40  |       if (!page.url().includes('/admin/')) {
  41  |         if (await loginBtn.isEnabled().catch(() => false)) {
  42  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  43  |         }
  44  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  45  |       }
  46  |     }
  47  |     return page;
  48  |   }
  49  | 
  50  |   // Helper to select an option in a Mantine Select dropdown
  51  |   async function selectMantineOption(page, inputLocator, optionText) {
  52  |     await inputLocator.click();
  53  | 
  54  |     if (optionText) {
  55  |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible')
  56  |         .filter({ hasText: optionText }).first();
  57  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  58  |         await option.click();
  59  |         return;
  60  |       }
  61  |     }
  62  | 
  63  |     const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
  64  |     await expect(firstOption).toBeVisible({ timeout: 5000 });
  65  |     await firstOption.click();
  66  |   }
  67  | 
  68  |   test.beforeEach(async ({ page }) => {
  69  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  70  |       // Step 1: Login
  71  |       await loginBeforeTest(page);
  72  | 
  73  |       // Step 2: Navigate to Data Pembukuan page
  74  |       await page.goto('/admin/cash-account/data', { waitUntil: 'domcontentloaded' });
  75  | 
  76  |       // Step 3: Verify page loaded
  77  |       await expect(page).toHaveURL(/\/admin\/cash-account\/data/, { timeout: 15000 });
  78  |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  79  |     
  80  |     });
  81  |   });
  82  | 
  83  |   test('[TC-01] Menampilkan halaman Data Pembukuan dengan breadcrumb, tabel, dan tombol tambah', async ({ page }) => {
  84  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Data Pembukuan dengan breadcrumb, tabel, dan tombol tambah', async () => {
  85  |       // Breadcrumb verification
  86  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
  87  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  88  |       await expect(breadcrumb.getByText('Data Pembukuan')).toBeVisible();
  89  | 
  90  |       // Verify Add Button exists
  91  |       const addBtn = page.getByRole('button', { name: /Tambah Data Pembukuan/i })
  92  |         .or(page.getByRole('link', { name: /Tambah Data Pembukuan/i })).first();
  93  |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  94  | 
  95  |       // Verify table structure and columns
  96  |       const table = page.locator('table:visible').first();
  97  |       await expect(table).toBeVisible();
  98  | 
  99  |       const thead = page.locator('thead:visible').first();
  100 |       await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
  101 |       await expect(thead.getByText('Waktu, Tanggal', { exact: true }).first()).toBeVisible();
  102 |       await expect(thead.getByText('Kategori Pembukuan', { exact: true }).first()).toBeVisible();
  103 |       await expect(thead.getByText('Catatan', { exact: true }).first()).toBeVisible();
  104 |       await expect(thead.getByText('Nominal', { exact: true }).first()).toBeVisible();
  105 |       await expect(thead.getByText('Dibuat Oleh', { exact: true }).first()).toBeVisible();
  106 |       await expect(thead.getByText('Role', { exact: true }).first()).toBeVisible();
  107 |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  108 |     
  109 |     });
  110 |   });
  111 | 
  112 |   test('[TC-02] Navigasi ke form Tambah Data Pembukuan dan memverifikasi seluruh komponen form', async ({ page }) => {
  113 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke form Tambah Data Pembukuan dan memverifikasi seluruh komponen form', async () => {
  114 |       const addBtn = page.getByRole('button', { name: /Tambah Data Pembukuan/i })
  115 |         .or(page.getByRole('link', { name: /Tambah Data Pembukuan/i })).first();
  116 |       await addBtn.click();
  117 | 
  118 |       // Verify URL navigated to form
  119 |       await expect(page).toHaveURL(/\/admin\/cash-account\/data\/add/, { timeout: 15000 });
  120 |       await expect(page.getByText(/Tambah Data Pembukuan/i).first()).toBeVisible({ timeout: 10000 });
```