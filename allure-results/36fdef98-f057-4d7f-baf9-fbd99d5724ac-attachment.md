# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Promosi/harga_spesial.spec.js >> Harga Spesial >> [TC-12] Hapus harga spesial berhasil dengan konfirmasi modal
- Location: tests/Promosi/harga_spesial.spec.js:523:3

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
  499 |       // Delete button is the button in the action column
  500 |       const deleteBtn = targetRow.locator('button').last();
  501 |       await expect(deleteBtn).toBeVisible({ timeout: 5000 });
  502 |       await deleteBtn.click();
  503 | 
  504 |       // Verify confirmation modal appears
  505 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  506 |       await expect(modal).toBeVisible({ timeout: 5000 });
  507 |       await expect(modal.getByText(/Hapus|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });
  508 | 
  509 |       // Click Batal
  510 |       const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  511 |       await expect(cancelBtn).toBeVisible();
  512 |       await cancelBtn.click();
  513 | 
  514 |       // Verify modal closed
  515 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  516 | 
  517 |       // Verify promo still exists in table
  518 |       await expect(page.locator('table:visible').getByText(targetName)).toBeVisible({ timeout: 5000 });
  519 |     
  520 |     });
  521 |   });
  522 | 
  523 |   test('[TC-12] Hapus harga spesial berhasil dengan konfirmasi modal', async ({ page }) => {
  524 |     await test.step('Lakukan proses hapus harga spesial berhasil dengan konfirmasi modal dan konfirmasi penghapusan data', async () => {
  525 |       // Create a promo specifically for deletion or use existing
  526 |       const itemToDelete = 'Delete Target ' + Date.now();
  527 |       const created = await createSpecialPricePromo(page, itemToDelete);
  528 | 
  529 |       let targetRow;
  530 |       if (created) {
  531 |         targetRow = page.locator('table:visible tbody tr').filter({ hasText: itemToDelete }).first();
  532 |       } else {
  533 |         const dataRows = getDataRows(page);
  534 |         if (await dataRows.count() === 0) {
> 535 |           await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
      |                                                                                                                   ^ Error: expect(locator).toBeVisible() failed
  536 |           return;
  537 |         }
  538 |         targetRow = dataRows.first();
  539 |       }
  540 | 
  541 |       await expect(targetRow).toBeVisible({ timeout: 15000 });
  542 | 
  543 |       // Click delete button
  544 |       const deleteBtn = targetRow.locator('button').last();
  545 |       await expect(deleteBtn).toBeVisible({ timeout: 5000 });
  546 |       await deleteBtn.click();
  547 | 
  548 |       // Verify confirmation modal appears
  549 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  550 |       await expect(modal).toBeVisible({ timeout: 5000 });
  551 | 
  552 |       // Click confirm Hapus button
  553 |       const confirmHapusBtn = modal.getByRole('button', { name: /Hapus|Ya/i }).first();
  554 |       await expect(confirmHapusBtn).toBeVisible();
  555 | 
  556 |       await Promise.all([
  557 |         page.waitForResponse(res => res.url().includes('/promotion/special-price') && res.request().method() === 'DELETE' && (res.status() === 200 || res.status() === 204), { timeout: 20000 }).catch(() => null),
  558 |         confirmHapusBtn.click(),
  559 |       ]);
  560 | 
  561 |       // Verify modal closed
  562 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
  563 | 
  564 |       // Verify deleted item is no longer in table
  565 |       if (created) {
  566 |         await expect(page.locator('table:visible').getByText(itemToDelete)).not.toBeVisible({ timeout: 10000 });
  567 |       }
  568 |     });
  569 |   });
  570 | });
  571 | 
```