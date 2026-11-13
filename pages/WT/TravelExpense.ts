import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class TravelExpense extends BasePage {
    private readonly repeatedExpense: Locator;
    private readonly reasonForTravel: Locator;
    private readonly ChooseDate: Locator;
    private readonly CurrentDate: Locator;
    private readonly OkButton: Locator;
    private readonly SelectExpense: Locator;
    private readonly KilometersCheckbox: Locator;
    private readonly OKButton: Locator;
    private readonly Amount: Locator;
    private readonly UpdateButton: Locator;
    private readonly AdditionalInfo: Locator;
    private readonly NextButton: Locator;
    private readonly OtherExpenseType: Locator;
    private readonly OtherExpenseDescription: Locator;
    private readonly OtherExpenseAmount: Locator;
    private readonly SummaryHeader: Locator;
    private readonly isEmailNeeded: Locator;
    private readonly emailAddress: Locator;
    private readonly declaration: Locator;
    private readonly SubmitButton: Locator;
    private readonly ConfirmationHeader: Locator;
    private readonly DistributionPopUpNo: Locator;

    constructor(page: Page) {
        super(page);
        this.repeatedExpense = page.locator('#repeatedExpense');
        this.reasonForTravel = page.locator('xpath=/html/body/app-root/div/div[4]/div[2]/app-travel-expense/div/table/tfoot/tr/td[2]/div/select');
        this.ChooseDate = page.locator('xpath=//button[@class="btn-wsib"][contains(text(),"Choose date")]');
        this.CurrentDate = page.locator('xpath=//*[contains(@class,"today")]');
        this.OkButton = page.locator('xpath=//button[@class="btn-wsib"][contains(text(),"Ok")]');
        this.SelectExpense = page.locator('#selectButt2');
        this.KilometersCheckbox = page.locator('xpath=(//*[@type="checkbox"])[2]');
        this.OKButton = page.locator('xpath=//button[@class="btn-wsib"][contains(text(),"OK")]');
        this.Amount = page.locator('#travel2Amt2');
        this.UpdateButton = page.locator('xpath=//button[@class="btn-wsib"][contains(text(),"Update")]');
        this.AdditionalInfo = page.locator('#additiionalInfo');
        this.NextButton = page.locator('xpath=//button[@class="btn-wsib"][contains(text(),"Next")]');
        this.OtherExpenseType = page.locator('xpath=//*[@name="newOtherType"]');
        this.OtherExpenseDescription = page.locator('#newexpenseDesc');
        this.OtherExpenseAmount = page.locator('#expAmountNew_en');
        this.SummaryHeader = page.locator('xpath=//h2[contains(text(),"Summary")]');
        this.isEmailNeeded = page.locator('#isEmailNeeded');
        this.emailAddress = page.locator('#emailAddress');
        this.declaration = page.locator('#declared');
        this.SubmitButton = page.locator('xpath=//button[@class="btn-wsib"][contains(text(),"Submit")]');
        this.ConfirmationHeader = page.locator('xpath=//h2[contains(text(),"Submission was successful")]');
        this.DistributionPopUpNo = page.locator('xpath=//*[@id="DistributionPopUpNo"]/div');
    }

    async enterExpenseDetails(
        expenseType: string,
        reason: string,
        expenses: string,
        totalKM: string,
        pubTransit: string,
        parking: string,
        others: string,
        additionalInfo: string
    ): Promise<boolean> {
        await this.repeatedExpense.waitFor({ state: 'visible' });
        if (expenseType.toLowerCase() === 'repeated travel') {
            await this.click(this.repeatedExpense);
            await this.reasonForTravel.selectOption(reason);
            await this.click(this.ChooseDate);
            await this.click(this.CurrentDate);
            await this.click(this.OKButton);
            await this.click(this.SelectExpense);
            if (expenses.toLowerCase() === 'kilometers') {
                await this.click(this.KilometersCheckbox);
                await this.sleep(2000);
                await this.click(this.OkButton);
                await this.enter(this.Amount, totalKM);
            }
            await this.click(this.UpdateButton);
            await this.enter(this.AdditionalInfo, additionalInfo);
            await this.click(this.NextButton);
        }

        await this.OtherExpenseType.waitFor({ state: 'visible' });
        return await this.OtherExpenseType.isVisible();
    }

    async otherExpenseDetails(
        otherExpenseType: string,
        otherExpenseDescription: string,
        otherExpenseAmount: string,
        otherAdditionalInfo: string
    ): Promise<boolean> {
        await this.OtherExpenseType.selectOption(otherExpenseType);
        await this.click(this.ChooseDate);
        await this.click(this.CurrentDate);
        await this.click(this.OKButton);
        await this.enter(this.OtherExpenseDescription, otherExpenseDescription);
        await this.enter(this.OtherExpenseAmount, otherExpenseAmount);
        await this.click(this.UpdateButton);
        await this.enter(this.AdditionalInfo, otherAdditionalInfo);
        await this.click(this.NextButton);
        await this.SummaryHeader.waitFor({ state: 'visible' });
        return await this.SummaryHeader.isVisible();
    }

    async reviewAndSubmit(email: string): Promise<boolean> {
        if (email && email !== '') {
            await this.click(this.isEmailNeeded);
            await this.enter(this.emailAddress, email);
        }
        await this.sleep(5000);
        await this.click(this.declaration);
        await this.click(this.SubmitButton);
        await this.sleep(3000);

        if (await this.DistributionPopUpNo.isVisible()) {
            await this.click(this.DistributionPopUpNo);
        } else {
            console.log('DistributionPopUpNo not displayed');
        }
        await this.sleep(5000);
        return await this.ConfirmationHeader.isVisible();
    }
}
