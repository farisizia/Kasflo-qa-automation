# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/variant.spec.js >> Varian Menu >> [TC-03] Edit varian dengan ikon edit
- Location: tests/Kasflo-Resto/Katalog/variant.spec.js:157:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin\/catalog\/variant$/
Received string:  "https://backoffice-dev.kasflo.id/admin/catalog/variant/edit/468"
Timeout: 20000ms

Call log:
  - Expect "toHaveURL" with timeout 20000ms
    43 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
       - unexpected value "https://backoffice-dev.kasflo.id/admin/catalog/variant/edit/468"

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
  - paragraph: Varian
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
  - link "Varian":
    - /url: /admin/catalog/variant
  - text: /
  - paragraph: Edit Varian
  - button "Batalkan"
  - button "Update"
  - heading "Informasi Varian" [level=5]
  - text: Nama Varian
  - textbox "Nama Varian":
    - /placeholder: Masukkan Nama Varian
    - text: Updated Var 1793249544291
  - text: Status Varian
  - switch "Aktif" [checked]
  - text: Aktif Mode Varian
  - radiogroup "Mode Varian":
    - radio "Wajib Dipilih"
    - text: Wajib Dipilih
    - paragraph: Varian wajib dipilih untuk melanjutkan transaksi
    - radio "Opsional" [checked]
    - text: Opsional
    - paragraph: Varian tidak wajib dipilih, dapat dikosongkan
  - text: Tipe Varian
  - radiogroup "Tipe Varian":
    - radio "Pilih Salah Satu" [checked]
    - text: Pilih Salah Satu
    - paragraph: Varian hanya bisa pilih satu tidak bisa lebih
    - radio "Pilih Lebih Dari Satu"
    - text: Pilih Lebih Dari Satu
    - paragraph: Varian bisa dipilih lebih dari satu
  - heading "List Varian" [level=5]
  - button "Tambah":
    - img
    - text: Tambah
  - table:
    - rowgroup:
      - row "# List Varian Harga Action":
        - cell "#"
        - cell "List Varian"
        - cell "Harga"
        - cell "Action"
    - rowgroup:
      - row "1 Level 1 3.000":
        - cell "1"
        - cell "Level 1":
          - textbox "Masukkan Nama Varian": Level 1
        - cell "3.000":
          - textbox "Masukkan Harga": "3.000"
        - cell:
          - button [disabled]:
            - img
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  89  |     await expect(optionPriceInput).toBeEnabled();
  90  |     await optionPriceInput.fill('3000');
  91  | 
  92  |     // 5. Simpan
  93  |     const saveBtn = page.getByRole('button', { name: 'Simpan' });
  94  |     await expect(saveBtn).toBeVisible();
  95  |     await expect(saveBtn).toBeEnabled();
  96  |     await saveBtn.click();
  97  | 
  98  |     await expect(page).toHaveURL(/\/admin\/catalog\/variant$/, { timeout: 20000 });
  99  |     await waitForPageReady(page);
  100 |   }
  101 | 
  102 |   // Ensure at least 1 variant exists for tests that inspect or view items
  103 |   async function ensureVariantExists(page) {
  104 |     await waitForPageReady(page);
  105 |     const dataRows = getDataRows(page);
  106 |     if (await dataRows.count() === 0) {
  107 |       await createVariant(page, 'Varian ' + Date.now());
  108 |     }
  109 |   }
  110 | 
  111 |   test.beforeEach(async ({ page }) => {
  112 |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  113 |       // Step 1: Login
  114 |       await loginBeforeTest(page);
  115 | 
  116 |       // Step 2: Navigate to variant page
  117 |       await page.goto('/admin/catalog/variant', { waitUntil: 'domcontentloaded' });
  118 |       await waitForPageReady(page);
  119 | 
  120 |       // Step 3: Verify variant page loaded
  121 |       await expect(page).toHaveURL(/\/admin\/catalog\/variant/);
  122 |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  123 |     });
  124 |   });
  125 | 
  126 |   test('[TC-01] Menampilkan halaman varian dengan tabel', async ({ page }) => {
  127 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman varian dengan tabel', async () => {
  128 |       // Verify page title
  129 |       await expect(page.getByText('Varian').first()).toBeVisible();
  130 | 
  131 |       // Check if table exists
  132 |       const table = page.locator('table');
  133 |       await expect(table).toBeVisible();
  134 | 
  135 |       // Verify table headers
  136 |       const tableHeader = page.locator('thead');
  137 |       await expect(tableHeader.getByText('Nama Varian', { exact: true }).first()).toBeVisible();
  138 |       await expect(tableHeader.getByText('Mode Varian', { exact: true }).first()).toBeVisible();
  139 |       await expect(tableHeader.getByText('Tipe Varian', { exact: true }).first()).toBeVisible();
  140 |       await expect(tableHeader.getByText('Status', { exact: true }).first()).toBeVisible();
  141 |       await expect(tableHeader.getByText('Action', { exact: true }).first()).toBeVisible();
  142 |     
  143 |     });
  144 |   });
  145 | 
  146 |   test('[TC-02] Tambah varian baru berhasil', async ({ page }) => {
  147 |     await test.step('Lakukan proses tambah varian baru berhasil dan pastikan data tersimpan', async () => {
  148 |       const variantName = 'Test Varian ' + Date.now();
  149 |       await createVariant(page, variantName);
  150 | 
  151 |       // Verify created variant is visible in table
  152 |       await expect(page.locator('table').getByText(variantName).first()).toBeVisible({ timeout: 15000 });
  153 |     
  154 |     });
  155 |   });
  156 | 
  157 |   test('[TC-03] Edit varian dengan ikon edit', async ({ page }) => {
  158 |     await test.step('Lakukan pengujian edit varian dengan ikon edit dan verifikasi pembaruan data', async () => {
  159 |       await ensureVariantExists(page);
  160 | 
  161 |       // Tunggu baris pertama yang memiliki teks nama varian
  162 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
  163 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  164 |       const currentName = (await targetCell.innerText()).trim();
  165 | 
  166 |       const targetRow = page.locator('table tbody tr').filter({ hasText: currentName }).first();
  167 |       const editLink = targetRow.locator('a[href*="/edit/"]').first();
  168 |       await expect(editLink).toBeVisible({ timeout: 15000 });
  169 |       await editLink.click();
  170 | 
  171 |       // Wait for edit page to load
  172 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/variant\/edit\/.*/, { timeout: 15000 });
  173 |       await waitForPageReady(page);
  174 | 
  175 |       // Modify name
  176 |       const updatedName = 'Updated Var ' + Date.now();
  177 |       const nameInput = page.locator('input[placeholder="Masukkan Nama Varian"]').first();
  178 |       await expect(nameInput).toBeVisible({ timeout: 10000 });
  179 |       await expect(nameInput).toBeEnabled();
  180 |       await nameInput.fill(updatedName);
  181 | 
  182 |       // Save changes (button says 'Update' or 'Simpan')
  183 |       const saveBtn = page.getByRole('button', { name: 'Update' }).or(page.getByRole('button', { name: 'Simpan' }));
  184 |       await expect(saveBtn).toBeVisible();
  185 |       await expect(saveBtn).toBeEnabled();
  186 |       await saveBtn.click();
  187 | 
  188 |       // Verify returning to variant list page
> 189 |       await expect(page).toHaveURL(/\/admin\/catalog\/variant$/, { timeout: 20000 });
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  190 |       await waitForPageReady(page);
  191 |       await expect(page.getByText(/Berhasil|Success/i).or(page.locator('table').getByText(updatedName)).first()).toBeVisible({ timeout: 15000 });
  192 |     });
  193 |   });
  194 | 
  195 |   test('[TC-04] Hapus varian dengan ikon trash', async ({ page }) => {
  196 |     await test.step('Lakukan proses hapus varian dengan ikon trash dan konfirmasi penghapusan data', async () => {
  197 |       await ensureVariantExists(page);
  198 | 
  199 |       // Tunggu baris pertama yang memiliki teks nama varian
  200 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
  201 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  202 |       const variantNameToDelete = (await targetCell.innerText()).trim();
  203 |       expect(variantNameToDelete.length).toBeGreaterThan(0);
  204 | 
  205 |       const targetRow = page.locator('table tbody tr').filter({ hasText: variantNameToDelete }).first();
  206 | 
  207 |       // Klik tombol trash pada baris varian tersebut
  208 |       const deleteBtn = targetRow.locator('td').last().locator('button').last();
  209 |       await expect(deleteBtn).toBeVisible({ timeout: 10000 });
  210 |       await expect(deleteBtn).toBeEnabled({ timeout: 10000 });
  211 |       await deleteBtn.click();
  212 | 
  213 |       // Modal dialog konfirmasi harus muncul
  214 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  215 |       await expect(modal).toBeVisible({ timeout: 5000 });
  216 |       await expect(modal.getByText(/Hapus Varian|Apakah anda yakin/i).first()).toBeVisible();
  217 | 
  218 |       const confirmBtn = modal.getByRole('button', { name: 'Hapus' });
  219 |       await expect(confirmBtn).toBeVisible({ timeout: 5000 });
  220 |       await expect(confirmBtn).toBeEnabled({ timeout: 5000 });
  221 | 
  222 |       // Tunggu request DELETE ke backend selesai dengan response 200 OK
  223 |       const [response] = await Promise.all([
  224 |         page.waitForResponse(res => res.request().method() === 'DELETE' && res.status() === 200, { timeout: 15000 }),
  225 |         confirmBtn.click(),
  226 |       ]);
  227 |       expect(response.status()).toBe(200);
  228 | 
  229 |       // Pastikan modal tertutup
  230 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  231 | 
  232 |       // Verifikasi bahwa varian yang dihapus tidak lagi ada di tabel
  233 |       await expect(page.locator('table').getByText(variantNameToDelete)).not.toBeVisible({ timeout: 10000 });
  234 |     
  235 |     });
  236 |   });
  237 | 
  238 |   test('[TC-05] Cari/filter varian dengan search box', async ({ page }) => {
  239 |     await test.step('Lakukan pengujian cari/filter varian dengan search box dan validasi hasil yang ditampilkan', async () => {
  240 |       await ensureVariantExists(page);
  241 | 
  242 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
  243 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  244 |       const firstVariantName = (await targetCell.innerText()).trim();
  245 |       expect(firstVariantName.length).toBeGreaterThan(0);
  246 | 
  247 |       const searchInput = page.locator('input[placeholder="Cari Varian..."]').or(page.getByPlaceholder(/Cari/i)).first();
  248 |       await expect(searchInput).toBeVisible({ timeout: 10000 });
  249 | 
  250 |       // Search for first variant name
  251 |       await searchInput.fill(firstVariantName);
  252 | 
  253 |       // Verify table shows matching results
  254 |       const matchedRow = page.locator('table tbody tr').filter({ hasText: firstVariantName });
  255 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  256 | 
  257 |       // Clear search
  258 |       await searchInput.clear();
  259 |       await expect(page.locator('table tbody tr').filter({ hasText: firstVariantName }).first()).toBeVisible({ timeout: 5000 });
  260 |     
  261 |     });
  262 |   });
  263 | 
  264 |   test('[TC-06] Verifikasi status toggle varian memunculkan konfirmasi', async ({ page }) => {
  265 |     await test.step('Verifikasi status toggle varian memunculkan konfirmasi', async () => {
  266 |       await ensureVariantExists(page);
  267 | 
  268 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: 'No results found' }).first();
  269 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  270 |       const firstVariantName = (await targetCell.innerText()).trim();
  271 | 
  272 |       const targetRow = page.locator('table tbody tr').filter({ hasText: firstVariantName }).first();
  273 |       const switchWrapper = targetRow.locator('.mantine-Switch-root, label:has(input[type="checkbox"]), .mantine-Switch-track').first();
  274 |       await expect(switchWrapper).toBeVisible({ timeout: 10000 });
  275 | 
  276 |       // Click toggle to trigger modal
  277 |       await switchWrapper.click();
  278 | 
  279 |       // Verify confirmation modal appears
  280 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  281 |       await expect(modal).toBeVisible({ timeout: 5000 });
  282 |       await expect(modal.getByText(/Nonaktifkan Varian|Aktifkan Varian|Varian|Status/i).first()).toBeVisible();
  283 | 
  284 |       // Safely dismiss modal using Batal button
  285 |       const cancelBtn = modal.getByRole('button', { name: 'Batal' });
  286 |       await expect(cancelBtn).toBeVisible();
  287 |       await cancelBtn.click();
  288 | 
  289 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
```