# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/manajemen_stok.spec.js >> Manajemen Stok >> [TC-12] Validasi perilaku stok pada menu paketan: input stok dan stok unlimited disabled
- Location: tests/Kasflo-Resto/Katalog/manajemen_stok.spec.js:527:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))').first().locator('a[href*="/edit/"]').first()

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
        - generic [ref=f1e28]:
          - link "Kategori" [ref=f1e29] [cursor=pointer]:
            - /url: /admin/catalog/category
          - link "Menu" [ref=f1e31] [cursor=pointer]:
            - /url: /admin/catalog/menu
          - link "Varian" [ref=f1e33] [cursor=pointer]:
            - /url: /admin/catalog/variant
          - link "Buku Menu" [ref=f1e35] [cursor=pointer]:
            - /url: /admin/catalog/book-menu
          - link "Manajemen Stok" [ref=f1e37] [cursor=pointer]:
            - /url: /admin/catalog/stock
          - link "Menu Self Order" [ref=f1e39] [cursor=pointer]:
            - /url: /admin/catalog/self-order-menu
        - link [ref=f1e41] [cursor=pointer]:
          - /url: /admin/ingredients
          - paragraph [ref=f1e49]: Bahan Baku
        - link [ref=f1e53] [cursor=pointer]:
          - /url: /admin/promotion
          - paragraph [ref=f1e61]: Promosi
        - link [ref=f1e65] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f1e74]: Pelanggan
        - link [ref=f1e78] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f1e86]: Pembukuan
        - link [ref=f1e90] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f1e98]: Laporan Usaha
        - link [ref=f1e102] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f1e110]: Manajemen User
        - link [ref=f1e114] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f1e121]: Pengaturan
        - link [ref=f1e125] [cursor=pointer]:
          - /url: /admin/subscription
          - paragraph [ref=f1e132]: Berlangganan
    - main [ref=f1e133]:
      - generic [ref=f1e134]:
        - generic [ref=f1e135]:
          - paragraph [ref=f1e136]: Subscription akan berakhir dalam 7 hari.
          - link [ref=f1e137] [cursor=pointer]:
            - /url: /admin/subscription?tab=history-subscription
            - paragraph [ref=f1e138]: Kunjungi Halaman Berlangganan
        - generic [ref=f1e140]:
          - paragraph [ref=f1e145]: Manajemen Stok
          - generic [ref=f1e146]:
            - button "Business" [ref=f1e148] [cursor=pointer]
            - button "Saldo QRIS" [ref=f1e156] [cursor=pointer]
            - button [ref=f1e162] [cursor=pointer]:
              - generic [ref=f1e169]:
                - paragraph [ref=f1e170]: Kasflo Automation
                - paragraph [ref=f1e171]: OWNER
        - generic [ref=f1e176]:
          - link [ref=f1e177] [cursor=pointer]:
            - /url: /admin/dashboard
          - generic [ref=f1e181]: /
          - paragraph [ref=f1e182]: Manajemen Stok
        - generic [ref=f1e186]:
          - generic [ref=f1e188]:
            - textbox "Cari disini..." [ref=f1e191]
            - generic [ref=f1e193]:
              - button "Show/Hide columns" [ref=f1e194] [cursor=pointer]
              - button "Toggle full screen" [ref=f1e197] [cursor=pointer]
          - table [ref=f1e205]:
            - rowgroup [ref=f1e206]:
              - row [ref=f1e207]:
                - columnheader "Cabang Sort by Cabang descending Move Column Actions" [ref=f1e208]:
                  - generic [ref=f1e209]:
                    - generic [ref=f1e210] [cursor=pointer]:
                      - generic [ref=f1e211]: Cabang
                      - button "Sort by Cabang descending" [ref=f1e212]
                    - generic [ref=f1e217]:
                      - button "Move" [ref=f1e218]
                      - button "Column Actions" [ref=f1e227] [cursor=pointer]
                - columnheader "Action" [ref=f1e233]
            - rowgroup [ref=f1e237]:
              - row [ref=f1e238]:
                - cell [ref=f1e239]:
                  - generic [ref=f1e241]:
                    - img "not-found" [ref=f1e242]
                    - paragraph [ref=f1e243]: Belum Ada Data
            - rowgroup
          - generic [ref=f1e247]:
            - generic [ref=f1e248]:
              - paragraph [ref=f1e249]: Rows per page
              - textbox "Rows per page" [ref=f1e252] [cursor=pointer]: "25"
            - paragraph [ref=f1e253]: 0-0 of 0
            - generic [ref=f1e254]:
              - button "Go to previous page" [disabled] [ref=f1e255]
              - button "Go to next page" [disabled] [ref=f1e259]
  - link "Konsultasi Sekarang" [ref=f1e263] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```

# Test source

```ts
  438 |         await page.waitForTimeout(300);
  439 |       }
  440 |       if ((await unlimitedSwitch.innerText()).includes('Aktif')) {
  441 |         await unlimitedSwitch.click();
  442 |         await page.waitForTimeout(300);
  443 |       }
  444 | 
  445 |       // Ubah nilai stok kuantitas
  446 |       const newStockVal = '30';
  447 |       await stockInput.fill(newStockVal);
  448 |       expect(await stockInput.inputValue()).toBe(newStockVal);
  449 | 
  450 |       // Klik Simpan dan pantau respons HTTP 200 POST dari backend API
  451 |       const simpanBtn = page.getByRole('button', { name: 'Simpan' });
  452 |       await expect(simpanBtn).toBeVisible({ timeout: 5000 });
  453 | 
  454 |       const [response] = await Promise.all([
  455 |         page.waitForResponse(res => res.request().method() === 'POST' && res.url().includes('/product/self-order-menu/') && res.status() === 200, { timeout: 20000 }),
  456 |         simpanBtn.click(),
  457 |       ]);
  458 |       expect(response.status()).toBe(200);
  459 | 
  460 |       // Verifikasi toast notifikasi sukses dan redirect ke list stok
  461 |       await expect(page.getByText(/Stok Berhasil Diupdate|Berhasil/i).first()).toBeVisible({ timeout: 10000 });
  462 |       await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
  463 |     
  464 |     });
  465 |   });
  466 | 
  467 |   test('[TC-11] Mengubah nilai stok menu per kategori dan menyimpan perubahan berhasil (per kategori)', async ({ page }) => {
  468 |     await test.step('Lakukan pengujian mengubah nilai stok menu per kategori dan menyimpan perubahan berhasil (per kategori) dan verifikasi pembaruan data', async () => {
  469 |       await ensureStockExists(page);
  470 | 
  471 |       const dataRows = getDataRows(page);
  472 |       if (await dataRows.count() === 0) {
  473 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  474 |         return;
  475 |       }
  476 | 
  477 |       const targetRow = dataRows.first();
  478 |       await targetRow.locator('a[href*="/edit/"]').first().click();
  479 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  480 | 
  481 |       // Tunggu tombol kategori pertama tampil dan ter-render
  482 |       const firstCatBtn = page.locator('button:visible').filter({ hasText: /Test Cat|Tanpa Kategori/i }).first();
  483 |       await expect(firstCatBtn).toBeVisible({ timeout: 15000 });
  484 | 
  485 |       // Dapatkan daftar tab tombol kategori yang tampil
  486 |       const categoryButtons = page.locator('button:visible').filter({ hasText: /Test Cat|Tanpa Kategori/i });
  487 |       const catCount = await categoryButtons.count();
  488 |       expect(catCount).toBeGreaterThan(0);
  489 | 
  490 |       // Edit stok pada kategori pertama
  491 |       await firstCatBtn.click();
  492 |       await page.waitForTimeout(1000);
  493 | 
  494 |       const firstCatRow = page.locator('table tbody tr').first();
  495 |       const firstStockInput = firstCatRow.locator('input[type="text"], input[type="number"]').last();
  496 |       if (!await firstStockInput.isDisabled()) {
  497 |         await firstStockInput.fill('25');
  498 |       }
  499 | 
  500 |       // Jika ada lebih dari 1 kategori, beralih ke kategori kedua dan edit stoknya
  501 |       if (catCount > 1) {
  502 |         const secondCatBtn = categoryButtons.nth(1);
  503 |         await secondCatBtn.click();
  504 |         await page.waitForTimeout(1000);
  505 | 
  506 |         const secondCatRow = page.locator('table tbody tr').first();
  507 |         const secondStockInput = secondCatRow.locator('input[type="text"], input[type="number"]').last();
  508 |         if (!await secondStockInput.isDisabled()) {
  509 |           await secondStockInput.fill('35');
  510 |         }
  511 |       }
  512 | 
  513 |       // Simpan seluruh perubahan per kategori
  514 |       const simpanBtn = page.getByRole('button', { name: 'Simpan' });
  515 |       const [response] = await Promise.all([
  516 |         page.waitForResponse(res => res.request().method() === 'POST' && res.url().includes('/product/self-order-menu/') && res.status() === 200, { timeout: 20000 }),
  517 |         simpanBtn.click(),
  518 |       ]);
  519 |       expect(response.status()).toBe(200);
  520 | 
  521 |       await expect(page.getByText(/Stok Berhasil Diupdate|Berhasil/i).first()).toBeVisible({ timeout: 10000 });
  522 |       await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
  523 |     
  524 |     });
  525 |   });
  526 | 
  527 |   test('[TC-12] Validasi perilaku stok pada menu paketan: input stok dan stok unlimited disabled', async ({ page }) => {
  528 |     await test.step('Validasi perilaku stok pada menu paketan: input stok dan stok unlimited disabled', async () => {
  529 |       await ensureStockExists(page);
  530 | 
  531 |       const dataRows = getDataRows(page);
  532 |       if (await dataRows.count() === 0) {
  533 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  534 |         return;
  535 |       }
  536 | 
  537 |       const targetRow = dataRows.first();
> 538 |       await targetRow.locator('a[href*="/edit/"]').first().click();
      |                                                            ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  539 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  540 | 
  541 |       // Beralih ke Tanpa Kategori (tempat menu paket berada)
  542 |       const tanpaKategoriBtn = page.locator('button:visible').filter({ hasText: 'Tanpa Kategori' }).first();
  543 |       await expect(tanpaKategoriBtn).toBeVisible({ timeout: 15000 });
  544 |       await tanpaKategoriBtn.click();
  545 |       await page.waitForTimeout(1000);
  546 | 
  547 |       // Cari baris menu paketan
  548 |       const paketRow = page.locator('table tbody tr').filter({ hasText: /Paket/i }).first();
  549 |       if (await paketRow.isVisible()) {
  550 |         const unlimitedSwitchInput = paketRow.locator('.mantine-Switch-root').nth(1).locator('input');
  551 |         const stockInput = paketRow.locator('input[type="text"], input[type="number"]').last();
  552 | 
  553 |         // Pada Menu Paketan, Stok Unlimited dan Input Stok harus disabled
  554 |         await expect(unlimitedSwitchInput).toBeDisabled();
  555 |         await expect(stockInput).toBeDisabled();
  556 |       }
  557 | 
  558 |       // Batalkan
  559 |       await page.getByRole('button', { name: 'Batalkan' }).click();
  560 |       await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
  561 |     
  562 |     });
  563 |   });
  564 | 
  565 |   test('[TC-13] Tombol batalkan pada halaman edit mengembalikan pengguna ke halaman list stok', async ({ page }) => {
  566 |     await test.step('Langkah Pengujian UAT: Tombol batalkan pada halaman edit mengembalikan pengguna ke halaman list stok', async () => {
  567 |       await ensureStockExists(page);
  568 | 
  569 |       const dataRows = getDataRows(page);
  570 |       if (await dataRows.count() === 0) {
  571 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  572 |         return;
  573 |       }
  574 | 
  575 |       const targetRow = dataRows.first();
  576 |       await targetRow.locator('a[href*="/edit/"]').first().click();
  577 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  578 | 
  579 |       // Click Batalkan
  580 |       const cancelBtn = page.getByRole('button', { name: 'Batalkan' });
  581 |       await expect(cancelBtn).toBeVisible({ timeout: 10000 });
  582 |       await cancelBtn.click();
  583 | 
  584 |       // Verify navigation back to stock list page
  585 |       await expect(page).toHaveURL(/\/admin\/catalog\/stock$/, { timeout: 15000 });
  586 |       await expect(page.locator('table')).toBeVisible({ timeout: 10000 });
  587 |     
  588 |     });
  589 |   });
  590 | });
  591 | 
```