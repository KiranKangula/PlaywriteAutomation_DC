// utils/ConfigLoader.ts
import * as path from 'path';
import * as fs from 'fs';

export class ConfigLoader {
  /**
   * Resolves the app config name matching Java:
   * Prioritizes the Feature file name (e.g., tests/features/OSPC.feature -> OSPC)
   */
  public static resolveAppName(tags: string[] = [], featureUri: string = '', sheetName?: string): string {
    if (featureUri) {
      // Normalize slashes for Windows and Linux
      const normalizedUri = featureUri.replace(/\\/g, '/');
      const fileName = normalizedUri.split('/').pop() || '';
      const baseName = fileName.replace('.feature', '').trim();

      if (baseName.toLowerCase() === 'ospc' || baseName.toLowerCase() === 'ospc_api') return 'OSPC';
      if (baseName.toLowerCase().includes('workertravel')) return 'WorkerTravel';
      if (baseName.toLowerCase().includes('clothingallowance')) return 'ClothingAllowance';
      if (baseName.toLowerCase().includes('nihl')) return 'NIHL';
      if (baseName.toLowerCase().includes('osbc')) return 'OSBC';
      if (baseName.toLowerCase().includes('gwclaimcenter')) return 'GWClaimCenter';
      if (baseName.toLowerCase().includes('uncd')) return 'UNCD';
      if (baseName.toLowerCase().includes('b2bform7')) return 'B2BForm7';
      if (baseName.toLowerCase().includes('accessibility')) return 'Accessibility';

      if (baseName.length > 0) return baseName;
    }

    if (tags.some((t) => t.includes('OSPC'))) return 'OSPC';
    if (tags.some((t) => t.includes('WT'))) return 'WorkerTravel';
    if (tags.some((t) => t.includes('CAA'))) return 'ClothingAllowance';
    if (tags.some((t) => t.includes('NIHL'))) return 'NIHL';
    if (tags.some((t) => t.includes('OSBC'))) return 'OSBC';
    if (tags.some((t) => t.includes('UNCD'))) return 'UNCD';

    return 'OSPC';
  }

  public static getEnvironment(appName?: string): string {
    const rawEnv = process.env.TEST_ENV || process.env.ENV || 'BAT';
    return rawEnv.trim().toUpperCase();
  }

  public static loadEnvConfig(appName: string, env: string): any {
    const configPath = path.resolve(process.cwd(), 'config', 'environments', env, `${appName}.json`);
    if (fs.existsSync(configPath)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        console.log(`📂 [ConfigLoader] Loaded config for [${appName}] in [${env}] from: ${configPath}`);
        return parsed;
      } catch (err: any) {
        console.error(`❌ [ConfigLoader] Failed to parse JSON config at: ${configPath}`, err.message);
        return {};
      }
    }
    console.warn(`⚠️ [ConfigLoader] Config file not found at: ${configPath}`);
    return {};
  }

  public static loadCommonConfig(): any {
    const commonPath = path.resolve(process.cwd(), 'config', 'common.json');
    if (fs.existsSync(commonPath)) {
      try {
        return JSON.parse(fs.readFileSync(commonPath, 'utf-8'));
      } catch {
        return {};
      }
    }
    return {};
  }
}