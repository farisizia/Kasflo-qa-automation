# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/kategori_bahan_baku.spec.js >> Kategori Bahan Baku >> [TC-02] Tambah kategori bahan baku baru berhasil via modal
- Location: tests/Kasflo-Resto/Bahan Baku/kategori_bahan_baku.spec.js:93:3

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://backoffice-dev.kasflo.id/", waiting until "domcontentloaded"

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
> 11  |     await page.goto('/', { waitUntil: 'domcontentloaded' });
      |                ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
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
  66  |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
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
```