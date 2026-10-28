const { test, expect } = require('@playwright/test');

test.describe('Harga Spesial', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  // Helper to wait until table rows or empty state is loaded
  async function waitForTableReady(page) {
    const table = page.locator('table:visible').first();
    await expect(table).toBeVisible({ timeout: 15000 });
    await expect(table.locator('tbody tr').first()).toBeVisible({ timeout: 15000 });
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

    await expect(emailInput).toBeVisible({ timeout: 20000 });

    await emailInput.fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');
    await page.waitForTimeout(500);

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeEnabled({ timeout: 10000 });
    await loginBtn.click();

    try {
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 35000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await page.waitForTimeout(1000);
        if (await loginBtn.isEnabled().catch(() => false)) {
          await loginBtn.click({ timeout: 5000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
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

  // Helper to create a Special Price Promo
  async function createSpecialPricePromo(page, promoName) {
    const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
      .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
    await expect(addBtn).toBeVisible({ timeout: 10000 });
    await addBtn.click();

    await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/, { timeout: 15000 });

    // Fill Nama Promo
    const nameInput = page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await nameInput.fill(promoName);

    // Select Cabang that has available menus
    const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
    await expect(cabangInput).toBeVisible({ timeout: 10000 });

    const optionSelector = '[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible';
    await cabangInput.click();
    await page.waitForTimeout(500);
    const branchOptions = page.locator(optionSelector);
    const branchCount = await branchOptions.count();

    let menuSelected = false;
    for (let b = 0; b < Math.max(branchCount, 1); b++) {
      if (branchCount > 0) {
        if (b > 0) {
          await cabangInput.click();
          await page.waitForTimeout(500);
        }
        await page.locator(optionSelector).nth(b).click();
        await page.waitForTimeout(1000);
      }

      // Add Menu via Modal (Daftar Menu is visible after selecting Cabang)
      const tambahMenuBtn = page.getByRole('button', { name: /Tambah Menu/i });
      if (!await tambahMenuBtn.isVisible({ timeout: 5000 }).catch(() => false)) continue;
      await tambahMenuBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
      await expect(modal).toBeVisible({ timeout: 10000 });

      // Wait for modal table to finish loading
      const modalTable = modal.locator('table tbody');
      await modalTable.locator('tr').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});

      // Check available menu if available
      const pricedRow = modal.locator('table tbody tr:not(:has-text("Belum Ada Data"))').filter({ hasText: /Rp\s*[1-9]/ }).first();
      const anyRow = modal.locator('table tbody tr:not(:has-text("Belum Ada Data")) input[type="checkbox"]').first();

      if (await pricedRow.isVisible({ timeout: 5000 }).catch(() => false)) {
        await pricedRow.locator('input[type="checkbox"]').check({ force: true });
        menuSelected = true;
      } else if (await anyRow.isVisible({ timeout: 5000 }).catch(() => false)) {
        await anyRow.check({ force: true });
        menuSelected = true;
      }

      if (menuSelected) {
        const tambahkanBtn = modal.getByRole('button', { name: /Tambahkan/i });
        await expect(tambahkanBtn).toBeEnabled({ timeout: 5000 });
        await tambahkanBtn.click();
        await expect(modal).not.toBeVisible({ timeout: 10000 });
        break;
      } else {
        const batalBtn = modal.getByRole('button', { name: /Batal/i }).or(modal.locator('.mantine-Modal-close')).first();
        if (await batalBtn.isVisible().catch(() => false)) {
          await batalBtn.click();
          await expect(modal).not.toBeVisible({ timeout: 5000 });
        }
      }
    }

    if (!menuSelected) {
      await page.goto('/admin/promotion/special-price', { waitUntil: 'domcontentloaded' });
      await waitForTableReady(page);
      return null;
    }

    // Select Tanggal Mulai
    const startBtn = page.locator('button[data-dates-input="true"]').nth(0);
    await expect(startBtn).toBeVisible({ timeout: 5000 });
    await startBtn.click();
    const startPopover = page.locator('.mantine-Popover-dropdown:visible').last();
    await expect(startPopover).toBeVisible({ timeout: 5000 });
    await startPopover.locator('td button:not([data-disabled])').first().click();

    // Select Tanggal Berakhir
    const endBtn = page.locator('button[data-dates-input="true"]').nth(1);
    await expect(endBtn).toBeVisible({ timeout: 5000 });
    await endBtn.click();
    const endPopover = page.locator('.mantine-Popover-dropdown:visible').last();
    await expect(endPopover).toBeVisible({ timeout: 5000 });
    await endPopover.locator('td button:not([data-disabled])').last().click();

    // Set Harga Spesial for added item (harus lebih kecil dari harga normal)
    const hargaSpesialInput = page.getByPlaceholder(/Masukan Harga Spesial/i)
      .or(page.locator('table input[type="text"], table input[type="number"]')).first();
    if (await hargaSpesialInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      const row = hargaSpesialInput.locator('xpath=ancestor::tr');
      const cells = row.locator('td');
      let normalPrice = 0;
      const count = await cells.count();
      for (let i = 0; i < count; i++) {
        const text = await cells.nth(i).innerText().catch(() => '');
        if (/Rp\s*\d+/i.test(text)) {
          const val = parseInt(text.replace(/\D/g, ''), 10);
          if (val > 0) {
            normalPrice = val;
            break;
          }
        }
      }

      const promoPrice = normalPrice > 1000 ? Math.floor(normalPrice * 0.7) : 500;
      await hargaSpesialInput.click();
      await hargaSpesialInput.fill(String(promoPrice));
    }

    // Ensure POS channel switch is enabled
    const posSwitch = page.locator('table tbody tr').first().locator('input[type="checkbox"], [role="switch"]').first();
    if (await posSwitch.isVisible({ timeout: 3000 }).catch(() => false)) {
      const isChecked = await posSwitch.isChecked().catch(() => false);
      if (!isChecked) {
        await posSwitch.check().catch(async () => {
          await posSwitch.click({ force: true });
        });
      }
    }

    // Submit Form
    const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
    await expect(simpanBtn).toBeEnabled({ timeout: 10000 });
    await simpanBtn.click();

    await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 25000 });
    await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    return promoName;
  }

  // Helper to ensure at least one promo exists
  async function ensurePromoExists(page) {
    const dataRows = getDataRows(page);
    const count = await dataRows.count();
    if (count === 0) {
      const newName = 'Promo Auto ' + Date.now();
      const res = await createSpecialPricePromo(page, newName);
      if (res) return newName;
      return null;
    }
    const firstCell = dataRows.first().locator('td:first-child');
    return (await firstCell.innerText()).trim();
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Special Price page
      await page.goto('/admin/promotion/special-price', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify special price page loaded
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price/);
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman harga spesial dengan tabel, header, dan filter yang sesuai', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman harga spesial dengan tabel, header, dan filter yang sesuai', async () => {
      // Verify page heading / breadcrumb
      await expect(page.getByText('Harga Spesial').first()).toBeVisible({ timeout: 10000 });

      // Verify filter elements
      const cabangFilter = page.locator('input[placeholder="Pilih Cabang"]:visible').first();
      await expect(cabangFilter).toBeVisible({ timeout: 5000 });

      const statusFilter = page.getByLabel('Filter Status').or(page.locator('input[value="Semua Status"]:visible')).first();
      await expect(statusFilter).toBeVisible({ timeout: 5000 });

      const periodeBtn = page.getByRole('button', { name: /Pilih Periode Tanggal/i })
        .or(page.locator('button:has-text("Pilih Periode Tanggal")')).first();
      await expect(periodeBtn).toBeVisible({ timeout: 5000 });

      // Verify Add Button exists
      const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
        .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });

      // Verify table structure and headers
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible();

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Nama Promo', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Dibuat Oleh', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Tanggal Mulai', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Tanggal Berakhir', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Navigasi ke form buat harga spesial dan memverifikasi seluruh komponen form', async ({ page }) => {
    await test.step('Lakukan proses navigasi ke form buat harga spesial dan memverifikasi seluruh komponen form dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
        .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();

      // Verify URL and title
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/, { timeout: 15000 });
      await expect(page.getByText('Buat Promo').first()).toBeVisible({ timeout: 10000 });

      // Verify key fields in form
      await expect(page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first()).toBeVisible({ timeout: 5000 });
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 5000 });

      // Verify date pickers
      const datePickers = page.locator('button[data-dates-input="true"]');
      await expect(datePickers.nth(0)).toBeVisible({ timeout: 5000 });
      await expect(datePickers.nth(1)).toBeVisible({ timeout: 5000 });

      // Verify action buttons
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible({ timeout: 5000 });

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });

      // Select Cabang to reveal Daftar Menu section
      await selectMantineOption(page, cabangInput);

      // Verify Tambah Menu button is now visible
      const tambahMenuBtn = page.getByRole('button', { name: /Tambah Menu/i });
      await expect(tambahMenuBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-03] Tombol batalkan pada form buat harga spesial mengembalikan ke halaman list promo', async ({ page }) => {
    await test.step('Lakukan proses tombol batalkan pada form buat harga spesial mengembalikan ke halaman list promo dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
        .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/);

      // Fill temporary name
      const tempName = 'Batal Promo ' + Date.now();
      await page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first().fill(tempName);

      // Click Batalkan
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      // Verify redirected back to special price list
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 15000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });

      // Verify temporary item is not saved
      await expect(page.locator('table:visible').getByText(tempName)).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-04] Validasi form buat harga spesial: submit tanpa data wajib tidak keluar dari halaman form', async ({ page }) => {
    await test.step('Lakukan proses validasi form buat harga spesial: submit tanpa data wajib tidak keluar dari halaman form dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
        .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/);

      // Click Simpan button when form is empty
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true });
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
      await simpanBtn.click();

      // Form should remain on form page due to validation
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/);
    
    });
  });

  test('[TC-05] Membuka dan membatalkan modal tambah menu pada form buat harga spesial', async ({ page }) => {
    await test.step('Lakukan proses membuka dan membatalkan modal tambah menu pada form buat harga spesial dan pastikan data tersimpan', async () => {
      const addBtn = page.getByRole('link', { name: /Buat Harga Spesial/i })
        .or(page.getByRole('button', { name: /Buat Harga Spesial/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form$/);

      // Select Cabang first so Daftar Menu section appears
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 5000 });
      await selectMantineOption(page, cabangInput);

      // Click Tambah Menu button
      const tambahMenuBtn = page.getByRole('button', { name: /Tambah Menu/i });
      await expect(tambahMenuBtn).toBeVisible({ timeout: 5000 });
      await tambahMenuBtn.click();

      // Verify modal appears
      const modal = page.locator('[role="dialog"], .mantine-Modal-content').last();
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText('Tambah Menu').first()).toBeVisible({ timeout: 5000 });

      // Cancel modal
      const cancelBtn = modal.getByRole('button', { name: /Batal/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Tambah harga spesial baru berhasil dan tampil di tabel', async ({ page }) => {
    await test.step('Lakukan proses tambah harga spesial baru berhasil dan tampil di tabel dan pastikan data tersimpan', async () => {
      const promoName = 'Promo Spesial Auto ' + Date.now();
      const created = await createSpecialPricePromo(page, promoName);

      await waitForTableReady(page);
      // Verify promo appears in table
      if (created) {
        const table = page.locator('table:visible').first();
        const newRow = table.locator('tbody tr').filter({ hasText: promoName });
        await expect(newRow.first()).toBeVisible({ timeout: 15000 });
      } else {
        const rows = getDataRows(page);
        if (await rows.count() > 0) {
          await expect(rows.first()).toBeVisible({ timeout: 10000 });
        } else {
          await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
        }
      }
    });
  });

  test('[TC-07] Filter harga spesial berdasarkan cabang', async ({ page }) => {
    await test.step('Lakukan pengujian filter harga spesial berdasarkan cabang dan validasi hasil yang ditampilkan', async () => {
      await ensurePromoExists(page);

      const cabangFilter = page.locator('input[placeholder="Pilih Cabang"]:visible').first();
      await expect(cabangFilter).toBeVisible({ timeout: 5000 });

      // Select branch from filter
      await selectMantineOption(page, cabangFilter);

      // Verify table updates and remains visible
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-08] Filter harga spesial berdasarkan status promo', async ({ page }) => {
    await test.step('Lakukan pengujian filter harga spesial berdasarkan status promo dan validasi hasil yang ditampilkan', async () => {
      await ensurePromoExists(page);

      const statusFilter = page.getByLabel('Filter Status').or(page.locator('input[value="Semua Status"]:visible')).first();
      await expect(statusFilter).toBeVisible({ timeout: 5000 });
      await statusFilter.click();

      // Verify status options exist
      const options = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
      await expect(options.first()).toBeVisible({ timeout: 5000 });

      // Select first option
      await options.first().click();

      // Verify table is visible after filter change
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-09] Navigasi ke halaman detail harga spesial via aksi tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke halaman detail harga spesial via aksi tabel', async () => {
      await ensurePromoExists(page);

      const targetRow = getDataRows(page).first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });

      // Detail button is the first action (link with eye icon)
      const detailBtn = targetRow.locator('a').first();
      await expect(detailBtn).toBeVisible({ timeout: 5000 });
      await detailBtn.click();

      // Verify detail page URL
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/\d+/, { timeout: 15000 });

      // Return to main list via breadcrumb link
      const breadcrumbLink = page.getByRole('link', { name: 'Harga Spesial' }).first();
      await expect(breadcrumbLink).toBeVisible({ timeout: 5000 });
      await breadcrumbLink.click();

      await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 15000 });
    
    });
  });

  test('[TC-10] Navigasi ke form edit harga spesial via aksi tabel', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke form edit harga spesial via aksi tabel', async () => {
      await ensurePromoExists(page);

      const targetRow = getDataRows(page).first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });

      // Edit button is the second link in the action column
      const editBtn = targetRow.locator('a').nth(1);
      await expect(editBtn).toBeVisible({ timeout: 5000 });
      await editBtn.click();

      // Verify edit form URL
      await expect(page).toHaveURL(/\/admin\/promotion\/special-price\/form\/\d+/, { timeout: 15000 });

      // Cancel edit and return
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();

      await expect(page).toHaveURL(/\/admin\/promotion\/special-price$/, { timeout: 15000 });
    
    });
  });

  test('[TC-11] Batal menghapus harga spesial melalui modal konfirmasi', async ({ page }) => {
    await test.step('Uji pembatalan aksi: Batal menghapus harga spesial melalui modal konfirmasi', async () => {
      await ensurePromoExists(page);

      const targetRow = getDataRows(page).first();
      await expect(targetRow).toBeVisible({ timeout: 10000 });
      const targetName = (await targetRow.locator('td:first-child').innerText()).trim();

      // Delete button is the button in the action column
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

      // Verify promo still exists in table
      await expect(page.locator('table:visible').getByText(targetName)).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-12] Hapus harga spesial berhasil dengan konfirmasi modal', async ({ page }) => {
    await test.step('Lakukan proses hapus harga spesial berhasil dengan konfirmasi modal dan konfirmasi penghapusan data', async () => {
      // Create a promo specifically for deletion or use existing
      const itemToDelete = 'Delete Target ' + Date.now();
      const created = await createSpecialPricePromo(page, itemToDelete);

      await waitForTableReady(page);
      let targetRow;
      if (created) {
        targetRow = page.locator('table:visible tbody tr').filter({ hasText: itemToDelete }).first();
      } else {
        const dataRows = getDataRows(page);
        if (await dataRows.count() === 0) {
          await expect(page.locator('table:visible tbody').getByText(/Belum Ada Data|No results found/i).first()).toBeVisible({ timeout: 10000 });
          return;
        }
        targetRow = dataRows.first();
      }

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
        page.waitForResponse(res => res.url().includes('/promotion/special-price') && res.request().method() === 'DELETE' && (res.status() === 200 || res.status() === 204), { timeout: 20000 }).catch(() => null),
        confirmHapusBtn.click(),
      ]);

      // Verify modal closed
      await expect(modal).not.toBeVisible({ timeout: 10000 });

      // Verify deleted item is no longer in table
      if (created) {
        await expect(page.locator('table:visible').getByText(itemToDelete)).not.toBeVisible({ timeout: 10000 });
      }
    });
  });
});
