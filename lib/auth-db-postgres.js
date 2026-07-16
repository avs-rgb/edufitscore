const crypto = require('crypto');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

function postgresSslConfig() {
  const url = process.env.DATABASE_URL || '';
  if (!url || /localhost|127\.0\.0\.1/i.test(url) || url.includes('sslmode=disable')) {
    return undefined;
  }
  return { rejectUnauthorized: false };
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: postgresSslConfig(),
});

function nowIso() {
  return new Date().toISOString();
}

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
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      csrf_token_hash TEXT NOT NULL DEFAULT '',
      ip_address TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT '',
      last_seen_at TEXT NOT NULL DEFAULT '',
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

    CREATE TABLE IF NOT EXISTS email_verification_tokens (
      token_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_2fa_recovery_codes (
      code_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      used_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS auth_2fa_challenges (
      token_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      attempt_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_2fa_recovery_regeneration_tokens (
      token_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL,
      ip_address TEXT,
      user_agent TEXT
    );

    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(name, city)
    );

    CREATE TABLE IF NOT EXISTS school_memberships (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
      membership_role TEXT NOT NULL CHECK(membership_role IN ('teacher', 'admin')),
      status TEXT NOT NULL CHECK(status IN ('pending', 'approved', 'rejected')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(user_id, school_id)
    );

    CREATE TABLE IF NOT EXISTS school_invites (
      token TEXT PRIMARY KEY,
      school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
      invited_by_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      teacher_name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      used_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      used_at TEXT
    );

    CREATE TABLE IF NOT EXISTS school_score_table_settings (
      school_id INTEGER PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,
      grade_start INTEGER NOT NULL DEFAULT 1,
      grade_end INTEGER NOT NULL DEFAULT 6,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS school_score_tables (
      id SERIAL PRIMARY KEY,
      school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
      grade INTEGER NOT NULL,
      gender_group TEXT NOT NULL CHECK(gender_group IN ('male', 'female', 'other')),
      starting_score INTEGER NOT NULL,
      subjects_json TEXT NOT NULL,
      rows_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(school_id, grade, gender_group)
    );
  `);
  await query("ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name TEXT NOT NULL DEFAULT ''");
  await query("ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT NOT NULL DEFAULT ''");
  await query("ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT ''");
  await query("ALTER TABLE users ADD COLUMN IF NOT EXISTS city TEXT NOT NULL DEFAULT ''");
  await query("ALTER TABLE users ADD COLUMN IF NOT EXISTS school_name TEXT NOT NULL DEFAULT ''");
  await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS must_change_password INTEGER NOT NULL DEFAULT 0');
  await query("ALTER TABLE users ADD COLUMN IF NOT EXISTS totp_secret TEXT NOT NULL DEFAULT ''");
  await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS totp_enabled INTEGER NOT NULL DEFAULT 0');
  await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS totp_enabled_at TEXT');
  await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified INTEGER NOT NULL DEFAULT 1');
  await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at TEXT');
  await query('UPDATE users SET email_verified_at = updated_at WHERE email_verified = 1 AND email_verified_at IS NULL');
  await query("UPDATE users SET email_verified = 1, email_verified_at = COALESCE(email_verified_at, updated_at) WHERE role = 'admin'");
  await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active INTEGER NOT NULL DEFAULT 1');
  await query("ALTER TABLE sessions ADD COLUMN IF NOT EXISTS csrf_token_hash TEXT NOT NULL DEFAULT ''");
  await query("DELETE FROM sessions WHERE csrf_token_hash = ''");
  await query("ALTER TABLE sessions ADD COLUMN IF NOT EXISTS ip_address TEXT NOT NULL DEFAULT ''");
  await query("ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user_agent TEXT NOT NULL DEFAULT ''");
  await query("ALTER TABLE sessions ADD COLUMN IF NOT EXISTS last_seen_at TEXT NOT NULL DEFAULT ''");
  await query("UPDATE sessions SET last_seen_at = created_at WHERE last_seen_at = ''");
  await query('ALTER TABLE teacher_classes ADD COLUMN IF NOT EXISTS order_index INTEGER NOT NULL DEFAULT 0');
  await query("ALTER TABLE teacher_classes ADD COLUMN IF NOT EXISTS values_json TEXT NOT NULL DEFAULT '{}'");
  await query('ALTER TABLE teacher_classes ADD COLUMN IF NOT EXISTS school_id INTEGER REFERENCES schools(id) ON DELETE SET NULL');
  await query("CREATE UNIQUE INDEX IF NOT EXISTS one_school_admin_per_school ON school_memberships(school_id) WHERE membership_role = 'admin' AND status != 'rejected'");
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

async function serializeUser(row) {
  if (!row) {
    return null;
  }

  const schoolMemberships = await listUserSchoolMemberships(row.id);
  const schoolAdminMembership = schoolMemberships.find((item) => item.role === 'admin' && item.status === 'approved');
  const approvedTeacherSchool = schoolMemberships.find((item) => item.role === 'teacher' && item.status === 'approved');

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
    isSchoolAdmin: Boolean(schoolAdminMembership),
    canEnterScores: row.role === 'admin' || Boolean(schoolAdminMembership) || Boolean(approvedTeacherSchool),
    schoolMemberships,
    schoolAdminSchool: schoolAdminMembership?.school || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
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
    subjects: parseJson(row.subjects_json, []),
    rows: parseJson(row.rows_json, []),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function serializeSchool(row) {
  return row ? { id: row.id, name: row.name, city: row.city } : null;
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
  return generatedRows.map((row) => {
    const incoming = incomingByScore.get(row.score);
    const incomingValues = incoming && incoming.values && typeof incoming.values === 'object' ? incoming.values : {};
    const values = {};
    subjects.forEach((subject) => {
      values[subject.id] = row.score === 0 ? '0' : String(incomingValues[subject.id] || '').trim();
    });
    return { score: row.score, values };
  });
}

async function canUserUseSchoolForClass(userId, schoolId) {
  if (!schoolId) {
    return true;
  }
  const result = await readyQuery(`
    SELECT 1
    FROM school_memberships
    WHERE user_id = $1
      AND school_id = $2
      AND status = 'approved'
      AND membership_role IN ('teacher', 'admin')
    LIMIT 1
  `, [userId, schoolId]);
  return Boolean(result.rows[0]);
}

async function listSchools() {
  const result = await readyQuery('SELECT * FROM schools ORDER BY city, name');
  return result.rows.map(serializeSchool);
}

async function listUserSchoolMemberships(userId) {
  const result = await readyQuery(`
    SELECT school_memberships.id AS membership_id, school_memberships.status, school_memberships.membership_role, schools.*
    FROM school_memberships
    JOIN schools ON schools.id = school_memberships.school_id
    WHERE school_memberships.user_id = $1
    ORDER BY (school_memberships.status = 'approved') DESC, schools.city, schools.name
  `, [userId]);
  return result.rows.map((row) => ({
    membershipId: row.membership_id,
    role: row.membership_role,
    status: row.status,
    school: serializeSchool(row),
  }));
}

async function addSchoolMembership(userId, schoolId, role, status) {
  const existing = await readyQuery('SELECT membership_role, status FROM school_memberships WHERE user_id = $1 AND school_id = $2', [userId, schoolId]);
  if (existing.rows[0]) {
    if (existing.rows[0].membership_role === role && existing.rows[0].status === status) {
      return;
    }
    throw new Error(`TEACHER_ALREADY_LINKED_${String(existing.rows[0].status || 'existing').toUpperCase()}`);
  }

  if (role === 'teacher') {
    const count = await readyQuery(`
      SELECT COUNT(*) AS count
      FROM school_memberships
      WHERE user_id = $1
        AND membership_role = 'teacher'
        AND status IN ('pending', 'approved')
    `, [userId]);
    if (Number(count.rows[0].count) >= 3) {
      throw new Error('SCHOOL_LIMIT_REACHED');
    }
  }

  const timestamp = nowIso();
  try {
    await readyQuery(`
      INSERT INTO school_memberships (user_id, school_id, membership_role, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [userId, schoolId, role, status, timestamp, timestamp]);
  } catch (error) {
    if (error.code === '23505') {
      throw new Error('SCHOOL_ADMIN_EXISTS');
    }
    throw error;
  }
}

async function requestTeacherSchool(userId, schoolId) {
  await addSchoolMembership(userId, Number(schoolId), 'teacher', 'pending');
  return listUserSchoolMemberships(userId);
}

async function findOrCreateSchool(name, city) {
  const cleanName = String(name || '').trim();
  const cleanCity = String(city || '').trim();
  if (!cleanName || !cleanCity) {
    throw new Error('MISSING_SCHOOL');
  }
  const timestamp = nowIso();
  const result = await readyQuery(`
    INSERT INTO schools (name, city, created_at, updated_at)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (name, city) DO UPDATE SET updated_at = schools.updated_at
    RETURNING *
  `, [cleanName, cleanCity, timestamp, timestamp]);
  return result.rows[0];
}

async function applySchoolInvite(userId, token, email) {
  return readyTransaction(async (client) => {
    if (!token) {
      return false;
    }

    const result = await client.query(`
      SELECT *
      FROM school_invites
      WHERE token = $1
        AND used_at IS NULL
        AND expires_at > $2
      FOR UPDATE
    `, [String(token), nowIso()]);
    const row = result.rows[0];
    if (!row) {
      throw new Error('INVALID_INVITE');
    }
    if (row.email !== String(email || '').trim().toLowerCase()) {
      throw new Error('INVITE_EMAIL_MISMATCH');
    }

    const existing = await client.query('SELECT membership_role, status FROM school_memberships WHERE user_id = $1 AND school_id = $2', [userId, row.school_id]);
    if (existing.rows[0]) {
      if (!(existing.rows[0].membership_role === 'teacher' && existing.rows[0].status === 'approved')) {
        throw new Error(`TEACHER_ALREADY_LINKED_${String(existing.rows[0].status || 'existing').toUpperCase()}`);
      }
      await client.query('UPDATE school_invites SET used_by_user_id = $1, used_at = $2 WHERE token = $3 AND used_at IS NULL', [userId, nowIso(), row.token]);
      return true;
    }

    const count = await client.query(`
      SELECT COUNT(*) AS count
      FROM school_memberships
      WHERE user_id = $1
        AND membership_role = 'teacher'
        AND status IN ('pending', 'approved')
    `, [userId]);
    if (Number(count.rows[0].count) >= 3) {
      throw new Error('SCHOOL_LIMIT_REACHED');
    }

    const timestamp = nowIso();
    await client.query(`
      INSERT INTO school_memberships (user_id, school_id, membership_role, status, created_at, updated_at)
      VALUES ($1, $2, 'teacher', 'approved', $3, $4)
    `, [userId, row.school_id, timestamp, timestamp]);
    await client.query('UPDATE school_invites SET used_by_user_id = $1, used_at = $2 WHERE token = $3 AND used_at IS NULL', [userId, timestamp, row.token]);
    return true;
  });
}

async function getSchoolAdminSchool(userId) {
  const result = await readyQuery(`
    SELECT schools.*
    FROM school_memberships
    JOIN schools ON schools.id = school_memberships.school_id
    WHERE school_memberships.user_id = $1
      AND school_memberships.membership_role = 'admin'
      AND school_memberships.status = 'approved'
    LIMIT 1
  `, [userId]);
  return result.rows[0] || null;
}

async function listSchoolAdminOverview(userId) {
  const school = await getSchoolAdminSchool(userId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const result = await readyQuery(`
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
    WHERE school_memberships.school_id = $1
      AND school_memberships.membership_role = 'teacher'
      AND users.is_active = 1
    ORDER BY users.full_name, teacher_classes.order_index ASC, teacher_classes.id DESC
  `, [school.id]);
  const teachers = new Map();
  result.rows.forEach((row) => {
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
      teachers.get(row.user_id).classes.push({ id: row.class_id, name: row.class_name, grade: row.grade, gender: row.gender, studentCount: row.student_count });
    }
  });
  return { school: serializeSchool(school), teachers: Array.from(teachers.values()) };
}

async function setSchoolTeacherStatus(adminUserId, membershipId, status) {
  if (!['approved', 'rejected'].includes(status)) {
    throw new Error('INVALID_STATUS');
  }
  const school = await getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const result = await readyQuery(`
    UPDATE school_memberships
    SET status = $1, updated_at = $2
    WHERE id = $3 AND school_id = $4 AND membership_role = 'teacher'
  `, [status, nowIso(), membershipId, school.id]);
  return result.rowCount > 0;
}

async function removeSchoolTeacher(adminUserId, membershipId) {
  const school = await getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const result = await readyQuery('DELETE FROM school_memberships WHERE id = $1 AND school_id = $2 AND membership_role = $3', [membershipId, school.id, 'teacher']);
  return result.rowCount > 0;
}

async function createSchoolInvite(adminUserId, payload) {
  const school = await getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const email = String(payload.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) {
    throw new Error('INVALID_EMAIL');
  }
  const existingUser = await findAnyUserByEmail(email);
  if (existingUser) {
    const existingMembership = await readyQuery(`
      SELECT status FROM school_memberships
      WHERE user_id = $1 AND school_id = $2 AND membership_role = 'teacher'
      LIMIT 1
    `, [existingUser.id, school.id]);
    if (existingMembership.rows[0]) {
      throw new Error(`TEACHER_ALREADY_LINKED_${existingMembership.rows[0].status.toUpperCase()}`);
    }
  }
  const token = crypto.randomBytes(24).toString('base64url');
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24 * 14)).toISOString();
  await readyQuery(`
    INSERT INTO school_invites (token, school_id, invited_by_user_id, teacher_name, email, phone, expires_at, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `, [token, school.id, adminUserId, String(payload.teacherName || '').trim(), email, String(payload.phone || '').trim(), expiresAt, createdAt]);
  return { token, school: serializeSchool(school), email, phone: String(payload.phone || '').trim(), teacherName: String(payload.teacherName || '').trim(), expiresAt };
}

