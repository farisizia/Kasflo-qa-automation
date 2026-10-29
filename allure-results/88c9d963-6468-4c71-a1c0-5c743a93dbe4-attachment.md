# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/pengaturan_meja.spec.js >> Pengaturan Meja >> [TC-09] Alur lengkap berhasil menambah meja baru
- Location: tests/Kasflo-Resto/Pengaturan/pengaturan_meja.spec.js:295:3

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
  - textbox "Nomor Meja" [invalid]:
    - /placeholder: Masukkan Nomor Meja
  - paragraph: Wajib diisi
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
  298 |       await tambahBtn.click();
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
> 351 |       await expect(successNotif).toBeVisible({ timeout: 15000 });
      |                                  ^ Error: expect(locator).toBeVisible() failed
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
  399 | 
  400 |       // Verifikasi field Nomor Meja terlihat dan memiliki nilai
  401 |       const noMejaInput = modal.getByPlaceholder('Masukkan Nomor Meja');
  402 |       await expect(noMejaInput).toBeVisible();
  403 |       expect((await noMejaInput.inputValue()).trim().length).toBeGreaterThan(0);
  404 | 
  405 |       // Verifikasi field Cabang dan Area berstatus disabled pada mode Edit
  406 |       await expect(modal.getByPlaceholder('Pilih Cabang')).toBeDisabled();
  407 |       await expect(modal.getByPlaceholder('Pilih Area')).toBeDisabled();
  408 | 
  409 |       // Tutup modal dengan Batal
  410 |       await modal.getByRole('button', { name: 'Batal' }).click();
  411 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  412 |     
  413 |     });
  414 |   });
  415 | 
  416 |   test('[TC-12] Memvalidasi nomor meja tidak boleh kosong saat edit', async ({ page }) => {
  417 |     await test.step('Memvalidasi nomor meja tidak boleh kosong saat edit', async () => {
  418 |       const cards = getTableCards(page);
  419 |       await expect(cards.first()).toBeVisible({ timeout: 15000 });
  420 | 
  421 |       const firstCard = cards.first();
  422 |       await firstCard.hover();
  423 |       await page.waitForTimeout(500);
  424 | 
  425 |       // Buka modal Edit
  426 |       await firstCard.getByRole('button', { name: /^Edit$/i }).click();
  427 | 
  428 |       const modal = page.locator('[role="dialog"]').filter({ hasText: /Edit Meja/i }).first();
  429 |       await expect(modal).toBeVisible({ timeout: 5000 });
  430 | 
  431 |       // Kosongkan nomor meja lalu submit
  432 |       const noMejaInput = modal.getByPlaceholder('Masukkan Nomor Meja');
  433 |       await noMejaInput.fill('');
  434 |       await modal.getByRole('button', { name: 'Simpan' }).click();
  435 | 
  436 |       // Verifikasi pesan error "Wajib diisi"
  437 |       await expect(modal.locator('.mantine-InputWrapper-error').filter({ hasText: /Wajib diisi/i })).toBeVisible();
  438 | 
  439 |       // Tutup modal
  440 |       await modal.getByRole('button', { name: 'Batal' }).click();
  441 |     
  442 |     });
  443 |   });
  444 | 
  445 |   test('[TC-13] Alur lengkap berhasil memperbarui data meja', async ({ page }) => {
  446 |     await test.step('Lakukan pengujian alur lengkap berhasil memperbarui data meja dan verifikasi pembaruan data', async () => {
  447 |       const cards = getTableCards(page);
  448 |       await expect(cards.first()).toBeVisible({ timeout: 15000 });
  449 | 
  450 |       const firstCard = cards.first();
  451 |       await firstCard.hover();
```