const { test, expect } = require('@playwright/test');

test.describe('Metode Pembayaran', () => {
  // Helper login yang tangguh dan menghindari timeout redirect
  async function loginBeforeTest(page) {
    if (page.url().includes('/admin/')) {
      return page;
    }

    try {
      await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
    } catch {
      if (page.url().includes('/admin/')) {
        return page;
      }
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
      await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
    } catch {
      if (!page.url().includes('/admin/')) {
        await page.waitForTimeout(1500);
        if (await loginBtn.isEnabled().catch(() => false)) {
          await loginBtn.click({ timeout: 3000 }).catch(() => {});
        }
        await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      }
    }
    return page;
  }

  // Helper selector untuk baris tabel metode pembayaran (mengecualikan baris kosong)
  function getPaymentRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  }

  // Helper selector untuk baris metode pembayaran kustom (bukan bawaan sistem Cash / QRIS)
  function getCustomPaymentRows(page) {
    return page.locator('table:visible tbody tr')
      .filter({ hasNotText: 'Cash' })
      .filter({ hasNotText: 'QRIS System' })
      .filter({ hasNotText: 'Belum Ada Data' })
      .filter({ hasNotText: 'No results found' });
  }

  // Helper untuk memastikan ada minimal satu metode pembayaran kustom
  async function ensureCustomPaymentMethod(page) {
    const customRows = getCustomPaymentRows(page);
    const count = await customRows.count();
    if (count === 0) {
      const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const uniqueName = 'E-Wallet QA ' + Math.floor(Math.random() * 9000 + 1000);
      const nameInput = modal.getByPlaceholder('Masukkan Nama Metode Pembayaran').first();
      await nameInput.fill(uniqueName);

      const tipeInput = modal.getByPlaceholder('Pilih Tipe Metode Pembayaran').first();
      await tipeInput.click();
      const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: /^E-Wallet$/i }).first();
      await expect(option).toBeVisible({ timeout: 5000 });
      await option.click();

      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
      await Promise.all([
        page.waitForResponse(
          res => res.url().includes('payment-method') && (res.request().method() === 'POST' || res.request().method() === 'PUT') && (res.status() === 200 || res.status() === 201),
          { timeout: 20000 }
        ).catch(() => null),
        simpanBtn.click(),
      ]);

      await expect(modal).not.toBeVisible({ timeout: 10000 });
      await expect(customRows.first()).toBeVisible({ timeout: 10000 });
    }
    return customRows;
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Intercept subscription endpoint agar batas metode pembayaran mencukupi
      await page.route('**/subscription**', async route => {
        try {
          const response = await route.fetch();
          const json = await response.json();
          if (json.data && json.data.active_features) {
            json.data.active_features.max_setting_payment_method = 50;
          }
          await route.fulfill({ json });
        } catch {
          await route.continue().catch(() => {});
        }
      });

      // 1. Login
      await loginBeforeTest(page);

      // 2. Navigasi ke halaman Metode Pembayaran
      try {
        await page.goto('/admin/setting/payment-method', { waitUntil: 'commit', timeout: 25000 });
      } catch {
        await page.goto('/admin/setting/payment-method', { waitUntil: 'domcontentloaded', timeout: 25000 });
      }

      // 3. Verifikasi URL dan tabel termuat
      await expect(page).toHaveURL(/\/admin\/setting\/payment-method/, { timeout: 20000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  // ==========================================
  // 1. TAMPILAN HALAMAN & STRUKTUR TABEL
  // ==========================================

  test('[TC-01] Menampilkan halaman Metode Pembayaran dengan breadcrumb, judul, limit kuota, dan tombol tambah', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Metode Pembayaran dengan breadcrumb, judul, limit kuota, dan tombol tambah', async () => {
      // Verifikasi Title dokumen
      await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);

      // Verifikasi Breadcrumb
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root, nav[aria-label="Breadcrumb"]').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText(/Metode Pembayaran/i).first()).toBeVisible();

      // Verifikasi Card Jumlah Kuota Metode Pembayaran
      const quotaCard = page.getByText(/Jumlah Metode Pembayaran/i).first();
      await expect(quotaCard).toBeVisible({ timeout: 10000 });
      await expect(page.getByText(/\d+\/\d+ Metode Pembayaran/i).first()).toBeVisible();

      // Verifikasi Tombol Tambah Metode Pembayaran
      const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
      await expect(tambahBtn).toBeVisible({ timeout: 10000 });
      await expect(tambahBtn).toBeEnabled();
    
    });
  });

  test('[TC-02] Memverifikasi struktur tabel metode pembayaran dan kolom-kolomnya', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel metode pembayaran dan kolom-kolomnya', async () => {
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      // Verifikasi header tabel
      const thead = table.locator('thead:visible').first();
      await expect(thead.getByText('Nama Metode Pembayaran').first()).toBeVisible();
      await expect(thead.getByText('Tipe Metode Pembayaran').first()).toBeVisible();
      await expect(thead.getByText('Digunakan Cabang').first()).toBeVisible();
      await expect(thead.getByText('Status').first()).toBeVisible();
      await expect(thead.getByText('Action').first()).toBeVisible();

      // Verifikasi metode pembayaran default Cash & QRIS System ada dalam tabel
      const rows = getPaymentRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Cash').first()).toBeVisible();
      await expect(page.getByText('QRIS System').first()).toBeVisible();
    
    });
  });

  // ==========================================
  // 2. TOOLBAR & FILTER STATUS
  // ==========================================

  test('[TC-03] Dapat membuka dropdown Filter Status dan memilih opsi status', async ({ page }) => {
    await test.step('Lakukan pengujian dapat membuka dropdown Filter Status dan memilih opsi status dan validasi hasil yang ditampilkan', async () => {
      const filterStatus = page.getByPlaceholder('Filter Status').first();
      await expect(filterStatus).toBeVisible({ timeout: 5000 });
      await filterStatus.click();

      // Verifikasi opsi status muncul: Aktif & Nonaktif
      const optionAktif = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: /^Aktif$/i }).first();
      const optionNonaktif = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: /^Nonaktif$/i }).first();

      await expect(optionAktif).toBeVisible({ timeout: 5000 });
      await expect(optionNonaktif).toBeVisible({ timeout: 5000 });

      // Pilih filter Aktif
      await optionAktif.click();
      await expect(filterStatus).toHaveValue(/Aktif/i);

      // Verifikasi tabel tetap menampilkan baris data aktif
      const rows = getPaymentRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 3. MODAL TAMBAH METODE PEMBAYARAN & VALIDASI
  // ==========================================

  test('[TC-04] Membuka modal Tambah Metode Pembayaran dan memverifikasi seluruh komponen form', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal Tambah Metode Pembayaran dan memverifikasi seluruh komponen form', async () => {
      const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
      await tambahBtn.click();

      // Verifikasi Modal Tambah terbuka
      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
      await expect(modal).toBeVisible({ timeout: 5000 });
      await expect(modal.getByText(/Tambah Metode Pembayaran/i).first()).toBeVisible();

      // Verifikasi input fields
      await expect(modal.getByPlaceholder('Masukkan Nama Metode Pembayaran').first()).toBeVisible();
      await expect(modal.getByPlaceholder('Pilih Tipe Metode Pembayaran').first()).toBeVisible();

      // Verifikasi tombol Batal dan Simpan
      const batalBtn = modal.getByRole('button', { name: /Batal/i }).first();
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
      await expect(batalBtn).toBeVisible();
      await expect(simpanBtn).toBeVisible();

      // Tutup modal via tombol Batal
      await batalBtn.click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-05] Memverifikasi pilihan tipe metode pembayaran pada dropdown modal', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi pilihan tipe metode pembayaran pada dropdown modal', async () => {
      const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      const tipeInput = modal.getByPlaceholder('Pilih Tipe Metode Pembayaran').first();
      await tipeInput.click();

      // Verifikasi tipe-tipe pembayaran yang tersedia
      const expectedTypes = ['Cash', 'QRIS', 'E-Wallet', 'Debit', 'Credit'];
      for (const type of expectedTypes) {
        const opt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: new RegExp(`^${type}$`, 'i') }).first();
        await expect(opt).toBeVisible({ timeout: 5000 });
      }

      // Pilih salah satu tipe (misal: E-Wallet)
      const ewalletOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: /^E-Wallet$/i }).first();
      await ewalletOpt.click();
      await expect(tipeInput).toHaveValue(/E-Wallet/i);

      // Batalkan
      await modal.getByRole('button', { name: /Batal/i }).first().click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-06] Validasi form Tambah Metode Pembayaran saat submit field wajib kosong', async ({ page }) => {
    await test.step('Validasi form Tambah Metode Pembayaran saat submit field wajib kosong', async () => {
      const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Klik simpan tanpa mengisi field apapun
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
      await simpanBtn.click();

      // Modal tetap terbuka karena validasi gagal
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Verifikasi pesan error validasi muncul
      const errorMsg = modal.getByText(/Wajib diisi|harus diisi/i).first();
      await expect(errorMsg).toBeVisible({ timeout: 5000 });

      // Batalkan
      await modal.getByRole('button', { name: /Batal/i }).first().click();
      await expect(modal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 4. [CRUD] TAMBAH METODE PEMBAYARAN BARU
  // ==========================================

  test('[TC-07] Berhasil menambahkan metode pembayaran baru via modal', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menambahkan metode pembayaran baru via modal', async () => {
      const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
      await tambahBtn.click();

      const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // 1. Isi Nama Metode Pembayaran
      const uniqueName = 'GoPay QA ' + Math.floor(Math.random() * 9000 + 1000);
      const nameInput = modal.getByPlaceholder('Masukkan Nama Metode Pembayaran').first();
      await nameInput.fill(uniqueName);
      await expect(nameInput).toHaveValue(uniqueName);

      // 2. Pilih Tipe Metode Pembayaran
      const tipeInput = modal.getByPlaceholder('Pilih Tipe Metode Pembayaran').first();
      await tipeInput.click();
      const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: /^E-Wallet$/i }).first();
      await expect(option).toBeVisible({ timeout: 5000 });
      await option.click();

      // 3. Simpan dan tunggu respons API
      const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
      await Promise.all([
        page.waitForResponse(
          res => res.url().includes('payment-method') && (res.request().method() === 'POST' || res.request().method() === 'PUT') && (res.status() === 200 || res.status() === 201),
          { timeout: 20000 }
        ).catch(() => null),
        simpanBtn.click(),
      ]);

      // Verifikasi modal tertutup
      await expect(modal).not.toBeVisible({ timeout: 10000 });

      // Verifikasi baris metode pembayaran yang baru ditambahkan muncul pada tabel
      const newRow = page.locator('table:visible tbody tr').filter({ hasText: uniqueName }).first();
      await expect(newRow).toBeVisible({ timeout: 10000 });
    
    });
  });

  // ==========================================
  // 5. INTERAKSI TOMBOL AKSI PADA BARIS DATA
  // ==========================================

  test('[TC-08] Membuka modal pengaturan cabang pada baris metode pembayaran dan membatalkannya', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal pengaturan cabang pada baris metode pembayaran dan membatalkannya', async () => {
      const rows = getPaymentRows(page);
      await expect(rows.first()).toBeVisible({ timeout: 10000 });

      // Tombol pertama pada kolom Action adalah tombol pengaturan cabang (ikon branch/store)
      const branchBtn = rows.first().locator('button:visible').first();
      await expect(branchBtn).toBeVisible({ timeout: 5000 });
      await branchBtn.click();

      // Verifikasi modal atau drawer pengaturan cabang terbuka
      const branchModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible, .mantine-Drawer-content:visible')
        .filter({ hasText: /Cabang|Atur Cabang|Pilih Cabang|Metode Pembayaran/i }).first();
      await expect(branchModal).toBeVisible({ timeout: 5000 });

      // Tutup modal via tombol Batal atau tombol Tutup / silang
      const closeBtn = branchModal.getByRole('button', { name: /Batal|Tutup/i })
        .or(branchModal.locator('.mantine-Modal-close, .mantine-Drawer-close')).first();
      await expect(closeBtn).toBeVisible({ timeout: 5000 });
      await closeBtn.click();

      await expect(branchModal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-09] Memverifikasi tombol hapus disabled untuk metode pembayaran bawaan (Cash & QRIS)', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi tombol hapus disabled untuk metode pembayaran bawaan (Cash & QRIS)', async () => {
      // Baris Cash dan QRIS adalah metode bawaan sistem, tombol hapus harus disabled
      const cashRow = page.locator('table:visible tbody tr').filter({ hasText: 'Cash' }).first();
      await expect(cashRow).toBeVisible({ timeout: 10000 });

      const deleteBtn = cashRow.locator('button').last();
      await expect(deleteBtn).toBeDisabled();
    
    });
  });

  test('[TC-10] Memverifikasi responsivitas tabel metode pembayaran dan status aktif', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas tabel metode pembayaran dan status aktif', async () => {
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      // Verifikasi badge/teks status "Aktif" pada baris data
      const statusBadge = page.locator('table:visible tbody tr td').filter({ hasText: /Aktif/i }).first();
      await expect(statusBadge).toBeVisible({ timeout: 5000 });
    
    });
  });

  // ==========================================
  // 6. HAPUS METODE PEMBAYARAN (DELETE)
  // ==========================================

  test('[TC-11] Membuka modal konfirmasi hapus metode pembayaran dan membatalkannya', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Membuka modal konfirmasi hapus metode pembayaran dan membatalkannya', async () => {
      // 1. Pastikan minimal ada 1 baris metode pembayaran kustom
      const customRows = await ensureCustomPaymentMethod(page);
      await expect(customRows.first()).toBeVisible({ timeout: 10000 });

      const targetRow = customRows.first();
      const methodName = (await targetRow.locator('td').first().innerText()).trim();

      // 2. Klik tombol hapus (tombol terakhir pada baris aksi)
      const deleteBtn = targetRow.locator('button').last();
      await expect(deleteBtn).toBeEnabled({ timeout: 5000 });
      await deleteBtn.click();

      // 3. Verifikasi modal konfirmasi hapus muncul dengan judul dan teks konfirmasi
      const deleteModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Metode Pembayaran/i }).first();
      await expect(deleteModal).toBeVisible({ timeout: 5000 });
      await expect(deleteModal.getByText(/Apakah anda yakin akan menghapus data Metode Pembayaran ini\?/i)).toBeVisible();

      // 4. Verifikasi tombol Batal dan Hapus pada modal konfirmasi
      const batalBtn = deleteModal.getByRole('button', { name: /Batal/i }).first();
      const hapusBtn = deleteModal.getByRole('button', { name: /^Hapus$/i }).first();
      await expect(batalBtn).toBeVisible({ timeout: 5000 });
      await expect(hapusBtn).toBeVisible({ timeout: 5000 });

      // 5. Batalkan penghapusan
      await batalBtn.click();

      // Modal harus tertutup dan metode pembayaran tetap ada dalam tabel
      await expect(deleteModal).not.toBeVisible({ timeout: 5000 });
      await expect(page.locator('table:visible tbody tr').filter({ hasText: methodName }).first()).toBeVisible({ timeout: 5000 });
    });
  });

  test('[TC-12] Berhasil menghapus metode pembayaran kustom via modal konfirmasi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menghapus metode pembayaran kustom via modal konfirmasi', async () => {
      // 1. Pastikan minimal ada 1 baris metode pembayaran kustom yang dapat dihapus
      const customRows = await ensureCustomPaymentMethod(page);
      await expect(customRows.first()).toBeVisible({ timeout: 10000 });

      const targetRow = customRows.first();
      const methodName = (await targetRow.locator('td').first().innerText()).trim();

      // 2. Klik tombol hapus pada baris data
      const deleteBtn = targetRow.locator('button').last();
      await expect(deleteBtn).toBeEnabled({ timeout: 5000 });
      await deleteBtn.click();

      // 3. Verifikasi modal konfirmasi terbuka
      const deleteModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Hapus Metode Pembayaran/i }).first();
      await expect(deleteModal).toBeVisible({ timeout: 5000 });
      await expect(deleteModal.getByText(/Apakah anda yakin akan menghapus data Metode Pembayaran ini\?/i)).toBeVisible();

      // 4. Klik tombol konfirmasi Hapus dan tunggu response DELETE API
      const confirmHapusBtn = deleteModal.getByRole('button', { name: /^Hapus$/i }).first();
      const [response] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('payment-method') && (res.request().method() === 'DELETE' || res.status() === 200 || res.status() === 204),
          { timeout: 15000 }
        ).catch(() => null),
        confirmHapusBtn.click(),
      ]);

      if (response) {
        expect([200, 204]).toContain(response.status());
      }

      // 5. Verifikasi modal konfirmasi tertutup
      await expect(deleteModal).not.toBeVisible({ timeout: 10000 });

      // 6. Verifikasi toast notifikasi sukses muncul
      const successToast = page.locator('.mantine-Notification-root:visible, [role="status"]:visible')
        .filter({ hasText: /Metode Pembayaran Berhasil Dihapus/i }).first();
      await expect(successToast).toBeVisible({ timeout: 10000 });

      // 7. Verifikasi metode pembayaran yang dihapus tidak lagi muncul pada tabel
      await expect(page.locator('table:visible tbody tr').filter({ hasText: methodName })).not.toBeVisible({ timeout: 10000 });
    });
  });
});



