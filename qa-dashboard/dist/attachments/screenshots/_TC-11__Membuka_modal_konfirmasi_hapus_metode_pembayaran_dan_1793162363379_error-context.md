# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Pengaturan/metode_pembayaran.spec.js >> Metode Pembayaran >> [TC-11] Membuka modal konfirmasi hapus metode pembayaran dan membatalkannya
- Location: tests/Kasflo-Resto/Pengaturan/metode_pembayaran.spec.js:351:3

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
    24 × locator resolved to <section role="dialog" tabindex="-1" aria-modal="true" data-modal-content="true" aria-describedby="mantine-gn7z2h7sq-body" class="m_fd1ab0aa m_54c44539 mantine-Modal-content m_1b7284a3 mantine-Paper-root">…</section>
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
      - main [ref=f1e131]:
        - generic [ref=f1e133]:
          - generic [ref=f1e135]:
            - paragraph [ref=f1e140]: Metode Pembayaran
            - generic [ref=f1e141]:
              - button [ref=f1e143] [cursor=pointer]:
                - generic [ref=f1e144]: Premium
              - button [ref=f1e151] [cursor=pointer]:
                - generic [ref=f1e152]: Saldo QRIS
              - button [ref=f1e157] [cursor=pointer]:
                - generic [ref=f1e164]:
                  - paragraph [ref=f1e165]: Kasflo Automation
                  - paragraph [ref=f1e166]: OWNER
          - generic [ref=f1e178]:
            - paragraph [ref=f1e180]: Jumlah Metode Pembayaran
            - paragraph [ref=f1e183]: 20/50 Metode Pembayaran
          - generic [ref=f1e185]:
            - generic [ref=f1e186]:
              - link [ref=f1e187] [cursor=pointer]:
                - /url: /admin/dashboard
              - generic [ref=f1e191]: /
              - paragraph [ref=f1e192]: Metode Pembayaran
            - button [ref=f1e193] [cursor=pointer]:
              - generic [ref=f1e194]: Tambah Metode Pembayaran
          - generic [ref=f1e201]:
            - generic [ref=f1e203]:
              - textbox [ref=f1e206] [cursor=pointer]:
                - /placeholder: Filter Status
              - generic [ref=f1e208]:
                - button [ref=f1e209] [cursor=pointer]
                - button [ref=f1e212] [cursor=pointer]
            - table [ref=f1e220]:
              - rowgroup [ref=f1e221]:
                - row [ref=f1e222]:
                  - columnheader [ref=f1e223]:
                    - generic [ref=f1e224]:
                      - generic [ref=f1e225] [cursor=pointer]:
                        - generic [ref=f1e226]: Nama Metode Pembayaran
                        - button [ref=f1e227]
                      - generic [ref=f1e232]:
                        - button [ref=f1e233]
                        - button [ref=f1e242] [cursor=pointer]
                  - columnheader [ref=f1e248]:
                    - generic [ref=f1e249]:
                      - generic [ref=f1e250] [cursor=pointer]:
                        - generic [ref=f1e251]: Tipe Metode Pembayaran
                        - button [ref=f1e252]
                      - generic [ref=f1e257]:
                        - button [ref=f1e258]
                        - button [ref=f1e267] [cursor=pointer]
                  - columnheader [ref=f1e273]:
                    - generic [ref=f1e274]:
                      - generic [ref=f1e275] [cursor=pointer]:
                        - generic [ref=f1e276]: Digunakan Cabang
                        - button [ref=f1e277]
                      - generic [ref=f1e282]:
                        - button [ref=f1e283]
                        - button [ref=f1e292] [cursor=pointer]
                  - columnheader [ref=f1e298]:
                    - generic [ref=f1e299]:
                      - generic [ref=f1e300] [cursor=pointer]:
                        - generic [ref=f1e301]: Status
                        - button [ref=f1e302]
                      - generic [ref=f1e307]:
                        - button [ref=f1e308]
                        - button [ref=f1e317] [cursor=pointer]
                  - columnheader [ref=f1e323]:
                    - generic [ref=f1e324]: Action
              - rowgroup [ref=f1e327]:
                - row [ref=f1e328]:
                  - cell [ref=f1e329]:
                    - generic [ref=f1e330]: Cash
                  - cell [ref=f1e331]: Cash
                  - cell [ref=f1e332]:
                    - generic [ref=f1e333]: 5 Cabang Aktif
                  - cell [ref=f1e335]:
                    - generic [ref=f1e336]: Aktif
                  - cell [ref=f1e344]:
                    - generic [ref=f1e345]:
                      - button [ref=f1e346] [cursor=pointer]
                      - button [disabled] [ref=f1e351]
                - row [ref=f1e355]:
                  - cell [ref=f1e356]:
                    - generic [ref=f1e357]: QRIS System
                    - generic [ref=f1e358]: Transaksi akan dikenakan biaya MDR sebesar 0,7%
                  - cell [ref=f1e359]: QRIS
                  - cell [ref=f1e360]:
                    - generic [ref=f1e361]: 5 Cabang Aktif
                  - cell [ref=f1e363]:
                    - generic [ref=f1e364]: Aktif
                  - cell [ref=f1e372]:
                    - generic [ref=f1e373]:
                      - button [ref=f1e374] [cursor=pointer]
                      - button [disabled] [ref=f1e379]
                - row [ref=f1e383]:
                  - cell [ref=f1e384]:
                    - generic [ref=f1e385]: GoPay QA 9629
                  - cell [ref=f1e386]: E-Wallet
                  - cell [ref=f1e387]:
                    - generic [ref=f1e388]: 5 Cabang Aktif
                  - cell [ref=f1e390]:
                    - generic [ref=f1e391]: Aktif
                  - cell [ref=f1e399]:
                    - generic [ref=f1e400]:
                      - button [ref=f1e401] [cursor=pointer]
                      - button [ref=f1e406] [cursor=pointer]
                - row [ref=f1e410]:
                  - cell [ref=f1e411]:
                    - generic [ref=f1e412]: GoPay QA 5521
                  - cell [ref=f1e413]: E-Wallet
                  - cell [ref=f1e414]:
                    - generic [ref=f1e415]: 5 Cabang Aktif
                  - cell [ref=f1e417]:
                    - generic [ref=f1e418]: Aktif
                  - cell [ref=f1e426]:
                    - generic [ref=f1e427]:
                      - button [ref=f1e428] [cursor=pointer]
                      - button [ref=f1e433] [cursor=pointer]
                - row [ref=f1e437]:
                  - cell [ref=f1e438]:
                    - generic [ref=f1e439]: GoPay QA 9613
                  - cell [ref=f1e440]: E-Wallet
                  - cell [ref=f1e441]:
                    - generic [ref=f1e442]: 5 Cabang Aktif
                  - cell [ref=f1e444]:
                    - generic [ref=f1e445]: Aktif
                  - cell [ref=f1e453]:
                    - generic [ref=f1e454]:
                      - button [ref=f1e455] [cursor=pointer]
                      - button [ref=f1e460] [cursor=pointer]
                - row [ref=f1e464]:
                  - cell [ref=f1e465]:
                    - generic [ref=f1e466]: GoPay QA 8302
                  - cell [ref=f1e467]: E-Wallet
                  - cell [ref=f1e468]:
                    - generic [ref=f1e469]: 5 Cabang Aktif
                  - cell [ref=f1e471]:
                    - generic [ref=f1e472]: Aktif
                  - cell [ref=f1e480]:
                    - generic [ref=f1e481]:
                      - button [ref=f1e482] [cursor=pointer]
                      - button [ref=f1e487] [cursor=pointer]
                - row [ref=f1e491]:
                  - cell [ref=f1e492]:
                    - generic [ref=f1e493]: GoPay QA 5771
                  - cell [ref=f1e494]: E-Wallet
                  - cell [ref=f1e495]:
                    - generic [ref=f1e496]: 5 Cabang Aktif
                  - cell [ref=f1e498]:
                    - generic [ref=f1e499]: Aktif
                  - cell [ref=f1e507]:
                    - generic [ref=f1e508]:
                      - button [ref=f1e509] [cursor=pointer]
                      - button [ref=f1e514] [cursor=pointer]
                - row [ref=f1e518]:
                  - cell [ref=f1e519]:
                    - generic [ref=f1e520]: GoPay QA 7705
                  - cell [ref=f1e521]: E-Wallet
                  - cell [ref=f1e522]:
                    - generic [ref=f1e523]: 5 Cabang Aktif
                  - cell [ref=f1e525]:
                    - generic [ref=f1e526]: Aktif
                  - cell [ref=f1e534]:
                    - generic [ref=f1e535]:
                      - button [ref=f1e536] [cursor=pointer]
                      - button [ref=f1e541] [cursor=pointer]
                - row [ref=f1e545]:
                  - cell [ref=f1e546]:
                    - generic [ref=f1e547]: GoPay QA 1753
                  - cell [ref=f1e548]: E-Wallet
                  - cell [ref=f1e549]:
                    - generic [ref=f1e550]: 5 Cabang Aktif
                  - cell [ref=f1e552]:
                    - generic [ref=f1e553]: Aktif
                  - cell [ref=f1e561]:
                    - generic [ref=f1e562]:
                      - button [ref=f1e563] [cursor=pointer]
                      - button [ref=f1e568] [cursor=pointer]
                - row [ref=f1e572]:
                  - cell [ref=f1e573]:
                    - generic [ref=f1e574]: GoPay QA 8292
                  - cell [ref=f1e575]: E-Wallet
                  - cell [ref=f1e576]:
                    - generic [ref=f1e577]: 5 Cabang Aktif
                  - cell [ref=f1e579]:
                    - generic [ref=f1e580]: Aktif
                  - cell [ref=f1e588]:
                    - generic [ref=f1e589]:
                      - button [ref=f1e590] [cursor=pointer]
                      - button [ref=f1e595] [cursor=pointer]
                - row [ref=f1e599]:
                  - cell [ref=f1e600]:
                    - generic [ref=f1e601]: GoPay QA 9238
                  - cell [ref=f1e602]: E-Wallet
                  - cell [ref=f1e603]:
                    - generic [ref=f1e604]: 5 Cabang Aktif
                  - cell [ref=f1e606]:
                    - generic [ref=f1e607]: Aktif
                  - cell [ref=f1e615]:
                    - generic [ref=f1e616]:
                      - button [ref=f1e617] [cursor=pointer]
                      - button [ref=f1e622] [cursor=pointer]
                - row [ref=f1e626]:
                  - cell [ref=f1e627]:
                    - generic [ref=f1e628]: GoPay QA 7419
                  - cell [ref=f1e629]: E-Wallet
                  - cell [ref=f1e630]:
                    - generic [ref=f1e631]: 5 Cabang Aktif
                  - cell [ref=f1e633]:
                    - generic [ref=f1e634]: Aktif
                  - cell [ref=f1e642]:
                    - generic [ref=f1e643]:
                      - button [ref=f1e644] [cursor=pointer]
                      - button [ref=f1e649] [cursor=pointer]
                - row [ref=f1e653]:
                  - cell [ref=f1e654]:
                    - generic [ref=f1e655]: GoPay QA 3930
                  - cell [ref=f1e656]: E-Wallet
                  - cell [ref=f1e657]:
                    - generic [ref=f1e658]: 5 Cabang Aktif
                  - cell [ref=f1e660]:
                    - generic [ref=f1e661]: Aktif
                  - cell [ref=f1e669]:
                    - generic [ref=f1e670]:
                      - button [ref=f1e671] [cursor=pointer]
                      - button [ref=f1e676] [cursor=pointer]
                - row [ref=f1e680]:
                  - cell [ref=f1e681]:
                    - generic [ref=f1e682]: GoPay QA 6947
                  - cell [ref=f1e683]: E-Wallet
                  - cell [ref=f1e684]:
                    - generic [ref=f1e685]: 5 Cabang Aktif
                  - cell [ref=f1e687]:
                    - generic [ref=f1e688]: Aktif
                  - cell [ref=f1e696]:
                    - generic [ref=f1e697]:
                      - button [ref=f1e698] [cursor=pointer]
                      - button [ref=f1e703] [cursor=pointer]
                - row [ref=f1e707]:
                  - cell [ref=f1e708]:
                    - generic [ref=f1e709]: GoPay QA 1609
                  - cell [ref=f1e710]: E-Wallet
                  - cell [ref=f1e711]:
                    - generic [ref=f1e712]: 5 Cabang Aktif
                  - cell [ref=f1e714]:
                    - generic [ref=f1e715]: Aktif
                  - cell [ref=f1e723]:
                    - generic [ref=f1e724]:
                      - button [ref=f1e725] [cursor=pointer]
                      - button [ref=f1e730] [cursor=pointer]
                - row [ref=f1e734]:
                  - cell [ref=f1e735]:
                    - generic [ref=f1e736]: GoPay QA 6833
                  - cell [ref=f1e737]: E-Wallet
                  - cell [ref=f1e738]:
                    - generic [ref=f1e739]: 5 Cabang Aktif
                  - cell [ref=f1e741]:
                    - generic [ref=f1e742]: Aktif
                  - cell [ref=f1e750]:
                    - generic [ref=f1e751]:
                      - button [ref=f1e752] [cursor=pointer]
                      - button [ref=f1e757] [cursor=pointer]
                - row [ref=f1e761]:
                  - cell [ref=f1e762]:
                    - generic [ref=f1e763]: GoPay QA 7374
                  - cell [ref=f1e764]: E-Wallet
                  - cell [ref=f1e765]:
                    - generic [ref=f1e766]: 5 Cabang Aktif
                  - cell [ref=f1e768]:
                    - generic [ref=f1e769]: Aktif
                  - cell [ref=f1e777]:
                    - generic [ref=f1e778]:
                      - button [ref=f1e779] [cursor=pointer]
                      - button [ref=f1e784] [cursor=pointer]
                - row [ref=f1e788]:
                  - cell [ref=f1e789]:
                    - generic [ref=f1e790]: GoPay QA 9414
                  - cell [ref=f1e791]: E-Wallet
                  - cell [ref=f1e792]:
                    - generic [ref=f1e793]: 5 Cabang Aktif
                  - cell [ref=f1e795]:
                    - generic [ref=f1e796]: Aktif
                  - cell [ref=f1e804]:
                    - generic [ref=f1e805]:
                      - button [ref=f1e806] [cursor=pointer]
                      - button [ref=f1e811] [cursor=pointer]
                - row [ref=f1e815]:
                  - cell [ref=f1e816]:
                    - generic [ref=f1e817]: GoPay QA 2698
                  - cell [ref=f1e818]: E-Wallet
                  - cell [ref=f1e819]:
                    - generic [ref=f1e820]: 5 Cabang Aktif
                  - cell [ref=f1e822]:
                    - generic [ref=f1e823]: Aktif
                  - cell [ref=f1e831]:
                    - generic [ref=f1e832]:
                      - button [ref=f1e833] [cursor=pointer]
                      - button [ref=f1e838] [cursor=pointer]
                - row [ref=f1e842]:
                  - cell [ref=f1e843]:
                    - generic [ref=f1e844]: GoPay QA 3785
                  - cell [ref=f1e845]: E-Wallet
                  - cell [ref=f1e846]:
                    - generic [ref=f1e847]: 5 Cabang Aktif
                  - cell [ref=f1e849]:
                    - generic [ref=f1e850]: Aktif
                  - cell [ref=f1e858]:
                    - generic [ref=f1e859]:
                      - button [ref=f1e860] [cursor=pointer]
                      - button [ref=f1e865] [cursor=pointer]
            - generic [ref=f1e872]:
              - generic [ref=f1e873]:
                - paragraph [ref=f1e874]: Rows per page
                - textbox [ref=f1e877] [cursor=pointer]: "25"
              - paragraph [ref=f1e878]: 1-20 of 20
              - generic [ref=f1e879]:
                - button [disabled] [ref=f1e880]
                - button [disabled] [ref=f1e884]
    - link [ref=f1e888] [cursor=pointer]:
      - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
      - generic [ref=f1e889]: Konsultasi Sekarang
  - dialog [ref=f1e896]:
    - generic [ref=f1e898]:
      - generic [ref=f1e901]:
        - paragraph [ref=f1e902]: Anda Telah Sampai Pada Batas Maksimal.
        - paragraph [ref=f1e903]: Akun Anda tidak dapat menambahkan karena sudah mencapai batas. Berlangganan/Upgrade paket anda
      - generic [ref=f1e904]:
        - button [active] [ref=f1e905] [cursor=pointer]:
          - generic [ref=f1e906]: Berlangganan/Upgrade Paket
        - button [ref=f1e908] [cursor=pointer]:
          - generic [ref=f1e909]: Tutup
  - dialog [ref=f1e912]:
    - banner [ref=f1e913]:
      - heading [level=2] [ref=f1e914]: Tambah Metode Pembayaran
      - button [ref=f1e915] [cursor=pointer]
    - generic [ref=f1e919]:
      - generic [ref=f1e920]:
        - generic [ref=f1e921]:
          - generic [ref=f1e922]: Nama Metode Pembayaran *
          - textbox [ref=f1e924]:
            - /placeholder: Masukkan Nama Metode Pembayaran
            - text: Hapus QA 1144
        - generic [ref=f1e925]:
          - generic [ref=f1e926]: Tipe Metode Pembayaran *
          - textbox [ref=f1e928] [cursor=pointer]:
            - /placeholder: Pilih Tipe Metode Pembayaran
            - text: E-Wallet
      - generic [ref=f1e933]:
        - button [ref=f1e934] [cursor=pointer]:
          - generic [ref=f1e935]: Batal
        - button [ref=f1e937] [cursor=pointer]:
          - generic [ref=f1e938]: Simpan
