# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Laporan Usaha/laba_rugi.spec.js >> Laporan Laba Rugi >> [TC-06] Memverifikasi baris-baris komponen keuangan (Pendapatan, Kas, Pengeluaran, Laba Rugi)
- Location: tests/Kasflo-Resto/Laporan Usaha/laba_rugi.spec.js:134:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Kas', { exact: true }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Kas', { exact: true }).first() with timeout 5000ms
  - waiting for getByText('Kas', { exact: true }).first()

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
  - link "Rangkuman Penjualan":
    - /url: /admin/report/summary
  - link "Detail Penjualan":
    - /url: /admin/report/sale-detail
  - link "Menu":
    - /url: /admin/report/menu
  - link "Varian":
    - /url: /admin/report/variant
  - link "Promosi":
    - /url: /admin/report/promotion
  - link "Laba Rugi":
    - /url: /admin/report/profit-and-loss
  - link "Pajak":
    - /url: /admin/report/tax
  - link "Dapur":
    - /url: /admin/report/kitchen
  - link "Deposit":
    - /url: /admin/report/deposit
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
  - paragraph: Laba Rugi
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
  - button "Oktober 26, 2026 – Oktober 26, 2026"
  - img
  - textbox "Pilih Cabang"
  - button:
    - img
  - button "Tampilkan"
  - paragraph: "Periode: 26 Oct 2026 - 26 Oct 2026"
  - button "Unduh Laporan":
    - img
    - text: Unduh Laporan
  - paragraph: Keterangan
  - paragraph: Jumlah
  - paragraph: Pendapatan
  - paragraph: Rp0
  - paragraph: Pengeluaran
  - paragraph: Rp0
  - paragraph: Laba Rugi
  - paragraph: Rp0
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  39  |     }
  40  |     return page;
  41  |   }
  42  | 
  43  |   // Helper to select an option in a Mantine Select dropdown
  44  |   async function selectMantineOption(page, inputLocator, optionText) {
  45  |     await inputLocator.click();
  46  | 
  47  |     if (optionText) {
  48  |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
  49  |         .filter({ hasText: optionText }).first();
  50  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  51  |         await option.click();
  52  |         return;
  53  |       }
  54  |     }
  55  | 
  56  |     const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  57  |     if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  58  |       await firstOption.click();
  59  |     } else {
  60  |       await page.keyboard.press('Escape');
  61  |     }
  62  |   }
  63  | 
  64  |   test.beforeEach(async ({ page }) => {
  65  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  66  |       // Step 1: Login
  67  |       await loginBeforeTest(page);
  68  | 
  69  |       // Step 2: Navigate to Profit and Loss report page
  70  |       await page.goto('/admin/report/profit-and-loss', { waitUntil: 'domcontentloaded' });
  71  | 
  72  |       // Step 3: Verify page loaded
  73  |       await expect(page).toHaveURL(/\/admin\/report\/profit-and-loss/, { timeout: 15000 });
  74  |     
  75  |     });
  76  |   });
  77  | 
  78  |   test('[TC-01] Menampilkan halaman Laporan Laba Rugi dengan filter utama dan tombol aksi', async ({ page }) => {
  79  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Laporan Laba Rugi dengan filter utama dan tombol aksi', async () => {
  80  |       // Verify Cabang selector
  81  |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  82  |       await expect(cabangInput).toBeVisible({ timeout: 10000 });
  83  | 
  84  |       // Verify action buttons
  85  |       await expect(page.getByRole('button', { name: /Tampilkan/i })).toBeVisible();
  86  |       await expect(page.getByRole('button', { name: /Unduh Laporan/i })).toBeVisible();
  87  |     
  88  |     });
  89  |   });
  90  | 
  91  |   test('[TC-02] Memverifikasi pemilih rentang tanggal pada laporan laba rugi', async ({ page }) => {
  92  |     await test.step('Langkah Pengujian UAT: Memverifikasi pemilih rentang tanggal pada laporan laba rugi', async () => {
  93  |       const dateBtn = page.locator('button').filter({
  94  |         hasText: /–|-|Pilih Tanggal|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/i
  95  |       }).first();
  96  |       await expect(dateBtn).toBeVisible({ timeout: 5000 });
  97  | 
  98  |       await dateBtn.click();
  99  | 
  100 |       // Verify calendar popover opens
  101 |       const popover = page.locator('.mantine-Popover-dropdown:visible, .mantine-DatePicker-root:visible').last();
  102 |       if (await popover.isVisible({ timeout: 3000 }).catch(() => false)) {
  103 |         await page.keyboard.press('Escape');
  104 |       }
  105 |     
  106 |     });
  107 |   });
  108 | 
  109 |   test('[TC-03] Memverifikasi filter dropdown Pilih Cabang', async ({ page }) => {
  110 |     await test.step('Lakukan pengujian memverifikasi filter dropdown Pilih Cabang dan validasi hasil yang ditampilkan', async () => {
  111 |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  112 |       await expect(cabangInput).toBeVisible();
  113 |       await selectMantineOption(page, cabangInput);
  114 |     
  115 |     });
  116 |   });
  117 | 
  118 |   test('[TC-04] Memverifikasi tampilan informasi periode laporan', async ({ page }) => {
  119 |     await test.step('Langkah Pengujian UAT: Memverifikasi tampilan informasi periode laporan', async () => {
  120 |       const periodeElement = page.getByText(/Periode:/i).first();
  121 |       await expect(periodeElement).toBeVisible({ timeout: 5000 });
  122 |     
  123 |     });
  124 |   });
  125 | 
  126 |   test('[TC-05] Memverifikasi struktur rincian laba rugi (Keterangan dan Jumlah)', async ({ page }) => {
  127 |     await test.step('Langkah Pengujian UAT: Memverifikasi struktur rincian laba rugi (Keterangan dan Jumlah)', async () => {
  128 |       await expect(page.getByText('Keterangan').first()).toBeVisible({ timeout: 5000 });
  129 |       await expect(page.getByText('Jumlah').first()).toBeVisible({ timeout: 5000 });
  130 |     
  131 |     });
  132 |   });
  133 | 
  134 |   test('[TC-06] Memverifikasi baris-baris komponen keuangan (Pendapatan, Kas, Pengeluaran, Laba Rugi)', async ({ page }) => {
  135 |     await test.step('Langkah Pengujian UAT: Memverifikasi baris-baris komponen keuangan (Pendapatan, Kas, Pengeluaran, Laba Rugi)', async () => {
  136 |       const financialMetrics = ['Pendapatan', 'Kas', 'Pengeluaran', 'Laba Rugi'];
  137 | 
  138 |       for (const metric of financialMetrics) {
> 139 |         await expect(page.getByText(metric, { exact: true }).first()).toBeVisible({ timeout: 5000 });
      |                                                                       ^ Error: expect(locator).toBeVisible() failed
  140 |       }
  141 |     
  142 |     });
  143 |   });
  144 | 
  145 |   test('[TC-07] Mengklik tombol Tampilkan untuk memuat ulang data laba rugi', async ({ page }) => {
  146 |     await test.step('Verifikasi bahwa sistem berhasil mengklik tombol Tampilkan untuk memuat ulang data laba rugi', async () => {
  147 |       const tampilkanBtn = page.getByRole('button', { name: /Tampilkan/i }).first();
  148 |       await expect(tampilkanBtn).toBeVisible();
  149 |       await expect(tampilkanBtn).toBeEnabled();
  150 | 
  151 |       await tampilkanBtn.click();
  152 |       await page.waitForTimeout(1000);
  153 |       await expect(page).toHaveURL(/\/admin\/report\/profit-and-loss/);
  154 |     
  155 |     });
  156 |   });
  157 | 
  158 |   test('[TC-08] Memverifikasi tombol Unduh Laporan dan interaksi ekspor data', async ({ page }) => {
  159 |     await test.step('Langkah Pengujian UAT: Memverifikasi tombol Unduh Laporan dan interaksi ekspor data', async () => {
  160 |       const downloadBtn = page.getByRole('button', { name: /Unduh Laporan/i }).first();
  161 |       await expect(downloadBtn).toBeVisible({ timeout: 5000 });
  162 |       await expect(downloadBtn).toBeEnabled();
  163 | 
  164 |       const downloadPromise = page.waitForEvent('download', { timeout: 4000 }).catch(() => null);
  165 |       await downloadBtn.click();
  166 | 
  167 |       const download = await downloadPromise;
  168 |       if (download) {
  169 |         expect(download.suggestedFilename()).toBeTruthy();
  170 |       } else {
  171 |         await expect(page).toHaveURL(/\/admin\/report\/profit-and-loss/);
  172 |       }
  173 |     
  174 |     });
  175 |   });
  176 | });
  177 | 
```