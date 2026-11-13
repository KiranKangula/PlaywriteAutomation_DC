// pages/OSPC/OSPCClaimOverview.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';
import * as path from 'path';
import * as fs from 'fs';

interface DocumentKey {
  description: string;
  category: string;
}

export class OSPCClaimOverview extends BasePage {
  public static randommessage: string = '';

  // --- Locators matching Java @FindBy annotations ---
  readonly myclaimoverview: Locator;
  readonly benefitpaymentslink: Locator;
  readonly benefitpaymentsheading: Locator;
  readonly healthcarebenefitslink: Locator;
  readonly healthcarebenefitsheading: Locator;
  readonly nonhealthcarebenefitslink: Locator;
  readonly nonhealthcarebenefitsheading: Locator;
  readonly appealslink: Locator;
  readonly appealsheading: Locator;
  readonly ModelWindow: Locator;
  readonly submitdocumentslink: Locator;
  readonly submitdocumentsheading: Locator;
  readonly OSPCWsibFormYes: Locator;
  readonly OSPCConfirmCheckbox: Locator;
  readonly OSPCWSIBformDropdown: Locator;
  readonly OSPCDocumentSubmit: Locator;
  readonly submitdocumentsconfirmation: Locator;
  readonly CloseButton: Locator;
  readonly DocumentHistoryLink: Locator;
  readonly submittedDocumentsHeading: Locator;
  readonly SearchOptionExpand: Locator;

  readonly DocumentCategoryFilter: Locator;
  readonly DocumentDescriptionFilter: Locator;
  readonly PostedDateFromFilter: Locator;
  readonly PostedDateToFilter: Locator;
  readonly SearchButtonFilter: Locator;

  readonly DocumentCategory: Locator;
  readonly DocumentDescription: Locator;
  readonly DocumentDate: Locator;

  readonly dropdownBtnLocator: Locator;
  readonly showAllItem: Locator;
  readonly hundredItem: Locator;

  readonly SendusmessageLink: Locator;
  readonly SendusmessageHeader: Locator;
  readonly SubjectDropdown: Locator;
  readonly txtBody: Locator;
  readonly SendButton: Locator;
  readonly ReturntoMail: Locator;
  readonly mailListPageHeading: Locator;
  readonly SentMessageBody: Locator;

  readonly AddClaimButton: Locator;
  readonly ClaimNumberInput: Locator;
  readonly yearOfBirthInput: Locator;
  readonly personalIdentificationInput: Locator;
  readonly termOfUseCheckBox: Locator;
  readonly NextButton: Locator;
  readonly InjuryDateQuestion: Locator;
  readonly injuryAreaContainer: Locator;
  readonly PostalCodeQuestion: Locator;
  readonly EmployerNameQuestion: Locator;
  readonly PhoneNumberQuestion: Locator;

  readonly SubmitButton: Locator;
  readonly pageHeadingLabel: Locator;
  readonly verifyCard: Locator;
  readonly returnToClaimsHomelLink: Locator;
  readonly switchClaimLink: Locator;
  readonly viewClaimLink: Locator;

  readonly tableBody: Locator;
  readonly isDuplicateClaimMsg: Locator;
  readonly trackAppealHeading: Locator;
  readonly paginationSelectDropdownMenu: Locator;
  readonly ShowAll: Locator;

