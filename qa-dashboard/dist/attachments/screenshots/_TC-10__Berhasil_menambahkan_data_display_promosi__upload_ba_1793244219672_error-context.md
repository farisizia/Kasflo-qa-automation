# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Promosi/display_promosi.spec.js >> Display Promosi >> [TC-10] Berhasil menambahkan data display promosi (upload banner gambar) baru
- Location: tests/Kasflo-Resto/Promosi/display_promosi.spec.js:311:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('.mantine-SimpleGrid-root img, img[src*="topindoku"]').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" locator('.mantine-SimpleGrid-root img, img[src*="topindoku"]').first() with timeout 10000ms
  - waiting for locator('.mantine-SimpleGrid-root img, img[src*="topindoku"]').first()
    23 × locator resolved to <img class="m_9e117634 mantine-Image-root" src="https://mobileapps-dev.topindoku.co.id/api/images/view/16fcaaee-53d9-4b9f-baaa-175cef1faf9a.png"/>
       - unexpected value "hidden"

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
  - link "Harga Spesial":
    - /url: /admin/promotion/special-price
  - link "Kampanye Promosi":
    - /url: /admin/promotion/campaign
  - link "Display Promosi":
    - /url: /admin/promotion/display
  - link "Poin":
    - /url: /admin/promotion/point
  - link "Reward":
    - /url: /admin/promotion/reward
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
- main:
  - img
  - paragraph: Display Promosi
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
  - paragraph: Display Promosi
  - textbox "Pilih Cabang": Kasflo Pusat QA
  - button:
    - img
  - text: Tipe File
  - textbox "Tipe File":
    - /placeholder: Pilih Tipe File
    - text: Gambar
  - img
  - button "Tambah Gambar" [disabled]:
    - img
    - text: Tambah Gambar
  - img
  - img
  - img
- link "Konsultasi Sekarang":
  - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
  - img
  - text: Konsultasi Sekarang
