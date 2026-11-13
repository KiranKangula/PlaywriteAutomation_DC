import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class ReviewandConfirm extends BasePage {
    private readonly Signature: Locator;
    private readonly PrintButton: Locator;
    private readonly SubmitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.Signature = page.locator('xpath=//*[@name="signature"]');
        this.PrintButton = page.locator('xpath=//*[@aria-label="print a copy of your submission"]');
        this.SubmitButton = page.locator('xpath=(//button[@role="button" and contains(., "Submit")])[1]');
    }

    async reviewandSubmitNIHLClaim(): Promise<void> {
        await this.Signature.waitFor({ state: 'visible' });
        await this.enter(this.Signature, 'Signature');
        await this.click(this.SubmitButton);
        await this.sleep(5000);
    }

    async verifyClaimSubmitted(): Promise<boolean> {
        await this.PrintButton.waitFor({ state: 'visible' });
        return await this.PrintButton.isVisible();
    }
}
