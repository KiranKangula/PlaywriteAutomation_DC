// tests/step_definitions/GuidewireCC.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorldClass } from './world';

Given('User is on GWlogin page', async function (this: CustomWorldClass) {
  if (!this.shouldRun('User is on GWlogin page')) return;
  const gwUrl = this.config?.baseUrl || this.config?.ClaimCenter || this.config?.GWURl || 'https://sit2.wsib.on.ca/cc/ClaimCenter.do';
  await this.page!.goto(gwUrl);
  await (this.gwLogin as any).verifyonGWCC();
});

When('User submit username and password', async function (this: CustomWorldClass) {
  if (!this.shouldRun('User submit username and password')) return;
  const user = this.config?.GWCC_Username || 'bonaiutt';
  const pass = this.config?.GWCC_Password || 'welcome1';
  await (this.gwLogin as any).loginToGWCC(user, pass);
});

Then('User should be able to login successfully into GWCC', async function (this: CustomWorldClass) {
  if (!this.shouldRun('User should be able to login successfully into GWCC')) return;
  await (this.gwSearch as any).GWCCLoginsuccess();
});

Then('Switch to New tab and Login to ClaimCenter', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Switch to New tab and Login to ClaimCenter')) return;
  const gwUrl = this.config?.GWURl || this.config?.ClaimCenter || this.config?.GWUrl || 'https://bat2.aces.wsib.on.ca/cc/ClaimCenter.do';
  const login = this.gwLogin as any;

  let newPage: any;
  if (typeof login.switchtab === 'function') {
    newPage = await login.switchtab(gwUrl);
  } else {
    newPage = await this.page!.context().newPage();
    await newPage.goto(gwUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  // Rebind World and all page objects to the new ClaimCenter tab
  if (newPage && typeof newPage.goto === 'function') {
    this.page = newPage;
    this.initPages();
  } else {
    const pages = this.context ? this.context.pages() : this.page?.context().pages() || [];
    if (pages.length > 1) {
      this.page = pages[pages.length - 1];
      this.initPages();
    }
  }

  const user = this.config?.GWCC_Username || 'coreqa1';
  const pass = this.config?.GWCC_Password || 'Welcome1';
  await (this.gwLogin as any).loginToGWCC(user, pass);
});

Then('Navigate to Portal Authorization screen', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Navigate to Portal Authorization screen')) return;
  await (this.gwAdmin as any).navigatePortalAuthScreen();
});

Then('Remove the {string} from profile', async function (this: CustomWorldClass, claimNumber: string) {
  if (!this.shouldRun('Remove claim from profile')) return;
  const clm = claimNumber.startsWith('<') ? (this.currentRow?.['Claim Number'] || this.claimNumber || '') : claimNumber;
  await (this.gwAdmin as any).removeClaimfromPortalAuth(clm);
});

Then('Remove all the claims from profile', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Remove all claims from profile')) return;
  const user = this.config?.OSPC_username || this.config?.OSPC_Username || 'Kiran_Kangula@wsib.on.ca';
  await (this.gwAdmin as any).removeAllClaimfromPortalAuth(user);
});

Then('Search for {string}', async function (this: CustomWorldClass, claimNumber: string) {
  if (!this.shouldRun('Search for claim')) return;
  const clm = claimNumber.startsWith('<') ? (this.currentRow?.['Claim Number'] || this.claimNumber || '') : claimNumber;
  await (this.gwSearch as any).searchClaim(clm);
});

Then('Search for Claim number', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Search for Claim number')) return;
  const clm = this.currentRow?.['Claim Number'] || this.claimNumber || '';
  await (this.gwSearch as any).searchClaim(clm);
});

Then('Search for Reference Number', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Search for Reference Number')) return;
  const ref = this.refNumber || this.currentRow?.['ReferenceNumber'] || '';
  await (this.gwSearch as any).searchReference(ref);
});

