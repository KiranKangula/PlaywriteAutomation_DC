import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm6 extends BasePage {
    private readonly submitnewreport: Locator;
    private readonly AgreeCheckbox: Locator;
    private readonly NextButton: Locator;
    private readonly InjuryorIllnessRadio: Locator;
    private readonly ExposureIncidentRadio: Locator;
    private readonly PhysicalInjuryRadio: Locator;
    private readonly IllnessRadio: Locator;
    private readonly MentalHealthRadio: Locator;
    private readonly NoiseInducedHearingLossRadio: Locator;
    private readonly ConstructionIncidentRadio: Locator;
    private readonly OtherIncidentRadio: Locator;
    private readonly InjuryTypeOccuranceYes: Locator;
    private readonly InjuryTypeOccuranceNo: Locator;
    private readonly ExistingClaimNumber: Locator;
    private readonly FirstName: Locator;
    private readonly LastName: Locator;
    private readonly PronounsDropdown: Locator;
    private readonly PhoneNumber: Locator;
    private readonly GenderMale: Locator;
    private readonly GenderFemale: Locator;
    private readonly DateOfBirthDate: Locator;
    private readonly LanguageDropdown: Locator;
    private readonly SocialInsuranceNumber: Locator;
    private readonly NoSINCheckbox: Locator;
    private readonly AddressLine1: Locator;
    private readonly City: Locator;
    private readonly ProvinceDropdown: Locator;
    private readonly PostalCode: Locator;
    private readonly CountryDropdown: Locator;
    private readonly EmployerName: Locator;
    private readonly EmployerPhoneNumber: Locator;
    private readonly EmployerAddressLine1: Locator;
    private readonly EmployerCity: Locator;
    private readonly EmployerProvinceDropdown: Locator;
    private readonly EmployerPostalCode: Locator;
    private readonly EmployerCountryDropdown: Locator;
    private readonly ReferenceNumber: Locator;
    private readonly ContinueButton: Locator;
    private readonly NIHLPageHeader: Locator;
    private readonly SubmissionReqNo: Locator;
    private readonly SubmissionReqYes: Locator;

    constructor(page: Page) {
        super(page);
        this.submitnewreport = this.page.locator('#submitnewreport');
        this.AgreeCheckbox = this.page.locator('xpath=//*[@id="divConcentContainer"]/div/div/div[1]/span');
        this.NextButton = this.page.locator('xpath=//*[@id="intakeBodySection"]/div[2]/div[1]/span[2]/a/span');
        this.InjuryorIllnessRadio = this.page.locator('xpath=//*[@id="radiobuttoncard"]/div[1]/div/div[4]');
        this.ExposureIncidentRadio = this.page.locator('xpath=//*[@id="radiobuttoncard"]/div[2]/div/div[4]');
        this.PhysicalInjuryRadio = this.page.locator('xpath=//*[@id="radiobuttoncard"]/div[1]/div/div[4]');
        this.IllnessRadio = this.page.locator('xpath=//*[@id="radiobuttoncard"]/div[2]/div/div[4]');
        this.MentalHealthRadio = this.page.locator('xpath=//*[@id="radiobuttoncard"]/div[3]/div/div[4]');
        this.NoiseInducedHearingLossRadio = this.page.locator('xpath=//*[@id="radiobuttoncard"]/div[4]/div/div[4]');
        this.ConstructionIncidentRadio = this.page.locator('xpath=//*[@id="radiobuttoncard"]/div[1]/div/div[4]');
        this.OtherIncidentRadio = this.page.locator('xpath=//*[@id="radiobuttoncard"]/div[2]/div/div[4]');
        this.InjuryTypeOccuranceYes = this.page.locator('xpath=//*[@id="radiobuttonOccurance"]/div[1]/label');
        this.InjuryTypeOccuranceNo = this.page.locator('xpath=//*[@id="radiobuttonOccurance"]/div[2]/label');
        this.ExistingClaimNumber = this.page.locator('#inputAcn');
        this.FirstName = this.page.locator('#inputFirstName');
        this.LastName = this.page.locator('#inputLastName');
        this.PronounsDropdown = this.page.locator('#dropdownPronoun-wrapper');
        this.PhoneNumber = this.page.locator('#inputPhoneNumeber');
        this.GenderMale = this.page.locator('xpath=//*[@id="radiobuttonGender"]/div[2]/label');
        this.GenderFemale = this.page.locator('xpath=//*[@id="radiobuttonGender"]/div[1]/label');
        this.DateOfBirthDate = this.page.locator('#dob-atepicker');
        this.LanguageDropdown = this.page.locator('#dropdownLanguage-wrapper');
        this.SocialInsuranceNumber = this.page.locator('#inputSin');
        this.NoSINCheckbox = this.page.locator('xpath=//*[@id="divNoSinContainer"]/div/div/div[1]/span');
        this.AddressLine1 = this.page.locator('#inputAddressLine1');
        this.City = this.page.locator('#inputCity');
        this.ProvinceDropdown = this.page.locator('#dropdownProvince-wrapper');
        this.PostalCode = this.page.locator('#inputPostalCode');
        this.CountryDropdown = this.page.locator('#dropdownCountry-wrapper');
        this.EmployerName = this.page.locator('#inputEmployer');
        this.EmployerPhoneNumber = this.page.locator('#inputPhoneNumber');
        this.EmployerAddressLine1 = this.page.locator('#inputAddressLine1');
        this.EmployerCity = this.page.locator('#inputCity');
        this.EmployerProvinceDropdown = this.page.locator('#dropdownProvince-wrapper');
        this.EmployerPostalCode = this.page.locator('#inputPostalCode');
        this.EmployerCountryDropdown = this.page.locator('#dropdownCountry-wrapper');
        this.ReferenceNumber = this.page.locator('xpath=//*[@id="claimsNumberBody"]/p');
        this.ContinueButton = this.page.locator('xpath=//*[@id="onBoardContinueId"]/span');
        this.NIHLPageHeader = this.page.locator('xpath=//*[@id="privacyPolicyH3"]');
        this.SubmissionReqNo = this.page.locator('xpath=//*[@id="radiobuttonCompanySize"]/div[2]/label/span');
        this.SubmissionReqYes = this.page.locator('xpath=//*[@id="radiobuttonCompanySize"]/div[1]/label/span');
    }

    async verifySubmitReportButtonDisplayed(): Promise<boolean> {
        await this.submitnewreport.waitFor({ state: 'visible' });
        return await this.submitnewreport.isVisible();
    }

    async clickSubmitReportButton(): Promise<boolean> {
        await this.submitnewreport.waitFor({ state: 'visible' });
        await this.click(this.submitnewreport);
        await this.AgreeCheckbox.waitFor({ state: 'visible' });
        return await this.AgreeCheckbox.isVisible();
    }

    async clickPrivacyStatement(): Promise<boolean> {
        await this.click(this.AgreeCheckbox);
        await this.click(this.NextButton);
        await this.InjuryorIllnessRadio.waitFor({ state: 'visible' });
        return await this.InjuryorIllnessRadio.isVisible();
    }

    async selectReportType(reporttype: string): Promise<void> {
        if (reporttype.includes('Injury')) {
            await this.click(this.InjuryorIllnessRadio);
        } else if (reporttype.includes('Exposure')) {
            await this.click(this.ExposureIncidentRadio);
        }
        await this.click(this.NextButton);
    }

    async selectInjuryType(injurytype: string): Promise<void> {
        if (injurytype.includes('Physical')) {
            await this.click(this.PhysicalInjuryRadio);
        } else if (injurytype.includes('Illness')) {
            await this.click(this.IllnessRadio);
        } else if (injurytype.includes('Mental')) {
            await this.click(this.MentalHealthRadio);
        } else if (injurytype.includes('Noise')) {
            await this.click(this.NoiseInducedHearingLossRadio);
        } else if (injurytype.includes('Construction')) {
            await this.click(this.ConstructionIncidentRadio);
        } else if (injurytype.includes('Other')) {
            await this.click(this.OtherIncidentRadio);
        }
        await this.click(this.NextButton);
    }

    async selectBodyPart(PhyscialInjury: string, bodypart: string): Promise<boolean> {
        if (PhyscialInjury.toLowerCase() === 'yes') {
            await this.click(this.InjuryTypeOccuranceYes);
        } else if (PhyscialInjury.toLowerCase() === 'no') {
            await this.click(this.InjuryTypeOccuranceNo);
        }

        const bodypartLocator = this.page.locator(`xpath=//*[@id='radiobuttonFollowupQuestion']/div/label/span[contains(text(),'${bodypart}')]`);
        await bodypartLocator.waitFor({ state: 'visible', timeout: 20000 });
        await this.click(bodypartLocator);
        await this.click(this.NextButton);
        await this.ExistingClaimNumber.waitFor({ state: 'visible' });
        return await this.ExistingClaimNumber.isVisible();
    }

    async enterExistingClaimNumber(existingClaimnumber: string): Promise<boolean> {
        if (existingClaimnumber !== '') {
            await this.enter(this.ExistingClaimNumber, existingClaimnumber);
        }
        await this.click(this.NextButton);
        await this.FirstName.waitFor({ state: 'visible' });
        return await this.FirstName.isVisible();
    }

    async enterPersonalInformation(firstName: string, lastname: string, phonenumber: string, pronouns: string): Promise<boolean> {
        await this.enter(this.FirstName, firstName);
        await this.enter(this.LastName, lastname);
        await this.selectJutroDropdownOption('dropdownPronoun', pronouns);
        await this.enter(this.PhoneNumber, phonenumber);
        await this.click(this.NextButton);
        await this.DateOfBirthDate.waitFor({ state: 'visible' });
        return await this.DateOfBirthDate.isVisible();
    }

    async enterAdditionalDetails(gender: string, DateofBirth: string, preferredLang: string, sin: string): Promise<boolean> {
        if (gender.includes('Male')) {
            await this.click(this.GenderMale);
        } else {
            await this.click(this.GenderFemale);
        }

        await this.click(this.DateOfBirthDate);
        await this.enter(this.DateOfBirthDate, DateofBirth);
        await this.selectJutroDropdownOption('dropdownLanguage', preferredLang);
        if (sin !== '') {
            await this.enter(this.SocialInsuranceNumber, sin);
        } else {
            await this.click(this.NoSINCheckbox);
        }
        await this.click(this.NextButton);
        await this.AddressLine1.waitFor({ state: 'visible' });
        return await this.AddressLine1.isVisible();
    }

    async enterAdditionalDetailsSimple(gender: string, DateofBirth: string): Promise<boolean> {
        if (gender.includes('Male')) {
            await this.click(this.GenderMale);
        } else {
            await this.click(this.GenderFemale);
        }

        await this.click(this.DateOfBirthDate);
        await this.enter(this.DateOfBirthDate, DateofBirth);
        await this.click(this.NextButton);
        await this.AddressLine1.waitFor({ state: 'visible' });
        return await this.AddressLine1.isVisible();
    }

    async enterMailingAddress(address: string): Promise<boolean> {
        const parts = address.split('|');
        await this.enter(this.AddressLine1, parts[0]);
        await this.enter(this.City, parts[1]);
        await this.selectJutroDropdownOption('dropdownProvince', parts[2]);
        await this.enter(this.PostalCode, parts[3]);
        await this.selectJutroDropdownOption('dropdownCountry', parts[4]);
        await this.click(this.NextButton);
        await this.EmployerName.waitFor({ state: 'visible' });
        return await this.EmployerName.isVisible();
    }

    async enterEmployerDetails(employername: string, empPhone: string, EmployerAddress: string): Promise<boolean> {
        await this.enter(this.EmployerName, employername);
        await this.enter(this.EmployerPhoneNumber, empPhone);
        const addrParts = EmployerAddress.split('|');
        await this.enter(this.EmployerAddressLine1, addrParts[0]);
        await this.enter(this.EmployerCity, addrParts[1]);
        await this.selectJutroDropdownOption('dropdownProvince', addrParts[2]);
        await this.enter(this.EmployerPostalCode, addrParts[3]);
        await this.selectJutroDropdownOption('dropdownCountry', addrParts[4]);
        await this.click(this.NextButton);
        await this.ReferenceNumber.waitFor({ state: 'visible' });
        return await this.ReferenceNumber.isVisible();
    }

    async verifyReferenceNumber(): Promise<string> {
        const reference = await this.ReferenceNumber.innerText();
        console.log(`E-Form 6 Reference Number is: ${reference}`);
        await this.click(this.ContinueButton);
        return reference;
    }

    async verifyNIHLPage(): Promise<boolean> {
        await this.NIHLPageHeader.waitFor({ state: 'visible' });
        const text = await this.NIHLPageHeader.innerText();
        return text.includes('Continue to different online service to make a claim for noise-induced hearing loss');
    }

    async selectSubmissionRequirement(submissionRequirement: string): Promise<void> {
        if (submissionRequirement.toLowerCase() === 'yes') {
            await this.click(this.SubmissionReqYes);
        } else {
            await this.click(this.SubmissionReqNo);
        }
        await this.click(this.NextButton);
    }
}
