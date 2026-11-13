import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_ReporterDetails extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly claimReportedByType: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal show"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.claimReportedByType = this.page.locator('#claimReportedByType');
    }

    async selectReportedByDetails(reportedby: string): Promise<boolean> {
        await this.claimReportedByType.waitFor({ state: 'visible' });
        await this.page.locator(`label:has-text("${reportedby}")`).click();
        await this.click(this.NextButton);
        return true;
    }
}
