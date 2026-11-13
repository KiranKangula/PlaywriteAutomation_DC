import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm6_InjuryDetails extends BasePage {
    private readonly nextButton: Locator;
    private readonly injuryDetailsInput: Locator;
    private readonly injuryOneTimeDate: Locator;
    private readonly injuryOneTimeHours: Locator;
    private readonly injuryOneTimeMinutes: Locator;
    private readonly injuryReportedtoEmpl_Yes: Locator;
    private readonly injuryReportedtoEmpl_No: Locator;
    private readonly ReportedDate: Locator;
    private readonly addBodyPartsButton: Locator;
    private readonly saveButton: Locator;
    private readonly attachReportButton: Locator;
    private readonly witnessInvolvedYes: Locator;
    private readonly witnessInvolvedNo: Locator;
    private readonly AddContactButton: Locator;
    private readonly WitnessFirstName: Locator;
    private readonly WitnessLastName: Locator;
    private readonly WitnessPosition: Locator;
    private readonly WitnessPhoneNumber: Locator;
    private readonly saveButtonWitness: Locator;
    private readonly copyFromEmployerAddressButton: Locator;
    private readonly exposureToYes: Locator;
    private readonly exposureToNo: Locator;
    private readonly priorClaimYes: Locator;
    private readonly priorClaimNo: Locator;
    private readonly AddPreviousClaimButton: Locator;
    private readonly ClaimNumber: Locator;
    private readonly saveButtonClaim: Locator;
    private readonly sameAreaOfInjuryYes: Locator;
    private readonly sameAreaOfInjuryNo: Locator;
    private readonly previousInjuryInfo: Locator;
    private readonly conditionInput: Locator;
    private readonly relatedToWorkInput: Locator;
    private readonly symptomsInput: Locator;
    private readonly IllnessStartDate: Locator;
    private readonly MentalStartDate: Locator;
    private readonly MentalEndDate: Locator;
    private readonly mentalHealthYes: Locator;
    private readonly mentalHealthNo: Locator;

    constructor(page: Page) {
        super(page);
        this.nextButton = this.page.locator('xpath=//*[@id="intakeBodySection"]/div[2]/div[1]/span[2]/a/span');
        this.injuryDetailsInput = this.page.locator('#divInjuryDetailsInput');
        this.injuryOneTimeDate = this.page.locator('#injury-date-picker');
        this.injuryOneTimeHours = this.page.locator('#dropdownInjuryOneTimeHours-wrapper');
        this.injuryOneTimeMinutes = this.page.locator('#dropdownInjuryOneTimeMinute-wrapper');
        this.injuryReportedtoEmpl_Yes = this.page.locator('xpath=//*[@id="radioReportedToEmployer"]/div[1]/label');
        this.injuryReportedtoEmpl_No = this.page.locator('xpath=//*[@id="radioReportedToEmployer"]/div[2]/label');
        this.ReportedDate = this.page.locator('#reported-date-picker');
        this.addBodyPartsButton = this.page.locator('xpath=//*[@id="addBodyPartsBtn"]/span/span');
        this.saveButton = this.page.locator('#save');
        this.attachReportButton = this.page.locator('xpath=//*[@id="attachReportButton"]/span/span');
        this.witnessInvolvedYes = this.page.locator('xpath=//*[@id="radioPriorClaim"]/div[1]/label/span');
        this.witnessInvolvedNo = this.page.locator('xpath=//*[@id="radioPriorClaim"]/div[2]/label/span');
        this.AddContactButton = this.page.locator('xpath=//*[@id="AddContactButton"]/span/span');
        this.WitnessFirstName = this.page.locator('#inputFirstName');
        this.WitnessLastName = this.page.locator('#inputLastName');
        this.WitnessPosition = this.page.locator('#inputPosition');
        this.WitnessPhoneNumber = this.page.locator('#inputPhoneNumeber');
        this.saveButtonWitness = this.page.locator('#btnSave');
        this.copyFromEmployerAddressButton = this.page.locator('xpath=//*[@id="copyFromEmployerAddressButton"]/span/span');
        this.exposureToYes = this.page.locator('xpath=//*[@id="radioExposureTo"]/div[1]/label');
        this.exposureToNo = this.page.locator('xpath=//*[@id="radioExposureTo"]/div[2]/label');
        this.priorClaimYes = this.page.locator('xpath=//*[@id="radioPriorClaim"]/div[1]/label/span');
        this.priorClaimNo = this.page.locator('xpath=//*[@id="radioPriorClaim"]/div[2]/label/span');
        this.AddPreviousClaimButton = this.page.locator('xpath=//*[@id="AddClaimButton"]/span/span');
        this.ClaimNumber = this.page.locator('#inputClaimNumber');
        this.saveButtonClaim = this.page.locator('#btnSave');
        this.sameAreaOfInjuryYes = this.page.locator('xpath=//*[@id="radioAreaOfInjury"]/div[1]/label');
        this.sameAreaOfInjuryNo = this.page.locator('xpath=//*[@id="radioAreaOfInjury"]/div[2]/label');
        this.previousInjuryInfo = this.page.locator('#previousInjuryInfo');
        this.conditionInput = this.page.locator('#conditionInput');
        this.relatedToWorkInput = this.page.locator('#relatedToWorkInput');
        this.symptomsInput = this.page.locator('#symptomsInput');
        this.IllnessStartDate = this.page.locator('#injury-start-date-picker');
        this.MentalStartDate = this.page.locator('#mental-start-date-picker');
        this.MentalEndDate = this.page.locator('#mental-end-date-picker');
        this.mentalHealthYes = this.page.locator('xpath=//*[@id="radiobuttonMentalHealth"]/div[1]/label');
        this.mentalHealthNo = this.page.locator('xpath=//*[@id="radiobuttonMentalHealth"]/div[2]/label');
    }

    async PhysicalInjuryDetails(whathappened: string): Promise<void> {
        await this.injuryDetailsInput.waitFor({ state: 'visible' });
        await this.enter(this.injuryDetailsInput, whathappened);
        await this.click(this.nextButton);
    }

    async enterInjuryDateAndTime(injuryOneTimeDate: string): Promise<void> {
        await this.injuryOneTimeDate.waitFor({ state: 'visible' });
        await this.click(this.injuryOneTimeDate);
        await this.enter(this.injuryOneTimeDate, injuryOneTimeDate);
        await this.click(this.nextButton);
    }

    async selectBodyPart(physicalInj: string, bodypart: string): Promise<void> {
        await this.addBodyPartsButton.waitFor({ state: 'visible' });
        await this.click(this.addBodyPartsButton);

        const physicalInjuryLocator = this.page.locator(`xpath=//*[@id='tabBarContainer']/div/button[contains(text(),'${physicalInj}')]`);
        await physicalInjuryLocator.waitFor({ state: 'visible', timeout: 20000 });
        await this.click(physicalInjuryLocator);

        const bodyPartsLocator = this.page.locator(`xpath=//*[contains(@id,'CheckboxGroup')]/div//label/span[contains(text(),'${bodypart}')]`);
        await bodyPartsLocator.waitFor({ state: 'visible', timeout: 20000 });
        await this.click(bodyPartsLocator);
        await this.saveButton.waitFor({ state: 'visible' });
        await this.click(this.saveButton);
        await this.sleep(2000);
        await this.click(this.nextButton);
    }

    async selectReportedToEmpl(ReportedtoEmpl: string, ReportedDate: string): Promise<void> {
        if (await this.injuryReportedtoEmpl_Yes.isVisible()) {
            await this.click(this.injuryReportedtoEmpl_Yes);
            await this.enter(this.ReportedDate, ReportedDate);
            await this.sleep(2000);
            await this.click(this.nextButton);
        } else {
            console.log('WARNING: Date and Time Injury Reported to Employer is not displayed');
        }
    }

    async enterWitnessDetails(witnessInvolved: string, witnessFirstName: string, witnessLastName: string, witnessPosition: string, witnessPhoneNumber: string): Promise<void> {
        await this.witnessInvolvedYes.waitFor({ state: 'visible' });
        if (witnessInvolved.toLowerCase() === 'yes') {
            await this.click(this.witnessInvolvedYes);
            await this.click(this.AddContactButton);
            await this.enter(this.WitnessFirstName, witnessFirstName);
            await this.enter(this.WitnessLastName, witnessLastName);
            await this.enter(this.WitnessPosition, witnessPosition);
            await this.enter(this.WitnessPhoneNumber, witnessPhoneNumber);
            await this.click(this.saveButtonWitness);
        } else {
            await this.click(this.witnessInvolvedNo);
        }
        await this.click(this.nextButton);
    }

    async enterIncidentAddress(): Promise<void> {
        await this.copyFromEmployerAddressButton.waitFor({ state: 'visible' });
        await this.click(this.copyFromEmployerAddressButton);
        await this.click(this.nextButton);
    }

    async enterSimilarInjuryDetails(similarInjury: string, previousClaim: string, previousClaimNumber: string,
                                      sameAreaofInjury: string, tellUsAboutPreviousInjury: string): Promise<void> {
        await this.exposureToYes.waitFor({ state: 'visible' });
        if (similarInjury.toLowerCase() === 'yes') {
            await this.click(this.exposureToYes);
            if (previousClaim.toLowerCase() === 'yes') {
                await this.click(this.priorClaimYes);
                await this.click(this.AddPreviousClaimButton);
                await this.enter(this.ClaimNumber, previousClaimNumber);
                await this.click(this.saveButtonClaim);
                if (sameAreaofInjury.toLowerCase() === 'yes') {
                    await this.click(this.sameAreaOfInjuryYes);
                } else {
                    await this.click(this.sameAreaOfInjuryNo);
                }
                await this.enter(this.previousInjuryInfo, tellUsAboutPreviousInjury);
            } else {
                await this.click(this.priorClaimNo);
            }
        } else {
            await this.click(this.exposureToNo);
        }
        await this.click(this.nextButton);
    }

    async enterInjuryDetails(conditionInput: string, relatedToWorkInput: string, symptomsInput: string): Promise<void> {
        await this.conditionInput.waitFor({ state: 'visible' });
        await this.enter(this.conditionInput, conditionInput);
        await this.enter(this.relatedToWorkInput, relatedToWorkInput);
        await this.enter(this.symptomsInput, symptomsInput);
        await this.click(this.nextButton);
    }

    async enterIllnessDetails(illnessStartDate: string): Promise<void> {
        await this.IllnessStartDate.waitFor({ state: 'visible' });
        await this.enter(this.IllnessStartDate, illnessStartDate);
        await this.click(this.nextButton);
    }

    async DescribeInjury(describeInjury: string): Promise<void> {
        const describeInjuryLocator = this.page.locator(`xpath=//*[@id='radiobuttonDescribedBy']/div//label/span[contains(text(),'${describeInjury}')]`);
        await describeInjuryLocator.waitFor({ state: 'visible', timeout: 20000 });
        await this.click(describeInjuryLocator);
        await this.click(this.nextButton);
    }

    async enterMentalInjuryDetails(injuryDetailsInput: string): Promise<void> {
        await this.injuryDetailsInput.waitFor({ state: 'visible' });
        await this.enter(this.injuryDetailsInput, injuryDetailsInput);
        await this.click(this.nextButton);
    }

    async enterMentalInjuryDateDetails(injuryStartDate: string, injuryEndDate: string): Promise<void> {
        await this.MentalStartDate.waitFor({ state: 'visible' });
        await this.enter(this.MentalStartDate, injuryStartDate);
        await this.enter(this.MentalEndDate, injuryEndDate);
        await this.click(this.nextButton);
    }

    async InjuredQuestion(physicalInjury: string): Promise<void> {
        await this.mentalHealthYes.waitFor({ state: 'visible' });
        if (physicalInjury.toLowerCase() === 'yes') {
            await this.click(this.mentalHealthYes);
        } else {
            await this.click(this.mentalHealthNo);
        }
    }
}
