const fs = require('fs');
const data = require('./all_tests.json');

const describeTitles = {
  'tests/login.spec.js': 'Login',
  'tests/Bahan Baku/data_bahan_baku.spec.js': 'Data Bahan Baku',
  'tests/Bahan Baku/kategori_bahan_baku.spec.js': 'Kategori Bahan Baku',
  'tests/Bahan Baku/resep.spec.js': 'Resep Bahan Baku',
  'tests/Katalog/buku_menu.spec.js': 'Buku Menu',
  'tests/Katalog/category.spec.js': 'Kategori Menu',
  'tests/Katalog/manajemen_stok.spec.js': 'Manajemen Stok',
  'tests/Katalog/menu.spec.js': 'Manajemen Menu',
  'tests/Katalog/menu_self_order.spec.js': 'Menu Self Order',
  'tests/Katalog/variant.spec.js': 'Varian Menu',
  'tests/Laporan Usaha/detail_penjualan.spec.js': 'Laporan Detail Penjualan',
  'tests/Laporan Usaha/laba_rugi.spec.js': 'Laporan Laba Rugi',
  'tests/Laporan Usaha/produk.spec.js': 'Laporan Produk',
  'tests/Laporan Usaha/promosi.spec.js': 'Laporan Promosi',
  'tests/Laporan Usaha/rangkuman_penjualan.spec.js': 'Laporan Rangkuman Penjualan',
  'tests/Manajemen User/absensi.spec.js': 'Absensi Karyawan',
  'tests/Manajemen User/manajemen_user.spec.js': 'Manajemen User',
  'tests/Pembukuan/data_pembukuan.spec.js': 'Data Pembukuan',
  'tests/Pembukuan/kategori_pembukuan.spec.js': 'Kategori Pembukuan',
  'tests/Pembukuan/laporan_pembukuan.spec.js': 'Laporan Pembukuan',
  'tests/Pengaturan/atur_rekening.spec.js': 'Atur Rekening',
  'tests/Pengaturan/data_cabang.spec.js': 'Data Cabang',
  'tests/Pengaturan/metode_pembayaran.spec.js': 'Metode Pembayaran',
  'tests/Pengaturan/pajak_biaya_lainnya.spec.js': 'Pajak & Biaya Lainnya',
  'tests/Pengaturan/pengaturan_area.spec.js': 'Pengaturan Area',
  'tests/Pengaturan/pengaturan_meja.spec.js': 'Pengaturan Meja',
  'tests/Pengaturan/shift.spec.js': 'Pengaturan Shift',
  'tests/Pengaturan/struk.spec.js': 'Pengaturan Struk',
  'tests/Pengaturan/transaksi.spec.js': 'Pengaturan Transaksi',
  'tests/Promosi/display_promosi.spec.js': 'Display Promosi',
  'tests/Promosi/harga_spesial.spec.js': 'Harga Spesial',
  'tests/Promosi/kampanye_promosi.spec.js': 'Kampanye Promosi',
  'tests/Promosi/poin.spec.js': 'Poin Loyalitas',
  'tests/Promosi/reward.spec.js': 'Reward & Referral'
};

function cleanTestTitle(rawTitle, index) {
  let cleaned = rawTitle.trim();
  // Remove existing [TC-XX] or TCXX -
  cleaned = cleaned.replace(/^\[TC-\d+\]\s*/i, '');
  cleaned = cleaned.replace(/^TC\d+\s*-\s*/i, '');
  // Remove [CRUD - ...] prefix
  cleaned = cleaned.replace(/^\[CRUD\s*-[^\]]+\]\s*/i, '');
  // Remove any leading breadcrumbs like "Admin → ... page › " or "Admin -> ... : "
  cleaned = cleaned.replace(/^.*?(?:page|menu|halaman)\s*[›:→-]\s*/i, '');
  cleaned = cleaned.trim();
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  const tcNum = `[TC-${String(index + 1).padStart(2, '0')}]`;
  return `${tcNum} ${cleaned}`;
}

const preview = {};
for (const [file, info] of Object.entries(data)) {
  preview[file] = {
    oldDescribe: info.describe,
    newDescribe: describeTitles[file] || info.describe,
    tests: info.tests.map((t, idx) => ({
      old: t,
      new: cleanTestTitle(t, idx)
    }))
  };
}

fs.writeFileSync('scratch/preview_refactor.json', JSON.stringify(preview, null, 2), 'utf8');
console.log('Dry run preview saved to scratch/preview_refactor.json');