async function permanentlyDeleteUser(userId) {
  const result = await readyQuery('SELECT * FROM users WHERE id = $1', [userId]);
  const row = result.rows[0];
  if (!row) {
    throw new Error('USER_NOT_FOUND');
  }
  if (row.is_active) {
    throw new Error('USER_ACTIVE');
  }
  await readyQuery('DELETE FROM users WHERE id = $1', [userId]);
  return true;
}

async function getSchoolScoreTableSettings(schoolId) {
  let result = await readyQuery('SELECT * FROM school_score_table_settings WHERE school_id = $1', [schoolId]);
  if (!result.rows[0]) {
    const timestamp = nowIso();
    await readyQuery(`
      INSERT INTO school_score_table_settings (school_id, grade_start, grade_end, created_at, updated_at)
      VALUES ($1, 1, 6, $2, $3)
      ON CONFLICT (school_id) DO NOTHING
    `, [schoolId, timestamp, timestamp]);
    result = await readyQuery('SELECT * FROM school_score_table_settings WHERE school_id = $1', [schoolId]);
  }
  const row = result.rows[0];
  return { gradeStart: row.grade_start, gradeEnd: row.grade_end };
}

async function updateSchoolScoreTableSettings(adminUserId, payload) {
  const school = await getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const gradeStart = normalizeScoreTableGrade(payload.gradeStart);
  const gradeEnd = normalizeScoreTableGrade(payload.gradeEnd);
  if (gradeStart > gradeEnd) {
    throw new Error('INVALID_GRADE_RANGE');
  }
  const timestamp = nowIso();
  await readyQuery(`
    INSERT INTO school_score_table_settings (school_id, grade_start, grade_end, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (school_id) DO UPDATE SET grade_start = EXCLUDED.grade_start, grade_end = EXCLUDED.grade_end, updated_at = EXCLUDED.updated_at
  `, [school.id, gradeStart, gradeEnd, timestamp, timestamp]);
  return getSchoolScoreTableSettings(school.id);
}

