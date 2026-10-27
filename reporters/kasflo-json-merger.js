const fs = require('fs');
const path = require('path');

/**
 * Kasflo Smart Multi-App JSON Merger Reporter for Playwright
 * Tracks results for "Kasflo Resto" and "Kasflo Bisnis"
 * Merges execution results per project without overwriting the other project's prior results.
 */
class KasfloJsonMergerReporter {
  constructor(options = {}) {
    this.outputFile = options.outputFile || path.resolve(process.cwd(), 'qa-dashboard/public/data/kasflo-results.json');
  }

  onBegin(config, suite) {
    this.config = config;
    this.rootSuite = suite;
    this.startTime = Date.now();
  }

  onEnd(result) {
    const duration = Date.now() - this.startTime;
    const nowIso = new Date().toISOString();

    // 1. Read existing data if available
    let existingData = {
      lastUpdated: nowIso,
      apps: {}
    };

    try {
      if (fs.existsSync(this.outputFile)) {
        const raw = fs.readFileSync(this.outputFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.apps) {
          existingData = parsed;
        }
      }
    } catch (err) {
      console.warn('[KasfloReporter] Warning: Could not read existing kasflo-results.json, creating new structure:', err.message);
    }

    // 2. Identify and group tests by project in this run
    const projectsInRun = {};

    for (const projectSuite of this.rootSuite.suites) {
      const projName = projectSuite.project() ? projectSuite.project().name : (projectSuite.title || 'Kasflo Resto');
      
      // Normalize to known app names or fallback
      let normalizedAppName = 'Kasflo Resto';
      if (/bisnis/i.test(projName)) {
        normalizedAppName = 'Kasflo Bisnis';
      } else if (/resto/i.test(projName)) {
        normalizedAppName = 'Kasflo Resto';
      } else {
        normalizedAppName = projName;
      }

      if (!projectsInRun[normalizedAppName]) {
        projectsInRun[normalizedAppName] = {
          name: normalizedAppName,
          appKey: normalizedAppName.toLowerCase().includes('bisnis') ? 'bisnis' : 'resto',
          accentColor: normalizedAppName.toLowerCase().includes('bisnis') ? '#6366f1' : '#10b981',
          lastRun: nowIso,
          projectSuites: [],
        };
      }
      projectsInRun[normalizedAppName].projectSuites.push(projectSuite);
    }

    // 3. Transform suites for each project that ran
    for (const [appName, appObj] of Object.entries(projectsInRun)) {
      const serializedSuites = [];
      let total = 0;
      let expected = 0;
      let unexpected = 0;
      let flaky = 0;
      let skipped = 0;
      let appDuration = 0;

      for (const pSuite of appObj.projectSuites) {
        // pSuite contains file suites
        for (const fileSuite of pSuite.suites) {
          const sSuite = this._serializeSuite(fileSuite, appName);
          serializedSuites.push(sSuite);
        }

        // Also check if pSuite has direct specs or direct tests
        if ((pSuite.specs && pSuite.specs.length > 0) || (pSuite.tests && pSuite.tests.length > 0)) {
          serializedSuites.push(this._serializeSuite(pSuite, appName));
        }

        // Calculate stats
        const allTests = pSuite.allTests();
        for (const t of allTests) {
          total++;
          const outcome = typeof t.outcome === 'function' ? t.outcome() : t.outcome;
          if (outcome === 'expected') expected++;
          else if (outcome === 'unexpected') unexpected++;
          else if (outcome === 'flaky') flaky++;
          else if (outcome === 'skipped') skipped++;

          const testDur = (t.results || []).reduce((acc, r) => acc + (r.duration || 0), 0);
          appDuration += testDur;
        }
      }

      // Merge serializedSuites into existing suites for this app
      const existingApp = existingData.apps[appName] || {};
      const existingSuites = existingApp.suites || [];
      const updatedSuitesMap = new Map();

      // Put existing suites into map keyed by suite.file || suite.title
      for (const s of existingSuites) {
        const key = s.file || s.title;
        if (key) {
          updatedSuitesMap.set(key, s);
        }
      }

      // Replace or insert newly executed suites
      for (const s of serializedSuites) {
        const key = s.file || s.title;
        if (key) {
          updatedSuitesMap.set(key, s);
        }
      }

      const mergedSuites = updatedSuitesMap.size > 0 ? Array.from(updatedSuitesMap.values()) : serializedSuites;

      // Recalculate stats across all merged suites
      let totalTests = 0;
      let expectedTests = 0;
      let unexpectedTests = 0;
      let flakyTests = 0;
      let skippedTests = 0;
      let totalDuration = 0;

      function accumulateStats(s) {
        if (s.specs) {
          for (const sp of s.specs) {
            for (const t of (sp.tests || [])) {
              totalTests++;
              const st = t.status;
              if (st === 'expected' || st === 'passed') expectedTests++;
              else if (st === 'unexpected' || st === 'failed') unexpectedTests++;
              else if (st === 'flaky') flakyTests++;
              else if (st === 'skipped') skippedTests++;
              else expectedTests++;

              if (t.results && Array.isArray(t.results)) {
                totalDuration += t.results.reduce((acc, r) => acc + (r.duration || 0), 0);
              }
            }
          }
        }
        if (s.suites && Array.isArray(s.suites)) {
          for (const child of s.suites) {
            accumulateStats(child);
          }
        }
      }

      for (const s of mergedSuites) {
        accumulateStats(s);
      }

      // Merge/update this project
      existingData.apps[appName] = {
        name: appName,
        appKey: appObj.appKey || existingApp.appKey,
        accentColor: appObj.accentColor || existingApp.accentColor,
        lastRun: nowIso,
        stats: {
          startTime: existingApp.stats?.startTime || new Date(this.startTime).toISOString(),
          duration: totalDuration || duration,
          total: totalTests,
          expected: expectedTests,
          unexpected: unexpectedTests,
          flaky: flakyTests,
          skipped: skippedTests,
        },
        suites: mergedSuites,
      };
    }

    existingData.lastUpdated = nowIso;

    // 4. Ensure directory exists and write atomically
    const dir = path.dirname(this.outputFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(this.outputFile, JSON.stringify(existingData, null, 2), 'utf-8');
    console.log(`\n[KasfloReporter] Updated kasflo-results.json: [${Object.keys(projectsInRun).join(', ')}] merged successfully.`);
  }

  _serializeSuite(suite, appName) {
    const relativeFile = suite.location?.file 
      ? path.relative(process.cwd(), suite.location.file) 
      : (suite.file ? path.relative(process.cwd(), suite.file) : (suite.title || ''));

    // In Playwright's reporter Suite hierarchy:
    // suite.tests is TestCase[]
    // suite.specs is an array if already created or undefined
    const directSpecs = (suite.specs || []).map(spec => this._serializeSpec(spec, appName));
    const testCasesAsSpecs = (suite.tests || []).map(tc => this._serializeTestCaseToSpec(tc, appName, suite));
    const allSpecs = [...directSpecs, ...testCasesAsSpecs];

    return {
      title: suite.title,
      file: relativeFile,
      column: suite.location?.column || suite.column || 0,
      line: suite.location?.line || suite.line || 0,
      specs: allSpecs,
      suites: (suite.suites || []).map(child => this._serializeSuite(child, appName)),
    };
  }

  _serializeTestCaseToSpec(tc, appName, parentSuite) {
    const relativeFile = tc.location?.file 
      ? path.relative(process.cwd(), tc.location.file)
      : (parentSuite.file ? path.relative(process.cwd(), parentSuite.file) : '');

    const results = (tc.results || []).map(r => ({
      workerIndex: r.workerIndex || 0,
      status: r.status,
      duration: r.duration || 0,
      retry: r.retry || 0,
      startTime: r.startTime ? new Date(r.startTime).toISOString() : new Date().toISOString(),
      error: r.error ? {
        message: r.error.message || '',
        stack: r.error.stack || '',
        value: r.error.value || '',
      } : null,
      errors: (r.errors || []).map(e => ({
        message: e.message || (typeof e === 'string' ? e : ''),
        stack: e.stack || '',
      })),
      steps: (r.steps || []).map(st => ({
        title: st.title,
        duration: st.duration || 0,
        error: st.error ? { message: st.error.message } : null,
      })),
      attachments: (r.attachments || []).map(att => this._persistAttachment(att, tc.title)),
    }));

    const isOk = typeof tc.ok === 'function' ? tc.ok() : (tc.ok !== undefined ? tc.ok : true);
    const outcome = typeof tc.outcome === 'function' ? tc.outcome() : (tc.outcome || 'expected');

    return {
      title: tc.title,
      ok: isOk,
      tags: tc.tags || tc._tags || [],
      id: tc.id,
      file: relativeFile,
      line: tc.location?.line || 0,
      column: tc.location?.column || 0,
      tests: [
        {
          timeout: tc.timeout || 60000,
          expectedStatus: tc.expectedStatus,
          projectId: appName,
          projectName: appName,
          status: outcome,
          results,
        }
      ],
    };
  }

  _serializeSpec(spec, appName) {
    const relativeFile = spec.file ? path.relative(process.cwd(), spec.file) : '';

    return {
      title: spec.title,
      ok: typeof spec.ok === 'function' ? spec.ok() : (spec.ok !== undefined ? spec.ok : true),
      tags: spec.tags || [],
      id: spec.id,
      file: relativeFile,
      line: spec.line || 0,
      column: spec.column || 0,
      tests: (spec.tests || []).map(t => {
        const results = (t.results || []).map(r => ({
          workerIndex: r.workerIndex || 0,
          status: r.status,
          duration: r.duration || 0,
          retry: r.retry || 0,
          startTime: r.startTime ? new Date(r.startTime).toISOString() : new Date().toISOString(),
          error: r.error ? {
            message: r.error.message || '',
            stack: r.error.stack || '',
            value: r.error.value || '',
          } : null,
          errors: (r.errors || []).map(e => ({
            message: e.message || (typeof e === 'string' ? e : ''),
            stack: e.stack || '',
          })),
          steps: (r.steps || []).map(st => ({
            title: st.title,
            duration: st.duration || 0,
            error: st.error ? { message: st.error.message } : null,
          })),
          attachments: (r.attachments || []).map(att => this._persistAttachment(att, spec.title)),
        }));

        return {
          timeout: t.timeout || 60000,
          expectedStatus: t.expectedStatus,
          projectName: appName,
          status: typeof t.outcome === 'function' ? t.outcome() : (t.status || 'expected'),
          results,
        };
      }),
    };
  }

  _persistAttachment(att, testTitle) {
    if (!att || !att.path) {
      return {
        name: att?.name || 'attachment',
        contentType: att?.contentType || 'application/octet-stream',
        path: '',
      };
    }

    // Already a web path
    if (att.path.startsWith('/attachments/')) {
      return {
        name: att.name || 'screenshot',
        contentType: att.contentType || 'image/png',
        path: att.path,
      };
    }

    try {
      if (fs.existsSync(att.path)) {
        const publicDir = path.resolve(process.cwd(), 'qa-dashboard/public/attachments/screenshots');
        const distDir = path.resolve(process.cwd(), 'qa-dashboard/dist/attachments/screenshots');
        fs.mkdirSync(publicDir, { recursive: true });
        if (fs.existsSync(path.dirname(distDir))) {
          fs.mkdirSync(distDir, { recursive: true });
        }

        const safeTitle = (testTitle || 'test').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60);
        const fileName = `${safeTitle}_${Date.now()}_${path.basename(att.path)}`;
        const publicTarget = path.join(publicDir, fileName);
        fs.copyFileSync(att.path, publicTarget);

        const distTarget = path.join(distDir, fileName);
        if (fs.existsSync(path.dirname(distDir))) {
          try { fs.copyFileSync(att.path, distTarget); } catch (e) {}
        }

        return {
          name: att.name || 'screenshot',
          contentType: att.contentType || 'image/png',
          path: `/attachments/screenshots/${fileName}`,
        };
      }
    } catch (e) {
      console.warn('[KasfloReporter] Could not persist attachment:', e.message);
    }

    return {
      name: att.name || 'screenshot',
      contentType: att.contentType || 'application/octet-stream',
      path: att.path,
    };
  }
}

module.exports = KasfloJsonMergerReporter;
