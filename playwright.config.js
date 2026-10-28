const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./global-setup.js'),
  timeout: 60000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  retries: 2,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    [
      'monocart-reporter',
      {
        name: 'QA Automation Dashboard',
        outputFile: './report/index.html',
        onEnd: async () => {
          if (process.env.SERVE_WIFI === 'true') {
            const { startServer } = require('./scripts/serve-wifi');
            await startServer(8080);
          }
        },
      },
    ],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: true }],
    ['json', { outputFile: 'qa-dashboard/public/data/results.json' }],
    ['./reporters/kasflo-json-merger.js', { outputFile: 'qa-dashboard/public/data/kasflo-results.json' }],
  ],
  use: {
    baseURL: 'https://backoffice-dev.kasflo.id',
    navigationTimeout: 30000,
    actionTimeout: 30000,
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'retain-on-failure',
    launchOptions: {
      args: ['--host-resolver-rules=MAP backoffice-dev.kasflo.id 103.161.149.83'],
    },
  },
  projects: [
    {
      name: 'Kasflo Resto',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      testMatch: ['**/Kasflo-Resto/**/*.spec.js'],
    },
    {
      name: 'Kasflo Bisnis',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/kasflo-bisnis/**/*.spec.js'],
    },
  ],
});

