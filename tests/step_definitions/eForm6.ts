// tests/step_definitions/eForm6.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorldClass } from './world';

// Given('User is on my Claim screen', async function (this: CustomWorldClass) {
//   if (!this.shouldRun('User is on my Claim screen')) return;
//   await (this.ospcHome as any).verifyOnHomePage();
// });

When('User click on Submit Report button', async function (this: CustomWorldClass) {
  if (!this.shouldRun('User click on Submit Report button')) return;
  const home = this.ospcHome as any;
  const e6 = this.eform6 as any;
  if (typeof e6.clickOnSubmitReport === 'function') {
    await e6.clickOnSubmitReport();
  } else if (typeof home.clickOnSubmitReport === 'function') {
    await home.clickOnSubmitReport();
  } else if (typeof home.clickSubmitReport === 'function') {
    await home.clickSubmitReport();
  } else {
    await this.page!.locator("//button[contains(text(),'Submit') or contains(@id,'submit')]").first().click();
  }
});

Then('User should be able to provide consent to the privacy statement', async function (this: CustomWorldClass) {
  if (!this.shouldRun('privacy statement')) return;
  const e6 = this.eform6 as any;
  if (typeof e6.privacyStatement === 'function') {
    await e6.privacyStatement();
  } else if (typeof e6.provideConcent === 'function') {
    await e6.provideConcent();
  } else if (typeof e6.provideConsent === 'function') {
    await e6.provideConsent();
  } else {
    await this.page!.locator("//input[@type='checkbox']").first().click();
  }
});

Then('User should be able to select report type {string}', async function (this: CustomWorldClass, reportType: string) {
  if (!this.shouldRun('select report type')) return;
  const rep = reportType.startsWith('<') ? (this.currentRow?.['Report Type'] || 'Injury or Illness') : reportType;
  await (this.eform6 as any).selectReportType(rep);
});

Then('User should be able to select Injury Type {string}', async function (this: CustomWorldClass, injuryType: string) {
  if (!this.shouldRun('select Injury Type')) return;
  const inj = injuryType.startsWith('<') ? (this.currentRow?.['Injury Type'] || 'Physical Injury') : injuryType;
  await (this.eform6 as any).selectInjuryType(inj);
});

Then('User should be able to select radio {string}, Body Part {string}', async function (this: CustomWorldClass, physicalInjury: string, bodyPart: string) {
  if (!this.shouldRun('select radio PhysicalInjury Body Part')) return;
  const pi = physicalInjury.startsWith('<') ? (this.currentRow?.['Physical Injury'] || this.currentRow?.['PhyInjury'] || 'Yes') : physicalInjury;
  const bp = bodyPart.startsWith('<') ? (this.currentRow?.['Body Part'] || this.currentRow?.['DescribeInjury'] || 'Ear(s)') : bodyPart;
  const e6 = this.eform6 as any;
  if (typeof e6.selectBodyPart === 'function') {
    await e6.selectBodyPart(pi, bp);
  } else {
    await (this.eform6_injurydetails as any).selectBodyPart(pi, bp);
  }
});

Then('User should be able to enter {string} if applicable', async function (this: CustomWorldClass, existingClaim: string) {
  if (!this.shouldRun('Existing Claim Number')) return;
  const clm = existingClaim.startsWith('<') ? (this.currentRow?.['Existing Claim Number'] || '') : existingClaim;
  await (this.eform6 as any).enterExistingClaimNumber(clm);
});

Then('User should be able to enter {string}, {string}, {string}, {string}', async function (this: CustomWorldClass, fn: string, ln: string, phone: string, pronouns: string) {
  if (!this.shouldRun('enter name and contact')) return;
  const firstName = fn.startsWith('<') ? (this.currentRow?.['FirstName'] || this.currentRow?.['First Name'] || 'Autojoi') : fn;
  const lastName = ln.startsWith('<') ? (this.currentRow?.['LastName'] || this.currentRow?.['Last Name'] || 'Testmpb') : ln;
  const ph = phone.startsWith('<') ? (this.currentRow?.['PhoneNumber'] || this.currentRow?.['Phone Number'] || '6478444444') : phone;
  const pr = pronouns.startsWith('<') ? (this.currentRow?.['Pronouns'] || 'He/Him') : pronouns;
  const e6 = this.eform6 as any;
  if (typeof e6.enterPersonalInformation === 'function') {
    await e6.enterPersonalInformation(firstName, lastName, ph, pr);
  } else {
    await e6.enterWorkerPersonalDetails?.(firstName, lastName, ph, pr);
  }
});