```

# Test source

```ts
  278 |           { timeout: 20000 }
  279 |         ).catch(() => null),
  280 |         simpanBtn.click(),
  281 |       ]);
  282 | 
  283 |       // Verifikasi modal tertutup
  284 |       await expect(modal).not.toBeVisible({ timeout: 10000 });
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
  346 | 
  347 |   // ==========================================
  348 |   // 6. HAPUS METODE PEMBAYARAN (DELETE)
  349 |   // ==========================================
  350 | 
  351 |   test('[TC-11] Membuka modal konfirmasi hapus metode pembayaran dan membatalkannya', async ({ page }) => {
  352 |     await test.step('Buka dan periksa rincian: Membuka modal konfirmasi hapus metode pembayaran dan membatalkannya', async () => {
  353 |       // 1. Buat metode pembayaran kustom sementara
  354 |       const deleteName = 'Hapus QA ' + Math.floor(Math.random() * 9000 + 1000);
  355 |       const tambahBtn = page.getByRole('button', { name: /Tambah Metode Pembayaran/i }).first();
  356 |       await tambahBtn.click();
  357 | 
  358 |       const addModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
  359 |       await expect(addModal).toBeVisible({ timeout: 5000 });
  360 | 
  361 |       const nameInput = addModal.getByPlaceholder('Masukkan Nama Metode Pembayaran').first();
  362 |       await nameInput.fill(deleteName);
  363 | 
  364 |       const tipeInput = addModal.getByPlaceholder('Pilih Tipe Metode Pembayaran').first();
  365 |       await tipeInput.click();
  366 |       const option = page.locator('[role="option"]:visible, .mantine-Select-option:visible').filter({ hasText: /^E-Wallet$/i }).first();
  367 |       await expect(option).toBeVisible({ timeout: 5000 });
  368 |       await option.click();
  369 | 
  370 |       const simpanBtn = addModal.getByRole('button', { name: 'Simpan', exact: true }).first();
  371 |       await Promise.all([
  372 |         page.waitForResponse(
  373 |           res => res.url().includes('payment-method') && (res.request().method() === 'POST' || res.request().method() === 'PUT') && (res.status() === 200 || res.status() === 201),
  374 |           { timeout: 20000 }
  375 |         ).catch(() => null),
  376 |         simpanBtn.click(),
  377 |       ]);
> 378 |       await expect(addModal).not.toBeVisible({ timeout: 10000 });
      |                                  ^ Error: expect(locator).not.toBeVisible() failed
  379 | 
  380 |       // 2. Cari baris metode pembayaran yang baru dibuat
  381 |       const targetRow = page.locator('table:visible tbody tr').filter({ hasText: deleteName }).first();
  382 |       await expect(targetRow).toBeVisible({ timeout: 10000 });
  383 | 
  384 |       // 3. Klik tombol hapus (tombol terakhir pada baris)
  385 |       const deleteBtn = targetRow.locator('button').last();
  386 |       await expect(deleteBtn).toBeEnabled({ timeout: 5000 });
  387 |       await deleteBtn.click();
  388 | 
  389 |       // 4. Verifikasi modal konfirmasi hapus muncul
  390 |       const deleteModal = page.locator('[role="dialog"]:visible, .mantine-Modal-content:visible').first();
  391 |       await expect(deleteModal).toBeVisible({ timeout: 5000 });
  392 |       console.log('Delete modal text:', await deleteModal.innerText());
  393 | 
  394 |       // 5. Verifikasi tombol Batal dan Hapus pada modal
  395 |       const batalBtn = deleteModal.getByRole('button', { name: /Batal/i }).first();
  396 |       await expect(batalBtn).toBeVisible({ timeout: 5000 });
  397 |       await batalBtn.click();
  398 | 
  399 |       // Modal harus tertutup dan baris masih ada
  400 |       await expect(deleteModal).not.toBeVisible({ timeout: 5000 });
  401 |       await expect(targetRow).toBeVisible({ timeout: 5000 });
  402 |     });
  403 |   });
  404 | });
  405 | 
  406 | 
```