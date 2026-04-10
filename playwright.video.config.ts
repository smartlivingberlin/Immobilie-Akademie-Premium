import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/playwright',
  testMatch: '**/16-video-journey.spec.ts',
  timeout: 60000,
  use: {
    headless: true,
    video: 'on',
    screenshot: 'on',
    viewport: { width: 1280, height: 720 },
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  outputDir: 'tests/videos',
});
