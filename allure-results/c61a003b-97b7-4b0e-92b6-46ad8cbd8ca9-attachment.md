# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/kategori_bahan_baku.spec.js >> Kategori Bahan Baku >> [TC-02] Tambah kategori bahan baku baru berhasil via modal
- Location: tests/Kasflo-Resto/Bahan Baku/kategori_bahan_baku.spec.js:93:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('table') with timeout 15000ms
  - waiting for locator('table')

```

```yaml
- navigation:
  - link "Dashboard":
    - /url: /admin/dashboard
    - img
    - paragraph: Dashboard
  - link "Katalog":
    - /url: /admin/catalog
    - img
    - paragraph: Katalog
    - img
  - link "Bahan Baku":
    - /url: /admin/ingredients
    - img
    - paragraph: Bahan Baku
    - img
  - link "Kategori Bahan Baku":
    - /url: /admin/ingredients/category
  - link "Data Bahan Baku":
    - /url: /admin/ingredients/ingredients
  - link "Resep":
    - /url: /admin/ingredients/recipe
  - link "Promosi":
    - /url: /admin/promotion
    - img
    - paragraph: Promosi
    - img
  - link "Pelanggan":
    - /url: /admin/customer
    - img
    - paragraph: Pelanggan
    - img
  - link "Pembukuan":
    - /url: /admin/cash-account
    - img
    - paragraph: Pembukuan
    - img
  - link "Laporan Usaha":
    - /url: /admin/report
    - img
    - paragraph: Laporan Usaha
    - img
  - link "Manajemen User":
    - /url: /admin/user-management
    - img
    - paragraph: Manajemen User
    - img
  - link "Pengaturan":
    - /url: /admin/setting
    - img
    - paragraph: Pengaturan
    - img
  - link "Berlangganan":
    - /url: /admin/subscription
    - img
    - paragraph: Berlangganan
