const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

function testSchoolScoreMatcher() {
  const { matchSchoolScoreTableResult } = require('../public/school-score');
  const lowerTable = {
    subjects: [{ id: 'run', name: 'ריצה', measurementType: 'time', direction: 'lower' }],
    rows: [
      { score: 100, values: { run: '10:00' } },
      { score: 90, values: { run: '11:00' } },
      { score: 0, values: { run: '0' } },
    ],
  };
  assert.deepStrictEqual(matchSchoolScoreTableResult(lowerTable, 'run', '1030').score, 90);

  const zeroTable = {
    subjects: [{ id: 'test', name: 'בדיקה', direction: 'higher', includeZeroScore: true }],
    rows: [
      { score: 10, values: { test: '10' } },
      { score: 0, values: { test: '0' } },
    ],
  };
  assert.deepStrictEqual(matchSchoolScoreTableResult(zeroTable, 'test', '0').score, 0);
}

function testSqliteClassScoreTableResolver() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edufitscore-test-'));
  process.env.DATABASE_PATH = path.join(tempDir, 'auth.db');
  const authDb = require('../lib/auth-db-sqlite');
  const Database = require('better-sqlite3');
  const db = new Database(process.env.DATABASE_PATH);
  const now = new Date().toISOString();

  const user = db.prepare(`
    INSERT INTO users (email, password_hash, role, full_name, first_name, last_name, created_at, updated_at)
    VALUES ('teacher@test.local', 'hash', 'teacher', 'Teacher Test', 'Teacher', 'Test', ?, ?)
  `).run(now, now).lastInsertRowid;
  const school = db.prepare('INSERT INTO schools (name, city, created_at, updated_at) VALUES (?, ?, ?, ?)').run('School', 'City', now, now).lastInsertRowid;
  db.prepare(`
    INSERT INTO school_memberships (user_id, school_id, membership_role, status, created_at, updated_at)
    VALUES (?, ?, 'teacher', 'approved', ?, ?)
  `).run(user, school, now, now);
  const classId = db.prepare(`
    INSERT INTO teacher_classes (user_id, name, grade, gender, school_id, order_index, student_count, roster_json, values_json, created_at, updated_at)
    VALUES (?, 'Class', 'יב', 'male', ?, 0, 1, '[]', '{}', ?, ?)
  `).run(user, school, now, now).lastInsertRowid;
  const subjects = [{ id: 's1', name: 'בדיקה' }];
  const rows = [{ score: 100, values: { s1: '10' } }, { score: 0, values: { s1: '0' } }];
  const tableId = db.prepare(`
    INSERT INTO school_score_tables (school_id, grade, gender_group, starting_score, subjects_json, rows_json, created_at, updated_at)
    VALUES (?, 12, 'male', 0, ?, ?, ?, ?)
  `).run(school, JSON.stringify(subjects), JSON.stringify(rows), now, now).lastInsertRowid;

  const resolved = authDb.getTeacherClassScoreTable(user, classId);
  assert.strictEqual(resolved.error, null);
  assert.strictEqual(resolved.table.id, tableId);
  assert.strictEqual(resolved.teacherClass.grade, 12);

  const backup = authDb.exportBackupData();
  assert.strictEqual(backup.schools.length, 1);
  assert.strictEqual(backup.schoolMemberships.length, 1);
  assert.strictEqual(backup.schoolScoreTables.length, 1);

  authDb.restoreBackupData(backup);
  const restored = authDb.getTeacherClassScoreTable(user, classId);
  assert.strictEqual(restored.error, null);
  assert.strictEqual(restored.table.id, tableId);
  assert.strictEqual(restored.teacherClass.schoolId, school);

  const usersBeforeFailedSignup = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
  assert.throws(() => authDb.createUser({
    firstName: 'Failed',
    lastName: 'Admin',
    email: 'failed-admin@test.local',
    phone: '0501234567',
    city: '',
    schoolName: '',
    accountType: 'school_admin',
    password: '12345678',
  }), /MISSING_SCHOOL/);
  assert.strictEqual(db.prepare('SELECT COUNT(*) AS count FROM users').get().count, usersBeforeFailedSignup);
}

testSchoolScoreMatcher();
testSqliteClassScoreTableResolver();
console.log('critical tests passed');
