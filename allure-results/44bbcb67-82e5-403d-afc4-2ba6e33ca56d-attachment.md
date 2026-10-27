# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/struk.spec.js >> Pengaturan Struk >> [TC-02] Memverifikasi seluruh komponen form input pada pengaturan struk
- Location: tests/Kasflo-Resto/Pengaturan/struk.spec.js:108:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByPlaceholder('Pilih Outlet')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByPlaceholder('Pilih Outlet') with timeout 15000ms
  - waiting for getByPlaceholder('Pilih Outlet')

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
  - link "Promosi":
    - /url: /admin/promotion
    - img
    - paragraph: Promosi
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
  - link "Data Cabang":
    - /url: /admin/branch-management/branch
  - link "Pengaturan Area":
    - /url: /admin/branch-management/area
  - link "Pengaturan Meja":
    - /url: /admin/branch-management/setting-table
  - link "Pajak & Biaya Lainnya":
    - /url: /admin/setting/tax-and-other
  - link "Metode Pembayaran":
    - /url: /admin/setting/payment-method
  - link "Struk":
    - /url: /admin/setting/receipt
  - link "Shift":
    - /url: /admin/setting/shift
  - link "Atur Rekening":
    - /url: /admin/setting/bank-account
  - link "Transaksi":
    - /url: /admin/setting/transaction
  - link "Berlangganan":
    - /url: /admin/subscription
    - img
    - paragraph: Berlangganan