  constructor(page: Page) {
    super(page);

    this.myclaimoverview = page.locator("//*[@id='mainHeading']");
    this.benefitpaymentslink = page.locator("//*[@id='benefitPaymentLink']/a/span");
    this.benefitpaymentsheading = page.locator("#benefitPaymentHeading");
    this.healthcarebenefitslink = page.locator("//*[@id='healthCareBenefitslink']/a/span");
    this.healthcarebenefitsheading = page.locator("#mainHeading");
    this.nonhealthcarebenefitslink = page.locator("//*[@id='nonHealthCareBenefitslink']/a/span");
    this.nonhealthcarebenefitsheading = page.locator("#pageHeadingLabel");
    this.appealslink = page.locator("//*[@id='appealsLink']/a/span");
    this.appealsheading = page.locator("#mainHeading");
    this.ModelWindow = page.locator("//*[@id='DistributionPopUpNo']/div");
    this.submitdocumentslink = page.locator("//*[@id='claimDocumentsLink']/a/span");
    this.submitdocumentsheading = page.locator("//h1[contains(text(),'Submit document(s)')]");
    this.OSPCWsibFormYes = page.locator("//*[@id='docSource0']/div[1]/label");
    this.OSPCConfirmCheckbox = page.locator("#termOfUseCheckbox [role='checkbox'], #termOfUseCheckbox .jut__CheckboxField__checkboxElement, #termOfUseCheckBox label");
    this.OSPCWSIBformDropdown = page.locator("#wsibformselection-wrapper");
    this.OSPCDocumentSubmit = page.locator("//button[contains(.,'Submit')]");
    this.submitdocumentsconfirmation = page.locator("//h2[contains(text(),'Confirmation')]");
    this.CloseButton = page.locator("//span[contains(text(),'Close')]");
    this.DocumentHistoryLink = page.locator("//*[@id='claimDocumentHistoryLink']/a/span");
    this.submittedDocumentsHeading = page.locator("#submittedDocumentsHeading");
    this.SearchOptionExpand = page.locator("//*[starts-with(@id, 'advanceSearchAccordionCard')]//h4");

    this.DocumentCategoryFilter = page.locator("//*[@id='documentCategoryDropdown-wrapper']//input");
    this.DocumentDescriptionFilter = page.locator("#documentDescriptionLabelInput");
    this.PostedDateFromFilter = page.locator("#fromDate");
    this.PostedDateToFilter = page.locator("#toDate");
    this.SearchButtonFilter = page.locator("#SearchButton");

    this.DocumentCategory = page.locator("//*[@id='SubmittedDocumentsDataTable']/div/div[1]/div[2]/div[1]/div/div[1]");
    this.DocumentDescription = page.locator("//*[@id='SubmittedDocumentsDataTable']/div/div[1]/div[2]/div[1]/div/div[2]");
    this.DocumentDate = page.locator("//*[@id='SubmittedDocumentsDataTable']/div/div[1]/div[2]/div[1]/div/div[3]");

    this.dropdownBtnLocator = page.locator("button.jut__Pagination__paginationSelect");
    this.showAllItem = page.locator("a.jut__Pagination__paginationMenuItem[data-code='All']");
    this.hundredItem = page.locator("a.jut__Pagination__paginationMenuItem[data-code='100']");

    this.SendusmessageLink = page.locator("//*[@id='sendUsMessageLink']/a/span");
    this.SendusmessageHeader = page.locator("#secondaryHeading");
    this.SubjectDropdown = page.locator("#ddlSubject-wrapper");
    this.txtBody = page.locator("#txtBody");
    this.SendButton = page.locator("#btnSend");
    this.ReturntoMail = page.locator("#returnToMailLink");
    this.mailListPageHeading = page.locator("#mailListPageHeading");
    this.SentMessageBody = page.locator("//*[@id='mailListDatatable']/div/div[1]/div[2]/div[1]/div/div[4]/div");

    this.AddClaimButton = page.locator("#addClaimButton");
    this.ClaimNumberInput = page.locator("#claimNumberInput");
    this.yearOfBirthInput = page.locator("#yearOfBirthInput");
    this.personalIdentificationInput = page.locator("#personalIdentificationInput");
    this.termOfUseCheckBox = page.locator("#termOfUseCheckbox [role='checkbox'], #termOfUseCheckbox .jut__CheckboxField__checkboxElement, #termOfUseCheckBox label").first();
    this.NextButton = page.locator("#LinknextButton");
    this.InjuryDateQuestion = page.locator("#InjuryDate");
    this.injuryAreaContainer = page.locator("#InjuryArea");
    this.PostalCodeQuestion = page.locator("#PostalCode");
    this.EmployerNameQuestion = page.locator("input[id^='EmployerName']");
    this.PhoneNumberQuestion = page.locator("#PhoneNumber");

    this.SubmitButton = page.locator("#nextButton");
    this.pageHeadingLabel = page.locator("#pageHeadingLabel");
    this.verifyCard = page.locator("#verifyCard");
    this.returnToClaimsHomelLink = page.locator("#Link");
    this.switchClaimLink = page.locator("#switchClaimLink");
    this.viewClaimLink = page.locator("#viewClaimLink");

    this.tableBody = page.locator(".rt-tbody");
    this.isDuplicateClaimMsg = page.locator("#isDuplicateClaimMsg");
    this.trackAppealHeading = page.locator("#trackAppealHeading");
    this.paginationSelectDropdownMenu = page.locator("button[id*='paginationSelectDropdownMenu-statusAppealDatatable']");
    this.ShowAll = page.locator("//a[@data-code='All']");
  }

  // --- Navigation & Section Verification Methods ---

  async verifyOnClaimOverview(): Promise<boolean> {
    await this.myclaimoverview.waitFor({ state: 'visible' });
    if (await this.ModelWindow.isVisible()) {
      await this.ModelWindow.click();
    }
    const heading = (await this.myclaimoverview.textContent())?.trim();
    expect(heading).toBe('My claims overview');
    return await this.myclaimoverview.isVisible();
  }

