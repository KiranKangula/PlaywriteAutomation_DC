import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWCC_History extends BasePage {
    private readonly ClaimHistoryGroup: Locator;
    private readonly HistoryFilter: Locator;
    private readonly historyTable: Locator;

    constructor(page: Page) {
        super(page);
        this.ClaimHistoryGroup = this.page.locator('#Claim\\:MenuLinks\\:Claim_ClaimHistoryGroup');
        this.HistoryFilter = this.page.locator('#ClaimHistory\\:ClaimHistoryScreen\\:HistoryLV\\:HistoryFilter');
        this.historyTable = this.page.locator('#ClaimHistory\\:ClaimHistoryScreen\\:HistoryLV');
    }

    async verifyHistoryEventForMailingAddressUpdate(address: string, onlineuser: string): Promise<boolean> {
        try {
            await this.ClaimHistoryGroup.waitFor({ state: 'visible' });
            await this.click(this.ClaimHistoryGroup);
            await this.historyTable.waitFor({ state: 'visible' });
            await this.selectJutroDropdownOption('ClaimHistory:ClaimHistoryScreen:HistoryLV:HistoryFilter', 'Custom');

            await this.sleep(2000);

            const rows = this.historyTable.locator('tr');
            const rowCount = await rows.count();
            for (let i = 0; i < rowCount; i++) {
                const rowText = await rows.nth(i).innerText();
                if (rowText.includes(address) && rowText.toLowerCase().includes(onlineuser.toLowerCase()) && rowText.includes('Mailing Address Updated')) {
                    console.log(`SUCCESS: Mailing Address update event found in History: ${rowText}`);
                    return true;
                }
            }

            console.log(`FAILED: Mailing Address update event NOT found in History for: ${address}`);
            return false;
        } catch (e) {
            console.log(`ERROR searching history: ${e}`);
            return false;
        }
    }

    async verifyHistoryEventForPhoneNumberUpdate(phonenumber: string, onlineuser: string): Promise<boolean> {
        try {
            await this.ClaimHistoryGroup.waitFor({ state: 'visible' });
            await this.click(this.ClaimHistoryGroup);
            await this.historyTable.waitFor({ state: 'visible' });

            const rows = this.historyTable.locator('tr');
            const rowCount = await rows.count();
            for (let i = 0; i < rowCount; i++) {
                const rowText = await rows.nth(i).innerText();
                if (rowText.includes(phonenumber) && rowText.toLowerCase().includes(onlineuser.toLowerCase())) {
                    console.log(`SUCCESS: Phone Number update event found in History: ${rowText}`);
                    return true;
                }
            }

            console.log(`FAILED: Phone Number update event NOT found in History for: ${phonenumber}`);
            return false;
        } catch (e) {
            console.log(`ERROR searching history: ${e}`);
            return false;
        }
    }
}
