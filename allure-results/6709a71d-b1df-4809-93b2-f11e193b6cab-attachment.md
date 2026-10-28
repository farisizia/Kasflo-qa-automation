# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/menu.spec.js >> Manajemen Menu >> [TC-03] Tambah menu paketan berhasil
- Location: tests/Kasflo-Resto/Katalog/menu.spec.js:201:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin\/catalog\/menu$/
Received string:  "https://backoffice-dev.kasflo.id/admin/catalog/menu/package/add"
Timeout: 25000ms

Call log:
  - Expect "toHaveURL" with timeout 25000ms
    52 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
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
    - text: Paket Hemat 1793179396178
  - text: Kode Menu
  - textbox "Kode Menu":
    - /placeholder: Masukkan Kode Menu
    - text: PKT39631590
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
      - row "1 Test Menu 1793179325971 Wajib diisi":
        - cell "1"
        - cell "Test Menu 1793179325971":
          - textbox "Pilih Menu": Test Menu 1793179325971
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
  - heading "Paket Hemat 1793179396178" [level=5]
  - paragraph: Deskripsi
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  168 |   });
  169 | 
  170 |   test('[TC-01] Menampilkan halaman menu dengan tabel', async ({ page }) => {
  171 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman menu dengan tabel', async () => {
  172 |       // Verify page title
  173 |       await expect(page.getByText('Menu').first()).toBeVisible();
  174 | 
  175 |       // Check if table exists
  176 |       const table = page.locator('table');
  177 |       await expect(table).toBeVisible();
  178 | 
  179 |       // Verify table headers
  180 |       const tableHeader = page.locator('thead');
  181 |       await expect(tableHeader.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
  182 |       await expect(tableHeader.getByText('Kode', { exact: true }).first()).toBeVisible();
  183 |       await expect(tableHeader.getByText('Kategori', { exact: true }).first()).toBeVisible();
  184 |       await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
  185 |       await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
  186 |     
  187 |     });
  188 |   });
  189 | 
  190 |   test('[TC-02] Tambah menu satuan berhasil', async ({ page }) => {
  191 |     await test.step('Lakukan proses tambah menu satuan berhasil dan pastikan data tersimpan', async () => {
  192 |       const menuName = 'Test Menu ' + Date.now();
  193 |       await createMenuUnit(page, menuName);
  194 | 
  195 |       // Verify created menu is visible in table
  196 |       await expect(page.locator('table').getByText(menuName).first()).toBeVisible({ timeout: 15000 });
  197 |     
  198 |     });
  199 |   });
  200 | 
  201 |   test('[TC-03] Tambah menu paketan berhasil', async ({ page }) => {
  202 |     await test.step('Lakukan proses tambah menu paketan berhasil dan pastikan data tersimpan', async () => {
  203 |       // Pastikan minimal 1 menu satuan ada terlebih dahulu sebagai isi paket
  204 |       await ensureMenuExists(page);
  205 | 
  206 |       // Beralih ke tab Menu Paketan
  207 |       const menuPaketanTab = page.getByRole('tab', { name: 'Menu Paketan' });
  208 |       await expect(menuPaketanTab).toBeVisible({ timeout: 10000 });
  209 |       await expect(menuPaketanTab).toBeEnabled();
  210 |       await menuPaketanTab.click();
  211 |       await waitForPageReady(page);
  212 | 
  213 |       // Klik tombol Tambah Menu Paketan
  214 |       const addPackageBtn = page.getByRole('link', { name: 'Tambah Menu Paketan' }).or(page.getByRole('button', { name: 'Tambah Menu Paketan' })).first();
  215 |       await expect(addPackageBtn).toBeVisible({ timeout: 10000 });
  216 |       await expect(addPackageBtn).toBeEnabled();
  217 |       await addPackageBtn.click();
  218 | 
  219 |       // Verifikasi navigasi ke halaman form tambah menu paketan
  220 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/package\/add/, { timeout: 15000 });
  221 |       await waitForPageReady(page);
  222 | 
  223 |       const packageName = 'Paket Hemat ' + Date.now();
  224 | 
  225 |       // 1. Isi Nama Menu Paketan
  226 |       const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
  227 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  228 |       await expect(nameInput).toBeEnabled();
  229 |       await nameInput.fill(packageName);
  230 | 
  231 |       // 2. Isi Kode Menu
  232 |       const codeInput = page.getByPlaceholder('Masukkan Kode Menu').or(page.getByLabel(/Kode Menu/i)).first();
  233 |       if (await codeInput.isVisible().catch(() => false)) {
  234 |         const uniquePkgCode = 'PKT' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10);
  235 |         await codeInput.fill(uniquePkgCode);
  236 |       }
  237 | 
  238 |       // 3. Isi Harga pada tabel Buku Menu (kolom ke-3: Harga, bukan kolom Pilih Buku Menu)
  239 |       await fillBukuMenuTablePrice(page, '25000');
  240 | 
  241 |       // 4. Pilih Isi Menu Paket
  242 |       const selectMenuInput = page.locator('input[placeholder*="Pilih Menu"]').first();
  243 |       await expect(selectMenuInput).toBeVisible({ timeout: 10000 });
  244 |       await expect(selectMenuInput).toBeEnabled();
  245 |       await selectMenuInput.click();
  246 | 
  247 |       // Pilih opsi pertama yang aktif dari dropdown
  248 |       const visibleDropdown = page.locator('.mantine-Select-dropdown:visible, .mantine-Combobox-dropdown:visible, [data-combobox-dropdown]:visible').first();
  249 |       const firstOption = visibleDropdown.locator('[role="option"]').first();
  250 |       await expect(firstOption).toBeVisible({ timeout: 10000 });
  251 |       await firstOption.click();
  252 | 
  253 |       // 5. Isi Qty isi paket
  254 |       const isiPaketTable = page.locator('table').nth(1);
  255 |       const qtyInput = isiPaketTable.locator('tbody tr').first().locator('td').nth(1).locator('input').first()
  256 |         .or(isiPaketTable.locator('input[type="text"], input[type="number"]').last());
  257 |       await expect(qtyInput.first()).toBeVisible({ timeout: 10000 });
  258 |       await expect(qtyInput.first()).toBeEnabled();
  259 |       await qtyInput.first().fill('1');
  260 | 
  261 |       // 6. Klik tombol Simpan
  262 |       const saveBtn = page.getByRole('button', { name: 'Simpan' });
  263 |       await expect(saveBtn).toBeVisible({ timeout: 10000 });
  264 |       await expect(saveBtn).toBeEnabled({ timeout: 10000 });
  265 |       await saveBtn.click();
  266 | 
  267 |       // Verifikasi berhasil disimpan dan kembali ke list menu
> 268 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 25000 });
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  269 |       await expect(page.getByText(/Berhasil|Success/i).first()).toBeVisible({ timeout: 15000 });
  270 |       await waitForPageReady(page);
  271 | 
  272 |       // Buka tab Menu Paketan dan pastikan paket baru tampil
  273 |       await expect(menuPaketanTab).toBeVisible({ timeout: 10000 });
  274 |       await menuPaketanTab.click();
  275 |       await waitForPageReady(page);
  276 |       await expect(page.locator('table').getByText(packageName).first()).toBeVisible({ timeout: 15000 });
  277 |     });
  278 |   });
  279 | 
  280 |   test('[TC-04] Edit menu dengan ikon edit', async ({ page }) => {
  281 |     await test.step('Lakukan pengujian edit menu dengan ikon edit dan verifikasi pembaruan data', async () => {
  282 |       await ensureMenuExists(page);
  283 | 
  284 |       const dataRows = getDataRows(page);
  285 |       const firstRow = dataRows.first();
  286 |       const editLink = firstRow.locator('a[href*="/edit/"]').first();
  287 |       await expect(editLink).toBeVisible({ timeout: 15000 });
  288 |       await editLink.click();
  289 | 
  290 |       // Wait for edit page to load
  291 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/unit\/edit\/.*/, { timeout: 15000 });
  292 |       await waitForPageReady(page);
  293 | 
  294 |       // Find name input and modify
  295 |       const updatedName = 'Updated Menu ' + Date.now();
  296 |       const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
  297 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  298 |       await expect(nameInput).toBeEnabled();
  299 |       await nameInput.fill(updatedName);
  300 | 
  301 |       // Save changes
  302 |       const saveBtn = page.getByRole('button', { name: 'Simpan' });
  303 |       await expect(saveBtn).toBeVisible({ timeout: 10000 });
  304 |       await expect(saveBtn).toBeEnabled({ timeout: 10000 });
  305 |       await saveBtn.click();
  306 | 
  307 |       // Verify returning to menu list page
  308 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 25000 });
  309 |       await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
  310 |     });
  311 |   });
  312 | 
  313 |   test('[TC-05] Hapus menu dengan ikon trash', async ({ page }) => {
  314 |     await test.step('Lakukan proses hapus menu dengan ikon trash dan konfirmasi penghapusan data', async () => {
  315 |       // Pastikan ada menu di tabel
  316 |       await ensureMenuExists(page);
  317 | 
  318 |       // Tunggu baris pertama yang memiliki teks nama menu (mencegah pembacaan sel kosong akibat virtualisasi tabel)
  319 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
  320 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  321 |       const menuNameToDelete = (await targetCell.innerText()).trim();
  322 |       expect(menuNameToDelete.length).toBeGreaterThan(0);
  323 | 
  324 |       const targetRow = page.locator('table tbody tr').filter({ hasText: menuNameToDelete }).first();
  325 | 
  326 |       // Klik tombol trash pada baris menu tersebut
  327 |       const deleteBtn = targetRow.locator('td').last().locator('button').last();
  328 |       await expect(deleteBtn).toBeVisible({ timeout: 10000 });
  329 |       await expect(deleteBtn).toBeEnabled({ timeout: 10000 });
  330 |       await deleteBtn.click();
  331 | 
  332 |       // Modal dialog konfirmasi harus muncul
  333 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  334 |       await expect(modal).toBeVisible({ timeout: 5000 });
  335 |       await expect(modal.getByText(/Hapus Menu Satuan|Apakah anda yakin/i).first()).toBeVisible();
  336 | 
  337 |       const confirmBtn = modal.getByRole('button', { name: 'Hapus' });
  338 |       await expect(confirmBtn).toBeVisible({ timeout: 5000 });
  339 |       await expect(confirmBtn).toBeEnabled({ timeout: 5000 });
  340 | 
  341 |       // Tunggu request DELETE ke backend selesai dengan response 200 OK
  342 |       const [response] = await Promise.all([
  343 |         page.waitForResponse(res => res.request().method() === 'DELETE' && res.status() === 200, { timeout: 15000 }),
  344 |         confirmBtn.click(),
  345 |       ]);
  346 |       expect(response.status()).toBe(200);
  347 | 
  348 |       // Pastikan modal tertutup
  349 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  350 | 
  351 |       // Verifikasi bahwa menu yang dihapus tidak lagi ada di tabel
  352 |       await expect(page.locator('table').getByText(menuNameToDelete)).not.toBeVisible({ timeout: 10000 });
  353 | 
  354 |       // Verifikasi ulang lewat search box untuk memastikan data benar-benar terhapus di backend
  355 |       const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari/i)).first();
  356 |       if (await searchInput.isVisible().catch(() => false)) {
  357 |         await searchInput.fill(menuNameToDelete);
  358 |         await expect(page.locator('table').getByText(menuNameToDelete)).not.toBeVisible({ timeout: 5000 });
  359 |         await searchInput.clear();
  360 |       }
  361 |     
  362 |     });
  363 |   });
  364 | 
  365 |   test('[TC-06] Cari/filter menu dengan search box', async ({ page }) => {
  366 |     await test.step('Lakukan pengujian cari/filter menu dengan search box dan validasi hasil yang ditampilkan', async () => {
  367 |       await ensureMenuExists(page);
  368 | 
```