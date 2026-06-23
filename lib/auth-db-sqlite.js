const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const databasePath = process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'auth.db');
fs.mkdirSync(path.dirname(databasePath), { recursive: true });
const db = new Database(databasePath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('teacher', 'admin')),
    full_name TEXT NOT NULL,
    first_name TEXT NOT NULL DEFAULT '',
    last_name TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL DEFAULT '',
    school_name TEXT NOT NULL DEFAULT '',
    must_change_password INTEGER NOT NULL DEFAULT 0,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS teacher_classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    grade TEXT NOT NULL,
    gender TEXT NOT NULL CHECK(gender IN ('male', 'female')),
    order_index INTEGER NOT NULL DEFAULT 0,
    student_count INTEGER NOT NULL,
    roster_json TEXT NOT NULL,
    values_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS teacher_class_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER NOT NULL,
    event_type TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES teacher_classes(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS graph_snapshots (
    id TEXT PRIMARY KEY,
    payload_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_user_id INTEGER,
    target_user_id INTEGER,
    action TEXT NOT NULL,
    details_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

const teacherClassesInfo = db.prepare('PRAGMA table_info(teacher_classes)').all();
if (!teacherClassesInfo.some((column) => column.name === 'order_index')) {
  db.exec('ALTER TABLE teacher_classes ADD COLUMN order_index INTEGER NOT NULL DEFAULT 0');
}

const usersInfo = db.prepare('PRAGMA table_info(users)').all();
if (!usersInfo.some((column) => column.name === 'phone')) {
  db.exec("ALTER TABLE users ADD COLUMN phone TEXT NOT NULL DEFAULT ''");
}
if (!usersInfo.some((column) => column.name === 'city')) {
  db.exec("ALTER TABLE users ADD COLUMN city TEXT NOT NULL DEFAULT ''");
}
if (!usersInfo.some((column) => column.name === 'school_name')) {
  db.exec("ALTER TABLE users ADD COLUMN school_name TEXT NOT NULL DEFAULT ''");
}
if (!usersInfo.some((column) => column.name === 'first_name')) {
  db.exec("ALTER TABLE users ADD COLUMN first_name TEXT NOT NULL DEFAULT ''");
}
if (!usersInfo.some((column) => column.name === 'last_name')) {
  db.exec("ALTER TABLE users ADD COLUMN last_name TEXT NOT NULL DEFAULT ''");
}
if (!usersInfo.some((column) => column.name === 'must_change_password')) {
  db.exec('ALTER TABLE users ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0');
}
db.prepare(`
  UPDATE users
  SET first_name = CASE
      WHEN instr(trim(full_name), ' ') > 0 THEN substr(trim(full_name), 1, instr(trim(full_name), ' ') - 1)
      ELSE trim(full_name)
    END,
    last_name = CASE
      WHEN instr(trim(full_name), ' ') > 0 THEN trim(substr(trim(full_name), instr(trim(full_name), ' ') + 1))
      ELSE ''
    END
  WHERE first_name = ''
`).run();

function nowIso() {
  return new Date().toISOString();
}

function seedGlobalAdmin() {
  const email = 'admin@edufitscore.co.il';
  const firstName = 'Global';
  const lastName = 'Admin';
  const timestamp = nowIso();
  const passwordHash = bcrypt.hashSync('12345678', 10);
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

  if (existing) {
    db.prepare(`
      UPDATE users
      SET password_hash = ?, role = 'admin', full_name = ?, first_name = ?, last_name = ?, must_change_password = 1, is_active = 1, updated_at = ?
      WHERE id = ?
    `).run(passwordHash, `${firstName} ${lastName}`, firstName, lastName, timestamp, existing.id);
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(existing.id);
    return;
  }

  db.prepare(`
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, must_change_password, is_active, created_at, updated_at)
    VALUES (?, ?, 'admin', ?, ?, ?, 1, 1, ?, ?)
  `).run(email, passwordHash, `${firstName} ${lastName}`, firstName, lastName, timestamp, timestamp);
}

db.prepare("DELETE FROM users WHERE email IN ('teacher@edufitscore.local', 'admin@edufitscore.local')").run();
seedGlobalAdmin();

function serializeUser(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    role: row.role,
    firstName: row.first_name || '',
    lastName: row.last_name || '',
    fullName: row.full_name || `${row.first_name || ''} ${row.last_name || ''}`.trim(),
    phone: row.phone || '',
    city: row.city || '',
    schoolName: row.school_name || '',
    mustChangePassword: Boolean(row.must_change_password),
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function findUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1').get(String(email).trim().toLowerCase());
}

function findAnyUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(String(email).trim().toLowerCase());
}

function verifyUser(email, password) {
  const user = findUserByEmail(email);

  if (!user) {
    return null;
  }

  return bcrypt.compareSync(password, user.password_hash) ? serializeUser(user) : null;
}

function createUser(payload) {
  const email = String(payload.email || '').trim().toLowerCase();

  if (!email || !payload.password || !payload.firstName || !payload.lastName) {
    throw new Error('MISSING_REQUIRED_FIELDS');
  }

  validateAccountPayload({ ...payload, email });

  const existingUser = findAnyUserByEmail(email);

  if (existingUser?.is_active) {
    throw new Error('EMAIL_EXISTS');
  }

  if (existingUser && !existingUser.is_active) {
    throw new Error('ACCOUNT_INACTIVE');
  }

  const timestamp = nowIso();
  const passwordHash = bcrypt.hashSync(payload.password, 10);
  const result = db.prepare(`
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, is_active, created_at, updated_at)
    VALUES (?, ?, 'teacher', ?, ?, ?, ?, ?, ?, 1, ?, ?)
  `).run(
    email,
    passwordHash,
    `${String(payload.firstName || '').trim()} ${String(payload.lastName || '').trim()}`.trim(),
    String(payload.firstName || '').trim(),
    String(payload.lastName || '').trim(),
    String(payload.phone || '').trim(),
    String(payload.city || '').trim(),
    String(payload.schoolName || '').trim(),
    timestamp,
    timestamp
  );

  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  return serializeUser(row);
}

function updateUserProfile(userId, payload) {
  const email = String(payload.email || '').trim().toLowerCase();
  validateAccountPayload({ ...payload, email });
  const existingEmail = db.prepare('SELECT id FROM users WHERE email = ? AND id != ? AND is_active = 1').get(email, userId);

  if (existingEmail) {
    throw new Error('EMAIL_EXISTS');
  }

  db.prepare(`
    UPDATE users
    SET email = ?, full_name = ?, first_name = ?, last_name = ?, phone = ?, city = ?, school_name = ?, updated_at = ?
    WHERE id = ? AND is_active = 1
  `).run(
    email,
    `${String(payload.firstName || '').trim()} ${String(payload.lastName || '').trim()}`.trim(),
    String(payload.firstName || '').trim(),
    String(payload.lastName || '').trim(),
    String(payload.phone || '').trim(),
    String(payload.city || '').trim(),
    String(payload.schoolName || '').trim(),
    nowIso(),
    userId
  );

  const row = db.prepare('SELECT * FROM users WHERE id = ? AND is_active = 1').get(userId);
  return serializeUser(row);
}

function validateAccountPayload(payload) {
  const namePattern = /^[\p{L} ]+$/u;

  if (!namePattern.test(String(payload.firstName || '').trim()) || !namePattern.test(String(payload.lastName || '').trim())) {
    throw new Error('INVALID_NAME');
  }

  if (!String(payload.email || '').includes('@')) {
    throw new Error('INVALID_EMAIL');
  }

  if (!/^[0-9+*#]+$/.test(String(payload.phone || '').trim())) {
    throw new Error('INVALID_PHONE');
  }
}

function changeUserPassword(userId, oldPassword, newPassword) {
  const row = db.prepare('SELECT * FROM users WHERE id = ? AND is_active = 1').get(userId);

  if (!row || !bcrypt.compareSync(oldPassword || '', row.password_hash)) {
    throw new Error('INVALID_PASSWORD');
  }

  db.prepare('UPDATE users SET password_hash = ?, must_change_password = 0, updated_at = ? WHERE id = ?').run(
    bcrypt.hashSync(newPassword, 10),
    nowIso(),
    userId
  );
}

function deactivateUser(userId, password) {
  const row = db.prepare('SELECT * FROM users WHERE id = ? AND is_active = 1').get(userId);

  if (!row || !bcrypt.compareSync(password || '', row.password_hash)) {
    throw new Error('INVALID_PASSWORD');
  }

  db.prepare('UPDATE users SET is_active = 0, updated_at = ? WHERE id = ?').run(nowIso(), userId);
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
}

function listInactiveUsers() {
  return db.prepare(`
    SELECT *
    FROM users
    WHERE is_active = 0
    ORDER BY updated_at DESC, id DESC
  `).all().map(serializeUser);
}

function listUsers() {
  return db.prepare(`
    SELECT *
    FROM users
    ORDER BY is_active DESC, updated_at DESC, id DESC
  `).all().map(serializeUser);
}

function restoreUserByEmail(email) {
  const row = findAnyUserByEmail(email);

  if (!row) {
    throw new Error('USER_NOT_FOUND');
  }

  db.prepare('UPDATE users SET is_active = 1, updated_at = ? WHERE id = ?').run(nowIso(), row.id);
  const restored = db.prepare('SELECT * FROM users WHERE id = ?').get(row.id);
  return serializeUser(restored);
}

function setUserActive(userId, isActive) {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

  if (!row) {
    throw new Error('USER_NOT_FOUND');
  }

  db.prepare('UPDATE users SET is_active = ?, updated_at = ? WHERE id = ?').run(isActive ? 1 : 0, nowIso(), userId);

  if (!isActive) {
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
  }

  return serializeUser(db.prepare('SELECT * FROM users WHERE id = ?').get(userId));
}

function adminResetUserPassword(userId, newPassword, currentSessionToken = '') {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

  if (!row) {
    throw new Error('USER_NOT_FOUND');
  }

  if (!newPassword || String(newPassword).length < 6) {
    throw new Error('INVALID_PASSWORD');
  }

  db.prepare('UPDATE users SET password_hash = ?, must_change_password = 1, updated_at = ? WHERE id = ?').run(
    bcrypt.hashSync(String(newPassword), 10),
    nowIso(),
    userId
  );
  if (currentSessionToken) {
    db.prepare('DELETE FROM sessions WHERE user_id = ? AND token != ?').run(userId, currentSessionToken);
  } else {
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
  }

  return serializeUser(db.prepare('SELECT * FROM users WHERE id = ?').get(userId));
}

function hashPasswordResetToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

function createPasswordResetToken(email) {
  deleteExpiredPasswordResetTokens();
  const row = findUserByEmail(email);

  if (!row) {
    return null;
  }

  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashPasswordResetToken(token);
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 60)).toISOString();

  db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ?').run(row.id);
  db.prepare(`
    INSERT INTO password_reset_tokens (token_hash, user_id, expires_at, created_at)
    VALUES (?, ?, ?, ?)
  `).run(tokenHash, row.id, expiresAt, createdAt);

  return { token, expiresAt, user: serializeUser(row) };
}