async function listSchoolScoreTables(adminUserId) {
  const school = await getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const result = await readyQuery(`
    SELECT * FROM school_score_tables
    WHERE school_id = $1
    ORDER BY grade ASC, CASE gender_group WHEN 'male' THEN 1 WHEN 'female' THEN 2 ELSE 3 END, id ASC
  `, [school.id]);
  return { school: serializeSchool(school), settings: await getSchoolScoreTableSettings(school.id), tables: result.rows.map(serializeScoreTable) };
}

async function listPublicSchoolScoreTables(schoolId) {
  const schoolResult = await readyQuery('SELECT * FROM schools WHERE id = $1', [Number(schoolId)]);
  const school = schoolResult.rows[0];
  if (!school) {
    return null;
  }
  const result = await readyQuery(`
    SELECT * FROM school_score_tables
    WHERE school_id = $1
    ORDER BY grade ASC, CASE gender_group WHEN 'male' THEN 1 WHEN 'female' THEN 2 ELSE 3 END, id ASC
  `, [school.id]);
  return { school: serializeSchool(school), settings: await getSchoolScoreTableSettings(school.id), tables: result.rows.map(serializeScoreTable) };
}

async function createSchoolScoreTable(adminUserId, payload) {
  const school = await getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const count = await readyQuery('SELECT COUNT(*) AS count FROM school_score_tables WHERE school_id = $1', [school.id]);
  if (Number(count.rows[0].count) >= 36) {
    throw new Error('SCORE_TABLE_LIMIT_REACHED');
  }
  const settings = await getSchoolScoreTableSettings(school.id);
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
    const result = await readyQuery(`
      INSERT INTO school_score_tables (school_id, grade, gender_group, starting_score, subjects_json, rows_json, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [school.id, grade, genderGroup, startingScore, JSON.stringify(subjects), JSON.stringify(rows), timestamp, timestamp]);
    return serializeScoreTable(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      throw new Error('SCORE_TABLE_EXISTS');
    }
    throw error;
  }
}

async function updateSchoolScoreTable(adminUserId, tableId, payload) {
  const school = await getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const existingResult = await readyQuery('SELECT * FROM school_score_tables WHERE id = $1 AND school_id = $2', [tableId, school.id]);
  const existing = existingResult.rows[0];
  if (!existing) {
    return null;
  }
  const startingScore = payload.startingScore === undefined ? existing.starting_score : normalizeStartingScore(payload.startingScore);
  const subjects = normalizeScoreTableSubjects(payload.subjects === undefined ? parseJson(existing.subjects_json, []) : payload.subjects);
  const rows = normalizeScoreTableRows(payload.rows === undefined ? parseJson(existing.rows_json, []) : payload.rows, startingScore, subjects);
  const result = await readyQuery(`
    UPDATE school_score_tables
    SET starting_score = $1, subjects_json = $2, rows_json = $3, updated_at = $4
    WHERE id = $5 AND school_id = $6
    RETURNING *
  `, [startingScore, JSON.stringify(subjects), JSON.stringify(rows), nowIso(), tableId, school.id]);
  return serializeScoreTable(result.rows[0]);
}

async function deleteSchoolScoreTable(adminUserId, tableId) {
  const school = await getSchoolAdminSchool(adminUserId);
  if (!school) {
    throw new Error('SCHOOL_ADMIN_NOT_FOUND');
  }
  const result = await readyQuery('DELETE FROM school_score_tables WHERE id = $1 AND school_id = $2', [tableId, school.id]);
  return result.rowCount > 0;
}

async function seedGlobalAdmin() {
  const email = String(process.env.INITIAL_ADMIN_EMAIL || 'admin@edufitscore.co.il').trim().toLowerCase();
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  const firstName = 'Global';
  const lastName = 'Admin';
  const timestamp = nowIso();
  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);

  if (existing.rows[0]) {
    return;
  }

  if (!password) {
    return;
  }

  await query(`
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, must_change_password, email_verified, email_verified_at, is_active, created_at, updated_at)
    VALUES ($1, $2, 'admin', $3, $4, $5, 1, 1, $6, 1, $7, $8)
  `, [email, bcrypt.hashSync(password, 10), `${firstName} ${lastName}`, firstName, lastName, timestamp, timestamp, timestamp]);
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
  if (!user.email_verified) {
    throw new Error('EMAIL_NOT_VERIFIED');
  }
  return bcrypt.compareSync(password, user.password_hash) ? await serializeUser(user) : null;
}

async function findUserForSecurityAudit(email) {
  const row = await findAnyUserByEmail(email);
  return row ? await serializeUser(row) : null;
}

async function verifyUserPassword(userId, password) {
  const result = await readyQuery('SELECT password_hash FROM users WHERE id = $1 AND is_active = 1', [userId]);
  const user = result.rows[0];
  return Boolean(user && bcrypt.compareSync(password || '', user.password_hash));
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
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, email_verified, email_verified_at, is_active, created_at, updated_at)
    VALUES ($1, $2, 'teacher', $3, $4, $5, $6, $7, $8, 0, NULL, 1, $9, $10)
    RETURNING *
  `, [email, bcrypt.hashSync(payload.password, 10), `${firstName} ${lastName}`.trim(), firstName, lastName, String(payload.phone || '').trim(), String(payload.city || '').trim(), String(payload.schoolName || '').trim(), timestamp, timestamp]);

  try {
    const accountType = payload.accountType === 'school_admin' ? 'school_admin' : 'teacher';
    if (accountType === 'school_admin') {
      const school = await findOrCreateSchool(payload.schoolName, payload.schoolCity || payload.city);
      await addSchoolMembership(result.rows[0].id, school.id, 'admin', 'approved');
    } else if (payload.inviteToken) {
      await applySchoolInvite(result.rows[0].id, payload.inviteToken, email);
    } else if (payload.schoolId) {
      await addSchoolMembership(result.rows[0].id, Number(payload.schoolId), 'teacher', 'pending');
    }
  } catch (error) {
    await readyQuery('DELETE FROM users WHERE id = $1', [result.rows[0].id]);
    throw error;
  }

  return await serializeUser(result.rows[0]);
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
  return await serializeUser(result.rows[0]);
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
  return Promise.all(result.rows.map(serializeUser));
}

