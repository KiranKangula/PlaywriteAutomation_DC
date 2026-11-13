// tests/step_definitions/hooks.ts
import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, request } from '@playwright/test';
import { CustomWorldClass } from './world';
import { JsonUtils } from '../../utils/JsonUtils';
import { ConfigLoader } from '../../utils/ConfigLoader';

// Match Java timeout behavior (prevents 5000ms default timeout)
setDefaultTimeout(60000);

Before(async function (this: CustomWorldClass, scenario) {
  const tags = scenario.pickle.tags.map((t) => t.name);

  // 1. Identify SheetName from tags (@SheetName_GWCC, @SheetName_WT, etc.)
  const sheetTag = tags.find((t) => t.startsWith('@SheetName_'));
  this.sheetName = sheetTag ? sheetTag.replace('@SheetName_', '') : undefined;

  // 2. Classify scenario type (matches Hooks.java: @NonWSIB / @WSIBForm)
  if (tags.some((t) => t.includes('NonWSIB'))) {
    this.scenarioType = 'NonWSIB';
  } else if (tags.some((t) => t.includes('WSIBForm') || t.includes('WSIB'))) {
    this.scenarioType = 'WSIB';
  } else {
    this.scenarioType = 'Unknown';
  }

  // 3. Determine Application Name strictly from feature file URI first
  const featureUri = scenario.pickle.uri || '';
  const appName = ConfigLoader.resolveAppName(tags, featureUri, this.sheetName);

  // 4. Resolve Environment (reads process.env.TEST_ENV || process.env.ENV || 'BAT')
  const env = ConfigLoader.getEnvironment(appName);
  console.log(`\n==================================================`);
  console.log(`🚀 Running Scenario : ${scenario.pickle.name}`);
  console.log(`📦 Application      : ${appName}`);
  console.log(`🌐 Environment      : ${env}`);
  console.log(`📄 Data Sheet       : ${this.sheetName || 'None'}`);
  console.log(`==================================================\n`);

  // 5. Load Configurations (config/environments/<ENV>/<appName>.json)
  this.config = ConfigLoader.loadEnvConfig(appName, env);
  this.commonConfig = ConfigLoader.loadCommonConfig();

  // 6. Load Test Data using resolved environment & sheet name
  if (this.sheetName) {
    this.data = JsonUtils.readJsonData(this.sheetName, env);
    this.currentIndex = 0;
    this.currentRow = this.data && this.data.length > 0 ? this.data[0] : {};
  }

  // 7. Initialize API Request Context
  const baseUrl = this.config?.baseUrl || this.config?.url || this.config?.apiBaseUrl;
  this.request = await request.newContext({
    baseURL: baseUrl,
    ignoreHTTPSErrors: true
  });

  // 8. Check if API-only test
  const isApiOnly = tags.includes('@API') && !tags.some((t) => t.includes('@B2BForm7') && !t.includes('@Token'));

  if (!isApiOnly) {
    // Resolve browser & headless from env or config
    const browserConfig = (this.config?.browser || 'chrome').toLowerCase().trim();
    const browserType = (process.env.BROWSER || browserConfig).toLowerCase().trim();

    const headlessEnv = process.env.HEADLESS;
    const isHeadless =
      headlessEnv !== undefined
        ? headlessEnv === 'true'
        : this.commonConfig?.headless === 'true' || this.commonConfig?.headless === true;

    console.log(`🌐 Launching Browser: ${browserType} | Headless: ${isHeadless}`);

    const browserArgs = [
      '--remote-allow-origins=*',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--start-maximized'
    ];

    if (browserType.includes('edge')) {
      this.browser = await chromium.launch({
        headless: isHeadless,
        channel: 'msedge',
        args: browserArgs
      });
    } else if (browserType.includes('firefox')) {
      this.browser = await firefox.launch({
        headless: isHeadless,
        args: ['--start-maximized']
      });
    } else {
      // Chrome default
      this.browser = await chromium.launch({
        headless: isHeadless,
        channel: 'chrome',
        args: browserArgs
      });
    }

    this.context = await this.browser.newContext({
      viewport: null, // Full-screen
      ignoreHTTPSErrors: true
    });

    await this.context.clearCookies();

    this.page = await this.context.newPage();
    this.initPages();

    // 9. Navigate to baseUrl (Exact matching Java Hooks.java: webDriver.get(baseUrl))
    if (baseUrl) {
      console.log(`🔗 Navigating to URL: ${baseUrl}`);
      await this.page.goto(baseUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
    } else {
      console.warn(`⚠️ Warning: No 'baseUrl' found in config for ${appName} (${env}).`);
    }
  }
});

After(async function (this: CustomWorldClass, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true }).catch(() => null);
    if (screenshot) {
      this.attach(screenshot, 'image/png');
    }
  }

  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
  await this.browser?.close().catch(() => {});
  await this.request?.dispose().catch(() => {});
});