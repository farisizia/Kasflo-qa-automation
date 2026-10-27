import React, { useState } from 'react';
import { 
  RefreshCw, 
  Sun, 
  Moon, 
  Activity, 
  Sparkles,
  UtensilsCrossed,
  Briefcase,
  FileDown,
  FileSpreadsheet,
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react';
import ExportPdfModal from './ExportPdfModal';
import { formatLastRunDateTime } from '../utils/parser';

export default function Navbar({ 
  lastUpdated, 
  apps, 
  loading, 
  onRefresh,
  isDarkMode,
  onToggleTheme
}) {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const resto = apps['Kasflo Resto'] || {};
  const bisnis = apps['Kasflo Bisnis'] || {};

  const restoRunInfo = formatLastRunDateTime(resto.lastRun || lastUpdated);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs dark:bg-[#0f172a] dark:border-slate-800">
      <div className="max-w-[1400px] w-full mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <a href="/" className="group flex items-center px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:bg-white hover:border-slate-300 transition-all">
              <img 
                src="/kasflo-logo.png" 
                alt="Kasflo" 
                className="h-7 w-auto object-contain group-hover:scale-105 transition-transform" 
              />
            </a>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2 dark:text-white">
                  QA Automation Dashboard
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20">
                    v2.0
                  </span>
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 dark:text-slate-400">
                <span>Multi-App Portal</span>
                <span className="inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold dark:text-emerald-400">
                  <img src="/kasflo-resto-icon.png" alt="Resto" className="w-3.5 h-3.5 rounded object-cover inline" />
                  Kasflo Resto
                </span>
                <span className="text-slate-400 dark:text-slate-600">&</span>
                <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium dark:text-slate-400">
                  <img src="/kasflo-bisnis-icon.png" alt="Bisnis" className="w-3.5 h-3.5 rounded object-cover inline" />
                  Kasflo Bisnis
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30 font-semibold">
                    Upcoming
                  </span>
                </span>
              </p>
            </div>
          </div>

          {/* Execution Time Badges & Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Last Run Status, Date & Time */}
            <div className="hidden md:flex items-center space-x-2.5 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs dark:bg-slate-900/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Status: Active / Selesai"></span>
                <div className="flex flex-col text-left leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      Status Run:
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 inline" /> Selesai
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      ({restoRunInfo.relative})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-300 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{restoRunInfo.date}</span>
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{restoRunInfo.time}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Export PDF Button */}
            <button
              onClick={() => setShowPdfModal(true)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition active:scale-95 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-700 cursor-pointer"
              title="Unduh laporan pengujian Playwright resmi dalam format PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            {/* Export Excel Button */}
            <a
              href="/Kasflo_Resto_Test_Cases.xlsx"
              download="Kasflo_Resto_Test_Cases.xlsx"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 border border-emerald-200 text-xs font-bold shadow-xs transition active:scale-95 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 cursor-pointer"
              title="Unduh seluruh test case semua fitur dalam satu file Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Export Excel</span>
            </a>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
              title="Perbarui hasil eksekusi test"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-600' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-xs transition dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 cursor-pointer"
              title={isDarkMode ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

          </div>

        </div>
      </div>

      {/* Export PDF Modal */}
      <ExportPdfModal 
        isOpen={showPdfModal} 
        onClose={() => setShowPdfModal(false)} 
        apps={apps} 
      />
    </header>
  );
}
