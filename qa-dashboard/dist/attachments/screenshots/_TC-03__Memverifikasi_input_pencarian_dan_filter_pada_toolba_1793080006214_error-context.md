# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Manajemen User/manajemen_user.spec.js >> Manajemen User >> [TC-03] Memverifikasi input pencarian dan filter pada toolbar (Cari disini..., Filter Role, Filter Cabang)
- Location: tests/Kasflo-Resto/Manajemen User/manajemen_user.spec.js:206:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/admin\/.*/
Received string:  "https://backoffice-dev.kasflo.id/"
Timeout: 20000ms

Call log:
  - Expect "toHaveURL" with timeout 20000ms
    44 × locator resolved to <html translate="no" data-mantine-color-scheme="light">…</html>
       - unexpected value "https://backoffice-dev.kasflo.id/"

```

```yaml
- img
- paragraph: Masuk ke dashboard
- text: Email atau Username
- textbox "Email atau Username":
  - /placeholder: "Contoh: kasfloresto@gmail.com atau kasfloresto_123"
  - text: qakasflo@automation.com
- text: Kata Sandi
- textbox "Kata Sandi":
  - /placeholder: "Contoh: Sandi123@!"
  - text: password
- link "Lupa kata sandi?":
  - /url: /forgot-password
  - paragraph: Lupa kata sandi?
- button "Masuk" [disabled]
- paragraph: Belum punya akun Kasflo Resto ?
- link "Daftar":
  - /url: /register
  - paragraph: Daftar
- link "Privacy Policy":
  - /url: https://kasflo.id/privacy-policy
  - paragraph: Privacy Policy
- link "Terms and Condition":
  - /url: https://kasflo.id/terms-and-condition
  - paragraph: Terms and Condition
- paragraph: 2026. PT Topindo Solusi Komunika Tbk
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
  17  |         await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
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
> 42  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
      |                            ^ Error: expect(page).toHaveURL(expected) failed
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
  118 |     await expect(page).toHaveURL(/\/admin\/user-management\/user$/, { timeout: 15000 });
  119 | 
  120 |     return testData;
  121 |   }
  122 | 
  123 |   // Helper menghapus user berdasarkan username
  124 |   async function deleteTestUser(page, username) {
  125 |     const searchInput = page.getByPlaceholder('Cari disini...').first();
  126 |     await searchInput.clear();
  127 |     await searchInput.fill(username);
  128 |     await page.waitForTimeout(1000);
  129 | 
  130 |     const userRow = page.locator('table tbody tr').filter({ hasText: username }).first();
  131 |     if (await userRow.isVisible({ timeout: 5000 }).catch(() => false)) {
  132 |       const deleteBtn = userRow.locator('button:has(.tabler-icon-trash), button[color="red"], button:has(svg)').last();
  133 |       await deleteBtn.click();
  134 | 
  135 |       const modal = page.getByRole('dialog', { name: /Hapus User/i }).or(page.locator('[role="dialog"]')).first();
  136 |       await expect(modal).toBeVisible({ timeout: 5000 });
  137 | 
  138 |       const confirmInput = modal.getByPlaceholder(/Masukan Username Karyawan/i);
  139 |       await confirmInput.fill(username);
  140 | 
  141 |       const confirmHapusBtn = modal.getByRole('button', { name: /^Hapus$/i });
  142 |       await expect(confirmHapusBtn).toBeEnabled({ timeout: 5000 });
```