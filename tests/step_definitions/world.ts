// tests/step_definitions/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, APIRequestContext } from '@playwright/test';

// Page Imports
import { Clothingallowance } from '../../pages/CAA/Clothingallowance';
import { OSPCDirectDeposit } from '../../pages/DirectDeposit/OSPCDirectDeposit';

import { DIeForm6 } from '../../pages/DynamicIntakeEform6/DIeForm6';
import { DIeForm6_ExposureDetails } from '../../pages/DynamicIntakeEform6/DIeForm6_ExposureDetails';
import { DIeForm6_HealthCare } from '../../pages/DynamicIntakeEform6/DIeForm6_HealthCare';
import { DIeForm6_InjuryDetails } from '../../pages/DynamicIntakeEform6/DIeForm6_InjuryDetails';
import { DIeForm6_LostTimeandEarnings } from '../../pages/DynamicIntakeEform6/DIeForm6_LostTimeandEarnings';
import { DIeForm6_ReviewandSubmit } from '../../pages/DynamicIntakeEform6/DIeForm6_ReviewandSubmit';
import { DIeForm6_SupportingDocuments } from '../../pages/DynamicIntakeEform6/DIeForm6_SupportingDocuments';
import { DIeForm6_WorkHistory } from '../../pages/DynamicIntakeEform6/DIeForm6_WorkHistory';

import { DIeForm7 } from '../../pages/DynamicIntakeEform7/DIeForm7';
import { DIeForm7_EmployeeDetails } from '../../pages/DynamicIntakeEform7/DIeForm7_EmployeeDetails';
import { DIeForm7_EmployerDetails } from '../../pages/DynamicIntakeEform7/DIeForm7_EmployerDetails';
import { DIeForm7_HealthCareDetails } from '../../pages/DynamicIntakeEform7/DIeForm7_HealthCareDetails';
import { DIeForm7_InjuryIllnessDetails } from '../../pages/DynamicIntakeEform7/DIeForm7_InjuryIllnessDetails';
import { DIeForm7_LosstimeEarningsDetails } from '../../pages/DynamicIntakeEform7/DIeForm7_LosstimeEarningsDetails';
import { DIeForm7_ReporterDetails } from '../../pages/DynamicIntakeEform7/DIeForm7_ReporterDetails';
import { DIeForm7_ReportType } from '../../pages/DynamicIntakeEform7/DIeForm7_ReportType';
import { DIeForm7_ReviewandSubmit } from '../../pages/DynamicIntakeEform7/DIeForm7_ReviewandSubmit';
import { DIeForm7_SupportingDocuments } from '../../pages/DynamicIntakeEform7/DIeForm7_SupportingDocuments';
import { DIeForm7_WorkHistory } from '../../pages/DynamicIntakeEform7/DIeForm7_WorkHistory';

import { GWLoginPage } from '../../pages/Guidewire/GWLoginPage';
import { GWSearchPage } from '../../pages/Guidewire/GWSearchPage';
import { GWClaimRegistrationPage } from '../../pages/Guidewire/GWClaimRegistrationPage';
import { GWAdminPage } from '../../pages/Guidewire/GWAdminPage';
import { GWDocumentsPage } from '../../pages/Guidewire/GWDocumentsPage';
import { GWRecoveryPage } from '../../pages/Guidewire/GWRecoveryPage';
import { GWAppealsPage } from '../../pages/Guidewire/GWAppealsPage';
import { GWCC_History } from '../../pages/Guidewire/GWCC_History';
import { GWClaimParticipantsPage } from '../../pages/Guidewire/GWClaimParticipantsPage';
import { GuidewireCMPage } from '../../pages/Guidewire/GuidewireCMPage';

import { GetStarted } from '../../pages/UNCD/GetStarted';
import { AddClaimantInfo } from '../../pages/UNCD/AddClaimantInfo';
import { SubmitDocuments } from '../../pages/UNCD/SubmitDocuments';
import { ReviewSubmission } from '../../pages/UNCD/ReviewSubmission';

import { TravelExpense } from '../../pages/WT/TravelExpense';
import { WTLandingPage } from '../../pages/WT/WTLandingPage';