Then('Enter Additional personal details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Enter Additional personal details')) return;
  const gender = this.currentRow?.['Gender'] || 'Male';
  const dob = this.currentRow?.['DateofBirth'] || this.currentRow?.['Date of Birth'] || this.currentRow?.['dateofbirth'] || '01/Jan/1990';
  const preferredLang = this.currentRow?.['PreferredLanguage'] || this.currentRow?.['Language of Service'] || 'English';
  const sin = this.currentRow?.['sinNumber'] || this.currentRow?.['SIN'] || '';
  await (this.eform6 as any).enterAdditionalDetails(gender, dob, preferredLang, sin);
});

Then('Enter Additional personal details - Exposure', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Enter Additional personal details - Exposure')) return;
  const gender = this.currentRow?.['Gender'] || 'Male';
  const dob = this.currentRow?.['DateofBirth'] || this.currentRow?.['Date of Birth'] || '01/Jan/1990';
  await (this.eform6 as any).enterAdditionalDetails(gender, dob);
});

Then('Enter Worker Address Details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Enter Worker Address Details')) return;
  const address = this.currentRow?.['Address'] || '140 Erskine Avenue|Toronto|Ontario|M4P 1Z2';
  await (this.eform6 as any).enterMailingAddress(address);
});

Then('Enter Employers Details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Enter Employers Details')) return;
  const empName = this.currentRow?.['EmployerName'] || this.currentRow?.['Employer Name'] || 'Acme Corp';
  const empPhone = this.currentRow?.['EmployerPhone'] || this.currentRow?.['Employer Phone'] || '6478889999';
  const empAddress = this.currentRow?.['EmployerAddress'] || this.currentRow?.['Address'] || '140 Erskine Avenue|Toronto|Ontario|M4P 1Z2';
  await (this.eform6 as any).enterEmployerDetails(empName, empPhone, empAddress);
});

Then('Verify the reference number is generated and displayed', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify reference number')) return;
  this.refNumber = await (this.eform6 as any).verifyReferenceNumber();
  expect(this.refNumber).toBeTruthy();
  this.currentRow['ReferenceNumber'] = this.refNumber;
  this.persistCurrentRow();
});

Then('Enter the Job Details of the Worker', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Enter Job Details')) return;
  const jobTitle = this.currentRow?.['JobTitle'] || this.currentRow?.['Job Title'] || 'Test';
  const startDate = this.currentRow?.['JobStartDate'] || this.currentRow?.['Emp Start Date'] || '1|Jan|2023';
  const empYears = this.currentRow?.['EmpDurationYears'] || this.currentRow?.['Emp Years'] || '2';
  const empMonths = this.currentRow?.['EmpDurationMonths'] || this.currentRow?.['Emp Months'] || '1';
  const supFirst = this.currentRow?.['SupervisorFirstName'] || 'SuperFirst';
  const supLast = this.currentRow?.['SupervisorLastName'] || 'SuperLast';
  const supPhone = this.currentRow?.['SupervisorPhoneNumber'] || '7777777777';
  const companySize = this.currentRow?.['CompanySize'] || this.currentRow?.['# Employees'] || 'Yes';
  const thirdPartyUnion = this.currentRow?.['ThirdPartyUnion'] || this.currentRow?.['Union?'] || 'Yes';
  const nameOfUnion = this.currentRow?.['NameOfTheUnion'] || 'Union Names';

  await (this.eform6_workhistory as any).enterJobDetails(
    jobTitle,
    startDate,
    empYears,
    empMonths,
    supFirst,
    supLast,
    supPhone,
    companySize,
    thirdPartyUnion,
    nameOfUnion
  );
});

Then('Enter the Job Details of the Worker - Exposure Incident', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Enter Job Details - Exposure')) return;
  const jobTitle = this.currentRow?.['JobTitle'] || 'Test';
  const startDate = this.currentRow?.['JobStartDate'] || '1|Jan|2023';
  const whatTypeOfWork = this.currentRow?.['WhatTypeofWork'] || 'Test Work';
  const companySize = this.currentRow?.['CompanySize'] || 'Yes';
  await (this.eform6_workhistory as any).enterJobDetails(jobTitle, startDate, whatTypeOfWork, companySize);
});

