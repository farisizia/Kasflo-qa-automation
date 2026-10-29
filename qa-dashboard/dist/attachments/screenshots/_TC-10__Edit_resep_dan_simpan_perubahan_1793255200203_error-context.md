# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-10] Edit resep dan simpan perubahan
- Location: tests/Kasflo-Resto/Bahan Baku/resep.spec.js:535:3

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('[role="option"]:visible, [data-combobox-option]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').nth(4)

```

# Page snapshot

```yaml
- generic [ref=f3e2]:
  - heading "Unexpected Application Error!" [level=2] [ref=f3e3]
  - heading "[@mantine/core] Duplicate options are not supported. Option with value \"70782\" was provided more than once" [level=3] [ref=f3e4]
  - generic [ref=f3e5]: "Error: [@mantine/core] Duplicate options are not supported. Option with value \"70782\" was provided more than once at Xp (https://backoffice-dev.kasflo.id/assets/vendor-mantine-BRVBv92v.js:52:138847) at Wl (https://backoffice-dev.kasflo.id/assets/vendor-mantine-BRVBv92v.js:52:140020) at qu (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:30:19504) at eu (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:3135) at ud (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:44666) at ld (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:39673) at tm (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:39601) at yo (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:39455) at fu (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:35837) at Ms (https://backoffice-dev.kasflo.id/assets/vendor-react-Cpxdv-Um.js:32:36639)"
