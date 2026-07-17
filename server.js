const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const ExcelJS = require('exceljs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const { loadSheetsByGender, scoreMetric } = require('./lib/workbook');
const { sendMail } = require('./lib/mailer');
const { matchSchoolScoreTableResult } = require('./public/school-score');
const {
  verifyUser,
  findUserForSecurityAudit,
  createUser,
  verifyUserPassword,
  updateUserProfile,
  changeUserPassword,
  deactivateUser,
  listUsers,
  listSchools,
  listSchoolAdminOverview,
  listSchoolScoreTables,
  listPublicSchoolScoreTables,
  updateSchoolScoreTableSettings,
  createSchoolScoreTable,
  updateSchoolScoreTable,
  deleteSchoolScoreTable,
  setSchoolTeacherStatus,
  createSchoolInvite,
  removeSchoolTeacher,
  requestTeacherSchool,
  permanentlyDeleteUser,
  updateTeacherClassHistorySemester,
  listInactiveUsers,
  restoreUserByEmail,
  setUserActive,
  adminResetUserPassword,
  createEmailVerificationToken,
  verifyEmailWithToken,
  deleteUnverifiedUser,
  createPasswordResetToken,
  resetPasswordWithToken,
  getAdminTwoFactorState,
  saveAdminTwoFactorSecret,
  enableAdminTwoFactor,
  replaceAdminTwoFactorRecoveryCodes,
  disableAdminTwoFactor,
  createTwoFactorChallenge,
  getTwoFactorChallenge,
  incrementTwoFactorChallengeAttempts,
  consumeTwoFactorChallenge,
  consumeAdminTwoFactorRecoveryCode,
  createTwoFactorRecoveryRegenerationToken,
  getTwoFactorRecoveryRegenerationToken,
  consumeTwoFactorRecoveryRegenerationToken,
  saveGraphSnapshot,
  getGraphSnapshot,
  logAdminAction,
  listAdminAuditLog,
  listAdminAuditLogFiltered,
  countRecentAdminAuditActions,
  exportBackupData,
  summarizeBackupData,
  restoreBackupData,
  getAdminDiagnostics,
  createSession,
  getSessionCsrfTokenHash,
  findUserBySessionToken,
  listUserSessions,
  deleteOtherUserSessions,
  deleteUserSessionByPublicId,
  touchSession,
  deleteSession,
  listTeacherClasses,
  getTeacherClass,
  getTeacherClassScoreTable,
  createTeacherClass,
  updateTeacherClass,
  deleteTeacherClass,
  reorderTeacherClasses,
  listTeacherClassHistory,
  deleteTeacherClassHistory,
  appendClassHistory,
} = require('./lib/auth-db');

const app = express();
const port = Number(process.env.PORT || 3000);
const publicBaseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${port}`;
const csrfUnsafeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const adminIdleTimeoutMs = Number(process.env.ADMIN_IDLE_TIMEOUT_MINUTES || 4320) * 60 * 1000;
const userIdleTimeoutMs = Number(process.env.USER_IDLE_TIMEOUT_MINUTES || 20160) * 60 * 1000;
const adminReauthWindowMs = Number(process.env.ADMIN_REAUTH_WINDOW_MINUTES || 5) * 60 * 1000;
app.set('trust proxy', 1);

function createJsonRateLimit(options) {
  return rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    handler: (request, response) => {
      response.status(429).json({ error: 'RATE_LIMITED' });
    },
    ...options,
  });
}

const authRateLimit = createJsonRateLimit({ windowMs: 15 * 60 * 1000, limit: 5 });
const signupRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 10 });
const passwordResetRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 3 });
const emailVerificationRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 5 });
const adminBackupExportRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 10 });
const adminSecurityExportRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 10 });
const importRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 20 });
const teacherClassImportRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 20 });
const graphSnapshotRateLimit = createJsonRateLimit({ windowMs: 15 * 60 * 1000, limit: 60 });
const adminRestoreRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 3 });
const adminPermanentDeleteRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 10 });
const adminPasswordResetRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 10 });
const twoFactorVerifyRateLimit = createJsonRateLimit({ windowMs: 15 * 60 * 1000, limit: 8 });
const twoFactorSetupRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 6 });
const twoFactorRecoveryRegenerationRequestRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 5 });
const twoFactorRecoveryRegenerationConfirmRateLimit = createJsonRateLimit({ windowMs: 60 * 60 * 1000, limit: 10 });
const securityEventActions = new Set([
  'admin_login_failed',
  'admin_login_alert_sent',
  'admin_login_alert_failed',
  'admin_reauth_success',
  'admin_2fa_login_failed',
  'admin_2fa_recovery_code_used',
  'admin_2fa_recovery_code_alert_sent',
  'admin_2fa_recovery_code_alert_failed',
  'admin_2fa_enabled',
  'admin_2fa_disabled',
  'admin_2fa_disable_failed',
  'admin_2fa_recovery_regenerate_requested',
  'admin_2fa_recovery_regenerate_confirmed',
  'admin_2fa_recovery_regenerate_failed',
  'admin_2fa_recovery_regenerate_confirm_failed',
  'password_change',
  'admin_password_change_alert_sent',
  'admin_password_change_alert_failed',
  'reset_password',
  'reset_password_failed',
  'export_backup',
  'export_backup_notification_failed',
  'export_security_log',
  'export_security_log_failed',
  'restore_backup',
  'restore_backup_failed',
  'restore_backup_alert_sent',
  'restore_backup_alert_failed',
  'permanent_delete_user',
  'permanent_delete_user_failed',
  'logout_other_sessions',
  'logout_session',
  'logout_other_sessions_after_password_change',
  'session_idle_timeout',
]);
const securityEventGroups = {
  login: ['admin_login_failed', 'admin_login_alert_sent', 'admin_login_alert_failed', 'admin_reauth_success', 'admin_2fa_login_failed', 'admin_2fa_recovery_code_used'],
  '2fa': ['admin_2fa_login_failed', 'admin_2fa_recovery_code_used', 'admin_2fa_recovery_code_alert_sent', 'admin_2fa_recovery_code_alert_failed', 'admin_2fa_enabled', 'admin_2fa_disabled', 'admin_2fa_disable_failed', 'admin_2fa_recovery_regenerate_requested', 'admin_2fa_recovery_regenerate_confirmed', 'admin_2fa_recovery_regenerate_failed', 'admin_2fa_recovery_regenerate_confirm_failed'],
  backup: ['export_backup', 'export_backup_notification_failed', 'export_security_log', 'export_security_log_failed', 'restore_backup', 'restore_backup_failed', 'restore_backup_alert_sent', 'restore_backup_alert_failed'],
  password: ['password_change', 'admin_password_change_alert_sent', 'admin_password_change_alert_failed', 'reset_password', 'reset_password_failed', 'logout_other_sessions', 'logout_session', 'logout_other_sessions_after_password_change', 'session_idle_timeout'],
  danger: ['restore_backup', 'restore_backup_failed', 'permanent_delete_user', 'permanent_delete_user_failed'],
};
const securityEventSeverities = {
  critical: ['restore_backup', 'permanent_delete_user', 'admin_2fa_recovery_code_used'],
  high: ['restore_backup_failed', 'export_backup', 'password_change', 'admin_login_alert_sent', 'permanent_delete_user_failed'],
  medium: ['admin_login_failed', 'admin_2fa_login_failed', 'admin_2fa_enabled', 'admin_2fa_disabled', 'admin_2fa_disable_failed', 'admin_2fa_recovery_regenerate_requested', 'admin_2fa_recovery_regenerate_confirmed', 'admin_2fa_recovery_regenerate_failed', 'admin_2fa_recovery_regenerate_confirm_failed', 'export_security_log', 'export_security_log_failed', 'reset_password', 'reset_password_failed'],
  low: ['admin_reauth_success', 'logout_other_sessions', 'logout_session', 'logout_other_sessions_after_password_change', 'session_idle_timeout', 'admin_login_alert_failed', 'export_backup_notification_failed', 'restore_backup_alert_sent', 'restore_backup_alert_failed', 'admin_password_change_alert_sent', 'admin_password_change_alert_failed', 'admin_2fa_recovery_code_alert_sent', 'admin_2fa_recovery_code_alert_failed'],
};
app.use((request, response, next) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()');
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  if (process.env.NODE_ENV === 'production' || publicBaseUrl.startsWith('https://')) {
    response.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  }
  next();
});
app.use((request, response, next) => {
  if (request.path === '/api/school-admin/score-tables/import') {
    next();
    return;
  }
  express.json({ limit: '10mb' })(request, response, next);
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (response) => {
    response.setHeader('Cache-Control', 'no-store');
  },
}));

function resolveSheets(gender) {
  return loadSheetsByGender(gender === 'female' ? 'female' : 'male');
}

function normalizeImportedGender(value) {
  const text = String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (['male', 'boys', 'boy', 'בנים', 'בן'].includes(text)) return 'male';
  if (['female', 'girls', 'girl', 'בנות', 'בת'].includes(text)) return 'female';
  if (['other', 'mixed', 'mix', 'coed', 'מעורב', 'מעורבת', 'בנים ובנות'].includes(text)) return 'other';
  return '';
}

function normalizeImportedGrade(value) {
  const text = String(value || '').trim().replace(/"/g, '״').replace(/'/g, '׳');
  const numeric = Number(text);
  if (Number.isInteger(numeric)) return numeric;
  const gradeMap = {
    'א': 1,
    'א׳': 1,
    'ב': 2,
    'ב׳': 2,
    'ג': 3,
    'ג׳': 3,
    'ד': 4,
    'ד׳': 4,
    'ה': 5,
    'ה׳': 5,
    'ו': 6,
    'ו׳': 6,
    'ז': 7,
    'ז׳': 7,
    'ח': 8,
    'ח׳': 8,
    'ט': 9,
    'ט׳': 9,
    'י': 10,
    'י׳': 10,
    'יא': 11,
    'י״א': 11,
    'יב': 12,
    'י״ב': 12,
  };
  return gradeMap[text] || '';
}

function importedCellValue(cell) {
  const value = cell?.value;
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') {
    if (value.text !== undefined) return String(value.text);
    if (value.result !== undefined) return String(value.result);
    if (Array.isArray(value.richText)) return value.richText.map((part) => part.text || '').join('');
    if (value.hyperlink && value.text) return String(value.text);
  }
  return String(value);
}

async function parseImportedScoreTables(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  return workbook.worksheets.map((worksheet) => {
    const values = [];
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      values[rowNumber - 1] = [];
      row.eachCell({ includeEmpty: true }, (cell, columnNumber) => {
        values[rowNumber - 1][columnNumber - 1] = importedCellValue(cell);
      });
    });
    const grade = normalizeImportedGrade(values[0]?.[1]);
    const genderGroup = normalizeImportedGender(values[1]?.[1]);
    const startingScore = Number(values[2]?.[1] || 0);
    const subjectNames = (values[4] || []).slice(1).map((value) => String(value || '').trim()).filter(Boolean);
    const subjects = subjectNames.map((name, index) => ({ id: `subject-${index + 1}`, name }));
    const rows = values.slice(5).map((row) => {
      const score = Number(row[0]);
      if (!Number.isInteger(score)) return null;
      const rowValues = {};
      subjects.forEach((subject, index) => {
        rowValues[subject.id] = score === 0 ? '0' : String(row[index + 1] || '').trim();
      });
      return { score, values: rowValues };
    }).filter(Boolean);

    return { sheetName: worksheet.name, grade, genderGroup, startingScore, subjects, rows };
  }).filter((table) => table.grade || table.genderGroup || table.subjects.length || table.rows.length);
}

async function parseImportedTeacherClasses(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  return workbook.worksheets.map((worksheet) => {
    const roster = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return;
      const firstName = importedCellValue(row.getCell(1)).trim();
      const lastName = importedCellValue(row.getCell(2)).trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      if (fullName) {
        roster.push({ id: `student-${roster.length + 1}`, name: fullName });
      }
    });

    return {
      sheetName: worksheet.name,
      name: String(worksheet.name || '').trim(),
      studentCount: roster.length,
      roster,
    };
  }).filter((teacherClass) => teacherClass.name || teacherClass.roster.length);
}

function sessionCookieOptions(expiresAt) {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' || publicBaseUrl.startsWith('https://'),
    expires: new Date(expiresAt),
    path: '/',
  };
}

function csrfCookieOptions(expiresAt) {
  return {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' || publicBaseUrl.startsWith('https://'),
    expires: new Date(expiresAt),
    path: '/',
  };
}

function adminReauthCookieOptions(expiresAt) {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' || publicBaseUrl.startsWith('https://'),
    expires: new Date(expiresAt),
    path: '/',
  };
}

function signAdminReauthPayload(payload) {
  return crypto.createHmac('sha256', process.env.SESSION_SECRET || 'edufitscore-local-secret').update(payload).digest('hex');
}

function createAdminReauthToken(userId) {
  const expiresAt = new Date(Date.now() + adminReauthWindowMs).toISOString();
  const payload = Buffer.from(JSON.stringify({ userId, expiresAt, nonce: crypto.randomBytes(12).toString('hex') }), 'utf8').toString('base64url');
  return { token: `${payload}.${signAdminReauthPayload(payload)}`, expiresAt };
}

function validAdminReauthToken(token, userId) {
  const [payload, signature] = String(token || '').split('.');
  if (!payload || !signature || signAdminReauthPayload(payload) !== signature) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Number(data.userId) === Number(userId) && Date.parse(data.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

function setAdminReauthCookie(response, userId) {
  const reauth = createAdminReauthToken(userId);
  response.cookie('edufitscore_admin_reauth', reauth.token, adminReauthCookieOptions(reauth.expiresAt));
}

function setAuthCookies(response, session) {
  response.cookie('edufitscore_session', session.token, sessionCookieOptions(session.expiresAt));
  response.cookie('edufitscore_csrf', session.csrfToken, csrfCookieOptions(session.expiresAt));
}

function clearAuthCookies(response) {
  response.clearCookie('edufitscore_session', { path: '/' });
  response.clearCookie('edufitscore_csrf', { path: '/' });
  response.clearCookie('edufitscore_admin_reauth', { path: '/' });
}

async function attachUser(request, response, next) {
  try {
    const token = request.cookies?.edufitscore_session;
    const user = await findUserBySessionToken(token);
    if (!user) {
      request.authUser = null;
      next();
      return;
    }

    const timeoutMs = user.role === 'admin' ? adminIdleTimeoutMs : userIdleTimeoutMs;
    const lastSeenAt = Date.parse(user.session?.lastSeenAt || user.session?.createdAt || '');
    if (Number.isFinite(lastSeenAt) && timeoutMs > 0 && Date.now() - lastSeenAt > timeoutMs) {
      await deleteSession(token);
      clearAuthCookies(response);
      if (user.role === 'admin') {
        await logAdminAction(user.id, user.id, 'session_idle_timeout', auditRequestDetails(request));
      }
      request.authUser = null;
      next();
      return;
    }

    await touchSession(token);
    delete user.session;
    request.authUser = user;
    next();
  } catch (error) {
    next(error);
  }
}

function requireAuth(request, response, next) {
  if (!request.authUser) {
    response.status(401).json({ error: 'Authentication required' });
    return;
  }

  next();
}

function requireTeacherOrAdmin(request, response, next) {
  if (!request.authUser) {
    response.status(401).json({ error: 'Authentication required' });
    return;
  }

  if (!['teacher', 'admin'].includes(request.authUser.role)) {
    response.status(403).json({ error: 'Teacher access required' });
    return;
  }

  next();
}

function requireSchoolAdmin(request, response, next) {
  if (!request.authUser) {
    response.status(401).json({ error: 'Authentication required' });
    return;
  }

  if (!request.authUser.isSchoolAdmin) {
    response.status(403).json({ error: 'School admin access required' });
    return;
  }

  next();
}

function sameOrigin(request) {
  const origin = request.get('origin');
  if (!origin) {
    return true;
  }

  return origin === `${request.protocol}://${request.get('host')}`;
}

