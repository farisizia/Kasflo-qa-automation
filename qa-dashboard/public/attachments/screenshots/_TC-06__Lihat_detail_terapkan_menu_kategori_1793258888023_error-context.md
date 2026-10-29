# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/category.spec.js >> Kategori Menu >> [TC-06] Lihat detail/terapkan menu kategori
- Location: tests/Kasflo-Resto/Katalog/category.spec.js:269:3

# Error details

```
Error: page.goto: Target page, context or browser has been closed
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Kategori Menu', () => {
  4   |   // Helper selector for actual data rows (excluding the empty "No results found" placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table tbody tr:not(:has-text("No results found"))');
  7   |   }
  8   | 
  9   |   async function waitForPageReady(page) {
  10  |     const loader = page.locator(
  11  |       '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
  12  |     );
  13  |     await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  14  |   }
  15  | 
  16  |   // Shared resilient login helper
  17  |   async function loginBeforeTest(page) {
  18  |     if (page.url().includes('/admin/')) {
  19  |       await waitForPageReady(page);
  20  |       return page;
  21  |     }
  22  | 
  23  |     try {
  24  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  25  |     } catch {
  26  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
  27  |     }
  28  | 
  29  |     await waitForPageReady(page);
  30  | 
  31  |     if (page.url().includes('/admin/')) {
  32  |       return page;
  33  |     }
  34  | 
  35  |     const emailInput = page.getByLabel(/Email atau Username/i);
  36  |     await Promise.race([
  37  |       page.waitForURL(/.*\/admin\/.*/, { timeout: 15000 }).catch(() => {}),
  38  |       emailInput.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
  39  |     ]);
  40  |     if (page.url().includes('/admin/')) {
  41  |       await waitForPageReady(page);
  42  |       return page;
  43  |     }
  44  | 
  45  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  46  |     await emailInput.fill('qakasflo@automation.com');
  47  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  48  | 
  49  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  50  |     await expect(loginBtn).toBeVisible({ timeout: 10000 });
  51  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  52  |     await loginBtn.click();
  53  | 
  54  |     await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
  55  |     await waitForPageReady(page);
  56  |     return page;
  57  |   }
  58  | 
  59  |   async function createCategory(page, categoryName) {
  60  |     const addBtn = page.getByRole('link', { name: 'Tambah Kategori' }).or(page.getByRole('button', { name: 'Tambah Kategori' })).first();
  61  |     await expect(addBtn).toBeVisible({ timeout: 15000 });
  62  |     await expect(addBtn).toBeEnabled({ timeout: 10000 });
  63  |     await addBtn.click();
  64  |     await expect(page).toHaveURL(/.*\/admin\/catalog\/category\/add/, { timeout: 15000 });
  65  |     await waitForPageReady(page);
  66  | 
  67  |     const nameInput = page.getByPlaceholder('Masukkan Nama Kategori').or(page.getByLabel(/Nama/i)).first();
  68  |     await expect(nameInput).toBeVisible({ timeout: 10000 });
  69  |     await expect(nameInput).toBeEnabled();
  70  |     await nameInput.fill(categoryName);
  71  | 
  72  |     const codeInput = page.getByPlaceholder('Masukkan Kode').or(page.getByLabel(/Kode/i)).first();
  73  |     await expect(codeInput).toBeVisible({ timeout: 10000 });
  74  |     await expect(codeInput).toBeEnabled();
  75  |     await codeInput.fill('ic' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10));
  76  | 
  77  |     const saveBtn = page.getByRole('button', { name: 'Simpan' });
  78  |     await expect(saveBtn).toBeVisible();
  79  |     await expect(saveBtn).toBeEnabled();
  80  |     await saveBtn.click();
  81  |     await expect(page).toHaveURL(/\/admin\/catalog\/category$/, { timeout: 20000 });
  82  |     await waitForPageReady(page);
  83  |   }
  84  | 
  85  |   // Helper to ensure at least one category exists in the table
  86  |   async function ensureCategoryExists(page, minCount = 1) {
  87  |     await waitForPageReady(page);
  88  |     const dataRows = getDataRows(page);
  89  |     if (await dataRows.count() < minCount) {
  90  |       await createCategory(page, 'Init Cat ' + Date.now());
  91  |     }
  92  |   }
  93  | 
  94  |   test.beforeEach(async ({ page }) => {
  95  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  96  |       // Step 1: Login
  97  |       await loginBeforeTest(page);
  98  | 
  99  |       // Step 2: Navigate to category page using relative path
> 100 |       await page.goto('/admin/catalog/category', { waitUntil: 'domcontentloaded' });
      |                  ^ Error: page.goto: Target page, context or browser has been closed
  101 |       await waitForPageReady(page);
  102 | 
  103 |       // Step 3: Verify category page loaded
  104 |       await expect(page).toHaveURL(/\/admin\/catalog\/category/);
  105 |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  106 |     });
  107 |   });
  108 | 
  109 |   test('[TC-01] Menampilkan halaman kategori dengan tabel', async ({ page }) => {
  110 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman kategori dengan tabel', async () => {
  111 |       // Verify page title / heading
  112 |       await expect(page.getByText('Kategori').first()).toBeVisible();
  113 | 
  114 |       // Check if table exists
  115 |       const table = page.locator('table');
  116 |       await expect(table).toBeVisible();
  117 | 
  118 |       // Verify table headers
  119 |       const tableHeader = page.locator('thead');
  120 |       await expect(tableHeader.getByText('Kategori', { exact: true }).first()).toBeVisible();
  121 |       await expect(tableHeader.getByText('Kode', { exact: true }).first()).toBeVisible();
  122 |       await expect(tableHeader.getByText('Urutan', { exact: true }).first()).toBeVisible();
  123 |       await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
  124 |       await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
  125 |     
  126 |     });
  127 |   });
  128 | 
  129 |   test('[TC-02] Tambah kategori baru berhasil', async ({ page }) => {
  130 |     await test.step('Lakukan proses tambah kategori baru berhasil dan pastikan data tersimpan', async () => {
  131 |       const addBtn = page.getByRole('link', { name: 'Tambah Kategori' }).or(page.getByRole('button', { name: 'Tambah Kategori' })).first();
  132 |       await expect(addBtn).toBeVisible({ timeout: 15000 });
  133 |       await expect(addBtn).toBeEnabled({ timeout: 10000 });
  134 |       await addBtn.click();
  135 | 
  136 |       // Wait for form page to load
  137 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/category\/add/, { timeout: 15000 });
  138 |       await waitForPageReady(page);
  139 | 
  140 |       // Fill form fields
  141 |       const categoryName = 'Test Cat ' + Date.now();
  142 |       const nameInput = page.getByPlaceholder('Masukkan Nama Kategori').or(page.getByLabel(/Nama/i)).first();
  143 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  144 |       await expect(nameInput).toBeEnabled();
  145 |       await nameInput.fill(categoryName);
  146 | 
  147 |       const codeInput = page.getByPlaceholder('Masukkan Kode').or(page.getByLabel(/Kode/i)).first();
  148 |       await expect(codeInput).toBeVisible({ timeout: 10000 });
  149 |       await expect(codeInput).toBeEnabled();
  150 |       await codeInput.fill('tc' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10));
  151 | 
  152 |       // Click Simpan button
  153 |       const saveBtn = page.getByRole('button', { name: 'Simpan' });
  154 |       await expect(saveBtn).toBeVisible();
  155 |       await expect(saveBtn).toBeEnabled();
  156 |       await saveBtn.click();
  157 | 
  158 |       // Verify returning to category list page and new item is visible
  159 |       await expect(page).toHaveURL(/\/admin\/catalog\/category$/, { timeout: 20000 });
  160 |       await waitForPageReady(page);
  161 |       await expect(page.locator('table').getByText(categoryName).first()).toBeVisible({ timeout: 15000 });
  162 |     });
  163 |   });
  164 | 
  165 |   test('[TC-03] Edit kategori dengan ikon edit', async ({ page }) => {
  166 |     await test.step('Lakukan pengujian edit kategori dengan ikon edit dan verifikasi pembaruan data', async () => {
  167 |       await ensureCategoryExists(page);
  168 | 
  169 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
  170 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  171 |       const originalName = (await targetCell.innerText()).trim();
  172 | 
  173 |       const targetRow = page.locator('table tbody tr').filter({ hasText: originalName }).first();
  174 |       const editLink = targetRow.locator('a[href*="/edit/"]').first();
  175 |       await expect(editLink).toBeVisible({ timeout: 15000 });
  176 |       await editLink.click();
  177 | 
  178 |       // Wait for edit page to load
  179 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/category\/edit\/.*/, { timeout: 15000 });
  180 |       await waitForPageReady(page);
  181 | 
  182 |       // Find name input and modify
  183 |       const updatedName = 'Updated Cat ' + Date.now();
  184 |       const nameInput = page.getByPlaceholder('Masukkan Nama Kategori').or(page.getByLabel(/Nama/i)).first();
  185 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  186 |       await expect(nameInput).toBeEnabled();
  187 |       await nameInput.fill(updatedName);
  188 | 
  189 |       // Save changes
  190 |       const saveBtn = page.getByRole('button', { name: 'Simpan' });
  191 |       await expect(saveBtn).toBeVisible();
  192 |       await expect(saveBtn).toBeEnabled();
  193 |       await saveBtn.click();
  194 | 
  195 |       // Verify returning to category list page
  196 |       await expect(page).toHaveURL(/\/admin\/catalog\/category$/, { timeout: 20000 });
  197 |       await waitForPageReady(page);
  198 |       await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
  199 |     });
  200 |   });
```