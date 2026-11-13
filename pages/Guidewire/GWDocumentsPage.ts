import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

export class GWDocumentsPage extends BasePage {
    private readonly ClaimDocumentsLink: Locator;
    private readonly HiddenDropdown: Locator;
    private readonly RedactionRequiredDropdown: Locator;
    private readonly NoAccessDropdown: Locator;
    private readonly Search_link: Locator;
    private readonly SearchStartDate: Locator;
    private readonly SearchEndDate: Locator;
    private readonly Author: Locator;
    private readonly DocumentsTable: Locator;
    private readonly UnnumberedDocLink: Locator;
    private readonly NIHLUNCDTable: Locator;
    private readonly NIHLUNCDPagers: Locator;

    constructor(page: Page) {
        super(page);
        this.ClaimDocumentsLink = this.page.locator('#Claim\\:MenuLinks\\:Claim_ClaimDocumentsGroup');
        this.HiddenDropdown = this.page.locator('xpath=//*[contains(@id, "DocumentsMemosScreen:ClaimDocumentSearchDV:Hidden")]');
        this.RedactionRequiredDropdown = this.page.locator('xpath=//*[contains(@id, "DocumentsMemosScreen:ClaimDocumentSearchDV:RedactionRequired")]');
        this.NoAccessDropdown = this.page.locator('xpath=//*[contains(@id, "DocumentsMemosScreen:ClaimDocumentSearchDV:NoAccess")]');
        this.Search_link = this.page.locator('xpath=//*[contains(@id, "DocumentsMemosScreen:ClaimDocumentSearchDV:SearchAndResetInputSet:SearchLinksInputSet:Search_link")]');
        this.SearchStartDate = this.page.locator('#ClaimDocuments\\:DocumentsMemosScreen\\:ClaimDocumentSearchDV\\:StartDate');
        this.SearchEndDate = this.page.locator('#ClaimDocuments\\:DocumentsMemosScreen\\:ClaimDocumentSearchDV\\:EndDate');
        this.Author = this.page.locator('#ClaimDocuments\\:DocumentsMemosScreen\\:ClaimDocumentSearchDV\\:Author');
        this.DocumentsTable = this.page.locator('#ClaimDocuments\\:DocumentsMemosScreen\\:DocumentsLV');
        this.UnnumberedDocLink = this.page.locator('#WSIB_Form8_FNOLWizard\\:Documents');
        this.NIHLUNCDTable = this.page.locator('#WSIB_Form8_FNOLWizard\\:IndependentWizardStepSet\\:DocumentsMemosScreen\\:DocumentsLV');
        this.NIHLUNCDPagers = this.page.locator('xpath=//span[contains(@id, "WSIB_Form8_FNOLWizard:IndependentWizardStepSet:DocumentsMemosScreen:DocumentsLV:_ListPaging_container")]');
    }

    async verifyLandedDocument(author: string, description: string): Promise<boolean> {
        return this.verifyLandedDocuments(author, [description]);
    }

    async verifyLandedDocuments(author: string, descriptions: string[]): Promise<boolean> {
        await this.click(this.ClaimDocumentsLink);
        await this.HiddenDropdown.selectOption({ value: 'Yes' });
        await this.RedactionRequiredDropdown.selectOption({ value: 'Yes' });
        await this.NoAccessDropdown.selectOption({ value: 'Yes' });

        const today = new Date().toLocaleDateString('en-GB'); // dd/MM/yyyy
        await this.enter(this.SearchStartDate, today);
        await this.enter(this.SearchEndDate, today);
        await this.enter(this.Author, author);
        await this.click(this.Search_link);
        await this.sleep(5000);

        const isOspcAuthor = author?.trim().toLowerCase() === 'ospc';
        const normalizedExpected = descriptions.map(d => d.toLowerCase().trim());

        for (let attempt = 0; attempt < 5; attempt++) {
            if (isOspcAuthor) {
                const rows = this.DocumentsTable.locator('tr');
                const rowCount = await rows.count();
                const foundDescriptions = new Set<string>();
                for (let i = 0; i < rowCount; i++) {
                    const text = (await rows.nth(i).innerText()).toLowerCase();
                    for (const desc of normalizedExpected) {
                        if (text.includes(desc)) {
                            foundDescriptions.add(desc);
                        }
                    }
                }
                if (foundDescriptions.size === normalizedExpected.length) return true;
            } else {
                // Simplified count check for non-OSPC
                const rows = this.DocumentsTable.locator('tr');
                const rowCount = await rows.count();
                if (rowCount >= normalizedExpected.length) return true;
            }

            await this.sleep(5000);
            await this.click(this.Search_link);
        }
        return false;
    }

    async verifyLandedUNCDDocument(author: string, description: string): Promise<boolean> {
        await this.click(this.UnnumberedDocLink);
        await this.HiddenDropdown.selectOption({ value: 'Yes' });
        await this.RedactionRequiredDropdown.selectOption({ value: 'Yes' });
        await this.NoAccessDropdown.selectOption({ value: 'Yes' });
        await this.click(this.Search_link);
        await this.sleep(5000);

        for (let attempt = 0; attempt < 5; attempt++) {
            const rows = this.NIHLUNCDTable.locator('tr');
            const rowCount = await rows.count();
            for (let i = 0; i < rowCount; i++) {
                const text = (await rows.nth(i).innerText()).toLowerCase();
                if (text.includes(description.toLowerCase().trim()) && text.includes(author.toLowerCase().trim())) {
                    return true;
                }
            }
            await this.sleep(5000);
            await this.click(this.Search_link);
        }
        return false;
    }
}
