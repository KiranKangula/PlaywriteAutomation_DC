import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm6_WorkHistory extends BasePage {
    private readonly jobTitle: Locator;
    private readonly startDate: Locator;
    private readonly employmentDurationYears: Locator;
    private readonly employmentDurationMonths: Locator;
    private readonly addContactButton: Locator;
    private readonly SupervisorFirstName: Locator;
    private readonly SupervisorLastName: Locator;
    private readonly SupervisorPhoneNumber: Locator;
    private readonly saveButton: Locator;
    private readonly companySizeYes: Locator;
    private readonly companySizeNo: Locator;
    private readonly thirdPartyUnionYes: Locator;
    private readonly thirdPartyUnionNo: Locator;
    private readonly nameOfTheUnion: Locator;
    private readonly nextButton: Locator;
    private readonly relativeYes: Locator;
    private readonly relativeNo: Locator;
    private readonly EmploymentType: Locator;
    private readonly businessNature: Locator;
    private readonly safetyCommitteeYes: Locator;
    private readonly safetyCommitteeNo: Locator;
    private readonly safetyRepresentativeYes: Locator;
    private readonly safetyRepresentativeNo: Locator;
    private readonly attachReportButton: Locator;
    private readonly exposureStartDate: Locator;

    constructor(page: Page) {
        super(page);
        this.jobTitle = this.page.locator('#inputJobTitle');
        this.startDate = this.page.locator('#start-date-picker');
        this.employmentDurationYears = this.page.locator('#inputEmploymentDurationYears');
        this.employmentDurationMonths = this.page.locator('#inputMonths');
        this.addContactButton = this.page.locator('xpath=//*[@id="AddContactButton"]/span/span');
        this.SupervisorFirstName = this.page.locator('#inputFirstName');
        this.SupervisorLastName = this.page.locator('#inputLastName');
        this.SupervisorPhoneNumber = this.page.locator('#inputPhoneNumeber');
        this.saveButton = this.page.locator('#btnSave');
        this.companySizeYes = this.page.locator('xpath=//*[@id="radiobuttonCompanySize"]/div[1]/label');
        this.companySizeNo = this.page.locator('xpath=//*[@id="radiobuttonCompanySize"]/div[2]/label');
        this.thirdPartyUnionYes = this.page.locator('xpath=//*[@id="radiobuttonThirdPartyUnion"]/div[1]/label');
        this.thirdPartyUnionNo = this.page.locator('xpath=//*[@id="radiobuttonThirdPartyUnion"]/div[2]/label');
        this.nameOfTheUnion = this.page.locator('#inputNameOfTheUnion');
        this.nextButton = this.page.locator('xpath=//*[@id="intakeBodySection"]/div[2]/div[1]/span[2]/a/span');
        this.relativeYes = this.page.locator('xpath=//*[@id="radiobuttonRelative"]/div[1]/label');
        this.relativeNo = this.page.locator('xpath=//*[@id="radiobuttonRelative"]/div[2]/label');
        this.EmploymentType = this.page.locator('xpath=//*[@id="dropdownEmploymentType"]');
        this.businessNature = this.page.locator('#businessNature');
        this.safetyCommitteeYes = this.page.locator('xpath=//*[@id="radiobuttonCommitte"]/div[1]/label');
        this.safetyCommitteeNo = this.page.locator('xpath=//*[@id="radiobuttonCommitte"]/div[2]/label');
        this.safetyRepresentativeYes = this.page.locator('xpath=//*[@id="radiobuttonRepresentative"]/div[1]/label');
        this.safetyRepresentativeNo = this.page.locator('xpath=//*[@id="radiobuttonRepresentative"]/div[2]/label');
        this.attachReportButton = this.page.locator('xpath=//*[@id="attachReportButton"]/span/span');
        this.exposureStartDate = this.page.locator('#exposure-start-date-picker');
    }

    async enterJobDetails(jobTitle: string, startDate: string, empDurationYears: string,
                            empDurationMonths: string, supervisorFirstName: string, supervisorLastName: string, supervisorPhoneNumber: string,
                            companySize: string, thirdPartyUnion: string, nameOfTheUnion: string): Promise<boolean> {

        await this.jobTitle.waitFor({ state: 'visible' });
        await this.enter(this.jobTitle, jobTitle);
        await this.click(this.startDate);
        await this.enter(this.startDate, startDate);
        await this.enter(this.employmentDurationYears, empDurationYears);
        await this.enter(this.employmentDurationMonths, empDurationMonths);
        await this.click(this.addContactButton);
        await this.enter(this.SupervisorFirstName, supervisorFirstName);
        await this.enter(this.SupervisorLastName, supervisorLastName);
        await this.enter(this.SupervisorPhoneNumber, supervisorPhoneNumber);
        await this.click(this.saveButton);
        if (companySize.toLowerCase() === 'yes') {
            await this.click(this.companySizeYes);
        } else {
            await this.click(this.companySizeNo);
        }
        if (thirdPartyUnion.toLowerCase() === 'yes') {
            await this.click(this.thirdPartyUnionYes);
            await this.nameOfTheUnion.waitFor({ state: 'visible' });
            await this.enter(this.nameOfTheUnion, nameOfTheUnion);
        } else {
            await this.click(this.thirdPartyUnionNo);
        }
        await this.click(this.nextButton);
        await this.relativeYes.waitFor({ state: 'visible' });
        return await this.relativeYes.isVisible();
    }

    async enterJobDetailsSimple(jobTitle: string, startDate: string, WhatTypeofWork: string, companySize: string): Promise<void> {
        await this.jobTitle.waitFor({ state: 'visible' });
        await this.enter(this.jobTitle, jobTitle);
        await this.enter(this.exposureStartDate, startDate);
        await this.enter(this.businessNature, WhatTypeofWork);

        if (companySize.toLowerCase() === 'yes') {
            await this.click(this.companySizeYes);
        } else {
            await this.click(this.companySizeNo);
        }

        await this.click(this.nextButton);
    }

    async enterWorkDetails(relative: string, typesofEmployment: string): Promise<void> {
        if (relative.toLowerCase() === 'yes') {
            await this.click(this.relativeYes);
        } else {
            await this.click(this.relativeNo);
        }
        await this.selectJutroDropdownOption('dropdownEmploymentType', typesofEmployment);
        await this.click(this.nextButton);
    }

    async enterJointHealthAndSafetyCommittee(safetyCommittee: string, safetyRepresentative: string, nameOfTheUnion: string): Promise<void> {
        await this.safetyCommitteeYes.waitFor({ state: 'visible' });
        if (safetyCommittee.toLowerCase() === 'yes') {
            await this.click(this.safetyCommitteeYes);
        } else {
            await this.click(this.safetyCommitteeNo);
        }

        if (safetyRepresentative.toLowerCase() === 'yes') {
            await this.click(this.safetyRepresentativeYes);
        } else {
            await this.click(this.safetyRepresentativeNo);
        }

        await this.enter(this.nameOfTheUnion, nameOfTheUnion);
        await this.click(this.nextButton);
    }
}
