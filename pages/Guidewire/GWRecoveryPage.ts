import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWRecoveryPage extends BasePage {
    private readonly RecoveryLink: Locator;
    private readonly RecoveryDetail_WC: Locator;
    private readonly RecoveryEditLink: Locator;
    private readonly Proposed_RTW_Goal: Locator;
    private readonly Proposed_Interim_RTW_Goal: Locator;
    private readonly Proposed_Recovery_Goal: Locator;
    private readonly ProposedDate_RTW_Goal: Locator;
    private readonly ProposedDate_Interim_RTW_Goal: Locator;
    private readonly ProposedDate_Recovery_Goal: Locator;
    private readonly Current_RTW_Status: Locator;
    private readonly Current_Recovery_Status: Locator;
    private readonly Actual_RTW_Goal: Locator;
    private readonly Actual_Recovery_Goal: Locator;
    private readonly Actual_RTW_Date: Locator;
    private readonly Actual_Recovery_Date: Locator;
    private readonly RecoverLinkUpdateButton: Locator;
    private readonly ViewDeviceDetailsButton: Locator;
    private readonly DeviceAddButton: Locator;
    private readonly DeviceECategory: Locator;
    private readonly DeviceType: Locator;
    private readonly DeviceStatus: Locator;
    private readonly DeviceServiceType: Locator;
    private readonly StartDate: Locator;
    private readonly EndDate: Locator;
    private readonly DecisionDate: Locator;
    private readonly DeviceUpdateButton: Locator;
    private readonly PurposeOfReview: Locator;
    private readonly ReviewBody: Locator;
    private readonly DeviceFinishButton: Locator;
    private readonly ILAAddButton: Locator;
    private readonly ILAStatus: Locator;
    private readonly ILAFromDate: Locator;
    private readonly ILAToDate: Locator;
    private readonly PCAAddButton: Locator;
    private readonly PCAAssesmentType: Locator;
    private readonly PCAAssessmentOutcome: Locator;
    private readonly PCAFromDate: Locator;
    private readonly PCAToDate: Locator;
    private readonly PCAReassesRequired: Locator;
    private readonly PCAReassessmentDate: Locator;
    private readonly TreatmentDetailsButton: Locator;
    private readonly TreatmentAdd: Locator;
    private readonly TreatmentType: Locator;
    private readonly TreatmentStatus: Locator;
    private readonly TreatmentFromDate: Locator;
    private readonly TreatmentToDate: Locator;
    private readonly FreqNumID: Locator;
    private readonly EntitlementDUnit: Locator;
    private readonly TreatmentDetailsUpdate: Locator;
    private readonly PurposeOfReviewTreatment: Locator;
    private readonly BodyTreatment: Locator;
    private readonly FinishTreatment: Locator;
    private readonly MedicationTab: Locator;
    private readonly MedicationAdd: Locator;
    private readonly MedicationType: Locator;
    private readonly MedicationStatus: Locator;
    private readonly SearchMedicines: Locator;
    private readonly MedicinesList: Locator;
    private readonly MedicinesStartDate: Locator;
    private readonly MedicationEndDate: Locator;
    private readonly MedicationPurposeOfReview: Locator;
    private readonly MedicationBody: Locator;
    private readonly MedicationFinish: Locator;
    private readonly Claim_Inc2EntitiesGroup: Locator;
    private readonly Inc2EntitiesGroup_Inc2Sequence: Locator;
    private readonly exposureLOE: Locator;
    private readonly Inc2SequenceEDIT: Locator;
    private readonly Inc2SequenceAdd: Locator;
    private readonly SequenceSourceID: Locator;
    private readonly BenefitType: Locator;
    private readonly SequenceStatus: Locator;
    private readonly SequenceFromDate: Locator;
    private readonly EntitlementPercent: Locator;
    private readonly Inc2SequenceUpdate: Locator;
    private readonly Inc2EntitiesGroup_Inc2Cheque: Locator;
    private readonly Inc2ChequeEdit: Locator;
    private readonly Inc2ChequeAdd: Locator;
    private readonly ChequeSourceID: Locator;
    private readonly Inc2ChequePayee: Locator;
    private readonly Inc2ChequePayTo: Locator;
    private readonly Inc2ChequeStatus: Locator;
    private readonly Inc2ChequeAmount: Locator;
    private readonly Inc2ChequeIssuedDate: Locator;
    private readonly Inc2ChequeUpdate: Locator;
    private readonly Inc2ChequePayment: Locator;
    private readonly Inc2ChequePaymentEdit: Locator;
    private readonly Inc2ChequePaymentAdd: Locator;
    private readonly Inc2ChequePaymentCostCategory: Locator;
    private readonly Inc2ChequePaymentCostType: Locator;
    private readonly Inc2ChequePaymentAmount: Locator;
    private readonly Inc2ChequePaymentPayFromDate: Locator;
    private readonly Inc2ChequePaymentPayToDate: Locator;
    private readonly Inc2ChequePaymentUpdate: Locator;
    private readonly ClothingAllowanceAdd: Locator;
    private readonly ClothingAllowanceApproved_True: Locator;
    private readonly ClothingAllowance_DecisionDate: Locator;

    constructor(page: Page) {
        super(page);
        this.RecoveryLink = this.page.locator('#Claim\\:MenuLinks\\:Claim_RTWRecMenu_WC');
        this.RecoveryDetail_WC = this.page.locator('#RTWRecMenu_WC\\:MenuLinks\\:RTWRecMenu_WC_RecoveryDetail_WC');
        this.RecoveryEditLink = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:Edit');
        this.Proposed_RTW_Goal = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:Goals_ProposedWCLV\\:0\\:Goal');
        this.Proposed_Interim_RTW_Goal = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:Goals_ProposedWCLV\\:1\\:Goal');
        this.Proposed_Recovery_Goal = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:Goals_ProposedWCLV\\:2\\:Goal');
        this.ProposedDate_RTW_Goal = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:Goals_ProposedWCLV\\:0\\:GoalDate');
        this.ProposedDate_Interim_RTW_Goal = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:Goals_ProposedWCLV\\:1\\:GoalDate');
        this.ProposedDate_Recovery_Goal = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:Goals_ProposedWCLV\\:2\\:GoalDate');
        this.Current_RTW_Status = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:CUrrentStatus\\:WSIB_ICAPRecStatusLV\\:0\\:Status');
        this.Current_Recovery_Status = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:CUrrentStatus\\:WSIB_ICAPRecStatusLV\\:1\\:Status');
        this.Actual_RTW_Goal = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:WRStatus\\:WSIB_ICAPRecActualOutcomeLV\\:0\\:Status');
        this.Actual_Recovery_Goal = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:WRStatus\\:WSIB_ICAPRecActualOutcomeLV\\:1\\:Status');
        this.Actual_RTW_Date = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:WRStatus\\:WSIB_ICAPRecActualOutcomeLV\\:0\\:ActualDate');
        this.Actual_Recovery_Date = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:WRStatus\\:WSIB_ICAPRecActualOutcomeLV\\:1\\:ActualDate');
        this.RecoverLinkUpdateButton = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:CompleteMedicationButton');
        this.ViewDeviceDetailsButton = this.page.locator('xpath=//*[contains(@id, "DevicePanelRef:WSIB_LatestDeviceDetailsLV_tb:ToolbarButton")]');
        this.DeviceAddButton = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceDetailsListDV:WSIB_LatestDeviceDetailsLV_tb:Add")]');
        this.DeviceECategory = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceDetailsCV:WSIB_DeviceEntitlmentDetailInputSet:DeviceECategory")]');
        this.DeviceType = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceDetailsCV:WSIB_DeviceEntitlmentDetailInputSet:SubValuesDevicesID")]');
        this.DeviceStatus = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceDetailsCV:WSIB_DeviceEntitlmentDetailInputSet:DeviceStatusID")]');
        this.DeviceServiceType = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceDetailsCV:WSIB_DeviceEntitlmentDetailInputSet:DeviceServiceTypeID")]');
        this.StartDate = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceEntitlmentDetailInputSet:StartDateID")]');
        this.EndDate = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceEntitlmentDetailInputSet:EndDateID")]');
        this.DecisionDate = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceEntitlmentDetailInputSet:DecisionDateID")]');
        this.DeviceUpdateButton = this.page.locator('#WSIB_DeviceDetailsPopup\\:ToolbarButton');
        this.PurposeOfReview = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceNotePopup:NoteDetailDV:PurposeOfReviewID")]');
        this.ReviewBody = this.page.locator('xpath=//*[contains(@id, "WSIB_DeviceNotePopup:NoteDetailDV:Body")]');
        this.DeviceFinishButton = this.page.locator('#WSIB_DeviceNotePopup\\:UpdateButton');
        this.ILAAddButton = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:CardsCV\\:ILA\\:WSIB_ILADetailsLV_tb\\:Add');
        this.ILAStatus = this.page.locator('xpath=//*[contains(@id, "WSIB_ILADetailsLV:0:ILAStatus")]');
        this.ILAFromDate = this.page.locator('xpath=//*[contains(@id, "ClaimWorkplanScreen:CardsCV:ILA:WSIB_ILADetailsLV:0:PCAFromDate")]');
        this.ILAToDate = this.page.locator('xpath=//*[contains(@id, "ClaimWorkplanScreen:CardsCV:ILA:WSIB_ILADetailsLV:0:PCAToDate")]');
        this.PCAAddButton = this.page.locator('#RecoveryDetail_WC\\:ClaimWorkplanScreen\\:CardsCV\\:PCA\\:WSIB_PCADetailsLV_tb\\:Add');
        this.PCAAssesmentType = this.page.locator('xpath=//*[contains(@id, "PCA:WSIB_PCADetailsLV:0:PCAAssesmentType")]');
        this.PCAAssessmentOutcome = this.page.locator('xpath=//*[contains(@id, "PCA:WSIB_PCADetailsLV:0:AssessmentOutcome")]');
        this.PCAFromDate = this.page.locator('xpath=//*[contains(@id, "ClaimWorkplanScreen:CardsCV:PCA:WSIB_PCADetailsLV:0:PCAFromDate")]');
        this.PCAToDate = this.page.locator('xpath=//*[contains(@id, "ClaimWorkplanScreen:CardsCV:PCA:WSIB_PCADetailsLV:0:PCAToDate")]');
        this.PCAReassesRequired = this.page.locator('xpath=//*[contains(@id, "ClaimWorkplanScreen:CardsCV:PCA:WSIB_PCADetailsLV:0:PCAReassesRequired")]');
        this.PCAReassessmentDate = this.page.locator('xpath=//*[contains(@id, "ClaimWorkplanScreen:CardsCV:PCA:WSIB_PCADetailsLV:0:PCAReassessmentDate")]');
        this.TreatmentDetailsButton = this.page.locator('xpath=//*[contains(@id, "TreatmentPanelRef:WSIB_TreatmentDetailsLV_tb:ToolbarButton")]');
        this.TreatmentAdd = this.page.locator('xpath=//*[contains(@id, "TreatmentDetailsListDV:WSIB_TreatmentDetailsTopLV_tb:Add")]');
        this.TreatmentType = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentDetailsCV:WSIB_TreatmentEntitlmentDetailInputSet:TreatmentType")]');
        this.TreatmentStatus = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentEntitlmentDetailInputSet:TreatmentStatus")]');
        this.TreatmentFromDate = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentEntitlmentDetailInputSet:TreatmentFromDate")]');
        this.TreatmentToDate = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentEntitlmentDetailInputSet:TreatmentToDate")]');
        this.FreqNumID = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentEntitlmentDetailInputSet:FreqNumID")]');
        this.EntitlementDUnit = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentEntitlmentDetailInputSet:EntitlementDUnit")]');
        this.TreatmentDetailsUpdate = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentDetailsPopup:ToolbarButton")]');
        this.PurposeOfReviewTreatment = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentNotePopup:NoteDetailDV:PurposeOfReviewID")]');
        this.BodyTreatment = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentNotePopup:NoteDetailDV:Body")]');
        this.FinishTreatment = this.page.locator('xpath=//*[contains(@id, "WSIB_TreatmentNotePopup:UpdateButton")]');
        this.MedicationTab = this.page.locator('xpath=//*[contains(@id, "RecoveryDetail_WC:ClaimWorkplanScreen:CardsCV:MedicationTab")]');
        this.MedicationAdd = this.page.locator('xpath=//*[contains(@id, "WSIB_ExceptionMedicationListDV:WSIB_ExceptionMedicationLV_tb:Add")]');
        this.MedicationType = this.page.locator('xpath=//*[contains(@id, "WSIB_ExceptionMedicationCV:MedicationTypeID")]');
        this.MedicationStatus = this.page.locator('xpath=//*[contains(@id, "WSIB_ExceptionMedicationCV:MedicationStatusID")]');
        this.SearchMedicines = this.page.locator('xpath=//*[contains(@id, "WSIB_ExceptionMedicationCV:SearchMedicinesID")]');
        this.MedicinesList = this.page.locator('xpath=//*[contains(@id, "EntitlementDecisionDetailPopup:EntitlementDecisionDV:MedicinesListID")]');
        this.MedicinesStartDate = this.page.locator('xpath=//*[contains(@id, "WSIB_ExceptionMedicationListDV:WSIB_ExceptionMedicationCV:StartDate_ID")]');
        this.MedicationEndDate = this.page.locator('xpath=//*[contains(@id, "WSIB_ExceptionMedicationListDV:WSIB_ExceptionMedicationCV:EndDate_ID")]');
        this.MedicationPurposeOfReview = this.page.locator('xpath=//*[contains(@id, "MedicationNotePopup:NoteDetailDV:PurposeOfReview")]');
        this.MedicationBody = this.page.locator('xpath=//*[contains(@id, "MedicationNotePopup:NoteDetailDV:Body")]');
        this.MedicationFinish = this.page.locator('xpath=//*[contains(@id, "MedicationNotePopup:UpdateButton")]');
        this.Claim_Inc2EntitiesGroup = this.page.locator('xpath=//*[contains(@id, "Claim:MenuLinks:Claim_Inc2EntitiesGroup")]');
        this.Inc2EntitiesGroup_Inc2Sequence = this.page.locator('xpath=//*[contains(@id, "Inc2EntitiesGroup:MenuLinks:Inc2EntitiesGroup_Inc2Sequence")]');
        this.exposureLOE = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:1:exposure")]');
        this.Inc2SequenceEDIT = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:Edit")]');
        this.Inc2SequenceAdd = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:Add")]');
        this.SequenceSourceID = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:inc2SequencesRowIterator:0:SequenceSourceID")]');
        this.BenefitType = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:inc2SequencesRowIterator:0:BenefitType")]');
        this.SequenceStatus = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:inc2SequencesRowIterator:0:SequenceStatus")]');
        this.SequenceFromDate = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:inc2SequencesRowIterator:0:SequenceFromDate")]');
        this.EntitlementPercent = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:inc2SequencesRowIterator:0:EntitlementPercent")]');
        this.Inc2SequenceUpdate = this.page.locator('xpath=//*[contains(@id, "Inc2Sequence:Update")]');
        this.Inc2EntitiesGroup_Inc2Cheque = this.page.locator('xpath=//*[contains(@id, "Inc2EntitiesGroup:MenuLinks:Inc2EntitiesGroup_Inc2Cheque")]');
        this.Inc2ChequeEdit = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:Edit")]');
        this.Inc2ChequeAdd = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:Add")]');
        this.ChequeSourceID = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:0:ChequeSourceID")]');
        this.Inc2ChequePayee = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:0:Payee")]');
        this.Inc2ChequePayTo = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:0:PayTo")]');
        this.Inc2ChequeStatus = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:0:Status")]');
        this.Inc2ChequeAmount = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:0:Amount")]');
        this.Inc2ChequeIssuedDate = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:0:IssuedDate")]');
        this.Inc2ChequeUpdate = this.page.locator('xpath=//*[contains(@id, "Inc2Cheque:Update")]');
        this.Inc2ChequePayment = this.page.locator('xpath=//*[contains(@id, "Inc2EntitiesGroup:MenuLinks:Inc2EntitiesGroup_Inc2ChequePayment")]');
        this.Inc2ChequePaymentEdit = this.page.locator('xpath=//*[contains(@id, "Inc2ChequePayment:Edit")]');
        this.Inc2ChequePaymentAdd = this.page.locator('xpath=//*[contains(@id, "Inc2ChequePayment:Add")]');
        this.Inc2ChequePaymentCostCategory = this.page.locator('xpath=//*[contains(@id, "Inc2ChequePayment:inc2PaymentsRowIterator:0:CostCategory")]');
        this.Inc2ChequePaymentCostType = this.page.locator('xpath=//*[contains(@id, "Inc2ChequePayment:inc2PaymentsRowIterator:0:CostType")]');
        this.Inc2ChequePaymentAmount = this.page.locator('xpath=//*[contains(@id, "Inc2ChequePayment:inc2PaymentsRowIterator:0:Amount")]');
        this.Inc2ChequePaymentPayFromDate = this.page.locator('xpath=//*[contains(@id, "Inc2ChequePayment:inc2PaymentsRowIterator:0:PayFromDate")]');
        this.Inc2ChequePaymentPayToDate = this.page.locator('xpath=//*[contains(@id, "Inc2ChequePayment:inc2PaymentsRowIterator:0:PayToDate")]');
        this.Inc2ChequePaymentUpdate = this.page.locator('xpath=//*[contains(@id, "Inc2ChequePayment:Update")]');
        this.ClothingAllowanceAdd = this.page.locator('xpath=//*[contains(@id, "ClothingAllowances:WSIB_ClothingAllowanceLV_tb:Add")]');
        this.ClothingAllowanceApproved_True = this.page.locator('xpath=//*[contains(@id, "WSIB_ClothingAllowanceLV:0:ClothingAllowance_Approved_true")]');
        this.ClothingAllowance_DecisionDate = this.page.locator('xpath=//*[contains(@id, "WSIB_ClothingAllowanceLV:0:ClothingAllowance_DecisionDate")]');
    }

    async setupRTWData(proposedRtwGoal: string, proposedInterimRtwGoal: string, proposedRecoveryGoal: string, proposedDateRtwGoal: string,
                        proposedDateInterimRtwGoal: string, proposedDateRecoveryGoal: string, currentRtwStatus: string,
                        currentRecoveryStatus: string, actualRtwGoal: string, actualRecoveryGoal: string, actualRtwDate: string,
                        actualRecoveryDate: string): Promise<boolean> {
        await this.click(this.RecoveryLink);
        await this.click(this.RecoveryDetail_WC);
        await this.click(this.RecoveryEditLink);
        await this.Proposed_RTW_Goal.selectOption({ label: proposedRtwGoal });
        await this.Proposed_Interim_RTW_Goal.selectOption({ label: proposedInterimRtwGoal });
        await this.Proposed_Recovery_Goal.selectOption({ label: proposedRecoveryGoal });
        await this.enter(this.ProposedDate_RTW_Goal, proposedDateRtwGoal);
        await this.enter(this.ProposedDate_Interim_RTW_Goal, proposedDateInterimRtwGoal);
        await this.enter(this.ProposedDate_Recovery_Goal, proposedDateRecoveryGoal);
        await this.Current_RTW_Status.selectOption({ label: currentRtwStatus });
        await this.Current_Recovery_Status.selectOption({ label: currentRecoveryStatus });
        await this.Actual_RTW_Goal.selectOption({ label: actualRtwGoal });
        await this.Actual_Recovery_Goal.selectOption({ label: actualRecoveryGoal });
        await this.enter(this.Actual_RTW_Date, actualRtwDate);
        await this.enter(this.Actual_Recovery_Date, actualRecoveryDate);
        await this.click(this.RecoverLinkUpdateButton);
        return (await this.Proposed_RTW_Goal.innerText()).toLowerCase() === proposedRtwGoal.toLowerCase();
    }

    async setupDeviceData(deviceCategory: string, deviceType: string, deviceStatus: string, deviceServiceType: string, deviceStartDate: string,
                           deviceEndDate: string, deviceDecisionDate: string, deviceReview: string,
                           rationale: string): Promise<boolean> {
        await this.click(this.RecoveryLink);
        await this.click(this.RecoveryDetail_WC);
        await this.click(this.RecoveryEditLink);
        await this.click(this.ViewDeviceDetailsButton);
        await this.click(this.DeviceAddButton);
        await this.DeviceECategory.selectOption({ label: deviceCategory });
        await this.DeviceType.selectOption({ label: deviceType });
        await this.DeviceStatus.selectOption({ label: deviceStatus });
        await this.DeviceServiceType.selectOption({ label: deviceServiceType });
        await this.enter(this.StartDate, deviceStartDate);
        await this.enter(this.EndDate, deviceEndDate);
        await this.enter(this.DecisionDate, deviceDecisionDate);
        await this.click(this.DeviceUpdateButton);
        await this.PurposeOfReview.selectOption({ label: deviceReview });
        await this.enter(this.ReviewBody, rationale);
        await this.click(this.DeviceFinishButton);
        return true;
    }

    async setupILAData(ilaStatus: string, pcaFromDate: string, pcaToDate: string): Promise<boolean> {
        await this.click(this.RecoveryLink);
        await this.click(this.RecoveryDetail_WC);
        await this.click(this.RecoveryEditLink);
        await this.click(this.ILAAddButton);
        await this.ILAStatus.selectOption({ label: ilaStatus });
        await this.enter(this.ILAFromDate, pcaFromDate);
        await this.enter(this.ILAToDate, pcaToDate);
        await this.click(this.RecoverLinkUpdateButton);
        return true;
    }

    async setupPCAData(pcaAssesmentType: string, pcaAssessmentOutcome: string, pcaFromDate: string, pcaToDate: string, pcaReassesRequired: string, pcaReassessmentDate: string): Promise<boolean> {
        await this.click(this.RecoveryLink);
        await this.click(this.RecoveryDetail_WC);
        await this.click(this.RecoveryEditLink);
        await this.click(this.PCAAddButton);
        await this.PCAAssesmentType.selectOption({ label: pcaAssesmentType });
        await this.PCAAssessmentOutcome.selectOption({ label: pcaAssessmentOutcome });
        await this.enter(this.PCAFromDate, pcaFromDate);
        await this.enter(this.PCAToDate, pcaToDate);
        await this.PCAReassesRequired.selectOption({ label: pcaReassesRequired });
        if (pcaReassesRequired.toLowerCase() === 'yes') {
            await this.enter(this.PCAReassessmentDate, pcaReassessmentDate);
        }
        await this.click(this.RecoverLinkUpdateButton);
        return true;
    }

    async setupTreatmentData(treatmentType: string, treatmentStatus: string, treatmentStartDate: string, treatmentEndDate: string, treatmentFreqNum: string, treatmentEntitlementDUnit: string, deviceReview: string, rationale: string): Promise<boolean> {
        await this.click(this.RecoveryLink);
        await this.click(this.RecoveryDetail_WC);
        await this.click(this.RecoveryEditLink);
        await this.click(this.TreatmentDetailsButton);
        await this.click(this.TreatmentAdd);
        await this.TreatmentType.selectOption({ label: treatmentType });
        await this.TreatmentStatus.selectOption({ label: treatmentStatus });
        await this.enter(this.TreatmentFromDate, treatmentStartDate);
        await this.enter(this.TreatmentToDate, treatmentEndDate);
        await this.enter(this.FreqNumID, treatmentFreqNum);
        await this.EntitlementDUnit.selectOption({ label: treatmentEntitlementDUnit });
        await this.click(this.TreatmentDetailsUpdate);
        await this.PurposeOfReviewTreatment.selectOption({ label: deviceReview });
        await this.enter(this.BodyTreatment, rationale);
        await this.click(this.FinishTreatment);
        return true;
    }

    async setupMedicationData(medicationType: string, medicationStatus: string, formulary: string, medicationStartDate: string,
                                medicationEndDate: string, deviceReview: string, rationale: string): Promise<boolean> {
        await this.click(this.RecoveryLink);
        await this.click(this.RecoveryDetail_WC);
        await this.click(this.RecoveryEditLink);
        await this.click(this.MedicationTab);
        await this.click(this.MedicationAdd);
        await this.MedicationType.selectOption({ label: medicationType });
        await this.MedicationStatus.selectOption({ label: medicationStatus });
        await this.click(this.SearchMedicines);
        await this.MedicinesList.selectOption({ label: formulary });
        await this.enter(this.MedicinesStartDate, medicationStartDate);
        await this.enter(this.MedicationEndDate, medicationEndDate);
        await this.click(this.RecoverLinkUpdateButton);
        await this.MedicationPurposeOfReview.selectOption({ label: deviceReview });
        await this.enter(this.MedicationBody, rationale);
        await this.click(this.MedicationFinish);
        return true;
    }

    async setupPaymentsData(checkSourceId: string, payee: string, payTo: string, status: string, tAmount: string,
                                  issuedDate: string, costCategory: string, costType: string, amount: string,
                                  payFromDate: string, payToDate: string): Promise<boolean> {
        await this.click(this.Claim_Inc2EntitiesGroup);
        await this.click(this.Inc2EntitiesGroup_Inc2Cheque);
        await this.click(this.Inc2ChequeEdit);
        await this.click(this.Inc2ChequeAdd);
        await this.enter(this.ChequeSourceID, checkSourceId);
        await this.Inc2ChequePayee.selectOption({ label: payee });
        await this.enter(this.Inc2ChequePayTo, payTo);
        await this.Inc2ChequeStatus.selectOption({ label: status });
        await this.enter(this.Inc2ChequeAmount, tAmount);
        await this.enter(this.Inc2ChequeIssuedDate, issuedDate);
        await this.click(this.Inc2ChequeUpdate);

        await this.click(this.Inc2ChequePayment);
        await this.click(this.Inc2ChequePaymentEdit);
        await this.click(this.Inc2ChequePaymentAdd);
        await this.Inc2ChequePaymentCostCategory.selectOption({ label: costCategory });
        await this.Inc2ChequePaymentCostType.selectOption({ label: costType });
        await this.enter(this.Inc2ChequePaymentAmount, amount);
        await this.enter(this.Inc2ChequePaymentPayFromDate, payFromDate);
        await this.enter(this.Inc2ChequePaymentPayToDate, payToDate);
        await this.click(this.Inc2ChequePaymentUpdate);
        return true;
    }

    async setupClothingAllowanceData(clothingAllowanceApproved: string, clothingAllowanceDecisionDate: string): Promise<boolean> {
        await this.click(this.Claim_Inc2EntitiesGroup);
        await this.click(this.Inc2EntitiesGroup_Inc2Sequence);
        await this.click(this.exposureLOE);
        await this.click(this.Inc2SequenceEDIT);
        await this.click(this.Inc2SequenceAdd);
        await this.enter(this.SequenceSourceID, '67687688');
        await this.BenefitType.selectOption({ label: 'Pension' });
        await this.SequenceStatus.selectOption({ label: 'Active' });
        await this.enter(this.SequenceFromDate, '01/01/2026');
        await this.enter(this.EntitlementPercent, '10');
        await this.click(this.Inc2SequenceUpdate);

        await this.click(this.RecoveryLink);
        await this.click(this.RecoveryDetail_WC);
        await this.click(this.RecoveryEditLink);
        await this.click(this.ClothingAllowanceAdd);
        await this.click(this.ClothingAllowanceApproved_True);
        await this.enter(this.ClothingAllowance_DecisionDate, clothingAllowanceDecisionDate);
        await this.click(this.RecoverLinkUpdateButton);
        return true;
    }
}
