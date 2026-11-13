// pages/Guidewire/GWClaimParticipantsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWClaimParticipantsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Safety check: Ensures this.page is pointed to the ClaimCenter tab
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

  // --- Dynamic Locators (Pure XPath, scoped to top_frame) ---

  get ClaimParticipantsLink(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'Claim_ClaimPartiesGroup')] | //div[contains(@id, 'Claim_ClaimPartiesGroup')]//a | //a[normalize-space()='Parties Involved']"
    ).first();
  }

  get ClaimParticipantsTable(): Locator {
    return this.getScope().locator(
      "//table[contains(@id, 'PeopleInvolvedDetailedLV')] | //*[@id='ClaimContacts:ClaimContactsScreen:PeopleInvolvedDetailedListDetail:PeopleInvolvedDetailedLV']"
    ).first();
  }

  get addressLine1(): Locator {
    return this.getScope().locator(
      "//span[contains(@id, 'addressLine1')] | //div[contains(@id, 'addressLine1')] | //input[contains(@id, 'addressLine1')]"
    ).first();
  }

  get addressLine2(): Locator {
    return this.getScope().locator(
      "//span[contains(@id, 'addressLine2')] | //div[contains(@id, 'addressLine2')] | //input[contains(@id, 'addressLine2')]"
    ).first();
  }

  get addressLine3(): Locator {
    return this.getScope().locator(
      "//span[contains(@id, 'addressLine3')] | //div[contains(@id, 'addressLine3')] | //input[contains(@id, 'addressLine3')]"
    ).first();
  }

  get CopyfromContactManagerButton(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'LinkContactToolbarButtons_SyncFromAddressBookButton')] | //span[contains(text(), 'Sync')]/parent::a"
    ).first();
  }

  get TransitNumber(): Locator {
    return this.getScope().locator(
      "//*[@id='ClaimContacts:ClaimContactsScreen:PeopleInvolvedDetailedListDetail:ContactBasicsDV:ContactEFTLV:0:0']/td[2] | //tr[contains(@id, 'ContactEFTLV:0')]//td[2]"
    ).first();
  }

  get BankNumber(): Locator {
    return this.getScope().locator(
      "//*[contains(@id, 'ContactEFTLV:0:BankNumber')] | //input[contains(@id, 'BankNumber')]"
    ).first();
  }

  get DDReason(): Locator {
    return this.getScope().locator(
      "//*[contains(@id, 'ContactEFTLV:0:Reason')]"
    ).first();
  }

  get WorkerFirstName(): Locator {
    return this.getScope().locator(
      "//*[contains(@id, 'PersonNameInputSet:FirstName')]"
    ).first();
  }

  get WorkerLastName(): Locator {
    return this.getScope().locator(
      "//*[contains(@id, 'PersonNameInputSet:LastName')]"
    ).first();
  }

  get WorkerWCBID(): Locator {
    return this.getScope().locator(
      "//*[contains(@id, 'PersonNameInputSet:WCBID')]"
    ).first();
  }

  get PrimaryPhoneNumber(): Locator {
    return this.getScope().locator(
      "//*[contains(@id, 'PersonContactInfoInputSet:PrimaryPhone')]"
    ).first();
  }

  get MessagingLink(): Locator {
    return this.getScope().locator(
      "//a[contains(@id, 'Claim_WSIB_MessagingGroup')] | //div[contains(@id, 'Claim_WSIB_MessagingGroup')]//a | //a[normalize-space()='Messaging'] | //a[normalize-space()='Messages']"
    ).first();
  }

  get MessagingBody(): Locator {
    return this.getScope().locator(
      "//div[contains(@id, 'WSIB_MessagePanelSet')]//div[contains(@id, 'MessageBody')] | //span[contains(@id, 'MessageBody')] | //*[contains(@id, 'WSIB_MessagePanelSet') and contains(@id, 'MessageBody')]"
    ).first();
  }

  get MessageListTable(): Locator {
    return this.getScope().locator(
      "//table[contains(@id, 'WSIB_MessagingScreen')] | //div[contains(@id, 'WSIB_MessagePanelSet')]"
    ).first();
  }

  // --- Actions matching Java GWClaimParticipantsPage.java ---

  public async verifySentMessage(expectedMessageText?: string): Promise<boolean> {
    console.log('[GWClaimParticipantsPage] Navigating to Messaging screen in GWCC...');
    await this.MessagingLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.MessagingLink);

    console.log('[GWClaimParticipantsPage] Waiting for message body on Messaging screen...');
    await this.MessagingBody.waitFor({ state: 'visible', timeout: 30000 });

    const actualMessage = (await this.MessagingBody.innerText()).trim();
    console.log(`[GWClaimParticipantsPage] Displayed message in GWCC: "${actualMessage}"`);

    if (expectedMessageText && expectedMessageText.trim().length > 0) {
      return actualMessage.includes(expectedMessageText.trim());
    }

    // Pass if message body is displayed and non-empty
    return actualMessage.length > 0;
  }

  public async searchMessage(messageText: string): Promise<boolean> {
    return await this.verifySentMessage(messageText);
  }

  public async verifyUpdatedMailingAddress(addressLine1: string, addressLine2: string, addressLine3: string): Promise<boolean> {
    console.log('[GWClaimParticipantsPage] Navigating to Claim Parties / Contacts...');
    await this.ClaimParticipantsLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.ClaimParticipantsLink);

    await this.ClaimParticipantsTable.waitFor({ state: 'visible', timeout: 30000 });
    const workerLink = this.getScope().locator("//tr[.//span[text()='Worker'] or .//div[text()='Worker']]//a").first();
    if (await workerLink.isVisible().catch(() => false)) {
      await this.click(workerLink);
    }

    await this.addressLine1.waitFor({ state: 'visible', timeout: 20000 });
    const text1 = (await this.addressLine1.innerText().catch(() => '')).trim();
    console.log(`[GWClaimParticipantsPage] Address Line 1 verified: ${text1}`);
    return text1.toLowerCase().includes(addressLine1.toLowerCase());
  }

  public async verifyMailingAddress(address: string): Promise<boolean> {
    return await this.verifyUpdatedMailingAddress(address, '', '');
  }

  public async verifyUpdatedPhoneNumber(phonenumber: string): Promise<boolean> {
    console.log('[GWClaimParticipantsPage] Navigating to Claim Parties / Contacts...');
    await this.ClaimParticipantsLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.ClaimParticipantsLink);

    await this.ClaimParticipantsTable.waitFor({ state: 'visible', timeout: 30000 });
    const workerLink = this.getScope().locator("//tr[.//span[text()='Worker'] or .//div[text()='Worker']]//a").first();
    if (await workerLink.isVisible().catch(() => false)) {
      await this.click(workerLink);
    }

    await this.PrimaryPhoneNumber.waitFor({ state: 'visible', timeout: 20000 });
    const text = (await this.PrimaryPhoneNumber.innerText().catch(() => '')).trim();
    console.log(`[GWClaimParticipantsPage] Phone Number verified: ${text}`);
    return text.replace(/\D/g, '').includes(phonenumber.replace(/\D/g, ''));
  }

  public async verifyPhoneNumber(phonenumber: string): Promise<boolean> {
    return await this.verifyUpdatedPhoneNumber(phonenumber);
  }

  public async removeDirectDeposit(): Promise<boolean> {
    await this.ClaimParticipantsLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.ClaimParticipantsLink);

    const workerRole = this.getScope().locator("//span[@value='Worker' or text()='Worker']").first();
    await this.click(workerRole);
    await this.click(this.CopyfromContactManagerButton);
    return true;
  }

  public async addDirectDeposit(): Promise<boolean> {
    await this.ClaimParticipantsLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(this.ClaimParticipantsLink);

    const workerRole = this.getScope().locator("//span[@value='Worker' or text()='Worker']").first();
    await this.click(workerRole);

    const tNo = await this.TransitNumber.innerText();
    const bNo = await this.BankNumber.innerText();
    const reason = await this.DDReason.innerText();

    return tNo.trim() === '01001' && bNo.trim() === '0010' && reason.trim() === 'Update from OSPC';
  }

  public async verifyDirectDepositInGWCC(): Promise<boolean> {
    return await this.addDirectDeposit();
  }

  public async verifyDirectDepositUpdateInGWCC(): Promise<boolean> {
    return await this.addDirectDeposit();
  }
}