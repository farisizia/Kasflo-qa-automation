# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Promosi/harga_spesial.spec.js >> Harga Spesial >> [TC-11] Batal menghapus harga spesial melalui modal konfirmasi
- Location: tests/Kasflo-Resto/Promosi/harga_spesial.spec.js:526:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table:visible').getByText('')
Expected: visible
Error: strict mode violation: locator('table:visible').getByText('') resolved to 203 elements:
    1) <div class="mrt-table-head-cell-content-wrapper MRT_TableHeadCell-module_content-wrapper__py6aJ MRT_TableHeadCell-module_content-wrapper-hidden-overflow__QY40r MRT_TableHeadCell-module_content-wrapper-nowrap__-4aIg m_8bffd616 mantine-Flex-root __m__-r14p">Nama Promo</div> aka getByText('Nama Promo')
    2) <path d="M3 9l4 -4l4 4m-4 -4v14"></path> aka getByRole('button', { name: 'Sort by Nama Promo ascending' })
    3) <path d="M21 15l-4 4l-4 -4m4 4v-14"></path> aka getByRole('button', { name: 'Sort by Nama Promo ascending' })
    4) <path d="M5 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> aka getByRole('columnheader', { name: 'Nama Promo Sort by Nama Promo' }).getByLabel('Move')
    5) <path d="M5 15m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> aka getByRole('columnheader', { name: 'Nama Promo Sort by Nama Promo' }).getByLabel('Move')
    6) <path d="M12 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> aka getByRole('columnheader', { name: 'Nama Promo Sort by Nama Promo' }).getByLabel('Move')
    7) <path d="M12 15m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> aka getByRole('columnheader', { name: 'Nama Promo Sort by Nama Promo' }).getByLabel('Move')
    8) <path d="M19 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> aka getByRole('columnheader', { name: 'Nama Promo Sort by Nama Promo' }).getByLabel('Move')
    9) <path d="M19 15m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> aka getByRole('columnheader', { name: 'Nama Promo Sort by Nama Promo' }).getByLabel('Move')
    10) <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> aka getByRole('columnheader', { name: 'Nama Promo Sort by Nama Promo' }).getByLabel('Column Actions')
    ...