  async verifyOnBenefitpayments(): Promise<boolean> {
    await this.benefitpaymentslink.click();
    await this.benefitpaymentsheading.waitFor({ state: 'visible' });
    const heading = (await this.benefitpaymentsheading.textContent())?.trim();
    expect(heading).toBe('Benefit payments');
    return await this.benefitpaymentsheading.isVisible();
  }

  async verifyOnHealthcarebenefits(): Promise<boolean> {
    await this.healthcarebenefitslink.click();
    await this.healthcarebenefitsheading.waitFor({ state: 'visible' });
    const heading = (await this.healthcarebenefitsheading.textContent())?.trim();
    expect(heading).toBe('Health care benefits');
    return await this.healthcarebenefitsheading.isVisible();
  }

  async verifyOnNonHealthcarebenefits(): Promise<boolean> {
    await this.nonhealthcarebenefitslink.click();
    await this.nonhealthcarebenefitsheading.waitFor({ state: 'visible' });
    const heading = (await this.nonhealthcarebenefitsheading.textContent())?.trim();
    expect(heading).toBe('Non-health care benefits');
    return await this.nonhealthcarebenefitsheading.isVisible();
  }

  async verifyOnAppeals(): Promise<boolean> {
    await this.appealslink.click();
    await this.appealsheading.waitFor({ state: 'visible' });
    const heading = (await this.appealsheading.textContent())?.trim();
    expect(heading).toBe('Appeals');
    return await this.appealsheading.isVisible();
  }

  /**
   * Verifies the count of appeals displayed on the OSPC Appeals tab
   */
  async verifyCountOfAppeals(): Promise<number> {
    const trackAppealHeading = this.page.locator('#trackAppealHeading, //h2[contains(text(), "Track")]').first();
    const isTrackAppealVisible = await trackAppealHeading
      .waitFor({ state: 'visible', timeout: 15000 })
      .then(() => true)
      .catch(() => false);
    if (isTrackAppealVisible) {
      // Handle pagination dropdown if "Show All" is present
      const paginationMenu = this.page.locator("//button[contains(@id, 'paginationSelectDropdownMenu')]").first();
      if (await paginationMenu.isVisible().catch(() => false)) {
        await paginationMenu.click();
        const showAll = this.page.locator("//a[@data-code='All'] | //button[contains(text(), 'All')]").first();
        if (await showAll.isVisible().catch(() => false)) {
          await showAll.click();
          await this.page.waitForTimeout(1500);
        }
      }
      const rows = this.page.locator('.rt-tbody .rt-tr-group, table tbody tr');
      const count = await rows.count();
      console.log(`[OSPCClaimOverview] Number of appeals displayed: ${count}`);
      return count;
    } else {
      console.log('[OSPCClaimOverview] No appeals heading found on screen.');
      return 0;
    }
  }

  async verifyOnSubmitDocuments(): Promise<boolean> {
    await this.submitdocumentslink.click();
    await this.submitdocumentsheading.waitFor({ state: 'visible' });
    const heading = (await this.submitdocumentsheading.textContent())?.trim();
    expect(heading).toBe('Submit document(s)');
    return await this.submitdocumentsheading.isVisible();
  }

  // --- Document Upload & WSIB Selection ---

    async uploadDocuments(filenames: string[] | string): Promise<string[]> {
  // Normalizes input whether passed as string[] or comma-separated string
  const originalFilenames: string[] = Array.isArray(filenames)
    ? filenames.map((f) => f.trim())
    : filenames.split(',').map((f) => f.trim());

  // Resolve upload folder (checks project root DocUploadFiles or src/test/resources/DocUploadFiles)
  let uploadDir = path.resolve(process.cwd(), 'src/test/resources/DocUploadFiles');
  if (!fs.existsSync(uploadDir)) {
    uploadDir = path.resolve(process.cwd(), 'DocUploadFiles');
  }

  const filePaths: string[] = [];

  for (const filename of originalFilenames) {
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      // Optional fallback: create dummy file if base file is missing
      fs.writeFileSync(filePath, `Test upload content for ${filename}`);
      console.log(`Created missing file '${filename}' at ${filePath}`);
    }

    filePaths.push(filePath);
  }

  const fileInput = this.page.locator("input[type='file']").first();
  await fileInput.setInputFiles(filePaths);

