import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const port = process.env.PORT || '3008';
const baseUrl = `http://localhost:${port}`;

const routes = [
  { name: 'en-about', url: `${baseUrl}/en/about` },
  { name: 'ar-about', url: `${baseUrl}/ar/about` },
  { name: 'en-privacy', url: `${baseUrl}/en/privacy-policy` },
  { name: 'ar-privacy', url: `${baseUrl}/ar/privacy-policy` },
  { name: 'en-terms', url: `${baseUrl}/en/terms-and-conditions` },
  { name: 'ar-terms', url: `${baseUrl}/ar/terms-and-conditions` },
  { name: 'en-cookies', url: `${baseUrl}/en/cookie-policy` },
  { name: 'ar-cookies', url: `${baseUrl}/ar/cookie-policy` },
];

const outDir = './lh-reports/legal-pages';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function runLighthouse(url, outputPath) {
  const cmd = `npx lighthouse ${url} --form-factor=mobile --screenEmulation.mobile=true --output=json --output-path="${outputPath}" --chrome-flags="--headless=new --no-sandbox" --quiet`;
  try {
    execSync(cmd, { stdio: 'pipe' });
  } catch (err) {
    if (!fs.existsSync(outputPath)) {
      throw err;
    }
  }
}

function parseReport(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const cats = data.categories || {};
  const audits = data.audits || {};

  return {
    perf: Math.round((cats.performance?.score || 0) * 100),
    a11y: Math.round((cats.accessibility?.score || 0) * 100),
    bp: Math.round((cats['best-practices']?.score || 0) * 100),
    seo: Math.round((cats.seo?.score || 0) * 100),
    fcp: audits['first-contentful-paint']?.numericValue || 0,
    fcpDisplay: audits['first-contentful-paint']?.displayValue || '',
    lcp: audits['largest-contentful-paint']?.numericValue || 0,
    lcpDisplay: audits['largest-contentful-paint']?.displayValue || '',
    si: audits['speed-index']?.numericValue || 0,
    siDisplay: audits['speed-index']?.displayValue || '',
    tbt: audits['total-blocking-time']?.numericValue || 0,
    tbtDisplay: audits['total-blocking-time']?.displayValue || '',
    cls: audits['cumulative-layout-shift']?.numericValue || 0,
    clsDisplay: audits['cumulative-layout-shift']?.displayValue || '0',
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const summary = {};

for (const route of routes) {
  console.log(`\n========================================`);
  console.log(`Starting 3 Lighthouse mobile runs for ${route.name} (${route.url})...`);
  const runs = [];

  for (let i = 1; i <= 3; i++) {
    const outputPath = path.join(outDir, `${route.name}-run${i}.json`);
    console.log(`  Run ${i}/3...`);
    runLighthouse(route.url, outputPath);
    const parsed = parseReport(outputPath);
    runs.push(parsed);
    console.log(`    Run ${i}: Perf=${parsed.perf} | A11y=${parsed.a11y} | BP=${parsed.bp} | SEO=${parsed.seo} | LCP=${parsed.lcpDisplay} | TBT=${parsed.tbtDisplay} | CLS=${parsed.clsDisplay}`);
  }

  const medPerf = median(runs.map(r => r.perf));
  const medA11y = median(runs.map(r => r.a11y));
  const medBp = median(runs.map(r => r.bp));
  const medSeo = median(runs.map(r => r.seo));
  const medFcp = median(runs.map(r => r.fcp));
  const medLcp = median(runs.map(r => r.lcp));
  const medSi = median(runs.map(r => r.si));
  const medTbt = median(runs.map(r => r.tbt));
  const medCls = median(runs.map(r => r.cls));

  summary[route.name] = {
    runs,
    median: {
      perf: medPerf,
      a11y: medA11y,
      bp: medBp,
      seo: medSeo,
      fcpMs: medFcp,
      fcp: `${(medFcp / 1000).toFixed(2)}s`,
      lcpMs: medLcp,
      lcp: `${(medLcp / 1000).toFixed(2)}s`,
      speedIndexMs: medSi,
      speedIndex: `${(medSi / 1000).toFixed(2)}s`,
      tbtMs: Math.round(medTbt),
      tbt: `${Math.round(medTbt)}ms`,
      cls: medCls.toFixed(3),
    }
  };

  console.log(`  >>> MEDIAN for ${route.name}:`);
  console.log(`      Performance:   ${medPerf}`);
  console.log(`      Accessibility: ${medA11y}`);
  console.log(`      Best Practices: ${medBp}`);
  console.log(`      SEO:           ${medSeo}`);
  console.log(`      LCP:           ${(medLcp/1000).toFixed(2)}s`);
  console.log(`      TBT:           ${Math.round(medTbt)}ms`);
  console.log(`      CLS:           ${medCls.toFixed(3)}`);
}

fs.writeFileSync(path.join(outDir, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(`\nAll audits complete! Summary written to ${outDir}/summary.json`);
