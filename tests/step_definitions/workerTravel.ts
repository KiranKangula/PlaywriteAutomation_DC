import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';

Given('User is on landing page', async function (this: CustomWorld) {
    await this.initPages();
    console.log('Verifying User is on Claimant Information Page.');
    expect(await this.wtLandingPage!.verifyOnClaimantInformationPage()).toBe(true);
});

When('User enters claimant information such as {string}, {string}, {string}', async function (this: CustomWorld, claimnumberParam: string, lastnameParam: string, dateOfbirthParam: string) {
    await this.initPages();
    const claimnumber = this.currentRow?.['Claim Number'] || claimnumberParam;
    const lastname = this.currentRow?.['lastname'] || lastnameParam;
    const dateofbirth = this.currentRow?.['dateofbirth'] || dateOfbirthParam;
    console.log(`Entering Claimant Information: Claim=${claimnumber}, Last Name=${lastname}, DOB=${dateofbirth}`);
    await this.wtLandingPage!.ValidateClaimantInformation(claimnumber, lastname, dateofbirth);
});

Then('Enter data in Travel Expense screen', async function (this: CustomWorld) {
    await this.initPages();
    const expenseType = this.currentRow?.['expenseType'] || '';
    const reason = this.currentRow?.['Reason'] || '';
    const expenses = this.currentRow?.['Expenses'] || '';
    const totalKM = this.currentRow?.['TotalKM'] || '';
    const pubTransit = this.currentRow?.['PubTransit'] || '';
    const parking = this.currentRow?.['Parking'] || '';
    const others = this.currentRow?.['Others'] || '';
    const additionalInfo = this.currentRow?.['AdditionalInfo'] || '';
    console.log(`Entering Travel Expense details for type: ${expenseType}`);
    expect(await this.travelExpense!.enterExpenseDetails(expenseType, reason, expenses, totalKM, pubTransit, parking, others, additionalInfo)).toBe(true);
});

Then('Enter data in Other Expenses screen', async function (this: CustomWorld) {
    await this.initPages();
    const otherExpenseType = this.currentRow?.['OtherExpenseType'] || '';
    const otherExpenseDescription = this.currentRow?.['OtherExpenseDescription'] || '';
    const otherExpenseAmount = this.currentRow?.['OtherExpenseAmount'] || '';
    const otherAdditionalInfo = this.currentRow?.['OtherAdditionalInfo'] || '';
    console.log(`Entering Other Expenses: Type=${otherExpenseType}, Amount=${otherExpenseAmount}`);
    expect(await this.travelExpense!.otherExpenseDetails(otherExpenseType, otherExpenseDescription, otherExpenseAmount, otherAdditionalInfo)).toBe(true);
});

Then('User should be able to review and Submit the application', async function (this: CustomWorld) {
    await this.initPages();
    const email = this.currentRow?.['email'] || '';
    console.log(`Reviewing and submitting the application for email: ${email}`);
    expect(await this.travelExpense!.reviewAndSubmit(email)).toBe(true);
    console.log(`Submission Submitted at: ${new Date().toLocaleString()}`);
});
