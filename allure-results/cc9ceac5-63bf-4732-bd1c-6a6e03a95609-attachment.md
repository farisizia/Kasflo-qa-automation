# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-01] Menampilkan halaman resep dengan tabel, header, filter, dan tab yang sesuai
- Location: tests/Kasflo-Resto/Bahan Baku/resep.spec.js:238:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('thead:visible').first().getByText('Menu', { exact: true }).first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('thead:visible').first().getByText('Menu', { exact: true }).first() with timeout 15000ms
  - waiting for locator('thead:visible').first().getByText('Menu', { exact: true }).first()

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
- main:
  - img
  - paragraph: Resep
  - button "Premium":
    - text: Premium
    - img
  - button "Saldo QRIS":
    - text: Saldo QRIS
    - img
  - button "Kasflo Automation OWNER":
    - img
    - paragraph: Kasflo Automation
    - paragraph: OWNER
    - img
  - link:
    - /url: /admin/dashboard
    - img
  - text: /
  - paragraph: Resep
  - tablist:
    - tab "Data Resep" [selected]
    - tab "Data Resep Setengah Jadi"
  - tabpanel "Data Resep":
    - heading "Data Resep" [level=4]
    - link "Buat Resep":
      - /url: /admin/ingredients/recipe/add
      - img
      - text: Buat Resep
    - textbox "Semua Cabang"
    - button:
      - img
    - textbox "Cari disini..."
    - button "Show/Hide columns":
      - img
    - button "Toggle full screen":
      - img
    - table:
      - rowgroup:
        - row "Tipe Resep Move Column Actions Nama Menu/Opsi Varian Move Column Actions Bahan Baku Move Column Actions Peringatan Stok Move Column Actions Cabang Move Column Actions Action":
          - columnheader "Tipe Resep Move Column Actions":
            - text: Tipe Resep
            - button "Move":
              - img
            - button "Column Actions":
              - img
          - columnheader "Nama Menu/Opsi Varian Move Column Actions":
            - text: Nama Menu/Opsi Varian
            - button "Move":
              - img
            - button "Column Actions":
              - img
          - columnheader "Bahan Baku Move Column Actions":
            - text: Bahan Baku
            - button "Move":
              - img
            - button "Column Actions":
              - img
          - columnheader "Peringatan Stok Move Column Actions":
            - text: Peringatan Stok
            - button "Move":
              - img
            - button "Column Actions":
              - img
          - columnheader "Cabang Move Column Actions":
            - text: Cabang
            - button "Move":
              - img
            - button "Column Actions":
              - img
          - columnheader "Action"
      - rowgroup:
        - row "not-found Belum Ada Data":
          - cell "not-found Belum Ada Data":
            - img "not-found"
            - paragraph: Belum Ada Data
      - rowgroup
    - paragraph: Rows per page
    - textbox "Rows per page": "25"
    - img
    - paragraph: 0-0 of 0
    - button "Go to previous page" [disabled]:
      - img
    - button "Go to next page" [disabled]:
      - img
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
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
  245 |       const dataResepSemiTab = page.getByRole('tab', { name: 'Data Resep Setengah Jadi', exact: true });
  246 |       await expect(dataResepTab).toBeVisible({ timeout: 5000 });
  247 |       await expect(dataResepSemiTab).toBeVisible({ timeout: 5000 });
  248 | 
  249 |       // Verify filter elements
  250 |       const searchInput = getSearchInput(page);
  251 |       await expect(searchInput).toBeVisible({ timeout: 5000 });
  252 | 
  253 |       const cabangFilter = page.locator('input[placeholder="Semua Cabang"]:visible').first();
  254 |       await expect(cabangFilter).toBeVisible({ timeout: 5000 });
  255 | 
  256 |       // Verify Add Button exists
  257 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  258 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  259 |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  260 | 
  261 |       // Verify table structure and headers
  262 |       const table = page.locator('table:visible').first();
  263 |       await expect(table).toBeVisible();
  264 | 
  265 |       const thead = page.locator('thead:visible').first();
