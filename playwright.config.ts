import { PlaywrightTestConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from 'ortoni-report';
import { testConfig } from './src/config/testConfig';

const reporter = {
  base64Image: true,
  title: 'Simply be automation',
  showProject: true,
  authorName: 'Abhishek Singh',
  preferredTheme: 'dark',
  projectName: 'Simply be automation with playwright using Typescript',
}

const config: PlaywrightTestConfig = {

  //Global Setup to run before all tests
  globalSetup: './global-setup',

  //sets timeout for each test case
  timeout: 120000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: [['./CustomReporterConfig.ts'], ['allure-playwright', reporter], ['html', {open: 'never'}]],

  projects: [
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        baseURL: testConfig.baseURL,
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          slowMo: 500
        }
      },
    },
    {
      name: 'Chrome',
      use: {
        // Configure the browser to use.
        browserName: 'chromium',

        //Chrome Browser Config
        channel: 'chrome',

        //Picks Base Url based on User input
        baseURL: testConfig.baseURL,

        //Browser Mode
        headless: true,

        //Browser height and width
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        //Artifacts
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',

        //Slows down execution by ms
        launchOptions: {
          slowMo: 500
        }
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        baseURL: testConfig.baseURL,
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          slowMo: 500
        }
      },
    },
    {
      name: 'Web',
    }
  ],
};

export default config