async function requireCsrf(request, response, next) {
  if (!csrfUnsafeMethods.has(request.method) || !request.authUser) {
    next();
    return;
  }

  if (!sameOrigin(request)) {
    response.status(403).json({ error: 'CSRF_INVALID' });
    return;
  }

  const submittedToken = String(request.get('x-csrf-token') || '');
  const expectedHash = await getSessionCsrfTokenHash(request.cookies?.edufitscore_session);
  const submittedHash = submittedToken
    ? crypto.createHash('sha256').update(submittedToken).digest('hex')
    : '';

  const valid = Boolean(expectedHash && submittedHash)
    && expectedHash.length === submittedHash.length
    && crypto.timingSafeEqual(Buffer.from(expectedHash, 'hex'), Buffer.from(submittedHash, 'hex'));

  if (!valid) {
    response.status(403).json({ error: 'CSRF_INVALID' });
    return;
  }

  next();
}

function auditRequestDetails(request, extra = {}) {
  return {
    ip: request.ip || '',
    userAgent: request.get('user-agent') || '',
    method: request.method,
    path: request.originalUrl || request.path,
    ...extra,
  };
}

function csvCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function securityEventsCsv(entries) {
  const headers = ['createdAt', 'action', 'adminUserId', 'targetUserId', 'ip', 'userAgent', 'method', 'path', 'reason', 'detailsJson'];
  const rows = entries.map((entry) => {
    const details = entry.details || {};
    return [
      entry.createdAt,
      entry.action,
      entry.adminUserId || '',
      entry.targetUserId || '',
      details.ip || '',
      details.userAgent || '',
      details.method || '',
      details.path || '',
      details.reason || '',
      JSON.stringify(details),
    ].map(csvCell).join(',');
  });
  return `${headers.map(csvCell).join(',')}\n${rows.join('\n')}\n`;
}

function sessionRequestDetails(request) {
  return {
    ip: request.ip || '',
    userAgent: request.get('user-agent') || '',
  };
}

const passwordSpecialPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

function validatePasswordPolicy(password) {
  const value = String(password || '');
  return value.length >= 8
    && /[a-z]/.test(value)
    && /[A-Z]/.test(value)
    && /\d/.test(value)
    && passwordSpecialPattern.test(value);
}

function rejectWeakPassword(response, password) {
  if (validatePasswordPolicy(password)) {
    return false;
  }
  response.status(400).json({ error: 'WEAK_PASSWORD' });
  return true;
}

function requireGlobalAdmin(request, response) {
  if (request.authUser?.role !== 'admin') {
    response.status(403).json({ error: 'ADMIN_REQUIRED' });
    return false;
  }
  return true;
}

async function requireGlobalAdminReady(request, response) {
  if (!requireGlobalAdmin(request, response)) return false;
  if (isAdminTwoFactorBypassed()) return true;

  const state = await getAdminTwoFactorState(request.authUser.id);
  if (!state?.enabled) {
    response.status(403).json({ error: 'ADMIN_2FA_REQUIRED' });
    return false;
  }
  return true;
}

function isAdminTwoFactorBypassed() {
  return String(process.env.DISABLE_ADMIN_2FA || '').toLowerCase() === 'true';
}

function securitySeverityForAction(action) {
  return Object.entries(securityEventSeverities).find(([, actions]) => actions.includes(action))?.[0] || 'low';
}

