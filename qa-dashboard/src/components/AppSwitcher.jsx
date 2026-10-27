import React from 'react';
import { Layers, UtensilsCrossed, Briefcase } from 'lucide-react';

export default function AppSwitcher({ activeTab, onSelectTab, apps, combinedMetrics }) {
  const restoMetrics = apps['Kasflo Resto']?.metrics || { totalTests: 0, passRate: 0 };

  const tabs = [
    {
      id: 'all',
      label: 'Semua Aplikasi',
      subText: 'Ringkasan Hasil Automation Testing',
      icon: Layers,
      count: combinedMetrics.totalTests,
      rate: `${combinedMetrics.passRate}%`,
      activeCard: 'bg-white text-slate-900 shadow-sm border border-slate-200/90 dark:bg-slate-800 dark:text-white dark:border-slate-700',
      activeIcon: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300',
      activeBadge: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-500/20 dark:text-indigo-200 dark:border-indigo-500/30',
      disabled: false,
    },
    {
      id: 'resto',
      label: 'Kasflo Resto',
      subText: 'Backoffice Resto',
      image: '/kasflo-resto-icon.png',
      count: restoMetrics.totalTests,
      rate: `${restoMetrics.passRate}%`,
      activeCard: 'bg-white text-emerald-950 shadow-sm border border-emerald-300 dark:bg-slate-800 dark:text-white dark:border-slate-700',
      activeIcon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300',
      activeBadge: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-500/20 dark:text-emerald-200 dark:border-emerald-500/30',
      disabled: false,
    },
    {
      id: 'bisnis',
      label: 'Kasflo Bisnis',
      subText: 'Segera Hadir / Roadmap',
      image: '/kasflo-bisnis-icon.png',
      count: 'Roadmap',
      rate: 'Upcoming',
      activeCard: '',
      activeIcon: '',
      activeBadge: '',
      disabled: true,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onSelectTab(tab.id)}
              title={tab.disabled ? 'Automasi Kasflo Bisnis sedang dalam tahap persiapan (Upcoming)' : tab.label}
              className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 select-none ${
                tab.disabled
                  ? 'opacity-55 bg-slate-100/60 text-slate-400 border border-dashed border-slate-300/80 cursor-not-allowed dark:bg-slate-900/30 dark:border-slate-800 dark:text-slate-500'
                  : isActive
                    ? tab.activeCard
                    : 'bg-transparent text-slate-700 hover:text-slate-900 hover:bg-white/70 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3 text-left">
                {tab.image ? (
                  <div className={`w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center p-0.5 border shrink-0 transition ${
                    tab.disabled
                      ? 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 opacity-80'
                      : isActive 
                        ? 'border-emerald-400 bg-white shadow-2xs' 
                        : 'border-slate-200 bg-slate-50'
                  }`}>
                    <img src={tab.image} alt={tab.label} className="w-full h-full object-cover rounded-lg" />
                  </div>
                ) : (
                  <div className={`p-2.5 rounded-xl shrink-0 transition ${
                    tab.disabled
                      ? 'bg-slate-200/60 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                      : isActive 
                        ? tab.activeIcon 
                        : 'bg-slate-200/70 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold block tracking-tight ${
                      tab.disabled
                        ? 'text-slate-600 dark:text-slate-400'
                        : isActive 
                          ? 'text-slate-900 dark:text-white' 
                          : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {tab.label}
                    </span>
                    {tab.disabled && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 block dark:text-slate-400">
                    {tab.subText}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end pl-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                  tab.disabled
                    ? 'bg-amber-50 text-amber-700 border border-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30'
                    : isActive 
                      ? tab.activeBadge 
                      : 'bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {tab.rate}
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-0.5 dark:text-slate-400">
                  {tab.disabled ? 'Roadmap' : `${tab.count} tests`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
