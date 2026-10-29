# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Bahan Baku/resep.spec.js >> Resep Bahan Baku >> [TC-13] Peralihan radio button Tipe Resep ke Varian serta pemilihan dropdown Varian dan Opsi Varian
- Location: tests/Kasflo-Resto/Bahan Baku/resep.spec.js:667:3

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator:  getByRole('button', { name: /Tambah Bahan Baku/i })
Expected: enabled
Received: disabled
Timeout:  10000ms

Call log:
  - Expect "toBeEnabled" getByRole('button', { name: /Tambah Bahan Baku/i }) with timeout 10000ms
  - waiting for getByRole('button', { name: /Tambah Bahan Baku/i })
    24 × locator resolved to <button disabled type="button" data-disabled="true" class="mantine-focus-auto m_77c9d27d mantine-Button-root m_87cf2631 mantine-UnstyledButton-root">…</button>
       - unexpected value "disabled"

```

```yaml
- button "Tambah Bahan Baku" [disabled]
```

# Test source

```ts
  626 |       if (await dataRows.count() === 0) {
  627 |         await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
  628 |         return;
  629 |       }
  630 | 
  631 |       const targetRow = dataRows.first();
  632 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  633 |       const targetMenu = await getRecipeItemName(targetRow);
  634 | 
  635 |       // Click delete / trash button
  636 |       const deleteBtn = targetRow.locator('button').last();
  637 |       await expect(deleteBtn).toBeVisible({ timeout: 10000 });
  638 |       await deleteBtn.click();
  639 | 
  640 |       // Verify confirmation modal appears
  641 |       const modal = page.locator('[role="dialog"], .mantine-Modal-content');
  642 |       await expect(modal).toBeVisible({ timeout: 5000 });
  643 |       await expect(modal.getByText(/Hapus|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });
  644 | 
  645 |       // Click confirm delete button
  646 |       const confirmDeleteBtn = modal.getByRole('button', { name: 'Hapus', exact: true });
  647 |       await expect(confirmDeleteBtn).toBeVisible();
  648 | 
  649 |       await Promise.all([
  650 |         page.waitForResponse(res => (res.url().includes('delete-menu') || res.url().includes('recipe') || res.url().includes('ingredients')) && (res.status() === 200 || res.status() === 204), { timeout: 20000 }).catch(() => null),
  651 |         confirmDeleteBtn.click(),
  652 |       ]);
  653 | 
  654 |       // Verify modal closed
  655 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
  656 | 
  657 |       // Verify row or search term is no longer visible
  658 |       if (targetMenu) {
  659 |         const searchInput = getSearchInput(page);
  660 |         await searchInput.fill(targetMenu);
  661 |         await waitForPageReady(page);
  662 |         await expect(page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data"))').filter({ hasText: targetMenu })).toHaveCount(0, { timeout: 10000 });
  663 |       }
  664 |     });
  665 |   });
  666 | 
  667 |   test('[TC-13] Peralihan radio button Tipe Resep ke Varian serta pemilihan dropdown Varian dan Opsi Varian', async ({ page }) => {
  668 |     await test.step('Navigasi ke halaman Buat Resep, pilih Cabang, alihkan Tipe Resep ke Varian, dan pilih Varian serta Opsi Varian', async () => {
  669 |       const addBtn = page.getByRole('link', { name: /Buat Resep/i })
  670 |         .or(page.getByRole('button', { name: /Buat Resep/i })).first();
  671 |       await expect(addBtn).toBeVisible({ timeout: 10000 });
  672 |       await addBtn.click();
  673 | 
  674 |       await expect(page).toHaveURL(/\/admin\/ingredients\/recipe\/add/, { timeout: 15000 });
  675 |       await waitForPageReady(page);
  676 | 
  677 |       // 1. Pilih Cabang *
  678 |       const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  679 |       await expect(cabangInput).toBeVisible({ timeout: 10000 });
  680 |       const branchOptions = await getListboxOptionsForInput(page, cabangInput);
  681 |       await cabangInput.click();
  682 |       await expect(branchOptions.first()).toBeVisible({ timeout: 10000 });
  683 |       await branchOptions.first().click();
  684 |       await waitForPageReady(page);
  685 | 
  686 |       // 2. Verifikasi kondisi awal Tipe Resep = Menu
  687 |       const menuRadio = page.locator('input[type="radio"][value="menu"]');
  688 |       const varianRadio = page.locator('input[type="radio"][value="variant"]');
  689 |       await expect(menuRadio).toBeChecked();
  690 |       await expect(page.getByPlaceholder('Pilih Menu')).toBeVisible();
  691 | 
  692 |       // 3. Klik radio button Tipe Resep -> Varian
  693 |       const varianRadioLabel = page.locator('label.mantine-Radio-label').filter({ hasText: /^Varian$/ }).first();
  694 |       await expect(varianRadioLabel).toBeVisible({ timeout: 5000 });
  695 |       await varianRadioLabel.click();
  696 |       await expect(varianRadio).toBeChecked();
  697 | 
  698 |       // 4. Verifikasi field dinamis Varian * dan Opsi Varian * muncul
  699 |       const varianInput = page.getByPlaceholder('Pilih Varian').first();
  700 |       const opsiVarianInput = page.getByPlaceholder('Pilih Opsi Varian').first();
  701 |       await expect(varianInput).toBeVisible({ timeout: 5000 });
  702 |       await expect(varianInput).toBeEnabled({ timeout: 5000 });
  703 |       await expect(opsiVarianInput).toBeVisible({ timeout: 5000 });
  704 |       await expect(opsiVarianInput).toBeDisabled();
  705 | 
  706 |       // 5. Pilih opsi pada dropdown Varian *
  707 |       const varianOptions = await getListboxOptionsForInput(page, varianInput);
  708 |       await varianInput.click();
  709 |       if (await varianOptions.first().isVisible({ timeout: 5000 }).catch(() => false)) {
  710 |         await varianOptions.first().click();
  711 |         await waitForPageReady(page);
  712 |         await expect(varianInput).not.toHaveValue('');
  713 | 
  714 |         // 6. Setelah Varian dipilih, dropdown Opsi Varian * menjadi aktif dan dapat dipilih
  715 |         const isOpsiEnabled = await expect(opsiVarianInput).toBeEnabled({ timeout: 10000 }).then(() => true).catch(() => false);
  716 |         if (isOpsiEnabled) {
  717 |           const opsiOptions = await getListboxOptionsForInput(page, opsiVarianInput);
  718 |           await opsiVarianInput.click();
  719 |           if (await opsiOptions.first().isVisible({ timeout: 5000 }).catch(() => false)) {
  720 |             await opsiOptions.first().click();
  721 |             await waitForPageReady(page);
  722 |             await expect(opsiVarianInput).not.toHaveValue('');
  723 | 
  724 |             // Tombol Tambah Bahan Baku pada panel Resep menjadi aktif
  725 |             const tambahBahanBtn = page.getByRole('button', { name: /Tambah Bahan Baku/i });
> 726 |             await expect(tambahBahanBtn).toBeEnabled({ timeout: 10000 });
      |                                          ^ Error: expect(locator).toBeEnabled() failed
  727 |           } else {
  728 |             await page.keyboard.press('Escape').catch(() => {});
  729 |           }
  730 |         }
  731 |       } else {
  732 |         await page.keyboard.press('Escape').catch(() => {});
  733 |       }
  734 | 
  735 |       // 7. Beralih kembali ke radio button Menu dan pastikan field Pilih Menu tampil kembali
  736 |       const menuRadioLabel = page.locator('label.mantine-Radio-label').filter({ hasText: /^Menu$/ }).first();
  737 |       await menuRadioLabel.click();
  738 |       await expect(menuRadio).toBeChecked();
  739 |       await expect(page.getByPlaceholder('Pilih Menu')).toBeVisible({ timeout: 5000 });
  740 |     });
  741 |   });
  742 | });
  743 | 
```