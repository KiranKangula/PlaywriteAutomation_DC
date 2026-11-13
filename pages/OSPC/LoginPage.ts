// pages/OSPC/LoginPage.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class LoginPage extends BasePage {
  // Selectors matching Java LoginPage.java:
  // @FindBy(xpath = "//input[@id='email' or @id='signInName']")
  readonly usernameTextField: Locator;
  // @FindBy(xpath = "//input[@id='password']")
  readonly passwordTextField: Locator;
  // @FindBy(xpath = "//button[@id='next']")
  readonly loginButton: Locator;

  // MFA Selectors matching Java LoginPage.java
  readonly mfaMethod_phone: Locator;
  readonly mfaNextButton: Locator;
  readonly mfaCallMeButton: Locator;
  readonly mfaRememberMe_true: Locator;
  readonly mfaSubmitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameTextField = page.locator("//input[@id='email' or @id='signInName']");
    this.passwordTextField = page.locator("//input[@id='password']");
    this.loginButton = page.locator("//button[@id='next']");

    this.mfaMethod_phone = page.locator("(//input[contains(@id, 'extension_oaMfaMethod')])[2]");
    this.mfaNextButton = page.locator("//*[@id='continue']");
    this.mfaCallMeButton = page.locator("//*[@id='mfaPhoneMethod_phone']");
    this.mfaRememberMe_true = page.locator("//*[@id='mfaRememberMe_true']");
    this.mfaSubmitButton = page.locator("//*[@id='continue']");
  }

  /**
   * Navigates to a specific URL (used in OSPCClaims.ts)
   */
  async navigateToURL(url: string): Promise<void> {
    console.log(`[LoginPage] Navigating to URL: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async verifyOnLoginPage(): Promise<boolean> {
    await this.usernameTextField.first().waitFor({ state: 'visible', timeout: 30000 });
    return await this.usernameTextField.first().isVisible();
  }

  async loginToSite(username: string, password: string): Promise<void> {
    if (!username || !password) {
      throw new Error(
        `[LoginPage] Cannot login! Username or password is empty or undefined. Received: username="${username}", password="${password ? '***' : password}"`
      );
    }

    console.log(`[LoginPage] Entering username: ${username}`);
    await this.usernameTextField.first().waitFor({ state: 'visible', timeout: 30000 });
    await this.usernameTextField.first().click();
    await this.usernameTextField.first().fill(username);

    console.log(`[LoginPage] Entering password...`);
    await this.passwordTextField.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordTextField.first().click();
    await this.passwordTextField.first().fill(password);

    console.log(`[LoginPage] Clicking login button...`);
    await this.loginButton.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.loginButton.first().click();

    // Check MFA after 3 seconds (matching Java LoginPage.java: Sleep(3000))
    await this.page.waitForTimeout(3000);

    const isMfaVisible = await this.mfaMethod_phone
  .first()
  .waitFor({ state: 'visible', timeout: 10000 })
  .then(() => true)
  .catch(() => false);
    if (isMfaVisible) {
      console.log('[LoginPage] MFA detected, proceeding with phone verification...');
      await this.mfaMethod_phone.first().click();
      await this.mfaNextButton.first().click();
      await this.mfaCallMeButton.first().click();
      await this.mfaNextButton.first().click();
      await this.mfaRememberMe_true.first().waitFor({ state: 'visible', timeout: 15000 });
      await this.mfaRememberMe_true.first().click();
      await this.mfaSubmitButton.first().click();
    } else {
      console.log(' MFA is not enabled...');
    }
  }
}