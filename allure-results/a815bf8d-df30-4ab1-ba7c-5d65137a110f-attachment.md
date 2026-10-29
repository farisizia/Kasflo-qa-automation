# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Kasflo-Resto/Promosi/display_promosi.spec.js >> Display Promosi >> [TC-06] Tombol Batal dapat diklik dan menutup modal form upload
- Location: tests/Kasflo-Resto/Promosi/display_promosi.spec.js:218:3

# Error details

```
Test timeout of 60000ms exceeded.
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
        - generic [ref=f1e52]:
          - link "Harga Spesial" [ref=f1e53] [cursor=pointer]:
            - /url: /admin/promotion/special-price
          - link "Kampanye Promosi" [ref=f1e55] [cursor=pointer]:
            - /url: /admin/promotion/campaign
          - link "Display Promosi" [ref=f1e57] [cursor=pointer]:
            - /url: /admin/promotion/display
          - link "Poin" [ref=f1e59] [cursor=pointer]:
            - /url: /admin/promotion/point
          - link "Reward" [ref=f1e61] [cursor=pointer]:
            - /url: /admin/promotion/reward
        - link [ref=f1e63] [cursor=pointer]:
          - /url: /admin/customer
          - paragraph [ref=f1e72]: Pelanggan
        - link [ref=f1e76] [cursor=pointer]:
          - /url: /admin/cash-account
          - paragraph [ref=f1e84]: Pembukuan
        - link [ref=f1e88] [cursor=pointer]:
          - /url: /admin/report
          - paragraph [ref=f1e96]: Laporan Usaha
        - link [ref=f1e100] [cursor=pointer]:
          - /url: /admin/user-management
          - paragraph [ref=f1e108]: Manajemen User
        - link [ref=f1e112] [cursor=pointer]:
          - /url: /admin/setting
          - paragraph [ref=f1e119]: Pengaturan
    - main [ref=f1e123]:
      - generic [ref=f1e124]:
        - generic [ref=f1e126]:
          - paragraph [ref=f1e131]: Display Promosi
          - generic [ref=f1e132]:
            - button "Premium" [ref=f1e134] [cursor=pointer]
            - button "Saldo QRIS" [ref=f1e142] [cursor=pointer]
            - button [ref=f1e148] [cursor=pointer]:
              - generic [ref=f1e155]:
                - paragraph [ref=f1e156]: Kasflo Automation
                - paragraph [ref=f1e157]: OWNER
        - generic [ref=f1e160]:
          - link [ref=f1e161] [cursor=pointer]:
            - /url: /admin/dashboard
          - generic [ref=f1e165]: /
          - paragraph [ref=f1e166]: Display Promosi
        - generic [ref=f1e170]:
          - textbox "Pilih Cabang" [ref=f1e171] [cursor=pointer]: Kasflo Pusat QA
          - button [ref=f1e174] [cursor=pointer]
        - generic [ref=f1e182]:
          - generic [ref=f1e183]:
            - generic [ref=f1e184]: Tipe File
            - textbox "Tipe File" [ref=f1e186] [cursor=pointer]:
              - /placeholder: Pilih Tipe File
              - text: Gambar
          - button "Tambah Gambar" [ref=f1e187] [cursor=pointer]
  - link "Konsultasi Sekarang" [ref=f1e199] [cursor=pointer]:
    - /url: https://api.whatsapp.com/send/?phone=&type=phone_number&app_absent=0
```