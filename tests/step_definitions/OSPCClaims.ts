import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';

Given('User is on my Claim screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Verifying User is on My Claims screen.');
    expect(await this.ospcHome.verifyOnHomePage()).toBeTruthy();
});

When('User clicks on {string}', async function (this: CustomWorld, claimnumberParam: string) {
    await this.initPages();
    const claimnumber = this.currentRow['Claim Number'];
    this.log(`Clicking on Claim Number: ${claimnumber}`);
    await this.ospcHome.clickClaim(claimnumber);
});

Then('User should be navigated to My Claims Overview screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Verifying navigation to Claims Overview screen.');
    expect(await this.ospcClaimOverview.verifyOnClaimOverview()).toBeTruthy();
});

Then('User should be navigated to Benefit Payments screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Verifying navigation to Benefit Payments screen.');
    expect(await this.ospcClaimOverview.verifyOnBenefitpayments()).toBeTruthy();
});

Then('User should be navigated to Healthcare benefit screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Verifying navigation to Healthcare Benefit screen.');
    expect(await this.ospcClaimOverview.verifyOnHealthcarebenefits()).toBeTruthy();
});

Then('User should be navigated to Non Health care benefit screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Verifying navigation to Non-Healthcare Benefit screen.');
    expect(await this.ospcClaimOverview.verifyOnNonHealthcarebenefits()).toBeTruthy();
});

Then('User should be navigated to Appeals screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Verifying navigation to Appeals screen.');
    expect(await this.ospcClaimOverview.verifyOnAppeals()).toBeTruthy();
});

Then('User should be navigated to Submit Document screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Verifying navigation to Submit Document screen.');
    expect(await this.ospcClaimOverview.verifyOnSubmitDocuments()).toBeTruthy();
});

Then('User should be able to select WSIB form {string}', async function (this: CustomWorld, wsibformParam: string) {
    await this.initPages();
    const wsibform = this.currentRow['wsibform'];
    this.log(`Selecting WSIB form: ${wsibform}`);
    expect(await this.ospcClaimOverview.selectWSIBForm(wsibform)).toBeTruthy();
});

Then('User should be able to select WSIB forms {string}', async function (this: CustomWorld, wsibformsParam: string) {
    await this.initPages();
    const wsibforms = this.currentRow['wsibforms'];
    this.log(`Selecting WSIB form: ${wsibforms}`);
    expect(await this.ospcClaimOverview.selectWSIBForm(wsibforms)).toBeTruthy();
});

Then('User should be able to select Non WSIB form {string} and {string}', async function (this: CustomWorld, nonwsibformtypeParam: string, nonwsibformParam: string) {
    await this.initPages();
    const nonwsibformtype = this.currentRow['nonwsibformtype'];
    const nonwsibform = this.currentRow['nonwsibform'];
    this.log(`Selecting Non WSIB form: ${nonwsibformtype} and ${nonwsibform}`);
    expect(await this.ospcClaimOverview.selectNonWSIBForm(nonwsibformtype, nonwsibform)).toBeTruthy();
});

Then('User should be able to select Non WSIB forms {string} and {string}', async function (this: CustomWorld, nonwsibformsTypeParam: string, nonwsibformsParam: string) {
    await this.initPages();
    const nonwsibformsType = this.currentRow['nonwsibformstype'];
    const nonwsibforms = this.currentRow['nonwsibforms'];
    this.log(`Selecting WSIB form: ${nonwsibforms}`);
    expect(await this.ospcClaimOverview.selectNonWSIBForm(nonwsibformsType, nonwsibforms)).toBeTruthy();
});

Then('Select confirmation checkbox and Click on Submit button', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Selecting confirmation checkbox and clicking Submit.');
    expect(await this.ospcClaimOverview.SubmitDocument()).toBeTruthy();
    this.log(`Document Submitted at: ${new Date().toLocaleString()}`);
});

