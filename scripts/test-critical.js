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
  delete require.cache[require.resolve('../lib/auth-db-sqlite')];
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
    INSERT INTO teacher_classes (user_id, name, grade, gender, season, school_id, order_index, student_count, roster_json, values_json, created_at, updated_at)
    VALUES (?, 'Class', 'יב', 'male', '2025-2026', ?, 0, 1, '[]', '{}', ?, ?)
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
  assert.strictEqual(restored.teacherClass.season, '2025-2026');

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

  const standaloneTeacher = authDb.createUser({
    firstName: 'Standalone',
    lastName: 'Teacher',
    email: 'standalone-teacher@test.local',
    phone: '0501234567',
    city: 'City',
    schoolName: 'School',
    accountType: 'teacher',
    password: 'Aa123456!',
  });
  assert.strictEqual(standaloneTeacher.canEnterScores, true);
}

function testTeacherSeasons() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edufitscore-season-test-'));
  process.env.DATABASE_PATH = path.join(tempDir, 'auth.db');
  delete require.cache[require.resolve('../lib/auth-db-sqlite')];
  const authDb = require('../lib/auth-db-sqlite');
  assert.strictEqual(authDb.seasonForDate(new Date(Date.UTC(2025, 7, 1))), '2025-2026');
  assert.strictEqual(authDb.seasonForDate(new Date(Date.UTC(2026, 6, 31))), '2025-2026');
  assert.strictEqual(authDb.signupStartSeason(new Date(Date.UTC(2026, 6, 10))), '2026-2027');

  const user = authDb.createUser({
    firstName: 'Season',
    lastName: 'Teacher',
    email: 'season@test.local',
    phone: '0501234567',
    city: 'City',
    schoolName: 'School',
    accountType: 'teacher',
    password: 'Aa123456!',
  });
  const Database = require('better-sqlite3');
  const db = new Database(process.env.DATABASE_PATH);
  const now = new Date().toISOString();
  const oldSeason = authDb.signupStartSeason(new Date(Date.now() - 370 * 24 * 60 * 60 * 1000));
  const classId = db.prepare(`
    INSERT INTO teacher_classes (user_id, name, grade, gender, season, order_index, student_count, roster_json, values_json, created_at, updated_at)
    VALUES (?, 'Old Class', 7, 'male', ?, 0, 1, ?, ?, ?, ?)
  `).run(user.id, oldSeason, JSON.stringify([{ id: 'student-1', name: 'Student' }]), JSON.stringify({ a: { 'student-1': { run: '10' } } }), now, now).lastInsertRowid;
  const created = authDb.getTeacherClass(user.id, classId);
  assert.strictEqual(created.season, oldSeason);
  assert.throws(() => authDb.updateTeacherClass(user.id, created.id, { name: 'Locked' }), /SEASON_LOCKED/);
  const current = authDb.listTeacherClasses(user.id);
  assert.strictEqual(current.classes.length, 1);
  assert.strictEqual(current.classes[0].name, 'Old Class');
  assert.deepStrictEqual(current.classes[0].values, {});
  assert.strictEqual(authDb.createTeacherClass(user.id, { name: 'Current Class', grade: 7, gender: 'male', studentCount: 1, roster: [], values: {} }).season, authDb.seasonForDate());
}

function testBillingRules() {
  const { billingAcademicYearForDate, billingAcademicYearEndForDate, billingStateForUser } = require('../lib/billing');
  assert.strictEqual(billingAcademicYearForDate(new Date(Date.UTC(2026, 6, 10))), '2026-2027');
  assert(billingAcademicYearEndForDate(new Date(Date.UTC(2026, 6, 10))).startsWith('2027-07-31'));
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edufitscore-billing-test-'));
  process.env.DATABASE_PATH = path.join(tempDir, 'auth.db');
  delete require.cache[require.resolve('../lib/auth-db-sqlite')];
  const authDb = require('../lib/auth-db-sqlite');
  const user = authDb.createUser({ firstName: 'Billing', lastName: 'User', email: 'billing@test.local', phone: '0501234567', city: 'City', schoolName: 'School', accountType: 'teacher', password: 'Aa123456!' });
  const otherUser = authDb.createUser({ firstName: 'Other', lastName: 'Billing', email: 'other-billing@test.local', phone: '0507654321', city: 'City', schoolName: 'School', accountType: 'teacher', password: 'Aa123456!' });
  assert.strictEqual(user.billing.status, 'trialing');
  assert.strictEqual(user.billing.accessAllowed, true);
  assert(user.billing.daysLeft > 0 && user.billing.daysLeft <= 30);
  assert.throws(() => authDb.setUserBillingExempt(user.id, true, null), /BILLING_EXEMPT_DISABLED/);
  const extended = authDb.extendUserTrial(user.id, 400);
  assert.strictEqual(extended.billing.trialEndsAt <= billingAcademicYearEndForDate(), true);
  const active = authDb.markUserPaidForAcademicYear(user.id, { paidAt: new Date(Date.UTC(2026, 6, 10)) });
  assert.strictEqual(active.billing.paidUntil.startsWith('2027-07-31'), true);
  assert.strictEqual(active.billing.hasAcademicYearAccess, true);
  const cancelled = authDb.cancelUserAcademicYearAccess(user.id);
  assert.strictEqual(cancelled.billing.paidUntil, null);
  assert.strictEqual(cancelled.billing.trialStartedAt, null);
  assert.strictEqual(cancelled.billing.trialEndsAt, null);
  assert.strictEqual(cancelled.billing.status, 'expired');
  assert.strictEqual(cancelled.billing.accessAllowed, false);
  assert.strictEqual(authDb.getUserById(otherUser.id).billing.status, 'trialing');
  assert.strictEqual(billingStateForUser({ billing_exempt: 0, trial_ends_at: '2020-01-01T00:00:00.000Z', role: 'teacher' }).accessAllowed, false);
}

testSchoolScoreMatcher();
testSqliteClassScoreTableResolver();
testTeacherSeasons();
testBillingRules();
console.log('critical tests passed');