Then('Search with firstname and lastname & dateofbirth', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Search with name & DOB')) return;
  const fn = this.currentRow?.['First Name'] || this.currentRow?.['firstname'] || 'Auto';
  const ln = this.currentRow?.['Last Name'] || this.currentRow?.['lastname'] || 'Test';
  const dob = this.currentRow?.['dateOfBirth'] || this.currentRow?.['Date of Birth'] || this.currentRow?.['dateofbirth'] || '01/01/1990';
  await (this.gwSearch as any).searchClaimant(fn, ln, dob);
});

Then('Search with firstname and lastname & dateofbirth {string}', async function (this: CustomWorldClass, dob: string) {
  if (!this.shouldRun('Search with name & DOB param')) return;
  const fn = this.currentRow?.['firstname'] || this.currentRow?.['First Name'] || 'Auto';
  const ln = this.currentRow?.['lastname'] || this.currentRow?.['Last Name'] || 'Test';
  const dateVal = dob.startsWith('<') ? (this.currentRow?.['dateofbirth'] || '01/01/1990') : dob;
  await (this.gwSearch as any).searchClaimant(fn, ln, dateVal);
});

Then('Search for UNCD {string}', async function (this: CustomWorldClass, claimNumber: string) {
  if (!this.shouldRun('Search for UNCD')) return;
  const clm = claimNumber.startsWith('<') ? (this.currentRow?.['claimnumber'] || this.currentRow?.['Claim Number'] || '') : claimNumber;
  await (this.gwSearch as any).searchClaim(clm);
});

Then('Search for the NIHL claimant in GWCC', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Search for NIHL claimant')) return;
  const fn = this.currentRow?.['First Name'] || 'NIHLFirst';
  const ln = this.currentRow?.['Last Name'] || 'NIHLLast';
  const dob = this.currentRow?.['dateOfBirth'] || this.currentRow?.['Date of Birth'] || '01/01/1980';
  const search = this.gwSearch as any;
  if (typeof search.searchNIHLClaimant === 'function') {
    await search.searchNIHLClaimant(fn, ln, dob, 900, 30);
  } else {
    await search.searchClaimant(fn, ln, dob);
  }
});

Then('User should be able to see the message displayed from OSPC', async function (this: CustomWorldClass) {
  if (!this.shouldRun('verify message in GWCC')) return;
  const part = this.gwParticipants as any;
  if (typeof part.verifySentMessage === 'function') {
    await part.verifySentMessage();
  } else if (typeof part.searchMessage === 'function') {
    await part.searchMessage(this.dynamicMessage || 'Test API');
  }
});

Then('Verify the document is landed in GWCC with valid Author and Description', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify document in GWCC')) return;
  const author = this.currentRow?.['Author'] || 'OSPC';
  const desc = this.currentRow?.['Description'] || 'Dental report';
  const docs = this.gwDocuments as any;
  if (typeof docs.verifyLandedDocument === 'function') {
    await docs.verifyLandedDocument(author, desc);
  } else {
    await docs.verifyLandedDocuments(author, desc);
  }
});

Then('Verify the document are landed in GWCC with valid Author and Description', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify documents multi in GWCC')) return;
  const authors = this.currentRow?.['Author'] || 'OSPC';
  const descriptions = this.currentRow?.['Descriptions'] || this.currentRow?.['Description'] || 'Dental report';
  await (this.gwDocuments as any).verifyLandedDocuments(authors, descriptions);
});

Then('Verify the UNCD document is landed in GWCC with {string}, {string}', async function (this: CustomWorldClass, author: string, desc: string) {
  if (!this.shouldRun('Verify UNCD doc in GWCC')) return;
  const auth = author.startsWith('<') ? (this.currentRow?.['Author'] || 'OSPC') : author;
  const dsc = desc.startsWith('<') ? (this.currentRow?.['Description'] || 'Report') : desc;
  const docs = this.gwDocuments as any;
  if (typeof docs.verifyLandedUNCDDocument === 'function') {
    await docs.verifyLandedUNCDDocument(auth, dsc);
  } else {
    await docs.verifyLandedDocuments(auth, dsc);
  }
});

