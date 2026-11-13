import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_ReportType extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly natureOfPhysicalInjury: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modalSurveyLink"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.natureOfPhysicalInjury = this.page.locator('#natureOfPhysicalInjury');
    }

    async selectPhysicalInjuryDetails(physicalInjury: string, accidentType: string, describedBy: string): Promise<boolean> {
        await this.natureOfPhysicalInjury.waitFor({ state: 'visible' });
        if (await this.ModalPopup.isVisible()) {
            await this.click(this.DistributionPopUpNo);
        }
        await this.sleep(3000);
        await this.page.locator(`label:has-text("${physicalInjury}")`).click();
        await this.page.locator(`label:has-text("${accidentType}")`).click();
        await this.page.locator(`label:has-text("${describedBy}")`).click();
        await this.click(this.NextButton);
        return true;
    }
}
