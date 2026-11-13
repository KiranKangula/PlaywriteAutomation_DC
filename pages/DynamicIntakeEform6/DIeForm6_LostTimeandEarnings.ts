import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm6_LostTimeandEarnings extends BasePage {
    private readonly nextButton: Locator;
    private readonly timeLostYes: Locator;
    private readonly timeLostNo: Locator;
    private readonly missedDate: Locator;
    private readonly offeredToYes: Locator;
    private readonly offeredToNo: Locator;
    private readonly modifiedDate: Locator;
    private readonly modifiedWorkAccepted: Locator;
    private readonly modifiedWorkDeclined: Locator;
    private readonly declineReason: Locator;
    private readonly returnToWorkYes: Locator;
    private readonly returnToWorkNo: Locator;
    private readonly returnedDate: Locator;
    private readonly typeOfWorkRegular: Locator;
    private readonly typeOfWorkModified: Locator;
    private readonly expectedModifiedDate: Locator;
    private readonly wageLostYes: Locator;
    private readonly wageLostNo: Locator;
    private readonly addContactButton: Locator;
    private readonly ContactFirstName: Locator;
    private readonly ContactLastName: Locator;
    private readonly ContactPhoneNumber: Locator;
    private readonly saveButton: Locator;
    private readonly returningDateDay: Locator;
    private readonly returningDateMonth: Locator;
    private readonly returningDateYear: Locator;
    private readonly empContinueToPayYes: Locator;
    private readonly empContinueToPayNo: Locator;
    private readonly otherBenefitYes: Locator;
    private readonly otherBenefitNo: Locator;
    private readonly radioMultipleEmploymentYes: Locator;
    private readonly radioMultipleEmploymentNo: Locator;

    constructor(page: Page) {
        super(page);
        this.nextButton = this.page.locator('xpath=//*[@id="intakeBodySection"]/div[2]/div[1]/span[2]/a/span');
        this.timeLostYes = this.page.locator('xpath=//*[@id="radioTimeLost"]/div[1]/label/span');
        this.timeLostNo = this.page.locator('xpath=//*[@id="radioTimeLost"]/div[2]/label/span');
        this.missedDate = this.page.locator('#lost-time-date-picker');
        this.offeredToYes = this.page.locator('xpath=//*[@id="radioOfferedTo"]/div[1]/label');
        this.offeredToNo = this.page.locator('xpath=//*[@id="radioOfferedTo"]/div[2]/label');
        this.modifiedDate = this.page.locator('#modified-offer-date-picker');
        this.modifiedWorkAccepted = this.page.locator('xpath=//*[@id="radioModifiedWork"]/div[1]/label');
        this.modifiedWorkDeclined = this.page.locator('xpath=//*[@id="radioModifiedWork"]/div[2]/label');
        this.declineReason = this.page.locator('#declineReasonArea');
        this.returnToWorkYes = this.page.locator('xpath=//*[@id="returnToWorkRadio"]/div[1]/label');
        this.returnToWorkNo = this.page.locator('xpath=//*[@id="returnToWorkRadio"]/div[2]/label');
        this.returnedDate = this.page.locator('#rtw-work-date-picker');
        this.typeOfWorkRegular = this.page.locator('xpath=//*[@id="radioTypeOfWork"]/div[1]/label');
        this.typeOfWorkModified = this.page.locator('xpath=//*[@id="radioTypeOfWork"]/div[2]/label');
        this.expectedModifiedDate = this.page.locator('#expected-rtw-date-picker');
        this.wageLostYes = this.page.locator('xpath=//*[@id="radioIsWageLost"]/div[1]/label');
        this.wageLostNo = this.page.locator('xpath=//*[@id="radioIsWageLost"]/div[2]/label');
        this.addContactButton = this.page.locator('xpath=//*[@id="AddContactButton"]/span/span');
        this.ContactFirstName = this.page.locator('#inputFirstName');
        this.ContactLastName = this.page.locator('#inputLastName');
        this.ContactPhoneNumber = this.page.locator('#inputPhoneNumeber');
        this.saveButton = this.page.locator('#btnSave');
        this.returningDateDay = this.page.locator('#dropdownReturningDate-wrapper');
        this.returningDateMonth = this.page.locator('#dropdownReturningMonth-wrapper');
        this.returningDateYear = this.page.locator('#dropdownReturningYear-wrapper');
        this.empContinueToPayYes = this.page.locator('xpath=//*[@id="radioIsPaid"]/div[1]/label');
        this.empContinueToPayNo = this.page.locator('xpath=//*[@id="radioIsPaid"]/div[2]/label');
        this.otherBenefitYes = this.page.locator('xpath=//*[@id="radioOtherBenefit"]/div[1]/label');
        this.otherBenefitNo = this.page.locator('xpath=//*[@id="radioOtherBenefit"]/div[2]/label');
        this.radioMultipleEmploymentYes = this.page.locator('xpath=//*[@id="radioMultipleEmployment"]/div[1]/label');
        this.radioMultipleEmploymentNo = this.page.locator('xpath=//*[@id="radioMultipleEmployment"]/div[2]/label');
    }

    async enterMissedTimeFromWorkDetails(missedTimeFromWork: string, missedTimeFromWorkStartDate: string): Promise<void> {
        await this.timeLostYes.waitFor({ state: 'visible' });
        if (missedTimeFromWork.toLowerCase() === 'yes') {
            await this.click(this.timeLostYes);
            await this.click(this.missedDate);
            await this.enter(this.missedDate, missedTimeFromWorkStartDate);
        } else {
            await this.click(this.timeLostNo);
        }
        await this.click(this.nextButton);
    }

    async enterModifiedWorkDetails(offeredTo: string, modifiedDate: string, modifiedWork: string, declineReason: string): Promise<void> {
        await this.offeredToYes.waitFor({ state: 'visible' });
        if (offeredTo.toLowerCase() === 'yes') {
            await this.click(this.offeredToYes);
            await this.click(this.modifiedDate);
            await this.enter(this.modifiedDate, modifiedDate);
            if (modifiedWork.toLowerCase() === 'accepted') {
                await this.click(this.modifiedWorkAccepted);
            } else {
                await this.click(this.modifiedWorkDeclined);
                await this.enter(this.declineReason, declineReason);
            }
        } else {
            await this.click(this.offeredToNo);
        }
        await this.click(this.nextButton);
    }

    async enterReturnToWorkDetails(returningToWork: string, returningDate: string, typeOfReturn: string, modifiedDate: string, wageLoss: string, rtwContact: string, returnedDate: string): Promise<void> {
        await this.returnToWorkYes.waitFor({ state: 'visible' });
        if (returningToWork.toLowerCase() === 'yes') {
            await this.click(this.returnToWorkYes);
            await this.sleep(1000);
            await this.click(this.returnedDate);
            await this.enter(this.returnedDate, returningDate);
            if (typeOfReturn.toLowerCase() === 'regular') {
                await this.click(this.typeOfWorkRegular);
                if (wageLoss.toLowerCase() === 'yes') {
                    await this.click(this.wageLostYes);
                    await this.click(this.addContactButton);
                    const contactParts = rtwContact.split('|');
                    await this.enter(this.ContactFirstName, contactParts[0]);
                    await this.enter(this.ContactLastName, contactParts[1]);
                    await this.enter(this.ContactPhoneNumber, contactParts[2]);
                    await this.click(this.saveButton);
                } else {
                    await this.click(this.wageLostNo);
                }
            } else {
                await this.click(this.typeOfWorkModified);
                await this.expectedModifiedDate.waitFor({ state: 'visible' });
                await this.enter(this.expectedModifiedDate, modifiedDate);
                await this.click(this.typeOfWorkModified);
                if (wageLoss.toLowerCase() === 'yes') {
                    await this.click(this.wageLostYes);
                } else {
                    await this.click(this.wageLostNo);
                }
                await this.click(this.addContactButton);
                const contactParts = rtwContact.split('|');
                await this.enter(this.ContactFirstName, contactParts[0]);
                await this.enter(this.ContactLastName, contactParts[1]);
                await this.enter(this.ContactPhoneNumber, contactParts[2]);
                await this.click(this.saveButton);
            }
        } else {
            await this.click(this.returnToWorkNo);
            const dateParts = returningDate.split('|');
            await this.selectJutroDropdownOption('returningDateDay', dateParts[0]);
            await this.selectJutroDropdownOption('returningDateMonth', dateParts[1]);
            await this.selectJutroDropdownOption('returningDateYear', dateParts[2]);
            await this.click(this.addContactButton);
            const contactParts = rtwContact.split('|');
            await this.enter(this.ContactFirstName, contactParts[0]);
            await this.enter(this.ContactLastName, contactParts[1]);
            await this.enter(this.ContactPhoneNumber, contactParts[2]);
            await this.click(this.saveButton);
        }
        await this.click(this.nextButton);
    }

    async enterAdditionalEarningsAndBenefits(additionalEarnings: string, additionalBenefits: string, didYouWorkforMorethanOneEmpl: string): Promise<void> {
        await this.empContinueToPayYes.waitFor({ state: 'visible' });
        if (additionalEarnings.toLowerCase() === 'yes') {
            await this.click(this.empContinueToPayYes);
        } else {
            await this.click(this.empContinueToPayNo);
        }
        if (additionalBenefits.toLowerCase() === 'yes') {
            await this.click(this.otherBenefitYes);
        } else {
            await this.click(this.otherBenefitNo);
        }
        if (await this.radioMultipleEmploymentYes.isVisible()) {
            if (didYouWorkforMorethanOneEmpl.toLowerCase() === 'yes') {
                await this.click(this.radioMultipleEmploymentYes);
            } else {
                await this.click(this.radioMultipleEmploymentNo);
            }
        } else {
            console.log('Did you work for more than 1 employer is not displayed');
        }
        await this.click(this.nextButton);
    }

    async enterAuthorizedRepDetails(): Promise<void> {
        await this.sleep(2000);
        await this.click(this.nextButton);
    }
}
