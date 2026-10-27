# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/manajemen_stok.spec.js >> Manajemen Stok >> [TC-02] Cari/filter data manajemen stok dengan search box
- Location: tests/Kasflo-Resto/Katalog/manajemen_stok.spec.js:119:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('table tbody').getByText(/Belum Ada Data|No results found/i).first() with timeout 5000ms
  - waiting for locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()

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
  - paragraph: Subscription akan berakhir dalam 4 hari.
  - link "Kunjungi Halaman Berlangganan":
    - /url: /admin/subscription?tab=history-subscription
    - paragraph: Kunjungi Halaman Berlangganan
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
      - row "Cabang Sort by Cabang ascending Move Column Actions Action":
        - columnheader "Cabang Sort by Cabang ascending Move Column Actions":
          - text: Cabang
          - button "Sort by Cabang ascending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
        - columnheader "Action"
    - rowgroup:
      - row "Kasflo Pusat QA":
        - cell "Kasflo Pusat QA"
        - cell:
          - link:
            - /url: /admin/catalog/stock/detail/5817
            - img
          - link:
            - /url: /admin/catalog/stock/edit/5817
            - img
      - row "Cabang Tes 1729":
        - cell "Cabang Tes 1729"
        - cell:
          - link:
            - /url: /admin/catalog/stock/detail/5821
            - img
          - link:
            - /url: /admin/catalog/stock/edit/5821
            - img
    - rowgroup
  - paragraph: Rows per page
  - textbox "Rows per page": "25"
  - img
  - paragraph: 1-2 of 2
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
  33  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
  34  |     } catch {
  35  |       if (!page.url().includes('/admin/')) {
  36  |         await page.waitForTimeout(1000);
  37  |         if (await loginBtn.isVisible().catch(() => false)) {
  38  |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  39  |         }
  40  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  41  |       }
  42  |     }
  43  |     return page;
  44  |   }
  45  | 
  46  |   // Helper to ensure at least one stock entry exists (generated via Book Menu)
  47  |   async function ensureStockExists(page) {
  48  |     try {
  49  |       const emptyState = page.locator('table tbody tr', { hasText: /Belum Ada Data|No results found/i });
  50  |       const hasEmpty = await emptyState.isVisible({ timeout: 2000 }).catch(() => false);
  51  |       if (hasEmpty) {
  52  |         await page.goto('/admin/catalog/book-menu/add', { waitUntil: 'domcontentloaded' });
  53  |         await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/add/, { timeout: 15000 });
  54  |         const bmName = 'Init BM Stock ' + Date.now();
  55  |         await page.getByPlaceholder('Masukkan Nama Buku Menu').or(page.getByLabel(/Nama Buku Menu/i)).first().fill(bmName);
  56  | 
  57  |         const switchEl = page.locator('table tbody tr .mantine-Switch-root, table tbody tr input[type="checkbox"]').first();
  58  |         if (await switchEl.isVisible({ timeout: 2000 }).catch(() => false)) {
  59  |           await switchEl.click().catch(() => {});
  60  |         }
  61  | 
  62  |         const simpanBtn = page.getByRole('button', { name: 'Simpan' });
  63  |         if (await simpanBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
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
  74  |       await page.waitForSelector('table', { timeout: 15000 }).catch(() => {});
  75  |     }
  76  |   }
  77  | 
  78  |   test.beforeEach(async ({ page }) => {
  79  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  80  |       // Step 1: Login
  81  |       await loginBeforeTest(page);
  82  | 
  83  |       // Step 2: Navigate to Stock Management page
  84  |       await page.goto('/admin/catalog/stock', { waitUntil: 'domcontentloaded' });
  85  | 
  86  |       // Step 3: Verify stock management page loaded
  87  |       await expect(page).toHaveURL(/\/admin\/catalog\/stock/);
  88  |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  89  |     
  90  |     });
  91  |   });
  92  | 
  93  |   test('[TC-01] Menampilkan halaman manajemen stok dengan tabel dan header yang sesuai', async ({ page }) => {
  94  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman manajemen stok dengan tabel dan header yang sesuai', async () => {
  95  |       // Verify page title / breadcrumb
  96  |       await expect(page.getByText('Manajemen Stok').first()).toBeVisible();
  97  | 
  98  |       // Check table visibility
  99  |       const table = page.locator('table');
  100 |       await expect(table).toBeVisible();
  101 | 
  102 |       // Verify table headers
  103 |       const thead = page.locator('thead');
  104 |       await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
  105 |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  106 | 
  107 |       // Verify action elements in data row if stock entries exist
  108 |       await ensureStockExists(page);
  109 |       const dataRows = getDataRows(page);
  110 |       if (await dataRows.count() > 0) {
  111 |         const firstRow = dataRows.first();
  112 |         await expect(firstRow.locator('a[href*="/detail/"]').first()).toBeVisible({ timeout: 10000 });
  113 |         await expect(firstRow.locator('a[href*="/edit/"]').first()).toBeVisible({ timeout: 10000 });
  114 |       }
  115 |     
  116 |     });
  117 |   });
  118 | 
  119 |   test('[TC-02] Cari/filter data manajemen stok dengan search box', async ({ page }) => {
  120 |     await test.step('Lakukan pengujian cari/filter data manajemen stok dengan search box dan validasi hasil yang ditampilkan', async () => {
  121 |       await ensureStockExists(page);
  122 | 
  123 |       const dataRows = getDataRows(page);
  124 |       if (await dataRows.count() === 0) {
  125 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  126 |         return;
  127 |       }
  128 | 
  129 |       // Get branch or book menu name from first row
  130 |       const targetRow = dataRows.first();
  131 |       const cabangName = (await targetRow.locator('td:first-child').innerText()).trim();
  132 |       if (!cabangName) {
> 133 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 5000 });
      |                                                                                                         ^ Error: expect(locator).toBeVisible() failed
  134 |         return;
  135 |       }
  136 | 
  137 |       const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari disini/i)).first();
  138 |       await expect(searchInput).toBeVisible({ timeout: 10000 });
  139 | 
  140 |       // 1. Search with matching term
  141 |       await searchInput.fill(cabangName);
  142 |       const matchedRow = page.locator('table tbody tr').filter({ hasText: cabangName });
  143 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  144 | 
  145 |       // 2. Search with non-existent keyword
  146 |       await searchInput.fill('XYZTermNotExist999');
  147 |       await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  148 | 
  149 |       // 3. Clear search and verify original row is visible again
  150 |       await searchInput.clear();
  151 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  152 |     
  153 |     });
  154 |   });
  155 | 
  156 |   test('[TC-03] Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', async ({ page }) => {
  157 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', async () => {
  158 |       await ensureStockExists(page);
  159 |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  160 | 
  161 |       const dataRows = getDataRows(page);
  162 |       if (await dataRows.count() === 0) {
  163 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  164 |         return;
  165 |       }
  166 | 
  167 |       const targetRow = dataRows.first();
  168 |       const detailBtn = targetRow.locator('a[href*="/detail/"], button:has-text("Detail")').first();
  169 |       await expect(detailBtn).toBeVisible({ timeout: 15000 });
  170 |       await detailBtn.click();
  171 | 
  172 |       // Verify URL points to detail page
  173 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });
  174 | 
  175 |       // Verify detail headings
  176 |       await expect(page.getByText('Informasi Menu Stok').first()).toBeVisible({ timeout: 10000 });
  177 |       await expect(page.getByText('Detail Buku Menu').first()).toBeVisible({ timeout: 10000 });
  178 | 
  179 |       // Verify detail table headers
  180 |       const detailThead = page.locator('table thead');
  181 |       await expect(detailThead.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
  182 |       await expect(detailThead.getByText('Kategori', { exact: true }).first()).toBeVisible();
  183 |       await expect(detailThead.getByText('Stok Habis', { exact: true }).first()).toBeVisible();
  184 |       await expect(detailThead.getByText('Stok Unlimited', { exact: true }).first()).toBeVisible();
  185 |       await expect(detailThead.getByText('Stok', { exact: true }).first()).toBeVisible();
  186 |       await expect(detailThead.getByText('Harga', { exact: true }).first()).toBeVisible();
  187 | 
  188 |       // Verify detail table contains rows
  189 |       const detailRows = page.locator('table tbody tr');
  190 |       await expect(detailRows.first()).toBeVisible({ timeout: 10000 });
  191 |     
  192 |     });
  193 |   });
  194 | 
  195 |   test('[TC-04] Navigasi dari halaman detail ke form edit stok', async ({ page }) => {
  196 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi dari halaman detail ke form edit stok', async () => {
  197 |       await ensureStockExists(page);
  198 |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  199 | 
  200 |       const dataRows = getDataRows(page);
  201 |       if (await dataRows.count() === 0) {
  202 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  203 |         return;
  204 |       }
  205 | 
  206 |       const targetRow = dataRows.first();
  207 |       const detailBtn = targetRow.locator('a[href*="/detail/"], button:has-text("Detail")').first();
  208 |       await expect(detailBtn).toBeVisible({ timeout: 15000 });
  209 |       await detailBtn.click();
  210 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });
  211 | 
  212 |       // Click Edit button/link on detail page
  213 |       const editBtn = page.locator('a[href*="/stock/edit/"]').or(page.getByRole('link', { name: 'Edit' })).first();
  214 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  215 |       await editBtn.click();
  216 | 
  217 |       // Verify URL redirected to edit page
  218 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  219 |       await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 10000 });
  220 |     
  221 |     });
  222 |   });
  223 | 
  224 |   test('[TC-05] Navigasi ke halaman edit stok langsung dari daftar tabel', async ({ page }) => {
  225 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit stok langsung dari daftar tabel', async () => {
  226 |       await ensureStockExists(page);
  227 | 
  228 |       const dataRows = getDataRows(page);
  229 |       if (await dataRows.count() === 0) {
  230 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  231 |         return;
  232 |       }
  233 | 
```