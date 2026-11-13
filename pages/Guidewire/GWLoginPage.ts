// pages/Guidewire/GWLoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWLoginPage extends BasePage {
    private readonly usernameTextField: Locator;
    private readonly passwordTextField: Locator;
    private readonly loginButton: Locator;
    private readonly GWCCLogout: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameTextField = page.locator('#Login\\:LoginScreen\\:LoginDV\\:username');
        this.passwordTextField = page.locator('#Login\\:LoginScreen\\:LoginDV\\:password');
        this.loginButton = page.locator('#Login\\:LoginScreen\\:LoginDV\\:submit');
        this.GWCCLogout = page.locator('#TabBar\\:LogoutTabBarLink');
    }

    async loginToGWCC(username: string, password: string): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');

        // Check if top_frame exists or wait for it to attach
        let frame = this.page.frame('top_frame');
        if (!frame) {
            await this.page.waitForSelector('frame[name="top_frame"]', { state: 'attached', timeout: 15000 }).catch(() => null);
            frame = this.page.frame('top_frame');
        }

        // Scope to top_frame if present, otherwise main page
        const scope = frame || this.page;

        const frameUsername = scope.locator('#Login\\:LoginScreen\\:LoginDV\\:username');
        const framePassword = scope.locator('#Login\\:LoginScreen\\:LoginDV\\:password');
        const frameLoginButton = scope.locator('#Login\\:LoginScreen\\:LoginDV\\:submit');

        // Check if login fields are visible (user might already have an active session)
        const isLoginVisible = await frameUsername
            .waitFor({ state: 'visible', timeout: 10000 })
            .then(() => true)
            .catch(() => false);

        if (isLoginVisible) {
            console.log(`[GWLoginPage] Entering GWCC Username: ${username}`);
            await this.enter(frameUsername, username);
            await this.enter(framePassword, password);
            await this.click(frameLoginButton);
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
            console.log('✅ [GWLoginPage] Successfully logged into ClaimCenter.');
        } else {
            console.log('User has already logged in, login page is not displayed');
        }
    }

    async GWCClogout(): Promise<void> {
        let frame = this.page.frame('top_frame');
        const scope = frame || this.page;
        const logout = scope.locator('#TabBar\\:LogoutTabBarLink');
        if (await logout.isVisible().catch(() => false)) {
            await this.click(logout);
        } else {
            await this.click(this.GWCCLogout);
        }
    }

    async verifyonGWCC(): Promise<boolean> {
        let frame = this.page.frame('top_frame');
        if (!frame) {
            await this.page.waitForSelector('frame[name="top_frame"]', { state: 'attached', timeout: 10000 }).catch(() => null);
            frame = this.page.frame('top_frame');
        }
        const scope = frame || this.page;
        const frameUsername = scope.locator('#Login\\:LoginScreen\\:LoginDV\\:username');
        return await frameUsername.isVisible();
    }

    async switchtab(gwUrl: string): Promise<Page> {
        console.log(`[GWLoginPage] Opening new tab for ClaimCenter: ${gwUrl}`);
        const newPage = await this.page.context().newPage();
        await newPage.goto(gwUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        this.page = newPage;
        return newPage;
    }
}