function securityActionsForQuery(query = {}) {
  let actions = [...securityEventActions];
  const group = String(query.group || 'all');
  const severity = String(query.severity || 'all');
  if (group !== 'all' && securityEventGroups[group]) {
    actions = actions.filter((action) => securityEventGroups[group].includes(action));
  }
  if (severity !== 'all' && securityEventSeverities[severity]) {
    actions = actions.filter((action) => securityEventSeverities[severity].includes(action));
  }
  return actions;
}

function addSecuritySeverity(entries) {
  return entries.map((entry) => ({ ...entry, severity: securitySeverityForAction(entry.action) }));
}

function normalizeTwoFactorCode(value) {
  return String(value || '').trim().replace(/\s+/g, '').toUpperCase();
}

function verifyTotpCode(secret, code) {
  const normalized = normalizeTwoFactorCode(code);
  return /^\d{6}$/.test(normalized) && speakeasy.totp.verify({ secret, encoding: 'base32', token: normalized, window: 1 });
}

function generateRecoveryCodes(count = 10) {
  return Array.from({ length: count }, () => {
    const raw = crypto.randomBytes(5).toString('hex').toUpperCase();
    return `${raw.slice(0, 5)}-${raw.slice(5)}`;
  });
}

function maskEmail(email) {
  const [name, domain] = String(email || '').split('@');
  if (!name || !domain) return '';
  return `${name.slice(0, 2)}***@${domain}`;
}

async function sendEmailVerificationMessage(verification) {
  if (!verification) {
    return false;
  }

  const verifyUrl = `${publicBaseUrl}/?verifyToken=${encodeURIComponent(verification.token)}#verify-email`;
  return sendMail({
    to: verification.user.email,
    subject: 'אימות כתובת דוא"ל ל-EduFitScore',
    text: [
      'שלום,',
      '',
      'נוצר חשבון EduFitScore עם כתובת הדוא"ל הזו.',
      'כדי להשלים את ההרשמה ולאפשר התחברות, יש לפתוח את הקישור הבא:',
      verifyUrl,
      '',
      'הקישור תקף למשך 24 שעות וניתן להשתמש בו פעם אחת בלבד.',
      'אם לא נרשמת לאתר, אפשר להתעלם מהודעה זו.',
      '',
      'EduFitScore',
    ].join('\n'),
  });
}

async function sendTwoFactorRecoveryRegenerationMessage(regeneration) {
  if (!regeneration) {
    return false;
  }

  const confirmUrl = `${publicBaseUrl}/?twoFactorRecoveryToken=${encodeURIComponent(regeneration.token)}#profile`;
  return sendMail({
    to: regeneration.user.email,
    subject: 'אישור יצירת קודי שחזור חדשים ל-EduFitScore',
    text: [
      'שלום,',
      '',
      'התקבלה בקשה ליצור קודי שחזור חדשים לחשבון המנהל ב-EduFitScore.',
      'אם אתם ביקשתם זאת, פתחו את הקישור הבא ואשרו את יצירת הקודים החדשים:',
      confirmUrl,
      '',
      'הקישור תקף למשך 15 דקות וניתן להשתמש בו פעם אחת בלבד.',
      'קודי השחזור לא נשלחים בדוא"ל ויוצגו באתר רק לאחר האישור.',
      '',
      'אם לא ביקשתם פעולה זו, מומלץ להחליף סיסמה ולבדוק את פעילות ההתחברות.',
      '',
      'EduFitScore',
    ].join('\n'),
  });
}

async function sendBackupExportNotification(user, request) {
  if (!user?.email) {
    return false;
  }

  const details = auditRequestDetails(request);
  return sendMail({
    to: user.email,
    subject: 'בוצעה הורדת גיבוי נתונים ב-EduFitScore',
    text: [
      'שלום,',
      '',
      'בוצעה הורדת גיבוי נתונים מחשבון מנהל ב-EduFitScore.',
      '',
      `זמן: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}`,
      `כתובת IP: ${details.ip || '-'}`,
      `דפדפן/מכשיר: ${details.userAgent || '-'}`,
      '',
      'אם זו הייתה פעולה שלכם, אין צורך לעשות דבר.',
      'אם לא ביקשתם להוריד גיבוי, החליפו סיסמה מיד, בדקו פעילות התחברות ושקלו להשבית זמנית גישה מנהלית.',
      '',
      'EduFitScore',
    ].join('\n'),
  });
}

async function sendSuspiciousAdminLoginAlert(user, request, failedAttempts) {
  if (!user?.email) {
    return false;
  }

  const details = auditRequestDetails(request);
  return sendMail({
    to: user.email,
    subject: 'התראת ניסיונות כניסה למנהל ב-EduFitScore',
    text: [
      'שלום,',
      '',
      'זוהו מספר ניסיונות כניסה כושלים לחשבון מנהל ב-EduFitScore.',
      '',
      `מספר ניסיונות אחרונים: ${failedAttempts}`,
      `כתובת דוא"ל: ${user.email}`,
      `כתובת IP: ${details.ip || '-'}`,
      `דפדפן/מכשיר: ${details.userAgent || '-'}`,
      `זמן: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}`,
      '',
      'אם אלו לא היו ניסיונות שלכם, מומלץ לבדוק פעילות התחברות, להחליף סיסמה ולוודא שאימות דו-שלבי פעיל.',
      '',
      'EduFitScore',
    ].join('\n'),
  });
}

async function maybeAlertSuspiciousAdminLogin(user, request) {
  const details = auditRequestDetails(request, { email: user.email });
  const since = new Date(Date.now() - (15 * 60 * 1000)).toISOString();
  const cooldownSince = new Date(Date.now() - (30 * 60 * 1000)).toISOString();
  const failedAttempts = await countRecentAdminAuditActions('admin_login_failed', { email: user.email, ip: details.ip }, since);
  if (failedAttempts < 3) {
    return;
  }

  const recentAlerts = await countRecentAdminAuditActions('admin_login_alert_sent', { email: user.email, ip: details.ip }, cooldownSince);
  if (recentAlerts) {
    return;
  }

  try {
    const sent = await sendSuspiciousAdminLoginAlert(user, request, failedAttempts);
    await logAdminAction(user.id, user.id, sent ? 'admin_login_alert_sent' : 'admin_login_alert_failed', auditRequestDetails(request, sent
      ? { email: user.email, failedAttempts }
      : { email: user.email, failedAttempts, reason: 'EMAIL_NOT_SENT' }));
  } catch (error) {
    await logAdminAction(user.id, user.id, 'admin_login_alert_failed', auditRequestDetails(request, { email: user.email, failedAttempts, reason: error.message || 'EMAIL_FAILED' }));
  }
}

async function sendAdminRecoveryCodeUsedAlert(user, request) {
  if (!user?.email) return false;
  const details = auditRequestDetails(request);
  return sendMail({
    to: user.email,
    subject: 'נעשה שימוש בקוד שחזור ב-EduFitScore',
    text: [
      'שלום,',
      '',
      'בוצעה כניסה לחשבון המנהל באמצעות קוד שחזור של אימות דו-שלבי.',
      '',
      `זמן: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}`,
      `כתובת IP: ${details.ip || '-'}`,
      `דפדפן/מכשיר: ${details.userAgent || '-'}`,
      '',
      'אם זו הייתה פעולה שלכם, אין צורך לעשות דבר. אם לא, החליפו סיסמה, נתקו מכשירים אחרים וצרו קודי שחזור חדשים.',
      '',
      'EduFitScore',
    ].join('\n'),
  });
}

async function sendAdminPasswordChangeAlert(user, request, revokedOtherSessions) {
  if (!user?.email) return false;
  const details = auditRequestDetails(request);
  return sendMail({
    to: user.email,
    subject: 'סיסמת מנהל שונתה ב-EduFitScore',
    text: [
      'שלום,',
      '',
      'סיסמת חשבון המנהל ב-EduFitScore שונתה.',
      '',
      `זמן: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}`,
      `כתובת IP: ${details.ip || '-'}`,
      `דפדפן/מכשיר: ${details.userAgent || '-'}`,
      `מכשירים אחרים שנותקו: ${Number(revokedOtherSessions || 0)}`,
      '',
      'אם זו לא הייתה פעולה שלכם, בדקו מיד את פעילות ההתחברות, ודאו שאימות דו-שלבי פעיל ושקלו לסובב סודות מערכת.',
      '',
      'EduFitScore',
    ].join('\n'),
  });
}

async function sendBackupRestoreAttemptNotification(user, request, status, details = {}) {
  if (!user?.email) return false;
  const requestDetails = auditRequestDetails(request);
  const summary = details.summary
    ? `משתמשים: ${details.summary.users ?? '-'}, כיתות: ${details.summary.classes ?? '-'}, רשומות היסטוריה: ${details.summary.historyRecords ?? '-'}`
    : '';
  return sendMail({
    to: user.email,
    subject: 'התראת ייבוא גיבוי ב-EduFitScore',
    text: [
      'שלום,',
      '',
      'זוהתה פעולה הקשורה לייבוא גיבוי בחשבון מנהל.',
      '',
      `סטטוס: ${status}`,
      `זמן: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}`,
      `כתובת IP: ${requestDetails.ip || '-'}`,
      `דפדפן/מכשיר: ${requestDetails.userAgent || '-'}`,
      details.reason ? `סיבה: ${details.reason}` : '',
      summary ? `סיכום: ${summary}` : '',
      '',
      'אם זו לא הייתה פעולה שלכם, החליפו סיסמה, נתקו מכשירים אחרים ובדקו את יומן האבטחה.',
      '',
      'EduFitScore',
    ].filter((line) => line !== '').join('\n'),
  });
}

