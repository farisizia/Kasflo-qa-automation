# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-06] Tambah resep baru berhasil dan muncul di tabel
- Location: tests/Kasflo-Resto/Bahan Baku/resep.spec.js:453:3

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('[role="dialog"], .mantine-Modal-content').last().locator('table tbody tr:not(:has-text("Belum Ada Data"))').first()
    - locator resolved to <tr data-index="0" data-hover="true" data-with-row-border="true" class="m_4e7aa4fd mantine-Table-tr MRT_TableBodyRow-module_root__2c3D4">…</tr>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 100ms
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - generic [aria-hidden] [ref=f2e2]:
    - generic [ref=f2e3]:
      - navigation [ref=f2e4]:
        - generic [ref=f2e5]:
          - link [ref=f2e6] [cursor=pointer]:
            - /url: /admin/dashboard
            - paragraph [ref=f2e14]: Dashboard
          - link [ref=f2e15] [cursor=pointer]:
            - /url: /admin/catalog
            - paragraph [ref=f2e23]: Katalog
          - link [ref=f2e27] [cursor=pointer]:
            - /url: /admin/ingredients
            - paragraph [ref=f2e35]: Bahan Baku
          - generic [ref=f2e40]:
            - link [ref=f2e41] [cursor=pointer]:
              - /url: /admin/ingredients/category
              - generic [ref=f2e42]: Kategori Bahan Baku
            - link [ref=f2e43] [cursor=pointer]:
              - /url: /admin/ingredients/ingredients
              - generic [ref=f2e44]: Data Bahan Baku
            - link [ref=f2e45] [cursor=pointer]:
              - /url: /admin/ingredients/recipe
              - generic [ref=f2e46]: Resep
          - link [ref=f2e47] [cursor=pointer]:
            - /url: /admin/promotion
            - paragraph [ref=f2e55]: Promosi
          - link [ref=f2e59] [cursor=pointer]:
            - /url: /admin/customer
            - paragraph [ref=f2e68]: Pelanggan
          - link [ref=f2e72] [cursor=pointer]:
            - /url: /admin/cash-account
            - paragraph [ref=f2e80]: Pembukuan
          - link [ref=f2e84] [cursor=pointer]:
            - /url: /admin/report
            - paragraph [ref=f2e92]: Laporan Usaha
          - link [ref=f2e96] [cursor=pointer]:
            - /url: /admin/user-management
            - paragraph [ref=f2e104]: Manajemen User
          - link [ref=f2e108] [cursor=pointer]:
            - /url: /admin/setting
            - paragraph [ref=f2e115]: Pengaturan
      - main [ref=f2e119]:
        - generic [ref=f2e120]:
          - generic [ref=f2e122]:
            - paragraph [ref=f2e127]: Resep
            - generic [ref=f2e128]:
              - button [ref=f2e130] [cursor=pointer]:
                - generic [ref=f2e131]: Premium
              - button [ref=f2e138] [cursor=pointer]:
                - generic [ref=f2e139]: Saldo QRIS
              - button [ref=f2e144] [cursor=pointer]:
                - generic [ref=f2e151]:
                  - paragraph [ref=f2e152]: Kasflo Automation
                  - paragraph [ref=f2e153]: OWNER
          - generic [ref=f2e156]:
            - generic [ref=f2e157]:
              - generic [ref=f2e158]:
                - link [ref=f2e159] [cursor=pointer]:
                  - /url: /admin/dashboard
                - generic [ref=f2e163]: /
                - link [ref=f2e164] [cursor=pointer]:
                  - /url: /admin/ingredients/recipe
                  - text: Resep
                - generic [ref=f2e165]: /
                - paragraph [ref=f2e166]: Buat Resep
              - generic [ref=f2e167]:
                - button [ref=f2e168] [cursor=pointer]:
                  - generic [ref=f2e169]: Batalkan
                - button [ref=f2e171] [cursor=pointer]:
                  - generic [ref=f2e172]: Simpan
            - generic [ref=f2e176]:
              - generic [ref=f2e179]:
                - heading [level=5] [ref=f2e180]: Pilih Menu
                - generic [ref=f2e181]:
                  - generic [ref=f2e182]: Cabang *
                  - generic [ref=f2e183]:
                    - textbox [ref=f2e184] [cursor=pointer]:
                      - /placeholder: Pilih Cabang
                      - text: Cabang Tes 1729
                    - generic [ref=f2e186]:
                      - button [ref=f2e187] [cursor=pointer]
                      - link [ref=f2e192] [cursor=pointer]:
                        - /url: /admin/branch-management/branch/add
                - generic [ref=f2e195]:
                  - generic [ref=f2e196]: Tipe Resep
                  - radiogroup [ref=f2e197]:
                    - generic [ref=f2e198]:
                      - generic [ref=f2e200]:
                        - radio [checked] [ref=f2e202]
                        - generic [ref=f2e203]: Menu
                      - generic [ref=f2e206]:
                        - radio [ref=f2e208]
                        - generic [ref=f2e209]: Varian
                - tabpanel [ref=f2e212]:
                  - generic [ref=f2e213]:
                    - generic [ref=f2e214]: Menu *
                    - generic [ref=f2e215]:
                      - textbox [ref=f2e216]:
                        - /placeholder: Pilih Menu
                        - text: Updated Menu 888
                      - generic [ref=f2e218]:
                        - button [ref=f2e219] [cursor=pointer]
                        - link [ref=f2e224] [cursor=pointer]:
                          - /url: /admin/catalog/menu/unit/add
              - generic [ref=f2e229]:
                - generic [ref=f2e230]:
                  - heading [level=5] [ref=f2e231]: Resep
                  - paragraph [ref=f2e232]: Tambah bahan baku untuk resep anda disini
                - button [ref=f2e233] [cursor=pointer]:
                  - generic [ref=f2e234]: Tambah Bahan Baku
    - link [ref=f2e236] [cursor=pointer]:
      - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
      - generic [ref=f2e237]: Konsultasi Sekarang
  - dialog [ref=f2e244]:
    - banner [ref=f2e245]:
      - heading [level=2] [ref=f2e246]:
        - paragraph [ref=f2e248]: Tambah Bahan Baku
      - button [active] [ref=f2e249] [cursor=pointer]
    - generic [ref=f2e252]:
      - generic [ref=f2e253]:
        - textbox "Cari disini..." [ref=f2e256]
        - generic [ref=f2e261]:
          - table [ref=f2e263]:
            - rowgroup [ref=f2e264]:
              - row [ref=f2e265]:
                - columnheader "Nama Move Column Actions" [ref=f2e266]:
                  - generic [ref=f2e267]:
                    - generic [ref=f2e268]: Nama
                    - generic [ref=f2e270]:
                      - button "Move" [ref=f2e271]
                      - button "Column Actions" [ref=f2e280] [cursor=pointer]
                - columnheader "Kategori Move Column Actions" [ref=f2e286]:
                  - generic [ref=f2e287]:
                    - generic [ref=f2e288]: Kategori
                    - generic [ref=f2e290]:
                      - button "Move" [ref=f2e291]
                      - button "Column Actions" [ref=f2e300] [cursor=pointer]
            - rowgroup [ref=f2e306]:
              - row [ref=f2e307]:
                - cell [ref=f2e308]:
                  - generic [ref=f2e310]:
                    - img "not-found" [ref=f2e311]
                    - paragraph [ref=f2e312]: Belum Ada Data
            - rowgroup
          - generic [ref=f2e316]:
            - generic [ref=f2e317]:
              - paragraph [ref=f2e318]: Rows per page
              - textbox "Rows per page" [ref=f2e321] [cursor=pointer]: "25"
            - paragraph [ref=f2e322]: 0-0 of 0
            - generic [ref=f2e323]:
              - button "Go to previous page" [disabled] [ref=f2e324]
              - button "Go to next page" [disabled] [ref=f2e328]
      - generic [ref=f2e333]:
        - button "Batal" [ref=f2e334] [cursor=pointer]
        - button "Tambah" [disabled] [ref=f2e337]
