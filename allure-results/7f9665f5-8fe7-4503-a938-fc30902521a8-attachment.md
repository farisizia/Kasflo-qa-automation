# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-05] Membuka modal tambah bahan baku dan membatalkannya
- Location: tests/Kasflo-Resto/Bahan Baku/resep.spec.js:418:3

# Error details

```
Error: page.goto: net::ERR_ACCESS_DENIED at https://backoffice-dev.kasflo.id/
Call log:
  - navigating to "https://backoffice-dev.kasflo.id/", waiting until "commit"

```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Resep Bahan Baku', () => {
  4   |   // Helper selector for actual data rows (excluding empty placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  7   |   }
  8   | 
  9   |   // Helper selector for visible search input in the active tab
  10  |   function getSearchInput(page) {
  11  |     return page.locator('input[placeholder="Cari disini..."]:visible').first();
  12  |   }
  13  | 
  14  |   // Helper to read "Nama Menu/Opsi Varian" from a data row (column 2 in new UI, fallback to column 1)
  15  |   async function getRecipeItemName(row) {
  16  |     const cells = row.locator('td');
  17  |     const cellCount = await cells.count();
  18  |     if (cellCount >= 2) {
  19  |       const secondCell = cells.nth(1);
  20  |       await expect(secondCell).not.toBeEmpty({ timeout: 10000 });
  21  |       const text = (await secondCell.innerText()).trim();
  22  |       if (text) return text;
  23  |     }
  24  |     const firstCell = cells.first();
  25  |     await expect(firstCell).not.toBeEmpty({ timeout: 10000 });
  26  |     return (await firstCell.innerText()).trim();
  27  |   }
  28  | 
  29  |   async function waitForPageReady(page) {
  30  |     const loader = page.locator(
  31  |       '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
  32  |     );
  33  |     await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  34  |   }
  35  | 
  36  |   // Prevent Mantine Select crash when backend returns duplicate product IDs or variant_options without id
  37  |   async function setupRecipeApiSafety(page) {
  38  |     await page.route('**/backoffice/v1/product**', async (route) => {
  39  |       if (route.request().method() !== 'GET') {
  40  |         await route.continue();
  41  |         return;
  42  |       }
  43  |       try {
  44  |         const response = await route.fetch();
  45  |         const contentType = response.headers()['content-type'] || '';
  46  |         if (response.status() === 200 && contentType.includes('application/json')) {
  47  |           const json = await response.json();
  48  |           if (json && Array.isArray(json.data)) {
  49  |             const seen = new Set();
  50  |             json.data = json.data.filter((item) => {
  51  |               if (!item || item.id === undefined) return true;
  52  |               const key = String(item.id);
  53  |               if (seen.has(key)) return false;
  54  |               seen.add(key);
  55  |               return true;
  56  |             });
  57  |             await route.fulfill({
  58  |               response,
  59  |               body: JSON.stringify(json),
  60  |             });
  61  |             return;
  62  |           }
  63  |           if (json && json.data && Array.isArray(json.data.variant_options)) {
  64  |             json.data.variant_options = json.data.variant_options.map((opt, idx) => ({
  65  |               ...opt,
  66  |               id: opt.id ?? opt.variant_option_id ?? (idx + 1),
  67  |             }));
  68  |             await route.fulfill({
  69  |               response,
  70  |               body: JSON.stringify(json),
  71  |             });
  72  |             return;
  73  |           }
  74  |         }
  75  |         await route.fulfill({ response });
  76  |       } catch {
  77  |         await route.continue().catch(() => {});
  78  |       }
  79  |     });
  80  |   }
  81  | 
  82  |   // Shared resilient login helper
  83  |   async function loginBeforeTest(page) {
  84  |     if (page.url().includes('/admin/')) {
  85  |       await waitForPageReady(page);
  86  |       return page;
  87  |     }
  88  | 
  89  |     try {
  90  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  91  |     } catch {
> 92  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      |                  ^ Error: page.goto: net::ERR_ACCESS_DENIED at https://backoffice-dev.kasflo.id/
  93  |     }
  94  | 
  95  |     await waitForPageReady(page);
  96  | 
  97  |     if (page.url().includes('/admin/')) {
  98  |       return page;
  99  |     }
  100 | 
  101 |     const emailInput = page.getByLabel(/Email atau Username/i);
  102 |     await Promise.race([
  103 |       page.waitForURL(/.*\/admin\/.*/, { timeout: 15000 }).catch(() => {}),
  104 |       emailInput.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
  105 |     ]);
  106 |     if (page.url().includes('/admin/')) {
  107 |       await waitForPageReady(page);
  108 |       return page;
  109 |     }
  110 | 
  111 |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  112 | 
  113 |     await emailInput.fill('qakasflo@automation.com');
  114 |     await page.getByLabel(/Kata Sandi/i).fill('password');
  115 | 
  116 |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  117 |     await expect(loginBtn).toBeVisible({ timeout: 10000 });
  118 |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  119 |     await loginBtn.click();
  120 | 
  121 |     try {
  122 |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  123 |     } catch {
  124 |       if (!page.url().includes('/admin/')) {
  125 |         await waitForPageReady(page);
  126 |         if (await loginBtn.isVisible().catch(() => false)) {
  127 |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  128 |         }
  129 |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  130 |       }
  131 |     }
  132 |     await waitForPageReady(page);
  133 |     return page;
  134 |   }
  135 | 
  136 |   // Scoped Mantine Select listbox locator based on input's id -> aria-labelledby="<id>-label"
  137 |   async function getListboxOptionsForInput(page, inputLocator) {
  138 |     const inputId = await inputLocator.getAttribute('id');
  139 |     if (inputId) {
  140 |       return page.locator(`[role="listbox"][aria-labelledby="${inputId}-label"] [role="option"]`);
  141 |     }
  142 |     return page.locator('.mantine-Select-dropdown:visible [role="option"], [role="option"]:visible');
  143 |   }
  144 | 
  145 |   // Helper to select Cabang and Menu on /admin/ingredients/recipe/add
  146 |   async function selectBranchAndMenu(page) {
  147 |     const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  148 |     await expect(cabangInput).toBeVisible({ timeout: 10000 });
  149 |     await expect(cabangInput).toBeEnabled({ timeout: 10000 });
  150 | 
  151 |     // Ensure radio Tipe Resep "Menu" is active
  152 |     const menuRadio = page.locator('input[type="radio"][value="menu"]');
  153 |     if (await menuRadio.isVisible().catch(() => false)) {
  154 |       if (!(await menuRadio.isChecked().catch(() => true))) {
  155 |         await page.locator('label.mantine-Radio-label').filter({ hasText: /^Menu$/ }).first().click();
  156 |       }
  157 |       await expect(menuRadio).toBeChecked();
  158 |     }
  159 | 
  160 |     const menuInput = page.getByPlaceholder('Pilih Menu').first();
  161 |     await expect(menuInput).toBeVisible({ timeout: 10000 });
  162 | 
  163 |     const branchOptions = await getListboxOptionsForInput(page, cabangInput);
  164 |     await cabangInput.click();
  165 |     await expect(branchOptions.first()).toBeVisible({ timeout: 10000 });
  166 |     const branchCount = await branchOptions.count();
  167 | 
  168 |     for (let b = 0; b < branchCount; b++) {
  169 |       if (b > 0) {
  170 |         await cabangInput.click();
  171 |         await expect(branchOptions.nth(b)).toBeVisible({ timeout: 5000 });
  172 |       }
  173 | 
  174 |       const productRespPromise = page.waitForResponse(
  175 |         (res) => res.url().includes('/backoffice/v1/product') && res.request().method() === 'GET',
  176 |         { timeout: 10000 }
  177 |       ).catch(() => null);
  178 | 
  179 |       await branchOptions.nth(b).click();
  180 |       await productRespPromise;
  181 |       await waitForPageReady(page);
  182 | 
  183 |       // Wait for Pilih Menu input to become enabled after branch selection
  184 |       const isMenuEnabled = await expect(menuInput).toBeEnabled({ timeout: 5000 }).then(() => true).catch(() => false);
  185 |       if (!isMenuEnabled) continue;
  186 | 
  187 |       const menuOptions = await getListboxOptionsForInput(page, menuInput);
  188 |       await menuInput.click();
  189 | 
  190 |       const hasOption = await menuOptions.first().isVisible({ timeout: 3000 }).catch(() => false);
  191 |       if (hasOption) {
  192 |         const selectedMenuName = (await menuOptions.first().innerText()).trim() || 'Updated Menu';
```