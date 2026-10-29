# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-08] Beralih ke tab data resep setengah jadi dan kembali ke tab data resep
- Location: tests/Kasflo-Resto/Bahan Baku/resep.spec.js:478:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('thead:visible').first().getByText('Menu', { exact: true }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('thead:visible').first().getByText('Menu', { exact: true }).first() with timeout 10000ms
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
        - row "Menu Updated Menu 888 1 Bahan Baku - Kasflo Pusat QA":
          - cell "Menu"
          - cell "Updated Menu 888"
          - cell "1 Bahan Baku"
          - cell "-"
          - cell "Kasflo Pusat QA"
          - cell:
            - link:
              - /url: /admin/ingredients/recipe/edit/70782?partner_branch_id=5817&product_id=70782&variant_option_id=0
              - img
            - button:
              - img
      - rowgroup
    - paragraph: Rows per page
    - textbox "Rows per page": "25"
    - img
    - paragraph: 1-1 of 1
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
  398 |           const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  399 |           await expect(modal).toBeVisible({ timeout: 5000 });
  400 |           await expect(modal.getByText('Tambah Bahan Baku').first()).toBeVisible({ timeout: 5000 });
  401 | 
  402 |           // Cancel modal
  403 |           const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  404 |           await expect(cancelBtn).toBeVisible();
  405 |           await cancelBtn.click();
  406 | 
  407 |           await expect(modal).not.toBeVisible({ timeout: 5000 });
  408 |         }
  409 |       } else {
  410 |         // If all menus are already assigned, verify form elements are valid
  411 |         await expect(page.getByText('Buat Resep').first()).toBeVisible({ timeout: 5000 });
  412 |         await expect(cabangInput).toBeVisible();
  413 |         await expect(menuInput).toBeVisible();
  414 |       }
  415 |     });
  416 |   });
  417 | 
  418 |   test('[TC-06] Tambah resep baru berhasil dan muncul di tabel', async ({ page }) => {
  419 |     await test.step('Lakukan proses tambah resep baru berhasil dan muncul di tabel dan pastikan data tersimpan', async () => {
  420 |       const recipeMenuName = await createRecipe(page);
  421 | 
  422 |       // Verify recipe appears in table
  423 |       const table = page.locator('table:visible').first();
  424 |       if (recipeMenuName) {
  425 |         const searchInput = getSearchInput(page);
  426 |         await searchInput.fill(recipeMenuName);
  427 |         await waitForPageReady(page);
  428 | 
  429 |         const targetRow = table.locator('tbody tr').filter({ hasText: recipeMenuName });
  430 |         await expect(targetRow.first()).toBeVisible({ timeout: 15000 });
  431 |       } else {
  432 |         const rows = getDataRows(page);
  433 |         await expect(rows.first()).toBeVisible({ timeout: 15000 });
  434 |       }
  435 |     
  436 |     });
  437 |   });
  438 | 
  439 |   test('[TC-07] Cari/filter resep dengan search box', async ({ page }) => {
  440 |     await test.step('Lakukan pengujian cari/filter resep dengan search box dan validasi hasil yang ditampilkan', async () => {
  441 |       await ensureRecipeExists(page);
  442 | 
  443 |       const dataRows = getDataRows(page);
  444 |       if (await dataRows.count() === 0) {
  445 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  446 |         return;
  447 |       }
  448 | 
  449 |       const firstRowCell = page.locator('table:visible tbody tr td:first-child').filter({
  450 |         hasNotText: /Belum Ada Data|No results found/i,
  451 |       }).first();
  452 |       await expect(firstRowCell).not.toBeEmpty({ timeout: 10000 });
  453 |       const targetMenu = (await firstRowCell.innerText()).trim();
  454 |       expect(targetMenu.length).toBeGreaterThan(0);
  455 | 
  456 |       const searchInput = getSearchInput(page);
  457 |       await expect(searchInput).toBeVisible({ timeout: 5000 });
  458 | 
  459 |       // 1. Search with matching term
  460 |       await searchInput.fill(targetMenu);
  461 |       await waitForPageReady(page);
  462 |       const matchedRow = page.locator('table:visible tbody tr').filter({ hasText: targetMenu });
  463 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  464 | 
  465 |       // 2. Search with non-existent keyword
  466 |       await searchInput.fill('XYZNonExistentRecipe999');
  467 |       await waitForPageReady(page);
  468 |       await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  469 | 
  470 |       // 3. Clear search and verify original row is visible again
  471 |       await searchInput.clear();
  472 |       await waitForPageReady(page);
  473 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  474 |     
  475 |     });
  476 |   });
  477 | 
  478 |   test('[TC-08] Beralih ke tab data resep setengah jadi dan kembali ke tab data resep', async ({ page }) => {
  479 |     await test.step('Langkah Pengujian UAT: Beralih ke tab data resep setengah jadi dan kembali ke tab data resep', async () => {
  480 |       // Click tab Data Resep Setengah Jadi
  481 |       const semiTab = page.getByRole('tab', { name: /Data Resep Setengah Jadi/i });
  482 |       await expect(semiTab).toBeVisible({ timeout: 5000 });
  483 |       await semiTab.click();
  484 |       await waitForPageReady(page);
  485 | 
  486 |       // Verify header of semi-raw tab table
  487 |       const thead = page.locator('thead:visible').first();
  488 |       await expect(thead.getByText('Bahan Baku Setengah Jadi', { exact: true }).first()).toBeVisible({ timeout: 10000 });
  489 | 
  490 |       // Switch back to Data Resep tab
  491 |       const resepTab = page.getByRole('tab', { name: /Data Resep$/i });
  492 |       await expect(resepTab).toBeVisible({ timeout: 5000 });
  493 |       await resepTab.click();
  494 |       await waitForPageReady(page);
  495 | 
  496 |       // Verify original table header
  497 |       const thead2 = page.locator('thead:visible').first();
> 498 |       await expect(thead2.getByText('Menu', { exact: true }).first()).toBeVisible({ timeout: 10000 });
      |                                                                       ^ Error: expect(locator).toBeVisible() failed
  499 |     
  500 |     });
  501 |   });
  502 | 
  503 |   test('[TC-09] Navigasi ke halaman edit resep via aksi tabel', async ({ page }) => {
  504 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit resep via aksi tabel', async () => {
  505 |       await ensureRecipeExists(page);
  506 | 
  507 |       const dataRows = getDataRows(page);
  508 |       if (await dataRows.count() === 0) {
  509 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  510 |         return;
  511 |       }
  512 | 
  513 |       const targetRow = dataRows.first();
  514 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  515 | 
  516 |       // Edit button (first action link or button in row)
  517 |       const editBtn = targetRow.locator('a[href*="/edit"]').first();
  518 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  519 |       await editBtn.click();
  520 | 
  521 |       // Verify edit page loaded
  522 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/edit/, { timeout: 15000 });
  523 |       await expect(page.getByText('Edit Resep').first()).toBeVisible({ timeout: 10000 });
  524 | 
  525 |       // Verify Batalkan button returns to recipe list
  526 |       const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
  527 |       await expect(cancelBtn).toBeVisible();
  528 |       await cancelBtn.click();
  529 | 
  530 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 15000 });
  531 |     
  532 |     });
  533 |   });
  534 | 
  535 |   test('[TC-10] Edit resep dan simpan perubahan', async ({ page }) => {
  536 |     await test.step('Lakukan pengujian edit resep dan simpan perubahan dan verifikasi pembaruan data', async () => {
  537 |       await ensureRecipeExists(page);
  538 | 
  539 |       const dataRows = getDataRows(page);
  540 |       if (await dataRows.count() === 0) {
  541 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  542 |         return;
  543 |       }
  544 | 
  545 |       const targetRow = dataRows.first();
  546 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  547 | 
  548 |       // Click edit button
  549 |       const editBtn = targetRow.locator('a[href*="/edit"]').first();
  550 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  551 |       await editBtn.click();
  552 | 
  553 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/edit/, { timeout: 15000 });
  554 | 
  555 |       // Click Simpan on edit page to confirm update
  556 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  557 |       await expect(simpanBtn).toBeEnabled({ timeout: 5000 });
  558 |       await simpanBtn.click();
  559 | 
  560 |       // Verify redirect back to recipe list
  561 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe$/, { timeout: 20000 });
  562 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  563 |     
  564 |     });
  565 |   });
  566 | 
  567 |   test('[TC-11] Batal menghapus resep melalui modal konfirmasi', async ({ page }) => {
  568 |     await test.step('Uji pembatalan aksi: Batal menghapus resep melalui modal konfirmasi', async () => {
  569 |       await ensureRecipeExists(page);
  570 | 
  571 |       const dataRows = getDataRows(page);
  572 |       if (await dataRows.count() === 0) {
  573 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  574 |         return;
  575 |       }
  576 | 
  577 |       const targetRow = dataRows.first();
  578 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  579 |       const targetMenu = (await targetRow.locator('td:first-child').innerText()).trim();
  580 | 
  581 |       // Click delete / trash button (last action button)
  582 |       const deleteBtn = targetRow.locator('button').last();
  583 |       await expect(deleteBtn).toBeVisible({ timeout: 10000 });
  584 |       await deleteBtn.click();
  585 | 
  586 |       // Verify confirmation modal appears
  587 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  588 |       await expect(modal).toBeVisible({ timeout: 5000 });
  589 |       await expect(modal.getByText(/Hapus|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });
  590 | 
  591 |       // Click Batal
  592 |       const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  593 |       await expect(cancelBtn).toBeVisible();
  594 |       await cancelBtn.click();
  595 | 
  596 |       // Verify modal closed
  597 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  598 | 
```