```

# Test source

```ts
  44  |     ]);
  45  |     if (page.url().includes('/admin/')) {
  46  |       await waitForPageReady(page);
  47  |       return page;
  48  |     }
  49  | 
  50  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  51  | 
  52  |     await emailInput.fill('qakasflo@automation.com');
  53  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  54  | 
  55  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  56  |     await expect(loginBtn).toBeVisible({ timeout: 10000 });
  57  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  58  |     await loginBtn.click();
  59  | 
  60  |     try {
  61  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  62  |     } catch {
  63  |       if (!page.url().includes('/admin/')) {
  64  |         await waitForPageReady(page);
  65  |         if (await loginBtn.isVisible().catch(() => false)) {
  66  |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  67  |         }
  68  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  69  |       }
  70  |     }
  71  |     await waitForPageReady(page);
  72  |     return page;
  73  |   }
  74  | 
  75  |   // Helper to select an option in a Mantine Select dropdown
  76  |   async function selectMantineOption(page, inputLocator, optionText) {
  77  |     await inputLocator.click();
  78  | 
  79  |     const optionSelector = '[role="option"]:visible, [data-combobox-option]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible';
  80  |     if (optionText) {
  81  |       const option = page.locator(optionSelector)
  82  |         .filter({ hasText: optionText }).first();
  83  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  84  |         await option.click();
  85  |         return;
  86  |       }
  87  |     }
  88  | 
  89  |     // Default: click first visible option
  90  |     const firstOption = page.locator(optionSelector).first();
  91  |     await expect(firstOption).toBeVisible({ timeout: 5000 });
  92  |     await firstOption.click();
  93  |   }
  94  | 
  95  |   let branchBookMenuVerified = false;
  96  | 
  97  |   // Helper to ensure at least one Book Menu is assigned to Kasflo Pusat QA with active menus
  98  |   async function ensureBranchHasBookMenu(page) {
  99  |     if (branchBookMenuVerified) return;
  100 |     try {
  101 |       await page.goto('/admin/catalog/book-menu', { waitUntil: 'domcontentloaded' });
  102 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
  103 |       branchBookMenuVerified = true;
  104 |     } catch {
  105 |       // Continue anyway
  106 |     }
  107 |   }
  108 | 
  109 |   // Helper to create a Recipe
  110 |   async function createRecipe(page) {
  111 |     await ensureBranchHasBookMenu(page);
  112 | 
  113 |     await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
  114 |     await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);
  115 | 
  116 |     const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  117 |       .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  118 |     await expect(addBtn).toBeVisible({ timeout: 10000 });
  119 |     await addBtn.click();
  120 | 
  121 |     await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });
  122 | 
  123 |     // Select Cabang and find one that has available menus
  124 |     const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  125 |     await expect(cabangInput).toBeVisible({ timeout: 10000 });
  126 | 
  127 |     const menuInput = page.getByPlaceholder('Pilih Menu').first();
  128 |     await expect(menuInput).toBeVisible({ timeout: 10000 });
  129 | 
  130 |     const optionSelector = '[role="option"]:visible, [data-combobox-option]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible';
  131 |     let firstOption = null;
  132 | 
  133 |     await cabangInput.click();
  134 |     await waitForPageReady(page);
  135 |     const branchOptions = page.locator(optionSelector);
  136 |     const branchCount = await branchOptions.count();
  137 | 
  138 |     for (let b = 0; b < Math.max(branchCount, 1); b++) {
  139 |       if (branchCount > 0) {
  140 |         if (b > 0) {
  141 |           await cabangInput.click();
  142 |           await waitForPageReady(page);
  143 |         }
> 144 |         await branchOptions.nth(b).click();
      |                                    ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  145 |         await waitForPageReady(page);
  146 |       }
  147 | 
  148 |       await menuInput.click();
  149 |       await waitForPageReady(page);
  150 |       const opt = page.locator(optionSelector).first();
  151 |       if (await opt.isVisible({ timeout: 2000 }).catch(() => false)) {
  152 |         firstOption = opt;
  153 |         break;
  154 |       }
  155 |     }
  156 | 
  157 |     if (!firstOption || !(await firstOption.isVisible().catch(() => false))) {
  158 |       await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
  159 |       return null;
  160 |     }
  161 | 
  162 |     const selectedMenuName = (await firstOption.innerText()).trim() || 'Updated Menu';
  163 |     await firstOption.click();
  164 | 
  165 |     await waitForPageReady(page);
  166 | 
  167 |     // Check if ingredient is already attached to this recipe
  168 |     const hasExistingIngredient = await page.locator('table:visible tbody tr').filter({ hasText: /Gram|Pcs|Kg|Bahan/i }).first().isVisible().catch(() => false);
  169 | 
  170 |     if (!hasExistingIngredient) {
  171 |       // Click Tambah Bahan Baku button
  172 |       const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
  173 |       await expect(tambahBahanBtn).toBeEnabled({ timeout: 10000 });
  174 |       await tambahBahanBtn.click();
  175 | 
  176 |       // In modal: select first ingredient row and set quantity
  177 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  178 |       await expect(modal).toBeVisible({ timeout: 5000 });
  179 | 
  180 |       const ingredientRow = modal.locator('table tbody tr:not(:has-text("Belum Ada Data"))').first();
  181 |       await expect(ingredientRow).toBeVisible({ timeout: 5000 });
  182 |       await ingredientRow.click();
  183 | 
  184 |       // Fill Kuantitas input (only target editable input, avoiding readonly pagination)
  185 |       const qtyInput = ingredientRow.locator('input:not([readonly])').first()
  186 |         .or(modal.locator('table tbody tr input:not([readonly])').first());
  187 |       await expect(qtyInput).toBeVisible({ timeout: 5000 });
  188 |       await qtyInput.click();
  189 |       await qtyInput.fill('5');
  190 | 
  191 |       // Click Tambah in modal
  192 |       const modalTambahBtn = modal.getByRole('button', { name: 'Tambah', exact: true });
  193 |       await expect(modalTambahBtn).toBeEnabled({ timeout: 5000 });
  194 |       await modalTambahBtn.click();
  195 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  196 |     }
  197 | 
  198 |     // Submit Recipe form
  199 |     const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  200 |     await expect(simpanBtn).toBeEnabled({ timeout: 10000 });
  201 |     await simpanBtn.click();
  202 | 
  203 |     await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 25000 });
  204 |     await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  205 | 
  206 |     return selectedMenuName;
  207 |   }
  208 | 
  209 |   // Helper to ensure at least one recipe exists in the list
  210 |   async function ensureRecipeExists(page) {
  211 |     await expect(page.locator('table:visible tbody tr').first()).toBeVisible({ timeout: 15000 });
  212 |     await waitForPageReady(page);
  213 | 
  214 |     const dataRows = getDataRows(page);
  215 |     const count = await dataRows.count();
  216 |     if (count === 0) {
  217 |       return await createRecipe(page);
  218 |     }
  219 |     const firstCell = dataRows.first().locator('td:first-child');
  220 |     return (await firstCell.innerText()).trim();
  221 |   }
  222 | 
  223 |   test.beforeEach(async ({ page }) => {
  224 |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  225 |       // Step 1: Login
  226 |       await loginBeforeTest(page);
  227 | 
  228 |       // Step 2: Navigate to Recipe page
  229 |       await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
  230 | 
  231 |       // Step 3: Verify recipe page loaded
  232 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);
  233 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  234 |     
  235 |     });
  236 |   });
  237 | 
  238 |   test('[TC-01] Menampilkan halaman resep dengan tabel, header, filter, dan tab yang sesuai', async ({ page }) => {
  239 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman resep dengan tabel, header, filter, dan tab yang sesuai', async () => {
  240 |       // Verify page heading / breadcrumb
  241 |       await expect(page.getByText('Resep').first()).toBeVisible({ timeout: 10000 });
  242 | 
  243 |       // Verify tabs exist
  244 |       const dataResepTab = page.getByRole('tab', { name: 'Data Resep', exact: true });
```