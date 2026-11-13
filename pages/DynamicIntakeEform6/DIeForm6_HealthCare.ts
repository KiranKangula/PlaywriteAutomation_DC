import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm6_HealthCare extends BasePage {
    private readonly nextButton: Locator;
    private readonly healthCareYes: Locator;
    private readonly healthCareNo: Locator;
    private readonly healthCareUnsure: Locator;
    private readonly fromWhere: Locator;
    private readonly healthCareReceivedDate: Locator;
    private readonly employerReportedDate: Locator;
    private readonly addReporterButton: Locator;
    private readonly ReporterFirstName: Locator;
    private readonly ReporterLastName: Locator;
    private readonly ReporterPosition: Locator;
    private readonly ReporterPhoneNumber: Locator;
    private readonly saveButtonReporter: Locator;
    private readonly addProviderContactButton: Locator;
    private readonly ProviderFirstName: Locator;
    private readonly ProviderLastName: Locator;
    private readonly ProviderPhoneNumber: Locator;
    private readonly saveButtonProvider: Locator;
    private readonly addProviderOrgButton: Locator;
    private readonly ProviderOrgName: Locator;
    private readonly ProviderOrgPhoneNumber: Locator;
    private readonly ProviderOrgAddressLine1: Locator;
    private readonly ProviderOrgCity: Locator;
    private readonly ProviderOrgProvinceDropdown: Locator;
    private readonly ProviderOrgPostalCode: Locator;
    private readonly ProviderOrgCountryDropdown: Locator;
    private readonly saveButtonProviderOrg: Locator;
    private readonly whendoyouexpect: Locator;
    private readonly NoDatePlannedYetCheckbox: Locator;

    constructor(page: Page) {
        super(page);
        this.nextButton = this.page.locator('xpath=//*[@id="intakeBodySection"]/div[2]/div[1]/span[2]/a/span');
        this.healthCareYes = this.page.locator('xpath=//*[@id="returnToWorkRadios"]/div[1]/label/span');
        this.healthCareNo = this.page.locator('xpath=//*[@id="returnToWorkRadios"]/div[2]/label/span');
        this.healthCareUnsure = this.page.locator('xpath=//*[@id="returnToWorkRadios"]/div[3]/label/span');
        this.fromWhere = this.page.locator('#sourceOfInfection-wrapper');
        this.healthCareReceivedDate = this.page.locator('#healthcare-received-date-picker');
        this.employerReportedDate = this.page.locator('#employer-reported-date-picker');
        this.addReporterButton = this.page.locator('xpath=//*[@id="AddReporterButton"]/span/span');
        this.ReporterFirstName = this.page.locator('#inputFirstName');
        this.ReporterLastName = this.page.locator('#inputLastName');
        this.ReporterPosition = this.page.locator('#inputPosition');
        this.ReporterPhoneNumber = this.page.locator('#inputPhoneNumeber');
        this.saveButtonReporter = this.page.locator('#btnSave');
        this.addProviderContactButton = this.page.locator('xpath=//*[@id="AddProviderContactButton"]/span/span');
        this.ProviderFirstName = this.page.locator('#orgContactInputFirstName');
        this.ProviderLastName = this.page.locator('#orgContactInputLastName');
        this.ProviderPhoneNumber = this.page.locator('#orgContactInputPhoneNumeber');
        this.saveButtonProvider = this.page.locator('#orgContactBtnSave');
        this.addProviderOrgButton = this.page.locator('xpath=//*[@id="AddProviderOrgButton"]/span/span');
        this.ProviderOrgName = this.page.locator('#orgInputCompanyName');
        this.ProviderOrgPhoneNumber = this.page.locator('#orgInputPhoneNumeber');
        this.ProviderOrgAddressLine1 = this.page.locator('#inputAddressLine1');
        this.ProviderOrgCity = this.page.locator('#inputCity');
        this.ProviderOrgProvinceDropdown = this.page.locator('#dropdownProvince-wrapper');
        this.ProviderOrgPostalCode = this.page.locator('#inputPostalCode');
        this.ProviderOrgCountryDropdown = this.page.locator('#dropdownCountry-wrapper');
        this.saveButtonProviderOrg = this.page.locator('#orgBtnSave');
        this.whendoyouexpect = this.page.locator('#expected-healthcare-date-picker');
        this.NoDatePlannedYetCheckbox = this.page.locator('xpath=//*[@id="divNoPhoneContainer"]/div/div/div[1]/span');
    }

    async enterHealthCareDetails(healthCareReceived: string, whereHealthCareReceived: string, healthCareReceivedDate: string, emplReportedDate: string,
                                  reporter: string, provider: string, providerOrg: string, providerOrgAddress: string, whendoyouexpect: string): Promise<void> {

        if (healthCareReceived.toLowerCase() === 'yes') {
            await this.click(this.healthCareYes);
            await this.selectJutroDropdownOption('sourceOfInfection', whereHealthCareReceived);
            await this.click(this.healthCareReceivedDate);
            await this.enter(this.healthCareReceivedDate, healthCareReceivedDate);
            await this.click(this.employerReportedDate);
            await this.enter(this.employerReportedDate, emplReportedDate);
            await this.click(this.addReporterButton);
            const reporterParts = reporter.split('|');
            await this.enter(this.ReporterFirstName, reporterParts[0]);
            await this.enter(this.ReporterLastName, reporterParts[1]);
            await this.enter(this.ReporterPosition, reporterParts[2]);
            await this.enter(this.ReporterPhoneNumber, reporterParts[3]);
            await this.click(this.saveButtonReporter);
            await this.sleep(3000);
            if (provider !== '') {
                await this.click(this.addProviderContactButton);
                const providerParts = provider.split('|');
                await this.enter(this.ProviderFirstName, providerParts[0]);
                await this.enter(this.ProviderLastName, providerParts[1]);
                await this.enter(this.ProviderPhoneNumber, providerParts[2]);
                await this.click(this.saveButtonProvider);
            } else if (providerOrg !== '') {
                await this.click(this.addProviderOrgButton);
                const providerOrgParts = providerOrg.split('|');
                await this.enter(this.ProviderOrgName, providerOrgParts[0]);
                await this.enter(this.ProviderOrgPhoneNumber, providerOrgParts[1]);
                const addrParts = providerOrgAddress.split('|');
                await this.enter(this.ProviderOrgAddressLine1, addrParts[0]);
                await this.enter(this.ProviderOrgCity, addrParts[1]);
                await this.selectJutroDropdownOption('dropdownProvince', addrParts[2]);
                await this.enter(this.ProviderOrgPostalCode, addrParts[3]);
                await this.selectJutroDropdownOption('dropdownCountry', addrParts[4]);
                await this.click(this.saveButtonProviderOrg);
            }
        } else if (healthCareReceived.toLowerCase() === 'no') {
            await this.click(this.healthCareNo);
        } else {
            await this.click(this.healthCareUnsure);
            if (whendoyouexpect === '') {
                await this.click(this.NoDatePlannedYetCheckbox);
            } else {
                await this.click(this.whendoyouexpect);
                await this.enter(this.whendoyouexpect, whendoyouexpect);
            }
        }
        await this.sleep(3000);
        await this.click(this.nextButton);
    }
}