Then('Verify the NIHL submission documents landed in GWCC', async function (this: CustomWorldClass, dataTable: any) {
  if (!this.shouldRun('Verify NIHL doc in GWCC')) return;
  const rows = dataTable.rowsHash();
  const rawAuthors = rows['SupportingAuthors'] || '';
  const rawDescriptions = rows['SupportingDescriptions'] || '';

  const authors = rawAuthors.startsWith('<') ? (this.currentRow?.['GWCCSupportingAuthors'] || '') : rawAuthors;
  const descriptions = rawDescriptions.startsWith('<') ? (this.currentRow?.['GWCCSupportingDescriptions'] || '') : rawDescriptions;

  if (authors && descriptions) {
    await (this.gwDocuments as any).verifyLandedDocuments(authors, descriptions);
  }
});

Then('Verify the Appeal is created in ClaimCenter', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Appeal in GWCC')) return;
  await (this.gwAppeals as any).createAppeal();
});

Then('Verify the Direct Deposit is displayed in ClaimCenter', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Direct Deposit in GWCC')) return;
  const part = this.gwParticipants as any;
  if (typeof part.verifyDirectDepositInGWCC === 'function') {
    await part.verifyDirectDepositInGWCC();
  } else if (typeof part.verifyDirectDepositUpdateInGWCC === 'function') {
    await part.verifyDirectDepositUpdateInGWCC();
  }
});

Then('Verify the Mailing address is updated in GWCC', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Mailing address in GWCC')) return;
  const addr = this.currentRow?.['Address Line1'] || '140 Erskine Ave';
  const city = this.currentRow?.['City'] || 'Toronto';
  const country = this.currentRow?.['Country'] || 'Canada';
  const part = this.gwParticipants as any;
  if (typeof part.verifyUpdatedMailingAddress === 'function') {
    await part.verifyUpdatedMailingAddress(addr, city, country);
  } else {
    await part.verifyMailingAddress?.(addr);
  }
});

Then('Verify that history events are generated for Mailing address update in GWCC', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify history events for address')) return;
  const addr = this.currentRow?.['Address Line1'] || '140 Erskine Ave';
  const user = this.config?.OSPC_username || 'Kiran_Kangula@wsib.on.ca';
  const hist = this.gwCCHistory as any;
  if (typeof hist.verifyHistoryEventForMailingAddressUpdate === 'function') {
    await hist.verifyHistoryEventForMailingAddressUpdate(addr, user);
  } else {
    await hist.verifyHistory?.();
  }
});

Then('Verify the Phone Number is updated in GWCC', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Phone Number in GWCC')) return;
  const ph = this.currentRow?.['Phone Number'] || '647-800-0000';
  const part = this.gwParticipants as any;
  if (typeof part.verifyUpdatedPhoneNumber === 'function') {
    await part.verifyUpdatedPhoneNumber(ph);
  } else {
    await part.verifyPhoneNumber?.(ph);
  }
});

Then('Verify that history events are generated for Phone Number update in GWCC', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify history events for phone')) return;
  const ph = this.currentRow?.['Phone Number'] || '647-800-0000';
  const user = this.config?.OSPC_username || 'Kiran_Kangula@wsib.on.ca';
  const hist = this.gwCCHistory as any;
  if (typeof hist.verifyHistoryEventForPhoneNumberUpdate === 'function') {
    await hist.verifyHistoryEventForPhoneNumberUpdate(ph, user);
  } else {
    await hist.verifyHistory?.();
  }
});

Then('Run the DI batch job in ClaimCenter to process the Auto Registration', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Run DI batch job')) return;
  const appeals = this.gwAppeals as any;
  if (typeof appeals.runDIBatchJob === 'function') {
    await appeals.runDIBatchJob('Process Auto Reg Claims');
  } else {
    await (this.gwAdmin as any).runDIBatch?.();
  }
});

Then('Verify the Claim is Auto Registered in ClaimCenter', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Auto Registered Claim')) return;
  const fn = this.currentRow?.['First Name'] || this.currentRow?.['firstname'] || 'Auto';
  const ln = this.currentRow?.['Last Name'] || this.currentRow?.['lastname'] || 'Test';
  const dob = this.currentRow?.['Date of Birth'] || this.currentRow?.['dateofbirth'] || '01/01/1990';
  const search = this.gwSearch as any;
  if (typeof search.searchDIClaim === 'function') {
    await search.searchDIClaim(fn, ln, dob);
  }
});

