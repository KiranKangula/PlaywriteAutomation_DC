import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class AddClaimantInfo extends BasePage {
    private readonly claimNumber: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly birthdate: Locator;
    private readonly accidentdate: Locator;
    private readonly confirmCheckbox: Locator;
    private readonly NextButton: Locator;
    private readonly dateOfBirthHelperText: Locator;

    constructor(page: Page) {
        super(page);
        this.claimNumber = page.locator('#claim-number');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.birthdate = page.locator('#birthdate-picker');
        this.accidentdate = page.locator('#accidentdate-picker');
        this.confirmCheckbox = page.locator('xpath=//*[@type="checkbox"]');
        this.NextButton = page.locator('xpath=//*[@type="submit"]');
        this.dateOfBirthHelperText = page.locator('xpath=//*[@id="dateof-birth-helper-text"]/span');
    }

    async navigateToURL(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async AddClaimantInformation(claimNumber: string, lastName: string, dateOfBirth: string): Promise<void> {
        await this.claimNumber.waitFor({ state: 'visible' });
        await this.enter(this.claimNumber, claimNumber);
        await this.enter(this.lastName, lastName);
        await this.enter(this.birthdate, dateOfBirth);
        await this.claimNumber.click();

        console.log(`Claim Number: ${claimNumber}, Last Name: ${lastName}, Date of Birth: ${dateOfBirth}`);
        await this.click(this.NextButton);

        try {
            if (await this.dateOfBirthHelperText.isVisible()) {
                console.log('Date of Birth is invalid error message displayed');
                await this.click(this.NextButton);
            }
        } catch (e) {
            console.log('Date of Birth is valid');
        }
    }

    async AddClaimantInformationUNCD(firstname: string, lastname: string, dateofbirth: string, dateofinjury: string): Promise<void> {
        await this.firstName.waitFor({ state: 'visible' });

        let finalFirstName = firstname;
        let finalLastName = lastname;

        if (firstname === '<dynamicFN>' && lastname === '<dynamicLN>') {
            finalFirstName = BasePage.generateRandomText(5);
            finalLastName = BasePage.generateRandomText(5);
        }

        console.log(`First Name: ${finalFirstName}, Last Name: ${finalLastName}, Date of Birth: ${dateofbirth}`);
        await this.enter(this.firstName, finalFirstName);
        await this.enter(this.lastName, finalLastName);
        await this.enter(this.birthdate, dateofbirth);
        await this.enter(this.accidentdate, dateofinjury);
        await this.firstName.click();
        await this.click(this.confirmCheckbox);
        await this.click(this.NextButton);

        try {
            if (await this.dateOfBirthHelperText.isVisible()) {
                console.log('Date of Birth is invalid error message displayed');
                await this.click(this.NextButton);
            }
        } catch (e) {
            console.log('Date of Birth is valid');
        }
    }
}
