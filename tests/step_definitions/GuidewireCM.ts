// tests/step_definitions/GuidewireCM.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorldClass } from './world';

Then('Switch to New tab and Login to Contact Manager', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Switch to New tab and Login to Contact Manager')) return;
  const cmUrl = this.config?.CMURL || this.config?.CMUrl || this.config?.cmUrl;
  // 1. Switch to or open the CM tab and capture the new Page instance
  const cmPage = await this.guidewirecm.switchtabCM(cmUrl);
  // Keep the World's page reference updated so subsequent steps use this new tab
  this.page = cmPage;
  // 2. Check environment (e.g., from process.env or this.config)
  const env = (process.env.ENV || this.config?.env || '').toUpperCase();
  if (env === 'BAT' || env === 'PPD' || true) {
    const username = this.config?.GWCM_Username || process.env.GWCM_Username;
    const password = this.config?.GWCM_Password || process.env.GWCM_Password;
    await this.guidewirecm.loginToGWCM(username, password);
  }
});

Then('Search for the Contact using {string} and {string}', async function (this: CustomWorldClass, firstName: string, lastName: string) {
  if (!this.shouldRun('Search for the Contact')) return;
  const fn = firstName.startsWith('<') ? (this.currentRow?.['FirstName'] || this.currentRow?.['First Name'] || 'Auto') : firstName;
  const ln = lastName.startsWith('<') ? (this.currentRow?.['LastName'] || this.currentRow?.['Last Name'] || 'Test') : lastName;
  const wcbid = this.currentRow?.['WCB Id'] || this.currentRow?.['WCB ID'] || '';
  const cm = this.guidewirecm as any;
  if (typeof cm.searchContactInGWCM === 'function') {
    await cm.searchContactInGWCM(fn, ln, wcbid);
  } else if (typeof cm.searchContact === 'function') {
    await cm.searchContact(fn, ln);
  } else {
    await cm.searchFirstNameAndLastName?.(fn, ln);
  }
});

Then('Verify the Direct Deposit is displayed in ContactManager', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Direct Deposit in CM')) return;
  const transitNumber = this.currentRow?.['TransitNumber'] || this.currentRow?.['transitnumber'] || '12345';
  const bankNumber = this.currentRow?.['InstitutionNumber'] || this.currentRow?.['banknumber'] || '004';
  const accountNumber = this.currentRow?.['AccountNumber'] || this.currentRow?.['accountnumber'] || '1234567';
  const cm = this.guidewirecm as any;
  if (typeof cm.verifyDDUpdateInGWCM === 'function') {
    await cm.verifyDDUpdateInGWCM(transitNumber, bankNumber, accountNumber);
  } else {
    await cm.verifyDirectDepositUpdateInGWCM?.();
  }
});

Then('Remove the Direct Deposit from the Contact', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Remove Direct Deposit from Contact')) return;
  const transitNumber = this.currentRow?.['TransitNumber'] || this.currentRow?.['transitnumber'] || '12345';
  const bankNumber = this.currentRow?.['InstitutionNumber'] || this.currentRow?.['banknumber'] || '004';
  const accountNumber = this.currentRow?.['AccountNumber'] || this.currentRow?.['accountnumber'] || '1234567';
  await (this.guidewirecm as any).VerifyDDRemoveInGWCM(transitNumber, bankNumber, accountNumber);
});

Then('Verify the Mailing address is updated along with history events in Contact Manager', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Mailing address in CM')) return;
  const address = this.currentRow?.['Address Line1'] || '140 Erskine Ave';
  const city = this.currentRow?.['City'] || 'Toronto';
  const postalCode = this.currentRow?.['Postal Code'] || 'M4P 1Z2';
  await (this.guidewirecm as any).verifyMailingAddressUpdateInGWCM(address, city, postalCode);
});

Then('Verify the Phone Number is updated along with history events in Contact Manager', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Phone Number in CM')) return;
  const phone = this.currentRow?.['Phone Number'] || '647-800-0000';
  await (this.guidewirecm as any).verifyPhoneNumberUpdateInGWCM(phone);
});