- main
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Kategori Bahan Baku', () => {
  4   |   // Helper selector for actual data rows (excluding empty placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  7   |   }
  8   | 
  9   |   // Shared resilient login helper
  10  |   async function loginBeforeTest(page) {
  11  |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  12  |     const emailInput = page.getByLabel(/Email atau Username/i);
  13  |     await expect(emailInput).toBeVisible({ timeout: 15000 });
  14  | 
  15  |     await emailInput.fill('qakasflo@automation.com');
  16  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  17  | 
  18  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  19  |     await expect(loginBtn).toBeEnabled({ timeout: 5000 });
  20  |     await loginBtn.click();
  21  | 
  22  |     try {
  23  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
  24  |     } catch {
  25  |       if (!page.url().includes('/admin/')) {
  26  |         if (await loginBtn.isEnabled().catch(() => false)) {
  27  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  28  |         }
  29  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  30  |       }
  31  |     }
  32  |     return page;
  33  |   }
  34  | 
  35  |   // Helper to ensure at least one ingredient category exists
  36  |   async function ensureIngredientCategoryExists(page) {
  37  |     const emptyState = page.locator('table tbody tr', { hasText: /Belum Ada Data|No results found/i });
  38  |     const hasEmpty = await emptyState.isVisible().catch(() => false);
  39  |     if (hasEmpty) {
  40  |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  41  |       await addBtn.click();
  42  | 
  43  |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  44  |       await expect(modal).toBeVisible({ timeout: 10000 });
  45  | 
  46  |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
  47  |       const catName = 'Init Kat Bahan ' + Date.now();
  48  |       await nameInput.fill(catName);
  49  | 
  50  |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  51  |       await simpanBtn.click();
  52  |       await expect(modal).not.toBeVisible({ timeout: 15000 });
  53  |     }
  54  |   }
  55  | 
  56  |   test.beforeEach(async ({ page }) => {
  57  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  58  |       // Step 1: Login
  59  |       await loginBeforeTest(page);
  60  | 
  61  |       // Step 2: Navigate to Ingredient Category page
  62  |       await page.goto('/admin/ingredients/category', { waitUntil: 'domcontentloaded' });
  63  | 
  64  |       // Step 3: Verify page loaded
  65  |       await expect(page).toHaveURL(/\/admin\/ingredients\/category/);
> 66  |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
      |                                           ^ Error: expect(locator).toBeVisible() failed
  67  |     
  68  |     });
  69  |   });
  70  | 
  71  |   test('[TC-01] Menampilkan halaman kategori bahan baku dengan tabel dan header yang sesuai', async ({ page }) => {
  72  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman kategori bahan baku dengan tabel dan header yang sesuai', async () => {
  73  |       // Verify page heading / breadcrumb
  74  |       await expect(page.getByText('Kategori Bahan Baku').first()).toBeVisible();
  75  | 
  76  |       // Check table visibility
  77  |       const table = page.locator('table');
  78  |       await expect(table).toBeVisible();
  79  | 
  80  |       // Verify table headers
  81  |       const thead = page.locator('thead');
  82  |       await expect(thead.getByText('Nama Kategori', { exact: true }).first()).toBeVisible();
  83  |       await expect(thead.getByText('Bahan Baku', { exact: true }).first()).toBeVisible();
  84  |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  85  | 
  86  |       // Verify Add button exists
  87  |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  88  |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  89  |     
  90  |     });
  91  |   });
  92  | 
  93  |   test('[TC-02] Tambah kategori bahan baku baru berhasil via modal', async ({ page }) => {
  94  |     await test.step('Lakukan proses tambah kategori bahan baku baru berhasil via modal dan pastikan data tersimpan', async () => {
  95  |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  96  |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  97  |       await addBtn.click();
  98  | 
  99  |       // Verify modal appears
  100 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  101 |       await expect(modal).toBeVisible({ timeout: 5000 });
  102 |       await expect(modal.getByText('Tambah Kategori').first()).toBeVisible({ timeout: 5000 });
  103 | 
  104 |       // Fill form field
  105 |       const catName = 'Kat Bahan ' + Date.now();
  106 |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
  107 |       await expect(nameInput).toBeVisible({ timeout: 5000 });
  108 |       await nameInput.fill(catName);
  109 | 
  110 |       // Click Simpan and wait for POST request response 200 OK
  111 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  112 |       await expect(simpanBtn).toBeVisible();
  113 | 
  114 |       const [response] = await Promise.all([
  115 |         page.waitForResponse(res => res.url().includes('/ingredients/categories') && res.request().method() === 'POST' && res.status() === 200, { timeout: 20000 }),
  116 |         simpanBtn.click(),
  117 |       ]);
  118 |       expect(response.status()).toBe(200);
  119 | 
  120 |       // Verify modal is closed
  121 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
  122 | 
  123 |       // Verify created category is visible in table
  124 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasText: catName });
  125 |       await expect(targetCell.first()).toBeVisible({ timeout: 10000 });
  126 |     
  127 |     });
  128 |   });
  129 | 
  130 |   test('[TC-03] Validasi input nama kategori kosong pada modal tambah', async ({ page }) => {
  131 |     await test.step('Validasi input nama kategori kosong pada modal tambah', async () => {
  132 |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  133 |       await addBtn.click();
  134 | 
  135 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  136 |       await expect(modal).toBeVisible({ timeout: 5000 });
  137 | 
  138 |       // Leave name input empty and click Simpan
  139 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  140 |       await simpanBtn.click();
  141 | 
  142 |       // Verify modal remains open
  143 |       await expect(modal).toBeVisible({ timeout: 3000 });
  144 | 
  145 |       // Close modal with Batal
  146 |       const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  147 |       await cancelBtn.click();
  148 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  149 |     
  150 |     });
  151 |   });
  152 | 
  153 |   test('[TC-04] Edit kategori bahan baku berhasil via modal edit', async ({ page }) => {
  154 |     await test.step('Lakukan pengujian edit kategori bahan baku berhasil via modal edit dan verifikasi pembaruan data', async () => {
  155 |       await ensureIngredientCategoryExists(page);
  156 | 
  157 |       // Get the first valid category row
  158 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
  159 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  160 |       const originalName = (await targetCell.innerText()).trim();
  161 | 
  162 |       const targetRow = page.locator('table tbody tr').filter({ hasText: originalName }).first();
  163 | 
  164 |       // Action 1 (pencil / edit button is the second button in action cell)
  165 |       const editBtn = targetRow.locator('button').nth(1);
  166 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
```