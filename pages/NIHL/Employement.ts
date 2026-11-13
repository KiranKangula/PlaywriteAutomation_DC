import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class Employement extends BasePage {
    private readonly NewClaimButton: Locator;
    private readonly RetiredRadioYes: Locator;
    private readonly RetirementDate: Locator;
    private readonly RetiredRadioNo: Locator;
    private readonly EmployedRadioYes: Locator;
    private readonly EmployerName: Locator;
    private readonly EmployerAddress: Locator;
    private readonly EmployerPhoneNumber: Locator;
    private readonly HazardousNoiseRadioYes: Locator;
    private readonly HazardousNoiseRadioNo: Locator;
    private readonly EmployedRadioNo: Locator;
    private readonly SelfEmployedRadioYes: Locator;
    private readonly InsuranceRadioYes: Locator;
    private readonly BusinessName: Locator;
    private readonly BusinessAddress: Locator;
    private readonly BusinessFrom: Locator;
    private readonly BusinessTo: Locator;
    private readonly InsuranceRadioNo: Locator;
    private readonly SelfEmployedRadioNo: Locator;
    private readonly noisyMachineryOffworkYes: Locator;
    private readonly usedNoisyMachinery: Locator;
    private readonly noisyMachineryOffworkNo: Locator;
    private readonly AddButton: Locator;
    private readonly stillInBusinessYes: Locator;
    private readonly stillInBusinessNo: Locator;
    private readonly JobTitle: Locator;
    private readonly EmployedFrom: Locator;
    private readonly EmployedTo: Locator;
    private readonly ToolsEquipmentUsed: Locator;
    private readonly HoursUsed: Locator;
    private readonly DoneButton: Locator;
    private readonly NextButton: Locator;

    constructor(page: Page) {
        super(page);
        this.NewClaimButton = page.locator('#btnNewClaim');
        this.RetiredRadioYes = page.locator('xpath=//*[@id="yes"]');
        this.RetirementDate = page.locator('xpath=//*[@name="retirementDate"]');
        this.RetiredRadioNo = page.locator('xpath=//*[@id="no"]');
        this.EmployedRadioYes = page.locator('xpath=//*[@id="isEmployedyes"]');
        this.EmployerName = page.locator('xpath=//*[@name="employerName"]');
        this.EmployerAddress = page.locator('xpath=//*[@name="employerAddress"]');
        this.EmployerPhoneNumber = page.locator('xpath=//*[@name="employerPhoneNumber"]');
        this.HazardousNoiseRadioYes = page.locator('xpath=//*[@id="isHazardousNoiseyes"]');
        this.HazardousNoiseRadioNo = page.locator('xpath=//*[@id="isHazardousNoiseno"]');
        this.EmployedRadioNo = page.locator('xpath=//*[@id="isEmployedno"]');
        this.SelfEmployedRadioYes = page.locator('xpath=//*[@id="selfEmployedQuestionyes"]');
        this.InsuranceRadioYes = page.locator('xpath=//*[@id="hasInsuranceyes"]');
        this.BusinessName = page.locator('xpath=//*[@name="businessName"]');
        this.BusinessAddress = page.locator('xpath=//*[@name="yourBusinessAddress"]');
        this.BusinessFrom = page.locator('xpath=//*[@name="yourBusinessFrom"]');
        this.BusinessTo = page.locator('xpath=//*[@name="yourBusinessTo"]');
        this.InsuranceRadioNo = page.locator('xpath=//*[@id="hasInsuranceno"]');
        this.SelfEmployedRadioNo = page.locator('xpath=//*[@id="selfEmployedQuestionno"]');
        this.noisyMachineryOffworkYes = page.locator('xpath=//*[@id="noisyMachineryOffworkYes"]');
        this.usedNoisyMachinery = page.locator('xpath=//*[@name="usedNoisyMachinery"]');
        this.noisyMachineryOffworkNo = page.locator('xpath=//*[@id="noisyMachineryOffworkNo"]');
        this.AddButton = page.locator('xpath=//*[@aria-label="Add"]');
        this.stillInBusinessYes = page.locator('xpath=//*[@id="stillInBusinessYes"]');
        this.stillInBusinessNo = page.locator('xpath=//*[@id="stillInBusinessNo"]');
        this.JobTitle = page.locator('xpath=//*[@name="jobTitle"]');
        this.EmployedFrom = page.locator('xpath=//*[@name="employedFrom"]');
        this.EmployedTo = page.locator('xpath=//*[@name="employedTo"]');
        this.ToolsEquipmentUsed = page.locator('xpath=//*[@id="toolsEquipmentUsed"]');
        this.HoursUsed = page.locator('xpath=//*[@formcontrolname="hoursUsed"]');
        this.DoneButton = page.locator('xpath=//*[@aria-label="Done"]');
        this.NextButton = page.locator('xpath=(//button[@role="button" and contains(., "Next")])[3]');
    }

    async verifyOnNIHLLandingPage(): Promise<boolean> {
        await this.NewClaimButton.waitFor({ state: 'visible' });
        return await this.NewClaimButton.isVisible();
    }

    async EnterEmploymentDetails(
        areyouretired: string,
        retirementDate: string,
        employedRadio: string,
        employerName: string,
        employerAddress: string,
        employerPhone: string,
        hazardousNoiseRadio: string,
        selfEmployedRadio: string,
        insuranceRadio: string,
        businessName: string,
        businessAddress: string,
        businessFrom: string,
        businessTo: string,
        noisyMachineryOffwork: string,
        usedNoisyMachinery: string,
        stillInBusiness: string,
        jobTitle: string,
        employedFrom: string,
        employedTo: string,
        toolsEquipmentUsed: string,
        hoursUsed: string
    ): Promise<void> {
        if (areyouretired.toLowerCase() === 'yes') {
            await this.click(this.RetiredRadioYes);
            await this.enter(this.RetirementDate, retirementDate);
        } else {
            await this.click(this.RetiredRadioNo);
            if (employedRadio.toLowerCase() === 'yes') {
                await this.click(this.EmployedRadioYes);
                await this.enter(this.EmployerName, employerName);
                await this.enter(this.EmployerAddress, employerAddress);
                await this.enter(this.EmployerPhoneNumber, employerPhone);
                if (hazardousNoiseRadio.toLowerCase() === 'yes') {
                    await this.click(this.HazardousNoiseRadioYes);
                } else {
                    await this.click(this.HazardousNoiseRadioNo);
                }
            } else {
                await this.click(this.EmployedRadioNo);
            }
        }

        if (selfEmployedRadio.toLowerCase() === 'yes') {
            await this.click(this.SelfEmployedRadioYes);
            if (insuranceRadio.toLowerCase() === 'yes') {
                await this.click(this.InsuranceRadioYes);
                await this.enter(this.BusinessName, businessName);
                await this.enter(this.BusinessAddress, businessAddress);
                await this.enter(this.BusinessFrom, businessFrom);
                await this.click(this.BusinessName);
                await this.enter(this.BusinessTo, businessTo);
            } else {
                await this.click(this.InsuranceRadioNo);
            }
        } else {
            await this.click(this.SelfEmployedRadioNo);
        }

        if (noisyMachineryOffwork.toLowerCase() === 'yes') {
            await this.click(this.noisyMachineryOffworkYes);
            await this.enter(this.usedNoisyMachinery, usedNoisyMachinery);
        } else {
            await this.click(this.noisyMachineryOffworkNo);
        }

        await this.click(this.AddButton);
        if (stillInBusiness.toLowerCase() === 'yes') {
            await this.click(this.stillInBusinessYes);
        } else {
            await this.click(this.stillInBusinessNo);
        }
        await this.enter(this.JobTitle, jobTitle);
        await this.enter(this.EmployedFrom, employedFrom);
        await this.click(this.JobTitle);
        await this.enter(this.EmployedTo, employedTo);
        await this.enter(this.ToolsEquipmentUsed, toolsEquipmentUsed);
        await this.enter(this.HoursUsed, hoursUsed);
        await this.click(this.DoneButton);
        await this.sleep(2000);
        await this.click(this.NextButton);
    }
}
