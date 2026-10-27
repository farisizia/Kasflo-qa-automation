const fs = require('fs');
const path = require('path');

const files = [
  'tests/login.spec.js',
  'tests/Bahan Baku/data_bahan_baku.spec.js',
  'tests/Bahan Baku/kategori_bahan_baku.spec.js',
  'tests/Bahan Baku/resep.spec.js',
  'tests/Katalog/buku_menu.spec.js',
  'tests/Katalog/category.spec.js',
  'tests/Katalog/manajemen_stok.spec.js',
  'tests/Katalog/menu.spec.js',
  'tests/Katalog/menu_self_order.spec.js',
  'tests/Katalog/variant.spec.js',
  'tests/Laporan Usaha/detail_penjualan.spec.js',
  'tests/Laporan Usaha/laba_rugi.spec.js',
  'tests/Laporan Usaha/produk.spec.js',
  'tests/Laporan Usaha/promosi.spec.js',
  'tests/Laporan Usaha/rangkuman_penjualan.spec.js',
  'tests/Manajemen User/absensi.spec.js',
  'tests/Manajemen User/manajemen_user.spec.js',
  'tests/Pembukuan/data_pembukuan.spec.js',
  'tests/Pembukuan/kategori_pembukuan.spec.js',
  'tests/Pembukuan/laporan_pembukuan.spec.js',
  'tests/Pengaturan/atur_rekening.spec.js',
  'tests/Pengaturan/data_cabang.spec.js',
  'tests/Pengaturan/metode_pembayaran.spec.js',
  'tests/Pengaturan/pajak_biaya_lainnya.spec.js',
  'tests/Pengaturan/pengaturan_area.spec.js',
  'tests/Pengaturan/pengaturan_meja.spec.js',
  'tests/Pengaturan/shift.spec.js',
  'tests/Pengaturan/struk.spec.js',
  'tests/Pengaturan/transaksi.spec.js',
  'tests/Promosi/display_promosi.spec.js',
  'tests/Promosi/harga_spesial.spec.js',
  'tests/Promosi/kampanye_promosi.spec.js',
  'tests/Promosi/poin.spec.js',
  'tests/Promosi/reward.spec.js'
];

const results = {};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const dMatches = [...content.matchAll(/test\.describe\s*\(\s*(['"`])(.*?)\1/g)].map(m => m[2]);
  const tMatches = [...content.matchAll(/\btest\s*\(\s*(['"`])(.*?)\1/g)].map(m => m[2]);
  results[file] = {
    describe: dMatches[0] || '',
    tests: tMatches
  };
}

fs.writeFileSync('scratch/all_tests.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Successfully wrote scratch/all_tests.json');
