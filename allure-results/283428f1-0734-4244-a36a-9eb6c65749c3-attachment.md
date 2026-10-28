# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/metode_pembayaran.spec.js >> Metode Pembayaran >> [TC-07] Berhasil menambahkan metode pembayaran baru via modal
- Location: tests/Kasflo-Resto/Pengaturan/metode_pembayaran.spec.js:252:3

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first()
Expected: not visible
Received: visible
Timeout:  10000ms

Call log:
  - Expect "not toBeVisible" locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first() with timeout 10000ms
  - waiting for locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first()
    24 × locator resolved to <section role="dialog" tabindex="-1" aria-modal="true" data-modal-content="true" aria-describedby="mantine-jw2jzfp2g-body" class="m_fd1ab0aa m_54c44539 mantine-Modal-content m_1b7284a3 mantine-Paper-root">…</section>
       - unexpected value "visible"

```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - generic [aria-hidden] [ref=f1e2]:
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
          - generic [ref=f1e112]:
            - link [ref=f1e113] [cursor=pointer]:
              - /url: /admin/branch-management/branch
              - generic [ref=f1e114]: Data Cabang
            - link [ref=f1e115] [cursor=pointer]:
              - /url: /admin/branch-management/area
              - generic [ref=f1e116]: Pengaturan Area
            - link [ref=f1e117] [cursor=pointer]:
              - /url: /admin/branch-management/setting-table
              - generic [ref=f1e118]: Pengaturan Meja
            - link [ref=f1e119] [cursor=pointer]:
              - /url: /admin/setting/tax-and-other
              - generic [ref=f1e120]: Pajak & Biaya Lainnya
            - link [ref=f1e121] [cursor=pointer]:
              - /url: /admin/setting/payment-method
              - generic [ref=f1e122]: Metode Pembayaran
            - link [ref=f1e123] [cursor=pointer]:
              - /url: /admin/setting/receipt
              - generic [ref=f1e124]: Struk
            - link [ref=f1e125] [cursor=pointer]:
              - /url: /admin/setting/shift
              - generic [ref=f1e126]: Shift
            - link [ref=f1e127] [cursor=pointer]:
              - /url: /admin/setting/bank-account
              - generic [ref=f1e128]: Atur Rekening
            - link [ref=f1e129] [cursor=pointer]:
              - /url: /admin/setting/transaction
              - generic [ref=f1e130]: Transaksi
          - link [ref=f1e131] [cursor=pointer]:
            - /url: /admin/subscription
            - paragraph [ref=f1e138]: Berlangganan
      - main [ref=f1e139]:
        - generic [ref=f1e141]:
          - generic [ref=f1e142]:
            - paragraph [ref=f1e143]: Subscription akan berakhir dalam 2 hari.
            - link [ref=f1e144] [cursor=pointer]:
              - /url: /admin/subscription?tab=history-subscription
              - paragraph [ref=f1e145]: Kunjungi Halaman Berlangganan
          - generic [ref=f1e147]:
            - paragraph [ref=f1e152]: Metode Pembayaran
            - generic [ref=f1e153]:
              - button [ref=f1e155] [cursor=pointer]:
                - generic [ref=f1e156]: Business
              - button [ref=f1e163] [cursor=pointer]:
                - generic [ref=f1e164]: Saldo QRIS
              - button [ref=f1e169] [cursor=pointer]:
                - generic [ref=f1e176]:
                  - paragraph [ref=f1e177]: Kasflo Automation
                  - paragraph [ref=f1e178]: OWNER
          - generic [ref=f1e190]:
            - paragraph [ref=f1e192]: Jumlah Metode Pembayaran
            - paragraph [ref=f1e195]: 20/50 Metode Pembayaran
          - generic [ref=f1e197]:
            - generic [ref=f1e198]:
              - link [ref=f1e199] [cursor=pointer]:
                - /url: /admin/dashboard
              - generic [ref=f1e203]: /
              - paragraph [ref=f1e204]: Metode Pembayaran
            - button [ref=f1e205] [cursor=pointer]:
              - generic [ref=f1e206]: Tambah Metode Pembayaran
          - generic [ref=f1e213]:
            - generic [ref=f1e215]:
              - textbox [ref=f1e218] [cursor=pointer]:
                - /placeholder: Filter Status
              - generic [ref=f1e220]:
                - button [ref=f1e221] [cursor=pointer]
                - button [ref=f1e224] [cursor=pointer]
            - table [ref=f1e232]:
              - rowgroup [ref=f1e233]:
                - row [ref=f1e234]:
                  - columnheader [ref=f1e235]:
                    - generic [ref=f1e236]:
                      - generic [ref=f1e237] [cursor=pointer]:
                        - generic [ref=f1e238]: Nama Metode Pembayaran
                        - button [ref=f1e239]
                      - generic [ref=f1e244]:
                        - button [ref=f1e245]
                        - button [ref=f1e254] [cursor=pointer]
                  - columnheader [ref=f1e260]:
                    - generic [ref=f1e261]:
                      - generic [ref=f1e262] [cursor=pointer]:
                        - generic [ref=f1e263]: Tipe Metode Pembayaran
                        - button [ref=f1e264]
                      - generic [ref=f1e269]:
                        - button [ref=f1e270]
                        - button [ref=f1e279] [cursor=pointer]
                  - columnheader [ref=f1e285]:
                    - generic [ref=f1e286]:
                      - generic [ref=f1e287] [cursor=pointer]:
                        - generic [ref=f1e288]: Digunakan Cabang
                        - button [ref=f1e289]
                      - generic [ref=f1e294]:
                        - button [ref=f1e295]
                        - button [ref=f1e304] [cursor=pointer]
                  - columnheader [ref=f1e310]:
                    - generic [ref=f1e311]:
                      - generic [ref=f1e312] [cursor=pointer]:
                        - generic [ref=f1e313]: Status
                        - button [ref=f1e314]
                      - generic [ref=f1e319]:
                        - button [ref=f1e320]
                        - button [ref=f1e329] [cursor=pointer]
                  - columnheader [ref=f1e335]:
                    - generic [ref=f1e336]: Action
              - rowgroup [ref=f1e339]:
                - row [ref=f1e340]:
                  - cell [ref=f1e341]:
                    - generic [ref=f1e342]: Cash
                  - cell [ref=f1e343]: Cash
                  - cell [ref=f1e344]:
                    - generic [ref=f1e345]: 5 Cabang Aktif
                  - cell [ref=f1e347]:
                    - generic [ref=f1e348]: Aktif
                  - cell [ref=f1e356]:
                    - generic [ref=f1e357]:
                      - button [ref=f1e358] [cursor=pointer]
                      - button [disabled] [ref=f1e363]
                - row [ref=f1e367]:
                  - cell [ref=f1e368]:
                    - generic [ref=f1e369]: QRIS System
                    - generic [ref=f1e370]: Transaksi akan dikenakan biaya MDR sebesar 0,7%
                  - cell [ref=f1e371]: QRIS
                  - cell [ref=f1e372]:
                    - generic [ref=f1e373]: 5 Cabang Aktif
                  - cell [ref=f1e375]:
                    - generic [ref=f1e376]: Aktif
                  - cell [ref=f1e384]:
                    - generic [ref=f1e385]:
                      - button [ref=f1e386] [cursor=pointer]
                      - button [disabled] [ref=f1e391]
                - row [ref=f1e395]:
                  - cell [ref=f1e396]:
                    - generic [ref=f1e397]: GoPay QA 4214
                  - cell [ref=f1e398]: E-Wallet
                  - cell [ref=f1e399]:
                    - generic [ref=f1e400]: 5 Cabang Aktif
                  - cell [ref=f1e402]:
                    - generic [ref=f1e403]: Aktif
                  - cell [ref=f1e411]:
                    - generic [ref=f1e412]:
                      - button [ref=f1e413] [cursor=pointer]
                      - button [ref=f1e418] [cursor=pointer]
                - row [ref=f1e422]:
                  - cell [ref=f1e423]:
                    - generic [ref=f1e424]: GoPay QA 9629
                  - cell [ref=f1e425]: E-Wallet
                  - cell [ref=f1e426]:
                    - generic [ref=f1e427]: 5 Cabang Aktif
                  - cell [ref=f1e429]:
                    - generic [ref=f1e430]: Aktif
                  - cell [ref=f1e438]:
                    - generic [ref=f1e439]:
                      - button [ref=f1e440] [cursor=pointer]
                      - button [ref=f1e445] [cursor=pointer]
                - row [ref=f1e449]:
                  - cell [ref=f1e450]:
                    - generic [ref=f1e451]: GoPay QA 5521
                  - cell [ref=f1e452]: E-Wallet
                  - cell [ref=f1e453]:
                    - generic [ref=f1e454]: 5 Cabang Aktif
                  - cell [ref=f1e456]:
                    - generic [ref=f1e457]: Aktif
                  - cell [ref=f1e465]:
                    - generic [ref=f1e466]:
                      - button [ref=f1e467] [cursor=pointer]
                      - button [ref=f1e472] [cursor=pointer]
                - row [ref=f1e476]:
                  - cell [ref=f1e477]:
                    - generic [ref=f1e478]: GoPay QA 9613
                  - cell [ref=f1e479]: E-Wallet
                  - cell [ref=f1e480]:
                    - generic [ref=f1e481]: 5 Cabang Aktif
                  - cell [ref=f1e483]:
                    - generic [ref=f1e484]: Aktif
                  - cell [ref=f1e492]:
                    - generic [ref=f1e493]:
                      - button [ref=f1e494] [cursor=pointer]
                      - button [ref=f1e499] [cursor=pointer]
                - row [ref=f1e503]:
                  - cell [ref=f1e504]:
                    - generic [ref=f1e505]: GoPay QA 8302
                  - cell [ref=f1e506]: E-Wallet
                  - cell [ref=f1e507]:
                    - generic [ref=f1e508]: 5 Cabang Aktif
                  - cell [ref=f1e510]:
                    - generic [ref=f1e511]: Aktif
                  - cell [ref=f1e519]:
                    - generic [ref=f1e520]:
                      - button [ref=f1e521] [cursor=pointer]
                      - button [ref=f1e526] [cursor=pointer]
                - row [ref=f1e530]:
                  - cell [ref=f1e531]:
                    - generic [ref=f1e532]: GoPay QA 5771
                  - cell [ref=f1e533]: E-Wallet
                  - cell [ref=f1e534]:
                    - generic [ref=f1e535]: 5 Cabang Aktif
                  - cell [ref=f1e537]:
                    - generic [ref=f1e538]: Aktif
                  - cell [ref=f1e546]:
                    - generic [ref=f1e547]:
                      - button [ref=f1e548] [cursor=pointer]
                      - button [ref=f1e553] [cursor=pointer]
                - row [ref=f1e557]:
                  - cell [ref=f1e558]:
                    - generic [ref=f1e559]: GoPay QA 7705
                  - cell [ref=f1e560]: E-Wallet
                  - cell [ref=f1e561]:
                    - generic [ref=f1e562]: 5 Cabang Aktif
                  - cell [ref=f1e564]:
                    - generic [ref=f1e565]: Aktif
                  - cell [ref=f1e573]:
                    - generic [ref=f1e574]:
                      - button [ref=f1e575] [cursor=pointer]
                      - button [ref=f1e580] [cursor=pointer]
                - row [ref=f1e584]:
                  - cell [ref=f1e585]:
                    - generic [ref=f1e586]: GoPay QA 1753
                  - cell [ref=f1e587]: E-Wallet
                  - cell [ref=f1e588]:
                    - generic [ref=f1e589]: 5 Cabang Aktif
                  - cell [ref=f1e591]:
                    - generic [ref=f1e592]: Aktif
                  - cell [ref=f1e600]:
                    - generic [ref=f1e601]:
                      - button [ref=f1e602] [cursor=pointer]
                      - button [ref=f1e607] [cursor=pointer]
                - row [ref=f1e611]:
                  - cell [ref=f1e612]:
                    - generic [ref=f1e613]: GoPay QA 8292
                  - cell [ref=f1e614]: E-Wallet
                  - cell [ref=f1e615]:
                    - generic [ref=f1e616]: 5 Cabang Aktif
                  - cell [ref=f1e618]:
                    - generic [ref=f1e619]: Aktif
                  - cell [ref=f1e627]:
                    - generic [ref=f1e628]:
                      - button [ref=f1e629] [cursor=pointer]
                      - button [ref=f1e634] [cursor=pointer]
                - row [ref=f1e638]:
                  - cell [ref=f1e639]:
                    - generic [ref=f1e640]: GoPay QA 9238
                  - cell [ref=f1e641]: E-Wallet
                  - cell [ref=f1e642]:
                    - generic [ref=f1e643]: 5 Cabang Aktif
                  - cell [ref=f1e645]:
                    - generic [ref=f1e646]: Aktif
                  - cell [ref=f1e654]:
                    - generic [ref=f1e655]:
                      - button [ref=f1e656] [cursor=pointer]
                      - button [ref=f1e661] [cursor=pointer]
                - row [ref=f1e665]:
                  - cell [ref=f1e666]:
                    - generic [ref=f1e667]: GoPay QA 7419
                  - cell [ref=f1e668]: E-Wallet
                  - cell [ref=f1e669]:
                    - generic [ref=f1e670]: 5 Cabang Aktif
                  - cell [ref=f1e672]:
                    - generic [ref=f1e673]: Aktif
                  - cell [ref=f1e681]:
                    - generic [ref=f1e682]:
                      - button [ref=f1e683] [cursor=pointer]
                      - button [ref=f1e688] [cursor=pointer]
                - row [ref=f1e692]:
                  - cell [ref=f1e693]:
                    - generic [ref=f1e694]: GoPay QA 3930
                  - cell [ref=f1e695]: E-Wallet
                  - cell [ref=f1e696]:
                    - generic [ref=f1e697]: 5 Cabang Aktif
                  - cell [ref=f1e699]:
                    - generic [ref=f1e700]: Aktif
                  - cell [ref=f1e708]:
                    - generic [ref=f1e709]:
                      - button [ref=f1e710] [cursor=pointer]
                      - button [ref=f1e715] [cursor=pointer]
                - row [ref=f1e719]:
                  - cell [ref=f1e720]:
                    - generic [ref=f1e721]: GoPay QA 6947
                  - cell [ref=f1e722]: E-Wallet
                  - cell [ref=f1e723]:
                    - generic [ref=f1e724]: 5 Cabang Aktif
                  - cell [ref=f1e726]:
                    - generic [ref=f1e727]: Aktif
                  - cell [ref=f1e735]:
                    - generic [ref=f1e736]:
                      - button [ref=f1e737] [cursor=pointer]
                      - button [ref=f1e742] [cursor=pointer]
                - row [ref=f1e746]:
                  - cell [ref=f1e747]:
                    - generic [ref=f1e748]: GoPay QA 1609
                  - cell [ref=f1e749]: E-Wallet
                  - cell [ref=f1e750]:
                    - generic [ref=f1e751]: 5 Cabang Aktif
                  - cell [ref=f1e753]:
                    - generic [ref=f1e754]: Aktif
                  - cell [ref=f1e762]:
                    - generic [ref=f1e763]:
                      - button [ref=f1e764] [cursor=pointer]
                      - button [ref=f1e769] [cursor=pointer]
                - row [ref=f1e773]:
                  - cell [ref=f1e774]:
                    - generic [ref=f1e775]: GoPay QA 6833
                  - cell [ref=f1e776]: E-Wallet
                  - cell [ref=f1e777]:
                    - generic [ref=f1e778]: 5 Cabang Aktif
                  - cell [ref=f1e780]:
                    - generic [ref=f1e781]: Aktif
                  - cell [ref=f1e789]:
                    - generic [ref=f1e790]:
                      - button [ref=f1e791] [cursor=pointer]
                      - button [ref=f1e796] [cursor=pointer]
                - row [ref=f1e800]:
                  - cell [ref=f1e801]:
                    - generic [ref=f1e802]: GoPay QA 7374
                  - cell [ref=f1e803]: E-Wallet
                  - cell [ref=f1e804]:
                    - generic [ref=f1e805]: 5 Cabang Aktif
                  - cell [ref=f1e807]:
                    - generic [ref=f1e808]: Aktif
                  - cell [ref=f1e816]:
                    - generic [ref=f1e817]:
                      - button [ref=f1e818] [cursor=pointer]
                      - button [ref=f1e823] [cursor=pointer]
                - row [ref=f1e827]:
                  - cell [ref=f1e828]:
                    - generic [ref=f1e829]: GoPay QA 9414
                  - cell [ref=f1e830]: E-Wallet
                  - cell [ref=f1e831]:
                    - generic [ref=f1e832]: 5 Cabang Aktif
                  - cell [ref=f1e834]:
                    - generic [ref=f1e835]: Aktif
                  - cell [ref=f1e843]:
                    - generic [ref=f1e844]:
                      - button [ref=f1e845] [cursor=pointer]
                      - button [ref=f1e850] [cursor=pointer]
                - row [ref=f1e854]:
                  - cell [ref=f1e855]:
                    - generic [ref=f1e856]: GoPay QA 2698
                  - cell [ref=f1e857]: E-Wallet
                  - cell [ref=f1e858]:
                    - generic [ref=f1e859]: 5 Cabang Aktif
                  - cell [ref=f1e861]:
                    - generic [ref=f1e862]: Aktif
                  - cell [ref=f1e870]:
                    - generic [ref=f1e871]:
                      - button [ref=f1e872] [cursor=pointer]
                      - button [ref=f1e877] [cursor=pointer]
            - generic [ref=f1e884]:
              - generic [ref=f1e885]:
                - paragraph [ref=f1e886]: Rows per page
                - textbox [ref=f1e889] [cursor=pointer]: "25"
              - paragraph [ref=f1e890]: 1-20 of 20
              - generic [ref=f1e891]:
                - button [disabled] [ref=f1e892]
                - button [disabled] [ref=f1e896]
    - link [ref=f1e900] [cursor=pointer]:
      - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
      - generic [ref=f1e901]: Konsultasi Sekarang
  - dialog [ref=f1e908]:
    - generic [ref=f1e910]:
      - generic [ref=f1e913]:
        - paragraph [ref=f1e914]: Anda Telah Sampai Pada Batas Maksimal.
        - paragraph [ref=f1e915]: Akun Anda tidak dapat menambahkan karena sudah mencapai batas. Berlangganan/Upgrade paket anda
      - generic [ref=f1e916]:
        - button [active] [ref=f1e917] [cursor=pointer]:
          - generic [ref=f1e918]: Berlangganan/Upgrade Paket
        - button [ref=f1e920] [cursor=pointer]:
          - generic [ref=f1e921]: Tutup
  - dialog [ref=f1e924]:
    - banner [ref=f1e925]:
      - heading [level=2] [ref=f1e926]: Tambah Metode Pembayaran
      - button [ref=f1e927] [cursor=pointer]
    - generic [ref=f1e931]:
      - generic [ref=f1e932]:
        - generic [ref=f1e933]:
          - generic [ref=f1e934]: Nama Metode Pembayaran *
          - textbox [ref=f1e936]:
            - /placeholder: Masukkan Nama Metode Pembayaran
            - text: GoPay QA 4536
        - generic [ref=f1e937]:
          - generic [ref=f1e938]: Tipe Metode Pembayaran *
          - textbox [ref=f1e940] [cursor=pointer]:
            - /placeholder: Pilih Tipe Metode Pembayaran
            - text: E-Wallet
      - generic [ref=f1e945]:
        - button [ref=f1e946] [cursor=pointer]:
          - generic [ref=f1e947]: Batal
        - button [ref=f1e949] [cursor=pointer]:
          - generic [ref=f1e950]: Simpan
```

