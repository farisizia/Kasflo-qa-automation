import React from 'react';
import { ShieldCheck, Heart, Sparkles, Terminal } from 'lucide-react';

export default function Footer({ meta }) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:bg-[#070b14] dark:border-slate-800/80 py-8 text-xs text-slate-500 transition-colors">
      <div className="max-w-[1400px] w-full mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center space-x-2.5">
          <div className="px-2 py-1 rounded-md bg-slate-50 dark:bg-white border border-slate-200 dark:border-transparent flex items-center justify-center shadow-sm">
            <img src="/kasflo-logo.png" alt="Kasflo" className="h-3.5 w-auto object-contain" />
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-300">QA Automation Portal</span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
          <span className="text-slate-600 dark:text-slate-400">Kasflo Technologies</span>
        </div>

        {/* Center / Watermark */}
        <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-brand-400" />
          <span className="font-medium text-slate-700 dark:text-slate-300">Created by QA Faris Izzi Asrori</span>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-500">
          <span>Playwright {meta.playwrightVersion}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
          <span>Node runtime</span>
        </div>

      </div>
    </footer>
  );
}