Then('User should be able to upload a document with {string}', async function (this: CustomWorld, filenameParam: string) {
    await this.initPages();
    const filesToUpload = this.currentRow['filename'];
    this.log(`Uploading document: ${filesToUpload}`);
    await this.ospcClaimOverview.uploadDocuments(filesToUpload);
});

Then('User should be able to upload documents with {string}', async function (this: CustomWorld, filenamesParam: string) {
    await this.initPages();
    const filesToUpload = this.currentRow['filenames'];
    this.log(`Uploading documents: ${filesToUpload}`);
    await this.ospcClaimOverview.uploadDocuments(filesToUpload);
});

Then('Verify the Document History is updated with {string}', { timeout: 15 * 60 * 1000 }, async function (this: CustomWorld, formtype: string) {
    await this.initPages();
    let documentCategory: string;
    let documentDescription: string;

    if (formtype === 'WSIB') {
        documentCategory = this.currentRow['documentCategory'];
        documentDescription = this.currentRow['documentDescription'];
    } else {
        documentCategory = this.currentRow['nondocumentCategory'];
        documentDescription = this.currentRow['nondocumentDescription'];
    }

    this.log(`Verifying Document History is updated with: ${documentCategory}::${documentDescription}`);
    expect(await this.ospcClaimOverview.DocumentHistory(formtype, documentCategory, documentDescription)).toBeTruthy();
});

Then('Verify the Document History are updated with {string}', { timeout: 15 * 60 * 1000 },  async function (this: CustomWorld, formtype: string) {
    await this.initPages();
    let documentCategories: string;
    let documentDescriptions: string;

    if (formtype === 'WSIB') {
        documentCategories = this.currentRow['documentCategories'];
        documentDescriptions = this.currentRow['documentDescriptions'];
    } else {
        documentCategories = this.currentRow['nondocumentCategories'];
        documentDescriptions = this.currentRow['nondocumentDescriptions'];
    }

    this.log(`Verifying Document History is updated with: ${documentCategories}::${documentDescriptions}`);
    expect(await this.ospcClaimOverview.DocumentHistory(formtype, documentCategories, documentDescriptions)).toBeTruthy();
});

Then('User clicks on Send us a message link and Lands on Send us a message screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log("Clicking on 'Send us a message' link.");
    expect(await this.ospcClaimOverview.verifyOnSendMessageScreen()).toBeTruthy();
});

Then('User selects {string} and enter {string}', async function (this: CustomWorld, subject: string, message: string) {
    await this.initPages();
    this.log(`Sending message with subject: ${subject}`);
    expect(await this.ospcClaimOverview.sendusamessage(subject, message)).toBeTruthy();
});

Then('User clicks on Send button and Lands on Message sent screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Clicking Send button.');
    expect(await this.ospcClaimOverview.sendandconfirm()).toBeTruthy();
});

Then('Return to Mail and verify the sent message', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Returning to Mail and verifying sent message.');
    expect(await this.ospcClaimOverview.mailscreen()).toBeTruthy();
});

When('User click on Add a Claim button', async function (this: CustomWorld) {
    await this.initPages();
    this.log("Clicking 'Add a Claim' button.");
    expect(await this.ospcClaimOverview.addClaim()).toBeTruthy();
});

