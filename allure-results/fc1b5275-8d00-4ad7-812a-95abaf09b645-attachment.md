# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Promosi/harga_spesial.spec.js >> Harga Spesial >> [TC-06] Tambah harga spesial baru berhasil dan tampil di tabel
- Location: tests/Promosi/harga_spesial.spec.js:383:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first() with timeout 10000ms
  - waiting for locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()

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
  - link "Promosi":
    - /url: /admin/promotion
    - img
    - paragraph: Promosi
    - img
  - link "Harga Spesial":
    - /url: /admin/promotion/special-price
  - link "Kampanye Promosi":
    - /url: /admin/promotion/campaign
  - link "Display Promosi":
    - /url: /admin/promotion/display
  - link "Poin":
    - /url: /admin/promotion/point
  - link "Reward":
    - /url: /admin/promotion/reward
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
  - paragraph: Harga Spesial
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
  - paragraph: Harga Spesial
  - link "Buat Harga Spesial":
    - /url: /admin/promotion/special-price/form
    - img
    - text: Buat Harga Spesial
  - textbox "Pilih Cabang"
  - button:
    - img
  - textbox "Filter Status": Semua Status
  - img
  - button "Pilih Periode Tanggal"
  - img
  - button "Show/Hide columns":
    - img
  - button "Toggle full screen":
    - img
  - table:
    - rowgroup:
      - row "Nama Promo Sort by Nama Promo ascending Move Column Actions Cabang Sort by Cabang ascending Move Column Actions Dibuat Oleh Sort by Dibuat Oleh ascending Move Column Actions Tanggal Mulai Sort by Tanggal Mulai ascending Move Column Actions Tanggal Berakhir Sort by Tanggal Berakhir ascending Move Column Actions Status Sort by Status descending Move Column Actions Action":
        - columnheader "Nama Promo Sort by Nama Promo ascending Move Column Actions":
          - text: Nama Promo
          - button "Sort by Nama Promo ascending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader "Cabang Sort by Cabang ascending Move Column Actions":
          - text: Cabang
          - button "Sort by Cabang ascending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader "Dibuat Oleh Sort by Dibuat Oleh ascending Move Column Actions":
          - text: Dibuat Oleh
          - button "Sort by Dibuat Oleh ascending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader "Tanggal Mulai Sort by Tanggal Mulai ascending Move Column Actions":
          - text: Tanggal Mulai
          - button "Sort by Tanggal Mulai ascending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader "Tanggal Berakhir Sort by Tanggal Berakhir ascending Move Column Actions":
          - text: Tanggal Berakhir
          - button "Sort by Tanggal Berakhir ascending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader "Status Sort by Status descending Move Column Actions":
          - text: Status
          - button "Sort by Status descending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader
        - columnheader "Action"
    - rowgroup:
      - row "Promo Spesial Auto 1792643391388 Kasflo Pusat QA Kasflo Automation 2026-09-28 2026-11-01 Aktif":
        - cell "Promo Spesial Auto 1792643391388"
        - cell "Kasflo Pusat QA"
        - cell "Kasflo Automation"
        - cell "2026-09-28"
        - cell "2026-11-01"
        - cell "Aktif"
        - cell
        - cell:
          - link:
            - /url: /admin/promotion/special-price/131
            - img
          - link:
            - /url: /admin/promotion/special-price/form/131
            - img
          - button:
            - img
      - row "Promo Spesial Auto 1792642418562 Kasflo Pusat QA Kasflo Automation 2026-09-28 2026-11-01 Aktif":
        - cell "Promo Spesial Auto 1792642418562"
        - cell "Kasflo Pusat QA"
        - cell "Kasflo Automation"
        - cell "2026-09-28"
        - cell "2026-11-01"
        - cell "Aktif"
        - cell
        - cell:
          - link:
            - /url: /admin/promotion/special-price/129
            - img
          - link:
            - /url: /admin/promotion/special-price/form/129
            - img
          - button:
            - img
      - row "Promo Spesial Auto 1792642109431 Kasflo Pusat QA Kasflo Automation 2026-09-28 2026-11-01 Aktif":
        - cell "Promo Spesial Auto 1792642109431"
        - cell "Kasflo Pusat QA"
        - cell "Kasflo Automation"
        - cell "2026-09-28"
        - cell "2026-11-01"
        - cell "Aktif"
        - cell
        - cell:
          - link:
            - /url: /admin/promotion/special-price/127
            - img
          - link:
            - /url: /admin/promotion/special-price/form/127
            - img
          - button:
            - img
      - row "Promo Spesial Auto 1792637858765 Kasflo Pusat QA Kasflo Automation 2026-09-28 2026-11-01 Aktif":
        - cell "Promo Spesial Auto 1792637858765"
        - cell "Kasflo Pusat QA"
        - cell "Kasflo Automation"
        - cell "2026-09-28"
        - cell "2026-11-01"
        - cell "Aktif"
        - cell
        - cell:
          - link:
            - /url: /admin/promotion/special-price/125
            - img
          - link:
            - /url: /admin/promotion/special-price/form/125
            - img
          - button:
            - img
      - row "Test Promo Auto 1792637805007 Kasflo Pusat QA Kasflo Automation 2026-09-28 2026-11-01 Aktif":
        - cell "Test Promo Auto 1792637805007"
        - cell "Kasflo Pusat QA"
        - cell "Kasflo Automation"
        - cell "2026-09-28"
        - cell "2026-11-01"
        - cell "Aktif"
        - cell
        - cell:
          - link:
            - /url: /admin/promotion/special-price/124
            - img
          - link:
            - /url: /admin/promotion/special-price/form/124
            - img
          - button:
            - img
      - row "Test Promo Inspect Kasflo Pusat QA Kasflo Automation 2026-09-28 2026-11-01 Aktif":
        - cell "Test Promo Inspect"
        - cell "Kasflo Pusat QA"
        - cell "Kasflo Automation"
        - cell "2026-09-28"
        - cell "2026-11-01"
        - cell "Aktif"
        - cell
        - cell:
          - link:
            - /url: /admin/promotion/special-price/123
            - img
          - link:
            - /url: /admin/promotion/special-price/form/123
            - img
          - button:
            - img
    - rowgroup
  - paragraph: Rows per page
  - textbox "Rows per page": "25"
  - img
  - paragraph: 1-6 of 6
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
  298 |       await selectMantineOption(page, cabangInput);
  299 | 
  300 |       // Verify Tambah Menu button is now visible
  301 |       const tambahMenuBtn = page.getByRole('button', { name: /Tambah Menu/i });
  302 |       await expect(tambahMenuBtn).toBeVisible({ timeout: 5000 });
  303 |     
  304 |     });
  305 |   });
  306 | 
  307 |   test('[TC-03] Tombol batalkan pada form buat harga spesial mengembalikan ke halaman list promo', async ({ page }) => {
  308 |     await test.step('Lakukan proses tombol batalkan pada form buat harga spesial mengembalikan ke halaman list promo dan pastikan data tersimpan', async () => {
  309 |       const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
  310 |         .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
  311 |       await addBtn.click();
  312 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/);
  313 | 
  314 |       // Fill temporary name
  315 |       const tempName = 'Batal Promo ' + Date.now();
  316 |       await page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first().fill(tempName);
  317 | 
  318 |       // Click Batalkan
  319 |       const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
  320 |       await expect(cancelBtn).toBeVisible();
  321 |       await cancelBtn.click();
  322 | 
  323 |       // Verify redirected back to special price list
  324 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 15000 });
  325 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
  326 | 
  327 |       // Verify temporary item is not saved
  328 |       await expect(page.locator('table:visible').getByText(tempName)).not.toBeVisible({ timeout: 5000 });
  329 |     
  330 |     });
  331 |   });
  332 | 
  333 |   test('[TC-04] Validasi form buat harga spesial: submit tanpa data wajib tidak keluar dari halaman form', async ({ page }) => {
  334 |     await test.step('Lakukan proses validasi form buat harga spesial: submit tanpa data wajib tidak keluar dari halaman form dan pastikan data tersimpan', async () => {
  335 |       const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
  336 |         .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
  337 |       await addBtn.click();
  338 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/);
  339 | 
  340 |       // Click Simpan button when form is empty
  341 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  342 |       await expect(simpanBtn).toBeVisible({ timeout: 5000 });
  343 |       await simpanBtn.click();
  344 | 
  345 |       // Form should remain on form page due to validation
  346 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/);
  347 |     
  348 |     });
  349 |   });
  350 | 
  351 |   test('[TC-05] Membuka dan membatalkan modal tambah menu pada form buat harga spesial', async ({ page }) => {
  352 |     await test.step('Lakukan proses membuka dan membatalkan modal tambah menu pada form buat harga spesial dan pastikan data tersimpan', async () => {
  353 |       const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
  354 |         .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
  355 |       await addBtn.click();
  356 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/);
  357 | 
  358 |       // Select Cabang first so Daftar Menu section appears
  359 |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  360 |       await expect(cabangInput).toBeVisible({ timeout: 5000 });
  361 |       await selectMantineOption(page, cabangInput);
  362 | 
  363 |       // Click Tambah Menu button
  364 |       const tambahMenuBtn = page.getByRole('button', { name: /Tambah Menu/i });
  365 |       await expect(tambahMenuBtn).toBeVisible({ timeout: 5000 });
  366 |       await tambahMenuBtn.click();
  367 | 
  368 |       // Verify modal appears
  369 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  370 |       await expect(modal).toBeVisible({ timeout: 5000 });
  371 |       await expect(modal.getByText('Tambah Menu').first()).toBeVisible({ timeout: 5000 });
  372 | 
  373 |       // Cancel modal
  374 |       const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  375 |       await expect(cancelBtn).toBeVisible();
  376 |       await cancelBtn.click();
  377 | 
  378 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  379 |     
  380 |     });
  381 |   });
  382 | 
  383 |   test('[TC-06] Tambah harga spesial baru berhasil dan tampil di tabel', async ({ page }) => {
  384 |     await test.step('Lakukan proses tambah harga spesial baru berhasil dan tampil di tabel dan pastikan data tersimpan', async () => {
  385 |       const promoName = 'Promo Spesial Auto ' + Date.now();
  386 |       const created = await createSpecialPricePromo(page, promoName);
  387 | 
  388 |       // Verify promo appears in table
  389 |       if (created) {
  390 |         const table = page.locator('table:visible').first();
  391 |         const newRow = table.locator('tbody tr').filter({ hasText: promoName });
  392 |         await expect(newRow.first()).toBeVisible({ timeout: 15000 });
  393 |       } else {
  394 |         const rows = getDataRows(page);
  395 |         if (await rows.count() > 0) {
  396 |           await expect(rows.first()).toBeVisible({ timeout: 10000 });
  397 |         } else {
> 398 |           await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
      |                                                                                                                   ^ Error: expect(locator).toBeVisible() failed
  399 |         }
  400 |       }
  401 |     });
  402 |   });
  403 | 
  404 |   test('[TC-07] Filter harga spesial berdasarkan cabang', async ({ page }) => {
  405 |     await test.step('Lakukan pengujian filter harga spesial berdasarkan cabang dan validasi hasil yang ditampilkan', async () => {
  406 |       await ensurePromoExists(page);
  407 | 
  408 |       const cabangFilter = page.locator('input[placeholder="Pilih Cabang"]:visible').first();
  409 |       await expect(cabangFilter).toBeVisible({ timeout: 5000 });
  410 | 
  411 |       // Select branch from filter
  412 |       await selectMantineOption(page, cabangFilter);
  413 | 
  414 |       // Verify table updates and remains visible
  415 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
  416 |     
  417 |     });
  418 |   });
  419 | 
  420 |   test('[TC-08] Filter harga spesial berdasarkan status promo', async ({ page }) => {
  421 |     await test.step('Lakukan pengujian filter harga spesial berdasarkan status promo dan validasi hasil yang ditampilkan', async () => {
  422 |       await ensurePromoExists(page);
  423 | 
  424 |       const statusFilter = page.getByLabel('Filter Status').or(page.locator('input[value="Semua Status"]:visible')).first();
  425 |       await expect(statusFilter).toBeVisible({ timeout: 5000 });
  426 |       await statusFilter.click();
  427 | 
  428 |       // Verify status options exist
  429 |       const options = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
  430 |       await expect(options.first()).toBeVisible({ timeout: 5000 });
  431 | 
  432 |       // Select first option
  433 |       await options.first().click();
  434 | 
  435 |       // Verify table is visible after filter change
  436 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
  437 |     
  438 |     });
  439 |   });
  440 | 
  441 |   test('[TC-09] Navigasi ke halaman detail harga spesial via aksi tabel', async ({ page }) => {
  442 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail harga spesial via aksi tabel', async () => {
  443 |       await ensurePromoExists(page);
  444 | 
  445 |       const targetRow = getDataRows(page).first();
  446 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  447 | 
  448 |       // Detail button is the first action (link with eye icon)
  449 |       const detailBtn = targetRow.locator('a').first();
  450 |       await expect(detailBtn).toBeVisible({ timeout: 5000 });
  451 |       await detailBtn.click();
  452 | 
  453 |       // Verify detail page URL
  454 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/\d+/, { timeout: 15000 });
  455 | 
  456 |       // Return to main list via breadcrumb link
  457 |       const breadcrumbLink = page.getByRole('link', { name: 'Harga Spesial' }).first();
  458 |       await expect(breadcrumbLink).toBeVisible({ timeout: 5000 });
  459 |       await breadcrumbLink.click();
  460 | 
  461 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 15000 });
  462 |     
  463 |     });
  464 |   });
  465 | 
  466 |   test('[TC-10] Navigasi ke form edit harga spesial via aksi tabel', async ({ page }) => {
  467 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke form edit harga spesial via aksi tabel', async () => {
  468 |       await ensurePromoExists(page);
  469 | 
  470 |       const targetRow = getDataRows(page).first();
  471 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  472 | 
  473 |       // Edit button is the second link in the action column
  474 |       const editBtn = targetRow.locator('a').nth(1);
  475 |       await expect(editBtn).toBeVisible({ timeout: 5000 });
  476 |       await editBtn.click();
  477 | 
  478 |       // Verify edit form URL
  479 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form\/\d+/, { timeout: 15000 });
  480 | 
  481 |       // Cancel edit and return
  482 |       const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
  483 |       await expect(cancelBtn).toBeVisible();
  484 |       await cancelBtn.click();
  485 | 
  486 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 15000 });
  487 |     
  488 |     });
  489 |   });
  490 | 
  491 |   test('[TC-11] Batal menghapus harga spesial melalui modal konfirmasi', async ({ page }) => {
  492 |     await test.step('Uji pembatalan aksi: Batal menghapus harga spesial melalui modal konfirmasi', async () => {
  493 |       await ensurePromoExists(page);
  494 | 
  495 |       const targetRow = getDataRows(page).first();
  496 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  497 |       const targetName = (await targetRow.locator('td:first-child').innerText()).trim();
  498 | 
```