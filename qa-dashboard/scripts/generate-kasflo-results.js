import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. DATA KASFLO RESTO
const restoModules = [
  {
    folder: 'Bahan Baku',
    file: 'tests/Kasflo-Resto/Bahan Baku/data_bahan_baku.spec.js',
    suite: 'Data Bahan Baku',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan halaman data bahan baku dengan tabel, header, filter, dan tab yang sesuai', duration: 3200, status: 'passed' },
      { tc: 'TC-02', title: 'Navigasi ke halaman buat bahan baku mentah dan memverifikasi form elements', duration: 4100, status: 'passed' },
      { tc: 'TC-03', title: 'Tombol batalkan pada form buat bahan baku mentah kembali ke list tanpa menyimpan', duration: 3800, status: 'passed' },
      { tc: 'TC-04', title: 'Validasi form buat bahan baku mentah: tombol simpan disabled jika input wajib belum diisi', duration: 2900, status: 'passed' },
      { tc: 'TC-05', title: 'Tambah bahan baku mentah baru berhasil dan muncul di tabel', duration: 11200, status: 'passed' },
      { tc: 'TC-06', title: 'Cari/filter data bahan baku dengan search box', duration: 4600, status: 'passed' },
      { tc: 'TC-07', title: 'Beralih ke tab bahan baku setengah jadi dan kembali ke bahan baku mentah', duration: 3500, status: 'passed' },
      { tc: 'TC-08', title: 'Navigasi ke halaman buat bahan baku setengah jadi dan memverifikasi form elements', duration: 4200, status: 'passed' },
      { tc: 'TC-09', title: 'Navigasi ke halaman edit bahan baku mentah via aksi tabel', duration: 5100, status: 'passed' },
      { tc: 'TC-10', title: 'Edit bahan baku mentah dan simpan perubahan', duration: 8400, status: 'passed' },
      { tc: 'TC-11', title: 'Batal menghapus bahan baku mentah melalui modal konfirmasi', duration: 3900, status: 'passed' },
      { tc: 'TC-12', title: 'Hapus bahan baku mentah berhasil dengan konfirmasi modal', duration: 9200, status: 'passed' },
    ]
  },
  {
    folder: 'Bahan Baku',
    file: 'tests/Kasflo-Resto/Bahan Baku/resep.spec.js',
    suite: 'Resep Bahan Baku',
    tests: [
      { tc: 'TC-01', title: 'Membuka halaman resep bahan baku dan memvalidasi elemen utama', duration: 3200, status: 'passed' },
      { tc: 'TC-02', title: 'Filter resep bahan baku berdasarkan cabang aktif', duration: 4100, status: 'passed' },
      { tc: 'TC-03', title: 'Pencarian resep dengan kata kunci nama menu yang valid', duration: 2800, status: 'passed' },
      { tc: 'TC-04', title: 'Validasi form tambah resep jika kolom wajib kosong', duration: 3500, status: 'passed' },
      { tc: 'TC-05', title: 'Membuka modal tambah bahan baku dan membatalkannya', duration: 14500, status: 'passed' },
      { tc: 'TC-06', title: 'Tambah resep baru berhasil dan muncul di tabel', duration: 13700, status: 'passed' },
    ]
  },
  {
    folder: 'Katalog',
    file: 'tests/Kasflo-Resto/Katalog/menu.spec.js',
    suite: 'Manajemen Menu',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan grid katalog menu beserta badge status ketersediaan', duration: 3800, status: 'passed' },
      { tc: 'TC-02', title: 'Filter menu berdasarkan kategori makanan utama', duration: 2700, status: 'passed' },
      { tc: 'TC-03', title: 'Tambah menu makanan baru dengan foto dan harga dasar', duration: 12400, status: 'passed' },
      { tc: 'TC-04', title: 'Toggle switch ketersediaan menu aktif/nonaktif realtime', duration: 4200, status: 'passed' },
      { tc: 'TC-05', title: 'Validasi harga jual tidak boleh lebih kecil dari harga modal', duration: 3300, status: 'passed' },
    ]
  },
  {
    folder: 'Katalog',
    file: 'tests/Kasflo-Resto/Katalog/manajemen_stok.spec.js',
    suite: 'Manajemen Stok',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan tabel stok menu per cabang dengan filter aktif', duration: 3400, status: 'passed' },
      { tc: 'TC-02', title: 'Pencarian stok menu berdasarkan nama cabang', duration: 2900, status: 'passed' },
      { tc: 'TC-03', title: 'Navigasi ke halaman detail manajemen stok dan memverifikasi data menu stok', duration: 2200, status: 'passed' },
    ]
  },
  {
    folder: 'Katalog',
    file: 'tests/Kasflo-Resto/Katalog/menu_self_order.spec.js',
    suite: 'Menu Self Order',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan konfigurasi menu QR self order per meja', duration: 3300, status: 'passed' },
      { tc: 'TC-02', title: 'Cari/filter data menu self order dengan search box', duration: 4300, status: 'passed' },
      { tc: 'TC-03', title: 'Membuka modal kode qr self order dan memverifikasi kontennya', duration: 5100, status: 'passed' },
    ]
  },
  {
    folder: 'Manajemen User',
    file: 'tests/Kasflo-Resto/Manajemen User/manajemen_user.spec.js',
    suite: 'Manajemen User Karyawan',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan tabel daftar pengguna kasir dan manajer cabang', duration: 3100, status: 'passed' },
      { tc: 'TC-11', title: '[CRUD] Alur lengkap Create, Read, Update, dan Delete User Karyawan', duration: 10400, status: 'passed' },
      { tc: 'TC-12', title: 'Menguji interaksi perubahan status aktif / nonaktif karyawan', duration: 7300, status: 'passed' },
      { tc: 'TC-13', title: 'Modal konfirmasi hapus menjaga tombol Hapus tetap nonaktif jika username salah ketik', duration: 7100, status: 'passed' },
    ]
  },
  {
    folder: 'Promosi',
    file: 'tests/Kasflo-Resto/Promosi/harga_spesial.spec.js',
    suite: 'Harga Spesial Resto',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan halaman harga spesial dengan tabel, header, dan filter yang sesuai', duration: 4200, status: 'passed' },
      { tc: 'TC-06', title: 'Tambah harga spesial baru berhasil dan tampil di tabel', duration: 13700, status: 'passed' },
      { tc: 'TC-12', title: 'Hapus harga spesial berhasil dengan konfirmasi modal', duration: 15200, status: 'passed' },
    ]
  },
  {
    folder: 'Autentikasi',
    file: 'tests/Kasflo-Resto/login.spec.js',
    suite: 'Login Kasflo Resto',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan form login', duration: 1308, status: 'passed' },
      { tc: 'TC-02', title: 'Link Lupa kata sandi mengarah ke /forgot-password', duration: 554, status: 'passed' },
      { tc: 'TC-03', title: 'Link Daftar mengarah ke /register', duration: 469, status: 'passed' },
      { tc: 'TC-07', title: 'Login berhasil dengan kredensial valid', duration: 12600, status: 'passed' },
    ]
  }
];

