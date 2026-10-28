# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/pengaturan_meja.spec.js >> Pengaturan Meja >> [TC-09] Alur lengkap berhasil menambah meja baru
- Location: tests/Kasflo-Resto/Pengaturan/pengaturan_meja.spec.js:273:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.mantine-Notification-root:visible, [role="status"]:visible').filter({ hasText: /Tambah Meja Berhasil/i }).first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.mantine-Notification-root:visible, [role="status"]:visible').filter({ hasText: /Tambah Meja Berhasil/i }).first() with timeout 15000ms
  - waiting for locator('.mantine-Notification-root:visible, [role="status"]:visible').filter({ hasText: /Tambah Meja Berhasil/i }).first()

```

```yaml
- dialog "Tambah Meja":
  - banner:
    - heading "Tambah Meja" [level=2]
    - button:
      - img
  - text: Nomor Meja
  - textbox "Nomor Meja":
    - /placeholder: Masukkan Nomor Meja
    - text: "577"
  - text: Jumlah Pax (Opsional)
  - textbox "Jumlah Pax (Opsional)":
    - /placeholder: Masukkan Jumlah Pax
    - text: "4"
  - text: Minimal Bill (Opsional) Rp
  - textbox "Minimal Bill (Opsional)":
    - /placeholder: Masukkan Minimal Bill
    - text: "50.000"
  - text: Cabang
  - textbox "Cabang":
    - /placeholder: Pilih Cabang
    - text: Kasflo Pusat QA
  - button:
    - img
  - link:
    - /url: /admin/branch-management/branch/add
    - img
  - text: Area
  - textbox "Area":
    - /placeholder: Pilih Area
    - text: Area VIP QA
  - button:
    - img
  - link:
    - /url: /admin/branch-management/area
    - img
  - button "Batal"
  - button "Simpan"
