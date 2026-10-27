# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/login.spec.js >> Login Kasflo Resto >> [TC-07] Login berhasil dengan kredensial valid
- Location: tests/Kasflo-Resto/login.spec.js:71:3

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://backoffice-dev.kasflo.id/", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Login Kasflo Resto', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await test.step('Buka halaman login dan tunggu form terpasang', async () => {
> 6  |       await page.goto('/', { waitUntil: 'domcontentloaded' });
     |                  ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  7  |       await expect(page.getByLabel(/Email atau Username/i)).toBeVisible({ timeout: 15000 });
  8  |     });
  9  |   });
  10 | 
  11 |   test('[TC-01] Menampilkan form login', async ({ page }) => {
  12 |     await test.step('Verifikasi judul halaman dan komponen form login ditampilkan lengkap', async () => {
  13 |       await expect(page).toHaveTitle(/Dashboard Kasflo Resto/i);
  14 |       await expect(page.getByText('Masuk ke dashboard')).toBeVisible();
  15 |       await expect(page.getByLabel(/Email atau Username/i)).toBeVisible();
  16 |       await expect(page.getByLabel(/Kata Sandi/i)).toBeVisible();
  17 |       await expect(page.getByRole('button', { name: 'Masuk' })).toBeVisible();
  18 |     });
  19 |   });
  20 | 
  21 |   test('[TC-02] Link Lupa kata sandi mengarah ke /forgot-password', async ({ page }) => {
  22 |     await test.step('Verifikasi tautan lupa kata sandi mengarah ke halaman reset password', async () => {
  23 |       const link = page.getByRole('link', { name: 'Lupa kata sandi?' });
  24 |       await expect(link).toBeVisible();
  25 |       await expect(link).toHaveAttribute('href', /forgot-password/);
  26 |     });
  27 |   });
  28 | 
  29 |   test('[TC-03] Link Daftar mengarah ke /register', async ({ page }) => {
  30 |     await test.step('Verifikasi tautan pendaftaran akun mengarah ke halaman registrasi', async () => {
  31 |       const link = page.getByRole('link', { name: 'Daftar' });
  32 |       await expect(link).toBeVisible();
  33 |       await expect(link).toHaveAttribute('href', /register/);
  34 |     });
  35 |   });
  36 | 
  37 |   test('[TC-04] Validasi field kosong saat klik tombol Masuk', async ({ page }) => {
  38 |     await test.step('Klik tombol Masuk tanpa mengisi kredensial dan verifikasi form tetap di halaman login', async () => {
  39 |       await page.getByRole('button', { name: 'Masuk' }).click();
  40 |       await expect(page).toHaveURL(/backoffice-dev\.kasflo\.id\/?$/);
  41 |       await expect(page.getByLabel(/Email atau Username/i)).toBeVisible();
  42 |     });
  43 |   });
  44 | 
  45 |   test('[TC-05] Login gagal dengan kredensial yang salah', async ({ page }) => {
  46 |     await test.step('Masukkan kredensial yang tidak terdaftar lalu klik Masuk', async () => {
  47 |       await page.getByLabel(/Email atau Username/i).fill('user_salah@example.com');
  48 |       await page.getByLabel(/Kata Sandi/i).fill('Salah123!');
  49 |       await page.getByRole('button', { name: 'Masuk' }).click();
  50 |     });
  51 | 
  52 |     await test.step('Verifikasi sistem menolak login dan pengguna tetap di halaman login', async () => {
  53 |       await expect(page).toHaveURL(/backoffice-dev\.kasflo\.id\/?$/);
  54 |       await expect(page.getByRole('button', { name: 'Masuk' })).toBeVisible();
  55 |     });
  56 |   });
  57 | 
  58 |   test('[TC-06] Mengisi email dan password pada form login', async ({ page }) => {
  59 |     await test.step('Input email dan kata sandi pada form login serta verifikasi nilai input', async () => {
  60 |       const email = page.getByLabel(/Email atau Username/i);
  61 |       const password = page.getByLabel(/Kata Sandi/i);
  62 | 
  63 |       await email.fill('kasfloresto@gmail.com');
  64 |       await password.fill('Sandi123@!');
  65 | 
  66 |       await expect(email).toHaveValue('kasfloresto@gmail.com');
  67 |       await expect(password).toHaveValue('Sandi123@!');
  68 |     });
  69 |   });
  70 | 
  71 |   test('[TC-07] Login berhasil dengan kredensial valid', async ({ page }) => {
  72 |     await test.step('Masukkan kredensial valid lalu klik tombol Masuk', async () => {
  73 |       await page.getByLabel(/Email atau Username/i).fill('qakasflo@automation.com');
  74 |       await page.getByLabel(/Kata Sandi/i).fill('password');
  75 |       await page.getByRole('button', { name: 'Masuk' }).click();
  76 |     });
  77 | 
  78 |     await test.step('Verifikasi pengalihan ke dashboard admin dan navigasi utama ditampilkan', async () => {
  79 |       // Expect navigasi ke halaman admin dashboard
  80 |       await expect(page).toHaveURL(/.*\/admin\/dashboard/, { timeout: 30000 });
  81 |       // Verifikasi elemen dashboard muncul
  82 |       await expect(page.getByRole('link', { name: /Dashboard/i }).first()).toBeVisible({ timeout: 15000 });
  83 |     });
  84 |   });
  85 | });
  86 | 
```