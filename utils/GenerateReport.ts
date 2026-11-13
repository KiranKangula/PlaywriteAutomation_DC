// utils/GenerateReport.ts
import * as path from 'path';
import * as fs from 'fs';
import { ConfigLoader } from './ConfigLoader';

interface CucumberStep {
  keyword: string;
  name: string;
  line: number;
  result: {
    status: 'passed' | 'failed' | 'skipped' | 'undefined';
    duration?: number;
    error_message?: string;
  };
  embeddings?: Array<{
    data: string;
    mime_type: string;
  }>;
}

interface CucumberElement {
  id: string;
  name: string;
  type: string;
  keyword: string;
  line: number;
  tags?: Array<{ name: string }>;
  steps: CucumberStep[];
}

interface CucumberFeature {
  id: string;
  name: string;
  uri: string;
  description: string;
  tags?: Array<{ name: string }>;
  elements: CucumberElement[];
}

export class GenerateReport {
  public static generate(): void {
    const rawJsonDir = path.resolve(process.cwd(), 'reports');
    const sourceJsonPath = path.resolve(rawJsonDir, 'cucumber-report.json');

    if (!fs.existsSync(sourceJsonPath)) {
      console.warn(`[Report] No Cucumber JSON found at: ${sourceJsonPath}. Skipping report generation.`);
      return;
    }

    let features: CucumberFeature[] = [];
    try {
      const jsonContent = fs.readFileSync(sourceJsonPath, 'utf-8');
      features = JSON.parse(jsonContent);
    } catch (e: any) {
      console.error(`[Report] Failed to read or parse '${sourceJsonPath}':`, e.message);
      return;
    }

    // 1. Resolve Environment & Suite prefix
    const env = ConfigLoader.getEnvironment();
    const suitePrefix = process.env.SUITE || 'SanityTest';
    const browserType = (process.env.BROWSER || 'edge').toUpperCase();
    const isHeadless = process.env.HEADLESS === 'true';

    // 2. Format Dates & Timestamps
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dd = pad(now.getDate());
    const mmm = months[now.getMonth()];
    const yyyy = now.getFullYear();

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const hh = pad(hour12);
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());

    const dateFolder = `${suitePrefix}_${dd}-${mmm}-${yyyy}`; // e.g., SanityTest_30-Oct-2026
    const timeStr = `${pad(hours)}${mm}${ss}_${ampm}`;        // e.g., 154656_PM
    const displayTimestamp = `${mmm} ${dd}, ${yyyy} ${hh}:${mm}:${ss} ${ampm}`;

