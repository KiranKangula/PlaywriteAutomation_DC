// utils/ExternalValidation.ts
import * as fs from 'fs';
import * as path from 'path';

export class ExternalValidation {
  private static enabled: boolean = ExternalValidation.loadEnabledFlag();

  private static loadEnabledFlag(): boolean {
    try {
      const configPath = path.resolve(process.cwd(), 'config/common.json');
      if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync(configPath, 'utf-8');
        const json = JSON.parse(raw);
        if (json.externalValidation !== undefined) {
          return String(json.externalValidation).toLowerCase() === 'true';
        }
      }
    } catch {
      // Default to true if not specified
    }
    return true;
  }

  public static shouldRun(stepName: string): boolean {
    if (!this.enabled) {
      console.log(`[EXTERNAL VALIDATION BYPASSED] ${stepName} | externalValidation=false`);
    }
    return this.enabled;
  }
}