async function logBackupRestoreAlert(user, request, status, details = {}) {
  try {
    const sent = await sendBackupRestoreAttemptNotification(user, request, status, details);
    await logAdminAction(user.id, null, sent ? 'restore_backup_alert_sent' : 'restore_backup_alert_failed', auditRequestDetails(request, sent
      ? { status, ...details }
      : { status, reason: 'EMAIL_NOT_SENT', ...details }));
  } catch (error) {
    await logAdminAction(user.id, null, 'restore_backup_alert_failed', auditRequestDetails(request, { status, reason: error.message || 'EMAIL_FAILED', ...details }));
  }
}

async function ensureCurrentAdminPassword(request, response, action, targetUserId = null) {
  if (validAdminReauthToken(request.cookies?.edufitscore_admin_reauth, request.authUser.id)) {
    return true;
  }

  const valid = await verifyUserPassword(request.authUser.id, request.body?.currentAdminPassword);
  if (valid) {
    setAdminReauthCookie(response, request.authUser.id);
    await logAdminAction(request.authUser.id, targetUserId, 'admin_reauth_success', auditRequestDetails(request, { action }));
    return true;
  }

  await logAdminAction(request.authUser.id, targetUserId, `${action}_failed`, auditRequestDetails(request, { reason: 'INVALID_ADMIN_PASSWORD' }));
  response.status(403).json({ error: 'INVALID_ADMIN_PASSWORD' });
  return false;
}

async function ensureDeleteConfirmation(request, response, action, targetUserId = null) {
  if (String(request.body?.confirmation || '').trim() === 'delete') {
    return true;
  }

  await logAdminAction(request.authUser.id, targetUserId, `${action}_failed`, auditRequestDetails(request, { reason: 'INVALID_CONFIRMATION' }));
  response.status(400).json({ error: 'INVALID_CONFIRMATION' });
  return false;
}

app.use(attachUser);
app.use(requireCsrf);

function buildScoreResponse(sheet, values) {
  const results = sheet.metrics.map((metric) => {
    const result = scoreMetric(metric, values?.[metric.key]);

    return {
      key: metric.key,
      label: metric.label,
      result,
    };
  });

  const scoredResults = results.filter((item) => item.result);
  const averageScore = scoredResults.length
    ? Math.floor(scoredResults.reduce((sum, item) => sum + item.result.score, 0) / scoredResults.length)
    : null;

  return {
    sheet: {
      id: sheet.id,
      name: sheet.name,
    },
    results,
    averageScore,
  };
}

app.get('/api/sheets', (request, response) => {
  response.json({
    maleSheets: resolveSheets('male'),
    femaleSheets: resolveSheets('female'),
  });
});

app.post('/api/graph-snapshots', graphSnapshotRateLimit, async (request, response) => {
  const snapshot = request.body?.snapshot;

  if (!snapshot || !Array.isArray(snapshot.entries) || !Array.isArray(snapshot.series)) {
    response.status(400).json({ error: 'INVALID_SNAPSHOT' });
    return;
  }

  const id = crypto.randomBytes(6).toString('base64url');
  await saveGraphSnapshot(id, snapshot);
  response.status(201).json({ id });
});

app.get('/api/graph-snapshots/:id', async (request, response) => {
  const snapshot = await getGraphSnapshot(request.params.id);

  if (!snapshot) {
    response.status(404).json({ error: 'SNAPSHOT_NOT_FOUND' });
    return;
  }

  response.json({ snapshot });
});

app.get('/api/auth/me', (request, response) => {
  response.json({ user: request.authUser || null });
});

app.get('/api/schools', async (request, response) => {
  response.json({ schools: await listSchools() });
});

app.get('/api/schools/:schoolId/score-tables', async (request, response) => {
  const data = await listPublicSchoolScoreTables(Number(request.params.schoolId));
  if (!data) {
    response.status(404).json({ error: 'SCHOOL_NOT_FOUND' });
    return;
  }
  response.json(data);
});

app.post('/api/auth/login', authRateLimit, async (request, response) => {
  const { email, password } = request.body || {};
  let user;

  try {
    user = await verifyUser(email, password);
  } catch (error) {
    if (error.message === 'EMAIL_NOT_VERIFIED') {
      response.status(403).json({ error: 'EMAIL_NOT_VERIFIED' });
      return;
    }
    throw error;
  }

  if (!user) {
    try {
      const existing = await findUserForSecurityAudit(String(email || '').trim().toLowerCase());
      if (existing?.role === 'admin') {
        await logAdminAction(existing.id, existing.id, 'admin_login_failed', auditRequestDetails(request, { email: existing.email, reason: existing.isActive ? 'INVALID_CREDENTIALS' : 'INACTIVE_ACCOUNT' }));
        await maybeAlertSuspiciousAdminLogin(existing, request);
      }
    } catch {
      // Keep login failure response neutral and do not reveal whether the email exists.
    }
    response.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  if (user.role === 'admin') {
    const twoFactor = await getAdminTwoFactorState(user.id);
    if (twoFactor?.enabled && !isAdminTwoFactorBypassed()) {
      const challenge = await createTwoFactorChallenge(user.id);
      response.json({ requiresTwoFactor: true, challengeToken: challenge.token, expiresAt: challenge.expiresAt, email: maskEmail(user.email) });
      return;
    }
  }

  const session = await createSession(user.id, sessionRequestDetails(request));
  setAuthCookies(response, session);
  if (user.role === 'admin') {
    await logAdminAction(user.id, user.id, 'admin_login', auditRequestDetails(request, { email: user.email }));
  }
  response.json({ user, csrfToken: session.csrfToken });
});

app.post('/api/auth/2fa/verify-login', twoFactorVerifyRateLimit, async (request, response) => {
  const { challengeToken, code } = request.body || {};
  const challenge = await getTwoFactorChallenge(challengeToken);

  if (!challenge || challenge.attemptCount >= 8) {
    response.status(400).json({ error: 'TWO_FACTOR_CHALLENGE_INVALID' });
    return;
  }

  const normalizedCode = normalizeTwoFactorCode(code);
  const usedRecoveryCode = !/^\d{6}$/.test(normalizedCode) && await consumeAdminTwoFactorRecoveryCode(challenge.userId, normalizedCode);
  const valid = usedRecoveryCode || verifyTotpCode(challenge.secret, normalizedCode);

  if (!valid) {
    await incrementTwoFactorChallengeAttempts(challengeToken);
    await logAdminAction(challenge.userId, challenge.userId, 'admin_2fa_login_failed', auditRequestDetails(request, { reason: 'INVALID_CODE' }));
    response.status(401).json({ error: 'TWO_FACTOR_INVALID' });
    return;
  }

  await consumeTwoFactorChallenge(challengeToken);
  const session = await createSession(challenge.userId, sessionRequestDetails(request));
  setAuthCookies(response, session);
  const user = await findUserBySessionToken(session.token);
  await logAdminAction(challenge.userId, challenge.userId, usedRecoveryCode ? 'admin_2fa_recovery_code_used' : 'admin_2fa_login_success', auditRequestDetails(request));
  if (usedRecoveryCode) {
    try {
      const sent = await sendAdminRecoveryCodeUsedAlert(user, request);
      await logAdminAction(challenge.userId, challenge.userId, sent ? 'admin_2fa_recovery_code_alert_sent' : 'admin_2fa_recovery_code_alert_failed', auditRequestDetails(request, sent ? {} : { reason: 'EMAIL_NOT_SENT' }));
    } catch (error) {
      await logAdminAction(challenge.userId, challenge.userId, 'admin_2fa_recovery_code_alert_failed', auditRequestDetails(request, { reason: error.message || 'EMAIL_FAILED' }));
    }
  }
  await logAdminAction(challenge.userId, challenge.userId, 'admin_login', auditRequestDetails(request, { email: user.email, twoFactor: true }));
  response.json({ user, csrfToken: session.csrfToken });
});

app.get('/api/auth/2fa/status', requireAuth, async (request, response) => {
  if (!requireGlobalAdmin(request, response)) return;
  const state = await getAdminTwoFactorState(request.authUser.id);
  response.json({ enabled: Boolean(state?.enabled), bypassed: isAdminTwoFactorBypassed(), enabledAt: state?.enabledAt || '', recoveryCodeCount: state?.recoveryCodeCount || 0 });
});

app.post('/api/auth/2fa/setup/start', twoFactorSetupRateLimit, requireAuth, async (request, response) => {
  if (!requireGlobalAdmin(request, response)) return;
  if (!await ensureCurrentAdminPassword(request, response, 'admin_2fa_setup_started', request.authUser.id)) return;

  const secret = speakeasy.generateSecret({ length: 20, name: `EduFitScore:${request.authUser.email}`, issuer: 'EduFitScore' });
  await saveAdminTwoFactorSecret(request.authUser.id, secret.base32);
  const label = `EduFitScore:${request.authUser.email}`;
  const otpauthUrl = secret.otpauth_url;
  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl, { margin: 1, width: 220 });
  await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_setup_started', auditRequestDetails(request));
  response.json({ label, secret: secret.base32, qrCodeDataUrl });
});

app.post('/api/auth/2fa/setup/verify', twoFactorSetupRateLimit, requireAuth, async (request, response) => {
  if (!requireGlobalAdmin(request, response)) return;
  const state = await getAdminTwoFactorState(request.authUser.id);

  if (!state?.secret || !verifyTotpCode(state.secret, request.body?.code)) {
    await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_setup_failed', auditRequestDetails(request, { reason: 'INVALID_CODE' }));
    response.status(400).json({ error: 'TWO_FACTOR_INVALID' });
    return;
  }

  const recoveryCodes = generateRecoveryCodes();
  await enableAdminTwoFactor(request.authUser.id, recoveryCodes);
  await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_enabled', auditRequestDetails(request));
  response.json({ enabled: true, recoveryCodes });
});