Then('Enter Joint Health and Safety Committee details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('JHSC details')) return;
  const committee = this.currentRow?.['SafetyCommittee?'] || 'No';
  const rep = this.currentRow?.['SafetyRepresentative?'] || 'No';
  const union = this.currentRow?.['NameOfTheUnion'] || 'Union Names';
  await (this.eform6_workhistory as any).enterJointHealthAndSafetyCommittee(committee, rep, union);
});

Then('Enter Tell us about your work details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Tell us about your work')) return;
  const relative = this.currentRow?.['Relative'] || 'Yes';
  const types = this.currentRow?.['TypesofEmployment'] || 'Self employed';
  await (this.eform6_workhistory as any).enterWorkDetails(relative, types);
});

Then('Enter the Physical injury or illness details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Physical injury details')) return;
  const whathappened = this.currentRow?.['WhatHappened'] || this.currentRow?.['WhatHappenedInput'] || 'Test occurred at workplace.';
  await (this.eform6_injurydetails as any).PhysicalInjuryDetails(whathappened);
});

Then('Enter Injury date and time', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Injury date and time')) return;
  const date = this.currentRow?.['InjuryDate'] || this.currentRow?.['Injury Date'] || '1/Feb/2024';
  await (this.eform6_injurydetails as any).enterInjuryDateAndTime(date);
});

Then('Enter Areas of Injury', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Areas of Injury')) return;
  const pi = this.currentRow?.['PhysicalInjury'] || this.currentRow?.['Physical Injury'] || 'Ear(s)';
  const bp = this.currentRow?.['BodyPart'] || this.currentRow?.['Body Parts'] || 'Ear(s)';
  await (this.eform6_injurydetails as any).selectBodyPart(pi, bp);
});

Then('Enter Date and Time Injury Reported to Employer', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Date and Time Injury Reported')) return;
  const reportedTo = this.currentRow?.['ReportedtoEmp'] || this.currentRow?.['reported to?'] || 'Yes';
  const date = this.currentRow?.['InjurDateReptoEmployer'] || this.currentRow?.['EmployerKnownDate'] || '1/Mar/2024';
  await (this.eform6_injurydetails as any).selectReportedToEmpl(reportedTo, date);
});

Then('Enter Witnesses contact information', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Witnesses contact information')) return;
  const involved = this.currentRow?.['WitnessInvolved'] || this.currentRow?.['Witness'] || 'No';
  const fn = this.currentRow?.['WitnessFirstName'] || '';
  const ln = this.currentRow?.['WitnessLastName'] || '';
  const pos = this.currentRow?.['WitnessPosition'] || '';
  const phone = this.currentRow?.['WitnessPhoneNumber'] || '';
  await (this.eform6_injurydetails as any).enterWitnessDetails(involved, fn, ln, pos, phone);
});

Then('Enter Injury, illness or exposure incident address', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Incident address')) return;
  await (this.eform6_injurydetails as any).enterIncidentAddress();
});

Then('Enter Similar or related previous injury or illness details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Previous injury details')) return;
  const similar = this.currentRow?.['SimilarInjury'] || 'No';
  const prevClaim = this.currentRow?.['PreviousClaim'] || 'No';
  const prevClaimNum = this.currentRow?.['PreviousClaimNumber'] || '';
  const sameArea = this.currentRow?.['SameAreaofInjury'] || 'No';
  const info = this.currentRow?.['TellUsAboutPreviousInjury'] || '';
  await (this.eform6_injurydetails as any).enterSimilarInjuryDetails(similar, prevClaim, prevClaimNum, sameArea, info);
});