// 2. DATA KASFLO BISNIS
const bisnisModules = [
  {
    folder: 'Faktur & Invoice B2B',
    file: 'tests/kasflo-bisnis/invoice.spec.js',
    suite: 'Faktur Penjualan Bisnis',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan daftar invoice B2B dan status pembayaran tempo', duration: 2800, status: 'passed' },
      { tc: 'TC-02', title: 'Buat faktur tagihan tempo 30 hari ke customer korporat', duration: 6400, status: 'passed' },
      { tc: 'TC-03', title: 'Pengiriman invoice otomatis via WhatsApp dan email gateway', duration: 4900, status: 'passed' },
      { tc: 'TC-04', title: 'Kalkulasi diskon bertingkat untuk pembelian volume grosir', duration: 5100, status: 'passed' },
      { tc: 'TC-05', title: 'Cetak kwitansi pembayaran cicilan faktur piutang usaha', duration: 3900, status: 'flaky', retries: 1 },
      { 
        tc: 'TC-06', 
        title: 'Pembatalan faktur terverifikasi dengan penerbitan Nota Retur', 
        duration: 18200, 
        status: 'failed', 
        retries: 1,
        error: {
          message: "Error: expect(locator).toBeVisible()\n\nExpected: visible\nReceived: hidden\nLocator: locator('.credit-note-badge')",
          stack: "Error: expect(locator).toBeVisible()\n    at Object.test (tests/kasflo-bisnis/invoice.spec.js:188:31)\n    at /Users/farisizia/Kasflo Resto/node_modules/@playwright/test/lib/worker/testInfo.js:145:11"
        }
      },
    ]
  },
  {
    folder: 'Multi Outlet & Gudang',
    file: 'tests/kasflo-bisnis/multi_outlet.spec.js',
    suite: 'Multi Outlet & Gudang Bisnis',
    tests: [
      { tc: 'TC-01', title: 'Menampilkan dashboard konsolidasi multi-cabang bisnis', duration: 3600, status: 'passed' },
      { tc: 'TC-02', title: 'Transfer stok antar gudang pusat ke cabang regional', duration: 7200, status: 'passed' },
      { tc: 'TC-03', title: 'Penerimaan surat jalan barang masuk dengan scanner barcode', duration: 5400, status: 'passed' },
      { tc: 'TC-04', title: 'Opname stok fisik serentak per area rak gudang', duration: 8100, status: 'passed' },
    ]
  },
  {
    folder: 'CRM & Pelanggan',
    file: 'tests/kasflo-bisnis/crm.spec.js',
    suite: 'CRM & Loyalty Bisnis',
    tests: [
      { tc: 'TC-01', title: 'Segmentasi pelanggan berdasarkan RFM (Recency, Frequency, Monetary)', duration: 4200, status: 'passed' },
      { tc: 'TC-02', title: 'Pemberian kredit limit transaksi belanja pelanggan VIP', duration: 6100, status: 'passed' },
      { tc: 'TC-03', title: 'Broadcast promo cashback terarah ke segmen pelanggan aktif', duration: 5800, status: 'passed' },
    ]
  },
  {
    folder: 'Akuntansi & Pajak',
    file: 'tests/kasflo-bisnis/accounting.spec.js',
    suite: 'Akuntansi & Pembukuan Bisnis',
    tests: [
      { tc: 'TC-01', title: 'Jurnal otomatis atas transaksi penjualan kredit dan tunai', duration: 4700, status: 'passed' },
      { tc: 'TC-02', title: 'Rekonsiliasi rekening koran bank otomatis dengan mutasi kas', duration: 8300, status: 'passed' },
      { tc: 'TC-03', title: 'Kalkulasi SPT Masa PPN 11% dan ekspor file CSV e-Faktur', duration: 9600, status: 'passed' },
      { tc: 'TC-04', title: 'Neraca keuangan saldo berjalan multi-entitas', duration: 0, status: 'skipped' },
    ]
  }
];

