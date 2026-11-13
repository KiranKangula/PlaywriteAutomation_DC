import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';
import { BasePage } from '../../utils/BasePage';

Given('User is on online services screen', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Verifying user is on Business Online Services screen.");
    expect(await this.eform7!.verifyBusinessHomepage()).toBe(true);
});

When('User click on Report an injury or illness Form7 GO button', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Clicking on 'GO' button for Report an injury or illness (Form 7).");
    expect(await this.eform7!.clickOnGOButton()).toBe(true);
});

Then('User selects an account and Start Report', async function (this: CustomWorld) {
    await this.initPages();
    const accountnumber = this.currentRow?.['Account Number'];
    console.log(`Selecting Account Number: ${accountnumber} and starting report.`);
    expect(await this.eform7!.selectAccountAndStartReport(accountnumber)).toBe(true);
});

Then('User should be able to select report type Report Type', async function (this: CustomWorld) {
    await this.initPages();
    const reporttype = this.currentRow?.['Report Type'];
    console.log(`Selecting Report Type: ${reporttype}`);
    expect(await this.eform7!.selectReportType(reporttype)).toBe(true);
});

Then('User should be able to select Injury Category', async function (this: CustomWorld) {
    await this.initPages();
    const injurycategory = this.currentRow?.['Injury Category'];
    console.log(`Selecting Injury Category: ${injurycategory}`);
    expect(await this.eform7!.selectInjuryCategory(injurycategory)).toBe(true);
});

Then('User should be able to select radio PhysicalInjury, Body Part', async function (this: CustomWorld) {
    await this.initPages();
    const physicalInjury = this.currentRow?.['Physical Injury'];
    const accidentType = this.currentRow?.['Accident Type'];
    const describedBy = this.currentRow?.['Described By'];
    console.log(`Selecting Physical Injury Details: ${physicalInjury}, Accident Type: ${accidentType}`);
    expect(await this.eform7_reporttype!.selectPhysicalInjuryDetails(physicalInjury, accidentType, describedBy)).toBe(true);
});

Then('User should be able to Select Reported by', async function (this: CustomWorld) {
    await this.initPages();
    const reportedBy = this.currentRow?.['Reporter'];
    console.log(`Selecting Reported By: ${reportedBy}`);
    expect(await this.eform7_reporterdetails!.selectReportedByDetails(reportedBy)).toBe(true);
});

Then('User should be able to enter Employer details and get Reference Claim Number', async function (this: CustomWorld) {
    await this.initPages();
    const mailingaddress = this.currentRow?.['Mailing Address'];
    const branchAddress = this.currentRow?.['Branch Address'];
    const businessYear = this.currentRow?.['Business Year'];
    const naicsCode = this.currentRow?.['NAICS Code'];

    console.log("Entering Employer details...");
    const referenceClaimNumber = await this.eform7_employerdetails!.enterEmployerDetails(mailingaddress, branchAddress, businessYear, naicsCode);

    console.log(`Reference Claim Number is: ${referenceClaimNumber}`);
    expect(referenceClaimNumber.length).toBeGreaterThan(0);

    // Update the current row data
    if (this.currentRow) {
        this.currentRow['ReferenceNumber'] = referenceClaimNumber;
    }
    // Note: JsonUtils.writeJsonData would be handled by a data-saving utility if implemented.
});