app.post('/api/auth/2fa/disable', twoFactorSetupRateLimit, requireAuth, async (request, response) => {
  if (!requireGlobalAdmin(request, response)) return;
  if (!await ensureCurrentAdminPassword(request, response, 'admin_2fa_disabled', request.authUser.id)) return;

  const state = await getAdminTwoFactorState(request.authUser.id);
  if (!state?.enabled) {
    response.json({ enabled: false });
    return;
  }

  const normalizedCode = normalizeTwoFactorCode(request.body?.code);
  const usedRecoveryCode = !/^\d{6}$/.test(normalizedCode) && await consumeAdminTwoFactorRecoveryCode(request.authUser.id, normalizedCode);
  if (!usedRecoveryCode && !verifyTotpCode(state.secret, normalizedCode)) {
    await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_disable_failed', auditRequestDetails(request, { reason: 'INVALID_CODE' }));
    response.status(400).json({ error: 'TWO_FACTOR_INVALID' });
    return;
  }

  await disableAdminTwoFactor(request.authUser.id);
  await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_disabled', auditRequestDetails(request));
  response.json({ enabled: false });
});

app.post('/api/auth/2fa/recovery/regenerate/request', twoFactorRecoveryRegenerationRequestRateLimit, requireAuth, async (request, response) => {
  if (!requireGlobalAdmin(request, response)) return;
  if (!await ensureCurrentAdminPassword(request, response, 'admin_2fa_recovery_regenerate_requested', request.authUser.id)) return;

  const state = await getAdminTwoFactorState(request.authUser.id);
  if (!state?.enabled) {
    response.status(400).json({ error: 'TWO_FACTOR_NOT_ENABLED' });
    return;
  }

  if (!verifyTotpCode(state.secret, request.body?.code)) {
    await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_recovery_regenerate_failed', auditRequestDetails(request, { reason: 'INVALID_CODE' }));
    response.status(400).json({ error: 'TWO_FACTOR_INVALID' });
    return;
  }

  const regeneration = await createTwoFactorRecoveryRegenerationToken(request.authUser.id, sessionRequestDetails(request));
  const sent = await sendTwoFactorRecoveryRegenerationMessage(regeneration);
  if (!sent) {
    await consumeTwoFactorRecoveryRegenerationToken(regeneration.token);
    await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_recovery_regenerate_failed', auditRequestDetails(request, { reason: 'EMAIL_NOT_SENT' }));
    response.status(500).json({ error: 'EMAIL_NOT_SENT' });
    return;
  }

  await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_recovery_regenerate_requested', auditRequestDetails(request));
  response.json({ sent: true, expiresAt: regeneration.expiresAt, email: maskEmail(regeneration.user.email) });
});

app.post('/api/auth/2fa/recovery/regenerate/confirm', twoFactorRecoveryRegenerationConfirmRateLimit, requireAuth, async (request, response) => {
  if (!requireGlobalAdmin(request, response)) return;

  const token = String(request.body?.token || '').trim();
  const regeneration = await getTwoFactorRecoveryRegenerationToken(token);
  if (!regeneration || regeneration.userId !== request.authUser.id) {
    await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_recovery_regenerate_confirm_failed', auditRequestDetails(request, { reason: 'INVALID_TOKEN' }));
    response.status(400).json({ error: 'INVALID_TOKEN' });
    return;
  }

  const recoveryCodes = generateRecoveryCodes();
  await replaceAdminTwoFactorRecoveryCodes(request.authUser.id, recoveryCodes);
  await consumeTwoFactorRecoveryRegenerationToken(token);
  await logAdminAction(request.authUser.id, request.authUser.id, 'admin_2fa_recovery_regenerate_confirmed', auditRequestDetails(request));
  response.json({ recoveryCodes });
});

app.post('/api/auth/signup', signupRateLimit, async (request, response) => {
  const { firstName, lastName, email, phone, city, schoolName, schoolCity, schoolId, inviteToken, accountType, password, passwordRepeat } = request.body || {};

  if (password !== passwordRepeat) {
    response.status(400).json({ error: 'PASSWORD_MISMATCH' });
    return;
  }
  if (rejectWeakPassword(response, password)) return;

  try {
    const user = await createUser({ firstName, lastName, email, phone, city, schoolName, schoolCity, schoolId, inviteToken, accountType, password });
    const verification = await createEmailVerificationToken(user.id);
    try {
      await sendEmailVerificationMessage(verification);
    } catch (error) {
      await deleteUnverifiedUser(user.id);
      console.error('Signup verification email failed:', error.message || 'MAIL_ERROR');
      response.status(500).json({ error: 'EMAIL_SEND_FAILED' });
      return;
    }
    response.status(201).json({ ok: true, requiresEmailVerification: true, email: user.email });
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      response.status(409).json({ error: 'EMAIL_EXISTS' });
      return;
    }

    if (error.message === 'ACCOUNT_INACTIVE') {
      response.status(409).json({ error: 'ACCOUNT_INACTIVE' });
      return;
    }

    if (error.message === 'MISSING_REQUIRED_FIELDS') {
      response.status(400).json({ error: 'MISSING_REQUIRED_FIELDS' });
      return;
    }

    if (['MISSING_SCHOOL', 'SCHOOL_ADMIN_EXISTS', 'SCHOOL_LIMIT_REACHED', 'INVALID_INVITE', 'INVITE_EMAIL_MISMATCH'].includes(error.message) || String(error.message || '').startsWith('TEACHER_ALREADY_LINKED_')) {
      response.status(400).json({ error: error.message });
      return;
    }

    if (['INVALID_NAME', 'INVALID_EMAIL', 'INVALID_PHONE'].includes(error.message)) {
      response.status(400).json({ error: error.message });
      return;
    }

    response.status(500).json({ error: 'SIGNUP_FAILED' });
  }
});

app.post('/api/auth/verify-email', emailVerificationRateLimit, async (request, response) => {
  try {
    await verifyEmailWithToken(request.body?.token);
    response.json({ ok: true });
  } catch {
    response.status(400).json({ error: 'INVALID_VERIFICATION' });
  }
});

app.post('/api/auth/forgot-password', passwordResetRateLimit, async (request, response) => {
  const email = String(request.body?.email || '').trim().toLowerCase();
  const neutralResponse = { ok: true };

  try {
    const reset = await createPasswordResetToken(email);

    if (reset) {
      const resetUrl = `${publicBaseUrl}/?resetToken=${encodeURIComponent(reset.token)}#reset-password`;
      await sendMail({
        to: reset.user.email,
        subject: 'איפוס סיסמה ל-EduFitScore',
        text: [
          'שלום,',
          '',
          'התקבלה בקשה לאיפוס הסיסמה לחשבון EduFitScore שלך.',
          'כדי לבחור סיסמה חדשה, יש לפתוח את הקישור הבא:',
          resetUrl,
          '',
          'הקישור תקף למשך שעה אחת וניתן להשתמש בו פעם אחת בלבד.',
          'אם לא ביקשת לאפס סיסמה, אפשר להתעלם מהודעה זו.',
          '',
          'EduFitScore',
        ].join('\n'),
      });
    }
  } catch (error) {
    console.error('Forgot password failed:', error.message || 'MAIL_ERROR');
  }

  response.json(neutralResponse);
});

app.post('/api/auth/reset-password', passwordResetRateLimit, async (request, response) => {
  const { token, newPassword, newPasswordRepeat } = request.body || {};

  if (!newPassword || newPassword !== newPasswordRepeat) {
    response.status(400).json({ error: 'PASSWORD_MISMATCH' });
    return;
  }
  if (rejectWeakPassword(response, newPassword)) return;

  try {
    await resetPasswordWithToken(token, newPassword);
    clearAuthCookies(response);
    response.json({ ok: true });
  } catch (error) {
    response.status(400).json({ error: 'INVALID_RESET' });
  }
});

app.post('/api/auth/logout', async (request, response) => {
  await deleteSession(request.cookies?.edufitscore_session);
  clearAuthCookies(response);
  response.json({ ok: true });
});

app.get('/api/auth/sessions', requireAuth, async (request, response) => {
  response.json({ sessions: await listUserSessions(request.authUser.id, request.cookies?.edufitscore_session || '') });
});

app.post('/api/auth/sessions/logout-others', requireAuth, async (request, response) => {
  const deleted = await deleteOtherUserSessions(request.authUser.id, request.cookies?.edufitscore_session || '');
  if (request.authUser.role === 'admin') {
    await logAdminAction(request.authUser.id, request.authUser.id, 'logout_other_sessions', auditRequestDetails(request, { deleted }));
  }
  response.json({ ok: true, deleted });
});

app.delete('/api/auth/sessions/:sessionId', requireAuth, async (request, response) => {
  const deleted = await deleteUserSessionByPublicId(request.authUser.id, request.params.sessionId, request.cookies?.edufitscore_session || '');
  if (!deleted) {
    response.status(404).json({ error: 'SESSION_NOT_FOUND' });
    return;
  }
  if (request.authUser.role === 'admin') {
    await logAdminAction(request.authUser.id, request.authUser.id, 'logout_session', auditRequestDetails(request, { sessionId: request.params.sessionId }));
  }
  response.json({ ok: true });
});

app.put('/api/auth/profile', requireAuth, async (request, response) => {
  try {
    const user = await updateUserProfile(request.authUser.id, request.body || {});
    response.json({ user });
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      response.status(409).json({ error: 'EMAIL_EXISTS' });
      return;
    }

    if (['INVALID_NAME', 'INVALID_EMAIL', 'INVALID_PHONE'].includes(error.message)) {
      response.status(400).json({ error: error.message });
      return;
    }

    response.status(500).json({ error: 'PROFILE_UPDATE_FAILED' });
  }
});

