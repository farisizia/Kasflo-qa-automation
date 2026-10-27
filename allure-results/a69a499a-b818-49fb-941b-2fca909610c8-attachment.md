# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/menu.spec.js >> Manajemen Menu >> [TC-09] Lihat detail menu dengan ikon view
- Location: tests/Kasflo-Resto/Katalog/menu.spec.js:370:3

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
  3   | test.describe('Manajemen Menu', () => {
  4   |   // Helper selector for actual data rows (excluding the empty "No results found" placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table tbody tr:not(:has-text("No results found"))');
  7   |   }
  8   | 
  9   |   // Shared resilient login helper
  10  |   async function loginBeforeTest(page) {
  11  |     if (page.url().includes('/admin/')) {
  12  |       return page;
  13  |     }
  14  | 
  15  |     try {
  16  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 25000 });
  17  |     } catch {
> 18  |       await page.goto('/', { waitUntil: 'commit', timeout: 25000 });
      |                  ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
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
  30  |     await page.waitForTimeout(500);
  31  | 
  32  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  33  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  34  |     await loginBtn.click();
  35  | 
  36  |     try {
  37  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
  38  |     } catch {
  39  |       if (!page.url().includes('/admin/')) {
  40  |         await page.waitForTimeout(1000);
  41  |         if (await loginBtn.isVisible().catch(() => false)) {
  42  |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  43  |         }
  44  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  45  |       }
  46  |     }
  47  |     return page;
  48  |   }
  49  | 
  50  |   // Helper to create a single menu unit
  51  |   async function createMenuUnit(page, menuName) {
  52  |     const addBtn = page.getByRole('link', { name: 'Tambah Menu Satuan' }).or(page.getByRole('button', { name: 'Tambah Menu Satuan' })).first();
  53  |     await expect(addBtn).toBeVisible({ timeout: 15000 });
  54  |     await addBtn.click();
  55  | 
  56  |     await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/unit\/add/, { timeout: 15000 });
  57  | 
  58  |     const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
  59  |     await expect(nameInput).toBeVisible({ timeout: 10000 });
  60  |     await nameInput.fill(menuName);
  61  | 
  62  |     const codeInput = page.getByPlaceholder('Masukkan Kode Menu').or(page.getByLabel(/Kode Menu/i)).first();
  63  |     if (await codeInput.isVisible().catch(() => false)) {
  64  |       await codeInput.fill('TM' + Math.floor(Math.random() * 9999));
  65  |     }
  66  | 
  67  |     // Select Kategori dropdown
  68  |     const categoryInput = page.locator('input[placeholder*="Kategori"], [placeholder*="Pilih Kategori"]').first();
  69  |     if (await categoryInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  70  |       await categoryInput.click();
  71  |       const firstOption = page.locator('[role="option"]').first();
  72  |       if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  73  |         await firstOption.click();
  74  |       }
  75  |     }
  76  | 
  77  |     // Fill Harga (required in Buku Menu table if visible, or general input)
  78  |     const priceInput = page.locator('table input[placeholder*="Harga"], table input[type="text"]').last();
  79  |     if (await priceInput.isVisible({ timeout: 2000 }).catch(() => false)) {
  80  |       await priceInput.fill('15000');
  81  |     } else {
  82  |       const genericPriceInput = page.getByPlaceholder(/Harga/i).or(page.getByLabel(/Harga/i)).first();
  83  |       if (await genericPriceInput.isVisible({ timeout: 2000 }).catch(() => false)) {
  84  |         await genericPriceInput.fill('15000');
  85  |       }
  86  |     }
  87  | 
  88  |     const saveBtn = page.getByRole('button', { name: 'Simpan' });
  89  |     await expect(saveBtn).toBeVisible();
  90  |     await saveBtn.click();
  91  | 
  92  |     await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 20000 });
  93  |   }
  94  | 
  95  |   // Ensure at least 1 menu exists for tests that inspect or view items
  96  |   async function ensureMenuExists(page) {
  97  |     const dataRows = getDataRows(page);
  98  |     if (await dataRows.count() === 0) {
  99  |       await createMenuUnit(page, 'Menu ' + Date.now());
  100 |     }
  101 |   }
  102 | 
  103 |   test.beforeEach(async ({ page }) => {
  104 |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  105 |       // Step 1: Login
  106 |       await loginBeforeTest(page);
  107 | 
  108 |       // Step 2: Navigate to menu page
  109 |       await page.goto('/admin/catalog/menu', { waitUntil: 'domcontentloaded' });
  110 | 
  111 |       // Step 3: Verify menu page loaded
  112 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu/);
  113 |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  114 |     
  115 |     });
  116 |   });
  117 | 
  118 |   test('[TC-01] Menampilkan halaman menu dengan tabel', async ({ page }) => {
```