# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/struk.spec.js >> Pengaturan Struk >> [TC-04] Mengisi Header, Alamat Usaha, dan Footer serta memverifikasi Live Preview struk ter-update secara real-time
- Location: tests/Kasflo-Resto/Pengaturan/struk.spec.js:174:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.mantine-Grid-col').last()
Expected substring: "Restoran Kasflo Lezat"
Received string:    "Resto Semua Cabang 261132Jl. Pusat Nasional No. 261132Terima Kasih Atas Kunjungan Anda! Datang Kembali"
Timeout: 10000ms

Call log:
  - Expect "toContainText" locator('.mantine-Grid-col').last() with timeout 10000ms
  - waiting for locator('.mantine-Grid-col').last()
    24 × locator resolved to <div class="m_96bdd299 mantine-Grid-col __m__-rjs">…</div>
       - unexpected value "Resto Semua Cabang 261132Jl. Pusat Nasional No. 261132Terima Kasih Atas Kunjungan Anda! Datang Kembali"

```

```yaml
- paragraph: Resto Semua Cabang 261132
- paragraph: Jl. Pusat Nasional No. 261132
- img
- paragraph: Terima Kasih Atas Kunjungan Anda! Datang Kembali
```

# Test source

```ts
  90  |       try {
  91  |         await page.goto('/admin/setting/receipt', { waitUntil: 'domcontentloaded', timeout: 25000 });
  92  |       } catch {
  93  |         await page.goto('/admin/setting/receipt', { waitUntil: 'commit', timeout: 25000 });
  94  |       }
  95  |       await expect(page).toHaveURL(/\/admin\/setting\/receipt/, { timeout: 20000 });
  96  | 
  97  |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  98  |       await expect(outletInput).toBeVisible({ timeout: 15000 });
  99  |       await expect(page.getByPlaceholder('Masukkan Header')).toBeVisible({ timeout: 10000 });
  100 |       await waitForPageReady(page);
  101 |     
  102 |     });
  103 |   });
  104 | 
  105 |   test('[TC-01] Menampilkan halaman Pengaturan Struk dengan header, breadcrumb, dan tombol aksi', async ({ page }) => {
  106 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Pengaturan Struk dengan header, breadcrumb, dan tombol aksi', async () => {
  107 |       // Verifikasi breadcrumb
  108 |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]');
  109 |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  110 |       await expect(breadcrumb).toContainText('Pengaturan Struk');
  111 | 
  112 |       // Verifikasi dropdown outlet / cabang
  113 |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  114 |       await expect(outletInput).toBeVisible({ timeout: 10000 });
  115 | 
  116 |       // Verifikasi tombol Simpan & Simpan Semua Cabang
  117 |       const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
  118 |       const simpanSemuaBtn = page.getByRole('button', { name: 'Simpan Semua Cabang', exact: true });
  119 |       await expect(simpanBtn).toBeVisible({ timeout: 10000 });
  120 |       await expect(simpanSemuaBtn).toBeVisible({ timeout: 10000 });
  121 | 
  122 |       // Verifikasi form pengaturan dan preview struk tampil
  123 |       await expect(page.locator('text=Logo Usaha')).toBeVisible({ timeout: 10000 });
  124 |       await expect(page.locator('img[src*="struk.png"]')).toBeVisible({ timeout: 10000 });
  125 |     
  126 |     });
  127 |   });
  128 | 
  129 |   test('[TC-02] Memverifikasi seluruh komponen form input pada pengaturan struk', async ({ page }) => {
  130 |     await test.step('Langkah Pengujian UAT: Memverifikasi seluruh komponen form input pada pengaturan struk', async () => {
  131 |       // Dropzone upload logo usaha atau tombol hapus jika logo sudah ada
  132 |       await expect(page.locator('text=Logo Usaha')).toBeVisible({ timeout: 10000 });
  133 |       const dropzoneText = page.getByText(/Gunakan file \.jpg\/\.png & maks\. 5 MB/i);
  134 |       const hapusBtn = page.getByRole('button', { name: 'Hapus' });
  135 |       await expect(dropzoneText.or(hapusBtn)).toBeVisible({ timeout: 10000 });
  136 | 
  137 |       const fileInput = page.locator('input[type="file"]');
  138 |       await expect(fileInput).toBeAttached();
  139 | 
  140 |       // Text fields
  141 |       const headerInput = page.getByPlaceholder('Masukkan Header');
  142 |       const alamatInput = page.getByPlaceholder('Masukkan Alamat Usaha');
  143 |       const footerInput = page.getByPlaceholder('Masukkan Footer');
  144 | 
  145 |       await expect(headerInput).toBeVisible({ timeout: 10000 });
  146 |       await expect(alamatInput).toBeVisible({ timeout: 10000 });
  147 |       await expect(footerInput).toBeVisible({ timeout: 10000 });
  148 |     
  149 |     });
  150 |   });
  151 | 
  152 |   test('[TC-03] Interaksi dropdown pemilihan outlet / cabang', async ({ page }) => {
  153 |     await test.step('Langkah Pengujian UAT: Interaksi dropdown pemilihan outlet / cabang', async () => {
  154 |       const outletInput = page.getByPlaceholder('Pilih Outlet');
  155 |       await expect(outletInput).toBeVisible({ timeout: 10000 });
  156 |       const currentOutlet = await outletInput.inputValue();
  157 |       expect(currentOutlet.length).toBeGreaterThan(0);
  158 | 
  159 |       // Buka dropdown outlet
  160 |       await outletInput.click();
  161 | 
  162 |       // Verifikasi opsi combobox muncul
  163 |       const comboboxOptions = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
  164 |       await expect(comboboxOptions.first()).toBeVisible({ timeout: 10000 });
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
> 190 |       await expect(previewContainer).toContainText(testHeader, { timeout: 10000 });
      |                                      ^ Error: expect(locator).toContainText(expected) failed
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
  265 |       expect(putResponse.status()).toBe(200);
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
```