function resetPasswordWithToken(token, newPassword) {
  deleteExpiredPasswordResetTokens();

  if (!token || !newPassword || String(newPassword).length < 6) {
    throw new Error('INVALID_RESET');
  }

  const tokenHash = hashPasswordResetToken(token);
  const row = db.prepare(`
    SELECT password_reset_tokens.*, users.id AS user_id
    FROM password_reset_tokens
    JOIN users ON users.id = password_reset_tokens.user_id
    WHERE password_reset_tokens.token_hash = ?
      AND password_reset_tokens.used_at IS NULL
      AND password_reset_tokens.expires_at > ?
      AND users.is_active = 1
  `).get(tokenHash, nowIso());

  if (!row) {
    throw new Error('INVALID_RESET');
  }

  db.prepare('UPDATE password_reset_tokens SET used_at = ? WHERE token_hash = ?').run(nowIso(), tokenHash);
  db.prepare('UPDATE users SET password_hash = ?, must_change_password = 0, updated_at = ? WHERE id = ?').run(
    bcrypt.hashSync(String(newPassword), 10),
    nowIso(),
    row.user_id
  );
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(row.user_id);
}

function deleteExpiredPasswordResetTokens() {
  db.prepare('DELETE FROM password_reset_tokens WHERE expires_at <= ? OR used_at IS NOT NULL').run(nowIso());
}

