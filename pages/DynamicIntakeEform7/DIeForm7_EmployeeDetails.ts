import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_EmployeeDetails extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly employeeDetailsHeading: Locator;
    private readonly pwiAdditionalInfo: Locator;
    private readonly pwiEmployeeFName: Locator;
    private readonly pwiEmployeeLName: Locator;
    private readonly primaryPhone: Locator;
    private readonly AdditionalInfoHeading: Locator;
    private readonly dropdownPronounList: Locator;
    private readonly inputSin: Locator;
    private readonly pwiAddressLine1: Locator;
    private readonly pwiAddressCity: Locator;
    private readonly dropdownProvince: Locator;
    private readonly inputPostalCode: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal show"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.employeeDetailsHeading = this.page.locator('#relatedClaimNumber');
        this.pwiAdditionalInfo = this.page.locator('#pwiAdditionalInfo');
        this.pwiEmployeeFName = this.page.locator('#pwiEmployeeFName');
        this.pwiEmployeeLName = this.page.locator('#pwiEmployeeLName');
        this.primaryPhone = this.page.locator('#primaryPhone');
        this.AdditionalInfoHeading = this.page.locator('xpath=//h1[contains(text(),"Employee details – Additional information")]');
        this.dropdownPronounList = this.page.locator('#dropdownPronounList-wrapper');
        this.inputSin = this.page.locator('#inputSin');
        this.pwiAddressLine1 = this.page.locator('#pwiAddressLine1');
        this.pwiAddressCity = this.page.locator('#pwiAddressCity');
        this.dropdownProvince = this.page.locator('#dropdownProvince-wrapper');
        this.inputPostalCode = this.page.locator('#inputPostalCode');
    }

    async selectEmployeeDetails(employeeFirstName: string, employeeLastName: string, phoneNumber: string, sex: string, pronouns: string,
                                dateOfBirth: string, language: string, sin: string, address: string): Promise<boolean> {

        await this.employeeDetailsHeading.waitFor({ state: 'visible' });
        await this.click(this.NextButton);
        await this.enter(this.pwiEmployeeFName, employeeFirstName);
        await this.enter(this.pwiEmployeeLName, employeeLastName);
        await this.enter(this.primaryPhone, phoneNumber);
        await this.click(this.NextButton);
        await this.AdditionalInfoHeading.waitFor({ state: 'visible' });

        // Radio buttons for sex and language. Assuming 'sex' and 'language' passed as text.
        await this.page.locator(`label:has-text("${sex}")`).click();
        await this.selectJutroDropdownOption('dropdownPronounList', pronouns);
        await this.datePicker('dobDatePicker', dateOfBirth);
        await this.page.locator(`label:has-text("${language}")`).click();

        if (sin === '') {
            await this.page.locator('label:has-text("I don")').click();
        } else {
            await this.enter(this.inputSin, sin);
        }
        await this.click(this.NextButton);
        await this.pwiAddressLine1.waitFor({ state: 'visible' });
        const addrParts = address.split('|');
        await this.enter(this.pwiAddressLine1, addrParts[0]);
        await this.enter(this.pwiAddressCity, addrParts[1]);
        await this.selectJutroDropdownOption('dropdownProvince', addrParts[2]);
        await this.enter(this.inputPostalCode, addrParts[3]);
        await this.click(this.NextButton);
        return true;
    }
}
