# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/struk.spec.js >> Pengaturan Struk >> [TC-06] Berhasil menyimpan pengaturan struk untuk cabang aktif via tombol Simpan
- Location: tests/Kasflo-Resto/Pengaturan/struk.spec.js:241:3

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
            - paragraph [ref=f1e139]: Pengaturan Struk
            - generic [ref=f1e140]:
              - button "Premium" [ref=f1e142] [cursor=pointer]
              - button "Saldo QRIS" [ref=f1e150] [cursor=pointer]
              - button [ref=f1e156] [cursor=pointer]:
                - generic [ref=f1e163]:
                  - paragraph [ref=f1e164]: Kasflo Automation
                  - paragraph [ref=f1e165]: OWNER
          - generic [ref=f1e168]:
            - link [ref=f1e169] [cursor=pointer]:
              - /url: /admin/dashboard
            - generic [ref=f1e173]: /
            - paragraph [ref=f1e174]: Pengaturan Struk
          - generic [ref=f1e176]:
            - generic [ref=f1e179]:
              - textbox "Pilih Outlet" [ref=f1e180] [cursor=pointer]
              - button [ref=f1e183] [cursor=pointer]
            - generic [ref=f1e188]:
              - button "Simpan" [active] [ref=f1e190] [cursor=pointer]
              - button "Simpan Semua Cabang" [ref=f1e194] [cursor=pointer]
          - generic [ref=f1e198]:
            - generic [ref=f1e201]:
              - generic [ref=f1e202]:
                - generic [ref=f1e203]: Logo Usaha
                - generic [ref=f1e205] [cursor=pointer]:
                  - generic:
                    - generic:
                      - paragraph: Masukan Gambar dengan cara seret & lepasatau klik area ini
                      - paragraph: Gunakan file .jpg/.png & maks. 5 MB.
              - generic [ref=f1e206]:
                - generic [ref=f1e207]: Header
                - textbox "Header" [ref=f1e209]:
                  - /placeholder: Masukkan Header
                  - text: Header Resto QA 220598
              - generic [ref=f1e210]:
                - generic [ref=f1e211]: Alamat Usaha
                - textbox "Alamat Usaha" [ref=f1e213]:
                  - /placeholder: Masukkan Alamat Usaha
                  - text: Jl. QA Otomasi No. 220598
              - generic [ref=f1e214]:
                - generic [ref=f1e215]: Footer
                - textbox "Footer" [ref=f1e217]:
                  - /placeholder: Masukkan Footer
                  - text: Footer QA 220598
            - generic [ref=f1e221]:
              - paragraph [ref=f1e223]: Header Resto QA 220598
              - paragraph [ref=f1e224]: Jl. QA Otomasi No. 220598
              - paragraph [ref=f1e226]: Footer QA 220598
    - link "Konsultasi Sekarang" [ref=f1e227] [cursor=pointer]:
      - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - alert [ref=f1e236]:
    - generic [ref=f1e240]:
      - generic [ref=f1e241]: Error
      - generic [ref=f1e242]: Cabang tidak valid
    - button [ref=f1e243] [cursor=pointer]
  - generic:
    - tooltip "Simpan di"