    // 3. Setup Target Directory: reports/test-output/SanityTest_<date>/
    const targetDir = path.resolve(process.cwd(), 'reports', 'test-output', dateFolder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const htmlReportPath = path.resolve(targetDir, `Execution_${env}_${timeStr}.html`);

    // 4. Compute Metrics
    let totalFeatures = features.length;
    let passedFeatures = 0;
    let failedFeatures = 0;

    let totalScenarios = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;

    let totalSteps = 0;
    let passedSteps = 0;
    let failedSteps = 0;
    let skippedSteps = 0;

    const tagMap: { [tagName: string]: { pass: number; fail: number; scenarios: { name: string; status: string; testId: number }[] } } = {};
    const timelineData: { [key: string]: number } = {};

    features.forEach((feature) => {
      let featurePassed = true;
      let featureDurationNanos = 0;

      feature.elements?.forEach((element) => {
        if (element.type !== 'scenario') return;
        totalScenarios++;
        let scenarioPassed = true;

        element.steps?.forEach((step) => {
          totalSteps++;
          const dur = step.result?.duration || 0;
          featureDurationNanos += dur;

          if (step.result?.status === 'passed') {
            passedSteps++;
          } else if (step.result?.status === 'failed') {
            scenarioPassed = false;
            featurePassed = false;
            failedSteps++;
          } else {
            skippedSteps++;
          }
        });

        if (scenarioPassed) {
          passedScenarios++;
        } else {
          failedScenarios++;
        }
      });

      timelineData[feature.name] = Math.max(1, Math.round(featureDurationNanos / 1_000_000_000));

      if (featurePassed) {
        passedFeatures++;
      } else {
        failedFeatures++;
      }
    });

    const formatDuration = (nanos: number) => {
      const ms = Math.floor(nanos / 1_000_000);
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSec = seconds % 60;
      const remainingMs = ms % 1000;
      return `${pad(minutes)}:${pad(remainingSec)}:${String(remainingMs).padStart(3, '0')}`;
    };

    // 5. Build Left-Hand Test Items List & Right-Hand Detail Accordions
    let leftTestItemsHtml = '';
    let globalScenarioCounter = 10;

    features.forEach((feature, fIdx) => {
      const featureId = (fIdx + 1) * 10;
      const featureHasFail = feature.elements.some((e) => e.steps.some((s) => s.result.status === 'failed'));
      const featureStatus = featureHasFail ? 'fail' : 'pass';
      const featureStatusBadge = featureHasFail ? 'fail-bg' : 'pass-bg';

      let featureDurationNanos = 0;
      let scenariosAccordionHtml = '';

      feature.elements.forEach((scenario) => {
        if (scenario.type !== 'scenario') return;
        globalScenarioCounter++;
        const scenarioId = globalScenarioCounter;
        const scenarioPassed = !scenario.steps.some((s) => s.result.status === 'failed');
        const scenarioStatus = scenarioPassed ? 'Pass' : 'Fail';
        const scenarioBadge = scenarioPassed ? 'pass-bg' : 'fail-bg';
        const hasScreenshot = scenario.steps.some((s) => s.embeddings && s.embeddings.length > 0);

        // Track tags
        const allTags = [...(feature.tags || []), ...(scenario.tags || [])];
        allTags.forEach((t) => {
          const rawTag = t.name.replace('@', '');
          if (!tagMap[rawTag]) {
            tagMap[rawTag] = { pass: 0, fail: 0, scenarios: [] };
          }
          if (scenarioPassed) {
            tagMap[rawTag].pass++;
          } else {
            tagMap[rawTag].fail++;
          }
          tagMap[rawTag].scenarios.push({
            name: scenario.name,
            status: scenarioPassed ? 'pass' : 'fail',
            testId: featureId
          });
        });

        let rowsHtml = '';
        // Initial setup info row
        rowsHtml += `
          <tr class="event-row">
            <td><span class="badge log info-bg">Info</span></td>
            <td>${timeStr.replace(/_/g, ' ')}</td>
            <td>Browser: ${browserType.toLowerCase()} | Headless Mode: ${isHeadless}</td>
          </tr>
        `;

        scenario.steps.forEach((step) => {
          const dur = step.result?.duration || 0;
          featureDurationNanos += dur;
          const status = step.result?.status;
          const isFail = status === 'failed';
          const badgeClass = isFail ? 'fail-bg' : status === 'passed' ? 'info-bg' : 'warning-bg';
          const badgeLabel = isFail ? 'Fail' : 'Info';

          let details = `${step.keyword.trim()} ${step.name || ''}`;
          if (step.result?.error_message) {
            details += `
              <div class="mt-2">
                <pre class="text-danger p-2 bg-light border rounded" style="font-size: 12px; white-space: pre-wrap;">${escapeHtml(step.result.error_message)}</pre>
              </div>
            `;
          }

          if (step.embeddings) {
            step.embeddings.forEach((emb) => {
              if (emb.mime_type === 'image/png') {
                details += `
                  <div class="row mb-3 mt-2">
                    <div class="col-md-3">
                      <a href="data:image/png;base64,${emb.data}" target="_blank">
                        <img src="data:image/png;base64,${emb.data}" class="img-fluid border rounded" style="max-height: 220px;" alt="Failure Screenshot" />
                      </a>
                    </div>
                  </div>
                `;
              }
            });
          }

          rowsHtml += `
            <tr class="event-row">
              <td><span class="badge log ${badgeClass}">${badgeLabel}</span></td>
              <td>${timeStr.replace(/_/g, ' ')}</td>
              <td>${details}</td>
            </tr>
          `;
        });

        // Closing scenario status row
        rowsHtml += `
          <tr class="event-row">
            <td><span class="badge log ${scenarioBadge}">${scenarioStatus}</span></td>
            <td>${timeStr.replace(/_/g, ' ')}</td>
            <td>Scenario ${scenarioStatus.toLowerCase()}ed (latest attempt).</td>
          </tr>
        `;

        const tagBadges = (scenario.tags || []).map((t) => `<span class="badge badge-pill badge-default">${t.name.replace('@', '')}</span>`).join(' ');

        scenariosAccordionHtml += `
          <div class="card">
            <div class="card-header">
              <div class="card-toolbar node-info">
                <ul class="list-inline d-none d-sm-block">
                  <li><span class="badge ${scenarioBadge} log">${scenarioStatus}</span></li>
                  <li><span class="badge badge-default">${formatDuration(scenario.steps.reduce((acc, s) => acc + (s.result?.duration || 0), 0))}</span></li>
                  ${hasScreenshot ? '<li><span><i class="fa fa-paperclip"></i></span></li>' : ''}
                </ul>
              </div>
              <div class="card-title">
                <a class="node" id="${scenarioId}" href="javascript:void(0);"><span>${scenario.name}</span></a>
                <div class="node-attr">${tagBadges}</div>
              </div>
            </div>
            <div class="collapse ${scenarioPassed ? '' : 'show'}">
              <div class="card-body">
                <table class="table table-sm">
                  <thead><tr><th class="status-col">Status</th><th class="timestamp-col">Timestamp</th><th class="details-col">Details</th></tr></thead>
                  <tbody>${rowsHtml}</tbody>
                </table>
              </div>
            </div>
          </div>
        `;
      });

      // Left-list test item (first item active by default)
      leftTestItemsHtml += `
        <li class="test-item ${fIdx === 0 ? 'active' : ''}" status="${featureStatus}" test-id="${featureId}">
          <div class="test-detail">
            <p class="name">${feature.name}</p>
            <p class="text-sm">
              <span>${timeStr.replace(/_/g, ' ')}</span> / <span>${formatDuration(featureDurationNanos)}</span>
              <span class="badge ${featureStatusBadge} log float-right">${capitalize(featureStatus)}</span>
            </p>
          </div>
          <div class="test-contents d-none">
            <div class="detail-head">
              <div class="p-v-10">
                <div class="info">
                  <h5 class="test-status text-${featureStatus}">${feature.name}</h5>
                  <span class='badge badge-success'>${displayTimestamp}</span>
                  <span class='badge badge-default'>${formatDuration(featureDurationNanos)}</span>
                  &middot; <span class='uri-anchor badge badge-default'>#test-id=${featureId}</span>
                  <span title='Collapse all nodes' class='badge badge-default pointer float-right ct ml-1'><i class="fa fa-compress"></i></span>
                  <span title='Expand all nodes' class='badge badge-default pointer float-right et'><i class="fa fa-expand"></i></span>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="accordion" role="tablist">
                ${scenariosAccordionHtml}
              </div>
            </div>
          </div>
        </li>
      `;
    });

    // 6. Build Category / Tag View
    let categoryListHtml = '';
    let categoryCount = 0;
    Object.keys(tagMap).forEach((tagName, cIdx) => {
      categoryCount++;
      const info = tagMap[tagName];
      const hasFail = info.fail > 0;
      const metaBadge = hasFail
        ? `<span class='badge log badge-danger'>${info.fail}</span>`
        : `<span class='badge log pass-bg'>${info.pass}</span>`;

      let scenarioRows = '';
      info.scenarios.forEach((sc) => {
        const badge = sc.status === 'pass' ? 'pass-bg' : 'fail-bg';
        scenarioRows += `
          <tr class="tag-test-status" status="${sc.status}">
            <td><span class="badge log ${badge}">${capitalize(sc.status)}</span></td>
            <td>${timeStr.replace(/_/g, ' ')}</td>
            <td>
              <a href="javascript:void(0);" class="linked" onclick="openTestFromTag(${sc.testId})">${sc.name}</a>
            </td>
          </tr>
        `;
      });

      categoryListHtml += `
        <li class="test-item ${cIdx === 0 ? 'active' : ''}">
          <div class="test-detail">
            <span class="meta">${metaBadge}</span>
            <p class="name">${tagName}</p>
            <p class="duration text-sm">${info.pass + info.fail} tests</p>
          </div>
          <div class="test-contents d-none">
            <div class="info">
              <h4>${tagName}</h4>
              ${hasFail ? `<span status="fail" class='badge log badge-danger'>${info.fail} failed</span>` : `<span status="pass" class='badge log pass-bg'>${info.pass} passed</span>`}
            </div>
            <table class='table table-sm mt-4'>
              <thead><tr><th class="status-col">Status</th><th class="timestamp-col">Timestamp</th><th>TestName</th></tr></thead>
              <tbody>${scenarioRows}</tbody>
            </table>
          </div>
        </li>
      `;
    });

    // 7. Assemble Complete ExtentReports Spark HTML Page
    const sparkHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Automation Execution Report - ${env}</title>
<link rel="apple-touch-icon" href="https://cdn.jsdelivr.net/gh/extent-framework/extent-github-cdn@b00a2d0486596e73dd7326beacf352c639623a0e/commons/img/logo.png">
<link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/extent-framework/extent-github-cdn@b00a2d0486596e73dd7326beacf352c639623a0e/commons/img/logo.png">
<link href="https://cdn.jsdelivr.net/gh/extent-framework/extent-github-cdn@ce8b10435bcbae260c334c0d0c6b61d2c19b6168/spark/css/spark-style.css" rel="stylesheet" />
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/extent-framework/extent-github-cdn@7cc78ce/spark/js/jsontree.js"></script>
</head>
<body class="spa -report standard">
  <div class="app">
    <div class="layout">
      <!-- HEADER NAVBAR -->
      <div class="header navbar">
        <div class="vheader">
          <div class="nav-logo">
            <a href="#">
              <div class="logo" style="background-image: url('https://cdn.jsdelivr.net/gh/extent-framework/extent-github-cdn@b00a2d0486596e73dd7326beacf352c639623a0e/commons/img/logo.png')"></div>
            </a>
          </div>
          <ul class="nav-left">
            <li class="search-box">
              <a class="search-toggle" href="javascript:void(0);"><i class="search-icon fa fa-search"></i><i class="search-icon-close fa fa-close"></i></a>
            </li>
            <li class="search-input"><input id="search-tests" class="form-control" type="text" placeholder="Search..."></li>
          </ul>
          <ul class="nav-right">
            <li class="m-r-10"><a href="#"><span class="badge badge-primary">Test Execution Results - ${env}</span></a></li>
            <li class="m-r-10"><a href="#"><span class="badge badge-primary">${displayTimestamp}</span></a></li>
          </ul>
        </div>
      </div>

      <!-- SIDE NAVIGATION RAIL -->
      <div class="side-nav">
        <div class="side-nav-inner">
          <ul class="side-nav-menu">
            <li class="nav-item dropdown active" onclick="toggleView('test-view')">
              <a id="nav-test" class="dropdown-toggle" href="javascript:void(0);"><span class="ico"><i class="fa fa-list"></i></span></a>
            </li>
            <li class="nav-item dropdown" onclick="toggleView('category-view')">
              <a id="nav-category" class="dropdown-toggle" href="javascript:void(0);"><span class="ico"><i class="fa fa-tag"></i></span></a>
            </li>
            <li class="nav-item dropdown" onclick="toggleView('dashboard-view')">
              <a id="nav-dashboard" class="dropdown-toggle" href="javascript:void(0);"><span class="ico"><i class="fa fa-bar-chart"></i></span></a>
            </li>
          </ul>
        </div>
      </div>

      <!-- MAIN CONTENT CONTAINER -->
      <div class="vcontainer">
        <div class="main-content">

          <!-- 1. TESTS VIEW (MASTER-DETAIL) -->
          <div class="test-wrapper row view test-view">
            <div class="test-list">
              <div class="test-list-tools">
                <ul class="tools pull-left">
                  <li><a href="javascript:void(0);"><span class="font-size-14">Tests</span></a></li>
                </ul>
                <ul class="tools text-right">
                  <li class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-exclamation-circle"></i></a>
                    <ul id="status-toggle" class="dropdown-menu dropdown-md p-v-0">
                      <a class="dropdown-item" status="pass" href="javascript:void(0);"><span>Pass</span><span class="status success"></span></a>
                      <a class="dropdown-item" status="fail" href="javascript:void(0);"><span>Fail</span><span class="status danger"></span></a>
                      <div class="dropdown-divider"></div>
                      <a status="clear" class="dropdown-item" href="javascript:void(0);"><span>Clear</span><span class="pull-right"><i class="fa fa-close"></i></span></a>
                    </ul>
                  </li>
                  <li class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-tag"></i></a>
                    <ul id="tag-toggle" class="dropdown-menu dropdown-md p-v-0">
                      ${Object.keys(tagMap).map((k) => `<a class="dropdown-item" href="javascript:void(0);">${k}</a>`).join('')}
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="test-list-wrapper scrollable">
                <ul class="test-list-item">
                  ${leftTestItemsHtml}
                </ul>
              </div>
            </div>
            <div class="test-content scrollable">
              <div class="test-content-tools">
                <ul><li><a class="back-to-test" href="javascript:void(0);"><i class="fa fa-arrow-left"></i></a></li></ul>
              </div>
              <div class="test-content-detail"><div class="detail-body"></div></div>
            </div>
          </div>

          <!-- 2. CATEGORY / TAG VIEW -->
          <div class="test-wrapper row view category-view attributes-view" style="display:none;">
            <div class="test-list">
              <div class="test-list-tools">
                <ul class="tools pull-left"><li><a href="javascript:void(0);"><span class="font-size-14">Category</span></a></li></ul>
                <ul class="tools text-right"><li><a href="javascript:void(0);"><span class="badge badge-primary">${categoryCount}</span></a></li></ul>
              </div>
              <div class="test-list-wrapper scrollable">
                <ul class="test-list-item">
                  ${categoryListHtml}
                </ul>
              </div>
            </div>
            <div class="test-content scrollable">
              <div class="test-content-tools">
                <ul><li><a class="back-to-test" href="javascript:void(0);"><i class="fa fa-arrow-left"></i></a></li></ul>
              </div>
              <div class="test-content-detail"><div class="detail-body"></div></div>
            </div>
          </div>

          <!-- 3. DASHBOARD VIEW -->
          <div class="container-fluid p-4 view dashboard-view" style="display:none;">
            <div class="row">
              <div class="col-md-3">
                <div class="card"><div class="card-body"><p class="m-b-0">Started</p><h3>${displayTimestamp}</h3></div></div>
              </div>
              <div class="col-md-3">
                <div class="card"><div class="card-body"><p class="m-b-0">Ended</p><h3>${displayTimestamp}</h3></div></div>
              </div>
              <div class="col-md-3">
                <div class="card"><div class="card-body"><p class="m-b-0 text-pass">Tests Passed</p><h3>${passedFeatures}</h3></div></div>
              </div>
              <div class="col-md-3">
                <div class="card"><div class="card-body"><p class="m-b-0 text-fail">Tests Failed</p><h3>${failedFeatures}</h3></div></div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-header"><h6 class="card-title">Tests</h6></div>
                  <div class="card-body"><canvas id="parent-analysis" width="115" height="90"></canvas></div>
                  <div class="card-footer">
                    <div><small data-tooltip="${totalFeatures ? Math.round((passedFeatures / totalFeatures) * 100) : 0}%"><b>${passedFeatures}</b> tests passed</small></div>
                    <div><small data-tooltip="${totalFeatures ? Math.round((failedFeatures / totalFeatures) * 100) : 0}%"><b>${failedFeatures}</b> tests failed</small></div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-header"><h6 class="card-title">Steps</h6></div>
                  <div class="card-body"><canvas id="child-analysis" width="115" height="90"></canvas></div>
                  <div class="card-footer">
                    <div><small data-tooltip="${totalScenarios ? Math.round((passedScenarios / totalScenarios) * 100) : 0}%"><b>${passedScenarios}</b> steps passed</small></div>
                    <div><small data-tooltip="${totalScenarios ? Math.round((failedScenarios / totalScenarios) * 100) : 0}%"><b>${failedScenarios}</b> steps failed</small></div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-header"><h6 class="card-title">Log events</h6></div>
                  <div class="card-body"><canvas id="events-analysis" width="115" height="90"></canvas></div>
                  <div class="card-footer">
                    <div><small data-tooltip="${totalSteps ? Math.round((passedSteps / totalSteps) * 100) : 0}%"><b>${passedSteps}</b> events passed</small></div>
                    <div><small data-tooltip="${totalSteps ? Math.round((failedSteps / totalSteps) * 100) : 0}%"><b>${failedSteps}</b> events failed</small></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="card"><div class="card-header"><p>Timeline</p></div><div class="card-body pt-0"><canvas id="timeline" height="120"></canvas></div></div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 col-md-12 category-container">
                <div class="card">
                  <div class="card-header"><p>Tags</p></div>
                  <div class="card-body pb-0 pt-0">
                    <table class="table table-sm table-bordered">
                      <thead><tr class="bg-gray"><th>Name</th><th>Passed</th><th>Failed</th><th>Skipped</th><th>Others</th><th>Passed %</th></tr></thead>
                      <tbody>
                        ${Object.keys(tagMap).map((k) => {
                          const tg = tagMap[k];
                          const total = tg.pass + tg.fail;
                          const pct = total ? Math.round((tg.pass / total) * 100) : 0;
                          return `<tr><td>${k}</td><td>${tg.pass}</td><td>${tg.fail}</td><td>0</td><td>0</td><td>${pct}%</td></tr>`;
                        }).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 sysenv-container">
                <div class="card">
                  <div class="card-header"><p>System/Environment</p></div>
                  <div class="card-body pb-0 pt-0">
                    <table class="table table-sm table-bordered">
                      <thead><tr class="bg-gray"><th>Name</th><th>Value</th></tr></thead>
                      <tbody>
                        <tr><td>Environment</td><td>${env}</td></tr>
                        <tr><td>Browser</td><td>${browserType} (Headless: ${isHeadless})</td></tr>
                        <tr><td>Platform</td><td>${process.platform === 'win32' ? 'Windows 10/11' : process.platform}</td></tr>
                        <tr><td>Execution Time</td><td>${displayTimestamp}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

<script>
var timeline = ${JSON.stringify(timelineData, null, 2)};
var statusGroup = {
  parentCount: ${totalFeatures},
  passParent: ${passedFeatures},
  failParent: ${failedFeatures},
  warningParent: 0,
  skipParent: 0,
  childCount: ${totalScenarios},
  passChild: ${passedScenarios},
  failChild: ${failedScenarios},
  warningChild: 0,
  skipChild: 0,
  infoChild: 0,
  grandChildCount: ${totalSteps},
  passGrandChild: ${passedSteps},
  failGrandChild: ${failedSteps},
  warningGrandChild: 0,
  skipGrandChild: ${skippedSteps},
  infoGrandChild: 0,
  eventsCount: ${totalSteps},
  passEvents: ${passedSteps},
  failEvents: ${failedSteps},
  warningEvents: 0,
  skipEvents: ${skippedSteps},
  infoEvents: ${passedSteps}
};

// Extent Spark Interaction Scripts
document.addEventListener("DOMContentLoaded", function () {
  // 1. Initial Master-Detail Render
  function renderDetail(viewClass) {
    var activeItem = document.querySelector(viewClass + " .test-list-item .test-item.active");
    if (!activeItem) {
      activeItem = document.querySelector(viewClass + " .test-list-item .test-item");
      if (activeItem) activeItem.classList.add("active");
    }
    if (activeItem) {
      var contents = activeItem.querySelector(".test-contents");
      var detailTarget = document.querySelector(viewClass + " .test-content-detail .detail-body");
      if (contents && detailTarget) {
        detailTarget.innerHTML = contents.innerHTML;
        bindDetailEvents(viewClass);
      }
    }
  }

  function bindMasterClick(viewClass) {
    var items = document.querySelectorAll(viewClass + " .test-list-item .test-item");
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        items.forEach(function (i) { i.classList.remove("active"); });
        item.classList.add("active");
        renderDetail(viewClass);
      });
    });
  }

