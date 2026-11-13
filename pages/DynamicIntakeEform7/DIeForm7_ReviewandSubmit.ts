import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_ReviewandSubmit extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly SubmitButton: Locator;
    private readonly ReviewAndSubmitHeading: Locator;
    private readonly reviewDeclaratioInputTitle: Locator;
    private readonly reviewDeclaratioInputPhone: Locator;
    private readonly ConfirmationHeading: Locator;
    private readonly returnToDashboardButton: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal show"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.SubmitButton = this.page.locator('xpath=//*[contains(text(),"Submit")]');
        this.ReviewAndSubmitHeading = this.page.locator('xpath=//h1[contains(text(),"Review and submit")]');
        this.reviewDeclaratioInputTitle = this.page.locator('#reviewDeclaratioInputTitle');
        this.reviewDeclaratioInputPhone = this.page.locator('#reviewDeclaratioInputPhone');
        this.ConfirmationHeading = this.page.locator('xpath=//h1[contains(text(),"Confirmation")]');
        this.returnToDashboardButton = this.page.locator('#returnToDashboardButton');
    }

    async submitEform7Report(): Promise<boolean> {
        await this.ReviewAndSubmitHeading.waitFor({ state: 'visible' });
        await this.enter(this.reviewDeclaratioInputTitle, 'Automation Test');
        await this.enter(this.reviewDeclaratioInputPhone, '6478558585');
        await this.page.locator('label:has-text("By checking this box")').click();
        await this.click(this.SubmitButton);
        await this.ConfirmationHeading.waitFor({ state: 'visible' });
        await this.click(this.returnToDashboardButton);
        return true;
    }
}
