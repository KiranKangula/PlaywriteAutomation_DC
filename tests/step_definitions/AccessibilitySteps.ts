// tests/step_definitions/AccessibilitySteps.ts
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { AxeResults } from 'axe-core';
import { CustomWorldClass } from './world';
import { AccessibilityUtils } from '../../utils/AccessibilityUtils';

let lastScanResults: AxeResults | undefined;

When('User runs accessibility scan on {string}', async function (this: CustomWorldClass, pageName: string) {
  if (!this.page) {
    throw new Error('Playwright page is not initialized in CustomWorld.');
  }
  lastScanResults = await AccessibilityUtils.runAccessibilityScan(this.page, pageName);
  const summary = AccessibilityUtils.buildViolationSummary(lastScanResults);
  this.attach(summary, 'text/plain');
});

Then('the page should have no critical WCAG violations', async function (this: CustomWorldClass) {
  const summary = AccessibilityUtils.buildViolationSummary(lastScanResults);
  const hasCritical = AccessibilityUtils.hasCriticalViolations(lastScanResults);
  expect(hasCritical, `Critical/Serious WCAG violations found:\n${summary}`).toBeFalsy();
});

Then('the page should have no WCAG violations', async function (this: CustomWorldClass) {
  const summary = AccessibilityUtils.buildViolationSummary(lastScanResults);
  const count = lastScanResults ? lastScanResults.violations.length : 0;
  expect(count, `WCAG violations found:\n${summary}`).toBe(0);
});

Then('User logs all WCAG results without failing', async function (this: CustomWorldClass) {
  const summary = AccessibilityUtils.buildViolationSummary(lastScanResults);
  this.attach(summary, 'text/plain');
  console.log(summary);
});