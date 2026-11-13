import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';

When('User clicks on Direct Deposit', async function (this: CustomWorld) {
    await this.initPages();
    console.log('Clicking on Direct Deposit link.');
    expect(await this.ospcDirectDeposit!.LandOnDirectDeposit()).toBe(true);
});

Then('Verify your identity to set up and manage direct deposit', async function (this: CustomWorld) {
    await this.initPages();
    console.log('Verify your identity to set up and manage direct deposit: ');
    expect(await this.ospcDirectDeposit!.AddDirectDepositInformation()).toBe(true);
});

Then('Enter banking information and Confirm details', async function (this: CustomWorld) {
    await this.initPages();
    const transit = this.currentRow?.['TransitNumber'] || '';
    const institution = this.currentRow?.['InstitutionNumber'] || '';
    const accountNumber = this.currentRow?.['AccountNumber'] || '';

    console.log(`Entering Direct Deposit details: Transit=${transit}, Institution=${institution}`);
    expect(await this.ospcDirectDeposit!.AddandValidateDDInformation(transit, institution, accountNumber)).toBe(true);

    const claimNumber = await this.ospcDirectDeposit!.getClaimNumberfromOSPC();
    (this as any).claimNumber = claimNumber;
    console.log(`Captured Claim Number: ${claimNumber}`);
});

Then('Remove the Direct Deposit from the Claim', async function (this: CustomWorld) {
    await this.initPages();
    console.log('Removing Direct Deposit from the Claim in GWCC.');
    expect(await this.gwParticipants!.removeDirectDeposit()).toBe(true);
});

Then('Verify the Direct Deposit is not displayed in OSPC', async function (this: CustomWorld) {
    await this.initPages();
    console.log('Verifying Direct Deposit removal in OSPC.');
    expect(await this.ospcDirectDeposit!.verifyDirectDepositRemovalinOSPC()).toBe(true);
});

Then('Click Edit direct Deposit information and Select {string} and {string}', async function (this: CustomWorld, monthParam: string, yearParam: string) {
    await this.initPages();
    const dob = this.currentRow?.['DOB'] || '';

    // Mimicking getDateFormat(dob, "d/MMMM/yyyy", "dd/M/yyyy")
    // Assuming dob is in a format like "1 January 2000"
    const date = new Date(dob);
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    console.log(`Editing Direct Deposit information for DOB Month: ${month}, Year: ${year}`);
    expect(await this.ospcDirectDeposit!.editDirectDepositInformation(month, year)).toBe(true);
});

// Then('Verify the Direct Deposit is displayed in ClaimCenter', async function (this: CustomWorld) {
//     await this.initPages();
//     // ExternalValidation check is omitted as per general migration patterns unless specifically required
//     expect(await this.gwParticipants!.addDirectDeposit()).toBe(true);
// });
