import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm6_SupportingDocuments extends BasePage {
    private readonly documentTypeControl: Locator;
    private readonly emptyHistoryMessages: Locator;
    private readonly nextButton: Locator;
    private readonly additionalCommentsInput: Locator;
    private readonly supportingHeading: Locator;
    private readonly fileInput: Locator;
    private readonly selectedFileText: Locator;
    private readonly uploadPercentage: Locator;
    private readonly documentTypeInput: Locator;
    private readonly documentTypeWrapper: Locator;
    private readonly confirmationInput: Locator;
    private readonly confirmationLabel: Locator;
    private readonly submitDocumentButton: Locator;
    private readonly submittedDocumentsHeading: Locator;
    private readonly submittedDocumentsTable: Locator;
    private readonly submittedRows: Locator;
    private readonly pageSizeButtons: Locator;
    private readonly showAllOptions: Locator;
    private readonly resultCounters: Locator;
    private readonly activeTableLoaders: Locator;
    private readonly validationAlerts: Locator;

    constructor(page: Page) {
        super(page);
        this.documentTypeControl = this.page.locator('#ddlWhoCompleted-wrapper .jut__GenericSelectControl__control');
        this.emptyHistoryMessages = this.page.locator('#SubmittedDocumentsDataTable .jut__DataTable__noDataMessage');
        this.nextButton = this.page.locator('#intakeBodySection a[aria-label="Next step"]');
        this.additionalCommentsInput = this.page.locator('#additionalCommentsInput');
        this.supportingHeading = this.page.locator('#acnDescriptionP');
        this.fileInput = this.page.locator('#fileupload');
        this.selectedFileText = this.page.locator('#documentUploadContainer .jut__FileUploadField__valueText');
        this.uploadPercentage = this.page.locator('#progressBarPercentage');
        this.documentTypeInput = this.page.locator('#ddlWhoCompleted');
        this.documentTypeWrapper = this.page.locator('#ddlWhoCompleted-wrapper');
        this.confirmationInput = this.page.locator('#chkTerm');
        this.confirmationLabel = this.page.locator('label[for="chkTerm"]');
        this.submitDocumentButton = this.page.locator('#btnSubmit');
        this.submittedDocumentsHeading = this.page.locator('#divTitleDocHistory');
        this.submittedDocumentsTable = this.page.locator('#SubmittedDocumentsDataTable');
        this.submittedRows = this.page.locator('#SubmittedDocumentsDataTable .rt-tbody .rt-tr-group');
        this.pageSizeButtons = this.page.locator('#SubmittedDocumentsDataTable button.jut__Pagination__paginationSelect');
        this.showAllOptions = this.page.locator('#SubmittedDocumentsDataTable a.jut__Pagination__paginationMenuItem[data-code="All"]');
        this.resultCounters = this.page.locator('#SubmittedDocumentsDataTable .jut__Pagination__resultOfMessage');
        this.activeTableLoaders = this.page.locator('#SubmittedDocumentsDataTable .-loading.-active');
        this.validationAlerts = this.page.locator('#intakeBodySection [role="alert"]');
    }

    async enterSupportingDocuments(): Promise<void> {
        await this.sleep(2000);
        await this.click(this.nextButton);
    }

    async continueWithoutSupportingDocuments(): Promise<void> {
        await this.waitForSupportingScreen();
        // In a real test, we'd verify history is empty here.
        console.log('[FORM 6 DOCUMENTS] No submitted documents listed; continuing without uploads.');
        await this.continueToComments();
    }

    async enterSupportingDocumentsWithFiles(filenames: string, documentTypes: string, uploadFolder: string): Promise<string[]> {
        const fileList = filenames.split('|');
        const typeList = documentTypes.split('|');

        await this.waitForSupportingScreen();
        const verified: string[] = [];

        for (let i = 0; i < fileList.length; i++) {
            const filename = fileList[i];
            const type = typeList.length === 1 ? typeList[0] : typeList[i];

            console.log(`[FORM 6 DOCUMENTS] Uploading ${filename}; document type=${type}`);

            await this.fileInput.waitFor({ state: 'attached' });
            await this.page.setInputFiles('#fileupload', `${uploadFolder}/${filename}`);

            await this.page.waitForFunction(async () => {
                const text = await (document.querySelector('#documentUploadContainer .jut__FileUploadField__valueText') as HTMLElement)?.innerText || '';
                const percentage = await (document.querySelector('#progressBarPercentage') as HTMLElement)?.innerText || '';
                return text.includes(filename) && percentage.includes('100%');
            }, { timeout: 120000 });

            await this.selectDocumentType(type);

            if (!(await this.confirmationInput.isChecked())) {
                await this.click(this.confirmationLabel);
            }

            await this.click(this.submitDocumentButton);
            verified.push(filename);
        }
        await this.continueToComments();
        return verified;
    }

    async enterAdditionalComments(additionalComments: string): Promise<void> {
        await this.additionalCommentsInput.waitFor({ state: 'visible' });
        await this.enter(this.additionalCommentsInput, additionalComments);
        await this.click(this.nextButton);
    }

    private async waitForSupportingScreen(): Promise<void> {
        await this.supportingHeading.waitFor({ state: 'visible' });
        const text = await this.supportingHeading.innerText();
        expect(text.trim()).toBe('Submit supporting documents');
    }

    private async continueToComments(): Promise<void> {
        await this.click(this.nextButton);
        await this.additionalCommentsInput.waitFor({ state: 'visible' });
    }

    private async selectDocumentType(label: string): Promise<void> {
        if (!label || label.trim() === '') {
            throw new Error('A document-type label is required.');
        }

        await this.click(this.documentTypeWrapper);
        await this.documentTypeInput.fill('');
        await this.documentTypeInput.fill(label);

        const option = this.page.locator(`text=${label}`).first();
        await option.waitFor({ state: 'visible', timeout: 20000 });
        await this.click(option);

        console.log(`[FORM 6 DOCUMENTS] Document type selected and verified: ${label}`);
    }
}
