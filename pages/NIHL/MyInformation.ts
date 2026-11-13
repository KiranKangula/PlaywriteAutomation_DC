import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class MyInformation extends BasePage {
    private readonly FirstName: Locator;
    private readonly LastName: Locator;
    private readonly DateOfBirth: Locator;
    private readonly SocialInsuranceNumber: Locator;
    private readonly StreetAddress: Locator;
    private readonly City: Locator;
    private readonly Province: Locator;
    private readonly PostalCode: Locator;
    private readonly Country: Locator;
    private readonly PhoneNumber: Locator;
    private readonly LanguagePreference: Locator;
    private readonly NextButton: Locator;

    constructor(page: Page) {
        super(page);
        this.FirstName = page.locator('xpath=//*[@name="firstName"]');
        this.LastName = page.locator('xpath=//*[@name="lastName"]');
        this.DateOfBirth = page.locator('xpath=//*[@name="dateOfBirth"]');
        this.SocialInsuranceNumber = page.locator('xpath=//*[@name="Socialinsurancenumber"]');
        this.StreetAddress = page.locator('xpath=//*[@name="streetAddress"]');
        this.City = page.locator('xpath=//*[@name="city"]');
        this.Province = page.locator('xpath=//*[@name="provinceState"]');
        this.PostalCode = page.locator('xpath=//*[@name="postalCode"]');
        this.Country = page.locator('xpath=//*[@name="country"]');
        this.PhoneNumber = page.locator('xpath=//*[@id="phone1"]');
        this.LanguagePreference = page.locator('xpath=//*[@aria-label="Language preference"]');
        this.NextButton = page.locator('xpath=(//*[@aria-label="Next"])[1]');
    }

    async enterMyInformationDetails(): Promise<boolean | null> {
        return null;
    }

    async EnterMyInformation(firstname: string, lastname: string, sin: string, address: string, phone: string, language: string): Promise<void> {
        await this.FirstName.waitFor({ state: 'visible' });
        await this.enter(this.FirstName, firstname);
        await this.enter(this.LastName, lastname);
        if (sin && sin !== '') {
            await this.enter(this.SocialInsuranceNumber, sin);
        }

        const addressParts = address.split('|');
        if (addressParts.length >= 5) {
            await this.enter(this.StreetAddress, addressParts[0]);
            await this.enter(this.City, addressParts[1]);
            await this.enter(this.Province, addressParts[2]);
            await this.enter(this.PostalCode, addressParts[3]);
            await this.enter(this.Country, addressParts[4]);
        } else {
            console.log(`Address format incorrect. Expected 5 parts separated by '|', got ${addressParts.length}`);
        }

        await this.enter(this.PhoneNumber, phone);
        await this.enter(this.LanguagePreference, language);
        await this.click(this.NextButton);
    }
}
