import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class HealthCare extends BasePage {
    private readonly HearingLossNoticedYear: Locator;
    private readonly wearHearingAidyes: Locator;
    private readonly wearHearingAidno: Locator;
    private readonly hearingAidUsageDate: Locator;
    private readonly dateOfFirstAudiogram: Locator;
    private readonly audiogramClinicName: Locator;
    private readonly audiogramClinicAddress: Locator;
    private readonly audiogramClinicPhoneNumber: Locator;
    private readonly hasVisitedEntSpecialistYes: Locator;
    private readonly entAppointmentDate: Locator;
    private readonly entSpecialistName: Locator;
    private readonly entSpecialistAddress: Locator;
    private readonly entSpecialistPhoneNumber: Locator;
    private readonly hasVisitedEntSpecialistNo: Locator;
    private readonly experienceRingingQuestionyes: Locator;
    private readonly experienceRingingQuestionno: Locator;
    private readonly ringingEarDurationyes: Locator;
    private readonly ringingEarDurationno: Locator;
    private readonly hasSevereRingingInEaryes: Locator;
    private readonly hasSevereRingingInEarno: Locator;
    private readonly isRingingConstantyes: Locator;
    private readonly isRingingConstantno: Locator;
    private readonly NextButton: Locator;

    constructor(page: Page) {
        super(page);
        this.HearingLossNoticedYear = page.locator('xpath=//*[@name="hearingLossNoticedYear"]');
        this.wearHearingAidyes = page.locator('#wearHearingAidyes');
        this.wearHearingAidno = page.locator('#wearHearingAidno');
        this.hearingAidUsageDate = page.locator('xpath=//*[@name="hearingAidUsageDate"]');
        this.dateOfFirstAudiogram = page.locator('xpath=//*[@name="dateOfFirstAudiogram"]');
        this.audiogramClinicName = page.locator('xpath=//*[@name="audiogramClinicName"]');
        this.audiogramClinicAddress = page.locator('xpath=//*[@name="audiogramClinicAddress"]');
        this.audiogramClinicPhoneNumber = page.locator('xpath=//*[@name="audiogramClinicPhoneNumber"]');
        this.hasVisitedEntSpecialistYes = page.locator('xpath=(//*[@name="hasVisitedEntSpecialist"])[1]');
        this.entAppointmentDate = page.locator('xpath=//*[@name="entAppointmentDate"]');
        this.entSpecialistName = page.locator('xpath=//*[@name="entSpecialistName"]');
        this.entSpecialistAddress = page.locator('xpath=//*[@name="entSpecialistAddress"]');
        this.entSpecialistPhoneNumber = page.locator('xpath=//*[@name="entSpecialistPhoneNumber"]');
        this.hasVisitedEntSpecialistNo = page.locator('xpath=(//*[@name="hasVisitedEntSpecialist"])[1]');
        this.experienceRingingQuestionyes = page.locator('xpath=//*[@id="experienceRingingQuestionyes"]');
        this.experienceRingingQuestionno = page.locator('xpath=//*[@id="experienceRingingQuestionno"]');
        this.ringingEarDurationyes = page.locator('xpath=//*[@id="ringingEarDurationyes"]');
        this.ringingEarDurationno = page.locator('xpath=//*[@id="ringingEarDurationno"]');
        this.hasSevereRingingInEaryes = page.locator('xpath=//*[@id="hasSevereRingingInEaryes"]');
        this.hasSevereRingingInEarno = page.locator('xpath=//*[@id="hasSevereRingingInEarno"]');
        this.isRingingConstantyes = page.locator('xpath=//*[@id="isRingingConstantyes"]');
        this.isRingingConstantno = page.locator('xpath=//*[@id="isRingingConstantno"]');
        this.NextButton = page.locator('xpath=(//button[@role="button" and contains(., "Next")])[2]');
    }

    async EnterHealthCareDetails(
        hearingLossNoticedYear: string,
        wearHearingAid: string,
        hearingAidUsageDate: string,
        dateOfFirstAudiogram: string,
        audiogramClinicName: string,
        audiogramClinicAddress: string,
        audiogramClinicPhoneNumber: string,
        hasVisitedEntSpecialist: string,
        entAppointmentDate: string,
        entSpecialistName: string,
        entSpecialistAddress: string,
        entSpecialistPhoneNumber: string,
        experienceRingingQuestion: string,
        ringingEarDuration: string,
        hasSevereRingingInEar: string,
        isRingingConstant: string
    ): Promise<void> {
        await this.sleep(5000);
        await this.HearingLossNoticedYear.waitFor({ state: 'visible' });

        await this.enter(this.HearingLossNoticedYear, hearingLossNoticedYear);
        if (wearHearingAid.toLowerCase() === 'yes') {
            await this.click(this.wearHearingAidyes);
            await this.enter(this.hearingAidUsageDate, hearingAidUsageDate);
        } else {
            await this.click(this.wearHearingAidno);
        }
        await this.enter(this.dateOfFirstAudiogram, dateOfFirstAudiogram);
        await this.enter(this.audiogramClinicName, audiogramClinicName);
        await this.enter(this.audiogramClinicAddress, audiogramClinicAddress);
        await this.enter(this.audiogramClinicPhoneNumber, audiogramClinicPhoneNumber);

        if (hasVisitedEntSpecialist.toLowerCase() === 'yes') {
            await this.click(this.hasVisitedEntSpecialistYes);
            await this.enter(this.entAppointmentDate, entAppointmentDate);
            await this.enter(this.entSpecialistName, entSpecialistName);
            await this.enter(this.entSpecialistAddress, entSpecialistAddress);
            await this.enter(this.entSpecialistPhoneNumber, entSpecialistPhoneNumber);
        } else {
            await this.click(this.hasVisitedEntSpecialistNo);
        }

        if (experienceRingingQuestion.toLowerCase() === 'yes') {
            await this.click(this.experienceRingingQuestionyes);
            if (ringingEarDuration === 'Less than 2 years') {
                await this.click(this.ringingEarDurationyes);
            } else {
                await this.click(this.ringingEarDurationno);
            }
            if (hasSevereRingingInEar.toLowerCase() === 'yes') {
                await this.click(this.hasSevereRingingInEaryes);
            } else {
                await this.click(this.hasSevereRingingInEarno);
            }
            if (isRingingConstant.toLowerCase() === 'yes') {
                await this.click(this.isRingingConstantyes);
            } else {
                await this.click(this.isRingingConstantno);
            }
        } else {
            await this.click(this.experienceRingingQuestionno);
        }
        await this.click(this.NextButton);
        await this.sleep(5000);
    }
}
