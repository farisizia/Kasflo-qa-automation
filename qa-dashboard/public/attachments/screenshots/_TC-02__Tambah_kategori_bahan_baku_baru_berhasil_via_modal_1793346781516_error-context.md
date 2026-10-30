# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/kategori_bahan_baku.spec.js >> Kategori Bahan Baku >> [TC-02] Tambah kategori bahan baku baru berhasil via modal
- Location: tests/Kasflo-Resto/Bahan Baku/kategori_bahan_baku.spec.js:134:3

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Buat Kategori Bahan Baku/i })
    - locator resolved to <button disabled type="button" data-disabled="true" data-with-left-section="true" class="mantine-focus-auto m_77c9d27d mantine-Button-root m_87cf2631 mantine-UnstyledButton-root">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    58 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

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
        - link [ref=f1e27] [cursor=pointer]:
          - /url: /admin/ingredients
          - paragraph [ref=f1e35]: Bahan Baku
        - generic [ref=f1e40]:
          - link "Kategori Bahan Baku" [ref=f1e41] [cursor=pointer]:
            - /url: /admin/ingredients/category
          - link "Data Bahan Baku" [ref=f1e43] [cursor=pointer]:
            - /url: /admin/ingredients/ingredients
          - link "Resep" [ref=f1e45] [cursor=pointer]:
            - /url: /admin/ingredients/recipe
        - link [ref=f1e47] [cursor=pointer]:
          - /url: /admin/promotion
          - paragraph [ref=f1e55]: Promosi
        - link [ref=f1e59] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f1e68]: Pelanggan
        - link [ref=f1e72] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f1e80]: Pembukuan
        - link [ref=f1e84] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f1e92]: Laporan Usaha
        - link [ref=f1e96] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f1e104]: Manajemen User
        - link [ref=f1e108] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f1e115]: Pengaturan
    - main [ref=f1e119]:
      - generic [ref=f1e120]:
        - generic [ref=f1e122]:
          - paragraph [ref=f1e127]: Kategori Bahan Baku
          - generic [ref=f1e128]:
            - button "Premium" [ref=f1e130] [cursor=pointer]
            - button "Saldo QRIS" [ref=f1e138] [cursor=pointer]
            - button [ref=f1e144] [cursor=pointer]:
              - generic [ref=f1e151]:
                - paragraph [ref=f1e152]: Kasflo Automation
                - paragraph [ref=f1e153]: OWNER
        - generic [ref=f1e156]:
          - generic [ref=f1e157]:
            - link [ref=f1e158] [cursor=pointer]:
              - /url: /admin/dashboard
            - generic [ref=f1e162]: /
            - paragraph [ref=f1e163]: Kategori Bahan Baku
          - button "Buat Kategori Bahan Baku" [disabled] [ref=f1e164]
        - generic [ref=f1e171]:
          - generic [ref=f1e173]:
            - generic [ref=f1e175]:
              - generic [ref=f1e177]:
                - textbox "Semua Cabang" [ref=f1e178] [cursor=pointer]
                - button [ref=f1e181] [cursor=pointer]
              - textbox "Cari disini..." [ref=f1e187]
            - generic [ref=f1e189]:
              - button "Show/Hide columns" [ref=f1e190] [cursor=pointer]
              - button "Toggle full screen" [ref=f1e193] [cursor=pointer]
          - table [ref=f1e201]:
            - rowgroup [ref=f1e202]:
              - row [ref=f1e203]:
                - columnheader "Nama Kategori Move Column Actions" [ref=f1e204]:
                  - generic [ref=f1e205]:
                    - generic [ref=f1e206]: Nama Kategori
                    - generic [ref=f1e208]:
                      - button "Move" [ref=f1e209]
                      - button "Column Actions" [ref=f1e218] [cursor=pointer]
                - columnheader "Bahan Baku Move Column Actions" [ref=f1e224]:
                  - generic [ref=f1e225]:
                    - generic [ref=f1e226]: Bahan Baku
                    - generic [ref=f1e228]:
                      - button "Move" [ref=f1e229]
                      - button "Column Actions" [ref=f1e238] [cursor=pointer]
                - columnheader "Action" [ref=f1e244]
            - rowgroup [ref=f1e248]:
              - row [ref=f1e249]:
                - cell [ref=f1e250]:
                  - generic [ref=f1e252]:
                    - img "not-found" [ref=f1e253]
                    - paragraph [ref=f1e254]: Belum Ada Data
            - rowgroup
          - generic [ref=f1e258]:
            - generic [ref=f1e259]:
              - paragraph [ref=f1e260]: Rows per page
              - textbox "Rows per page" [ref=f1e263] [cursor=pointer]: "25"
            - paragraph [ref=f1e264]: 0-0 of 0
            - generic [ref=f1e265]:
              - button "Go to previous page" [disabled] [ref=f1e266]
              - button "Go to next page" [disabled] [ref=f1e270]
  - link "Konsultasi Sekarang" [ref=f1e274] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```

# Test source

```ts
  38  |       emailInput.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
  39  |     ]);
  40  |     if (page.url().includes('/admin/')) {
  41  |       await waitForPageReady(page);
  42  |       return page;
  43  |     }
  44  | 
  45  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  46  |     await emailInput.fill('qakasflo@automation.com');
  47  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  48  | 
  49  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  50  |     await expect(loginBtn).toBeVisible({ timeout: 10000 });
  51  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  52  |     await waitForPageReady(page);
  53  |     await loginBtn.click();
  54  | 
  55  |     try {
  56  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
  57  |     } catch {
  58  |       if (!page.url().includes('/admin/')) {
  59  |         if (await loginBtn.isEnabled().catch(() => false)) {
  60  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  61  |         }
  62  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  63  |       }
  64  |     }
  65  |     await waitForPageReady(page);
  66  |     return page;
  67  |   }
  68  | 
  69  |   // Helper to ensure at least minCount ingredient categories exist
  70  |   async function ensureIngredientCategoryExists(page, minCount = 1) {
  71  |     await waitForPageReady(page);
  72  |     const dataRows = getDataRows(page);
  73  |     if (await dataRows.count() < minCount) {
  74  |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  75  |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  76  |       await expect(addBtn).toBeEnabled({ timeout: 10000 });
  77  |       await addBtn.click();
  78  | 
  79  |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  80  |       await expect(modal).toBeVisible({ timeout: 10000 });
  81  | 
  82  |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
  83  |       const catName = 'Init Kat Bahan ' + Date.now();
  84  |       await expect(nameInput).toBeVisible();
  85  |       await expect(nameInput).toBeEnabled();
  86  |       await nameInput.fill(catName);
  87  | 
  88  |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  89  |       await expect(simpanBtn).toBeVisible();
  90  |       await expect(simpanBtn).toBeEnabled();
  91  |       await simpanBtn.click();
  92  |       await expect(modal).not.toBeVisible({ timeout: 15000 });
  93  |       await waitForPageReady(page);
  94  |     }
  95  |   }
  96  | 
  97  |   test.beforeEach(async ({ page }) => {
  98  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  99  |       // Step 1: Login
  100 |       await loginBeforeTest(page);
  101 | 
  102 |       // Step 2: Navigate to Ingredient Category page
  103 |       await page.goto('/admin/ingredients/category', { waitUntil: 'domcontentloaded' });
  104 |       await waitForPageReady(page);
  105 | 
  106 |       // Step 3: Verify page loaded
  107 |       await expect(page).toHaveURL(/\/admin\/ingredients\/category/);
  108 |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  109 |     });
  110 |   });
  111 | 
  112 |   test('[TC-01] Menampilkan halaman kategori bahan baku dengan tabel dan header yang sesuai', async ({ page }) => {
  113 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman kategori bahan baku dengan tabel dan header yang sesuai', async () => {
  114 |       // Verify page heading / breadcrumb
  115 |       await expect(page.getByText('Kategori Bahan Baku').first()).toBeVisible();
  116 | 
  117 |       // Check table visibility
  118 |       const table = page.locator('table');
  119 |       await expect(table).toBeVisible();
  120 | 
  121 |       // Verify table headers
  122 |       const thead = page.locator('thead');
  123 |       await expect(thead.getByText('Nama Kategori', { exact: true }).first()).toBeVisible();
  124 |       await expect(thead.getByText('Bahan Baku', { exact: true }).first()).toBeVisible();
  125 |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  126 | 
  127 |       // Verify Add button exists
  128 |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  129 |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  130 |     
  131 |     });
  132 |   });
  133 | 
  134 |   test('[TC-02] Tambah kategori bahan baku baru berhasil via modal', async ({ page }) => {
  135 |     await test.step('Lakukan proses tambah kategori bahan baku baru berhasil via modal dan pastikan data tersimpan', async () => {
  136 |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  137 |       await expect(addBtn).toBeVisible({ timeout: 10000 });
> 138 |       await addBtn.click();
      |                    ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  139 | 
  140 |       // Verify modal appears
  141 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  142 |       await expect(modal).toBeVisible({ timeout: 5000 });
  143 |       await expect(modal.getByText('Tambah Kategori').first()).toBeVisible({ timeout: 5000 });
  144 | 
  145 |       // Fill form field
  146 |       const catName = 'Kat Bahan ' + Date.now();
  147 |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
  148 |       await expect(nameInput).toBeVisible({ timeout: 5000 });
  149 |       await nameInput.fill(catName);
  150 | 
  151 |       // Click Simpan and wait for POST request response 200 OK
  152 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  153 |       await expect(simpanBtn).toBeVisible();
  154 | 
  155 |       const [response] = await Promise.all([
  156 |         page.waitForResponse(res => res.url().includes('/ingredients/categories') && res.request().method() === 'POST' && res.status() === 200, { timeout: 20000 }),
  157 |         simpanBtn.click(),
  158 |       ]);
  159 |       expect(response.status()).toBe(200);
  160 | 
  161 |       // Verify modal is closed
  162 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
  163 | 
  164 |       // Search for created category to handle pagination/sorting
  165 |       const searchInput = page.getByPlaceholder('Cari disini...');
  166 |       if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
  167 |         await searchInput.fill(catName);
  168 |         await waitForPageReady(page);
  169 |       }
  170 | 
  171 |       // Verify created category is visible in table
  172 |       const targetCell = page.locator('table tbody tr').filter({ hasText: catName });
  173 |       await expect(targetCell.first()).toBeVisible({ timeout: 10000 });
  174 |     
  175 |     });
  176 |   });
  177 | 
  178 |   test('[TC-03] Validasi input nama kategori kosong pada modal tambah', async ({ page }) => {
  179 |     await test.step('Validasi input nama kategori kosong pada modal tambah', async () => {
  180 |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  181 |       await addBtn.click();
  182 | 
  183 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  184 |       await expect(modal).toBeVisible({ timeout: 5000 });
  185 | 
  186 |       // Leave name input empty and click Simpan
  187 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  188 |       await simpanBtn.click();
  189 | 
  190 |       // Verify modal remains open
  191 |       await expect(modal).toBeVisible({ timeout: 3000 });
  192 | 
  193 |       // Close modal with Batal
  194 |       const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  195 |       await cancelBtn.click();
  196 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  197 |     
  198 |     });
  199 |   });
  200 | 
  201 |   test('[TC-04] Edit kategori bahan baku berhasil via modal edit', async ({ page }) => {
  202 |     await test.step('Lakukan pengujian edit kategori bahan baku berhasil via modal edit dan verifikasi pembaruan data', async () => {
  203 |       await ensureIngredientCategoryExists(page);
  204 | 
  205 |       // Get the first valid category row
  206 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
  207 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  208 |       const originalName = (await targetCell.innerText()).trim();
  209 | 
  210 |       const targetRow = page.locator('table tbody tr').filter({ hasText: originalName }).first();
  211 | 
  212 |       // Action 1 (pencil / edit button is the second button in action cell)
  213 |       const editBtn = targetRow.locator('button').nth(1);
  214 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  215 |       await editBtn.click();
  216 | 
  217 |       // Verify edit modal appears
  218 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  219 |       await expect(modal).toBeVisible({ timeout: 5000 });
  220 |       await expect(modal.getByText('Edit Kategori').first()).toBeVisible({ timeout: 5000 });
  221 | 
  222 |       // Update category name
  223 |       const updatedName = 'Updated Kat ' + Date.now();
  224 |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
  225 |       await expect(nameInput).toBeVisible({ timeout: 5000 });
  226 |       await expect(nameInput).toBeEnabled();
  227 |       await nameInput.fill(updatedName);
  228 | 
  229 |       // Click Simpan and wait for PUT/PATCH response
  230 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  231 |       await expect(simpanBtn).toBeVisible();
  232 |       await expect(simpanBtn).toBeEnabled();
  233 |       const [response] = await Promise.all([
  234 |         page.waitForResponse(res => res.url().includes('/ingredients/categories') && (res.request().method() === 'PUT' || res.request().method() === 'PATCH') && res.status() === 200, { timeout: 20000 }),
  235 |         simpanBtn.click(),
  236 |       ]);
  237 |       expect(response.status()).toBe(200);
  238 | 
```