app.put('/api/auth/password', requireAuth, async (request, response) => {
  const { oldPassword, newPassword, newPasswordRepeat } = request.body || {};

  if (!newPassword || newPassword !== newPasswordRepeat) {
    response.status(400).json({ error: 'PASSWORD_MISMATCH' });
    return;
  }
  if (rejectWeakPassword(response, newPassword)) return;

  try {
    await changeUserPassword(request.authUser.id, oldPassword, newPassword);
    const deleted = await deleteOtherUserSessions(request.authUser.id, request.cookies?.edufitscore_session || '');
    if (request.authUser.role === 'admin') {
      await logAdminAction(request.authUser.id, request.authUser.id, 'password_change', auditRequestDetails(request, { revokedOtherSessions: deleted }));
      if (deleted) {
        await logAdminAction(request.authUser.id, request.authUser.id, 'logout_other_sessions_after_password_change', auditRequestDetails(request, { deleted }));
      }
      try {
        const sent = await sendAdminPasswordChangeAlert(request.authUser, request, deleted);
        await logAdminAction(request.authUser.id, request.authUser.id, sent ? 'admin_password_change_alert_sent' : 'admin_password_change_alert_failed', auditRequestDetails(request, sent ? {} : { reason: 'EMAIL_NOT_SENT' }));
      } catch (error) {
        await logAdminAction(request.authUser.id, request.authUser.id, 'admin_password_change_alert_failed', auditRequestDetails(request, { reason: error.message || 'EMAIL_FAILED' }));
      }
    }
    response.clearCookie('edufitscore_admin_reauth', { path: '/' });
    response.json({ ok: true, revokedOtherSessions: deleted });
  } catch (error) {
    if (error.message === 'INVALID_PASSWORD') {
      response.status(401).json({ error: 'INVALID_PASSWORD' });
      return;
    }

    response.status(500).json({ error: 'PASSWORD_UPDATE_FAILED' });
  }
});

app.post('/api/auth/deactivate', requireAuth, async (request, response) => {
  try {
    await deactivateUser(request.authUser.id, request.body?.password);
    if (request.authUser.role === 'admin') {
      await logAdminAction(request.authUser.id, request.authUser.id, 'account_deactivate', auditRequestDetails(request));
    }
    clearAuthCookies(response);
    response.json({ ok: true });
  } catch (error) {
    if (error.message === 'INVALID_PASSWORD') {
      response.status(401).json({ error: 'INVALID_PASSWORD' });
      return;
    }

    response.status(500).json({ error: 'DEACTIVATE_FAILED' });
  }
});

app.get('/api/admin/overview', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  response.json({
    user: request.authUser,
    summary: 'Admin area placeholder',
  });
});

app.get('/api/admin/inactive-users', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  response.json({ users: await listInactiveUsers() });
});

app.get('/api/school-admin/overview', requireSchoolAdmin, async (request, response) => {
  try {
    response.json(await listSchoolAdminOverview(request.authUser.id));
  } catch (error) {
    response.status(403).json({ error: 'SCHOOL_ADMIN_NOT_FOUND' });
  }
});

app.get('/api/school-admin/score-tables', requireSchoolAdmin, async (request, response) => {
  try {
    response.json(await listSchoolScoreTables(request.authUser.id));
  } catch (error) {
    response.status(403).json({ error: error.message || 'SCORE_TABLES_NOT_AVAILABLE' });
  }
});

app.patch('/api/school-admin/score-table-settings', requireSchoolAdmin, async (request, response) => {
  try {
    response.json({ settings: await updateSchoolScoreTableSettings(request.authUser.id, request.body || {}) });
  } catch (error) {
    response.status(400).json({ error: error.message || 'SETTINGS_UPDATE_FAILED' });
  }
});

app.post('/api/school-admin/score-tables', requireSchoolAdmin, async (request, response) => {
  try {
    const table = await createSchoolScoreTable(request.authUser.id, request.body || {});
    await logAdminAction(request.authUser.id, null, 'school_score_table_create', auditRequestDetails(request, { tableId: table.id, grade: table.grade, genderGroup: table.genderGroup }));
    response.status(201).json({ table });
  } catch (error) {
    await logAdminAction(request.authUser.id, null, 'school_score_table_create_failed', auditRequestDetails(request, { reason: error.message || 'SCORE_TABLE_CREATE_FAILED' }));
    response.status(400).json({ error: error.message || 'SCORE_TABLE_CREATE_FAILED' });
  }
});

app.post('/api/school-admin/score-tables/import', importRateLimit, requireSchoolAdmin, (request, response) => {
  const chunks = [];
  let size = 0;
  request.on('data', (chunk) => {
    size += chunk.length;
    if (size > 5 * 1024 * 1024) {
      request.destroy(new Error('IMPORT_FILE_TOO_LARGE'));
      return;
    }
    chunks.push(chunk);
  });
  request.on('error', () => response.status(400).json({ error: 'IMPORT_READ_FAILED' }));
  request.on('end', async () => {
  try {
    const fileBuffer = Buffer.concat(chunks);
    if (!fileBuffer.length) {
      response.status(400).json({ error: 'IMPORT_FILE_REQUIRED' });
      return;
    }

    const parsedTables = await parseImportedScoreTables(fileBuffer);
    const created = [];
    const skipped = [];

    for (const table of parsedTables) {
      try {
        if (!table.grade || !table.genderGroup || !table.subjects.length || !table.rows.length) {
          skipped.push({ sheetName: table.sheetName, error: 'INVALID_SHEET_STRUCTURE' });
          continue;
        }
        created.push(await createSchoolScoreTable(request.authUser.id, table));
      } catch (error) {
        skipped.push({ sheetName: table.sheetName, error: error.message || 'IMPORT_TABLE_FAILED' });
      }
    }

    await logAdminAction(request.authUser.id, null, created.length ? 'school_score_table_import' : 'school_score_table_import_failed', auditRequestDetails(request, {
      createdCount: created.length,
      skippedCount: skipped.length,
      skippedErrors: skipped.map((item) => item.error).filter(Boolean).slice(0, 20),
    }));
    response.status(created.length ? 201 : 400).json({ created, skipped });
  } catch (error) {
    await logAdminAction(request.authUser.id, null, 'school_score_table_import_failed', auditRequestDetails(request, { reason: error.message || 'IMPORT_FAILED' }));
    response.status(400).json({ error: error.message || 'IMPORT_FAILED' });
  }
  });
});

app.put('/api/school-admin/score-tables/:tableId', requireSchoolAdmin, async (request, response) => {
  try {
    const updated = await updateSchoolScoreTable(request.authUser.id, Number(request.params.tableId), request.body || {});
    if (!updated) {
      response.status(404).json({ error: 'SCORE_TABLE_NOT_FOUND' });
      return;
    }
    response.json({ table: updated });
  } catch (error) {
    response.status(400).json({ error: error.message || 'SCORE_TABLE_UPDATE_FAILED' });
  }
});

app.delete('/api/school-admin/score-tables/:tableId', requireSchoolAdmin, async (request, response) => {
  try {
    const deleted = await deleteSchoolScoreTable(request.authUser.id, Number(request.params.tableId));
    if (!deleted) {
      response.status(404).json({ error: 'SCORE_TABLE_NOT_FOUND' });
      return;
    }
    await logAdminAction(request.authUser.id, null, 'school_score_table_delete', auditRequestDetails(request, { tableId: Number(request.params.tableId) }));
    response.json({ ok: true });
  } catch (error) {
    await logAdminAction(request.authUser.id, null, 'school_score_table_delete_failed', auditRequestDetails(request, { tableId: Number(request.params.tableId), reason: error.message || 'SCORE_TABLE_DELETE_FAILED' }));
    response.status(400).json({ error: error.message || 'SCORE_TABLE_DELETE_FAILED' });
  }
});

app.patch('/api/school-admin/memberships/:membershipId', requireSchoolAdmin, async (request, response) => {
  try {
    const updated = await setSchoolTeacherStatus(request.authUser.id, Number(request.params.membershipId), request.body?.status);
    if (!updated) {
      response.status(404).json({ error: 'MEMBERSHIP_NOT_FOUND' });
      return;
    }
    response.json({ ok: true });
  } catch (error) {
    response.status(400).json({ error: error.message || 'STATUS_UPDATE_FAILED' });
  }
});

app.delete('/api/school-admin/memberships/:membershipId', requireSchoolAdmin, async (request, response) => {
  try {
    const deleted = await removeSchoolTeacher(request.authUser.id, Number(request.params.membershipId));
    if (!deleted) {
      response.status(404).json({ error: 'MEMBERSHIP_NOT_FOUND' });
      return;
    }
    response.json({ ok: true });
  } catch (error) {
    response.status(400).json({ error: error.message || 'REMOVE_FAILED' });
  }
});

app.post('/api/school-admin/invites', requireSchoolAdmin, async (request, response) => {
  try {
    const invite = await createSchoolInvite(request.authUser.id, request.body || {});
    const inviteUrl = `${publicBaseUrl}/?invite=${encodeURIComponent(invite.token)}#signup`;
    response.status(201).json({ invite, inviteUrl });
  } catch (error) {
    response.status(400).json({ error: error.message || 'INVITE_FAILED' });
  }
});

app.post('/api/teacher/school-requests', requireAuth, async (request, response) => {
  try {
    response.status(201).json({ memberships: await requestTeacherSchool(request.authUser.id, Number(request.body?.schoolId)) });
  } catch (error) {
    response.status(400).json({ error: error.message || 'REQUEST_FAILED' });
  }
});

app.get('/api/admin/users', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  response.json({ users: await listUsers() });
});

app.get('/api/admin/audit-log', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  response.json({ entries: await listAdminAuditLog(50) });
});

app.get('/api/admin/security-events', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  const result = await listAdminAuditLogFiltered({
    actions: securityActionsForQuery(request.query),
    search: request.query.q,
    from: request.query.from,
    to: request.query.to,
    limit: request.query.limit,
    offset: request.query.offset,
  });
  response.json({ ...result, entries: addSecuritySeverity(result.entries) });
});

