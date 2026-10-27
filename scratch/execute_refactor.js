const fs = require('fs');
const { execSync } = require('child_process');
const preview = require('./preview_refactor.json');

console.log('Starting refactoring of all test.describe and test titles...\n');

let totalFiles = 0;
let totalTestsUpdated = 0;
let errors = [];

for (const [file, info] of Object.entries(preview)) {
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    errors.push(`File not found: ${file}`);
    continue;
  }

  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  // 1. Replace test.describe
  const describeRegex = /test\.describe\s*\(\s*(['"`])(.*?)(\1)/;
  if (describeRegex.test(content)) {
    content = content.replace(describeRegex, (match, q) => {
      return `test.describe(${q}${info.newDescribe}${q}`;
    });
  }

  // 2. Replace each test title
  let fileTestsUpdated = 0;
  for (const t of info.tests) {
    const escapedOld = t.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const testRegex = new RegExp(`(\\btest\\s*\\(\\s*['"\`])${escapedOld}(['"\`])`);
    if (testRegex.test(content)) {
      content = content.replace(testRegex, `$1${t.new}$2`);
      fileTestsUpdated++;
    } else {
      console.warn(`  [WARN] In ${file}: could not find test title "${t.old}"`);
      errors.push(`In ${file}: not found "${t.old}"`);
    }
  }

  // 3. Save file
  fs.writeFileSync(file, content, 'utf8');

  // 4. Validate syntax with node -c
  try {
    execSync(`node -c "${file}"`, { stdio: 'pipe' });
  } catch (err) {
    console.error(`  [SYNTAX ERROR] ${file} failed node -c! Reverting...`);
    fs.writeFileSync(file, originalContent, 'utf8');
    errors.push(`Syntax error in ${file}`);
    continue;
  }

  totalFiles++;
  totalTestsUpdated += fileTestsUpdated;
  console.log(`✅ [${totalFiles}/34] ${file}`);
  console.log(`   Describe: "${info.newDescribe}" | ${fileTestsUpdated}/${info.tests.length} tests updated`);
}

console.log(`\n========================================`);
console.log(`Summary:`);
console.log(`Total files updated : ${totalFiles}`);
console.log(`Total tests updated : ${totalTestsUpdated}`);
console.log(`Errors encountered  : ${errors.length}`);
console.log(`========================================\n`);

if (errors.length > 0) {
  console.log('Errors details:', errors);
}