async function listUsers() {
  const result = await readyQuery('SELECT * FROM users ORDER BY is_active DESC, updated_at DESC, id DESC');
  return Promise.all(result.rows.map(serializeUser));
}

async function restoreUserByEmail(email) {
  const row = await findAnyUserByEmail(email);
  if (!row) {
    throw new Error('USER_NOT_FOUND');
  }
  const result = await readyQuery('UPDATE users SET is_active = 1, updated_at = $1 WHERE id = $2 RETURNING *', [nowIso(), row.id]);
  return await serializeUser(result.rows[0]);
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
  return await serializeUser(result.rows[0]);
}

async function adminResetUserPassword(userId, newPassword, currentSessionToken = '') {
  const existing = await readyQuery('SELECT * FROM users WHERE id = $1', [userId]);
  if (!existing.rows[0]) {
    throw new Error('USER_NOT_FOUND');
  }
  if (!newPassword || String(newPassword).length < 8) {
    throw new Error('INVALID_PASSWORD');
  }
  const result = await readyQuery('UPDATE users SET password_hash = $1, must_change_password = 1, updated_at = $2 WHERE id = $3 RETURNING *', [bcrypt.hashSync(String(newPassword), 10), nowIso(), userId]);
  if (currentSessionToken) {
    await readyQuery('DELETE FROM sessions WHERE user_id = $1 AND token != $2', [userId, currentSessionToken]);
  } else {
    await readyQuery('DELETE FROM sessions WHERE user_id = $1', [userId]);
  }
  return await serializeUser(result.rows[0]);
}

function hashPasswordResetToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

function hashTwoFactorToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

async function getAdminTwoFactorState(userId) {
  const result = await readyQuery('SELECT id, role, totp_secret, totp_enabled, totp_enabled_at FROM users WHERE id = $1 AND is_active = 1', [userId]);
  const row = result.rows[0];
  if (!row || row.role !== 'admin') {
    return null;
  }
  const recovery = await readyQuery('SELECT COUNT(*) AS count FROM admin_2fa_recovery_codes WHERE user_id = $1 AND used_at IS NULL', [userId]);
  return {
    enabled: Boolean(row.totp_enabled),
    secret: row.totp_secret || '',
    enabledAt: row.totp_enabled_at || '',
    recoveryCodeCount: Number(recovery.rows[0].count),
  };
}

async function saveAdminTwoFactorSecret(userId, secret) {
  const result = await readyQuery('SELECT role FROM users WHERE id = $1 AND is_active = 1', [userId]);
  const row = result.rows[0];
  if (!row || row.role !== 'admin') {
    throw new Error('ADMIN_REQUIRED');
  }
  await readyQuery('UPDATE users SET totp_secret = $1, totp_enabled = 0, totp_enabled_at = NULL, updated_at = $2 WHERE id = $3', [String(secret || ''), nowIso(), userId]);
  await readyQuery('DELETE FROM admin_2fa_recovery_codes WHERE user_id = $1', [userId]);
}

async function enableAdminTwoFactor(userId, recoveryCodes) {
  const existing = await readyQuery('SELECT role, totp_secret FROM users WHERE id = $1 AND is_active = 1', [userId]);
  const row = existing.rows[0];
  if (!row || row.role !== 'admin' || !row.totp_secret) {
    throw new Error('TWO_FACTOR_SETUP_REQUIRED');
  }
  const timestamp = nowIso();
  await readyTransaction(async (client) => {
    await client.query('UPDATE users SET totp_enabled = 1, totp_enabled_at = $1, updated_at = $2 WHERE id = $3', [timestamp, timestamp, userId]);
    await client.query('DELETE FROM admin_2fa_recovery_codes WHERE user_id = $1', [userId]);
    for (const code of recoveryCodes || []) {
      await client.query('INSERT INTO admin_2fa_recovery_codes (code_hash, user_id, created_at) VALUES ($1, $2, $3) ON CONFLICT (code_hash) DO UPDATE SET user_id = EXCLUDED.user_id, used_at = NULL, created_at = EXCLUDED.created_at', [hashTwoFactorToken(code), userId, timestamp]);
    }
  });
  return getAdminTwoFactorState(userId);
}

async function replaceAdminTwoFactorRecoveryCodes(userId, recoveryCodes) {
  const existing = await readyQuery("SELECT id FROM users WHERE id = $1 AND role = 'admin' AND is_active = 1 AND totp_enabled = 1", [userId]);
  if (!existing.rows[0]) {
    throw new Error('TWO_FACTOR_NOT_ENABLED');
  }
  const timestamp = nowIso();
  await readyTransaction(async (client) => {
    await client.query('DELETE FROM admin_2fa_recovery_codes WHERE user_id = $1', [userId]);
    for (const code of recoveryCodes || []) {
      await client.query('INSERT INTO admin_2fa_recovery_codes (code_hash, user_id, created_at) VALUES ($1, $2, $3) ON CONFLICT (code_hash) DO UPDATE SET user_id = EXCLUDED.user_id, used_at = NULL, created_at = EXCLUDED.created_at', [hashTwoFactorToken(code), userId, timestamp]);
    }
  });
  return getAdminTwoFactorState(userId);
}

