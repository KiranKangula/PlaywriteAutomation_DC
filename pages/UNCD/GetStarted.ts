import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GetStarted extends BasePage {
    private readonly edob: Locator;
    private readonly uncd: Locator;
    private readonly getStartedHeader: Locator;
    private readonly nextButton: Locator;

    constructor(page: Page) {
        super(page);
        this.edob = page.locator("//*[@value='edob']");
        this.uncd = page.locator("//*[@value='uncd']");
        this.getStartedHeader = page.locator("#region-info");
        this.nextButton = page.locator("//*[@type='submit']");
    }

    async navigateToURL(url: string) {
        await this.page.goto(url);
    }

    async verifyOnGetStartedPage(): Promise<boolean> {
        await this.getStartedHeader.waitFor({ state: 'visible' });
        return await this.getStartedHeader.isVisible();
    }

    async selectNumberedDocument() {
        await this.click(this.nextButton);
    }

    async selectUnNumberedDocument() {
        await this.click(this.uncd);
        await this.click(this.nextButton);
    }
}
