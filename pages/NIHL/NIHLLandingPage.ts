import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class NIHLLandingPage extends BasePage {
    private readonly NewClaimButton: Locator;
    private readonly GradualOption: Locator;
    private readonly SuddenOption: Locator;
    private readonly Email: Locator;
    private readonly DateofBirthDay: Locator;
    private readonly DateofBirthMonth: Locator;
    private readonly DateofBirthYear: Locator;
    private readonly StartClaimButton: Locator;
    private readonly ContinueClaimButton: Locator;
    private readonly ReferenceNumber: Locator;
    private readonly ContinueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.NewClaimButton = page.locator('#btnNewClaim');
        this.GradualOption = page.locator('#gradual');
        this.SuddenOption = page.locator('#sudden');
        this.Email = page.locator('#email');
        this.DateofBirthDay = page.locator('#dob_day');
        this.DateofBirthMonth = page.locator('#dob_month');
        this.DateofBirthYear = page.locator('#dob_year');
        this.StartClaimButton = page.locator('#continue');
        this.ContinueClaimButton = page.locator('xpath=//*[@aria-label="Continue a claim"]');
        this.ReferenceNumber = page.locator('#refNo');
        this.ContinueButton = page.locator('#continue');
    }

    async verifyOnNIHLLandingPage(): Promise<boolean> {
        await this.NewClaimButton.waitFor({ state: 'visible' });
        return await this.NewClaimButton.isVisible();
    }

    async ClickGradualRadioButton(): Promise<boolean> {
        await this.click(this.NewClaimButton);
        await this.GradualOption.waitFor({ state: 'visible' });
        await this.click(this.GradualOption);
        return await this.Email.isVisible();
    }

    async EnterUserDetails(email: string, dob: string): Promise<void> {
        await this.enter(this.Email, email);
        const dobParts = dob.split('/');
        // Assuming GWSelect was a helper to select from dropdown
        await this.DateofBirthDay.selectOption(dobParts[0]);
        await this.DateofBirthMonth.selectOption(dobParts[1]);
        await this.DateofBirthYear.selectOption(dobParts[2]);
        await this.click(this.StartClaimButton);
    }
}