import { OSPCClaimOverview } from '../../pages/OSPC/OSPCClaimOverview';
import { Tombstone } from '../../pages/OSPC/Tombstone';
import { HomePage } from '../../pages/OSPC/HomePage';
import { LoginPage } from '../../pages/OSPC/LoginPage';

import { NIHLLandingPage } from '../../pages/NIHL/NIHLLandingPage';
import { Employement } from '../../pages/NIHL/Employement';
import { HealthCare } from '../../pages/NIHL/HealthCare';
import { MyInformation } from '../../pages/NIHL/MyInformation';
import { ReviewandConfirm } from '../../pages/NIHL/ReviewandConfirm';
import { SupportingDocuments } from '../../pages/NIHL/SupportingDocuments';

import { ExternalValidation } from '../../utils/ExternalValidation';
import { JsonUtils } from '../../utils/JsonUtils';

export class CustomWorldClass extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  request?: APIRequestContext;

  // Test Data
  currentRow: Record<string, any> = {};
  data: Record<string, any>[] = [];
  currentIndex: number = 0;
  sheetName?: string;
  scenarioType: string = 'Unknown';
  config: Record<string, any> = {};
  commonConfig: Record<string, any> = {};

  // Dynamic values
  firstname?: string;
  lastname?: string;
  authToken?: string;
  refNumber?: string;
  fileId?: string;
  publicId?: string;
  claimNumber?: string;
  dynamicMessage?: string;

  // Page Declarations
  clothingAllowance!: Clothingallowance;
  ospcDirectDeposit!: OSPCDirectDeposit;

  eform6!: DIeForm6;
  eform6_workhistory!: DIeForm6_WorkHistory;
  eform6_injurydetails!: DIeForm6_InjuryDetails;
  eform6_healthcare!: DIeForm6_HealthCare;
  eform6_losttimeearnings!: DIeForm6_LostTimeandEarnings;
  eform6_supportingdocuments!: DIeForm6_SupportingDocuments;
  eform6_reviewandsubmit!: DIeForm6_ReviewandSubmit;
  eform6_exposuredetails!: DIeForm6_ExposureDetails;

  eform7!: DIeForm7;
  eform7_reporttype!: DIeForm7_ReportType;
  eform7_reporterdetails!: DIeForm7_ReporterDetails;
  eform7_employerdetails!: DIeForm7_EmployerDetails;
  eform7_employeedetails!: DIeForm7_EmployeeDetails;
  eform7_workhistorydetails!: DIeForm7_WorkHistory;
  eform7_injuryillnessdetails!: DIeForm7_InjuryIllnessDetails;
  eform7_healthcaredetails!: DIeForm7_HealthCareDetails;
  eform7_losstimeearningsdetails!: DIeForm7_LosstimeEarningsDetails;
  eform7_supportingdocuments!: DIeForm7_SupportingDocuments;
  eform7_reviewandsubmit!: DIeForm7_ReviewandSubmit;

  gwLogin!: GWLoginPage;
  gwSearch!: GWSearchPage;
  gwRegistration!: GWClaimRegistrationPage;
  gwAdmin!: GWAdminPage;
  gwDocuments!: GWDocumentsPage;
  gwRecovery!: GWRecoveryPage;
  gwAppeals!: GWAppealsPage;
  gwCCHistory!: GWCC_History;
  gwParticipants!: GWClaimParticipantsPage;
  guidewirecm!: GuidewireCMPage;

  uncdGetStarted!: GetStarted;
  uncdAddClaimantInfo!: AddClaimantInfo;
  uncdSubmitDocuments!: SubmitDocuments;
  uncdReviewSubmission!: ReviewSubmission;

  wtLandingPage!: WTLandingPage;
  travelExpense!: TravelExpense;

  ospcClaimOverview!: OSPCClaimOverview;
  tombstone!: Tombstone;
  ospcHome!: HomePage;
  ospcLogin!: LoginPage;

  // Compatibility aliases for loginSteps and other step definitions
  loginPage!: LoginPage;
  homePage!: HomePage;

  nihllandingpage!: NIHLLandingPage;
  employement!: Employement;
  healthcare!: HealthCare;
  myinformation!: MyInformation;
  nihlreviewandconfirm!: ReviewandConfirm;
  nihlsupportingdocuments!: SupportingDocuments;

  constructor(options: IWorldOptions) {
    super(options);
  }

  initPages(): void {
    if (!this.page) return;

    this.clothingAllowance = new Clothingallowance(this.page);
    this.ospcDirectDeposit = new OSPCDirectDeposit(this.page);

    this.eform6 = new DIeForm6(this.page);
    this.eform6_workhistory = new DIeForm6_WorkHistory(this.page);
    this.eform6_injurydetails = new DIeForm6_InjuryDetails(this.page);
    this.eform6_healthcare = new DIeForm6_HealthCare(this.page);
    this.eform6_losttimeearnings = new DIeForm6_LostTimeandEarnings(this.page);
    this.eform6_supportingdocuments = new DIeForm6_SupportingDocuments(this.page);
    this.eform6_reviewandsubmit = new DIeForm6_ReviewandSubmit(this.page);
    this.eform6_exposuredetails = new DIeForm6_ExposureDetails(this.page);

    this.eform7 = new DIeForm7(this.page);
    this.eform7_reporttype = new DIeForm7_ReportType(this.page);
    this.eform7_reporterdetails = new DIeForm7_ReporterDetails(this.page);
    this.eform7_employerdetails = new DIeForm7_EmployerDetails(this.page);
    this.eform7_employeedetails = new DIeForm7_EmployeeDetails(this.page);
    this.eform7_workhistorydetails = new DIeForm7_WorkHistory(this.page);
    this.eform7_injuryillnessdetails = new DIeForm7_InjuryIllnessDetails(this.page);
    this.eform7_healthcaredetails = new DIeForm7_HealthCareDetails(this.page);
    this.eform7_losstimeearningsdetails = new DIeForm7_LosstimeEarningsDetails(this.page);
    this.eform7_supportingdocuments = new DIeForm7_SupportingDocuments(this.page);
    this.eform7_reviewandsubmit = new DIeForm7_ReviewandSubmit(this.page);

    this.gwLogin = new GWLoginPage(this.page);
    this.gwSearch = new GWSearchPage(this.page);
    this.gwRegistration = new GWClaimRegistrationPage(this.page);
    this.gwAdmin = new GWAdminPage(this.page);
    this.gwDocuments = new GWDocumentsPage(this.page);
    this.gwRecovery = new GWRecoveryPage(this.page);
    this.gwAppeals = new GWAppealsPage(this.page);
    this.gwCCHistory = new GWCC_History(this.page);
    this.gwParticipants = new GWClaimParticipantsPage(this.page);
    this.guidewirecm = new GuidewireCMPage(this.page);

    this.uncdGetStarted = new GetStarted(this.page);
    this.uncdAddClaimantInfo = new AddClaimantInfo(this.page);
    this.uncdSubmitDocuments = new SubmitDocuments(this.page);
    this.uncdReviewSubmission = new ReviewSubmission(this.page);

    this.wtLandingPage = new WTLandingPage(this.page);
    this.travelExpense = new TravelExpense(this.page);

    this.ospcClaimOverview = new OSPCClaimOverview(this.page);
    this.tombstone = new Tombstone(this.page);
    this.ospcHome = new HomePage(this.page);
    this.ospcLogin = new LoginPage(this.page);

    // Populate the aliases
    this.loginPage = this.ospcLogin;
    this.homePage = this.ospcHome;

    this.nihllandingpage = new NIHLLandingPage(this.page);
    this.employement = new Employement(this.page);
    this.healthcare = new HealthCare(this.page);
    this.myinformation = new MyInformation(this.page);
    this.nihlreviewandconfirm = new ReviewandConfirm(this.page);
    this.nihlsupportingdocuments = new SupportingDocuments(this.page);
  }

  shouldRun(stepName: string): boolean {
    return ExternalValidation.shouldRun(stepName);
  }

  persistCurrentRow(): void {
    if (this.sheetName && this.data && this.data.length > 0) {
      this.data[this.currentIndex] = this.currentRow;
      JsonUtils.writeJsonData(this.sheetName, this.data);
    }
  }
}

export type CustomWorld = CustomWorldClass;
setWorldConstructor(CustomWorldClass);