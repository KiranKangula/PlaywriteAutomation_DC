import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm6_ExposureDetails extends BasePage {
    private readonly nextButton: Locator;
    private readonly exposureToInfectiousSubstance: Locator;
    private readonly exposureToOther: Locator;
    private readonly exposureDate: Locator;
    private readonly sourceOfInfection: Locator;
    private readonly exposureSource: Locator;
    private readonly suspectedSubstance: Locator;
    private readonly contactedByCeir: Locator;
    private readonly affectedAreaDetails: Locator;
    private readonly protectiveEquipmentInfo: Locator;

    constructor(page: Page) {
        super(page);
        this.nextButton = this.page.locator('xpath=//*[@id="intakeBodySection"]/div[2]/div[1]/span[2]/a/span');
        this.exposureToInfectiousSubstance = this.page.locator('xpath=//*[@id="radiobuttonOccurance"]/div[1]/label');
        this.exposureToOther = this.page.locator('xpath=//*[@id="radiobuttonOccurance"]/div[2]/label');
        this.exposureDate = this.page.locator('#exposure-date-picker');
        this.sourceOfInfection = this.page.locator('#sourceOfInfection-wrapper');
        this.exposureSource = this.page.locator('#exposureSource');
        this.suspectedSubstance = this.page.locator('#suspectedSubstance-wrapper');
        this.contactedByCeir = this.page.locator('#contactedByCeir-wrapper');
        this.affectedAreaDetails = this.page.locator('#affectedAreaDetails');
        this.protectiveEquipmentInfo = this.page.locator('#protectiveEquipmentInfo');
    }

    async enterExposureDetails(exposureTo: string, exposureDate: string, howContacted: string, sourceofExposure: string,
                                whatSubstance: string, DescribeWhere: string, Whatareyouwearing: string): Promise<void> {

        await this.exposureToInfectiousSubstance.waitFor({ state: 'visible' });
        if (exposureTo.toLowerCase() === 'infectious substance') {
            await this.click(this.exposureToInfectiousSubstance);
            await this.exposureDate.waitFor({ state: 'visible' });
            await this.enter(this.exposureDate, exposureDate);
            await this.selectJutroDropdownOption('sourceOfInfection', howContacted);
            await this.enter(this.exposureSource, sourceofExposure);
            await this.selectJutroDropdownOption('suspectedSubstance', whatSubstance);
        } else {
            await this.click(this.exposureToOther);
            await this.exposureDate.waitFor({ state: 'visible' });
            await this.enter(this.exposureDate, exposureDate);
            await this.selectJutroDropdownOption('contactedByCeir', howContacted);
            await this.enter(this.affectedAreaDetails, DescribeWhere);
            await this.enter(this.protectiveEquipmentInfo, Whatareyouwearing);
        }
        await this.click(this.nextButton);
    }
}