```

# Test source

```ts
  165 |       const count = await comboboxOptions.count();
  166 |       expect(count).toBeGreaterThan(0);
  167 | 
  168 |       // Tutup combobox dengan Escape
  169 |       await page.keyboard.press('Escape').catch(() => {});
  170 |     
  171 |     });
  172 |   });
  173 | 
  174 |   test('[TC-04] Mengisi Header, Alamat Usaha, dan Footer serta memverifikasi Live Preview struk ter-update secara real-time', async ({ page }) => {
  175 |     await test.step('Langkah Pengujian UAT: Mengisi Header, Alamat Usaha, dan Footer serta memverifikasi Live Preview struk ter-update secara real-time', async () => {
  176 |       const headerInput = page.getByPlaceholder('Masukkan Header');
  177 |       const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
  178 |       const footerInput = page.getByPlaceholder('Masukkan Footer');
  179 | 
  180 |       const testHeader = 'Restoran Kasflo Lezat';
  181 |       const testAlamat = 'Jl. Kemang Raya No. 123, Jakarta Selatan';
  182 |       const testFooter = 'Terima Kasih Atas Kunjungan Anda! Datang Kembali';
  183 | 
  184 |       await headerInput.fill(testHeader);
  185 |       await alamatInput.fill(testAlamat);
  186 |       await footerInput.fill(testFooter);
  187 | 
  188 |       // Verifikasi teks langsung tampil pada kolom Live Preview struk di sebelah kanan
  189 |       const previewContainer = page.locator('.mantine-Grid-col').last();
  190 |       await expect(previewContainer).toContainText(testHeader, { timeout: 10000 });
  191 |       await expect(previewContainer).toContainText(testAlamat, { timeout: 10000 });
  192 |       await expect(previewContainer).toContainText(testFooter, { timeout: 10000 });
  193 | 
  194 |       // Gambar template struk dummy tetap tampil di preview
  195 |       await expect(page.locator('img[src*="struk.png"]')).toBeVisible({ timeout: 10000 });
  196 |     
  197 |     });
  198 |   });
  199 | 
  200 |   test('[TC-05] Mengunggah logo usaha dan memverifikasi logo tampil di live preview serta opsi hapus logo', async ({ page }) => {
  201 |     await test.step('Langkah Pengujian UAT: Mengunggah logo usaha dan memverifikasi logo tampil di live preview serta opsi hapus logo', async () => {
  202 |       // Bersihkan logo yang sudah ada sebelumnya jika ada
  203 |       const existingHapusBtn = page.getByRole('button', { name: 'Hapus' });
  204 |       if (await existingHapusBtn.isVisible().catch(() => false)) {
  205 |         await existingHapusBtn.click();
  206 |         await waitForPageReady(page);
  207 |       }
  208 | 
  209 |       const fileInput = page.locator('input[type="file"]');
  210 | 
  211 |       // 1x1 base64 transparent PNG
  212 |       const dummyImageBuffer = Buffer.from(
  213 |         'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  214 |         'base64'
  215 |       );
  216 | 
  217 |       await fileInput.setInputFiles({
  218 |         name: 'kasflo-logo-test.png',
  219 |         mimeType: 'image/png',
  220 |         buffer: dummyImageBuffer,
  221 |       });
  222 | 
  223 |       // Tombol Hapus harus muncul setelah gambar terunggah
  224 |       const hapusBtn = page.getByRole('button', { name: 'Hapus' });
  225 |       await expect(hapusBtn).toBeVisible({ timeout: 10000 });
  226 | 
  227 |       // Verifikasi preview struk menampilkan elemen gambar logo (blob URL)
  228 |       const previewContainer = page.locator('.mantine-Grid-col').last();
  229 |       const logoImgInPreview = previewContainer.locator('img[src^="blob:"]');
  230 |       await expect(logoImgInPreview).toBeVisible({ timeout: 10000 });
  231 | 
  232 |       // Klik tombol Hapus untuk menghapus logo yang baru diunggah
  233 |       await hapusBtn.click();
  234 | 
  235 |       // Setelah dihapus, area upload dropzone kembali muncul dan tombol Hapus hilang
  236 |       await expect(hapusBtn).not.toBeVisible({ timeout: 10000 });
  237 |     
  238 |     });
  239 |   });
  240 | 
  241 |   test('[TC-06] Berhasil menyimpan pengaturan struk untuk cabang aktif via tombol Simpan', async ({ page }) => {
  242 |     await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan struk untuk cabang aktif via tombol Simpan', async () => {
  243 |       const headerInput = page.getByPlaceholder('Masukkan Header');
  244 |       const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
  245 |       const footerInput = page.getByPlaceholder('Masukkan Footer');
  246 | 
  247 |       const uniqueSuffix = Date.now().toString().slice(-6);
  248 |       await headerInput.fill(`Header Resto QA ${uniqueSuffix}`);
  249 |       await alamatInput.fill(`Jl. QA Otomasi No. ${uniqueSuffix}`);
  250 |       await footerInput.fill(`Footer QA ${uniqueSuffix}`);
  251 | 
  252 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  253 |       await expect(simpanBtn).toBeVisible();
  254 |       await expect(simpanBtn).toBeEnabled();
  255 | 
  256 |       // Tunggu request PUT save dan response
  257 |       const [putResponse] = await Promise.all([
  258 |         page.waitForResponse(
  259 |           res => res.url().includes('print-receipt-setting') && res.request().method() === 'PUT',
  260 |           { timeout: 15000 }
  261 |         ),
  262 |         simpanBtn.click(),
  263 |       ]);
  264 | 
> 265 |       expect(putResponse.status()).toBe(200);
      |                                    ^ Error: expect(received).toBe(expected) // Object.is equality
  266 | 
  267 |       // Pastikan loading spinner selesai dan tidak ada infinite spinner
  268 |       await expect(page.locator('.mantine-Loader-root').first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
  269 |     });
  270 |   });
  271 | 
  272 |   test('[TC-07] Berhasil menyimpan pengaturan struk untuk semua cabang via tombol Simpan Semua Cabang', async ({ page }) => {
  273 |     await test.step('Langkah Pengujian UAT: Berhasil menyimpan pengaturan struk untuk semua cabang via tombol Simpan Semua Cabang', async () => {
  274 |       const headerInput = page.getByPlaceholder('Masukkan Header');
  275 |       const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
  276 |       const footerInput = page.getByPlaceholder('Masukkan Footer');
  277 | 
  278 |       const uniqueSuffix = Date.now().toString().slice(-6);
  279 |       await headerInput.fill(`Resto Semua Cabang ${uniqueSuffix}`);
  280 |       await alamatInput.fill(`Jl. Pusat Nasional No. ${uniqueSuffix}`);
  281 |       await footerInput.fill(`Terima Kasih Seluruh Cabang ${uniqueSuffix}`);
  282 | 
  283 |       const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
  284 |       await expect(simpanSemuaBtn).toBeVisible();
  285 |       await expect(simpanSemuaBtn).toBeEnabled();
  286 | 
  287 |       // Tangkap request PUT untuk verifikasi flag apply to all branches
  288 |       let requestPayload = null;
  289 |       page.on('request', req => {
  290 |         if (req.url().includes('print-receipt-setting') && req.method() === 'PUT') {
  291 |           requestPayload = req.postData();
  292 |         }
  293 |       });
  294 | 
  295 |       const [putResponse] = await Promise.all([
  296 |         page.waitForResponse(
  297 |           res => res.url().includes('print-receipt-setting') && res.request().method() === 'PUT',
  298 |           { timeout: 15000 }
  299 |         ),
  300 |         simpanSemuaBtn.click(),
  301 |       ]);
  302 | 
  303 |       expect(putResponse.status()).toBe(200);
  304 |       if (requestPayload) {
  305 |         expect(requestPayload).toContain('is_apply_to_all_branches');
  306 |       }
  307 | 
  308 |       // Pastikan loading spinner selesai
  309 |       await expect(page.locator('.mantine-Loader-root').first()).not.toBeVisible({ timeout: 10000 }).catch(() => {});
  310 |     
  311 |     });
  312 |   });
  313 | });
  314 | 
```