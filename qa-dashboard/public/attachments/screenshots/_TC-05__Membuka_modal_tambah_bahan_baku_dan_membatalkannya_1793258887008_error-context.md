# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-05] Membuka modal tambah bahan baku dan membatalkannya
- Location: tests/Kasflo-Resto/Bahan Baku/resep.spec.js:343:3

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Pilih Menu').first()
    - locator resolved to <input value="" ispackagemenu="0" autocomplete="off" aria-invalid="false" data-variant="default" id="mantine-hnd79yof1" aria-haspopup="listbox" placeholder="Pilih Menu" aria-controls="mantine-yzklabzuk" class="m_8fb7ebe7 mantine-Input-input mantine-Select-input"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
  - element was detached from the DOM, retrying

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
  367 |       const branchCount = await branchOptions.count();
  368 | 
  369 |       for (let b = 0; b < Math.max(branchCount, 1); b++) {
  370 |         if (branchCount > 0) {
  371 |           if (b > 0) {
  372 |             await cabangInput.click();
  373 |             await waitForPageReady(page);
  374 |           }
  375 |           await branchOptions.nth(b).click();
  376 |           await waitForPageReady(page);
  377 |         }
  378 | 
> 379 |         await menuInput.click();
      |                         ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  380 |         await waitForPageReady(page);
  381 |         const opt = page.locator(optionSelector).first();
  382 |         if (await opt.isVisible({ timeout: 2000 }).catch(() => false)) {
  383 |           menuOption = opt;
  384 |           break;
  385 |         }
  386 |       }
  387 | 
  388 |       if (menuOption) {
  389 |         await menuOption.click();
  390 |         await waitForPageReady(page);
  391 | 
  392 |         // Open Tambah Bahan Baku modal
  393 |         const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
  394 |         if (await tambahBahanBtn.isEnabled({ timeout: 5000 }).catch(() => false)) {
  395 |           await tambahBahanBtn.click();
  396 | 
  397 |           // Verify modal elements
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
```