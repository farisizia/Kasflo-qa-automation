import React, { useState } from 'react';
import { PieChart, BarChart3, ChevronRight, FolderCheck, AlertCircle } from 'lucide-react';

export default function ModuleCharts({ 
  metrics, 
  modulesSummary, 
  selectedModule, 
  onSelectModule 
}) {
  const { totalTests, passed, failed, flaky, skipped, passRate } = metrics;
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Donut chart calculations
  const radius = 70;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  // Segment slices
  const segments = [
    { key: 'passed', label: 'Passed', count: passed, color: '#10b981', hoverColor: '#34d399' },
    { key: 'flaky', label: 'Flaky', count: flaky, color: '#f59e0b', hoverColor: '#fbbf24' },
    { key: 'failed', label: 'Failed', count: failed, color: '#f43f5e', hoverColor: '#fb7185' },
    { key: 'untested', label: 'Untested', count: skipped, color: '#64748b', hoverColor: '#94a3b8' },
  ].filter(s => s.count > 0);

  let accumulatedOffset = 0;
  const renderedSlices = segments.map(seg => {
    const ratio = totalTests > 0 ? seg.count / totalTests : 0;
    const strokeDasharray = `${ratio * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedOffset;
    accumulatedOffset += ratio * circumference;

    return {
      ...seg,
      ratio,
      percentage: Math.round(ratio * 100),
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left: Donut Chart Breakdown (4 cols on lg) */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between dark:bg-[#0f172a] dark:border-slate-800">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/80 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20">
                <PieChart className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Distribusi Rasio Kelulusan</h2>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">Total: {totalTests} Tests</span>
          </div>

          {/* SVG Donut */}
          <div className="relative flex items-center justify-center my-6">
            <svg width="220" height="220" viewBox="0 0 200 200" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth={strokeWidth}
                className="dark:stroke-slate-800"
              />
              {/* Slices */}
              {renderedSlices.map((slice) => {
                const isHovered = hoveredSegment === slice.key;
                return (
                  <circle
                    key={slice.key}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke={isHovered ? slice.hoverColor : slice.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={slice.strokeDasharray}
                    strokeDashoffset={slice.strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredSegment(slice.key)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                );
              })}
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold font-mono text-slate-900 tracking-tight dark:text-white">
                {hoveredSegment 
                  ? `${renderedSlices.find(s => s.key === hoveredSegment)?.count || 0}`
                  : `${passRate}%`}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 dark:text-slate-400">
                {hoveredSegment 
                  ? renderedSlices.find(s => s.key === hoveredSegment)?.label 
                  : 'Pass Rate'}
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {renderedSlices.map((slice) => (
            <div
              key={slice.key}
              onMouseEnter={() => setHoveredSegment(slice.key)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition shadow-2xs dark:bg-slate-900/50 dark:border-slate-800/60"
            >
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slice.color }}></span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{slice.label}</span>
              </div>
              <div className="flex items-baseline space-x-1.5 font-mono text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{slice.count}</span>
                <span className="text-[10px] text-slate-500">({slice.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Modules Bar Breakdown (7 cols on lg) */}
      <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between dark:bg-[#0f172a] dark:border-slate-800">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Kelulusan Berdasarkan Modul</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pilih modul untuk memfilter daftar test case di bawah</p>
              </div>
            </div>
            {selectedModule && (
              <button
                onClick={() => onSelectModule(null)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 underline dark:text-indigo-400"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Module Bars List */}
          <div className="mt-4 space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
            {modulesSummary.map((mod) => {
              const isSelected = selectedModule === mod.name;
              const hasFailure = mod.failed > 0;
              const passedRatio = mod.total > 0 ? (mod.passed / mod.total) * 100 : 0;
              const flakyRatio = mod.total > 0 ? (mod.flaky / mod.total) * 100 : 0;
              const failedRatio = mod.total > 0 ? (mod.failed / mod.total) * 100 : 0;

              return (
                <div
                  key={mod.name}
                  onClick={() => onSelectModule(isSelected ? null : mod.name)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-300 ring-1 ring-indigo-400 shadow-xs dark:bg-brand-500/10 dark:border-brand-500/40'
                      : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 shadow-2xs dark:bg-slate-900/40 dark:border-slate-800/80'
                  }`}
                >
                  {/* Header info */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center space-x-2 font-medium">
                      <FolderCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-slate-400" />
                      <span className="text-slate-900 font-bold dark:text-slate-100">{mod.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">({mod.total} tests)</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-[11px] text-slate-500 font-mono dark:text-slate-400">{mod.durationH}</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold border ${
                        mod.passRate === 100
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
                          : mod.passRate >= 80
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30'
                          : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
                      }`}>
                        {mod.passRate}%
                      </span>
                    </div>
                  </div>

                  {/* Multi-segmented Progress Bar */}
                  <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden flex dark:bg-slate-800/90">
                    {passedRatio > 0 && (
                      <div
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${passedRatio}%` }}
                        title={`${mod.passed} Passed`}
                      />
                    )}
                    {flakyRatio > 0 && (
                      <div
                        className="bg-amber-500 h-full transition-all duration-300"
                        style={{ width: `${flakyRatio}%` }}
                        title={`${mod.flaky} Flaky`}
                      />
                    )}
                    {failedRatio > 0 && (
                      <div
                        className="bg-rose-500 h-full transition-all duration-300"
                        style={{ width: `${failedRatio}%` }}
                        title={`${mod.failed} Failed`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer tip */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tip: Klik modul untuk memfilter skenario di tabel bawah</span>
          <span className="font-mono font-medium">{modulesSummary.length} modul terdeteksi</span>
        </div>
      </div>

    </div>
  );
}