function transformModulesToSuites(modulesList, projectName) {
  return modulesList.map((m, mIdx) => {
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
        results.push({
          workerIndex: 0,
          status: 'failed',
          duration: Math.round(t.duration * 0.5),
          errors: [{ message: 'Network timeout during first attempt' }],
          retry: 0,
          startTime: new Date(Date.now() - 30000).toISOString(),
          attachments: [{ name: 'screenshot', contentType: 'image/png', path: 'test-results/flaky.png' }],
        });
        results.push({
          workerIndex: 0,
          status: 'passed',
          duration: t.duration,
          errors: [],
          retry: 1,
          startTime: new Date().toISOString(),
          attachments: [{ name: 'video', contentType: 'video/webm', path: 'test-results/flaky-pass.webm' }],
        });
      } else if (isFailed) {
        results.push({
          workerIndex: 0,
          status: 'failed',
          duration: t.duration,
          error: t.error,
          errors: [t.error],
          retry: 0,
          startTime: new Date().toISOString(),
          attachments: [
            { name: 'screenshot', contentType: 'image/png', path: 'test-results/error-snap.png' },
            { name: 'video', contentType: 'video/webm', path: 'test-results/error-video.webm' }
          ],
        });
      } else {
        results.push({
          workerIndex: 0,
          status: 'passed',
          duration: t.duration,
          errors: [],
          retry: 0,
          steps: [
            { title: 'Inisialisasi sesi login dan navigasi', duration: 450 },
            { title: t.title, duration: Math.max(100, t.duration - 450) }
          ],
          startTime: new Date().toISOString(),
          attachments: [
            { name: 'video', contentType: 'video/webm', path: 'test-results/video.webm' }
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
            expectedStatus: isSkipped ? 'skipped' : 'passed',
            projectId: projectName,
            projectName,
            status: isFailed ? 'unexpected' : (isFlaky ? 'flaky' : (isSkipped ? 'skipped' : 'expected')),
            results,
          }
        ],
        id: `spec-${projectName.toLowerCase().replace(/\s+/g, '-')}-${mIdx}-${tIdx}`,
        file: m.file,
        line: 25 + tIdx * 15,
        column: 3,
      };
    });

    return {
      title: m.file,
      file: m.file,
      column: 0,
      line: 0,
      specs: [],
      suites: [
        {
          title: m.suite,
          file: m.file,
          line: 5,
          column: 6,
          specs,
        }
      ]
    };
  });
}

