const fs = require('fs');
const path = require('path');

// Target directories
const publicScreenshotsDir = path.resolve(__dirname, '../qa-dashboard/public/attachments/screenshots');
const distScreenshotsDir = path.resolve(__dirname, '../qa-dashboard/dist/attachments/screenshots');

fs.mkdirSync(publicScreenshotsDir, { recursive: true });
fs.mkdirSync(distScreenshotsDir, { recursive: true });

// Read kasflo-results.json
const resultsPath = path.resolve(__dirname, '../qa-dashboard/public/data/kasflo-results.json');
const resultsData = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

// Read allure-results
const allureDir = path.resolve(__dirname, '../allure-results');
const allureFiles = fs.readdirSync(allureDir).filter(f => f.endsWith('-result.json'));

function extractAttachments(steps, list) {
  for (const st of steps || []) {
    if (st.attachments) list.push(...st.attachments);
    if (st.steps) extractAttachments(st.steps, list);
  }
}

// Map test titles to their allure screenshots
const testScreenshots = new Map();

for (const af of allureFiles) {
  try {
    const raw = fs.readFileSync(path.join(allureDir, af), 'utf-8');
    const data = JSON.parse(raw);
    const title = data.name || data.fullName;
    if (title) {
      const allAtts = [...(data.attachments || [])];
      extractAttachments(data.steps, allAtts);
      const scr = allAtts.find(a => a.type === 'image/png' || a.name?.includes('screenshot'));
      if (scr && scr.source) {
        const fullSrc = path.join(allureDir, scr.source);
        if (fs.existsSync(fullSrc)) {
          testScreenshots.set(title, fullSrc);
        }
      }
    }
  } catch (e) {}
}

console.log(`📸 Found ${testScreenshots.size} unique test screenshots in allure-results.`);

// Sanitize filename helper
function sanitizeFileName(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);
}

let copiedCount = 0;

function processSuite(suite) {
  if (suite.specs) {
    for (const sp of suite.specs) {
      const testTitle = sp.title;
      let screenshotSrc = testScreenshots.get(testTitle);

      // Check if current test has results and attachments
      for (const t of sp.tests || []) {
        for (const r of t.results || []) {
          // If already has an attachment with existing file
          const existingAtt = (r.attachments || []).find(a => a.name === 'screenshot' || a.contentType?.includes('image'));
          
          if (existingAtt && existingAtt.path && fs.existsSync(existingAtt.path)) {
            screenshotSrc = existingAtt.path;
          }

          if (screenshotSrc && fs.existsSync(screenshotSrc)) {
            const destFileName = `${sanitizeFileName(testTitle)}_${path.basename(screenshotSrc)}`;
            const publicDest = path.join(publicScreenshotsDir, destFileName);
            const distDest = path.join(distScreenshotsDir, destFileName);

            fs.copyFileSync(screenshotSrc, publicDest);
            fs.copyFileSync(screenshotSrc, distDest);
            copiedCount++;

            const webPath = `/attachments/screenshots/${destFileName}`;

            if (existingAtt) {
              existingAtt.path = webPath;
              existingAtt.name = 'screenshot';
              existingAtt.contentType = 'image/png';
            } else {
              if (!r.attachments) r.attachments = [];
              r.attachments.push({
                name: 'screenshot',
                contentType: 'image/png',
                path: webPath,
              });
            }
          }
        }
      }
    }
  }

  if (suite.suites) {
    for (const sub of suite.suites) {
      processSuite(sub);
    }
  }
}

for (const appKey of Object.keys(resultsData.apps)) {
  processSuite(resultsData.apps[appKey]);
}

// Write back updated kasflo-results.json
fs.writeFileSync(resultsPath, JSON.stringify(resultsData, null, 2), 'utf-8');

const distResultsPath = path.resolve(__dirname, '../qa-dashboard/dist/data/kasflo-results.json');
if (fs.existsSync(path.dirname(distResultsPath))) {
  fs.writeFileSync(distResultsPath, JSON.stringify(resultsData, null, 2), 'utf-8');
}

console.log(`✅ Successfully preserved and synchronized ${copiedCount} screenshots to:`);
console.log(`   - ${publicScreenshotsDir}`);
console.log(`   - ${distScreenshotsDir}`);
