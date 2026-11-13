import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class HomePage extends BasePage {
    private readonly homepageHeader: Locator;
    private readonly goButton: Locator;
    private readonly reportsGoButton: Locator;
    private readonly startNewReport: Locator;

    constructor(page: Page) {
        super(page);
        this.homepageHeader = page.locator("//*[@id='claimTitleContainer']");
        this.goButton = page.locator("//*[contains(@aria-label,'Report an injury or illness Go')]");
        this.reportsGoButton = page.locator("#reportsGoButton");
        this.startNewReport = page.locator("//*[@id=\"submitnewreport\"]/span/span");
    }

    async verifyOnHomePage(): Promise<boolean> {
        await this.homepageHeader.waitFor({ state: 'visible' });
        return await this.homepageHeader.isVisible();
    }

    async clickClaim(claimNumber: string) {
        const claimElement = this.page.locator(`//*[contains(text(),'${claimNumber}')]`);
        await claimElement.waitFor({ state: 'visible', timeout: 20000 });
        await this.click(claimElement);
    }

    async verifyOSBCOnHomePage(): Promise<boolean> {
        await this.goButton.waitFor({ state: 'visible' });
        return await this.goButton.isVisible();
    }

    async verifyOSBCUnifiedLandingPage(): Promise<boolean> {
        await this.goButton.waitFor({ state: 'visible' });
        return await this.goButton.isVisible();
    }
}
