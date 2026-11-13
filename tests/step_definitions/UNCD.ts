import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';

Given('User is on Step {int}: Get Started screen', async function (this: CustomWorld, stepNumber: number) {
    await this.initPages();
    console.log(`Verifying user is on Step ${stepNumber}: Get Started screen.`);
    expect(await this.uncdGetStarted!.verifyOnGetStartedPage()).toBe(true);
});

When('User clicks on Submitting a document for an existing claim', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Selecting 'Submitting a document for an existing claim'.");
    await this.uncdGetStarted!.selectNumberedDocument();
});

Then('User enters claim information such as {string}, {string}, {string}', async function (this: CustomWorld, claimnumberParam: string, lastnameParam: string, dateofbirthParam: string) {
    await this.initPages();
    const claimnumber = this.currentRow?.['claimnumber'] || claimnumberParam;
    const lastname = this.currentRow?.['lastname'] || lastnameParam;
    const dateofbirth = this.currentRow?.['dateofbirth'] || dateofbirthParam;

    console.log(`Entering claim information: ${claimnumber}, ${lastname}, ${dateofbirth}`);
    await this.uncdAddClaimantInfo!.AddClaimantInformation(claimnumber, lastname, dateofbirth);
});

Then('User should be able to upload a UNCD document with {string}', async function (this: CustomWorld, filenameParam: string) {
    await this.initPages();
    const originalFilenames = this.currentRow?.['filename'] || filenameParam;
    console.log(`Uploading document: ${originalFilenames}`);
    const timestampedFilenamesList = await this.uncdSubmitDocuments!.uploadDocuments(originalFilenames);
    const timestampedFilenamesString = timestampedFilenamesList.join(',');

    if (this.currentRow) {
        this.currentRow['filename'] = timestampedFilenamesString;
    }
    console.log(`Updated filename in current row for verification: ${timestampedFilenamesString}`);
});

Then('User should be able to select UNCD WSIB form {string}', async function (this: CustomWorld, wsibformParam: string) {
    await this.initPages();
    const wsibform = this.currentRow?.['wsibform'] || wsibformParam;
    console.log(`Selecting UNCD WSIB form: ${wsibform}`);
    await this.uncdSubmitDocuments!.selectWSIBForm(wsibform);
    const filenamestring = this.currentRow?.['filename'] || '';
    await this.uncdSubmitDocuments!.cleanupUploadedFiles(filenamestring);
});

Then('Select delaration and Email consent checkbox and Click on Submit button', async function (this: CustomWorld) {
    await this.initPages();
    console.log('Selecting declaration and email consent, then clicking Submit.');
    expect(await this.uncdReviewSubmission!.submitDocument()).toBe(true);
});

Then('Verify the confirmation screen is displayed', async function (this: CustomWorld) {
    await this.initPages();
    console.log('Verifying confirmation screen.');
    expect(await this.uncdReviewSubmission!.verifyOnConfirmationScreen()).toBe(true);
    console.log(`Document Submitted at: ${new Date().toLocaleString()}`);
});

Then('User should be able to select UNCD Non WSIB form {string}, {string}', async function (this: CustomWorld, categoryParam: string, subformParam: string) {
    await this.initPages();
    const category = this.currentRow?.['nonwsibformcategory'] || categoryParam;
    const subform = this.currentRow?.['subform'] || subformParam;
    console.log(`Selecting UNCD Non-WSIB form: Category=${category}, Subform=${subform}`);
    await this.uncdSubmitDocuments!.selectNonWSIBForm(category, subform);
    const filenamestring = this.currentRow?.['filename'] || '';
    await this.uncdSubmitDocuments!.cleanupUploadedFiles(filenamestring);
});

When('User clicks on Reporting a new injury or exposure', async function (this: CustomWorld) {
    await this.initPages();
    console.log("Selecting 'Reporting a new injury or exposure'.");
    await this.uncdGetStarted!.selectUnNumberedDocument();
});

Then('User enters claim information such as {string}, {string}, {string}, {string}', async function (this: CustomWorld, firstnameParam: string, lastnameParam: string, dateofbirthParam: string, dateofinjuryParam: string) {
    await this.initPages();
    const firstname = this.currentRow?.['firstname'] || firstnameParam;
    const lastname = this.currentRow?.['lastname'] || lastnameParam;
    const dateofbirth = this.currentRow?.['dateofbirth'] || dateofbirthParam;
    const dateofinjury = this.currentRow?.['dateofinjury'] || dateofinjuryParam;

    console.log(`Entering new injury claim information: ${firstname} ${lastname}, DOB=${dateofbirth}, DOI=${dateofinjury}`);
    await this.uncdAddClaimantInfo!.AddClaimantInformationUNCD(firstname, lastname, dateofbirth, dateofinjury);
});

Then('User should be able to select UNCD form {string}', async function (this: CustomWorld, categoryParam: string) {
    await this.initPages();
    const category = this.currentRow?.['formcategory'] || categoryParam;
    console.log(`Selecting UNCD form category: ${category}`);
    await this.uncdSubmitDocuments!.selectUNCDForm(category);
    const filenamestring = this.currentRow?.['filename'] || '';
    await this.uncdSubmitDocuments!.cleanupUploadedFiles(filenamestring);
});

Then('User should be able to select Supporting Documents as {string}', async function (this: CustomWorld, supportingdocument: string) {
    await this.initPages();
    console.log(`Selecting Supporting Documents: ${supportingdocument}`);
    await this.uncdSubmitDocuments!.selectSupportingDocuments(supportingdocument);
});

Then('User should be able to upload a UNCD documents with {string}', async function (this: CustomWorld, filenamesParam: string) {
    await this.initPages();
    const originalFilenames = this.currentRow?.['filenames'] || filenamesParam;
    console.log(`Uploading documents: ${originalFilenames}`);
    const timestampedFilenamesList = await this.uncdSubmitDocuments!.uploadDocuments(originalFilenames);
    const timestampedFilenamesString = timestampedFilenamesList.join(',');

    if (this.currentRow) {
        this.currentRow['filenames'] = timestampedFilenamesString;
    }
    console.log(`Updated filenames in current row for verification: ${timestampedFilenamesString}`);
});

Then('User should be able to select UNCD WSIB forms {string}', async function (this: CustomWorld, wsibformsParam: string) {
    await this.initPages();
    const wsibforms = this.currentRow?.['wsibforms'] || wsibformsParam;
    console.log(`Selecting UNCD WSIB form: ${wsibforms}`);
    await this.uncdSubmitDocuments!.selectWSIBForm(wsibforms);
    const filenamestring = this.currentRow?.['filenames'] || '';
    await this.uncdSubmitDocuments!.cleanupUploadedFiles(filenamestring);
});

Then('User should be able to select UNCD Non WSIB forms {string}, {string}', async function (this: CustomWorld, categorysParam: string, subformsParam: string) {
    await this.initPages();
    const categorys = this.currentRow?.['nonwsibformscategory'] || categorysParam;
    const subforms = this.currentRow?.['subforms'] || subformsParam;
    console.log(`Selecting UNCD Non-WSIB form: Category=${categorys}, Subform=${subforms}`);
    await this.uncdSubmitDocuments!.selectNonWSIBForm(categorys, subforms);
    const filenamestring = this.currentRow?.['filenames'] || '';
    await this.uncdSubmitDocuments!.cleanupUploadedFiles(filenamestring);
});
