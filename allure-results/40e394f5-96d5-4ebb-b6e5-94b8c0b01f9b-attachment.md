# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/manajemen_stok.spec.js >> Manajemen Stok >> [TC-04] Navigasi dari halaman detail ke form edit stok
- Location: tests/Kasflo-Resto/Katalog/manajemen_stok.spec.js:196:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('table tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))').first().locator('a[href*="/detail/"]').first()

```

# Page snapshot

```yaml
- generic [ref=f3e2]:
  - generic [ref=f3e3]:
    - navigation [ref=f3e4]:
      - generic [ref=f3e5]:
        - link [ref=f3e6] [cursor=pointer]:
          - /url: /admin/dashboard
          - paragraph [ref=f3e14]: Dashboard
        - link [ref=f3e15] [cursor=pointer]:
          - /url: /admin/catalog
          - paragraph [ref=f3e23]: Katalog
        - generic [ref=f3e28]:
          - link "Kategori" [ref=f3e29] [cursor=pointer]:
            - /url: /admin/catalog/category
          - link "Menu" [ref=f3e31] [cursor=pointer]:
            - /url: /admin/catalog/menu
          - link "Varian" [ref=f3e33] [cursor=pointer]:
            - /url: /admin/catalog/variant
          - link "Buku Menu" [ref=f3e35] [cursor=pointer]:
            - /url: /admin/catalog/book-menu
          - link "Manajemen Stok" [ref=f3e37] [cursor=pointer]:
            - /url: /admin/catalog/stock
          - link "Menu Self Order" [ref=f3e39] [cursor=pointer]:
            - /url: /admin/catalog/self-order-menu
        - link [ref=f3e41] [cursor=pointer]:
          - /url: /admin/ingredients
          - paragraph [ref=f3e49]: Bahan Baku
        - link [ref=f3e53] [cursor=pointer]:
          - /url: /admin/promotion
          - paragraph [ref=f3e61]: Promosi
        - link [ref=f3e65] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f3e74]: Pelanggan
        - link [ref=f3e78] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f3e86]: Pembukuan
        - link [ref=f3e90] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f3e98]: Laporan Usaha
        - link [ref=f3e102] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f3e110]: Manajemen User
        - link [ref=f3e114] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f3e121]: Pengaturan
        - link [ref=f3e125] [cursor=pointer]:
          - /url: /admin/subscription
          - paragraph [ref=f3e132]: Berlangganan
    - main [ref=f3e133]:
      - generic [ref=f3e134]:
        - generic [ref=f3e135]:
          - paragraph [ref=f3e136]: Subscription akan berakhir dalam 7 hari.
          - link [ref=f3e137] [cursor=pointer]:
            - /url: /admin/subscription?tab=history-subscription
            - paragraph [ref=f3e138]: Kunjungi Halaman Berlangganan
        - generic [ref=f3e140]:
          - paragraph [ref=f3e145]: Manajemen Stok
          - generic [ref=f3e146]:
            - button "Business" [ref=f3e148] [cursor=pointer]
            - button "Saldo QRIS" [ref=f3e156] [cursor=pointer]
            - button [ref=f3e162] [cursor=pointer]:
              - generic [ref=f3e169]:
                - paragraph [ref=f3e170]: Kasflo Automation
                - paragraph [ref=f3e171]: OWNER
        - generic [ref=f3e176]:
          - link [ref=f3e177] [cursor=pointer]:
            - /url: /admin/dashboard
          - generic [ref=f3e181]: /
          - paragraph [ref=f3e182]: Manajemen Stok
        - generic [ref=f3e186]:
          - generic [ref=f3e188]:
            - textbox "Cari disini..." [ref=f3e191]
            - generic [ref=f3e193]:
              - button "Show/Hide columns" [ref=f3e194] [cursor=pointer]
              - button "Toggle full screen" [ref=f3e197] [cursor=pointer]
          - table [ref=f3e205]:
            - rowgroup [ref=f3e206]:
              - row [ref=f3e207]:
                - columnheader "Cabang Sort by Cabang descending Move Column Actions" [ref=f3e208]:
                  - generic [ref=f3e209]:
                    - generic [ref=f3e210] [cursor=pointer]:
                      - generic [ref=f3e211]: Cabang
                      - button "Sort by Cabang descending" [ref=f3e212]
                    - generic [ref=f3e217]:
                      - button "Move" [ref=f3e218]
                      - button "Column Actions" [ref=f3e227] [cursor=pointer]
                - columnheader "Action" [ref=f3e233]
            - rowgroup [ref=f3e237]:
              - row [ref=f3e238]:
                - cell [ref=f3e239]:
                  - generic [ref=f3e241]:
                    - img "not-found" [ref=f3e242]
                    - paragraph [ref=f3e243]: Belum Ada Data
            - rowgroup
          - generic [ref=f3e247]:
            - generic [ref=f3e248]:
              - paragraph [ref=f3e249]: Rows per page
              - textbox "Rows per page" [ref=f3e252] [cursor=pointer]: "25"
            - paragraph [ref=f3e253]: 0-0 of 0
            - generic [ref=f3e254]:
              - button "Go to previous page" [disabled] [ref=f3e255]
              - button "Go to next page" [disabled] [ref=f3e259]
  - link "Konsultasi Sekarang" [ref=f3e263] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```

# Test source

```ts
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
> 208 |       await detailBtn.click();
      |                       ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  209 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/detail\/\d+/, { timeout: 15000 });
  210 | 
  211 |       // Click Edit button/link on detail page
  212 |       const editBtn = page.locator('a[href*="/stock/edit/"]').or(page.getByRole('link', { name: 'Edit' })).first();
  213 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  214 |       await editBtn.click();
  215 | 
  216 |       // Verify URL redirected to edit page
  217 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  218 |       await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 10000 });
  219 |     
  220 |     });
  221 |   });
  222 | 
  223 |   test('[TC-05] Navigasi ke halaman edit stok langsung dari daftar tabel', async ({ page }) => {
  224 |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman edit stok langsung dari daftar tabel', async () => {
  225 |       await ensureStockExists(page);
  226 | 
  227 |       const dataRows = getDataRows(page);
  228 |       if (await dataRows.count() === 0) {
  229 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  230 |         return;
  231 |       }
  232 | 
  233 |       const targetRow = dataRows.first();
  234 |       const editBtn = targetRow.locator('a[href*="/edit/"]').first();
  235 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  236 |       await editBtn.click();
  237 | 
  238 |       // Verify URL redirected to edit page
  239 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  240 |       await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 10000 });
  241 | 
  242 |       // Verify table structure on edit page
  243 |       const editThead = page.locator('table thead');
  244 |       await expect(editThead.getByText('Menu', { exact: true }).first()).toBeVisible();
  245 |       await expect(editThead.getByText('Kategori', { exact: true }).first()).toBeVisible();
  246 |       await expect(editThead.getByText('Stok Habis', { exact: true }).first()).toBeVisible();
  247 |       await expect(editThead.getByText('Stok Unlimited', { exact: true }).first()).toBeVisible();
  248 |       await expect(editThead.getByText('Stok', { exact: true }).first()).toBeVisible();
  249 |       await expect(editThead.getByText('Harga', { exact: true }).first()).toBeVisible();
  250 | 
  251 |       // Verify form action buttons
  252 |       await expect(page.getByRole('button', { name: 'Batalkan' })).toBeVisible();
  253 |       await expect(page.getByRole('button', { name: 'Simpan' })).toBeVisible();
  254 |     
  255 |     });
  256 |   });
  257 | 
  258 |   test('[TC-06] Cari/filter menu pada halaman edit stok', async ({ page }) => {
  259 |     await test.step('Lakukan pengujian cari/filter menu pada halaman edit stok dan validasi hasil yang ditampilkan', async () => {
  260 |       await ensureStockExists(page);
  261 | 
  262 |       const dataRows = getDataRows(page);
  263 |       if (await dataRows.count() === 0) {
  264 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  265 |         return;
  266 |       }
  267 | 
  268 |       const targetRow = dataRows.first();
  269 |       await targetRow.locator('a[href*="/edit/"]').first().click();
  270 |       await expect(page).toHaveURL(/.*\/admin\/catalog\/stock\/edit\/\d+/, { timeout: 15000 });
  271 |       await expect(page.getByText('Data Manajemen Stok').first()).toBeVisible({ timeout: 15000 });
  272 | 
  273 |       const editThead = page.locator('table thead');
  274 |       await expect(editThead.getByText('Menu', { exact: true }).first()).toBeVisible({ timeout: 15000 });
  275 | 
  276 |       // Wait for first menu row to be loaded
  277 |       const firstMenuCell = page.locator('table tbody tr td:first-child').first();
  278 |       await expect(firstMenuCell).not.toBeEmpty({ timeout: 10000 });
  279 |       const menuName = (await firstMenuCell.innerText()).trim();
  280 | 
  281 |       // Fill search box on edit page
  282 |       const searchInput = page.locator('input[placeholder="Cari disini..."]').or(page.getByPlaceholder(/Cari disini/i)).first();
  283 |       await expect(searchInput).toBeVisible({ timeout: 10000 });
  284 |       await searchInput.fill(menuName);
  285 | 
  286 |       // Verify matching menu is visible
  287 |       const matchedRow = page.locator('table tbody tr').filter({ hasText: menuName });
  288 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  289 | 
  290 |       // Clear search
  291 |       await searchInput.clear();
  292 |       await expect(firstMenuCell).toBeVisible({ timeout: 5000 });
  293 |     
  294 |     });
  295 |   });
  296 | 
  297 |   test('[TC-07] Filter menu berdasarkan kategori pada halaman edit stok', async ({ page }) => {
  298 |     await test.step('Lakukan pengujian filter menu berdasarkan kategori pada halaman edit stok dan validasi hasil yang ditampilkan', async () => {
  299 |       await ensureStockExists(page);
  300 | 
  301 |       const dataRows = getDataRows(page);
  302 |       if (await dataRows.count() === 0) {
  303 |         await expect(page.locator('table tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  304 |         return;
  305 |       }
  306 | 
  307 |       const targetRow = dataRows.first();
  308 |       await targetRow.locator('a[href*="/edit/"]').first().click();
```