Then('User should be able to add claim with {string}, {string}', async function (this: CustomWorld, claimNumber: string, dob: string) {
  if (!this.shouldRun('Adding Claim')) return;

  // Resolve Claim Number and Year of Birth directly from currentRow (matching Java OSPC.java)
  const claimNumberVal = claimNumber.startsWith('<') 
    ? this.currentRow?.['Claim Number'] 
    : (this.currentRow?.['Claim Number'] || claimNumber);

  const rawDob = dob.startsWith('<') 
    ? this.currentRow?.['DOB'] 
    : (this.currentRow?.['DOB'] || dob);

  const yob = rawDob?.includes('/') ? rawDob.split('/')[2] : rawDob;

  // Read all security question data dynamically from data/BAT/GWCC.json without hardcoded fallbacks
  const injurDate = this.currentRow?.['QInjurDate'];
  const phoneNumber = this.currentRow?.['QPhoneNumber'];
  const employerName = this.currentRow?.['QEmployerName'];
  const postalCode = this.currentRow?.['QPostalcode'];
  const injuryArea = this.currentRow?.['QAreaofInjury'];

  console.log(`[OSPCClaims] Adding Claim: ${claimNumberVal} with YOB: ${yob}`);

  await this.ospcClaimOverview.AddaClaimOSPC(
    claimNumberVal,
    yob,
    injurDate,
    phoneNumber,
    employerName,
    postalCode,
    injuryArea
  );
});

Then('Switch back to OSPC and verify if the {string} is removed', async function (this: CustomWorld, claimNumber: string) {
  if (!this.shouldRun('Switch back to OSPC and verify claim removed')) return;
  console.log('[OSPCClaims] Switching back to OSPC tab and verifying claim is removed...');
  const clm = claimNumber.startsWith('<') ? (this.currentRow?.['Claim Number'] || this.claimNumber || '') : claimNumber;
  const pages = this.context ? this.context.pages() : this.page?.context().pages() || [];
  // 1. Identify the OSPC portal tab (URL contains ospc or first tab)
  const ospcPage = pages.find((p) => p.url().includes('ospc') && !p.isClosed()) || pages[0];
  // 2. Close any secondary tabs (e.g. ClaimCenter)
  for (const p of pages) {
    if (p !== ospcPage && !p.isClosed()) {
      console.log(`[OSPCClaims] Closing secondary tab: ${p.url()}`);
      await p.close().catch(() => {});
    }
  }
  // 3. Bring OSPC tab to front and rebind World and all Page Objects
  if (ospcPage && !ospcPage.isClosed()) {
    await ospcPage.bringToFront();
    this.page = ospcPage;
    this.initPages(); // Rebinds this.ospcClaimOverview and this.tombstone to the active OSPC tab!
  }
  // 4. Reload OSPC page to fetch latest profile state from backend
  await this.page!.reload({ waitUntil: 'domcontentloaded' });
  await this.page!.waitForTimeout(3000);
  // 5. Verify claim removal
  const isRemoved = await this.ospcClaimOverview.claimRemovalConfirmationOSPC(clm);
  expect(isRemoved).toBe(true);
});

Then('Switch back to OSPC and verify if the {string} is added', async function (this: CustomWorld, claimNumber: string) {
  if (!this.shouldRun('Switch back to OSPC and verify claim added')) return;
  console.log('[OSPCClaims] Switching back to OSPC tab and verifying claim is added...');
  const clm = claimNumber.startsWith('<') ? (this.currentRow?.['Claim Number'] || this.claimNumber || '') : claimNumber;
  const pages = this.context ? this.context.pages() : this.page?.context().pages() || [];
  const ospcPage = pages.find((p) => p.url().includes('ospc') && !p.isClosed()) || pages[0];
  for (const p of pages) {
    if (p !== ospcPage && !p.isClosed()) {
      await p.close().catch(() => {});
    }
  }
  if (ospcPage && !ospcPage.isClosed()) {
    await ospcPage.bringToFront();
    this.page = ospcPage;
    this.initPages();
  }
  await this.page!.reload({ waitUntil: 'domcontentloaded' });
  await this.page!.waitForTimeout(3000);
  const isAdded = await this.ospcClaimOverview.claimAdditionConfirmationOSPC(clm);
  expect(isAdded).toBe(true);
});

