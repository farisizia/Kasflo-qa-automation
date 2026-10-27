# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-06] Tambah resep baru berhasil dan muncul di tabel
- Location: tests/Bahan Baku/resep.spec.js:397:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))').first() with timeout 15000ms
  - waiting for locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))').first()

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
- main:
  - paragraph: Subscription akan berakhir dalam 7 hari.
  - link "Kunjungi Halaman Berlangganan":
    - /url: /admin/subscription?tab=history-subscription
    - paragraph: Kunjungi Halaman Berlangganan
  - img
  - paragraph: Resep
  - button "Business":
    - text: Business
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
        - row "Menu Move Column Actions Bahan Baku Move Column Actions Peringatan Stok Move Column Actions Cabang Move Column Actions Action":
          - columnheader "Menu Move Column Actions":
            - text: Menu
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
  312 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  313 |       await expect(simpanBtn).toBeVisible({ timeout: 5000 });
  314 |       await simpanBtn.click();
  315 | 
  316 |       // Verification: Form stays on add page because validation prevents submission
  317 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);
  318 |     
  319 |     });
  320 |   });
  321 | 
  322 |   test('[TC-05] Membuka modal tambah bahan baku dan membatalkannya', async ({ page }) => {
  323 |     await test.step('Buka dan periksa rincian: Membuka modal tambah bahan baku dan membatalkannya', async () => {
  324 |       await ensureBranchHasBookMenu(page);
  325 | 
  326 |       await page.goto('/admin/ingredients/recipe', { waitUntil: 'domcontentloaded' });
  327 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe/);
  328 | 
  329 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  330 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  331 |       await addBtn.click();
  332 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/);
  333 | 
  334 |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  335 |       await expect(cabangInput).toBeVisible({ timeout: 10000 });
  336 | 
  337 |       const menuInput = page.getByPlaceholder('Pilih Menu').first();
  338 |       await expect(menuInput).toBeVisible({ timeout: 10000 });
  339 | 
  340 |       const optionSelector = '[role="option"]:visible, [data-combobox-option]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible';
  341 |       let menuOption = null;
  342 | 
  343 |       await cabangInput.click();
  344 |       await page.waitForTimeout(500);
  345 |       const branchOptions = page.locator(optionSelector);
  346 |       const branchCount = await branchOptions.count();
  347 | 
  348 |       for (let b = 0; b < Math.max(branchCount, 1); b++) {
  349 |         if (branchCount > 0) {
  350 |           if (b > 0) {
  351 |             await cabangInput.click();
  352 |             await page.waitForTimeout(500);
  353 |           }
  354 |           await branchOptions.nth(b).click();
  355 |           await page.waitForTimeout(1000);
  356 |         }
  357 | 
  358 |         await menuInput.click();
  359 |         await page.waitForTimeout(500);
  360 |         const opt = page.locator(optionSelector).first();
  361 |         if (await opt.isVisible({ timeout: 2000 }).catch(() => false)) {
  362 |           menuOption = opt;
  363 |           break;
  364 |         }
  365 |       }
  366 | 
  367 |       if (menuOption) {
  368 |         await menuOption.click();
  369 |         await page.waitForTimeout(1000);
  370 | 
  371 |         // Open Tambah Bahan Baku modal
  372 |         const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
  373 |         if (await tambahBahanBtn.isEnabled({ timeout: 5000 }).catch(() => false)) {
  374 |           await tambahBahanBtn.click();
  375 | 
  376 |           // Verify modal elements
  377 |           const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  378 |           await expect(modal).toBeVisible({ timeout: 5000 });
  379 |           await expect(modal.getByText('Tambah Bahan Baku').first()).toBeVisible({ timeout: 5000 });
  380 | 
  381 |           // Cancel modal
  382 |           const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  383 |           await expect(cancelBtn).toBeVisible();
  384 |           await cancelBtn.click();
  385 | 
  386 |           await expect(modal).not.toBeVisible({ timeout: 5000 });
  387 |         }
  388 |       } else {
  389 |         // If all menus are already assigned, verify form elements are valid
  390 |         await expect(page.getByText('Buat Resep').first()).toBeVisible({ timeout: 5000 });
  391 |         await expect(cabangInput).toBeVisible();
  392 |         await expect(menuInput).toBeVisible();
  393 |       }
  394 |     });
  395 |   });
  396 | 
  397 |   test('[TC-06] Tambah resep baru berhasil dan muncul di tabel', async ({ page }) => {
  398 |     await test.step('Lakukan proses tambah resep baru berhasil dan muncul di tabel dan pastikan data tersimpan', async () => {
  399 |       const recipeMenuName = await createRecipe(page);
  400 | 
  401 |       // Verify recipe appears in table
  402 |       const table = page.locator('table:visible').first();
  403 |       if (recipeMenuName) {
  404 |         const searchInput = getSearchInput(page);
  405 |         await searchInput.fill(recipeMenuName);
  406 |         await page.waitForTimeout(1000);
  407 | 
  408 |         const targetRow = table.locator('tbody tr').filter({ hasText: recipeMenuName });
  409 |         await expect(targetRow.first()).toBeVisible({ timeout: 15000 });
  410 |       } else {
  411 |         const rows = getDataRows(page);
> 412 |         await expect(rows.first()).toBeVisible({ timeout: 15000 });
      |                                    ^ Error: expect(locator).toBeVisible() failed
  413 |       }
  414 |     
  415 |     });
  416 |   });
  417 | 
  418 |   test('[TC-07] Cari/filter resep dengan search box', async ({ page }) => {
  419 |     await test.step('Lakukan pengujian cari/filter resep dengan search box dan validasi hasil yang ditampilkan', async () => {
  420 |       await ensureRecipeExists(page);
  421 | 
  422 |       const dataRows = getDataRows(page);
  423 |       if (await dataRows.count() === 0) {
  424 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  425 |         return;
  426 |       }
  427 | 
  428 |       const firstRowCell = page.locator('table:visible tbody tr td:first-child').filter({
  429 |         hasNotText: /Belum Ada Data|No results found/i,
  430 |       }).first();
  431 |       await expect(firstRowCell).not.toBeEmpty({ timeout: 10000 });
  432 |       const targetMenu = (await firstRowCell.innerText()).trim();
  433 |       expect(targetMenu.length).toBeGreaterThan(0);
  434 | 
  435 |       const searchInput = getSearchInput(page);
  436 |       await expect(searchInput).toBeVisible({ timeout: 5000 });
  437 | 
  438 |       // 1. Search with matching term
  439 |       await searchInput.fill(targetMenu);
  440 |       await page.waitForTimeout(1000);
  441 |       const matchedRow = page.locator('table:visible tbody tr').filter({ hasText: targetMenu });
  442 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  443 | 
  444 |       // 2. Search with non-existent keyword
  445 |       await searchInput.fill('XYZNonExistentRecipe999');
  446 |       await page.waitForTimeout(1000);
  447 |       await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  448 | 
  449 |       // 3. Clear search and verify original row is visible again
  450 |       await searchInput.clear();
  451 |       await page.waitForTimeout(1000);
  452 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  453 |     
  454 |     });
  455 |   });
  456 | 
  457 |   test('[TC-08] Beralih ke tab data resep setengah jadi dan kembali ke tab data resep', async ({ page }) => {
  458 |     await test.step('Langkah Pengujian UAT: Beralih ke tab data resep setengah jadi dan kembali ke tab data resep', async () => {
  459 |       // Click tab Data Resep Setengah Jadi
  460 |       const semiTab = page.getByRole('tab', { name: /Data Resep Setengah Jadi/i });
  461 |       await expect(semiTab).toBeVisible({ timeout: 5000 });
  462 |       await semiTab.click();
  463 |       await page.waitForTimeout(1000);
  464 | 
  465 |       // Verify header of semi-raw tab table
  466 |       const thead = page.locator('thead:visible').first();
  467 |       await expect(thead.getByText('Bahan Baku Setengah Jadi', { exact: true }).first()).toBeVisible({ timeout: 10000 });
  468 | 
  469 |       // Switch back to Data Resep tab
  470 |       const resepTab = page.getByRole('tab', { name: /Data Resep$/i });
  471 |       await expect(resepTab).toBeVisible({ timeout: 5000 });
  472 |       await resepTab.click();
  473 |       await page.waitForTimeout(1000);
  474 | 
  475 |       // Verify original table header
  476 |       const thead2 = page.locator('thead:visible').first();
  477 |       await expect(thead2.getByText('Menu', { exact: true }).first()).toBeVisible({ timeout: 10000 });
  478 |     
  479 |     });
  480 |   });
  481 | 
  482 |   test('[TC-09] Navigasi ke halaman edit resep via aksi tabel', async ({ page }) => {
  483 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit resep via aksi tabel', async () => {
  484 |       await ensureRecipeExists(page);
  485 | 
  486 |       const dataRows = getDataRows(page);
  487 |       if (await dataRows.count() === 0) {
  488 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  489 |         return;
  490 |       }
  491 | 
  492 |       const targetRow = dataRows.first();
  493 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  494 | 
  495 |       // Edit button (first action link or button in row)
  496 |       const editBtn = targetRow.locator('a[href*="/edit"]').first();
  497 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  498 |       await editBtn.click();
  499 | 
  500 |       // Verify edit page loaded
  501 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/edit/, { timeout: 15000 });
  502 |       await expect(page.getByText('Edit Resep').first()).toBeVisible({ timeout: 10000 });
  503 | 
  504 |       // Verify Batalkan button returns to recipe list
  505 |       const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
  506 |       await expect(cancelBtn).toBeVisible();
  507 |       await cancelBtn.click();
  508 | 
  509 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 15000 });
  510 |     
  511 |     });
  512 |   });
```