# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Pembukuan/kategori_pembukuan.spec.js >> Kategori Pembukuan >> [TC-13] Berhasil menghapus kategori pembukuan via modal konfirmasi hapus setelah mengetik nama kategori yang tepat
- Location: tests/Pembukuan/kategori_pembukuan.spec.js:532:3

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('[role="dialog"]:visible, .mantine-Modal-content:visible').filter({ hasText: /Hapus Kategori Pembukuan/i }).first()
Expected: not visible
Received: visible
Timeout:  10000ms

Call log:
  - Expect "not toBeVisible" locator('[role="dialog"]:visible, .mantine-Modal-content:visible').filter({ hasText: /Hapus Kategori Pembukuan/i }).first() with timeout 10000ms
  - waiting for locator('[role="dialog"]:visible, .mantine-Modal-content:visible').filter({ hasText: /Hapus Kategori Pembukuan/i }).first()
    24 × locator resolved to <section role="dialog" tabindex="-1" aria-modal="true" data-modal-content="true" aria-describedby="mantine-c7zivr331-body" aria-labelledby="mantine-c7zivr331-title" class="m_fd1ab0aa m_54c44539 mantine-Modal-content m_1b7284a3 mantine-Paper-root">…</section>
       - unexpected value "visible"

```

```yaml
- dialog "Hapus Kategori Pembukuan":
  - banner
  - alert
  - text: Password
  - textbox "Password":
    - /placeholder: Masukkan Password
    - text: password
  - button "Batal"
  - button "Hapus"
