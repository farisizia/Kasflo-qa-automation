/**
 * Multi-App Data Parser for Kasflo Automation Dashboard
 * Processes Kasflo Resto and Kasflo Bisnis test execution results
 */

export function parseKasfloResults(rawData) {
  if (!rawData || typeof rawData !== 'object') {
    return createEmptyMultiAppReport();
  }

  // Handle both raw multi-app format ({ lastUpdated, apps: { ... } })
  // and legacy/direct Playwright single-app format ({ suites, stats, ... })
  let appsRaw = {};
  if (rawData.apps && typeof rawData.apps === 'object') {
    appsRaw = rawData.apps;
  } else if (Array.isArray(rawData.suites)) {
    // Legacy single app wrapped
    appsRaw = {
      'Kasflo Resto': {
        name: 'Kasflo Resto',
        appKey: 'resto',
        accentColor: '#10b981',
        lastRun: rawData.stats?.startTime || new Date().toISOString(),
        stats: rawData.stats || {},
        suites: rawData.suites || [],
      }
    };
  }

  const parsedApps = {};
  let combinedTests = [];

  for (const [appName, appObj] of Object.entries(appsRaw)) {
    const isBisnis = /bisnis/i.test(appName);
    const appKey = isBisnis ? 'bisnis' : 'resto';
    const accentColor = isBisnis ? '#6366f1' : '#10b981';

    const parsedApp = parseSingleApp(appName, appKey, accentColor, appObj);
    parsedApps[appName] = parsedApp;
    combinedTests = combinedTests.concat(parsedApp.tests);
  }

  // Ensure both apps exist in structure even if one has not run yet
  if (!parsedApps['Kasflo Resto']) {
    parsedApps['Kasflo Resto'] = createEmptyApp('Kasflo Resto', 'resto', '#10b981');
  }
  if (!parsedApps['Kasflo Bisnis']) {
    parsedApps['Kasflo Bisnis'] = createEmptyApp('Kasflo Bisnis', 'bisnis', '#6366f1');
  }

  // Compute Combined Metrics
  const totalTests = combinedTests.length;
  const passed = combinedTests.filter(t => t.status === 'passed').length;
  const failed = combinedTests.filter(t => t.status === 'failed').length;
  const flaky = combinedTests.filter(t => t.status === 'flaky').length;
  const skipped = combinedTests.filter(t => t.status === 'skipped' || t.status === 'untested').length;
  const totalDuration = combinedTests.reduce((acc, t) => acc + t.duration, 0);

  const validTests = totalTests - skipped;
  const passRate = validTests > 0 ? Math.round(((passed + flaky) / validTests) * 1000) / 10 : 0;

  // Aggregate modules for combined view
  const combinedModuleMap = {};
  for (const t of combinedTests) {
    const moduleKey = `${t.appName} › ${t.module}`;
    if (!combinedModuleMap[moduleKey]) {
      combinedModuleMap[moduleKey] = {
        name: t.module,
        fullName: moduleKey,
        appName: t.appName,
        appKey: t.appKey,
        total: 0,
        passed: 0,
        failed: 0,
        flaky: 0,
        skipped: 0,
        duration: 0,
      };
    }
    const m = combinedModuleMap[moduleKey];
    m.total++;
    m[t.status] = (m[t.status] || 0) + 1;
    m.duration += t.duration;
  }

  const combinedModulesSummary = Object.values(combinedModuleMap).map(m => {
    const valid = m.total - m.skipped;
    const rate = valid > 0 ? Math.round(((m.passed + m.flaky) / valid) * 1000) / 10 : 0;
    return {
      ...m,
      passRate: rate,
      durationH: formatDuration(m.duration),
    };
  }).sort((a, b) => b.total - a.total);

  return {
    lastUpdated: rawData.lastUpdated || new Date().toISOString(),
    apps: parsedApps,
    combined: {
      metrics: {
        totalTests,
        passed,
        failed,
        flaky,
        skipped,
        passRate,
        totalDuration,
        totalDurationH: formatDuration(totalDuration),
      },
      modulesSummary: combinedModulesSummary,
      tests: combinedTests,
    }
  };
}

