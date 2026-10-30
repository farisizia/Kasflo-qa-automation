# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/transaksi.spec.js >> Pengaturan Transaksi >> [TC-02] Menampilkan dan berinteraksi dengan dropdown pemilih outlet
- Location: tests/Kasflo-Resto/Pengaturan/transaksi.spec.js:144:3

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
    24 × locator resolved to <input readonly value="" autocomplete="off" aria-invalid="false" data-variant="default" id="mantine-9evimk3u6" aria-haspopup="listbox" placeholder="Pilih Outlet" aria-controls="mantine-43xedt5ut" class="m_8fb7ebe7 mantine-Input-input mantine-Select-input"/>
       - unexpected value ""

```

```yaml
- textbox "Pilih Outlet"
```

# Test source

```ts
  50  |         await waitForPageReady(page);
  51  |         if (await loginBtn.isEnabled().catch(() => false)) {
  52  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  53  |         }
  54  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  55  |       }
  56  |     }
  57  |     await waitForPageReady(page);
  58  |     return page;
  59  |   }
  60  | 
  61  |   test.beforeEach(async ({ page }) => {
  62  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  63  |       // Intercept subscription API agar fitur pengaturan aktif penuh tanpa modal upgrade
  64  |       await page.route('**/subscription**', async route => {
  65  |         try {
  66  |           const response = await route.fetch();
  67  |           const json = await response.json();
  68  |           if (json.data && json.data.active_features) {
  69  |             for (const key of Object.keys(json.data.active_features)) {
  70  |               if (typeof json.data.active_features[key] === 'boolean') {
  71  |                 json.data.active_features[key] = true;
  72  |               }
  73  |             }
  74  |           }
  75  |           await route.fulfill({ json });
  76  |         } catch {
  77  |           await route.continue().catch(() => {});
  78  |         }
  79  |       });
  80  | 
  81  |       await loginBeforeTest(page);
  82  |       try {
  83  |         await page.goto('/admin/setting/transaction', { waitUntil: 'domcontentloaded', timeout: 25000 });
  84  |       } catch {
  85  |         await page.goto('/admin/setting/transaction', { waitUntil: 'commit', timeout: 25000 });
  86  |       }
  87  |       await expect(page).toHaveURL(/\/admin\/setting\/transaction/, { timeout: 20000 });
  88  | 
  89  |       // Pastikan form dan data outlet telah selesai dimuat dari backend
  90  |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  91  |       await expect(outletInput).toBeVisible({ timeout: 15000 });
  92  |       await expect(outletInput).not.toHaveValue('', { timeout: 10000 }).catch(() => {});
  93  |       await expect(page.getByPlaceholder('Masukkan Target Transaksi')).toBeVisible({ timeout: 15000 });
  94  |     
  95  |     });
  96  |   });
  97  | 
  98  |   test('[TC-01] Menampilkan seluruh elemen utama halaman Pengaturan Transaksi', async ({ page }) => {
  99  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan seluruh elemen utama halaman Pengaturan Transaksi', async () => {
  100 |       // 1. Breadcrumb
  101 |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root, main').filter({ hasText: 'Transaksi' });
  102 |       await expect(breadcrumb.first()).toBeVisible({ timeout: 10000 });
  103 | 
  104 |       // 2. Dropdown Pemilih Outlet
  105 |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  106 |       await expect(outletInput).toBeVisible();
  107 | 
  108 |       // 3. Tombol Aksi Simpan dan Simpan Semua Cabang
  109 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  110 |       await expect(simpanBtn).toBeVisible();
  111 |       const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
  112 |       await expect(simpanSemuaBtn).toBeVisible();
  113 | 
  114 |       // 4. Section Target Transaksi Harian Cabang
  115 |       const targetSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Target Transaksi Harian Cabang' }).first();
  116 |       await expect(targetSection).toBeVisible();
  117 |       await expect(targetSection.getByPlaceholder('Masukkan Target Transaksi')).toBeVisible();
  118 | 
  119 |       // 5. Section Pengaturan Cash Drawer
  120 |       const cashDrawerSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Cash Drawer' }).first();
  121 |       await expect(cashDrawerSection).toBeVisible();
  122 |       await expect(cashDrawerSection.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer')).toBeVisible();
  123 | 
  124 |       // 6. Section Pengaturan Pembulatan
  125 |       const pembulatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Pembulatan' }).first();
  126 |       await expect(pembulatanSection).toBeVisible();
  127 |       await expect(pembulatanSection.locator('label:has-text("Ya")')).toBeVisible();
  128 |       await expect(pembulatanSection.locator('label:has-text("Tidak")')).toBeVisible();
  129 | 
  130 |       // 7. Section Otentikasi Pembatalan Transaksi
  131 |       const otentikasiSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Otentikasi Pembatalan Transaksi' }).first();
  132 |       await expect(otentikasiSection).toBeVisible();
  133 |       await expect(otentikasiSection).toContainText('Lakukan Otentikasi dengan Kode OTP');
  134 | 
  135 |       // 8. Section Pengaturan Catatan Transaksi
  136 |       const catatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Catatan Transaksi' }).first();
  137 |       await expect(catatanSection).toBeVisible();
  138 |       await expect(catatanSection.locator('label:has-text("Ya")')).toBeVisible();
  139 |       await expect(catatanSection.locator('label:has-text("Tidak")')).toBeVisible();
  140 |     
  141 |     });
  142 |   });
  143 | 
  144 |   test('[TC-02] Menampilkan dan berinteraksi dengan dropdown pemilih outlet', async ({ page }) => {
  145 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan dan berinteraksi dengan dropdown pemilih outlet', async () => {
  146 |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  147 |       await expect(outletInput).toBeVisible();
  148 | 
  149 |       // Tunggu hingga nama outlet terisi dari fetch API
> 150 |       await expect(outletInput).not.toHaveValue('', { timeout: 10000 });
      |                                     ^ Error: expect(locator).not.toHaveValue(expected) failed
  151 |       const currentOutlet = await outletInput.inputValue();
  152 |       expect(currentOutlet.length).toBeGreaterThan(0);
  153 | 
  154 |       // Klik dropdown outlet untuk melihat daftar pilihan
  155 |       await outletInput.click();
  156 |       await waitForPageReady(page);
  157 | 
  158 |       const options = page.locator('.mantine-Select-option, [role="option"]');
  159 |       await expect(options.first()).toBeVisible({ timeout: 5000 });
  160 |       const count = await options.count();
  161 |       expect(count).toBeGreaterThan(0);
  162 | 
  163 |       // Pilih opsi pertama untuk memastikan interaksi stabil
  164 |       await options.first().click();
  165 |       await waitForPageReady(page);
  166 |     
  167 |     });
  168 |   });
  169 | 
  170 |   test('[TC-03] Mengisi input Target Transaksi Harian Cabang', async ({ page }) => {
  171 |     await test.step('Langkah Pengujian UAT: Mengisi input Target Transaksi Harian Cabang', async () => {
  172 |       const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
  173 |       await expect(targetInput).toBeVisible();
  174 | 
  175 |       await waitForPageReady(page);
  176 |       await targetInput.click();
  177 |       await targetInput.press('ControlOrMeta+a');
  178 |       await targetInput.press('Backspace');
  179 |       await targetInput.fill('');
  180 |       await targetInput.pressSequentially('1500000', { delay: 40 });
  181 | 
  182 |       // Verifikasi nilai telah terisi dengan format angka / nominal secara auto-retry
  183 |       await expect(targetInput).toHaveValue(/1\.500\.000/, { timeout: 10000 });
  184 |     
  185 |     });
  186 |   });
  187 | 
  188 |   test('[TC-04] Mengisi input Pengaturan Cash Drawer', async ({ page }) => {
  189 |     await test.step('Langkah Pengujian UAT: Mengisi input Pengaturan Cash Drawer', async () => {
  190 |       const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
  191 |       await expect(cashDrawerInput).toBeVisible();
  192 | 
  193 |       await waitForPageReady(page);
  194 |       await cashDrawerInput.click();
  195 |       await cashDrawerInput.press('ControlOrMeta+a');
  196 |       await cashDrawerInput.press('Backspace');
  197 |       await cashDrawerInput.fill('');
  198 |       await cashDrawerInput.pressSequentially('750000', { delay: 40 });
  199 | 
  200 |       // Verifikasi nilai telah terisi dengan format angka / nominal secara auto-retry
  201 |       await expect(cashDrawerInput).toHaveValue(/750\.000/, { timeout: 10000 });
  202 |     
  203 |     });
  204 |   });
  205 | 
  206 |   test('[TC-05] Mengatur opsi radio Pengaturan Pembulatan (Ya / Tidak)', async ({ page }) => {
  207 |     await test.step('Langkah Pengujian UAT: Mengatur opsi radio Pengaturan Pembulatan (Ya / Tidak)', async () => {
  208 |       const pembulatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Pembulatan' }).first();
  209 |       await expect(pembulatanSection).toBeVisible();
  210 | 
  211 |       // 1. Klik opsi 'Ya' pada Pengaturan Pembulatan menggunakan .mantine-Radio-root
  212 |       const yaRadioRoot = pembulatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Ya' });
  213 |       await yaRadioRoot.click();
  214 |       await waitForPageReady(page);
  215 | 
  216 |       // Field konfigurasi pembulatan harus muncul
  217 |       const modeSelect = page.getByPlaceholder('Pilih Mode Pembulatan');
  218 |       await expect(modeSelect).toBeVisible({ timeout: 10000 });
  219 |       await expect(page.getByPlaceholder('Pilih Pembulatan Nilai Terdekat')).toBeVisible({ timeout: 5000 });
  220 |       await expect(page.getByPlaceholder('Pilih Angka Desimal Penjualan')).toBeVisible({ timeout: 5000 });
  221 | 
  222 |       // 2. Klik opsi 'Tidak'
  223 |       const tidakRadioRoot = pembulatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Tidak' });
  224 |       await tidakRadioRoot.click();
  225 |       await waitForPageReady(page);
  226 | 
  227 |       // Field konfigurasi pembulatan harus tersembunyi
  228 |       await expect(modeSelect).toBeHidden({ timeout: 5000 });
  229 |     
  230 |     });
  231 |   });
  232 | 
  233 |   test('[TC-06] Mengatur toggle Otentikasi Pembatalan Transaksi', async ({ page }) => {
  234 |     await test.step('Langkah Pengujian UAT: Mengatur toggle Otentikasi Pembatalan Transaksi', async () => {
  235 |       const otentikasiSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Otentikasi Pembatalan Transaksi' }).first();
  236 |       await expect(otentikasiSection).toBeVisible();
  237 | 
  238 |       // Deskripsi pengiriman OTP via WhatsApp
  239 |       await expect(otentikasiSection).toContainText('Kirim kode OTP ke Whatsapp Owner');
  240 | 
  241 |       // Toggle switch (elemen visible adalah track / root)
  242 |       const switchTrack = otentikasiSection.locator('.mantine-Switch-track, .mantine-Switch-root').first();
  243 |       await expect(switchTrack).toBeVisible();
  244 | 
  245 |       // Klik toggle untuk verifikasi interaksi
  246 |       await switchTrack.click();
  247 |       await waitForPageReady(page);
  248 | 
  249 |       // Klik kembali untuk mengembalikan status
  250 |       await switchTrack.click();
```