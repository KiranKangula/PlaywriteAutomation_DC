// pages/Guidewire/GWAdminPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWAdminPage extends BasePage {
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

  // --- Dynamic Locators (scoped to top_frame with exact ID matches) ---

  get AdminTab(): Locator {
    // Exact match on 'TabBar:AdminTab' ensures it never selects the hidden 'TabBar:AdminTab:AdminTab_Admin' sub-menu item
    return this.getScope().locator(
      "//*[@id='TabBar:AdminTab'] | //span[normalize-space()='Administration'] | //a[@id='TabBar:AdminTab']"
    ).first();
  }

  get PortalAuthorizationLink(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'PortalAuthorizationAdminPage')] | //a[contains(normalize-space(), 'Portal Authorization')] | //span[contains(normalize-space(), 'Portal Authorization')]/ancestor::a"
    ).first();
  }

  get SearchClaimNumberUserInput(): Locator {
    return this.getScope().locator(
      "//input[contains(@id, 'SearchClaimNumberUserInput')] | //input[contains(@name, 'SearchClaimNumberUserInput')]"
    ).first();
  }

  get SearchUsersUserNameInput(): Locator {
    return this.getScope().locator(
      "//input[contains(@id, 'SearchUsersUserNameInput')] | //input[contains(@name, 'SearchUsersUserNameInput')]"
    ).first();
  }

  get SearchPortalAuth(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'PortalAuthUsersLV_tb:ToolbarButton')] | //span[contains(text(), 'Search Users')]/ancestor::a | //a[contains(., 'Search Users')]"
    ).first();
  }

   get EmailProfileLink(): Locator {
    return this.getScope().locator(
      "//table[contains(@id, 'PortalAuthUsersLV')]//tr[.//input[@type='checkbox']]//a[contains(@id, 'UserNameCell') and not(contains(@id, 'Header'))]"
    ).first();
  }

  get EditButton(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'PortalAuthUserDV_tb:Edit')] | //span[text()='Edit']/ancestor::a"
    ).first();
  }

  get PortalAuthTable(): Locator {
    return this.getScope().locator(
      "//table[contains(@id, 'PortalAuthUserGrantedAuthoritiesLV')]"
    ).first();
  }

  get CheckboxAll(): Locator {
    return this.getScope().locator(
      "//input[contains(@id, 'PortalAuthUserGrantedAuthoritiesLV:_Checkbox')] | //input[contains(@id, '_Checkbox')]"
    ).first();
  }

  get PortalAuthDeleteButton(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'deleteAuthoritiesButton')] | //span[text()='Delete']/ancestor::a"
    ).first();
  }

  get PortalAuthOKButton(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'PortalAuthUserDV_tb:Update')] | //span[text()='OK']/ancestor::a | //span[text()='Update']/ancestor::a"
    ).first();
  }

  get PortalAuthAdminScreen(): Locator {
    return this.getScope().locator(
      "//div[contains(@id, 'PortalAuthAdminScreen')] | //span[contains(@id, 'PortalAuthAdminScreen')] | //div[contains(@class, 'gw-titlebar')]"
    ).first();
  }

  // --- Actions matching Java GWAdminPage.java ---

  public async navigatePortalAuthScreen(): Promise<boolean> {
    console.log('[GWAdminPage] Navigating to Administration tab in GWCC...');
    await this.AdminTab.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.AdminTab);

    // Allow left accordion to expand
    await this.page.waitForTimeout(2000);

    console.log('[GWAdminPage] Clicking Portal Authorization Admin Console link...');
    await this.PortalAuthorizationLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.PortalAuthorizationLink);

    await this.SearchClaimNumberUserInput.waitFor({ state: 'visible', timeout: 30000 });
    return await this.SearchClaimNumberUserInput.isVisible();
  }

  public async removeClaimfromPortalAuth(claimnumber: string): Promise<boolean> {
    console.log(`[GWAdminPage] Removing claim ${claimnumber} from Portal Auth...`);
    await this.SearchClaimNumberUserInput.waitFor({ state: 'visible', timeout: 20000 });
    await this.enter(this.SearchClaimNumberUserInput, claimnumber.trim());

    await this.click(this.SearchPortalAuth);
    await this.page.waitForTimeout(2000);

    const isProfilePresent = await this.EmailProfileLink.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
    if (!isProfilePresent) {
      console.log(`[GWAdminPage] Claim ${claimnumber} not found in search results, skipping removal.`);
      return true;
    }

    await this.click(this.EmailProfileLink);

    await this.EditButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.EditButton);

    await this.page.waitForTimeout(2000);
    const targetRow = this.getScope().locator(
      `//table[contains(@id, 'PortalAuthUserGrantedAuthoritiesLV')]//tr[.//td[normalize-space()="${claimnumber.trim()}"] or .//span[normalize-space()="${claimnumber.trim()}"]]`
    ).first();

    if (await targetRow.isVisible().catch(() => false)) {
      const checkbox = targetRow.locator(".//input[@type='checkbox']").first();
      await this.click(checkbox);
      await this.click(this.PortalAuthDeleteButton);
    }

    await this.click(this.PortalAuthOKButton);

    await this.PortalAuthAdminScreen.waitFor({ state: 'visible', timeout: 30000 });
    return await this.PortalAuthAdminScreen.isVisible();
  }

  public async removeAllClaimfromPortalAuth(username?: string): Promise<boolean> {
    const user = username || '';
    console.log(`[GWAdminPage] Removing all claims from Portal Auth for user: ${user}...`);

    await this.SearchUsersUserNameInput.waitFor({ state: 'visible', timeout: 20000 });
    await this.enter(this.SearchUsersUserNameInput, user.trim());

    await this.click(this.SearchPortalAuth);
    await this.page.waitForTimeout(2000);

    const isProfilePresent = await this.EmailProfileLink.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
    if (!isProfilePresent) {
      console.log(`[GWAdminPage] No user profile found for ${user}, skipping removal.`);
      return true;
    }

    await this.click(this.EmailProfileLink);

    await this.EditButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.EditButton);

    await this.page.waitForTimeout(2000);
    if (await this.CheckboxAll.isVisible().catch(() => false)) {
      await this.click(this.CheckboxAll);
      await this.click(this.PortalAuthDeleteButton);
    }

    await this.click(this.PortalAuthOKButton);
    await this.PortalAuthAdminScreen.waitFor({ state: 'visible', timeout: 30000 });
    return await this.PortalAuthAdminScreen.isVisible();
  }

  public async runDIBatch(): Promise<boolean> {
    await this.page.keyboard.press('Alt+Shift+T');
    return true;
  }
}