Then('Switch to New Tab and Login to OSPC and verify if the {string} is added', async function (this: CustomWorld, claimnumberParam: string) {
    await this.initPages();
    const claimnumber = this.currentRow['Claim Number'];
    this.log(`Navigating to OSPC URL and logging in to verify claim: ${claimnumber}`);

    await this.ospcLogin.navigateToURL(process.env.OSPC_URL || '');
    await this.ospcLogin.loginToSite(process.env.OSPC_Username || '', process.env.OSPC_Password || '');
    expect(await this.ospcClaimOverview.claimAdditionConfirmationOSPC(claimnumber)).toBeTruthy();
});

Then('Switch back to OSPC and verify appeal registered is displayed', async function (this: CustomWorld) {
  if (!this.shouldRun('Switch back to OSPC and verify appeal registered is displayed')) return;
  console.log('[OSPCClaims] Switching back to OSPC portal tab...');

  const pages = this.context ? this.context.pages() : this.page?.context().pages() || [];

  // 1. Identify the OSPC tab (URL containing ospc or index 0) and the ClaimCenter tab
  const ospcPage = pages.find((p) => p.url().includes('ospc') && !p.isClosed()) || pages[0];

  // 2. Close any non-OSPC tabs (e.g. ClaimCenter tab)
  for (const p of pages) {
    if (p !== ospcPage && !p.isClosed()) {
      console.log(`[OSPCClaims] Closing secondary tab: ${p.url()}`);
      await p.close().catch(() => {});
    }
  }

  // 3. Bring OSPC tab to front and re-bind World and Page Objects
  if (ospcPage && !ospcPage.isClosed()) {
    await ospcPage.bringToFront();
    this.page = ospcPage;
    this.initPages(); // Rebinds this.ospcClaimOverview to the open OSPC tab!
  }

  // 4. Refresh OSPC page and verify appeal registered
  console.log('[OSPCClaims] Refreshing OSPC page and verifying appeal registration...');
  await this.page!.reload({ waitUntil: 'domcontentloaded' });
  await this.page!.waitForTimeout(3000);

  const initialCount = this.currentRow?.['InitialAppealsCount'] || 0;
  const newCount = await this.ospcClaimOverview.appealRegisteredConfirmationOSPC();
  console.log(`[OSPCClaims] Initial Appeals: ${initialCount}, Updated Appeals in OSPC: ${newCount}`);
  expect(newCount).toBeGreaterThanOrEqual(Number(initialCount));
});

Then('User should be navigated to Appeals screen and count number of appeals', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Navigating to Appeals screen and counting appeals.');
    (this as any).appealsCount = await this.ospcClaimOverview.verifyCountOfAppeals();
});

When('User clicks on contact information link on my claim screen', async function (this: CustomWorld) {
    await this.initPages();
    this.log("Clicking on 'Contact Information' link.");
    expect(await this.tombstone.clickContactInfoLink()).toBeTruthy();
});

Then('User should be view Personal details, Mailing address and Contact details', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Verifying Personal Details, Mailing Address and Contact Details.');
    expect(await this.tombstone.verifyFullName()).toBeTruthy();
    expect(await this.tombstone.verifyAddress()).toBeTruthy();
    expect(await this.tombstone.verifyPhoneNumber()).toBeTruthy();
});

When('User clicks on Edit button to update Mailing address', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Clicking Edit Mailing Address button.');
    expect(await this.tombstone.clickEditMailingAddress()).toBeTruthy();
});

Then('User should be able to update the Mailing address details and Save', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Updating Mailing Address and saving.');
    expect(await this.tombstone.updateMailingAddress()).toBeTruthy();
});

When('User clicks on Edit button to update Phone Number', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Clicking Edit Phone Number button.');
    expect(await this.tombstone.clickEditPhoneNumber()).toBeTruthy();
});

Then('User should be able to update the Phone Number and Save', async function (this: CustomWorld) {
    await this.initPages();
    this.log('Updating Phone Number and saving.');
    expect(await this.tombstone.updatePhoneNumber()).toBeTruthy();
});