Then('Enter Health care for injury or illness details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Health care details')) return;
  const received = this.currentRow?.['HealthCareReceived'] || this.currentRow?.['HealthCare'] || 'No';
  const where = this.currentRow?.['WhereHealthCareReceived'] || 'Clinic';
  const dateReceived = this.currentRow?.['HealthCareReceivedDate'] || '1/Feb/2024';
  const emplDate = this.currentRow?.['EmplReportedDate'] || '1/Feb/2024';
  const reporter = this.currentRow?.['Reporter'] || 'Kiran|Kangula|Manager|6478777777';
  const provider = this.currentRow?.['Provider'] || '';
  const providerOrg = this.currentRow?.['ProviderOrg'] || '';
  const providerOrgAddress = this.currentRow?.['ProviderOrgAddress'] || '';
  const whenExpect = this.currentRow?.['Whendoyouexpect'] || '';
  await (this.eform6_healthcare as any).enterHealthCareDetails(
    received,
    where,
    dateReceived,
    emplDate,
    reporter,
    provider,
    providerOrg,
    providerOrgAddress,
    whenExpect
  );
});

Then('Enter Missed time from work details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Missed time details')) return;
  const missed = this.currentRow?.['MissedTimeFromWork'] || this.currentRow?.['LOE'] || 'No';
  const startDate = this.currentRow?.['MissedTimeStartDate'] || '1/Feb/2024';
  await (this.eform6_losttimeearnings as any).enterMissedTimeFromWorkDetails(missed, startDate);
});

Then('Enter Modified Work Details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Modified Work Details')) return;
  const offered = this.currentRow?.['OfferedTo'] || 'No';
  const modDate = this.currentRow?.['ModifiedDate'] || '1/Feb/2024';
  const modWork = this.currentRow?.['ModifiedWork'] || 'Regular';
  const declineReason = this.currentRow?.['DeclineReason'] || '';
  await (this.eform6_losttimeearnings as any).enterModifiedWorkDetails(offered, modDate, modWork, declineReason);
});

Then('Enter Return to work details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Return to work details')) return;
  const returning = this.currentRow?.['ReturningToWork'] || 'No';
  const returnDate = this.currentRow?.['ReturningDate'] || '1/Feb/2024';
  const typeOfReturn = this.currentRow?.['TypeOfReturn'] || 'Regular';
  const modifiedDate = this.currentRow?.['ModifiedDate'] || '1/Feb/2025';
  const wageLoss = this.currentRow?.['WageLoss'] || 'No';
  const rtwContact = this.currentRow?.['RTWContact'] || 'S First|S Last|6478787777';
  const returnedDate = this.currentRow?.['ReturnedDate'] || '1/Feb/2024';
  await (this.eform6_losttimeearnings as any).enterReturnToWorkDetails(
    returning,
    returnDate,
    typeOfReturn,
    modifiedDate,
    wageLoss,
    rtwContact,
    returnedDate
  );
});

Then('Enter Additional earnings and benefits information', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Additional earnings')) return;
  const earn = this.currentRow?.['AdditionalEarnings?'] || 'No';
  const ben = this.currentRow?.['AdditionalBenefits?'] || 'No';
  const moreThanOne = this.currentRow?.['DidYouWorkforMorethanOneEmpl?'] || 'No';
  await (this.eform6_losttimeearnings as any).enterAdditionalEarningsAndBenefits(earn, ben, moreThanOne);
});

Then('Enter Authorized representative details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Authorized representative')) return;
  await (this.eform6_losttimeearnings as any).enterAuthorizedRepDetails();
});

Then('Enter Submit supporting documents details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Submit supporting documents details')) return;
  await (this.eform6_supportingdocuments as any).enterSupportingDocuments();
});

Then('Upload and verify Form 6 supporting documents', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Upload Form 6 supporting documents')) return;
  const files = this.currentRow?.['SupportingFiles'] || 'DOB_Letter.docx';
  const docTypes = this.currentRow?.['SupportingDocumentTypes'] || 'Dental report';
  const folder = 'DocUploadFiles';
  const docs = this.eform6_supportingdocuments as any;
  if (typeof docs.enterSupportingDocuments === 'function') {
    await docs.enterSupportingDocuments(files, docTypes, folder);
  } else {
    await docs.uploadSupportingDocuments?.();
  }
});

Then('Enter Additional Comments details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Additional Comments')) return;
  const comments = this.currentRow?.['AdditionalComments'] || 'Additional Comment test';
  await (this.eform6_supportingdocuments as any).enterAdditionalComments(comments);
});

Then('Verify Review and submit report and Select Declaration checkbox', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Verify Review and submit')) return;
  await (this.eform6_reviewandsubmit as any).verifyReviewAndSubmitReport();
});

