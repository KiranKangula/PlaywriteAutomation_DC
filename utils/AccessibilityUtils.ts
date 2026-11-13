// utils/AccessibilityUtils.ts
import AxeBuilder from '@axe-core/playwright';
import { Page } from '@playwright/test';
import type { AxeResults } from 'axe-core';

export class AccessibilityUtils {
  static async runAccessibilityScan(page: Page, _pageName?: string): Promise<AxeResults> {
    const builder = new AxeBuilder({ page });
    return await builder.analyze();
  }

  static hasCriticalViolations(results?: AxeResults): boolean {
    if (!results || !results.violations) return false;
    return results.violations.some(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
  }

  static buildViolationSummary(results?: AxeResults): string {
    if (!results || !results.violations || results.violations.length === 0) {
      return 'No accessibility violations found.';
    }
    return results.violations
      .map(
        (v, i) =>
          `Violation ${i + 1}: [${(v.impact || 'unknown').toUpperCase()}] ${v.help} (${v.helpUrl})\n  Nodes: ${v.nodes.length} element(s) affected.`
      )
      .join('\n\n');
  }
}