function saveGraphSnapshot(id, snapshot) {
  db.prepare('DELETE FROM graph_snapshots WHERE created_at < ?').run(new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)).toISOString());
  db.prepare(`
    INSERT OR REPLACE INTO graph_snapshots (id, payload_json, created_at)
    VALUES (?, ?, ?)
  `).run(id, JSON.stringify(snapshot), nowIso());
}

function getGraphSnapshot(id) {
  const cutoff = new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)).toISOString();
  db.prepare('DELETE FROM graph_snapshots WHERE created_at < ?').run(cutoff);
  const row = db.prepare('SELECT payload_json FROM graph_snapshots WHERE id = ? AND created_at >= ?').get(id, cutoff);

  if (!row) {
    return null;
  }

  return JSON.parse(row.payload_json);
}

function logAdminAction(adminUserId, targetUserId, action, details = {}) {
  db.prepare(`
    INSERT INTO admin_audit_log (admin_user_id, target_user_id, action, details_json, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(adminUserId || null, targetUserId || null, action, JSON.stringify(details), nowIso());
}

function listAdminAuditLog(limit = 50) {
  return db.prepare(`
    SELECT
      admin_audit_log.*,
      admin.email AS admin_email,
      admin.full_name AS admin_name,
      target.email AS target_email,
      target.full_name AS target_name
    FROM admin_audit_log
    LEFT JOIN users admin ON admin.id = admin_audit_log.admin_user_id
    LEFT JOIN users target ON target.id = admin_audit_log.target_user_id
    ORDER BY admin_audit_log.created_at DESC
    LIMIT ?
  `).all(limit).map((row) => ({
    id: row.id,
    action: row.action,
    adminEmail: row.admin_email || '',
    adminName: row.admin_name || '',
    targetEmail: row.target_email || '',
    targetName: row.target_name || '',
    details: JSON.parse(row.details_json || '{}'),
    createdAt: row.created_at,
  }));
}

function exportBackupData() {
  return {
    exportedAt: nowIso(),
    users: db.prepare('SELECT id, email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, must_change_password, is_active, created_at, updated_at FROM users ORDER BY id').all(),
    teacherClasses: db.prepare('SELECT * FROM teacher_classes ORDER BY user_id, order_index, id').all(),
    teacherClassHistory: db.prepare('SELECT * FROM teacher_class_history ORDER BY class_id, created_at, id').all(),
    adminAuditLog: db.prepare('SELECT * FROM admin_audit_log ORDER BY created_at DESC, id DESC').all(),
    graphSnapshots: db.prepare('SELECT * FROM graph_snapshots ORDER BY created_at DESC').all(),
    passwordResetTokens: db.prepare('SELECT * FROM password_reset_tokens ORDER BY created_at DESC').all(),
  };
}

function restoreBackupData(backup, adminUserId = null) {
  if (!backup || !Array.isArray(backup.users) || !Array.isArray(backup.teacherClasses) || !Array.isArray(backup.teacherClassHistory)) {
    throw new Error('INVALID_BACKUP');
  }

  const restore = db.transaction(() => {
    db.prepare('DELETE FROM teacher_class_history').run();
    db.prepare('DELETE FROM teacher_classes').run();
    db.prepare('DELETE FROM password_reset_tokens').run();
    db.prepare('DELETE FROM graph_snapshots').run();
    db.prepare('DELETE FROM admin_audit_log').run();
    db.prepare('DELETE FROM users').run();

    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, must_change_password, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    backup.users.forEach((user) => {
      const fullName = user.full_name || user.fullName || `${user.first_name || user.firstName || ''} ${user.last_name || user.lastName || ''}`.trim() || user.email || 'User';
      const firstName = user.first_name || user.firstName || fullName.split(' ')[0] || fullName;
      const lastName = user.last_name || user.lastName || fullName.split(' ').slice(1).join(' ') || '';
      insertUser.run(
        user.id,
        user.email,
        user.password_hash || bcrypt.hashSync(crypto.randomBytes(12).toString('hex'), 10),
        user.role,
        fullName,
        firstName,
        lastName,
        user.phone || '',
        user.city || '',
        user.school_name || user.schoolName || '',
        user.must_change_password || user.mustChangePassword ? 1 : 0,
        user.is_active === undefined ? (user.isActive === false ? 0 : 1) : (user.is_active ? 1 : 0),
        user.created_at || user.createdAt || nowIso(),
        user.updated_at || user.updatedAt || nowIso()
      );
    });

    const insertClass = db.prepare(`
      INSERT INTO teacher_classes (id, user_id, name, grade, gender, order_index, student_count, roster_json, values_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    backup.teacherClasses.forEach((teacherClass) => {
      insertClass.run(
        teacherClass.id,
        teacherClass.user_id || teacherClass.userId,
        teacherClass.name,
        teacherClass.grade,
        teacherClass.gender,
        teacherClass.order_index || teacherClass.orderIndex || 0,
        teacherClass.student_count || teacherClass.studentCount,
        teacherClass.roster_json || JSON.stringify(teacherClass.roster || []),
        teacherClass.values_json || JSON.stringify(teacherClass.values || {}),
        teacherClass.created_at || teacherClass.createdAt || nowIso(),
        teacherClass.updated_at || teacherClass.updatedAt || nowIso()
      );
    });

    const insertHistory = db.prepare(`
      INSERT INTO teacher_class_history (id, class_id, event_type, payload_json, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    backup.teacherClassHistory.forEach((entry) => {
      insertHistory.run(
        entry.id,
        entry.class_id || entry.classId,
        entry.event_type || entry.eventType || 'calculated',
        entry.payload_json || JSON.stringify(entry.payload || {}),
        entry.created_at || entry.createdAt || nowIso()
      );
    });

    const insertSnapshot = db.prepare('INSERT OR REPLACE INTO graph_snapshots (id, payload_json, created_at) VALUES (?, ?, ?)');
    (backup.graphSnapshots || []).forEach((snapshot) => {
      insertSnapshot.run(snapshot.id, snapshot.payload_json || JSON.stringify(snapshot.payload || snapshot.snapshot || {}), snapshot.created_at || snapshot.createdAt || nowIso());
    });

    const insertResetToken = db.prepare('INSERT OR REPLACE INTO password_reset_tokens (token_hash, user_id, expires_at, used_at, created_at) VALUES (?, ?, ?, ?, ?)');
    (backup.passwordResetTokens || []).forEach((token) => {
      insertResetToken.run(token.token_hash || token.tokenHash, token.user_id || token.userId, token.expires_at || token.expiresAt, token.used_at || token.usedAt || null, token.created_at || token.createdAt || nowIso());
    });

    const insertAudit = db.prepare(`
      INSERT INTO admin_audit_log (id, admin_user_id, target_user_id, action, details_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    (backup.adminAuditLog || []).forEach((entry) => {
      insertAudit.run(entry.id, entry.admin_user_id || entry.adminUserId || null, entry.target_user_id || entry.targetUserId || null, entry.action, entry.details_json || JSON.stringify(entry.details || {}), entry.created_at || entry.createdAt || nowIso());
    });

    db.prepare(`
      INSERT INTO admin_audit_log (admin_user_id, target_user_id, action, details_json, created_at)
      VALUES (?, NULL, 'restore_backup', ?, ?)
    `).run(adminUserId, JSON.stringify({ users: backup.users.length, classes: backup.teacherClasses.length, historyRecords: backup.teacherClassHistory.length }), nowIso());
  });

  restore();
  return {
    users: backup.users.length,
    classes: backup.teacherClasses.length,
    historyRecords: backup.teacherClassHistory.length,
    graphSnapshots: (backup.graphSnapshots || []).length,
  };
}

function getAdminDiagnostics() {
  return {
    users: db.prepare('SELECT COUNT(*) AS count FROM users').get().count,
    activeUsers: db.prepare('SELECT COUNT(*) AS count FROM users WHERE is_active = 1').get().count,
    inactiveUsers: db.prepare('SELECT COUNT(*) AS count FROM users WHERE is_active = 0').get().count,
    classes: db.prepare('SELECT COUNT(*) AS count FROM teacher_classes').get().count,
    historyRecords: db.prepare('SELECT COUNT(*) AS count FROM teacher_class_history').get().count,
    graphSnapshots: db.prepare('SELECT COUNT(*) AS count FROM graph_snapshots').get().count,
    latestBackup: db.prepare("SELECT created_at FROM admin_audit_log WHERE action = 'export_backup' ORDER BY created_at DESC LIMIT 1").get()?.created_at || '',
  };
}

function createSession(userId) {
  deleteExpiredSessions();

  const token = crypto.randomBytes(32).toString('hex');
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)).toISOString();

  db.prepare(`
    INSERT INTO sessions (token, user_id, expires_at, created_at)
    VALUES (?, ?, ?, ?)
  `).run(token, userId, expiresAt, createdAt);

  return { token, expiresAt };
}

