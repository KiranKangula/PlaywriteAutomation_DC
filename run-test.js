// run-test.js
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Ensure 'reports' directory exists
const reportsDir = path.resolve(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// 2. Extract arguments passed from npm script (e.g., tests/features/WorkerTravel.feature)
const userArgs = process.argv.slice(2);

// 3. Assemble Cucumber CLI arguments including JSON output
const cucumberArgs = [
  './node_modules/@cucumber/cucumber/bin/cucumber.js',
  ...userArgs,
  '--format', 'summary',
  '--format', 'progress-bar',
  '--format', 'json:reports/cucumber-report.json'
];

console.log(`\n▶ Running Cucumber tests...`);
const testResult = spawnSync('npx', ['tsx', ...cucumberArgs], {
  stdio: 'inherit',
  shell: true
});

// 4. ALWAYS trigger report generation regardless of test exit code
console.log(`\n▶ Triggering HTML report generation...`);
spawnSync('npx', ['tsx', 'utils/GenerateReport.ts'], {
  stdio: 'inherit',
  shell: true
});

// 5. Exit with test's exit code for CI/CD status accuracy
process.exit(testResult.status ?? 0);