  // 2. Expand / Collapse & Accordion Controls
  function bindDetailEvents(viewClass) {
    var detail = document.querySelector(viewClass + " .test-content-detail");
    if (!detail) return;

    // Toggle single card on header click
    detail.querySelectorAll(".card-header").forEach(function (header) {
      header.onclick = function () {
        var collapse = header.nextElementSibling;
        if (collapse) {
          collapse.classList.toggle("show");
        }
      };
    });

    // Expand all button (et)
    var expandAllBtn = detail.querySelector(".et");
    if (expandAllBtn) {
      expandAllBtn.onclick = function (e) {
        e.stopPropagation();
        detail.querySelectorAll(".accordion .collapse").forEach(function (c) {
          c.classList.add("show");
        });
      };
    }

    // Collapse all button (ct)
    var collapseAllBtn = detail.querySelector(".ct");
    if (collapseAllBtn) {
      collapseAllBtn.onclick = function (e) {
        e.stopPropagation();
        detail.querySelectorAll(".accordion .collapse").forEach(function (c) {
          c.classList.remove("show");
        });
      };
    }
  }

  bindMasterClick(".test-view");
  bindMasterClick(".category-view");
  renderDetail(".test-view");
});

// View switching function
function toggleView(viewName) {
  document.querySelectorAll(".side-nav-menu li").forEach(function (li) { li.classList.remove("active"); });
  document.querySelectorAll(".view").forEach(function (v) { v.style.display = "none"; });

  if (viewName === "test-view") {
    document.querySelector("#nav-test").parentElement.classList.add("active");
    var tv = document.querySelector(".test-view");
    tv.style.display = "flex";
    var detail = tv.querySelector(".test-content-detail .detail-body");
    if (!detail || detail.innerHTML.trim() === "") {
      var active = tv.querySelector(".test-list-item .test-item.active") || tv.querySelector(".test-list-item .test-item");
      if (active) {
        detail.innerHTML = active.querySelector(".test-contents").innerHTML;
      }
    }
  } else if (viewName === "category-view") {
    document.querySelector("#nav-category").parentElement.classList.add("active");
    var cv = document.querySelector(".category-view");
    cv.style.display = "flex";
    var cDetail = cv.querySelector(".test-content-detail .detail-body");
    if (!cDetail || cDetail.innerHTML.trim() === "") {
      var cActive = cv.querySelector(".test-list-item .test-item.active") || cv.querySelector(".test-list-item .test-item");
      if (cActive) {
        cDetail.innerHTML = cActive.querySelector(".test-contents").innerHTML;
      }
    }
  } else if (viewName === "dashboard-view") {
    document.querySelector("#nav-dashboard").parentElement.classList.add("active");
    document.querySelector(".dashboard-view").style.display = "block";
  }
}

function openTestFromTag(testId) {
  toggleView("test-view");
  var target = document.querySelector(".test-view .test-item[test-id='" + testId + "']");
  if (target) {
    target.click();
  }
}
</script>
<script src="https://cdn.jsdelivr.net/gh/extent-framework/extent-github-cdn@ce8b10435bcbae260c334c0d0c6b61d2c19b6168/spark/js/spark-script.js"></script>
</body>
</html>`;

    // 8. Write standalone HTML report
    fs.writeFileSync(htmlReportPath, sparkHtml, 'utf-8');

    // 9. Remove temporary raw JSON file so only the HTML report remains
    try {
      if (fs.existsSync(sourceJsonPath)) {
        fs.unlinkSync(sourceJsonPath);
      }
    } catch {}

    console.log(`\n==================================================`);
    console.log(`📊 Extent Spark Report Generated Successfully!`);
    console.log(`📁 Target Directory : ${targetDir}`);
    console.log(`📄 Report HTML File : Execution_${env}_${timeStr}.html`);
    console.log(`==================================================\n`);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Allow direct execution
if (require.main === module) {
  GenerateReport.generate();
}