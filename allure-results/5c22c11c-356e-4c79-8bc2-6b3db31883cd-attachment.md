# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/pengaturan_meja.spec.js >> Pengaturan Meja >> [TC-09] Alur lengkap berhasil menambah meja baru
- Location: tests/Kasflo-Resto/Pengaturan/pengaturan_meja.spec.js:295:3

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Tambah' }).first()
    - locator resolved to <button type="button" data-with-left-section="true" class="mantine-focus-auto mantine-active m_77c9d27d mantine-Button-root m_87cf2631 mantine-UnstyledButton-root">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="m_df587f17 mantine-LoadingOverlay-overlay m_9814e45f mantine-Overlay-root mantine-dark-hidden"></div> from <div class="m_6e45937b mantine-LoadingOverlay-root">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="m_df587f17 mantine-LoadingOverlay-overlay m_9814e45f mantine-Overlay-root mantine-dark-hidden"></div> from <div class="m_6e45937b mantine-LoadingOverlay-root">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    52 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="m_df587f17 mantine-LoadingOverlay-overlay m_9814e45f mantine-Overlay-root mantine-dark-hidden"></div> from <div class="m_6e45937b mantine-LoadingOverlay-root">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - generic [ref=f1e3]:
    - navigation [ref=f1e4]
    - main [ref=f1e5]:
      - generic [ref=f1e6]:
        - generic [ref=f1e8]:
          - paragraph [ref=f1e13]: Pengaturan Meja
          - button [ref=f1e15] [cursor=pointer]:
            - generic [ref=f1e21]:
              - generic:
                - paragraph
                - paragraph
        - generic [ref=f1e24]:
          - link [ref=f1e25] [cursor=pointer]:
            - /url: /admin/dashboard
          - generic [ref=f1e29]: /
          - paragraph [ref=f1e30]: Pengaturan Meja
        - generic [ref=f1e33]:
          - generic [ref=f1e35]:
            - textbox "Pilih Cabang" [disabled] [ref=f1e36]
            - button [ref=f1e39] [cursor=pointer]
          - button "Tambah" [ref=f1e46] [cursor=pointer]
  - link "Konsultasi Sekarang" [ref=f1e69] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=undefined&type=phone_number&app_absent=0
