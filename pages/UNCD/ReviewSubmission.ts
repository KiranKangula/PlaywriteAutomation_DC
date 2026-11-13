import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class ReviewSubmission extends BasePage {
    private readonly emailconfirmation: Locator;
    private readonly declaration: Locator;
    private readonly SubmitButton: Locator;
    private readonly printLink: Locator;
    private readonly reviewHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.emailconfirmation = page.locator('xpath=(//*[@type="checkbox"])[1]');
        this.declaration = page.locator('xpath=(//*[@type="checkbox"])[2]');
        this.SubmitButton = page.locator('xpath=//*[@type="submit"]');
        this.printLink = page.locator('xpath=//button[@class="link"]');
        this.reviewHeader = page.locator('#region-review');
    }

    async submitDocument(): Promise<boolean> {
        await this.reviewHeader.waitFor({ state: 'visible' });
        await this.click(this.emailconfirmation);
        await this.click(this.declaration);
        await this.click(this.SubmitButton);
        await this.printLink.waitFor({ state: 'visible' });
        return await this.printLink.isVisible();
    }

    async verifyOnConfirmationScreen(): Promise<boolean> {
        await this.printLink.waitFor({ state: 'visible' });
        return await this.printLink.isVisible();
    }
}
