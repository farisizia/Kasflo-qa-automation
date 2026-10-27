import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import AppSwitcher from './components/AppSwitcher';
import SideBySideComparison from './components/SideBySideComparison';
import KpiCards from './components/KpiCards';
import ModuleCharts from './components/ModuleCharts';
import TestExplorer from './components/TestExplorer';
import TestDetailDrawer from './components/TestDetailDrawer';
import Footer from './components/Footer';
import { parseKasfloResults, formatLastRunDateTime } from './utils/parser';
import { AlertCircle, RefreshCw, Layers, UtensilsCrossed, Briefcase, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'resto' | 'bisnis'
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync dark class with isDarkMode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Explorer filters
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeTest, setActiveTest] = useState(null);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try multi-app kasflo-results.json first, fallback to results.json
      let response = await fetch(`/data/kasflo-results.json?t=${Date.now()}`);
      if (!response.ok) {
        response = await fetch(`/data/results.json?t=${Date.now()}`);
      }
      if (!response.ok) {
        throw new Error(`Gagal memuat hasil test (HTTP ${response.status})`);
      }
      const rawJson = await response.json();
      const parsed = parseKasfloResults(rawJson);
      setReport(parsed);
    } catch (err) {
      console.error('Error fetching results:', err);
      setError(err.message || 'Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // Handle Dark / Light mode toggle
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Determine current active metrics & modules based on selected tab
  const getActiveViewData = () => {
    if (!report) return null;
    if (activeTab === 'resto') {
      const app = report.apps['Kasflo Resto'];
      return {
        title: 'Kasflo Resto',
        accentColor: 'emerald',
        metrics: app.metrics,
        modulesSummary: app.modulesSummary,
        tests: app.tests,
      };
    }
    if (activeTab === 'bisnis') {
      const app = report.apps['Kasflo Bisnis'];
      return {
        title: 'Kasflo Bisnis',
        accentColor: 'indigo',
        metrics: app.metrics,
        modulesSummary: app.modulesSummary,
        tests: app.tests,
      };
    }
    // 'all'
    return {
      title: 'Semua Aplikasi',
      accentColor: 'brand',
      metrics: report.combined.metrics,
      modulesSummary: report.combined.modulesSummary,
      tests: report.combined.tests,
    };
  };

  const activeView = getActiveViewData();

  // Next/Prev test in drawer
  const currentTestsList = activeView?.tests || [];
  const activeIndex = activeTest ? currentTestsList.findIndex(t => t.id === activeTest.id) : -1;
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < currentTestsList.length - 1;

  const handlePrevTest = () => {
    if (hasPrev) setActiveTest(currentTestsList[activeIndex - 1]);
  };

  const handleNextTest = () => {
    if (hasNext) setActiveTest(currentTestsList[activeIndex + 1]);
  };

  if (loading && !report) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto animate-spin shadow-xs">
            <RefreshCw className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Memuat data ekosistem Kasflo...</p>
        </div>
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-6 rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-md text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Gagal Membaca Data Kasflo</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Pastikan file <code className="text-indigo-600 dark:text-indigo-400 font-mono">qa-dashboard/public/data/kasflo-results.json</code> telah tersedia.
          </p>
          <button
            onClick={fetchResults}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const lastRunInfo = formatLastRunDateTime(report?.apps?.['Kasflo Resto']?.lastRun || report?.lastUpdated);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-200`}>
      
      {/* Kasflo Header */}
      <Navbar
        lastUpdated={report.lastUpdated}
        apps={report.apps}
        loading={loading}
        onRefresh={fetchResults}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 space-y-8">
        
        {/* App Switcher (All Ecosystem vs Kasflo Resto vs Kasflo Bisnis) */}
        <section aria-label="Aplikasi Switcher">
          <AppSwitcher
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              setSelectedModule(null);
            }}
            apps={report.apps}
            combinedMetrics={report.combined.metrics}
          />
        </section>

        {/* View Mode 1: All Ecosystem (Side-by-Side Comparison Card) */}
        {activeTab === 'all' && (
          <section aria-label="Perbandingan Berdampingan">
            <SideBySideComparison
              apps={report.apps}
              onSwitchToApp={(targetApp) => {
                setActiveTab(targetApp);
                setSelectedModule(null);
              }}
            />
          </section>
        )}

        {/* Hero KPI Cards */}
        <section aria-label="Key Performance Indicators">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>Ringkasan Hasil Automation Testing:</span>
              <span className={`font-black ${
                activeTab === 'resto' ? 'text-emerald-400' : activeTab === 'bisnis' ? 'text-indigo-400' : 'text-brand-300'
              }`}>
                {activeView.title}
              </span>
            </h2>

            {/* Status Last Update Run Test: Jam & Tanggal */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs dark:bg-slate-900/80 dark:border-slate-800">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">Status Last Update:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>{lastRunInfo.date}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold text-slate-900 dark:text-slate-100">{lastRunInfo.time}</span>
              </span>
            </div>
          </div>
          <KpiCards
            metrics={activeView.metrics}
            activeStatus={selectedStatus}
            onSelectStatus={(status) => setSelectedStatus(status)}
          />
        </section>

        {/* Charts & Modules Breakdown */}
        <section aria-label="Grafik Rasio & Modul">
          <ModuleCharts
            metrics={activeView.metrics}
            modulesSummary={activeView.modulesSummary}
            selectedModule={selectedModule}
            onSelectModule={(mod) => setSelectedModule(mod)}
          />
        </section>

        {/* Interactive Test Explorer (Tree View / Flat Table) */}
        <section aria-label="Daftar Skenario Pengujian">
          <TestExplorer
            tests={activeView.tests}
            modulesSummary={activeView.modulesSummary}
            selectedStatus={selectedStatus}
            onSelectStatus={(st) => setSelectedStatus(st)}
            selectedModule={selectedModule}
            onSelectModule={(mod) => setSelectedModule(mod)}
            onSelectTest={(t) => setActiveTest(t)}
            appScope={activeTab}
          />
        </section>

      </main>

      {/* Test Detail Drawer Modal */}
      {activeTest && (
        <TestDetailDrawer
          test={activeTest}
          onClose={() => setActiveTest(null)}
          onPrev={handlePrevTest}
          onNext={handleNextTest}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}

      {/* Watermark Footer */}
      <Footer meta={{ playwrightVersion: '1.63.0' }} />
    </div>
  );
}