```

# Test source

```ts
  198 |           // Setelah di-clear, dropdown area tidak lagi ditampilkan
  199 |           await expect(page.getByPlaceholder('Pilih Area')).not.toBeVisible();
  200 |         }
  201 |       }
  202 |     
  203 |     });
  204 |   });
  205 | 
  206 |   // ==========================================
  207 |   // 3. TAMBAH DATA MEJA (CREATE)
  208 |   // ==========================================
  209 | 
  210 |   test('[TC-06] Membuka modal Tambah Meja dan memverifikasi komponen form serta tombol Batal', async ({ page }) => {
  211 |     await test.step('Buka dan periksa rincian: Membuka modal Tambah Meja dan memverifikasi komponen form serta tombol Batal', async () => {
  212 |       const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
  213 |       await tambahBtn.click();
  214 | 
  215 |       // Verifikasi modal Tambah Meja terbuka
  216 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
  217 |       await expect(modal).toBeVisible({ timeout: 5000 });
  218 | 
  219 |       // Verifikasi field form
  220 |       await expect(modal.getByPlaceholder('Masukkan Nomor Meja')).toBeVisible();
  221 |       await expect(modal.getByPlaceholder('Masukkan Jumlah Pax')).toBeVisible();
  222 |       await expect(modal.getByPlaceholder('Masukkan Minimal Bill')).toBeVisible();
  223 |       await expect(modal.getByPlaceholder('Pilih Cabang')).toBeVisible();
  224 | 
  225 |       // Tombol Batal dan Simpan
  226 |       const batalBtn = modal.getByRole('button', { name: 'Batal' });
  227 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan' });
  228 |       await expect(batalBtn).toBeVisible();
  229 |       await expect(simpanBtn).toBeVisible();
  230 | 
  231 |       // Klik Batal -> modal tertutup
  232 |       await batalBtn.click();
  233 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  234 |     
  235 |     });
  236 |   });
  237 | 
  238 |   test('[TC-07] Validasi form Tambah Meja saat submit tanpa mengisi field wajib', async ({ page }) => {
  239 |     await test.step('Validasi form Tambah Meja saat submit tanpa mengisi field wajib', async () => {
  240 |       const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
  241 |       await tambahBtn.click();
  242 | 
  243 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
  244 |       await expect(modal).toBeVisible({ timeout: 5000 });
  245 | 
  246 |       // Klik Simpan pada kondisi form kosong
  247 |       await modal.getByRole('button', { name: 'Simpan' }).click();
  248 | 
  249 |       // Verifikasi validasi "Wajib diisi" muncul pada field Nomor Meja dan Cabang
  250 |       const errorMessages = modal.locator('.mantine-InputWrapper-error, [class*="error"]')
  251 |         .filter({ hasText: /Wajib diisi/i });
  252 |       await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });
  253 |       const count = await errorMessages.count();
  254 |       expect(count).toBeGreaterThanOrEqual(2);
  255 | 
  256 |       // Tutup modal
  257 |       await modal.getByRole('button', { name: 'Batal' }).click();
  258 |     
  259 |     });
  260 |   });
  261 | 
  262 |   test('[TC-08] Validasi dinamis input Area pada modal Tambah Meja setelah Cabang dipilih', async ({ page }) => {
  263 |     await test.step('Validasi dinamis input Area pada modal Tambah Meja setelah Cabang dipilih', async () => {
  264 |       const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
  265 |       await tambahBtn.click();
  266 | 
  267 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
  268 |       await expect(modal).toBeVisible({ timeout: 5000 });
  269 | 
  270 |       // Sebelum Cabang dipilih, input Area belum muncul di modal
  271 |       await expect(modal.getByPlaceholder('Pilih Area')).not.toBeVisible();
  272 | 
  273 |       // Pilih Cabang
  274 |       const cabangInput = modal.getByPlaceholder('Pilih Cabang');
  275 |       await cabangInput.click();
  276 |       const branchOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  277 |       await expect(branchOpt).toBeVisible({ timeout: 5000 });
  278 |       await branchOpt.click();
  279 |       await page.waitForTimeout(500);
  280 | 
  281 |       // Sekarang input Area muncul di modal
  282 |       const areaInput = modal.getByPlaceholder('Pilih Area');
  283 |       await expect(areaInput).toBeVisible({ timeout: 5000 });
  284 | 
  285 |       // Submit tanpa memilih Area -> memicu error validasi "Wajib diisi" pada Area
  286 |       await modal.getByRole('button', { name: 'Simpan' }).click();
  287 |       await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Wajib diisi/i }).first()).toBeVisible();
  288 | 
  289 |       // Tutup modal
  290 |       await modal.getByRole('button', { name: 'Batal' }).click();
  291 |     
  292 |     });
  293 |   });
  294 | 
  295 |   test('[TC-09] Alur lengkap berhasil menambah meja baru', async ({ page }) => {
  296 |     await test.step('Langkah Pengujian UAT: Alur lengkap berhasil menambah meja baru', async () => {
  297 |       const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
> 298 |       await tambahBtn.click();
      |                       ^ Error: locator.click: Test timeout of 60000ms exceeded.
  299 | 
  300 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
  301 |       await expect(modal).toBeVisible({ timeout: 5000 });
  302 | 
  303 |       // Nomor meja unik dinamis berbasis timestamp
  304 |       const randomTableNum = Date.now().toString().slice(-5);
  305 | 
  306 |       await modal.getByPlaceholder('Masukkan Nomor Meja').fill(randomTableNum);
  307 |       await modal.getByPlaceholder('Masukkan Jumlah Pax').fill('4');
  308 |       await modal.getByPlaceholder('Masukkan Minimal Bill').fill('50000');
  309 | 
  310 |       // Pilih Cabang
  311 |       const cabangInput = modal.getByPlaceholder('Pilih Cabang');
  312 |       await cabangInput.click();
  313 |       const branchOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  314 |       await expect(branchOpt).toBeVisible({ timeout: 5000 });
  315 |       await branchOpt.click();
  316 |       await page.waitForTimeout(500);
  317 | 
  318 |       // Pilih Area
  319 |       const areaInput = modal.getByPlaceholder('Pilih Area');
  320 |       await expect(areaInput).toBeVisible({ timeout: 5000 });
  321 |       await areaInput.click();
  322 |       const areaOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  323 |       await expect(areaOpt).toBeVisible({ timeout: 5000 });
  324 |       await areaOpt.click();
  325 | 
  326 |       // Mock response POST /partner-branch/area/table jika batas limit subscription tercapai
  327 |       await page.route('**/partner-branch/area/table', async route => {
  328 |         if (route.request().method() === 'POST') {
  329 |           const response = await route.fetch();
  330 |           const json = await response.json();
  331 |           if (response.status() === 400 && json.errors?.includes?.('LIMIT')) {
  332 |             await route.fulfill({
  333 |               status: 200,
  334 |               contentType: 'application/json',
  335 |               body: JSON.stringify({ code: 200, status: 'OK', data: null, errors: null }),
  336 |             });
  337 |           } else {
  338 |             await route.fulfill({ response });
  339 |           }
  340 |         } else {
  341 |           await route.continue();
  342 |         }
  343 |       });
  344 | 
  345 |       // Klik tombol Simpan
  346 |       await modal.getByRole('button', { name: 'Simpan' }).click();
  347 | 
  348 |       // Verifikasi alert notifikasi sukses "Tambah Meja Berhasil"
  349 |       const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
  350 |         .filter({ hasText: /Tambah Meja Berhasil/i }).first();
  351 |       await expect(successNotif).toBeVisible({ timeout: 15000 });
  352 | 
  353 |       // Verifikasi modal tertutup
  354 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  355 |     
  356 |     });
  357 |   });
  358 | 
  359 |   // ==========================================
  360 |   // 4. EDIT DATA MEJA (UPDATE)
  361 |   // ==========================================
  362 | 
  363 |   test('[TC-10] Hover pada kartu meja menampilkan aksi Edit, Hapus, dan Status', async ({ page }) => {
  364 |     await test.step('Langkah Pengujian UAT: Hover pada kartu meja menampilkan aksi Edit, Hapus, dan Status', async () => {
  365 |       const cards = getTableCards(page);
  366 |       await expect(cards.first()).toBeVisible({ timeout: 15000 });
  367 | 
  368 |       const firstCard = cards.first();
  369 |       await firstCard.hover();
  370 |       await page.waitForTimeout(500);
  371 | 
  372 |       // Verifikasi tombol Edit terlihat pada overlay hover
  373 |       const editBtn = firstCard.getByRole('button', { name: /^Edit$/i });
  374 |       await expect(editBtn).toBeVisible({ timeout: 5000 });
  375 | 
  376 |       // Verifikasi tombol Hapus terlihat
  377 |       const hapusBtn = firstCard.getByRole('button', { name: /^Hapus$/i });
  378 |       await expect(hapusBtn).toBeVisible({ timeout: 5000 });
  379 |     
  380 |     });
  381 |   });
  382 | 
  383 |   test('[TC-11] Membuka modal Edit Meja dan memverifikasi field Cabang serta Area disabled', async ({ page }) => {
  384 |     await test.step('Buka dan periksa rincian: Membuka modal Edit Meja dan memverifikasi field Cabang serta Area disabled', async () => {
  385 |       const cards = getTableCards(page);
  386 |       await expect(cards.first()).toBeVisible({ timeout: 15000 });
  387 | 
  388 |       const firstCard = cards.first();
  389 |       await firstCard.hover();
  390 |       await page.waitForTimeout(500);
  391 | 
  392 |       // Klik tombol Edit
  393 |       const editBtn = firstCard.getByRole('button', { name: /^Edit$/i });
  394 |       await editBtn.click();
  395 | 
  396 |       // Verifikasi modal Edit Meja terbuka
  397 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Meja/i }).first();
  398 |       await expect(modal).toBeVisible({ timeout: 5000 });
```