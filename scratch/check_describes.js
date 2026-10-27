const fs = require('fs');
const data = require('./all_tests.json');

for (const file of Object.keys(data)) {
  const content = fs.readFileSync(file, 'utf8');
  const dMatches = [...content.matchAll(/test\.describe\s*\(\s*(['"`])(.*?)\1/g)].map(m => m[2]);
  if (dMatches.length > 1) {
    console.log(file, dMatches);
  }
}
console.log('Check finished.');
