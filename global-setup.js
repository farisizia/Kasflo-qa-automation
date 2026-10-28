const fs = require('fs');
const path = require('path');
const { chromium, expect } = require('@playwright/test');

const AUTH_FILE = path.join(__dirname, 'playwright', '.auth', 'user.json');

module.exports = async function globalSetup() {
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Initialize fallback empty storageState so tests never crash if setup is interrupted
  if (!fs.existsSync(AUTH_FILE)) {
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }, null, 2));
  }

  const browser = await chromium.launch({
    args: ['--host-resolver-rules=MAP backoffice-dev.kasflo.id 103.161.149.83'],
  });

  try {
    const context = await browser.newContext({
      baseURL: 'https://backoffice-dev.kasflo.id',
    });
    const page = await context.newPage();

    try {
      await page.goto('https://backoffice-dev.kasflo.id', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
    } catch {
      await page.goto('https://backoffice-dev.kasflo.id', {
        waitUntil: 'commit',
        timeout: 30000,
      });
    }

    if (!page.url().includes('/admin/')) {
      const emailInput = page.getByLabel(/Email atau Username/i);
      await expect(emailInput).toBeVisible({ timeout: 20000 });
      await emailInput.fill('qakasflo@automation.com');

      const passwordInput = page.getByLabel(/Kata Sandi/i);
      await expect(passwordInput).toBeVisible({ timeout: 10000 });
      await passwordInput.fill('password');
      await page.waitForTimeout(500);

      const loginBtn = page.getByRole('button', { name: 'Masuk' });
      await expect(loginBtn).toBeVisible({ timeout: 10000 });
      await expect(loginBtn).toBeEnabled({ timeout: 10000 });
      await loginBtn.click();

      await expect(page).toHaveURL(/.*\/admin\/dashboard.*/, { timeout: 35000 });
    }

    // Wait for dashboard sidebar and loading indicators to settle completely
    const loader = page.locator(
      '.mantine-Loader-root:visible, .mantine-LoadingOverlay-root:visible, .mantine-Skeleton-root:visible'
    );
    await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});

    const dashboardMenu = page.locator('nav a[href*="/admin/dashboard"]').first();
    await expect(dashboardMenu).toBeVisible({ timeout: 15000 }).catch(() => {});

    await context.storageState({ path: AUTH_FILE });
  } catch (err) {
    console.warn('[global-setup] Warning: Could not pre-authenticate storageState, tests will fallback to loginBeforeTest:', err.message);
  } finally {
    await browser.close();
  }
};

