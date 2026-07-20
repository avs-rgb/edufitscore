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

testXssGuards();
testEncryptedBackupFlowIsStandard();
testCspHardening();
testPasswordResetOncePerDaySupport();
testSessionExpiryOverride();
console.log('security tests passed');