```

# Test source

```ts
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
  193 |         await menuOptions.first().click();
  194 |         await waitForPageReady(page);
  195 |         return selectedMenuName;
  196 |       }
  197 | 
  198 |       // Close empty menu dropdown before trying next branch
  199 |       await page.keyboard.press('Escape').catch(() => {});
  200 |     }
  201 | 
  202 |     return null;
  203 |   }
  204 | 
  205 |   // Helper to create a Recipe
  206 |   async function createRecipe(page) {
  207 |     await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
  208 |     await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);
  209 |     await waitForPageReady(page);
  210 | 
  211 |     const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  212 |       .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  213 |     await expect(addBtn).toBeVisible({ timeout: 10000 });
  214 |     await addBtn.click();
  215 | 
  216 |     await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });
  217 |     await waitForPageReady(page);
  218 | 
  219 |     const selectedMenuName = await selectBranchAndMenu(page);
  220 |     if (!selectedMenuName) {
  221 |       await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
  222 |       await waitForPageReady(page);
  223 |       return null;
  224 |     }
  225 | 
  226 |     // Check if ingredient is already attached to this recipe
  227 |     const hasExistingIngredient = await page.locator('table:visible tbody tr').filter({ hasText: /Gram|Pcs|Kg|Ml|Liter|Bahan/i }).first().isVisible().catch(() => false);
  228 | 
  229 |     if (!hasExistingIngredient) {
  230 |       // Click Tambah Bahan Baku button
  231 |       const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
  232 |       await expect(tambahBahanBtn).toBeEnabled({ timeout: 10000 });
  233 |       await tambahBahanBtn.click();
  234 | 
  235 |       // In modal: select first ingredient row and set quantity
  236 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  237 |       await expect(modal).toBeVisible({ timeout: 5000 });
  238 | 
  239 |       const ingredientRow = modal.locator('table tbody tr:not(:has-text("Belum Ada Data"))').first();
  240 |       await expect(ingredientRow).toBeVisible({ timeout: 10000 });
> 241 |       await ingredientRow.click();
      |                           ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  242 | 
  243 |       // Fill Kuantitas input (only target editable input, avoiding readonly pagination)
  244 |       const qtyInput = ingredientRow.locator('input:not([readonly])').first()
  245 |         .or(modal.locator('table tbody tr input:not([readonly])').first());
  246 |       await expect(qtyInput).toBeVisible({ timeout: 5000 });
  247 |       await qtyInput.click();
  248 |       await qtyInput.fill('5');
  249 | 
  250 |       // Click Tambah in modal
  251 |       const modalTambahBtn = modal.getByRole('button', { name: 'Tambah', exact: true });
  252 |       await expect(modalTambahBtn).toBeEnabled({ timeout: 5000 });
  253 |       await modalTambahBtn.click();
  254 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  255 |     }
  256 | 
  257 |     // Submit Recipe form
  258 |     const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  259 |     await expect(simpanBtn).toBeEnabled({ timeout: 10000 });
  260 |     await simpanBtn.click();
  261 | 
  262 |     await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 25000 });
  263 |     await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  264 |     await waitForPageReady(page);
  265 | 
  266 |     return selectedMenuName;
  267 |   }
  268 | 
  269 |   // Helper to ensure at least one recipe exists in the list
  270 |   async function ensureRecipeExists(page) {
  271 |     await expect(page.locator('table:visible tbody tr').first()).toBeVisible({ timeout: 15000 });
  272 |     await waitForPageReady(page);
  273 | 
  274 |     const dataRows = getDataRows(page);
  275 |     const count = await dataRows.count();
  276 |     if (count === 0) {
  277 |       return await createRecipe(page);
  278 |     }
  279 |     return await getRecipeItemName(dataRows.first());
  280 |   }
  281 | 
  282 |   test.beforeEach(async ({ page }) => {
  283 |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  284 |       // Pasang interceptor deduplikasi opsi produk agar Mantine Select tidak crash
  285 |       await setupRecipeApiSafety(page);
  286 | 
  287 |       // Step 1: Login
  288 |       await loginBeforeTest(page);
  289 | 
  290 |       // Step 2: Navigate to Recipe page
  291 |       await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
  292 |       await waitForPageReady(page);
  293 | 
  294 |       // Step 3: Verify recipe page loaded
  295 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);
  296 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  297 |     });
  298 |   });
  299 | 
  300 |   test('[TC-01] Menampilkan halaman resep dengan tabel, header, filter, dan tab yang sesuai', async ({ page }) => {
  301 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman resep dengan tabel, header, filter, dan tab yang sesuai', async () => {
  302 |       // Verify page heading / breadcrumb
  303 |       await expect(page.getByText('Resep').first()).toBeVisible({ timeout: 10000 });
  304 | 
  305 |       // Verify tabs exist
  306 |       const dataResepTab = page.getByRole('tab', { name: 'Data Resep', exact: true });
  307 |       const dataResepSemiTab = page.getByRole('tab', { name: 'Data Resep Setengah Jadi', exact: true });
  308 |       await expect(dataResepTab).toBeVisible({ timeout: 5000 });
  309 |       await expect(dataResepSemiTab).toBeVisible({ timeout: 5000 });
  310 | 
  311 |       // Verify filter elements
  312 |       const searchInput = getSearchInput(page);
  313 |       await expect(searchInput).toBeVisible({ timeout: 5000 });
  314 | 
  315 |       const cabangFilter = page.locator('input[placeholder="Semua Cabang"]:visible').first();
  316 |       await expect(cabangFilter).toBeVisible({ timeout: 5000 });
  317 | 
  318 |       // Verify Add Button exists
  319 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  320 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  321 |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  322 | 
  323 |       // Verify table structure and headers (UI terbaru: Tipe Resep & Nama Menu/Opsi Varian)
  324 |       const table = page.locator('table:visible').first();
  325 |       await expect(table).toBeVisible();
  326 | 
  327 |       const thead = page.locator('thead:visible').first();
  328 |       await expect(thead.getByText('Tipe Resep', { exact: true }).first()).toBeVisible();
  329 |       await expect(thead.getByText('Nama Menu/Opsi Varian', { exact: true }).first()).toBeVisible();
  330 |       await expect(thead.getByText('Bahan Baku', { exact: true }).first()).toBeVisible();
  331 |       await expect(thead.getByText('Peringatan Stok', { exact: true }).first()).toBeVisible();
  332 |       await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
  333 |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  334 |     });
  335 |   });
  336 | 
  337 |   test('[TC-02] Navigasi ke halaman buat resep dan memverifikasi form elements', async ({ page }) => {
  338 |     await test.step('Lakukan proses navigasi ke halaman buat resep dan memverifikasi panel Pilih Menu, Tipe Resep, dan Resep', async () => {
  339 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  340 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  341 |       await expect(addBtn).toBeVisible({ timeout: 10000 });
```