import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class Clothingallowance extends BasePage {
    private readonly telephoneNumber: Locator;
    private readonly PDPNelYes: Locator;
    private readonly PDPNelNo: Locator;
    private readonly receivedCaYes: Locator;
    private readonly receivedCaNo: Locator;
    private readonly otherClaimNumber: Locator;
    private readonly isEmployedYes: Locator;
    private readonly isEmployedNo: Locator;
    private readonly usesDeviceAtWorkYes: Locator;
    private readonly usesDeviceAtWorkNo: Locator;
    private readonly employerPaysForUniformYes: Locator;
    private readonly employerPaysForUniformNo: Locator;
    private readonly uniformOverClothing: Locator;
    private readonly uniformInsteadClothing: Locator;
    private readonly damage: Locator;
    private readonly day: Locator;
    private readonly month: Locator;
    private readonly year: Locator;
    private readonly hoursPerDay: Locator;
    private readonly daysPerWeek: Locator;
    private readonly armBrace: Locator;
    private readonly backBrace: Locator;
    private readonly backSupport: Locator;
    private readonly cervicalBrace: Locator;
    private readonly legBrace: Locator;
    private readonly legProsthesis: Locator;
    private readonly crutches: Locator;
    private readonly wheelChair: Locator;
    private readonly otherDevice: Locator;
    private readonly metalPartsYes: Locator;
    private readonly metalPartsNo: Locator;
    private readonly repairOrReplacedYes: Locator;
    private readonly repairOrReplacedNo: Locator;
    private readonly NextButton: Locator;
    private readonly ReviewHeader: Locator;
    private readonly isEmailNeeded: Locator;
    private readonly emailAddress: Locator;
    private readonly declaration: Locator;
    private readonly SubmitButton: Locator;
    private readonly ConfirmationHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.telephoneNumber = this.page.locator('#telephoneNumber');
        this.PDPNelYes = this.page.locator("(//input[@id='pdpNel'])[1]");
        this.PDPNelNo = this.page.locator("(//input[@id='pdpNel'])[2]");
        this.receivedCaYes = this.page.locator("(//input[@id='receivedCa'])[1]");
        this.receivedCaNo = this.page.locator("(//input[@id='receivedCa'])[2]");
        this.otherClaimNumber = this.page.locator('#otherClaimNumber');
        this.isEmployedYes = this.page.locator("(//input[@id='isEmployed'])[1]");
        this.isEmployedNo = this.page.locator("(//input[@id='isEmployed'])[2]");
        this.usesDeviceAtWorkYes = this.page.locator("(//input[@id='usesDeviceAtWork'])[1]");
        this.usesDeviceAtWorkNo = this.page.locator("(//input[@id='usesDeviceAtWork'])[2]");
        this.employerPaysForUniformYes = this.page.locator("(//input[@id='employerPaysForUniform'])[1]");
        this.employerPaysForUniformNo = this.page.locator("(//input[@id='employerPaysForUniform'])[2]");
        this.uniformOverClothing = this.page.locator("//div[@id='uniformOverClothing']/label[contains(text(),'Over')]");
        this.uniformInsteadClothing = this.page.locator("//div[@id='uniformOverClothing']/label[contains(text(),'Instead')]");
        this.damage = this.page.locator('#damage');
        this.day = this.page.locator('#day');
        this.month = this.page.locator('#month');
        this.year = this.page.locator('#year');
        this.hoursPerDay = this.page.locator('#hoursPerDay');
        this.daysPerWeek = this.page.locator('#daysPerWeek');
        this.armBrace = this.page.locator('#armBrace');
        this.backBrace = this.page.locator('#backBrace');
        this.backSupport = this.page.locator('#backSupport');
        this.cervicalBrace = this.page.locator('#cervicalBrace');
        this.legBrace = this.page.locator('#legBrace');
        this.legProsthesis = this.page.locator('#legProsthesis');
        this.crutches = this.page.locator('#crutches');
        this.wheelChair = this.page.locator('#wheelChair');
        this.otherDevice = this.page.locator('#other');
        this.metalPartsYes = this.page.locator("(//input[@id='metalParts'])[1]");
        this.metalPartsNo = this.page.locator("(//input[@id='metalParts'])[2]");
        this.repairOrReplacedYes = this.page.locator("(//input[@id='repairOrReplaced'])[1]");
        this.repairOrReplacedNo = this.page.locator("(//input[@id='repairOrReplaced'])[2]");
        this.NextButton = this.page.locator("//button[@class='btn-wsib'][contains(text(),'Next')]");
        this.ReviewHeader = this.page.locator("//h2[contains(text(),'Review')]");
        this.isEmailNeeded = this.page.locator('#isEmailNeeded');
        this.emailAddress = this.page.locator('#emailAddress');
        this.declaration = this.page.locator('#declared');
        this.SubmitButton = this.page.locator("//button[@class='btn-wsib'][contains(text(),'Submit')]");
        this.ConfirmationHeader = this.page.locator("//h2[contains(text(),'Submission was successful')]");
    }

    async enterClothingAllowanceDetails(telephone: string, pdpNel: string, receivedCa: string, otherClaim: string, isEmployed: string,
                                        usesDeviceAtWork: string, employerPaysForUniform: string, uniform: string,
                                        damage: string, date: string, hoursPerDay: string, daysPerWeek: string,
                                        UpperBody: string, LowerBody: string, OtherDevice: string, metalParts: string, repairOrReplaced: string): Promise<boolean> {

        await this.telephoneNumber.waitFor({ state: 'visible' });
        await this.enter(this.telephoneNumber, telephone);

        if (pdpNel.toLowerCase() === 'yes') {
            await this.click(this.PDPNelYes);
        } else {
            await this.click(this.PDPNelNo);
        }

        if (receivedCa.toLowerCase() === 'yes') {
            await this.click(this.receivedCaYes);
            await this.enter(this.otherClaimNumber, otherClaim);
        } else {
            await this.click(this.receivedCaNo);
        }

        if (isEmployed.toLowerCase() === 'yes') {
            await this.click(this.isEmployedYes);
        } else {
            await this.click(this.isEmployedNo);
        }

        if (usesDeviceAtWork.toLowerCase() === 'yes') {
            await this.click(this.usesDeviceAtWorkYes);
        } else {
            await this.click(this.usesDeviceAtWorkNo);
        }

        if (employerPaysForUniform.toLowerCase() === 'yes') {
            await this.click(this.employerPaysForUniformYes);
        } else {
            await this.click(this.employerPaysForUniformNo);
        }

        if (uniform.toLowerCase() === 'over') {
            await this.click(this.uniformOverClothing);
        } else {
            await this.click(this.uniformInsteadClothing);
        }

        await this.enter(this.damage, damage);

        const dob = date.split('/');
        await this.day.selectOption(dob[0]);
        await this.month.selectOption(dob[1]);
        await this.year.selectOption(dob[2]);

        await this.enter(this.hoursPerDay, hoursPerDay);
        await this.enter(this.daysPerWeek, daysPerWeek);

        if (UpperBody === 'Arm Brace') {
            await this.click(this.armBrace);
        } else if (UpperBody === 'Back Brace') {
            await this.click(this.backBrace);
        } else if (UpperBody === 'Back Support') {
            await this.click(this.backSupport);
        } else if (UpperBody === 'Cervical Brace') {
            await this.click(this.cervicalBrace);
        }

        if (LowerBody === 'Leg brace (permanent)') {
            await this.click(this.legBrace);
        } else if (LowerBody === 'Leg Prothesis') {
            await this.click(this.legProsthesis);
        } else if (LowerBody === 'Under arm/forearm supported crutches') {
            await this.click(this.crutches);
        } else if (LowerBody === 'Wheelchair') {
            await this.click(this.wheelChair);
        }

        if (OtherDevice !== '') {
            await this.enter(this.otherDevice, OtherDevice);
        }

        if (metalParts.toLowerCase() === 'yes') {
            await this.click(this.metalPartsYes);
        } else {
            await this.click(this.metalPartsNo);
        }

        if (repairOrReplaced.toLowerCase() === 'yes') {
            await this.click(this.repairOrReplacedYes);
        } else {
            await this.click(this.repairOrReplacedNo);
        }

        await this.click(this.NextButton);
        return await this.ReviewHeader.isVisible();
    }

    async reviewAndSubmit(email: string): Promise<boolean> {
        if (email !== '') {
            await this.click(this.isEmailNeeded);
            await this.enter(this.emailAddress, email);
        }
        await this.click(this.declaration);
        await this.click(this.SubmitButton);
        return await this.ConfirmationHeader.isVisible();
    }
}
