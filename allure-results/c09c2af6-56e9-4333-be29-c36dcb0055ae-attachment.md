# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Manajemen User/manajemen_user.spec.js >> Manajemen User >> [TC-13] Modal konfirmasi hapus menjaga tombol Hapus tetap nonaktif jika username salah ketik
- Location: tests/Kasflo-Resto/Manajemen User/manajemen_user.spec.js:537:3

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
Call log:
  - navigating to "https://backoffice-dev.kasflo.id/", waiting until "commit"

```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Manajemen User', () => {
  4   |   // Shared resilient login helper
  5   |   async function loginBeforeTest(page) {
  6   |     if (page.url().includes('/admin/')) {
  7   |       return page;
  8   |     }
  9   | 
  10  |     try {
  11  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  12  |     } catch {
  13  |       await page.waitForTimeout(500);
  14  |       try {
  15  |         await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  16  |       } catch {
> 17  |         await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
      |                    ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://backoffice-dev.kasflo.id/
  18  |       }
  19  |     }
  20  | 
  21  |     if (page.url().includes('/admin/')) {
  22  |       return page;
  23  |     }
  24  | 
  25  |     const emailInput = page.getByLabel(/Email atau Username/i);
  26  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  27  | 
  28  |     await emailInput.fill('qakasflo@automation.com');
  29  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  30  | 
  31  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  32  |     await expect(loginBtn).toBeEnabled({ timeout: 10000 });
  33  |     await loginBtn.click();
  34  | 
  35  |     try {
  36  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 30000 });
  37  |     } catch {
  38  |       if (!page.url().includes('/admin/')) {
  39  |         if (await loginBtn.isEnabled().catch(() => false)) {
  40  |           await loginBtn.click({ timeout: 3000 }).catch(() => {});
  41  |         }
  42  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  43  |       }
  44  |     }
  45  |     return page;
  46  |   }
  47  | 
  48  |   // Helper to select an option in a Mantine Select dropdown
  49  |   async function selectMantineOption(page, inputLocator, optionText) {
  50  |     await inputLocator.click();
  51  | 
  52  |     if (optionText) {
  53  |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
  54  |         .filter({ hasText: optionText }).first();
  55  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  56  |         await option.click();
  57  |         return;
  58  |       }
  59  |     }
  60  | 
  61  |     const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  62  |     if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  63  |       await firstOption.click();
  64  |     } else {
  65  |       await page.keyboard.press('Escape');
  66  |     }
  67  |   }
  68  | 
  69  |   // Helper membuat user staff baru untuk pengujian
  70  |   async function createTestUser(page, role = 'Staff') {
  71  |     const uid = Date.now().toString().slice(-6);
  72  |     const testData = {
  73  |       name: `Karyawan QA ${uid}`,
  74  |       email: `qa_staff_${uid}@kasflomail.com`,
  75  |       username: `staff_${uid}`,
  76  |       password: 'Password123!',
  77  |       role: role
  78  |     };
  79  | 
  80  |     await page.goto('/admin/user-management/user/add', { waitUntil: 'domcontentloaded' });
  81  |     await expect(page).toHaveURL(/\/admin\/user-management\/user\/add/);
  82  | 
  83  |     await page.getByPlaceholder('Masukkan Nama').fill(testData.name);
  84  |     await page.getByPlaceholder('Masukkan Email').fill(testData.email);
  85  |     await page.getByPlaceholder('Masukkan Username').fill(testData.username);
  86  | 
  87  |     // Cabang
  88  |     const cabangInput = page.getByPlaceholder('Pilih Cabang');
  89  |     await cabangInput.click();
  90  |     const firstCabang = page.locator('[role="option"]:visible, .mantine-Select-option:visible').first();
  91  |     await expect(firstCabang).toBeVisible({ timeout: 5000 });
  92  |     await firstCabang.click();
  93  | 
  94  |     // Password
  95  |     await page.getByPlaceholder('Masukkan Kata Sandi').fill(testData.password);
  96  |     await page.getByPlaceholder('Masukkan Konfirmasi Kata Sandi').fill(testData.password);
  97  | 
  98  |     // Role
  99  |     const roleInput = page.getByPlaceholder('Pilih Role');
  100 |     await roleInput.click();
  101 |     const staffOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible')
  102 |       .filter({ hasText: new RegExp(`^${role}$`, 'i') }).first();
  103 |     if (await staffOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  104 |       await staffOption.click();
  105 |     } else {
  106 |       await page.locator('[role="option"]:visible, .mantine-Select-option:visible').first().click();
  107 |     }
  108 | 
  109 |     // Nomor WhatsApp (Wajib Diisi)
  110 |     const waInput = page.getByPlaceholder(/Masukkan Nomor WhatsApp/i).or(page.getByLabel(/Nomor WhatsApp/i)).first();
  111 |     if (await waInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  112 |       await waInput.fill('081234' + uid);
  113 |     }
  114 | 
  115 |     // Submit
  116 |     const simpanBtn = page.getByRole('button', { name: /Simpan/i }).first();
  117 |     await simpanBtn.click();
```