async function disableAdminTwoFactor(userId) {
  const timestamp = nowIso();
  await readyQuery("UPDATE users SET totp_secret = '', totp_enabled = 0, totp_enabled_at = NULL, updated_at = $1 WHERE id = $2 AND role = 'admin'", [timestamp, userId]);
  await readyQuery('DELETE FROM admin_2fa_recovery_codes WHERE user_id = $1', [userId]);
  await readyQuery('DELETE FROM auth_2fa_challenges WHERE user_id = $1', [userId]);
}

async function createTwoFactorChallenge(userId) {
  await deleteExpiredTwoFactorChallenges();
  const existing = await readyQuery("SELECT id FROM users WHERE id = $1 AND role = 'admin' AND is_active = 1 AND totp_enabled = 1", [userId]);
  if (!existing.rows[0]) {
    throw new Error('TWO_FACTOR_NOT_ENABLED');
  }
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashTwoFactorToken(token);
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 10)).toISOString();
  await readyQuery('DELETE FROM auth_2fa_challenges WHERE user_id = $1', [userId]);
  await readyQuery('INSERT INTO auth_2fa_challenges (token_hash, user_id, expires_at, created_at) VALUES ($1, $2, $3, $4)', [tokenHash, userId, expiresAt, createdAt]);
  return { token, expiresAt };
}

async function getTwoFactorChallenge(token) {
  await deleteExpiredTwoFactorChallenges();
  if (!token) {
    return null;
  }
  const result = await readyQuery(`
    SELECT auth_2fa_challenges.*, users.totp_secret, users.email, users.role
    FROM auth_2fa_challenges
    JOIN users ON users.id = auth_2fa_challenges.user_id
    WHERE auth_2fa_challenges.token_hash = $1
      AND auth_2fa_challenges.used_at IS NULL
      AND auth_2fa_challenges.expires_at > $2
      AND users.is_active = 1
      AND users.role = 'admin'
      AND users.totp_enabled = 1
  `, [hashTwoFactorToken(token), nowIso()]);
  const row = result.rows[0];
  return row ? { tokenHash: row.token_hash, userId: row.user_id, secret: row.totp_secret, email: row.email, attemptCount: row.attempt_count } : null;
}

async function incrementTwoFactorChallengeAttempts(token) {
  if (!token) return;
  await readyQuery('UPDATE auth_2fa_challenges SET attempt_count = attempt_count + 1 WHERE token_hash = $1', [hashTwoFactorToken(token)]);
}

async function consumeTwoFactorChallenge(token) {
  if (!token) return;
  await readyQuery('UPDATE auth_2fa_challenges SET used_at = $1 WHERE token_hash = $2', [nowIso(), hashTwoFactorToken(token)]);
}

async function consumeAdminTwoFactorRecoveryCode(userId, code) {
  const codeHash = hashTwoFactorToken(code);
  const result = await readyQuery('SELECT code_hash FROM admin_2fa_recovery_codes WHERE user_id = $1 AND code_hash = $2 AND used_at IS NULL', [userId, codeHash]);
  if (!result.rows[0]) {
    return false;
  }
  await readyQuery('UPDATE admin_2fa_recovery_codes SET used_at = $1 WHERE code_hash = $2', [nowIso(), codeHash]);
  return true;
}

async function deleteExpiredTwoFactorChallenges() {
  await readyQuery('DELETE FROM auth_2fa_challenges WHERE expires_at <= $1 OR used_at IS NOT NULL', [nowIso()]);
}

async function deleteExpiredTwoFactorRecoveryRegenerationTokens() {
  await readyQuery('DELETE FROM admin_2fa_recovery_regeneration_tokens WHERE expires_at <= $1 OR used_at IS NOT NULL', [nowIso()]);
}