function calculateAppStats(suitesList) {
  let total = 0;
  let expected = 0;
  let unexpected = 0;
  let flaky = 0;
  let skipped = 0;
  let duration = 0;

  for (const s of suitesList) {
    for (const sub of s.suites) {
      for (const sp of sub.specs) {
        total++;
        const t = sp.tests[0];
        if (t.status === 'expected') expected++;
        else if (t.status === 'unexpected') unexpected++;
        else if (t.status === 'flaky') flaky++;
        else if (t.status === 'skipped') skipped++;
        duration += t.results.reduce((a, r) => a + (r.duration || 0), 0);
      }
    }
  }

  return {
    startTime: new Date(Date.now() - duration).toISOString(),
    duration,
    total,
    expected,
    unexpected,
    flaky,
    skipped,
  };
}

const restoSuites = transformModulesToSuites(restoModules, 'Kasflo Resto');
const restoStats = calculateAppStats(restoSuites);

const bisnisSuites = transformModulesToSuites(bisnisModules, 'Kasflo Bisnis');
const bisnisStats = calculateAppStats(bisnisSuites);

const fullOutput = {
  lastUpdated: new Date().toISOString(),
  apps: {
    'Kasflo Resto': {
      name: 'Kasflo Resto',
      appKey: 'resto',
      accentColor: '#10b981',
      lastRun: new Date().toISOString(),
      stats: restoStats,
      suites: restoSuites,
    },
    'Kasflo Bisnis': {
      name: 'Kasflo Bisnis',
      appKey: 'bisnis',
      accentColor: '#6366f1',
      lastRun: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
      stats: bisnisStats,
      suites: bisnisSuites,
    }
  }
};

const outputDir = path.resolve(__dirname, '../public/data');
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'kasflo-results.json'), JSON.stringify(fullOutput, null, 2));

console.log(`Generated kasflo-results.json:
- Kasflo Resto: ${restoStats.total} tests (${restoStats.expected} passed, ${restoStats.unexpected} failed, ${restoStats.flaky} flaky, ${restoStats.skipped} skipped)
- Kasflo Bisnis: ${bisnisStats.total} tests (${bisnisStats.expected} passed, ${bisnisStats.unexpected} failed, ${bisnisStats.flaky} flaky, ${bisnisStats.skipped} skipped)`);
