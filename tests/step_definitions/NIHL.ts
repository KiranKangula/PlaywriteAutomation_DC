import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';
import { BasePage } from '../../utils/BasePage';

Given('User is on NIHL landing page', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Verifying user is on NIHL landing page.");
    expect(await this.nihllandingpage!.verifyOnNIHLLandingPage()).toBe(true);
});

When('User clicks on Gradual over a period of a few years radio button', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Clicking on 'Gradual over a period of a few years' radio button.");
    expect(await this.nihllandingpage!.ClickGradualRadioButton()).toBe(true);
});

Then('User should be able to enter the Email address and Date of birth and click on Start Claim button', async function (this: CustomWorld) {
    await this.initPages();
    const email = this.currentRow?.['Email'];
    const dob = this.currentRow?.['dateOfBirth'];
    console.log(`Entering Email address: ${email} and Date of birth: ${dob} and clicking Start Claim button.`);
    await this.nihllandingpage!.EnterUserDetails(email, dob);
});

Then('Enter data in My Information Screen', async function (this: CustomWorld) {
    await this.initPages();
    const firstname = this.currentRow?.['First Name'];
    const lastname = this.currentRow?.['Last Name'];
    const sin = this.currentRow?.['Social Insurance Number'];
    const address = this.currentRow?.['Address'];
    const phone = this.currentRow?.['Primary Phone'];
    const language = this.currentRow?.['Language Preference'];

    const manipulatedFirstName = "KKFirst" + BasePage.generateRandomText(5);
    const manipulatedLastName = "KKLast" + BasePage.generateRandomText(5);
    console.log(`Manipulating First Name to: ${manipulatedFirstName} and Last Name to: ${manipulatedLastName}`);

    if (this.currentRow) {
        this.currentRow['First Name'] = manipulatedFirstName;
        this.currentRow['Last Name'] = manipulatedLastName;
    }

    await this.myinformation!.EnterMyInformation(manipulatedFirstName, manipulatedLastName, sin, address, phone, language);
    console.log("Entered data in My Information Screen.");
});

Then('Enter data in Health care Screen', async function (this: CustomWorld) {
    await this.initPages();
    const hearingLossNoticedYear = this.currentRow?.['HearingLossNoticedYear'];
    const wearHearingAid = this.currentRow?.['wearHearingAid'];
    const hearingAidUsageDate = this.currentRow?.['hearingAidUsageDate'];
    const dateOfFirstAudiogram = this.currentRow?.['dateOfFirstAudiogram'];
    const audiogramClinicName = this.currentRow?.['audiogramClinicName'];
    const audiogramClinicAddress = this.currentRow?.['audiogramClinicAddress'];
    const audiogramClinicPhoneNumber = this.currentRow?.['audiogramClinicPhoneNumber'];
    const hasVisitedEntSpecialist = this.currentRow?.['hasVisitedEntSpecialist'];
    const entAppointmentDate = this.currentRow?.['entAppointmentDate'];
    const entSpecialistName = this.currentRow?.['entSpecialistName'];
    const entSpecialistAddress = this.currentRow?.['entSpecialistAddress'];
    const entSpecialistPhoneNumber = this.currentRow?.['entSpecialistPhoneNumber'];
    const experienceRingingQuestion = this.currentRow?.['experienceRingingQuestion'];
    const ringingEarDuration = this.currentRow?.['ringingEarDuration'];
    const hasSevereRingingInEar = this.currentRow?.['hasSevereRingingInEar'];
    const isRingingConstant = this.currentRow?.['isRingingConstant'];

    console.log("Entering data in Health Care Screen.");
    await this.healthcare!.EnterHealthCareDetails(
        hearingLossNoticedYear, wearHearingAid, hearingAidUsageDate, dateOfFirstAudiogram,
        audiogramClinicName, audiogramClinicAddress, audiogramClinicPhoneNumber, hasVisitedEntSpecialist,
        entAppointmentDate, entSpecialistName, entSpecialistAddress, entSpecialistPhoneNumber,
        experienceRingingQuestion, ringingEarDuration, hasSevereRingingInEar, isRingingConstant
    );
});

