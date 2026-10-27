# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Bahan Baku/data_bahan_baku.spec.js >> Data Bahan Baku >> [TC-01] Menampilkan halaman data bahan baku dengan tabel, header, filter, dan tab yang sesuai
- Location: tests/Bahan Baku/data_bahan_baku.spec.js:155:3

# Error details

```
Test timeout of 60000ms exceeded while running "beforeEach" hook.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/admin\/.*/
Received string:  "https://backoffice-dev.kasflo.id/"

Call log:
  - Expect "toHaveURL" with timeout 25000ms
    40 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
       - unexpected value "https://backoffice-dev.kasflo.id/"
  - Test timeout of 60000ms exceeded.

```

```yaml
- heading "Unexpected Application Error!" [level=2]
- heading "f.map is not a function" [level=3]
- text: "TypeError: f.map is not a function at Z (https://backoffice-dev.kasflo.id/assets/index-DKLTvpzI.js:1:2436) at qu (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:30:19504) at eu (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:3135) at ud (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:44666) at ld (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:39673) at tm (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:39601) at yo (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:39455) at fu (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:35837) at td (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:34788) at L (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:17:1569)"
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Data Bahan Baku', () => {
  4   |   // Helper selector for actual data rows (excluding empty placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  7   |   }
  8   | 
  9   |   // Shared resilient login helper
  10  |   async function loginBeforeTest(page) {
  11  |     if (page.url().includes('/admin/')) {
  12  |       return page;
  13  |     }
  14  | 
  15  |     await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  16  | 
  17  |     if (page.url().includes('/admin/')) {
  18  |       return page;
  19  |     }
  20  | 
  21  |     const emailInput = page.getByLabel(/Email atau Username/i);
  22  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  23  | 
  24  |     await emailInput.fill('qakasflo@automation.com');
  25  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  26  |     await page.waitForTimeout(500);
  27  | 
  28  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  29  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  30  |     await loginBtn.click();
  31  | 
  32  |     try {
  33  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
  34  |     } catch {
  35  |       if (!page.url().includes('/admin/')) {
  36  |         await page.waitForTimeout(1000);
  37  |         if (await loginBtn.isVisible().catch(() => false)) {
  38  |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  39  |         }
> 40  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  41  |       }
  42  |     }
  43  |     return page;
  44  |   }
  45  | 
  46  |   // Helper to select an option in a Mantine Select dropdown
  47  |   async function selectMantineOption(page, inputLocator, optionText) {
  48  |     await inputLocator.click();
  49  | 
  50  |     if (optionText) {
  51  |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible')
  52  |         .filter({ hasText: optionText }).first();
  53  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  54  |         await option.click();
  55  |         return;
  56  |       }
  57  |     }
  58  | 
  59  |     // Default: click first visible option
  60  |     const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
  61  |     await expect(firstOption).toBeVisible({ timeout: 5000 });
  62  |     await firstOption.click();
  63  |   }
  64  | 
  65  |   // Helper to create a Raw Ingredient
  66  |   async function createRawIngredient(page, ingredientName) {
  67  |     const addBtn = page.getByRole('link', { name: /Buat Bahan Baku/i })
  68  |       .or(page.getByRole('button', { name: /Buat Bahan Baku/i })).first();
  69  |     await expect(addBtn).toBeVisible({ timeout: 10000 });
  70  |     await addBtn.click();
  71  | 
  72  |     await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients\/raw\/add/, { timeout: 15000 });
  73  | 
  74  |     // Select Cabang (Required field)
  75  |     const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  76  |     await expect(cabangInput).toBeVisible({ timeout: 10000 });
  77  |     const currentVal = await cabangInput.inputValue().catch(() => '');
  78  |     if (!currentVal) {
  79  |       await selectMantineOption(page, cabangInput);
  80  |     }
  81  | 
  82  |     // Fill Nama Bahan Baku (Required field)
  83  |     const nameInput = page.getByPlaceholder('Masukkan Nama Bahan Baku').first();
  84  |     await expect(nameInput).toBeVisible({ timeout: 10000 });
  85  |     await nameInput.fill(ingredientName);
  86  | 
  87  |     // Select Satuan (Required field: e.g. Gram or first available unit)
  88  |     const satuanInput = page.locator('input[placeholder="Pilih Satuan"]').first();
  89  |     if (await satuanInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  90  |       const currentSatuan = await satuanInput.inputValue().catch(() => '');
  91  |       if (!currentSatuan) {
  92  |         await selectMantineOption(page, satuanInput, 'Gram');
  93  |       }
  94  |     }
  95  | 
  96  |     // Configure Atur Stok & HPP (Required to enable main Simpan button)
  97  |     const aturBtn = page.getByRole('button', { name: /Atur Stok & HPP/i });
  98  |     await expect(aturBtn).toBeEnabled({ timeout: 10000 });
  99  |     await aturBtn.click();
  100 | 
  101 |     const drawer = page.locator('.mantine-Drawer-content, [role="dialog"]').last();
  102 |     await expect(drawer).toBeVisible({ timeout: 5000 });
  103 | 
  104 |     const stokInput = drawer.getByPlaceholder('Masukkan Jumlah Stok');
  105 |     await expect(stokInput).toBeVisible({ timeout: 5000 });
  106 |     await stokInput.fill('100');
  107 | 
  108 |     const hargaInput = drawer.getByPlaceholder('Masukkan Harga Beli');
  109 |     await expect(hargaInput).toBeVisible({ timeout: 5000 });
  110 |     await hargaInput.fill('5000');
  111 | 
  112 |     const sumberDanaInput = drawer.getByPlaceholder('Pilih Sumber Dana');
  113 |     await expect(sumberDanaInput).toBeVisible({ timeout: 5000 });
  114 |     await selectMantineOption(page, sumberDanaInput);
  115 | 
  116 |     // Save drawer settings
  117 |     const drawerSimpanBtn = drawer.getByRole('button', { name: 'Simpan', exact: true });
  118 |     await expect(drawerSimpanBtn).toBeEnabled({ timeout: 5000 });
  119 |     await drawerSimpanBtn.click();
  120 |     await expect(drawer).not.toBeVisible({ timeout: 5000 });
  121 | 
  122 |     // Submit main form
  123 |     const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  124 |     await expect(simpanBtn).toBeEnabled({ timeout: 10000 });
  125 |     await simpanBtn.click();
  126 | 
  127 |     await expect(page).toHaveURL(/\/admin\/ingredients\/ingredients$/, { timeout: 25000 });
  128 |     await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  129 |   }
  130 | 
  131 |   // Helper to ensure at least one raw ingredient exists in the list
  132 |   async function ensureRawIngredientExists(page) {
  133 |     const dataRows = getDataRows(page);
  134 |     const count = await dataRows.count();
  135 |     if (count === 0) {
  136 |       await createRawIngredient(page, 'Init Bahan Baku ' + Date.now());
  137 |     }
  138 |   }
  139 | 
  140 |   test.beforeEach(async ({ page }) => {
```