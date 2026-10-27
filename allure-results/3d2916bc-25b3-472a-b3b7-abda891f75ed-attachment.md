# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Katalog/manajemen_stok.spec.js >> Manajemen Stok >> [TC-03] Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok
- Location: tests/Katalog/manajemen_stok.spec.js:153:3

# Error details

```
Error: expect(locator).not.toBeEmpty() failed

Locator: locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first()
Expected: not empty
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "not toBeEmpty" locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first() with timeout 10000ms
  - waiting for locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first()

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
  - link "Berlangganan":
    - /url: /admin/subscription
    - img
    - paragraph: Berlangganan
- main:
  - img
  - paragraph: Manajemen Stok
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
  - paragraph: Manajemen Stok
  - textbox "Cari disini..."
  - button "Show/Hide columns":
    - img
  - button "Toggle full screen":
    - img
  - table:
    - rowgroup:
      - row "Cabang Sort by Cabang descending Move Column Actions Action":
        - columnheader "Cabang Sort by Cabang descending Move Column Actions":
          - text: Cabang
          - button "Sort by Cabang descending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
        - columnheader "Action"
    - rowgroup:
      - row "not-found Belum Ada Data":
        - cell "not-found Belum Ada Data":
          - img "not-found"
          - paragraph: Belum Ada Data
    - rowgroup
  - paragraph: Rows per page
  - textbox "Rows per page": "25"
  - img
  - paragraph: 0-0 of 0
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
  64  |           await simpanBtn.click().catch(() => {});
  65  |           await page.waitForURL(/\/admin\/catalog\/book-menu$/, { timeout: 10000 }).catch(() => {});
  66  |         }
  67  |       }
  68  |     } catch {
  69  |       // Gracefully proceed
  70  |     } finally {
  71  |       if (!page.url().includes('/admin/catalog/stock')) {
  72  |         await page.goto('/admin/catalog/stock', { waitUntil: 'domcontentloaded' }).catch(() => {});
  73  |       }
  74  |     }
  75  |   }
  76  | 
  77  |   test.beforeEach(async ({ page }) => {
  78  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  79  |       // Step 1: Login
  80  |       await loginBeforeTest(page);
  81  | 
  82  |       // Step 2: Navigate to Stock Management page
  83  |       await page.goto('/admin/catalog/stock', { waitUntil: 'domcontentloaded' });
  84  | 
  85  |       // Step 3: Verify stock management page loaded
  86  |       await expect(page).toHaveURL(/\/admin\/catalog\/stock/);
  87  |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  88  |     
  89  |     });
  90  |   });
  91  | 
  92  |   test('[TC-01] Menampilkan halaman manajemen stok dengan tabel dan header yang sesuai', async ({ page }) => {
  93  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman manajemen stok dengan tabel dan header yang sesuai', async () => {
  94  |       // Verify page title / breadcrumb
  95  |       await expect(page.getByText('Manajemen Stok').first()).toBeVisible();
  96  | 
  97  |       // Check table visibility
  98  |       const table = page.locator('table');
  99  |       await expect(table).toBeVisible();
  100 | 
  101 |       // Verify table headers
  102 |       const thead = page.locator('thead');
  103 |       await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
  104 |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  105 | 
  106 |       // Verify action elements in data row if stock entries exist
  107 |       await ensureStockExists(page);
  108 |       const dataRows = getDataRows(page);
  109 |       if (await dataRows.count() > 0) {
  110 |         const firstRow = dataRows.first();
  111 |         await expect(firstRow.locator('a[href*="/detail/"]').first()).toBeVisible({ timeout: 10000 });
  112 |         await expect(firstRow.locator('a[href*="/edit/"]').first()).toBeVisible({ timeout: 10000 });
  113 |       }
  114 |     
  115 |     });
  116 |   });
  117 | 
  118 |   test('[TC-02] Cari/filter data manajemen stok dengan search box', async ({ page }) => {
  119 |     await test.step('Lakukan pengujian cari/filter data manajemen stok dengan search box dan validasi hasil yang ditampilkan', async () => {
  120 |       await ensureStockExists(page);
  121 | 
  122 |       const dataRows = getDataRows(page);
  123 |       if (await dataRows.count() === 0) {
  124 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  125 |         return;
  126 |       }
  127 | 
  128 |       // Get branch or book menu name from first row
  129 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
  130 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  131 |       const cabangName = (await targetCell.innerText()).trim();
  132 |       expect(cabangName.length).toBeGreaterThan(0);
  133 | 
  134 |       const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari disini/i)).first();
  135 |       await expect(searchInput).toBeVisible({ timeout: 10000 });
  136 | 
  137 |       // 1. Search with matching term
  138 |       await searchInput.fill(cabangName);
  139 |       const matchedRow = page.locator('table tbody tr').filter({ hasText: cabangName });
  140 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  141 | 
  142 |       // 2. Search with non-existent keyword
  143 |       await searchInput.fill('XYZTermNotExist999');
  144 |       await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  145 | 
  146 |       // 3. Clear search and verify original row is visible again
  147 |       await searchInput.clear();
  148 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  149 |     
  150 |     });
  151 |   });
  152 | 
  153 |   test('[TC-03] Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', async ({ page }) => {
  154 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', async () => {
  155 |       await ensureStockExists(page);
  156 | 
  157 |       const dataRows = getDataRows(page);
  158 |       if (await dataRows.count() === 0) {
  159 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  160 |         return;
  161 |       }
  162 | 
  163 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
> 164 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
      |                                    ^ Error: expect(locator).not.toBeEmpty() failed
  165 |       const targetRow = page.locator('table tbody tr').filter({ hasText: (await targetCell.innerText()).trim() }).first();
  166 | 
  167 |       const detailBtn = targetRow.locator('a[href*="/detail/"]').first();
  168 |       await expect(detailBtn).toBeVisible({ timeout: 10000 });
  169 |       await detailBtn.click();
  170 | 
  171 |       // Verify URL points to detail page
  172 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });
  173 | 
  174 |       // Verify detail headings
  175 |       await expect(page.getByText('Informasi Menu Stok').first()).toBeVisible({ timeout: 10000 });
  176 |       await expect(page.getByText('Detail Buku Menu').first()).toBeVisible({ timeout: 10000 });
  177 | 
  178 |       // Verify detail table headers
  179 |       const detailThead = page.locator('table thead');
  180 |       await expect(detailThead.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
  181 |       await expect(detailThead.getByText('Kategori', { exact: true }).first()).toBeVisible();
  182 |       await expect(detailThead.getByText('Stok Habis', { exact: true }).first()).toBeVisible();
  183 |       await expect(detailThead.getByText('Stok Unlimited', { exact: true }).first()).toBeVisible();
  184 |       await expect(detailThead.getByText('Stok', { exact: true }).first()).toBeVisible();
  185 |       await expect(detailThead.getByText('Harga', { exact: true }).first()).toBeVisible();
  186 | 
  187 |       // Verify detail table contains rows
  188 |       const detailRows = page.locator('table tbody tr');
  189 |       await expect(detailRows.first()).toBeVisible({ timeout: 10000 });
  190 |     
  191 |     });
  192 |   });
  193 | 
  194 |   test('[TC-04] Navigasi dari halaman detail ke form edit stok', async ({ page }) => {
  195 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi dari halaman detail ke form edit stok', async () => {
  196 |       await ensureStockExists(page);
  197 | 
  198 |       const dataRows = getDataRows(page);
  199 |       if (await dataRows.count() === 0) {
  200 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  201 |         return;
  202 |       }
  203 | 
  204 |       const targetRow = dataRows.first();
  205 |       const detailBtn = targetRow.locator('a[href*="/detail/"]').first();
  206 |       await detailBtn.click();
  207 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });
  208 | 
  209 |       // Click Edit button/link on detail page
  210 |       const editBtn = page.locator('a[href*="/stock/edit/"]').or(page.getByRole('link', { name: 'Edit' })).first();
  211 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  212 |       await editBtn.click();
  213 | 
  214 |       // Verify URL redirected to edit page
  215 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  216 |       await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 10000 });
  217 |     
  218 |     });
  219 |   });
  220 | 
  221 |   test('[TC-05] Navigasi ke halaman edit stok langsung dari daftar tabel', async ({ page }) => {
  222 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit stok langsung dari daftar tabel', async () => {
  223 |       await ensureStockExists(page);
  224 | 
  225 |       const dataRows = getDataRows(page);
  226 |       if (await dataRows.count() === 0) {
  227 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  228 |         return;
  229 |       }
  230 | 
  231 |       const targetRow = dataRows.first();
  232 |       const editBtn = targetRow.locator('a[href*="/edit/"]').first();
  233 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  234 |       await editBtn.click();
  235 | 
  236 |       // Verify URL redirected to edit page
  237 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  238 |       await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 10000 });
  239 | 
  240 |       // Verify table structure on edit page
  241 |       const editThead = page.locator('table thead');
  242 |       await expect(editThead.getByText('Menu', { exact: true }).first()).toBeVisible();
  243 |       await expect(editThead.getByText('Kategori', { exact: true }).first()).toBeVisible();
  244 |       await expect(editThead.getByText('Stok Habis', { exact: true }).first()).toBeVisible();
  245 |       await expect(editThead.getByText('Stok Unlimited', { exact: true }).first()).toBeVisible();
  246 |       await expect(editThead.getByText('Stok', { exact: true }).first()).toBeVisible();
  247 |       await expect(editThead.getByText('Harga', { exact: true }).first()).toBeVisible();
  248 | 
  249 |       // Verify form action buttons
  250 |       await expect(page.getByRole('button', { name: 'Batalkan' })).toBeVisible();
  251 |       await expect(page.getByRole('button', { name: 'Simpan' })).toBeVisible();
  252 |     
  253 |     });
  254 |   });
  255 | 
  256 |   test('[TC-06] Cari/filter menu pada halaman edit stok', async ({ page }) => {
  257 |     await test.step('Lakukan pengujian cari/filter menu pada halaman edit stok dan validasi hasil yang ditampilkan', async () => {
  258 |       await ensureStockExists(page);
  259 | 
  260 |       const dataRows = getDataRows(page);
  261 |       if (await dataRows.count() === 0) {
  262 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  263 |         return;
  264 |       }
```