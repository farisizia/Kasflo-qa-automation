# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/shift.spec.js >> Pengaturan Shift >> [TC-06] Berhasil menyimpan pengaturan shift untuk cabang aktif via tombol Simpan
- Location: tests/Kasflo-Resto/Pengaturan/shift.spec.js:247:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Page snapshot

```yaml
- generic [ref=f1e1]:
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
          - link [ref=f1e27] [cursor=pointer]:
            - /url: /admin/ingredients
            - paragraph [ref=f1e35]: Bahan Baku
          - link [ref=f1e39] [cursor=pointer]:
            - /url: /admin/promotion
            - paragraph [ref=f1e47]: Promosi
          - link [ref=f1e51] [cursor=pointer]:
            - /url: /admin/customer
            - paragraph [ref=f1e60]: Pelanggan
          - link [ref=f1e64] [cursor=pointer]:
            - /url: /admin/cash-account
            - paragraph [ref=f1e72]: Pembukuan
          - link [ref=f1e76] [cursor=pointer]:
            - /url: /admin/report
            - paragraph [ref=f1e84]: Laporan Usaha
          - link [ref=f1e88] [cursor=pointer]:
            - /url: /admin/user-management
            - paragraph [ref=f1e96]: Manajemen User
          - link [ref=f1e100] [cursor=pointer]:
            - /url: /admin/setting
            - paragraph [ref=f1e107]: Pengaturan
          - generic [ref=f1e112]:
            - link "Data Cabang" [ref=f1e113] [cursor=pointer]:
              - /url: /admin/branch-management/branch
            - link "Pengaturan Area" [ref=f1e115] [cursor=pointer]:
              - /url: /admin/branch-management/area
            - link "Pengaturan Meja" [ref=f1e117] [cursor=pointer]:
              - /url: /admin/branch-management/setting-table
            - link "Pajak & Biaya Lainnya" [ref=f1e119] [cursor=pointer]:
              - /url: /admin/setting/tax-and-other
            - link "Metode Pembayaran" [ref=f1e121] [cursor=pointer]:
              - /url: /admin/setting/payment-method
            - link "Struk" [ref=f1e123] [cursor=pointer]:
              - /url: /admin/setting/receipt
            - link "Shift" [ref=f1e125] [cursor=pointer]:
              - /url: /admin/setting/shift
            - link "Atur Rekening" [ref=f1e127] [cursor=pointer]:
              - /url: /admin/setting/bank-account
            - link "Transaksi" [ref=f1e129] [cursor=pointer]:
              - /url: /admin/setting/transaction
      - main [ref=f1e131]:
        - generic [ref=f1e132]:
          - generic [ref=f1e134]:
            - paragraph [ref=f1e139]: Pengaturan Shift
            - generic [ref=f1e140]:
              - button "Premium" [ref=f1e142] [cursor=pointer]
              - button "Saldo QRIS" [ref=f1e150] [cursor=pointer]
              - button [ref=f1e156] [cursor=pointer]:
                - generic [ref=f1e163]:
                  - paragraph [ref=f1e164]: Kasflo Automation
                  - paragraph [ref=f1e165]: OWNER
          - generic [ref=f1e169]:
            - link [ref=f1e170] [cursor=pointer]:
              - /url: /admin/dashboard
            - generic [ref=f1e174]: /
            - paragraph [ref=f1e175]: Pengaturan Shift
          - generic [ref=f1e177]:
            - generic [ref=f1e180]:
              - textbox "Pilih Outlet" [ref=f1e181] [cursor=pointer]
              - button [ref=f1e184] [cursor=pointer]
            - generic [ref=f1e189]:
              - button "Simpan" [active] [ref=f1e191] [cursor=pointer]
              - button "Simpan Semua Cabang" [ref=f1e195] [cursor=pointer]
          - generic [ref=f1e201]:
            - heading "Pengaturan Absensi" [level=5] [ref=f1e202]
            - generic [ref=f1e203]:
              - generic [ref=f1e204]:
                - paragraph [ref=f1e205]: Wajib Absen
                - paragraph [ref=f1e206]: Ketika pengaturan ini di aktifkan maka ketika masuk ke POS perlu masukkan kas awal
              - generic [ref=f1e208]:
                - switch "Nonaktif"
                - generic [ref=f1e212]: Nonaktif
          - generic [ref=f1e215]:
            - button "Tambah Shift" [ref=f1e217] [cursor=pointer]
            - table [ref=f1e222]:
              - rowgroup [ref=f1e223]:
                - row [ref=f1e224]:
                  - cell "Nama Shift" [ref=f1e225]
                  - cell "Jam Buka" [ref=f1e226]
                  - cell "Jam Tutup" [ref=f1e227]
                  - cell "Action" [ref=f1e228]
              - rowgroup [ref=f1e229]:
                - row [ref=f1e230]:
                  - cell [ref=f1e231]:
                    - textbox "Masukkan Nama Shift" [ref=f1e234]: Shift Simpan 492342
                  - cell [ref=f1e235]:
                    - textbox "Masukkan Jam Mulai" [ref=f1e238]: 00:00
                  - cell [ref=f1e239]:
                    - textbox "Masukkan Jam Berakhir" [ref=f1e242]: 02:30
                  - cell [ref=f1e243]:
                    - button [ref=f1e244] [cursor=pointer]
    - link "Konsultasi Sekarang" [ref=f1e249] [cursor=pointer]:
      - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - alert [ref=f1e258]:
    - generic [ref=f1e262]:
      - generic [ref=f1e263]: Error
      - generic [ref=f1e264]: Cabang tidak valid
    - button [ref=f1e265] [cursor=pointer]
  - generic:
    - tooltip "Simpan di"
```