function deleteExpiredSessions() {
  db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(nowIso());
}

function findUserBySessionToken(token) {
  if (!token) {
    return null;
  }

  deleteExpiredSessions();

  const row = db.prepare(`
    SELECT users.*
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = ?
      AND sessions.expires_at > ?
      AND users.is_active = 1
  `).get(token, nowIso());

  return serializeUser(row);
}

function deleteSession(token) {
  if (!token) {
    return;
  }

  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

function parseJson(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function listTeacherClasses(userId) {
  const rows = db.prepare(`
    SELECT *
    FROM teacher_classes
    WHERE user_id = ?
    ORDER BY order_index ASC, updated_at DESC, id DESC
  `).all(userId);

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    grade: row.grade,
    gender: row.gender,
    orderIndex: row.order_index,
    studentCount: row.student_count,
    roster: parseJson(row.roster_json, []),
    values: parseJson(row.values_json, {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

function getTeacherClass(userId, classId) {
  const row = db.prepare(`
    SELECT *
    FROM teacher_classes
    WHERE user_id = ? AND id = ?
  `).get(userId, classId);

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    grade: row.grade,
    gender: row.gender,
    orderIndex: row.order_index,
    studentCount: row.student_count,
    roster: parseJson(row.roster_json, []),
    values: parseJson(row.values_json, {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function createTeacherClass(userId, payload) {
  const count = db.prepare('SELECT COUNT(*) AS count FROM teacher_classes WHERE user_id = ?').get(userId).count;

  if (count >= 18) {
    throw new Error('CLASS_LIMIT_REACHED');
  }

  const timestamp = nowIso();
  const maxOrder = db.prepare('SELECT COALESCE(MAX(order_index), -1) AS max_order FROM teacher_classes WHERE user_id = ?').get(userId).max_order;
  const studentCount = Number(payload.studentCount);
  const roster = Array.isArray(payload.roster) ? payload.roster : [];
  const values = payload.values && typeof payload.values === 'object' ? payload.values : {};

  const result = db.prepare(`
    INSERT INTO teacher_classes (user_id, name, grade, gender, order_index, student_count, roster_json, values_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    payload.name,
    payload.grade,
    payload.gender,
    Number(maxOrder) + 1,
    studentCount,
    JSON.stringify(roster),
    JSON.stringify(values),
    timestamp,
    timestamp
  );

  appendClassHistory(result.lastInsertRowid, 'created', { name: payload.name, grade: payload.grade, gender: payload.gender, studentCount });
  return getTeacherClass(userId, result.lastInsertRowid);
}

function updateTeacherClass(userId, classId, payload) {
  const existing = getTeacherClass(userId, classId);

  if (!existing) {
    return null;
  }

  const timestamp = nowIso();
  const studentCount = Number(payload.studentCount ?? existing.studentCount);
  const roster = Array.isArray(payload.roster) ? payload.roster : existing.roster;
  const values = payload.values && typeof payload.values === 'object' ? payload.values : existing.values;

  db.prepare(`
    UPDATE teacher_classes
    SET name = ?, grade = ?, gender = ?, student_count = ?, roster_json = ?, values_json = ?, updated_at = ?
    WHERE user_id = ? AND id = ?
  `).run(
    payload.name ?? existing.name,
    payload.grade ?? existing.grade,
    payload.gender ?? existing.gender,
    studentCount,
    JSON.stringify(roster),
    JSON.stringify(values),
    timestamp,
    userId,
    classId
  );

  appendClassHistory(classId, 'updated', {
    name: payload.name ?? existing.name,
    grade: payload.grade ?? existing.grade,
    gender: payload.gender ?? existing.gender,
    studentCount,
  });

  return getTeacherClass(userId, classId);
}

function deleteTeacherClass(userId, classId) {
  const existing = getTeacherClass(userId, classId);

  if (!existing) {
    return false;
  }

  db.prepare('DELETE FROM teacher_classes WHERE user_id = ? AND id = ?').run(userId, classId);
  return true;
}

function reorderTeacherClasses(userId, orderedIds) {
  const update = db.prepare('UPDATE teacher_classes SET order_index = ? WHERE user_id = ? AND id = ?');
  const transaction = db.transaction((ids) => {
    ids.forEach((classId, index) => {
      update.run(index, userId, classId);
    });
  });
  transaction(orderedIds);
  return listTeacherClasses(userId);
}

function appendClassHistory(classId, eventType, payload) {
  db.prepare(`
    INSERT INTO teacher_class_history (class_id, event_type, payload_json, created_at)
    VALUES (?, ?, ?, ?)
  `).run(classId, eventType, JSON.stringify(payload || {}), nowIso());
}

function listTeacherClassHistory(classId) {
  return db.prepare(`
    SELECT *
    FROM teacher_class_history
    WHERE class_id = ?
    ORDER BY id DESC
  `).all(classId).map((row) => ({
    id: row.id,
    eventType: row.event_type,
    payload: parseJson(row.payload_json, {}),
    createdAt: row.created_at,
  }));
}

function deleteTeacherClassHistory(userId, classId, historyId) {
  const teacherClass = getTeacherClass(userId, classId);

  if (!teacherClass) {
    return false;
  }

  const result = db.prepare(`
    DELETE FROM teacher_class_history
    WHERE class_id = ? AND id = ?
  `).run(classId, historyId);

  return result.changes > 0;
}

module.exports = {
  verifyUser,
  createUser,
  updateUserProfile,
  changeUserPassword,
  deactivateUser,
  listUsers,
  listInactiveUsers,
  restoreUserByEmail,
  setUserActive,
  adminResetUserPassword,
  createPasswordResetToken,
  resetPasswordWithToken,
  saveGraphSnapshot,
  getGraphSnapshot,
  logAdminAction,
  listAdminAuditLog,
  exportBackupData,
  restoreBackupData,
  getAdminDiagnostics,
  createSession,
  findUserBySessionToken,
  deleteSession,
  listTeacherClasses,
  getTeacherClass,
  createTeacherClass,
  updateTeacherClass,
  deleteTeacherClass,
  reorderTeacherClasses,
  listTeacherClassHistory,
  deleteTeacherClassHistory,
  appendClassHistory,
};
