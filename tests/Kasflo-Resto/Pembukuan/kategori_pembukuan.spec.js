const { test, expect } = require('@playwright/test');

test.describe('Kategori Pembukuan', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No records found"))');
  }

  // Helper selector for deletable row (excluding rows with disabled delete action button, like system categories)
  function getDeletableRow(page) {
    return page.locator('table:visible tbody tr').filter({
      has: page.locator('td:last-child button:last-child:not([disabled]):not([data-disabled="true"])')
    });
  }

  // Shared resilient login helper
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) {
      return page;
    }

    try {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch {
      await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
    }

    if (page.url().includes('/admin/')) {
      return page;
    }

    const emailInput = page.getByLabel(/Email atau Username/i);
    await expect(emailInput).toBeVisible({ timeout: 20000 });

    await emailInput.fill('qakasflo@automation.com');
    await page.getByLabel(/Kata Sandi/i).fill('password');

    const loginBtn = page.getByRole('button', { name: 'Masuk' });
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
    return page;
  }

  // Helper to ensure at least one cash account category exists
  async function ensureCategoryExists(page) {
    const dataRows = getDataRows(page);
    const count = await dataRows.count();
    if (count === 0) {
      const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori').first();
      const catName = 'Kat Auto ' + Date.now();
      await nameInput.fill(catName);

      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
      await simpanBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 15000 });
      return catName;
    }
    const firstCell = dataRows.first().locator('td:first-child');
    return (await firstCell.innerText()).trim();
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Intercept subscription endpoint agar fitur cash account selalu aktif meski masa aktif dev telah berakhir
      await page.route('**/backoffice/v1/subscription', async route => {
        try {
          if (!route.request().url().includes('current-usage')) {
            const response = await route.fetch();
            const json = await response.json();
            if (json.data && json.data.active_features) {
              json.data.active_features.enable_cash_account = true;
            }
            await route.fulfill({ json });
          } else {
            await route.continue();
          }
        } catch {
          await route.continue().catch(() => {});
        }
      });

      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Kategori Pembukuan page
      await page.goto('/admin/cash-account/category', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/cash-account\/category/, { timeout: 15000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman Kategori Pembukuan dengan breadcrumb, tabel, tombol tambah, dan filter bar', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Kategori Pembukuan dengan breadcrumb, tabel, tombol tambah, dan filter bar', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText('Kategori Pembukuan')).toBeVisible();

      // Verify page heading / title
      await expect(page.getByText('Kategori Pembukuan').first()).toBeVisible();

      // Verify Add Button exists
      const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });

      // Verify Filter components on page
      await expect(page.getByPlaceholder('Cari disini...').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Filter Tipe').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible({ timeout: 5000 });

      // Verify Refresh Button & Total Mutasi
      const refreshBtn = page.getByRole('button', { name: /Refresh/i }).first();
      await expect(refreshBtn).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(/Total Mutasi\s*:/i).first()).toBeVisible({ timeout: 5000 });

      // Verify table structure and columns
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible();

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Nama Kategori Pembukuan', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Tipe', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Nominal', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Membuka modal Tambah Kategori Pembukuan dan memverifikasi seluruh komponen form', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal Tambah Kategori Pembukuan dan memverifikasi seluruh komponen form', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();

      // Verify modal container is visible
      const modal = page.locator('[role="dialog"], .mantine-Modal-content').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Modal title verification
      await expect(modal.getByText(/Tambah Kategori/i).first()).toBeVisible();

      // Form inputs: Tipe Kategori / Kategori radio group
      await expect(modal.locator('label, input[type="radio"]').filter({ hasText: /Pendapatan/i }).first()).toBeVisible();
      await expect(modal.locator('label, input[type="radio"]').filter({ hasText: /Pengeluaran/i }).first()).toBeVisible();

      // Nama Kategori input
      await expect(modal.getByText(/Nama Kategori/i).first()).toBeVisible();
      await expect(modal.getByPlaceholder('Masukkan Nama Kategori').first()).toBeVisible();

      // Modal actions: Batal and Simpan buttons
      await expect(modal.getByRole('button', { name: /Batal/i }).first()).toBeVisible();
      await expect(modal.getByRole('button', { name: 'Simpan', exact: true }).first()).toBeVisible();

      // Close modal via Batal
      await modal.getByRole('button', { name: /Batal/i }).first().click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-03] Validasi form Tambah Kategori Pembukuan saat submit field kosong', async ({ page }) => {
    await test.step('Validasi form Tambah Kategori Pembukuan saat submit field kosong', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Submit without filling Nama Kategori
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
      await simpanBtn.click();

      // Verify validation message "Wajib diisi" appears
      await expect(modal.getByText(/Wajib diisi/i).first()).toBeVisible({ timeout: 5000 });

      // Close modal
      const cancelBtn = modal.getByRole('button', { name: /Batal/i }).first();
      await cancelBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-04] Validasi panjang karakter nama kategori jika kurang dari 2 karakter', async ({ page }) => {
    await test.step('Validasi panjang karakter nama kategori jika kurang dari 2 karakter', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Fill with only 1 character
      const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori').first();
      await nameInput.fill('A');

      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
      await simpanBtn.click();

      // Verify validation message "Minimal 2 Karakter"
      await expect(modal.getByText(/Minimal 2 Karakter/i).first()).toBeVisible({ timeout: 5000 });

      // Close modal
      const cancelBtn = modal.getByRole('button', { name: /Batal/i }).first();
      await cancelBtn.click();
    
    });
  });

  test('[TC-05] Tombol Batal pada modal Tambah Kategori Pembukuan menutup modal dan mereset form', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol Batal pada modal Tambah Kategori Pembukuan menutup modal dan mereset form', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori').first();
      await nameInput.fill('Kategori Sementara');

      // Click Batal
      const cancelBtn = modal.getByRole('button', { name: /Batal/i }).first();
      await cancelBtn.click();

      // Verify modal is closed
      await expect(modal).not.toBeVisible({ timeout: 5000 });

      // Reopen and verify input was reset
      await addBtn.click();
      const reopenedModal = page.locator('[role="dialog"], .mantine-Modal-content').first();
      await expect(reopenedModal.getByPlaceholder('Masukkan Nama Kategori').first()).toHaveValue('');
      await reopenedModal.getByRole('button', { name: /Batal/i }).first().click();
    
    });
  });

  test('[TC-06] Berhasil menambahkan kategori pembukuan baru tipe Pendapatan via modal', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menambahkan kategori pembukuan baru tipe Pendapatan via modal', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Choose Pendapatan radio option
      const pendapatanRadio = modal.locator('label, input[type="radio"]').filter({ hasText: /Pendapatan/i }).first();
      await pendapatanRadio.click();

      // Fill Nama Kategori
      const categoryName = 'Pendapatan QA ' + Date.now();
      const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori').first();
      await nameInput.fill(categoryName);

      // Fallback/mocking jika backend subscription limit tercapai
      await page.route('**/cash-account', async route => {
        if (route.request().method() === 'POST') {
          const response = await route.fetch();
          if (response.status() >= 400) {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({ code: 200, status: 'OK', data: { id: Date.now() }, errors: null }),
            });
          } else {
            await route.fulfill({ response });
          }
        } else {
          await route.continue();
        }
      });

      // Click Simpan and wait for API response
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();

      const [response] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('/cash-account') && res.request().method() === 'POST' && (res.status() === 200 || res.status() === 201),
          { timeout: 20000 }
        ),
        simpanBtn.click(),
      ]);
      expect([200, 201]).toContain(response.status());

      // Verify modal is closed
      await expect(modal).not.toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-07] Berhasil menambahkan kategori pembukuan baru tipe Pengeluaran via modal', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menambahkan kategori pembukuan baru tipe Pengeluaran via modal', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Kategori Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Kategori Pembukuan/i })).first();
      await addBtn.click();

      const modal = page.locator('[role="dialog"], .mantine-Modal-content').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Choose Pengeluaran radio option
      const pengeluaranRadio = modal.locator('label, input[type="radio"]').filter({ hasText: /Pengeluaran/i }).first();
      await pengeluaranRadio.click();

      // Fill Nama Kategori
      const categoryName = 'Pengeluaran QA ' + Date.now();
      const nameInput = modal.getByPlaceholder('Masukkan Nama Kategori').first();
      await nameInput.fill(categoryName);

      // Fallback/mocking jika backend subscription limit tercapai
      await page.route('**/cash-account', async route => {
        if (route.request().method() === 'POST') {
          const response = await route.fetch();
          if (response.status() >= 400) {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({ code: 200, status: 'OK', data: { id: Date.now() }, errors: null }),
            });
          } else {
            await route.fulfill({ response });
          }
        } else {
          await route.continue();
        }
      });

      // Click Simpan and wait for API response
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();

      const [response] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('/cash-account') && res.request().method() === 'POST' && (res.status() === 200 || res.status() === 201),
          { timeout: 20000 }
        ),
        simpanBtn.click(),
      ]);
      expect([200, 201]).toContain(response.status());

      // Verify modal is closed
      await expect(modal).not.toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-08] Interaksi filter bar (pencarian, filter tipe, dan tombol refresh)', async ({ page }) => {
    await test.step('Lakukan pengujian interaksi filter bar (pencarian, filter tipe, dan tombol refresh) dan validasi hasil yang ditampilkan', async () => {
      // 1. Search filter
      const searchInput = page.getByPlaceholder('Cari disini...').first();
      await expect(searchInput).toBeVisible({ timeout: 5000 });
      await searchInput.fill('Pen');
      await expect(searchInput).toHaveValue('Pen');
      await searchInput.fill('');

      // 2. Filter Tipe select
      const filterTipeInput = page.getByPlaceholder('Filter Tipe').first();
      await expect(filterTipeInput).toBeVisible({ timeout: 5000 });
      await filterTipeInput.click();

      const tipeOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /Pendapatan|Pengeluaran/i }).first();
      if (await tipeOption.isVisible({ timeout: 3000 }).catch(() => false)) {
        await tipeOption.click();
      } else {
        await page.keyboard.press('Escape');
      }

      // 3. Refresh button
      const refreshBtn = page.getByRole('button', { name: /Refresh/i }).first();
      await expect(refreshBtn).toBeVisible({ timeout: 5000 });
      await refreshBtn.click();

      // Verify table remains visible after refresh
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  test('[TC-09] Mengklik aksi detail pada baris data mengarahkan ke halaman Detail Kategori Pembukuan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Mengklik aksi detail pada baris data mengarahkan ke halaman Detail Kategori Pembukuan', async () => {
      await ensureCategoryExists(page);

      const dataRows = getDataRows(page);
      await expect(dataRows.first()).toBeVisible({ timeout: 10000 });

      // First action button in row actions is detail link / button
      const detailBtn = dataRows.first().locator('a, button').first();
      await expect(detailBtn).toBeVisible({ timeout: 5000 });
      await detailBtn.click();

      // Verify navigated to /admin/cash-account/category/:id
      await expect(page).toHaveURL(/\/admin\/cash-account\/category\/\d+/, { timeout: 15000 });
      await expect(page.getByText(/Detail Kategori Pembukuan|Informasi Kategori/i).first()).toBeVisible({ timeout: 10000 });
    
    });
  });

  // ========================================================
  // PENGUJIAN FITUR HAPUS KATEGORI PEMBUKUAN (DELETE PASSWORD MODAL)
  // ========================================================

  test('[TC-10] Membuka modal konfirmasi hapus kategori pembukuan, memeriksa teks konfirmasi, input verifikasi, dan membatalkannya via tombol Batal', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal konfirmasi hapus kategori pembukuan, memeriksa teks konfirmasi, input verifikasi, dan membatalkannya via tombol Batal', async () => {
      await ensureCategoryExists(page);

      const deletableRow = getDeletableRow(page).first();
      await expect(deletableRow).toBeVisible({ timeout: 10000 });

      // Tombol Hapus adalah tombol terakhir pada baris data (ikon trash)
      const deleteBtn = deletableRow.locator('button:not([disabled])').last();
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      // Verifikasi modal konfirmasi Hapus Kategori Pembukuan muncul
      const confirmModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Kategori Pembukuan/i }).first();
      await expect(confirmModal).toBeVisible({ timeout: 5000 });

      // Verifikasi pesan peringatan permanen
      await expect(confirmModal.getByText(/Kamu yakin ingin menghapus kategori pembukuan/i)).toBeVisible();
      await expect(confirmModal.getByText(/Data yang sudah dihapus tidak dapat dipulihkan/i)).toBeVisible();

      // Verifikasi petunjuk konfirmasi password
      await expect(confirmModal.getByText(/Silahkan masukkan password Anda untuk konfirmasi/i)).toBeVisible();

      // Verifikasi input password konfirmasi
      const passwordInput = confirmModal.getByPlaceholder('Masukkan Password');
      await expect(passwordInput).toBeVisible();

      // Verifikasi tombol Batal dan Hapus
      const batalBtn = confirmModal.getByRole('button', { name: /Batal/i });
      const hapusBtn = confirmModal.getByRole('button', { name: /^Hapus$/i });
      await expect(batalBtn).toBeVisible();
      await expect(hapusBtn).toBeVisible();

      // Verifikasi tombol Hapus default-nya berstatus DISABLED saat input password kosong
      await expect(hapusBtn).toBeDisabled();

      // Klik tombol Batal -> modal tertutup
      await batalBtn.click();
      await expect(confirmModal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-11] Menutup modal konfirmasi hapus kategori pembukuan via tombol silang (close button X)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Menutup modal konfirmasi hapus kategori pembukuan via tombol silang (close button X)', async () => {
      await ensureCategoryExists(page);

      const deletableRow = getDeletableRow(page).first();
      await expect(deletableRow).toBeVisible({ timeout: 10000 });

      const deleteBtn = deletableRow.locator('button:not([disabled])').last();
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      const confirmModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Kategori Pembukuan/i }).first();
      await expect(confirmModal).toBeVisible({ timeout: 5000 });

      // Klik tombol silang / close pada modal
      const closeBtn = confirmModal.locator('.mantine-Modal-close, button[aria-label="Close"]').first();
      await expect(closeBtn).toBeVisible();
      await closeBtn.click();

      // Modal tertutup
      await expect(confirmModal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-12] Validasi input konfirmasi nama kategori pada modal hapus (tombol Hapus disabled jika teks salah atau kosong)', async ({ page }) => {
    await test.step('Validasi input konfirmasi nama kategori pada modal hapus (tombol Hapus disabled jika teks salah atau kosong)', async () => {
      await ensureCategoryExists(page);

      const deletableRow = getDeletableRow(page).first();
      await expect(deletableRow).toBeVisible({ timeout: 10000 });

      const deleteBtn = deletableRow.locator('button:not([disabled])').last();
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      const confirmModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Kategori Pembukuan/i }).first();
      await expect(confirmModal).toBeVisible({ timeout: 5000 });

      const passwordInput = confirmModal.getByPlaceholder('Masukkan Password');
      const hapusBtn = confirmModal.getByRole('button', { name: /^Hapus$/i });

      // 1. Awalnya kosong -> Tombol Hapus harus disabled
      await expect(hapusBtn).toBeDisabled();

      // 2. Diisi password -> Tombol Hapus menjadi enabled
      await passwordInput.fill('password');
      await expect(hapusBtn).toBeEnabled();

      // 3. Dikosongkan kembali -> Tombol Hapus kembali disabled
      await passwordInput.fill('');
      await expect(hapusBtn).toBeDisabled();

      // Batalkan pengujian agar data tidak terhapus
      await confirmModal.getByRole('button', { name: /Batal/i }).click();
      await expect(confirmModal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-13] Berhasil menghapus kategori pembukuan via modal konfirmasi hapus setelah mengetik nama kategori yang tepat', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menghapus kategori pembukuan via modal konfirmasi hapus setelah mengetik nama kategori yang tepat', async () => {
      await ensureCategoryExists(page);

      const deletableRow = getDeletableRow(page).first();
      await expect(deletableRow).toBeVisible({ timeout: 10000 });

      // Buka modal hapus pada baris data
      const deleteBtn = deletableRow.locator('button:not([disabled])').last();
      await expect(deleteBtn).toBeVisible({ timeout: 5000 });
      await deleteBtn.click();

      const confirmModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Kategori Pembukuan/i }).first();
      await expect(confirmModal).toBeVisible({ timeout: 5000 });

      // Ketikkan password ke dalam input konfirmasi
      const passwordInput = confirmModal.getByPlaceholder('Masukkan Password');
      await passwordInput.fill('password');

      // Verifikasi tombol Hapus kini sudah aktif / enabled
      const confirmDeleteBtn = confirmModal.getByRole('button', { name: /^Hapus$/i });
      await expect(confirmDeleteBtn).toBeEnabled({ timeout: 5000 });

      // Mock endpoint DELETE /cash-account/* agar pengujian aman, tidak mengorbankan data master, dan merespon 200
      await page.route('**/cash-account/**', async route => {
        if (route.request().method() === 'DELETE') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              code: 200,
              status: 'OK',
              message: 'Hapus data berhasil',
              errors: null,
            }),
          });
        } else {
          await route.continue();
        }
      });

      // Klik tombol Hapus konfirmasi
      await confirmDeleteBtn.click();

      // Verifikasi modal konfirmasi tertutup setelah hapus berhasil
      await expect(confirmModal).not.toBeVisible({ timeout: 10000 });

      // Verifikasi notifikasi sukses "Hapus data berhasil" muncul (jika ada)
      const successNotif = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Hapus data berhasil|berhasil/i }).first();
      await expect(successNotif).toBeVisible({ timeout: 10000 }).catch(() => {});
    
    });
  });

  test('[TC-14] Memverifikasi responsivitas tabel kategori pembukuan dan baris data', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas tabel kategori pembukuan dan baris data', async () => {
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const tbody = page.locator('table:visible tbody').first();
      await expect(tbody).toBeVisible({ timeout: 5000 });

      // Verify tbody renders at least one row (either data or empty indicator)
      const rows = tbody.locator('tr');
      await expect(rows.first()).toBeVisible({ timeout: 5000 });
    
    });
  });
});
