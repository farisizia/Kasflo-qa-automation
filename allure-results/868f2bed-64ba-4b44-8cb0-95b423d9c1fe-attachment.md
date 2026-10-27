# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/transaksi.spec.js >> Pengaturan Transaksi >> [TC-08] Berhasil menyimpan pengaturan transaksi via tombol Simpan
- Location: tests/Kasflo-Resto/Pengaturan/transaksi.spec.js:255:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' }) with timeout 10000ms
  - waiting for locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' })

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
  - paragraph: Subscription akan berakhir dalam 4 hari.
  - link "Kunjungi Halaman Berlangganan":
    - /url: /admin/subscription?tab=history-subscription
    - paragraph: Kunjungi Halaman Berlangganan
  - img
  - paragraph: Transaksi
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
  - paragraph: Transaksi
  - textbox "Pilih Outlet"
  - button:
    - img
  - button "Simpan"
  - button "Simpan Semua Cabang"
  - heading "Target Transaksi Harian Cabang" [level=5]
  - text: Target Transaksi Rp
  - textbox "Target Transaksi":
    - /placeholder: Masukkan Target Transaksi
    - text: 2.000.000
  - heading "Pengaturan Cash Drawer" [level=5]
  - text: Maksimal Uang di Cash Drawer Rp
  - textbox "Maksimal Uang di Cash Drawer":
    - /placeholder: Masukkan Maksimal Uang di Cash Drawer
    - text: "500.000"
  - paragraph: Tampil Pemberitahuan di Aplikasi POS Jika Uang di Cash Drawer Telah Mencapai Rp500.000
  - heading "Pengaturan Pembulatan" [level=5]
  - text: Aktifkan pembulatan
  - radiogroup "Aktifkan pembulatan":
    - radio "Ya"
    - text: Ya
    - radio "Tidak"
    - text: Tidak
  - paragraph: Wajib diisi
  - heading "Otentikasi Pembatalan Transaksi" [level=5]
  - paragraph: Lakukan Otentikasi dengan Kode OTP
  - paragraph: Kirim kode OTP ke Whatsapp Owner untuk mengotentikasi pembatalan transaksi
  - switch "Nonaktif"
  - text: Nonaktif
  - heading "Pengaturan Catatan Transaksi" [level=5]
  - text: Apakah wajib memasukkan catatan transaksi ketika harga transaksi tunda berubah?
  - radiogroup "Apakah wajib memasukkan catatan transaksi ketika harga transaksi tunda berubah?":
    - radio "Ya"
    - text: Ya
    - radio "Tidak"
    - text: Tidak
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
- tooltip "Simpan di"
```

# Test source

```ts
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
  229 |       await page.waitForTimeout(500);
  230 |     
  231 |     });
  232 |   });
  233 | 
  234 |   test('[TC-07] Mengatur opsi radio Pengaturan Catatan Transaksi', async ({ page }) => {
  235 |     await test.step('Langkah Pengujian UAT: Mengatur opsi radio Pengaturan Catatan Transaksi', async () => {
  236 |       const catatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Catatan Transaksi' }).first();
  237 |       await expect(catatanSection).toBeVisible();
  238 | 
  239 |       // Memverifikasi pertanyaan catatan transaksi
  240 |       await expect(catatanSection).toContainText('Apakah wajib memasukkan catatan transaksi');
  241 | 
  242 |       // 1. Klik opsi 'Ya'
  243 |       const yaRadioRoot = catatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Ya' });
  244 |       await yaRadioRoot.click();
  245 |       await page.waitForTimeout(300);
  246 | 
  247 |       // 2. Klik opsi 'Tidak'
  248 |       const tidakRadioRoot = catatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Tidak' });
  249 |       await tidakRadioRoot.click();
  250 |       await page.waitForTimeout(300);
  251 |     
  252 |     });
  253 |   });
  254 | 
  255 |   test('[TC-08] Berhasil menyimpan pengaturan transaksi via tombol Simpan', async ({ page }) => {
  256 |     await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan transaksi via tombol Simpan', async () => {
  257 |       // Ubah target transaksi
  258 |       const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
  259 |       await targetInput.click();
  260 |       await targetInput.press('ControlOrMeta+a');
  261 |       await targetInput.press('Backspace');
  262 |       await targetInput.fill('');
  263 |       await targetInput.pressSequentially('2000000', { delay: 30 });
  264 | 
  265 |       // Ubah cash drawer
  266 |       const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
  267 |       await cashDrawerInput.click();
  268 |       await cashDrawerInput.press('ControlOrMeta+a');
  269 |       await cashDrawerInput.press('Backspace');
  270 |       await cashDrawerInput.fill('');
  271 |       await cashDrawerInput.pressSequentially('500000', { delay: 30 });
  272 | 
  273 |       // Tangkap request API save
  274 |       let savePayload = null;
  275 |       page.on('request', req => {
  276 |         if (req.method() === 'PUT' && req.url().includes('other-settings')) {
  277 |           try {
  278 |             savePayload = JSON.parse(req.postData());
  279 |           } catch {}
  280 |         }
  281 |       });
  282 | 
  283 |       // Klik tombol Simpan (untuk cabang aktif)
  284 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  285 |       await simpanBtn.click();
  286 | 
  287 |       // Verifikasi toast notifikasi sukses
  288 |       const toast = page.locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' });
> 289 |       await expect(toast).toBeVisible({ timeout: 10000 });
      |                           ^ Error: expect(locator).toBeVisible() failed
  290 | 
  291 |       // Verifikasi payload bahwa is_apply_to_all_branches bernilai 0
  292 |       if (savePayload) {
  293 |         expect(savePayload.is_apply_to_all_branches).toBe(0);
  294 |       }
  295 |     
  296 |     });
  297 |   });
  298 | 
  299 |   test('[TC-09] Berhasil menyimpan pengaturan transaksi via tombol Simpan Semua Cabang', async ({ page }) => {
  300 |     await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan transaksi via tombol Simpan Semua Cabang', async () => {
  301 |       // Ubah nilai input agar form berada dalam kondisi siap simpan dengan nilai berbeda
  302 |       const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
  303 |       await targetInput.click();
  304 |       await targetInput.press('ControlOrMeta+a');
  305 |       await targetInput.press('Backspace');
  306 |       await targetInput.fill('');
  307 |       await targetInput.pressSequentially('2500000', { delay: 30 });
  308 | 
  309 |       const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
  310 |       await cashDrawerInput.click();
  311 |       await cashDrawerInput.press('ControlOrMeta+a');
  312 |       await cashDrawerInput.press('Backspace');
  313 |       await cashDrawerInput.fill('');
  314 |       await cashDrawerInput.pressSequentially('600000', { delay: 30 });
  315 | 
  316 |       // Tangkap request API save
  317 |       let savePayload = null;
  318 |       page.on('request', req => {
  319 |         if (req.method() === 'PUT' && req.url().includes('other-settings')) {
  320 |           try {
  321 |             savePayload = JSON.parse(req.postData());
  322 |           } catch {}
  323 |         }
  324 |       });
  325 | 
  326 |       // Klik tombol Simpan Semua Cabang
  327 |       const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
  328 |       await simpanSemuaBtn.click();
  329 | 
  330 |       // Verifikasi toast notifikasi sukses
  331 |       const toast = page.locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' });
  332 |       await expect(toast).toBeVisible({ timeout: 10000 });
  333 | 
  334 |       // Verifikasi payload bahwa is_apply_to_all_branches bernilai 1
  335 |       if (savePayload) {
  336 |         expect(savePayload.is_apply_to_all_branches).toBe(1);
  337 |       }
  338 |     
  339 |     });
  340 |   });
  341 | });
  342 | 
```