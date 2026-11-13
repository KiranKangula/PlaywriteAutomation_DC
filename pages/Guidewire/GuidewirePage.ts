import { Page } from '@playwright/test';
import { BasePage } from '../../utils/BasePage';

/**
 * @deprecated This class has been split into smaller, logical page objects:
 * - GWLoginPage
 * - GWSearchPage
 * - GWClaimRegistrationPage
 * - GWClaimParticipantsPage
 * - GWDocumentsPage
 * - GWAdminPage
 * - GWRecoveryPage
 * - GWAppealsPage
 */
export class GuidewirePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}
