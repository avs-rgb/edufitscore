const crypto = require('crypto');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
});

function nowIso() {
  return new Date().toISOString();
}

async function query(text, params = []) {
  return pool.query(text, params);
}

async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function initSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
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
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS teacher_classes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      grade TEXT NOT NULL,
      gender TEXT NOT NULL CHECK(gender IN ('male', 'female')),
      order_index INTEGER NOT NULL DEFAULT 0,
      student_count INTEGER NOT NULL,
      roster_json TEXT NOT NULL,
      values_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS teacher_class_history (
      id SERIAL PRIMARY KEY,
      class_id INTEGER NOT NULL REFERENCES teacher_classes(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS graph_snapshots (
      id TEXT PRIMARY KEY,
      payload_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_audit_log (
      id SERIAL PRIMARY KEY,
      admin_user_id INTEGER,
      target_user_id INTEGER,
      action TEXT NOT NULL,
      details_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      token_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL
    );
  `);
  await query("DELETE FROM users WHERE email IN ('teacher@edufitscore.local', 'admin@edufitscore.local')");
  await seedGlobalAdmin();
}

const ready = initSchema();

async function readyQuery(text, params = []) {
  await ready;
  return query(text, params);
}

async function readyTransaction(callback) {
  await ready;
  return transaction(callback);
}

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

async function seedGlobalAdmin() {
  const email = 'admin@edufitscore.co.il';
  const firstName = 'Global';
  const lastName = 'Admin';
  const timestamp = nowIso();
  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);

  if (existing.rows[0]) {
    await query(`
      UPDATE users
      SET role = 'admin', full_name = $1, first_name = $2, last_name = $3, is_active = 1, updated_at = $4
      WHERE id = $5
    `, [`${firstName} ${lastName}`, firstName, lastName, timestamp, existing.rows[0].id]);
    return;
  }

  await query(`
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, must_change_password, is_active, created_at, updated_at)
    VALUES ($1, $2, 'admin', $3, $4, $5, 1, 1, $6, $7)
  `, [email, bcrypt.hashSync('12345678', 10), `${firstName} ${lastName}`, firstName, lastName, timestamp, timestamp]);
}

async function findUserByEmail(email) {
  const result = await readyQuery('SELECT * FROM users WHERE email = $1 AND is_active = 1', [String(email).trim().toLowerCase()]);
  return result.rows[0];
}

async function findAnyUserByEmail(email) {
  const result = await readyQuery('SELECT * FROM users WHERE email = $1', [String(email).trim().toLowerCase()]);
  return result.rows[0];
}

async function verifyUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }
  return bcrypt.compareSync(password, user.password_hash) ? serializeUser(user) : null;
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

async function createUser(payload) {
  const email = String(payload.email || '').trim().toLowerCase();
  if (!email || !payload.password || !payload.firstName || !payload.lastName) {
    throw new Error('MISSING_REQUIRED_FIELDS');
  }
  validateAccountPayload({ ...payload, email });
  const existingUser = await findAnyUserByEmail(email);
  if (existingUser?.is_active) {
    throw new Error('EMAIL_EXISTS');
  }
  if (existingUser && !existingUser.is_active) {
    throw new Error('ACCOUNT_INACTIVE');
  }
  const timestamp = nowIso();
  const firstName = String(payload.firstName || '').trim();
  const lastName = String(payload.lastName || '').trim();
  const result = await readyQuery(`
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, is_active, created_at, updated_at)
    VALUES ($1, $2, 'teacher', $3, $4, $5, $6, $7, $8, 1, $9, $10)
    RETURNING *
  `, [email, bcrypt.hashSync(payload.password, 10), `${firstName} ${lastName}`.trim(), firstName, lastName, String(payload.phone || '').trim(), String(payload.city || '').trim(), String(payload.schoolName || '').trim(), timestamp, timestamp]);
  return serializeUser(result.rows[0]);
}

async function updateUserProfile(userId, payload) {
  const email = String(payload.email || '').trim().toLowerCase();
  validateAccountPayload({ ...payload, email });
  const existingEmail = await readyQuery('SELECT id FROM users WHERE email = $1 AND id != $2 AND is_active = 1', [email, userId]);
  if (existingEmail.rows[0]) {
    throw new Error('EMAIL_EXISTS');
  }
  const firstName = String(payload.firstName || '').trim();
  const lastName = String(payload.lastName || '').trim();
  const result = await readyQuery(`
    UPDATE users
    SET email = $1, full_name = $2, first_name = $3, last_name = $4, phone = $5, city = $6, school_name = $7, updated_at = $8
    WHERE id = $9 AND is_active = 1
    RETURNING *
  `, [email, `${firstName} ${lastName}`.trim(), firstName, lastName, String(payload.phone || '').trim(), String(payload.city || '').trim(), String(payload.schoolName || '').trim(), nowIso(), userId]);
  return serializeUser(result.rows[0]);
}

async function changeUserPassword(userId, oldPassword, newPassword) {
  const result = await readyQuery('SELECT * FROM users WHERE id = $1 AND is_active = 1', [userId]);
  const row = result.rows[0];
  if (!row || !bcrypt.compareSync(oldPassword || '', row.password_hash)) {
    throw new Error('INVALID_PASSWORD');
  }
  await readyQuery('UPDATE users SET password_hash = $1, must_change_password = 0, updated_at = $2 WHERE id = $3', [bcrypt.hashSync(newPassword, 10), nowIso(), userId]);
}

async function deactivateUser(userId, password) {
  const result = await readyQuery('SELECT * FROM users WHERE id = $1 AND is_active = 1', [userId]);
  const row = result.rows[0];
  if (!row || !bcrypt.compareSync(password || '', row.password_hash)) {
    throw new Error('INVALID_PASSWORD');
  }
  await readyQuery('UPDATE users SET is_active = 0, updated_at = $1 WHERE id = $2', [nowIso(), userId]);
  await readyQuery('DELETE FROM sessions WHERE user_id = $1', [userId]);
}

async function listInactiveUsers() {
  const result = await readyQuery('SELECT * FROM users WHERE is_active = 0 ORDER BY updated_at DESC, id DESC');
  return result.rows.map(serializeUser);
}

async function listUsers() {
  const result = await readyQuery('SELECT * FROM users ORDER BY is_active DESC, updated_at DESC, id DESC');
  return result.rows.map(serializeUser);
}

async function restoreUserByEmail(email) {
  const row = await findAnyUserByEmail(email);
  if (!row) {
    throw new Error('USER_NOT_FOUND');
  }
  const result = await readyQuery('UPDATE users SET is_active = 1, updated_at = $1 WHERE id = $2 RETURNING *', [nowIso(), row.id]);
  return serializeUser(result.rows[0]);
}

async function setUserActive(userId, isActive) {
  const existing = await readyQuery('SELECT * FROM users WHERE id = $1', [userId]);
  if (!existing.rows[0]) {
    throw new Error('USER_NOT_FOUND');
  }
  const result = await readyQuery('UPDATE users SET is_active = $1, updated_at = $2 WHERE id = $3 RETURNING *', [isActive ? 1 : 0, nowIso(), userId]);
  if (!isActive) {
    await readyQuery('DELETE FROM sessions WHERE user_id = $1', [userId]);
  }
  return serializeUser(result.rows[0]);
}

async function adminResetUserPassword(userId, newPassword, currentSessionToken = '') {
  const existing = await readyQuery('SELECT * FROM users WHERE id = $1', [userId]);
  if (!existing.rows[0]) {
    throw new Error('USER_NOT_FOUND');
  }
  if (!newPassword || String(newPassword).length < 6) {
    throw new Error('INVALID_PASSWORD');
  }
  const result = await readyQuery('UPDATE users SET password_hash = $1, must_change_password = 1, updated_at = $2 WHERE id = $3 RETURNING *', [bcrypt.hashSync(String(newPassword), 10), nowIso(), userId]);
  if (currentSessionToken) {
    await readyQuery('DELETE FROM sessions WHERE user_id = $1 AND token != $2', [userId, currentSessionToken]);
  } else {
    await readyQuery('DELETE FROM sessions WHERE user_id = $1', [userId]);
  }
  return serializeUser(result.rows[0]);
}

function hashPasswordResetToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

async function deleteExpiredPasswordResetTokens() {
  await readyQuery('DELETE FROM password_reset_tokens WHERE expires_at <= $1 OR used_at IS NOT NULL', [nowIso()]);
}

async function createPasswordResetToken(email) {
  await deleteExpiredPasswordResetTokens();
  const row = await findUserByEmail(email);
  if (!row) {
    return null;
  }
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashPasswordResetToken(token);
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 60)).toISOString();
  await readyQuery('DELETE FROM password_reset_tokens WHERE user_id = $1', [row.id]);
  await readyQuery('INSERT INTO password_reset_tokens (token_hash, user_id, expires_at, created_at) VALUES ($1, $2, $3, $4)', [tokenHash, row.id, expiresAt, createdAt]);
  return { token, expiresAt, user: serializeUser(row) };
}

async function resetPasswordWithToken(token, newPassword) {
  await deleteExpiredPasswordResetTokens();
  if (!token || !newPassword || String(newPassword).length < 6) {
    throw new Error('INVALID_RESET');
  }
  const tokenHash = hashPasswordResetToken(token);
  const result = await readyQuery(`
    SELECT password_reset_tokens.*, users.id AS user_id
    FROM password_reset_tokens
    JOIN users ON users.id = password_reset_tokens.user_id
    WHERE password_reset_tokens.token_hash = $1
      AND password_reset_tokens.used_at IS NULL
      AND password_reset_tokens.expires_at > $2
      AND users.is_active = 1
  `, [tokenHash, nowIso()]);
  const row = result.rows[0];
  if (!row) {
    throw new Error('INVALID_RESET');
  }
  await readyQuery('UPDATE password_reset_tokens SET used_at = $1 WHERE token_hash = $2', [nowIso(), tokenHash]);
  await readyQuery('UPDATE users SET password_hash = $1, must_change_password = 0, updated_at = $2 WHERE id = $3', [bcrypt.hashSync(String(newPassword), 10), nowIso(), row.user_id]);
  await readyQuery('DELETE FROM sessions WHERE user_id = $1', [row.user_id]);
}

async function saveGraphSnapshot(id, snapshot) {
  await readyQuery('DELETE FROM graph_snapshots WHERE created_at < $1', [new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)).toISOString()]);
  await readyQuery(`
    INSERT INTO graph_snapshots (id, payload_json, created_at)
    VALUES ($1, $2, $3)
    ON CONFLICT (id) DO UPDATE SET payload_json = EXCLUDED.payload_json, created_at = EXCLUDED.created_at
  `, [id, JSON.stringify(snapshot), nowIso()]);
}

async function getGraphSnapshot(id) {
  const cutoff = new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)).toISOString();
  await readyQuery('DELETE FROM graph_snapshots WHERE created_at < $1', [cutoff]);
  const result = await readyQuery('SELECT payload_json FROM graph_snapshots WHERE id = $1 AND created_at >= $2', [id, cutoff]);
  return result.rows[0] ? JSON.parse(result.rows[0].payload_json) : null;
}

async function logAdminAction(adminUserId, targetUserId, action, details = {}) {
  await readyQuery('INSERT INTO admin_audit_log (admin_user_id, target_user_id, action, details_json, created_at) VALUES ($1, $2, $3, $4, $5)', [adminUserId || null, targetUserId || null, action, JSON.stringify(details), nowIso()]);
}

async function listAdminAuditLog(limit = 50) {
  const result = await readyQuery(`
    SELECT admin_audit_log.*, admin.email AS admin_email, admin.full_name AS admin_name, target.email AS target_email, target.full_name AS target_name
    FROM admin_audit_log
    LEFT JOIN users admin ON admin.id = admin_audit_log.admin_user_id
    LEFT JOIN users target ON target.id = admin_audit_log.target_user_id
    ORDER BY admin_audit_log.created_at DESC
    LIMIT $1
  `, [limit]);
  return result.rows.map((row) => ({
    id: row.id,
    action: row.action,
    adminEmail: row.admin_email || '',
    adminName: row.admin_name || '',
    targetEmail: row.target_email || '',
    targetName: row.target_name || '',
    details: parseJson(row.details_json, {}),
    createdAt: row.created_at,
  }));
}

async function exportBackupData() {
  const [users, teacherClasses, teacherClassHistory, adminAuditLog, graphSnapshots, passwordResetTokens] = await Promise.all([
    readyQuery('SELECT id, email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, must_change_password, is_active, created_at, updated_at FROM users ORDER BY id'),
    readyQuery('SELECT * FROM teacher_classes ORDER BY user_id, order_index, id'),
    readyQuery('SELECT * FROM teacher_class_history ORDER BY class_id, created_at, id'),
    readyQuery('SELECT * FROM admin_audit_log ORDER BY created_at DESC, id DESC'),
    readyQuery('SELECT * FROM graph_snapshots ORDER BY created_at DESC'),
    readyQuery('SELECT * FROM password_reset_tokens ORDER BY created_at DESC'),
  ]);
  return {
    exportedAt: nowIso(),
    users: users.rows,
    teacherClasses: teacherClasses.rows,
    teacherClassHistory: teacherClassHistory.rows,
    adminAuditLog: adminAuditLog.rows,
    graphSnapshots: graphSnapshots.rows,
    passwordResetTokens: passwordResetTokens.rows,
  };
}

async function restoreBackupData(backup, adminUserId = null) {
  if (!backup || !Array.isArray(backup.users) || !Array.isArray(backup.teacherClasses) || !Array.isArray(backup.teacherClassHistory)) {
    throw new Error('INVALID_BACKUP');
  }
  await readyTransaction(async (client) => {
    await client.query('DELETE FROM teacher_class_history');
    await client.query('DELETE FROM teacher_classes');
    await client.query('DELETE FROM password_reset_tokens');
    await client.query('DELETE FROM graph_snapshots');
    await client.query('DELETE FROM admin_audit_log');
    await client.query('DELETE FROM users');
    for (const user of backup.users) {
      const fullName = user.full_name || user.fullName || `${user.first_name || user.firstName || ''} ${user.last_name || user.lastName || ''}`.trim() || user.email || 'User';
      const firstName = user.first_name || user.firstName || fullName.split(' ')[0] || fullName;
      const lastName = user.last_name || user.lastName || fullName.split(' ').slice(1).join(' ') || '';
      await client.query(`
        INSERT INTO users (id, email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, must_change_password, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `, [user.id, user.email, user.password_hash || bcrypt.hashSync(crypto.randomBytes(12).toString('hex'), 10), user.role, fullName, firstName, lastName, user.phone || '', user.city || '', user.school_name || user.schoolName || '', user.must_change_password || user.mustChangePassword ? 1 : 0, user.is_active === undefined ? (user.isActive === false ? 0 : 1) : (user.is_active ? 1 : 0), user.created_at || user.createdAt || nowIso(), user.updated_at || user.updatedAt || nowIso()]);
    }
    for (const teacherClass of backup.teacherClasses) {
      await client.query(`
        INSERT INTO teacher_classes (id, user_id, name, grade, gender, order_index, student_count, roster_json, values_json, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [teacherClass.id, teacherClass.user_id || teacherClass.userId, teacherClass.name, teacherClass.grade, teacherClass.gender, teacherClass.order_index || teacherClass.orderIndex || 0, teacherClass.student_count || teacherClass.studentCount, teacherClass.roster_json || JSON.stringify(teacherClass.roster || []), teacherClass.values_json || JSON.stringify(teacherClass.values || {}), teacherClass.created_at || teacherClass.createdAt || nowIso(), teacherClass.updated_at || teacherClass.updatedAt || nowIso()]);
    }
    for (const entry of backup.teacherClassHistory) {
      await client.query('INSERT INTO teacher_class_history (id, class_id, event_type, payload_json, created_at) VALUES ($1, $2, $3, $4, $5)', [entry.id, entry.class_id || entry.classId, entry.event_type || entry.eventType || 'calculated', entry.payload_json || JSON.stringify(entry.payload || {}), entry.created_at || entry.createdAt || nowIso()]);
    }
    for (const snapshot of backup.graphSnapshots || []) {
      await client.query('INSERT INTO graph_snapshots (id, payload_json, created_at) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET payload_json = EXCLUDED.payload_json, created_at = EXCLUDED.created_at', [snapshot.id, snapshot.payload_json || JSON.stringify(snapshot.payload || snapshot.snapshot || {}), snapshot.created_at || snapshot.createdAt || nowIso()]);
    }
    for (const token of backup.passwordResetTokens || []) {
      await client.query('INSERT INTO password_reset_tokens (token_hash, user_id, expires_at, used_at, created_at) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (token_hash) DO NOTHING', [token.token_hash || token.tokenHash, token.user_id || token.userId, token.expires_at || token.expiresAt, token.used_at || token.usedAt || null, token.created_at || token.createdAt || nowIso()]);
    }
    for (const entry of backup.adminAuditLog || []) {
      await client.query('INSERT INTO admin_audit_log (id, admin_user_id, target_user_id, action, details_json, created_at) VALUES ($1, $2, $3, $4, $5, $6)', [entry.id, entry.admin_user_id || entry.adminUserId || null, entry.target_user_id || entry.targetUserId || null, entry.action, entry.details_json || JSON.stringify(entry.details || {}), entry.created_at || entry.createdAt || nowIso()]);
    }
    await client.query("INSERT INTO admin_audit_log (admin_user_id, target_user_id, action, details_json, created_at) VALUES ($1, NULL, 'restore_backup', $2, $3)", [adminUserId, JSON.stringify({ users: backup.users.length, classes: backup.teacherClasses.length, historyRecords: backup.teacherClassHistory.length }), nowIso()]);
    await client.query("SELECT setval(pg_get_serial_sequence('users','id'), COALESCE((SELECT MAX(id) FROM users), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('teacher_classes','id'), COALESCE((SELECT MAX(id) FROM teacher_classes), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('teacher_class_history','id'), COALESCE((SELECT MAX(id) FROM teacher_class_history), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('admin_audit_log','id'), COALESCE((SELECT MAX(id) FROM admin_audit_log), 1), true)");
  });
  return { users: backup.users.length, classes: backup.teacherClasses.length, historyRecords: backup.teacherClassHistory.length, graphSnapshots: (backup.graphSnapshots || []).length };
}