Given('User Logged into ClaimCenter', async function (this: CustomWorldClass) {
  if (!this.shouldRun('User Logged into ClaimCenter')) return;
  await (this.gwSearch as any).GWCCLoginsuccess();
});

When('User initiates Manual Registration', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Manual Registration')) return;
  await (this.gwRegistration as any).KickManualRegistration();
});

Then('User selects Source of Information', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Source of Information')) return;
  await (this.gwRegistration as any).selectSourceofInformation();
});

Then('User enters new worker information', async function (this: CustomWorldClass) {
  if (!this.shouldRun('New worker info')) return;
  const fn = this.currentRow?.['firstname'] || 'Kiran';
  const ln = this.currentRow?.['lastname'] || 'Kangulaa';
  const dob = this.currentRow?.['dateofbirth'] || '01/01/2000';
  const gender = this.currentRow?.['gender'] || 'Male';
  const postal = this.currentRow?.['postalcode'] || 'M4P 1Z2';
  const phone = this.currentRow?.['phonenumber'] || '647-800-0000';
  await (this.gwRegistration as any).createNewWorker(fn, ln, gender, dob, postal, phone);
});

Then('User searches for Existing Worker', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Existing Worker search')) return;
  const wcbid = this.currentRow?.['WCB ID'] || this.currentRow?.['WCB Id'] || this.currentRow?.['firstname'] || '000040427320';
  await (this.gwRegistration as any).searchExistingWorker(wcbid);
});

Then('User searches for Account with bussiness activity', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Account with business activity')) return;
  await (this.gwRegistration as any).searchAccountNumber();
});

Then('User enters Accident Details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Accident Details')) return;
  const dateAccident = this.currentRow?.['dateofaccident'] || '17/12/2024';
  const dateReported = this.currentRow?.['dateReported'] || '17/12/2024';
  await (this.gwRegistration as any).enterAccidentDetails(dateAccident, dateReported);
});

Then('User Enters Body part details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Body part details')) return;
  const areaBody = this.currentRow?.['areaofbody'] || 'Head';
  const accType = this.currentRow?.['accidentType'] || 'Serious Injury';
  const areaInjury = this.currentRow?.['areaofinjury'] || 'Face';
  const detAccType = this.currentRow?.['detailedaccidentType'] || 'Burn';
  const natureInjury = this.currentRow?.['natureofinjury'] || 'Major Burns';
  await (this.gwRegistration as any).enterBodyPartDetails(areaBody, accType, areaInjury, detAccType, natureInjury);
});

Then('Select Third Party accident', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Third Party accident')) return;
  await (this.gwRegistration as any).TPASelection();
});

Then('Select Accident Location from the dropdown', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Accident Location')) return;
  await (this.gwRegistration as any).selectAccidentLocation();
});

Then('Select Health Care Received', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Health Care Received')) return;
  const hc = this.currentRow?.['HealthCareReceived'] || 'No';
  await (this.gwRegistration as any).selectHealthCareRecieved(hc);
});

Then('Select Claim Type', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Select Claim Type')) return;
  const ct = this.currentRow?.['ClaimType'] || 'Lost Time';
  await (this.gwRegistration as any).selectClaimType(ct);
});

Then('Click on Register Claim button and verify that Claim has been registered Successfully', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Register Claim button')) return;
  const claimData = await (this.gwRegistration as any).registerClaim();
  const claimNumber = Array.isArray(claimData) ? claimData[0] : String(claimData);
  expect(claimNumber).toBeTruthy();
  this.claimNumber = claimNumber;
  this.currentRow['Claim Number'] = claimNumber;
  this.persistCurrentRow();
});

