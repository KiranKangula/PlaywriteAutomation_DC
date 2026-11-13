import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class WTLandingPage extends BasePage {
    private readonly lastName: Locator;
    private readonly claimNumber: Locator;
    private readonly DateofBirthDay: Locator;
    private readonly DateofBirthMonth: Locator;
    private readonly DateofBirthYear: Locator;
    private readonly NextButton: Locator;

    constructor(page: Page) {
        super(page);
        this.lastName = page.locator('#lastName');
        this.claimNumber = page.locator('#claimNumber');
        this.DateofBirthDay = page.locator('#day');
        this.DateofBirthMonth = page.locator('#month');
        this.DateofBirthYear = page.locator('#year');
        this.NextButton = page.locator('xpath=//*[@type="submit"]');
    }

    async verifyOnClaimantInformationPage(): Promise<boolean> {
        await this.lastName.waitFor({ state: 'visible' });
        return await this.lastName.isVisible();
    }

    async ValidateClaimantInformation(claimnumber: string, lastname: string, dateOfbirth: string): Promise<void> {
        await this.enter(this.claimNumber, claimnumber);
        await this.enter(this.lastName, lastname);
        const dob = dateOfbirth.split('/');
        await this.DateofBirthDay.selectOption(dob[0]);
        await this.DateofBirthMonth.selectOption(dob[1]);
        await this.DateofBirthYear.selectOption(dob[2]);
        await this.click(this.NextButton);
    }
}
