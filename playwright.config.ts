import { devices, type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:4000/',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop',
      use: {
        browserName: 'chromium',
        ...devices['Macbook Pro'],
      },
    },
  ],
}

export default config
