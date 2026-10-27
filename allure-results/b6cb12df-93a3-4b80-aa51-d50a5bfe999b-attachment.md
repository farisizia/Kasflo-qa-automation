# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Katalog/menu_self_order.spec.js >> Menu Self Order >> [TC-10] Cari/filter menu pada halaman edit menu self order
- Location: tests/Katalog/menu_self_order.spec.js:468:3

# Error details

```
TimeoutError: locator.innerText: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('table:visible tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first()

```

# Page snapshot

```yaml
- generic [ref=f4e2]:
  - generic [ref=f4e3]:
    - navigation [ref=f4e4]:
      - generic [ref=f4e5]:
        - link [ref=f4e6] [cursor=pointer]:
          - /url: /admin/dashboard
          - paragraph [ref=f4e14]: Dashboard
        - link [ref=f4e15] [cursor=pointer]:
          - /url: /admin/catalog
          - paragraph [ref=f4e23]: Katalog
        - generic [ref=f4e28]:
          - link "Kategori" [ref=f4e29] [cursor=pointer]:
            - /url: /admin/catalog/category
          - link "Menu" [ref=f4e31] [cursor=pointer]:
            - /url: /admin/catalog/menu
          - link "Varian" [ref=f4e33] [cursor=pointer]:
            - /url: /admin/catalog/variant
          - link "Buku Menu" [ref=f4e35] [cursor=pointer]:
            - /url: /admin/catalog/book-menu
          - link "Manajemen Stok" [ref=f4e37] [cursor=pointer]:
            - /url: /admin/catalog/stock
          - link "Menu Self Order" [ref=f4e39] [cursor=pointer]:
            - /url: /admin/catalog/self-order-menu
        - link [ref=f4e41] [cursor=pointer]:
          - /url: /admin/ingredients
          - paragraph [ref=f4e49]: Bahan Baku
        - link [ref=f4e53] [cursor=pointer]:
          - /url: /admin/promotion
          - paragraph [ref=f4e61]: Promosi
        - link [ref=f4e65] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f4e74]: Pelanggan
        - link [ref=f4e78] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f4e86]: Pembukuan
        - link [ref=f4e90] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f4e98]: Laporan Usaha
        - link [ref=f4e102] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f4e110]: Manajemen User
        - link [ref=f4e114] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f4e121]: Pengaturan
        - link [ref=f4e125] [cursor=pointer]:
          - /url: /admin/subscription
          - paragraph [ref=f4e132]: Berlangganan
    - main [ref=f4e133]:
      - generic [ref=f4e134]:
        - generic [ref=f4e135]:
          - paragraph [ref=f4e136]: Subscription akan berakhir dalam 7 hari.
          - link [ref=f4e137] [cursor=pointer]:
            - /url: /admin/subscription?tab=history-subscription
            - paragraph [ref=f4e138]: Kunjungi Halaman Berlangganan
        - generic [ref=f4e140]:
          - paragraph [ref=f4e145]: Menu Self Order
          - generic [ref=f4e146]:
            - button "Business" [ref=f4e148] [cursor=pointer]
            - button "Saldo QRIS" [ref=f4e156] [cursor=pointer]
            - button [ref=f4e162] [cursor=pointer]:
              - generic [ref=f4e169]:
                - paragraph [ref=f4e170]: Kasflo Automation
                - paragraph [ref=f4e171]: OWNER
        - generic [ref=f4e176]:
          - link [ref=f4e177] [cursor=pointer]:
            - /url: /admin/dashboard
          - generic [ref=f4e181]: /
          - paragraph [ref=f4e182]: Menu Self Order
        - generic [ref=f4e185]:
          - generic [ref=f4e187]:
            - textbox "Cari disini..." [ref=f4e190]
            - generic [ref=f4e192]:
              - button "Show/Hide columns" [ref=f4e193] [cursor=pointer]
              - button "Toggle full screen" [ref=f4e196] [cursor=pointer]
          - table [ref=f4e204]:
            - rowgroup [ref=f4e205]:
              - row [ref=f4e206]:
                - columnheader "Cabang Sort by Cabang descending Move Column Actions" [ref=f4e207]:
                  - generic [ref=f4e208]:
                    - generic [ref=f4e209] [cursor=pointer]:
                      - generic [ref=f4e210]: Cabang
                      - button "Sort by Cabang descending" [ref=f4e211]
                    - generic [ref=f4e216]:
                      - button "Move" [ref=f4e217]
                      - button "Column Actions" [ref=f4e226] [cursor=pointer]
                - columnheader "Buku Menu Sort by Buku Menu descending Move Column Actions" [ref=f4e232]:
                  - generic [ref=f4e233]:
                    - generic [ref=f4e234] [cursor=pointer]:
                      - generic [ref=f4e235]: Buku Menu
                      - button "Sort by Buku Menu descending" [ref=f4e236]
                    - generic [ref=f4e241]:
                      - button "Move" [ref=f4e242]
                      - button "Column Actions" [ref=f4e251] [cursor=pointer]
                - columnheader "Action" [ref=f4e257]
            - rowgroup [ref=f4e261]:
              - row [ref=f4e262]:
                - cell [ref=f4e263]:
                  - generic [ref=f4e265]:
                    - img "not-found" [ref=f4e266]
                    - paragraph [ref=f4e267]: Belum Ada Data
            - rowgroup
          - generic [ref=f4e271]:
            - generic [ref=f4e272]:
              - paragraph [ref=f4e273]: Rows per page
              - textbox "Rows per page" [ref=f4e276] [cursor=pointer]: "25"
            - paragraph [ref=f4e277]: 0-0 of 0
            - generic [ref=f4e278]:
              - button "Go to previous page" [disabled] [ref=f4e279]
              - button "Go to next page" [disabled] [ref=f4e283]
  - link "Konsultasi Sekarang" [ref=f4e287] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Menu Self Order', () => {
  4   |   // Helper selector for actual data rows (excluding empty placeholder row)
  5   |   function getDataRows(page) {
  6   |     return page.locator('table:visible tbody tr:not(:has-text("Belum Ada Data")):not(:has-text("No results found"))');
  7   |   }
  8   | 
  9   |   // Helper to safely get the first data row or null if table is empty
  10  |   async function getTargetRow(page) {
  11  |     const targetCell = page.locator('table:visible tbody tr td:first-child').filter({ hasNotText: /Belum Ada Data|No results found/i }).first();
  12  |     if (await targetCell.count() === 0 || !(await targetCell.isVisible({ timeout: 5000 }).catch(() => false))) {
  13  |       return null;
  14  |     }
> 15  |     const text = (await targetCell.innerText()).trim();
      |                                    ^ TimeoutError: locator.innerText: Timeout 15000ms exceeded.
  16  |     if (!text) return null;
  17  |     return page.locator('table:visible tbody tr').filter({ hasText: text }).first();
  18  |   }
  19  | 
  20  |   // Shared resilient login helper
  21  |   async function loginBeforeTest(page) {
  22  |     if (page.url().includes('/admin/')) {
  23  |       return page;
  24  |     }
  25  | 
  26  |     try {
  27  |       await page.goto('/', { waitUntil: 'commit', timeout: 25000 });
  28  |     } catch {
  29  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 25000 });
  30  |     }
  31  | 
  32  |     if (page.url().includes('/admin/')) {
  33  |       return page;
  34  |     }
  35  | 
  36  |     const emailInput = page.getByLabel(/Email atau Username/i);
  37  |     await expect(emailInput).toBeVisible({ timeout: 20000 });
  38  | 
  39  |     await emailInput.fill('qakasflo@automation.com');
  40  |     await page.getByLabel(/Kata Sandi/i).fill('password');
  41  | 
  42  |     const loginBtn = page.getByRole('button', { name: 'Masuk' });
  43  |     await expect(loginBtn).toBeEnabled({ timeout: 5000 });
  44  |     await page.waitForTimeout(500);
  45  |     await loginBtn.click();
  46  | 
  47  |     try {
  48  |       await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 25000 });
  49  |     } catch {
  50  |       if (!page.url().includes('/admin/')) {
  51  |         await page.waitForTimeout(1500);
  52  |         if (await loginBtn.isVisible().catch(() => false)) {
  53  |           await loginBtn.click({ timeout: 5000 }).catch(() => {});
  54  |         }
  55  |         await expect(page).toHaveURL(/.*\/admin\/.*/, { timeout: 20000 });
  56  |       }
  57  |     }
  58  |     return page;
  59  |   }
  60  | 
  61  |   // Helper to ensure at least one Self Order entry exists (generated via Book Menu + Branch)
  62  |   async function ensureSelfOrderExists(page) {
  63  |     await expect(page.locator('table:visible tbody tr').first()).toBeVisible({ timeout: 15000 });
  64  |     await page.waitForTimeout(1000);
  65  | 
  66  |     const dataRows = getDataRows(page);
  67  |     const count = await dataRows.count();
  68  |     if (count === 0) {
  69  |       await page.goto('/admin/catalog/book-menu', { waitUntil: 'domcontentloaded' });
  70  |       await expect(page.locator('table:visible').first()).toBeVisible({ timeout: 15000 });
  71  | 
  72  |       const targetRow = page.locator('table:visible tbody tr').filter({ hasText: 'Buku Menu Utama' }).first();
  73  |       if (await targetRow.isVisible({ timeout: 5000 }).catch(() => false)) {
  74  |         const editBtn = targetRow.locator('a[href*="/edit"]').first();
  75  |         if (await editBtn.isVisible().catch(() => false)) {
  76  |           await editBtn.click();
  77  |         } else {
  78  |           await targetRow.locator('button, a').nth(1).click();
  79  |         }
  80  | 
  81  |         await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/edit/, { timeout: 15000 });
  82  |         await page.waitForTimeout(1000);
  83  | 
  84  |         const hasQAPill = await page.locator('.mantine-MultiSelect-pill, .mantine-Pill-root')
  85  |           .filter({ hasText: /Kasflo Pusat QA/i }).first().isVisible().catch(() => false);
  86  | 
  87  |         if (!hasQAPill) {
  88  |           const cabangContainer = page.locator('input[placeholder*="Cabang"], .mantine-MultiSelect-inputField, .mantine-MultiSelect-input').first();
  89  |           if (await cabangContainer.isVisible({ timeout: 5000 }).catch(() => false)) {
  90  |             await cabangContainer.click();
  91  |             await page.waitForTimeout(500);
  92  | 
  93  |             const branchOption = page.locator('[role="option"]:visible, [data-combobox-option]:visible, .mantine-MultiSelect-option:visible')
  94  |               .filter({ hasText: /Kasflo Pusat QA/i }).first();
  95  |             if (await branchOption.isVisible({ timeout: 2000 }).catch(() => false)) {
  96  |               await branchOption.click();
  97  |             } else {
  98  |               const anyOption = page.locator('[role="option"]:visible').first();
  99  |               if (await anyOption.isVisible().catch(() => false)) {
  100 |                 await anyOption.click();
  101 |               }
  102 |             }
  103 |             await page.getByText(/Edit Buku Menu/i).first().click({ force: true }).catch(() => {});
  104 |           }
  105 |         }
  106 | 
  107 |         await page.evaluate(() => window.scrollTo(0, 0));
  108 |         const updateBtn = page.getByRole('button', { name: 'Update' });
  109 |         await expect(updateBtn).toBeVisible({ timeout: 5000 });
  110 |         await updateBtn.click();
  111 |         await expect(page).toHaveURL(/\/admin\/catalog\/book-menu$/, { timeout: 15000 });
  112 |       } else {
  113 |         await page.goto('/admin/catalog/book-menu/add', { waitUntil: 'domcontentloaded' });
  114 |         await expect(page).toHaveURL(/.*\/admin\/catalog\/book-menu\/add/, { timeout: 15000 });
  115 |         const bmName = 'Init BM SelfOrder ' + Date.now();
```