> 266 |       await expect(thead.getByText('Menu', { exact: true }).first()).toBeVisible();
      |                                                                      ^ Error: expect(locator).toBeVisible() failed
  267 |       await expect(thead.getByText('Bahan Baku', { exact: true }).first()).toBeVisible();
  268 |       await expect(thead.getByText('Peringatan Stok', { exact: true }).first()).toBeVisible();
  269 |       await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
  270 |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  271 |     
  272 |     });
  273 |   });
  274 | 
  275 |   test('[TC-02] Navigasi ke halaman buat resep dan memverifikasi form elements', async ({ page }) => {
  276 |     await test.step('Lakukan proses navigasi ke halaman buat resep dan memverifikasi form elements dan pastikan data tersimpan', async () => {
  277 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  278 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  279 |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  280 |       await addBtn.click();
  281 | 
  282 |       // Verify URL and title
  283 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });
  284 |       await expect(page.getByText('Buat Resep').first()).toBeVisible({ timeout: 10000 });
  285 | 
  286 |       // Verify form fields
  287 |       const cabangInput = page.getByPlaceholder('Pilih Cabang');
  288 |       await expect(cabangInput).toBeVisible({ timeout: 5000 });
  289 | 
  290 |       const menuInput = page.getByPlaceholder('Pilih Menu');
  291 |       await expect(menuInput).toBeVisible({ timeout: 5000 });
  292 | 
  293 |       const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
  294 |       await expect(tambahBahanBtn).toBeVisible({ timeout: 5000 });
  295 | 
  296 |       // Verify action buttons
  297 |       const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
  298 |       await expect(cancelBtn).toBeVisible({ timeout: 5000 });
  299 | 
  300 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  301 |       await expect(simpanBtn).toBeVisible({ timeout: 5000 });
  302 |     
  303 |     });
  304 |   });
  305 | 
  306 |   test('[TC-03] Tombol batalkan pada form buat resep kembali ke list tanpa menyimpan', async ({ page }) => {
  307 |     await test.step('Lakukan proses tombol batalkan pada form buat resep kembali ke list tanpa menyimpan dan pastikan data tersimpan', async () => {
  308 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  309 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  310 |       await addBtn.click();
  311 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);
  312 | 
  313 |       // Click Batalkan
  314 |       const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
  315 |       await expect(cancelBtn).toBeVisible();
  316 |       await cancelBtn.click();
  317 | 
  318 |       // Verify redirected back to recipe list
  319 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 15000 });
  320 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
  321 |     
  322 |     });
  323 |   });
  324 | 
  325 |   test('[TC-04] Validasi form buat resep: submit tanpa melengkapi data tidak keluar dari halaman add', async ({ page }) => {
  326 |     await test.step('Lakukan proses validasi form buat resep: submit tanpa melengkapi data tidak keluar dari halaman add dan pastikan data tersimpan', async () => {
  327 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  328 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  329 |       await addBtn.click();
  330 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);
  331 | 
  332 |       // Click Simpan button without completing required inputs
  333 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  334 |       await expect(simpanBtn).toBeVisible({ timeout: 5000 });
  335 |       await simpanBtn.click();
  336 | 
  337 |       // Verification: Form stays on add page because validation prevents submission
  338 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);
  339 |     
  340 |     });
  341 |   });
  342 | 
  343 |   test('[TC-05] Membuka modal tambah bahan baku dan membatalkannya', async ({ page }) => {
  344 |     await test.step('Buka dan periksa rincian: Membuka modal tambah bahan baku dan membatalkannya', async () => {
  345 |       await ensureBranchHasBookMenu(page);
  346 | 
  347 |       await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
  348 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);
  349 | 
  350 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  351 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  352 |       await addBtn.click();
  353 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);
  354 | 
  355 |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  356 |       await expect(cabangInput).toBeVisible({ timeout: 10000 });
  357 | 
  358 |       const menuInput = page.getByPlaceholder('Pilih Menu').first();
  359 |       await expect(menuInput).toBeVisible({ timeout: 10000 });
  360 | 
  361 |       const optionSelector = '[role="option"]:visible, [data-combobox-option]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible';
  362 |       let menuOption = null;
  363 | 
  364 |       await cabangInput.click();
  365 |       await waitForPageReady(page);
  366 |       const branchOptions = page.locator(optionSelector);
```