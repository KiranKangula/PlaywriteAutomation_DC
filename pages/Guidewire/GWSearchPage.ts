// pages/Guidewire/GWSearchPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWSearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Resolves the target execution scope (top_frame if present, otherwise main page)
   */
  private getScope() {
    this.ensureClaimCenterPage();
    const hasFrame = this.page.frames().some((f) => f.name() === 'top_frame');
    return hasFrame
      ? this.page.frameLocator('frame[name="top_frame"]')
      : this.page;
  }

  /**
   * Safety check: Ensures this.page is pointed to the ClaimCenter tab if multiple tabs are open
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

  // Dynamic Locators scoped to top_frame
  get searchTab(): Locator {
    return this.getScope().locator('#TabBar\\:SearchTab');
  }

  get desktopActivities(): Locator {
    return this.getScope().locator('#DesktopActivities');
  }

  get claimSearchField(): Locator {
    return this.getScope().locator(
      '#ClaimSearch\\:ClaimSearchScreen\\:ClaimSearchDV\\:ClaimSearchOptionalInputSet\\:ClaimNumber'
    );
  }

  get searchButton(): Locator {
    return this.getScope().locator(
      '#ClaimSearch\\:ClaimSearchScreen\\:ClaimSearchDV\\:ClaimSearchAndResetInputSet\\:Search_link'
    );
  }

  get selectClaimfromSearch(): Locator {
    return this.getScope().locator(
      "//div[contains(@id, 'ResultsLV:0:ClaimNumber')] | //a[contains(@id, 'ResultsLV:0:ClaimNumber')] | //div[contains(@id, 'ClaimSearch')]//table//tr[1]//td[contains(@class, 'gw-action')]"
    );
  }

  get summaryTitlebar(): Locator {
    return this.getScope().locator('#ClaimSummary\\:ClaimSummaryScreen\\:ttlBar');
  }

  get claimRegistrationTitlebar(): Locator {
    return this.getScope().locator(
      '#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:ttlBar'
    );
  }

  get searchFirstName(): Locator {
    return this.getScope().locator(
      '#ClaimSearch\\:ClaimSearchScreen\\:ClaimSearchDV\\:ClaimSearchOptionalInputSet\\:FirstName'
    );
  }

  get searchLastName(): Locator {
    return this.getScope().locator(
      '#ClaimSearch\\:ClaimSearchScreen\\:ClaimSearchDV\\:ClaimSearchOptionalInputSet\\:LastName'
    );
  }

  get searchDOB(): Locator {
    return this.getScope().locator(
      '#ClaimSearch\\:ClaimSearchScreen\\:ClaimSearchDV\\:ClaimSearchOptionalInputSet\\:DateOfBirth'
    );
  }

  get originatingChannel(): Locator {
    return this.getScope().locator('#Claim\\:ClaimInfoBar\\:originatingChannel_link');
  }

  get nihlClaimResultLinks(): Locator {
    return this.getScope().locator(
      "//table[contains(@id, 'ClaimSearch') and contains(@id, 'ResultsLV')]//a[substring(@id, string-length(@id) - string-length(':ClaimNumber') + 1) = ':ClaimNumber']"
    );
  }

  get nihlUnnumberedDocumentsLink(): Locator {
    return this.getScope().locator('#WSIB_Form8_FNOLWizard\\:Documents');
  }

  // --- Methods matching Java GWSearchPage.java ---

  async searchClaim(claimnumber: string): Promise<boolean> {
    console.log(`[GWSearchPage] Searching for Claim: ${claimnumber}`);
    await this.searchTab.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.searchTab);

    await this.claimSearchField.waitFor({ state: 'visible', timeout: 20000 });
    await this.enter(this.claimSearchField, claimnumber.trim());

    await this.click(this.searchButton);
    await this.page.waitForTimeout(2000);

    await this.selectClaimfromSearch.first().waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.selectClaimfromSearch.first());

    await this.summaryTitlebar.waitFor({ state: 'visible', timeout: 30000 });
    return await this.summaryTitlebar.isVisible();
  }

  async searchReference(referenceNumber: string): Promise<boolean> {
    console.log(`[GWSearchPage] Searching for Reference Number: ${referenceNumber}`);
    await this.searchTab.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.searchTab);

    await this.claimSearchField.waitFor({ state: 'visible', timeout: 20000 });
    await this.enter(this.claimSearchField, referenceNumber.trim());

    await this.click(this.searchButton);
    await this.page.waitForTimeout(2000);

    await this.selectClaimfromSearch.first().waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.selectClaimfromSearch.first());

    await this.claimRegistrationTitlebar.waitFor({ state: 'visible', timeout: 30000 });
    return await this.claimRegistrationTitlebar.isVisible();
  }

  async GWCCLoginsuccess(): Promise<boolean> {
    await this.desktopActivities.waitFor({ state: 'visible', timeout: 30000 });
    return await this.desktopActivities.isVisible();
  }

  async searchClaimant(firstname: string, lastname: string, dateofbirth: string): Promise<boolean> {
    if (!firstname || !lastname || !dateofbirth) {
      throw new Error('[GWSearchPage] First name, last name, and date of birth are required.');
    }

    console.log(`[GWSearchPage] Searching Claimant: ${firstname} ${lastname}, DOB: ${dateofbirth}`);
    await this.searchTab.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.searchTab);

    await this.searchFirstName.waitFor({ state: 'visible', timeout: 20000 });
    await this.enter(this.searchFirstName, firstname.trim());
    await this.enter(this.searchLastName, lastname.trim());
    await this.enter(this.searchDOB, dateofbirth.trim());

    const maxAttempts = 50;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`[GWCC SEARCH] Attempt ${attempt}/${maxAttempts}: submitting search.`);
      await this.click(this.searchButton);
      await this.page.waitForTimeout(3000);

      const isFound = await this.selectClaimfromSearch.first().isVisible().catch(() => false);
      if (isFound) {
        const claimNum = (await this.selectClaimfromSearch.first().innerText()).trim();
        if (claimNum) {
          console.log(`[GWCC SEARCH] SUCCESS: clicked claim ${claimNum} on attempt ${attempt}.`);
          await this.click(this.selectClaimfromSearch.first());
          return true;
        }
      }
    }
    return false;
  }

  async searchDIClaim(firstname: string, lastname: string, dateofbirth: string): Promise<boolean> {
    console.log(`[GWSearchPage] Searching DI Claim: ${firstname} ${lastname}, DOB: ${dateofbirth}`);
    await this.searchTab.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.searchTab);

    await this.searchFirstName.waitFor({ state: 'visible', timeout: 20000 });
    await this.enter(this.searchFirstName, firstname);
    await this.enter(this.searchLastName, lastname);
    await this.enter(this.searchDOB, dateofbirth);

    for (let loop = 0; loop < 50; loop++) {
      await this.click(this.searchButton);
      await this.page.waitForTimeout(2000);

      const isVisible = await this.selectClaimfromSearch.first().isVisible().catch(() => false);
      if (isVisible) {
        const text = (await this.selectClaimfromSearch.first().innerText()).trim();
        if (text.startsWith('3')) {
          console.log(`[GWSearchPage] Claim found in GWCC: ${text}`);
          await this.click(this.selectClaimfromSearch.first());
          break;
        }
      } else {
        await this.page.waitForTimeout(3000);
        await this.click(this.searchTab);
      }
    }

    await this.originatingChannel.waitFor({ state: 'visible', timeout: 30000 });
    return await this.originatingChannel.isVisible();
  }

  async searchNIHLClaimant(
    firstName: string,
    lastName: string,
    dob: string,
    timeoutSeconds: number = 900,
    pollSeconds: number = 30
  ): Promise<boolean> {
    const expectedName = `${firstName.trim()} ${lastName.trim()}`.toLowerCase();
    const started = Date.now();
    const budgetMs = timeoutSeconds * 1000;
    let attempt = 0;

    while (Date.now() - started < budgetMs) {
      attempt++;
      console.log(`[NIHL GWCC SEARCH] Attempt ${attempt}; budget=${timeoutSeconds}s.`);
      await this.click(this.searchTab);

      await this.claimSearchField.fill('');
      await this.enter(this.searchFirstName, firstName.trim());
      await this.enter(this.searchLastName, lastName.trim());
      await this.enter(this.searchDOB, dob.trim());
      await this.click(this.searchButton);

      await this.page.waitForTimeout(3000);

      const linksCount = await this.nihlClaimResultLinks.count();
      if (linksCount > 0) {
        for (let i = 0; i < linksCount; i++) {
          const link = this.nihlClaimResultLinks.nth(i);
          const row = link.locator('xpath=ancestor::tr[1]');
          const actualName = (await row.locator("span[id$=':Claimant']").innerText().catch(() => '')).toLowerCase();

          if (actualName.includes(expectedName.split(' ')[0]) && actualName.includes(expectedName.split(' ')[1])) {
            const refText = await link.innerText();
            console.log(`[NIHL GWCC SEARCH] Matched and clicking reference: ${refText}`);
            await link.click();
            await this.nihlUnnumberedDocumentsLink.waitFor({ state: 'visible', timeout: 15000 });
            return true;
          }
        }
      }

      console.log('[NIHL GWCC SEARCH] Matching claimant is not visible yet, waiting...');
      await this.page.waitForTimeout(pollSeconds * 1000);
    }

    return false;
  }
}