async function createTwoFactorRecoveryRegenerationToken(userId, details = {}) {
  await deleteExpiredTwoFactorRecoveryRegenerationTokens();
  const result = await readyQuery("SELECT id, email FROM users WHERE id = $1 AND role = 'admin' AND is_active = 1 AND totp_enabled = 1", [userId]);
  const row = result.rows[0];
  if (!row) {
    throw new Error('TWO_FACTOR_NOT_ENABLED');
  }
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashTwoFactorToken(token);
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (15 * 60 * 1000)).toISOString();
  await readyQuery('DELETE FROM admin_2fa_recovery_regeneration_tokens WHERE user_id = $1', [userId]);
  await readyQuery(`
    INSERT INTO admin_2fa_recovery_regeneration_tokens (token_hash, user_id, expires_at, created_at, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [tokenHash, userId, expiresAt, createdAt, String(details.ip || '').slice(0, 120), String(details.userAgent || '').slice(0, 500)]);
  return { token, expiresAt, user: { id: row.id, email: row.email } };
}

async function getTwoFactorRecoveryRegenerationToken(token) {
  await deleteExpiredTwoFactorRecoveryRegenerationTokens();
  if (!token) {
    return null;
  }
  const result = await readyQuery(`
    SELECT admin_2fa_recovery_regeneration_tokens.*, users.email, users.role, users.totp_enabled
    FROM admin_2fa_recovery_regeneration_tokens
    JOIN users ON users.id = admin_2fa_recovery_regeneration_tokens.user_id
    WHERE admin_2fa_recovery_regeneration_tokens.token_hash = $1
      AND admin_2fa_recovery_regeneration_tokens.used_at IS NULL
      AND admin_2fa_recovery_regeneration_tokens.expires_at > $2
      AND users.is_active = 1
      AND users.role = 'admin'
      AND users.totp_enabled = 1
  `, [hashTwoFactorToken(token), nowIso()]);
  const row = result.rows[0];
  return row ? { tokenHash: row.token_hash, userId: row.user_id, email: row.email, expiresAt: row.expires_at } : null;
}

async function consumeTwoFactorRecoveryRegenerationToken(token) {
  if (!token) return;
  await readyQuery('UPDATE admin_2fa_recovery_regeneration_tokens SET used_at = $1 WHERE token_hash = $2', [nowIso(), hashTwoFactorToken(token)]);
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
  return { token, expiresAt, user: await serializeUser(row) };
}

async function deleteExpiredEmailVerificationTokens() {
  await readyQuery('DELETE FROM email_verification_tokens WHERE expires_at <= $1 OR used_at IS NOT NULL', [nowIso()]);
}

async function createEmailVerificationToken(userId) {
  await deleteExpiredEmailVerificationTokens();
  const result = await readyQuery('SELECT * FROM users WHERE id = $1 AND is_active = 1', [userId]);
  const row = result.rows[0];
  if (!row || row.email_verified) {
    return null;
  }
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashPasswordResetToken(token);
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString();
  await readyQuery('DELETE FROM email_verification_tokens WHERE user_id = $1', [row.id]);
  await readyQuery('INSERT INTO email_verification_tokens (token_hash, user_id, expires_at, created_at) VALUES ($1, $2, $3, $4)', [tokenHash, row.id, expiresAt, createdAt]);
  return { token, expiresAt, user: await serializeUser(row) };
}

async function verifyEmailWithToken(token) {
  await deleteExpiredEmailVerificationTokens();
  if (!token) {
    throw new Error('INVALID_VERIFICATION');
  }
  const tokenHash = hashPasswordResetToken(token);
  const result = await readyQuery(`
    SELECT email_verification_tokens.*, users.id AS user_id
    FROM email_verification_tokens
    JOIN users ON users.id = email_verification_tokens.user_id
    WHERE email_verification_tokens.token_hash = $1
      AND email_verification_tokens.used_at IS NULL
      AND email_verification_tokens.expires_at > $2
      AND users.is_active = 1
  `, [tokenHash, nowIso()]);
  const row = result.rows[0];
  if (!row) {
    throw new Error('INVALID_VERIFICATION');
  }
  const timestamp = nowIso();
  await readyQuery('UPDATE email_verification_tokens SET used_at = $1 WHERE token_hash = $2', [timestamp, tokenHash]);
  await readyQuery('UPDATE users SET email_verified = 1, email_verified_at = $1, updated_at = $2 WHERE id = $3', [timestamp, timestamp, row.user_id]);
}

async function deleteUnverifiedUser(userId) {
  await readyQuery('DELETE FROM users WHERE id = $1 AND email_verified = 0', [userId]);
}

async function resetPasswordWithToken(token, newPassword) {
  await deleteExpiredPasswordResetTokens();
  if (!token || !newPassword || String(newPassword).length < 8) {
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
  const [users, schools, schoolMemberships, schoolScoreTableSettings, schoolScoreTables, teacherClasses, teacherClassHistory, adminAuditLog, graphSnapshots, adminTwoFactorRecoveryCodes, emailVerificationTokens] = await Promise.all([
    readyQuery('SELECT id, email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, must_change_password, totp_secret, totp_enabled, totp_enabled_at, email_verified, email_verified_at, is_active, created_at, updated_at FROM users ORDER BY id'),
    readyQuery('SELECT * FROM schools ORDER BY id'),
    readyQuery('SELECT * FROM school_memberships ORDER BY id'),
    readyQuery('SELECT * FROM school_score_table_settings ORDER BY school_id'),
    readyQuery('SELECT * FROM school_score_tables ORDER BY school_id, grade, gender_group'),
    readyQuery('SELECT * FROM teacher_classes ORDER BY user_id, order_index, id'),
    readyQuery('SELECT * FROM teacher_class_history ORDER BY class_id, created_at, id'),
    readyQuery('SELECT * FROM admin_audit_log ORDER BY created_at DESC, id DESC'),
    readyQuery('SELECT * FROM graph_snapshots ORDER BY created_at DESC'),
    readyQuery('SELECT * FROM admin_2fa_recovery_codes ORDER BY user_id, created_at'),
    readyQuery('SELECT * FROM email_verification_tokens ORDER BY user_id, created_at'),
  ]);
  return {
    exportedAt: nowIso(),
    users: users.rows,
    schools: schools.rows,
    schoolMemberships: schoolMemberships.rows,
    schoolScoreTableSettings: schoolScoreTableSettings.rows,
    schoolScoreTables: schoolScoreTables.rows,
    teacherClasses: teacherClasses.rows,
    teacherClassHistory: teacherClassHistory.rows,
    adminAuditLog: adminAuditLog.rows,
    graphSnapshots: graphSnapshots.rows,
    adminTwoFactorRecoveryCodes: adminTwoFactorRecoveryCodes.rows,
    emailVerificationTokens: emailVerificationTokens.rows,
  };
}

async function restoreBackupData(backup, adminUserId = null) {
  if (!backup || !Array.isArray(backup.users) || !Array.isArray(backup.teacherClasses) || !Array.isArray(backup.teacherClassHistory)) {
    throw new Error('INVALID_BACKUP');
  }
  if ((backup.schools && !Array.isArray(backup.schools)) || (backup.schoolMemberships && !Array.isArray(backup.schoolMemberships)) || (backup.schoolScoreTables && !Array.isArray(backup.schoolScoreTables))) {
    throw new Error('INVALID_BACKUP');
  }
  await readyTransaction(async (client) => {
    await client.query('DELETE FROM teacher_class_history');
    await client.query('DELETE FROM teacher_classes');
    await client.query('DELETE FROM school_score_tables');
    await client.query('DELETE FROM school_score_table_settings');
    await client.query('DELETE FROM school_invites');
    await client.query('DELETE FROM school_memberships');
    await client.query('DELETE FROM schools');
    await client.query('DELETE FROM password_reset_tokens');
    await client.query('DELETE FROM email_verification_tokens');
    await client.query('DELETE FROM admin_2fa_recovery_codes');
    await client.query('DELETE FROM auth_2fa_challenges');
    await client.query('DELETE FROM graph_snapshots');
    await client.query('DELETE FROM admin_audit_log');
    await client.query('DELETE FROM users');
    for (const user of backup.users) {
      const fullName = user.full_name || user.fullName || `${user.first_name || user.firstName || ''} ${user.last_name || user.lastName || ''}`.trim() || user.email || 'User';
      const firstName = user.first_name || user.firstName || fullName.split(' ')[0] || fullName;
      const lastName = user.last_name || user.lastName || fullName.split(' ').slice(1).join(' ') || '';
      await client.query(`
        INSERT INTO users (id, email, password_hash, role, full_name, first_name, last_name, phone, city, school_name, must_change_password, totp_secret, totp_enabled, totp_enabled_at, email_verified, email_verified_at, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      `, [user.id, user.email, user.password_hash || bcrypt.hashSync(crypto.randomBytes(12).toString('hex'), 10), user.role, fullName, firstName, lastName, user.phone || '', user.city || '', user.school_name || user.schoolName || '', user.must_change_password || user.mustChangePassword ? 1 : 0, user.totp_secret || user.totpSecret || '', user.totp_enabled || user.totpEnabled ? 1 : 0, user.totp_enabled_at || user.totpEnabledAt || null, user.email_verified === undefined ? (user.emailVerified === false ? 0 : 1) : (user.email_verified ? 1 : 0), user.email_verified_at || user.emailVerifiedAt || null, user.is_active === undefined ? (user.isActive === false ? 0 : 1) : (user.is_active ? 1 : 0), user.created_at || user.createdAt || nowIso(), user.updated_at || user.updatedAt || nowIso()]);
    }
    for (const school of backup.schools || []) {
      await client.query('INSERT INTO schools (id, name, city, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)', [school.id, school.name, school.city, school.created_at || school.createdAt || nowIso(), school.updated_at || school.updatedAt || nowIso()]);
    }
    for (const membership of backup.schoolMemberships || []) {
      await client.query('INSERT INTO school_memberships (id, user_id, school_id, membership_role, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', [membership.id, membership.user_id || membership.userId, membership.school_id || membership.schoolId, membership.membership_role || membership.role, membership.status, membership.created_at || membership.createdAt || nowIso(), membership.updated_at || membership.updatedAt || nowIso()]);
    }
    for (const invite of backup.schoolInvites || []) {
      await client.query('INSERT INTO school_invites (token, school_id, invited_by_user_id, teacher_name, email, phone, used_by_user_id, expires_at, created_at, used_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [invite.token, invite.school_id || invite.schoolId, invite.invited_by_user_id || invite.invitedByUserId, invite.teacher_name || invite.teacherName || '', invite.email, invite.phone || '', invite.used_by_user_id || invite.usedByUserId || null, invite.expires_at || invite.expiresAt, invite.created_at || invite.createdAt || nowIso(), invite.used_at || invite.usedAt || null]);
    }
    for (const settings of backup.schoolScoreTableSettings || []) {
      await client.query('INSERT INTO school_score_table_settings (school_id, grade_start, grade_end, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)', [settings.school_id || settings.schoolId, settings.grade_start || settings.gradeStart, settings.grade_end || settings.gradeEnd, settings.created_at || settings.createdAt || nowIso(), settings.updated_at || settings.updatedAt || nowIso()]);
    }
    for (const table of backup.schoolScoreTables || []) {
      await client.query('INSERT INTO school_score_tables (id, school_id, grade, gender_group, starting_score, subjects_json, rows_json, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [table.id, table.school_id || table.schoolId, table.grade, table.gender_group || table.genderGroup, table.starting_score ?? table.startingScore, table.subjects_json || JSON.stringify(table.subjects || []), table.rows_json || JSON.stringify(table.rows || []), table.created_at || table.createdAt || nowIso(), table.updated_at || table.updatedAt || nowIso()]);
    }
    for (const teacherClass of backup.teacherClasses) {
      await client.query(`
        INSERT INTO teacher_classes (id, user_id, name, grade, gender, school_id, order_index, student_count, roster_json, values_json, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [teacherClass.id, teacherClass.user_id || teacherClass.userId, teacherClass.name, teacherClass.grade, teacherClass.gender, teacherClass.school_id || teacherClass.schoolId || null, teacherClass.order_index || teacherClass.orderIndex || 0, teacherClass.student_count || teacherClass.studentCount, teacherClass.roster_json || JSON.stringify(teacherClass.roster || []), teacherClass.values_json || JSON.stringify(teacherClass.values || {}), teacherClass.created_at || teacherClass.createdAt || nowIso(), teacherClass.updated_at || teacherClass.updatedAt || nowIso()]);
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
    for (const token of backup.emailVerificationTokens || []) {
      await client.query('INSERT INTO email_verification_tokens (token_hash, user_id, expires_at, used_at, created_at) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (token_hash) DO NOTHING', [token.token_hash || token.tokenHash, token.user_id || token.userId, token.expires_at || token.expiresAt, token.used_at || token.usedAt || null, token.created_at || token.createdAt || nowIso()]);
    }
    for (const code of backup.adminTwoFactorRecoveryCodes || []) {
      await client.query('INSERT INTO admin_2fa_recovery_codes (code_hash, user_id, used_at, created_at) VALUES ($1, $2, $3, $4) ON CONFLICT (code_hash) DO NOTHING', [code.code_hash || code.codeHash, code.user_id || code.userId, code.used_at || code.usedAt || null, code.created_at || code.createdAt || nowIso()]);
    }
    for (const entry of backup.adminAuditLog || []) {
      await client.query('INSERT INTO admin_audit_log (id, admin_user_id, target_user_id, action, details_json, created_at) VALUES ($1, $2, $3, $4, $5, $6)', [entry.id, entry.admin_user_id || entry.adminUserId || null, entry.target_user_id || entry.targetUserId || null, entry.action, entry.details_json || JSON.stringify(entry.details || {}), entry.created_at || entry.createdAt || nowIso()]);
    }
    await client.query("INSERT INTO admin_audit_log (admin_user_id, target_user_id, action, details_json, created_at) VALUES ($1, NULL, 'restore_backup', $2, $3)", [adminUserId, JSON.stringify({ users: backup.users.length, classes: backup.teacherClasses.length, historyRecords: backup.teacherClassHistory.length }), nowIso()]);
    await client.query("SELECT setval(pg_get_serial_sequence('users','id'), COALESCE((SELECT MAX(id) FROM users), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('schools','id'), COALESCE((SELECT MAX(id) FROM schools), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('school_memberships','id'), COALESCE((SELECT MAX(id) FROM school_memberships), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('school_score_tables','id'), COALESCE((SELECT MAX(id) FROM school_score_tables), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('teacher_classes','id'), COALESCE((SELECT MAX(id) FROM teacher_classes), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('teacher_class_history','id'), COALESCE((SELECT MAX(id) FROM teacher_class_history), 1), true)");
    await client.query("SELECT setval(pg_get_serial_sequence('admin_audit_log','id'), COALESCE((SELECT MAX(id) FROM admin_audit_log), 1), true)");
  });
  return { users: backup.users.length, schools: (backup.schools || []).length, classes: backup.teacherClasses.length, historyRecords: backup.teacherClassHistory.length, graphSnapshots: (backup.graphSnapshots || []).length };
}

