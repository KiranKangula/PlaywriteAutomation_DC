import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_HealthCareDetails extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly HealthcareDetailsHeading: Locator;
    private readonly injuryLocation: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal show"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.HealthcareDetailsHeading = this.page.locator('#identifyHealthcareRecieved');
        this.injuryLocation = this.page.locator('#injuryLocation-wrapper');
    }

    async selectHealthCareDetails(healthCare: string): Promise<boolean> {
        await this.HealthcareDetailsHeading.waitFor({ state: 'visible' });

        const parts = healthCare.split('|');
        await this.page.locator(`label:has-text("${parts[0]}")`).click();
        await this.selectJutroDropdownOption('injuryLocation', parts[1]);
        await this.datePicker('dropdownDobContainer', parts[2]);
        await this.datePicker('healthCareReceivedDatePicker', parts[3]);

        await this.click(this.NextButton);
        return true;
    }
}