```

# Test source

```ts
  283 |       const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
  284 |       await selectMantineOption(page, tipeFileInput, 'Gambar');
  285 | 
  286 |       // Pastikan slot tersedia
  287 |       await ensureBannerSlotAvailable(page);
  288 | 
  289 |       const tambahBtn = page.getByRole('button', { name: /Tambah Gambar/i });
  290 |       if (await tambahBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  291 |         await expect(tambahBtn).toBeEnabled({ timeout: 5000 });
  292 |         await tambahBtn.click();
  293 | 
  294 |         const modal = page.locator('.mantine-Modal-content, [role="dialog"]').first();
  295 |         await expect(modal).toBeVisible({ timeout: 5000 });
  296 | 
  297 |         const uploadBtn = modal.getByRole('button', { name: /Upload/i }).first();
  298 |         await expect(uploadBtn).toBeDisabled();
  299 | 
  300 |         // Tutup modal
  301 |         await modal.getByRole('button', { name: /Batal/i }).first().click();
  302 |         await expect(modal).not.toBeVisible({ timeout: 5000 });
  303 |       } else {
  304 |         const uploadBtn = page.getByRole('button', { name: /Upload/i }).first();
  305 |         await expect(uploadBtn).toBeDisabled();
  306 |       }
  307 |     
  308 |     });
  309 |   });
  310 | 
  311 |   test('[TC-10] Berhasil menambahkan data display promosi (upload banner gambar) baru', async ({ page }) => {
  312 |     await test.step('Langkah Pengujian UAT: Berhasil menambahkan data display promosi (upload banner gambar) baru', async () => {
  313 |       // Pastikan cabang terpilih
  314 |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  315 |       if (!(await cabangInput.inputValue())) {
  316 |         await selectMantineOption(page, cabangInput);
  317 |       }
  318 | 
  319 |       // Pastikan tipe file Gambar terpilih
  320 |       const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
  321 |       await selectMantineOption(page, tipeFileInput, 'Gambar');
  322 | 
  323 |       // Pastikan slot banner tersedia (maksimal 3 gambar)
  324 |       await ensureBannerSlotAvailable(page);
  325 | 
  326 |       const tambahBtn = page.getByRole('button', { name: /Tambah Gambar/i });
  327 |       let container = page;
  328 |       let isModal = false;
  329 | 
  330 |       if (await tambahBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  331 |         await expect(tambahBtn).toBeEnabled({ timeout: 5000 });
  332 |         await tambahBtn.click();
  333 | 
  334 |         const modal = page.locator('.mantine-Modal-content, [role="dialog"]').first();
  335 |         await expect(modal).toBeVisible({ timeout: 5000 });
  336 |         container = modal;
  337 |         isModal = true;
  338 | 
  339 |         // Pilih opsi Urutan yang tersedia di modal
  340 |         const urutanInput = modal.getByPlaceholder('Pilih Urutan');
  341 |         if (await urutanInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  342 |           await urutanInput.click();
  343 |           const urutanOptions = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
  344 |           if (await urutanOptions.count() > 0) {
  345 |             await urutanOptions.last().click();
  346 |           }
  347 |         }
  348 |       }
  349 | 
  350 |       // Buat file gambar temporary valid (1x1 PNG)
  351 |       const dummyImagePath = path.join(__dirname, `test_promo_${Date.now()}.png`);
  352 |       const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  353 |       fs.writeFileSync(dummyImagePath, Buffer.from(pngBase64, 'base64'));
  354 | 
  355 |       try {
  356 |         // Upload file ke dropzone
  357 |         const fileInput = container.locator('input[type="file"]').first();
  358 |         await fileInput.setInputFiles(dummyImagePath);
  359 | 
  360 |         // Verifikasi tombol Upload menjadi aktif
  361 |         const uploadBtn = container.getByRole('button', { name: /Upload/i }).first();
  362 |         await expect(uploadBtn).toBeEnabled({ timeout: 5000 });
  363 | 
  364 |         // Siapkan listener response API promosi customer display
  365 |         const responsePromise = page.waitForResponse(
  366 |           (res) => res.url().includes('promotion-customer-display') && res.request().method() === 'POST',
  367 |           { timeout: 15000 }
  368 |         );
  369 | 
  370 |         // Klik tombol Upload
  371 |         await uploadBtn.click();
  372 | 
  373 |         // Verifikasi response API 200 OK
  374 |         const response = await responsePromise;
  375 |         expect(response.status()).toBe(200);
  376 | 
  377 |         // Verifikasi modal tertutup jika dibuka via modal
  378 |         if (isModal) {
  379 |           await expect(container).not.toBeVisible({ timeout: 10000 });
  380 |         }
  381 | 
  382 |         // Verifikasi media banner promosi tampil di grid
> 383 |         await expect(page.locator('.mantine-SimpleGrid-root img, img[src*="topindoku"]').first()).toBeVisible({ timeout: 10000 });
      |                                                                                                   ^ Error: expect(locator).toBeVisible() failed
  384 |       } finally {
  385 |         // Bersihkan file temporary
  386 |         if (fs.existsSync(dummyImagePath)) {
  387 |           fs.unlinkSync(dummyImagePath);
  388 |         }
  389 |       }
  390 |     
  391 |     });
  392 |   });
  393 | 
  394 |   test('[TC-11] Menampilkan opsi aksi Edit dan Hapus pada item display promosi yang sudah ada', async ({ page }) => {
  395 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan opsi aksi Edit dan Hapus pada item display promosi yang sudah ada', async () => {
  396 |       const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
  397 |       await selectMantineOption(page, tipeFileInput, 'Gambar');
  398 | 
  399 |       const cards = page.locator('.mantine-SimpleGrid-root > div');
  400 |       if (await cards.count() > 0) {
  401 |         const firstCard = cards.first();
  402 |         await firstCard.hover();
  403 | 
  404 |         // Cek tombol Edit atau Hapus di dalam card
  405 |         const editBtn = firstCard.getByRole('button', { name: /Edit/i }).first();
  406 |         const hapusBtn = firstCard.getByRole('button', { name: /Hapus/i }).first();
  407 |         const hasAction = (await editBtn.count() > 0) || (await hapusBtn.count() > 0);
  408 |         expect(hasAction).toBeTruthy();
  409 |       }
  410 |     
  411 |     });
  412 |   });
  413 | });
  414 | 
```