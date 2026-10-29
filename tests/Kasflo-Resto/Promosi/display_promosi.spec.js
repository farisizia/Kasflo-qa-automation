const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Display Promosi', () => {
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
    const currentVal = await inputLocator.inputValue().catch(() => '');
    if (optionText && currentVal && currentVal.toLowerCase() === optionText.toLowerCase()) {
      return;
    }

    await inputLocator.click();

    if (optionText) {
      const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible')
        .filter({ hasText: new RegExp(`^${optionText}$`, 'i') }).first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click();
        return;
      }
    }

    const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
  }

  // Helper to ensure banner slot is available by deleting one image if full (max 3)
  async function ensureBannerSlotAvailable(page) {
    const tambahBtn = page.getByRole('button', { name: /Tambah Gambar/i });
    if (await tambahBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      if (await tambahBtn.isDisabled()) {
        const lastCard = page.locator('.mantine-SimpleGrid-root > div').last();
        await lastCard.hover();
        const hapusBtn = lastCard.getByRole('button', { name: /Hapus/i });
        if (await hapusBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await hapusBtn.click();
          const confirmBtn = page.locator('.mantine-Modal-content button:has-text("Hapus")').first();
          await expect(confirmBtn).toBeVisible({ timeout: 5000 });
          await confirmBtn.click();
          await expect(confirmBtn).not.toBeVisible({ timeout: 10000 });
          await waitForPageReady(page);
        }
      }
    }
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
      // Step 1: Login
      await loginBeforeTest(page);

      // Step 2: Navigate to Display Promosi page
      await page.goto('/admin/promotion/display', { waitUntil: 'domcontentloaded' });

      // Step 3: Verify page URL loaded
      await expect(page).toHaveURL(/\/admin\/promotion\/display/, { timeout: 15000 });
    
    });
  });

  test('[TC-01] Menampilkan halaman Display Promosi dengan breadcrumb, dropdown cabang, dan dropdown tipe file', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan halaman Display Promosi dengan breadcrumb, dropdown cabang, dan dropdown tipe file', async () => {
      // Breadcrumb verification
      const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
      await expect(breadcrumb).toBeVisible({ timeout: 10000 });
      await expect(breadcrumb.getByText('Display Promosi')).toBeVisible();

      // Dropdown Cabang verification
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible({ timeout: 5000 });

      // Dropdown Tipe File verification
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await expect(tipeFileInput).toBeVisible({ timeout: 5000 });

      // Label Tipe File verification
      await expect(page.locator('label:has-text("Tipe File")').first()).toBeVisible();
    
    });
  });

  test('[TC-02] Menampilkan state tipe file atau informasi display promosi', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan state tipe file atau informasi display promosi', async () => {
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await expect(tipeFileInput).toBeVisible();

      const val = await tipeFileInput.inputValue();
      if (!val) {
        const emptyStateText = page.getByText(/Pilih tipe file terlebih dahulu/i).first();
        await expect(emptyStateText).toBeVisible({ timeout: 5000 });
      } else {
        // Jika tipe file sudah terpilih (misal default Gambar), tombol Tambah Gambar atau dropzone atau list card tampil
        const hasContent = (await page.getByRole('button', { name: /Tambah/i }).count() > 0)
          || (await page.locator('input[type="file"]').count() > 0)
          || (await page.locator('.mantine-SimpleGrid-root').count() > 0);
        expect(hasContent).toBeTruthy();
      }
    
    });
  });

  test('[TC-03] Dropdown Tipe File menyediakan opsi Gambar dan Video', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Dropdown Tipe File menyediakan opsi Gambar dan Video', async () => {
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await tipeFileInput.click();

      // Verify option Gambar
      const gambarOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /^Gambar$/i }).first();
      await expect(gambarOption).toBeVisible({ timeout: 5000 });

      // Verify option Video
      const videoOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
        .filter({ hasText: /^Video$/i }).first();
      await expect(videoOption).toBeVisible({ timeout: 5000 });

      // Close dropdown
      await page.keyboard.press('Escape');
    
    });
  });

  test('[TC-04] Memilih tipe file Gambar menampilkan area upload atau list display promosi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memilih tipe file Gambar menampilkan area upload atau list display promosi', async () => {
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await selectMantineOption(page, tipeFileInput, 'Gambar');

      // Memastikan elemen display promosi gambar tampil (tombol Tambah Gambar, grid item, atau dropzone)
      const tambahBtn = page.getByRole('button', { name: /Tambah Gambar/i });
      const hasGrid = await page.locator('.mantine-SimpleGrid-root').count() > 0;
      const hasDropzone = await page.locator('input[type="file"]').count() > 0;

      expect(await tambahBtn.isVisible().catch(() => false) || hasGrid || hasDropzone).toBeTruthy();
    
    });
  });

  test('[TC-05] Memilih tipe file Video menampilkan area upload video dan tombol aksi', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Memilih tipe file Video menampilkan area upload video dan tombol aksi', async () => {
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await selectMantineOption(page, tipeFileInput, 'Video');

      // Action buttons / dropzone area
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        await expect(fileInput.first()).toBeAttached({ timeout: 5000 });
      }
      const hasVideoUI = (await page.getByRole('button', { name: /Upload/i }).count() > 0)
        || (await page.getByRole('button', { name: /Tambah Video/i }).count() > 0)
        || (await page.getByText(/Video/i).count() > 0);
      expect(hasVideoUI).toBeTruthy();
    
    });
  });

  test('[TC-06] Tombol Batal dapat diklik dan menutup modal form upload', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol Batal dapat diklik dan menutup modal form upload', async () => {
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await selectMantineOption(page, tipeFileInput, 'Gambar');

      // Pastikan slot tersedia jika ingin membuka modal via Tambah Gambar
      await ensureBannerSlotAvailable(page);

      const tambahBtn = page.getByRole('button', { name: /Tambah Gambar/i });
      if (await tambahBtn.isEnabled().catch(() => false)) {
        await tambahBtn.click();
        const modal = page.locator('.mantine-Modal-content, [role="dialog"]').first();
        await expect(modal).toBeVisible({ timeout: 5000 });

        const batalBtn = modal.getByRole('button', { name: /Batal/i }).first();
        await expect(batalBtn).toBeVisible();
        await batalBtn.click();

        await expect(modal).not.toBeVisible({ timeout: 5000 });
      } else {
        const batalBtn = page.getByRole('button', { name: /Batal/i }).first();
        if (await batalBtn.isVisible().catch(() => false)) {
          await batalBtn.click();
          await waitForPageReady(page);
        }
        await expect(page).toHaveURL(/\/admin\/promotion\/display/);
      }
    
    });
  });

  test('[TC-07] Dropdown Cabang dapat dibuka dan dipilih dengan opsi cabang yang tersedia', async ({ page }) => {
    await test.step('Buka dan periksa rincian: Dropdown Cabang dapat dibuka dan dipilih dengan opsi cabang yang tersedia', async () => {
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      await expect(cabangInput).toBeVisible();

      await cabangInput.click();

      const options = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
      await expect(options.first()).toBeVisible({ timeout: 5000 });
      const optionCount = await options.count();
      expect(optionCount).toBeGreaterThan(0);

      // Select first option
      await options.first().click();

      // Value should not be empty
      await expect(cabangInput).not.toHaveValue('');
    
    });
  });

  test('[TC-08] Tombol refresh cabang dapat diklik tanpa error', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Tombol refresh cabang dapat diklik tanpa error', async () => {
      // ActionIcon refresh next to Cabang selector
      const refreshBtn = page.locator('.mantine-Select-section button, button:has(.tabler-icon-refresh)').first();
      if (await refreshBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await refreshBtn.click();
        await waitForPageReady(page);
        await expect(page).toHaveURL(/\/admin\/promotion\/display/);
      }
    
    });
  });

  test('[TC-09] Validasi tombol Upload nonaktif ketika belum ada file yang dipilih', async ({ page }) => {
    await test.step('Validasi tombol Upload nonaktif ketika belum ada file yang dipilih', async () => {
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await selectMantineOption(page, tipeFileInput, 'Gambar');

      // Pastikan slot tersedia
      await ensureBannerSlotAvailable(page);

      const tambahBtn = page.getByRole('button', { name: /Tambah Gambar/i });
      if (await tambahBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(tambahBtn).toBeEnabled({ timeout: 5000 });
        await tambahBtn.click();

        const modal = page.locator('.mantine-Modal-content, [role="dialog"]').first();
        await expect(modal).toBeVisible({ timeout: 5000 });

        const uploadBtn = modal.getByRole('button', { name: /Upload/i }).first();
        await expect(uploadBtn).toBeDisabled();

        // Tutup modal
        await modal.getByRole('button', { name: /Batal/i }).first().click();
        await expect(modal).not.toBeVisible({ timeout: 5000 });
      } else {
        const uploadBtn = page.getByRole('button', { name: /Upload/i }).first();
        await expect(uploadBtn).toBeDisabled();
      }
    
    });
  });

  test('[TC-10] Berhasil menambahkan data display promosi (upload banner gambar) baru', async ({ page }) => {
    await test.step('Langkah Pengujian UAT: Berhasil menambahkan data display promosi (upload banner gambar) baru', async () => {
      // Pastikan cabang terpilih
      const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
      if (!(await cabangInput.inputValue())) {
        await selectMantineOption(page, cabangInput);
      }

      // Pastikan tipe file Gambar terpilih
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await selectMantineOption(page, tipeFileInput, 'Gambar');

      // Pastikan slot banner tersedia (maksimal 3 gambar)
      await ensureBannerSlotAvailable(page);

      const tambahBtn = page.getByRole('button', { name: /Tambah Gambar/i });
      let container = page;
      let isModal = false;

      if (await tambahBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(tambahBtn).toBeEnabled({ timeout: 5000 });
        await tambahBtn.click();

        const modal = page.locator('.mantine-Modal-content, [role="dialog"]').first();
        await expect(modal).toBeVisible({ timeout: 5000 });
        container = modal;
        isModal = true;

        // Pilih opsi Urutan yang tersedia di modal
        const urutanInput = modal.getByPlaceholder('Pilih Urutan');
        if (await urutanInput.isVisible({ timeout: 3000 }).catch(() => false)) {
          await urutanInput.click();
          const urutanOptions = page.locator('[role="option"]:visible, .mantine-Select-option:visible');
          if (await urutanOptions.count() > 0) {
            await urutanOptions.last().click();
          }
        }
      }

      // Buat file gambar temporary valid (1x1 PNG)
      const dummyImagePath = path.join(__dirname, `test_promo_${Date.now()}.png`);
      const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      fs.writeFileSync(dummyImagePath, Buffer.from(pngBase64, 'base64'));

      try {
        // Upload file ke dropzone
        const fileInput = container.locator('input[type="file"]').first();
        await fileInput.setInputFiles(dummyImagePath);

        // Verifikasi tombol Upload menjadi aktif
        const uploadBtn = container.getByRole('button', { name: /Upload/i }).first();
        await expect(uploadBtn).toBeEnabled({ timeout: 5000 });

        // Siapkan listener response API promosi customer display
        const responsePromise = page.waitForResponse(
          (res) => res.url().includes('promotion-customer-display') && res.request().method() === 'POST',
          { timeout: 15000 }
        );

        // Klik tombol Upload
        await uploadBtn.click();

        // Verifikasi response API 200 OK
        const response = await responsePromise;
        expect(response.status()).toBe(200);

        // Verifikasi modal tertutup jika dibuka via modal
        if (isModal) {
          await expect(container).not.toBeVisible({ timeout: 10000 });
        }

        // Verifikasi media banner promosi tampil di grid
        await waitForPageReady(page);
        await expect(page.locator('.mantine-SimpleGrid-root img:visible, img[src*="topindoku"]:visible').first()).toBeVisible({ timeout: 10000 });
      } finally {
        // Bersihkan file temporary
        if (fs.existsSync(dummyImagePath)) {
          fs.unlinkSync(dummyImagePath);
        }
      }
    
    });
  });

  test('[TC-11] Menampilkan opsi aksi Edit dan Hapus pada item display promosi yang sudah ada', async ({ page }) => {
    await test.step('Verifikasi bahwa sistem berhasil menampilkan opsi aksi Edit dan Hapus pada item display promosi yang sudah ada', async () => {
      const tipeFileInput = page.getByPlaceholder('Pilih Tipe File').first();
      await selectMantineOption(page, tipeFileInput, 'Gambar');

      const cards = page.locator('.mantine-SimpleGrid-root > div');
      if (await cards.count() > 0) {
        const firstCard = cards.first();
        await firstCard.hover();

        // Cek tombol Edit atau Hapus di dalam card
        const editBtn = firstCard.getByRole('button', { name: /Edit/i }).first();
        const hapusBtn = firstCard.getByRole('button', { name: /Hapus/i }).first();
        const hasAction = (await editBtn.count() > 0) || (await hapusBtn.count() > 0);
        expect(hasAction).toBeTruthy();
      }
    
    });
  });
});
