// pages/OSPC/Tombstone.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export interface MailingAddressData {
  addressLine1?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}

export class Tombstone extends BasePage {
  // --- Locators matching Java @FindBy annotations ---
  readonly contactInfoLink: Locator;
  readonly contactInformationHeading: Locator;
  readonly contactFullName: Locator;
  readonly addressPlaceholder: Locator;
  readonly phonePlaceholder: Locator;
  readonly editMailingAddressLink: Locator;
  readonly editContactHeader: Locator;
  readonly startChangeButton: Locator;
  readonly mailingAddressSubheader: Locator;
  readonly inputAddressLine1: Locator;
  readonly inputCity: Locator;
  readonly dropdownProvince: Locator;
  readonly inputPostalCode: Locator;
  readonly dropdownCountry: Locator;
  readonly addressCheckbox: Locator;
  readonly addressSubmitButton: Locator;
  readonly successfulbannerCotainerInfo: Locator;

  readonly editPhoneNumberLink: Locator;
  readonly inputPhoneNumber: Locator;
  readonly phoneCheckbox: Locator;
  readonly phoneSubmitButton: Locator;

  private static readonly provinceMap: Record<string, string> = {
    'Alberta': 'AB',
    'British Columbia': 'BC',
    'Manitoba': 'MB',
    'New Brunswick': 'NB',
    'Newfoundland and Labrador': 'NL',
    'Nova Scotia': 'NS',
    'Ontario': 'ON',
    'Prince Edward Island': 'PE',
    'Quebec': 'QC',
    'Saskatchewan': 'SK',
    'Northwest Territories': 'NT',
    'Nunavut': 'NU',
    'Yukon': 'YT'
  };

  constructor(page: Page) {
    super(page);

    this.contactInfoLink = page.locator('#contactInfoPartTwo');
    this.contactInformationHeading = page.locator('#contactInformation');
    this.contactFullName = page.locator('#contactFullName');
    this.addressPlaceholder = page.locator('#addressPlaceholder');
    this.phonePlaceholder = page.locator('#phonePlaceholder');
    this.editMailingAddressLink = page.locator('#editMailingAddressLink');
    this.editContactHeader = page.locator('#editContactHeader');
    this.startChangeButton = page.locator('#startChangeButton');
    this.mailingAddressSubheader = page.locator('#mailingAddressSubheader');
    this.inputAddressLine1 = page.locator('#inputAddressLine1');
    this.inputCity = page.locator('#inputCity');
    this.dropdownProvince = page.locator('#dropdownProvince-wrapper');
    this.inputPostalCode = page.locator('#inputPostalCode');
    this.dropdownCountry = page.locator('#dropdownCountry-wrapper');
    this.addressCheckbox = page.locator('//*[@id="divConcentContainer"]/div/div/div[1]/span');
    this.addressSubmitButton = page.locator('#submitButton');
    this.successfulbannerCotainerInfo = page.locator('#successfulbannerCotainerInfo');

    this.editPhoneNumberLink = page.locator('#editPhoneNumberLink');
    this.inputPhoneNumber = page.locator('#inputPhoneNumber');
    this.phoneCheckbox = page.locator('//*[@id="acknWrapper"]/div[1]/div/div[1]/span');
    this.phoneSubmitButton = page.locator('#submitBtn');
  }

  // --- Contact Info & Personal Details Navigation ---

  async clickContactInfoLink(): Promise<boolean> {
    await this.contactInfoLink.waitFor({ state: 'visible' });
    await this.contactInfoLink.click();

    await this.contactInformationHeading.waitFor({ state: 'visible' });
    return await this.contactInformationHeading.isVisible();
  }

  async verifyFullName(): Promise<boolean> {
    await this.contactFullName.waitFor({ state: 'visible' });
    return await this.contactFullName.isVisible();
  }

  async verifyAddress(): Promise<boolean> {
    await this.addressPlaceholder.waitFor({ state: 'visible' });
    return await this.addressPlaceholder.isVisible();
  }

  async verifyPhoneNumber(): Promise<boolean> {
    await this.phonePlaceholder.waitFor({ state: 'visible' });
    return await this.phonePlaceholder.isVisible();
  }

  // --- Mailing Address Workflows ---

  async clickEditMailingAddress(): Promise<boolean> {
    await this.editMailingAddressLink.waitFor({ state: 'visible' });
    await this.editMailingAddressLink.click();

    await this.editContactHeader.waitFor({ state: 'visible' });
    await this.startChangeButton.waitFor({ state: 'visible' });
    await this.startChangeButton.click();

    await this.mailingAddressSubheader.waitFor({ state: 'visible' });
    return await this.mailingAddressSubheader.isVisible();
  }

