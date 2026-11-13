import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWClaimRegistrationPage extends BasePage {
    private readonly DesktopTab: Locator;
    private readonly ClaimTab_arrow: Locator;
    private readonly ManualRegistrationlink: Locator;
    private readonly ttlBar: Locator;
    private readonly SourceofInformation: Locator;
    private readonly IntakeChannel: Locator;
    private readonly ClaimantMenuIcon: Locator;
    private readonly NewWorkerMenuItem: Locator;
    private readonly ClaimantMenuItem_Search: Locator;
    private readonly WCBID: Locator;
    private readonly FirstName: Locator;
    private readonly LastName: Locator;
    private readonly PrimaryPhone: Locator;
    private readonly Address_PostalCode: Locator;
    private readonly AddressLookUp: Locator;
    private readonly AddressSelectButton: Locator;
    private readonly Gender: Locator;
    private readonly DateOfBirth: Locator;
    private readonly UpdateContactButton: Locator;
    private readonly SINDoesNotExist: Locator;
    private readonly ValidateAddressButton: Locator;
    private readonly CreateNewWorkerCM: Locator;
    private readonly employerNameMenuIcon: Locator;
    private readonly MenuItem_Search: Locator;
    private readonly accountNumberInput: Locator;
    private readonly EmployerSearch_link: Locator;
    private readonly EmployerSelect_link: Locator;
    private readonly SelectBussActivity: Locator;
    private readonly BussinessActivitySelect_link: Locator;
    private readonly BranchAddressPicker: Locator;
    private readonly MailingAddressPicker: Locator;
    private readonly DateofAccident: Locator;
    private readonly DateReportedToEmployer: Locator;
    private readonly AreaofBody: Locator;
    private readonly AreaofInjury: Locator;
    private readonly AccidentType: Locator;
    private readonly DetailedAccidentType: Locator;
    private readonly NatureOfInjury: Locator;
    private readonly AddBodyPart: Locator;
    private readonly ThirdPartyNo: Locator;
    private readonly ThirdPartyYes: Locator;
    private readonly AccidentLocation: Locator;
    private readonly HealthCareReceived: Locator;
    private readonly ClaimType: Locator;
    private readonly RegisterClaim: Locator;
    private readonly NewClaimHeader: Locator;
    private readonly GoToClaim: Locator;
    private readonly PIN: Locator;
    private readonly DOB: Locator;
    private readonly ClaimantFName: Locator;
    private readonly ClaimantLName: Locator;
    private readonly GenderClaimant: Locator;
    private readonly ClaimantPronouns: Locator;
    private readonly WarningMessage: Locator;
    private readonly PriorClaimsTab: Locator;

    constructor(page: Page) {
        super(page);
        this.DesktopTab = this.page.locator('#TabBar\\:DesktopTab');
        this.ClaimTab_arrow = this.page.locator('xpath=//*[@id="TabBar:ClaimTab_arrow"]/span');
        this.ManualRegistrationlink = this.page.locator('#TabBar\\:ClaimTab\\:QuickClaimRegistrarion');
        this.ttlBar = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:ttlBar');
        this.SourceofInformation = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:IntakeIdDV\\:WSIB_IntakeForm');
        this.IntakeChannel = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:IntakeIdDV\\:WSIB_IntakeChannel');
        this.ClaimantMenuIcon = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:Claimant\\:ClaimantMenuIcon');
        this.NewWorkerMenuItem = this.page.locator('xpath=//*[contains(@id,"ClaimNewWorkerOnlyPickerMenuItemSet_NewWorkerMenuItem")]');
        this.ClaimantMenuItem_Search = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:Claimant\\:MenuItem_Search');
        this.WCBID = this.page.locator('xpath=//*[contains(@id,"WSIB_ContactSearchUIDInputSet:WSBId")]');
        this.FirstName = this.page.locator('xpath=//*[contains(@id,"ContactBasicsDV:PersonNameInputSet:FirstName")]');
        this.LastName = this.page.locator('xpath=//*[contains(@id,"ContactBasicsDV:PersonNameInputSet:LastName")]');
        this.PrimaryPhone = this.page.locator('xpath=//*[contains(@id,"ContactBasicsDV:PersonContactInfoInputSet:PrimaryPhone")]');
        this.Address_PostalCode = this.page.locator('xpath=//*[contains(@id,"ContactBasicsDV:WSIB_MailingAddressInputSet:FNOLAddressInputSet:Address_PostalCode")]');
        this.AddressLookUp = this.page.locator('xpath=//*[contains(@id,"ContactBasicsDV:WSIB_MailingAddressInputSet:FNOLAddressInputSet:Standardize")]/span[2]');
        this.AddressSelectButton = this.page.locator('xpath=//*[contains(@id,"WSIB_AddressStandardizationPopup:WSIB_AddressStandardizationLV:0:_Select_link")]');
        this.Gender = this.page.locator('xpath=//*[contains(@id,"ContactBasicsDV:AdditionalInfoInputSet:Gender")]');
        this.DateOfBirth = this.page.locator('xpath=//*[contains(@id,"ContactBasicsDV:AdditionalInfoInputSet:WSIB_ContactDateOfBirthInputSet:DateOfBirth")]');
        this.UpdateContactButton = this.page.locator('xpath=//*[@id="NewContactPopup:ContactDetailScreen:ContactBasicsDV_tb:ContactDetailToolbarButtonSet:Update"]/span[2]');
        this.SINDoesNotExist = this.page.locator('xpath=//*[contains(@id,"ContactBasicsDV:AdditionalInfoInputSet:SINDoesNotExist")]');
        this.ValidateAddressButton = this.page.locator('xpath=//*[@id="WSIB_Form8_FNOLWizard:WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:AddressValidation"]/span[2]');
        this.CreateNewWorkerCM = this.page.locator('xpath=//*[contains(@id,"AddressBookMatchWorksheet_CreateNewContactButton")]/span[2]');
        this.employerNameMenuIcon = this.page.locator('xpath=//a[contains(@id,"WSIB_Form8_FNOLWizard:WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:employerName:employerNameMenuIcon")]');
        this.MenuItem_Search = this.page.locator('xpath=//*[contains(@id,"WSIB_Form8_FNOLWizard:WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:employerName:MenuItem_Search")]');
        this.accountNumberInput = this.page.locator('xpath=//*[contains(@id,"AddressBookPolicyCenterPanel:AddressBookPolicyCenterSearchPanelSet:AddressBookSearchDV:accountNumber")]');
        this.EmployerSearch_link = this.page.locator('xpath=//*[contains(@id,"AddressBookPolicyCenterSearchPanelSet:AddressBookSearchDV:SearchAndResetInputSet:SearchLinksInputSet:Search_link")]');
        this.EmployerSelect_link = this.page.locator('xpath=//*[contains(@id,"AddressBookPolicyCenterSearchPanelSet:WSIB_AddressBookSearchLV:0:_Select_link")]');
        this.SelectBussActivity = this.page.locator('xpath=//*[@id="WSIB_Form8_FNOLWizard:WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:ClaimPolicyGeneral_SelectPolicyButton"]/span[2]');
        this.BussinessActivitySelect_link = this.page.locator('xpath=//*[contains(@id,"ClaimPolicySelectPolicyScreen:PolicyResultLV:0:_Select_link")]');
        this.BranchAddressPicker = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_BranchLocation:AddressInputSet:AddressPicker")]');
        this.MailingAddressPicker = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_MailingAddress:AddressInputSet:AddressPicker")]');
        this.DateofAccident = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_ClaimLossDate")]');
        this.DateReportedToEmployer = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_DateRptedToEmployer")]');
        this.AreaofBody = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:EditableBodyPartDetailsLV:0:PrimaryBodyPart")]');
        this.AreaofInjury = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:EditableBodyPartDetailsLV:0:DetailedBodyPart")]');
        this.AccidentType = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_AccidentType")]');
        this.DetailedAccidentType = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_TypeOfInjury")]');
        this.NatureOfInjury = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_NatureOfInjury")]');
        this.AddBodyPart = this.page.locator('xpath=//*[@id="WSIB_Form8_FNOLWizard:WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:EditableBodyPartDetailsLV_tb:Add"]/span[2]');
        this.ThirdPartyNo = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:ThirdPartyYesNo_false")]');
        this.ThirdPartyYes = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:ThirdPartyYesNo_true")]');
        this.AccidentLocation = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:accidentlocation2:AddressInputSet:AddressPicker")]');
        this.HealthCareReceived = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_HCReceivedWorker")]');
        this.ClaimType = this.page.locator('xpath=//*[contains(@id,"WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:Registration_ClaimType")]');
        this.RegisterClaim = this.page.locator('xpath=//*[@id="WSIB_Form8_FNOLWizard:WorkersCompWizardStepSet:WSIB_ClaimRegistrationScreen:ToolbarButton__dup_1"]/span[2]');
        this.NewClaimHeader = this.page.locator('xpath=//*[@id="NewClaimSaved:NewClaimSavedScreen:NewClaimSavedDV:Header"]');
        this.GoToClaim = this.page.locator('xpath=//*[@id="NewClaimSaved:NewClaimSavedScreen:NewClaimSavedDV:GoToClaim"]/span');
        this.PIN = this.page.locator('xpath=//*[contains(@id,"Claim:ClaimInfoBar:WSIB_WorkerSelfEnrollmentPIN_link")]');
        this.DOB = this.page.locator('xpath=//*[contains(@id,"Claim:ClaimInfoBar:DOB_link")]');
        this.ClaimantFName = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:Registration_ClaimantFirstName');
        this.ClaimantLName = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:Registration_ClaimantLastName');
        this.GenderClaimant = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:Registration_ClaimantGender');
        this.ClaimantPronouns = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:Registration_ClaimantPronoun');
        this.WarningMessage = this.page.locator('xpath=//*[@id="WebMessageWorksheet:WebMessageWorksheetScreen:grpMsgs_msgs"]/div[1]');
        this.PriorClaimsTab = this.page.locator('#WSIB_Form8_FNOLWizard\\:WorkersCompWizardStepSet\\:WSIB_ClaimRegistrationScreen\\:PriorClaimsTabTab');
    }

    async KickManualRegistration(): Promise<boolean> {
        await this.click(this.DesktopTab);
        await this.click(this.ClaimTab_arrow);
        await this.click(this.ManualRegistrationlink);
        return await this.ttlBar.isVisible();
    }

    async selectSourceofInformation(source: string): Promise<void> {
        await this.SourceofInformation.selectOption({ label: source });
    }

    async createNewWorker(firstname: string, lastname: string, gender: string, dob: string, postalcode: string, phonenumber: string): Promise<void> {
        await this.sleep(2000);
        await this.click(this.ClaimantMenuIcon);
        await this.click(this.NewWorkerMenuItem);
        await this.enter(this.FirstName, firstname);
        await this.enter(this.LastName, lastname);
        await this.enter(this.PrimaryPhone, phonenumber);
        await this.enter(this.DateOfBirth, dob);
        await this.enter(this.Gender, gender);
        await this.enter(this.Address_PostalCode, postalcode);
        await this.click(this.AddressLookUp);
        await this.click(this.AddressSelectButton);
        await this.click(this.SINDoesNotExist);
        await this.click(this.UpdateContactButton);
        await this.ValidateAddressButton.waitFor({ state: 'visible' });
        await this.click(this.ValidateAddressButton);
        await this.click(this.CreateNewWorkerCM);
    }

    async searchAccountNumber(accountnumber: string): Promise<void> {
        await this.sleep(2000);
        await this.click(this.employerNameMenuIcon);
        await this.click(this.MenuItem_Search);
        await this.enter(this.accountNumberInput, accountnumber);
        await this.click(this.EmployerSearch_link);
        await this.EmployerSelect_link.waitFor({ state: 'visible' });
        await this.click(this.EmployerSelect_link);
        await this.click(this.SelectBussActivity);
        await this.click(this.BussinessActivitySelect_link);
        await this.BranchAddressPicker.selectOption({ index: 1 });
        await this.sleep(2000);
        await this.MailingAddressPicker.selectOption({ index: 1 });
    }

    async enterAccidentDetails(DateofAccident: string, DateReportedToEmployer: string): Promise<void> {
        await this.DateofAccident.waitFor({ state: 'visible' });
        await this.enter(this.DateofAccident, DateofAccident);
        await this.enter(this.DateReportedToEmployer, DateReportedToEmployer);
    }

    async enterBodyPartDetails(AreaofBody: string, AccidentType: string, AreaofInjury: string, DetailedAccidentType: string, NatureOfInjury: string): Promise<void> {
        try {
            if (!(await this.AreaofBody.isVisible())) {
                await this.click(this.AddBodyPart);
            }
        } catch (e) {
            await this.click(this.AddBodyPart);
        }
        await this.AreaofBody.selectOption({ label: AreaofBody });
        await this.AreaofInjury.selectOption({ label: AreaofInjury });
        await this.AccidentType.selectOption({ label: AccidentType });
        await this.DetailedAccidentType.selectOption({ label: DetailedAccidentType });
        await this.NatureOfInjury.selectOption({ label: NatureOfInjury });
    }

    async TPASelection(tpa: string): Promise<void> {
        await this.sleep(2000);
        if (tpa === 'Yes') {
            await this.click(this.ThirdPartyYes);
        } else {
            await this.click(this.ThirdPartyNo);
        }
    }

    async selectAccidentLocation(): Promise<void> {
        await this.sleep(2000);
        await this.AccidentLocation.selectOption({ index: 1 });
    }

    async selectHealthCareRecieved(hcIndicator: string): Promise<void> {
        await this.sleep(2000);
        await this.HealthCareReceived.selectOption({ label: hcIndicator });
    }

    async selectClaimType(claimtype: string): Promise<void> {
        await this.sleep(2000);
        await this.ClaimType.selectOption({ label: claimtype });
    }

    async registerClaim(): Promise<string[]> {
        await this.sleep(2000);
        await this.click(this.RegisterClaim);
        try {
            if ((await this.WarningMessage.isVisible()) && (await this.WarningMessage.innerText()).includes('This worker has recent prior claims')) {
                await this.click(this.PriorClaimsTab);
                await this.sleep(2000);
                await this.click(this.RegisterClaim);
            }
        } catch (e) {}
        await this.NewClaimHeader.waitFor({ state: 'visible' });
        const claimnumber = (await this.NewClaimHeader.innerText()).split(' ')[1];
        await this.click(this.GoToClaim);
        return [claimnumber, (await this.DOB.innerText()).split(' ')[1]];
    }

    async verifyIntakeWorkerInformation(fname: string, lname: string, gender: string, pronouns: string): Promise<void> {
        expect(await this.IntakeChannel.innerText()).toBe('Online services for people with claims');
        expect(await this.ClaimantFName.inputValue()).toBe(fname);
        expect(await this.ClaimantLName.inputValue()).toBe(lname);
        expect(await this.GenderClaimant.innerText()).toBe(gender);
        expect(await this.ClaimantPronouns.innerText()).toBe(pronouns);
        await this.click(this.ValidateAddressButton);
        await this.click(this.CreateNewWorkerCM);
    }

    async searchExistingWorker(wcbid: string): Promise<boolean> {
        await this.sleep(2000);
        await this.click(this.ClaimantMenuIcon);
        await this.click(this.ClaimantMenuItem_Search);
        await this.enter(this.WCBID, wcbid);
        await this.click(this.EmployerSearch_link);
        await this.EmployerSelect_link.waitFor({ state: 'visible' });
        await this.click(this.EmployerSelect_link);
        return true;
    }
}