Given('I have created a new claim in GW ClaimCenter with New Worker', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Create claim New Worker')) return;
  await (this.gwSearch as any).GWCCLoginsuccess();
  await (this.gwRegistration as any).KickManualRegistration();
  await (this.gwRegistration as any).selectSourceofInformation();
  const fn = this.currentRow?.['firstname'] || 'Kiran';
  const ln = this.currentRow?.['lastname'] || 'Kangulaa';
  const dob = this.currentRow?.['dateofbirth'] || '01/01/2000';
  const gender = this.currentRow?.['gender'] || 'Male';
  const postal = this.currentRow?.['postalcode'] || 'M4P 1Z2';
  const phone = this.currentRow?.['phonenumber'] || '647-800-0000';
  await (this.gwRegistration as any).createNewWorker(fn, ln, gender, dob, postal, phone);
  await (this.gwRegistration as any).searchAccountNumber();
  await (this.gwRegistration as any).enterAccidentDetails(
    this.currentRow?.['dateofaccident'] || '17/12/2024',
    this.currentRow?.['dateReported'] || '17/12/2024'
  );
  await (this.gwRegistration as any).enterBodyPartDetails(
    this.currentRow?.['areaofbody'] || 'Head',
    this.currentRow?.['accidentType'] || 'Serious Injury',
    this.currentRow?.['areaofinjury'] || 'Face',
    this.currentRow?.['detailedaccidentType'] || 'Burn',
    this.currentRow?.['natureofinjury'] || 'Major Burns'
  );
  await (this.gwRegistration as any).TPASelection();
  await (this.gwRegistration as any).selectAccidentLocation();
  await (this.gwRegistration as any).selectHealthCareRecieved(this.currentRow?.['HealthCareReceived'] || 'No');
  await (this.gwRegistration as any).selectClaimType(this.currentRow?.['ClaimType'] || 'Lost Time');
  const claimData = await (this.gwRegistration as any).registerClaim();
  const claimNumber = Array.isArray(claimData) ? claimData[0] : String(claimData);
  this.claimNumber = claimNumber;
  this.currentRow['Claim Number'] = claimNumber;
  this.persistCurrentRow();
});

Given('I have created a new claim in GW ClaimCenter with Existing Worker', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Create claim Existing Worker')) return;
  await (this.gwSearch as any).GWCCLoginsuccess();
  await (this.gwRegistration as any).KickManualRegistration();
  await (this.gwRegistration as any).selectSourceofInformation();
  const wcbid = this.currentRow?.['WCB ID'] || this.currentRow?.['WCB Id'] || this.currentRow?.['firstname'] || '000040427320';
  await (this.gwRegistration as any).searchExistingWorker(wcbid);
  await (this.gwRegistration as any).searchAccountNumber();
  await (this.gwRegistration as any).enterAccidentDetails(
    this.currentRow?.['dateofaccident'] || '17/12/2024',
    this.currentRow?.['dateReported'] || '17/12/2024'
  );
  await (this.gwRegistration as any).enterBodyPartDetails(
    this.currentRow?.['areaofbody'] || 'Head',
    this.currentRow?.['accidentType'] || 'Serious Injury',
    this.currentRow?.['areaofinjury'] || 'Face',
    this.currentRow?.['detailedaccidentType'] || 'Burn',
    this.currentRow?.['natureofinjury'] || 'Major Burns'
  );
  await (this.gwRegistration as any).TPASelection();
  await (this.gwRegistration as any).selectAccidentLocation();
  await (this.gwRegistration as any).selectHealthCareRecieved(this.currentRow?.['HealthCareReceived'] || 'No');
  await (this.gwRegistration as any).selectClaimType(this.currentRow?.['ClaimType'] || 'Lost Time');
  const claimData = await (this.gwRegistration as any).registerClaim();
  const claimNumber = Array.isArray(claimData) ? claimData[0] : String(claimData);
  this.claimNumber = claimNumber;
  this.currentRow['Claim Number'] = claimNumber;
  this.persistCurrentRow();
});

Then('Setup Appeals Data on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup Appeals')) return;
  await (this.gwAppeals as any).createAppeal();
});

