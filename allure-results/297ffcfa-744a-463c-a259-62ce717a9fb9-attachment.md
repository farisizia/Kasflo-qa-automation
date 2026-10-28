# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Promosi/kampanye_promosi.spec.js >> Kampanye Promosi >> [TC-02] Navigasi ke form buat kampanye baru dan memverifikasi seluruh komponen form
- Location: tests/Kasflo-Resto/Promosi/kampanye_promosi.spec.js:221:3

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
  3   | test.describe('Kampanye Promosi', () => {
  4   |   // Helper selector for actual data rows (excluding empty placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  7   |   }
  8   | 
  9   |   // Shared resilient login helper
  10  |   async function loginBeforeTest(page) {
  11  |     if (page.url().includes('/admin/')) {
  12  |       return page;
  13  |     }
  14  | 
  15  |     try {
  16  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 25000 });
  17  |     } catch {
  18  |       await page.goto('/', { waitUntil: 'commit', timeout: 25000 });
  19  |     }
  20  | 
  21  |     if (page.url().includes('/admin/')) {
  22  |       return page;
  23  |     }
  24  | 
  25  |     const emailInput = page.getByLabel(/Email atau Username/i);
  26  |     await expect(emailInput).toBeVisible({ timeout: 15000 });
  27  | 
  28  |     await emailInput.fill('qakasflo@automation.com');
  29  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  30  | 
  31  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  32  |     await expect(loginBtn).toBeEnabled({ timeout: 5000 });
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
  53  |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible')
  54  |         .filter({ hasText: optionText }).first();
  55  |       if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  56  |         await option.click();
  57  |         return;
  58  |       }
  59  |     }
  60  | 
  61  |     // Default: click first visible option
  62  |     const firstOption = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-Select-item:visible').first();
  63  |     await expect(firstOption).toBeVisible({ timeout: 5000 });
  64  |     await firstOption.click();
  65  |   }
  66  | 
  67  |   // Helper to create a Promotion Campaign
  68  |   async function createPromotionCampaign(page, campaignName) {
  69  |     const addBtn = page.getByRole('button', { name: /Buat Kampanye Baru/i })
  70  |       .or(page.getByRole('link', { name: /Buat Kampanye Baru/i })).first();
  71  |     await expect(addBtn).toBeVisible({ timeout: 10000 });
  72  |     await addBtn.click();
  73  | 
  74  |     await expect(page).toHaveURL(/\/admin\/promotion\/campaign\/add/, { timeout: 15000 });
  75  | 
  76  |     // 1. Nama Promo
  77  |     const nameInput = page.getByPlaceholder(/Masukan Nama Promo|Masukkan Nama Promo/i).first();
  78  |     await expect(nameInput).toBeVisible({ timeout: 10000 });
  79  |     await nameInput.fill(campaignName);
  80  | 
  81  |     // 2. Cabang
  82  |     const cabangInput = page.getByPlaceholder('Pilih Cabang').first();
  83  |     await expect(cabangInput).toBeVisible({ timeout: 10000 });
  84  |     await selectMantineOption(page, cabangInput);
  85  | 
  86  |     // 3. Tanggal Mulai
  87  |     const startBtn = page.locator('button[data-dates-input="true"]').nth(0);
  88  |     await expect(startBtn).toBeVisible({ timeout: 5000 });
  89  |     await startBtn.click();
  90  |     const startPopover = page.locator('.mantine-Popover-dropdown:visible').last();
  91  |     await expect(startPopover).toBeVisible({ timeout: 5000 });
  92  |     await startPopover.locator('td button:not([data-disabled])').first().click();
  93  | 
  94  |     // 4. Tanggal Berakhir
  95  |     const endBtn = page.locator('button[data-dates-input="true"]').nth(1);
  96  |     await expect(endBtn).toBeVisible({ timeout: 5000 });
  97  |     await endBtn.click();
  98  |     const endPopover = page.locator('.mantine-Popover-dropdown:visible').last();
  99  |     await expect(endPopover).toBeVisible({ timeout: 5000 });
  100 |     await endPopover.locator('td button:not([data-disabled])').last().click();
  101 | 
  102 |     // 5. Kode Promo
  103 |     const kodeInput = page.getByPlaceholder(/Masukkan Kode Promo|Masukan Kode Promo/i);
  104 |     if (await kodeInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  105 |       await kodeInput.fill('QA' + Math.floor(Math.random() * 9000 + 1000));
  106 |     }
  107 | 
  108 |     // 6. Diskon
  109 |     const diskonInput = page.getByPlaceholder(/Masukan Persentase Diskon|Masukan Diskon/i);
  110 |     if (await diskonInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  111 |       await diskonInput.fill('10');
  112 |     }
  113 | 
  114 |     // 7. Maksimal Diskon
  115 |     const maxDiskon = page.getByPlaceholder(/Masukan Maksimal Diskon/i);
  116 |     if (await maxDiskon.isVisible({ timeout: 3000 }).catch(() => false)) {
  117 |       await maxDiskon.fill('10000');
  118 |     }
  119 | 
  120 |     // 8. Minimal Transaksi
  121 |     const minTrx = page.getByPlaceholder(/Masukan Minimal Transaksi/i);
  122 |     if (await minTrx.isVisible({ timeout: 3000 }).catch(() => false)) {
  123 |       await minTrx.fill('20000');
  124 |     }
  125 | 
  126 |     // 9. Metode Pembayaran
  127 |     const paymentInput = page.getByPlaceholder(/Metode Pembayaran/i);
  128 |     if (await paymentInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  129 |       await paymentInput.click();
  130 |       const paymentOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible, .mantine-MultiSelect-option:visible').first();
  131 |       if (await paymentOpt.isVisible({ timeout: 3000 }).catch(() => false)) {
  132 |         await paymentOpt.click();
  133 |       }
  134 |       await page.keyboard.press('Escape');
  135 |     }
  136 | 
  137 |     // 10. Platform Promosi: Check POS
  138 |     const posCheckbox = page.getByRole('checkbox', { name: /POS/i });
  139 |     if (await posCheckbox.isVisible({ timeout: 3000 }).catch(() => false)) {
  140 |       await posCheckbox.check();
  141 |     }
  142 | 
```