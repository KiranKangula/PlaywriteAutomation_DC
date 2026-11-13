import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';
import path from 'path';

export class SupportingDocuments extends BasePage {
    private readonly NextButton: Locator;
    private readonly AttachedAudiogramLink: Locator;
    private readonly AttachedAudiogramFile: Locator;
    private readonly AttachedEmploymentFiles: Locator;
    private readonly UploadErrors: Locator;
    private readonly ReviewHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.NextButton = page.locator('xpath=//app-supporting-documents//button[@aria-label="Next"]');
        this.AttachedAudiogramLink = page.locator('xpath=//app-supporting-documents//a[@aria-label="Attach audiogram, if available"]');
        this.AttachedAudiogramFile = page.locator('xpath=//app-supporting-documents//input[@type="file" and @title="uploadAudiogram"]');
        this.AttachedEmploymentFiles = page.locator('xpath=//app-supporting-documents//input[@type="file" and @title="uploadProofOfEmployment"]');
        this.UploadErrors = page.locator('xpath=//app-supporting-documents//app-field-error-display');
        this.ReviewHeading = page.locator('xpath=//app-review//h2[@aria-label="Review"]');
    }

    async EnterSupportingDocuments(healthCareFiles: string = '', employmentFiles: string = '', uploadFolder: string | null = null): Promise<void> {
        await this.AttachedAudiogramLink.waitFor({ state: 'visible' });
        await this.sleep(5000);

        const healthFiles = this.getUploadFiles(healthCareFiles, uploadFolder);
        const employmentDocuments = this.getUploadFiles(employmentFiles, uploadFolder);

        if (healthFiles.length > 10) {
            throw new Error('You can upload up to 10 audiograms.');
        }

        const employmentInputs = await this.AttachedEmploymentFiles.all();
        if (employmentDocuments.length > employmentInputs.length) {
            throw new Error(`Configured ${employmentDocuments.length} employment files, but the page contains only ${employmentInputs.length} employer upload controls.`);
        }

        const employerIds: string[] = [];
        for (let i = 0; i < employmentDocuments.length; i++) {
            const id = await employmentInputs[i].getAttribute('id');
            if (!id) throw new Error('Employment upload control missing ID.');
            employerIds.push(id);
        }

        await this.verifyNoUploadErrors();

        for (const file of healthFiles) {
            await this.AttachedAudiogramFile.setInputFiles(file);
            await this.sleep(5000);
            await this.verifyNoUploadErrors();
        }

        for (let i = 0; i < employmentDocuments.length; i++) {
            const input = this.page.locator(`#${employerIds[i]}`);
            await input.setInputFiles(employmentDocuments[i]);
            await this.sleep(5000);
            await this.verifyNoUploadErrors();
        }

        await this.verifyNoUploadErrors();
        await this.click(this.NextButton);
        await this.ReviewHeading.waitFor({ state: 'visible' });
        await this.sleep(5000);
    }

    private getUploadFiles(configuredFiles: string, uploadFolder: string | null): string[] {
        const files: string[] = [];
        if (!configuredFiles || configuredFiles.trim() === '') {
            return files;
        }

        const folder = uploadFolder || 'src/test/resources/DocUploadFiles';
        const baseFolder = path.resolve(folder);

        for (const value of configuredFiles.split('|')) {
            const name = value.trim();
            if (!name) throw new Error(`Empty filename in upload data: ${configuredFiles}`);
            const fullPath = path.resolve(baseFolder, name);
            files.push(fullPath);
        }
        return files;
    }

    private async verifyNoUploadErrors(): Promise<void> {
        const errors = await this.UploadErrors.all();
        for (const error of errors) {
            if (await error.isVisible()) {
                const message = await error.innerText();
                if (message.trim()) {
                    throw new Error(`Supporting document upload error: ${message}`);
                }
            }
        }
    }
}
