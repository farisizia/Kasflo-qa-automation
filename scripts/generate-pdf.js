/**
 * Script Utilitas: Konversi Playwright HTML Report ke PDF (summary-report.pdf)
 * 
 * Script ini menggunakan headless browser Playwright dan built-in HTTP server lokal
 * untuk merender laporan HTML resmi Playwright dan mengonversinya menjadi dokumen PDF berkualitas tinggi.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Konfigurasi Path
const REPORT_DIR = path.resolve(__dirname, '../playwright-report');
const REPORT_HTML = path.join(REPORT_DIR, 'index.html');
const OUTPUT_PDF = process.argv[2] 
  ? path.resolve(process.argv[2]) 
  : path.resolve(__dirname, '../summary-report.pdf');

/**
 * Membuka server static HTTP lokal sementara untuk menyajikan playwright-report
 * guna menghindari batasan CORS/file:// pada browser.
 */
function startStaticServer(directory) {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.zip': 'application/zip',
  };

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      
      const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
      const filePath = path.join(directory, safePath);

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File Not Found');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      });
    });

    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, url: `http://127.0.0.1:${address.port}` });
    });

    server.on('error', reject);
  });
}

async function generatePdf() {
  console.log('\n📄 Memulai konversi laporan HTML ke PDF...');

  // 1. Validasi keberadaan file HTML report
  if (!fs.existsSync(REPORT_HTML)) {
    console.error(`❌ Gagal: File laporan HTML tidak ditemukan di ${REPORT_HTML}`);
    console.error('   Silakan jalankan pengujian terlebih dahulu (misal: npm test).');
    process.exit(1);
  }

  let serverInstance = null;
  let browser = null;

  try {
    // 2. Jalankan HTTP server lokal
    const { server, url } = await startStaticServer(REPORT_DIR);
    serverInstance = server;

    // 3. Buka headless Chromium
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
    });

    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2
    });

    // 4. Buka laporan HTML via server lokal
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Tunggu hingga elemen hasil pengujian selesai ter-render di DOM
    await page.waitForTimeout(1000);

    // 5. Cetak ke format PDF A4
    await page.pdf({
      path: OUTPUT_PDF,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        bottom: '12mm',
        left: '12mm',
        right: '12mm'
      }
    });

    const stats = fs.statSync(OUTPUT_PDF);
    const sizeKb = (stats.size / 1024).toFixed(1);

    // Sync ke folder qa-dashboard agar bisa langsung diunduh lewat tombol UI
    const publicPdf = path.resolve(__dirname, '../qa-dashboard/public/summary-report.pdf');
    const distPdf = path.resolve(__dirname, '../qa-dashboard/dist/summary-report.pdf');
    try {
      fs.copyFileSync(OUTPUT_PDF, publicPdf);
      if (fs.existsSync(path.dirname(distPdf))) {
        fs.copyFileSync(OUTPUT_PDF, distPdf);
      }
    } catch (_) {}

    console.log(`✅ Laporan PDF berhasil dibuat!`);
    console.log(`📁 Lokasi file : ${OUTPUT_PDF}`);
    console.log(`📊 Ukuran file : ${sizeKb} KB\n`);

  } catch (err) {
    console.error('❌ Terjadi kesalahan saat mengonversi laporan ke PDF:', err);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    if (serverInstance) {
      serverInstance.close();
    }
  }
}

// Jalankan generator
generatePdf();