Then('Enter data in Employment Screen', async function (this: CustomWorld) {
    await this.initPages();
    const row = this.currentRow || {};
    const areYouRetired = row['Are you retired?'] || '';
    const retirementDate = row['RetirementDate'] || '';
    const employedRadio = row['Are you currently employed?'] || '';
    const employerName = row['EmployerName'] || '';
    const employerAddress = row['EmployerAddress'] || '';
    const employerPhone = row['EmployerPhone'] || '';
    const hazardousNoiseRadio = row['HazardousNoiseRadio'] || '';
    const selfEmployedRadio = row['SelfEmployedRadio'] || '';
    const insuranceRadio = row['InsuranceRadio'] || '';
    const businessName = row['BusinessName'] || '';
    const businessAddress = row['BusinessAddress'] || '';
    const businessFrom = row['BusinessFrom'] || '';
    const businessTo = row['BusinessTo'] || '';
    const noisyMachineryOffwork = row['noisyMachineryOffwork'] || '';
    const usedNoisyMachinery = row['usedNoisyMachinery'] || '';
    const stillInBusiness = row['StillInBusiness'] || '';
    const jobTitle = row['JobTitle'] || '';
    const employedFrom = row['EmployedFrom'] || '';
    const employedTo = row['EmployedTo'] || '';
    const toolsEquipmentUsed = row['ToolsEquipmentUsed'] || '';
    const hoursUsed = row['HoursUsed'] || '';

    console.log("Entering data in Employment Screen.");
    await this.employement!.EnterEmploymentDetails(
        areYouRetired, retirementDate, employedRadio, employerName, employerAddress, employerPhone,
        hazardousNoiseRadio, selfEmployedRadio, insuranceRadio, businessName, businessAddress, businessFrom, businessTo,
        noisyMachineryOffwork, usedNoisyMachinery, stillInBusiness, jobTitle, employedFrom, employedTo, toolsEquipmentUsed, hoursUsed
    );
});

Then('Enter data in Supporting Documents Screen', async function (this: CustomWorld) {
    await this.initPages();
    const row = this.currentRow;
    if (!row) {
        throw new Error("NIHL test data is not initialized for this scenario.");
    }

    const healthCareFiles = row['HealthCareFiles'] || '';
    const employmentFiles = row['EmploymentFiles'] || '';
    const uploadFolder = process.env.UPLOAD_FOLDER || '';

    console.log("Entering data in Supporting Documents Screen.");
    await this.nihlsupportingdocuments!.EnterSupportingDocuments(
        healthCareFiles, employmentFiles, uploadFolder
    );
});

Then('Verify the data in Review screen and Submit the claim', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Verifying data in Review screen and submitting the claim.");
    await this.nihlreviewandconfirm!.reviewandSubmitNIHLClaim();
});

Then('Verify the claim is submitted successfully', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Verifying claim submission success.");
    expect(await this.nihlreviewandconfirm!.verifyClaimSubmitted()).toBe(true);
    console.log(`Claim Submitted at: ${new Date().toLocaleString()}`);
});

Then('Enter data in Supporting Documents Screen with health care files {string} and employment files {string}', async function (this: CustomWorld, healthCareFiles: string, employmentFiles: string) {
    await this.initPages();
    const row = this.currentRow;
    if (!row) {
        throw new Error("NIHL test data is not initialized for this scenario.");
    }

    const submissionDate = new Date().toISOString().split('T')[0];
    row['NIHLSubmissionDate'] = submissionDate;

    const healthFiles = healthCareFiles?.trim() || '';
    const employerFiles = employmentFiles?.trim() || '';

    console.log(`[NIHL] Captured submission date: ${submissionDate}`);
    console.log(`Health care files: ${healthFiles}`);
    console.log(`Employment files: ${employerFiles}`);

    const uploadFolder = process.env.UPLOAD_FOLDER || '';
    await this.nihlsupportingdocuments!.EnterSupportingDocuments(
        healthFiles, employerFiles, uploadFolder
    );

    row['HealthCareFiles'] = healthFiles;
    row['EmploymentFiles'] = employerFiles;
});
