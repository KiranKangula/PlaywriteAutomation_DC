import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7 extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly GOButton: Locator;
    private readonly businessServicesTitle: Locator;
    private readonly reportsGoButton: Locator;
    private readonly submitNewReportGoButton: Locator;
    private readonly accountListSingleSelect: Locator;
    private readonly submitnewreport: Locator;
    private readonly privacyPolicyH3: Locator;
    private readonly AgreeCheckbox: Locator;
    private readonly NextButton: Locator;
    private readonly injuryIllnessCard: Locator;
    private readonly exposureCard: Locator;
    private readonly fatalityCard: Locator;
    private readonly physicalInjuryCard: Locator;
    private readonly illnessCard: Locator;
    private readonly mentalHealthCard: Locator;
    private readonly nihlCard: Locator;
    private readonly seriousInjuryCard: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modalSurveyLink"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.GOButton = this.page.locator('xpath=//*[contains(@aria-label,"Report an injury or illness Go")]');
        this.businessServicesTitle = this.page.locator('#businessServicesTitle');
        this.reportsGoButton = this.page.locator('#reportsGoButton');
        this.submitNewReportGoButton = this.page.locator('#reportInjuryOrIllness');
        this.accountListSingleSelect = this.page.locator('#accountListSingleSelect-wrapper');
        this.submitnewreport = this.page.locator('xpath=//*[@id="submitnewreport"]/span/span');
        this.privacyPolicyH3 = this.page.locator('#privacyPolicyH3');
        this.AgreeCheckbox = this.page.locator('xpath=//*[@id="divConcentContainer"]/div/div/div[1]/span');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.injuryIllnessCard = this.page.locator('#injuryIllnessCard');
        this.exposureCard = this.page.locator('#exposureCard');
        this.fatalityCard = this.page.locator('#fatalityCard');
        this.physicalInjuryCard = this.page.locator('#physicalInjuryCard');
        this.illnessCard = this.page.locator('#illnessCard');
        this.mentalHealthCard = this.page.locator('#mentalHealthCard');
        this.nihlCard = this.page.locator('#nihlCard');
        this.seriousInjuryCard = this.page.locator('#seriousInjuryCard');
    }

    async verifyBusinessHomepage(): Promise<boolean> {
        await this.GOButton.waitFor({ state: 'visible' });
        return await this.GOButton.isVisible();
    }

    async clickOnGOButton(): Promise<boolean> {
        if (await this.ModalPopup.isVisible()) {
            await this.click(this.DistributionPopUpNo);
        }
        await this.click(this.GOButton);
        await this.click(this.submitNewReportGoButton);
        await this.submitnewreport.waitFor({ state: 'visible' });
        return await this.submitnewreport.isVisible();
    }

    async selectAccountAndStartReport(accountNumber: string): Promise<boolean> {
        await this.selectJutroDropdownOption('accountListSingleSelect', accountNumber);
        await this.click(this.submitnewreport);
        await this.privacyPolicyH3.waitFor({ state: 'visible' });
        await this.sleep(2000);
        await this.click(this.AgreeCheckbox);
        await this.click(this.NextButton);
        await this.sleep(2000);
        if (await this.ModalPopup.isVisible()) {
            await this.click(this.DistributionPopUpNo);
        }
        await this.injuryIllnessCard.waitFor({ state: 'visible' });
        return await this.injuryIllnessCard.isVisible();
    }

    async selectReportType(reporttype: string): Promise<boolean> {
        if (reporttype.toLowerCase() === 'injury or illness') {
            await this.click(this.injuryIllnessCard);
        } else if (reporttype.toLowerCase() === 'exposure') {
            await this.click(this.exposureCard);
        } else if (reporttype.toLowerCase() === 'fatality') {
            await this.click(this.fatalityCard);
        }
        await this.click(this.NextButton);
        return true;
    }

    async selectInjuryCategory(injurycategory: string): Promise<boolean> {
        if (injurycategory.toLowerCase() === 'physical injury') {
            await this.click(this.physicalInjuryCard);
        } else if (injurycategory.toLowerCase() === 'illness') {
            await this.click(this.illnessCard);
        } else if (injurycategory.toLowerCase() === 'mental health') {
            await this.click(this.mentalHealthCard);
        } else if (injurycategory.toLowerCase() === 'nihl') {
            await this.click(this.nihlCard);
        } else if (injurycategory.toLowerCase() === 'serious injury') {
            await this.click(this.seriousInjuryCard);
        }
        await this.click(this.NextButton);
        return true;
    }
}
