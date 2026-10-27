import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = [
  {
    folder: 'Bahan Baku',
    file: 'tests/Bahan Baku/resep.spec.js',
    suite: 'Resep Bahan Baku',
    tests: [
      { tc: 'TC-01', title: 'Membuka halaman resep bahan baku dan memvalidasi elemen utama', duration: 3200, status: 'passed' },
      { tc: 'TC-02', title: 'Filter resep bahan baku berdasarkan cabang aktif', duration: 4100, status: 'passed' },
      { tc: 'TC-03', title: 'Pencarian resep dengan kata kunci nama menu yang valid', duration: 2800, status: 'passed' },
      { tc: 'TC-04', title: 'Validasi form tambah resep jika kolom wajib kosong', duration: 3500, status: 'passed' },
      { tc: 'TC-05', title: 'Membuka modal tambah bahan baku dan membatalkannya', duration: 14500, status: 'passed' },
      { tc: 'TC-06', title: 'Tambah resep baru berhasil dan muncul di tabel', duration: 18200, status: 'passed' },
      { tc: 'TC-07', title: 'Navigasi ke halaman detail resep dan periksa komposisi', duration: 5200, status: 'passed' },
      { tc: 'TC-08', title: 'Edit resep bahan baku dan simpan perubahan gramatur', duration: 8900, status: 'flaky', retries: 1 },
      { tc: 'TC-09', title: 'Hapus resep bahan baku dengan konfirmasi modal', duration: 6100, status: 'passed' },
    ]
  },
  {
    folder: 'Bahan Baku',
    file: 'tests/Bahan Baku/data_bahan_baku.spec.js',
    suite: 'Data Bahan Baku',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan daftar master bahan baku dengan pagination', duration: 2900, status: 'passed' },
      { tc: 'TC-02', title: 'Pencarian bahan baku berdasarkan SKU dan nama item', duration: 3100, status: 'passed' },
      { tc: 'TC-03', title: 'Tambah bahan baku baru dengan satuan kilogram', duration: 7400, status: 'passed' },
      { tc: 'TC-04', title: 'Validasi input harga modal bahan baku bernilai negatif', duration: 2500, status: 'passed' },
      { tc: 'TC-05', title: 'Update minimum stok peringatan bahan baku', duration: 5800, status: 'passed' },
    ]
  },
  {
    folder: 'Katalog',
    file: 'tests/Katalog/menu.spec.js',
    suite: 'Manajemen Menu',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan grid katalog menu beserta badge status ketersediaan', duration: 3800, status: 'passed' },
      { tc: 'TC-02', title: 'Filter menu berdasarkan kategori makanan utama', duration: 2700, status: 'passed' },
      { tc: 'TC-03', title: 'Tambah menu makanan baru dengan foto dan harga dasar', duration: 12400, status: 'passed' },
      { tc: 'TC-04', title: 'Toggle switch ketersediaan menu aktif/nonaktif realtime', duration: 4200, status: 'passed' },
      { tc: 'TC-05', title: 'Duplikasi menu untuk variasi rasa berbeda', duration: 6100, status: 'passed' },
      { tc: 'TC-06', title: 'Validasi harga jual tidak boleh lebih kecil dari harga modal', duration: 3300, status: 'passed' },
      { tc: 'TC-07', title: 'Bulk action update status beberapa menu sekaligus', duration: 8900, status: 'passed' },
    ]
  },
  {
    folder: 'Katalog',
    file: 'tests/Katalog/manajemen_stok.spec.js',
    suite: 'Manajemen Stok',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan tabel stok menu per cabang dengan filter aktif', duration: 3400, status: 'passed' },
      { tc: 'TC-02', title: 'Pencarian stok menu berdasarkan nama cabang', duration: 2900, status: 'passed' },
      { tc: 'TC-03', title: 'Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', duration: 3100, status: 'passed' },
      { tc: 'TC-04', title: 'Update kuota stok harian menu terbatas', duration: 6500, status: 'passed' },
      { tc: 'TC-05', title: 'Setel opsi Stok Unlimited pada minuman botol', duration: 4800, status: 'passed' },
    ]
  },
  {
    folder: 'Katalog',
    file: 'tests/Katalog/menu_self_order.spec.js',
    suite: 'Menu Self Order',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan konfigurasi menu QR self order per meja', duration: 3300, status: 'passed' },
      { tc: 'TC-02', title: 'Cari/filter data menu self order dengan search box', duration: 4300, status: 'passed' },
      { tc: 'TC-03', title: 'Generate QR code dinamis untuk meja VIP 01', duration: 5200, status: 'passed' },
      { tc: 'TC-04', title: 'Pengaturan jam operasional self order cabang pusat', duration: 4100, status: 'passed' },
    ]
  },
  {
    folder: 'Manajemen User',
    file: 'tests/Manajemen User/manajemen_user.spec.js',
    suite: 'Manajemen User Karyawan',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan tabel daftar pengguna kasir dan manajer cabang', duration: 3100, status: 'passed' },
      { tc: 'TC-02', title: 'Filter pengguna berdasarkan role Kasir Outlet', duration: 2600, status: 'passed' },
      { tc: 'TC-03', title: 'Validasi form tambah user jika Nomor WhatsApp kosong', duration: 3800, status: 'passed' },
      { tc: 'TC-11', title: '[CRUD] Alur lengkap Create, Read, Update, dan Delete User Karyawan', duration: 10400, status: 'passed' },
      { tc: 'TC-12', title: 'Menguji interaksi perubahan status aktif / nonaktif karyawan', duration: 7300, status: 'passed' },
      { tc: 'TC-13', title: 'Modal konfirmasi hapus menjaga tombol Hapus tetap nonaktif jika username salah ketik', duration: 7100, status: 'passed' },
    ]
  },
  {
    folder: 'Promosi',
    file: 'tests/Promosi/harga_spesial.spec.js',
    suite: 'Harga Spesial',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan halaman harga spesial dengan tabel, header, dan filter yang sesuai', duration: 4200, status: 'passed' },
      { tc: 'TC-02', title: 'Membuka form buat harga spesial dan memeriksa elemen input wajib', duration: 3900, status: 'passed' },
      { tc: 'TC-03', title: 'Tombol batalkan pada form buat harga spesial mengembalikan ke halaman list promo', duration: 4500, status: 'passed' },
      { tc: 'TC-04', title: 'Validasi form buat harga spesial: submit tanpa data wajib tidak keluar dari halaman form', duration: 3100, status: 'passed' },
      { tc: 'TC-05', title: 'Membuka dan membatalkan modal tambah menu pada form buat harga spesial', duration: 5800, status: 'passed' },
      { tc: 'TC-06', title: 'Tambah harga spesial baru berhasil dan tampil di tabel', duration: 13700, status: 'passed' },
      { tc: 'TC-07', title: 'Filter harga spesial berdasarkan cabang', duration: 4800, status: 'passed' },
      { tc: 'TC-08', title: 'Filter harga spesial berdasarkan status promo', duration: 4100, status: 'passed' },
      { tc: 'TC-09', title: 'Navigasi ke halaman detail harga spesial via aksi tabel', duration: 5100, status: 'passed' },
      { tc: 'TC-10', title: 'Navigasi ke form edit harga spesial via aksi tabel', duration: 5400, status: 'passed' },
      { tc: 'TC-11', title: 'Batal menghapus harga spesial melalui modal konfirmasi', duration: 4900, status: 'passed' },
      { tc: 'TC-12', title: 'Hapus harga spesial berhasil dengan konfirmasi modal', duration: 15200, status: 'passed' },
    ]
  },
  {
    folder: 'Promosi',
    file: 'tests/Promosi/kampanye_promosi.spec.js',
    suite: 'Kampanye Promosi',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan banner promosi aktif pada halaman kasir POS', duration: 3700, status: 'passed' },
      { tc: 'TC-02', title: 'Buat kupon diskon persentase 20% dengan batas minimum belanja', duration: 8200, status: 'passed' },
      { 
        tc: 'TC-03', 
        title: 'Validasi kupon kedaluwarsa otomatis dinonaktifkan sistem', 
        duration: 21500, 
        status: 'failed', 
        retries: 1,
        error: {
          message: "Error: expect(locator).toHaveText(expected)\n\nExpected: 'Expired'\nReceived: 'Active'\nCall log:\n  - expect.toHaveText with timeout 15000ms\n  - waiting for locator('.badge-status')",
          stack: "Error: expect(locator).toHaveText(expected)\n    at Object.test (tests/Promosi/kampanye_promosi.spec.js:142:31)\n    at /Users/farisizia/Kasflo Resto/node_modules/@playwright/test/lib/worker/testInfo.js:145:11"
        }
      },
      { tc: 'TC-04', title: 'Limit kuota penggunaan voucher maksimal 1x per pelanggan', duration: 6700, status: 'passed' },
    ]
  },
  {
    folder: 'Pembukuan',
    file: 'tests/Pembukuan/data_pembukuan.spec.js',
    suite: 'Data Pembukuan Kas',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan mutasi kas masuk dan kas keluar harian', duration: 3600, status: 'passed' },
      { tc: 'TC-02', title: 'Catat kas keluar untuk pembelian perlengkapan operasional', duration: 7800, status: 'passed' },
      { tc: 'TC-03', title: 'Rekonsiliasi saldo kas laci dengan total transaksi POS', duration: 9400, status: 'flaky', retries: 1 },
      { 
        tc: 'TC-04', 
        title: 'Export laporan mutasi kas ke format Excel .xlsx', 
        duration: 30000, 
        status: 'failed', 
        retries: 1,
        error: {
          message: "TimeoutError: page.waitForEvent: Timeout 30000ms exceeded while waiting for event \"download\"\n=========================== logs ===========================\nwaiting for download\n============================================================",
          stack: "TimeoutError: page.waitForEvent: Timeout 30000ms exceeded while waiting for event \"download\"\n    at exportExcel (/Users/farisizia/Kasflo Resto/tests/Pembukuan/data_pembukuan.spec.js:88:29)\n    at Object.test (/Users/farisizia/Kasflo Resto/tests/Pembukuan/data_pembukuan.spec.js:94:7)"
        }
      },
    ]
  },
  {
    folder: 'Pengaturan',
    file: 'tests/Pengaturan/metode_pembayaran.spec.js',
    suite: 'Metode Pembayaran',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan daftar channel pembayaran QRIS, EDC, dan Tunai', duration: 3200, status: 'passed' },
      { tc: 'TC-02', title: 'Aktivasi MDR merchant untuk pembayaran Kartu Kredit Visa/Mastercard', duration: 6100, status: 'passed' },
      { tc: 'TC-03', title: 'Konfigurasi pembulatan nominal kembalian otomatis', duration: 4200, status: 'passed' },
    ]
  },
  {
    folder: 'Pengaturan',
    file: 'tests/Pengaturan/pajak_biaya_lainnya.spec.js',
    suite: 'Pajak & Biaya Layanan',
    tests: [
      { tc: 'TC-01', title: 'Pengaturan persentase PB1 resto sebesar 10%', duration: 3900, status: 'passed' },
      { tc: 'TC-02', title: 'Pengaturan service charge 5% berlaku untuk Dine-In saja', duration: 4800, status: 'passed' },
      { tc: 'TC-03', title: 'Simulasi perhitungan total tagihan sebelum dan sesudah pajak', duration: 5200, status: 'passed' },
    ]
  },
  {
    folder: 'Laporan Usaha',
    file: 'tests/Laporan Usaha/laba_rugi.spec.js',
    suite: 'Laporan Laba Rugi',
    tests: [
      { tc: 'TC-01', title: 'Filter laporan laba rugi rentang tanggal bulan berjalan', duration: 4500, status: 'passed' },
      { tc: 'TC-02', title: 'Validasi kalkulasi laba kotor terhadap HPP resep menu', duration: 6700, status: 'passed' },
      { tc: 'TC-03', title: 'Grafik tren omset penjualan harian tampil dengan akurat', duration: 4900, status: 'passed' },
      { tc: 'TC-04', title: 'Integrasi rincian biaya operasional non-bahan baku ke net profit', duration: 0, status: 'skipped' },
    ]
  },
  {
    folder: 'Autentikasi',
    file: 'tests/login.spec.js',
    suite: 'Login Kasflo Resto',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan form login', duration: 1308, status: 'passed' },
      { tc: 'TC-02', title: 'Link Lupa kata sandi mengarah ke /forgot-password', duration: 554, status: 'passed' },
      { tc: 'TC-03', title: 'Link Daftar mengarah ke /register', duration: 469, status: 'passed' },
      { tc: 'TC-04', title: 'Validasi field kosong saat klik tombol Masuk', duration: 987, status: 'passed' },
      { tc: 'TC-05', title: 'Login gagal dengan kredensial yang salah', duration: 849, status: 'passed' },
      { tc: 'TC-06', title: 'Mengisi email dan password pada form login', duration: 514, status: 'passed' },
      { tc: 'TC-07', title: 'Login berhasil dengan kredensial valid', duration: 12600, status: 'passed' },
    ]
  }
];

