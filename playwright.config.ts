import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/playwright',
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
// Multi-browser wird separat konfiguriert
// Multi-browser wird separat konfiguriert