# Test source

```ts
  184 | 
  185 |       // Tutup modal via tombol Batal
  186 |       await batalBtn.click();
  187 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  188 |     
  189 |     });
  190 |   });
  191 | 
  192 |   test('[TC-05] Memverifikasi pilihan tipe metode pembayaran pada dropdown modal', async ({ page }) => {
  193 |     await test.step('Langkah Pengujian UAT: Memverifikasi pilihan tipe metode pembayaran pada dropdown modal', async () => {
  194 |       const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
  195 |       await tambahBtn.click();
  196 | 
  197 |       const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
  198 |       await expect(modal).toBeVisible({ timeout: 5000 });
  199 | 
  200 |       const tipeInput = modal.getByPlaceholder('Pilih Tipe Metode Pembayaran').first();
  201 |       await tipeInput.click();
  202 | 
  203 |       // Verifikasi tipe-tipe pembayaran yang tersedia
  204 |       const expectedTypes = ['Cash', 'QRIS', 'E-Wallet', 'Debit', 'Credit'];
  205 |       for (const type of expectedTypes) {
  206 |         const opt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: new RegExp(`^${type}$`, 'i') }).first();
  207 |         await expect(opt).toBeVisible({ timeout: 5000 });
  208 |       }
  209 | 
  210 |       // Pilih salah satu tipe (misal: E-Wallet)
  211 |       const ewalletOpt = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: /^E-Wallet$/i }).first();
  212 |       await ewalletOpt.click();
  213 |       await expect(tipeInput).toHaveValue(/E-Wallet/i);
  214 | 
  215 |       // Batalkan
  216 |       await modal.getByRole('button', { name: /Batal/i }).first().click();
  217 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  218 |     
  219 |     });
  220 |   });
  221 | 
  222 |   test('[TC-06] Validasi form Tambah Metode Pembayaran saat submit field wajib kosong', async ({ page }) => {
  223 |     await test.step('Validasi form Tambah Metode Pembayaran saat submit field wajib kosong', async () => {
  224 |       const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
  225 |       await tambahBtn.click();
  226 | 
  227 |       const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
  228 |       await expect(modal).toBeVisible({ timeout: 5000 });
  229 | 
  230 |       // Klik simpan tanpa mengisi field apapun
  231 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
  232 |       await simpanBtn.click();
  233 | 
  234 |       // Modal tetap terbuka karena validasi gagal
  235 |       await expect(modal).toBeVisible({ timeout: 5000 });
  236 | 
  237 |       // Verifikasi pesan error validasi muncul
  238 |       const errorMsg = modal.getByText(/Wajib diisi|harus diisi/i).first();
  239 |       await expect(errorMsg).toBeVisible({ timeout: 5000 });
  240 | 
  241 |       // Batalkan
  242 |       await modal.getByRole('button', { name: /Batal/i }).first().click();
  243 |       await expect(modal).not.toBeVisible({ timeout: 5000 });
  244 |     
  245 |     });
  246 |   });
  247 | 
  248 |   // ==========================================
  249 |   // 4. [CRUD] TAMBAH METODE PEMBAYARAN BARU
  250 |   // ==========================================
  251 | 
  252 |   test('[TC-07] Berhasil menambahkan metode pembayaran baru via modal', async ({ page }) => {
  253 |     await test.step('Langkah Pengujian UAT: Berhasil menambahkan metode pembayaran baru via modal', async () => {
  254 |       const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
  255 |       await tambahBtn.click();
  256 | 
  257 |       const modal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
  258 |       await expect(modal).toBeVisible({ timeout: 5000 });
  259 | 
  260 |       // 1. Isi Nama Metode Pembayaran
  261 |       const uniqueName = 'GoPay QA ' + Math.floor(Math.random() * 9000 + 1000);
  262 |       const nameInput = modal.getByPlaceholder('Masukkan Nama Metode Pembayaran').first();
  263 |       await nameInput.fill(uniqueName);
  264 |       await expect(nameInput).toHaveValue(uniqueName);
  265 | 
  266 |       // 2. Pilih Tipe Metode Pembayaran
  267 |       const tipeInput = modal.getByPlaceholder('Pilih Tipe Metode Pembayaran').first();
  268 |       await tipeInput.click();
  269 |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: /^E-Wallet$/i }).first();
  270 |       await expect(option).toBeVisible({ timeout: 5000 });
  271 |       await option.click();
  272 | 
  273 |       // 3. Simpan dan tunggu respons API
  274 |       const simpanBtn = modal.getByRole('button', { name: 'Simpan', exact: true }).first();
  275 |       await Promise.all([
  276 |         page.waitForResponse(
  277 |           res => res.url().includes('payment-method') && (res.request().method() === 'POST' || res.request().method() === 'PUT') && (res.status() === 200 || res.status() === 201),
  278 |           { timeout: 20000 }
  279 |         ).catch(() => null),
  280 |         simpanBtn.click(),
  281 |       ]);
  282 | 
  283 |       // Verifikasi modal tertutup
> 284 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
      |                               ^ Error: expect(locator).not.toBeVisible() failed
  285 | 
  286 |       // Verifikasi baris metode pembayaran yang baru ditambahkan muncul pada tabel
  287 |       const newRow = page.locator('table:visible tbody tr').filter({ hasText: uniqueName }).first();
  288 |       await expect(newRow).toBeVisible({ timeout: 10000 });
  289 |     
  290 |     });
  291 |   });
  292 | 
  293 |   // ==========================================
  294 |   // 5. INTERAKSI TOMBOL AKSI PADA BARIS DATA
  295 |   // ==========================================
  296 | 
  297 |   test('[TC-08] Membuka modal pengaturan cabang pada baris metode pembayaran dan membatalkannya', async ({ page }) => {
  298 |     await test.step('Buka dan periksa rincian: Membuka modal pengaturan cabang pada baris metode pembayaran dan membatalkannya', async () => {
  299 |       const rows = getPaymentRows(page);
  300 |       await expect(rows.first()).toBeVisible({ timeout: 10000 });
  301 | 
  302 |       // Tombol pertama pada kolom Action adalah tombol pengaturan cabang (ikon branch/store)
  303 |       const branchBtn = rows.first().locator('button:visible').first();
  304 |       await expect(branchBtn).toBeVisible({ timeout: 5000 });
  305 |       await branchBtn.click();
  306 | 
  307 |       // Verifikasi modal atau drawer pengaturan cabang terbuka
  308 |       const branchModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible, .mantine-Drawer-content:visible')
  309 |         .filter({ hasText: /Cabang|Atur Cabang|Pilih Cabang|Metode Pembayaran/i }).first();
  310 |       await expect(branchModal).toBeVisible({ timeout: 5000 });
  311 | 
  312 |       // Tutup modal via tombol Batal atau tombol Tutup / silang
  313 |       const closeBtn = branchModal.getByRole('button', { name: /Batal|Tutup/i })
  314 |         .or(branchModal.locator('.mantine-Modal-close, .mantine-Drawer-close')).first();
  315 |       await expect(closeBtn).toBeVisible({ timeout: 5000 });
  316 |       await closeBtn.click();
  317 | 
  318 |       await expect(branchModal).not.toBeVisible({ timeout: 5000 });
  319 |     
  320 |     });
  321 |   });
  322 | 
  323 |   test('[TC-09] Memverifikasi tombol hapus disabled untuk metode pembayaran bawaan (Cash & QRIS)', async ({ page }) => {
  324 |     await test.step('Langkah Pengujian UAT: Memverifikasi tombol hapus disabled untuk metode pembayaran bawaan (Cash & QRIS)', async () => {
  325 |       // Baris Cash dan QRIS adalah metode bawaan sistem, tombol hapus harus disabled
  326 |       const cashRow = page.locator('table:visible tbody tr').filter({ hasText: 'Cash' }).first();
  327 |       await expect(cashRow).toBeVisible({ timeout: 10000 });
  328 | 
  329 |       const deleteBtn = cashRow.locator('button').last();
  330 |       await expect(deleteBtn).toBeDisabled();
  331 |     
  332 |     });
  333 |   });
  334 | 
  335 |   test('[TC-10] Memverifikasi responsivitas tabel metode pembayaran dan status aktif', async ({ page }) => {
  336 |     await test.step('Langkah Pengujian UAT: Memverifikasi responsivitas tabel metode pembayaran dan status aktif', async () => {
  337 |       const table = page.locator('table:visible').first();
  338 |       await expect(table).toBeVisible({ timeout: 10000 });
  339 | 
  340 |       // Verifikasi badge/teks status "Aktif" pada baris data
  341 |       const statusBadge = page.locator('table:visible tbody tr td').filter({ hasText: /Aktif/i }).first();
  342 |       await expect(statusBadge).toBeVisible({ timeout: 5000 });
  343 |     
  344 |     });
  345 |   });
  346 | });
  347 | 
```