app.get('/api/admin/security-summary', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  const [twoFactor, sessions, auditEntries] = await Promise.all([
    getAdminTwoFactorState(request.authUser.id),
    listUserSessions(request.authUser.id, request.cookies?.edufitscore_session || ''),
    listAdminAuditLog(500),
  ]);
  const latestAction = (actions) => auditEntries.find((entry) => actions.includes(entry.action)) || null;

  response.json({
    twoFactor: {
      enabled: Boolean(twoFactor?.enabled),
      bypassed: isAdminTwoFactorBypassed(),
      recoveryCodeCount: twoFactor?.recoveryCodeCount || 0,
    },
    sessions: { activeCount: sessions.length },
    idleTimeout: {
      adminMinutes: Math.round(adminIdleTimeoutMs / 60000),
      userMinutes: Math.round(userIdleTimeoutMs / 60000),
    },
    reauth: { windowMinutes: Math.round(adminReauthWindowMs / 60000) },
    latest: {
      failedAdminLogin: latestAction(['admin_login_failed']),
      backupExport: latestAction(['export_backup']),
      securityLogExport: latestAction(['export_security_log']),
      passwordChange: latestAction(['password_change']),
      restoreBackup: latestAction(['restore_backup']),
    },
  });
});

app.post('/api/admin/security-events/export', adminSecurityExportRateLimit, requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  if (!await ensureCurrentAdminPassword(request, response, 'export_security_log')) return;

  const format = String(request.body?.format || 'csv').toLowerCase() === 'json' ? 'json' : 'csv';
  const entries = await listAdminAuditLog(1000);
  const date = new Date().toISOString().slice(0, 10);
  await logAdminAction(request.authUser.id, null, 'export_security_log', auditRequestDetails(request, { format, entries: entries.length }));

  if (format === 'json') {
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Content-Disposition', `attachment; filename="edufitscore-security-log-${date}.json"`);
    response.send(JSON.stringify({ exportedAt: new Date().toISOString(), entries }, null, 2));
    return;
  }

  response.setHeader('Content-Type', 'text/csv; charset=utf-8');
  response.setHeader('Content-Disposition', `attachment; filename="edufitscore-security-log-${date}.csv"`);
  response.send(securityEventsCsv(entries));
});

app.get('/api/admin/backup', requireAuth, (request, response) => {
  response.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
});

app.post('/api/admin/backup/export', adminBackupExportRateLimit, requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  if (!await ensureCurrentAdminPassword(request, response, 'export_backup')) return;

  await logAdminAction(request.authUser.id, null, 'export_backup', auditRequestDetails(request));
  try {
    const notified = await sendBackupExportNotification(request.authUser, request);
    if (!notified) {
      await logAdminAction(request.authUser.id, null, 'export_backup_notification_failed', auditRequestDetails(request, { reason: 'EMAIL_NOT_SENT' }));
    }
  } catch (error) {
    await logAdminAction(request.authUser.id, null, 'export_backup_notification_failed', auditRequestDetails(request, { reason: error.message || 'EMAIL_FAILED' }));
  }
  response.json(await exportBackupData());
});

app.post('/api/admin/backup/restore/dry-run', adminRestoreRateLimit, requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_ADMIN_RESTORE !== 'true') {
    await logAdminAction(request.authUser.id, null, 'restore_backup_failed', auditRequestDetails(request, { reason: 'RESTORE_DISABLED', dryRun: true }));
    await logBackupRestoreAlert(request.authUser, request, 'blocked', { reason: 'RESTORE_DISABLED', dryRun: true });
    response.status(403).json({ error: 'RESTORE_DISABLED' });
    return;
  }

  if (!await ensureCurrentAdminPassword(request, response, 'restore_backup')) return;
  if (!await ensureDeleteConfirmation(request, response, 'restore_backup')) return;

  try {
    const summary = summarizeBackupData(request.body?.backup);
    response.json({ ok: true, summary });
  } catch (error) {
    response.status(400).json({ error: 'INVALID_BACKUP', details: error.message });
  }
});

app.post('/api/admin/backup/restore', adminRestoreRateLimit, requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_ADMIN_RESTORE !== 'true') {
    await logAdminAction(request.authUser.id, null, 'restore_backup_failed', auditRequestDetails(request, { reason: 'RESTORE_DISABLED' }));
    await logBackupRestoreAlert(request.authUser, request, 'blocked', { reason: 'RESTORE_DISABLED' });
    response.status(403).json({ error: 'RESTORE_DISABLED' });
    return;
  }

  if (!await ensureCurrentAdminPassword(request, response, 'restore_backup')) return;
  if (!await ensureDeleteConfirmation(request, response, 'restore_backup')) return;

  try {
    const summary = await restoreBackupData(request.body?.backup, request.authUser.id);
    await logAdminAction(request.authUser.id, null, 'restore_backup', auditRequestDetails(request, { summary }));
    await logBackupRestoreAlert(request.authUser, request, 'succeeded', { summary });
    response.json({ ok: true, summary });
  } catch (error) {
    console.error('Backup restore failed:', error);
    await logAdminAction(request.authUser.id, null, 'restore_backup_failed', auditRequestDetails(request, { reason: error.message || 'INVALID_BACKUP' }));
    await logBackupRestoreAlert(request.authUser, request, 'failed', { reason: error.message || 'INVALID_BACKUP' });
    response.status(400).json({ error: 'INVALID_BACKUP', details: error.message });
  }
});

app.get('/api/admin/diagnostics', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  response.json({ diagnostics: await getAdminDiagnostics() });
});

app.post('/api/admin/restore-user', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  try {
    const user = await restoreUserByEmail(request.body?.email);
    await logAdminAction(request.authUser.id, user.id, 'restore_user', { email: user.email });
    response.json({ user });
  } catch (error) {
    if (error.message === 'USER_NOT_FOUND') {
      response.status(404).json({ error: 'USER_NOT_FOUND' });
      return;
    }

    response.status(500).json({ error: 'RESTORE_FAILED' });
  }
});

app.patch('/api/admin/users/:userId/status', requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  const userId = Number(request.params.userId);
  const isActive = Boolean(request.body?.isActive);

  if (!Number.isInteger(userId) || userId < 1) {
    response.status(400).json({ error: 'INVALID_USER_ID' });
    return;
  }

  try {
    const user = await setUserActive(userId, isActive);
    await logAdminAction(request.authUser.id, userId, isActive ? 'enable_user' : 'disable_user', { email: user.email });
    response.json({ user });
  } catch (error) {
    if (error.message === 'USER_NOT_FOUND') {
      response.status(404).json({ error: 'USER_NOT_FOUND' });
      return;
    }

    response.status(500).json({ error: 'STATUS_UPDATE_FAILED' });
  }
});

app.delete('/api/admin/users/:userId/permanent', adminPermanentDeleteRateLimit, requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  const userId = Number(request.params.userId);

  if (!Number.isInteger(userId) || userId < 1) {
    response.status(400).json({ error: 'INVALID_USER_ID' });
    return;
  }

  if (!await ensureCurrentAdminPassword(request, response, 'permanent_delete_user', userId)) return;
  if (!await ensureDeleteConfirmation(request, response, 'permanent_delete_user', userId)) return;

  try {
    await permanentlyDeleteUser(userId);
    await logAdminAction(request.authUser.id, userId, 'permanent_delete_user', auditRequestDetails(request));
    response.json({ ok: true });
  } catch (error) {
    await logAdminAction(request.authUser.id, userId, 'permanent_delete_user_failed', auditRequestDetails(request, { reason: error.message || 'DELETE_FAILED' }));
    response.status(error.message === 'USER_ACTIVE' ? 400 : 404).json({ error: error.message });
  }
});

app.post('/api/admin/users/:userId/reset-password', adminPasswordResetRateLimit, requireAuth, async (request, response) => {
  if (!await requireGlobalAdminReady(request, response)) return;

  const userId = Number(request.params.userId);
  let { newPassword, newPasswordRepeat, generateTemporary } = request.body || {};

  if (generateTemporary) {
    newPassword = `Ef${crypto.randomBytes(4).toString('hex')}!7A`;
    newPasswordRepeat = newPassword;
  }

  if (!Number.isInteger(userId) || userId < 1) {
    response.status(400).json({ error: 'INVALID_USER_ID' });
    return;
  }

  if (!await ensureCurrentAdminPassword(request, response, 'reset_password', userId)) return;

  if (!newPassword || newPassword !== newPasswordRepeat) {
    response.status(400).json({ error: 'PASSWORD_MISMATCH' });
    return;
  }
  if (rejectWeakPassword(response, newPassword)) return;

  try {
    const user = await adminResetUserPassword(userId, newPassword, request.cookies?.edufitscore_session);
    await logAdminAction(request.authUser.id, userId, 'reset_password', auditRequestDetails(request, { email: user.email, generatedTemporary: Boolean(generateTemporary) }));
    response.json({ user, temporaryPassword: generateTemporary ? newPassword : '' });
  } catch (error) {
    await logAdminAction(request.authUser.id, userId, 'reset_password_failed', auditRequestDetails(request, { reason: error.message || 'PASSWORD_RESET_FAILED' }));
    if (error.message === 'USER_NOT_FOUND') {
      response.status(404).json({ error: 'USER_NOT_FOUND' });
      return;
    }

    if (error.message === 'INVALID_PASSWORD') {
      response.status(400).json({ error: 'INVALID_PASSWORD' });
      return;
    }

    response.status(500).json({ error: 'PASSWORD_RESET_FAILED' });
  }
});

app.get('/api/teacher/classes', requireTeacherOrAdmin, async (request, response) => {
  response.json({ classes: await listTeacherClasses(request.authUser.id) });
});

app.get('/api/teacher/classes/:classId/score-table', requireTeacherOrAdmin, async (request, response) => {
  const result = await getTeacherClassScoreTable(request.authUser.id, Number(request.params.classId));
  if (!result) {
    response.status(404).json({ error: 'CLASS_NOT_FOUND' });
    return;
  }
  response.json(result);
});

