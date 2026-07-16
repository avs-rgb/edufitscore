const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const databasePath = process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'auth.db');
fs.mkdirSync(path.dirname(databasePath), { recursive: true });
const db = new Database(databasePath);

db.pragma('journal_mode = WAL');

function normalizeTeacherClassGrade(value) {
  const text = String(value || '').trim().replace(/"/g, '״').replace(/'/g, '׳');
  const numeric = Number(text);
  if (Number.isFinite(numeric) && Number.isInteger(numeric) && numeric >= 1 && numeric <= 12) {
    return numeric;
  }
  const gradeMap = {
    'א': 1, 'א׳': 1,
    'ב': 2, 'ב׳': 2,
    'ג': 3, 'ג׳': 3,
    'ד': 4, 'ד׳': 4,
    'ה': 5, 'ה׳': 5,
    'ו': 6, 'ו׳': 6,
    'ז': 7, 'ז׳': 7,
    'ח': 8, 'ח׳': 8,
    'ט': 9, 'ט׳': 9,
    'י': 10, 'י׳': 10,
    'יא': 11, 'י״א': 11,
    'יב': 12, 'י״ב': 12,
  };
  const grade = gradeMap[text];
  if (!grade) {
    throw new Error('INVALID_GRADE');
  }
  return grade;
}

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
    totp_secret TEXT NOT NULL DEFAULT '',
    totp_enabled INTEGER NOT NULL DEFAULT 0,
    totp_enabled_at TEXT,
    email_verified INTEGER NOT NULL DEFAULT 0,
    email_verified_at TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    csrf_token_hash TEXT NOT NULL DEFAULT '',
    ip_address TEXT NOT NULL DEFAULT '',
    user_agent TEXT NOT NULL DEFAULT '',
    last_seen_at TEXT NOT NULL DEFAULT '',
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
    school_id INTEGER,
    order_index INTEGER NOT NULL DEFAULT 0,
    student_count INTEGER NOT NULL,
    roster_json TEXT NOT NULL,
    values_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE SET NULL,
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

  CREATE TABLE IF NOT EXISTS email_verification_tokens (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS admin_2fa_recovery_codes (
    code_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS auth_2fa_challenges (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS schools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(name, city)
  );

  CREATE TABLE IF NOT EXISTS school_memberships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    school_id INTEGER NOT NULL,
    membership_role TEXT NOT NULL CHECK(membership_role IN ('teacher', 'admin')),
    status TEXT NOT NULL CHECK(status IN ('pending', 'approved', 'rejected')),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(user_id, school_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS school_invites (
    token TEXT PRIMARY KEY,
    school_id INTEGER NOT NULL,
    invited_by_user_id INTEGER NOT NULL,
    teacher_name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    used_by_user_id INTEGER,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    used_at TEXT,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_by_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (used_by_user_id) REFERENCES users(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS school_score_table_settings (
    school_id INTEGER PRIMARY KEY,
    grade_start INTEGER NOT NULL DEFAULT 1,
    grade_end INTEGER NOT NULL DEFAULT 6,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS school_score_tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    school_id INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    gender_group TEXT NOT NULL CHECK(gender_group IN ('male', 'female', 'other')),
    starting_score INTEGER NOT NULL,
    subjects_json TEXT NOT NULL,
    rows_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(school_id, grade, gender_group),
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
  );
`);

db.exec("CREATE UNIQUE INDEX IF NOT EXISTS one_school_admin_per_school ON school_memberships(school_id) WHERE membership_role = 'admin' AND status != 'rejected'");

const sessionsInfo = db.prepare('PRAGMA table_info(sessions)').all();
if (!sessionsInfo.some((column) => column.name === 'csrf_token_hash')) {
  db.exec("ALTER TABLE sessions ADD COLUMN csrf_token_hash TEXT NOT NULL DEFAULT ''");
  db.exec("DELETE FROM sessions WHERE csrf_token_hash = ''");
}
if (!sessionsInfo.some((column) => column.name === 'ip_address')) {
  db.exec("ALTER TABLE sessions ADD COLUMN ip_address TEXT NOT NULL DEFAULT ''");
}
if (!sessionsInfo.some((column) => column.name === 'user_agent')) {
  db.exec("ALTER TABLE sessions ADD COLUMN user_agent TEXT NOT NULL DEFAULT ''");
}
if (!sessionsInfo.some((column) => column.name === 'last_seen_at')) {
  db.exec("ALTER TABLE sessions ADD COLUMN last_seen_at TEXT NOT NULL DEFAULT ''");
  db.exec("UPDATE sessions SET last_seen_at = created_at WHERE last_seen_at = ''");
}

const teacherClassesInfo = db.prepare('PRAGMA table_info(teacher_classes)').all();
if (!teacherClassesInfo.some((column) => column.name === 'order_index')) {
  db.exec('ALTER TABLE teacher_classes ADD COLUMN order_index INTEGER NOT NULL DEFAULT 0');
}
if (!teacherClassesInfo.some((column) => column.name === 'school_id')) {
  db.exec('ALTER TABLE teacher_classes ADD COLUMN school_id INTEGER');
}

const existingTeacherGrades = db.prepare('SELECT id, grade FROM teacher_classes').all();
const updateTeacherGrade = db.prepare('UPDATE teacher_classes SET grade = ? WHERE id = ?');
for (const row of existingTeacherGrades) {
  try {
    const normalizedGrade = normalizeTeacherClassGrade(row.grade);
    if (String(row.grade) !== String(normalizedGrade)) {
      updateTeacherGrade.run(normalizedGrade, row.id);
    }
  } catch {
    // Keep legacy invalid rows untouched; create/update now rejects invalid grades.
  }
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
if (!usersInfo.some((column) => column.name === 'totp_secret')) {
  db.exec("ALTER TABLE users ADD COLUMN totp_secret TEXT NOT NULL DEFAULT ''");
}
if (!usersInfo.some((column) => column.name === 'totp_enabled')) {
  db.exec('ALTER TABLE users ADD COLUMN totp_enabled INTEGER NOT NULL DEFAULT 0');
}
if (!usersInfo.some((column) => column.name === 'totp_enabled_at')) {
  db.exec('ALTER TABLE users ADD COLUMN totp_enabled_at TEXT');
}
if (!usersInfo.some((column) => column.name === 'email_verified')) {
  db.exec('ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 1');
}
if (!usersInfo.some((column) => column.name === 'email_verified_at')) {
  db.exec('ALTER TABLE users ADD COLUMN email_verified_at TEXT');
  db.exec("UPDATE users SET email_verified_at = updated_at WHERE email_verified = 1 AND email_verified_at IS NULL");
}
db.exec("UPDATE users SET email_verified = 1, email_verified_at = COALESCE(email_verified_at, updated_at) WHERE role = 'admin'");
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
  const email = String(process.env.INITIAL_ADMIN_EMAIL || 'admin@edufitscore.co.il').trim().toLowerCase();
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  const firstName = 'Global';
  const lastName = 'Admin';
  const timestamp = nowIso();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

  if (existing) {
    return;
  }

  if (!password) {
    return;
  }

  db.prepare(`
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, must_change_password, email_verified, email_verified_at, is_active, created_at, updated_at)
    VALUES (?, ?, 'admin', ?, ?, ?, 1, 1, ?, 1, ?, ?)
  `).run(email, bcrypt.hashSync(password, 10), `${firstName} ${lastName}`, firstName, lastName, timestamp, timestamp, timestamp);
}

db.prepare("DELETE FROM users WHERE email IN ('teacher@edufitscore.local', 'admin@edufitscore.local')").run();
seedGlobalAdmin();

function serializeUser(row) {
  if (!row) {
    return null;
  }

  const schoolAdmin = db.prepare(`
    SELECT schools.id, schools.name, schools.city
    FROM school_memberships
    JOIN schools ON schools.id = school_memberships.school_id
    WHERE school_memberships.user_id = ?
      AND school_memberships.membership_role = 'admin'
      AND school_memberships.status = 'approved'
    LIMIT 1
  `).get(row.id);
  const approvedTeacherSchool = db.prepare(`
    SELECT 1
    FROM school_memberships
    WHERE user_id = ?
      AND membership_role = 'teacher'
      AND status = 'approved'
    LIMIT 1
  `).get(row.id);

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
    emailVerified: Boolean(row.email_verified),
    twoFactorEnabled: row.role === 'admin' && Boolean(row.totp_enabled),
    isActive: Boolean(row.is_active),
    isSchoolAdmin: Boolean(schoolAdmin),
    canEnterScores: row.role === 'admin' || Boolean(schoolAdmin) || Boolean(approvedTeacherSchool),
    schoolMemberships: listUserSchoolMemberships(row.id),
    schoolAdminSchool: schoolAdmin ? { id: schoolAdmin.id, name: schoolAdmin.name, city: schoolAdmin.city } : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function serializeSchool(row) {
  return row ? { id: row.id, name: row.name, city: row.city } : null;
}

function listSchools() {
  return db.prepare('SELECT * FROM schools ORDER BY city COLLATE NOCASE, name COLLATE NOCASE').all().map(serializeSchool);
}

function listUserSchoolMemberships(userId) {
  return db.prepare(`
    SELECT school_memberships.id AS membership_id, school_memberships.status, school_memberships.membership_role, schools.*
    FROM school_memberships
    JOIN schools ON schools.id = school_memberships.school_id
    WHERE school_memberships.user_id = ?
    ORDER BY school_memberships.status = 'approved' DESC, schools.city COLLATE NOCASE, schools.name COLLATE NOCASE
  `).all(userId).map((row) => ({
    membershipId: row.membership_id,
    role: row.membership_role,
    status: row.status,
    school: serializeSchool(row),
  }));
}

function listApprovedTeacherSchools(userId) {
  return listUserSchoolMemberships(userId)
    .filter((item) => item.role === 'teacher' && item.status === 'approved')
    .map((item) => item.school);
}

function canUserUseSchoolForClass(userId, schoolId) {
  if (!schoolId) {
    return true;
  }

  return Boolean(db.prepare(`
    SELECT 1
    FROM school_memberships
    WHERE user_id = ?
      AND school_id = ?
      AND status = 'approved'
      AND membership_role IN ('teacher', 'admin')
    LIMIT 1
  `).get(userId, schoolId));
}

function findOrCreateSchool(name, city) {
  const cleanName = String(name || '').trim();
  const cleanCity = String(city || '').trim();

  if (!cleanName || !cleanCity) {
    throw new Error('MISSING_SCHOOL');
  }

  const existing = db.prepare('SELECT * FROM schools WHERE name = ? AND city = ?').get(cleanName, cleanCity);
  if (existing) {
    return existing;
  }

  const timestamp = nowIso();
  const result = db.prepare('INSERT INTO schools (name, city, created_at, updated_at) VALUES (?, ?, ?, ?)').run(cleanName, cleanCity, timestamp, timestamp);
  return db.prepare('SELECT * FROM schools WHERE id = ?').get(result.lastInsertRowid);
}

function addSchoolMembership(userId, schoolId, membershipRole, status) {
  const existing = db.prepare('SELECT membership_role, status FROM school_memberships WHERE user_id = ? AND school_id = ?').get(userId, schoolId);
  if (existing) {
    if (existing.membership_role === membershipRole && existing.status === status) {
      return;
    }
    throw new Error(`TEACHER_ALREADY_LINKED_${String(existing.status || 'existing').toUpperCase()}`);
  }

  if (membershipRole === 'teacher') {
    const count = db.prepare(`
      SELECT COUNT(*) AS count
      FROM school_memberships
      WHERE user_id = ?
        AND membership_role = 'teacher'
        AND status IN ('pending', 'approved')
    `).get(userId).count;

    if (count >= 3) {
      throw new Error('SCHOOL_LIMIT_REACHED');
    }
  }

  const timestamp = nowIso();
  try {
    db.prepare(`
      INSERT INTO school_memberships (user_id, school_id, membership_role, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, schoolId, membershipRole, status, timestamp, timestamp);
  } catch (error) {
    if (String(error.message || '').includes('one_school_admin_per_school')) {
      throw new Error('SCHOOL_ADMIN_EXISTS');
    }
    throw error;
  }
}

function requestTeacherSchool(userId, schoolId) {
  addSchoolMembership(userId, Number(schoolId), 'teacher', 'pending');
  return listUserSchoolMemberships(userId);
}

function createSchoolInvite(adminUserId, payload) {
  const school = getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const email = String(payload.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) {
    throw new Error('INVALID_EMAIL');
  }

  const existingUser = findAnyUserByEmail(email);
  if (existingUser) {
    const existingMembership = db.prepare(`
      SELECT status
      FROM school_memberships
      WHERE user_id = ? AND school_id = ? AND membership_role = 'teacher'
      LIMIT 1
    `).get(existingUser.id, school.id);

    if (existingMembership) {
      throw new Error(`TEACHER_ALREADY_LINKED_${existingMembership.status.toUpperCase()}`);
    }
  }

  const token = crypto.randomBytes(24).toString('base64url');
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24 * 14)).toISOString();
  db.prepare(`
    INSERT INTO school_invites (token, school_id, invited_by_user_id, teacher_name, email, phone, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(token, school.id, adminUserId, String(payload.teacherName || '').trim(), email, String(payload.phone || '').trim(), expiresAt, createdAt);

  return { token, school: serializeSchool(school), email, phone: String(payload.phone || '').trim(), teacherName: String(payload.teacherName || '').trim(), expiresAt };
}

function applySchoolInvite(userId, token, email) {
  return db.transaction(() => {
    if (!token) {
      return false;
    }

    const row = db.prepare(`
      SELECT *
      FROM school_invites
      WHERE token = ?
        AND used_at IS NULL
        AND expires_at > ?
    `).get(String(token), nowIso());

    if (!row) {
      throw new Error('INVALID_INVITE');
    }

    if (row.email !== String(email || '').trim().toLowerCase()) {
      throw new Error('INVITE_EMAIL_MISMATCH');
    }

    const updated = db.prepare('UPDATE school_invites SET used_by_user_id = ?, used_at = ? WHERE token = ? AND used_at IS NULL').run(userId, nowIso(), row.token);
    if (updated.changes !== 1) {
      throw new Error('INVALID_INVITE');
    }
    addSchoolMembership(userId, row.school_id, 'teacher', 'approved');
    return true;
  })();
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

  if (!user.email_verified) {
    throw new Error('EMAIL_NOT_VERIFIED');
  }

  return bcrypt.compareSync(password, user.password_hash) ? serializeUser(user) : null;
}

function findUserForSecurityAudit(email) {
  const row = findAnyUserByEmail(email);
  return row ? serializeUser(row) : null;
}

function verifyUserPassword(userId, password) {
  const user = db.prepare('SELECT password_hash FROM users WHERE id = ? AND is_active = 1').get(userId);
  return Boolean(user && bcrypt.compareSync(password || '', user.password_hash));
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
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, email_verified, email_verified_at, is_active, created_at, updated_at)
    VALUES (?, ?, 'teacher', ?, ?, ?, ?, ?, ?, 0, NULL, 1, ?, ?)
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
  const accountType = payload.accountType === 'school_admin' ? 'school_admin' : 'teacher';

  try {
    if (accountType === 'school_admin') {
      const school = findOrCreateSchool(payload.schoolName, payload.schoolCity || payload.city);
      addSchoolMembership(result.lastInsertRowid, school.id, 'admin', 'approved');
    } else if (payload.inviteToken) {
      applySchoolInvite(result.lastInsertRowid, payload.inviteToken, email);
    } else if (payload.schoolId) {
      addSchoolMembership(result.lastInsertRowid, Number(payload.schoolId), 'teacher', 'pending');
    }
  } catch (error) {
    db.prepare('DELETE FROM users WHERE id = ?').run(result.lastInsertRowid);
    throw error;
  }

  return serializeUser(row);
}

function getSchoolAdminSchool(userId) {
  return db.prepare(`
    SELECT schools.*
    FROM school_memberships
    JOIN schools ON schools.id = school_memberships.school_id
    WHERE school_memberships.user_id = ?
      AND school_memberships.membership_role = 'admin'
      AND school_memberships.status = 'approved'
    LIMIT 1
  `).get(userId);
}

function listSchoolAdminOverview(userId) {
  const school = getSchoolAdminSchool(userId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const rows = db.prepare(`
    SELECT
      school_memberships.id AS membership_id,
      school_memberships.status,
      users.id AS user_id,
      users.full_name,
      users.email,
      users.phone,
      users.city,
      teacher_classes.id AS class_id,
      teacher_classes.name AS class_name,
      teacher_classes.grade,
      teacher_classes.gender,
      teacher_classes.student_count
    FROM school_memberships
    JOIN users ON users.id = school_memberships.user_id
    LEFT JOIN teacher_classes ON teacher_classes.user_id = users.id
    WHERE school_memberships.school_id = ?
      AND school_memberships.membership_role = 'teacher'
      AND users.is_active = 1
    ORDER BY users.full_name COLLATE NOCASE, teacher_classes.order_index ASC, teacher_classes.id DESC
  `).all(school.id);

  const teachers = new Map();
  rows.forEach((row) => {
    if (!teachers.has(row.user_id)) {
      teachers.set(row.user_id, {
        membershipId: row.membership_id,
        status: row.status,
        id: row.user_id,
        fullName: row.full_name,
        email: row.email,
        phone: row.phone || '',
        city: row.city || '',
        classes: [],
      });
    }

    if (row.class_id) {
      teachers.get(row.user_id).classes.push({
        id: row.class_id,
        name: row.class_name,
        grade: row.grade,
        gender: row.gender,
        studentCount: row.student_count,
      });
    }
  });

  return { school: serializeSchool(school), teachers: Array.from(teachers.values()) };
}

function normalizeScoreTableGenderGroup(value) {
  if (['male', 'female', 'other'].includes(value)) {
    return value;
  }
  throw new Error('INVALID_GENDER_GROUP');
}

function normalizeScoreTableGrade(value) {
  const grade = Number(value);
  if (!Number.isInteger(grade) || grade < 1 || grade > 12) {
    throw new Error('INVALID_GRADE');
  }
  return grade;
}

function normalizeStartingScore(value) {
  const score = Number(value);
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    throw new Error('INVALID_STARTING_SCORE');
  }
  return score;
}

function generatedScoreRows(startingScore) {
  const start = normalizeStartingScore(startingScore);
  const rows = [];
  for (let score = 100; score >= start; score -= 1) {
    rows.push({ score, values: {} });
  }
  if (!rows.some((row) => row.score === 0)) {
    rows.push({ score: 0, values: {} });
  }
  return rows;
}

function serializeScoreTable(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    schoolId: row.school_id,
    grade: row.grade,
    genderGroup: row.gender_group,
    startingScore: row.starting_score,
    subjects: JSON.parse(row.subjects_json || '[]'),
    rows: JSON.parse(row.rows_json || '[]'),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getSchoolScoreTableSettings(schoolId) {
  let row = db.prepare('SELECT * FROM school_score_table_settings WHERE school_id = ?').get(schoolId);
  if (!row) {
    const timestamp = nowIso();
    db.prepare(`
      INSERT INTO school_score_table_settings (school_id, grade_start, grade_end, created_at, updated_at)
      VALUES (?, 1, 6, ?, ?)
    `).run(schoolId, timestamp, timestamp);
    row = db.prepare('SELECT * FROM school_score_table_settings WHERE school_id = ?').get(schoolId);
  }
  return { gradeStart: row.grade_start, gradeEnd: row.grade_end };
}

function updateSchoolScoreTableSettings(adminUserId, payload) {
  const school = getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const gradeStart = normalizeScoreTableGrade(payload.gradeStart);
  const gradeEnd = normalizeScoreTableGrade(payload.gradeEnd);
  if (gradeStart > gradeEnd) {
    throw new Error('INVALID_GRADE_RANGE');
  }

  const timestamp = nowIso();
  db.prepare(`
    INSERT INTO school_score_table_settings (school_id, grade_start, grade_end, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(school_id) DO UPDATE SET grade_start = excluded.grade_start, grade_end = excluded.grade_end, updated_at = excluded.updated_at
  `).run(school.id, gradeStart, gradeEnd, timestamp, timestamp);
  return getSchoolScoreTableSettings(school.id);
}

function listSchoolScoreTables(adminUserId) {
  const school = getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const tables = db.prepare(`
    SELECT *
    FROM school_score_tables
    WHERE school_id = ?
    ORDER BY grade ASC,
      CASE gender_group WHEN 'male' THEN 1 WHEN 'female' THEN 2 ELSE 3 END,
      id ASC
  `).all(school.id).map(serializeScoreTable);

  return { school: serializeSchool(school), settings: getSchoolScoreTableSettings(school.id), tables };
}

function listPublicSchoolScoreTables(schoolId) {
  const school = db.prepare('SELECT * FROM schools WHERE id = ?').get(Number(schoolId));
  if (!school) {
    return null;
  }
  const tables = db.prepare(`
    SELECT *
    FROM school_score_tables
    WHERE school_id = ?
    ORDER BY grade ASC,
      CASE gender_group WHEN 'male' THEN 1 WHEN 'female' THEN 2 ELSE 3 END,
      id ASC
  `).all(school.id).map(serializeScoreTable);
  return { school: serializeSchool(school), settings: getSchoolScoreTableSettings(school.id), tables };
}

function normalizeScoreTableSubjects(subjects) {
  return (Array.isArray(subjects) ? subjects : [])
    .map((subject, index) => ({
      id: String(subject.id || `subject-${index + 1}`),
      name: String(subject.name || '').trim(),
      measurementType: ['time', 'time_compact', 'number'].includes(subject.measurementType || subject.valueType) ? (subject.measurementType || subject.valueType) : undefined,
      direction: ['higher', 'lower'].includes(subject.direction || subject.scoringDirection) ? (subject.direction || subject.scoringDirection) : undefined,
      includeZeroScore: subject.includeZeroScore === true ? true : undefined,
    }))
    .filter((subject) => subject.name);
}

function normalizeScoreTableRows(rows, startingScore, subjects) {
  const generatedRows = generatedScoreRows(startingScore);
  const incomingRows = Array.isArray(rows) ? rows : [];
  const incomingByScore = new Map(incomingRows.map((row) => [Number(row.score), row]));
  const subjectIds = new Set(subjects.map((subject) => subject.id));

  return generatedRows.map((row) => {
    const incoming = incomingByScore.get(row.score);
    const incomingValues = incoming && incoming.values && typeof incoming.values === 'object' ? incoming.values : {};
    const values = {};

    subjects.forEach((subject) => {
      const value = row.score === 0 ? '0' : String(incomingValues[subject.id] || '').trim();
      if (subjectIds.has(subject.id)) {
        values[subject.id] = value;
      }
    });

    return { score: row.score, values };
  });
}

function createSchoolScoreTable(adminUserId, payload) {
  const school = getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const count = db.prepare('SELECT COUNT(*) AS count FROM school_score_tables WHERE school_id = ?').get(school.id).count;
  if (count >= 36) {
    throw new Error('SCORE_TABLE_LIMIT_REACHED');
  }

  const settings = getSchoolScoreTableSettings(school.id);
  const grade = normalizeScoreTableGrade(payload.grade);
  if (grade < settings.gradeStart || grade > settings.gradeEnd) {
    throw new Error('GRADE_OUT_OF_RANGE');
  }

  const genderGroup = normalizeScoreTableGenderGroup(payload.genderGroup);
  const startingScore = normalizeStartingScore(payload.startingScore);
  const subjects = normalizeScoreTableSubjects(payload.subjects);
  const rows = normalizeScoreTableRows(payload.rows, startingScore, subjects);
  const timestamp = nowIso();

  try {
    const result = db.prepare(`
      INSERT INTO school_score_tables (school_id, grade, gender_group, starting_score, subjects_json, rows_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(school.id, grade, genderGroup, startingScore, JSON.stringify(subjects), JSON.stringify(rows), timestamp, timestamp);
    return serializeScoreTable(db.prepare('SELECT * FROM school_score_tables WHERE id = ?').get(result.lastInsertRowid));
  } catch (error) {
    if (String(error.message || '').includes('UNIQUE')) {
      throw new Error('SCORE_TABLE_EXISTS');
    }
    throw error;
  }
}

function updateSchoolScoreTable(adminUserId, tableId, payload) {
  const school = getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const existing = db.prepare('SELECT * FROM school_score_tables WHERE id = ? AND school_id = ?').get(tableId, school.id);
  if (!existing) {
    return null;
  }

  const startingScore = payload.startingScore === undefined ? existing.starting_score : normalizeStartingScore(payload.startingScore);
  const subjects = normalizeScoreTableSubjects(payload.subjects === undefined ? JSON.parse(existing.subjects_json || '[]') : payload.subjects);
  const rows = normalizeScoreTableRows(payload.rows === undefined ? JSON.parse(existing.rows_json || '[]') : payload.rows, startingScore, subjects);
  db.prepare(`
    UPDATE school_score_tables
    SET starting_score = ?, subjects_json = ?, rows_json = ?, updated_at = ?
    WHERE id = ? AND school_id = ?
  `).run(startingScore, JSON.stringify(subjects), JSON.stringify(rows), nowIso(), tableId, school.id);

  return serializeScoreTable(db.prepare('SELECT * FROM school_score_tables WHERE id = ?').get(tableId));
}

function deleteSchoolScoreTable(adminUserId, tableId) {
  const school = getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const result = db.prepare('DELETE FROM school_score_tables WHERE id = ? AND school_id = ?').run(tableId, school.id);
  return result.changes > 0;
}

function setSchoolTeacherStatus(adminUserId, membershipId, status) {
  if (!['approved', 'rejected'].includes(status)) {
    throw new Error('INVALID_STATUS');
  }

  const school = getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const result = db.prepare(`
    UPDATE school_memberships
    SET status = ?, updated_at = ?
    WHERE id = ?
      AND school_id = ?
      AND membership_role = 'teacher'
  `).run(status, nowIso(), membershipId, school.id);

  return result.changes > 0;
}

function removeSchoolTeacher(adminUserId, membershipId) {
  const school = getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }

  const result = db.prepare(`
    DELETE FROM school_memberships
    WHERE id = ?
      AND school_id = ?
      AND membership_role = 'teacher'
  `).run(membershipId, school.id);

  return result.changes > 0;
}

function permanentlyDeleteUser(userId) {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  if (!row) {
    throw new Error('USER_NOT_FOUND');
  }
  if (row.is_active) {
    throw new Error('USER_ACTIVE');
  }
  db.prepare('DELETE FROM users WHERE id = ?').run(userId);
  return true;
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

  if (!newPassword || String(newPassword).length < 8) {
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

function hashTwoFactorToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

function getAdminTwoFactorState(userId) {
  const row = db.prepare('SELECT id, role, totp_secret, totp_enabled, totp_enabled_at FROM users WHERE id = ? AND is_active = 1').get(userId);
  if (!row || row.role !== 'admin') {
    return null;
  }
  const recoveryCount = db.prepare(`
    SELECT COUNT(*) AS count
    FROM admin_2fa_recovery_codes
    WHERE user_id = ? AND used_at IS NULL
  `).get(userId).count;
  return {
    enabled: Boolean(row.totp_enabled),
    secret: row.totp_secret || '',
    enabledAt: row.totp_enabled_at || '',
    recoveryCodeCount: recoveryCount,
  };
}

function saveAdminTwoFactorSecret(userId, secret) {
  const row = db.prepare('SELECT role FROM users WHERE id = ? AND is_active = 1').get(userId);
  if (!row || row.role !== 'admin') {
    throw new Error('ADMIN_REQUIRED');
  }
  db.prepare('UPDATE users SET totp_secret = ?, totp_enabled = 0, totp_enabled_at = NULL, updated_at = ? WHERE id = ?').run(String(secret || ''), nowIso(), userId);
  db.prepare('DELETE FROM admin_2fa_recovery_codes WHERE user_id = ?').run(userId);
}

function enableAdminTwoFactor(userId, recoveryCodes) {
  const row = db.prepare('SELECT role, totp_secret FROM users WHERE id = ? AND is_active = 1').get(userId);
  if (!row || row.role !== 'admin' || !row.totp_secret) {
    throw new Error('TWO_FACTOR_SETUP_REQUIRED');
  }
  const timestamp = nowIso();
  const save = db.transaction((codes) => {
    db.prepare('UPDATE users SET totp_enabled = 1, totp_enabled_at = ?, updated_at = ? WHERE id = ?').run(timestamp, timestamp, userId);
    db.prepare('DELETE FROM admin_2fa_recovery_codes WHERE user_id = ?').run(userId);
    const insert = db.prepare('INSERT OR REPLACE INTO admin_2fa_recovery_codes (code_hash, user_id, created_at) VALUES (?, ?, ?)');
    codes.forEach((code) => insert.run(hashTwoFactorToken(code), userId, timestamp));
  });
  save(recoveryCodes || []);
  return getAdminTwoFactorState(userId);
}

function disableAdminTwoFactor(userId) {
  const timestamp = nowIso();
  db.prepare("UPDATE users SET totp_secret = '', totp_enabled = 0, totp_enabled_at = NULL, updated_at = ? WHERE id = ? AND role = 'admin'").run(timestamp, userId);
  db.prepare('DELETE FROM admin_2fa_recovery_codes WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM auth_2fa_challenges WHERE user_id = ?').run(userId);
}

function createTwoFactorChallenge(userId) {
  deleteExpiredTwoFactorChallenges();
  const row = db.prepare("SELECT id FROM users WHERE id = ? AND role = 'admin' AND is_active = 1 AND totp_enabled = 1").get(userId);
  if (!row) {
    throw new Error('TWO_FACTOR_NOT_ENABLED');
  }
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashTwoFactorToken(token);
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 10)).toISOString();
  db.prepare('DELETE FROM auth_2fa_challenges WHERE user_id = ?').run(userId);
  db.prepare('INSERT INTO auth_2fa_challenges (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)').run(tokenHash, userId, expiresAt, createdAt);
  return { token, expiresAt };
}

function getTwoFactorChallenge(token) {
  deleteExpiredTwoFactorChallenges();
  if (!token) {
    return null;
  }
  const row = db.prepare(`
    SELECT auth_2fa_challenges.*, users.totp_secret, users.email, users.role
    FROM auth_2fa_challenges
    JOIN users ON users.id = auth_2fa_challenges.user_id
    WHERE auth_2fa_challenges.token_hash = ?
      AND auth_2fa_challenges.used_at IS NULL
      AND auth_2fa_challenges.expires_at > ?
      AND users.is_active = 1
      AND users.role = 'admin'
      AND users.totp_enabled = 1
  `).get(hashTwoFactorToken(token), nowIso());
  return row ? { tokenHash: row.token_hash, userId: row.user_id, secret: row.totp_secret, email: row.email, attemptCount: row.attempt_count } : null;
}

function incrementTwoFactorChallengeAttempts(token) {
  if (!token) return;
  db.prepare('UPDATE auth_2fa_challenges SET attempt_count = attempt_count + 1 WHERE token_hash = ?').run(hashTwoFactorToken(token));
}

function consumeTwoFactorChallenge(token) {
  if (!token) return;
  db.prepare('UPDATE auth_2fa_challenges SET used_at = ? WHERE token_hash = ?').run(nowIso(), hashTwoFactorToken(token));
}

function consumeAdminTwoFactorRecoveryCode(userId, code) {
  const codeHash = hashTwoFactorToken(code);
  const row = db.prepare(`
    SELECT code_hash
    FROM admin_2fa_recovery_codes
    WHERE user_id = ? AND code_hash = ? AND used_at IS NULL
  `).get(userId, codeHash);
  if (!row) {
    return false;
  }
  db.prepare('UPDATE admin_2fa_recovery_codes SET used_at = ? WHERE code_hash = ?').run(nowIso(), codeHash);
  return true;
}

function deleteExpiredTwoFactorChallenges() {
  db.prepare('DELETE FROM auth_2fa_challenges WHERE expires_at <= ? OR used_at IS NOT NULL').run(nowIso());
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

function deleteExpiredEmailVerificationTokens() {
  db.prepare('DELETE FROM email_verification_tokens WHERE expires_at <= ? OR used_at IS NOT NULL').run(nowIso());
}

function createEmailVerificationToken(userId) {
  deleteExpiredEmailVerificationTokens();
  const row = db.prepare('SELECT * FROM users WHERE id = ? AND is_active = 1').get(userId);

  if (!row || row.email_verified) {
    return null;
  }

  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashPasswordResetToken(token);
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString();

  db.prepare('DELETE FROM email_verification_tokens WHERE user_id = ?').run(row.id);
  db.prepare(`
    INSERT INTO email_verification_tokens (token_hash, user_id, expires_at, created_at)
    VALUES (?, ?, ?, ?)
  `).run(tokenHash, row.id, expiresAt, createdAt);

  return { token, expiresAt, user: serializeUser(row) };
}

function verifyEmailWithToken(token) {
  deleteExpiredEmailVerificationTokens();

  if (!token) {
    throw new Error('INVALID_VERIFICATION');
  }

  const tokenHash = hashPasswordResetToken(token);
  const row = db.prepare(`
    SELECT email_verification_tokens.*, users.id AS user_id
    FROM email_verification_tokens
    JOIN users ON users.id = email_verification_tokens.user_id
    WHERE email_verification_tokens.token_hash = ?
      AND email_verification_tokens.used_at IS NULL
      AND email_verification_tokens.expires_at > ?
      AND users.is_active = 1
  `).get(tokenHash, nowIso());

  if (!row) {
    throw new Error('INVALID_VERIFICATION');
  }

  const timestamp = nowIso();
  db.prepare('UPDATE email_verification_tokens SET used_at = ? WHERE token_hash = ?').run(timestamp, tokenHash);
  db.prepare('UPDATE users SET email_verified = 1, email_verified_at = ?, updated_at = ? WHERE id = ?').run(timestamp, timestamp, row.user_id);
}

function deleteUnverifiedUser(userId) {
  db.prepare('DELETE FROM users WHERE id = ? AND email_verified = 0').run(userId);
}

function resetPasswordWithToken(token, newPassword) {
  deleteExpiredPasswordResetTokens();

  if (!token || !newPassword || String(newPassword).length < 8) {
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
    users: db.prepare('SELECT id, email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, must_change_password, totp_secret, totp_enabled, totp_enabled_at, email_verified, email_verified_at, is_active, created_at, updated_at FROM users ORDER BY id').all(),
    schools: db.prepare('SELECT * FROM schools ORDER BY id').all(),
    schoolMemberships: db.prepare('SELECT * FROM school_memberships ORDER BY id').all(),
    schoolScoreTableSettings: db.prepare('SELECT * FROM school_score_table_settings ORDER BY school_id').all(),
    schoolScoreTables: db.prepare('SELECT * FROM school_score_tables ORDER BY school_id, grade, gender_group').all(),
    teacherClasses: db.prepare('SELECT * FROM teacher_classes ORDER BY user_id, order_index, id').all(),
    teacherClassHistory: db.prepare('SELECT * FROM teacher_class_history ORDER BY class_id, created_at, id').all(),
    adminAuditLog: db.prepare('SELECT * FROM admin_audit_log ORDER BY created_at DESC, id DESC').all(),
    graphSnapshots: db.prepare('SELECT * FROM graph_snapshots ORDER BY created_at DESC').all(),
    adminTwoFactorRecoveryCodes: db.prepare('SELECT * FROM admin_2fa_recovery_codes ORDER BY user_id, created_at').all(),
    emailVerificationTokens: db.prepare('SELECT * FROM email_verification_tokens ORDER BY user_id, created_at').all(),
  };
}

function restoreBackupData(backup, adminUserId = null) {
  if (!backup || !Array.isArray(backup.users) || !Array.isArray(backup.teacherClasses) || !Array.isArray(backup.teacherClassHistory)) {
    throw new Error('INVALID_BACKUP');
  }
  if ((backup.schools && !Array.isArray(backup.schools)) || (backup.schoolMemberships && !Array.isArray(backup.schoolMemberships)) || (backup.schoolScoreTables && !Array.isArray(backup.schoolScoreTables))) {
    throw new Error('INVALID_BACKUP');
  }

  const restore = db.transaction(() => {
    db.prepare('DELETE FROM teacher_class_history').run();
    db.prepare('DELETE FROM teacher_classes').run();
    db.prepare('DELETE FROM school_score_tables').run();
    db.prepare('DELETE FROM school_score_table_settings').run();
    db.prepare('DELETE FROM school_invites').run();
    db.prepare('DELETE FROM school_memberships').run();
    db.prepare('DELETE FROM schools').run();
    db.prepare('DELETE FROM password_reset_tokens').run();
    db.prepare('DELETE FROM email_verification_tokens').run();
    db.prepare('DELETE FROM admin_2fa_recovery_codes').run();
    db.prepare('DELETE FROM auth_2fa_challenges').run();
    db.prepare('DELETE FROM graph_snapshots').run();
    db.prepare('DELETE FROM admin_audit_log').run();
    db.prepare('DELETE FROM users').run();

    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, must_change_password, totp_secret, totp_enabled, totp_enabled_at, email_verified, email_verified_at, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        user.totp_secret || user.totpSecret || '',
        user.totp_enabled || user.totpEnabled ? 1 : 0,
        user.totp_enabled_at || user.totpEnabledAt || null,
        user.email_verified === undefined ? (user.emailVerified === false ? 0 : 1) : (user.email_verified ? 1 : 0),
        user.email_verified_at || user.emailVerifiedAt || null,
        user.is_active === undefined ? (user.isActive === false ? 0 : 1) : (user.is_active ? 1 : 0),
        user.created_at || user.createdAt || nowIso(),
        user.updated_at || user.updatedAt || nowIso()
      );
    });

    const insertSchool = db.prepare('INSERT INTO schools (id, name, city, created_at, updated_at) VALUES (?, ?, ?, ?, ?)');
    (backup.schools || []).forEach((school) => {
      insertSchool.run(school.id, school.name, school.city, school.created_at || school.createdAt || nowIso(), school.updated_at || school.updatedAt || nowIso());
    });

    const insertMembership = db.prepare(`
      INSERT INTO school_memberships (id, user_id, school_id, membership_role, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    (backup.schoolMemberships || []).forEach((membership) => {
      insertMembership.run(
        membership.id,
        membership.user_id || membership.userId,
        membership.school_id || membership.schoolId,
        membership.membership_role || membership.role,
        membership.status,
        membership.created_at || membership.createdAt || nowIso(),
        membership.updated_at || membership.updatedAt || nowIso()
      );
    });

    const insertInvite = db.prepare(`
      INSERT INTO school_invites (token, school_id, invited_by_user_id, teacher_name, email, phone, used_by_user_id, expires_at, created_at, used_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    (backup.schoolInvites || []).forEach((invite) => {
      insertInvite.run(
        invite.token,
        invite.school_id || invite.schoolId,
        invite.invited_by_user_id || invite.invitedByUserId,
        invite.teacher_name || invite.teacherName || '',
        invite.email,
        invite.phone || '',
        invite.used_by_user_id || invite.usedByUserId || null,
        invite.expires_at || invite.expiresAt,
        invite.created_at || invite.createdAt || nowIso(),
        invite.used_at || invite.usedAt || null
      );
    });

    const insertScoreSettings = db.prepare(`
      INSERT INTO school_score_table_settings (school_id, grade_start, grade_end, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    (backup.schoolScoreTableSettings || []).forEach((settings) => {
      insertScoreSettings.run(
        settings.school_id || settings.schoolId,
        settings.grade_start || settings.gradeStart,
        settings.grade_end || settings.gradeEnd,
        settings.created_at || settings.createdAt || nowIso(),
        settings.updated_at || settings.updatedAt || nowIso()
      );
    });

    const insertScoreTable = db.prepare(`
      INSERT INTO school_score_tables (id, school_id, grade, gender_group, starting_score, subjects_json, rows_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    (backup.schoolScoreTables || []).forEach((table) => {
      insertScoreTable.run(
        table.id,
        table.school_id || table.schoolId,
        table.grade,
        table.gender_group || table.genderGroup,
        table.starting_score ?? table.startingScore,
        table.subjects_json || JSON.stringify(table.subjects || []),
        table.rows_json || JSON.stringify(table.rows || []),
        table.created_at || table.createdAt || nowIso(),
        table.updated_at || table.updatedAt || nowIso()
      );
    });

    const insertClass = db.prepare(`
      INSERT INTO teacher_classes (id, user_id, name, grade, gender, school_id, order_index, student_count, roster_json, values_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    backup.teacherClasses.forEach((teacherClass) => {
      insertClass.run(
        teacherClass.id,
        teacherClass.user_id || teacherClass.userId,
        teacherClass.name,
        teacherClass.grade,
        teacherClass.gender,
        teacherClass.school_id || teacherClass.schoolId || null,
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

    const insertVerificationToken = db.prepare('INSERT OR REPLACE INTO email_verification_tokens (token_hash, user_id, expires_at, used_at, created_at) VALUES (?, ?, ?, ?, ?)');
    (backup.emailVerificationTokens || []).forEach((token) => {
      insertVerificationToken.run(token.token_hash || token.tokenHash, token.user_id || token.userId, token.expires_at || token.expiresAt, token.used_at || token.usedAt || null, token.created_at || token.createdAt || nowIso());
    });

    const insertRecoveryCode = db.prepare('INSERT OR REPLACE INTO admin_2fa_recovery_codes (code_hash, user_id, used_at, created_at) VALUES (?, ?, ?, ?)');
    (backup.adminTwoFactorRecoveryCodes || []).forEach((code) => {
      insertRecoveryCode.run(code.code_hash || code.codeHash, code.user_id || code.userId, code.used_at || code.usedAt || null, code.created_at || code.createdAt || nowIso());
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
    schools: (backup.schools || []).length,
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
    latestRestore: db.prepare("SELECT created_at FROM admin_audit_log WHERE action = 'restore_backup' ORDER BY created_at DESC LIMIT 1").get()?.created_at || '',
  };
}

function createSession(userId, details = {}) {
  deleteExpiredSessions();

  const token = crypto.randomBytes(32).toString('hex');
  const csrfToken = crypto.randomBytes(32).toString('base64url');
  const csrfTokenHash = crypto.createHash('sha256').update(csrfToken).digest('hex');
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)).toISOString();

  db.prepare(`
    INSERT INTO sessions (token, user_id, csrf_token_hash, ip_address, user_agent, last_seen_at, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(token, userId, csrfTokenHash, String(details.ip || '').slice(0, 120), String(details.userAgent || '').slice(0, 500), createdAt, expiresAt, createdAt);

  return { token, csrfToken, expiresAt };
}

function publicSessionId(token) {
  return crypto.createHash('sha256').update(String(token || '')).digest('hex').slice(0, 16);
}

function getSessionCsrfTokenHash(token) {
  if (!token) {
    return '';
  }

  deleteExpiredSessions();

  const row = db.prepare(`
    SELECT csrf_token_hash
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = ?
      AND sessions.expires_at > ?
      AND users.is_active = 1
  `).get(token, nowIso());

  return row?.csrf_token_hash || '';
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

  if (row) {
    db.prepare('UPDATE sessions SET last_seen_at = ? WHERE token = ?').run(nowIso(), token);
  }

  return serializeUser(row);
}

function listUserSessions(userId, currentToken = '') {
  deleteExpiredSessions();
  return db.prepare(`
    SELECT token, ip_address, user_agent, last_seen_at, expires_at, created_at
    FROM sessions
    WHERE user_id = ?
    ORDER BY last_seen_at DESC, created_at DESC
  `).all(userId).map((row) => ({
    id: publicSessionId(row.token),
    current: row.token === currentToken,
    ipAddress: row.ip_address || '',
    userAgent: row.user_agent || '',
    lastSeenAt: row.last_seen_at || row.created_at,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
  }));
}

function deleteOtherUserSessions(userId, currentToken = '') {
  const result = db.prepare('DELETE FROM sessions WHERE user_id = ? AND token != ?').run(userId, currentToken || '');
  return result.changes;
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
    schoolId: row.school_id || null,
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
    schoolId: row.school_id || null,
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
  const schoolId = payload.schoolId ? Number(payload.schoolId) : null;
  if (!canUserUseSchoolForClass(userId, schoolId)) {
    throw new Error('SCHOOL_ACCESS_DENIED');
  }
  const grade = normalizeTeacherClassGrade(payload.grade);
  const roster = Array.isArray(payload.roster) ? payload.roster : [];
  const values = payload.values && typeof payload.values === 'object' ? payload.values : {};

  const result = db.prepare(`
    INSERT INTO teacher_classes (user_id, name, grade, gender, school_id, order_index, student_count, roster_json, values_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    payload.name,
    grade,
    payload.gender,
    schoolId,
    Number(maxOrder) + 1,
    studentCount,
    JSON.stringify(roster),
    JSON.stringify(values),
    timestamp,
    timestamp
  );

  appendClassHistory(result.lastInsertRowid, 'created', { name: payload.name, grade, gender: payload.gender, schoolId, studentCount });
  return getTeacherClass(userId, result.lastInsertRowid);
}

function updateTeacherClass(userId, classId, payload) {
  const existing = getTeacherClass(userId, classId);

  if (!existing) {
    return null;
  }

  const timestamp = nowIso();
  const studentCount = Number(payload.studentCount ?? existing.studentCount);
  const schoolId = payload.schoolId === undefined ? existing.schoolId : (payload.schoolId ? Number(payload.schoolId) : null);
  if (!canUserUseSchoolForClass(userId, schoolId)) {
    throw new Error('SCHOOL_ACCESS_DENIED');
  }
  const grade = payload.grade === undefined ? normalizeTeacherClassGrade(existing.grade) : normalizeTeacherClassGrade(payload.grade);
  const roster = Array.isArray(payload.roster) ? payload.roster : existing.roster;
  const values = payload.values && typeof payload.values === 'object' ? payload.values : existing.values;

  db.prepare(`
    UPDATE teacher_classes
    SET name = ?, grade = ?, gender = ?, school_id = ?, student_count = ?, roster_json = ?, values_json = ?, updated_at = ?
    WHERE user_id = ? AND id = ?
  `).run(
    payload.name ?? existing.name,
    grade,
    payload.gender ?? existing.gender,
    schoolId,
    studentCount,
    JSON.stringify(roster),
    JSON.stringify(values),
    timestamp,
    userId,
    classId
  );

  appendClassHistory(classId, 'updated', {
    name: payload.name ?? existing.name,
    grade,
    gender: payload.gender ?? existing.gender,
    schoolId,
    studentCount,
  });

  return getTeacherClass(userId, classId);
}

function getTeacherClassScoreTable(userId, classId) {
  const teacherClass = getTeacherClass(userId, classId);
  if (!teacherClass) {
    return null;
  }
  if (!teacherClass.schoolId) {
    return { teacherClass, table: null, error: 'CLASS_HAS_NO_SCHOOL' };
  }

  const grade = normalizeTeacherClassGrade(teacherClass.grade);
  const rows = db.prepare(`
    SELECT *
    FROM school_score_tables
    WHERE school_id = ? AND grade = ? AND gender_group = ?
  `).all(teacherClass.schoolId, grade, teacherClass.gender);

  if (rows.length > 1) {
    return { teacherClass: { ...teacherClass, grade }, table: null, error: 'MULTIPLE_TABLES_FOUND' };
  }

  const row = rows[0];

  return {
    teacherClass: { ...teacherClass, grade },
    table: row ? serializeScoreTable(row) : null,
    error: row ? null : 'NO_SCORE_TABLE_FOR_CLASS',
  };
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
  const result = db.prepare(`
    INSERT INTO teacher_class_history (class_id, event_type, payload_json, created_at)
    VALUES (?, ?, ?, ?)
  `).run(classId, eventType, JSON.stringify(payload || {}), nowIso());
  const row = db.prepare('SELECT * FROM teacher_class_history WHERE id = ?').get(result.lastInsertRowid);
  return {
    id: row.id,
    eventType: row.event_type,
    payload: parseJson(row.payload_json, {}),
    createdAt: row.created_at,
  };
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

function updateTeacherClassHistorySemester(userId, classId, historyId, semester) {
  const teacherClass = getTeacherClass(userId, classId);
  if (!teacherClass || !['a', 'b'].includes(semester)) {
    return null;
  }

  const row = db.prepare('SELECT * FROM teacher_class_history WHERE class_id = ? AND id = ?').get(classId, historyId);
  if (!row) {
    return null;
  }

  const payload = parseJson(row.payload_json, {});
  payload.semester = semester;
  db.prepare('UPDATE teacher_class_history SET payload_json = ? WHERE id = ?').run(JSON.stringify(payload), historyId);
  return { id: historyId, eventType: row.event_type, payload, createdAt: row.created_at };
}

module.exports = {
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
  disableAdminTwoFactor,
  createTwoFactorChallenge,
  getTwoFactorChallenge,
  incrementTwoFactorChallengeAttempts,
  consumeTwoFactorChallenge,
  consumeAdminTwoFactorRecoveryCode,
  saveGraphSnapshot,
  getGraphSnapshot,
  logAdminAction,
  listAdminAuditLog,
  exportBackupData,
  restoreBackupData,
  getAdminDiagnostics,
  createSession,
  getSessionCsrfTokenHash,
  findUserBySessionToken,
  listUserSessions,
  deleteOtherUserSessions,
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
};
