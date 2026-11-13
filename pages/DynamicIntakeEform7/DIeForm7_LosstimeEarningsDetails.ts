import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_LosstimeEarningsDetails extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly LOEDetailsHeading: Locator;
    private readonly RTWDetailsHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal show"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.LOEDetailsHeading = this.page.locator('xpath=//h1[contains(text(),"Lost time and earnings details")]');
        this.RTWDetailsHeading = this.page.locator('xpath=//h1[contains(text(),"Return-to-work contact details")]');
    }

    async selectLossTimeAndEarningsDetails(loe: string, typeofWork: string, wageLoss: string): Promise<boolean> {
        await this.LOEDetailsHeading.waitFor({ state: 'visible' });

        await this.page.locator(`label:has-text("${loe}")`).click();
        await this.click(this.NextButton);

        await this.RTWDetailsHeading.waitFor({ state: 'visible' });
        await this.page.locator(`label:has-text("${typeofWork}")`).click();
        await this.page.locator(`label:has-text("${wageLoss}")`).click();

        await this.click(this.NextButton);
        return true;
    }
}