app.get('/api/teacher/classes/:classId/history', requireTeacherOrAdmin, async (request, response) => {
  const teacherClass = await getTeacherClass(request.authUser.id, Number(request.params.classId));

  if (!teacherClass) {
    response.status(404).json({ error: 'Class not found' });
    return;
  }

  response.json({ history: await listTeacherClassHistory(teacherClass.id) });
});

app.delete('/api/teacher/classes/:classId/history/:historyId', requireTeacherOrAdmin, async (request, response) => {
  const deleted = await deleteTeacherClassHistory(
    request.authUser.id,
    Number(request.params.classId),
    Number(request.params.historyId)
  );

  if (!deleted) {
    response.status(404).json({ error: 'History entry not found' });
    return;
  }

  response.json({ ok: true });
});

app.patch('/api/teacher/classes/:classId/history/:historyId/semester', requireTeacherOrAdmin, async (request, response) => {
  const updated = await updateTeacherClassHistorySemester(
    request.authUser.id,
    Number(request.params.classId),
    Number(request.params.historyId),
    request.body?.semester
  );

  if (!updated) {
    response.status(404).json({ error: 'History entry not found' });
    return;
  }

  response.json({ entry: updated });
});

app.post('/api/teacher/classes', requireTeacherOrAdmin, async (request, response) => {
  try {
    const created = await createTeacherClass(request.authUser.id, request.body || {});
    response.status(201).json({ teacherClass: created });
  } catch (error) {
    if (error.message === 'CLASS_LIMIT_REACHED') {
      response.status(400).json({ error: 'Class limit reached' });
      return;
    }
    if (error.message === 'SCHOOL_ACCESS_DENIED') {
      response.status(403).json({ error: 'SCHOOL_ACCESS_DENIED' });
      return;
    }

    response.status(500).json({ error: 'Unable to create class' });
  }
});

app.post('/api/teacher/classes/import', teacherClassImportRateLimit, requireTeacherOrAdmin, (request, response) => {
  const chunks = [];
  let size = 0;
  request.on('data', (chunk) => {
    size += chunk.length;
    if (size > 5 * 1024 * 1024) {
      request.destroy(new Error('IMPORT_FILE_TOO_LARGE'));
      return;
    }
    chunks.push(chunk);
  });
  request.on('error', () => response.status(400).json({ error: 'IMPORT_READ_FAILED' }));
  request.on('end', async () => {
    try {
      const fileBuffer = Buffer.concat(chunks);
      if (!fileBuffer.length) {
        response.status(400).json({ error: 'IMPORT_FILE_REQUIRED' });
        return;
      }

      const grade = String(request.query.grade || '').trim();
      const gender = String(request.query.gender || '').trim();
      const schoolId = request.query.schoolId ? Number(request.query.schoolId) : null;
      const parsedClasses = await parseImportedTeacherClasses(fileBuffer);
      const created = [];
      const skipped = [];

      for (const teacherClass of parsedClasses) {
        try {
          if (!teacherClass.name || !teacherClass.roster.length) {
            skipped.push({ sheetName: teacherClass.sheetName, error: 'INVALID_SHEET_STRUCTURE' });
            continue;
          }
          created.push(await createTeacherClass(request.authUser.id, {
            name: teacherClass.name,
            grade,
            gender,
            schoolId,
            studentCount: teacherClass.studentCount,
            roster: teacherClass.roster,
            values: {},
          }));
        } catch (error) {
          skipped.push({ sheetName: teacherClass.sheetName, error: error.message || 'IMPORT_CLASS_FAILED' });
        }
      }

      await logAdminAction(request.authUser.id, null, created.length ? 'teacher_class_import' : 'teacher_class_import_failed', auditRequestDetails(request, {
        createdCount: created.length,
        skippedCount: skipped.length,
        skippedErrors: skipped.map((item) => item.error).filter(Boolean).slice(0, 20),
      }));
      response.status(created.length ? 201 : 400).json({ created, skipped });
    } catch (error) {
      await logAdminAction(request.authUser.id, null, 'teacher_class_import_failed', auditRequestDetails(request, { reason: error.message || 'IMPORT_FAILED' }));
      response.status(400).json({ error: error.message || 'IMPORT_FAILED' });
    }
  });
});

app.put('/api/teacher/classes/reorder', requireTeacherOrAdmin, async (request, response) => {
  const orderedIds = Array.isArray(request.body?.orderedIds) ? request.body.orderedIds.map(Number) : [];
  response.json({ classes: await reorderTeacherClasses(request.authUser.id, orderedIds) });
});

app.put('/api/teacher/classes/:classId', requireTeacherOrAdmin, async (request, response) => {
  let updated;
  try {
    updated = await updateTeacherClass(request.authUser.id, Number(request.params.classId), request.body || {});
  } catch (error) {
    if (error.message === 'SCHOOL_ACCESS_DENIED') {
      response.status(403).json({ error: 'SCHOOL_ACCESS_DENIED' });
      return;
    }
    throw error;
  }

  if (!updated) {
    response.status(404).json({ error: 'Class not found' });
    return;
  }

  response.json({ teacherClass: updated });
});

app.delete('/api/teacher/classes/:classId', requireTeacherOrAdmin, async (request, response) => {
  const deleted = await deleteTeacherClass(request.authUser.id, Number(request.params.classId));

  if (!deleted) {
    response.status(404).json({ error: 'Class not found' });
    return;
  }

  response.json({ ok: true });
});

app.post('/api/score', (request, response) => {
  const { sheetId, values, gender } = request.body || {};
  const sheets = resolveSheets(gender);
  const sheet = sheets.find((item) => item.id === sheetId);

  if (!sheet) {
    response.status(404).json({ error: 'Sheet not found' });
    return;
  }

  response.json(buildScoreResponse(sheet, values));
});

function buildSchoolScoreResponse(table, students) {
  const gradeLabels = { 1: 'א׳', 2: 'ב׳', 3: 'ג׳', 4: 'ד׳', 5: 'ה׳', 6: 'ו׳', 7: 'ז׳', 8: 'ח׳', 9: 'ט׳', 10: 'י׳', 11: 'י״א', 12: 'י״ב' };
  const genderLabels = { male: 'בנים', female: 'בנות', other: 'מעורב' };
  return {
    sheet: {
      id: `school_score_${table.id}`,
      name: `${gradeLabels[Number(table.grade)] || table.grade} ${genderLabels[table.genderGroup] || table.genderGroup}`,
    },
    students: students.map((student, index) => {
      const values = student?.values || {};
      const results = table.subjects.map((subject) => {
        const rawValue = String(values[subject.id] || '').trim();
        const matchedRow = matchSchoolScoreTableResult(table, subject.id, rawValue);
        return {
          key: subject.id,
          label: subject.name,
          enteredValue: rawValue,
          result: rawValue ? { score: matchedRow?.score ?? null, matchedValue: matchedRow?.matchedValue || rawValue } : null,
        };
      });
      const scores = results.map((item) => item.result?.score).filter((score) => Number.isFinite(score));
      return {
        studentName: student?.studentName || `תלמיד ${index + 1}`,
        averageScore: scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : null,
        results,
      };
    }),
  };
}

app.post('/api/bulk-score', requireAuth, async (request, response) => {
  if (!request.authUser.canEnterScores) {
    response.status(403).json({ error: 'SCORE_ACCESS_PENDING_APPROVAL' });
    return;
  }

  const { sheetId, students, gender, classId, semester } = request.body || {};
  const normalizedStudents = Array.isArray(students) ? students : [];
  let responseBody;
  let historyEntry = null;

  if (String(sheetId || '').startsWith('school_score_')) {
    const resolved = classId ? await getTeacherClassScoreTable(request.authUser.id, Number(classId)) : null;
    if (!resolved) {
      response.status(404).json({ error: 'CLASS_NOT_FOUND' });
      return;
    }
    if (!resolved.table) {
      response.status(404).json({ error: resolved.error || 'SCHOOL_SCORE_TABLE_NOT_FOUND' });
      return;
    }
    if (`school_score_${resolved.table.id}` !== sheetId) {
      response.status(409).json({ error: 'SCORE_TABLE_MISMATCH' });
      return;
    }
    responseBody = buildSchoolScoreResponse(resolved.table, normalizedStudents);
  } else {
    const sheets = resolveSheets(gender);
    const sheet = sheets.find((item) => item.id === sheetId);

    if (!sheet) {
      response.status(404).json({ error: 'Sheet not found' });
      return;
    }

    responseBody = {
      sheet: {
        id: sheet.id,
        name: sheet.name,
      },
      students: normalizedStudents.map((student, index) => {
        const values = student?.values || {};
        const scored = buildScoreResponse(sheet, values);

        return {
          studentName: student?.studentName || `תלמיד ${index + 1}`,
          ...scored,
          results: scored.results.map((item) => ({
            ...item,
            enteredValue: values[item.key] || '',
          })),
        };
      }),
    };
  }

  if (classId) {
    const teacherClass = await getTeacherClass(request.authUser.id, Number(classId));
    if (!teacherClass) {
      response.status(404).json({ error: 'CLASS_NOT_FOUND' });
      return;
    }

    historyEntry = await appendClassHistory(Number(classId), 'calculated', {
      semester: semester === 'b' ? 'b' : 'a',
      studentCount: normalizedStudents.length,
      rawStudents: normalizedStudents,
      students: responseBody.students.map((student) => ({
        studentName: student.studentName,
        averageScore: student.averageScore,
        results: student.results,
      })),
    });
  }

  response.json({ ...responseBody, historyEntry });
});

app.listen(port, () => {
  console.log(`Score site running at http://localhost:${port}`);
});
