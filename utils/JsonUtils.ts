// utils/JsonUtils.ts
import * as path from 'path';
import * as fs from 'fs';
import { ConfigLoader } from './ConfigLoader';

export class JsonUtils {
  /**
   * Reads test data JSON from: data/{ENV}/{fileName}.json
   * Accepts both readJsonData and getTestData signatures
   */
  public static readJsonData(sheetOrFileName: string, overrideEnv?: string): any[] {
    const env = overrideEnv || ConfigLoader.getEnvironment(sheetOrFileName);
    const fileName = sheetOrFileName.endsWith('.json') ? sheetOrFileName : `${sheetOrFileName}.json`;
    const fullPath = path.resolve(process.cwd(), 'data', env, fileName);

    if (!fs.existsSync(fullPath)) {
      const knownEnvs = ['BAT', 'ITE1', 'ITE2', 'PPD', 'SIT2'];
      const foundIn = knownEnvs.filter((e) =>
        fs.existsSync(path.resolve(process.cwd(), 'data', e, fileName))
      );

      throw new Error(
        `\n================================================================================` +
        `\n[JsonUtils] Test data file not found at: ${fullPath}` +
        `\n- Environment: [${env}]` +
        `\n- Target File: [${fileName}]` +
        (foundIn.length > 0
          ? `\n- HINT: This file exists in environment(s): [${foundIn.join(', ')}].` +
            `\n  Run with: cross-env TEST_ENV=${foundIn[0]} npm run ...`
          : `\n- HINT: Please ensure the dataset file is placed under 'data/${env}/'`) +
        `\n================================================================================\n`
      );
    }

    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (err: any) {
      throw new Error(`[JsonUtils] Failed parsing JSON at '${fullPath}': ${err.message}`);
    }
  }

  // Alias for getTestData
  public static getTestData(sheetOrFileName: string, overrideEnv?: string): any[] {
    return this.readJsonData(sheetOrFileName, overrideEnv);
  }

public static writeJsonData(sheetOrFileName: string, data: any, overrideEnv?: string): void {
    const env = overrideEnv || ConfigLoader.getEnvironment(sheetOrFileName);
    const fileName = sheetOrFileName.endsWith('.json') ? sheetOrFileName : `${sheetOrFileName}.json`;
    const fullPath = path.resolve(process.cwd(), 'data', env, fileName);
    try {
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`[JsonUtils] Successfully updated data file: ${fullPath}`);
    } catch (err: any) {
      console.error(`[JsonUtils] Failed to write JSON file at '${fullPath}':`, err);
      throw err;
    }
  }

}