function parseSingleApp(appName, appKey, accentColor, appObj) {
  const suites = appObj.suites || [];
  const allTests = [];

  function getModuleName(filePath) {
    if (!filePath) return 'Umum';
    const clean = filePath.replace(/^[./\\]+/, '').replace(/^tests[/\\]+/, '').replace(/^kasflo[-_](resto|bisnis)[/\\]+/i, '');
    const parts = clean.split(/[/\\]/);
    if (parts.length > 1) {
      if (parts[0].toLowerCase() === 'autentikasi') return 'Autentikasi';
      return parts[0];
    }
    const nameWithoutExt = parts[0].replace(/\.(spec|test)\.[jt]sx?$/, '');
    if (nameWithoutExt.toLowerCase().includes('login') || nameWithoutExt.toLowerCase().includes('autentikasi')) return 'Autentikasi';
    if (nameWithoutExt.toLowerCase().includes('invoice')) return 'Faktur & Invoice';
    if (nameWithoutExt.toLowerCase().includes('multi_outlet')) return 'Multi Outlet';
    if (nameWithoutExt.toLowerCase().includes('crm')) return 'CRM & Pelanggan';
    if (nameWithoutExt.toLowerCase().includes('accounting')) return 'Akuntansi';
    return nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
  }

  function traverseSuite(suite, suiteChain = [], suiteTitleOverride = '') {
    const currentTitle = suite.title || '';
    const currentChain = currentTitle ? [...suiteChain, currentTitle] : suiteChain;
    const activeSuiteTitle = currentTitle || suiteTitleOverride;

    if (Array.isArray(suite.specs)) {
      for (const spec of suite.specs) {
        processSpec(spec, suite, currentChain, activeSuiteTitle);
      }
    }

    if (Array.isArray(suite.suites)) {
      for (const childSuite of suite.suites) {
        traverseSuite(childSuite, currentChain, activeSuiteTitle);
      }
    }
  }

  function processSpec(spec, parentSuite, suiteChain, suiteTitle) {
    const rawTitle = spec.title || 'Untitled Test';
    const tcMatch = rawTitle.match(/\[(TC-[\w.-]+)\]/i) || rawTitle.match(/\b(TC-[\w.-]+)\b/i);
    const tcCode = tcMatch ? tcMatch[1].toUpperCase() : null;
    const scenarioName = rawTitle.replace(/\[TC-[\w.-]+\]\s*/i, '').trim();

    const filePath = spec.file || parentSuite.file || (suiteChain.length > 0 ? suiteChain[0] : 'spec.js');
    const fileName = filePath.split(/[/\\]/).pop();
    const moduleName = getModuleName(filePath);

    const tests = spec.tests || [];
    if (tests.length === 0) {
      allTests.push({
        id: spec.id || `${appName}-${filePath}-${rawTitle}`,
        appName,
        appKey,
        rawTitle,
        tcCode,
        scenarioName,
        filePath,
        fileName,
        module: moduleName,
        suiteTitle: suiteTitle || moduleName,
        status: spec.ok ? 'passed' : 'failed',
        duration: 0,
        durationH: '0ms',
        retryCount: 0,
        steps: [],
        errors: [],
        attachments: [],
        projectName: 'chromium',
      });
      return;
    }

    for (const testItem of tests) {
      const results = testItem.results || [];
      const projectName = testItem.projectName || 'chromium';

      let status = 'passed';
      if (testItem.status === 'skipped' || testItem.status === 'untested' || (results.length > 0 && (results[results.length - 1].status === 'skipped' || results[results.length - 1].status === 'untested'))) {
        status = 'untested';
      } else if (testItem.status === 'flaky' || (results.length > 1 && results[results.length - 1].status === 'passed')) {
        status = 'flaky';
      } else if (testItem.status === 'unexpected' || !spec.ok || results.some(r => r.status === 'failed' || r.status === 'timedOut')) {
        const lastResult = results[results.length - 1];
        if (lastResult && lastResult.status === 'passed' && results.length > 1) {
          status = 'flaky';
        } else {
          status = 'failed';
        }
      }

      let totalDuration = 0;
      const allErrors = [];
      const allAttachments = [];
      const allSteps = [];

      for (const res of results) {
        totalDuration += (res.duration || 0);

        if (Array.isArray(res.steps)) {
          for (const s of res.steps) {
            allSteps.push({
              title: s.title,
              duration: s.duration || 0,
              error: s.error || null,
            });
          }
        }

        if (res.error) {
          allErrors.push({
            message: cleanAnsi(res.error.message || ''),
            stack: cleanAnsi(res.error.stack || ''),
            value: res.error.value || '',
          });
        }
        if (Array.isArray(res.errors)) {
          for (const err of res.errors) {
            allErrors.push({
              message: cleanAnsi(err.message || (typeof err === 'string' ? err : '')),
              stack: cleanAnsi(err.stack || ''),
            });
          }
        }

        if (Array.isArray(res.attachments)) {
          for (const att of res.attachments) {
            allAttachments.push({
              name: att.name || 'attachment',
              contentType: att.contentType || 'application/octet-stream',
              path: att.path || '',
              webmPath: att.webmPath || '',
              fileName: att.path ? att.path.split(/[/\\]/).pop() : att.name,
            });
          }
        }
      }

      const retryCount = Math.max(0, results.length - 1);
      const lastResult = results[results.length - 1] || {};

      allTests.push({
        id: spec.id || `${appName}-${filePath}-${rawTitle}-${spec.line || 0}`,
        appName,
        appKey,
        rawTitle,
        tcCode,
        scenarioName,
        filePath,
        fileName,
        module: moduleName,
        suiteTitle: suiteTitle || moduleName,
        line: spec.line,
        column: spec.column,
        projectName: 'chromium',
        status,
        duration: totalDuration,
        durationH: formatDuration(totalDuration),
        retryCount,
        startTime: lastResult.startTime || appObj.lastRun || null,
        errors: allErrors,
        errorSummary: allErrors.length > 0 ? allErrors[0].message : null,
        steps: allSteps,
        attachments: allAttachments,
      });
    }
  }

  for (const s of suites) {
    traverseSuite(s);
  }

  // App metrics
  const totalTests = allTests.length;
  const passed = allTests.filter(t => t.status === 'passed').length;
  const failed = allTests.filter(t => t.status === 'failed').length;
  const flaky = allTests.filter(t => t.status === 'flaky').length;
  const skipped = allTests.filter(t => t.status === 'skipped' || t.status === 'untested').length;
  const totalDuration = allTests.reduce((acc, t) => acc + t.duration, 0);

  const validTests = totalTests - skipped;
  const passRate = validTests > 0 ? Math.round(((passed + flaky) / validTests) * 1000) / 10 : 0;

  // Module map
  const moduleMap = {};
  for (const t of allTests) {
    if (!moduleMap[t.module]) {
      moduleMap[t.module] = {
        name: t.module,
        appName,
        appKey,
        total: 0,
        passed: 0,
        failed: 0,
        flaky: 0,
        skipped: 0,
        duration: 0,
      };
    }
    const m = moduleMap[t.module];
    m.total++;
    m[t.status] = (m[t.status] || 0) + 1;
    m.duration += t.duration;
  }

  const modulesSummary = Object.values(moduleMap).map(m => {
    const valid = m.total - m.skipped;
    const rate = valid > 0 ? Math.round(((m.passed + m.flaky) / valid) * 1000) / 10 : 0;
    return {
      ...m,
      passRate: rate,
      durationH: formatDuration(m.duration),
    };
  }).sort((a, b) => b.total - a.total);

  return {
    name: appName,
    appKey,
    accentColor,
    lastRun: appObj.lastRun || new Date().toISOString(),
    metrics: {
      totalTests,
      passed,
      failed,
      flaky,
      skipped,
      passRate,
      totalDuration,
      totalDurationH: formatDuration(totalDuration),
    },
    modulesSummary,
    tests: allTests,
  };
}