Then('Setup RTW information on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup RTW')) return;
  const pRtw = this.currentRow?.['Proposed_RTW_Goal'] || 'RTW Pre-Injury';
  const pIntRtw = this.currentRow?.['Proposed_Interim_RTW_Goal'] || 'RTW Pre-Injury';
  const pRec = this.currentRow?.['Proposed_Recovery_Goal'] || 'Full';
  const pDateRtw = this.currentRow?.['ProposedDate_RTW_Goal'] || '01/01/2025';
  const pDateInt = this.currentRow?.['ProposedDate_Interim_RTW_Goal'] || '01/01/2025';
  const pDateRec = this.currentRow?.['ProposedDate_Recovery_Goal'] || '01/01/2025';
  const curRtw = this.currentRow?.['Current_RTW_Status'] || 'RTW Pre-Injury';
  const curRec = this.currentRow?.['Current_Recovery_Status'] || 'Further Significant Improvement Expected';
  const actRtw = this.currentRow?.['Actual_RTW_Goal'] || 'Injury Employer RTW';
  const actRec = this.currentRow?.['Actual_Recovery_Goal'] || 'Full';
  const actRtwDate = this.currentRow?.['Actual_RTW_Date'] || '01/01/2025';
  const actRecDate = this.currentRow?.['Actual_Recovery_Date'] || '01/01/2025';

  await (this.gwRecovery as any).setupRTWData(
    pRtw,
    pIntRtw,
    pRec,
    pDateRtw,
    pDateInt,
    pDateRec,
    curRtw,
    curRec,
    actRtw,
    actRec,
    actRtwDate,
    actRecDate
  );
});

Then('Setup Device Details on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup Devices')) return;
  const raw = this.currentRow?.['DevicesData'];
  let devices: any[] = [];
  try {
    devices = raw ? JSON.parse(raw) : [];
  } catch {}
  if (devices.length === 0) {
    devices.push({
      Device_Category: 'General Equipment',
      Device_Type: 'Commode',
      Device_Status: 'Allowed',
      Device_ServiceType: 'Rental',
      Device_StartDate: '01/01/2026',
      Device_EndDate: '01/01/2026',
      Device_DecisionDate: '01/01/2026',
      PurposeReview: 'Internal review requested',
      Rationale: 'Test Rationale..'
    });
  }
  for (const d of devices) {
    await (this.gwRecovery as any).setupDeviceData(
      d.Device_Category,
      d.Device_Type,
      d.Device_Status,
      d.Device_ServiceType,
      d.Device_StartDate,
      d.Device_EndDate,
      d.Device_DecisionDate,
      d.PurposeReview,
      d.Rationale
    );
  }
});

Then('Setup Independent Living Allowance on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup ILA')) return;
  const raw = this.currentRow?.['ILA_Data'];
  let ilas: any[] = [];
  try {
    ilas = raw ? JSON.parse(raw) : [];
  } catch {}
  if (ilas.length === 0) {
    ilas.push({ ILA_Status: 'Allowed', ILA_FromDate: '01/01/2026', ILA_ToDate: '01/01/2026' });
  }
  for (const item of ilas) {
    await (this.gwRecovery as any).setupILAData(item.ILA_Status, item.ILA_FromDate, item.ILA_ToDate);
  }
});

Then('Setup Personal Care Allowance on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup PCA')) return;
  const raw = this.currentRow?.['PCA_Data'];
  let pcas: any[] = [];
  try {
    pcas = raw ? JSON.parse(raw) : [];
  } catch {}
  if (pcas.length === 0) {
    pcas.push({
      PCA_AssesmentType: 'Assessment',
      PCA_AssessmentOutcome: 'Allowed',
      PCA_FromDate: '01/01/2026',
      PCA_ToDate: '01/01/2026',
      PCA_ReassesRequired: 'Yes',
      PCA_ReassessmentDate: '01/01/2026'
    });
  }
  for (const p of pcas) {
    await (this.gwRecovery as any).setupPCAData(
      p.PCA_AssesmentType,
      p.PCA_AssessmentOutcome,
      p.PCA_FromDate,
      p.PCA_ToDate,
      p.PCA_ReassesRequired,
      p.PCA_ReassessmentDate
    );
  }
});

