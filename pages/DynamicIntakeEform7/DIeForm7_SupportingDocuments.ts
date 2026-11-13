import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class DIeForm7_SupportingDocuments extends BasePage {
    private readonly ModalPopup: Locator;
    private readonly DistributionPopUpNo: Locator;
    private readonly NextButton: Locator;
    private readonly SupportingDocumentsHeading: Locator;
    private readonly AdditionalCommentsHeading: Locator;
    private readonly AdditionalComments: Locator;
    private readonly AttachButtons: Locator;
    private readonly UploadContainers: Locator;
    private readonly FileInputs: Locator;
    private readonly SelectedFileText: Locator;
    private readonly UploadPercentage: Locator;
    private readonly DocumentTypeWrapper: Locator;
    private readonly DocumentTypeInput: Locator;
    private readonly ConfirmationInput: Locator;
    private readonly ConfirmationLabel: Locator;
    private readonly SubmitDocumentButton: Locator;
    private readonly SupportingNextButton: Locator;
    private readonly submittedDocumentsHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.ModalPopup = this.page.locator('xpath=//*[@id="myModal" and @class="modal show"]');
        this.DistributionPopUpNo = this.page.locator('xpath=//*[@class="DistributionPopUpButton2"]');
        this.NextButton = this.page.locator('xpath=//*[contains(@class,"rightImgIcon")]');
        this.SupportingDocumentsHeading = this.page.locator('xpath=//h1[contains(text(),"Supporting documents")]');
        this.AdditionalCommentsHeading = this.page.locator('xpath=//h1[contains(text(),"Additional comments")]');
        this.AdditionalComments = this.page.locator('#additionalCommentsInput');
        this.AttachButtons = this.page.locator('#attachReportButton');
        this.UploadContainers = this.page.locator('#documentUploadContainer');
        this.FileInputs = this.page.locator('#fileupload');
        this.SelectedFileText = this.page.locator('css=#documentUploadContainer .jut__FileUploadField__valueText');
        this.UploadPercentage = this.page.locator('#progressBarPercentage');
        this.DocumentTypeWrapper = this.page.locator('#ddlWhoCompleted-wrapper');
        this.DocumentTypeInput = this.page.locator('#ddlWhoCompleted');
        this.ConfirmationInput = this.page.locator('#chkTerm');
        this.ConfirmationLabel = this.page.locator('css=label[for="chkTerm"]');
        this.SubmitDocumentButton = this.page.locator('#btnSubmit');
        this.SupportingNextButton = this.page.locator('css=#dynamicIntakeFooter a[aria-label="Go to the next page."]');
        this.submittedDocumentsHeading = this.page.locator('#divTitleDocHistory');
    }

    async attachSupportingDocuments(): Promise<boolean> {
        await this.SupportingDocumentsHeading.waitFor({ state: 'visible' });
        await this.click(this.NextButton);
        await this.sleep(2000);
        await this.AdditionalCommentsHeading.waitFor({ state: 'visible' });
        await this.enter(this.AdditionalComments, 'This is additional comments added');
        await this.click(this.NextButton);
        return true;
    }

    async attachSupportingDocumentsWithFiles(filenames: string, documentTypes: string, folder: string, comments: string): Promise<string[]> {
        const fileList = filenames.split('|');
        const typeList = documentTypes.split('|');

        await this.SupportingDocumentsHeading.waitFor({ state: 'visible' });

        // Enable uploader if needed
        if (!(await this.UploadContainers.isVisible())) {
            await this.click(this.AttachButtons.first());
        }

        const verifiedFiles: string[] = [];
        for (let i = 0; i < fileList.length; i++) {
            const filename = fileList[i];
            const type = typeList.length === 1 ? typeList[0] : typeList[i];

            console.log(`[FORM 7 DOCUMENTS] Uploading ${filename}; document type=${type}`);

            await this.page.setInputFiles('#fileupload', `${folder}/${filename}`);

            await this.page.waitForFunction(async () => {
                const text = await (document.querySelector('#documentUploadContainer .jut__FileUploadField__valueText') as HTMLElement)?.innerText || '';
                const percentage = await (document.querySelector('#progressBarPercentage') as HTMLElement)?.innerText || '';
                return text.includes(filename) && percentage.includes('100%');
            }, { timeout: 120000 });

            await this.selectDocumentType(type);

            if (!(await this.ConfirmationInput.isChecked())) {
                await this.click(this.ConfirmationLabel);
            }

            await this.click(this.SubmitDocumentButton);
            verifiedFiles.push(filename);
        }

        await this.click(this.SupportingNextButton);
        await this.AdditionalCommentsHeading.waitFor({ state: 'visible' });
        await this.enter(this.AdditionalComments, comments || 'This is additional comments added');
        await this.click(this.NextButton);
        return verifiedFiles;
    }

    private async selectDocumentType(label: string): Promise<void> {
        if (!label || label.trim() === '') {
            throw new Error('A document-type label is required.');
        }

        await this.click(this.DocumentTypeWrapper);
        await this.DocumentTypeInput.fill('');
        await this.DocumentTypeInput.fill(label);

        const option = this.page.locator(`text=${label}`).first();
        await option.waitFor({ state: 'visible', timeout: 20000 });
        await this.click(option);

        console.log(`[FORM 7 DOCUMENTS] Document type selected and verified: ${label}`);
    }
}
