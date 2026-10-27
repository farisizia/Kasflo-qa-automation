import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  FileCode, 
  ChevronDown, 
  ChevronRight, 
  SlidersHorizontal,
  Folder,
  X,
  UtensilsCrossed,
  Briefcase
} from 'lucide-react';

export default function TestExplorer({
  tests,
  modulesSummary,
  selectedStatus,
  onSelectStatus,
  selectedModule,
  onSelectModule,
  onSelectTest,
  appScope, // 'all' | 'resto' | 'bisnis'
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('tree'); // 'tree' | 'flat'
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const toggleGroupCollapse = (key) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filter tests
  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      // App Scope filter
      if (appScope === 'resto' && test.appKey !== 'resto') return false;
      if (appScope === 'bisnis' && test.appKey !== 'bisnis') return false;

      // Status filter
      if (selectedStatus !== 'all') {
        if (selectedStatus === 'untested' || selectedStatus === 'skipped') {
          if (test.status !== 'untested' && test.status !== 'skipped') return false;
        } else if (test.status !== selectedStatus) {
          return false;
        }
      }

      // Module filter
      if (selectedModule && test.module !== selectedModule) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = test.rawTitle.toLowerCase().includes(q);
        const matchTc = test.tcCode && test.tcCode.toLowerCase().includes(q);
        const matchFile = test.filePath.toLowerCase().includes(q);
        const matchModule = test.module.toLowerCase().includes(q);
        const matchApp = test.appName.toLowerCase().includes(q);
        const matchError = test.errorSummary && test.errorSummary.toLowerCase().includes(q);
        if (!matchTitle && !matchTc && !matchFile && !matchModule && !matchApp && !matchError) {
          return false;
        }
      }
      return true;
    });
  }, [tests, appScope, selectedStatus, selectedModule, searchQuery]);

  // Nested Tree Grouping: Module -> File -> Tests
  const treeGroups = useMemo(() => {
    const modulesMap = {};

    for (const test of filteredTests) {
      const modKey = `${test.appName} — ${test.module}`;
      if (!modulesMap[modKey]) {
        modulesMap[modKey] = {
          modKey,
          moduleName: test.module,
          appName: test.appName,
          appKey: test.appKey,
          files: {},
          total: 0,
          passed: 0,
          failed: 0,
          flaky: 0,
          skipped: 0,
        };
      }
      const mod = modulesMap[modKey];
      mod.total++;
      mod[test.status] = (mod[test.status] || 0) + 1;

      // File level
      if (!mod.files[test.filePath]) {
        mod.files[test.filePath] = {
          filePath: test.filePath,
          fileName: test.fileName,
          suiteTitle: test.suiteTitle,
          tests: [],
          passed: 0,
          failed: 0,
          flaky: 0,
          skipped: 0,
        };
      }
      const fileObj = mod.files[test.filePath];
      fileObj.tests.push(test);
      fileObj[test.status] = (fileObj[test.status] || 0) + 1;
    }

    return Object.values(modulesMap).map(m => ({
      ...m,
      files: Object.values(m.files),
    }));
  }, [filteredTests]);

  // Status Badge helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Passed</span>
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">
            <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Failed</span>
          </span>
        );
      case 'flaky':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Flaky</span>
          </span>
        );
      case 'untested':
      case 'skipped':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Untested</span>
          </span>
        );
    }
  };

  // App Badge helper
  const getAppBadge = (appKey) => {
    if (appKey === 'resto') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30">
          <img src="/kasflo-resto-icon.png" alt="" className="w-3.5 h-3.5 rounded object-cover inline-block" />
          <span>Resto</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400">
        <img src="/kasflo-bisnis-icon.png" alt="" className="w-3.5 h-3.5 rounded object-cover inline-block" />
        <span>Bisnis (Upcoming)</span>
      </span>
    );
  };

  const statusPills = [
    { key: 'all', label: 'All Status' },
    { key: 'passed', label: 'Passed' },
    { key: 'failed', label: 'Failed' },
    { key: 'flaky', label: 'Flaky' },
    { key: 'untested', label: 'Untested' },
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm dark:bg-[#0f172a] dark:border-slate-800">
      
      {/* Control Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/70 space-y-4 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Section Title */}
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 dark:text-white">
              <FileCode className="w-5 h-5 text-indigo-600 dark:text-brand-400" />
              <span>Daftar Skenario Pengujian (Test Explorer)</span>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                {filteredTests.length} Tests
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">
              Klik pada baris pengujian untuk melihat detail stack trace & screenshot/video
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID, skenario, error, file..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs transition dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Filters & Mode Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/80 dark:border-slate-800/60">
          
          {/* Status Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {statusPills.map(p => {
              const isActive = selectedStatus === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => onSelectStatus(p.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 shadow-2xs dark:bg-slate-800/60 dark:text-slate-400 dark:border-transparent'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Module Selector & Tree/Flat toggle */}
          <div className="flex items-center space-x-2">
            
            <select
              value={selectedModule || ''}
              onChange={(e) => onSelectModule(e.target.value || null)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium shadow-2xs focus:outline-none focus:border-indigo-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
            >
              <option value="">Semua Modul ({modulesSummary.length})</option>
              {modulesSummary.map(m => (
                <option key={m.name} value={m.name}>{m.name} ({m.total})</option>
              ))}
            </select>

            {/* Tree vs Flat toggle */}
            <div className="flex items-center bg-slate-200/70 border border-slate-300 rounded-xl p-0.5 dark:bg-slate-900 dark:border-slate-800">
              <button
                onClick={() => setViewMode('tree')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  viewMode === 'tree' ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-indigo-300' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
                title="Tampilan Tree per Modul & File"
              >
                Tree View
              </button>
              <button
                onClick={() => setViewMode('flat')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  viewMode === 'flat' ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-indigo-300' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
                title="Tampilan Tabel Rata (Flat)"
              >
                Flat Table
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Content: Tree vs Flat */}
      <div className="overflow-x-auto">
        {filteredTests.length === 0 ? (
          <div className="py-16 text-center">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tidak ada skenario test yang cocok</p>
            <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau reset filter status.</p>
          </div>
        ) : viewMode === 'tree' ? (
          /* Tree View */
          <div className="divide-y divide-slate-200 dark:divide-slate-800/60">
            {treeGroups.map(modGroup => {
              const modCollapsed = collapsedGroups[modGroup.modKey];

              return (
                <div key={modGroup.modKey} className="bg-white dark:bg-slate-950/20">
                  
                  {/* Level 1: Module Header */}
                  <div
                    onClick={() => toggleGroupCollapse(modGroup.modKey)}
                    className="flex items-center justify-between px-5 py-3.5 bg-slate-100/80 hover:bg-slate-200/60 cursor-pointer select-none transition border-l-4 border-l-indigo-600 dark:bg-slate-900/80 dark:hover:bg-slate-800/60"
                  >
                    <div className="flex items-center space-x-3">
                      <button className="text-slate-500 dark:text-slate-400">
                        {modCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <Folder className="w-4 h-4 text-indigo-600 dark:text-brand-400" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{modGroup.moduleName}</span>
                      {getAppBadge(modGroup.appKey)}
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      {modGroup.failed > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold font-mono dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30">
                          {modGroup.failed} Failed
                        </span>
                      )}
                      {modGroup.flaky > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold font-mono dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30">
                          {modGroup.flaky} Flaky
                        </span>
                      )}
                      <span className="text-slate-600 font-mono font-medium dark:text-slate-400">
                        {modGroup.total} tests
                      </span>
                    </div>
                  </div>

                  {/* Level 2: Files under this module */}
                  {!modCollapsed && (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
                      {modGroup.files.map(fileGroup => {
                        const fileCollapsed = collapsedGroups[fileGroup.filePath];

                        return (
                          <div key={fileGroup.filePath} className="bg-white dark:bg-slate-900/30">
                            
                            {/* File Header */}
                            <div 
                              onClick={() => toggleGroupCollapse(fileGroup.filePath)}
                              className="flex items-center justify-between px-8 py-2.5 bg-slate-50 hover:bg-slate-100/80 cursor-pointer select-none transition border-l-2 border-l-slate-300 dark:bg-slate-900/50 dark:border-l-slate-700"
                            >
                              <div className="flex items-center space-x-2.5">
                                <button className="text-slate-400 dark:text-slate-500">
                                  {fileCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>
                                <FileCode className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                                  {fileGroup.fileName}
                                </span>
                                {fileGroup.suiteTitle && (
                                  <span className="text-[11px] text-slate-500 font-medium dark:text-slate-400">
                                    › {fileGroup.suiteTitle}
                                  </span>
                                )}
                              </div>

                              <span className="text-[11px] text-slate-500 font-mono">
                                {fileGroup.tests.length} tests
                              </span>
                            </div>

                            {/* Tests rows under file */}
                            {!fileCollapsed && (
                              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800/40">
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/30">
                                  {fileGroup.tests.map((test, idx) => 
                                    renderRow(test, idx + 1, onSelectTest, getStatusBadge, getAppBadge)
                                  )}
                                </tbody>
                              </table>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        ) : (
          /* Flat Table View */
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800/80">
            <thead className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider font-bold text-left border-b border-slate-200 dark:bg-slate-900/60 dark:text-slate-400 dark:border-slate-800">
              <tr>
                <th scope="col" className="px-4 py-3.5 text-center w-12">No</th>
                <th scope="col" className="px-3 py-3.5 w-24">Aplikasi</th>
                <th scope="col" className="px-3 py-3.5 w-24">ID TC</th>
                <th scope="col" className="px-4 py-3.5">Judul Test Case</th>
                <th scope="col" className="px-4 py-3.5">Lokasi File</th>
                <th scope="col" className="px-4 py-3.5 text-center w-28">Status</th>
                <th scope="col" className="px-4 py-3.5 text-right w-24">Durasi</th>
                <th scope="col" className="px-4 py-3.5 text-right w-16">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
              {filteredTests.map((test, idx) => 
                renderFlatRow(test, idx + 1, onSelectTest, getStatusBadge, getAppBadge)
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

function renderRow(test, index, onSelectTest, getStatusBadge, getAppBadge) {
  return (
    <tr
      key={test.id}
      onClick={() => onSelectTest(test)}
      className="hover:bg-indigo-50/50 transition-colors cursor-pointer group dark:hover:bg-slate-800/40"
    >
      <td className="px-8 py-3 whitespace-nowrap w-12 text-slate-400 font-mono text-xs">
        {index}
      </td>

      <td className="px-3 py-3 whitespace-nowrap w-24">
        {getAppBadge(test.appKey)}
      </td>

      <td className="px-3 py-3 whitespace-nowrap w-24">
        {test.tcCode ? (
          <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 group-hover:border-indigo-400 transition dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30">
            {test.tcCode}
          </span>
        ) : (
          <span className="text-xs text-slate-400 font-mono">—</span>
        )}
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition dark:text-slate-100 dark:group-hover:text-indigo-300">
            {test.scenarioName}
          </span>
          {test.errorSummary && (
            <div className="mt-1 p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-[10px] font-mono text-rose-700 line-clamp-1 dark:bg-rose-950/40 dark:border-rose-800/40 dark:text-rose-300">
              {test.errorSummary}
            </div>
          )}
        </div>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-center w-28">
        {getStatusBadge(test.status)}
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-right w-24">
        <div className="flex flex-col items-end">
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
            {test.durationH}
          </span>
          {test.retryCount > 0 && (
            <span className="text-[10px] font-mono text-amber-600 font-bold">
              {test.retryCount} retry
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-right text-slate-400 group-hover:text-indigo-600 transition w-12">
        <ChevronRight className="w-4 h-4 ml-auto" />
      </td>
    </tr>
  );
}

function renderFlatRow(test, index, onSelectTest, getStatusBadge, getAppBadge) {
  return (
    <tr
      key={test.id}
      onClick={() => onSelectTest(test)}
      className="hover:bg-indigo-50/50 transition-colors cursor-pointer group dark:hover:bg-slate-800/40"
    >
      <td className="px-4 py-3 whitespace-nowrap text-center text-slate-400 font-mono text-xs">
        {index}
      </td>

      <td className="px-3 py-3 whitespace-nowrap">
        {getAppBadge(test.appKey)}
      </td>

      <td className="px-3 py-3 whitespace-nowrap">
        {test.tcCode ? (
          <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 group-hover:border-indigo-400 transition dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30">
            {test.tcCode}
          </span>
        ) : (
          <span className="text-xs text-slate-400 font-mono">—</span>
        )}
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition dark:text-slate-100 dark:group-hover:text-indigo-300">
            {test.scenarioName}
          </span>
          <span className="text-[10px] text-slate-500 font-medium truncate mt-0.5 dark:text-slate-400">
            {test.suiteTitle}
          </span>
          {test.errorSummary && (
            <div className="mt-1 p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-[10px] font-mono text-rose-700 line-clamp-1 dark:bg-rose-950/40 dark:border-rose-800/40 dark:text-rose-300">
              {test.errorSummary}
            </div>
          )}
        </div>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500 font-mono dark:text-slate-400">
        <span className="block truncate max-w-[200px]" title={test.filePath}>
          {test.fileName}
        </span>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-center">
        {getStatusBadge(test.status)}
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-right">
        <div className="flex flex-col items-end">
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
            {test.durationH}
          </span>
          {test.retryCount > 0 && (
            <span className="text-[10px] font-mono text-amber-600 font-bold">
              {test.retryCount} retry
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-right text-slate-400 group-hover:text-indigo-600 transition">
        <ChevronRight className="w-4 h-4 ml-auto" />
      </td>
    </tr>
  );
}
