import React from 'react';
import { 
  UtensilsCrossed, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Calendar,
  FileDown, 
  FileSpreadsheet 
} from 'lucide-react';
import { formatLastRunDateTime } from '../utils/parser';

function MiniDonut({ rate, color, passed, failed, flaky, skipped, total }) {
  const radius = 45;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const valid = total - skipped;
  const passRatio = valid > 0 ? passed / valid : 1;
  const strokeDasharray = `${passRatio * circumference} ${circumference}`;

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg width="128" height="128" viewBox="0 0 120 120" className="transform -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          className="dark:stroke-slate-800"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset="0"
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl font-black font-mono text-slate-900 tracking-tight dark:text-white">
          {rate}%
        </span>
        <span className="text-[10px] text-slate-500 uppercase font-bold dark:text-slate-400">Pass Rate</span>
      </div>
    </div>
  );
}

export default function SideBySideComparison({ apps, onSwitchToApp }) {
  const resto = apps['Kasflo Resto'];
  const bisnis = apps['Kasflo Bisnis'];

  if (!resto || !bisnis) return null;

  const restoRunInfo = formatLastRunDateTime(resto.lastRun);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 dark:text-white">
            <span>App Automation Testing Reports</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 font-medium">
              Resto &amp; Bisnis
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">
            Ringkasan laporan hasil Automation Testing pada setiap lini Produk ekosistem Kasflo
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Last Update Pill with Date & Time */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs shadow-2xs dark:bg-slate-900/80 dark:border-slate-800">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-500 dark:text-slate-400 font-medium">Last Update:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{restoRunInfo.date}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>{restoRunInfo.time}</span>
            </span>
          </div>

          <a
            href="/summary-report.pdf"
            download="summary-report.pdf"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 cursor-pointer"
            title="Unduh laporan hasil Playwright resmi dalam format PDF (summary-report.pdf)"
          >
            <FileDown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Export PDF</span>
          </a>

          <a
            href="/Kasflo_Resto_Test_Cases.xlsx"
            download="Kasflo_Resto_Test_Cases.xlsx"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 border border-emerald-200 text-xs font-bold shadow-xs transition active:scale-95 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 cursor-pointer"
            title="Unduh semua test case seluruh fitur dalam format Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Export Excel</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Kasflo Resto Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition relative overflow-hidden flex flex-col justify-between dark:bg-[#0f172a] dark:border-slate-800">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3.5">
                <img
                  src="/kasflo-resto-icon.png"
                  alt="Kasflo Resto"
                  className="w-11 h-11 rounded-xl shadow-xs object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Kasflo Resto</h3>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Active Suite</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dashboard, Katalog, Bahan Baku, Promosi, Pelanggan, Pembukuan, Laporan Usaha, Aplikasi, dan Pengaturan</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${resto.metrics.failed === 0
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
                : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
                }`}>
                {resto.metrics.failed === 0 ? 'Healthy' : `${resto.metrics.failed} Failed`}
              </span>
            </div>

            {/* Last Update & Status Strip */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">Status Run:</span>
                <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Selesai ({restoRunInfo.relative})
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{restoRunInfo.date}</span>
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{restoRunInfo.time}</span>
                </span>
              </div>
            </div>

            {/* Content: Donut + Key Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6">
              <MiniDonut
                rate={resto.metrics.passRate}
                color="#10b981"
                passed={resto.metrics.passed}
                failed={resto.metrics.failed}
                flaky={resto.metrics.flaky}
                skipped={resto.metrics.skipped}
                total={resto.metrics.totalTests}
              />

              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Passed
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-600 mt-1 block dark:text-emerald-400">
                    {resto.metrics.passed}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
                    <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Failed
                  </span>
                  <span className="text-lg font-bold font-mono text-rose-600 mt-1 block dark:text-rose-400">
                    {resto.metrics.failed}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Flaky
                  </span>
                  <span className="text-lg font-bold font-mono text-amber-600 mt-1 block dark:text-amber-400">
                    {resto.metrics.flaky}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-brand-400" /> Durasi
                  </span>
                  <span className="text-lg font-bold font-mono text-slate-900 mt-1 block truncate dark:text-slate-200">
                    {resto.metrics.totalDurationH}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Link */}
          <button
            onClick={() => onSwitchToApp('resto')}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 border border-emerald-200 text-xs font-bold transition dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/20"
          >
            <span>Buka Detail Kasflo Resto ({resto.metrics.totalTests} Tests)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Kasflo Bisnis Card (Upcoming / Disabled) */}
        <div className="bg-white/95 p-6 rounded-2xl border border-slate-200/90 border-l-4 border-l-slate-400 shadow-sm relative overflow-hidden flex flex-col justify-between dark:bg-[#0f172a] dark:border-slate-800">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3.5">
                <img
                  src="/kasflo-bisnis-icon.png"
                  alt="Kasflo Bisnis"
                  className="w-11 h-11 rounded-xl shadow-xs object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">Kasflo Bisnis</h3>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">Upcoming</span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Backoffice</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300/80 flex items-center gap-1.5 shadow-2xs dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Upcoming
              </span>
            </div>

            {/* Last Update & Status Strip (Upcoming) */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs opacity-85">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">Status Run:</span>
                <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30">
                  Roadmap / Segera Hadir
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Tahap Persiapan Pengujian</span>
              </div>
            </div>

            {/* Content: Upcoming Roadmap Info */}
            <div className="py-7 px-4 my-auto text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0">
                <img src="/kasflo-bisnis-icon.png" alt="Kasflo Bisnis" className="w-full h-full object-cover" />
              </div>
              <div className="max-w-xs space-y-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Automasi Pengujian Sedang Disiapkan
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                  Rangkaian test case otomasi untuk Kasflo Bisnis akan hadir pada roadmap pengujian selanjutnya.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 text-xs font-medium dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Status: Roadmap / Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Action Link (Disabled) */}
          <button
            disabled
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 text-xs font-semibold cursor-not-allowed select-none transition dark:bg-slate-800/80 dark:text-slate-500 dark:border-slate-700"
          >
            <span>Automasi Kasflo Bisnis (Upcoming / Disabled)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
