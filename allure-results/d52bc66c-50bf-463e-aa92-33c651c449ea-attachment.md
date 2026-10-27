# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pembukuan/kategori_pembukuan.spec.js >> Kategori Pembukuan >> [TC-08] Interaksi filter bar (pencarian, filter tipe, dan tombol refresh)
- Location: tests/Kasflo-Resto/Pembukuan/kategori_pembukuan.spec.js:370:3

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
  3   | test.describe('Kategori Pembukuan', () => {
  4   |   // Helper selector for actual data rows (excluding empty placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No records found"))');
  7   |   }
  8   | 
  9   |   // Helper selector for deletable row (excluding rows with disabled delete action button, like system categories)
  10  |   function getDeletableRow(page) {
  11  |     return page.locator('table:visible tbody tr').filter({
  12  |       has: page.locator('td:last-child button:last-child:not([disabled]):not([data-disabled="true"])')
  13  |     });
  14  |   }
  15  | 
  16  |   // Shared resilient login helper
  17  |   async function loginBeforeTest(page) {
  18  |     if (page.url().includes('/admin/')) {
  19  |       return page;
  20  |     }
  21  | 
  22  |     try {
  23  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  24  |     } catch {
> 25  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      |                  ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
  26  |     }
  27  | 
  28  |     if (page.url().includes('/admin/')) {
  29  |       return page;
  30  |     }
  31  | 
  32  |     const emailInput = page.getByLabel(/Email atau Username/i);
  33  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  34  | 
  35  |     await emailInput.fill('qakasflo@automation.com');
  36  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  37  | 
  38  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  39  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  40  |     await loginBtn.click();
  41  | 
  42  |     try {
  43  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
  44  |     } catch {
  45  |       if (!page.url().includes('/admin/')) {
  46  |         if (await loginBtn.isEnabled().catch(() => false)) {
  47  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  48  |         }
  49  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  50  |       }
  51  |     }
  52  |     return page;
  53  |   }
  54  | 
  55  |   // Helper to ensure at least one cash account category exists
  56  |   async function ensureCategoryExists(page) {
  57  |     const dataRows = getDataRows(page);
  58  |     const count = await dataRows.count();
  59  |     if (count === 0) {
  60  |       const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
  61  |         .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
  62  |       await addBtn.click();
  63  | 
  64  |       const modal = page.locator('[role="dialog"], .mantine-Modal-content').first();
  65  |       await expect(modal).toBeVisible({ timeout: 5000 });
  66  | 
  67  |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori').first();
  68  |       const catName = 'Kat Auto ' + Date.now();
  69  |       await nameInput.fill(catName);
  70  | 
  71  |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
  72  |       await simpanBtn.click();
  73  |       await expect(modal).not.toBeVisible({ timeout: 15000 });
  74  |       return catName;
  75  |     }
  76  |     const firstCell = dataRows.first().locator('td:first-child');
  77  |     return (await firstCell.innerText()).trim();
  78  |   }
  79  | 
  80  |   test.beforeEach(async ({ page }) => {
  81  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  82  |       // Intercept subscription endpoint agar fitur cash account selalu aktif meski masa aktif dev telah berakhir
  83  |       await page.route('**/backoffice/v1/subscription', async route => {
  84  |         try {
  85  |           if (!route.request().url().includes('current-usage')) {
  86  |             const response = await route.fetch();
  87  |             const json = await response.json();
  88  |             if (json.data && json.data.active_features) {
  89  |               json.data.active_features.enable_cash_account = true;
  90  |             }
  91  |             await route.fulfill({ json });
  92  |           } else {
  93  |             await route.continue();
  94  |           }
  95  |         } catch {
  96  |           await route.continue().catch(() => {});
  97  |         }
  98  |       });
  99  | 
  100 |       // Step 1: Login
  101 |       await loginBeforeTest(page);
  102 | 
  103 |       // Step 2: Navigate to Kategori Pembukuan page
  104 |       await page.goto('/admin/cash-account/category', { waitUntil: 'domcontentloaded' });
  105 | 
  106 |       // Step 3: Verify page loaded
  107 |       await expect(page).toHaveURL(/\/admin\/cash-account\/category/, { timeout: 15000 });
  108 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  109 |     
  110 |     });
  111 |   });
  112 | 
  113 |   test('[TC-01] Menampilkan halaman Kategori Pembukuan dengan breadcrumb, tabel, tombol tambah, dan filter bar', async ({ page }) => {
  114 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Kategori Pembukuan dengan breadcrumb, tabel, tombol tambah, dan filter bar', async () => {
  115 |       // Breadcrumb verification
  116 |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
  117 |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  118 |       await expect(breadcrumb.getByText('Kategori Pembukuan')).toBeVisible();
  119 | 
  120 |       // Verify page heading / title
  121 |       await expect(page.getByText('Kategori Pembukuan').first()).toBeVisible();
  122 | 
  123 |       // Verify Add Button exists
  124 |       const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
  125 |         .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
```