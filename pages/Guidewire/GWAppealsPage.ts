// pages/Guidewire/GWAppealsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWAppealsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Safety check: Ensures this.page is pointing to the ClaimCenter tab
   */
  private ensureClaimCenterPage(): void {
    const pages = this.page.context().pages();
    if (pages.length > 1) {
      const currentUrl = this.page.url();
      if (!currentUrl.includes('/cc/') && !currentUrl.includes('ClaimCenter')) {
        const gwPage = pages.find((p) => p.url().includes('/cc/') || p.url().includes('ClaimCenter'));
        if (gwPage) {
          this.page = gwPage;
        }
      }
    }
  }

  /**
   * Resolves the target execution scope (inside top_frame if present, otherwise main page)
   */
  private getScope() {
    this.ensureClaimCenterPage();
    const hasFrame = this.page.frames().some((f) => f.name() === 'top_frame');
    return hasFrame
      ? this.page.frameLocator('frame[name="top_frame"]')
      : this.page;
  }

  // --- Locators (Valid Playwright CSS / XPath without invalid comma mixing) ---

  get AppealsLink(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'Claim_ClaimMattersGroup')] | //div[contains(@id, 'Claim_ClaimMattersGroup')]//a | //a[normalize-space()='Appeals'] | //a[normalize-space()='Matters'] | //span[normalize-space()='Appeals']/parent::a"
    ).first();
  }

  get NewMatterButton(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'ClaimMatters_NewMatterButton')] | //span[contains(text(), 'New Matter')]/parent::a | //div[contains(@id, 'NewMatterButton')]//a"
    ).first();
  }

  get Matter_Name(): Locator {
    return this.getScope().locator(
      "//input[contains(@id, 'Matter_Name')] | //input[contains(@name, 'Matter_Name')]"
    ).first();
  }

  get Appealtype(): Locator {
    return this.getScope().locator(
      "//select[contains(@id, 'Appealtype')] | //select[contains(@name, 'Appealtype')]"
    ).first();
  }

  get Objectingparty(): Locator {
    return this.getScope().locator(
      "//select[contains(@id, 'Objectingparty')] | //select[contains(@name, 'Objectingparty')]"
    ).first();
  }

  get AppealsUpdateButton(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'NewMatterDV_tb:Update')] | //span[text()='Update']/parent::a"
    ).first();
  }

  get AppealsEditButton(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'MatterDetailScreen:Edit')] | //span[text()='Edit']/parent::a"
    ).first();
  }

  get AppealTab(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'OITandInitialDVTab')] | //span[contains(text(), 'Initial / OIT')]/parent::a | //span[contains(text(), 'Appeal')]/parent::a"
    ).first();
  }

  get WSIB_AppealTypeCase(): Locator {
    return this.getScope().locator(
      "//select[contains(@id, 'WSIB_AppealTypeCase')]"
    ).first();
  }

  get WSIB_NewAppealType(): Locator {
    return this.getScope().locator(
      "//select[contains(@id, 'WSIB_NewAppealType')]"
    ).first();
  }

  get language(): Locator {
    return this.getScope().locator(
      "//select[contains(@id, 'language')]"
    ).first();
  }

  get CaseRefferal(): Locator {
    return this.getScope().locator(
      "//select[contains(@id, 'CaseRefferal')]"
    ).first();
  }

  get otherparticipating(): Locator {
    return this.getScope().locator(
      "//select[contains(@id, 'otherparticipating')]"
    ).first();
  }

  get ObjOrigin(): Locator {
    return this.getScope().locator(
      "//select[contains(@id, 'DualObj')]"
    ).first();
  }

  get CreateNumber(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'ToolbarButton_AppealRequest')] | //span[contains(text(), 'Create Appeal Number')]/parent::a | //span[contains(text(), 'Create Number')]/parent::a"
    ).first();
  }

  get AppealNumber(): Locator {
    return this.getScope().locator(
      "//input[contains(@id, 'Matter_Name')] | //span[contains(@id, 'Matter_Name')] | //div[contains(@id, 'Matter_Name')]"
    ).first();
  }

  get MatterDetailPage_update(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'MatterDetailScreen:Update')] | //span[text()='Update']/parent::a"
    ).first();
  }

  get BatchProcessInfoBar(): Locator {
    return this.getScope().locator('#BatchProcessInfo\\:BatchProcessScreen\\:ttlBar').first();
  }

  get ReturnToClaimCenter(): Locator {
    return this.getScope().locator('#InternalToolsTabBar\\:ReturnTabBarLink').first();
  }

  // --- Helper Methods ---

  private async selectOptionHelper(locator: Locator, textOrValue: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 20000 });
    try {
      await locator.selectOption({ label: textOrValue });
    } catch {
      await locator.selectOption({ value: textOrValue });
    }
  }

  private async selectOptionByIndexHelper(locator: Locator, index: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 20000 });
    await locator.selectOption({ index });
  }

  // --- Actions matching Java GWAppealsPage.java ---

  public async createAppeal(): Promise<boolean> {
    console.log('[GWAppealsPage] Navigating to Appeals / Matters link...');
    await this.AppealsLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.AppealsLink);

    console.log('[GWAppealsPage] Clicking New Matter button...');
    await this.NewMatterButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.NewMatterButton);

    console.log('[GWAppealsPage] Entering Matter Name: AppealTest');
    await this.Matter_Name.waitFor({ state: 'visible', timeout: 20000 });
    await this.enter(this.Matter_Name, 'AppealTest');

    await this.selectOptionHelper(this.Appealtype, 'Appeal');
    await this.selectOptionByIndexHelper(this.Objectingparty, 1);
    await this.page.waitForTimeout(2000);

    console.log('[GWAppealsPage] Saving initial Appeal...');
    await this.click(this.AppealsUpdateButton);

    await this.AppealsEditButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.AppealsEditButton);

    console.log('[GWAppealsPage] Navigating to Appeal Detail tab...');
    await this.AppealTab.waitFor({ state: 'visible', timeout: 20000 });
    await this.click(this.AppealTab);

    await this.selectOptionHelper(this.WSIB_AppealTypeCase, 'Regular');
    await this.page.waitForTimeout(2000);

    await this.selectOptionHelper(this.WSIB_NewAppealType, 'Claims');
    await this.page.waitForTimeout(2000);

    await this.selectOptionHelper(this.language, 'English');
    await this.page.waitForTimeout(2000);

    await this.selectOptionHelper(this.CaseRefferal, 'OD');
    await this.page.waitForTimeout(2000);

    await this.selectOptionHelper(this.otherparticipating, 'No');
    await this.page.waitForTimeout(2000);

    await this.selectOptionHelper(this.ObjOrigin, 'Worker');
    await this.page.waitForTimeout(2000);

    console.log('[GWAppealsPage] Clicking Create Appeal Number...');
    await this.click(this.CreateNumber);

    await this.AppealNumber.waitFor({ state: 'visible', timeout: 30000 });
    const appealVal = (await this.AppealNumber.inputValue().catch(async () => await this.AppealNumber.innerText())) || '';

    if (appealVal.trim() !== '') {
      console.log(`[GWAppealsPage] Appeal successfully generated with ID/Name: ${appealVal.trim()}`);
      await this.click(this.MatterDetailPage_update);
      await this.page.waitForLoadState('domcontentloaded');
      return true;
    }

    return false;
  }

  public async runDIBatchJob(batchNameToRun: string): Promise<boolean> {
    // Guidewire Alt+Shift+T shortcut to open Internal Tools
    await this.page.keyboard.press('Alt+Shift+T');

    await this.BatchProcessInfoBar.waitFor({ state: 'visible', timeout: 30000 });

    const rows = this.getScope().locator(
      '//table[@id="BatchProcessInfo:BatchProcessScreen:BatchProcessesLV"]/tbody/tr'
    );
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const rowText = await row.innerText();
      if (rowText.includes(batchNameToRun)) {
        const runBtn = row.locator('.//a[contains(@id, "RunBatchWithoutNotify")]');
        await runBtn.click();
        await this.page.waitForTimeout(5000);

        for (let attempt = 0; attempt < 10; attempt++) {
          const updatedRow = this.getScope().locator(
            `//table[@id="BatchProcessInfo:BatchProcessScreen:BatchProcessesLV"]/tbody/tr[.//span[text()="${batchNameToRun}"]]`
          );
          const statusText = (await updatedRow.locator('.//span[contains(@id, "LastRunStatus")]').innerText().catch(() => '')).trim();
          if (statusText.toLowerCase() === 'completed') {
            break;
          }
          await this.page.waitForTimeout(5000);
        }
        break;
      }
    }

    if (await this.ReturnToClaimCenter.isVisible().catch(() => false)) {
      await this.click(this.ReturnToClaimCenter);
      return true;
    }
    return false;
  }
}