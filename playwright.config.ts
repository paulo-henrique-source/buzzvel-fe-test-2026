import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:3106';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 3,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'validation', testMatch: 'contact-validation.spec.ts' },
    { name: 'responsive', testMatch: ['responsive.spec.ts', 'regressions/**/*.spec.ts'] },
    {
      name: 'desktop',
      testMatch: 'page.spec.ts',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'mobile',
      testMatch: 'page.spec.ts',
      use: { ...devices['Pixel 5'], viewport: { width: 402, height: 874 } },
    },
    {
      name: 'tablet',
      testMatch: 'page.spec.ts',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
  ],
  webServer: {
    command: 'yarn start --hostname 127.0.0.1 --port 3106',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
