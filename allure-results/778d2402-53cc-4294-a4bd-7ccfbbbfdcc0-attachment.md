# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/kategori_bahan_baku.spec.js >> Kategori Bahan Baku >> [TC-02] Tambah kategori bahan baku baru berhasil via modal
- Location: tests/Kasflo-Resto/Bahan Baku/kategori_bahan_baku.spec.js:93:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table tbody tr td:first-child').filter({ hasText: 'Kat Bahan 1792997832359' }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('table tbody tr td:first-child').filter({ hasText: 'Kat Bahan 1792997832359' }).first() with timeout 10000ms
  - waiting for locator('table tbody tr td:first-child').filter({ hasText: 'Kat Bahan 1792997832359' }).first()

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
  - link "Bahan Baku":
    - /url: /admin/ingredients
    - img
    - paragraph: Bahan Baku
    - img
  - link "Kategori Bahan Baku":
    - /url: /admin/ingredients/category
  - link "Data Bahan Baku":
    - /url: /admin/ingredients/ingredients
  - link "Resep":
    - /url: /admin/ingredients/recipe
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
  - paragraph: Kategori Bahan Baku
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
  - paragraph: Kategori Bahan Baku
  - button "Buat Kategori Bahan Baku":
    - img
    - text: Buat Kategori Bahan Baku
  - textbox "Semua Cabang": Kasflo Pusat QA
  - button:
    - img
  - textbox "Cari disini..."
  - button "Show/Hide columns":
    - img
  - button "Toggle full screen":
    - img
  - table:
    - rowgroup:
      - row "Nama Kategori Move Column Actions Bahan Baku Move Column Actions Action":
        - columnheader "Nama Kategori Move Column Actions":
          - text: Nama Kategori
          - button "Move":
            - img
          - button "Column Actions":
            - img
        - columnheader "Bahan Baku Move Column Actions":
          - text: Bahan Baku
          - button "Move":
            - img
          - button "Column Actions":
            - img
        - columnheader "Action"
    - rowgroup:
      - row "Kat Bahan 1792639574693 0 Bahan Baku":
        - cell "Kat Bahan 1792639574693"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792639582003 0 Bahan Baku":
        - cell "Init Kat Bahan 1792639582003"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792639584624 0 Bahan Baku":
        - cell "Init Kat Bahan 1792639584624"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792639587156 0 Bahan Baku":
        - cell "Init Kat Bahan 1792639587156"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Kat Bahan 1792643809862 0 Bahan Baku":
        - cell "Kat Bahan 1792643809862"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792643814045 0 Bahan Baku":
        - cell "Init Kat Bahan 1792643814045"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792643817394 0 Bahan Baku":
        - cell "Init Kat Bahan 1792643817394"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792643820402 0 Bahan Baku":
        - cell "Init Kat Bahan 1792643820402"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792643823035 0 Bahan Baku":
        - cell "Init Kat Bahan 1792643823035"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Kat Bahan 1792652685328 0 Bahan Baku":
        - cell "Kat Bahan 1792652685328"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792652690660 0 Bahan Baku":
        - cell "Init Kat Bahan 1792652690660"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792652699699 0 Bahan Baku":
        - cell "Init Kat Bahan 1792652699699"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Kat Bahan 1792658113083 0 Bahan Baku":
        - cell "Kat Bahan 1792658113083"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792658117966 0 Bahan Baku":
        - cell "Init Kat Bahan 1792658117966"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792658120803 0 Bahan Baku":
        - cell "Init Kat Bahan 1792658120803"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Kat Bahan 1792661517884 0 Bahan Baku":
        - cell "Kat Bahan 1792661517884"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792661523047 0 Bahan Baku":
        - cell "Init Kat Bahan 1792661523047"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792661526571 0 Bahan Baku":
        - cell "Init Kat Bahan 1792661526571"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792661529336 0 Bahan Baku":
        - cell "Init Kat Bahan 1792661529336"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792661531960 0 Bahan Baku":
        - cell "Init Kat Bahan 1792661531960"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Kat Bahan 1792725025286 0 Bahan Baku":
        - cell "Kat Bahan 1792725025286"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792725029553 0 Bahan Baku":
        - cell "Init Kat Bahan 1792725029553"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792725032532 0 Bahan Baku":
        - cell "Init Kat Bahan 1792725032532"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792725035835 0 Bahan Baku":
        - cell "Init Kat Bahan 1792725035835"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
      - row "Init Kat Bahan 1792725038329 0 Bahan Baku":
        - cell "Init Kat Bahan 1792725038329"
        - cell "0 Bahan Baku"
        - cell:
          - button:
            - img
          - button:
            - img
          - button:
            - img
    - rowgroup
  - paragraph: Rows per page
  - textbox "Rows per page": "25"
  - img
  - paragraph: 1-25 of 36
  - button "Go to previous page" [disabled]:
    - img
  - button "Go to next page":
    - img
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  25  |       if (!page.url().includes('/admin/')) {
  26  |         if (await loginBtn.isEnabled().catch(() => false)) {
  27  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  28  |         }
  29  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  30  |       }
  31  |     }
  32  |     return page;
  33  |   }
  34  | 
  35  |   // Helper to ensure at least one ingredient category exists
  36  |   async function ensureIngredientCategoryExists(page) {
  37  |     const emptyState = page.locator('table tbody tr', { hasText: /Belum Ada Data|No results found/i });
  38  |     const hasEmpty = await emptyState.isVisible().catch(() => false);
  39  |     if (hasEmpty) {
  40  |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  41  |       await addBtn.click();
  42  | 
  43  |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  44  |       await expect(modal).toBeVisible({ timeout: 10000 });
  45  | 
  46  |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
  47  |       const catName = 'Init Kat Bahan ' + Date.now();
  48  |       await nameInput.fill(catName);
  49  | 
  50  |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  51  |       await simpanBtn.click();
  52  |       await expect(modal).not.toBeVisible({ timeout: 15000 });
  53  |     }
  54  |   }
  55  | 
  56  |   test.beforeEach(async ({ page }) => {
  57  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  58  |       // Step 1: Login
  59  |       await loginBeforeTest(page);
  60  | 
  61  |       // Step 2: Navigate to Ingredient Category page
  62  |       await page.goto('/admin/ingredients/category', { waitUntil: 'domcontentloaded' });
  63  | 
  64  |       // Step 3: Verify page loaded
  65  |       await expect(page).toHaveURL(/\/admin\/ingredients\/category/);
  66  |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  67  |     
  68  |     });
  69  |   });
  70  | 
  71  |   test('[TC-01] Menampilkan halaman kategori bahan baku dengan tabel dan header yang sesuai', async ({ page }) => {
  72  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman kategori bahan baku dengan tabel dan header yang sesuai', async () => {
  73  |       // Verify page heading / breadcrumb
  74  |       await expect(page.getByText('Kategori Bahan Baku').first()).toBeVisible();
  75  | 
  76  |       // Check table visibility
  77  |       const table = page.locator('table');
  78  |       await expect(table).toBeVisible();
  79  | 
  80  |       // Verify table headers
  81  |       const thead = page.locator('thead');
  82  |       await expect(thead.getByText('Nama Kategori', { exact: true }).first()).toBeVisible();
  83  |       await expect(thead.getByText('Bahan Baku', { exact: true }).first()).toBeVisible();
  84  |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  85  | 
  86  |       // Verify Add button exists
  87  |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  88  |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  89  |     
  90  |     });
  91  |   });
  92  | 
  93  |   test('[TC-02] Tambah kategori bahan baku baru berhasil via modal', async ({ page }) => {
  94  |     await test.step('Lakukan proses tambah kategori bahan baku baru berhasil via modal dan pastikan data tersimpan', async () => {
  95  |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  96  |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  97  |       await addBtn.click();
  98  | 
  99  |       // Verify modal appears
  100 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  101 |       await expect(modal).toBeVisible({ timeout: 5000 });
  102 |       await expect(modal.getByText('Tambah Kategori').first()).toBeVisible({ timeout: 5000 });
  103 | 
  104 |       // Fill form field
  105 |       const catName = 'Kat Bahan ' + Date.now();
  106 |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
  107 |       await expect(nameInput).toBeVisible({ timeout: 5000 });
  108 |       await nameInput.fill(catName);
  109 | 
  110 |       // Click Simpan and wait for POST request response 200 OK
  111 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  112 |       await expect(simpanBtn).toBeVisible();
  113 | 
  114 |       const [response] = await Promise.all([
  115 |         page.waitForResponse(res => res.url().includes('/ingredients/categories') && res.request().method() === 'POST' && res.status() === 200, { timeout: 20000 }),
  116 |         simpanBtn.click(),
  117 |       ]);
  118 |       expect(response.status()).toBe(200);
  119 | 
  120 |       // Verify modal is closed
  121 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
  122 | 
  123 |       // Verify created category is visible in table
  124 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasText: catName });
> 125 |       await expect(targetCell.first()).toBeVisible({ timeout: 10000 });
      |                                        ^ Error: expect(locator).toBeVisible() failed
  126 |     
  127 |     });
  128 |   });
  129 | 
  130 |   test('[TC-03] Validasi input nama kategori kosong pada modal tambah', async ({ page }) => {
  131 |     await test.step('Validasi input nama kategori kosong pada modal tambah', async () => {
  132 |       const addBtn = page.getByRole('button', { name: /Buat Kategori Bahan Baku/i });
  133 |       await addBtn.click();
  134 | 
  135 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  136 |       await expect(modal).toBeVisible({ timeout: 5000 });
  137 | 
  138 |       // Leave name input empty and click Simpan
  139 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  140 |       await simpanBtn.click();
  141 | 
  142 |       // Verify modal remains open
  143 |       await expect(modal).toBeVisible({ timeout: 3000 });
  144 | 
  145 |       // Close modal with Batal
  146 |       const cancelBtn = modal.getByRole('button', { name: /Batal/i });
  147 |       await cancelBtn.click();
  148 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  149 |     
  150 |     });
  151 |   });
  152 | 
  153 |   test('[TC-04] Edit kategori bahan baku berhasil via modal edit', async ({ page }) => {
  154 |     await test.step('Lakukan pengujian edit kategori bahan baku berhasil via modal edit dan verifikasi pembaruan data', async () => {
  155 |       await ensureIngredientCategoryExists(page);
  156 | 
  157 |       // Get the first valid category row
  158 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
  159 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  160 |       const originalName = (await targetCell.innerText()).trim();
  161 | 
  162 |       const targetRow = page.locator('table tbody tr').filter({ hasText: originalName }).first();
  163 | 
  164 |       // Action 1 (pencil / edit button is the second button in action cell)
  165 |       const editBtn = targetRow.locator('button').nth(1);
  166 |       await expect(editBtn).toBeVisible({ timeout: 10000 });
  167 |       await editBtn.click();
  168 | 
  169 |       // Verify edit modal appears
  170 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  171 |       await expect(modal).toBeVisible({ timeout: 5000 });
  172 |       await expect(modal.getByText('Edit Kategori').first()).toBeVisible({ timeout: 5000 });
  173 | 
  174 |       // Update category name
  175 |       const updatedName = 'Updated Kat ' + Math.floor(Math.random() * 1000);
  176 |       const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori');
  177 |       await expect(nameInput).toBeVisible({ timeout: 5000 });
  178 |       await nameInput.fill(updatedName);
  179 | 
  180 |       // Click Simpan and wait for PUT/PATCH response
  181 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true });
  182 |       const [response] = await Promise.all([
  183 |         page.waitForResponse(res => res.url().includes('/ingredients/categories') && (res.request().method() === 'PUT' || res.request().method() === 'PATCH') && res.status() === 200, { timeout: 20000 }),
  184 |         simpanBtn.click(),
  185 |       ]);
  186 |       expect(response.status()).toBe(200);
  187 | 
  188 |       // Verify modal closed and updated text appears in table
  189 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
  190 |       const updatedCell = page.locator('table tbody tr td:first-child').filter({ hasText: updatedName });
  191 |       await expect(updatedCell.first()).toBeVisible({ timeout: 10000 });
  192 |     
  193 |     });
  194 |   });
  195 | 
  196 |   test('[TC-05] Hapus kategori bahan baku dengan ikon trash', async ({ page }) => {
  197 |     await test.step('Lakukan proses hapus kategori bahan baku dengan ikon trash dan konfirmasi penghapusan data', async () => {
  198 |       await ensureIngredientCategoryExists(page);
  199 | 
  200 |       // Get the first valid category row
  201 |       const targetCell = page.locator('table tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
  202 |       await expect(targetCell).not.toBeEmpty({ timeout: 10000 });
  203 |       const delCategoryName = (await targetCell.innerText()).trim();
  204 |       expect(delCategoryName.length).toBeGreaterThan(0);
  205 | 
  206 |       const targetRow = page.locator('table tbody tr').filter({ hasText: delCategoryName }).first();
  207 | 
  208 |       // Action 2 (trash button is the last button in row)
  209 |       const deleteBtn = targetRow.locator('button').last();
  210 |       await expect(deleteBtn).toBeVisible({ timeout: 10000 });
  211 |       await deleteBtn.click();
  212 | 
  213 |       // Verify confirmation modal appears
  214 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  215 |       await expect(modal).toBeVisible({ timeout: 5000 });
  216 |       await expect(modal.getByText(/Hapus Kategori Bahan Baku|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });
  217 | 
  218 |       // Click confirm delete and await DELETE response
  219 |       const confirmBtn = modal.getByRole('button', { name: /Hapus|Ya/i }).first();
  220 |       await expect(confirmBtn).toBeVisible();
  221 | 
  222 |       const [response] = await Promise.all([
  223 |         page.waitForResponse(res => res.url().includes('/ingredients/categories') && res.request().method() === 'DELETE' && res.status() === 200, { timeout: 20000 }),
  224 |         confirmBtn.click(),
  225 |       ]);
```