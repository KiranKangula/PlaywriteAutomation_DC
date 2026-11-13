import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_EmployerDetails extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly employerDetailsHeading: Locator;
    private readonly ReferenceNumber: Locator;
    private readonly onBoardContinueId: Locator;
    private readonly dropdownYear: Locator;
    private readonly SearchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal show"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.employerDetailsHeading = this.page.locator('#employerDetailsHeading');
        this.ReferenceNumber = this.page.locator('xpath=//*[@id="claimsNumberBody"]/p');
        this.onBoardContinueId = this.page.locator('#onBoardContinueId');
        this.dropdownYear = this.page.locator('#dropdownYear-wrapper');
        this.SearchButton = this.page.locator('#Button');
    }

    async enterEmployerDetails(mailingaddress: string, branchAddress: string, businessYear: string, naicsCode: string): Promise<string> {
        await this.employerDetailsHeading.waitFor({ state: 'visible' });
        await this.click(this.NextButton);
        const RefNum = await this.ReferenceNumber.innerText();
        await this.click(this.onBoardContinueId);
        console.log(`E-Form 7 Reference Number is: ${RefNum}`);

        await this.page.locator(`label:has-text("${mailingaddress}")`).click();
        await this.click(this.NextButton);
        await this.page.locator(`label:has-text("${branchAddress}")`).click();
        await this.click(this.NextButton);

        const currentYear = new Date().getFullYear();
        if (parseInt(businessYear) !== currentYear + 1) {
            await this.page.locator('label:has-text("Pick")').click();
            await this.selectJutroDropdownOption('dropdownYear', businessYear);
            await this.click(this.SearchButton);
        }

        await this.page.locator(`label:has-text("${naicsCode}")`).click();
        await this.click(this.NextButton);
        return RefNum;
    }
}
