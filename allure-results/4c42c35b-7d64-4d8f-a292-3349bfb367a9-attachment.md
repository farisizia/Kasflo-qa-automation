# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Promosi/harga_spesial.spec.js >> Harga Spesial >> [TC-12] Hapus harga spesial berhasil dengan konfirmasi modal
- Location: tests/Promosi/harga_spesial.spec.js:479:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="dialog"], .mantine-Modal-content').last().locator('table tbody tr input[type="checkbox"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('[role="dialog"], .mantine-Modal-content').last().locator('table tbody tr input[type="checkbox"]').first() with timeout 5000ms
  - waiting for locator('[role="dialog"], .mantine-Modal-content').last().locator('table tbody tr input[type="checkbox"]').first()

```

```yaml
- dialog "Tambah Menu":
  - banner:
    - heading "Tambah Menu" [level=2]
    - button:
      - img
  - textbox "Cari Menu Disini"
  - img
  - button "Refresh":
    - img
    - text: Refresh
  - table:
    - rowgroup:
      - row "Menu Sort by Menu descending Move Column Actions Kategori Sort by Kategori descending Move Column Actions Harga Per Buku Menu Sort by Harga Per Buku Menu descending Move Column Actions":
        - columnheader
        - columnheader "Menu Sort by Menu descending Move Column Actions":
          - text: Menu
          - button "Sort by Menu descending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader "Kategori Sort by Kategori descending Move Column Actions":
          - text: Kategori
          - button "Sort by Kategori descending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader "Harga Per Buku Menu Sort by Harga Per Buku Menu descending Move Column Actions":
          - text: Harga Per Buku Menu
          - button "Sort by Harga Per Buku Menu descending":
            - img
          - button "Move":
            - img
          - button "Column Actions":
            - img
          - separator
        - columnheader
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
  - button "Batal"
  - button "Tambahkan" [disabled]
```

# Test source

```ts
  16  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 25000 });
  17  |     } catch {
  18  |       await page.goto('/', { waitUntil: 'commit', timeout: 25000 });
  19  |     }
  20  | 
  21  |     if (page.url().includes('/admin/')) {
  22  |       return page;
  23  |     }
  24  | 
  25  |     const emailInput = page.getByLabel(/Email atau Username/i);
  26  |     await expect(emailInput).toBeVisible({ timeout: 15000 });
  27  | 
  28  |     await emailInput.fill('qakasflo@automation.com');
  29  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  30  | 
  31  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  32  |     await expect(loginBtn).toBeEnabled({ timeout: 5000 });
  33  |     await loginBtn.click();
  34  | 
  35  |     try {
  36  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
  37  |     } catch {
  38  |       if (!page.url().includes('/admin/')) {
  39  |         if (await loginBtn.isEnabled().catch(() => false)) {
  40  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  41  |         }
  42  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  43  |       }
  44  |     }
  45  |     return page;
  46  |   }
  47  | 
  48  |   // Helper to select an option in a Mantine Select dropdown
  49  |   async function selectMantineOption(page, inputLocator, optionText) {
  50  |     await inputLocator.click();
  51  | 
  52  |     if (optionText) {
  53  |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible')
  54  |         .filter({ hasText: optionText }).first();
  55  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  56  |         await option.click();
  57  |         return;
  58  |       }
  59  |     }
  60  | 
  61  |     // Default: click first visible option
  62  |     const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
  63  |     await expect(firstOption).toBeVisible({ timeout: 5000 });
  64  |     await firstOption.click();
  65  |   }
  66  | 
  67  |   // Helper to create a Special Price Promo
  68  |   async function createSpecialPricePromo(page, promoName) {
  69  |     const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
  70  |       .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
  71  |     await expect(addBtn).toBeVisible({ timeout: 10000 });
  72  |     await addBtn.click();
  73  | 
  74  |     await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/, { timeout: 15000 });
  75  | 
  76  |     // Fill Nama Promo
  77  |     const nameInput = page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first();
  78  |     await expect(nameInput).toBeVisible({ timeout: 10000 });
  79  |     await nameInput.fill(promoName);
  80  | 
  81  |     // Select Cabang
  82  |     const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  83  |     await expect(cabangInput).toBeVisible({ timeout: 10000 });
  84  |     await selectMantineOption(page, cabangInput);
  85  | 
  86  |     // Select Tanggal Mulai
  87  |     const startBtn = page.locator('button[data-dates-input="true"]').nth(0);
  88  |     await expect(startBtn).toBeVisible({ timeout: 5000 });
  89  |     await startBtn.click();
  90  |     const startPopover = page.locator('.mantine-Popover-dropdown:visible').last();
  91  |     await expect(startPopover).toBeVisible({ timeout: 5000 });
  92  |     await startPopover.locator('td button:not([data-disabled])').first().click();
  93  | 
  94  |     // Select Tanggal Berakhir
  95  |     const endBtn = page.locator('button[data-dates-input="true"]').nth(1);
  96  |     await expect(endBtn).toBeVisible({ timeout: 5000 });
  97  |     await endBtn.click();
  98  |     const endPopover = page.locator('.mantine-Popover-dropdown:visible').last();
  99  |     await expect(endPopover).toBeVisible({ timeout: 5000 });
  100 |     await endPopover.locator('td button:not([data-disabled])').last().click();
  101 | 
  102 |     // Add Menu via Modal (Daftar Menu is visible after selecting Cabang)
  103 |     const tambahMenuBtn = page.getByRole('button', { name: /Tambah Menu/i });
  104 |     await expect(tambahMenuBtn).toBeVisible({ timeout: 5000 });
  105 |     await tambahMenuBtn.click();
  106 | 
  107 |     const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
  108 |     await expect(modal).toBeVisible({ timeout: 5000 });
  109 | 
  110 |     // Check available menu with positive price if available
  111 |     const pricedRow = modal.locator('table tbody tr').filter({ hasText: /Rp\s*[1-9]/ }).first();
  112 |     if (await pricedRow.isVisible({ timeout: 3000 }).catch(() => false)) {
  113 |       await pricedRow.locator('input[type="checkbox"]').check();
  114 |     } else {
  115 |       const firstCheckbox = modal.locator('table tbody tr input[type="checkbox"]').first();
> 116 |       await expect(firstCheckbox).toBeVisible({ timeout: 5000 });
      |                                   ^ Error: expect(locator).toBeVisible() failed
  117 |       await firstCheckbox.check();
  118 |     }
  119 | 
  120 |     const tambahkanBtn = modal.getByRole('button', { name: /Tambahkan/i });
  121 |     await expect(tambahkanBtn).toBeEnabled({ timeout: 5000 });
  122 |     await tambahkanBtn.click();
  123 |     await expect(modal).not.toBeVisible({ timeout: 5000 });
  124 | 
  125 |     // Set Harga Spesial for added item (harus lebih kecil dari harga normal)
  126 |     const hargaSpesialInput = page.getByPlaceholder(/Masukan Harga Spesial/i)
  127 |       .or(page.locator('table input[type="text"], table input[type="number"]')).first();
  128 |     if (await hargaSpesialInput.isVisible({ timeout: 5000 }).catch(() => false)) {
  129 |       const row = hargaSpesialInput.locator('xpath=ancestor::tr');
  130 |       const cells = row.locator('td');
  131 |       let normalPrice = 0;
  132 |       const count = await cells.count();
  133 |       for (let i = 0; i < count; i++) {
  134 |         const text = await cells.nth(i).innerText().catch(() => '');
  135 |         if (/Rp\s*\d+/i.test(text)) {
  136 |           const val = parseInt(text.replace(/\D/g, ''), 10);
  137 |           if (val > 0) {
  138 |             normalPrice = val;
  139 |             break;
  140 |           }
  141 |         }
  142 |       }
  143 | 
  144 |       const promoPrice = normalPrice > 1000 ? Math.floor(normalPrice * 0.7) : 500;
  145 |       await hargaSpesialInput.click();
  146 |       await hargaSpesialInput.fill(String(promoPrice));
  147 |     }
  148 | 
  149 |     // Ensure POS channel switch is enabled
  150 |     const posSwitch = page.locator('table tbody tr').first().locator('input[type="checkbox"], [role="switch"]').first();
  151 |     if (await posSwitch.isVisible({ timeout: 3000 }).catch(() => false)) {
  152 |       const isChecked = await posSwitch.isChecked().catch(() => false);
  153 |       if (!isChecked) {
  154 |         await posSwitch.check().catch(async () => {
  155 |           await posSwitch.click({ force: true });
  156 |         });
  157 |       }
  158 |     }
  159 | 
  160 |     // Submit Form
  161 |     const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  162 |     await expect(simpanBtn).toBeEnabled({ timeout: 10000 });
  163 |     await simpanBtn.click();
  164 | 
  165 |     await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 25000 });
  166 |     await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  167 |   }
  168 | 
  169 |   // Helper to ensure at least one promo exists
  170 |   async function ensurePromoExists(page) {
  171 |     const dataRows = getDataRows(page);
  172 |     const count = await dataRows.count();
  173 |     if (count === 0) {
  174 |       const newName = 'Promo Auto ' + Date.now();
  175 |       await createSpecialPricePromo(page, newName);
  176 |       return newName;
  177 |     }
  178 |     const firstCell = dataRows.first().locator('td:first-child');
  179 |     return (await firstCell.innerText()).trim();
  180 |   }
  181 | 
  182 |   test.beforeEach(async ({ page }) => {
  183 |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  184 |       // Step 1: Login
  185 |       await loginBeforeTest(page);
  186 | 
  187 |       // Step 2: Navigate to Special Price page
  188 |       await page.goto('/admin/promotion/special-price', { waitUntil: 'domcontentloaded' });
  189 | 
  190 |       // Step 3: Verify special price page loaded
  191 |       await expect(page).toHaveURL(/\/admin\/promotion\/special-price/);
  192 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  193 |     
  194 |     });
  195 |   });
  196 | 
  197 |   test('[TC-01] Menampilkan halaman harga spesial dengan tabel, header, dan filter yang sesuai', async ({ page }) => {
  198 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman harga spesial dengan tabel, header, dan filter yang sesuai', async () => {
  199 |       // Verify page heading / breadcrumb
  200 |       await expect(page.getByText('Harga Spesial').first()).toBeVisible({ timeout: 10000 });
  201 | 
  202 |       // Verify filter elements
  203 |       const cabangFilter = page.locator('input[placeholder="Pilih Cabang"]:visible').first();
  204 |       await expect(cabangFilter).toBeVisible({ timeout: 5000 });
  205 | 
  206 |       const statusFilter = page.getByLabel('Filter Status').or(page.locator('input[value="Semua Status"]:visible')).first();
  207 |       await expect(statusFilter).toBeVisible({ timeout: 5000 });
  208 | 
  209 |       const periodeBtn = page.getByRole('button', { name: /Pilih Periode Tanggal/i })
  210 |         .or(page.locator('button:has-text("Pilih Periode Tanggal")')).first();
  211 |       await expect(periodeBtn).toBeVisible({ timeout: 5000 });
  212 | 
  213 |       // Verify Add Button exists
  214 |       const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
  215 |         .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
  216 |       await expect(addBtn).toBeVisible({ timeout: 10000 });
```