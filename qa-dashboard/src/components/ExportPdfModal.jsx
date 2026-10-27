import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileDown, 
  Download, 
  ExternalLink, 
  Check, 
  Copy, 
  FileText, 
  Sparkles, 
  Terminal, 
  CheckCircle2
} from 'lucide-react';

export default function ExportPdfModal({ isOpen, onClose }) {
  const [copiedCli, setCopiedCli] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyCliCommand = () => {
    navigator.clipboard.writeText('npm run report:pdf');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto no-print">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden dark:bg-[#0f172a] dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30">
                <FileDown className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Export PDF Hasil Playwright
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Laporan resmi hasil pengujian otomatis Playwright (A4 PDF)
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            
            {/* File Info Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 flex items-start space-x-3.5">
              <span className="p-2.5 rounded-xl bg-white border border-slate-200 text-rose-600 dark:bg-slate-800 dark:border-slate-700 dark:text-rose-400 shadow-2xs shrink-0">
                <FileText className="w-6 h-6" />
              </span>
              <div className="flex-1 truncate">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    summary-report.pdf
                  </h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300">
                    Playwright PDF
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Laporan resmi Playwright Test Runner beserta alur step dan status tiap skenario.
                </p>
                <div className="mt-2.5 flex items-center space-x-3 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Siap diunduh
                  </span>
                  <span>•</span>
                  <span>Format: A4 Print Quality</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/summary-report.pdf"
                download="summary-report.pdf"
                onClick={onClose}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95 text-center cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File PDF</span>
              </a>

              <a
                href="/summary-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition active:scale-95 text-center dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-slate-500" />
                <span>Buka di Tab Baru</span>
              </a>
            </div>

            {/* Terminal Command Card */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-brand-400" />
                  Perintah Terminal untuk Generate Ulang:
                </span>
                <button
                  type="button"
                  onClick={copyCliCommand}
                  className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 dark:text-brand-400 transition cursor-pointer"
                >
                  {copiedCli ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCli ? 'Tersalin!' : 'Salin'}</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs flex items-center justify-between">
                <code>npm run report:pdf</code>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  generate-pdf.js
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                Jalankan perintah di atas di terminal kapan saja untuk mengonversi hasil pengujian Playwright terbaru ke file PDF.
              </p>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-end dark:border-slate-800 dark:bg-slate-900/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-xs transition dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-transparent cursor-pointer"
            >
              Tutup
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