function cleanAnsi(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

export function formatDuration(ms) {
  if (!ms || ms < 0) return '0ms';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const sec = ms / 1000;
  if (sec < 60) return `${sec.toFixed(1)}s`;
  const mins = Math.floor(sec / 60);
  const remainingSec = Math.round(sec % 60);
  return `${mins}m ${remainingSec}s`;
}

export function formatLastRunDateTime(isoString) {
  if (!isoString) {
    return {
      date: 'Belum pernah',
      time: '-',
      full: 'Belum pernah dijalankan',
      relative: 'Belum pernah',
      status: 'Belum pernah'
    };
  }

  const d = new Date(isoString);
  if (isNaN(d.getTime())) {
    return {
      date: '-',
      time: '-',
      full: '-',
      relative: '-',
      status: '-'
    };
  }

  const dateStr = d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Jakarta'
  });

  const timeStr = d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta'
  }) + ' WIB';

  const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
  let relative = 'Baru saja';
  if (diffSec >= 60 && diffSec < 3600) {
    relative = `${Math.floor(diffSec / 60)} mnt lalu`;
  } else if (diffSec >= 3600 && diffSec < 86400) {
    relative = `${Math.floor(diffSec / 3600)} jam lalu`;
  } else if (diffSec >= 86400) {
    relative = `${Math.floor(diffSec / 86400)} hari lalu`;
  }

  return {
    date: dateStr,
    time: timeStr,
    full: `${dateStr} • ${timeStr}`,
    relative,
    status: 'Selesai (Completed)'
  };
}

function createEmptyApp(name, appKey, accentColor) {
  return {
    name,
    appKey,
    accentColor,
    lastRun: new Date().toISOString(),
    metrics: {
      totalTests: 0,
      passed: 0,
      failed: 0,
      flaky: 0,
      skipped: 0,
      passRate: 0,
      totalDuration: 0,
      totalDurationH: '0s',
    },
    modulesSummary: [],
    tests: [],
  };
}

function createEmptyMultiAppReport() {
  return {
    lastUpdated: new Date().toISOString(),
    apps: {
      'Kasflo Resto': createEmptyApp('Kasflo Resto', 'resto', '#10b981'),
      'Kasflo Bisnis': createEmptyApp('Kasflo Bisnis', 'bisnis', '#6366f1'),
    },
    combined: {
      metrics: {
        totalTests: 0,
        passed: 0,
        failed: 0,
        flaky: 0,
        skipped: 0,
        passRate: 0,
        totalDuration: 0,
        totalDurationH: '0s',
      },
      modulesSummary: [],
      tests: [],
    }
  };
}
