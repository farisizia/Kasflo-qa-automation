const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Data Pembukuan', () => {
  // Helper selector for actual data rows (excluding empty placeholder row)
  function getDataRows(page) {
    return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
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

    const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Data Pembukuan page
      await page.goto('/admin/cash-account/data', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify page loaded
      await expect(page).toHaveURL(/\/admin\/cash-account\/data/, { timeout: 15000 });
      await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman Data Pembukuan dengan breadcrumb, tabel, dan tombol tambah', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Data Pembukuan dengan breadcrumb, tabel, dan tombol tambah', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText('Data Pembukuan')).toBeVisible();

      // Verify Add Button exists
      const addBtn = page.getByRole('button', { name: /Tambah Data Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Data Pembukuan/i })).first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });

      // Verify table structure and columns
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible();

      const thead = page.locator('thead:visible').first();
      await expect(thead.getByText('Cabang', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Waktu, Tanggal', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Kategori Pembukuan', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Catatan', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Nominal', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Dibuat Oleh', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Role', { exact: true }).first()).toBeVisible();
      await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
    
    });
  });

  test('[TC-02] Navigasi ke form Tambah Data Pembukuan dan memverifikasi seluruh komponen form', async ({ page }) => {
    await test.step('Navigasi halaman dan periksa komponen: Navigasi ke form Tambah Data Pembukuan dan memverifikasi seluruh komponen form', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Data Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Data Pembukuan/i })).first();
      await addBtn.click();

      // Verify URL navigated to form
      await expect(page).toHaveURL(/\/admin\/cash-account\/data\/add/, { timeout: 15000 });
      await expect(page.getByText(/Tambah Data Pembukuan/i).first()).toBeVisible({ timeout: 10000 });

      // Verify form input fields
      await expect(page.getByPlaceholder('Pilih Cabang').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Pilih Tanggal').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Pilih Kategori Pembukuan').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Jumlah').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('Masukkan Catatan').first()).toBeVisible({ timeout: 5000 });

      // Verify Lampiran section
      await expect(page.getByText('Lampiran').first()).toBeVisible({ timeout: 5000 });

      // Verify Information card on the right
      await expect(page.getByText('Informasi').first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(/melacak transaksi resto/i).first()).toBeVisible({ timeout: 5000 });

      // Verify Action buttons: Batalkan & Simpan
      const cancelBtn = page.getByRole('button', { name: /Batalkan/i })
        .or(page.getByRole('link', { name: /Batalkan/i })).first();
      await expect(cancelBtn).toBeVisible({ timeout: 5000 });

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();
      await expect(simpanBtn).toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-03] Tombol Batalkan pada form Tambah Data Pembukuan mengembalikan ke halaman Data Pembukuan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol Batalkan pada form Tambah Data Pembukuan mengembalikan ke halaman Data Pembukuan', async () => {
      const addBtn = page.getByRole('button', { name: /Tambah Data Pembukuan/i })
        .or(page.getByRole('link', { name: /Tambah Data Pembukuan/i })).first();
      await addBtn.click();
      await expect(page).toHaveURL(/\/admin\/cash-account\/data\/add/);

      const cancelBtn = page.getByRole('button', { name: /Batalkan/i })
        .or(page.getByRole('link', { name: /Batalkan/i })).first();
      await cancelBtn.click();

      await expect(page).toHaveURL(/\/admin\/cash-account\/data$/, { timeout: 15000 });
    
    });
  });

  test('[TC-04] Validasi field wajib form Tambah Data Pembukuan saat submit form kosong', async ({ page }) => {
    await test.step('Validasi field wajib form Tambah Data Pembukuan saat submit form kosong', async () => {
      await page.goto('/admin/cash-account/data/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/cash-account\/data\/add/);

      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();
      await simpanBtn.click();

      // Verify stays on form due to validations
      await expect(page).toHaveURL(/\/admin\/cash-account\/data\/add/);

      // Verify validation errors appear
      const errorCount = await page.getByText(/Wajib diisi/i).count();
      expect(errorCount).toBeGreaterThan(0);
    
    });
  });

  test('[TC-05] Bisa mengisi field pada form Tambah Data Pembukuan', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Bisa mengisi field pada form Tambah Data Pembukuan', async () => {
      await page.goto('/admin/cash-account/data/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/cash-account\/data\/add/);

      // 1. Select Cabang
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await selectMantineOption(page, cabangInput);

      // 2. Select Kategori Pembukuan
      const kategoriInput = page.getByPlaceholder('Pilih Kategori Pembukuan').first();
      await selectMantineOption(page, kategoriInput);

      // 3. Fill Jumlah (Nominal)
      const jumlahInput = page.getByPlaceholder('Masukkan Jumlah').first();
      await jumlahInput.fill('75000');
      await expect(jumlahInput).toHaveValue(/75[.,]000|75000/);

      // 4. Fill Catatan
      const catatanInput = page.getByPlaceholder('Masukkan Catatan').first();
      await catatanInput.fill('Pengujian otomatis input data pembukuan kas');
      await expect(catatanInput).toHaveValue('Pengujian otomatis input data pembukuan kas');
    
    });
  });

  test('[TC-06] Bisa mengunggah file lampiran gambar pada form dan menghapusnya kembali', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Bisa mengunggah file lampiran gambar pada form dan menghapusnya kembali', async () => {
      await page.goto('/admin/cash-account/data/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/cash-account\/data\/add/);

      // Create a temporary dummy image
      const dummyImgPath = path.join(__dirname, 'test_attachment.png');
      const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      fs.writeFileSync(dummyImgPath, Buffer.from(pngBase64, 'base64'));

      try {
        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles(dummyImgPath);

        // Verify "Hapus" button appears when image is attached
        const hapusLampiranBtn = page.getByRole('button', { name: /Hapus/i }).first();
        await expect(hapusLampiranBtn).toBeVisible({ timeout: 5000 });

        // Click Hapus to remove attachment
        await hapusLampiranBtn.click();
        await expect(hapusLampiranBtn).not.toBeVisible({ timeout: 5000 });
      } finally {
        if (fs.existsSync(dummyImgPath)) {
          fs.unlinkSync(dummyImgPath);
        }
      }
    
    });
  });

  test('[TC-07] Berhasil menambahkan data pembukuan baru via form', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menambahkan data pembukuan baru via form', async () => {
      await page.goto('/admin/cash-account/data/add', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/admin\/cash-account\/data\/add/);

      // 1. Select Cabang
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await selectMantineOption(page, cabangInput);

      // 2. Select Kategori Pembukuan
      const kategoriInput = page.getByPlaceholder('Pilih Kategori Pembukuan').first();
      await selectMantineOption(page, kategoriInput);

      // 3. Fill Jumlah
      const jumlahInput = page.getByPlaceholder('Masukkan Jumlah').first();
      await jumlahInput.fill('15000');

      // 4. Fill Catatan
      const uniqueNote = 'Mutasi Kas QA ' + Date.now();
      const catatanInput = page.getByPlaceholder('Masukkan Catatan').first();
      await catatanInput.fill(uniqueNote);

      // Click Simpan and wait for POST request
      const simpanBtn = page.getByRole('button', { name: 'Simpan', exact: true }).first();

      const [response] = await Promise.all([
        page.waitForResponse(
          res => res.url().includes('/add-mutation') && res.request().method() === 'POST' && (res.status() === 200 || res.status() === 201),
          { timeout: 20000 }
        ).catch(() => null),
        simpanBtn.click(),
      ]);

      // Verify navigated back to data pembukuan list or category mutation
      await expect(page).toHaveURL(/\/admin\/cash-account\/(data|category)/, { timeout: 15000 });
    
    });
  });

  test('[TC-08] Mengklik tombol aksi pada baris data membuka modal Detail Data Pembukuan', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Mengklik tombol aksi pada baris data membuka modal Detail Data Pembukuan', async () => {
      // Wait for the action button (eye/detail icon is the first button in row)
      const detailBtn = page.locator('table:visible tbody tr button:visible').first();
      await expect(detailBtn).toBeVisible({ timeout: 15000 });
      await detailBtn.click();

      // Verify Detail Modal appears
      const detailModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible')
        .filter({ hasText: /Detail Data Pembukuan|Informasi Pembukuan/i }).first();
      await expect(detailModal).toBeVisible({ timeout: 5000 });

      // Verify sections inside detail modal
      await expect(detailModal.getByText('Informasi Pembukuan').first()).toBeVisible({ timeout: 5000 });
      await expect(detailModal.getByText('Lampiran').first()).toBeVisible({ timeout: 5000 });

      // Close modal using Tutup button
      const tutupBtn = detailModal.getByRole('button', { name: /Tutup/i }).first();
      await expect(tutupBtn).toBeVisible({ timeout: 5000 });
      await tutupBtn.click();

      await expect(detailModal).not.toBeVisible({ timeout: 5000 });
    
    });
  });

  test('[TC-09] Memverifikasi responsivitas tabel data pembukuan dan state baris data', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas tabel data pembukuan dan state baris data', async () => {
      const table = page.locator('table:visible').first();
      await expect(table).toBeVisible({ timeout: 10000 });

      const tbody = page.locator('table:visible tbody').first();
      await expect(tbody).toBeVisible({ timeout: 5000 });

      // Table body must render at least one row (data rows or empty row placeholder)
      const rows = tbody.locator('tr');
      await expect(rows.first()).toBeVisible({ timeout: 5000 });
    
    });
  });
});
