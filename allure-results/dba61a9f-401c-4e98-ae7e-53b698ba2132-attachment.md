# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/transaksi.spec.js >> Pengaturan Transaksi >> [TC-02] Menampilkan dan berinteraksi dengan dropdown pemilih outlet
- Location: tests/Kasflo-Resto/Pengaturan/transaksi.spec.js:122:3

# Error details

```
Error: expect(locator).not.toHaveValue(expected) failed

Locator:  getByPlaceholder('Pilih Outlet')
Expected: not ""
Received: ""
Timeout:  10000ms

Call log:
  - Expect "not toHaveValue" getByPlaceholder('Pilih Outlet') with timeout 10000ms
  - waiting for getByPlaceholder('Pilih Outlet')
    24 × locator resolved to <input readonly value="" autocomplete="off" aria-invalid="false" data-variant="default" id="mantine-2esue4e5f" aria-haspopup="listbox" placeholder="Pilih Outlet" aria-controls="mantine-6ujz99w0h" class="m_8fb7ebe7 mantine-Input-input mantine-Select-input"/>
       - unexpected value ""

```

```yaml
- textbox "Pilih Outlet"
```

# Test source

```ts
  28  |       if (!page.url().includes('/admin/')) {
  29  |         await page.waitForTimeout(1500);
  30  |         if (await loginBtn.isEnabled().catch(() => false)) {
  31  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  32  |         }
  33  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  34  |       }
  35  |     }
  36  |     return page;
  37  |   }
  38  | 
  39  |   test.beforeEach(async ({ page }) => {
  40  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  41  |       // Intercept subscription API agar fitur pengaturan aktif penuh tanpa modal upgrade
  42  |       await page.route('**/subscription**', async route => {
  43  |         try {
  44  |           const response = await route.fetch();
  45  |           const json = await response.json();
  46  |           if (json.data && json.data.active_features) {
  47  |             for (const key of Object.keys(json.data.active_features)) {
  48  |               if (typeof json.data.active_features[key] === 'boolean') {
  49  |                 json.data.active_features[key] = true;
  50  |               }
  51  |             }
  52  |           }
  53  |           await route.fulfill({ json });
  54  |         } catch {
  55  |           await route.continue().catch(() => {});
  56  |         }
  57  |       });
  58  | 
  59  |       await loginBeforeTest(page);
  60  |       try {
  61  |         await page.goto('/admin/setting/transaction', { waitUntil: 'domcontentloaded', timeout: 25000 });
  62  |       } catch {
  63  |         await page.goto('/admin/setting/transaction', { waitUntil: 'commit', timeout: 25000 });
  64  |       }
  65  |       await expect(page).toHaveURL(/\/admin\/setting\/transaction/, { timeout: 20000 });
  66  | 
  67  |       // Pastikan form dan data outlet telah selesai dimuat dari backend
  68  |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  69  |       await expect(outletInput).toBeVisible({ timeout: 15000 });
  70  |       await expect(outletInput).not.toHaveValue('', { timeout: 10000 }).catch(() => {});
  71  |       await expect(page.getByPlaceholder('Masukkan Target Transaksi')).toBeVisible({ timeout: 15000 });
  72  |     
  73  |     });
  74  |   });
  75  | 
  76  |   test('[TC-01] Menampilkan seluruh elemen utama halaman Pengaturan Transaksi', async ({ page }) => {
  77  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan seluruh elemen utama halaman Pengaturan Transaksi', async () => {
  78  |       // 1. Breadcrumb
  79  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root, main').filter({ hasText: 'Transaksi' });
  80  |       await expect(breadcrumb.first()).toBeVisible({ timeout: 10000 });
  81  | 
  82  |       // 2. Dropdown Pemilih Outlet
  83  |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  84  |       await expect(outletInput).toBeVisible();
  85  | 
  86  |       // 3. Tombol Aksi Simpan dan Simpan Semua Cabang
  87  |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  88  |       await expect(simpanBtn).toBeVisible();
  89  |       const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
  90  |       await expect(simpanSemuaBtn).toBeVisible();
  91  | 
  92  |       // 4. Section Target Transaksi Harian Cabang
  93  |       const targetSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Target Transaksi Harian Cabang' }).first();
  94  |       await expect(targetSection).toBeVisible();
  95  |       await expect(targetSection.getByPlaceholder('Masukkan Target Transaksi')).toBeVisible();
  96  | 
  97  |       // 5. Section Pengaturan Cash Drawer
  98  |       const cashDrawerSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Cash Drawer' }).first();
  99  |       await expect(cashDrawerSection).toBeVisible();
  100 |       await expect(cashDrawerSection.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer')).toBeVisible();
  101 | 
  102 |       // 6. Section Pengaturan Pembulatan
  103 |       const pembulatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Pembulatan' }).first();
  104 |       await expect(pembulatanSection).toBeVisible();
  105 |       await expect(pembulatanSection.locator('label:has-text("Ya")')).toBeVisible();
  106 |       await expect(pembulatanSection.locator('label:has-text("Tidak")')).toBeVisible();
  107 | 
  108 |       // 7. Section Otentikasi Pembatalan Transaksi
  109 |       const otentikasiSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Otentikasi Pembatalan Transaksi' }).first();
  110 |       await expect(otentikasiSection).toBeVisible();
  111 |       await expect(otentikasiSection).toContainText('Lakukan Otentikasi dengan Kode OTP');
  112 | 
  113 |       // 8. Section Pengaturan Catatan Transaksi
  114 |       const catatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Catatan Transaksi' }).first();
  115 |       await expect(catatanSection).toBeVisible();
  116 |       await expect(catatanSection.locator('label:has-text("Ya")')).toBeVisible();
  117 |       await expect(catatanSection.locator('label:has-text("Tidak")')).toBeVisible();
  118 |     
  119 |     });
  120 |   });
  121 | 
  122 |   test('[TC-02] Menampilkan dan berinteraksi dengan dropdown pemilih outlet', async ({ page }) => {
  123 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan dan berinteraksi dengan dropdown pemilih outlet', async () => {
  124 |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  125 |       await expect(outletInput).toBeVisible();
  126 | 
  127 |       // Tunggu hingga nama outlet terisi dari fetch API
> 128 |       await expect(outletInput).not.toHaveValue('', { timeout: 10000 });
      |                                     ^ Error: expect(locator).not.toHaveValue(expected) failed
  129 |       const currentOutlet = await outletInput.inputValue();
  130 |       expect(currentOutlet.length).toBeGreaterThan(0);
  131 | 
  132 |       // Klik dropdown outlet untuk melihat daftar pilihan
  133 |       await outletInput.click();
  134 |       await page.waitForTimeout(500);
  135 | 
  136 |       const options = page.locator('.mantine-Select-option, [role="option"]');
  137 |       await expect(options.first()).toBeVisible({ timeout: 5000 });
  138 |       const count = await options.count();
  139 |       expect(count).toBeGreaterThan(0);
  140 | 
  141 |       // Pilih opsi pertama untuk memastikan interaksi stabil
  142 |       await options.first().click();
  143 |       await page.waitForTimeout(500);
  144 |     
  145 |     });
  146 |   });
  147 | 
  148 |   test('[TC-03] Mengisi input Target Transaksi Harian Cabang', async ({ page }) => {
  149 |     await test.step('Langkah Pengujian UAT: Mengisi input Target Transaksi Harian Cabang', async () => {
  150 |       const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
  151 |       await expect(targetInput).toBeVisible();
  152 | 
  153 |       await page.waitForTimeout(300);
  154 |       await targetInput.click();
  155 |       await targetInput.press('ControlOrMeta+a');
  156 |       await targetInput.press('Backspace');
  157 |       await targetInput.fill('');
  158 |       await targetInput.pressSequentially('1500000', { delay: 40 });
  159 | 
  160 |       // Verifikasi nilai telah terisi dengan format angka / nominal secara auto-retry
  161 |       await expect(targetInput).toHaveValue(/1\.500\.000/, { timeout: 10000 });
  162 |     
  163 |     });
  164 |   });
  165 | 
  166 |   test('[TC-04] Mengisi input Pengaturan Cash Drawer', async ({ page }) => {
  167 |     await test.step('Langkah Pengujian UAT: Mengisi input Pengaturan Cash Drawer', async () => {
  168 |       const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
  169 |       await expect(cashDrawerInput).toBeVisible();
  170 | 
  171 |       await page.waitForTimeout(300);
  172 |       await cashDrawerInput.click();
  173 |       await cashDrawerInput.press('ControlOrMeta+a');
  174 |       await cashDrawerInput.press('Backspace');
  175 |       await cashDrawerInput.fill('');
  176 |       await cashDrawerInput.pressSequentially('750000', { delay: 40 });
  177 | 
  178 |       // Verifikasi nilai telah terisi dengan format angka / nominal secara auto-retry
  179 |       await expect(cashDrawerInput).toHaveValue(/750\.000/, { timeout: 10000 });
  180 |     
  181 |     });
  182 |   });
  183 | 
  184 |   test('[TC-05] Mengatur opsi radio Pengaturan Pembulatan (Ya / Tidak)', async ({ page }) => {
  185 |     await test.step('Langkah Pengujian UAT: Mengatur opsi radio Pengaturan Pembulatan (Ya / Tidak)', async () => {
  186 |       const pembulatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Pembulatan' }).first();
  187 |       await expect(pembulatanSection).toBeVisible();
  188 | 
  189 |       // 1. Klik opsi 'Ya' pada Pengaturan Pembulatan menggunakan .mantine-Radio-root
  190 |       const yaRadioRoot = pembulatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Ya' });
  191 |       await yaRadioRoot.click();
  192 |       await page.waitForTimeout(800);
  193 | 
  194 |       // Field konfigurasi pembulatan harus muncul
  195 |       const modeSelect = page.getByPlaceholder('Pilih Mode Pembulatan');
  196 |       await expect(modeSelect).toBeVisible({ timeout: 10000 });
  197 |       await expect(page.getByPlaceholder('Pilih Pembulatan Nilai Terdekat')).toBeVisible({ timeout: 5000 });
  198 |       await expect(page.getByPlaceholder('Pilih Angka Desimal Penjualan')).toBeVisible({ timeout: 5000 });
  199 | 
  200 |       // 2. Klik opsi 'Tidak'
  201 |       const tidakRadioRoot = pembulatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Tidak' });
  202 |       await tidakRadioRoot.click();
  203 |       await page.waitForTimeout(800);
  204 | 
  205 |       // Field konfigurasi pembulatan harus tersembunyi
  206 |       await expect(modeSelect).toBeHidden({ timeout: 5000 });
  207 |     
  208 |     });
  209 |   });
  210 | 
  211 |   test('[TC-06] Mengatur toggle Otentikasi Pembatalan Transaksi', async ({ page }) => {
  212 |     await test.step('Langkah Pengujian UAT: Mengatur toggle Otentikasi Pembatalan Transaksi', async () => {
  213 |       const otentikasiSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Otentikasi Pembatalan Transaksi' }).first();
  214 |       await expect(otentikasiSection).toBeVisible();
  215 | 
  216 |       // Deskripsi pengiriman OTP via WhatsApp
  217 |       await expect(otentikasiSection).toContainText('Kirim kode OTP ke Whatsapp Owner');
  218 | 
  219 |       // Toggle switch (elemen visible adalah track / root)
  220 |       const switchTrack = otentikasiSection.locator('.mantine-Switch-track, .mantine-Switch-root').first();
  221 |       await expect(switchTrack).toBeVisible();
  222 | 
  223 |       // Klik toggle untuk verifikasi interaksi
  224 |       await switchTrack.click();
  225 |       await page.waitForTimeout(500);
  226 | 
  227 |       // Klik kembali untuk mengembalikan status
  228 |       await switchTrack.click();
```