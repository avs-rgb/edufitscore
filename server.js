const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const { loadSheetsByGender, scoreMetric } = require('./lib/workbook');
const { sendMail } = require('./lib/mailer');
const {
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
} = require('./lib/auth-db');

const app = express();
const port = Number(process.env.PORT || 3000);
const publicBaseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${port}`;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (response) => {
    response.setHeader('Cache-Control', 'no-store');
  },
}));

function resolveSheets(gender) {
  return loadSheetsByGender(gender === 'female' ? 'female' : 'male');
}

function sessionCookieOptions(expiresAt) {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    expires: new Date(expiresAt),
    path: '/',
  };
}

async function attachUser(request, response, next) {
  try {
    const token = request.cookies?.edufitscore_session;
    request.authUser = await findUserBySessionToken(token);
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

app.use(attachUser);

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

app.post('/api/graph-snapshots', async (request, response) => {
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

app.post('/api/auth/login', async (request, response) => {
  const { email, password } = request.body || {};
  const user = await verifyUser(email, password);

  if (!user) {
    response.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const session = await createSession(user.id);
  response.cookie('edufitscore_session', session.token, sessionCookieOptions(session.expiresAt));
  response.json({ user });
});

app.post('/api/auth/signup', async (request, response) => {
  const { firstName, lastName, email, phone, city, schoolName, password, passwordRepeat } = request.body || {};

  if (password !== passwordRepeat) {
    response.status(400).json({ error: 'PASSWORD_MISMATCH' });
    return;
  }

  try {
    const user = await createUser({ firstName, lastName, email, phone, city, schoolName, password });
    const session = await createSession(user.id);
    response.cookie('edufitscore_session', session.token, sessionCookieOptions(session.expiresAt));
    response.status(201).json({ user });
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

    if (['INVALID_NAME', 'INVALID_EMAIL', 'INVALID_PHONE'].includes(error.message)) {
      response.status(400).json({ error: error.message });
      return;
    }

    response.status(500).json({ error: 'SIGNUP_FAILED' });
  }
});

app.post('/api/auth/forgot-password', async (request, response) => {
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
    console.error('Forgot password failed:', error);
  }

  response.json(neutralResponse);
});

app.post('/api/auth/reset-password', async (request, response) => {
  const { token, newPassword, newPasswordRepeat } = request.body || {};

  if (!newPassword || newPassword !== newPasswordRepeat) {
    response.status(400).json({ error: 'PASSWORD_MISMATCH' });
    return;
  }

  try {
    await resetPasswordWithToken(token, newPassword);
    response.clearCookie('edufitscore_session', { path: '/' });
    response.json({ ok: true });
  } catch (error) {
    response.status(400).json({ error: 'INVALID_RESET' });
  }
});

app.post('/api/auth/logout', async (request, response) => {
  await deleteSession(request.cookies?.edufitscore_session);
  response.clearCookie('edufitscore_session', { path: '/' });
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

  try {
    await changeUserPassword(request.authUser.id, oldPassword, newPassword);
    response.json({ ok: true });
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
    response.clearCookie('edufitscore_session', { path: '/' });
    response.json({ ok: true });
  } catch (error) {
    if (error.message === 'INVALID_PASSWORD') {
      response.status(401).json({ error: 'INVALID_PASSWORD' });
      return;
    }

    response.status(500).json({ error: 'DEACTIVATE_FAILED' });
  }
});

app.get('/api/admin/overview', requireAuth, (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

  response.json({
    user: request.authUser,
    summary: 'Admin area placeholder',
  });
});

app.get('/api/admin/inactive-users', requireAuth, async (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

  response.json({ users: await listInactiveUsers() });
});

app.get('/api/admin/users', requireAuth, async (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

  response.json({ users: await listUsers() });
});

app.get('/api/admin/audit-log', requireAuth, async (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

  response.json({ entries: await listAdminAuditLog(50) });
});

app.get('/api/admin/backup', requireAuth, async (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

  await logAdminAction(request.authUser.id, null, 'export_backup');
  response.json(await exportBackupData());
});

app.post('/api/admin/backup/restore', requireAuth, async (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

  try {
    const summary = await restoreBackupData(request.body?.backup, request.authUser.id);
    response.json({ ok: true, summary });
  } catch (error) {
    console.error('Backup restore failed:', error);
    response.status(400).json({ error: 'INVALID_BACKUP', details: error.message });
  }
});

app.get('/api/admin/diagnostics', requireAuth, async (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

  response.json({ diagnostics: await getAdminDiagnostics() });
});

app.post('/api/admin/restore-user', requireAuth, async (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

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
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

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

app.post('/api/admin/users/:userId/reset-password', requireAuth, async (request, response) => {
  if (request.authUser.role !== 'admin') {
    response.status(403).json({ error: 'Admin access required' });
    return;
  }

  const userId = Number(request.params.userId);
  let { newPassword, newPasswordRepeat, generateTemporary } = request.body || {};

  if (generateTemporary) {
    newPassword = crypto.randomBytes(6).toString('base64url');
    newPasswordRepeat = newPassword;
  }

  if (!Number.isInteger(userId) || userId < 1) {
    response.status(400).json({ error: 'INVALID_USER_ID' });
    return;
  }

  if (!newPassword || newPassword !== newPasswordRepeat) {
    response.status(400).json({ error: 'PASSWORD_MISMATCH' });
    return;
  }

  try {
    const user = await adminResetUserPassword(userId, newPassword, request.cookies?.edufitscore_session);
    await logAdminAction(request.authUser.id, userId, 'reset_password', { email: user.email });
    response.json({ user, temporaryPassword: generateTemporary ? newPassword : '' });
  } catch (error) {
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

app.post('/api/teacher/classes', requireTeacherOrAdmin, async (request, response) => {
  try {
    const created = await createTeacherClass(request.authUser.id, request.body || {});
    response.status(201).json({ teacherClass: created });
  } catch (error) {
    if (error.message === 'CLASS_LIMIT_REACHED') {
      response.status(400).json({ error: 'Class limit reached' });
      return;
    }

    response.status(500).json({ error: 'Unable to create class' });
  }
});

app.put('/api/teacher/classes/reorder', requireTeacherOrAdmin, async (request, response) => {
  const orderedIds = Array.isArray(request.body?.orderedIds) ? request.body.orderedIds.map(Number) : [];
  response.json({ classes: await reorderTeacherClasses(request.authUser.id, orderedIds) });
});

app.put('/api/teacher/classes/:classId', requireTeacherOrAdmin, async (request, response) => {
  const updated = await updateTeacherClass(request.authUser.id, Number(request.params.classId), request.body || {});

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

app.post('/api/bulk-score', requireAuth, async (request, response) => {
  const { sheetId, students, gender, classId, semester } = request.body || {};
  const sheets = resolveSheets(gender);
  const sheet = sheets.find((item) => item.id === sheetId);

  if (!sheet) {
    response.status(404).json({ error: 'Sheet not found' });
    return;
  }

  const normalizedStudents = Array.isArray(students) ? students : [];

  const responseBody = {
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

  if (classId) {
    await appendClassHistory(Number(classId), 'calculated', {
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

  response.json(responseBody);
});

app.listen(port, () => {
  console.log(`Score site running at http://localhost:${port}`);
});
