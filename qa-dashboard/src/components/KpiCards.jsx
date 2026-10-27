import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  Layers, 
  TrendingUp,
  Percent
} from 'lucide-react';

export default function KpiCards({ metrics, activeStatus, onSelectStatus }) {
  const { totalTests, passed, failed, flaky, skipped, passRate, strictPassRate } = metrics;

  const cards = [
    {
      id: 'rate',
      label: 'Overall Pass Rate',
      value: `${passRate}%`,
      subLabel: `${passed} of ${totalTests - skipped} valid tests passed`,
      icon: Percent,
      color: passRate >= 95 ? 'emerald' : passRate >= 80 ? 'amber' : 'rose',
      progress: Math.min(100, Math.max(0, passRate)),
      isFilter: false,
    },
    {
      id: 'all',
      statusKey: 'all',
      label: 'Total Tests',
      value: totalTests,
      subLabel: `${metrics.totalDurationH} execution time`,
      icon: Layers,
      color: 'indigo',
      progress: 100,
      isFilter: true,
    },
    {
      id: 'passed',
      statusKey: 'passed',
      label: 'Passed Tests',
      value: passed,
      subLabel: totalTests > 0 ? `${Math.round((passed / totalTests) * 100)}% of suite` : '0%',
      icon: CheckCircle2,
      color: 'emerald',
      progress: totalTests > 0 ? (passed / totalTests) * 100 : 0,
      isFilter: true,
    },
    {
      id: 'failed',
      statusKey: 'failed',
      label: 'Failed Tests',
      value: failed,
      subLabel: failed === 0 ? 'Zero failures detected' : `${failed} test(s) need attention`,
      icon: XCircle,
      color: failed > 0 ? 'rose' : 'slate',
      progress: totalTests > 0 ? (failed / totalTests) * 100 : 0,
      isFilter: true,
      alert: failed > 0,
    },
    {
      id: 'flaky',
      statusKey: 'flaky',
      label: 'Flaky & Untested',
      value: `${flaky} / ${skipped}`,
      subLabel: `${flaky} flaky, ${skipped} untested`,
      icon: AlertTriangle,
      color: flaky > 0 ? 'amber' : 'slate',
      progress: totalTests > 0 ? ((flaky + skipped) / totalTests) * 100 : 0,
      isFilter: true,
    },
  ];

  const getColorClasses = (color, isSelected, isAlert) => {
    switch (color) {
      case 'emerald':
        return {
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
          progressBar: 'bg-emerald-500',
          glow: isSelected ? 'ring-2 ring-emerald-500 shadow-sm' : 'hover:border-emerald-400',
          textColor: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'rose':
        return {
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
          progressBar: 'bg-rose-500',
          glow: isSelected ? 'ring-2 ring-rose-500 shadow-sm' : 'hover:border-rose-400',
          textColor: 'text-rose-600 dark:text-rose-400',
        };
      case 'amber':
        return {
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
          progressBar: 'bg-amber-500',
          glow: isSelected ? 'ring-2 ring-amber-500 shadow-sm' : 'hover:border-amber-400',
          textColor: 'text-amber-600 dark:text-amber-400',
        };
      case 'indigo':
      default:
        return {
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20',
          progressBar: 'bg-indigo-600',
          glow: isSelected ? 'ring-2 ring-indigo-500 shadow-sm' : 'hover:border-indigo-400',
          textColor: 'text-indigo-600 dark:text-indigo-400',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = card.isFilter && activeStatus === card.statusKey;
        const style = getColorClasses(card.color, isSelected, card.alert);

        return (
          <div
            key={card.id}
            onClick={() => card.isFilter && onSelectStatus(card.statusKey)}
            className={`bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden dark:bg-[#0f172a] dark:border-slate-800 ${
              card.isFilter ? 'cursor-pointer select-none active:scale-[0.98]' : ''
            } ${style.glow}`}
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl border ${style.badgeBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Middle row: Big Value */}
            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono dark:text-white">
                {card.value}
              </div>
              {card.id === 'rate' && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.badgeBg} border`}>
                  {passRate >= 90 ? 'Healthy' : 'Attention'}
                </span>
              )}
              {card.alert && (
                <span className="animate-pulse flex h-2 w-2 rounded-full bg-rose-500"></span>
              )}
            </div>

            {/* Sublabel */}
            <p className="mt-1 text-xs text-slate-500 truncate dark:text-slate-400">
              {card.subLabel}
            </p>

            {/* Bottom Progress Bar */}
            <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${style.progressBar}`}
                style={{ width: `${Math.max(2, card.progress)}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