async function getAdminDiagnostics() {
  const [users, activeUsers, inactiveUsers, classes, historyRecords, graphSnapshots, latestBackup] = await Promise.all([
    readyQuery('SELECT COUNT(*) AS count FROM users'),
    readyQuery('SELECT COUNT(*) AS count FROM users WHERE is_active = 1'),
    readyQuery('SELECT COUNT(*) AS count FROM users WHERE is_active = 0'),
    readyQuery('SELECT COUNT(*) AS count FROM teacher_classes'),
    readyQuery('SELECT COUNT(*) AS count FROM teacher_class_history'),
    readyQuery('SELECT COUNT(*) AS count FROM graph_snapshots'),
    readyQuery("SELECT created_at FROM admin_audit_log WHERE action = 'export_backup' ORDER BY created_at DESC LIMIT 1"),
  ]);
  return {
    users: Number(users.rows[0].count),
    activeUsers: Number(activeUsers.rows[0].count),
    inactiveUsers: Number(inactiveUsers.rows[0].count),
    classes: Number(classes.rows[0].count),
    historyRecords: Number(historyRecords.rows[0].count),
    graphSnapshots: Number(graphSnapshots.rows[0].count),
    latestBackup: latestBackup.rows[0]?.created_at || '',
  };
}

async function createSession(userId) {
  await deleteExpiredSessions();
  const token = crypto.randomBytes(32).toString('hex');
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)).toISOString();
  await readyQuery('INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES ($1, $2, $3, $4)', [token, userId, expiresAt, createdAt]);
  return { token, expiresAt };
}