  await this.OSPCWsibFormYes.waitFor({ state: 'visible', timeout: 30000 });
  return originalFilenames;
}

  async selectWSIBForm(wsibFormsString: string): Promise<boolean> {
    const wsibFormSelections = wsibFormsString.split('|').map((s) => s.trim());
    const fileItemContainers = this.page.locator('.fileItemContainer');
    await fileItemContainers.first().waitFor({ state: 'visible', timeout: 30000 });

    const count = await fileItemContainers.count();
    if (count !== wsibFormSelections.length) {
      throw new Error(`Mismatch between uploaded files (${count}) and form selections (${wsibFormSelections.length})`);
    }

    for (let i = 0; i < count; i++) {
      const currentSelection = wsibFormSelections[i];
      const container = fileItemContainers.nth(i);
      const radioGroupId = `docSource${i}`;

      const yesRadio = container.locator(`label[for='${radioGroupId}_yes']`);
      const noRadio = container.locator(`label[for='${radioGroupId}_no']`);

      if (currentSelection && currentSelection.toLowerCase() !== 'no' && currentSelection.toLowerCase() !== 'n/a') {
        await yesRadio.click();
        console.log(`Selected 'Yes' for file at index ${i} (WSIB Form: ${currentSelection})`);

        // Handle dropdown selection (react-select or native select)
       // ✅ CORRECT (Pure CSS, works cleanly inside container)
        const dropdownWrapper = container.locator("[id*='wsibformselection-wrapper']").first();
        await this.selectCustomOrNativeDropdown(dropdownWrapper, currentSelection);
        console.log(`Selected WSIB form type: ${currentSelection}`);
      } else {
        await noRadio.click();
        console.log(`Selected 'No' for file at index ${i}`);
      }
    }
    return true;
  }

  async selectNonWSIBForm(nonwsibformtype: string, nonwsibform: string): Promise<boolean> {
    const categories = nonwsibformtype.split('|').map((s) => s.trim());
    const documents = nonwsibform.split('|').map((s) => s.trim());

    const fileItemContainers = this.page.locator('.fileItemContainer');
    await fileItemContainers.first().waitFor({ state: 'visible', timeout: 30000 });

    const count = await fileItemContainers.count();
    if (count !== categories.length || count !== documents.length) {
      throw new Error('Mismatch between number of uploaded files and Non-WSIB form selections provided.');
    }

    for (let i = 0; i < count; i++) {
      const container = fileItemContainers.nth(i);
      const currentCategory = categories[i];
      const currentDocument = documents[i];
      const radioGroupId = `docSource${i}`;

      const noRadio = container.locator(`label[for='${radioGroupId}_no']`);
      await noRadio.click();
      console.log(`Selected 'No' for file at index ${i}`);

      // Category dropdown
      const categoryDropdown = container.locator('[id*="formcategoryselection-wrapper"]').first();
      await this.selectCustomOrNativeDropdown(categoryDropdown, currentCategory);
      console.log(`Selected Category: '${currentCategory}' for file index ${i}`);

      // Document dropdown
      const docTypeDropdown = container.locator('[id*="nonwsibformselection-wrapper"]').first();
      await this.selectCustomOrNativeDropdown(docTypeDropdown, currentDocument);
      console.log(`Selected Document Name: '${currentDocument}' for file index ${i}`);
    }
    return true;
  }

  async SubmitDocument(): Promise<boolean> {
    await this.OSPCConfirmCheckbox.click();
    await this.OSPCDocumentSubmit.click();

    try {
      if (await this.CloseButton.isVisible({ timeout: 5000 })) {
        await this.CloseButton.click();
        await this.page.waitForTimeout(10000);
        await this.OSPCConfirmCheckbox.click();
        await this.OSPCDocumentSubmit.click();
      }
    } catch {
      // Close button not present, proceed
    }

    await this.submitdocumentsconfirmation.waitFor({ state: 'visible', timeout: 45000 });
    return await this.submitdocumentsconfirmation.isVisible();
  }

  // --- Document History & Verification Polling ---

  async DocumentHistory(
    filenamesString: string,
    documentCategories: string,
    documentDescription: string
  ): Promise<boolean> {
    // 1. Navigate to Document History
    await this.DocumentHistoryLink.click();
    await this.submittedDocumentsHeading.waitFor({ state: 'visible', timeout: 30000 });

    // 2. Parse descriptions
    const expectedDescriptions = documentDescription
      ? documentDescription.split('|').map((s) => s.trim()).filter((s) => s.length > 0)
      : [];

    // Parse categories
    let categoriesList: string[] = [];
    if (documentCategories) {
      const delimiter = documentCategories.includes('|') ? '|' : ',';
      categoriesList = documentCategories.split(delimiter).map((s) => s.trim()).filter((s) => s.length > 0);
    }

    // Map each submitted document and count required occurrences
    const newlySubmittedCounts = new Map<string, { key: DocumentKey; count: number }>();
    for (let i = 0; i < expectedDescriptions.length; i++) {
      const desc = expectedDescriptions[i];
      let cat = '';
      if (categoriesList.length > 0) {
        cat = i < categoriesList.length ? categoriesList[i] : categoriesList[0];
      }
      const mapKey = `${desc.toLowerCase()}:::${cat.toLowerCase()}`;
      const existing = newlySubmittedCounts.get(mapKey);
      if (existing) {
        existing.count += 1;
      } else {
        newlySubmittedCounts.set(mapKey, { key: { description: desc, category: cat }, count: 1 });
      }
    }

    // Determine UI filters (only populate if uniform)
    const uniqueCategories = new Set(categoriesList);
    const filterCategory = uniqueCategories.size === 1 ? categoriesList[0] : '';
    const uniqueDescriptions = new Set(expectedDescriptions);
    const filterDescription = uniqueDescriptions.size === 1 ? expectedDescriptions[0] : '';

    const todayFilterDate = this.getFormattedDate('YYYY-MM-DD'); // Input format: 2026-10-30
    const todayDisplayDate = this.getFormattedDate('DD MMM YYYY'); // Display format: 30 Oct 2026

    // 3. Apply search filters
    await this.applySearchFilters(filterCategory, filterDescription, todayFilterDate);

    // 4. Capture INITIAL baseline counts across all pages
    console.log('Reading baseline document counts across all pages...');
    const keysToWatch = Array.from(newlySubmittedCounts.values()).map((v) => v.key);
    const initialCounts = await this.getMatchingDocumentCountsAcrossPages(keysToWatch, todayDisplayDate);

    const targetCounts = new Map<string, number>();
    for (const [mapKey, item] of newlySubmittedCounts.entries()) {
      const initial = initialCounts.get(mapKey) || 0;
      const needed = initial + item.count;
      targetCounts.set(mapKey, needed);
      console.log(`Baseline for [${item.key.description}] -> Existing: ${initial}, Newly submitted: ${item.count}, Target: ${needed}`);
    }

    // 5. Polling: up to 24 attempts x 30s
    const maxAttempts = 24;
    const pollInterval = 30000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`Attempt ${attempt} of ${maxAttempts} checking for new documents...`);
      try {
        const currentCounts = await this.getMatchingDocumentCountsAcrossPages(keysToWatch, todayDisplayDate);
        let allMet = true;

        for (const [mapKey, item] of newlySubmittedCounts.entries()) {
          const required = targetCounts.get(mapKey) || 0;
          const current = currentCounts.get(mapKey) || 0;
          if (current < required) {
            console.log(`Waiting on [${item.key.description}]: current = ${current}, required = ${required}`);
            allMet = false;
          }
        }

        if (allMet) {
          console.log('SUCCESS: All new document(s) have appeared in the table.');
          return true;
        }
      } catch (err) {
        console.error(`Error reading document table on attempt ${attempt}:`, err);
      }

      if (attempt < maxAttempts) {
        await this.page.waitForTimeout(pollInterval);
        await this.page.reload();
        await this.submittedDocumentsHeading.waitFor({ state: 'visible', timeout: 30000 });
        await this.applySearchFilters(filterCategory, filterDescription, todayFilterDate);
      }
    }

    console.error('FAILED: Timeout waiting for new document(s) to appear.');
    return false;
  }

  private async getMatchingDocumentCountsAcrossPages(
    keysToWatch: DocumentKey[],
    todayDisplayDate: string
  ): Promise<Map<string, number>> {
    const totalCounts = new Map<string, number>();
    for (const key of keysToWatch) {
      totalCounts.set(`${key.description.toLowerCase()}:::${key.category.toLowerCase()}`, 0);
    }

    let currentPage = 1;
    const maxPagesToScan = 20;

    while (currentPage <= maxPagesToScan) {
      await this.countRowsOnCurrentPage(keysToWatch, todayDisplayDate, totalCounts);

      if (await this.hasNextPage()) {
        await this.goToNextPage();
        currentPage++;
        await this.page.waitForTimeout(1000);
      } else {
        break;
      }
    }

    if (currentPage > 1) {
      await this.resetToFirstPage();
    }

    return totalCounts;
  }

  private async countRowsOnCurrentPage(
    keysToWatch: DocumentKey[],
    todayDisplayDate: string,
    counts: Map<string, number>
  ): Promise<void> {
    const rows = this.page.locator("div[id^='SubmittedDocumentsDataTable'] .rt-tr-group");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const rowClass = (await row.getAttribute('class')) || '';
      if (rowClass.includes('-padRow')) {
        continue;
      }

      try {
        const catCell = row.locator('.rt-td:nth-child(2)');
        const descCell = row.locator('.rt-td:nth-child(3)');
        const dateCell = row.locator('.rt-td:nth-child(4)');

        if (!(await descCell.isVisible())) continue;

        const actualCategory = ((await catCell.textContent()) || '').trim();
        const actualDescription = ((await descCell.textContent()) || '').trim();
        const actualDate = ((await dateCell.textContent()) || '').trim();

        if (!actualDescription) continue;

        if (actualDate.toLowerCase() === todayDisplayDate.toLowerCase()) {
          for (const key of keysToWatch) {
            const descMatches = key.description.toLowerCase() === actualDescription.toLowerCase();
            const catMatches = !key.category || key.category.toLowerCase() === actualCategory.toLowerCase();

            if (descMatches && catMatches) {
              const mapKey = `${key.description.toLowerCase()}:::${key.category.toLowerCase()}`;
              counts.set(mapKey, (counts.get(mapKey) || 0) + 1);
              break;
            }
          }
        }
      } catch {
        // Row detached or empty
      }
    }
  }

  private async hasNextPage(): Promise<boolean> {
    try {
      const nextBtn = this.page.locator("//div[contains(@class, 'jut__Pagination__paginationNav')]//button[.//span[text()='Next']]").first();
      if (!(await nextBtn.isVisible())) {
        return false;
      }
      const isDisabled =
        (await nextBtn.getAttribute('disabled')) !== null ||
        (await nextBtn.getAttribute('aria-disabled')) === 'true' ||
        ((await nextBtn.getAttribute('class')) || '').includes('disabled');
      return !isDisabled;
    } catch {
      return false;
    }
  }

  private async goToNextPage(): Promise<void> {
    try {
      const nextBtn = this.page.locator("//div[contains(@class, 'jut__Pagination__paginationNav')]//button[.//span[text()='Next']]").first();
      await nextBtn.click();
    } catch (e) {
      console.warn('Warning: Failed to click Next page:', e);
    }
  }

  private async resetToFirstPage(): Promise<void> {
    try {
      const page1Btn = this.page.locator("//div[contains(@class, 'jut__Pagination__pageButtonsWrapper')]//button[.//span[text()='1']]").first();
      if (await page1Btn.isVisible()) {
        const btnClass = (await page1Btn.getAttribute('class')) || '';
        if (!btnClass.includes('jut__Pagination__selectedPageButton')) {
          await page1Btn.click();
          await this.page.waitForTimeout(800);
        }
      }
    } catch (e) {
      console.warn('Warning: Unable to reset to Page 1:', e);
    }
  }

  private async selectShowAllPageSize(): Promise<void> {
    try {
      if (await this.dropdownBtnLocator.isVisible()) {
        await this.dropdownBtnLocator.click();
        await this.page.waitForTimeout(400);

        if (await this.showAllItem.isVisible()) {
          await this.showAllItem.click();
        } else if (await this.hundredItem.isVisible()) {
          await this.hundredItem.click();
        }
        await this.page.waitForTimeout(1200);
      }
    } catch (e) {
      console.warn('Notice: Could not expand page size to Show All:', e);
    }
  }

  private async applySearchFilters(category: string, description: string, filterDate: string): Promise<void> {
    try {
      if (await this.SearchOptionExpand.isVisible()) {
        await this.SearchOptionExpand.click();
      }

      if (category && category.trim().length > 0) {
        await this.selectCustomOrNativeDropdown(this.DocumentCategoryFilter, category.trim());
      }

      if (description && description.trim().length > 0) {
        await this.DocumentDescriptionFilter.fill(description.trim());
      }

      if (await this.PostedDateFromFilter.isVisible()) {
        await this.PostedDateFromFilter.fill(filterDate);
      }
      if (await this.PostedDateToFilter.isVisible()) {
        await this.PostedDateToFilter.fill(filterDate);
      }

      await this.SearchButtonFilter.click();
      await this.page.waitForTimeout(1500);

      await this.selectShowAllPageSize();
    } catch (e) {
      console.warn('Warning: Error applying search filters:', e);
    }
  }

  // --- Send Message Screen Methods ---

  async verifyOnSendMessageScreen(): Promise<boolean> {
    await this.SendusmessageLink.click();
    await this.SendusmessageHeader.waitFor({ state: 'visible' });
    const header = (await this.SendusmessageHeader.textContent())?.trim();
    expect(header).toBe('Send us a message');
    return await this.SendusmessageHeader.isVisible();
  }

  async sendusamessage(subject: string, message: string): Promise<boolean> {
    if (message === '<dynamic>') {
      OSPCClaimOverview.randommessage = Math.random().toString(36).substring(2, 7);
    } else {
      OSPCClaimOverview.randommessage = message;
    }

    await this.SubjectDropdown.click();
    const subjectOption = this.page.locator(`//*[contains(text(),'${subject}')]`).first();
    await subjectOption.waitFor({ state: 'visible' });
    await subjectOption.click();

    await this.txtBody.fill(OSPCClaimOverview.randommessage);

    const selectedText = (await this.SubjectDropdown.textContent())?.trim();
    return selectedText ? selectedText.includes(subject) : false;
  }

  async sendandconfirm(): Promise<boolean> {
    await this.SendButton.click();
    await this.ReturntoMail.waitFor({ state: 'visible' });
    return await this.ReturntoMail.isVisible();
  }

  async mailscreen(): Promise<boolean> {
    await this.ReturntoMail.click();
    await this.mailListPageHeading.waitFor({ state: 'visible' });
    const sentText = (await this.SentMessageBody.textContent())?.trim();
    return sentText?.includes(OSPCClaimOverview.randommessage) ?? false;
  }

  // --- Add Claim Methods ---

  async addClaim(): Promise<boolean> {
    await this.AddClaimButton.click();
    await this.pageHeadingLabel.waitFor({ state: 'visible' });
    return await this.pageHeadingLabel.isVisible();
  }

  async selectInjuryAreaIfDisplayed(injuryArea: string): Promise<void> {
    if (await this.injuryAreaContainer.isVisible()) {
      const option = this.page.locator(`//div[@id='InjuryArea']//label[normalize-space()='${injuryArea}']`).first();
      await option.click();
      console.log(`Selected Injury Area: ${injuryArea}`);
    }
  }

  async AddaClaimOSPC(
    claimnumber: string,
    yob: string,
    InjuryDate: string,
    PhoneNumber: string,
    EmployerName: string,
    PostalCode: string,
    injuryArea: string
  ): Promise<boolean> {
    await this.ClaimNumberInput.fill(claimnumber);
    await this.yearOfBirthInput.fill(yob);
    await this.NextButton.click();

    await this.InjuryDateQuestion.fill(InjuryDate);
    await this.selectInjuryAreaIfDisplayed(injuryArea);

      if (await this.PhoneNumberQuestion.isVisible()) {
  await this.enterMaskedInput(this.PhoneNumberQuestion, PhoneNumber, { digitsOnly: true });
}
    if (await this.EmployerNameQuestion.first().isVisible()) {
      await this.EmployerNameQuestion.first().fill(EmployerName);
    }
    if (await this.PostalCodeQuestion.isVisible()) {
      await this.PostalCodeQuestion.fill(PostalCode);
    }

    await this.NextButton.click();
    await this.verifyCard.waitFor({ state: 'visible' });

    await this.returnToClaimsHomelLink.click();
    await this.switchClaimLink.click();

    return await this.isClaimPresentInTable(claimnumber);
  }

  // --- Tab & Window Switch Verifications ---

 /**
   * Verifies that a claim number has been removed from the OSPC claims list
   */
  async claimRemovalConfirmationOSPC(claimNumber: string): Promise<boolean> {
    console.log(`[OSPCClaimOverview] Verifying removal of claim: "${claimNumber}" on OSPC...`);
    // Ensure we are working with the active OSPC tab
    const pages = this.page.context().pages();
    const ospcPage = pages.find((p) => p.url().includes('ospc') && !p.isClosed()) || pages[0];
    if (ospcPage && !ospcPage.isClosed()) {
      this.page = ospcPage;
    }
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    // Locator matching claim card or table row on My Claims screen
    const claimLocator = this.page.locator(
      `//div[contains(@class, "claim-card") and contains(., "${claimNumber.trim()}")] | //tr[contains(., "${claimNumber.trim()}")] | //a[contains(text(), "${claimNumber.trim()}")]`
    ).first();
    const isVisible = await claimLocator.isVisible().catch(() => false);
    if (!isVisible) {
      console.log(`✅ [OSPCClaimOverview] Claim ${claimNumber} is confirmed removed from OSPC.`);
      return true;
    } else {
      console.warn(`⚠️ [OSPCClaimOverview] Claim ${claimNumber} is still visible on OSPC.`);
      return false;
    }
  }

  async claimAdditionalConfirmationOSPC(claimnumber: string): Promise<boolean> {
    const pages = this.page.context().pages();
    if (pages.length > 1) {
      await pages[pages.length - 1].close();
      const mainPage = pages[0];
      await mainPage.bringToFront();
      await mainPage.reload();
    }
    await this.page.waitForTimeout(5000);
    return await this.isClaimPresentInTable(claimnumber);
  }

  /**
   * Verifies that a claim number is visible on the OSPC claims list
   */
  async claimAdditionConfirmationOSPC(claimNumber: string): Promise<boolean> {
    console.log(`[OSPCClaimOverview] Verifying addition of claim: "${claimNumber}" on OSPC...`);
    const pages = this.page.context().pages();
    const ospcPage = pages.find((p) => p.url().includes('ospc') && !p.isClosed()) || pages[0];
    if (ospcPage && !ospcPage.isClosed()) {
      this.page = ospcPage;
    }
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    const claimLocator = this.page.locator(
      `//div[contains(@class, "claim-card") and contains(., "${claimNumber.trim()}")] | //tr[contains(., "${claimNumber.trim()}")] | //a[contains(text(), "${claimNumber.trim()}")]`
    ).first();
    const isVisible = await claimLocator.waitFor({ state: 'visible', timeout: 30000 }).then(() => true).catch(() => false);
    if (isVisible) {
      console.log(`✅ [OSPCClaimOverview] Claim ${claimNumber} is confirmed present on OSPC.`);
      return true;
    }
    return false;
  }

  /**
   * Refreshes OSPC and verifies the count of appeals after GWCC creation
   */
  async appealRegisteredConfirmationOSPC(): Promise<number> {
    // 1. Ensure this.page points to the active OSPC tab
    const pages = this.page.context().pages();
    const ospcPage = pages.find((p) => p.url().includes('ospc') && !p.isClosed()) || pages[0];
    if (ospcPage && !ospcPage.isClosed()) {
      this.page = ospcPage;
    }
    // 2. Navigate/Refresh and wait for page to be ready
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    // 3. Click on appeals link if not already on appeals section
    const appealsHeading = this.page.locator('#mainHeading, //h1[normalize-space()="Appeals"]').first();
    const isAppealsVisible = await appealsHeading.isVisible().catch(() => false);
    if (!isAppealsVisible) {
      const appealsLink = this.page.locator('//*[@id="appealsLink"]/a/span | //a[contains(@href, "appeals")]').first();
      if (await appealsLink.isVisible().catch(() => false)) {
        await appealsLink.click();
        await appealsHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
      }
    }
    // 4. Verify appeal table and return count
    return await this.verifyCountOfAppeals();
  }

  // --- Helper Methods ---

  private async isClaimPresentInTable(claimnumber: string): Promise<boolean> {
    const rows = this.tableBody.locator('div.rt-tr');
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const claimLink = rows.nth(i).locator('div.rt-td a.bluelink');
      if (await claimLink.isVisible()) {
        const text = (await claimLink.textContent())?.trim();
        if (text === claimnumber) {
          console.log(`Claim number ${claimnumber} found.`);
          return true;
        }
      }
    }
    console.log(`Claim number ${claimnumber} not found.`);
    return false;
  }

   /**
   * Helper to select options from either a Jutro / React-Select custom dropdown or a native <select>
   */
  async selectCustomOrNativeDropdown(wrapperLocator: Locator, optionText: string): Promise<void> {
    await wrapperLocator.waitFor({ state: 'visible', timeout: 15000 });

    // 1. Check for native <select> first
    const nativeSelect = wrapperLocator.locator('select').first();
    const hasNative = await nativeSelect.count().then((c) => c > 0).catch(() => false);
    if (hasNative && (await nativeSelect.isVisible().catch(() => false))) {
      console.log(`[OSPCClaimOverview] Selecting native select option: "${optionText}"`);
      try {
        await nativeSelect.selectOption({ label: optionText });
      } catch {
        await nativeSelect.selectOption({ value: optionText });
      }
      return;
    }

    // 2. Handle Jutro / React-Select custom dropdown:
    // Click the clickable control wrapper or placeholder container, NOT the hidden inner <input>
    console.log(`[OSPCClaimOverview] Opening Jutro dropdown for: "${optionText}"`);
    const clickableArea = wrapperLocator.locator(
      "div[class*='control'], div[class*='placeholder'], div[class*='indicator'], div[class*='ValueContainer']"
    ).first();

    if (await clickableArea.isVisible().catch(() => false)) {
      await clickableArea.click({ force: true });
    } else {
      await wrapperLocator.click({ force: true });
    }

    await this.page.waitForTimeout(400);

    // 3. If there is an active input to filter by typing, use fill or pressSequentially
    const filterInput = wrapperLocator.locator('input').first();
    if (await filterInput.isVisible().catch(() => false)) {
      await filterInput.fill(optionText).catch(() => {});
      await this.page.waitForTimeout(300);
    }

    // 4. Locate and click the matching dropdown menu option
    const optionLocator = this.page.locator(
      `//div[contains(@class, "option") and normalize-space()="${optionText.trim()}"] | ` +
      `//div[contains(@class, "option") and contains(., "${optionText.trim()}")] | ` +
      `//*[@role="option" and contains(., "${optionText.trim()}")] | ` +
      `//li[contains(., "${optionText.trim()}")]`
    ).first();

    await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
    await optionLocator.click();
    await this.page.waitForTimeout(400);
    console.log(`✅ [OSPCClaimOverview] Selected dropdown value: "${optionText}"`);
  }

  private getFormattedDate(pattern: 'YYYY-MM-DD' | 'DD MMM YYYY'): string {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (pattern === 'YYYY-MM-DD') {
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    } else {
      return `${pad(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }
  }
}