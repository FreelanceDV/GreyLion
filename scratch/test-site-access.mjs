// Test script to verify serverless authentication logic
function formatDDMMYYYY(date, timeZone) {
  try {
    const parts = new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: timeZone || 'UTC',
    }).formatToParts(date);

    const day = parts.find((p) => p.type === 'day')?.value || '';
    const month = parts.find((p) => p.type === 'month')?.value || '';
    const year = parts.find((p) => p.type === 'year')?.value || '';

    return `${day}${month}${year}`;
  } catch {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = String(date.getFullYear());
    return `${d}${m}${y}`;
  }
}

function getValidAccessKeys(clientTimezone) {
  const keys = new Set();
  const now = new Date();

  keys.add(formatDDMMYYYY(now, 'UTC'));
  keys.add(formatDDMMYYYY(now, 'America/Bogota'));
  const localDay = String(now.getDate()).padStart(2, '0');
  const localMonth = String(now.getMonth() + 1).padStart(2, '0');
  const localYear = String(now.getFullYear());
  keys.add(`${localDay}${localMonth}${localYear}`);

  if (clientTimezone && typeof clientTimezone === 'string') {
    try {
      keys.add(formatDDMMYYYY(now, clientTimezone.trim()));
    } catch {}
  }

  return Array.from(keys);
}

function testValidation(inputPassword, clientTz) {
  if (!inputPassword || typeof inputPassword !== 'string') {
    return { valid: false, reason: 'Password empty or not a string' };
  }
  const cleaned = inputPassword.trim().replace(/[\s\/-]/g, '');
  const validKeys = getValidAccessKeys(clientTz);
  return {
    valid: validKeys.includes(cleaned),
    cleaned,
    validKeys,
  };
}

console.log('--- Running Access Key Unit Tests ---');
const todayKeys = getValidAccessKeys('America/Bogota');
console.log('Generated Valid Keys for today:', todayKeys);

const testCases = [
  { input: todayKeys[0], expected: true, desc: 'Exact DDMMYYYY key' },
  { input: ` ${todayKeys[0]} `, expected: true, desc: 'Key with surrounding whitespace' },
  { input: `${todayKeys[0].slice(0, 2)}/${todayKeys[0].slice(2, 4)}/${todayKeys[0].slice(4)}`, expected: true, desc: 'Key with slashes (DD/MM/YYYY)' },
  { input: `${todayKeys[0].slice(0, 2)}-${todayKeys[0].slice(2, 4)}-${todayKeys[0].slice(4)}`, expected: true, desc: 'Key with hyphens (DD-MM-YYYY)' },
  { input: '00000000', expected: false, desc: 'Invalid key 00000000' },
  { input: 'wrongpassword', expected: false, desc: 'Invalid key text' },
  { input: '', expected: false, desc: 'Empty input' },
];

let allPassed = true;
testCases.forEach((tc, idx) => {
  const result = testValidation(tc.input, 'America/Bogota');
  const passed = result.valid === tc.expected;
  console.log(`Test ${idx + 1} [${tc.desc}]: Input "${tc.input}" -> Valid: ${result.valid} (Expected: ${tc.expected}) - ${passed ? 'PASS ✓' : 'FAIL ✗'}`);
  if (!passed) allPassed = false;
});

if (allPassed) {
  console.log('\nAll test cases passed successfully!');
} else {
  console.error('\nSome test cases failed!');
  process.exit(1);
}