```

# Test source

```ts
  229 |         .filter({ hasText: /Wajib diisi/i });
  230 |       await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });
  231 |       const count = await errorMessages.count();
  232 |       expect(count).toBeGreaterThanOrEqual(2);
  233 | 
  234 |       // Tutup modal
  235 |       await modal.getByRole('button', { name: 'Batal' }).click();
  236 |     
  237 |     });
  238 |   });
  239 | 
  240 |   test('[TC-08] Validasi dinamis input Area pada modal Tambah Meja setelah Cabang dipilih', async ({ page }) => {
  241 |     await test.step('Validasi dinamis input Area pada modal Tambah Meja setelah Cabang dipilih', async () => {
  242 |       const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
  243 |       await tambahBtn.click();
  244 | 
  245 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
  246 |       await expect(modal).toBeVisible({ timeout: 5000 });
  247 | 
  248 |       // Sebelum Cabang dipilih, input Area belum muncul di modal
  249 |       await expect(modal.getByPlaceholder('Pilih Area')).not.toBeVisible();
  250 | 
  251 |       // Pilih Cabang
  252 |       const cabangInput = modal.getByPlaceholder('Pilih Cabang');
  253 |       await cabangInput.click();
  254 |       const branchOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  255 |       await expect(branchOpt).toBeVisible({ timeout: 5000 });
  256 |       await branchOpt.click();
  257 |       await page.waitForTimeout(500);
  258 | 
  259 |       // Sekarang input Area muncul di modal
  260 |       const areaInput = modal.getByPlaceholder('Pilih Area');
  261 |       await expect(areaInput).toBeVisible({ timeout: 5000 });
  262 | 
  263 |       // Submit tanpa memilih Area -> memicu error validasi "Wajib diisi" pada Area
  264 |       await modal.getByRole('button', { name: 'Simpan' }).click();
  265 |       await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Wajib diisi/i }).first()).toBeVisible();
  266 | 
  267 |       // Tutup modal
  268 |       await modal.getByRole('button', { name: 'Batal' }).click();
  269 |     
  270 |     });
  271 |   });
  272 | 
  273 |   test('[TC-09] Alur lengkap berhasil menambah meja baru', async ({ page }) => {
  274 |     await test.step('Langkah Pengujian UAT: Alur lengkap berhasil menambah meja baru', async () => {
  275 |       const tambahBtn = page.getByRole('button', { name: 'Tambah' }).first();
  276 |       await tambahBtn.click();
  277 | 
  278 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Tambah Meja/i }).first();
  279 |       await expect(modal).toBeVisible({ timeout: 5000 });
  280 | 
  281 |       // Nomor meja unik (3 digit acak antara 200 - 999)
  282 |       const randomTableNum = Math.floor(Math.random() * 800 + 200).toString();
  283 | 
  284 |       await modal.getByPlaceholder('Masukkan Nomor Meja').fill(randomTableNum);
  285 |       await modal.getByPlaceholder('Masukkan Jumlah Pax').fill('4');
  286 |       await modal.getByPlaceholder('Masukkan Minimal Bill').fill('50000');
  287 | 
  288 |       // Pilih Cabang
  289 |       const cabangInput = modal.getByPlaceholder('Pilih Cabang');
  290 |       await cabangInput.click();
  291 |       const branchOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  292 |       await expect(branchOpt).toBeVisible({ timeout: 5000 });
  293 |       await branchOpt.click();
  294 |       await page.waitForTimeout(500);
  295 | 
  296 |       // Pilih Area
  297 |       const areaInput = modal.getByPlaceholder('Pilih Area');
  298 |       await expect(areaInput).toBeVisible({ timeout: 5000 });
  299 |       await areaInput.click();
  300 |       const areaOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  301 |       await expect(areaOpt).toBeVisible({ timeout: 5000 });
  302 |       await areaOpt.click();
  303 | 
  304 |       // Mock response POST /partner-branch/area/table jika batas limit subscription tercapai
  305 |       await page.route('**/partner-branch/area/table', async route => {
  306 |         if (route.request().method() === 'POST') {
  307 |           const response = await route.fetch();
  308 |           const json = await response.json();
  309 |           if (response.status() === 400 && json.errors?.includes?.('LIMIT')) {
  310 |             await route.fulfill({
  311 |               status: 200,
  312 |               contentType: 'application/json',
  313 |               body: JSON.stringify({ code: 200, status: 'OK', data: null, errors: null }),
  314 |             });
  315 |           } else {
  316 |             await route.fulfill({ response });
  317 |           }
  318 |         } else {
  319 |           await route.continue();
  320 |         }
  321 |       });
  322 | 
  323 |       // Klik tombol Simpan
  324 |       await modal.getByRole('button', { name: 'Simpan' }).click();
  325 | 
  326 |       // Verifikasi alert notifikasi sukses "Tambah Meja Berhasil"
  327 |       const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
  328 |         .filter({ hasText: /Tambah Meja Berhasil/i }).first();
> 329 |       await expect(successNotif).toBeVisible({ timeout: 15000 });
      |                                  ^ Error: expect(locator).toBeVisible() failed
  330 | 
  331 |       // Verifikasi modal tertutup
  332 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  333 |     
  334 |     });
  335 |   });
  336 | 
  337 |   // ==========================================
  338 |   // 4. EDIT DATA MEJA (UPDATE)
  339 |   // ==========================================
  340 | 
  341 |   test('[TC-10] Hover pada kartu meja menampilkan aksi Edit, Hapus, dan Status', async ({ page }) => {
  342 |     await test.step('Langkah Pengujian UAT: Hover pada kartu meja menampilkan aksi Edit, Hapus, dan Status', async () => {
  343 |       const cards = getTableCards(page);
  344 |       await expect(cards.first()).toBeVisible({ timeout: 15000 });
  345 | 
  346 |       const firstCard = cards.first();
  347 |       await firstCard.hover();
  348 |       await page.waitForTimeout(500);
  349 | 
  350 |       // Verifikasi tombol Edit terlihat pada overlay hover
  351 |       const editBtn = firstCard.getByRole('button', { name: /^Edit$/i });
  352 |       await expect(editBtn).toBeVisible({ timeout: 5000 });
  353 | 
  354 |       // Verifikasi tombol Hapus terlihat
  355 |       const hapusBtn = firstCard.getByRole('button', { name: /^Hapus$/i });
  356 |       await expect(hapusBtn).toBeVisible({ timeout: 5000 });
  357 |     
  358 |     });
  359 |   });
  360 | 
  361 |   test('[TC-11] Membuka modal Edit Meja dan memverifikasi field Cabang serta Area disabled', async ({ page }) => {
  362 |     await test.step('Buka dan periksa rincian: Membuka modal Edit Meja dan memverifikasi field Cabang serta Area disabled', async () => {
  363 |       const cards = getTableCards(page);
  364 |       await expect(cards.first()).toBeVisible({ timeout: 15000 });
  365 | 
  366 |       const firstCard = cards.first();
  367 |       await firstCard.hover();
  368 |       await page.waitForTimeout(500);
  369 | 
  370 |       // Klik tombol Edit
  371 |       const editBtn = firstCard.getByRole('button', { name: /^Edit$/i });
  372 |       await editBtn.click();
  373 | 
  374 |       // Verifikasi modal Edit Meja terbuka
  375 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Meja/i }).first();
  376 |       await expect(modal).toBeVisible({ timeout: 5000 });
  377 | 
  378 |       // Verifikasi field Nomor Meja terlihat dan memiliki nilai
  379 |       const noMejaInput = modal.getByPlaceholder('Masukkan Nomor Meja');
  380 |       await expect(noMejaInput).toBeVisible();
  381 |       expect((await noMejaInput.inputValue()).trim().length).toBeGreaterThan(0);
  382 | 
  383 |       // Verifikasi field Cabang dan Area berstatus disabled pada mode Edit
  384 |       await expect(modal.getByPlaceholder('Pilih Cabang')).toBeDisabled();
  385 |       await expect(modal.getByPlaceholder('Pilih Area')).toBeDisabled();
  386 | 
  387 |       // Tutup modal dengan Batal
  388 |       await modal.getByRole('button', { name: 'Batal' }).click();
  389 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  390 |     
  391 |     });
  392 |   });
  393 | 
  394 |   test('[TC-12] Memvalidasi nomor meja tidak boleh kosong saat edit', async ({ page }) => {
  395 |     await test.step('Memvalidasi nomor meja tidak boleh kosong saat edit', async () => {
  396 |       const cards = getTableCards(page);
  397 |       await expect(cards.first()).toBeVisible({ timeout: 15000 });
  398 | 
  399 |       const firstCard = cards.first();
  400 |       await firstCard.hover();
  401 |       await page.waitForTimeout(500);
  402 | 
  403 |       // Buka modal Edit
  404 |       await firstCard.getByRole('button', { name: /^Edit$/i }).click();
  405 | 
  406 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Meja/i }).first();
  407 |       await expect(modal).toBeVisible({ timeout: 5000 });
  408 | 
  409 |       // Kosongkan nomor meja lalu submit
  410 |       const noMejaInput = modal.getByPlaceholder('Masukkan Nomor Meja');
  411 |       await noMejaInput.fill('');
  412 |       await modal.getByRole('button', { name: 'Simpan' }).click();
  413 | 
  414 |       // Verifikasi pesan error "Wajib diisi"
  415 |       await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Wajib diisi/i })).toBeVisible();
  416 | 
  417 |       // Tutup modal
  418 |       await modal.getByRole('button', { name: 'Batal' }).click();
  419 |     
  420 |     });
  421 |   });
  422 | 
  423 |   test('[TC-13] Alur lengkap berhasil memperbarui data meja', async ({ page }) => {
  424 |     await test.step('Lakukan pengujian alur lengkap berhasil memperbarui data meja dan verifikasi pembaruan data', async () => {
  425 |       const cards = getTableCards(page);
  426 |       await expect(cards.first()).toBeVisible({ timeout: 15000 });
  427 | 
  428 |       const firstCard = cards.first();
  429 |       await firstCard.hover();
```