Then('Select decision to Add claim to your account and Submit Report', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Submit Report')) return;
  const addClaim = this.currentRow?.['AddClaimtoProfile'] || 'Yes';
  await (this.eform6_reviewandsubmit as any).selectAddClaimtoProfile(addClaim);
  await (this.eform6_reviewandsubmit as any).verifyReturnToDashBoard();
});

Then('User selects Submission Requirement', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Submission Requirement')) return;
  const req = this.currentRow?.['SubmissionRequirement'] || 'No';
  await (this.eform6 as any).selectSubmissionRequirement(req);
});

Then('Enter the Exposure Incident details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Exposure Incident details')) return;
  const exposureTo = this.currentRow?.['ExposureTo?'] || 'Infectious Substance';
  const date = this.currentRow?.['ExposureDate'] || '1|Jan|2024';
  const how = this.currentRow?.['HowContacted?'] || 'Body Fluid Splash';
  const src = this.currentRow?.['Source'] || 'Test';
  const substance = this.currentRow?.['WhatSubstance'] || 'Scabies';
  const where = this.currentRow?.['DescribeWhere?'] || 'Test Test';
  const wearing = this.currentRow?.['WhatareYouWearing?'] || 'Test';
  await (this.eform6_exposuredetails as any).enterExposureDetails(exposureTo, date, how, src, substance, where, wearing);
});

Then('Verify Review and submit report and Select Declaration checkbox and Submit Exposure', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Submit Exposure')) return;
  await (this.eform6_reviewandsubmit as any).verifyReviewAndSubmitExposure();
  await (this.eform6_reviewandsubmit as any).verifyReturnToDashBoard();
});

Then('Enter the injury or illness details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Illness details')) return;
  const condition = this.currentRow?.['ConditionInput'] || 'Test Happened';
  const related = this.currentRow?.['RelatedToWorkInput'] || 'Related to work';
  const symptoms = this.currentRow?.['SymptomsInput'] || 'Symptoms test';
  await (this.eform6_injurydetails as any).enterInjuryDetails(condition, related, symptoms);
});

Then('Enter Illness or medical condition details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Medical condition details')) return;
  const startDate = this.currentRow?.['IllnessStartDate'] || '1/Feb/2024';
  await (this.eform6_injurydetails as any).enterIllnessDetails(startDate);
});

Then('User should be able to Describe your Injury', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Describe your Injury')) return;
  const desc = this.currentRow?.['DescribeInjury'] || 'Burn';
  await (this.eform6_injurydetails as any).DescribeInjury(desc);
});

Then('Enter the Mental stress psychological injury details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Mental stress details')) return;
  const info = this.currentRow?.['InjuryDetailsInput'] || 'Mental stress details test';
  await (this.eform6_injurydetails as any).enterMentalInjuryDetails(info);
});

Then('Enter Mental stress psychological injury date details', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Mental stress date')) return;
  const start = this.currentRow?.['InjuryStartDate'] || '1/Feb/2024';
  const end = this.currentRow?.['InjuryEndDate'] || '1/Feb/2024';
  await (this.eform6_injurydetails as any).enterMentalInjuryDateDetails(start, end);
});

Then('Enter Areas of Injury for Mental', async function (this: CustomWorldClass) {
  if (!this.shouldRun('Areas of Injury Mental')) return;
  const pi = this.currentRow?.['PhysicalInjury?'] || this.currentRow?.['PhysicalInjury'] || 'No';
  await (this.eform6_injurydetails as any).InjuredQuestion(pi);
  const bodyPart = this.currentRow?.['BodyPart'] || 'Ear(s)';
  await (this.eform6_injurydetails as any).selectBodyPart(pi, bodyPart);
});

Then('User should be able to select {string} report type', async function (this: CustomWorldClass, repType: string) {
  if (!this.shouldRun('select report type string')) return;
  await (this.eform6 as any).selectReportType(repType);
});

Then('User should be able to select {string} Injury Type', async function (this: CustomWorldClass, injType: string) {
  if (!this.shouldRun('select injury type string')) return;
  await (this.eform6 as any).selectInjuryType(injType);
});

Then('User should be able to land on Continue to different online service to make a claim for noise-induced hearing loss screen', async function (this: CustomWorldClass) {
  if (!this.shouldRun('land on NIHL continue screen')) return;
  await (this.eform6 as any).verifyNIHLPage();
});