# Test source

```ts
  190 |   test('[TC-04] Mengisi nama shift serta memilih Jam Mulai dan Jam Berakhir', async ({ page }) => {
  191 |     await test.step('Langkah Pengujian UAT: Mengisi nama shift serta memilih Jam Mulai dan Jam Berakhir', async () => {
  192 |       const tambahShiftBtn = page.getByRole('button', { name: 'Tambah Shift' });
  193 |       await tambahShiftBtn.click();
  194 |       await waitForPageReady(page);
  195 | 
  196 |       const targetRow = page.locator('table tbody tr').last();
  197 |       const namaShiftInput = targetRow.getByPlaceholder('Masukkan Nama Shift');
  198 |       const shiftName = 'Shift Siang QA ' + Date.now().toString().slice(-5);
  199 |       await namaShiftInput.fill(shiftName);
  200 |       await expect(namaShiftInput).toHaveValue(shiftName);
  201 | 
  202 |       // Pilih Jam Mulai
  203 |       const jamMulaiInput = targetRow.getByPlaceholder('Masukkan Jam Mulai');
  204 |       await jamMulaiInput.click();
  205 |       await waitForPageReady(page);
  206 | 
  207 |       const mulaiOption = page.locator('.mantine-Select-option:visible, [role="option"]:visible').first();
  208 |       const mulaiText = await mulaiOption.innerText();
  209 |       await mulaiOption.click();
  210 |       await expect(jamMulaiInput).toHaveValue(mulaiText);
  211 | 
  212 |       // Pilih Jam Berakhir
  213 |       const jamBerakhirInput = targetRow.getByPlaceholder('Masukkan Jam Berakhir');
  214 |       await jamBerakhirInput.click();
  215 |       await waitForPageReady(page);
  216 | 
  217 |       const berakhirOption = page.locator('.mantine-Select-option:visible, [role="option"]:visible').nth(8);
  218 |       const berakhirText = await berakhirOption.innerText();
  219 |       await berakhirOption.click();
  220 |       await expect(jamBerakhirInput).toHaveValue(berakhirText);
  221 |     
  222 |     });
  223 |   });
  224 | 
  225 |   test('[TC-05] Menghapus baris shift via tombol ikon hapus (tempat sampah merah)', async ({ page }) => {
  226 |     await test.step('Langkah Pengujian UAT: Menghapus baris shift via tombol ikon hapus (tempat sampah merah)', async () => {
  227 |       // Pastikan setidaknya ada 1 baris
  228 |       const rows = page.locator('table tbody tr');
  229 |       let rowsCount = await rows.count();
  230 |       if (rowsCount === 0) {
  231 |         await page.getByRole('button', { name: 'Tambah Shift' }).click();
  232 |         await waitForPageReady(page);
  233 |         rowsCount = await rows.count();
  234 |       }
  235 | 
  236 |       const countBeforeDelete = rowsCount;
  237 |       const deleteBtn = rows.last().locator('button');
  238 |       await deleteBtn.click();
  239 |       await waitForPageReady(page);
  240 | 
  241 |       const countAfterDelete = await rows.count();
  242 |       expect(countAfterDelete).toBe(countBeforeDelete - 1);
  243 |     
  244 |     });
  245 |   });
  246 | 
  247 |   test('[TC-06] Berhasil menyimpan pengaturan shift untuk cabang aktif via tombol Simpan', async ({ page }) => {
  248 |     await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan shift untuk cabang aktif via tombol Simpan', async () => {
  249 |       // Bersihkan baris shift berlebih jika sudah lebih dari 2 baris agar data tetap idempoten
  250 |       const rows = page.locator('table tbody tr');
  251 |       while (await rows.count() > 2) {
  252 |         await rows.last().locator('button').click();
  253 |         await waitForPageReady(page);
  254 |       }
  255 | 
  256 |       // Tambah satu shift untuk memastikan data dirty dan valid
  257 |       const tambahShiftBtn = page.getByRole('button', { name: 'Tambah Shift' });
  258 |       await expect(tambahShiftBtn).toBeVisible();
  259 |       await expect(tambahShiftBtn).toBeEnabled();
  260 |       await tambahShiftBtn.click();
  261 |       await waitForPageReady(page);
  262 | 
  263 |       const newRow = page.locator('table tbody tr').last();
  264 |       const uniqueSuffix = Date.now().toString().slice(-6);
  265 |       await newRow.getByPlaceholder('Masukkan Nama Shift').fill(`Shift Simpan ${uniqueSuffix}`);
  266 | 
  267 |       // Pilih Jam Mulai
  268 |       await newRow.getByPlaceholder('Masukkan Jam Mulai').click();
  269 |       await waitForPageReady(page);
  270 |       await page.locator('.mantine-Select-option:visible, [role="option"]:visible').first().click();
  271 | 
  272 |       // Pilih Jam Berakhir
  273 |       await newRow.getByPlaceholder('Masukkan Jam Berakhir').click();
  274 |       await waitForPageReady(page);
  275 |       await page.locator('.mantine-Select-option:visible, [role="option"]:visible').nth(10).click();
  276 | 
  277 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  278 |       await expect(simpanBtn).toBeVisible();
  279 |       await expect(simpanBtn).toBeEnabled();
  280 | 
  281 |       // Tunggu request PUT save dan response
  282 |       const [putResponse] = await Promise.all([
  283 |         page.waitForResponse(
  284 |           res => res.url().includes('shift-times') && res.request().method() === 'PUT',
  285 |           { timeout: 15000 }
  286 |         ),
  287 |         simpanBtn.click(),
  288 |       ]);
  289 | 
> 290 |       expect(putResponse.status()).toBe(200);
      |                                    ^ Error: expect(received).toBe(expected) // Object.is equality
  291 | 
  292 |       // Pastikan loading spinner selesai
  293 |       await expect(page.locator('.mantine-Loader-root').first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
  294 |     });
  295 |   });
  296 | 
  297 |   test('[TC-07] Berhasil menyimpan pengaturan shift untuk semua cabang via tombol Simpan Semua Cabang', async ({ page }) => {
  298 |     await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan shift untuk semua cabang via tombol Simpan Semua Cabang', async () => {
  299 |       // Bersihkan baris shift berlebih jika sudah lebih dari 2 baris agar data tetap idempoten
  300 |       const rows = page.locator('table tbody tr');
  301 |       while (await rows.count() > 2) {
  302 |         await rows.last().locator('button').click();
  303 |         await waitForPageReady(page);
  304 |       }
  305 | 
  306 |       // Tambah satu shift atau edit nama shift
  307 |       const tambahShiftBtn = page.getByRole('button', { name: 'Tambah Shift' });
  308 |       await expect(tambahShiftBtn).toBeVisible();
  309 |       await expect(tambahShiftBtn).toBeEnabled();
  310 |       await tambahShiftBtn.click();
  311 |       await waitForPageReady(page);
  312 | 
  313 |       const newRow = page.locator('table tbody tr').last();
  314 |       const uniqueSuffix = Date.now().toString().slice(-6);
  315 |       await newRow.getByPlaceholder('Masukkan Nama Shift').fill(`Shift Semua ${uniqueSuffix}`);
  316 | 
  317 |       // Pilih Jam Mulai
  318 |       await newRow.getByPlaceholder('Masukkan Jam Mulai').click();
  319 |       await waitForPageReady(page);
  320 |       await page.locator('.mantine-Select-option:visible, [role="option"]:visible').first().click();
  321 | 
  322 |       // Pilih Jam Berakhir
  323 |       await newRow.getByPlaceholder('Masukkan Jam Berakhir').click();
  324 |       await waitForPageReady(page);
  325 |       await page.locator('.mantine-Select-option:visible, [role="option"]:visible').nth(12).click();
  326 | 
  327 |       const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
  328 |       await expect(simpanSemuaBtn).toBeVisible();
  329 |       await expect(simpanSemuaBtn).toBeEnabled();
  330 | 
  331 |       let requestBody = null;
  332 |       page.on('request', req => {
  333 |         if (req.url().includes('shift-times') && req.method() === 'PUT') {
  334 |           try {
  335 |             requestBody = JSON.parse(req.postData());
  336 |           } catch {
  337 |             requestBody = req.postData();
  338 |           }
  339 |         }
  340 |       });
  341 | 
  342 |       const [putResponse] = await Promise.all([
  343 |         page.waitForResponse(
  344 |           res => res.url().includes('shift-times') && res.request().method() === 'PUT',
  345 |           { timeout: 15000 }
  346 |         ),
  347 |         simpanSemuaBtn.click(),
  348 |       ]);
  349 | 
  350 |       expect(putResponse.status()).toBe(200);
  351 |       if (requestBody && typeof requestBody === 'object') {
  352 |         expect(requestBody.is_apply_to_all_branches).toBe(1);
  353 |       }
  354 | 
  355 |       // Pastikan loading spinner selesai
  356 |       await expect(page.locator('.mantine-Loader-root').first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
  357 |     
  358 |     });
  359 |   });
  360 | });
  361 | 
```