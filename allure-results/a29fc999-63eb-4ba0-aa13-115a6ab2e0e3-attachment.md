# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/atur_rekening.spec.js >> Atur Rekening >> [TC-02] Menampilkan tabel daftar rekening bank dan status data kosong
- Location: tests/Kasflo-Resto/Pengaturan/atur_rekening.spec.js:104:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel(/Email atau Username/i)
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByLabel(/Email atau Username/i) with timeout 20000ms
  - waiting for getByLabel(/Email atau Username/i)

```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Atur Rekening', () => {
  4   |   // Helper login yang konsisten dan stabil
  5   |   async function loginBeforeTest(page) {
  6   |     if (page.url().includes('/admin/')) return page;
  7   |     try {
  8   |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
  9   |     } catch {
  10  |       if (page.url().includes('/admin/')) return page;
  11  |     }
  12  |     if (page.url().includes('/admin/')) return page;
  13  | 
  14  |     const emailInput = page.getByLabel(/Email atau Username/i);
> 15  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
      |                              ^ Error: expect(locator).toBeVisible() failed
  16  |     await emailInput.fill('qakasflo@automation.com');
  17  |     const pwdInput = page.getByLabel(/Kata Sandi/i);
  18  |     await pwdInput.fill('password');
  19  | 
  20  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  21  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  22  |     await pwdInput.press('Enter').catch(() => {});
  23  |     await loginBtn.click({ timeout: 3000 }).catch(() => {});
  24  | 
  25  |     try {
  26  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  27  |     } catch {
  28  |       if (!page.url().includes('/admin/')) {
  29  |         await page.waitForTimeout(1500);
  30  |         if (await loginBtn.isEnabled().catch(() => false)) {
  31  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  32  |         }
  33  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  34  |       }
  35  |     }
  36  |     return page;
  37  |   }
  38  | 
  39  |   test.beforeEach(async ({ page }) => {
  40  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  41  |       // Intercept subscription API agar fitur pengaturan aktif penuh tanpa modal upgrade
  42  |       await page.route('**/subscription**', async route => {
  43  |         try {
  44  |           const response = await route.fetch();
  45  |           const json = await response.json();
  46  |           if (json.data && json.data.active_features) {
  47  |             for (const key of Object.keys(json.data.active_features)) {
  48  |               if (typeof json.data.active_features[key] === 'boolean') {
  49  |                 json.data.active_features[key] = true;
  50  |               }
  51  |             }
  52  |           }
  53  |           await route.fulfill({ json });
  54  |         } catch {
  55  |           await route.continue().catch(() => {});
  56  |         }
  57  |       });
  58  | 
  59  |       await loginBeforeTest(page);
  60  |       try {
  61  |         await page.goto('/admin/setting/bank-account', { waitUntil: 'domcontentloaded', timeout: 25000 });
  62  |       } catch {
  63  |         await page.goto('/admin/setting/bank-account', { waitUntil: 'commit', timeout: 25000 });
  64  |       }
  65  |       await expect(page).toHaveURL(/\/admin\/setting\/bank-account/, { timeout: 20000 });
  66  |     
  67  |     });
  68  |   });
  69  | 
  70  |   test('[TC-01] Menampilkan seluruh elemen utama halaman Atur Rekening', async ({ page }) => {
  71  |     await test.step('Verifikasi bahwa sistem berhasil menampilkan seluruh elemen utama halaman Atur Rekening', async () => {
  72  |       // 1. Breadcrumb
  73  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root, main').filter({ hasText: 'Atur Rekening' });
  74  |       await expect(breadcrumb.first()).toBeVisible({ timeout: 10000 });
  75  | 
  76  |       // 2. Card Jumlah Rekening Bank (contoh: 0/5 Rekening Bank)
  77  |       const rekeningCard = page.locator('.mantine-Paper-root').filter({ hasText: 'Jumlah Rekening Bank' }).first();
  78  |       await expect(rekeningCard).toBeVisible();
  79  |       await expect(rekeningCard).toContainText(/Rekening Bank/i);
  80  | 
  81  |       // 3. Section Penarikan Dana
  82  |       const tarikDanaCard = page.locator('.mantine-Paper-root').filter({ hasText: 'Penarikan Dana' }).first();
  83  |       await expect(tarikDanaCard).toBeVisible();
  84  |       await expect(tarikDanaCard).toContainText('Tarik Dana ke Rekening Bank Terdaftar');
  85  |       const tarikDanaBtn = tarikDanaCard.getByRole('button', { name: 'Tarik Dana' });
  86  |       await expect(tarikDanaBtn).toBeVisible();
  87  | 
  88  |       // 4. Section PIN Transaksi & Keamanan
  89  |       const pinCard = page.locator('.mantine-Paper-root').filter({ hasText: 'PIN Transaksi & Keamanan' }).first();
  90  |       await expect(pinCard).toBeVisible();
  91  |       await expect(pinCard).toContainText('Penggantian PIN Transaksi');
  92  |       const gantiPinBtn = pinCard.getByRole('button', { name: 'Ganti PIN' });
  93  |       await expect(gantiPinBtn).toBeVisible();
  94  | 
  95  |       // 5. Section Daftar Rekening & Tombol Tambah Rekening
  96  |       const daftarRekeningCard = page.locator('.mantine-Paper-root').filter({ hasText: 'Daftar Rekening' }).first();
  97  |       await expect(daftarRekeningCard).toBeVisible();
  98  |       const tambahBtn = daftarRekeningCard.getByRole('button', { name: 'Tambah Rekening' });
  99  |       await expect(tambahBtn).toBeVisible();
  100 |     
  101 |     });
  102 |   });
  103 | 
  104 |   test('[TC-02] Menampilkan tabel daftar rekening bank dan status data kosong', async ({ page }) => {
  105 |     await test.step('Verifikasi bahwa sistem berhasil menampilkan tabel daftar rekening bank dan status data kosong', async () => {
  106 |       const daftarRekeningCard = page.locator('.mantine-Paper-root').filter({ hasText: 'Daftar Rekening' }).first();
  107 |       await expect(daftarRekeningCard).toBeVisible();
  108 | 
  109 |       // Memverifikasi kolom-kolom tabel header
  110 |       const headers = daftarRekeningCard.locator('table thead th');
  111 |       await expect(headers.nth(0)).toContainText('No');
  112 |       await expect(headers.nth(1)).toContainText('Bank');
  113 |       await expect(headers.nth(2)).toContainText('Nomor Rekening');
  114 |       await expect(headers.nth(3)).toContainText('Nama Pemilik');
  115 |       await expect(headers.nth(4)).toContainText('Status');
```