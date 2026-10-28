# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/menu.spec.js >> Manajemen Menu >> [TC-03] Tambah menu paketan berhasil
- Location: tests/Kasflo-Resto/Katalog/menu.spec.js:201:3

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('table').first().locator('tbody tr').first().locator('input[placeholder*="Pilih Buku Menu"]').first()
    - locator resolved to <input value="" exceptid="6266" autocomplete="off" aria-invalid="false" data-variant="default" id="mantine-5ag9d5o6t" aria-haspopup="listbox" placeholder="Pilih Buku Menu" aria-controls="mantine-l35cwqb43" class="m_8fb7ebe7 mantine-Input-input mantine-Select-input"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-position="right" class="m_82577fc2 mantine-Input-section mantine-Select-section">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-position="right" class="m_82577fc2 mantine-Input-section mantine-Select-section">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    57 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div data-position="right" class="m_82577fc2 mantine-Input-section mantine-Select-section">…</div> intercepts pointer events
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
        - generic [ref=f1e28]:
          - link "Kategori" [ref=f1e29] [cursor=pointer]:
            - /url: /admin/catalog/category
          - link "Menu" [ref=f1e31] [cursor=pointer]:
            - /url: /admin/catalog/menu
          - link "Varian" [ref=f1e33] [cursor=pointer]:
            - /url: /admin/catalog/variant
          - link "Buku Menu" [ref=f1e35] [cursor=pointer]:
            - /url: /admin/catalog/book-menu
          - link "Manajemen Stok" [ref=f1e37] [cursor=pointer]:
            - /url: /admin/catalog/stock
          - link "Menu Self Order" [ref=f1e39] [cursor=pointer]:
            - /url: /admin/catalog/self-order-menu
        - link [ref=f1e41] [cursor=pointer]:
          - /url: /admin/ingredients
          - paragraph [ref=f1e49]: Bahan Baku
        - link [ref=f1e53] [cursor=pointer]:
          - /url: /admin/promotion
          - paragraph [ref=f1e61]: Promosi
        - link [ref=f1e65] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f1e74]: Pelanggan
        - link [ref=f1e78] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f1e86]: Pembukuan
        - link [ref=f1e90] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f1e98]: Laporan Usaha
        - link [ref=f1e102] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f1e110]: Manajemen User
        - link [ref=f1e114] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f1e121]: Pengaturan
    - main [ref=f1e125]:
      - generic [ref=f1e126]:
        - generic [ref=f1e128]:
          - paragraph [ref=f1e133]: Menu
          - generic [ref=f1e134]:
            - button "Premium" [ref=f1e136] [cursor=pointer]
            - button "Saldo QRIS" [ref=f1e144] [cursor=pointer]
            - button [ref=f1e150] [cursor=pointer]:
              - generic [ref=f1e157]:
                - paragraph [ref=f1e158]: Kasflo Automation
                - paragraph [ref=f1e159]: OWNER
        - generic [ref=f1e162]:
          - generic [ref=f1e163]:
            - generic [ref=f1e164]:
              - link [ref=f1e165] [cursor=pointer]:
                - /url: /admin/dashboard
              - generic [ref=f1e169]: /
              - link "Menu" [ref=f1e170] [cursor=pointer]:
                - /url: /admin/catalog/menu
              - generic [ref=f1e171]: /
              - paragraph [ref=f1e172]: Tambah Menu Paketan
            - generic [ref=f1e173]:
              - button "Batalkan" [ref=f1e174] [cursor=pointer]
              - button "Simpan" [ref=f1e177] [cursor=pointer]
          - paragraph [ref=f1e181]: Tambah Menu Paketan
          - generic [ref=f1e183]:
            - generic [ref=f1e184]:
              - generic [ref=f1e185]:
                - heading "Informasi Menu" [level=5] [ref=f1e186]
                - generic [ref=f1e187]:
                  - generic [ref=f1e188]:
                    - generic [ref=f1e189]:
                      - generic [ref=f1e190]: Nama Menu Paketan *
                      - textbox "Nama Menu Paketan" [ref=f1e192]:
                        - /placeholder: Masukkan Nama Menu
                        - text: Paket Hemat 1793179361339
                    - generic [ref=f1e193]:
                      - generic [ref=f1e194]: Kode Menu *
                      - textbox "Kode Menu" [active] [ref=f1e196]:
                        - /placeholder: Masukkan Kode Menu
                        - text: PKT36140265
                  - generic [ref=f1e197]:
                    - generic [ref=f1e198]: Kategori Menu
                    - generic [ref=f1e199]:
                      - textbox "Kategori Menu" [ref=f1e200] [cursor=pointer]:
                        - /placeholder: Pilih Kategori Menu
                      - generic [ref=f1e202]:
                        - button [ref=f1e203] [cursor=pointer]
                        - button [ref=f1e208] [cursor=pointer]
                        - link [ref=f1e213] [cursor=pointer]:
                          - /url: /admin/catalog/category/add
                  - generic [ref=f1e216]:
                    - generic [ref=f1e217]: Deskripsi
                    - textbox "Deskripsi" [ref=f1e219]:
                      - /placeholder: Masukkan Deskripsi
                  - generic [ref=f1e220]:
                    - generic [ref=f1e221]: Status Menu
                    - generic [ref=f1e223]:
                      - switch "Aktif" [checked]
                      - generic [ref=f1e227]: Aktif
              - generic [ref=f1e230]:
                - heading "Buku Menu" [level=5] [ref=f1e231]
                - button "Tambah Buku Menu" [ref=f1e234] [cursor=pointer]
                - table [ref=f1e239]:
                  - rowgroup [ref=f1e240]:
                    - row [ref=f1e241]:
                      - cell "#" [ref=f1e242]
                      - cell "Nama Buku Menu" [ref=f1e243]
                      - cell "Harga" [ref=f1e244]
                      - cell "Status" [ref=f1e245]
                      - cell "Action" [ref=f1e246]
                  - rowgroup [ref=f1e247]:
                    - row [ref=f1e248]:
                      - cell "1" [ref=f1e249]
                      - cell [ref=f1e250]:
                        - generic [ref=f1e252]:
                          - textbox "Pilih Buku Menu" [ref=f1e253]: Init BM SelfOrder 1792998973976
                          - generic [ref=f1e255]:
                            - button [ref=f1e256] [cursor=pointer]
                            - link [ref=f1e261] [cursor=pointer]:
                              - /url: /admin/catalog/book-menu/add
                      - cell "Rp" [ref=f1e264]:
                        - generic [ref=f1e266]:
                          - generic [ref=f1e267]: Rp
                          - textbox [ref=f1e268]
                          - generic [ref=f1e270]:
                            - button [aria-hidden] [ref=f1e271] [cursor=pointer]
                            - button [aria-hidden] [ref=f1e274] [cursor=pointer]
                      - cell [ref=f1e277]:
                        - generic [ref=f1e279]:
                          - switch [checked]
                      - cell [ref=f1e283]:
                        - button [ref=f1e284] [cursor=pointer]
              - generic [ref=f1e289]:
                - heading "Isi Paket" [level=5] [ref=f1e290]
                - button "Tambah Isi Paket" [ref=f1e293] [cursor=pointer]
                - table [ref=f1e298]:
                  - rowgroup [ref=f1e299]:
                    - row [ref=f1e300]:
                      - cell "#" [ref=f1e301]
                      - cell "Isi Menu Paket" [ref=f1e302]
                      - cell "Qty" [ref=f1e303]
                      - cell "Action" [ref=f1e304]
                  - rowgroup [ref=f1e305]:
                    - row [ref=f1e306]:
                      - cell "1" [ref=f1e307]
                      - cell [ref=f1e308]:
                        - generic [ref=f1e310]:
                          - textbox "Pilih Menu" [ref=f1e311]
                          - generic [ref=f1e313]:
                            - button [ref=f1e314] [cursor=pointer]
                            - link [ref=f1e319] [cursor=pointer]:
                              - /url: /admin/catalog/menu/unit/add
                      - cell [ref=f1e322]:
                        - generic [ref=f1e324]:
                          - textbox [ref=f1e325]
                          - generic [ref=f1e327]:
                            - button [aria-hidden] [ref=f1e328] [cursor=pointer]
                            - button [aria-hidden] [ref=f1e331] [cursor=pointer]
                      - cell [ref=f1e334]:
                        - button [disabled] [ref=f1e335]
              - generic [ref=f1e340]:
                - heading "Menu Terkait" [level=5] [ref=f1e341]
                - button "Tambah" [ref=f1e344] [cursor=pointer]
                - table [ref=f1e349]:
                  - rowgroup [ref=f1e350]:
                    - row [ref=f1e351]:
                      - cell "#" [ref=f1e352]
                      - cell "Daftar Menu" [ref=f1e353]
                      - cell "Action" [ref=f1e354]
                  - rowgroup
            - generic [ref=f1e356]:
              - heading "Gambar" [level=5] [ref=f1e358]
              - generic [ref=f1e360] [cursor=pointer]:
                - generic:
                  - generic:
                    - paragraph: Masukan Gambar dengan cara seret & lepasatau klik area ini
                    - paragraph: Gunakan file .jpg/.png & maks. 5 MB. Ukuran rekomendasi 512px X 512px
              - heading "Lencana Menu" [level=5] [ref=f1e362]
              - generic [ref=f1e366] [cursor=pointer]
              - heading "Preview Menu" [level=5] [ref=f1e370]
              - generic [ref=f1e374]:
                - heading "Paket Hemat 1793179361339" [level=5] [ref=f1e375]
                - paragraph [ref=f1e376]: Deskripsi
  - link "Konsultasi Sekarang" [ref=f1e377] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Manajemen Menu', () => {
  4   |   // Helper selector for actual data rows (excluding the empty "No results found" placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table tbody tr:not(:has-text("No results found"))');
  7   |   }
  8   | 
  9   |   // Helper to wait for loading overlays/spinners to disappear
  10  |   async function waitForPageReady(page) {
  11  |     const loader = page.locator(
  12  |       '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
  13  |     );
  14  |     await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  15  |   }
  16  | 
  17  |   // Shared resilient login helper
  18  |   async function loginBeforeTest(page) {
  19  |     if (page.url().includes('/admin/')) {
  20  |       await waitForPageReady(page);
  21  |       return page;
  22  |     }
  23  | 
  24  |     try {
  25  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  26  |     } catch {
  27  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
  28  |     }
  29  | 
  30  |     await waitForPageReady(page);
  31  | 
  32  |     if (page.url().includes('/admin/')) {
  33  |       return page;
  34  |     }
  35  | 
  36  |     const emailInput = page.getByLabel(/Email atau Username/i);
  37  |     const isLoginVisible = await emailInput.isVisible({ timeout: 5000 }).catch(() => false);
  38  |     if (!isLoginVisible && page.url().includes('/admin/')) {
  39  |       await waitForPageReady(page);
  40  |       return page;
  41  |     }
  42  | 
  43  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  44  |     await emailInput.fill('qakasflo@automation.com');
  45  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  46  |     await page.waitForTimeout(500);
  47  | 
  48  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  49  |     await expect(loginBtn).toBeVisible({ timeout: 10000 });
  50  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  51  |     await loginBtn.click();
  52  | 
  53  |     try {
  54  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
  55  |     } catch {
  56  |       if (!page.url().includes('/admin/')) {
  57  |         await page.waitForTimeout(1000);
  58  |         if (await loginBtn.isVisible().catch(() => false)) {
  59  |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  60  |         }
  61  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  62  |       }
  63  |     }
  64  | 
  65  |     await waitForPageReady(page);
  66  |     return page;
  67  |   }
  68  | 
  69  |   // Helper to fill Buku Menu table row(s) cleanly (Pilih Buku Menu + Harga)
  70  |   async function fillBukuMenuTablePrice(page, priceValue) {
  71  |     const bukuMenuTable = page.locator('table').first();
  72  |     await expect(bukuMenuTable).toBeVisible({ timeout: 10000 });
  73  |     const firstRow = bukuMenuTable.locator('tbody tr').first();
  74  |     await expect(firstRow).toBeVisible({ timeout: 10000 });
  75  | 
  76  |     // Ensure Buku Menu dropdown in column 2 has a value selected
  77  |     const bmSelect = firstRow.locator('input[placeholder*="Pilih Buku Menu"]').first();
  78  |     if (await bmSelect.isVisible({ timeout: 2000 }).catch(() => false)) {
  79  |       const currentVal = await bmSelect.inputValue().catch(() => '');
  80  |       if (!currentVal || currentVal.trim() === '') {
> 81  |         await bmSelect.click();
      |                        ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  82  |         const option = page.locator('.mantine-Select-dropdown:visible [role="option"], .mantine-Combobox-dropdown:visible [role="option"], [role="option"]:visible').first();
  83  |         if (await option.isVisible({ timeout: 5000 }).catch(() => false)) {
  84  |           await option.click();
  85  |         }
  86  |       }
  87  |     }
  88  | 
  89  |     // Target the Harga input in column 3 (td.nth(2)) or the last text input in the row
  90  |     const priceCellInput = firstRow.locator('td').nth(2).locator('input').first();
  91  |     if (await priceCellInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  92  |       await expect(priceCellInput).toBeEnabled();
  93  |       await priceCellInput.click();
  94  |       await priceCellInput.fill(priceValue);
  95  |     } else {
  96  |       const fallbackPriceInput = firstRow.locator('input[type="text"]').last();
  97  |       await expect(fallbackPriceInput).toBeVisible({ timeout: 5000 });
  98  |       await expect(fallbackPriceInput).toBeEnabled();
  99  |       await fallbackPriceInput.click();
  100 |       await fallbackPriceInput.fill(priceValue);
  101 |     }
  102 |   }
  103 | 
  104 |   // Helper to create a single menu unit
  105 |   async function createMenuUnit(page, menuName) {
  106 |     const addBtn = page.getByRole('link', { name: 'Tambah Menu Satuan' }).or(page.getByRole('button', { name: 'Tambah Menu Satuan' })).first();
  107 |     await expect(addBtn).toBeVisible({ timeout: 15000 });
  108 |     await expect(addBtn).toBeEnabled({ timeout: 10000 });
  109 |     await addBtn.click();
  110 | 
  111 |     await expect(page).toHaveURL(/.*\/admin\/catalog\/menu\/unit\/add/, { timeout: 15000 });
  112 |     await waitForPageReady(page);
  113 | 
  114 |     const nameInput = page.getByPlaceholder('Masukkan Nama Menu').or(page.getByLabel(/Nama Menu/i)).first();
  115 |     await expect(nameInput).toBeVisible({ timeout: 10000 });
  116 |     await expect(nameInput).toBeEnabled();
  117 |     await nameInput.fill(menuName);
  118 | 
  119 |     const codeInput = page.getByPlaceholder('Masukkan Kode Menu').or(page.getByLabel(/Kode Menu/i)).first();
  120 |     if (await codeInput.isVisible().catch(() => false)) {
  121 |       const uniqueCode = 'TM' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10);
  122 |       await codeInput.fill(uniqueCode);
  123 |     }
  124 | 
  125 |     // Select Kategori dropdown
  126 |     const categoryInput = page.locator('input[placeholder*="Kategori"], [placeholder*="Pilih Kategori"]').first();
  127 |     if (await categoryInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  128 |       await categoryInput.click();
  129 |       const firstOption = page.locator('.mantine-Select-dropdown:visible [role="option"], .mantine-Combobox-dropdown:visible [role="option"], [role="option"]:visible').first();
  130 |       if (await firstOption.isVisible({ timeout: 5000 }).catch(() => false)) {
  131 |         await firstOption.click();
  132 |       }
  133 |     }
  134 | 
  135 |     // Fill Harga in Buku Menu table
  136 |     await fillBukuMenuTablePrice(page, '15000');
  137 | 
  138 |     const saveBtn = page.getByRole('button', { name: 'Simpan' });
  139 |     await expect(saveBtn).toBeVisible({ timeout: 10000 });
  140 |     await expect(saveBtn).toBeEnabled({ timeout: 10000 });
  141 |     await saveBtn.click();
  142 | 
  143 |     await expect(page).toHaveURL(/\/admin\/catalog\/menu$/, { timeout: 25000 });
  144 |     await waitForPageReady(page);
  145 |   }
  146 | 
  147 |   // Ensure at least 1 menu exists for tests that inspect or view items
  148 |   async function ensureMenuExists(page) {
  149 |     const dataRows = getDataRows(page);
  150 |     if (await dataRows.count() === 0) {
  151 |       await createMenuUnit(page, 'Menu ' + Date.now());
  152 |     }
  153 |   }
  154 | 
  155 |   test.beforeEach(async ({ page }) => {
  156 |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  157 |       // Step 1: Login
  158 |       await loginBeforeTest(page);
  159 | 
  160 |       // Step 2: Navigate to menu page
  161 |       await page.goto('/admin/catalog/menu', { waitUntil: 'domcontentloaded' });
  162 |       await waitForPageReady(page);
  163 | 
  164 |       // Step 3: Verify menu page loaded
  165 |       await expect(page).toHaveURL(/\/admin\/catalog\/menu/);
  166 |       await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  167 |     });
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
```