import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';
import fs from 'fs';
import path from 'path';

export class SubmitDocuments extends BasePage {
    private readonly formtype0Yes: Locator;
    private readonly formtype0No: Locator;
    private readonly edobformselection0Select: Locator;
    private readonly catogoryselection0Select: Locator;
    private readonly subformselection0Select: Locator;
    private readonly subformselection0listbox: Locator;
    private readonly NextButton: Locator;
    private readonly isthisaWSIBform: Locator;
    private readonly uncdformselection0Select: Locator;
    private readonly regionSupportHeader: Locator;
    private readonly supportdoctypeYes: Locator;
    private readonly supportdoctypeNo: Locator;
    private readonly alertdialogtitle: Locator;
    private readonly alertCloseButton: Locator;

    constructor(page: Page) {
        super(page);
        this.formtype0Yes = page.locator('xpath=//*[@aria-labelledby="formtype0"]/label/span/input[@value="yes"]');
        this.formtype0No = page.locator('xpath=//*[@aria-labelledby="formtype0"]/label/span/input[@value="no"]');
        this.edobformselection0Select = page.locator('#edobformselection0-select');
        this.catogoryselection0Select = page.locator('#catogoryselection0-select');
        this.subformselection0Select = page.locator('#subformselection0-select');
        this.subformselection0listbox = page.locator('#subformselection0-listbox');
        this.NextButton = page.locator('xpath=//*[@type="submit"]');
        this.isthisaWSIBform = page.locator('#formtype0');
        this.uncdformselection0Select = page.locator('#uncdformselection0-select');
        this.regionSupportHeader = page.locator('#region-support');
        this.supportdoctypeYes = page.locator('xpath=//*[@aria-labelledby="support-doctype-label"]/label/span/input[@value="yes"]');
        this.supportdoctypeNo = page.locator('xpath=//*[@aria-labelledby="support-doctype-label"]/label/span/input[@value="no"]');
        this.alertdialogtitle = page.locator('#alert-dialog-title');
        this.alertCloseButton = page.locator('xpath=//button[text()="Fermer" or text()= "Close"]');
    }

