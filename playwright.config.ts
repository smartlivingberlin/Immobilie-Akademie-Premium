import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'tests/reports', open: 'never' }],
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    actionTimeout: 15000,
  },
  projects: [
    { 
      name: 'chromium',
      use: { browserName: 'chromium' },
      testMatch: '**/e2e/**/*.spec.ts'
    },
    {
      name: 'playwright-tests',
      use: { browserName: 'chromium' },
      testMatch: '**/playwright/**/*.spec.ts'
    }
  ],
});
