# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/manajemen_stok.spec.js >> Manajemen Stok >> [TC-01] Menampilkan halaman manajemen stok dengan tabel dan header yang sesuai
- Location: tests/Kasflo-Resto/Katalog/manajemen_stok.spec.js:92:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))').first().locator('a[href*="/detail/"]').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))').first().locator('a[href*="/detail/"]').first() with timeout 10000ms
  - waiting for locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))').first().locator('a[href*="/detail/"]').first()

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
  11  |     if (page.url().includes('/admin/')) {
  12  |       return page;
  13  |     }
  14  | 
  15  |     await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  16  | 
  17  |     if (page.url().includes('/admin/')) {
  18  |       return page;
  19  |     }
  20  | 
  21  |     const emailInput = page.getByLabel(/Email atau Username/i);
  22  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  23  | 
  24  |     await emailInput.fill('qakasflo@automation.com');
  25  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  26  |     await page.waitForTimeout(500);
  27  | 
  28  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  29  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  30  |     await loginBtn.click();
  31  | 
  32  |     try {
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
> 111 |         await expect(firstRow.locator('a[href*="/detail/"]').first()).toBeVisible({ timeout: 10000 });
      |                                                                       ^ Error: expect(locator).toBeVisible() failed
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
  129 |       const targetRow = dataRows.first();
  130 |       const cabangName = (await targetRow.locator('td:first-child').innerText()).trim();
  131 |       if (!cabangName) {
  132 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 5000 });
  133 |         return;
  134 |       }
  135 | 
  136 |       const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari disini/i)).first();
  137 |       await expect(searchInput).toBeVisible({ timeout: 10000 });
  138 | 
  139 |       // 1. Search with matching term
  140 |       await searchInput.fill(cabangName);
  141 |       const matchedRow = page.locator('table tbody tr').filter({ hasText: cabangName });
  142 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  143 | 
  144 |       // 2. Search with non-existent keyword
  145 |       await searchInput.fill('XYZTermNotExist999');
  146 |       await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  147 | 
  148 |       // 3. Clear search and verify original row is visible again
  149 |       await searchInput.clear();
  150 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  151 |     
  152 |     });
  153 |   });
  154 | 
  155 |   test('[TC-03] Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', async ({ page }) => {
  156 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', async () => {
  157 |       await ensureStockExists(page);
  158 | 
  159 |       const dataRows = getDataRows(page);
  160 |       if (await dataRows.count() === 0) {
  161 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  162 |         return;
  163 |       }
  164 | 
  165 |       const targetRow = dataRows.first();
  166 |       const detailBtn = targetRow.locator('a[href*="/detail/"]').first();
  167 |       if (!await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
  168 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 5000 });
  169 |         return;
  170 |       }
  171 |       await detailBtn.click();
  172 | 
  173 |       // Verify URL points to detail page
  174 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });
  175 | 
  176 |       // Verify detail headings
  177 |       await expect(page.getByText('Informasi Menu Stok').first()).toBeVisible({ timeout: 10000 });
  178 |       await expect(page.getByText('Detail Buku Menu').first()).toBeVisible({ timeout: 10000 });
  179 | 
  180 |       // Verify detail table headers
  181 |       const detailThead = page.locator('table thead');
  182 |       await expect(detailThead.getByText('Nama Menu', { exact: true }).first()).toBeVisible();
  183 |       await expect(detailThead.getByText('Kategori', { exact: true }).first()).toBeVisible();
  184 |       await expect(detailThead.getByText('Stok Habis', { exact: true }).first()).toBeVisible();
  185 |       await expect(detailThead.getByText('Stok Unlimited', { exact: true }).first()).toBeVisible();
  186 |       await expect(detailThead.getByText('Stok', { exact: true }).first()).toBeVisible();
  187 |       await expect(detailThead.getByText('Harga', { exact: true }).first()).toBeVisible();
  188 | 
  189 |       // Verify detail table contains rows
  190 |       const detailRows = page.locator('table tbody tr');
  191 |       await expect(detailRows.first()).toBeVisible({ timeout: 10000 });
  192 |     
  193 |     });
  194 |   });
  195 | 
  196 |   test('[TC-04] Navigasi dari halaman detail ke form edit stok', async ({ page }) => {
  197 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi dari halaman detail ke form edit stok', async () => {
  198 |       await ensureStockExists(page);
  199 | 
  200 |       const dataRows = getDataRows(page);
  201 |       if (await dataRows.count() === 0) {
  202 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  203 |         return;
  204 |       }
  205 | 
  206 |       const targetRow = dataRows.first();
  207 |       const detailBtn = targetRow.locator('a[href*="/detail/"]').first();
  208 |       await detailBtn.click();
  209 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });
  210 | 
  211 |       // Click Edit button/link on detail page
```