async function getAdminDiagnostics() {
  const [users, activeUsers, inactiveUsers, classes, historyRecords, graphSnapshots, latestBackup, latestRestore] = await Promise.all([
    readyQuery('SELECT COUNT(*) AS count FROM users'),
    readyQuery('SELECT COUNT(*) AS count FROM users WHERE is_active = 1'),
    readyQuery('SELECT COUNT(*) AS count FROM users WHERE is_active = 0'),
    readyQuery('SELECT COUNT(*) AS count FROM teacher_classes'),
    readyQuery('SELECT COUNT(*) AS count FROM teacher_class_history'),
    readyQuery('SELECT COUNT(*) AS count FROM graph_snapshots'),
    readyQuery("SELECT created_at FROM admin_audit_log WHERE action = 'export_backup' ORDER BY created_at DESC LIMIT 1"),
    readyQuery("SELECT created_at FROM admin_audit_log WHERE action = 'restore_backup' ORDER BY created_at DESC LIMIT 1"),
  ]);
  return {
    users: Number(users.rows[0].count),
    activeUsers: Number(activeUsers.rows[0].count),
    inactiveUsers: Number(inactiveUsers.rows[0].count),
    classes: Number(classes.rows[0].count),
    historyRecords: Number(historyRecords.rows[0].count),
    graphSnapshots: Number(graphSnapshots.rows[0].count),
    latestBackup: latestBackup.rows[0]?.created_at || '',
    latestRestore: latestRestore.rows[0]?.created_at || '',
  };
}

