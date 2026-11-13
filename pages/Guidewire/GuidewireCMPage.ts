import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GuidewireCMPage extends BasePage {
    private readonly usernameTextField: Locator;
    private readonly passwordTextField: Locator;
    private readonly loginButton: Locator;
    private readonly FirstName: Locator;
    private readonly LastName: Locator;
    private readonly WCBID: Locator;
    private readonly SearchButton: Locator;
    private readonly searchResultsTable: Locator;
    private readonly AddressesCardTab: Locator;
    private readonly addressesTable: Locator;
    private readonly HistoryCardTab: Locator;
    private readonly DateHeader_toggleSort: Locator;
    private readonly historyTable: Locator;
    private readonly trackedChangesTable: Locator;
    private readonly popupOkButton: Locator;
    private readonly HistoryEventTypeFilter: Locator;
    private readonly BankRoutingNumber: Locator;
    private readonly BankNumber: Locator;
    private readonly Reason: Locator;
    private readonly EditButton: Locator;
    private readonly Checkbox_All: Locator;
    private readonly RemoveButton: Locator;
    private readonly UpdateButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameTextField = page.locator('#Login-LoginScreen-LoginDV-username');
        this.passwordTextField = page.locator('#Login-LoginScreen-LoginDV-password');
        this.loginButton = page.locator('#Login-LoginScreen-LoginDV-submit');
        this.FirstName = page.locator('#ABContactSearch-ABContactSearchScreen-ContactSearchDV-GlobalPersonNameInputSet-FirstName');
        this.LastName = page.locator('#ABContactSearch-ABContactSearchScreen-ContactSearchDV-GlobalPersonNameInputSet-LastName');
        this.WCBID = page.locator('#ABContactSearch-ABContactSearchScreen-ContactSearchDV-WSIB_ContactSearchUUIDInputSet-WSBId');
        this.SearchButton = page.locator('#ABContactSearch-ABContactSearchScreen-ContactSearchDV-SearchAndResetInputSet-SearchLinksInputSet-Search');
        this.searchResultsTable = page.locator('#ABContactSearch-ABContactSearchScreen-WSIB_ContactSearchResultsLV');
        this.AddressesCardTab = page.locator('#ContactDetail-ABContactDetailScreen-AddressesCardTab');
        this.addressesTable = page.locator('#ContactDetail-ABContactDetailScreen-ABAddressesLV');
        this.HistoryCardTab = page.locator('#ContactDetail-ABContactDetailScreen-HistoryCardTab');
        this.DateHeader_toggleSort = page.locator('#ContactDetail-ABContactDetailScreen-ContactHistoryLV-DateHeader_toggleSort');
        this.historyTable = page.locator('#ContactDetail-ABContactDetailScreen-ContactHistoryLV');
        this.trackedChangesTable = page.locator("//*[contains(@id, 'HistoryTrackedChangesLV')]");
        this.popupOkButton = page.locator("//div[contains(@id, 'ContactHistoryDetailPopup')]//div[@role='link']");
        this.HistoryEventTypeFilter = page.locator('name=ContactDetail-ABContactDetailScreen-ContactHistoryLV-HistoryEventTypeFilter');
        this.BankRoutingNumber = page.locator("xpath=//*[@id=\"ContactDetail-ABContactDetailScreen-ContactEFTLV-0-BankRoutingNumber\"]/div/div");
        this.BankNumber = page.locator("xpath=//*[@id=\"ContactDetail-ABContactDetailScreen-ContactEFTLV-0-BankNumber\"]/div/div");
        this.Reason = page.locator("xpath=//*[@id=\"ContactDetail-ABContactDetailScreen-ContactEFTLV-0-Reason\"]/div/div");
        this.EditButton = page.locator('#ContactDetail-ABContactDetailScreen-ContactBasicsDV_tb-Edit');
        this.Checkbox_All = page.locator('#ContactDetail-ABContactDetailScreen-ContactEFTLV-_Checkbox_checkboxDiv');
        this.RemoveButton = page.locator('#ContactDetail-ABContactDetailScreen-ContactEFTLV_tb-Remove');
        this.UpdateButton = page.locator('#ContactDetail-ABContactDetailScreen-ContactBasicsDV_tb-ToolbarButtonUpdate');
    }

    async switchtabCM(cmUrl: string): Promise<Page> {
       const context = this.page.context();
  // 1. Explicitly open a new tab in the same browser context
  const newPage = await context.newPage();
  // 2. CRITICAL: Point this page object's internal page (and BasePage's page) to the new tab
  this.page = newPage;
  // 3. Navigate to Guidewire Contact Manager
  console.log(`Navigating to Guidewire CM at: ${cmUrl}`);
  await this.page.goto(cmUrl, { waitUntil: 'domcontentloaded' });
  await this.page.bringToFront();
  return newPage;
    }

    async loginToGWCM(username: string, password: string): Promise<void> {
        await this.isElementVisible(this.usernameTextField);
        await this.enter(this.usernameTextField, username);
        await this.enter(this.passwordTextField, password);
        await this.click(this.loginButton);
          await this.page.waitForLoadState('domcontentloaded');
    }

    async searchContactInGWCM(firstname: string, lastname: string, wcbid: string): Promise<void> {
        await this.FirstName.waitFor({ state: 'visible' });
        await this.enter(this.FirstName, firstname);
        await this.enter(this.LastName, lastname);
        await this.enter(this.WCBID, wcbid);
        await this.click(this.SearchButton);

        const selectLink = this.page.locator(`//div[@id='ABContactSearch-ABContactSearchScreen-WSIB_ContactSearchResultsLV']//div[@role='button' and text()='${wcbid}']`);
        await selectLink.waitFor({ state: 'visible' });
        await this.click(selectLink);
    }

    async verifyMailingAddressUpdateInGWCM(address: string, city: string, postalCode: string): Promise<boolean> {
        let addressFound = false;
        await this.click(this.AddressesCardTab);
        await this.addressesTable.waitFor({ state: 'visible' });

        const addressParts = address.split('-');
        const formattedAddress = addressParts.length > 1 ? `${addressParts[1]} UNIT ${addressParts[0]}` : address;

        const addrRows = await this.addressesTable.locator('tr.gw-standard-row').all();
        for (const row of addrRows) {
            const rowText = await row.innerText();
            if (rowText.toLowerCase().includes(formattedAddress.toLowerCase())) {
                if (rowText.toLowerCase().includes(city.toLowerCase()) && rowText.includes(postalCode)) {
                    console.log('SUCCESS: Mailing address verified in Addresses tab.');
                    addressFound = true;
                    break;
                }
            }
        }

        if (!addressFound) {
            console.log(`WARNING: Mailing address not explicitly found in Addresses tab list. Expected: ${formattedAddress}`);
        }

        await this.click(this.HistoryCardTab);
        await this.sleep(2000);
        await this.historyTable.waitFor({ state: 'visible' });

        // Selecting from dropdown - using the custom BasePage method
        await this.selectJutroDropdownOption('ContactDetail-ABContactDetailScreen-ContactHistoryLV-HistoryEventTypeFilter', 'Primary Address Updated');
        await this.DateHeader_toggleSort.click();
        await this.sleep(2000);

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const histRows = await this.historyTable.locator('tr.gw-standard-row').all();
                for (const row of histRows) {
                    const text = await row.innerText();
                    if (text.includes('Primary Address Updated')) {
                        const changesBtn = row.locator(".//div[contains(@id, 'ChangesLink_button')]");
                        await this.click(changesBtn);
                        await this.sleep(2000);

                        const changesText = await this.trackedChangesTable.innerText();
                        if (changesText.includes(address)) {
                            console.log('SUCCESS: Address update verified in History details.');
                            await this.click(this.popupOkButton);
                            return true;
                        }
                        await this.click(this.popupOkButton);
                        await this.sleep(1000);
                    }
                }
                break;
            } catch (e) {
                console.log(`Stale element in history table, retrying... Attempt: ${attempt + 1}`);
                await this.historyTable.waitFor({ state: 'visible' });
            }
        }

        console.log('FAILED: Address update not found in History.');
        return false;
    }

    async verifyPhoneNumberUpdateInGWCM(phonenumber: string): Promise<boolean> {
        await this.click(this.HistoryCardTab);
        await this.historyTable.waitFor({ state: 'visible' });
        await this.selectJutroDropdownOption('ContactDetail-ABContactDetailScreen-ContactHistoryLV-HistoryEventTypeFilter', 'Phone Number Updated');
        await this.DateHeader_toggleSort.click();
        await this.sleep(2000);

        const expectedPhone = phonenumber.replace(/-/g, '');

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const rows = await this.historyTable.locator('tr.gw-standard-row').all();
                for (const row of rows) {
                    const text = await row.innerText();
                    if (text.includes('Phone Number Updated')) {
                        const changesBtn = row.locator(".//div[contains(@id, 'ChangesLink_button')]");
                        await this.click(changesBtn);
                        await this.sleep(2000);

                        if ((await this.trackedChangesTable.innerText()).includes(expectedPhone)) {
                            console.log('SUCCESS: Phone Number update verified in History.');
                            await this.click(this.popupOkButton);
                            return true;
                        }
                        await this.click(this.popupOkButton);
                        await this.sleep(1000);
                    }
                }
                break;
            } catch (e) {
                console.log(`Stale element in history table, retrying... Attempt: ${attempt + 1}`);
                await this.historyTable.waitFor({ state: 'visible' });
            }
        }

        console.log('FAILED: Phone Number update not found in History.');
        return false;
    }

    async verifyDDUpdateInGWCM(transitNumber: string, institutionNumber: string, accountNumber: string): Promise<boolean> {
        const routingText = await this.BankRoutingNumber.innerText();
        const bankText = await this.BankNumber.innerText();
        const reasonText = await this.Reason.innerText();

        if (routingText === transitNumber && bankText === '0' + institutionNumber && reasonText === 'Update from OSPC') {
            console.log('PASSED: Direct Deposit is updated in Contact Manager.');
            return true;
        } else {
            console.log('FAILED: Direct Deposit is NOT updated in Contact Manager.');
            return false;
        }
    }

    async VerifyDDRemoveInGWCM(transitNumber: string, institutionNumber: string, accountNumber: string): Promise<boolean> {
        const routingText = await this.BankRoutingNumber.innerText();
        const bankText = await this.BankNumber.innerText();
        const reasonText = await this.Reason.innerText();

        if (routingText === transitNumber && bankText === '0' + institutionNumber && reasonText === 'Update from OSPC') {
            await this.click(this.EditButton);
            await this.click(this.Checkbox_All);
            await this.click(this.RemoveButton);
            await this.click(this.UpdateButton);
        }

        if (await this.BankRoutingNumber.isVisible()) {
            console.log('FAILED: Direct Deposit is NOT removed in Contact Manager.');
            return false;
        } else {
            console.log('PASSED: Direct Deposit is removed successfully in Contact Manager.');
            return true;
        }
    }
}
