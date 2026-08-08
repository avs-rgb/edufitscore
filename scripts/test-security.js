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

function testBillingSecurityWiring() {
  const server = read('server.js');
  const app = read('public/app.js');
  const html = read('public/index.html');
  assert(server.includes("request.path === '/api/billing/webhook'"), 'payment webhook must be parsed as raw body before JSON');
  assert(server.includes('BILLING_PROVIDER_NOT_CONFIGURED'), 'missing payment provider config should be handled cleanly');
  assert(server.includes('requireBillingAccess'), 'protected APIs should use billing access middleware');
  assert(server.includes("'/api/billing/checkout'"), 'checkout endpoint missing');
  assert(!server.includes("require('stripe')"), 'Stripe dependency should not be used for Israeli manual approval mode');
  assert(read('lib/auth-db-sqlite.js').includes('payment_customer_id'), 'sqlite should use neutral payment fields');
  assert(read('lib/auth-db-postgres.js').includes('payment_customer_id'), 'postgres should use neutral payment fields');
  assert(app.includes('profile-billing-panel'), 'profile billing UI missing');
  assert(app.includes('data-billing-action'), 'admin billing controls missing');
  assert(app.includes('billingStatusShortText'), 'admin billing column should use compact status text');
  assert(app.includes('renderAdminBillingCell'), 'admin billing cell should be rendered by a helper to avoid broken nested templates');
  assert(app.includes('הארכה עד סוף השנה'), 'admin billing year button should use quote-safe Hebrew text');
  assert(app.includes('ביטול הארכה'), 'active year-end access should be cancellable');
  assert(app.includes('hasAcademicYearAccess'), 'admin billing buttons should know if yearly access already exists');
  assert(app.includes('topBillingLabelText'), 'top account label should use dedicated billing text');
  assert(!app.includes('formatAdminDateTime(billing.accessEndsAt).split'), 'top billing label must not use date-time split fragments');
  assert(!app.includes('הארכה עד סוף שנה"ל'), 'admin billing year button must not contain raw double quotes in generated HTML');
  assert(!app.includes('פטור מתשלום'), 'permanent billing exemption button should not be shown');
  assert(!app.includes('ביטול פטור'), 'permanent billing exemption removal button should not be shown');
  assert(!app.includes('data-billing-action="exempt"'), 'permanent exemption billing action should not exist');
  assert(!app.includes('data-billing-action="unexempt"'), 'permanent exemption removal billing action should not exist');
  assert(server.includes('BILLING_EXEMPT_DISABLED'), 'permanent exemption endpoint should be disabled');
  assert(server.includes("'/api/admin/users/:userId/billing/cancel-access'"), 'cancel access endpoint missing');
  assert(html.includes('profile-billing-panel'), 'billing panel markup missing');
}

function testLocalAdminTwoFactorBypassIsNonProduction() {
  const server = read('server.js');
  assert(server.includes('isLocalAdminTwoFactorBypassed'), 'local admin 2FA bypass helper missing');
  assert(server.includes("process.env.NODE_ENV !== 'production'"), 'local admin 2FA bypass must not apply in production');
  assert(server.includes('admin@edufitscore.local'), 'local admin bypass should only target the local admin account');
}

function testRouteBackButtonGuards() {
  const app = read('public/app.js');
  const html = read('public/index.html');
  assert(app.includes('appRouteStack'), 'app should track internal route history for in-app back buttons');
  assert(app.includes('rememberCurrentRouteBeforeNavigation'), 'route stack should record previous app routes before navigation');
  assert(app.includes('function renderRouteFromHistory'), 'popstate should render without mutating browser history');
  assert(app.includes('renderRouteFromHistory(mode);'), 'popstate must not call applyRoute because it rewrites history');
  assert(!app.includes('applyRoute(mode, true);'), 'popstate should not replace history entries while going back');
  assert(app.includes('nextUrl === `${window.location.pathname}${window.location.search}${window.location.hash}`'), 'routing should not push duplicate current URLs');
  assert(app.includes('function closeProfileView(event)'), 'profile close should have a dedicated deterministic handler');
  assert(html.includes('id="profile-close-button"') && html.includes('data-profile-close'), 'profile close should have a dedicated data hook');
  assert(html.includes('/app.js?v=20260808-billing-countdown-top'), 'app.js version should be bumped after billing control fixes to avoid stale cached code');
  assert(app.includes("profileCloseButton.addEventListener('click', closeProfileView)"), 'profile back button should be wired immediately for clicks');
  assert(app.includes("profileCloseButton.addEventListener('touchend', closeProfileView"), 'profile back button should be wired immediately for touch');
  assert(app.includes("document.addEventListener('click', (event) =>") && app.includes("event.target.closest('[data-profile-close]')") && app.includes('}, true);'), 'profile close should also be handled in capture phase');
  assert(app.includes("const targetMode = authUser?.role === 'admin' ? 'admin' : 'member-classes'"), 'profile back button should deterministically return to the correct app area');
  assert(app.includes('renderRouteFromHistory(targetMode);'), 'profile close should render target route directly');
  assert(app.includes('updateRoute(targetMode, true);'), 'profile close should replace URL with target route');
  assert(app.includes("memberProfileView?.classList.add('is-hidden')"), 'profile close should directly hide the profile as a failsafe');
  assert(app.includes("window.addEventListener('hashchange'"), 'hash navigation should render routes without relying on click handlers');
  assert(app.includes('Object.entries(staticViews).forEach'), 'route rendering should use one static-view visibility loop');
  assert(app.includes("key === 'profile' && showProfile"), 'profile visibility should be included in the unified static-view loop');
  assert(!app.includes("memberProfileView?.classList.toggle('is-hidden', !showProfile)"), 'profile should not be toggled separately from the unified static-view loop');
  assert(app.includes('lastTouchFallbackAt'), 'tap fallback should suppress duplicate touch/click navigation');
}

function testAdminAccountsCannotBeDisabled() {
  const server = read('server.js');
  const app = read('public/app.js');
  assert(server.includes('ADMIN_STATUS_LOCKED'), 'server should block disabling admin accounts');
  assert(server.includes("targetUser?.role === 'admin' && !isActive"), 'admin status guard should only block disabling admins');
  assert(app.includes('מנהל קבוע'), 'admin rows should show locked status instead of disable button');
  assert(app.includes("user.role === 'admin' ? '<span class=\"admin-status-locked\">"), 'admin status toggle should be hidden in users table');
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
testBillingSecurityWiring();
testLocalAdminTwoFactorBypassIsNonProduction();
testRouteBackButtonGuards();
testAdminAccountsCannotBeDisabled();
testPasswordResetOncePerDaySupport();
testSessionExpiryOverride();
testDbRateLimitHelper();
console.log('security tests passed');
