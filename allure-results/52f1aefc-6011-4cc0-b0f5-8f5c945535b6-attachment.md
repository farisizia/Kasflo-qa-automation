# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/transaksi.spec.js >> Pengaturan Transaksi >> [TC-09] Berhasil menyimpan pengaturan transaksi via tombol Simpan Semua Cabang
- Location: tests/Kasflo-Resto/Pengaturan/transaksi.spec.js:321:3

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
- main:
  - img
  - paragraph: Transaksi
  - button "Premium":
    - text: Premium
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
    - text: 2.500.000
  - heading "Pengaturan Cash Drawer" [level=5]
  - text: Maksimal Uang di Cash Drawer Rp
  - textbox "Maksimal Uang di Cash Drawer":
    - /placeholder: Masukkan Maksimal Uang di Cash Drawer
    - text: "600.000"
  - paragraph: Tampil Pemberitahuan di Aplikasi POS Jika Uang di Cash Drawer Telah Mencapai Rp600.000
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
  - heading "Pengaturan Keamanan & Kunci Layar POS" [level=5]
  - text: Apakah tersedia fitur kunci layar dan wajib pin untuk aplikasi POS ketika harga transaksi tunda berubah?
  - radiogroup "Apakah tersedia fitur kunci layar dan wajib pin untuk aplikasi POS ketika harga transaksi tunda berubah?":
    - radio "Ya"
    - text: Ya
    - radio "Tidak"
    - text: Tidak
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  254 |   });
  255 | 
  256 |   test('[TC-07] Mengatur opsi radio Pengaturan Catatan Transaksi', async ({ page }) => {
  257 |     await test.step('Langkah Pengujian UAT: Mengatur opsi radio Pengaturan Catatan Transaksi', async () => {
  258 |       const catatanSection = page.locator('.mantine-Paper-root').filter({ hasText: 'Pengaturan Catatan Transaksi' }).first();
  259 |       await expect(catatanSection).toBeVisible();
  260 | 
  261 |       // Memverifikasi pertanyaan catatan transaksi
  262 |       await expect(catatanSection).toContainText('Apakah wajib memasukkan catatan transaksi');
  263 | 
  264 |       // 1. Klik opsi 'Ya'
  265 |       const yaRadioRoot = catatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Ya' });
  266 |       await yaRadioRoot.click();
  267 |       await waitForPageReady(page);
  268 | 
  269 |       // 2. Klik opsi 'Tidak'
  270 |       const tidakRadioRoot = catatanSection.locator('.mantine-Radio-root').filter({ hasText: 'Tidak' });
  271 |       await tidakRadioRoot.click();
  272 |       await waitForPageReady(page);
  273 |     
  274 |     });
  275 |   });
  276 | 
  277 |   test('[TC-08] Berhasil menyimpan pengaturan transaksi via tombol Simpan', async ({ page }) => {
  278 |     await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan transaksi via tombol Simpan', async () => {
  279 |       // Ubah target transaksi
  280 |       const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
  281 |       await targetInput.click();
  282 |       await targetInput.press('ControlOrMeta+a');
  283 |       await targetInput.press('Backspace');
  284 |       await targetInput.fill('');
  285 |       await targetInput.pressSequentially('2000000', { delay: 30 });
  286 | 
  287 |       // Ubah cash drawer
  288 |       const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
  289 |       await cashDrawerInput.click();
  290 |       await cashDrawerInput.press('ControlOrMeta+a');
  291 |       await cashDrawerInput.press('Backspace');
  292 |       await cashDrawerInput.fill('');
  293 |       await cashDrawerInput.pressSequentially('500000', { delay: 30 });
  294 | 
  295 |       // Tangkap request API save
  296 |       let savePayload = null;
  297 |       page.on('request', req => {
  298 |         if (req.method() === 'PUT' && req.url().includes('other-settings')) {
  299 |           try {
  300 |             savePayload = JSON.parse(req.postData());
  301 |           } catch {}
  302 |         }
  303 |       });
  304 | 
  305 |       // Klik tombol Simpan (untuk cabang aktif)
  306 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  307 |       await simpanBtn.click();
  308 | 
  309 |       // Verifikasi toast notifikasi sukses
  310 |       const toast = page.locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' });
  311 |       await expect(toast).toBeVisible({ timeout: 10000 });
  312 | 
  313 |       // Verifikasi payload bahwa is_apply_to_all_branches bernilai 0
  314 |       if (savePayload) {
  315 |         expect(savePayload.is_apply_to_all_branches).toBe(0);
  316 |       }
  317 |     
  318 |     });
  319 |   });
  320 | 
  321 |   test('[TC-09] Berhasil menyimpan pengaturan transaksi via tombol Simpan Semua Cabang', async ({ page }) => {
  322 |     await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan transaksi via tombol Simpan Semua Cabang', async () => {
  323 |       // Ubah nilai input agar form berada dalam kondisi siap simpan dengan nilai berbeda
  324 |       const targetInput = page.getByPlaceholder('Masukkan Target Transaksi');
  325 |       await targetInput.click();
  326 |       await targetInput.press('ControlOrMeta+a');
  327 |       await targetInput.press('Backspace');
  328 |       await targetInput.fill('');
  329 |       await targetInput.pressSequentially('2500000', { delay: 30 });
  330 | 
  331 |       const cashDrawerInput = page.getByPlaceholder('Masukkan Maksimal Uang di Cash Drawer');
  332 |       await cashDrawerInput.click();
  333 |       await cashDrawerInput.press('ControlOrMeta+a');
  334 |       await cashDrawerInput.press('Backspace');
  335 |       await cashDrawerInput.fill('');
  336 |       await cashDrawerInput.pressSequentially('600000', { delay: 30 });
  337 | 
  338 |       // Tangkap request API save
  339 |       let savePayload = null;
  340 |       page.on('request', req => {
  341 |         if (req.method() === 'PUT' && req.url().includes('other-settings')) {
  342 |           try {
  343 |             savePayload = JSON.parse(req.postData());
  344 |           } catch {}
  345 |         }
  346 |       });
  347 | 
  348 |       // Klik tombol Simpan Semua Cabang
  349 |       const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
  350 |       await simpanSemuaBtn.click();
  351 | 
  352 |       // Verifikasi toast notifikasi sukses
  353 |       const toast = page.locator('.mantine-Notification-root, [role="alert"]').filter({ hasText: 'Update Pengaturan Transaksi Berhasil' });
> 354 |       await expect(toast).toBeVisible({ timeout: 10000 });
      |                           ^ Error: expect(locator).toBeVisible() failed
  355 | 
  356 |       // Verifikasi payload bahwa is_apply_to_all_branches bernilai 1
  357 |       if (savePayload) {
  358 |         expect(savePayload.is_apply_to_all_branches).toBe(1);
  359 |       }
  360 |     
  361 |     });
  362 |   });
  363 | });
  364 | 
```