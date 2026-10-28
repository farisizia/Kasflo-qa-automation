const { test, expect } = require('@playwright/test');

test.describe('Kampanye Promosi', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  async function waitForPageReady(page) {
    const loader = page.locator(
      '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
    );
    await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

  // Shared resilient login helper
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) {
      await waitForPageReady(page);
      return page;
    }

    try {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch {
      await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
    }

    await waitForPageReady(page);

    if (page.url().includes('/admin/')) {
      return page;
    }

    const emailInput = page.getByLabel(/Email atau Username/i);
    await Promise.race([
      page.waitForURL(/.*\/admin\/.*/, { timeout: 15000 }).catch(() => {}),
      emailInput.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
    ]);
    if (page.url().includes('/admin/')) {
      await waitForPageReady(page);
      return page;
    }

    await expect(emailInput).toBeVisible({ timeout: 15000 });
    await emailInput.fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await loginBtn.click();

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        if (await loginBtn.isEnabled().catch(() => false)) {
          await loginBtn.click({ timeout: 3000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      }
    }
    await waitForPageReady(page);
    return page;
  }

  // Helper to select an option in a Mantine Select dropdown
  async function selectMantineOption(page, inputLocator, optionText) {
    await inputLocator.click();

    if (optionText) {
      const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible')
        .filter({ hasText: optionText }).first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click();
        return;
      }
    }

    // Default: click first visible option
    const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
  }

  // Helper to create a Promotion Campaign
  async function createPromotionCampaign(page, campaignName) {
    const addBtn = page.getByRole('button', { name: /Buat Kampanye Baru/i })
      .or(page.getByRole('link', { name: /Buat Kampanye Baru/i })).first();
    await expect(addBtn).toBeVisible({ timeout: 10000 });
    await addBtn.click();

    await expect(page).toHaveURL(/\/admin\/promotion\/campaign\/add/, { timeout: 15000 });

    // 1. Nama Promo
    const nameInput = page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await nameInput.fill(campaignName);

    // 2. Cabang
    const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
    await expect(cabangInput).toBeVisible({ timeout: 10000 });
    await selectMantineOption(page, cabangInput);

    // 3. Tanggal Mulai
    const startBtn = page.locator('button[data-dates-input="true"]').nth(0);
    await expect(startBtn).toBeVisible({ timeout: 5000 });
    await startBtn.click();
    const startPopover = page.locator('.mantine-Popover-dropdown:visible').last();
    await expect(startPopover).toBeVisible({ timeout: 5000 });
    await startPopover.locator('td button:not([data-disabled])').first().click();

    // 4. Tanggal Berakhir
    const endBtn = page.locator('button[data-dates-input="true"]').nth(1);
    await expect(endBtn).toBeVisible({ timeout: 5000 });
    await endBtn.click();
    const endPopover = page.locator('.mantine-Popover-dropdown:visible').last();
    await expect(endPopover).toBeVisible({ timeout: 5000 });
    await endPopover.locator('td button:not([data-disabled])').last().click();

    // 5. Kode Promo
    const kodeInput = page.getByPlaceholder(/Masukkan Kode Promo|Masukan Kode Promo/i);
    if (await kodeInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await kodeInput.fill('QA' + Date.now().toString().slice(-6));
    }

    // 6. Diskon
    const diskonInput = page.getByPlaceholder(/Masukan Persentase Diskon|Masukan Diskon/i);
    if (await diskonInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await diskonInput.fill('10');
    }

    // 7. Maksimal Diskon
    const maxDiskon = page.getByPlaceholder(/Masukan Maksimal Diskon/i);
    if (await maxDiskon.isVisible({ timeout: 3000 }).catch(() => false)) {
      await maxDiskon.fill('10000');
    }

    // 8. Minimal Transaksi
    const minTrx = page.getByPlaceholder(/Masukan Minimal Transaksi/i);
    if (await minTrx.isVisible({ timeout: 3000 }).catch(() => false)) {
      await minTrx.fill('20000');
    }

    // 9. Metode Pembayaran
    const paymentInput = page.getByPlaceholder(/Metode Pembayaran/i);
    if (await paymentInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await paymentInput.click();
      const paymentOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-MultiSelect-option:visible').first();
      if (await paymentOpt.isVisible({ timeout: 3000 }).catch(() => false)) {
        await paymentOpt.click();
      }
      await page.keyboard.press('Escape');
    }

    // 10. Platform Promosi: Check POS
    const posCheckbox = page.getByRole('checkbox', { name: /POS/i });
    if (await posCheckbox.isVisible({ timeout: 3000 }).catch(() => false)) {
      await posCheckbox.check();
    }

    // 11. Submit Form
    const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
    await expect(simpanBtn).toBeEnabled({ timeout: 10000 });
    await simpanBtn.click();

    await expect(page).toHaveURL(/\/admin\/promotion\/campaign$/, { timeout: 25000 });
    await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  }

  // Helper to ensure at least one campaign exists
  async function ensureCampaignExists(page) {
    const dataRows = getDataRows(page);
    const count = await dataRows.count();
    if (count === 0) {
      const newName = 'Campaign Auto ' + Date.now();
      await createPromotionCampaign(page, newName);
      return newName;
    }
    const firstCell = dataRows.first().locator('td:first-child');
    return (await firstCell.innerText()).trim();
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Campaign Promotion page
      await page.goto('/admin/promotion/campaign', { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      // Step 3: Verify campaign page loaded
      await expect(page).toHaveURL(/\/admin\/promotion\/campaign/);
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan halaman kampanye promosi dengan tabel, header, dan filter yang sesuai', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman kampanye promosi dengan tabel, header, dan filter yang sesuai', async () => {
      // Verify page heading / breadcrumb
      await expect(page.getByText('Kampanye Promosi').first()).toBeVisible({ timeout: 10000 });

      // Verify filter elements
      const tipeDiskonFilter = page.locator('input[placeholder="Filter Tipe Diskon"]:visible')
        .or(page.getByPlaceholder('Filter Tipe Diskon')).first();
      await expect(tipeDiskonFilter).toBeVisible({ timeout: 5000 });

      const cabangFilter = page.locator('input[placeholder="Pilih Cabang"]:visible')
        .or(page.getByPlaceholder('Pilih Cabang')).first();
      await expect(cabangFilter).toBeVisible({ timeout: 5000 });

      const statusFilter = page.locator('input[placeholder="Filter Status"]:visible')
        .or(page.getByPlaceholder('Filter Status')).first();
      await expect(statusFilter).toBeVisible({ timeout: 5000 });

      const periodeBtn = page.getByRole('button', { name: /Pilih Periode Tanggal/i })
        .or(page.locator('button:has-text("Pilih Periode Tanggal")')).first();
      await expect(periodeBtn).toBeVisible({ timeout: 5000 });

      // Verify Add Button exists
      const addBtn = page.getByRole('button', { name: /Buat Kampanye Baru/i })
        .or(page.getByRole('link', { name: /Buat Kampanye Baru/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });

      // Verify table structure and headers
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible();

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Nama Promosi', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Tipe Diskon', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Diskon', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Navigasi ke form buat kampanye baru dan memverifikasi seluruh komponen form', async ({ page }) => {
    await test.step('Lakukan proses navigasi ke form buat kampanye baru dan memverifikasi seluruh komponen form dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('button', { name: /Buat Kampanye Baru/i })
        .or(page.getByRole('link', { name: /Buat Kampanye Baru/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();

      // Verify URL and title
      await expect(page).toHaveURL(/\/admin\/promotion\/campaign\/add/, { timeout: 15000 });
      await expect(page.getByText('Atur Promo').first()).toBeVisible({ timeout: 10000 });

      // Verify key fields in form
      await expect(page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible({ timeout: 5000 });

      // Verify date pickers
      const datePickers = page.locator('button[data-dates-input="true"]');
      await expect(datePickers.nth(0)).toBeVisible({ timeout: 5000 });
      await expect(datePickers.nth(1)).toBeVisible({ timeout: 5000 });

      // Verify detail promo inputs
      await expect(page.getByPlaceholder(/Masukkan Kode Promo|Masukan Kode Promo/i)).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder(/Masukan Persentase Diskon|Masukan Diskon/i)).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder(/Masukan Minimal Transaksi/i)).toBeVisible({ timeout: 5000 });

      // Verify action buttons
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible({ timeout: 5000 });

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-03] Tombol batalkan pada form buat kampanye baru mengembalikan ke halaman list kampanye', async ({ page }) => {
    await test.step('Lakukan proses tombol batalkan pada form buat kampanye baru mengembalikan ke halaman list kampanye dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('button', { name: /Buat Kampanye Baru/i })
        .or(page.getByRole('link', { name: /Buat Kampanye Baru/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/promotion\/campaign\/add/);

      // Fill temporary name
      const tempName = 'Batal Campaign ' + Date.now();
      await page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first().fill(tempName);

      // Click Batalkan
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      // Verify redirected back to campaign list
      await expect(page).toHaveURL(/\/admin\/promotion\/campaign$/, { timeout: 15000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });

      // Verify temporary item is not saved
      await expect(page.locator('table:visible').getByText(tempName)).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-04] Validasi form buat kampanye baru: submit tanpa melengkapi data wajib tidak keluar dari form', async ({ page }) => {
    await test.step('Lakukan proses validasi form buat kampanye baru: submit tanpa melengkapi data wajib tidak keluar dari form dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('button', { name: /Buat Kampanye Baru/i })
        .or(page.getByRole('link', { name: /Buat Kampanye Baru/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/promotion\/campaign\/add/);

      // Click Simpan button when form is empty
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
      await simpanBtn.click();

      // Form should remain on add page due to validation
      await expect(page).toHaveURL(/\/admin\/promotion\/campaign\/add/);
    
    });
  });

  test('[TC-05] Buka dan tutup dropdown metode pembayaran pada form kampanye promosi', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Buka dan tutup dropdown metode pembayaran pada form kampanye promosi', async () => {
      const addBtn = page.getByRole('button', { name: /Buat Kampanye Baru/i })
        .or(page.getByRole('link', { name: /Buat Kampanye Baru/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/promotion\/campaign\/add/);

      // Open Metode Pembayaran dropdown
      const paymentInput = page.getByPlaceholder(/Metode Pembayaran/i);
      await expect(paymentInput).toBeVisible({ timeout: 5000 });
      await paymentInput.click();

      // Verify dropdown options visible
      const dropdown = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-MultiSelect-option:visible');
      await expect(dropdown.first()).toBeVisible({ timeout: 5000 });

      // Close dropdown
      await page.keyboard.press('Escape');
      await expect(dropdown.first()).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Tambah kampanye promosi baru berhasil dan muncul di tabel', async ({ page }) => {
    await test.step('Lakukan proses tambah kampanye promosi baru berhasil dan muncul di tabel dan pastikan data tersimpan', async () => {
      const campaignName = 'Campaign Auto ' + Date.now();
      await createPromotionCampaign(page, campaignName);

      // Verify new campaign row is visible in table
      const table = page.locator('table:visible').first();
      const newRow = table.locator('tbody tr').filter({ hasText: campaignName });
      await expect(newRow.first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-07] Filter kampanye promosi berdasarkan cabang', async ({ page }) => {
    await test.step('Lakukan pengujian filter kampanye promosi berdasarkan cabang dan validasi hasil yang ditampilkan', async () => {
      await ensureCampaignExists(page);

      const cabangFilter = page.locator('input[placeholder="Pilih Cabang"]:visible')
        .or(page.getByPlaceholder('Pilih Cabang')).first();
      await expect(cabangFilter).toBeVisible({ timeout: 5000 });

      // Select branch from filter
      await selectMantineOption(page, cabangFilter);

      // Verify table remains visible and functional
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-08] Filter kampanye promosi berdasarkan tipe diskon', async ({ page }) => {
    await test.step('Lakukan pengujian filter kampanye promosi berdasarkan tipe diskon dan validasi hasil yang ditampilkan', async () => {
      await ensureCampaignExists(page);

      const tipeFilter = page.locator('input[placeholder="Filter Tipe Diskon"]:visible')
        .or(page.getByPlaceholder('Filter Tipe Diskon')).first();
      await expect(tipeFilter).toBeVisible({ timeout: 5000 });
      await tipeFilter.click();

      // Verify dropdown options exist
      const options = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
      if (await options.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await options.first().click();
      } else {
        await page.keyboard.press('Escape');
      }

      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-09] Navigasi ke halaman detail kampanye promosi via aksi tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail kampanye promosi via aksi tabel', async () => {
      await ensureCampaignExists(page);

      const targetRow = getDataRows(page).first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });

      // Detail button (first action link or button with eye icon)
      const detailBtn = targetRow.locator('a, button').first();
      await expect(detailBtn).toBeVisible({ timeout: 5000 });
      await detailBtn.click();

      // Verify detail page URL or back navigation
      await expect(page).toHaveURL(/.*\/admin\/promotion\/campaign\/.*/, { timeout: 15000 });

      // Return to main list
      const breadcrumbLink = page.getByRole('link', { name: 'Kampanye Promosi' }).first();
      if (await breadcrumbLink.isVisible({ timeout: 3000 }).catch(() => false)) {
        await breadcrumbLink.click();
      } else {
        await page.goto('/admin/promotion/campaign', { waitUntil: 'domcontentloaded' });
      }

      await expect(page).toHaveURL(/\/admin\/promotion\/campaign$/, { timeout: 15000 });
    
    });
  });

  test('[TC-10] Navigasi ke form edit kampanye promosi via aksi tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke form edit kampanye promosi via aksi tabel', async () => {
      await ensureCampaignExists(page);

      const targetRow = getDataRows(page).first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });

      // Edit button (second action link or button with pencil icon)
      const editBtn = targetRow.locator('a, button').nth(1);
      await expect(editBtn).toBeVisible({ timeout: 5000 });
      await editBtn.click();

      // Verify edit form loaded
      await expect(page).toHaveURL(/.*\/admin\/promotion\/campaign\/(edit\/|form\/|\d+)/, { timeout: 15000 });

      // Cancel edit and return
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      if (await cancelBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await cancelBtn.click();
      } else {
        await page.goto('/admin/promotion/campaign', { waitUntil: 'domcontentloaded' });
      }

      await expect(page).toHaveURL(/\/admin\/promotion\/campaign$/, { timeout: 15000 });
    
    });
  });

  test('[TC-11] Batal menghapus kampanye promosi melalui modal konfirmasi', async ({ page }) => {
    await test.step('Uji pembatalan aksi: Batal menghapus kampanye promosi melalui modal konfirmasi', async () => {
      await ensureCampaignExists(page);

      const targetRow = getDataRows(page).first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });
      const targetName = (await targetRow.locator('td:first-child').innerText()).trim();

      // Delete button (last button in action column)
      const deleteBtn = targetRow.locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Hapus|Apakah anda yakin/i).first()).toBeVisible({ timeout: 5000 });

      // Click Batal
      const cancelBtn = modal.getByRole('button', { name: /Batal/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      // Verify modal closed
      await expect(modal).not.toBeVisible({ timeout: 5000 });

      // Verify campaign still exists in table
      await expect(page.locator('table:visible').getByText(targetName)).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-12] Hapus kampanye promosi berhasil dengan konfirmasi modal', async ({ page }) => {
    await test.step('Lakukan proses hapus kampanye promosi berhasil dengan konfirmasi modal dan konfirmasi penghapusan data', async () => {
      // Create a campaign specifically for deletion
      const itemToDelete = 'Delete Camp ' + Date.now();
      await createPromotionCampaign(page, itemToDelete);

      // Locate target row
      const targetRow = page.locator('table:visible tbody tr').filter({ hasText: itemToDelete }).first();
      await expect(targetRow).toBeVisible({ timeout: 15000 });

      // Click delete button
      const deleteBtn = targetRow.locator('button').last();
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      // Verify confirmation modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Click confirm Hapus button
      const confirmHapusBtn = modal.getByRole('button', { name: /Hapus|Ya/i }).first();
      await expect(confirmHapusBtn).toBeVisible();

      await Promise.all([
        page.waitForResponse(res => res.url().includes('/promotion/campaign') && res.request().method() === 'DELETE' && (res.status() === 200 || res.status() === 204), { timeout: 20000 }).catch(() => null),
        confirmHapusBtn.click(),
      ]);

      // Verify modal closed
      await expect(modal).not.toBeVisible({ timeout: 10000 });

      // Verify deleted item is no longer in table
      await expect(page.locator('table:visible').getByText(itemToDelete)).not.toBeVisible({ timeout: 10000 });
    
    });
  });
});
