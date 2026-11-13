import { Page, Locator, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async sleep(ms: number) {
        await this.page.waitForTimeout(ms);
    }

    async click(locator: Locator) {
        try {
            await locator.click({ timeout: 10000 });
        } catch (e) {
            console.log(`Standard click failed, trying JS click: ${e}`);
            await locator.evaluate(el => (el as HTMLElement).click());
        }
    }

    async enter(locator: Locator, value: string | number, isGooglePlaces: boolean = false) {
        const textValue = String(value ?? '');
        await locator.waitFor({ state: 'visible' });
        await locator.fill(''); // Clear field
        await locator.fill(textValue);

        if (isGooglePlaces) {
            await this.sleep(500);
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
        } else {
            await this.page.keyboard.press('Tab');
        }
    }

    async selectJutroDropdownOption(dropdownId: string, optionText: string) {
    const wrapperId = dropdownId.endsWith('-wrapper') ? dropdownId : `${dropdownId}-wrapper`;
    const dropdownControl = this.page.locator(
        `//*[@id='${wrapperId}' or @id='${dropdownId}']//div[contains(@class, 'jut__GenericSelectControl__control')]`
    );

    await dropdownControl.scrollIntoViewIfNeeded();
    await dropdownControl.click();

    // Menu container (identical to your current selector)
    const menu = this.page.locator(
        "div[class*='jut__GenericSelectControl__menu'], div[class*='jut__DropdownSelectField__menu']"
    );

    // Primary: match option div or role="option" with exact text (handles apostrophes & whitespace)
    const optionLocator = menu
        .locator("div[class*='jut__GenericSelectControl__option'], [role='option']")
        .getByText(optionText, { exact: true });

    try {
        await optionLocator.click({ timeout: 5000 });
    } catch (e) {
        // Fallback: match any element inside the menu with exact text
        await menu.getByText(optionText, { exact: true }).click();
    }
}

    async datePicker(uniqueInputId: string, dateString: string) {
        // Date format expected: d/MMM/yyyy (e.g., 28/Oct/2026)
        const date = new Date(dateString);
        const year = date.getFullYear().toString();
        const monthValue = (date.getMonth()).toString(); // JS months are 0-11
        const day = date.getDate().toString();

        const inputField = this.page.locator(`#${uniqueInputId}`);
        const calendarIcon = inputField.locator('xpath=./ancestor::div[contains(@class, "wsib-date-picker_datePickerRow__2bX8k")]/div[@role="button"]');

        await calendarIcon.click();
        await this.page.waitForSelector('.react-datepicker-popper');

        await this.page.locator('.wsib-date-picker_yearSelect__1LIag').selectOption(year);
        await this.page.locator('.wsib-date-picker_monthSelect__3GLvO').selectOption(monthValue);

        // Construct the aria-label for the day
        // The Java code had a complex way of getting the day name.
        // In Playwright we can often just find the day by text or relative position.
        // Based on the Java logic: //div[@role='option' and contains(@aria-label, 'Choose ...')]

        // Better approach: find the cell that matches the day number and is not from a different month
        await this.page.locator(`div[role="option"]:has-text("${day}")`).first().click();
    }

    async uploadDocuments(filenames: string[]) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '').replace('T', '_').split('Z')[0];
        const uploadedFiles = [];
        const uploadDir = path.resolve('src/test/resources/DocUploadFiles');

        for (let i = 0; i < filenames.length; i++) {
            const originalFile = filenames[i];
            const ext = path.extname(originalFile);
            const base = path.basename(originalFile, ext);
            const newFilename = `${base}_${timestamp}_${i}${ext}`;
            const newPath = path.join(uploadDir, newFilename);

            fs.copyFileSync(path.join(uploadDir, originalFile), newPath);
            uploadedFiles.push(newPath);
        }

        const fileInput = this.page.locator("input[type='file']");
        await fileInput.evaluate(el => el.style.display = 'block');
        await fileInput.setInputFiles(uploadedFiles);

        return uploadedFiles.map(p => path.basename(p));
    }

    // Utility methods from BaseDriverClass
    static getProvinceAbbreviation(province: string): string {
        const provinces: Record<string, string> = {
            "alberta": "AB", "british columbia": "BC", "manitoba": "MB",
            "new brunswick": "NB", "newfoundland and labrador": "NL",
            "nova scotia": "NS", "ontario": "ON", "prince edward island": "PE",
            "quebec": "QC", "saskatchewan": "SK", "northwest territories": "NT",
            "nunavut": "NU", "yukon": "YT"
        };
        return provinces[province.toLowerCase()] || "";
    }

    static generateRandomText(length: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static generateRandomNumber(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }

    async clickElement(locator: Locator | string): Promise<void> {
    const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await loc.first().scrollIntoViewIfNeeded();
    await loc.first().click();
  }
  async enterText(locator: Locator | string, value: string, isGooglePlaces = false): Promise<void> {
    const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await loc.first().scrollIntoViewIfNeeded();
    await loc.first().fill(value);
    if (isGooglePlaces) {
      await this.page.waitForTimeout(500);
      await loc.first().press('ArrowDown');
      await loc.first().press('Enter');
    }
  }

async selectDropdown(dropdownLocator: Locator | string, optionText: string): Promise<void> {
    const loc = typeof dropdownLocator === 'string' ? this.page.locator(dropdownLocator) : dropdownLocator;
    await loc.first().click();
    const option = this.page.locator(`xpath=//*[contains(text(),'${optionText}')]`);
    await option.first().waitFor({ state: 'visible', timeout: 5000 });
    await option.first().click();
  }
  async selectDatePicker(uniqueInputId: string, dateString: string): Promise<void> {
    const [day, month, year] = dateString.split('/');
    const inputField = this.page.locator(`#${uniqueInputId}`);
    const calendarBtn = inputField.locator("xpath=./ancestor::div[contains(@class, 'wsib-date-picker')]/div[@role='button']");
    await calendarBtn.first().click();
    await this.page.locator('.react-datepicker-popper').first().waitFor({ state: 'visible' });
    const monthIndex = new Date(`${month} 1, 2000`).getMonth().toString();
    await this.page.locator('.wsib-date-picker_yearSelect__1LIag').first().selectOption(year);
    await this.page.locator('.wsib-date-picker_monthSelect__3GLvO').first().selectOption(monthIndex);
    const dayLocator = this.page.locator(`.react-datepicker__day:not(.react-datepicker__day--outside-month):text-is('${parseInt(day, 10)}')`);
    await dayLocator.first().click();
  }

    /**
   * Enters text into masked / formatted input fields (e.g. Jutro phone inputs, dates, postal codes, SIN)
   * Handles cursor resetting, sequential key events for input masks, and React state dispatching.
   *
   * @param locator The Playwright Locator for the input field
   * @param value The value to input
   * @param options Optional settings:
   *   - digitsOnly: strips all non-numeric characters (useful for phone numbers, SIN, account numbers)
   *   - delay: keystroke delay in ms (default: 40ms)
   */
  async enterMaskedInput(
    locator: Locator,
    value: string,
    options: { digitsOnly?: boolean; delay?: number } = {}
  ): Promise<void> {
    if (!value) return;

    const { digitsOnly = false, delay = 40 } = options;
    const finalValue = digitsOnly ? value.replace(/\D/g, '') : value.trim();

    await locator.waitFor({ state: 'visible', timeout: 20000 });

    // 1. Focus, select all, clear, and place cursor at position 0
    await locator.click();
    await this.page.keyboard.press('ControlOrMeta+A');
    await this.page.keyboard.press('Backspace');
    await locator.press('Home');

    // 2. Type sequentially so Jutro's input mask accepts every keystroke
    await locator.pressSequentially(finalValue, { delay });
    await locator.press('Tab'); // Trigger blur to commit mask formatting
    await this.page.waitForTimeout(300);

    // 3. Fallback: Check if the value didn't register or remains empty / stuck on placeholder
    const currentVal = await locator.inputValue().catch(() => '');
    if (!currentVal || currentVal.includes('_')) {
      await this.page.evaluate(
        ({ el, val }) => {
          const input = el as HTMLInputElement;
          input.focus();
          const nativeSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
          )?.set;
          if (nativeSetter) {
            nativeSetter.call(input, val);
          } else {
            input.value = val;
          }
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('blur', { bubbles: true }));
        },
        { el: await locator.elementHandle(), val: finalValue }
      );
    }
  }

  /**
   * Waits for a locator to become visible within a timeout and returns true.
   * If it does not become visible within the timeout, it safely catches the error and returns false.
   * 
   * @param locator Playwright Locator to check
   * @param timeoutMs Maximum wait time in milliseconds (default: 10000ms / 10s)
   * @returns Promise<boolean> true if visible within timeout, false otherwise
   */
  async isElementVisible(locator: Locator, timeoutMs: number = 10000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: timeoutMs });
      return true;
    } catch {
      return false;
    }
  }

   /**
   * Optional helper: Waits for ANY of the given locators to become visible.
   * Useful when a flow could land on one of multiple possible elements (e.g. Add vs. Edit screen).
   * 
   * @param locators Array of Locators to check
   * @param timeoutMs Maximum wait time in milliseconds (default: 10000ms / 10s)
   * @returns Promise<boolean> true if at least one locator became visible, false otherwise
   */
  async isAnyElementVisible(locators: Locator[], timeoutMs: number = 10000): Promise<boolean> {
    if (!locators || locators.length === 0) return false;
    // Combines all locators using Playwright's locator.or()
    const combinedLocator = locators.reduce((combined, loc) => combined.or(loc));
    try {
      await combinedLocator.waitFor({ state: 'visible', timeout: timeoutMs });
      return true;
    } catch {
      return false;
    }
  }

}