// Transform to Playwright JSON Reporter format
const suites = modules.map((m, mIdx) => {
  const specs = m.tests.map((t, tIdx) => {
    const isFailed = t.status === 'failed';
    const isFlaky = t.status === 'flaky';
    const isSkipped = t.status === 'skipped';

    const results = [];
    if (isSkipped) {
      results.push({
        workerIndex: 0,
        status: 'skipped',
        duration: 0,
        errors: [],
        retry: 0,
        startTime: new Date().toISOString(),
        attachments: [],
      });
    } else if (isFlaky) {
      // First attempt failed
      results.push({
        workerIndex: 0,
        status: 'failed',
        duration: Math.round(t.duration * 0.6),
        errors: [{ message: 'TimeoutError: locator timed out on first attempt' }],
        retry: 0,
        startTime: new Date(Date.now() - 30000).toISOString(),
        attachments: [
          {
            name: 'screenshot',
            contentType: 'image/png',
            path: 'test-results/flaky-retry0.png',
          }
        ],
      });
      // Second attempt passed
      results.push({
        workerIndex: 0,
        status: 'passed',
        duration: t.duration,
        errors: [],
        retry: 1,
        startTime: new Date().toISOString(),
        attachments: [
          {
            name: 'video',
            contentType: 'video/webm',
            path: 'test-results/flaky-video.webm',
          }
        ],
      });
    } else if (isFailed) {
      // Failed attempts
      results.push({
        workerIndex: 0,
        status: 'failed',
        duration: t.duration,
        error: t.error,
        errors: [t.error],
        retry: 0,
        startTime: new Date().toISOString(),
        attachments: [
          {
            name: 'screenshot',
            contentType: 'image/png',
            path: 'test-results/failed-screenshot.png',
          },
          {
            name: 'video',
            contentType: 'video/webm',
            path: 'test-results/failed-video.webm',
          },
          {
            name: 'trace',
            contentType: 'application/zip',
            path: 'test-results/failed-trace.zip',
          }
        ],
      });
    } else {
      // Passed
      results.push({
        workerIndex: 0,
        status: 'passed',
        duration: t.duration,
        errors: [],
        retry: 0,
        steps: [
          { title: 'Inisialisasi sesi login dan navigasi', duration: 850 },
          { title: t.title, duration: Math.max(100, t.duration - 850) }
        ],
        startTime: new Date().toISOString(),
        attachments: [
          {
            name: 'video',
            contentType: 'video/webm',
            path: 'test-results/passed-video.webm',
          }
        ],
      });
    }

    return {
      title: `[${t.tc}] ${t.title}`,
      ok: !isFailed,
      tags: [],
      tests: [
        {
          timeout: 60000,
          annotations: [],
          expectedStatus: isSkipped ? 'skipped' : 'passed',
          projectId: 'chromium',
          projectName: 'chromium',
          status: isFailed ? 'unexpected' : (isFlaky ? 'flaky' : (isSkipped ? 'skipped' : 'expected')),
          results,
        }
      ],
      id: `spec-${mIdx}-${tIdx}`,
      file: m.file,
      line: 20 + tIdx * 15,
      column: 3,
    };
  });

  return {
    title: m.file.replace(/^tests\//, ''),
    file: m.file,
    column: 0,
    line: 0,
    specs: [],
    suites: [
      {
        title: m.suite,
        file: m.file,
        line: 3,
        column: 6,
        specs,
      }
    ]
  };
});

let totalTests = 0;
let expected = 0;
let unexpected = 0;
let flaky = 0;
let skipped = 0;
let totalDuration = 0;

for (const s of suites) {
  for (const sub of s.suites) {
    for (const sp of sub.specs) {
      totalTests++;
      const t = sp.tests[0];
      if (t.status === 'expected') expected++;
      else if (t.status === 'unexpected') unexpected++;
      else if (t.status === 'flaky') flaky++;
      else if (t.status === 'skipped') skipped++;
      totalDuration += t.results.reduce((a, r) => a + (r.duration || 0), 0);
    }
  }
}

const report = {
  config: {
    version: '1.63.0',
    rootDir: '/Users/farisizia/Kasflo Resto/tests',
    workers: 1,
  },
  suites,
  errors: [],
  stats: {
    startTime: new Date(Date.now() - totalDuration).toISOString(),
    duration: totalDuration,
    expected,
    unexpected,
    flaky,
    skipped,
  }
};

const outputDir = path.resolve(__dirname, '../public/data');
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify(report, null, 2));

console.log(`Successfully generated dummy results.json with ${totalTests} tests (${expected} passed, ${unexpected} failed, ${flaky} flaky, ${skipped} skipped).`);
