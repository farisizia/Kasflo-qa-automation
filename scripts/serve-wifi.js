const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Deteksi alamat IP Wi-Fi lokal non-internal
function getWifiIp() {
  const interfaces = os.networkInterfaces();
  
  // Prioritaskan adapter en0 (Wi-Fi bawaan macOS) atau wlan/Wi-Fi
  for (const name of Object.keys(interfaces)) {
    if (/en0|wlan|wi-?fi/i.test(name)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }

  // Fallback ke interface IPv4 non-internal lainnya
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.zip': 'application/zip',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function startServer(port = 8080, reportDir = path.resolve(__dirname, '../report')) {
  return new Promise((resolve) => {
    if (!fs.existsSync(reportDir)) {
      console.error(`❌ Direktori report belum ditemukan di: ${reportDir}`);
      console.error(`Jalankan test terlebih dahulu (misal: npm run test) agar report ter-generate.`);
      return resolve();
    }

    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0] || '/');
      if (reqPath === '/' || reqPath === '') {
        reqPath = '/index.html';
      }

      const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
      let filePath = path.join(reportDir, safePath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      });

      fs.createReadStream(filePath).pipe(res);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${port} sedang digunakan. Mencoba port ${port + 1}...`);
        server.close();
        startServer(port + 1, reportDir).then(resolve);
      } else {
        console.error('Server error:', err);
        resolve();
      }
    });

    server.listen(port, '0.0.0.0', () => {
      const wifiIp = getWifiIp();
      console.log('\n===============================================================');
      console.log('🚀 MONOCART TEST REPORT AKTIF DI JARINGAN WI-FI');
      console.log('===============================================================');
      console.log(`💻 Akses dari Laptop ini  : http://localhost:${port}/`);
      console.log(`📱 Akses dari HP / Perangkat Lain : http://${wifiIp}:${port}/`);
      console.log('===============================================================');
      console.log('💡 Buka link di atas dari browser perangkat lain yang terhubung');
      console.log('   ke Wi-Fi yang sama untuk melihat hasil test, screenshot, & video.');
      console.log('🛑 Tekan Ctrl + C di terminal untuk menghentikan server.\n');
    });

    const cleanup = () => {
      console.log('\n🛑 Menghentikan server report...');
      server.close(() => {
        resolve();
        process.exit(0);
      });
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer, getWifiIp };
