# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-04] Validasi form buat resep: submit tanpa melengkapi data tidak keluar dari halaman add
- Location: tests/Kasflo-Resto/Bahan Baku/resep.spec.js:390:3

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
  36  |   // Prevent Mantine Select crash when backend returns duplicate product IDs for a branch
  37  |   async function setupRecipeApiSafety(page) {
  38  |     await page.route('**/backoffice/v1/product*', async (route) => {
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
  63  |         }
  64  |         await route.fulfill({ response });
  65  |       } catch {
  66  |         await route.continue().catch(() => {});
  67  |       }
  68  |     });
  69  |   }
  70  | 
  71  |   // Shared resilient login helper
  72  |   async function loginBeforeTest(page) {
  73  |     if (page.url().includes('/admin/')) {
  74  |       await waitForPageReady(page);
  75  |       return page;
  76  |     }
  77  | 
  78  |     try {
  79  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  80  |     } catch {
> 81  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      |                  ^ Error: page.goto: net::ERR_ACCESS_DENIED at https://backoffice-dev.kasflo.id/
  82  |     }
  83  | 
  84  |     await waitForPageReady(page);
  85  | 
  86  |     if (page.url().includes('/admin/')) {
  87  |       return page;
  88  |     }
  89  | 
  90  |     const emailInput = page.getByLabel(/Email atau Username/i);
  91  |     await Promise.race([
  92  |       page.waitForURL(/.*\/admin\/.*/, { timeout: 15000 }).catch(() => {}),
  93  |       emailInput.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
  94  |     ]);
  95  |     if (page.url().includes('/admin/')) {
  96  |       await waitForPageReady(page);
  97  |       return page;
  98  |     }
  99  | 
  100 |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  101 | 
  102 |     await emailInput.fill('qakasflo@automation.com');
  103 |     await page.getByLabel(/Kata Sandi/i).fill('password');
  104 | 
  105 |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  106 |     await expect(loginBtn).toBeVisible({ timeout: 10000 });
  107 |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  108 |     await loginBtn.click();
  109 | 
  110 |     try {
  111 |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  112 |     } catch {
  113 |       if (!page.url().includes('/admin/')) {
  114 |         await waitForPageReady(page);
  115 |         if (await loginBtn.isVisible().catch(() => false)) {
  116 |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  117 |         }
  118 |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  119 |       }
  120 |     }
  121 |     await waitForPageReady(page);
  122 |     return page;
  123 |   }
  124 | 
  125 |   // Scoped Mantine Select listbox locator based on input's id -> aria-labelledby="<id>-label"
  126 |   async function getListboxOptionsForInput(page, inputLocator) {
  127 |     const inputId = await inputLocator.getAttribute('id');
  128 |     if (inputId) {
  129 |       return page.locator(`[role="listbox"][aria-labelledby="${inputId}-label"] [role="option"]`);
  130 |     }
  131 |     return page.locator('.mantine-Select-dropdown:visible [role="option"], [role="option"]:visible');
  132 |   }
  133 | 
  134 |   // Helper to select Cabang and Menu on /admin/ingredients/recipe/add
  135 |   async function selectBranchAndMenu(page) {
  136 |     const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  137 |     await expect(cabangInput).toBeVisible({ timeout: 10000 });
  138 |     await expect(cabangInput).toBeEnabled({ timeout: 10000 });
  139 | 
  140 |     // Ensure radio Tipe Resep "Menu" is active
  141 |     const menuRadio = page.locator('input[type="radio"][value="menu"]');
  142 |     if (await menuRadio.isVisible().catch(() => false)) {
  143 |       if (!(await menuRadio.isChecked().catch(() => true))) {
  144 |         await page.locator('label.mantine-Radio-label').filter({ hasText: /^Menu$/ }).first().click();
  145 |       }
  146 |       await expect(menuRadio).toBeChecked();
  147 |     }
  148 | 
  149 |     const menuInput = page.getByPlaceholder('Pilih Menu').first();
  150 |     await expect(menuInput).toBeVisible({ timeout: 10000 });
  151 | 
  152 |     const branchOptions = await getListboxOptionsForInput(page, cabangInput);
  153 |     await cabangInput.click();
  154 |     await expect(branchOptions.first()).toBeVisible({ timeout: 10000 });
  155 |     const branchCount = await branchOptions.count();
  156 | 
  157 |     for (let b = 0; b < branchCount; b++) {
  158 |       if (b > 0) {
  159 |         await cabangInput.click();
  160 |         await expect(branchOptions.nth(b)).toBeVisible({ timeout: 5000 });
  161 |       }
  162 | 
  163 |       const productRespPromise = page.waitForResponse(
  164 |         (res) => res.url().includes('/backoffice/v1/product') && res.request().method() === 'GET',
  165 |         { timeout: 10000 }
  166 |       ).catch(() => null);
  167 | 
  168 |       await branchOptions.nth(b).click();
  169 |       await productRespPromise;
  170 |       await waitForPageReady(page);
  171 | 
  172 |       // Wait for Pilih Menu input to become enabled after branch selection
  173 |       const isMenuEnabled = await expect(menuInput).toBeEnabled({ timeout: 5000 }).then(() => true).catch(() => false);
  174 |       if (!isMenuEnabled) continue;
  175 | 
  176 |       const menuOptions = await getListboxOptionsForInput(page, menuInput);
  177 |       await menuInput.click();
  178 | 
  179 |       const hasOption = await menuOptions.first().isVisible({ timeout: 3000 }).catch(() => false);
  180 |       if (hasOption) {
  181 |         const selectedMenuName = (await menuOptions.first().innerText()).trim() || 'Updated Menu';
```