Call log:
  - Expect "toBeVisible" locator('table:visible').getByText('') with timeout 5000ms
  - waiting for locator('table:visible').getByText('')

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - generic [ref=f1e3]:
    - navigation [ref=f1e4]:
      - generic [ref=f1e5]:
        - link [ref=f1e6] [cursor=pointer]:
          - /url: /admin/dashboard
          - paragraph [ref=f1e14]: Dashboard
        - link [ref=f1e15] [cursor=pointer]:
          - /url: /admin/catalog
          - paragraph [ref=f1e23]: Katalog
        - link [ref=f1e27] [cursor=pointer]:
          - /url: /admin/ingredients
          - paragraph [ref=f1e35]: Bahan Baku
        - link [ref=f1e39] [cursor=pointer]:
          - /url: /admin/promotion
          - paragraph [ref=f1e47]: Promosi
        - generic [ref=f1e52]:
          - link "Harga Spesial" [ref=f1e53] [cursor=pointer]:
            - /url: /admin/promotion/special-price
          - link "Kampanye Promosi" [ref=f1e55] [cursor=pointer]:
            - /url: /admin/promotion/campaign
          - link "Display Promosi" [ref=f1e57] [cursor=pointer]:
            - /url: /admin/promotion/display
          - link "Poin" [ref=f1e59] [cursor=pointer]:
            - /url: /admin/promotion/point
          - link "Reward" [ref=f1e61] [cursor=pointer]:
            - /url: /admin/promotion/reward
        - link [ref=f1e63] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f1e72]: Pelanggan
        - link [ref=f1e76] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f1e84]: Pembukuan
        - link [ref=f1e88] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f1e96]: Laporan Usaha
        - link [ref=f1e100] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f1e108]: Manajemen User
        - link [ref=f1e112] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f1e119]: Pengaturan
    - main [ref=f1e123]:
      - generic [ref=f1e125]:
        - generic [ref=f1e127]:
          - paragraph [ref=f1e132]: Harga Spesial
          - generic [ref=f1e133]:
            - button "Premium" [ref=f1e135] [cursor=pointer]
            - button "Saldo QRIS" [ref=f1e143] [cursor=pointer]
            - button [ref=f1e149] [cursor=pointer]:
              - generic [ref=f1e156]:
                - paragraph [ref=f1e157]: Kasflo Automation
                - paragraph [ref=f1e158]: OWNER
        - generic [ref=f1e161]:
          - generic [ref=f1e162]:
            - link [ref=f1e163] [cursor=pointer]:
              - /url: /admin/dashboard
            - generic [ref=f1e167]: /
            - paragraph [ref=f1e168]: Harga Spesial
          - link "Buat Harga Spesial" [ref=f1e169] [cursor=pointer]:
            - /url: /admin/promotion/special-price/form
        - generic [ref=f1e176]:
          - generic [ref=f1e179]:
            - generic [ref=f1e180]:
              - generic [ref=f1e182]:
                - textbox "Pilih Cabang" [ref=f1e183] [cursor=pointer]
                - button [ref=f1e186] [cursor=pointer]
              - textbox "Filter Status" [ref=f1e193] [cursor=pointer]: Semua Status
              - button "Pilih Periode Tanggal" [ref=f1e196] [cursor=pointer]
            - generic [ref=f1e201]:
              - button "Show/Hide columns" [ref=f1e202] [cursor=pointer]
              - button "Toggle full screen" [ref=f1e205] [cursor=pointer]
          - table [ref=f1e213]:
            - rowgroup [ref=f1e214]:
              - row [ref=f1e215]:
                - columnheader "Nama Promo Sort by Nama Promo ascending Move Column Actions" [ref=f1e216]:
                  - generic [ref=f1e217]:
                    - generic [ref=f1e218] [cursor=pointer]:
                      - generic [ref=f1e219]: Nama Promo
                      - button "Sort by Nama Promo ascending" [ref=f1e220]
                    - generic [ref=f1e225]:
                      - button "Move" [ref=f1e226]
                      - button "Column Actions" [ref=f1e235] [cursor=pointer]
                    - separator [ref=f1e241]
                - columnheader "Cabang Sort by Cabang ascending Move Column Actions" [ref=f1e242]:
                  - generic [ref=f1e243]:
                    - generic [ref=f1e244] [cursor=pointer]:
                      - generic [ref=f1e245]: Cabang
                      - button "Sort by Cabang ascending" [ref=f1e246]
                    - generic [ref=f1e251]:
                      - button "Move" [ref=f1e252]
                      - button "Column Actions" [ref=f1e261] [cursor=pointer]
                    - separator [ref=f1e267]
                - columnheader "Dibuat Oleh Sort by Dibuat Oleh ascending Move Column Actions" [ref=f1e268]:
                  - generic [ref=f1e269]:
                    - generic [ref=f1e270] [cursor=pointer]:
                      - generic [ref=f1e271]: Dibuat Oleh
                      - button "Sort by Dibuat Oleh ascending" [ref=f1e272]
                    - generic [ref=f1e277]:
                      - button "Move" [ref=f1e278]
                      - button "Column Actions" [ref=f1e287] [cursor=pointer]
                    - separator [ref=f1e293]
                - columnheader "Tanggal Mulai Sort by Tanggal Mulai ascending Move Column Actions" [ref=f1e294]:
                  - generic [ref=f1e295]:
                    - generic [ref=f1e296] [cursor=pointer]:
                      - generic [ref=f1e297]: Tanggal Mulai
                      - button "Sort by Tanggal Mulai ascending" [ref=f1e298]
                    - generic [ref=f1e303]:
                      - button "Move" [ref=f1e304]
                      - button "Column Actions" [ref=f1e313] [cursor=pointer]
                    - separator [ref=f1e319]
                - columnheader "Tanggal Berakhir Sort by Tanggal Berakhir ascending Move Column Actions" [ref=f1e320]:
                  - generic [ref=f1e321]:
                    - generic [ref=f1e322] [cursor=pointer]:
                      - generic [ref=f1e323]: Tanggal Berakhir
                      - button "Sort by Tanggal Berakhir ascending" [ref=f1e324]
                    - generic [ref=f1e329]:
                      - button "Move" [ref=f1e330]
                      - button "Column Actions" [ref=f1e339] [cursor=pointer]
                    - separator [ref=f1e345]
                - columnheader "Status Sort by Status descending Move Column Actions" [ref=f1e346]:
                  - generic [ref=f1e347]:
                    - generic [ref=f1e348] [cursor=pointer]:
                      - generic [ref=f1e349]: Status
                      - button "Sort by Status descending" [ref=f1e350]
                    - generic [ref=f1e355]:
                      - button "Move" [ref=f1e356]
                      - button "Column Actions" [ref=f1e365] [cursor=pointer]
                    - separator [ref=f1e371]
                - columnheader
                - columnheader "Action" [ref=f1e372]
            - rowgroup [ref=f1e376]:
              - row [ref=f1e377]:
                - cell "Promo Spesial Auto 1793244001383" [ref=f1e378]
                - cell "Kasflo Pusat QA" [ref=f1e379]
                - cell "Kasflo Automation" [ref=f1e380]
                - cell "2026-09-28" [ref=f1e381]
                - cell "2026-11-01" [ref=f1e382]
                - cell "Aktif" [ref=f1e383]
                - cell
                - cell [ref=f1e386]:
                  - generic [ref=f1e387]:
                    - link [ref=f1e388] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/151
                    - link [ref=f1e393] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/151
                    - button [active] [ref=f1e398] [cursor=pointer]
              - row [ref=f1e402]:
                - cell "Promo Spesial Auto 1793174452768" [ref=f1e403]
                - cell "Kasflo Pusat QA" [ref=f1e404]
                - cell "Kasflo Automation" [ref=f1e405]
                - cell "2026-09-28" [ref=f1e406]
                - cell "2026-11-01" [ref=f1e407]
                - cell "Aktif" [ref=f1e408]
                - cell
                - cell [ref=f1e411]:
                  - generic [ref=f1e412]:
                    - link [ref=f1e413] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/149
                    - link [ref=f1e418] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/149
                    - button [ref=f1e423] [cursor=pointer]
              - row [ref=f1e427]:
                - cell "Promo Spesial Auto 1793170647353" [ref=f1e428]
                - cell "Kasflo Pusat QA" [ref=f1e429]
                - cell "Kasflo Automation" [ref=f1e430]
                - cell "2026-09-28" [ref=f1e431]
                - cell "2026-11-01" [ref=f1e432]
                - cell "Aktif" [ref=f1e433]
                - cell
                - cell [ref=f1e436]:
                  - generic [ref=f1e437]:
                    - link [ref=f1e438] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/147
                    - link [ref=f1e443] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/147
                    - button [ref=f1e448] [cursor=pointer]
              - row [ref=f1e452]:
                - cell "Promo Spesial Auto 1793161676546" [ref=f1e453]
                - cell "Kasflo Pusat QA" [ref=f1e454]
                - cell "Kasflo Automation" [ref=f1e455]
                - cell "2026-09-28" [ref=f1e456]
                - cell "2026-11-01" [ref=f1e457]
                - cell "Aktif" [ref=f1e458]
                - cell
                - cell [ref=f1e461]:
                  - generic [ref=f1e462]:
                    - link [ref=f1e463] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/145
                    - link [ref=f1e468] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/145
                    - button [ref=f1e473] [cursor=pointer]
              - row [ref=f1e477]:
                - cell "Promo Spesial Auto 1793157144990" [ref=f1e478]
                - cell "Kasflo Pusat QA" [ref=f1e479]
                - cell "Kasflo Automation" [ref=f1e480]
                - cell "2026-09-28" [ref=f1e481]
                - cell "2026-11-01" [ref=f1e482]
                - cell "Aktif" [ref=f1e483]
                - cell
                - cell [ref=f1e486]:
                  - generic [ref=f1e487]:
                    - link [ref=f1e488] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/143
                    - link [ref=f1e493] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/143
                    - button [ref=f1e498] [cursor=pointer]
              - row [ref=f1e502]:
                - cell "Promo Spesial Auto 1793088286693" [ref=f1e503]
                - cell "Kasflo Pusat QA" [ref=f1e504]
                - cell "Kasflo Automation" [ref=f1e505]
                - cell "2026-09-28" [ref=f1e506]
                - cell "2026-11-01" [ref=f1e507]
                - cell "Aktif" [ref=f1e508]
                - cell
                - cell [ref=f1e511]:
                  - generic [ref=f1e512]:
                    - link [ref=f1e513] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/141
                    - link [ref=f1e518] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/141
                    - button [ref=f1e523] [cursor=pointer]
              - row [ref=f1e527]:
                - cell "Promo Spesial Auto 1793079893416" [ref=f1e528]
                - cell "Kasflo Pusat QA" [ref=f1e529]
                - cell "Kasflo Automation" [ref=f1e530]
                - cell "2026-09-28" [ref=f1e531]
                - cell "2026-11-01" [ref=f1e532]
                - cell "Aktif" [ref=f1e533]
                - cell
                - cell [ref=f1e536]:
                  - generic [ref=f1e537]:
                    - link [ref=f1e538] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/139
                    - link [ref=f1e543] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/139
                    - button [ref=f1e548] [cursor=pointer]
              - row [ref=f1e552]:
                - cell "Promo Spesial Auto 1793071238135" [ref=f1e553]
                - cell "Kasflo Pusat QA" [ref=f1e554]
                - cell "Kasflo Automation" [ref=f1e555]
                - cell "2026-09-28" [ref=f1e556]
                - cell "2026-11-01" [ref=f1e557]
                - cell "Aktif" [ref=f1e558]
                - cell
                - cell [ref=f1e561]:
                  - generic [ref=f1e562]:
                    - link [ref=f1e563] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/137
                    - link [ref=f1e568] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/137
                    - button [ref=f1e573] [cursor=pointer]
              - row [ref=f1e577]:
                - cell "Promo Spesial Auto 1793003377514" [ref=f1e578]
                - cell "Kasflo Pusat QA" [ref=f1e579]
                - cell "Kasflo Automation" [ref=f1e580]
                - cell "2026-09-28" [ref=f1e581]
                - cell "2026-11-01" [ref=f1e582]
                - cell "Aktif" [ref=f1e583]
                - cell
                - cell [ref=f1e586]:
                  - generic [ref=f1e587]:
                    - link [ref=f1e588] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/135
                    - link [ref=f1e593] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/135
                    - button [ref=f1e598] [cursor=pointer]
              - row [ref=f1e602]:
                - cell "Test Promo Inspect" [ref=f1e603]
                - cell "Kasflo Pusat QA" [ref=f1e604]
                - cell "Kasflo Automation" [ref=f1e605]
                - cell "2026-09-28" [ref=f1e606]
                - cell "2026-11-01" [ref=f1e607]
                - cell "Aktif" [ref=f1e608]
                - cell
                - cell [ref=f1e611]:
                  - generic [ref=f1e612]:
                    - link [ref=f1e613] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/123
                    - link [ref=f1e618] [cursor=pointer]:
                      - /url: /admin/promotion/special-price/form/123
                    - button [ref=f1e623] [cursor=pointer]
            - rowgroup
          - generic [ref=f1e630]:
            - generic [ref=f1e631]:
              - paragraph [ref=f1e632]: Rows per page
              - textbox "Rows per page" [ref=f1e635] [cursor=pointer]: "25"
            - paragraph [ref=f1e636]: 1-10 of 10
            - generic [ref=f1e637]:
              - button "Go to previous page" [disabled] [ref=f1e638]
              - button "Go to next page" [disabled] [ref=f1e642]
  - link "Konsultasi Sekarang" [ref=f1e646] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```

# Test source

```ts
  453 |   });
  454 | 
  455 |   test('[TC-08] Filter harga spesial berdasarkan status promo', async ({ page }) => {
  456 |     await test.step('Lakukan pengujian filter harga spesial berdasarkan status promo dan validasi hasil yang ditampilkan', async () => {
  457 |       await ensurePromoExists(page);
  458 | 
  459 |       const statusFilter = page.getByLabel('Filter Status').or(page.locator('input[value="Semua Status"]:visible')).first();
  460 |       await expect(statusFilter).toBeVisible({ timeout: 5000 });
  461 |       await statusFilter.click();
  462 | 
  463 |       // Verify status options exist
  464 |       const options = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
  465 |       await expect(options.first()).toBeVisible({ timeout: 5000 });
  466 | 
  467 |       // Select first option
  468 |       await options.first().click();
  469 | 
  470 |       // Verify table is visible after filter change
  471 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
  472 |     
  473 |     });
  474 |   });
  475 | 
  476 |   test('[TC-09] Navigasi ke halaman detail harga spesial via aksi tabel', async ({ page }) => {
  477 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail harga spesial via aksi tabel', async () => {
  478 |       await ensurePromoExists(page);
  479 | 
  480 |       const targetRow = getDataRows(page).first();
  481 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  482 | 
  483 |       // Detail button is the first action (link with eye icon)
  484 |       const detailBtn = targetRow.locator('a').first();
  485 |       await expect(detailBtn).toBeVisible({ timeout: 5000 });
  486 |       await detailBtn.click();
  487 | 
  488 |       // Verify detail page URL
  489 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/\d+/, { timeout: 15000 });
  490 | 
  491 |       // Return to main list via breadcrumb link
  492 |       const breadcrumbLink = page.getByRole('link', { name: 'Harga Spesial' }).first();
  493 |       await expect(breadcrumbLink).toBeVisible({ timeout: 5000 });
  494 |       await breadcrumbLink.click();
  495 | 
  496 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 15000 });
  497 |     
  498 |     });
  499 |   });
  500 | 
  501 |   test('[TC-10] Navigasi ke form edit harga spesial via aksi tabel', async ({ page }) => {
  502 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke form edit harga spesial via aksi tabel', async () => {
  503 |       await ensurePromoExists(page);
  504 | 
  505 |       const targetRow = getDataRows(page).first();
  506 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  507 | 
  508 |       // Edit button is the second link in the action column
  509 |       const editBtn = targetRow.locator('a').nth(1);
  510 |       await expect(editBtn).toBeVisible({ timeout: 5000 });
  511 |       await editBtn.click();
  512 | 
  513 |       // Verify edit form URL
  514 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form\/\d+/, { timeout: 15000 });
  515 | 
  516 |       // Cancel edit and return
  517 |       const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
  518 |       await expect(cancelBtn).toBeVisible();
  519 |       await cancelBtn.click();
  520 | 
  521 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 15000 });
  522 |     
  523 |     });
  524 |   });
  525 | 
  526 |   test('[TC-11] Batal menghapus harga spesial melalui modal konfirmasi', async ({ page }) => {
  527 |     await test.step('Uji pembatalan aksi: Batal menghapus harga spesial melalui modal konfirmasi', async () => {
  528 |       await ensurePromoExists(page);
  529 | 
  530 |       const targetRow = getDataRows(page).first();
  531 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  532 |       const targetName = (await targetRow.locator('td:first-child').innerText()).trim();
  533 | 
  534 |       // Delete button is the button in the action column
  535 |       const deleteBtn = targetRow.locator('button').last();
  536 |       await expect(deleteBtn).toBeVisible({ timeout: 5000 });
  537 |       await deleteBtn.click();
  538 | 
  539 |       // Verify confirmation modal appears
  540 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  541 |       await expect(modal).toBeVisible({ timeout: 5000 });
  542 |       await expect(modal.getByText(/Hapus|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });
  543 | 
  544 |       // Click Batal
  545 |       const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  546 |       await expect(cancelBtn).toBeVisible();
  547 |       await cancelBtn.click();
  548 | 
  549 |       // Verify modal closed
  550 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  551 | 
  552 |       // Verify promo still exists in table
> 553 |       await expect(page.locator('table:visible').getByText(targetName)).toBeVisible({ timeout: 5000 });
      |                                                                         ^ Error: expect(locator).toBeVisible() failed
  554 |     
  555 |     });
  556 |   });
  557 | 
  558 |   test('[TC-12] Hapus harga spesial berhasil dengan konfirmasi modal', async ({ page }) => {
  559 |     await test.step('Lakukan proses hapus harga spesial berhasil dengan konfirmasi modal dan konfirmasi penghapusan data', async () => {
  560 |       // Create a promo specifically for deletion or use existing
  561 |       const itemToDelete = 'Delete Target ' + Date.now();
  562 |       const created = await createSpecialPricePromo(page, itemToDelete);
  563 | 
  564 |       await waitForTableReady(page);
  565 |       let targetRow;
  566 |       if (created) {
  567 |         targetRow = page.locator('table:visible tbody tr').filter({ hasText: itemToDelete }).first();
  568 |       } else {
  569 |         const dataRows = getDataRows(page);
  570 |         if (await dataRows.count() === 0) {
  571 |           await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  572 |           return;
  573 |         }
  574 |         targetRow = dataRows.first();
  575 |       }
  576 | 
  577 |       await expect(targetRow).toBeVisible({ timeout: 15000 });
  578 | 
  579 |       // Click delete button
  580 |       const deleteBtn = targetRow.locator('button').last();
  581 |       await expect(deleteBtn).toBeVisible({ timeout: 5000 });
  582 |       await deleteBtn.click();
  583 | 
  584 |       // Verify confirmation modal appears
  585 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  586 |       await expect(modal).toBeVisible({ timeout: 5000 });
  587 | 
  588 |       // Click confirm Hapus button
  589 |       const confirmHapusBtn = modal.getByRole('button', { name: /Hapus|Ya/i }).first();
  590 |       await expect(confirmHapusBtn).toBeVisible();
  591 | 
  592 |       await Promise.all([
  593 |         page.waitForResponse(res => res.url().includes('/promotion/special-price') && res.request().method() === 'DELETE' && (res.status() === 200 || res.status() === 204), { timeout: 20000 }).catch(() => null),
  594 |         confirmHapusBtn.click(),
  595 |       ]);
  596 | 
  597 |       // Verify modal closed
  598 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
  599 | 
  600 |       // Verify deleted item is no longer in table
  601 |       if (created) {
  602 |         await expect(page.locator('table:visible').getByText(itemToDelete)).not.toBeVisible({ timeout: 10000 });
  603 |       }
  604 |     });
  605 |   });
  606 | });
  607 | 
```