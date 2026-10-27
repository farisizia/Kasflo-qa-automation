# Kasflo QA Automation & Quality Portal 🚀

Repositori ini berisi sistem pengujian otomatis *End-to-End* (E2E) berbasis **Playwright** serta **Custom Visual Quality Dashboard** interaktif (React + Vite + Tailwind CSS) untuk ekosistem aplikasi **Kasflo Resto** dan **Kasflo Bisnis**.

---

## 📌 Ringkasan Proyek
- **Aplikasi yang Diuji:** Kasflo Resto & Kasflo Bisnis
- **Cakupan Pengujian:** 350+ Skenario Uji Otomatis (Autentikasi/Login, Bahan Baku, Katalog Menu, Manajemen Stok, Promosi, Pembukuan, hingga Self-Order)
- **Teknologi Utama:** Playwright (Node.js/JavaScript), React, Vite, Tailwind CSS, Monocart Reporter, Firebase Hosting
- **Fitur Pelaporan:**
  - Perbandingan matriks kesehatan aplikasi secara berdampingan (*Side-by-Side Comparison*)
  - Perekaman video otomatis (*video execution recording*) dan tangkapan layar saat kegagalan
  - Pelacakan langkah pengujian (*test steps*) dan rincian log kesalahan secara terperinci

---

## 🛠️ Prasyarat Sistem
Pastikan perangkat sudah terpasang:
- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- npm (bawaan dari Node.js)
- Browser Playwright (Chromium/Webkit/Firefox)

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Kloning Repositori & Instalasi Dependensi
```bash
git clone [https://github.com/farisizia/Kasflo-qa-automation.git](https://github.com/farisizia/Kasflo-qa-automation.git)
cd Kasflo-qa-automation
npm install
npx playwright install --with-deps
