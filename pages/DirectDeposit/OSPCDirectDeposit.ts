import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class OSPCDirectDeposit extends BasePage {
    private readonly directDepositButton: Locator;
    private readonly Question1: Locator;
    private readonly answer_oneQuestion1: Locator;
    private readonly Question2: Locator;
    private readonly answer_oneQuestion2: Locator;
    private readonly Question3: Locator;
    private readonly answer_oneQuestion3: Locator;
    private readonly AddDirectdepositHeader: Locator;
    private readonly editDirectdepositLink: Locator;
    private readonly monthDropdown: Locator;
    private readonly yearDropdown: Locator;
    private readonly ConfirmButton: Locator;
    private readonly transitInput: Locator;
    private readonly institutionInput: Locator;
    private readonly accountNumber: Locator;
    private readonly Reenter_accountNumber: Locator;
    private readonly confirmCheckbox: Locator;
    private readonly nextButton: Locator;
    private readonly reviewStep: Locator;
    private readonly confirmCheckbox_Review: Locator;
    private readonly SubmitButton: Locator;
    private readonly SubmitChanges: Locator;
    private readonly navigationSection: Locator;
    private readonly NoDirectDepositMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.directDepositButton = this.page.locator('#setupDepositButton');
        this.Question1 = this.page.locator('#Question1-wrapper');
        this.answer_oneQuestion1 = this.page.locator('#answer_oneQuestion1');
        this.Question2 = this.page.locator('#Question2-wrapper');
        this.answer_oneQuestion2 = this.page.locator('#answer_oneQuestion2');
        this.Question3 = this.page.locator('#Question3-wrapper');
        this.answer_oneQuestion3 = this.page.locator('#answer_oneQuestion3');
        this.AddDirectdepositHeader = this.page.locator('xpath=//*[@id="diBodySection"]/div/div/div[2]/div/div[2]/h1');
        this.editDirectdepositLink = this.page.locator('xpath=//*[contains(text(), "Edit")]');
        this.monthDropdown = this.page.locator('#monthDropdown-wrapper');
        this.yearDropdown = this.page.locator('#yearDropdown-wrapper');
        this.ConfirmButton = this.page.locator('xpath=//*[@id="dobinputSection"]/div/div/button/span/span');
        this.transitInput = this.page.locator('#transitInput');
        this.institutionInput = this.page.locator('#institutionInput');
        this.accountNumber = this.page.locator('#accountNumber1');
        this.Reenter_accountNumber = this.page.locator('#accountNumber2');
        this.confirmCheckbox = this.page.locator('xpath=//*[@id="termagreeSection"]/div/div/div/div[1]/span');
        this.nextButton = this.page.locator('#nextButton');
        this.reviewStep = this.page.locator('#review');
        this.confirmCheckbox_Review = this.page.locator('xpath=//*[@id="termagreeSection"]/div[1]/div[1]/div/div/div[1]/span');
        this.SubmitButton = this.page.locator('xpath=//*[contains(text(), "Submit")]');
        this.SubmitChanges = this.page.locator('xpath=//*[contains(text(), "Submit changes")]');
        this.navigationSection = this.page.locator('xpath=//*[@id="navigationSection"]/a/span');
        this.NoDirectDepositMessage = this.page.locator('xpath=//*[@id="diBodySection"]/div/div/div[2]/div[1]/div');
    }

    async LandOnDirectDeposit(): Promise<boolean> {
        await this.click(this.directDepositButton);
        await this.sleep(2000);
        await this.Question1.waitFor({ state: 'visible' });
        return await this.Question1.isVisible();
    }

    async AddDirectDepositInformation(): Promise<boolean> {
        await this.selectJutroDropdownOption('Question1', 'Name of the city or town where your grandparents live(d).');
        await this.enter(this.answer_oneQuestion1, 'Toronto');
        await this.selectJutroDropdownOption('Question2', 'In what city or town did your parents meet?');
        await this.enter(this.answer_oneQuestion2, 'Toronto');
        await this.selectJutroDropdownOption('Question3', 'Name of a college or university you applied to but didn\'t attend.');
        await this.enter(this.answer_oneQuestion3, 'Toronto');
        await this.click(this.nextButton);

        if (await this.isElementVisible(this.AddDirectdepositHeader)) {
            return true;
        } else if (await this.isElementVisible(this.editDirectdepositLink)) {
            return true;
        }
        return false;
    }

    async editDirectDepositInformation(Month: string, Year: string): Promise<boolean> {
        if (await this.editDirectdepositLink.isVisible()) {
            await this.click(this.editDirectdepositLink);
            await this.transitInput.waitFor({ state: 'visible' });
        } else {
            await this.AddDirectDepositInformation();
        }
        return await this.transitInput.isVisible();
    }

    async AddandValidateDDInformation(transit: string, institution: string, AcctNumber: string): Promise<boolean> {
        if (await this.editDirectdepositLink.isVisible()) {
            await this.click(this.editDirectdepositLink);
            await this.transitInput.waitFor({ state: 'visible' });
        }
        await this.enter(this.transitInput, transit);
        await this.enter(this.institutionInput, institution);
        await this.enter(this.accountNumber, AcctNumber);
        await this.enter(this.Reenter_accountNumber, AcctNumber);
        await this.click(this.confirmCheckbox);
        if (await this.nextButton.isVisible()) {
            await this.click(this.nextButton);
        } else {
            await this.click(this.SubmitChanges);
        }

        if (await this.confirmCheckbox_Review.isVisible()) {
            await this.click(this.confirmCheckbox_Review);
            await this.click(this.SubmitButton);
        }
        await this.nextButton.waitFor({ state: 'visible' });
        return await this.nextButton.isVisible();
    }

    async getClaimNumberfromOSPC(): Promise<string> {
        const url = this.page.url();
        const claimnumber = url.split('/')[5];
        return claimnumber;
    }

    async verifyDirectDepositRemovalinOSPC(): Promise<boolean> {
        // In Playwright, if we need to close current page and go back to original,
        // we usually manage pages/contexts. The Java code close() and switchTo(0).
        // Assuming this is running in a context with multiple pages.
        const pages = this.page.context().pages();
        if (pages.length > 1) {
            await pages[pages.length - 1].close();
            // The 'this.page' might be the one we closed. We need to ensure we are on the first one.
            // This is a simplification. In a real test, you'd handle the page object update.
        }

        await this.click(this.navigationSection);
        await this.directDepositButton.waitFor({ state: 'visible' });
        await this.click(this.directDepositButton);
        await this.NoDirectDepositMessage.waitFor({ state: 'visible' });
        return await this.NoDirectDepositMessage.isVisible();
    }
}