    async navigateToURL(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async uploadDocument(filenamesString: string): Promise<string[]> {
        const originalFilenames = filenamesString.split(',').map(f => f.trim());
        const timestampedAbsolutePaths: string[] = [];
        const timestampedFilenames: string[] = [];
        const timestamp = new Date().toISOString().replace(/[:.]/g, '').replace('T', '_').split('Z')[0];
        const uploadDir = path.resolve('src/test/resources/DocUploadFiles');

        for (let i = 0; i < originalFilenames.length; i++) {
            const originalFilename = originalFilenames[i];
            const ext = path.extname(originalFilename);
            const base = path.basename(originalFilename, ext);
            const newFilename = `${base}_${timestamp}_${i}${ext}`;
            const newPath = path.join(uploadDir, newFilename);

            fs.copyFileSync(path.join(uploadDir, originalFilename), newPath);
            console.log(`Copied original file '${originalFilename}' to '${newFilename}'`);
            timestampedAbsolutePaths.push(newPath);
            timestampedFilenames.push(newFilename);
        }

        const input = this.page.locator("input[type='file']");
        await input.evaluate(el => (el as HTMLElement).style.display = 'block');
        await input.setInputFiles(timestampedAbsolutePaths);

        await this.isthisaWSIBform.waitFor({ state: 'visible' });
        return timestampedFilenames;
    }

    async selectWSIBForm(wsibFormsString: string): Promise<boolean> {
        const wsibFormSelections = wsibFormsString.split('|').map(f => f.trim());
        const fileItemContainers = await this.page.locator('.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.css-akeo4y').all();

        if (fileItemContainers.length !== wsibFormSelections.length) {
            throw new Error(`Mismatch between number of uploaded files and WSIB form selections. Expected ${wsibFormSelections.length}, found ${fileItemContainers.length}`);
        }

        for (let i = 0; i < fileItemContainers.length; i++) {
            const currentWsibFormSelection = wsibFormSelections[i];
            const currentFileContainer = fileItemContainers[i];
            const radioGroupId = `formtype${i}`;

            const yesRadioButton = currentFileContainer.locator(`xpath=.//*[@aria-labelledby='${radioGroupId}']/label/span/input[@value='yes']`);
            const noRadioButton = currentFileContainer.locator(`xpath=.//*[@aria-labelledby='${radioGroupId}']/label/span/input[@value='no']`);

            if (currentWsibFormSelection && !['no', 'n/a'].includes(currentWsibFormSelection.toLowerCase())) {
                if (!(await yesRadioButton.isSelected())) {
                    await this.click(yesRadioButton);
                }
                const wsibFormTypeDropdown = currentFileContainer.locator(`xpath=.//*[@id='edobformselection${i}-select']`);
                await wsibFormTypeDropdown.selectOption(currentWsibFormSelection);
            } else {
                if (!(await noRadioButton.isSelected())) {
                    await this.click(noRadioButton);
                }
            }
        }

        await this.click(this.NextButton);
        if (await this.alertdialogtitle.isVisible()) {
            console.log('Alert dialog displayed');
            await this.click(this.alertCloseButton);
            await this.sleep(5000);
            await this.click(this.NextButton);
        }
        return true;
    }

    async selectNonWSIBForm(nonwsibformtype: string, nonwsibform: string): Promise<boolean> {
        const categories = nonwsibformtype.split('|').map(f => f.trim());
        const documents = nonwsibform.split('|').map(f => f.trim());

        const fileItemContainers = await this.page.locator('.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.css-akeo4y').all();

        if (fileItemContainers.length !== categories.length || fileItemContainers.length !== documents.length) {
            throw new Error('Mismatch between number of uploaded files and Non-WSIB form selections.');
        }

        for (let i = 0; i < fileItemContainers.length; i++) {
            const currentFileContainer = fileItemContainers[i];
            const currentCategory = categories[i];
            const currentDocument = documents[i];
            const radioGroupId = `formtype${i}`;
            const noRadioButton = currentFileContainer.locator(`xpath=.//*[@aria-labelledby='${radioGroupId}']/label/span/input[@value='no']`);

            if (!(await noRadioButton.isSelected())) {
                await this.click(noRadioButton);
            }

            const categoryDropdown = currentFileContainer.locator(`xpath=.//*[@id='catogoryselection${i}-select']`);
            await categoryDropdown.selectOption(currentCategory);

            const docTypeDropdown = currentFileContainer.locator(`xpath=.//*[@id='subformselection${i}-select']`);
            await docTypeDropdown.selectOption(currentDocument);
        }

        await this.click(this.NextButton);
        if (await this.alertdialogtitle.isVisible()) {
            console.log('Alert dialog displayed');
            await this.click(this.alertCloseButton);
            await this.sleep(5000);
            await this.click(this.NextButton);
        }
        return true;
    }

    async selectUNCDForm(category: string): Promise<void> {
        await this.uncdformselection0Select.waitFor({ state: 'visible' });
        await this.click(this.uncdformselection0Select);
        await this.enter(this.uncdformselection0Select, category);
        await this.click(this.NextButton);
        if (await this.alertdialogtitle.isVisible()) {
            console.log('Alert dialog displayed');
            await this.click(this.alertCloseButton);
            await this.sleep(5000);
            await this.click(this.NextButton);
        }
    }

    async selectSupportingDocuments(supportingdocument: string): Promise<void> {
        await this.regionSupportHeader.waitFor({ state: 'visible' });
        if (supportingdocument.toLowerCase() === 'yes') {
            await this.click(this.supportdoctypeYes);
        } else {
            await this.click(this.supportdoctypeNo);
        }
        await this.click(this.NextButton);
    }

    async cleanupUploadedFiles(filenamesString: string): Promise<void> {
        const filenames = filenamesString.split(',').map(f => f.trim());
        for (const filename of filenames) {
            const filePath = path.resolve('src/test/resources/DocUploadFiles', filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Deleted temporary file: ${filename}`);
            }
        }
    }
}
