/**
 * Script Utilitas: Konversi QA Automation Dashboard ke Dokumen PDF (qa-dashboard-report.pdf)
 * 
 * Script ini menggunakan headless browser Playwright untuk mengakses QA Automation Dashboard
 * (http://localhost:8081 atau local static server) dan merendernya ke dokumen PDF beresolusi tinggi.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const DIST_DIR = path.resolve(__dirname, '../qa-dashboard/dist');
const DEFAULT_URL = 'http://127.0.0.1:8081';
const OUTPUT_PDF = process.argv[2] 
  ? path.resolve(process.argv[2]) 
  : path.resolve(__dirname, '../qa-dashboard-report.pdf');

function checkUrlActive(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.abort();
      resolve(false);
    });
  });
}

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
    '.webm': 'video/webm',
  };

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      
      const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
      const filePath = path.join(directory, safePath);

      fs.readFile(filePath, (err, content) => {
        if (err) {
          // SPA fallback to index.html
          fs.readFile(path.join(directory, 'index.html'), (err2, fallback) => {
            if (err2) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('Not Found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(fallback);
            }
          });
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

async function exportDashboardPdf() {
  console.log('\n📄 Memulai proses ekspor QA Automation Dashboard ke PDF...');

  let targetUrl = DEFAULT_URL;
  let serverInstance = null;
  let browser = null;

  try {
    const isDashboardRunning = await checkUrlActive(DEFAULT_URL);
    if (isDashboardRunning) {
      console.log(`📡 Menghubungkan ke dashboard aktif di ${DEFAULT_URL}`);
    } else {
      console.log(`📦 Dashboard tidak sedang aktif di port 8081, menyajikan bundle dari ${DIST_DIR}...`);
      if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
        console.error(`❌ Gagal: Bundle dist belum dibangun di ${DIST_DIR}`);
        console.error('   Silakan jalankan "npm run dashboard:build" terlebih dahulu.');
        process.exit(1);
      }
      const { server, url } = await startStaticServer(DIST_DIR);
      serverInstance = server;
      targetUrl = url;
    }

    console.log('🚀 Membuka headless Chromium browser...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });

    console.log(`🌐 Mengunjungi ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Beri jeda agar data JSON, chart animasi dan komponen selesai ter-render
    await page.waitForTimeout(2500);

    // Emulate media print untuk menggunakan styling @media print
    await page.emulateMedia({ media: 'print' });

    console.log('🖨️  Menghasilkan dokumen PDF format A4 Landscape...');
    await page.pdf({
      path: OUTPUT_PDF,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
      }
    });

    const stats = fs.statSync(OUTPUT_PDF);
    const sizeKb = (stats.size / 1024).toFixed(1);

    console.log(`\n✅ Laporan PDF Dashboard berhasil diekspor!`);
    console.log(`📁 Lokasi file : ${OUTPUT_PDF}`);
    console.log(`📊 Ukuran file : ${sizeKb} KB\n`);

  } catch (err) {
    console.error('❌ Terjadi kesalahan saat mengekspor dashboard ke PDF:', err);
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

exportDashboardPdf();