async function createSession(userId, details = {}) {
  await deleteExpiredSessions();
  const token = crypto.randomBytes(32).toString('hex');
  const csrfToken = crypto.randomBytes(32).toString('base64url');
  const csrfTokenHash = crypto.createHash('sha256').update(csrfToken).digest('hex');
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)).toISOString();
  await readyQuery('INSERT INTO sessions (token, user_id, csrf_token_hash, ip_address, user_agent, last_seen_at, expires_at, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [token, userId, csrfTokenHash, String(details.ip || '').slice(0, 120), String(details.userAgent || '').slice(0, 500), createdAt, expiresAt, createdAt]);
  return { token, csrfToken, expiresAt };
}

function publicSessionId(token) {
  return crypto.createHash('sha256').update(String(token || '')).digest('hex').slice(0, 16);
}

async function getSessionCsrfTokenHash(token) {
  if (!token) {
    return '';
  }
  await deleteExpiredSessions();
  const result = await readyQuery(`
    SELECT sessions.csrf_token_hash
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = $1 AND sessions.expires_at > $2 AND users.is_active = 1
  `, [token, nowIso()]);
  return result.rows[0]?.csrf_token_hash || '';
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
  if (result.rows[0]) {
    await readyQuery('UPDATE sessions SET last_seen_at = $1 WHERE token = $2', [nowIso(), token]);
  }
  return await serializeUser(result.rows[0]);
}

async function listUserSessions(userId, currentToken = '') {
  await deleteExpiredSessions();
  const result = await readyQuery(`
    SELECT token, ip_address, user_agent, last_seen_at, expires_at, created_at
    FROM sessions
    WHERE user_id = $1
    ORDER BY last_seen_at DESC, created_at DESC
  `, [userId]);
  return result.rows.map((row) => ({
    id: publicSessionId(row.token),
    current: row.token === currentToken,
    ipAddress: row.ip_address || '',
    userAgent: row.user_agent || '',
    lastSeenAt: row.last_seen_at || row.created_at,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
  }));
}

async function deleteOtherUserSessions(userId, currentToken = '') {
  const result = await readyQuery('DELETE FROM sessions WHERE user_id = $1 AND token != $2', [userId, currentToken || '']);
  return result.rowCount;
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
    schoolId: row.school_id || null,
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
  const schoolId = payload.schoolId ? Number(payload.schoolId) : null;
  if (!(await canUserUseSchoolForClass(userId, schoolId))) {
    throw new Error('SCHOOL_ACCESS_DENIED');
  }
  const grade = normalizeTeacherClassGrade(payload.grade);
  const roster = Array.isArray(payload.roster) ? payload.roster : [];
  const values = payload.values && typeof payload.values === 'object' ? payload.values : {};
  const result = await readyQuery(`
    INSERT INTO teacher_classes (user_id, name, grade, gender, school_id, order_index, student_count, roster_json, values_json, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `, [userId, payload.name, grade, payload.gender, schoolId, Number(maxOrder.rows[0].max_order) + 1, studentCount, JSON.stringify(roster), JSON.stringify(values), timestamp, timestamp]);
  await appendClassHistory(result.rows[0].id, 'created', { name: payload.name, grade, gender: payload.gender, schoolId, studentCount });
  return serializeTeacherClass(result.rows[0]);
}

async function updateTeacherClass(userId, classId, payload) {
  const existing = await getTeacherClass(userId, classId);
  if (!existing) {
    return null;
  }
  const timestamp = nowIso();
  const studentCount = Number(payload.studentCount ?? existing.studentCount);
  const schoolId = payload.schoolId === undefined ? existing.schoolId : (payload.schoolId ? Number(payload.schoolId) : null);
  if (!(await canUserUseSchoolForClass(userId, schoolId))) {
    throw new Error('SCHOOL_ACCESS_DENIED');
  }
  const grade = payload.grade === undefined ? normalizeTeacherClassGrade(existing.grade) : normalizeTeacherClassGrade(payload.grade);
  const roster = Array.isArray(payload.roster) ? payload.roster : existing.roster;
  const values = payload.values && typeof payload.values === 'object' ? payload.values : existing.values;
  const result = await readyQuery(`
    UPDATE teacher_classes
    SET name = $1, grade = $2, gender = $3, school_id = $4, student_count = $5, roster_json = $6, values_json = $7, updated_at = $8
    WHERE user_id = $9 AND id = $10
    RETURNING *
  `, [payload.name ?? existing.name, grade, payload.gender ?? existing.gender, schoolId, studentCount, JSON.stringify(roster), JSON.stringify(values), timestamp, userId, classId]);
  await appendClassHistory(classId, 'updated', { name: payload.name ?? existing.name, grade, gender: payload.gender ?? existing.gender, schoolId, studentCount });
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
  const result = await readyQuery(
    'INSERT INTO teacher_class_history (class_id, event_type, payload_json, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [classId, eventType, JSON.stringify(payload || {}), nowIso()]
  );
  const row = result.rows[0];
  return { id: row.id, eventType: row.event_type, payload: parseJson(row.payload_json, {}), createdAt: row.created_at };
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

async function updateTeacherClassHistorySemester(userId, classId, historyId, semester) {
  const teacherClass = await getTeacherClass(userId, classId);
  if (!teacherClass || !['a', 'b'].includes(semester)) {
    return null;
  }
  const existing = await readyQuery('SELECT * FROM teacher_class_history WHERE class_id = $1 AND id = $2', [classId, historyId]);
  const row = existing.rows[0];
  if (!row) {
    return null;
  }
  const payload = parseJson(row.payload_json, {});
  payload.semester = semester;
  const updated = await readyQuery('UPDATE teacher_class_history SET payload_json = $1 WHERE id = $2 RETURNING *', [JSON.stringify(payload), historyId]);
  const updatedRow = updated.rows[0];
  return { id: updatedRow.id, eventType: updatedRow.event_type, payload: parseJson(updatedRow.payload_json, {}), createdAt: updatedRow.created_at };
}

async function getTeacherClassScoreTable(userId, classId) {
  const teacherClass = await getTeacherClass(userId, classId);
  if (!teacherClass) {
    return null;
  }
  if (!teacherClass.schoolId) {
    return { teacherClass, table: null, error: 'CLASS_HAS_NO_SCHOOL' };
  }

  const grade = normalizeTeacherClassGrade(teacherClass.grade);
  const result = await readyQuery(`
    SELECT *
    FROM school_score_tables
    WHERE school_id = $1 AND grade = $2 AND gender_group = $3
  `, [teacherClass.schoolId, grade, teacherClass.gender]);

  if (result.rows.length > 1) {
    return { teacherClass: { ...teacherClass, grade }, table: null, error: 'MULTIPLE_TABLES_FOUND' };
  }

  return {
    teacherClass: { ...teacherClass, grade },
    table: result.rows[0] ? serializeScoreTable(result.rows[0]) : null,
    error: result.rows[0] ? null : 'NO_SCORE_TABLE_FOR_CLASS',
  };
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
  updateTeacherClassHistorySemester,
  appendClassHistory,
};