  /**
   * Updates mailing address, handles confirmation checkbox and submit,
   * then verifies updated address against the placeholder.
   */
  async updateMailingAddress(data?: MailingAddressData): Promise<boolean> {
    const rawAddress = data?.addressLine1 || '123-Main Street';
    const splitParts = rawAddress.split('-');
    const basePart = splitParts[splitParts.length - 1];
    const addressline1 = `${this.generateRandomNumber(3)}-${basePart}`;

    const city = data?.city || 'Toronto';
    const province = data?.province || 'Ontario';
    const postalcode = data?.postalCode || 'M5V2T6';
    const country = data?.country || 'Canada';

    await this.inputAddressLine1.waitFor({ state: 'visible' });
    await this.inputAddressLine1.fill(addressline1);
    await this.inputCity.fill(city);
    await this.inputPostalCode.fill(postalcode);

    // Verify country contains expected country
    const countryText = (await this.dropdownCountry.textContent())?.trim() || '';
    expect(countryText).toContain(country);

    // Scroll to & click checkbox
    await this.addressCheckbox.scrollIntoViewIfNeeded();
    await this.addressCheckbox.click();

    // Scroll to & click submit
    await this.addressSubmitButton.scrollIntoViewIfNeeded();
    try {
      await this.addressSubmitButton.click({ timeout: 5000 });
    } catch {
      await this.addressSubmitButton.evaluate((el: HTMLElement) => el.click());
    }

    // Wait for success banner
    try {
      await this.successfulbannerCotainerInfo.waitFor({ state: 'visible', timeout: 15000 });
    } catch {
      if (await this.inputAddressLine1.isVisible()) {
        console.error('Mailing Address update failed. Successful banner did not appear.');
        return false;
      }
    }

    // Province abbreviation formatting
    const provinceAbbreviation = Tombstone.provinceMap[province] || province;

    await this.page.waitForTimeout(3000);

    const expectedAddress = `${addressline1}, ${city}, ${provinceAbbreviation} ${postalcode}`
      .trim()
      .replace(/\s+/g, ' ');

    const actualAddress = ((await this.addressPlaceholder.textContent()) || '')
      .trim()
      .replace(/\s+/g, ' ');

    if (expectedAddress.toLowerCase() === actualAddress.toLowerCase()) {
      console.log('Mailing address updated successfully in the application.');
      return true;
    } else {
      console.error('Mailing address update failed in the application.');
      console.error(`Address Expected: [${expectedAddress}]`);
      console.error(`Address Actual  : [${actualAddress}]`);
      return false;
    }
  }

  // --- Phone Number Workflows ---

  async clickEditPhoneNumber(): Promise<boolean> {
    await this.editPhoneNumberLink.waitFor({ state: 'visible' });
    await this.editPhoneNumberLink.click();

    await this.inputPhoneNumber.waitFor({ state: 'visible' });
    return await this.inputPhoneNumber.isVisible();
  }

  /**
   * Updates phone number with a 10-digit random number (or passed value),
   * checks confirmation, submits, and verifies in the phone placeholder.
   */
  async updatePhoneNumber(providedPhone?: string): Promise<boolean> {
    let rawPhoneNumber = providedPhone ? providedPhone.replace(/\D/g, '') : this.generateRandomNumber(10);
    if (rawPhoneNumber.length !== 10) {
      rawPhoneNumber = this.generateRandomNumber(10);
    }

    await this.inputPhoneNumber.waitFor({ state: 'visible' });
    await this.inputPhoneNumber.fill(rawPhoneNumber);

    await this.phoneCheckbox.scrollIntoViewIfNeeded();
    await this.phoneCheckbox.click();

    await this.phoneSubmitButton.scrollIntoViewIfNeeded();
    try {
      await this.phoneSubmitButton.click({ timeout: 5000 });
    } catch {
      await this.phoneSubmitButton.evaluate((el: HTMLElement) => el.click());
    }

    const formattedPhoneNumber = `${rawPhoneNumber.substring(0, 3)}-${rawPhoneNumber.substring(3, 6)}-${rawPhoneNumber.substring(6)}`;

    try {
      await this.successfulbannerCotainerInfo.waitFor({ state: 'visible', timeout: 15000 });
    } catch {
      if (await this.inputPhoneNumber.isVisible()) {
        console.error('Phone Number update failed. Successful banner did not appear.');
        return false;
      }
    }

    await this.page.waitForTimeout(4000);

    const actualPhone = ((await this.phonePlaceholder.textContent()) || '')
      .trim()
      .replace(/\s+/g, ' ');

    if (actualPhone.includes(formattedPhoneNumber)) {
      console.log('Phone number updated successfully in the application.');
      return true;
    } else {
      console.error('Phone number update failed in the application.');
      console.error(`Phone Expected to contain: [${formattedPhoneNumber}]`);
      console.error(`Phone Actual: [${actualPhone}]`);
      return false;
    }
  }

  // --- Helper Methods ---

  private generateRandomNumber(length: number): string {
    let result = '';
    const digits = '1234567890';
    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return result;
  }
}