```

# Test source

```ts
  478 |       await expect(deleteBtn).toBeVisible({ timeout: 5000 });
  479 |       await deleteBtn.click();
  480 | 
  481 |       const confirmModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
  482 |         .filter({ hasText: /Hapus Kategori Pembukuan/i }).first();
  483 |       await expect(confirmModal).toBeVisible({ timeout: 5000 });
  484 | 
  485 |       // Klik tombol silang / close pada modal
  486 |       const closeBtn = confirmModal.locator('.mantine-Modal-close, button[aria-label="Close"]').first();
  487 |       await expect(closeBtn).toBeVisible();
  488 |       await closeBtn.click();
  489 | 
  490 |       // Modal tertutup
  491 |       await expect(confirmModal).not.toBeVisible({ timeout: 5000 });
  492 |     
  493 |     });
  494 |   });
  495 | 
  496 |   test('[TC-12] Validasi input konfirmasi nama kategori pada modal hapus (tombol Hapus disabled jika teks salah atau kosong)', async ({ page }) => {
  497 |     await test.step('Validasi input konfirmasi nama kategori pada modal hapus (tombol Hapus disabled jika teks salah atau kosong)', async () => {
  498 |       await ensureCategoryExists(page);
  499 | 
  500 |       const deletableRow = getDeletableRow(page).first();
  501 |       await expect(deletableRow).toBeVisible({ timeout: 10000 });
  502 | 
  503 |       const deleteBtn = deletableRow.locator('button:not([disabled])').last();
  504 |       await expect(deleteBtn).toBeVisible({ timeout: 5000 });
  505 |       await deleteBtn.click();
  506 | 
  507 |       const confirmModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
  508 |         .filter({ hasText: /Hapus Kategori Pembukuan/i }).first();
  509 |       await expect(confirmModal).toBeVisible({ timeout: 5000 });
  510 | 
  511 |       const passwordInput = confirmModal.getByPlaceholder('Masukkan Password');
  512 |       const hapusBtn = confirmModal.getByRole('button', { name: /^Hapus$/i });
  513 | 
  514 |       // 1. Awalnya kosong -> Tombol Hapus harus disabled
  515 |       await expect(hapusBtn).toBeDisabled();
  516 | 
  517 |       // 2. Diisi password -> Tombol Hapus menjadi enabled
  518 |       await passwordInput.fill('password');
  519 |       await expect(hapusBtn).toBeEnabled();
  520 | 
  521 |       // 3. Dikosongkan kembali -> Tombol Hapus kembali disabled
  522 |       await passwordInput.fill('');
  523 |       await expect(hapusBtn).toBeDisabled();
  524 | 
  525 |       // Batalkan pengujian agar data tidak terhapus
  526 |       await confirmModal.getByRole('button', { name: /Batal/i }).click();
  527 |       await expect(confirmModal).not.toBeVisible({ timeout: 5000 });
  528 |     
  529 |     });
  530 |   });
  531 | 
  532 |   test('[TC-13] Berhasil menghapus kategori pembukuan via modal konfirmasi hapus setelah mengetik nama kategori yang tepat', async ({ page }) => {
  533 |     await test.step('Langkah Pengujian UAT: Berhasil menghapus kategori pembukuan via modal konfirmasi hapus setelah mengetik nama kategori yang tepat', async () => {
  534 |       await ensureCategoryExists(page);
  535 | 
  536 |       const deletableRow = getDeletableRow(page).first();
  537 |       await expect(deletableRow).toBeVisible({ timeout: 10000 });
  538 | 
  539 |       // Buka modal hapus pada baris data
  540 |       const deleteBtn = deletableRow.locator('button:not([disabled])').last();
  541 |       await expect(deleteBtn).toBeVisible({ timeout: 5000 });
  542 |       await deleteBtn.click();
  543 | 
  544 |       const confirmModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
  545 |         .filter({ hasText: /Hapus Kategori Pembukuan/i }).first();
  546 |       await expect(confirmModal).toBeVisible({ timeout: 5000 });
  547 | 
  548 |       // Ketikkan password ke dalam input konfirmasi
  549 |       const passwordInput = confirmModal.getByPlaceholder('Masukkan Password');
  550 |       await passwordInput.fill('password');
  551 | 
  552 |       // Verifikasi tombol Hapus kini sudah aktif / enabled
  553 |       const confirmDeleteBtn = confirmModal.getByRole('button', { name: /^Hapus$/i });
  554 |       await expect(confirmDeleteBtn).toBeEnabled({ timeout: 5000 });
  555 | 
  556 |       // Mock endpoint DELETE /cash-account/* agar pengujian aman, tidak mengorbankan data master, dan merespon 200
  557 |       await page.route('**/cash-account/**', async route => {
  558 |         if (route.request().method() === 'DELETE') {
  559 |           await route.fulfill({
  560 |             status: 200,
  561 |             contentType: 'application/json',
  562 |             body: JSON.stringify({
  563 |               code: 200,
  564 |               status: 'OK',
  565 |               message: 'Hapus data berhasil',
  566 |               errors: null,
  567 |             }),
  568 |           });
  569 |         } else {
  570 |           await route.continue();
  571 |         }
  572 |       });
  573 | 
  574 |       // Klik tombol Hapus konfirmasi
  575 |       await confirmDeleteBtn.click();
  576 | 
  577 |       // Verifikasi modal konfirmasi tertutup setelah hapus berhasil
> 578 |       await expect(confirmModal).not.toBeVisible({ timeout: 10000 });
      |                                      ^ Error: expect(locator).not.toBeVisible() failed
  579 | 
  580 |       // Verifikasi notifikasi sukses "Hapus data berhasil" muncul (jika ada)
  581 |       const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
  582 |         .filter({ hasText: /Hapus data berhasil|berhasil/i }).first();
  583 |       await expect(successNotif).toBeVisible({ timeout: 10000 }).catch(() => {});
  584 |     
  585 |     });
  586 |   });
  587 | 
  588 |   test('[TC-14] Memverifikasi responsivitas tabel kategori pembukuan dan baris data', async ({ page }) => {
  589 |     await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas tabel kategori pembukuan dan baris data', async () => {
  590 |       const table = page.locator('table:visible').first();
  591 |       await expect(table).toBeVisible({ timeout: 10000 });
  592 | 
  593 |       const tbody = page.locator('table:visible tbody').first();
  594 |       await expect(tbody).toBeVisible({ timeout: 5000 });
  595 | 
  596 |       // Verify tbody renders at least one row (either data or empty indicator)
  597 |       const rows = tbody.locator('tr');
  598 |       await expect(rows.first()).toBeVisible({ timeout: 5000 });
  599 |     
  600 |     });
  601 |   });
  602 | });
  603 | 
```