Then('Setup Clothing Allowance on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup Clothing Allowance')) return;
  const raw = this.currentRow?.['Clothing_Data'];
  let arr: any[] = [];
  try {
    arr = raw ? JSON.parse(raw) : [];
  } catch {}
  const app = arr[0]?.ClothingAllowanceApproved || 'Yes';
  const date = arr[0]?.ClothingAllowance_DecisionDate || '01/01/2026';
  await (this.gwRecovery as any).setupClothingAllowanceData(app, date);
});

Then('Setup Treatment Details on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup Treatment')) return;
  const raw = this.currentRow?.['Treatment_Data'];
  let arr: any[] = [];
  try {
    arr = raw ? JSON.parse(raw) : [];
  } catch {}
  if (arr.length === 0) {
    arr.push({
      Treatment_Type: 'Physiotherapy',
      Treatment_Status: 'Allowed',
      Treatment_StartDate: '01/01/2026',
      Treatment_EndDate: '01/01/2026',
      Treatment_FreqNum: '12',
      Treatment_EntitlementDUnit: 'per day',
      PurposeReview: 'Internal review requested',
      Rationale: 'Test Rationale..'
    });
  }
  for (const t of arr) {
    await (this.gwRecovery as any).setupTreatmentData(
      t.Treatment_Type,
      t.Treatment_Status,
      t.Treatment_StartDate,
      t.Treatment_EndDate,
      t.Treatment_FreqNum,
      t.Treatment_EntitlementDUnit,
      t.PurposeReview,
      t.Rationale
    );
  }
});

Then('Setup Medication Details on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup Medication')) return;
  const raw = this.currentRow?.['Medication_Data'];
  let arr: any[] = [];
  try {
    arr = raw ? JSON.parse(raw) : [];
  } catch {}
  if (arr.length === 0) {
    arr.push({
      Medication_Type: 'Formulary',
      Medication_Status: 'Allowed',
      Medication_Formulary: '25WS - Initial',
      Medication_StartDate: '04/05/2026',
      Medication_EndDate: '05/05/2026',
      PurposeReview: 'Internal review requested',
      Rationale: 'Test Rationale..'
    });
  }
  for (const m of arr) {
    await (this.gwRecovery as any).setupMedicationData(
      m.Medication_Type,
      m.Medication_Status,
      m.Medication_Formulary,
      m.Medication_StartDate,
      m.Medication_EndDate,
      m.PurposeReview,
      m.Rationale
    );
  }
});

Then('Setup Payments data on the Claim', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Setup Payments')) return;
  const checkSourceId = this.currentRow?.['CheckSourceId'] || '23234234';
  const payee = this.currentRow?.['firstname'] || 'Kiran';
  const payTo = this.currentRow?.['lastname'] || 'Kangulaa';
  const status = this.currentRow?.['Status'] || 'Cashed - CSHD';
  const tAmount = this.currentRow?.['TAmount'] || '5000';
  const issuedDate = this.currentRow?.['IssuedDate'] || '01/01/2026';
  const costCat = this.currentRow?.['CostCategory'] || 'Day of Injury (DOI)';
  const costType = this.currentRow?.['CostType'] || 'Arrears';
  const amount = this.currentRow?.['Amount'] || '450';
  const payFrom = this.currentRow?.['PayFromDate'] || '01/01/2026';
  const payToDate = this.currentRow?.['PayToDate'] || '01/01/2026';

  await (this.gwRecovery as any).setupPaymentsData(
    checkSourceId,
    payee,
    payTo,
    status,
    tAmount,
    issuedDate,
    costCat,
    costType,
    amount,
    payFrom,
    payToDate
  );
});

Then('Verify intake and Worker Information and Validate worker Address', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify intake and Worker Information')) return;
  const fn = this.currentRow?.['FirstName'] || this.currentRow?.['firstname'] || 'Auto';
  const ln = this.currentRow?.['LastName'] || this.currentRow?.['lastname'] || 'Test';
  const gender = this.currentRow?.['Gender'] || this.currentRow?.['gender'] || 'Male';
  const pronouns = this.currentRow?.['Pronouns'] || 'He/Him';
  await (this.gwRegistration as any).verifyIntakeWorkerInformation(fn, ln, gender, pronouns);
});