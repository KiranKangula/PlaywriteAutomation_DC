import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm6_ReviewandSubmit extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly nextButton: Locator;
    private readonly DeclarationCheckbox: Locator;
    private readonly AddClaimtoProfile: Locator;
    private readonly AddClaimtoProfileNo: Locator;
    private readonly submitReportButton: Locator;
    private readonly confirmationMessage: Locator;
    private readonly returnToDashboardButton: Locator;
    private readonly ClaimSummaryPage: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal-survey"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.nextButton = this.page.locator('xpath=//*[@id="intakeBodySection"]/div[2]/div[1]/span[2]/a/span');
        this.DeclarationCheckbox = this.page.locator('xpath=//*[@id="CheckboxContainer"]/div/div/div[1]/div');
        this.AddClaimtoProfile = this.page.locator('xpath=//*[@id="radioTimeLost"]/div[1]/label');
        this.AddClaimtoProfileNo = this.page.locator('xpath=//*[@id="radioTimeLost"]/div[2]/label');
        this.submitReportButton = this.page.locator('xpath=//*[@id="intakeBodySection"]/div[2]/div[1]/span[2]/a/span');
        this.confirmationMessage = this.page.locator('xpath=//*[@id="acnHeadingH1"]');
        this.returnToDashboardButton = this.page.locator('xpath=//*[@id="returnToDashboardButton"]/span');
        this.ClaimSummaryPage = this.page.locator('xpath=//*[@id="claimSummaryBodySection"]');
    }

    async verifyReviewAndSubmitReport(): Promise<boolean> {
        await this.DeclarationCheckbox.waitFor({ state: 'visible' });
        await this.click(this.DeclarationCheckbox);
        await this.click(this.nextButton);
        await this.AddClaimtoProfile.waitFor({ state: 'visible' });
        return await this.AddClaimtoProfile.isVisible();
    }

    async verifyReturnToDashBoard(): Promise<boolean> {
        if (await this.ModalPopup.isVisible()) {
            await this.click(this.DistributionPopUpNo);
        }
        if (await this.returnToDashboardButton.isVisible()) {
            await this.returnToDashboardButton.waitFor({ state: 'visible' });
            await this.click(this.returnToDashboardButton);
            await this.ClaimSummaryPage.waitFor({ state: 'visible' });
            return await this.ClaimSummaryPage.isVisible();
        } else {
            console.log('Return to Dashboard button is not displayed');
            return false;
        }
    }

    async verifyReviewAndSubmitExposure(): Promise<boolean> {
        await this.DeclarationCheckbox.waitFor({ state: 'visible' });
        await this.click(this.DeclarationCheckbox);
        await this.click(this.submitReportButton);
        await this.confirmationMessage.waitFor({ state: 'visible' });
        return await this.confirmationMessage.isVisible();
    }

    async selectAddClaimtoProfile(addClaimtoProfile: string): Promise<boolean> {
        if (addClaimtoProfile.toLowerCase() === 'yes') {
            await this.click(this.AddClaimtoProfile);
        } else {
            await this.click(this.AddClaimtoProfileNo);
        }
        await this.click(this.submitReportButton);
        await this.sleep(5000);
        await this.confirmationMessage.waitFor({ state: 'visible' });
        return await this.confirmationMessage.isVisible();
    }
}
