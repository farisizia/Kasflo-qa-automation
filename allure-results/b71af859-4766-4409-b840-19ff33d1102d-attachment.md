# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Promosi/reward.spec.js >> Reward & Referral >> [TC-02] Memverifikasi struktur tabel dan header kolom pada tab Referral
- Location: tests/Kasflo-Resto/Promosi/reward.spec.js:98:3

# Error details

```
Error: "route.fetch: Test ended.
Call log:
  - → GET https://api-dev.kasflo.id/backoffice/v1/auth/profile
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.8010.12 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - accept-language: en-US
    - authorization: Bearer eyJhbGciOiJSUzI1NiIsInJla2EiOiJqd3QiLCJ0eXAiOiJKV1QifQ.eyJhZG1pbl9pZCI6ODExOCwiYWRtaW5fcm9sZSI6Ik9XTkVSIiwiZXhwIjoxNzk0OTYxNzYyLCJpYXQiOjE3OTMxNjE3NjIsInBhcnRuZXJfYnJhbmNoX2lkIjowLCJwYXJ0bmVyX2lkIjo1MzQ1LCJ1c2VybmFtZSI6Imthc2Zsb2VudGVwcmljZSJ9.RUftMrvqHXNhL3OJRQPmVpJBaTOwvbusW8ZcQ-K8-Evoe3i3shlWw9UxBNC3ZquUZbUMOreG2vuRVeYVsKbbedkzQ5XHIje86jDO4_xStTOOAWnpQgUXflfpqQESjG3B-72FiO8yVIaa9DV-WbmmWgOfpg_4tFHtd-Y1B8AVPci2WT2c1cq7oqNOyQDuuyTTTGUvRbHGgqWazxgoOBxX3Lu0IypAnsTl8dz1rpZ7dVYTHYh1uMpAgRAr3UwkGLwISnxm-GcwUyKmhszsat8qNI5PIIifVyP-Lgi0JQutWHmlboVfEUgWe1lDTbUulnEzzxYzvoZmh2rD8phQECmhnQ
    - origin: https://backoffice-dev.kasflo.id
    - referer: https://backoffice-dev.kasflo.id/
    - apps: resto-grab
    - sec-ch-ua: "HeadlessChrome";v="153", "Not_A Brand";v="8", "Chromium";v="153"
    - sec-ch-ua-mobile: ?0
    - sec-ch-ua-platform: "Windows"
    - uuid: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.8010.12 Safari/537.36
    - cookie: _fbp=fb.1.1793161762832.866832893805296641; _gcl_au=1.1.993988874.1793161763
" while running route callback.
Consider awaiting `await page.unrouteAll({ behavior: 'ignoreErrors' })`
before the end of the test to ignore remaining routes in flight.
```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - generic [ref=f1e3]:
    - navigation [ref=f1e4]:
      - generic [ref=f1e5]:
        - link [ref=f1e6] [cursor=pointer]:
          - /url: /admin/dashboard
          - paragraph [ref=f1e14]: Dashboard
        - link [ref=f1e15] [cursor=pointer]:
          - /url: /admin/catalog
          - paragraph [ref=f1e23]: Katalog
        - link [ref=f1e27] [cursor=pointer]:
          - /url: /admin/ingredients
          - paragraph [ref=f1e35]: Bahan Baku
        - link [ref=f1e39] [cursor=pointer]:
          - /url: /admin/promotion
          - paragraph [ref=f1e47]: Promosi
        - link [ref=f1e51] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f1e60]: Pelanggan
        - link [ref=f1e64] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f1e72]: Pembukuan
        - link [ref=f1e76] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f1e84]: Laporan Usaha
        - link [ref=f1e88] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f1e96]: Manajemen User
        - link [ref=f1e100] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f1e107]: Pengaturan
    - main [ref=f1e111]:
      - generic [ref=f1e112]:
        - generic [ref=f1e114]:
          - paragraph [ref=f1e119]: Reward
          - generic [ref=f1e120]:
            - button "Premium" [ref=f1e122] [cursor=pointer]
            - button "Saldo QRIS" [ref=f1e130] [cursor=pointer]
            - button [ref=f1e136] [cursor=pointer]:
              - generic [ref=f1e143]:
                - paragraph [ref=f1e144]: Kasflo Automation
                - paragraph [ref=f1e145]: OWNER
        - generic [ref=f1e148]:
          - link [ref=f1e149] [cursor=pointer]:
            - /url: /admin/dashboard
          - generic [ref=f1e153]: /
          - paragraph [ref=f1e154]: Reward
        - tablist [ref=f1e159]:
          - tab "Referral" [selected] [ref=f1e160] [cursor=pointer]
          - tab "Ulang Tahun" [ref=f1e162] [cursor=pointer]
          - tab "Subscription" [ref=f1e164] [cursor=pointer]
        - generic [ref=f1e168]:
          - generic [ref=f1e169]:
            - generic [ref=f1e170]: Status Referal
            - generic [ref=f1e173]:
              - switch "Aktif" [checked]
              - generic [ref=f1e177]: Aktif
          - generic [ref=f1e180]:
            - generic [ref=f1e181]:
              - button "Tambah Reward" [ref=f1e182] [cursor=pointer]
              - link "Tambah Kampanye Promosi" [ref=f1e187] [cursor=pointer]:
                - /url: /admin/promotion/reward/campaign/add?pt=1
            - table [ref=f1e190]:
              - rowgroup [ref=f1e191]:
                - row [ref=f1e192]:
                  - columnheader "Tipe Reward" [ref=f1e193]
                  - columnheader "Isi Reward" [ref=f1e194]
                  - columnheader "Qty" [ref=f1e195]
                  - columnheader "Action" [ref=f1e196]
              - rowgroup
            - generic [ref=f1e198]:
              - img "not-found" [ref=f1e199]
              - paragraph [ref=f1e200]: Belum Ada Data
  - link "Konsultasi Sekarang" [ref=f1e202] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Reward & Referral', () => {
  4   |   // Helper selector for data rows in reward table
  5   |   function getDataRows(page) {
  6   |     return page.locator('table:visible tbody tr');
  7   |   }
  8   | 
  9   |   // Shared resilient login helper
  10  |   async function loginBeforeTest(page) {
  11  |     if (page.url().includes('/admin/')) {
  12  |       return page;
  13  |     }
  14  | 
  15  |     try {
  16  |       await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  17  |     } catch {
  18  |       await page.goto('/', { waitUntil: 'commit', timeout: 30000 });
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
  48  |   test.beforeEach(async ({ page }) => {
  49  |     await test.step('Inisialisasi sesi login dan navigasi ke halaman pengujian', async () => {
  50  |       // Enable customer reward and profile permission in mocks
  51  |       await page.route('**/backoffice/v1/subscription', async (route) => {
  52  |         const response = await route.fetch();
  53  |         const json = await response.json();
  54  |         if (json.data && json.data.active_features) {
  55  |           json.data.active_features.enable_customer_reward = true;
  56  |         }
  57  |         await route.fulfill({ response, json });
  58  |       });
  59  | 
  60  |       await page.route('**/backoffice/v1/auth/profile', async (route) => {
> 61  |         const response = await route.fetch();
      |                                      ^ Error: "route.fetch: Test ended.
  62  |         const json = await response.json();
  63  |         if (json.data) {
  64  |           json.data.is_show_reward = 1;
  65  |         }
  66  |         await route.fulfill({ response, json });
  67  |       });
  68  | 
  69  |       // Step 1: Login
  70  |       await loginBeforeTest(page);
  71  | 
  72  |       // Step 2: Navigate to Reward page
  73  |       await page.goto('/admin/promotion/reward', { waitUntil: 'domcontentloaded' });
  74  | 
  75  |       // Step 3: Verify Reward page loaded (redirects to referral subpage)
  76  |       await expect(page).toHaveURL(/\/admin\/promotion\/reward/, { timeout: 15000 });
  77  |     
  78  |     });
  79  |   });
  80  | 
  81  |   test('[TC-01] Navigasi ke /admin/promotion/reward otomatis mengarah ke sub-halaman Referral dengan breadcrumb dan tabs yang sesuai', async ({ page }) => {
  82  |     await test.step('Navigasi halaman dan periksa komponen: Navigasi ke /admin/promotion/reward otomatis mengarah ke sub-halaman Referral dengan breadcrumb dan tabs yang sesuai', async () => {
  83  |       await expect(page).toHaveURL(/\/admin\/promotion\/reward\/referral/, { timeout: 15000 });
  84  | 
  85  |       // Breadcrumb verification
  86  |       const breadcrumb = page.locator('.mantine-Breadcrumbs-root').first();
  87  |       await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  88  |       await expect(breadcrumb.getByText('Reward')).toBeVisible();
  89  | 
  90  |       // Verify tabs: Referral, Ulang Tahun, Subscription
  91  |       await expect(page.getByRole('tab', { name: /Referral/i }).first()).toBeVisible({ timeout: 5000 });
  92  |       await expect(page.getByRole('tab', { name: /Ulang Tahun/i }).first()).toBeVisible({ timeout: 5000 });
  93  |       await expect(page.getByRole('tab', { name: /Subscription/i }).first()).toBeVisible({ timeout: 5000 });
  94  |     
  95  |     });
  96  |   });
  97  | 
  98  |   test('[TC-02] Memverifikasi struktur tabel dan header kolom pada tab Referral', async ({ page }) => {
  99  |     await test.step('Langkah Pengujian UAT: Memverifikasi struktur tabel dan header kolom pada tab Referral', async () => {
  100 |       const table = page.locator('table:visible').first();
  101 |       await expect(table).toBeVisible({ timeout: 10000 });
  102 | 
  103 |       const thead = page.locator('thead:visible').first();
  104 |       await expect(thead.getByText('Tipe Reward', { exact: true }).first()).toBeVisible();
  105 |       await expect(thead.getByText('Isi Reward', { exact: true }).first()).toBeVisible();
  106 |       await expect(thead.getByText('Qty', { exact: true }).first()).toBeVisible();
  107 |       await expect(thead.getByText('Action', { exact: true }).first()).toBeVisible();
  108 |     
  109 |     });
  110 |   });
  111 | 
  112 |   test('[TC-03] Memverifikasi kontrol Status Referral dan munculnya tombol Simpan Perubahan saat ada perubahan', async ({ page }) => {
  113 |     await test.step('Lakukan pengujian memverifikasi kontrol Status Referral dan munculnya tombol Simpan Perubahan saat ada perubahan dan verifikasi pembaruan data', async () => {
  114 |       // Status Referral switch
  115 |       const statusText = page.getByText(/Status Referal|Status Referral/i).first();
  116 |       await expect(statusText).toBeVisible({ timeout: 5000 });
  117 | 
  118 |       const statusSwitch = page.locator('input[type="checkbox"]').first();
  119 |       await expect(statusSwitch).toBeAttached({ timeout: 5000 });
  120 | 
  121 |       // When Tambah Reward is clicked or changes are made, Simpan Perubahan button appears
  122 |       const tambahRewardBtn = page.getByRole('button', { name: /Tambah Reward/i })
  123 |         .or(page.getByRole('link', { name: /Tambah Reward/i })).first();
  124 |       await tambahRewardBtn.click();
  125 | 
  126 |       const simpanBtn = page.getByRole('button', { name: /Simpan Perubahan/i }).first();
  127 |       await expect(simpanBtn).toBeVisible({ timeout: 5000 });
  128 |     
  129 |     });
  130 |   });
  131 | 
  132 |   test('[TC-04] Memverifikasi tombol Tambah Reward dan Tambah Kampanye Promosi pada tab Referral', async ({ page }) => {
  133 |     await test.step('Langkah Pengujian UAT: Memverifikasi tombol Tambah Reward dan Tambah Kampanye Promosi pada tab Referral', async () => {
  134 |       const tambahRewardBtn = page.getByRole('button', { name: /Tambah Reward/i })
  135 |         .or(page.getByRole('link', { name: /Tambah Reward/i })).first();
  136 |       await expect(tambahRewardBtn).toBeVisible({ timeout: 5000 });
  137 | 
  138 |       const tambahKampanyeBtn = page.getByRole('button', { name: /Tambah Kampanye Promosi/i })
  139 |         .or(page.getByRole('link', { name: /Tambah Kampanye Promosi/i })).first();
  140 |       await expect(tambahKampanyeBtn).toBeVisible({ timeout: 5000 });
  141 |     
  142 |     });
  143 |   });
  144 | 
  145 |   test('[TC-05] Mengklik Tambah Reward menambahkan baris input baru ke tabel dengan komponen yang sesuai', async ({ page }) => {
  146 |     await test.step('Langkah Pengujian UAT: Mengklik Tambah Reward menambahkan baris input baru ke tabel dengan komponen yang sesuai', async () => {
  147 |       const initialRowsCount = await getDataRows(page).count();
  148 | 
  149 |       const tambahRewardBtn = page.getByRole('button', { name: /Tambah Reward/i })
  150 |         .or(page.getByRole('link', { name: /Tambah Reward/i })).first();
  151 |       await tambahRewardBtn.click();
  152 | 
  153 |       // Verify a new row is added
  154 |       const newRows = getDataRows(page);
  155 |       await expect(newRows).toHaveCount(initialRowsCount + 1, { timeout: 5000 });
  156 | 
  157 |       const lastRow = newRows.last();
  158 |       // Verify inputs in newly added row
  159 |       await expect(lastRow.getByPlaceholder('Pilih Tipe Reward')).toBeVisible({ timeout: 5000 });
  160 |       await expect(lastRow.getByPlaceholder('Masukkan Qty')).toBeVisible({ timeout: 5000 });
  161 | 
```