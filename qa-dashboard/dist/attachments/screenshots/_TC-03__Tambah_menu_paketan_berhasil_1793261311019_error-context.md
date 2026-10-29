# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/menu.spec.js >> Manajemen Menu >> [TC-03] Tambah menu paketan berhasil
- Location: tests/Kasflo-Resto/Katalog/menu.spec.js:199:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin\/catalog\/menu$/
Received string:  "https://backoffice-dev.kasflo.id/admin/catalog/menu/package/add"
Timeout: 25000ms

Call log:
  - Expect "toHaveURL" with timeout 25000ms
    53 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
       - unexpected value "https://backoffice-dev.kasflo.id/admin/catalog/menu/package/add"

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
  - link "Kategori":
    - /url: /admin/catalog/category
  - link "Menu":
    - /url: /admin/catalog/menu
  - link "Varian":
    - /url: /admin/catalog/variant
  - link "Buku Menu":
    - /url: /admin/catalog/book-menu
  - link "Manajemen Stok":
    - /url: /admin/catalog/stock
  - link "Menu Self Order":
    - /url: /admin/catalog/self-order-menu
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
  - paragraph: Menu
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
  - link "Menu":
    - /url: /admin/catalog/menu
  - text: /
  - paragraph: Tambah Menu Paketan
  - paragraph: Error, Mohon Periksa Kembali Form Anda
  - button "Batalkan"
  - button "Simpan"
  - paragraph: Tambah Menu Paketan
  - heading "Informasi Menu" [level=5]
  - text: Nama Menu Paketan
  - textbox "Nama Menu Paketan":
    - /placeholder: Masukkan Nama Menu
    - text: Paket Hemat 1793260432062
  - text: Kode Menu
  - textbox "Kode Menu":
    - /placeholder: Masukkan Kode Menu
    - text: PKT43220960
  - text: Kategori Menu
  - textbox "Kategori Menu":
    - /placeholder: Pilih Kategori Menu
  - button:
    - img
  - button:
    - img
  - link:
    - /url: /admin/catalog/category/add
    - img
  - text: Deskripsi
  - textbox "Deskripsi":
    - /placeholder: Masukkan Deskripsi
  - text: Status Menu
  - switch "Aktif" [checked]
  - text: Aktif
  - heading "Buku Menu" [level=5]
  - button "Tambah Buku Menu":
    - img
    - text: Tambah Buku Menu
  - table:
    - rowgroup:
      - row "# Nama Buku Menu Harga Status Action":
        - cell "#"
        - cell "Nama Buku Menu"
        - cell "Harga"
        - cell "Status"
        - cell "Action"
    - rowgroup:
      - row "1 Init BM SelfOrder 1792998973976 Rp 25.000":
        - cell "1"
        - cell "Init BM SelfOrder 1792998973976":
          - textbox "Pilih Buku Menu": Init BM SelfOrder 1792998973976
          - button:
            - img
          - link:
            - /url: /admin/catalog/book-menu/add
            - img
        - cell "Rp 25.000":
          - text: Rp
          - textbox: "25.000"
        - cell:
          - switch [checked]
        - cell:
          - button:
            - img
  - heading "Isi Paket" [level=5]
  - button "Tambah Isi Paket":
    - img
    - text: Tambah Isi Paket
  - table:
    - rowgroup:
      - row "# Isi Menu Paket Qty Action":
        - cell "#"
        - cell "Isi Menu Paket"
        - cell "Qty"
        - cell "Action"
    - rowgroup:
      - row "1 Test Menu 1793260367981 Wajib diisi":
        - cell "1"
        - cell "Test Menu 1793260367981":
          - textbox "Pilih Menu": Test Menu 1793260367981
          - button:
            - img
          - button:
            - img
          - link:
            - /url: /admin/catalog/menu/unit/add
            - img
        - cell "Wajib diisi":
          - textbox [invalid]
          - paragraph: Wajib diisi
        - cell:
          - button [disabled]:
            - img
  - heading "Menu Terkait" [level=5]
  - button "Tambah":
    - img
    - text: Tambah
  - table:
    - rowgroup:
      - row "# Daftar Menu Action":
        - cell "#"
        - cell "Daftar Menu"
        - cell "Action"
    - rowgroup
  - heading "Gambar" [level=5]
  - img
  - paragraph: Masukan Gambar dengan cara seret & lepas atau klik area ini
  - paragraph: Gunakan file .jpg/.png & maks. 5 MB. Ukuran rekomendasi 512px X 512px
  - heading "Lencana Menu" [level=5]
  - img
  - heading "Preview Menu" [level=5]
  - img
  - heading "Paket Hemat 1793260432062" [level=5]
  - paragraph: Deskripsi
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  166 |   });
  167 | 
  168 |   test('[TC-01] Menampilkan halaman menu dengan tabel', async ({ page }) => {
  169 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman menu dengan tabel', async () => {
  170 |       // Verify page title
  171 |       await expect(page.getByText('Menu').first()).toBeVisible();
  172 | 
  173 |       // Check if table exists
  174 |       const table = page.locator('table');
  175 |       await expect(table).toBeVisible();
  176 | 
  177 |       // Verify table headers
  178 |       const tableHeader = page.locator('thead');
  179 |       await expect(tableHeader.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
  180 |       await expect(tableHeader.getByText('Kode', { exact: true }).first()).toBeVisible();
  181 |       await expect(tableHeader.getByText('Kategori', { exact: true }).first()).toBeVisible();
  182 |       await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
  183 |       await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
  184 | 
  185 |     });
  186 |   });
  187 | 
  188 |   test('[TC-02] Tambah menu satuan berhasil', async ({ page }) => {
  189 |     await test.step('Lakukan proses tambah menu satuan berhasil dan pastikan data tersimpan', async () => {
  190 |       const menuName = 'Test Menu ' + Date.now();
  191 |       await createMenuUnit(page, menuName);
  192 | 
  193 |       // Verify created menu is visible in table
  194 |       await expect(page.locator('table').getByText(menuName).first()).toBeVisible({ timeout: 15000 });
  195 | 
  196 |     });
  197 |   });
  198 | 
  199 |   test('[TC-03] Tambah menu paketan berhasil', async ({ page }) => {
  200 |     await test.step('Lakukan proses tambah menu paketan berhasil dan pastikan data tersimpan', async () => {
  201 |       // Pastikan minimal 1 menu satuan ada terlebih dahulu sebagai isi paket
  202 |       await ensureMenuExists(page);
  203 | 
  204 |       // Beralih ke tab Menu Paketan
  205 |       const menuPaketanTab = page.getByRole('tab', { name: 'Menu Paketan' });
  206 |       await expect(menuPaketanTab).toBeVisible({ timeout: 10000 });
  207 |       await expect(menuPaketanTab).toBeEnabled();
  208 |       await menuPaketanTab.click();
  209 |       await waitForPageReady(page);
  210 | 
  211 |       // Klik tombol Tambah Menu Paketan
  212 |       const addPackageBtn = page.getByRole('link', { name: 'Tambah Menu Paketan' }).or(page.getByRole('button', { name: 'Tambah Menu Paketan' })).first();
  213 |       await expect(addPackageBtn).toBeVisible({ timeout: 10000 });
  214 |       await expect(addPackageBtn).toBeEnabled();
  215 |       await addPackageBtn.click();
  216 | 
  217 |       // Verifikasi navigasi ke halaman form tambah menu paketan
  218 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/package\/add/, { timeout: 15000 });
  219 |       await waitForPageReady(page);
  220 | 
  221 |       const packageName = 'Paket Hemat ' + Date.now();
  222 | 
  223 |       // 1. Isi Nama Menu Paketan
  224 |       const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
  225 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  226 |       await expect(nameInput).toBeEnabled();
  227 |       await nameInput.fill(packageName);
  228 | 
  229 |       // 2. Isi Kode Menu
  230 |       const codeInput = page.getByPlaceholder('Masukkan Kode Menu').or(page.getByLabel(/Kode Menu/i)).first();
  231 |       if (await codeInput.isVisible().catch(() => false)) {
  232 |         const uniquePkgCode = 'PKT' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10);
  233 |         await codeInput.fill(uniquePkgCode);
  234 |       }
  235 | 
  236 |       // 3. Isi Harga pada tabel Buku Menu (kolom ke-3: Harga, bukan kolom Pilih Buku Menu)
  237 |       await fillBukuMenuTablePrice(page, '25000');
  238 | 
  239 |       // 4. Pilih Isi Menu Paket
  240 |       const selectMenuInput = page.locator('input[placeholder*="Pilih Menu"]').first();
  241 |       await expect(selectMenuInput).toBeVisible({ timeout: 10000 });
  242 |       await expect(selectMenuInput).toBeEnabled();
  243 |       await selectMenuInput.click();
  244 | 
  245 |       // Pilih opsi pertama yang aktif dari dropdown
  246 |       const visibleDropdown = page.locator('.mantine-Select-dropdown:visible, .mantine-Combobox-dropdown:visible, [data-combobox-dropdown]:visible').first();
  247 |       const firstOption = visibleDropdown.locator('[role="option"]').first();
  248 |       await expect(firstOption).toBeVisible({ timeout: 10000 });
  249 |       await firstOption.click();
  250 | 
  251 |       // 5. Isi Qty isi paket
  252 |       const isiPaketTable = page.locator('table').nth(1);
  253 |       const qtyInput = isiPaketTable.locator('tbody tr').first().locator('td').nth(1).locator('input').first()
  254 |         .or(isiPaketTable.locator('input[type="text"], input[type="number"]').last());
  255 |       await expect(qtyInput.first()).toBeVisible({ timeout: 10000 });
  256 |       await expect(qtyInput.first()).toBeEnabled();
  257 |       await qtyInput.first().fill('1');
  258 | 
  259 |       // 6. Klik tombol Simpan
  260 |       const saveBtn = page.getByRole('button', { name: 'Simpan' });
  261 |       await expect(saveBtn).toBeVisible({ timeout: 10000 });
  262 |       await expect(saveBtn).toBeEnabled({ timeout: 10000 });
  263 |       await saveBtn.click();
  264 | 
  265 |       // Verifikasi berhasil disimpan dan kembali ke list menu
> 266 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 25000 });
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  267 |       await expect(page.getByText(/Berhasil|Success/i).first()).toBeVisible({ timeout: 15000 });
  268 |       await waitForPageReady(page);
  269 | 
  270 |       // Buka tab Menu Paketan dan pastikan paket baru tampil
  271 |       await expect(menuPaketanTab).toBeVisible({ timeout: 10000 });
  272 |       await menuPaketanTab.click();
  273 |       await waitForPageReady(page);
  274 |       await expect(page.locator('table').getByText(packageName).first()).toBeVisible({ timeout: 15000 });
  275 |     });
  276 |   });
  277 | 
  278 |   test('[TC-04] Edit menu dengan ikon edit', async ({ page }) => {
  279 |     await test.step('Lakukan pengujian edit menu dengan ikon edit dan verifikasi pembaruan data', async () => {
  280 |       await ensureMenuExists(page);
  281 | 
  282 |       const dataRows = getDataRows(page);
  283 |       const firstRow = dataRows.first();
  284 |       const editLink = firstRow.locator('a[href*="/edit/"]').first();
  285 |       await expect(editLink).toBeVisible({ timeout: 15000 });
  286 |       await editLink.click();
  287 | 
  288 |       // Wait for edit page to load
  289 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/unit\/edit\/.*/, { timeout: 15000 });
  290 |       await waitForPageReady(page);
  291 | 
  292 |       // Find name input and modify
  293 |       const updatedName = 'Updated Menu ' + Date.now();
  294 |       const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
  295 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  296 |       await expect(nameInput).toBeEnabled();
  297 |       await nameInput.fill(updatedName);
  298 | 
  299 |       // Save changes
  300 |       const saveBtn = page.getByRole('button', { name: 'Simpan' });
  301 |       await expect(saveBtn).toBeVisible({ timeout: 10000 });
  302 |       await expect(saveBtn).toBeEnabled({ timeout: 10000 });
  303 |       await saveBtn.click();
  304 | 
  305 |       // Verify returning to menu list page
  306 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 25000 });
  307 |       await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
  308 |     });
  309 |   });
  310 | 
  311 |   test('[TC-05] Hapus menu dengan ikon trash', async ({ page }) => {
  312 |     await test.step('Lakukan proses hapus menu dengan ikon trash dan konfirmasi penghapusan data', async () => {
  313 |       // Pastikan ada menu di tabel
  314 |       await ensureMenuExists(page);
  315 | 
  316 |       // Tunggu baris pertama yang memiliki teks nama menu (mencegah pembacaan sel kosong akibat virtualisasi tabel)
  317 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
  318 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  319 |       const menuNameToDelete = (await targetCell.innerText()).trim();
  320 |       expect(menuNameToDelete.length).toBeGreaterThan(0);
  321 | 
  322 |       const targetRow = page.locator('table tbody tr').filter({ hasText: menuNameToDelete }).first();
  323 | 
  324 |       // Klik tombol trash pada baris menu tersebut
  325 |       const deleteBtn = targetRow.locator('td').last().locator('button').last();
  326 |       await expect(deleteBtn).toBeVisible({ timeout: 10000 });
  327 |       await expect(deleteBtn).toBeEnabled({ timeout: 10000 });
  328 |       await deleteBtn.click();
  329 | 
  330 |       // Modal dialog konfirmasi harus muncul
  331 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  332 |       await expect(modal).toBeVisible({ timeout: 5000 });
  333 |       await expect(modal.getByText(/Hapus Menu Satuan|Apakah anda yakin/i).first()).toBeVisible();
  334 | 
  335 |       const confirmBtn = modal.getByRole('button', { name: 'Hapus' });
  336 |       await expect(confirmBtn).toBeVisible({ timeout: 5000 });
  337 |       await expect(confirmBtn).toBeEnabled({ timeout: 5000 });
  338 | 
  339 |       // Tunggu request DELETE ke backend selesai dengan response 200 OK
  340 |       const [response] = await Promise.all([
  341 |         page.waitForResponse(res => res.request().method() === 'DELETE' && res.status() === 200, { timeout: 15000 }),
  342 |         confirmBtn.click(),
  343 |       ]);
  344 |       expect(response.status()).toBe(200);
  345 | 
  346 |       // Pastikan modal tertutup
  347 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  348 | 
  349 |       // Verifikasi bahwa menu yang dihapus tidak lagi ada di tabel
  350 |       await expect(page.locator('table').getByText(menuNameToDelete)).not.toBeVisible({ timeout: 10000 });
  351 | 
  352 |       // Verifikasi ulang lewat search box untuk memastikan data benar-benar terhapus di backend
  353 |       const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari/i)).first();
  354 |       if (await searchInput.isVisible().catch(() => false)) {
  355 |         await searchInput.fill(menuNameToDelete);
  356 |         await expect(page.locator('table').getByText(menuNameToDelete)).not.toBeVisible({ timeout: 5000 });
  357 |         await searchInput.clear();
  358 |       }
  359 | 
  360 |     });
  361 |   });
  362 | 
  363 |   test('[TC-06] Cari/filter menu dengan search box', async ({ page }) => {
  364 |     await test.step('Lakukan pengujian cari/filter menu dengan search box dan validasi hasil yang ditampilkan', async () => {
  365 |       await ensureMenuExists(page);
  366 | 
```