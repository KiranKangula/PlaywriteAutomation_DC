import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_WorkHistory extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly EmploymentDetailsHeading: Locator;
    private readonly jobTitle: Locator;
    private readonly employmentLengthYear: Locator;
    private readonly employmentLengthMonth: Locator;
    private readonly pwiAddContact: Locator;
    private readonly SupervisorCard: Locator;
    private readonly SupervisorfirstName: Locator;
    private readonly SupervisorlastName: Locator;
    private readonly SupervisorLanguage: Locator;
    private readonly SupervisorphoneNumber: Locator;
    private readonly SupervisorSaveButton: Locator;
    private readonly radiobuttonEmployeeW: Locator;
    private readonly IsSpouseRelavtiveW: Locator;
    private readonly EmployerRelation: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal show"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.EmploymentDetailsHeading = this.page.locator('#pwiEmploymentDetails');
        this.jobTitle = this.page.locator('#jobTitle');
        this.employmentLengthYear = this.page.locator('#employmentLengthYear');
        this.employmentLengthMonth = this.page.locator('#employmentLengthMonth');
        this.pwiAddContact = this.page.locator('#pwiAddContact');
        this.SupervisorCard = this.page.locator('#myCard');
        this.SupervisorfirstName = this.page.locator('#InputfirstName');
        this.SupervisorlastName = this.page.locator('#InputlastName');
        this.SupervisorLanguage = this.page.locator('#InputLanguageofService-wrapper');
        this.SupervisorphoneNumber = this.page.locator('#InputprimaryPhone');
        this.SupervisorSaveButton = this.page.locator('#pwiEmploymentSave');
        this.radiobuttonEmployeeW = this.page.locator('#radiobuttonEmployee');
        this.IsSpouseRelavtiveW = this.page.locator('#IsSpouseRelavtive');
        this.EmployerRelation = this.page.locator('xpath=//*[@id="dropdownEmploymentTypeList-wrapper"]/div/div[1]');
    }

    async selectWorkHistoryDetails(jobTitle: string, empStartDate: string, empYears: string, empMonths: string, supervisorContact: string, employees: string, union: string, isSpouseRelavtive: string, employerRelation: string): Promise<boolean> {
        await this.EmploymentDetailsHeading.waitFor({ state: 'visible' });
        await this.enter(this.jobTitle, jobTitle);
        await this.datePicker('hireDatePicker', empStartDate);
        await this.sleep(2000);
        await this.enter(this.employmentLengthYear, empYears);
        await this.enter(this.employmentLengthMonth, empMonths);

        await this.click(this.pwiAddContact);
        await this.SupervisorCard.waitFor({ state: 'visible' });
        const contactParts = supervisorContact.split('|');
        await this.enter(this.SupervisorfirstName, contactParts[0]);
        await this.enter(this.SupervisorlastName, contactParts[1]);
        await this.selectJutroDropdownOption('InputLanguageofService', contactParts[3]);
        await this.enter(this.SupervisorphoneNumber, contactParts[2]);
        await this.click(this.SupervisorSaveButton);
        await this.click(this.NextButton);
        await this.radiobuttonEmployeeW.waitFor({ state: 'visible' });
        await this.page.locator(`label:has-text("${employees}")`).click();
        await this.page.locator(`label:has-text("${union}")`).click();
        await this.click(this.NextButton);
        await this.IsSpouseRelavtiveW.waitFor({ state: 'visible' });
        await this.page.locator(`label:has-text("${isSpouseRelavtive}")`).click();
        await this.selectJutroDropdownOption('dropdownEmploymentType', employerRelation);
        await this.click(this.NextButton);
        return true;
    }
}