- main:
  - img
  - paragraph: Struk
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
  - paragraph: Struk
  - img
  - heading "Anda Perlu Tingkatkan Paket Anda" [level=4]
  - paragraph: Paket anda saat ini tidak dapat mengakses fitur ini, segera tingkatkan paket anda
  - link "Berlangganan/Upgrade Paket":
    - /url: /admin/subscription
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Pengaturan Struk', () => {
  4   |   async function loginBeforeTest(page) {
  5   |     if (page.url().includes('/admin/')) {
  6   |       return page;
  7   |     }
  8   | 
  9   |     try {
  10  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  11  |     } catch {
  12  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
  13  |     }
  14  | 
  15  |     if (page.url().includes('/admin/')) {
  16  |       return page;
  17  |     }
  18  | 
  19  |     const emailInput = page.getByLabel(/Email atau Username/i);
  20  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  21  | 
  22  |     await emailInput.fill('qakasflo@automation.com');
  23  |     const pwdInput = page.getByLabel(/Kata Sandi/i);
  24  |     await pwdInput.fill('password');
  25  | 
  26  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  27  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  28  | 
  29  |     // Tekan Enter dan klik Masuk untuk menjamin submit form terpicu
  30  |     await pwdInput.press('Enter').catch(() => {});
  31  |     await loginBtn.click({ timeout: 3000 }).catch(() => {});
  32  | 
  33  |     try {
  34  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
  35  |     } catch {
  36  |       if (!page.url().includes('/admin/')) {
  37  |         await page.waitForTimeout(1000);
  38  |         if (await loginBtn.isEnabled().catch(() => false)) {
  39  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  40  |         }
  41  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  42  |       }
  43  |     }
  44  |     return page;
  45  |   }
  46  | 
  47  |   test.beforeEach(async ({ page }) => {
  48  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  49  |       // Intercept subscription to ensure receipt settings are enabled
  50  |       await page.route('**/subscription**', async route => {
  51  |         try {
  52  |           const response = await route.fetch();
  53  |           const json = await response.json();
  54  |           if (json.data && json.data.active_features) {
  55  |             for (const key of Object.keys(json.data.active_features)) {
  56  |               if (typeof json.data.active_features[key] === 'boolean') {
  57  |                 json.data.active_features[key] = true;
  58  |               }
  59  |             }
  60  |           }
  61  |           await route.fulfill({ json });
  62  |         } catch {
  63  |           await route.continue().catch(() => {});
  64  |         }
  65  |       });
  66  | 
  67  |       await loginBeforeTest(page);
  68  | 
  69  |       try {
  70  |         await page.goto('/admin/setting/receipt', { waitUntil: 'domcontentloaded', timeout: 25000 });
  71  |       } catch {
  72  |         await page.goto('/admin/setting/receipt', { waitUntil: 'commit', timeout: 25000 });
  73  |       }
  74  |       await expect(page).toHaveURL(/\/admin\/setting\/receipt/, { timeout: 20000 });
  75  | 
  76  |       const outletInput = page.getByPlaceholder('Pilih Outlet');
> 77  |       await expect(outletInput).toBeVisible({ timeout: 15000 });
      |                                 ^ Error: expect(locator).toBeVisible() failed
  78  |       await expect(page.getByPlaceholder('Masukkan Header')).toBeVisible({ timeout: 10000 });
  79  |       await page.waitForTimeout(500);
  80  |     
  81  |     });
  82  |   });
  83  | 
  84  |   test('[TC-01] Menampilkan halaman Pengaturan Struk dengan header, breadcrumb, dan tombol aksi', async ({ page }) => {
  85  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Pengaturan Struk dengan header, breadcrumb, dan tombol aksi', async () => {
  86  |       // Verifikasi breadcrumb
  87  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]');
  88  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  89  |       await expect(breadcrumb).toContainText('Pengaturan Struk');
  90  | 
  91  |       // Verifikasi dropdown outlet / cabang
  92  |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  93  |       await expect(outletInput).toBeVisible({ timeout: 10000 });
  94  | 
  95  |       // Verifikasi tombol Simpan & Simpan Semua Cabang
  96  |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  97  |       const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
  98  |       await expect(simpanBtn).toBeVisible({ timeout: 10000 });
  99  |       await expect(simpanSemuaBtn).toBeVisible({ timeout: 10000 });
  100 | 
  101 |       // Verifikasi form pengaturan dan preview struk tampil
  102 |       await expect(page.locator('text=Logo Usaha')).toBeVisible({ timeout: 10000 });
  103 |       await expect(page.locator('img[src*="struk.png"]')).toBeVisible({ timeout: 10000 });
  104 |     
  105 |     });
  106 |   });
  107 | 
  108 |   test('[TC-02] Memverifikasi seluruh komponen form input pada pengaturan struk', async ({ page }) => {
  109 |     await test.step('Langkah Pengujian UAT: Memverifikasi seluruh komponen form input pada pengaturan struk', async () => {
  110 |       // Dropzone upload logo usaha atau tombol hapus jika logo sudah ada
  111 |       await expect(page.locator('text=Logo Usaha')).toBeVisible({ timeout: 10000 });
  112 |       const dropzoneText = page.getByText(/Gunakan file \.jpg\/\.png & maks\. 5 MB/i);
  113 |       const hapusBtn = page.getByRole('button', { name: 'Hapus' });
  114 |       await expect(dropzoneText.or(hapusBtn)).toBeVisible({ timeout: 10000 });
  115 | 
  116 |       const fileInput = page.locator('input[type="file"]');
  117 |       await expect(fileInput).toBeAttached();
  118 | 
  119 |       // Text fields
  120 |       const headerInput = page.getByPlaceholder('Masukkan Header');
  121 |       const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
  122 |       const footerInput = page.getByPlaceholder('Masukkan Footer');
  123 | 
  124 |       await expect(headerInput).toBeVisible({ timeout: 10000 });
  125 |       await expect(alamatInput).toBeVisible({ timeout: 10000 });
  126 |       await expect(footerInput).toBeVisible({ timeout: 10000 });
  127 |     
  128 |     });
  129 |   });
  130 | 
  131 |   test('[TC-03] Interaksi dropdown pemilihan outlet / cabang', async ({ page }) => {
  132 |     await test.step('Langkah Pengujian UAT: Interaksi dropdown pemilihan outlet / cabang', async () => {
  133 |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  134 |       await expect(outletInput).toBeVisible({ timeout: 10000 });
  135 |       const currentOutlet = await outletInput.inputValue();
  136 |       expect(currentOutlet.length).toBeGreaterThan(0);
  137 | 
  138 |       // Buka dropdown outlet
  139 |       await outletInput.click();
  140 | 
  141 |       // Verifikasi opsi combobox muncul
  142 |       const comboboxOptions = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
  143 |       await expect(comboboxOptions.first()).toBeVisible({ timeout: 10000 });
  144 |       const count = await comboboxOptions.count();
  145 |       expect(count).toBeGreaterThan(0);
  146 | 
  147 |       // Tutup combobox dengan Escape
  148 |       await page.keyboard.press('Escape').catch(() => {});
  149 |     
  150 |     });
  151 |   });
  152 | 
  153 |   test('[TC-04] Mengisi Header, Alamat Usaha, dan Footer serta memverifikasi Live Preview struk ter-update secara real-time', async ({ page }) => {
  154 |     await test.step('Langkah Pengujian UAT: Mengisi Header, Alamat Usaha, dan Footer serta memverifikasi Live Preview struk ter-update secara real-time', async () => {
  155 |       const headerInput = page.getByPlaceholder('Masukkan Header');
  156 |       const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
  157 |       const footerInput = page.getByPlaceholder('Masukkan Footer');
  158 | 
  159 |       const testHeader = 'Restoran Kasflo Lezat';
  160 |       const testAlamat = 'Jl. Kemang Raya No. 123, Jakarta Selatan';
  161 |       const testFooter = 'Terima Kasih Atas Kunjungan Anda! Datang Kembali';
  162 | 
  163 |       await headerInput.fill(testHeader);
  164 |       await alamatInput.fill(testAlamat);
  165 |       await footerInput.fill(testFooter);
  166 | 
  167 |       // Verifikasi teks langsung tampil pada kolom Live Preview struk di sebelah kanan
  168 |       const previewContainer = page.locator('.mantine-Grid-col').last();
  169 |       await expect(previewContainer).toContainText(testHeader, { timeout: 10000 });
  170 |       await expect(previewContainer).toContainText(testAlamat, { timeout: 10000 });
  171 |       await expect(previewContainer).toContainText(testFooter, { timeout: 10000 });
  172 | 
  173 |       // Gambar template struk dummy tetap tampil di preview
  174 |       await expect(page.locator('img[src*="struk.png"]')).toBeVisible({ timeout: 10000 });
  175 |     
  176 |     });
  177 |   });
```