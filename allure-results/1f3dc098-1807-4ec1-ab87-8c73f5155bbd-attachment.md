# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Katalog/menu_self_order.spec.js >> Menu Self Order >> [TC-10] Cari/filter menu pada halaman edit menu self order
- Location: tests/Kasflo-Resto/Katalog/menu_self_order.spec.js:468:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('input[placeholder*="Cabang"], .mantine-MultiSelect-inputField, .mantine-MultiSelect-input').first()
    - locator resolved to <div data-variant="default" class="m_8fb7ebe7 mantine-Input-input mantine-MultiSelect-input">…</div>
  - attempting click action
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

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
        - link [ref=f3e27] [cursor=pointer]:
          - /url: /admin/ingredients
          - paragraph [ref=f3e35]: Bahan Baku
        - link [ref=f3e39] [cursor=pointer]:
          - /url: /admin/promotion
          - paragraph [ref=f3e47]: Promosi
        - link [ref=f3e51] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f3e60]: Pelanggan
        - link [ref=f3e64] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f3e72]: Pembukuan
        - link [ref=f3e76] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f3e84]: Laporan Usaha
        - link [ref=f3e88] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f3e96]: Manajemen User
        - link [ref=f3e100] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f3e107]: Pengaturan
        - link [ref=f3e111] [cursor=pointer]:
          - /url: /admin/subscription
          - paragraph [ref=f3e118]: Berlangganan
    - main [ref=f3e119]:
      - generic [ref=f3e120]:
        - generic [ref=f3e121]:
          - paragraph [ref=f3e122]: Subscription akan berakhir dalam 4 hari.
          - link [ref=f3e123] [cursor=pointer]:
            - /url: /admin/subscription?tab=history-subscription
            - paragraph [ref=f3e124]: Kunjungi Halaman Berlangganan
        - generic [ref=f3e126]:
          - paragraph [ref=f3e131]: Buku Menu
          - generic [ref=f3e132]:
            - button "Business" [ref=f3e134] [cursor=pointer]
            - button "Saldo QRIS" [ref=f3e142] [cursor=pointer]
            - button [ref=f3e148] [cursor=pointer]:
              - generic [ref=f3e155]:
                - paragraph [ref=f3e156]: Kasflo Automation
                - paragraph [ref=f3e157]: OWNER
        - generic [ref=f3e160]:
          - generic [ref=f3e161]:
            - generic [ref=f3e163]:
              - link [ref=f3e164] [cursor=pointer]:
                - /url: /admin/dashboard
              - generic [ref=f3e168]: /
              - link "Buku Menu" [ref=f3e169] [cursor=pointer]:
                - /url: /admin/catalog/book-menu
              - generic [ref=f3e170]: /
              - paragraph [ref=f3e171]: Tambah Buku Menu
            - generic [ref=f3e172]:
              - button "Batalkan" [ref=f3e173] [cursor=pointer]
              - button "Simpan" [ref=f3e176] [cursor=pointer]
          - generic [ref=f3e179]:
            - heading "Tambah Buku Menu" [level=5] [ref=f3e180]
            - generic [ref=f3e182]:
              - generic [ref=f3e183]: Nama Buku Menu *
              - textbox "Nama Buku Menu" [active] [ref=f3e185]:
                - /placeholder: Masukkan Nama Buku Menu
                - text: Init BM SelfOrder 1792982557100
            - generic [ref=f3e186]:
              - generic [ref=f3e187]: Status Buku Menu
              - generic [ref=f3e189]:
                - switch "Aktif" [checked]
                - generic [ref=f3e193]: Aktif
        - generic [ref=f3e196]:
          - heading "Daftar Menu" [level=5] [ref=f3e198]
          - generic [ref=f3e200]:
            - generic [ref=f3e202]:
              - generic [ref=f3e203]:
                - textbox "Cari Menu..." [ref=f3e205]
                - generic [ref=f3e207]:
                  - textbox "Filter Kategori" [ref=f3e208] [cursor=pointer]
                  - generic [ref=f3e210]:
                    - button [ref=f3e211] [cursor=pointer]
                    - button [ref=f3e216] [cursor=pointer]
                - textbox "Filter Status" [ref=f3e223] [cursor=pointer]: Filter Semua Status
              - generic [ref=f3e225]:
                - button "Show/Hide columns" [ref=f3e226] [cursor=pointer]
                - button "Toggle full screen" [ref=f3e229] [cursor=pointer]
            - table [ref=f3e237]:
              - rowgroup [ref=f3e238]:
                - row [ref=f3e239]:
                  - columnheader "Nama Menu Sort by Nama Menu ascending Move Column Actions" [ref=f3e240]:
                    - generic [ref=f3e241]:
                      - generic [ref=f3e242] [cursor=pointer]:
                        - generic [ref=f3e243]: Nama Menu
                        - button "Sort by Nama Menu ascending" [ref=f3e244]
                      - generic [ref=f3e249]:
                        - button "Move" [ref=f3e250]
                        - button "Column Actions" [ref=f3e259] [cursor=pointer]
                  - columnheader "Harga Sort by Harga descending Move Column Actions" [ref=f3e265]:
                    - generic [ref=f3e266]:
                      - generic [ref=f3e267] [cursor=pointer]:
                        - generic [ref=f3e268]: Harga
                        - button "Sort by Harga descending" [ref=f3e269]
                      - generic [ref=f3e274]:
                        - button "Move" [ref=f3e275]
                        - button "Column Actions" [ref=f3e284] [cursor=pointer]
                  - columnheader "Kategori Sort by Kategori descending Move Column Actions" [ref=f3e290]:
                    - generic [ref=f3e291]:
                      - generic [ref=f3e292] [cursor=pointer]:
                        - generic [ref=f3e293]: Kategori
                        - button "Sort by Kategori descending" [ref=f3e294]
                      - generic [ref=f3e299]:
                        - button "Move" [ref=f3e300]
                        - button "Column Actions" [ref=f3e309] [cursor=pointer]
                  - columnheader "Status Move Column Actions" [ref=f3e315]:
                    - generic [ref=f3e316]:
                      - generic [ref=f3e317]: Status
                      - generic [ref=f3e319]:
                        - button "Move" [ref=f3e320]
                        - button "Column Actions" [ref=f3e329] [cursor=pointer]
              - rowgroup [ref=f3e335]:
                - row [ref=f3e336]:
                  - cell "Paket Hemat 1792725356315" [ref=f3e337]
                  - cell "Rp 0" [ref=f3e338]:
                    - generic [ref=f3e340]:
                      - generic [ref=f3e341]: Rp
                      - textbox [ref=f3e342]: "0"
                      - generic [ref=f3e344]:
                        - button [aria-hidden] [ref=f3e345] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e348]
                  - cell [ref=f3e351]
                  - cell "Nonaktif" [ref=f3e352]:
                    - generic [ref=f3e355]:
                      - switch "Nonaktif"
                      - generic [ref=f3e359]: Nonaktif
                - row [ref=f3e361]:
                  - cell "Paket Hemat 1792661922080" [ref=f3e362]
                  - cell "Rp 0" [ref=f3e363]:
                    - generic [ref=f3e365]:
                      - generic [ref=f3e366]: Rp
                      - textbox [ref=f3e367]: "0"
                      - generic [ref=f3e369]:
                        - button [aria-hidden] [ref=f3e370] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e373]
                  - cell [ref=f3e376]
                  - cell "Nonaktif" [ref=f3e377]:
                    - generic [ref=f3e380]:
                      - switch "Nonaktif"
                      - generic [ref=f3e384]: Nonaktif
                - row [ref=f3e386]:
                  - cell "Paket Hemat 1792658590393" [ref=f3e387]
                  - cell "Rp 0" [ref=f3e388]:
                    - generic [ref=f3e390]:
                      - generic [ref=f3e391]: Rp
                      - textbox [ref=f3e392]: "0"
                      - generic [ref=f3e394]:
                        - button [aria-hidden] [ref=f3e395] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e398]
                  - cell [ref=f3e401]
                  - cell "Nonaktif" [ref=f3e402]:
                    - generic [ref=f3e405]:
                      - switch "Nonaktif"
                      - generic [ref=f3e409]: Nonaktif
                - row [ref=f3e411]:
                  - cell "Paket Hemat 1792643985491" [ref=f3e412]
                  - cell "Rp 0" [ref=f3e413]:
                    - generic [ref=f3e415]:
                      - generic [ref=f3e416]: Rp
                      - textbox [ref=f3e417]: "0"
                      - generic [ref=f3e419]:
                        - button [aria-hidden] [ref=f3e420] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e423]
                  - cell [ref=f3e426]
                  - cell "Nonaktif" [ref=f3e427]:
                    - generic [ref=f3e430]:
                      - switch "Nonaktif"
                      - generic [ref=f3e434]: Nonaktif
                - row [ref=f3e436]:
                  - cell "Paket Hemat 1792643363984" [ref=f3e437]
                  - cell "Rp 0" [ref=f3e438]:
                    - generic [ref=f3e440]:
                      - generic [ref=f3e441]: Rp
                      - textbox [ref=f3e442]: "0"
                      - generic [ref=f3e444]:
                        - button [aria-hidden] [ref=f3e445] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e448]
                  - cell [ref=f3e451]
                  - cell "Nonaktif" [ref=f3e452]:
                    - generic [ref=f3e455]:
                      - switch "Nonaktif"
                      - generic [ref=f3e459]: Nonaktif
                - row [ref=f3e461]:
                  - cell "Paket Hemat 1792642707603" [ref=f3e462]
                  - cell "Rp 0" [ref=f3e463]:
                    - generic [ref=f3e465]:
                      - generic [ref=f3e466]: Rp
                      - textbox [ref=f3e467]: "0"
                      - generic [ref=f3e469]:
                        - button [aria-hidden] [ref=f3e470] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e473]
                  - cell [ref=f3e476]
                  - cell "Nonaktif" [ref=f3e477]:
                    - generic [ref=f3e480]:
                      - switch "Nonaktif"
                      - generic [ref=f3e484]: Nonaktif
                - row [ref=f3e486]:
                  - cell "Paket Hemat 1792642619666" [ref=f3e487]
                  - cell "Rp 0" [ref=f3e488]:
                    - generic [ref=f3e490]:
                      - generic [ref=f3e491]: Rp
                      - textbox [ref=f3e492]: "0"
                      - generic [ref=f3e494]:
                        - button [aria-hidden] [ref=f3e495] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e498]
                  - cell [ref=f3e501]
                  - cell "Nonaktif" [ref=f3e502]:
                    - generic [ref=f3e505]:
                      - switch "Nonaktif"
                      - generic [ref=f3e509]: Nonaktif
                - row [ref=f3e511]:
                  - cell "Paket Hemat 1792642385071" [ref=f3e512]
                  - cell "Rp 0" [ref=f3e513]:
                    - generic [ref=f3e515]:
                      - generic [ref=f3e516]: Rp
                      - textbox [ref=f3e517]: "0"
                      - generic [ref=f3e519]:
                        - button [aria-hidden] [ref=f3e520] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e523]
                  - cell [ref=f3e526]
                  - cell "Nonaktif" [ref=f3e527]:
                    - generic [ref=f3e530]:
                      - switch "Nonaktif"
                      - generic [ref=f3e534]: Nonaktif
                - row [ref=f3e536]:
                  - cell "Paket Hemat 1792641219687" [ref=f3e537]
                  - cell "Rp 0" [ref=f3e538]:
                    - generic [ref=f3e540]:
                      - generic [ref=f3e541]: Rp
                      - textbox [ref=f3e542]: "0"
                      - generic [ref=f3e544]:
                        - button [aria-hidden] [ref=f3e545] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e548]
                  - cell [ref=f3e551]
                  - cell "Nonaktif" [ref=f3e552]:
                    - generic [ref=f3e555]:
                      - switch "Nonaktif"
                      - generic [ref=f3e559]: Nonaktif
                - row [ref=f3e561]:
                  - cell "Paket Hemat 1792640015389" [ref=f3e562]
                  - cell "Rp 0" [ref=f3e563]:
                    - generic [ref=f3e565]:
                      - generic [ref=f3e566]: Rp
                      - textbox [ref=f3e567]: "0"
                      - generic [ref=f3e569]:
                        - button [aria-hidden] [ref=f3e570] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e573]
                  - cell [ref=f3e576]
                  - cell "Nonaktif" [ref=f3e577]:
                    - generic [ref=f3e580]:
                      - switch "Nonaktif"
                      - generic [ref=f3e584]: Nonaktif
                - row [ref=f3e586]:
                  - cell "Paket Hemat 1792637349984" [ref=f3e587]
                  - cell "Rp 0" [ref=f3e588]:
                    - generic [ref=f3e590]:
                      - generic [ref=f3e591]: Rp
                      - textbox [ref=f3e592]: "0"
                      - generic [ref=f3e594]:
                        - button [aria-hidden] [ref=f3e595] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e598]
                  - cell [ref=f3e601]
                  - cell "Nonaktif" [ref=f3e602]:
                    - generic [ref=f3e605]:
                      - switch "Nonaktif"
                      - generic [ref=f3e609]: Nonaktif
                - row [ref=f3e611]:
                  - cell "Paket Hemat 1792576745448" [ref=f3e612]
                  - cell "Rp 0" [ref=f3e613]:
                    - generic [ref=f3e615]:
                      - generic [ref=f3e616]: Rp
                      - textbox [ref=f3e617]: "0"
                      - generic [ref=f3e619]:
                        - button [aria-hidden] [ref=f3e620] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e623]
                  - cell [ref=f3e626]
                  - cell "Nonaktif" [ref=f3e627]:
                    - generic [ref=f3e630]:
                      - switch "Nonaktif"
                      - generic [ref=f3e634]: Nonaktif
                - row [ref=f3e636]:
                  - cell "Paket Hemat 1792558893912" [ref=f3e637]
                  - cell "Rp 0" [ref=f3e638]:
                    - generic [ref=f3e640]:
                      - generic [ref=f3e641]: Rp
                      - textbox [ref=f3e642]: "0"
                      - generic [ref=f3e644]:
                        - button [aria-hidden] [ref=f3e645] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e648]
                  - cell [ref=f3e651]
                  - cell "Nonaktif" [ref=f3e652]:
                    - generic [ref=f3e655]:
                      - switch "Nonaktif"
                      - generic [ref=f3e659]: Nonaktif
                - row [ref=f3e661]:
                  - cell "Paket Hemat 1790845986134" [ref=f3e662]
                  - cell "Rp 0" [ref=f3e663]:
                    - generic [ref=f3e665]:
                      - generic [ref=f3e666]: Rp
                      - textbox [ref=f3e667]: "0"
                      - generic [ref=f3e669]:
                        - button [aria-hidden] [ref=f3e670] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e673]
                  - cell [ref=f3e676]
                  - cell "Nonaktif" [ref=f3e677]:
                    - generic [ref=f3e680]:
                      - switch "Nonaktif"
                      - generic [ref=f3e684]: Nonaktif
                - row [ref=f3e686]:
                  - cell "Paket Hemat 1790242092888" [ref=f3e687]
                  - cell "Rp 0" [ref=f3e688]:
                    - generic [ref=f3e690]:
                      - generic [ref=f3e691]: Rp
                      - textbox [ref=f3e692]: "0"
                      - generic [ref=f3e694]:
                        - button [aria-hidden] [ref=f3e695] [cursor=pointer]
                        - button [disabled] [aria-hidden] [ref=f3e698]
                  - cell [ref=f3e701]
                  - cell "Nonaktif" [ref=f3e702]:
                    - generic [ref=f3e705]:
                      - switch "Nonaktif"
                      - generic [ref=f3e709]: Nonaktif
              - rowgroup
  - link "Konsultasi Sekarang" [ref=f3e714] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```

# Test source

```ts
  20  |   // Shared resilient login helper
  21  |   async function loginBeforeTest(page) {
  22  |     if (page.url().includes('/admin/')) {
  23  |       return page;
  24  |     }
  25  | 
  26  |     try {
  27  |       await page.goto('/', { waitUntil: 'commit', timeout: 25000 });
  28  |     } catch {
  29  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 25000 });
  30  |     }
  31  | 
  32  |     if (page.url().includes('/admin/')) {
  33  |       return page;
  34  |     }
  35  | 
  36  |     const emailInput = page.getByLabel(/Email atau Username/i);
  37  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  38  | 
  39  |     await emailInput.fill('qakasflo@automation.com');
  40  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  41  | 
  42  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  43  |     await expect(loginBtn).toBeEnabled({ timeout: 5000 });
  44  |     await page.waitForTimeout(500);
  45  |     await loginBtn.click();
  46  | 
  47  |     try {
  48  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  49  |     } catch {
  50  |       if (!page.url().includes('/admin/')) {
  51  |         await page.waitForTimeout(1500);
  52  |         if (await loginBtn.isVisible().catch(() => false)) {
  53  |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  54  |         }
  55  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  56  |       }
  57  |     }
  58  |     return page;
  59  |   }
  60  | 
  61  |   // Helper to ensure at least one Self Order entry exists (generated via Book Menu + Branch)
  62  |   async function ensureSelfOrderExists(page) {
  63  |     await expect(page.locator('table:visible tbody tr').first()).toBeVisible({ timeout: 15000 });
  64  |     await page.waitForTimeout(1000);
  65  | 
  66  |     const dataRows = getDataRows(page);
  67  |     const count = await dataRows.count();
  68  |     if (count === 0) {
  69  |       await page.goto('/admin/catalog/book-menu', { waitUntil: 'domcontentloaded' });
  70  |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  71  | 
  72  |       const targetRow = page.locator('table:visible tbody tr').filter({ hasText: 'Buku Menu Utama' }).first();
  73  |       if (await targetRow.isVisible({ timeout: 5000 }).catch(() => false)) {
  74  |         const editBtn = targetRow.locator('a[href*="/edit"]').first();
  75  |         if (await editBtn.isVisible().catch(() => false)) {
  76  |           await editBtn.click();
  77  |         } else {
  78  |           await targetRow.locator('button, a').nth(1).click();
  79  |         }
  80  | 
  81  |         await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/edit/, { timeout: 15000 });
  82  |         await page.waitForTimeout(1000);
  83  | 
  84  |         const hasQAPill = await page.locator('.mantine-MultiSelect-pill, .mantine-Pill-root')
  85  |           .filter({ hasText: /Kasflo Pusat QA/i }).first().isVisible().catch(() => false);
  86  | 
  87  |         if (!hasQAPill) {
  88  |           const cabangContainer = page.locator('input[placeholder*="Cabang"], .mantine-MultiSelect-inputField, .mantine-MultiSelect-input').first();
  89  |           if (await cabangContainer.isVisible({ timeout: 5000 }).catch(() => false)) {
  90  |             await cabangContainer.click();
  91  |             await page.waitForTimeout(500);
  92  | 
  93  |             const branchOption = page.locator('[role="option"]:visible, [data-combobox-option]:visible, .mantine-MultiSelect-option:visible')
  94  |               .filter({ hasText: /Kasflo Pusat QA/i }).first();
  95  |             if (await branchOption.isVisible({ timeout: 2000 }).catch(() => false)) {
  96  |               await branchOption.click();
  97  |             } else {
  98  |               const anyOption = page.locator('[role="option"]:visible').first();
  99  |               if (await anyOption.isVisible().catch(() => false)) {
  100 |                 await anyOption.click();
  101 |               }
  102 |             }
  103 |             await page.getByText(/Edit Buku Menu/i).first().click({ force: true }).catch(() => {});
  104 |           }
  105 |         }
  106 | 
  107 |         await page.evaluate(() => window.scrollTo(0, 0));
  108 |         const updateBtn = page.getByRole('button', { name: 'Update' });
  109 |         await expect(updateBtn).toBeVisible({ timeout: 5000 });
  110 |         await updateBtn.click();
  111 |         await expect(page).toHaveURL(/\/admin\/catalog\/book-menu$/, { timeout: 15000 });
  112 |       } else {
  113 |         await page.goto('/admin/catalog/book-menu/add', { waitUntil: 'domcontentloaded' });
  114 |         await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/add/, { timeout: 15000 });
  115 |         const bmName = 'Init BM SelfOrder ' + Date.now();
  116 |         await page.getByPlaceholder('Masukkan Nama Buku Menu').or(page.getByLabel(/Nama Buku Menu/i)).first().fill(bmName);
  117 | 
  118 |         const branchInput = page.locator('input[placeholder*="Cabang"], .mantine-MultiSelect-inputField, .mantine-MultiSelect-input').first();
  119 |         if (await branchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
> 120 |           await branchInput.click();
      |                             ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  121 |           await page.locator('[role="option"]:visible').first().click();
  122 |         }
  123 | 
  124 |         const checkbox = page.locator('table tbody tr input[type="checkbox"]').first();
  125 |         if (await checkbox.isVisible().catch(() => false)) {
  126 |           await checkbox.check();
  127 |         }
  128 | 
  129 |         await page.getByRole('button', { name: 'Simpan' }).click();
  130 |         await expect(page).toHaveURL(/\/admin\/catalog\/book-menu$/, { timeout: 20000 });
  131 |       }
  132 | 
  133 |       await page.goto('/admin/catalog/self-order-menu', { waitUntil: 'domcontentloaded' });
  134 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  135 |     }
  136 |   }
  137 | 
  138 |   test.beforeEach(async ({ page }) => {
  139 |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  140 |       // Step 1: Login
  141 |       await loginBeforeTest(page);
  142 | 
  143 |       // Step 2: Navigate to Menu Self Order page
  144 |       await page.goto('/admin/catalog/self-order-menu', { waitUntil: 'domcontentloaded' });
  145 | 
  146 |       // Step 3: Verify page loaded
  147 |       await expect(page).toHaveURL(/\/admin\/catalog\/self-order-menu/);
  148 |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  149 |     
  150 |     });
  151 |   });
  152 | 
  153 |   test('[TC-01] Menampilkan halaman menu self order dengan tabel dan 4 tombol aksi', async ({ page }) => {
  154 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman menu self order dengan tabel dan 4 tombol aksi', async () => {
  155 |       // Verify page title / breadcrumb
  156 |       await expect(page.getByText('Menu Self Order').first()).toBeVisible();
  157 | 
  158 |       // Check table visibility
  159 |       const table = page.locator('table:visible').first();
  160 |       await expect(table).toBeVisible();
  161 | 
  162 |       // Verify table headers
  163 |       const thead = page.locator('thead:visible').first();
  164 |       await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
  165 |       await expect(thead.getByText('Buku Menu', { exact: true }).first()).toBeVisible();
  166 |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  167 | 
  168 |       // Verify all 4 action elements in data row
  169 |       await ensureSelfOrderExists(page);
  170 |       const targetRow = await getTargetRow(page);
  171 |       if (!targetRow) {
  172 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  173 |         return;
  174 |       }
  175 | 
  176 |       // 1. Detail button
  177 |       await expect(targetRow.locator('a[href*="/detail/"]').first()).toBeVisible({ timeout: 10000 });
  178 |       // 2. QR Code modal button
  179 |       await expect(targetRow.locator('button').first()).toBeVisible({ timeout: 10000 });
  180 |       // 3. Banner marketing button
  181 |       await expect(targetRow.locator('a[href*="/banner-marketing/"]').first()).toBeVisible({ timeout: 10000 });
  182 |       // 4. Edit button
  183 |       await expect(targetRow.locator('a[href*="/edit/"]').first()).toBeVisible({ timeout: 10000 });
  184 |     
  185 |     });
  186 |   });
  187 | 
  188 |   test('[TC-02] Cari/filter data menu self order dengan search box', async ({ page }) => {
  189 |     await test.step('Lakukan pengujian cari/filter data menu self order dengan search box dan validasi hasil yang ditampilkan', async () => {
  190 |       await ensureSelfOrderExists(page);
  191 | 
  192 |       const targetRow = await getTargetRow(page);
  193 |       if (!targetRow) {
  194 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  195 |         return;
  196 |       }
  197 | 
  198 |       const cabangName = (await targetRow.locator('td:first-child').innerText()).trim();
  199 |       if (!cabangName) {
  200 |         return;
  201 |       }
  202 | 
  203 |       const searchInput = page.locator('input[placeholder="Cari disini..."]:visible').first();
  204 |       await expect(searchInput).toBeVisible({ timeout: 10000 });
  205 | 
  206 |       // 1. Search with matching branch name
  207 |       await searchInput.fill(cabangName);
  208 |       await page.waitForTimeout(1000);
  209 |       const matchedRow = page.locator('table:visible tbody tr').filter({ hasText: cabangName });
  210 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
  211 | 
  212 |       // 2. Search with non-existent keyword
  213 |       await searchInput.fill('XYZTermNotExist999');
  214 |       await page.waitForTimeout(1000);
  215 |       await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  216 | 
  217 |       // 3. Clear search and verify original row is visible again
  218 |       await searchInput.clear();
  219 |       await page.waitForTimeout(1000);
  220 |       await expect(matchedRow.first()).toBeVisible({ timeout: 10000 });
```