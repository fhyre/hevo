import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'e2e'),
  retries: 0,
  outputDir: 'test-results/',
  workers: 1,

  webServer: {
    command: 'npm run dev',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: 'retry-with-trace',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: devices['iPhone 12'],
    },
  ],
});
