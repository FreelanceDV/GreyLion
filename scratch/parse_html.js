const fs = require('fs');
const filePath = 'C:\\Users\\Duvan Villadiego\\.gemini\\antigravity\\brain\\b5426aee-e611-436d-aef2-ad928d0d78b7\\.system_generated\\steps\\128\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Find all matches of headings or titles in the JSON-like data or HTML
const matches = content.match(/"text"\s*:\s*"[^"]+"/g) || [];
const uniqueTexts = [...new Set(matches.map(m => m.replace(/"text"\s*:\s*"/, '').replace(/"$/, '')))];

console.log('EXTRACTED TEXT STRINGS (COUNT:', uniqueTexts.length, '):');
uniqueTexts.forEach(t => {
  if (t.length > 5 && !t.includes('\\u003c') && !t.includes('class=') && !t.includes('var(')) {
    console.log('-', t);
  }
});