async function deleteExpiredSessions() {
  await readyQuery('DELETE FROM sessions WHERE expires_at <= $1', [nowIso()]);
}

async function findUserBySessionToken(token) {
  if (!token) {
    return null;
  }
  await deleteExpiredSessions();
  const result = await readyQuery(`
    SELECT users.*
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = $1 AND sessions.expires_at > $2 AND users.is_active = 1
  `, [token, nowIso()]);
  return serializeUser(result.rows[0]);
}

async function deleteSession(token) {
  if (!token) {
    return;
  }
  await readyQuery('DELETE FROM sessions WHERE token = $1', [token]);
}

function parseJson(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function serializeTeacherClass(row) {
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

async function listTeacherClasses(userId) {
  const result = await readyQuery('SELECT * FROM teacher_classes WHERE user_id = $1 ORDER BY order_index ASC, updated_at DESC, id DESC', [userId]);
  return result.rows.map(serializeTeacherClass);
}

async function getTeacherClass(userId, classId) {
  const result = await readyQuery('SELECT * FROM teacher_classes WHERE user_id = $1 AND id = $2', [userId, classId]);
  return serializeTeacherClass(result.rows[0]);
}

async function createTeacherClass(userId, payload) {
  const count = await readyQuery('SELECT COUNT(*) AS count FROM teacher_classes WHERE user_id = $1', [userId]);
  if (Number(count.rows[0].count) >= 18) {
    throw new Error('CLASS_LIMIT_REACHED');
  }
  const timestamp = nowIso();
  const maxOrder = await readyQuery('SELECT COALESCE(MAX(order_index), -1) AS max_order FROM teacher_classes WHERE user_id = $1', [userId]);
  const studentCount = Number(payload.studentCount);
  const roster = Array.isArray(payload.roster) ? payload.roster : [];
  const values = payload.values && typeof payload.values === 'object' ? payload.values : {};
  const result = await readyQuery(`
    INSERT INTO teacher_classes (user_id, name, grade, gender, order_index, student_count, roster_json, values_json, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `, [userId, payload.name, payload.grade, payload.gender, Number(maxOrder.rows[0].max_order) + 1, studentCount, JSON.stringify(roster), JSON.stringify(values), timestamp, timestamp]);
  await appendClassHistory(result.rows[0].id, 'created', { name: payload.name, grade: payload.grade, gender: payload.gender, studentCount });
  return serializeTeacherClass(result.rows[0]);
}

async function updateTeacherClass(userId, classId, payload) {
  const existing = await getTeacherClass(userId, classId);
  if (!existing) {
    return null;
  }
  const timestamp = nowIso();
  const studentCount = Number(payload.studentCount ?? existing.studentCount);
  const roster = Array.isArray(payload.roster) ? payload.roster : existing.roster;
  const values = payload.values && typeof payload.values === 'object' ? payload.values : existing.values;
  const result = await readyQuery(`
    UPDATE teacher_classes
    SET name = $1, grade = $2, gender = $3, student_count = $4, roster_json = $5, values_json = $6, updated_at = $7
    WHERE user_id = $8 AND id = $9
    RETURNING *
  `, [payload.name ?? existing.name, payload.grade ?? existing.grade, payload.gender ?? existing.gender, studentCount, JSON.stringify(roster), JSON.stringify(values), timestamp, userId, classId]);
  await appendClassHistory(classId, 'updated', { name: payload.name ?? existing.name, grade: payload.grade ?? existing.grade, gender: payload.gender ?? existing.gender, studentCount });
  return serializeTeacherClass(result.rows[0]);
}

async function deleteTeacherClass(userId, classId) {
  const result = await readyQuery('DELETE FROM teacher_classes WHERE user_id = $1 AND id = $2', [userId, classId]);
  return result.rowCount > 0;
}

async function reorderTeacherClasses(userId, orderedIds) {
  await readyTransaction(async (client) => {
    for (const [index, classId] of orderedIds.entries()) {
      await client.query('UPDATE teacher_classes SET order_index = $1 WHERE user_id = $2 AND id = $3', [index, userId, classId]);
    }
  });
  return listTeacherClasses(userId);
}

async function appendClassHistory(classId, eventType, payload) {
  await readyQuery('INSERT INTO teacher_class_history (class_id, event_type, payload_json, created_at) VALUES ($1, $2, $3, $4)', [classId, eventType, JSON.stringify(payload || {}), nowIso()]);
}

async function listTeacherClassHistory(classId) {
  const result = await readyQuery('SELECT * FROM teacher_class_history WHERE class_id = $1 ORDER BY id DESC', [classId]);
  return result.rows.map((row) => ({ id: row.id, eventType: row.event_type, payload: parseJson(row.payload_json, {}), createdAt: row.created_at }));
}

async function deleteTeacherClassHistory(userId, classId, historyId) {
  const teacherClass = await getTeacherClass(userId, classId);
  if (!teacherClass) {
    return false;
  }
  const result = await readyQuery('DELETE FROM teacher_class_history WHERE class_id = $1 AND id = $2', [classId, historyId]);
  return result.rowCount > 0;
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
