import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../step_definitions/world';

Then('Enter data in Clothing allowance application screen', async function (this: CustomWorld) {
    await this.initPages();

    const phonenumber = this.currentRow['phonenumber'];
    const ppdNel = this.currentRow['ppdNel'];
    const receivedCa = this.currentRow['receivedCa'];
    const otherClaimNumber = this.currentRow['otherClaimNumber'];
    const isEmployed = this.currentRow['isEmployed'];
    const usesDeviceAtWork = this.currentRow['usesDeviceAtWork'];
    const employerPaysForUniform = this.currentRow['employerPaysForUniform'];
    const uniformOverClothing = this.currentRow['uniformOverClothing'];
    const damage = this.currentRow['damage'];
    const date = this.currentRow['startDate'];
    const hoursPerDay = this.currentRow['hoursPerDay'];
    const daysPerWeek = this.currentRow['daysPerWeek'];
    const upperBody = this.currentRow['UpperBody'];
    const lowerBody = this.currentRow['LowerBody'];
    const otherDevice = this.currentRow['OtherDevice'];
    const metalParts = this.currentRow['metalParts'];
    const repairOrReplaced = this.currentRow['repairOrReplaced'];

    this.log(`Entering data in Clothing Allowance application screen for phone: ${phonenumber}`);
    expect(await this.clothingAllowance.enterClothingAllowanceDetails(
        phonenumber, ppdNel, receivedCa, otherClaimNumber, isEmployed,
        usesDeviceAtWork, employerPaysForUniform, uniformOverClothing, damage,
        date, hoursPerDay, daysPerWeek, upperBody, lowerBody, otherDevice,
        metalParts, repairOrReplaced
    )).toBeTruthy();
});
