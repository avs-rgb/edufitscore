const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

function read(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8');
}

function testXssGuards() {
  const app = read('public/app.js');
  assert(!app.includes('פרטים: ${error.message}'), 'raw error.message must not be inserted into HTML');
  assert(!/insertAdjacentHTML\s*\(/.test(app), 'insertAdjacentHTML requires explicit security review');
  assert(!/eval\s*\(/.test(app), 'eval must not be used');
  assert(!/new Function\s*\(/.test(app), 'new Function must not be used');
  assert(!/document\.write\s*\(/.test(app), 'document.write must not be used');
  assert(/escapeHtml\(error\.message\)/.test(app), 'backup error details should be escaped');
}

function testEncryptedBackupFlowIsStandard() {
  const app = read('public/app.js');
  const html = read('public/index.html');
  assert(app.includes('edufitscore-encrypted-backup'), 'encrypted backup format marker missing');
  assert(app.includes('encryptBackupPayload'), 'backup export must encrypt payload before download');
  assert(app.includes('decryptBackupPayload'), 'backup restore must support encrypted backup decryption');
  assert(html.includes('name="backupPassword"'), 'backup password field missing');
}

function testCspHardening() {
  const server = read('server.js');
  assert(server.includes("script-src 'self'"), 'CSP should restrict scripts to self');
  assert(server.includes("object-src 'none'"), 'CSP should block plugins/objects');
  assert(server.includes('upgrade-insecure-requests'), 'CSP should upgrade insecure requests in production/HTTPS');
  assert(!server.includes("require-trusted-types-for 'script'"), 'Trusted Types enforcement must stay disabled until the frontend supports it');
}

function testTrustedCountryHeader() {
  const server = read('server.js');
  const runbook = read('SECURITY_RUNBOOK.md');
  assert(server.includes('ADMIN_COUNTRY_HEADER'), 'country header should be configurable');
  assert(server.includes("'cf-ipcountry'"), 'country filtering should default to Cloudflare country header');
  assert(!server.includes("request.get('x-country-code')"), 'generic spoofable country header must not be trusted by default');
  assert(runbook.includes('ADMIN_ALLOWED_IPS'), 'runbook should document admin IP allowlist');
  assert(runbook.includes('cf-ipcountry'), 'runbook should document Cloudflare country header setup');
  assert(runbook.includes('dynamic IP allowlist can lock the admin out'), 'runbook should warn against dynamic IP allowlists');
}

function testOperationalMonitoring() {
  const server = read('server.js');
  const app = read('public/app.js');
  const html = read('public/index.html');
  const runbook = read('SECURITY_RUNBOOK.md');
  assert(server.includes("'/api/admin/security-monitoring'"), 'security monitoring endpoint missing');
  assert(server.includes('securityMonitoringSummary'), 'security monitoring summary helper missing');
  assert(server.includes('admin_access_blocked'), 'monitoring should include admin access blocks');
  assert(app.includes('loadAdminSecurityMonitoring'), 'frontend should load security monitoring');
  assert(app.includes('/api/admin/security-monitoring'), 'frontend should call security monitoring endpoint');
  assert(html.includes('admin-security-monitoring'), 'monitoring container missing');
  assert(runbook.includes('Operational Monitoring'), 'runbook should document operational monitoring');
}

function testSeasonControls() {
  const server = read('server.js');
  const sqlite = read('lib/auth-db-sqlite.js');
  const postgres = read('lib/auth-db-postgres.js');
  const app = read('public/app.js');
  const html = read('public/index.html');
  assert(sqlite.includes('seasonForDate'), 'sqlite season helper missing');
  assert(postgres.includes('seasonForDate'), 'postgres season helper missing');
  assert(sqlite.includes("'2025-2026'"), 'existing data should default to 2025-2026');
  assert(server.includes('SEASON_LOCKED'), 'server should expose locked season errors');
  assert(app.includes('teacherSeasonLocked'), 'frontend should track locked seasons');
  assert(app.includes('data-class-name-edit'), 'class-name editing should be on class list cards');
  assert(html.includes('teacher-season-select'), 'teacher season selector missing');
  assert(html.includes('2025-2026'), 'teacher season selector should default to 2025-2026 before loading');
  assert(app.includes('const seasonOptions = Array.from(new Set'), 'teacher season selector should have JS fallback options');
  assert(app.includes('teacherClass.season === teacherSeason'), 'class list should filter by selected season');
  assert(app.includes("cache: 'no-store'"), 'teacher class API fetch should bypass stale cache');
  assert(server.includes("Cache-Control', 'no-store'"), 'teacher class API should disable caching');
  assert(app.includes('mergedYearlyMetrics'), 'yearly history should merge saved history subjects');
  assert(app.includes('renderTeacherResultsTableMarkup(yearlyResults, yearlyMetrics)'), 'yearly history should render using saved history metrics');
  assert(app.includes("setTeacherSubview(teacherSeasonLocked ? 'history' : 'detail')"), 'locked season classes should open history automatically');
  assert(app.includes("teacherBackToClassDetailButton.textContent = teacherSeasonLocked ? 'חזרה לניהול כיתות' : 'חזרה לכיתה'"), 'locked season history back button should return to classes');
}

function testSensitiveRateLimitCoverage() {
  const server = read('server.js');
  [
    'authDbRateLimit',
    'passwordResetDbRateLimit',
    'twoFactorVerifyDbRateLimit',
    'adminBackupExportDbRateLimit',
    'adminRestoreDbRateLimit',
    'adminSecurityExportDbRateLimit',
    'adminPasswordResetDbRateLimit',
  ].forEach((name) => assert(server.includes(name), `${name} should be wired`));
}

function freshSqliteDb() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edufitscore-security-test-'));
  process.env.DATABASE_PATH = path.join(tempDir, 'auth.db');
  delete require.cache[require.resolve('../lib/auth-db-sqlite')];
  return require('../lib/auth-db-sqlite');
}

function testPasswordResetOncePerDaySupport() {
  const authDb = freshSqliteDb();
  authDb.createUser({
    firstName: 'Reset',
    lastName: 'User',
    email: 'reset@test.local',
    phone: '0501234567',
    city: 'City',
    schoolName: 'School',
    accountType: 'teacher',
    password: 'Aa123456!',
  });
  assert.strictEqual(authDb.hasRecentPasswordResetToken('reset@test.local', new Date(Date.now() - 86400000).toISOString()), false);
  const token = authDb.createPasswordResetToken('reset@test.local');
  assert(token?.token, 'reset token should be created');
  assert.strictEqual(authDb.hasRecentPasswordResetToken('reset@test.local', new Date(Date.now() - 86400000).toISOString()), true);
}

function testSessionExpiryOverride() {
  const authDb = freshSqliteDb();
  const user = authDb.createUser({
    firstName: 'Session',
    lastName: 'User',
    email: 'session@test.local',
    phone: '0501234567',
    city: 'City',
    schoolName: 'School',
    accountType: 'teacher',
    password: 'Aa123456!',
  });
  const session = authDb.createSession(user.id, { expiresInDays: 1 });
  const diffHours = (Date.parse(session.expiresAt) - Date.now()) / 3600000;
  assert(diffHours > 23 && diffHours <= 25, 'session expiry override should be close to one day');
}

function testDbRateLimitHelper() {
  const authDb = freshSqliteDb();
  const first = authDb.incrementRateLimit('security-test', 60000);
  const second = authDb.incrementRateLimit('security-test', 60000);
  assert.strictEqual(first.count, 1);
  assert.strictEqual(second.count, 2);
}

testXssGuards();
testEncryptedBackupFlowIsStandard();
testCspHardening();
testTrustedCountryHeader();
testOperationalMonitoring();
testSeasonControls();
testSensitiveRateLimitCoverage();
testPasswordResetOncePerDaySupport();
testSessionExpiryOverride();
testDbRateLimitHelper();
console.log('security tests passed');
