# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/menu.spec.js >> Manajemen Menu >> [TC-03] Tambah menu paketan berhasil
- Location: tests/Kasflo-Resto/Katalog/menu.spec.js:149:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin\/catalog\/menu$/
Received string:  "https://backoffice-dev.kasflo.id/admin/catalog/menu/package/add"
Timeout: 20000ms

Call log:
  - Expect "toHaveURL" with timeout 20000ms
    42 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
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
    - text: Paket Hemat 1793173736988
  - text: Kode Menu
  - textbox "Kode Menu":
    - /placeholder: Masukkan Kode Menu
    - text: PKT7080
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
      - row "1 Init BM SelfOrder 1792998973976 Rp Wajib diisi":
        - cell "1"
        - cell "Init BM SelfOrder 1792998973976":
          - textbox "Pilih Buku Menu": Init BM SelfOrder 1792998973976
          - button:
            - img
          - link:
            - /url: /admin/catalog/book-menu/add
            - img
        - cell "Rp Wajib diisi":
          - text: Rp
          - textbox [invalid]
          - paragraph: Wajib diisi
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
      - row "1 Test Menu 1793173734413 1":
        - cell "1"
        - cell "Test Menu 1793173734413":
          - textbox "Pilih Menu": Test Menu 1793173734413
          - button:
            - img
          - button:
            - img
          - link:
            - /url: /admin/catalog/menu/unit/add
            - img
        - cell "1":
          - textbox: "1"
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
  - heading "Paket Hemat 1793173736988" [level=5]
  - paragraph: Deskripsi
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  105 |       // Step 1: Login
  106 |       await loginBeforeTest(page);
  107 | 
  108 |       // Step 2: Navigate to menu page
  109 |       await page.goto('/admin/catalog/menu', { waitUntil: 'domcontentloaded' });
  110 | 
  111 |       // Step 3: Verify menu page loaded
  112 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu/);
  113 |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  114 |     
  115 |     });
  116 |   });
  117 | 
  118 |   test('[TC-01] Menampilkan halaman menu dengan tabel', async ({ page }) => {
  119 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman menu dengan tabel', async () => {
  120 |       // Verify page title
  121 |       await expect(page.getByText('Menu').first()).toBeVisible();
  122 | 
  123 |       // Check if table exists
  124 |       const table = page.locator('table');
  125 |       await expect(table).toBeVisible();
  126 | 
  127 |       // Verify table headers
  128 |       const tableHeader = page.locator('thead');
  129 |       await expect(tableHeader.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
  130 |       await expect(tableHeader.getByText('Kode', { exact: true }).first()).toBeVisible();
  131 |       await expect(tableHeader.getByText('Kategori', { exact: true }).first()).toBeVisible();
  132 |       await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
  133 |       await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
  134 |     
  135 |     });
  136 |   });
  137 | 
  138 |   test('[TC-02] Tambah menu satuan berhasil', async ({ page }) => {
  139 |     await test.step('Lakukan proses tambah menu satuan berhasil dan pastikan data tersimpan', async () => {
  140 |       const menuName = 'Test Menu ' + Date.now();
  141 |       await createMenuUnit(page, menuName);
  142 | 
  143 |       // Verify created menu is visible in table
  144 |       await expect(page.locator('table').getByText(menuName).first()).toBeVisible({ timeout: 15000 });
  145 |     
  146 |     });
  147 |   });
  148 | 
  149 |   test('[TC-03] Tambah menu paketan berhasil', async ({ page }) => {
  150 |     await test.step('Lakukan proses tambah menu paketan berhasil dan pastikan data tersimpan', async () => {
  151 |       // Beralih ke tab Menu Paketan
  152 |       const menuPaketanTab = page.getByRole('tab', { name: 'Menu Paketan' });
  153 |       await expect(menuPaketanTab).toBeVisible({ timeout: 10000 });
  154 |       await menuPaketanTab.click();
  155 | 
  156 |       // Klik tombol Tambah Menu Paketan
  157 |       const addPackageBtn = page.getByRole('link', { name: 'Tambah Menu Paketan' }).or(page.getByRole('button', { name: 'Tambah Menu Paketan' })).first();
  158 |       await expect(addPackageBtn).toBeVisible({ timeout: 10000 });
  159 |       await addPackageBtn.click();
  160 | 
  161 |       // Verifikasi navigasi ke halaman form tambah menu paketan
  162 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/package\/add/, { timeout: 15000 });
  163 | 
  164 |       const packageName = 'Paket Hemat ' + Date.now();
  165 | 
  166 |       // 1. Isi Nama Menu Paketan
  167 |       const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
  168 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  169 |       await nameInput.fill(packageName);
  170 | 
  171 |       // 2. Isi Kode Menu
  172 |       const codeInput = page.getByPlaceholder('Masukkan Kode Menu').or(page.getByLabel(/Kode Menu/i)).first();
  173 |       if (await codeInput.isVisible().catch(() => false)) {
  174 |         await codeInput.fill('PKT' + Math.floor(Math.random() * 9999));
  175 |       }
  176 | 
  177 |       // 3. Isi Harga pada tabel Buku Menu
  178 |       const priceInput = page.locator('table').first().locator('input[type="text"]').first();
  179 |       await expect(priceInput).toBeVisible({ timeout: 10000 });
  180 |       await priceInput.fill('25000');
  181 | 
  182 |       // 4. Pilih Isi Menu Paket
  183 |       const selectMenuInput = page.locator('input[placeholder*="Pilih Menu"]').first();
  184 |       await expect(selectMenuInput).toBeVisible({ timeout: 10000 });
  185 |       await selectMenuInput.click();
  186 | 
  187 |       // Pilih opsi pertama yang aktif dari dropdown
  188 |       const visibleDropdown = page.locator('.mantine-Select-dropdown:visible, .mantine-Combobox-dropdown:visible, [data-combobox-dropdown]:visible').first();
  189 |       const firstOption = visibleDropdown.locator('[role="option"]').first();
  190 |       await expect(firstOption).toBeVisible({ timeout: 5000 });
  191 |       await firstOption.click();
  192 | 
  193 |       // 5. Isi Qty isi paket
  194 |       const isiPaketTable = page.locator('table').nth(1);
  195 |       const qtyInput = isiPaketTable.locator('input[type="text"], input[type="number"]').last();
  196 |       await expect(qtyInput).toBeVisible({ timeout: 5000 });
  197 |       await qtyInput.fill('1');
  198 | 
  199 |       // 6. Klik tombol Simpan
  200 |       const saveBtn = page.getByRole('button', { name: 'Simpan' });
  201 |       await expect(saveBtn).toBeVisible();
  202 |       await saveBtn.click();
  203 | 
  204 |       // Verifikasi berhasil disimpan dan kembali ke list menu
> 205 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 20000 });
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  206 |       await expect(page.getByText(/Berhasil|Success/i).first()).toBeVisible({ timeout: 10000 });
  207 | 
  208 |       // Buka tab Menu Paketan dan pastikan paket baru tampil
  209 |       await menuPaketanTab.click();
  210 |       await expect(page.locator('table').getByText(packageName).first()).toBeVisible({ timeout: 15000 });
  211 |     
  212 |     });
  213 |   });
  214 | 
  215 |   test('[TC-04] Edit menu dengan ikon edit', async ({ page }) => {
  216 |     await test.step('Lakukan pengujian edit menu dengan ikon edit dan verifikasi pembaruan data', async () => {
  217 |       await ensureMenuExists(page);
  218 | 
  219 |       const dataRows = getDataRows(page);
  220 |       const firstRow = dataRows.first();
  221 |       const editLink = firstRow.locator('a[href*="/edit/"]').first();
  222 |       await expect(editLink).toBeVisible({ timeout: 15000 });
  223 |       await editLink.click();
  224 | 
  225 |       // Wait for edit page to load
  226 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/unit\/edit\/.*/, { timeout: 15000 });
  227 | 
  228 |       // Find name input and modify
  229 |       const updatedName = 'Updated Menu ' + Math.floor(Math.random() * 1000);
  230 |       const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
  231 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  232 |       await nameInput.fill(updatedName);
  233 | 
  234 |       // Save changes
  235 |       const saveBtn = page.getByRole('button', { name: 'Simpan' });
  236 |       await expect(saveBtn).toBeVisible();
  237 |       await saveBtn.click();
  238 | 
  239 |       // Verify returning to menu list page
  240 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 20000 });
  241 |       await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
  242 |     
  243 |     });
  244 |   });
  245 | 
  246 |   test('[TC-05] Hapus menu dengan ikon trash', async ({ page }) => {
  247 |     await test.step('Lakukan proses hapus menu dengan ikon trash dan konfirmasi penghapusan data', async () => {
  248 |       // Pastikan ada menu di tabel
  249 |       await ensureMenuExists(page);
  250 | 
  251 |       // Tunggu baris pertama yang memiliki teks nama menu (mencegah pembacaan sel kosong akibat virtualisasi tabel)
  252 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
  253 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  254 |       const menuNameToDelete = (await targetCell.innerText()).trim();
  255 |       expect(menuNameToDelete.length).toBeGreaterThan(0);
  256 | 
  257 |       const targetRow = page.locator('table tbody tr').filter({ hasText: menuNameToDelete }).first();
  258 | 
  259 |       // Klik tombol trash pada baris menu tersebut
  260 |       const deleteBtn = targetRow.locator('td').last().locator('button').last();
  261 |       await expect(deleteBtn).toBeVisible({ timeout: 10000 });
  262 |       await deleteBtn.click();
  263 | 
  264 |       // Modal dialog konfirmasi harus muncul
  265 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  266 |       await expect(modal).toBeVisible({ timeout: 5000 });
  267 |       await expect(modal.getByText(/Hapus Menu Satuan|Apakah anda yakin/i).first()).toBeVisible();
  268 | 
  269 |       const confirmBtn = modal.getByRole('button', { name: 'Hapus' });
  270 |       await expect(confirmBtn).toBeVisible({ timeout: 5000 });
  271 | 
  272 |       // Tunggu request DELETE ke backend selesai dengan response 200 OK
  273 |       const [response] = await Promise.all([
  274 |         page.waitForResponse(res => res.request().method() === 'DELETE' && res.status() === 200, { timeout: 15000 }),
  275 |         confirmBtn.click(),
  276 |       ]);
  277 |       expect(response.status()).toBe(200);
  278 | 
  279 |       // Pastikan modal tertutup
  280 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  281 | 
  282 |       // Verifikasi bahwa menu yang dihapus tidak lagi ada di tabel
  283 |       await expect(page.locator('table').getByText(menuNameToDelete)).not.toBeVisible({ timeout: 10000 });
  284 | 
  285 |       // Verifikasi ulang lewat search box untuk memastikan data benar-benar terhapus di backend
  286 |       const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari/i)).first();
  287 |       if (await searchInput.isVisible().catch(() => false)) {
  288 |         await searchInput.fill(menuNameToDelete);
  289 |         await expect(page.locator('table').getByText(menuNameToDelete)).not.toBeVisible({ timeout: 5000 });
  290 |         await searchInput.clear();
  291 |       }
  292 |     
  293 |     });
  294 |   });
  295 | 
  296 |   test('[TC-06] Cari/filter menu dengan search box', async ({ page }) => {
  297 |     await test.step('Lakukan pengujian cari/filter menu dengan search box dan validasi hasil yang ditampilkan', async () => {
  298 |       await ensureMenuExists(page);
  299 | 
  300 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
  301 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  302 |       const firstMenuName = (await targetCell.innerText()).trim().split('\n')[0].trim();
  303 |       expect(firstMenuName.length).toBeGreaterThan(0);
  304 | 
  305 |       const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari/i)).first();
```