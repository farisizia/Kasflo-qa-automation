const { test, expect } = require('@playwright/test');

test.describe('Login Kasflo Resto', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await test.step('Buka halaman login dan tunggu form terpasang', async () => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      const loader = page.locator('.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible');
      await loader.first().waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
      await expect(page.getByLabel(/Email atau Username/i)).toBeVisible({ timeout: 15000 });
    });
  });

  test('[TC-01] Menampilkan form login', async ({ page }) => {
    await test.step('Verifikasi judul halaman dan komponen form login ditampilkan lengkap', async () => {
      await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);
      await expect(page.getByText('Masuk ke dashboard')).toBeVisible();
      await expect(page.getByLabel(/Email atau Username/i)).toBeVisible();
      await expect(page.getByLabel(/Kata Sandi/i)).toBeVisible();
      await expect(page.getByRole('button', { name: 'Masuk' })).toBeVisible();
    });
  });

  test('[TC-02] Link Lupa kata sandi mengarah ke /forgot-password', async ({ page }) => {
    await test.step('Verifikasi tautan lupa kata sandi mengarah ke halaman reset password', async () => {
      const link = page.getByRole('link', { name: 'Lupa kata sandi?' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', /forgot-password/);
    });
  });

  test('[TC-03] Link Daftar mengarah ke /register', async ({ page }) => {
    await test.step('Verifikasi tautan pendaftaran akun mengarah ke halaman registrasi', async () => {
      const link = page.getByRole('link', { name: 'Daftar' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', /register/);
    });
  });

  test('[TC-04] Validasi field kosong saat klik tombol Masuk', async ({ page }) => {
    await test.step('Klik tombol Masuk tanpa mengisi kredensial dan verifikasi form tetap di halaman login', async () => {
      const loginBtn = page.getByRole('button', { name: 'Masuk' });
      await expect(loginBtn).toBeVisible();
      await expect(loginBtn).toBeEnabled();
      await loginBtn.click();
      await expect(page).toHaveURL(/backoffice-dev\.kasflo\.id\/?$/);
      await expect(page.getByLabel(/Email atau Username/i)).toBeVisible();
    });
  });

  test('[TC-05] Login gagal dengan kredensial yang salah', async ({ page }) => {
    await test.step('Masukkan kredensial yang tidak terdaftar lalu klik Masuk', async () => {
      await page.getByLabel(/Email atau Username/i).fill('user_salah@example.com');
      await page.getByLabel(/Kata Sandi/i).fill('Salah123!');
      const loginBtn = page.getByRole('button', { name: 'Masuk' });
      await expect(loginBtn).toBeVisible();
      await expect(loginBtn).toBeEnabled();
      await loginBtn.click();
    });

    await test.step('Verifikasi sistem menolak login dan pengguna tetap di halaman login', async () => {
      await expect(page).toHaveURL(/backoffice-dev\.kasflo\.id\/?$/);
      await expect(page.getByRole('button', { name: 'Masuk' })).toBeVisible();
    });
  });

  test('[TC-06] Mengisi email dan password pada form login', async ({ page }) => {
    await test.step('Input email dan kata sandi pada form login serta verifikasi nilai input', async () => {
      const email = page.getByLabel(/Email atau Username/i);
      const password = page.getByLabel(/Kata Sandi/i);

      await email.fill('kasfloresto@gmail.com');
      await password.fill('Sandi123@!');

      await expect(email).toHaveValue('kasfloresto@gmail.com');
      await expect(password).toHaveValue('Sandi123@!');
    });
  });

  test('[TC-07] Login berhasil dengan kredensial valid', async ({ page }) => {
    await test.step('Masukkan kredensial valid lalu klik tombol Masuk', async () => {
      await page.getByLabel(/Email atau Username/i).fill('qakasflo@automation.com');
      await page.getByLabel(/Kata Sandi/i).fill('password');
      const loginBtn = page.getByRole('button', { name: 'Masuk' });
      await expect(loginBtn).toBeVisible();
      await expect(loginBtn).toBeEnabled();
      await loginBtn.click();
    });

    await test.step('Verifikasi pengalihan ke dashboard admin dan navigasi utama ditampilkan', async () => {
      // Expect navigasi ke halaman admin dashboard
      await expect(page).toHaveURL(/.*\/admin\/dashboard/, { timeout: 30000 });
      const loader = page.locator('.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible');
      await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      // Verifikasi elemen dashboard muncul
      await expect(page.getByRole('link', { name: /Dashboard/i }).first()).toBeVisible({ timeout: 15000 });
    });
  });
});
