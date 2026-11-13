// tests/step_definitions/loginSteps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorldClass } from './world';

Given('User is on login page', async function (this: CustomWorldClass) {
  console.log('Verifying User is on Login Page.');
  const isVisible = await this.loginPage.verifyOnLoginPage();
  expect(isVisible).toBe(true);
});

When('User submit email and password', async function (this: CustomWorldClass) {
  console.log('Submitting Email and password.');

  // Extracts credentials matching keys from config/environments/<ENV>/OSPC.json
  const username =
    this.config?.OSPC_username ??
    this.config?.OSPC_Username ??
    this.config?.ospc_username ??
    this.config?.username ??
    this.config?.email;

  const password =
    this.config?.OSPC_Password ??
    this.config?.OSPC_password ??
    this.config?.ospc_password ??
    this.config?.password;

  console.log(`[Step] Resolved username: ${username}`);

  if (!username || !password) {
    throw new Error(
      `[LoginStep] Missing credentials in config for ${this.config?.baseUrl || 'active app'}! Available config keys: [${Object.keys(this.config || {}).join(', ')}]`
    );
  }

  await this.loginPage.loginToSite(username, password);
});

Then('User should be able to login successfully and new page open', async function (this: CustomWorldClass) {
  console.log('Verifying successful login.');
  const isHomePage = await this.homePage.verifyOnHomePage();
  expect(isHomePage).toBe(true);
});