Then('User should be able to enter Employee details', async function (this: CustomWorld) {
    await this.initPages();
    const employeeFirstName = "Auto" + BasePage.generateRandomText(5);
    const employeeLastName = "Test" + BasePage.generateRandomText(5);
    const phoneNumber = this.currentRow?.['Phone Number'];
    const sex = this.currentRow?.['Sex'];
    const pronouns = this.currentRow?.['Pronouns'];
    const dateOfBirth = this.currentRow?.['Date of Birth'];
    const language = this.currentRow?.['Language of Service'];
    const sin = this.currentRow?.['SIN'];
    const address = this.currentRow?.['Address'];

    console.log(`Entering Employee Details for: ${employeeFirstName} ${employeeLastName}`);

    if (this.currentRow) {
        this.currentRow['First Name'] = employeeFirstName;
        this.currentRow['Last Name'] = employeeLastName;
    }

    expect(await this.eform7_employeedetails!.selectEmployeeDetails(
        employeeFirstName, employeeLastName, phoneNumber, sex, pronouns, dateOfBirth, language, sin, address
    )).toBe(true);
});

Then('User should be able to enter Work History details', async function (this: CustomWorld) {
    await this.initPages();
    const jobTitle = this.currentRow?.['Job Title'];
    const empStartDate = this.currentRow?.['Emp Start Date'];
    const empYears = this.currentRow?.['Emp Years'];
    const empMonths = this.currentRow?.['Emp Months'];
    const supervisorContact = this.currentRow?.['Supervisor Contact'];
    const employees = this.currentRow?.['# Employees'];
    const union = this.currentRow?.['Union?'];
    const isSpouseRelative = this.currentRow?.['IsSpouseRelavtive'];
    const employerRelation = this.currentRow?.['EmployerRelation'];

    console.log(`Entering Work History details: Job Title=${jobTitle}`);

    expect(await this.eform7_workhistorydetails!.selectWorkHistoryDetails(
        jobTitle, empStartDate, empYears, empMonths, supervisorContact, employees, union, isSpouseRelative, employerRelation
    )).toBe(true);
});

Then('User should be able to enter Injury Illness details', async function (this: CustomWorld) {
    await this.initPages();
    const whatHappenedInput = this.currentRow?.['WhatHappenedInput'];
    const injuryDate = this.currentRow?.['Injury Date'];
    const bodyParts = this.currentRow?.['Body Parts'];
    const employerKnownDate = this.currentRow?.['EmployerKnownDate'];
    const reportedTo = this.currentRow?.['reported to?'];
    const witness = this.currentRow?.['Witness'];
    const priorConditions = this.currentRow?.['Prior Conditions'];
    const thirdParty = this.currentRow?.['Third Party'];
    const objection = this.currentRow?.['Objection'];

    console.log(`Entering Injury/Illness details: ${whatHappenedInput}`);

    expect(await this.eform7_injuryillnessdetails!.selectInjuryIllnessDetails(
        whatHappenedInput, injuryDate, bodyParts, employerKnownDate, reportedTo, witness, priorConditions, thirdParty, objection
    )).toBe(true);
});

Then('User should be able to enter Health care details', async function (this: CustomWorld) {
    await this.initPages();
    const healthCare = this.currentRow?.['HealthCare'];
    console.log(`Entering Health Care details: ${healthCare}`);
    expect(await this.eform7_healthcaredetails!.selectHealthCareDetails(healthCare)).toBe(true);
});

Then('User should be able to enter Loss Time and Earnings details', async function (this: CustomWorld) {
    await this.initPages();
    const loe = this.currentRow?.['LOE'];
    const typeOfWork = this.currentRow?.['Type of Work'];
    const wageLoss = this.currentRow?.['Wage Loss'];
    console.log(`Entering Loss Time and Earnings details: LOE=${loe}`);
    expect(await this.eform7_losstimeearningsdetails!.selectLossTimeAndEarningsDetails(loe, typeOfWork, wageLoss)).toBe(true);
});

Then('User should be able to attach Supporting Documents', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Attaching supporting documents.");
    expect(await this.eform7_supportingdocuments!.attachSupportingDocuments()).toBe(true);
});

Then('User should be able to review and submit the report', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Reviewing and submitting the report.");
    expect(await this.eform7_reviewandsubmit!.submitEform7Report()).toBe(true);
    console.log(`Report Submitted at: ${new Date().toLocaleString()}`);
});
