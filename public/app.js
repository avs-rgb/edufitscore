const sheetSelect = document.querySelector('#sheet-select');
const scoreForm = document.querySelector('#score-form');
const averageScore = document.querySelector('#average-score');
const resultsList = document.querySelector('#results-list');
const studentShareWhatsappButton = document.querySelector('#student-share-whatsapp');
const shareSiteWhatsappButton = document.querySelector('#share-site-whatsapp');
const homeView = document.querySelector('#home-view');
const appShell = document.querySelector('#app-shell');
const topControls = document.querySelector('.top-controls');
const guestEntryButton = document.querySelector('#guest-entry-button');
const memberEntryButton = document.querySelector('#member-entry-button');
const topHomeButton = document.querySelector('#top-home-button');
const adminNavButton = document.querySelector('#admin-nav-button');
const memberProfileButton = document.querySelector('#member-profile-button');
const memberLogoutButton = document.querySelector('#member-logout-button');
const heroHomeButton = document.querySelector('#hero-home-button');
const privacyButton = document.querySelector('#privacy-button');
const privacyView = document.querySelector('#privacy-view');
const privacyCloseButton = document.querySelector('#privacy-close-button');
const termsButton = document.querySelector('#terms-button');
const termsView = document.querySelector('#terms-view');
const termsCloseButton = document.querySelector('#terms-close-button');
const accessibilityButton = document.querySelector('#accessibility-button');
const accessibilityView = document.querySelector('#accessibility-view');
const accessibilityCloseButton = document.querySelector('#accessibility-close-button');
const contactButton = document.querySelector('#contact-button');
const contactView = document.querySelector('#contact-view');
const contactCloseButton = document.querySelector('#contact-close-button');
const memberLoginView = document.querySelector('#member-login-view');
const memberLoginForm = document.querySelector('#member-login-form');
const memberLoginError = document.querySelector('#member-login-error');
const forgotPasswordButton = document.querySelector('#forgot-password-button');
const forgotPasswordView = document.querySelector('#forgot-password-view');
const forgotPasswordForm = document.querySelector('#forgot-password-form');
const forgotPasswordBackButton = document.querySelector('#forgot-password-back');
const forgotPasswordMessage = document.querySelector('#forgot-password-message');
const resetPasswordView = document.querySelector('#reset-password-view');
const resetPasswordForm = document.querySelector('#reset-password-form');
const resetPasswordBackButton = document.querySelector('#reset-password-back');
const resetPasswordMessage = document.querySelector('#reset-password-message');
const memberSignupView = document.querySelector('#member-signup-view');
const memberSignupButton = document.querySelector('#member-signup-button');
const memberSignupForm = document.querySelector('#member-signup-form');
const memberSignupBackButton = document.querySelector('#member-signup-back');
const memberSignupError = document.querySelector('#member-signup-error');
const adminView = document.querySelector('#admin-view');
const adminSummary = document.querySelector('#admin-summary');
const adminLogoutButton = document.querySelector('#admin-logout-button');
const adminRestoreUserForm = document.querySelector('#admin-restore-user-form');
const adminRestoreMessage = document.querySelector('#admin-restore-message');
const adminAllUsers = document.querySelector('#admin-all-users');
const adminInactiveUsers = document.querySelector('#admin-inactive-users');
const adminAuditLog = document.querySelector('#admin-audit-log');
const adminAuditFilter = document.querySelector('#admin-audit-filter');
const adminBackupButton = document.querySelector('#admin-backup-button');
const adminBackupImport = document.querySelector('#admin-backup-import');
const adminDiagnostics = document.querySelector('#admin-diagnostics');
const adminStatusModal = document.querySelector('#admin-status-modal');
const adminStatusCloseButton = document.querySelector('#admin-status-close');
const adminStatusCancelButton = document.querySelector('#admin-status-cancel');
const adminStatusConfirmButton = document.querySelector('#admin-status-confirm');
const adminStatusMessage = document.querySelector('#admin-status-message');
const adminPasswordModal = document.querySelector('#admin-password-modal');
const adminPasswordCloseButton = document.querySelector('#admin-password-close');
const adminPasswordCancelButton = document.querySelector('#admin-password-cancel');
const adminPasswordForm = document.querySelector('#admin-password-form');
const adminPasswordMessage = document.querySelector('#admin-password-message');
const adminPasswordError = document.querySelector('#admin-password-error');
const adminGeneratePasswordButton = document.querySelector('#admin-generate-password');
const adminTemporaryPassword = document.querySelector('#admin-temporary-password');
const adminBackupResultModal = document.querySelector('#admin-backup-result-modal');
const adminBackupResultCloseButton = document.querySelector('#admin-backup-result-close');
const adminBackupResultOkButton = document.querySelector('#admin-backup-result-ok');
const adminBackupResultMessage = document.querySelector('#admin-backup-result-message');
const memberProfileView = document.querySelector('#member-profile-view');
const profileCloseButton = document.querySelector('#profile-close-button');
const profileDetailsForm = document.querySelector('#profile-details-form');
const profilePasswordForm = document.querySelector('#profile-password-form');
const profileDeactivateForm = document.querySelector('#profile-deactivate-form');
const profileDeactivateOpenButton = document.querySelector('#profile-deactivate-open');
const profileDetailsMessage = document.querySelector('#profile-details-message');
const profilePasswordMessage = document.querySelector('#profile-password-message');
const profileDeactivateMessage = document.querySelector('#profile-deactivate-message');
const profileDeactivateModal = document.querySelector('#profile-deactivate-modal');
const profileDeactivateCloseButton = document.querySelector('#profile-deactivate-close');
const profileDeactivateCancelButton = document.querySelector('#profile-deactivate-cancel');
const profileDeactivateConfirmButton = document.querySelector('#profile-deactivate-confirm');
const profileDeactivateConfirmCheckbox = document.querySelector('#profile-deactivate-confirm-checkbox');
const profileDeactivateModalMessage = document.querySelector('#profile-deactivate-modal-message');
const profileDeactivatePasswordInput = document.querySelector('#profile-deactivate-password');
const accessibilityFab = document.querySelector('#accessibility-fab');
const accessibilityToolbar = document.querySelector('#accessibility-toolbar');
const accessibilityToolbarClose = document.querySelector('#accessibility-toolbar-close');
const accessibilityTextPlusButton = document.querySelector('#accessibility-text-plus');
const accessibilityTextMinusButton = document.querySelector('#accessibility-text-minus');
const accessibilityReadableFontButton = document.querySelector('#accessibility-readable-font');
const accessibilityUnderlineLinksButton = document.querySelector('#accessibility-underline-links');
const accessibilityGrayscaleButton = document.querySelector('#accessibility-grayscale');
const accessibilityHighContrastButton = document.querySelector('#accessibility-high-contrast');
const accessibilityNegativeContrastButton = document.querySelector('#accessibility-negative-contrast');
const accessibilityResetButton = document.querySelector('#accessibility-reset');
const tableContainer = document.querySelector('#table-container');
const classTabsContainer = document.querySelector('#class-tabs');
const maleStudentTabButton = document.querySelector('#male-student-tab-button');
const femaleStudentTabButton = document.querySelector('#female-student-tab-button');
const teacherTabButton = document.querySelector('#teacher-tab-button');
const studentView = document.querySelector('#student-view');
const teacherView = document.querySelector('#teacher-view');
const teacherTopControls = document.querySelector('#teacher-top-controls');
const teacherMaleTabButton = document.querySelector('#teacher-male-tab-button');
const teacherFemaleTabButton = document.querySelector('#teacher-female-tab-button');
const teacherStudentCountLabel = document.querySelector('#teacher-student-count-label');
const studentCountSelect = document.querySelector('#student-count');
const teacherCalculateButton = document.querySelector('#teacher-calculate');
const teacherEditStudentsButton = document.querySelector('#teacher-edit-students');
const teacherSaveClassButton = document.querySelector('#teacher-save-class');
const teacherNewClassButton = document.querySelector('#teacher-new-class-button');
const teacherEditClassesButton = document.querySelector('#teacher-edit-classes-button');
const teacherBackToClassesButton = document.querySelector('#teacher-back-to-classes');
const teacherOpenHistoryViewButton = document.querySelector('#teacher-open-history-view');
const teacherBackToClassDetailButton = document.querySelector('#teacher-back-to-class-detail');
const teacherHistoryBackToClassesButton = document.querySelector('#teacher-history-back-to-classes');
const teacherClassForm = document.querySelector('#teacher-class-form');
const teacherClassNameInput = document.querySelector('#teacher-class-name');
const teacherClassGradeSelect = document.querySelector('#teacher-class-grade');
const teacherClassGenderSelect = document.querySelector('#teacher-class-gender');
const teacherClassStudentCountSelect = document.querySelector('#teacher-class-student-count');
const teacherClassStudentNames = document.querySelector('#teacher-class-student-names');
const teacherClassCancelButton = document.querySelector('#teacher-class-cancel');
const teacherClassFormError = document.querySelector('#teacher-class-form-error');
const teacherClassList = document.querySelector('#teacher-class-list');
const teacherRefreshClassesButton = document.querySelector('#teacher-refresh-classes');
const teacherHomeView = document.querySelector('#teacher-home-view');
const teacherNewClassView = document.querySelector('#teacher-new-class-view');
const teacherClassDetailView = document.querySelector('#teacher-class-detail-view');
const teacherHistoryView = document.querySelector('#teacher-history-view');
const teacherClassDetailTitle = document.querySelector('#teacher-class-detail-title');
const teacherClassSummary = document.querySelector('#teacher-class-summary');
const teacherHistorySummary = document.querySelector('#teacher-history-summary');
const teacherClassHistory = document.querySelector('#teacher-class-history');
const teacherHistoryRange = document.querySelector('#teacher-history-range');
const teacherHistoryDateRange = document.querySelector('#teacher-history-date-range');
const teacherHistorySelectedDate = document.querySelector('#teacher-history-selected-date');
const teacherHistoryGraph = document.querySelector('#teacher-history-graph');
const teacherHistoryRecordsButton = document.querySelector('#teacher-history-records');
const teacherHistoryRefreshButton = document.querySelector('#teacher-history-refresh');
const teacherHistoryRecordsWhatsappButton = document.querySelector('#teacher-history-records-whatsapp');
const teacherHistoryRecordsCsvButton = document.querySelector('#teacher-history-records-csv');
const teacherClassViewToggleButton = document.querySelector('#teacher-class-view-toggle');
const teacherClassSortField = document.querySelector('#teacher-class-sort-field');
const teacherClassSortDirection = document.querySelector('#teacher-class-sort-direction');
const teacherDeleteModal = document.querySelector('#teacher-delete-modal');
const teacherDeleteMessage = document.querySelector('#teacher-delete-message');
const teacherConfirmDeleteButton = document.querySelector('#teacher-confirm-delete');
const teacherCancelDeleteButton = document.querySelector('#teacher-cancel-delete');
const teacherDeleteCloseButton = document.querySelector('#teacher-delete-close');
const teacherHistoryDeleteModal = document.querySelector('#teacher-history-delete-modal');
const teacherHistoryConfirmDeleteButton = document.querySelector('#teacher-history-confirm-delete');
const teacherHistoryCancelDeleteButton = document.querySelector('#teacher-history-cancel-delete');
const teacherHistoryDeleteCloseButton = document.querySelector('#teacher-history-delete-close');
const teacherInvalidScoreModal = document.querySelector('#teacher-invalid-score-modal');
const teacherInvalidScoreMessage = document.querySelector('#teacher-invalid-score-message');
const teacherInvalidScoreOkButton = document.querySelector('#teacher-invalid-score-ok');
const teacherInvalidScoreCloseButton = document.querySelector('#teacher-invalid-score-close');
const downloadCsvButton = document.querySelector('#download-csv');
const shareWhatsappButton = document.querySelector('#share-whatsapp');
const teacherEntryTable = document.querySelector('#teacher-entry-table');
const teacherResultsTable = document.querySelector('#teacher-results-table');
const teacherSaveHistoryButton = document.querySelector('#teacher-save-history');
const teacherPasteBox = document.querySelector('#teacher-paste-box');
const teacherPasteApplyButton = document.querySelector('#teacher-paste-apply');
const teacherClearValuesButton = document.querySelector('#teacher-clear-values');
const teacherEditSaveMessage = document.querySelector('#teacher-edit-save-message');
const teacherResetStudentsButton = document.querySelector('#teacher-reset-students');

let sheetSets = {
  male: [],
  female: [],
};
let activeView = 'student_male';
let activeTeacherGenderValue = 'male';
let latestTeacherResults = [];
let latestStudentResult = null;
let currentEntryMode = 'home';
let previousEntryMode = 'home';
let accessibilityTextScale = 1;
let authUser = null;
let teacherClasses = [];
let teacherRoster = [];
let teacherClassValues = {};
let activeTeacherClassId = null;
let teacherEditMode = false;
let dragSourceIndex = null;
let teacherClassesEditMode = false;
let teacherSubview = 'home';
let teacherClassListView = 'cards';
let pendingDeleteClassId = null;
let pendingDeleteHistoryId = null;
let dragClassSourceId = null;
let teacherHistoryEntries = [];
let selectedTeacherHistoryIndex = 0;
let isSavingClassOrder = false;
let teacherHistoryMode = 'entry';
let teacherHistoryEditMode = false;
let pendingInvalidScoreWarnings = [];
let pendingAdminStatusChange = null;
let pendingAdminPasswordReset = null;
let activeHistoryGraphSubject = '';
let visibleHistoryGraphStudents = new Set();
let historyGraphSelectionTouched = false;
let adminAuditEntries = [];

const uiPreferenceKeys = {
  activeView: 'edufitscore.activeView',
  teacherGender: 'edufitscore.teacherGender',
  classListView: 'edufitscore.classListView',
  classSortField: 'edufitscore.classSortField',
  classSortDirection: 'edufitscore.classSortDirection',
};

function readUiPreference(key) {
  try {
    return window.localStorage.getItem(key) || '';
  } catch (error) {
    return '';
  }
}

function writeUiPreference(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    // Ignore storage failures; preferences are optional.
  }
}

function applyStoredUiPreferences() {
  const storedView = readUiPreference(uiPreferenceKeys.activeView);
  if (['student_male', 'student_female', 'teacher'].includes(storedView)) {
    activeView = storedView;
  }

  const storedTeacherGender = readUiPreference(uiPreferenceKeys.teacherGender);
  if (['male', 'female'].includes(storedTeacherGender)) {
    activeTeacherGenderValue = storedTeacherGender;
  }

  const storedClassListView = readUiPreference(uiPreferenceKeys.classListView);
  if (['cards', 'list'].includes(storedClassListView)) {
    teacherClassListView = storedClassListView;
  }

  const storedSortField = readUiPreference(uiPreferenceKeys.classSortField);
  if (storedSortField && teacherClassSortField.querySelector(`option[value="${storedSortField}"]`)) {
    teacherClassSortField.value = storedSortField;
  }

  const storedSortDirection = readUiPreference(uiPreferenceKeys.classSortDirection);
  if (['asc', 'desc'].includes(storedSortDirection)) {
    teacherClassSortDirection.value = storedSortDirection;
  }
}

const staticViews = {
  privacy: privacyView,
  terms: termsView,
  accessibility: accessibilityView,
  contact: contactView,
  login: memberLoginView,
  forgotPassword: forgotPasswordView,
  resetPassword: resetPasswordView,
  signup: memberSignupView,
  admin: adminView,
  profile: memberProfileView,
};

function parseRouteHash() {
  const hash = window.location.hash.replace('#', '');

  if (hash === 'guest') {
    return 'guest';
  }

  if (hash === 'member' || hash.startsWith('member-')) {
    return hash;
  }

  if (hash === 'signup') {
    return 'signup';
  }

  if (hash === 'forgot-password') {
    return 'forgotPassword';
  }

  if (hash.startsWith('reset-password')) {
    return 'resetPassword';
  }

  if (hash === 'profile') {
    return 'profile';
  }

  if (hash === 'member-classes') {
    return 'member-classes';
  }

  if (hash === 'member-new-class') {
    return 'member-new-class';
  }

  if (hash === 'member-class') {
    return 'member-class';
  }

  if (hash === 'member-history') {
    return 'member-history';
  }

  if (hash === 'admin') {
    return 'admin';
  }

  if (hash === 'privacy') {
    return 'privacy';
  }

  if (hash === 'terms') {
    return 'terms';
  }

  if (hash === 'accessibility') {
    return 'accessibility';
  }

  if (hash === 'contact') {
    return 'contact';
  }

  return 'home';
}

function updateRoute(mode, replace = false) {
  const targetHash = mode === 'home' ? '' : `#${mode}`;
  const url = new URL(window.location.href);

  if (mode !== 'resetPassword') {
    url.searchParams.delete('resetToken');
  }

  const nextUrl = `${url.pathname}${url.search}${targetHash}`;

  if (replace) {
    window.history.replaceState({ mode }, '', nextUrl);
    return;
  }

  window.history.pushState({ mode }, '', nextUrl);
}

function formatClassName(name) {
  const value = String(name || '').trim();

  if (value.length === 1) {
    return `${value}'`;
  }

  if (value.length === 2) {
    return `${value[0]}"${value[1]}`;
  }

  return value;
}

function activeStudentLabel() {
  return activeView === 'student_female' ? 'תלמידה' : 'תלמיד';
}

function activeStudentGender() {
  return activeView === 'student_female' ? 'female' : 'male';
}

function activeTeacherStudentLabel() {
  return activeTeacherGenderValue === 'female' ? 'תלמידה' : 'תלמיד';
}

function activeTeacherGender() {
  return activeTeacherGenderValue;
}

function syncTeacherGenderTabs() {
  teacherMaleTabButton.classList.toggle('is-active', activeTeacherGenderValue === 'male');
  teacherFemaleTabButton.classList.toggle('is-active', activeTeacherGenderValue === 'female');
  teacherStudentCountLabel.textContent = activeTeacherGenderValue === 'female' ? 'מספר בנות' : 'מספר בנים';
}

function setTeacherSubview(viewName, updateHistory = true) {
  teacherSubview = viewName;
  teacherHomeView.classList.toggle('is-hidden', viewName !== 'home');
  teacherNewClassView.classList.toggle('is-hidden', viewName !== 'new');
  teacherClassDetailView.classList.toggle('is-hidden', viewName !== 'detail');
  teacherHistoryView.classList.toggle('is-hidden', viewName !== 'history');

  const isTeacherMemberRoute = currentEntryMode === 'member' || currentEntryMode.startsWith('member-');

  if (updateHistory && isTeacherMemberRoute && authUser?.role === 'teacher') {
    const hashMap = {
      home: 'member-classes',
      new: 'member-new-class',
      detail: 'member-class',
      history: 'member-history',
    };
    const nextMode = hashMap[viewName] || 'member';

    updateRoute(nextMode);
    currentEntryMode = nextMode;
  }
}

function createTeacherNameInputs() {
  const count = Number(teacherClassStudentCountSelect.value);
  teacherClassStudentNames.innerHTML = Array.from({ length: count }, (_, index) => `
    <input
      type="text"
      class="teacher-class-student-name-field"
      data-new-student-index="${index}"
      placeholder="${activeTeacherStudentLabel()} ${index + 1}"
      value="${activeTeacherStudentLabel()} ${index + 1}"
    />
  `).join('');
}

function computeTeacherClassSummary() {
  const filledScores = Object.values(teacherClassValues).reduce((count, studentValues) => (
    count + Object.values(studentValues || {}).filter(Boolean).length
  ), 0);

  const averages = latestTeacherResults.map((student) => student.averageScore).filter((value) => Number.isFinite(value));
  const overallAverage = averages.length
    ? Math.floor(averages.reduce((sum, value) => sum + value, 0) / averages.length)
    : null;

  return {
    studentCount: teacherRoster.length,
    filledScores,
    overallAverage,
  };
}

async function loadTeacherClassHistory(classId) {
  const response = await fetch(`/api/teacher/classes/${classId}/history`);

  if (!response.ok) {
    teacherClassHistory.innerHTML = '<p>לא ניתן לטעון היסטוריה כרגע.</p>';
    teacherHistoryDateRange.textContent = '';
    teacherHistorySelectedDate.textContent = '';
    return;
  }

  const data = await response.json();
  teacherHistoryEntries = [...data.history]
    .filter((entry) => entry.eventType === 'calculated' && historyEntryHasScores(entry))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  selectedTeacherHistoryIndex = Math.max(teacherHistoryEntries.length - 1, 0);
  updateTeacherClassSummaryCards();
  renderTeacherHistoryEntry();
}

function updateTeacherClassSummaryCards() {
  const teacherClass = currentTeacherClass();

  if (!teacherClass) {
    return;
  }

  const summary = computeTeacherClassSummary();
  const summaryHtml = `
    <div class="teacher-summary-card">שכבה: ${formatClassName(teacherClass.grade)}</div>
    <div class="teacher-summary-card">קבוצה: ${teacherClass.gender === 'female' ? 'בנות' : 'בנים'}</div>
    <div class="teacher-summary-card">מספר תלמידים: ${summary.studentCount}</div>
    <div class="teacher-summary-card">ממוצע כיתה: ${summary.overallAverage ?? '-'}</div>
  `;
  teacherClassSummary.innerHTML = summaryHtml;
  teacherHistorySummary.innerHTML = summaryHtml;
}

function historyEntryHasScores(entry) {
  const students = Array.isArray(entry.payload?.students) ? entry.payload.students : [];
  return students.some((student) => (
    Array.isArray(student.results) && student.results.some((item) => item.result)
  ));
}

function currentStudentNameForHistory(studentName, studentIndex) {
  return teacherRoster[studentIndex]?.name || studentName || '';
}

function formatHistoryDateTime(value) {
  const date = new Date(value);
  return {
    date: date.toLocaleDateString('he-IL'),
    time: date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
  };
}

function renderHistoryDateTime(value) {
  const parts = formatHistoryDateTime(value);
  return `<span class="history-date-time"><span>${parts.date}</span><span>${parts.time}</span></span>`;
}

function renderTeacherHistoryEntry() {
  teacherHistoryMode = 'entry';
  teacherHistoryRecordsButton?.classList.remove('is-editing-button');
  teacherHistoryRecordsWhatsappButton?.classList.add('is-hidden');
  teacherHistoryRecordsCsvButton?.classList.add('is-hidden');

  if (!teacherHistoryEntries.length) {
    teacherHistoryDateRange.textContent = '';
    teacherHistorySelectedDate.textContent = '';
    teacherClassHistory.innerHTML = '<p>אין היסטוריה עדיין. שמור תוצאה ראשונה כדי לראות טבלאות וגרפים.</p>';
    teacherHistoryGraph.innerHTML = '';
    teacherHistoryRange.min = '0';
    teacherHistoryRange.max = '0';
    teacherHistoryRange.value = '0';
    return;
  }

  const oldest = teacherHistoryEntries[0];
  const newest = teacherHistoryEntries[teacherHistoryEntries.length - 1];
  teacherHistoryDateRange.innerHTML = `
    ${renderHistoryDateTime(oldest.createdAt)}
    <span class="history-date-range-separator">-</span>
    ${renderHistoryDateTime(newest.createdAt)}
  `;
  teacherHistoryRange.min = '0';
  teacherHistoryRange.max = String(teacherHistoryEntries.length - 1);
  teacherHistoryRange.value = String(selectedTeacherHistoryIndex);

  const entry = teacherHistoryEntries[selectedTeacherHistoryIndex];
  teacherHistorySelectedDate.innerHTML = `
    <span class="history-selected-label">רשומה נבחרת: ${renderHistoryDateTime(entry.createdAt)}</span>
    <button type="button" class="back-home-button ${teacherHistoryEditMode ? 'is-editing-button' : ''}" data-edit-history-entry>${teacherHistoryEditMode ? 'סיום עריכה' : 'עריכה'}</button>
    ${teacherHistoryEditMode ? `<button type="button" class="danger-button teacher-history-delete-button" data-delete-history-id="${entry.id}">מחיקת רשומה</button>` : ''}
  `;

  const students = Array.isArray(entry.payload?.students) ? entry.payload.students : [];
  const subjectLabels = [];
  const seen = new Set();

  students.forEach((student) => {
    (student.results || []).forEach((item) => {
      if (!item.result || seen.has(item.label)) {
        return;
      }

      seen.add(item.label);
      subjectLabels.push(item.label);
    });
  });

  const headers = subjectLabels.map((label) => `<th class="history-subject-header" colspan="2">${label}</th>`).join('');
  const subHeaders = subjectLabels.map(() => '<th class="history-result-cell">תוצאה</th><th class="history-score-cell">ציון</th>').join('');
  if (!subjectLabels.length) {
    teacherClassHistory.innerHTML = '<p>אין ציונים שמורים ברשומה זו.</p>';
    return;
  }

  const rows = students.map((student, studentIndex) => {
    const resultMap = new Map((student.results || []).filter((item) => item.result).map((item) => [item.label, item]));
    const subjectCells = subjectLabels.map((label) => {
      const item = resultMap.get(label);
      const result = item?.result;
      return `<td class="history-result-cell">${result ? displayHistoryValue(item.enteredValue || result.matchedValue || '', item) : ''}</td><td class="history-score-cell">${result?.score ?? ''}</td>`;
    }).join('');
    return `<tr><td>${currentStudentNameForHistory(student.studentName, studentIndex)}</td>${subjectCells}</tr>`;
  }).join('');

  teacherClassHistory.innerHTML = `
    <table class="teacher-history-results-table">
      <thead>
        <tr><th rowspan="2">תלמיד</th>${headers}</tr>
        <tr>${subHeaders}</tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  renderHistoryGraph();
}

function renderTeacherHistoryRecords() {
  teacherHistoryMode = 'records';
  teacherHistoryEditMode = false;
  teacherHistoryRecordsButton?.classList.add('is-editing-button');
  teacherHistoryRecordsWhatsappButton?.classList.remove('is-hidden');
  teacherHistoryRecordsCsvButton?.classList.remove('is-hidden');
  teacherHistorySelectedDate.textContent = 'שיאים אישיים מכל רשומות ההיסטוריה';

  if (!teacherHistoryEntries.length) {
    teacherClassHistory.innerHTML = '<p>אין היסטוריה עדיין. שמור תוצאה ראשונה כדי לראות שיאים וגרפים.</p>';
    teacherHistoryGraph.innerHTML = '';
    return;
  }

  const { subjectLabels, studentNames, studentRecords } = getTeacherHistoryRecordsData();

  if (!subjectLabels.length) {
    teacherClassHistory.innerHTML = '<p>אין ציונים שמורים בהיסטוריה.</p>';
    teacherHistoryGraph.innerHTML = '';
    return;
  }

  const headers = subjectLabels.map((label) => `<th class="history-subject-header" colspan="2">${label}</th>`).join('');
  const subHeaders = subjectLabels.map(() => '<th class="history-result-cell">תוצאה</th><th class="history-score-cell">ציון</th>').join('');
  const rows = studentNames.map((studentName) => {
    const records = studentRecords.get(studentName) || new Map();
    const subjectCells = subjectLabels.map((label) => {
      const record = records.get(label);
      return `<td class="history-result-cell">${record?.enteredValue ?? ''}</td><td class="history-score-cell">${record?.result?.score ?? ''}</td>`;
    }).join('');

    return `<tr><td>${studentName}</td>${subjectCells}</tr>`;
  }).join('');

  teacherClassHistory.innerHTML = `
    <table class="teacher-history-results-table">
      <thead>
        <tr><th rowspan="2">תלמיד</th>${headers}</tr>
        <tr>${subHeaders}</tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  renderHistoryGraph();
}

function getTeacherHistoryRecordsData() {
  const subjectLabels = [];
  const seenSubjects = new Set();
  const studentRecords = new Map();

  teacherRoster.forEach((student) => {
    studentRecords.set(student.name, new Map());
  });

  teacherHistoryEntries.forEach((entry) => {
    const students = Array.isArray(entry.payload?.students) ? entry.payload.students : [];

    students.forEach((student, studentIndex) => {
      const studentName = currentStudentNameForHistory(student.studentName, studentIndex);

      if (!studentRecords.has(studentName)) {
        studentRecords.set(studentName, new Map());
      }

      (student.results || []).forEach((item) => {
        if (!item.result) {
          return;
        }

        if (!seenSubjects.has(item.label)) {
          seenSubjects.add(item.label);
          subjectLabels.push(item.label);
        }

        const records = studentRecords.get(studentName);
        const existing = records.get(item.label);

        if (!existing || Number(item.result.score) > Number(existing.result.score)) {
          records.set(item.label, {
            result: item.result,
            enteredValue: displayHistoryValue(item.enteredValue || item.result.matchedValue || '', item),
          });
        }
      });
    });
  });

  return {
    subjectLabels,
    studentRecords,
    studentNames: teacherRoster.length ? teacherRoster.map((student) => student.name) : Array.from(studentRecords.keys()),
  };
}

function getHistoryGraphData(subjectLabel = activeHistoryGraphSubject) {
  const subjects = [];
  const seenSubjects = new Set();

  teacherHistoryEntries.forEach((entry) => {
    (entry.payload?.students || []).forEach((student) => {
      (student.results || []).forEach((item) => {
        if (item.result && !seenSubjects.has(item.label)) {
          seenSubjects.add(item.label);
          subjects.push(item.label);
        }
      });
    });
  });

  const selectedSubject = subjects.includes(subjectLabel) ? subjectLabel : subjects[0] || '';
  const studentNames = teacherRoster.length
    ? teacherRoster.map((student) => student.name)
    : Array.from(new Set(teacherHistoryEntries.flatMap((entry) => (entry.payload?.students || []).map((student) => student.studentName || '')))).filter(Boolean);
  const relevantHistoryEntries = teacherHistoryEntries.filter((entry) => (
    (entry.payload?.students || []).some((student) => (
      (student.results || []).some((item) => item.label === selectedSubject && item.result)
    ))
  ));
  const entries = relevantHistoryEntries.map((entry) => ({
    date: new Date(entry.createdAt).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: '2-digit' }),
    students: entry.payload?.students || [],
  }));
  const series = studentNames.map((studentName) => ({
    name: studentName,
    scores: entries.map((entry) => {
      const student = teacherRoster.length ? entry.students[studentNames.indexOf(studentName)] : entry.students.find((item) => item.studentName === studentName);
      const result = student?.results?.find((item) => item.label === selectedSubject && item.result);
      return result ? {
        score: Number(result.result.score),
        enteredValue: displayHistoryValue(result.enteredValue || result.result.matchedValue || '', result),
      } : null;
    }),
  }));

  return { subjects, selectedSubject, entries, series };
}

function renderHistoryGraph() {
  const graphData = getHistoryGraphData();

  if (!graphData.subjects.length || !graphData.entries.length) {
    teacherHistoryGraph.innerHTML = '';
    return;
  }

  activeHistoryGraphSubject = graphData.selectedSubject;

  if (!historyGraphSelectionTouched && !visibleHistoryGraphStudents.size) {
    visibleHistoryGraphStudents = new Set(graphData.series.map((item) => item.name));
  }

  teacherHistoryGraph.innerHTML = renderHistoryGraphMarkup(graphData, false);
}

function renderHistoryGraphMarkup(graphData, readOnly) {
  const width = 860;
  const height = 430;
  const margin = { top: 28, right: 64, bottom: 54, left: 48 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const colors = ['#1f77b4', '#d62728', '#2ca02c', '#9467bd', '#ff7f0e', '#17becf', '#8c564b', '#e377c2', '#bcbd22', '#4b5563'];
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
  const visibleSeries = graphData.series
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter((item) => visibleHistoryGraphStudents.has(item.name));
  const xForIndex = (index) => margin.left + (graphData.entries.length === 1 ? chartWidth / 2 : (chartWidth * index) / (graphData.entries.length - 1));
  const yForScore = (score) => margin.top + chartHeight - (chartHeight * Number(score)) / 100;
  const yTicks = [0, 20, 40, 60, 80, 100];
  const minorYTicks = Array.from({ length: 21 }, (_, index) => index * 5).filter((tick) => !yTicks.includes(tick));
  const marker = (shape, x, y, color) => {
    if (shape === 'square') return `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="${color}"></rect>`;
    if (shape === 'triangle') return `<polygon points="${x},${y - 6} ${x - 6},${y + 5} ${x + 6},${y + 5}" fill="${color}"></polygon>`;
    if (shape === 'diamond') return `<polygon points="${x},${y - 6} ${x - 6},${y} ${x},${y + 6} ${x + 6},${y}" fill="${color}"></polygon>`;
    if (shape === 'star') return `<text x="${x}" y="${y + 5}" text-anchor="middle" fill="${color}" font-size="15">★</text>`;
    return `<circle cx="${x}" cy="${y}" r="5" fill="${color}"></circle>`;
  };
  const lines = visibleSeries.map((student) => {
    const color = colors[student.originalIndex % colors.length];
    const shape = shapes[student.originalIndex % shapes.length];
    const points = student.scores.map((score, index) => {
      if (score === null) return null;
      const normalizedScore = typeof score === 'number' ? { score, enteredValue: '' } : score;
      return { x: xForIndex(index), y: yForScore(normalizedScore.score), score: normalizedScore, index };
    });
    const segments = [];
    let current = [];

    points.forEach((point) => {
      if (point) {
        current.push(point);
      } else if (current.length) {
        segments.push(current);
        current = [];
      }
    });
    if (current.length) segments.push(current);

    return `
      ${segments.map((segment) => `<polyline points="${segment.map((point) => `${point.x},${point.y}`).join(' ')}" fill="none" stroke="${color}" stroke-width="3"></polyline>`).join('')}
      ${points.map((point) => (point ? `<g class="history-graph-point" data-tooltip-name="${student.name}" data-tooltip-date="${graphData.entries[point.index].date}" data-tooltip-subject="${graphData.selectedSubject}" data-tooltip-score="${point.score.score}" data-tooltip-result="${point.score.enteredValue}">${marker(shape, point.x, point.y, color)}</g>` : '')).join('')}
    `;
  }).join('');
  const studentList = graphData.series.map((student, index) => `
    <label class="history-graph-student" style="--student-color: ${colors[index % colors.length]}">
      <span>${student.name}</span>
      <input type="checkbox" data-history-graph-student="${student.name}" ${visibleHistoryGraphStudents.has(student.name) ? 'checked' : ''} ${readOnly ? 'disabled' : ''} />
    </label>
  `).join('');
  const subjectControl = readOnly
    ? `<strong>${graphData.selectedSubject}</strong>`
    : `<select id="history-graph-subject">${graphData.subjects.map((subject) => `<option value="${subject}" ${subject === graphData.selectedSubject ? 'selected' : ''}>${subject}</option>`).join('')}</select>`;

  return `
    <div class="history-graph-header">
      <div class="history-graph-title"><strong>ציון לפי תאריך</strong><label>מקצוע ${subjectControl}</label></div>
      ${readOnly ? '' : '<div class="history-graph-share-actions"><div><button type="button" class="teacher-panel-button whatsapp-button" data-history-graph-share>שיתוף גרף</button><button type="button" class="secondary-button teacher-panel-button" data-history-graph-copy>העתקת קישור</button><button type="button" class="secondary-button teacher-panel-button" data-history-graph-image>הורדת תמונה</button></div><div id="history-graph-message" class="history-graph-message" role="status" aria-live="polite"></div></div>'}
    </div>
    <div class="history-graph-layout">
      <svg class="history-graph-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="גרף היסטוריית ציונים">
        ${minorYTicks.map((tick) => `<line x1="${margin.left}" x2="${width - margin.right}" y1="${yForScore(tick)}" y2="${yForScore(tick)}" class="history-graph-grid-minor"></line>`).join('')}
        ${yTicks.map((tick) => `<line x1="${margin.left}" x2="${width - margin.right}" y1="${yForScore(tick)}" y2="${yForScore(tick)}" class="history-graph-grid"></line><text x="${margin.left - 12}" y="${yForScore(tick) + 4}" text-anchor="end">${tick}</text>`).join('')}
        <line x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${height - margin.bottom}" class="history-graph-axis"></line>
        <line x1="${margin.left}" x2="${width - margin.right}" y1="${height - margin.bottom}" y2="${height - margin.bottom}" class="history-graph-axis"></line>
        ${graphData.entries.map((entry, index) => `<text x="${xForIndex(index)}" y="${height - 20}" text-anchor="middle">${entry.date}</text>`).join('')}
        <text x="${margin.left}" y="18" text-anchor="start">ציון</text>
        ${lines}
      </svg>
      <div class="history-graph-students"><h3>תלמידים</h3>${readOnly ? '' : '<div class="history-graph-student-actions"><button type="button" data-history-graph-select-all>בחר הכל</button><button type="button" data-history-graph-clear-all>נקה הכל</button></div>'}${studentList}</div>
    </div>
    ${readOnly ? '' : '<div id="history-graph-tooltip" class="history-graph-tooltip is-hidden"></div>'}
  `;
}

function showHistoryGraphTooltip(point, event) {
  const tooltip = document.querySelector('#history-graph-tooltip');
  if (!tooltip) {
    return;
  }

  tooltip.innerHTML = `
    <strong>${point.dataset.tooltipName}</strong>
    <span>${point.dataset.tooltipSubject}</span>
    <span>תאריך: ${point.dataset.tooltipDate}</span>
    <span>ציון: ${point.dataset.tooltipScore}</span>
    <span>תוצאה: ${point.dataset.tooltipResult}</span>
  `;
  tooltip.classList.remove('is-hidden');
  const graphRect = teacherHistoryGraph.getBoundingClientRect();
  tooltip.style.left = `${event.clientX - graphRect.left + 12}px`;
  tooltip.style.top = `${event.clientY - graphRect.top + 12}px`;
}

function hideHistoryGraphTooltip() {
  const tooltip = document.querySelector('#history-graph-tooltip');
  if (tooltip) {
    tooltip.classList.add('is-hidden');
  }
}

async function deleteSelectedTeacherHistoryEntry(historyId) {
  if (!activeTeacherClassId || !historyId) {
    return;
  }

  const response = await fetch(`/api/teacher/classes/${activeTeacherClassId}/history/${historyId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    teacherClassFormError.textContent = 'לא ניתן למחוק את הרשומה כרגע.';
    return;
  }

  teacherHistoryEntries = teacherHistoryEntries.filter((entry) => entry.id !== historyId);
  selectedTeacherHistoryIndex = Math.min(selectedTeacherHistoryIndex, Math.max(teacherHistoryEntries.length - 1, 0));
  teacherHistoryEditMode = false;
  closeHistoryDeleteModal();
  renderTeacherHistoryEntry();
}

function syncMemberControls() {
  const isAdmin = authUser?.role === 'admin';
  adminNavButton.classList.toggle('is-hidden', !isAdmin);
  memberProfileButton.classList.toggle('is-hidden', !authUser);
  memberLogoutButton.classList.toggle('is-hidden', !authUser);
}

function currentTeacherClass() {
  return teacherClasses.find((item) => item.id === activeTeacherClassId) || null;
}

function toggleBodyClass(className) {
  document.body.classList.toggle(className);
}

function applyAccessibilityTextScale() {
  document.documentElement.style.setProperty('--accessibility-text-scale', String(accessibilityTextScale));
}

function openAccessibilityToolbar() {
  accessibilityToolbar.classList.remove('is-hidden');
  accessibilityFab.setAttribute('aria-expanded', 'true');
  const firstButton = accessibilityToolbar.querySelector('button');

  if (firstButton) {
    firstButton.focus();
  }
}

function closeAccessibilityToolbar() {
  accessibilityToolbar.classList.add('is-hidden');
  accessibilityFab.setAttribute('aria-expanded', 'false');
  accessibilityFab.focus();
}

function resetAccessibilitySettings() {
  accessibilityTextScale = 1;
  applyAccessibilityTextScale();
  document.body.classList.remove(
    'accessibility-readable-font',
    'accessibility-underline-links',
    'accessibility-grayscale',
    'accessibility-high-contrast',
    'accessibility-negative-contrast'
  );
}

function setEntryMode(mode) {
  if (!staticViews[mode] && mode !== 'member') {
    previousEntryMode = mode;
  }

  const memberMode = mode === 'member' || mode.startsWith('member-');
  currentEntryMode = mode;
  homeView.classList.toggle('is-hidden', mode !== 'home');
  const showLogin = mode === 'member' && !authUser;
  const showSignup = mode === 'signup';
  const showAdmin = mode === 'admin' || (mode === 'member' && authUser?.role === 'admin');
  const showTeacherShell = memberMode && authUser?.role === 'teacher';

  memberLoginView.classList.toggle('is-hidden', !showLogin);
  memberSignupView.classList.toggle('is-hidden', !showSignup);
  adminView.classList.toggle('is-hidden', !showAdmin);
  appShell.classList.toggle('is-hidden', mode === 'home' || Boolean(staticViews[mode]) || showLogin || showSignup || showAdmin || (!showTeacherShell && memberMode));
  topControls.classList.toggle('is-hidden', memberMode);
  Object.entries(staticViews).forEach(([key, view]) => {
    if (key === 'login' || key === 'admin') {
      return;
    }

    view.classList.toggle('is-hidden', mode !== key);
  });

  const guestMode = mode === 'guest';
  maleStudentTabButton.classList.toggle('is-hidden', memberMode);
  femaleStudentTabButton.classList.toggle('is-hidden', memberMode);
  teacherTabButton.classList.toggle('is-hidden', guestMode || memberMode);
  syncMemberControls();
}

function applyRoute(mode, replace = false) {
  setEntryMode(mode);

  if (mode === 'guest') {
    setActiveView('student_male');
    renderCurrentView();
  } else if (mode === 'member') {
    if (authUser?.role === 'teacher') {
      setTeacherSubview('home', false);
      setActiveView('teacher');
      renderCurrentView();
    } else if (authUser?.role === 'admin') {
      loadAdminOverview();
    }
  } else if (mode === 'member-classes' && authUser?.role === 'teacher') {
    setTeacherSubview('home', false);
    setActiveView('teacher');
    renderCurrentView();
  } else if (mode === 'member-new-class' && authUser?.role === 'teacher') {
    setTeacherSubview('new', false);
    setActiveView('teacher');
    renderCurrentView();
  } else if (mode === 'member-class' && authUser?.role === 'teacher') {
    setTeacherSubview('detail', false);
    setActiveView('teacher');
    renderCurrentView();
  } else if (mode === 'member-history' && authUser?.role === 'teacher') {
    setTeacherSubview('history', false);
    setActiveView('teacher');
    renderCurrentView();
  } else if (mode === 'admin' && authUser?.role === 'admin') {
    loadAdminOverview();
  } else if (mode === 'profile' && authUser) {
    fillProfileForm();
  } else if (mode === 'profile') {
    applyRoute('member', true);
    return;
  }

  updateRoute(mode, replace);
}

function formatCompactEntry(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}${String(remainingSeconds).padStart(2, '0')}`;
}

function formatTimeDisplayFromSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function parseCompactTimeInput(value) {
  const digits = String(value || '').trim().replace(/[^0-9]/g, '');

  if (!digits) {
    return null;
  }

  const padded = digits.padStart(3, '0');
  const seconds = Number(padded.slice(-2));
  const minutes = Number(padded.slice(0, -2));

  if (!Number.isFinite(seconds) || !Number.isFinite(minutes)) {
    return null;
  }

  return { digits, minutes, seconds };
}

function normalizeTeacherTimeInputs(rawStudents) {
  const sheet = selectedSheet();
  pendingInvalidScoreWarnings = [];

  return rawStudents.map((student) => {
    const values = { ...(student.values || {}) };

    sheet.metrics.forEach((metric) => {
      if (!(metric.valueType === 'time_string' || metric.valueType === 'time_compact' || metric.valueType === 'time_fraction')) {
        return;
      }

      const parsed = parseCompactTimeInput(values[metric.key]);

      if (!parsed || parsed.seconds < 60) {
        return;
      }

      const correctedSeconds = (parsed.minutes * 60) + 60;
      const correctedValue = formatCompactEntry(correctedSeconds);
      pendingInvalidScoreWarnings.push({
        studentName: student.studentName,
        subject: metric.label,
        invalidScore: values[metric.key],
        correctedScore: formatTimeDisplayFromSeconds(correctedSeconds),
      });
      values[metric.key] = correctedValue;
    });

    return { ...student, values };
  });
}

function historyItemIsTime(item) {
  const metric = selectedSheet()?.metrics.find((metricItem) => metricItem.key === item?.key || metricItem.label === item?.label);
  return metric && (metric.valueType === 'time_string' || metric.valueType === 'time_compact' || metric.valueType === 'time_fraction');
}

function displayHistoryValue(value, item = null) {
  if (!historyItemIsTime(item)) {
    return value || '';
  }

  const parsed = parseCompactTimeInput(value);

  if (!parsed || parsed.seconds >= 60 || parsed.digits.length < 3) {
    return value || '';
  }

  return `${parsed.minutes}:${String(parsed.seconds).padStart(2, '0')}`;
}

function openInvalidScoreModal() {
  if (!pendingInvalidScoreWarnings.length) {
    return;
  }

  teacherInvalidScoreMessage.innerHTML = pendingInvalidScoreWarnings.map((warning) => `
    <div>תלמיד: ${warning.studentName}</div>
    <div>מקצוע: ${warning.subject}</div>
    <div>תוצאה לא תקינה: ${warning.invalidScore}</div>
    <div>תוקן ל: ${warning.correctedScore}</div>
  `).join('<hr />');
  teacherInvalidScoreModal.classList.remove('is-hidden');
  teacherInvalidScoreModal.setAttribute('aria-hidden', 'false');
}

function closeInvalidScoreModal() {
  teacherInvalidScoreModal.classList.add('is-hidden');
  teacherInvalidScoreModal.setAttribute('aria-hidden', 'true');
}

function studentExample(metric) {
  const exampleEntry = metric.entries.find((entry) => entry.score === 90);

  if (!exampleEntry) {
    return '';
  }

  if (metric.valueType === 'beeps') {
    return String(exampleEntry.raw);
  }

  if (metric.valueType === 'time_string' || metric.valueType === 'time_compact' || metric.valueType === 'time_fraction') {
    return formatCompactEntry(exampleEntry.comparable);
  }

  return String(exampleEntry.raw);
}

function selectedSheet() {
  const gender = activeView === 'teacher' ? activeTeacherGender() : activeStudentGender();
  return sheetSets[gender].find((sheet) => sheet.id === sheetSelect.value);
}

function createDefaultTeacherRoster(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `student-${index + 1}`,
    name: `${activeTeacherStudentLabel()} ${index + 1}`,
  }));
}

function syncTeacherRoster() {
  const count = Number(studentCountSelect.value);

  if (!teacherRoster.length) {
    teacherRoster = createDefaultTeacherRoster(count);
    return;
  }

  teacherRoster = teacherRoster.slice(0, count);

  while (teacherRoster.length < count) {
    const index = teacherRoster.length;
    teacherRoster.push({
      id: `student-${index + 1}`,
      name: `${activeTeacherStudentLabel()} ${index + 1}`,
    });
  }
}

function resetTeacherRoster() {
  teacherRoster = createDefaultTeacherRoster(Number(studentCountSelect.value));
}

function createStudentOptions() {
  studentCountSelect.innerHTML = Array.from({ length: 45 }, (_, index) => {
    const value = index + 1;
    const selected = value === 10 ? ' selected' : '';
    return `<option value="${value}"${selected}>${value}</option>`;
  }).join('');
}

function createDefaultTeacherRoster(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `student-${index + 1}`,
    name: `${activeTeacherStudentLabel()} ${index + 1}`,
  }));
}

function syncTeacherRoster() {
  const count = Number(studentCountSelect.value);

  if (!teacherRoster.length) {
    teacherRoster = createDefaultTeacherRoster(count);
    return;
  }

  teacherRoster = teacherRoster.slice(0, count);

  while (teacherRoster.length < count) {
    const index = teacherRoster.length;
    teacherRoster.push({
      id: `student-${index + 1}`,
      name: `${activeTeacherStudentLabel()} ${index + 1}`,
    });
  }
}

function resetTeacherRoster() {
  teacherRoster = createDefaultTeacherRoster(Number(studentCountSelect.value));
  teacherClassValues = {};
}

function createTeacherNameInputs() {
  const count = Number(teacherClassStudentCountSelect.value);
  teacherClassStudentNames.innerHTML = Array.from({ length: count }, (_, index) => `
    <input
      type="text"
      class="teacher-class-student-name-field"
      data-new-student-index="${index}"
      value="${activeTeacherStudentLabel()} ${index + 1}"
      placeholder="${activeTeacherStudentLabel()} ${index + 1}"
    />
  `).join('');
}

function computeTeacherClassSummary() {
  const filledScores = Object.values(teacherClassValues).reduce((count, studentValues) => (
    count + Object.values(studentValues || {}).filter(Boolean).length
  ), 0);
  const recordAverages = computeTeacherRecordAverages();
  const averages = recordAverages.length
    ? recordAverages
    : latestTeacherResults.map((student) => student.averageScore).filter((value) => Number.isFinite(value));
  const overallAverage = averages.length
    ? Math.floor(averages.reduce((sum, value) => sum + value, 0) / averages.length)
    : null;

  return {
    studentCount: teacherRoster.length,
    filledScores,
    overallAverage,
  };
}

function computeTeacherRecordAverages() {
  if (!teacherHistoryEntries.length) {
    return [];
  }

  const studentScores = new Map();

  teacherRoster.forEach((student) => {
    studentScores.set(student.name, new Map());
  });

  teacherHistoryEntries.forEach((entry) => {
    const students = Array.isArray(entry.payload?.students) ? entry.payload.students : [];

    students.forEach((student) => {
      const studentName = student.studentName || '';

      if (!studentScores.has(studentName)) {
        studentScores.set(studentName, new Map());
      }

      (student.results || []).forEach((item) => {
        if (!item.result || !Number.isFinite(Number(item.result.score))) {
          return;
        }

        const scores = studentScores.get(studentName);
        const existingScore = scores.get(item.label);
        const nextScore = Number(item.result.score);

        if (!Number.isFinite(existingScore) || nextScore > existingScore) {
          scores.set(item.label, nextScore);
        }
      });
    });
  });

  return Array.from(studentScores.values())
    .map((scores) => {
      const values = Array.from(scores.values()).filter((value) => Number.isFinite(value));
      return values.length ? Math.floor(values.reduce((sum, value) => sum + value, 0) / values.length) : null;
    })
    .filter((value) => Number.isFinite(value));
}

function renderTeacherClassList() {
  teacherClassList.classList.toggle('teacher-class-list-rows', teacherClassListView === 'list');
  teacherClassList.classList.toggle('is-editing', teacherClassesEditMode);
  teacherClassSortField.disabled = teacherClassesEditMode;
  teacherClassSortDirection.disabled = teacherClassesEditMode;
  const useManualOrder = teacherClassesEditMode || teacherClassSortField.value === 'manual';
  teacherClassViewToggleButton.textContent = 'תצוגה';
  const sortedClasses = useManualOrder ? [...teacherClasses] : [...teacherClasses].sort((left, right) => {
    const filledLeft = Object.values(left.values || {}).reduce((count, studentValues) => count + Object.values(studentValues || {}).filter(Boolean).length, 0);
    const filledRight = Object.values(right.values || {}).reduce((count, studentValues) => count + Object.values(studentValues || {}).filter(Boolean).length, 0);
    const sortField = teacherClassSortField.value;
    const sortDirection = teacherClassSortDirection.value === 'asc' ? 1 : -1;
    const leftValue = sortField === 'filledScores' ? filledLeft : left[sortField];
    const rightValue = sortField === 'filledScores' ? filledRight : right[sortField];

    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
      return (leftValue - rightValue) * sortDirection;
    }

    return String(leftValue).localeCompare(String(rightValue), 'he') * sortDirection;
  });

  teacherClassList.innerHTML = sortedClasses.length
    ? sortedClasses.map((teacherClass) => {
      const filledScores = Object.values(teacherClass.values || {}).reduce((count, studentValues) => (
        count + Object.values(studentValues || {}).filter(Boolean).length
      ), 0);

      return `
      <article class="teacher-class-card${teacherClass.id === activeTeacherClassId ? ' is-active' : ''}" data-open-class-id="${teacherClass.id}" ${teacherClassesEditMode ? 'draggable="true"' : ''}>
        <strong>${teacherClass.name}</strong>
        <div>שכבה: ${formatClassName(teacherClass.grade)}</div>
        <div>קבוצה: ${teacherClass.gender === 'female' ? 'בנות' : 'בנים'}</div>
        <div>מספר תלמידים: ${teacherClass.studentCount}</div>
        <div class="teacher-class-card-actions">
          ${teacherClassesEditMode ? `
            <button type="button" class="teacher-order-button teacher-drag-handle" data-class-id="${teacherClass.id}">גרירה</button>
            <button type="button" class="danger-button teacher-delete-class-button" data-delete-class-id="${teacherClass.id}">מחיקת כיתה</button>
          ` : ''}
        </div>
      </article>
    `; }).join('')
    : '<p>עדיין אין כיתות שמורות. אפשר ליצור כיתה חדשה.</p>';
}

function openDeleteModal(classId) {
  pendingDeleteClassId = classId;
  const teacherClass = teacherClasses.find((item) => item.id === classId);
  teacherDeleteMessage.textContent = teacherClass
    ? `האם למחוק את הכיתה ${teacherClass.name}?`
    : 'האם למחוק את הכיתה?';
  teacherDeleteModal.classList.remove('is-hidden');
  teacherDeleteModal.setAttribute('aria-hidden', 'false');
}

function closeDeleteModal() {
  pendingDeleteClassId = null;
  teacherDeleteModal.classList.add('is-hidden');
  teacherDeleteModal.setAttribute('aria-hidden', 'true');
}

function openHistoryDeleteModal(historyId) {
  pendingDeleteHistoryId = historyId;
  teacherHistoryDeleteModal.classList.remove('is-hidden');
  teacherHistoryDeleteModal.setAttribute('aria-hidden', 'false');
}

function closeHistoryDeleteModal() {
  pendingDeleteHistoryId = null;
  teacherHistoryDeleteModal.classList.add('is-hidden');
  teacherHistoryDeleteModal.setAttribute('aria-hidden', 'true');
}

function loadTeacherClassIntoWorkspace(teacherClass) {
  activeTeacherClassId = teacherClass.id;
  activeTeacherGenderValue = teacherClass.gender;
  studentCountSelect.value = String(teacherClass.studentCount);
  teacherClassGradeSelect.value = teacherClass.grade;
  teacherClassNameInput.value = teacherClass.name;
  sheetSelect.value = `sheet_${teacherClass.grade}`;
  teacherRoster = teacherClass.roster?.length ? teacherClass.roster : createDefaultTeacherRoster(teacherClass.studentCount);
  teacherClassValues = teacherClass.values || {};
  teacherEditMode = false;
  activeHistoryGraphSubject = '';
  visibleHistoryGraphStudents = new Set();
  historyGraphSelectionTouched = false;
  teacherHistoryEditMode = false;
  syncTeacherGenderTabs();
  setTeacherSubview('detail');
  teacherClassDetailTitle.textContent = teacherClass.name;
  const summary = computeTeacherClassSummary();
  const summaryHtml = `
    <div class="teacher-summary-card">שכבה: ${formatClassName(teacherClass.grade)}</div>
    <div class="teacher-summary-card">קבוצה: ${teacherClass.gender === 'female' ? 'בנות' : 'בנים'}</div>
    <div class="teacher-summary-card">מספר תלמידים: ${summary.studentCount}</div>
    <div class="teacher-summary-card">ממוצע כיתה: ${summary.overallAverage ?? '-'}</div>
  `;
  teacherClassSummary.innerHTML = summaryHtml;
  teacherHistorySummary.innerHTML = summaryHtml;
  loadTeacherClassHistory(teacherClass.id);
  renderCurrentView();
}

async function refreshTeacherClasses() {
  if (!authUser || !['teacher', 'admin'].includes(authUser.role)) {
    return;
  }

  const response = await fetch('/api/teacher/classes');

  if (!response.ok) {
    teacherClassList.innerHTML = '<p>לא ניתן לטעון כיתות כרגע.</p>';
    return;
  }

  const data = await response.json();
  teacherClasses = data.classes;

  if (!activeTeacherClassId && teacherClasses.length) {
    activeTeacherClassId = teacherClasses[0].id;
  }

  renderTeacherClassList();
}

async function refreshCurrentTeacherHistory() {
  const classId = activeTeacherClassId;
  await refreshTeacherClasses();

  if (!classId) {
    return;
  }

  const refreshedClass = teacherClasses.find((teacherClass) => teacherClass.id === classId);
  if (refreshedClass) {
    loadTeacherClassIntoWorkspace(refreshedClass);
    setTeacherSubview('history', false);
  }
}

async function createTeacherClassFromForm(event) {
  event.preventDefault();
  teacherClassFormError.textContent = '';

  const payload = {
    name: teacherClassNameInput.value.trim(),
    grade: teacherClassGradeSelect.value,
    gender: teacherClassGenderSelect.value,
    studentCount: Number(teacherClassStudentCountSelect.value),
    roster: Array.from(teacherClassStudentNames.querySelectorAll('[data-new-student-index]')).map((input, index) => ({
      id: `student-${index + 1}`,
      name: input.value.trim() || `${teacherClassGenderSelect.value === 'female' ? 'תלמידה' : 'תלמיד'} ${index + 1}`,
    })),
    values: {},
  };

  if (!payload.name) {
    teacherClassFormError.textContent = 'יש להזין שם כיתה.';
    return;
  }

  const response = await fetch('/api/teacher/classes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    teacherClassFormError.textContent = errorData.error === 'Class limit reached'
      ? 'ניתן ליצור עד 18 כיתות לכל משתמש.'
      : 'לא ניתן ליצור כיתה כרגע.';
    return;
  }

  const data = await response.json();
  teacherClasses = [data.teacherClass, ...teacherClasses];
  loadTeacherClassIntoWorkspace(data.teacherClass);
}

async function saveCurrentTeacherClass() {
  if (!activeTeacherClassId) {
    teacherClassFormError.textContent = 'יש לבחור או ליצור כיתה לפני שמירה.';
    return;
  }

  const payload = {
    name: teacherClassNameInput.value.trim() || currentTeacherClass()?.name || 'כיתה ללא שם',
    grade: teacherClassGradeSelect.value,
    gender: activeTeacherGenderValue,
    studentCount: Number(studentCountSelect.value),
    roster: teacherRoster,
    values: teacherClassValues,
  };

  const response = await fetch(`/api/teacher/classes/${activeTeacherClassId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    teacherClassFormError.textContent = 'לא ניתן לשמור את הכיתה כרגע.';
    return;
  }

  const data = await response.json();
  teacherClasses = teacherClasses.map((item) => (item.id === data.teacherClass.id ? data.teacherClass : item));
  teacherClassFormError.textContent = '';
  loadTeacherClassIntoWorkspace(data.teacherClass);
  renderTeacherClassList();
}

function renderClassTabs() {
  classTabsContainer.innerHTML = sheetSets.male
    .map((sheet) => `
      <button
        type="button"
        class="class-tab${sheet.id === sheetSelect.value ? ' is-active' : ''}"
        data-sheet-id="${sheet.id}"
      >${formatClassName(sheet.name)}</button>
    `)
    .join('');
}

function renderMainTable(sheet) {
  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          ${sheet.table.headers.map((header) => `<th>${header}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${sheet.table.rows.map((row) => `
          <tr class="${String(row[0]).trim() === '55' ? 'score-55-row' : ''}">
            ${row.map((cell) => `<td>${cell}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderStudentForm() {
  const sheet = selectedSheet();

  if (!sheet) {
    return;
  }

  scoreForm.innerHTML = `
    ${sheet.metrics.map((metric) => `
      <div class="metric-card">
        <label class="field-label" for="${metric.key}">${metric.label}</label>
        <input id="${metric.key}" name="${metric.key}" />
        <p class="metric-meta">דוגמה לציון 90: ${studentExample(metric)}</p>
      </div>
    `).join('')}
    <button type="submit">חשב ציון</button>
  `;

  renderMainTable(sheet);
}

function renderStudentResults(data) {
  latestStudentResult = data;
  averageScore.textContent = data.averageScore === null
    ? 'לא הוזנו ערכים לחישוב'
    : `ציון ממוצע: ${data.averageScore}`;

  resultsList.innerHTML = data.results
    .filter((item) => item.result)
    .map((item) => `
      <article class="result-item">
        <strong>${item.label}</strong>
        <div>ציון: ${item.result.score}</div>
        <div>לפי ערך סף: ${item.result.matchedValue}</div>
      </article>
    `)
    .join('');

  if (!resultsList.innerHTML) {
    resultsList.innerHTML = '<p>הזינו לפחות ערך אחד כדי לקבל ציון.</p>';
  }
}

function shareStudentWhatsapp() {
  const sheet = selectedSheet();

  if (!latestStudentResult) {
    return;
  }

  const visibleScores = latestStudentResult.results
    .filter((item) => item.result)
    .map((item) => `${item.label} - ${item.result.score}`);

  if (!visibleScores.length) {
    return;
  }

  const parts = [`${activeStudentLabel()}: ${visibleScores.join(', ')}`];

  if (visibleScores.length > 1 && latestStudentResult.averageScore !== null) {
    parts.push(`ממוצע - ${latestStudentResult.averageScore}`);
  }

  const lines = [
    `EduFitScore - כיתה ${formatClassName(sheet.name)}`,
    '',
    parts.join(', '),
    '',
    window.location.href,
  ];

  const url = `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function shareSiteWhatsapp() {
  const message = `check your gym score ${window.location.href}`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function formatAdminDateTime(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  return `
    <span class="admin-date-line">${date.toLocaleDateString('he-IL')}</span>
    <span class="admin-time-line">${date.toLocaleTimeString('he-IL')}</span>
  `;
}

function formatAdminName(user) {
  return `
    <span class="admin-name-line">${user.firstName || user.fullName || ''}</span>
    <span class="admin-name-line">${user.lastName || ''}</span>
  `;
}

async function loadAdminOverview() {
  if (!authUser || authUser.role !== 'admin') {
    return;
  }

  const response = await fetch('/api/admin/overview');

  if (!response.ok) {
    adminSummary.textContent = 'לא ניתן לטעון את אזור הניהול כעת.';
    return;
  }

  const data = await response.json();
  adminSummary.textContent = `${data.user.fullName} (${data.user.email}) | ${data.summary}`;
  await loadAdminDiagnostics();
  await loadAdminUsers();
  await loadInactiveUsers();
  await loadAdminAuditLog();
}

async function loadAdminDiagnostics() {
  const response = await fetch('/api/admin/diagnostics');
  if (!response.ok) {
    adminDiagnostics.innerHTML = '<p>לא ניתן לטעון אבחון מערכת.</p>';
    return;
  }
  const { diagnostics } = await response.json();
  adminDiagnostics.innerHTML = `
    <div class="teacher-summary-card">משתמשים: ${diagnostics.users}</div>
    <div class="teacher-summary-card">פעילים: ${diagnostics.activeUsers}</div>
    <div class="teacher-summary-card">מושבתים: ${diagnostics.inactiveUsers}</div>
    <div class="teacher-summary-card">כיתות: ${diagnostics.classes}</div>
    <div class="teacher-summary-card">רשומות היסטוריה: ${diagnostics.historyRecords}</div>
    <div class="teacher-summary-card">גיבוי אחרון: ${diagnostics.latestBackup ? new Date(diagnostics.latestBackup).toLocaleString('he-IL') : '-'}</div>
  `;
}

async function loadAdminUsers() {
  const response = await fetch('/api/admin/users');

  if (!response.ok) {
    adminAllUsers.innerHTML = '<p>לא ניתן לטעון פרופילים.</p>';
    return;
  }

  const data = await response.json();
  adminAllUsers.innerHTML = data.users.length ? `
    <table class="admin-users-table">
      <thead>
        <tr>
          <th>סטטוס</th>
          <th>הפעלה</th>
          <th>שם</th>
          <th>דוא"ל</th>
          <th>טלפון</th>
          <th>עיר</th>
          <th>בית ספר</th>
          <th>סיסמה</th>
          <th>תפקיד</th>
          <th>עדכון אחרון</th>
        </tr>
      </thead>
      <tbody>
        ${data.users.map((user) => `
          <tr>
            <td>${user.isActive ? 'פעיל' : 'מושבת'}</td>
            <td>
              <button
                type="button"
                class="status-toggle ${user.isActive ? 'is-active' : ''}"
                data-status-user-id="${user.id}"
                data-status-user-name="${user.fullName || user.email}"
                data-status-user-active="${user.isActive ? 'true' : 'false'}"
              >
                <span class="status-toggle-knob"></span>
                <span class="status-toggle-text">${user.isActive ? 'השבתה' : 'הפעלה'}</span>
              </button>
            </td>
            <td class="admin-name-cell">${formatAdminName(user)}</td>
            <td>${user.email || ''}</td>
            <td>${user.phone || ''}</td>
            <td>${user.city || ''}</td>
            <td>${user.schoolName || ''}</td>
            <td><button type="button" class="back-home-button admin-password-button" data-reset-password-user-id="${user.id}" data-reset-password-user-name="${user.fullName || user.email}">איפוס</button></td>
            <td>${user.role === 'admin' ? 'מנהל' : 'מורה'}</td>
            <td class="admin-date-cell">${formatAdminDateTime(user.updatedAt)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : '<p>אין פרופילים.</p>';
}

async function loadAdminAuditLog() {
  const response = await fetch('/api/admin/audit-log');

  if (!response.ok) {
    adminAuditLog.innerHTML = '<p>לא ניתן לטעון יומן פעולות.</p>';
    return;
  }

  const data = await response.json();
  adminAuditEntries = data.entries;
  renderAdminAuditLogFromFilter();
}

function renderAdminAuditLogFromFilter() {
  const actionLabels = {
    enable_user: 'הפעלת משתמש',
    disable_user: 'השבתת משתמש',
    restore_user: 'שחזור משתמש',
    reset_password: 'איפוס סיסמה',
    export_backup: 'הורדת גיבוי',
    restore_backup: 'ייבוא גיבוי',
  };
  const filterValue = adminAuditFilter?.value || 'all';
  const entries = filterValue === 'all' ? adminAuditEntries : adminAuditEntries.filter((entry) => entry.action === filterValue);
  adminAuditLog.innerHTML = entries.length ? `
    <table class="admin-audit-table">
      <thead><tr><th>תאריך</th><th>פעולה</th><th>מנהל</th><th>משתמש</th><th>פרטים</th></tr></thead>
      <tbody>
        ${entries.map((entry) => `
          <tr>
            <td>${formatAdminDateTime(entry.createdAt)}</td>
            <td>${actionLabels[entry.action] || entry.action}</td>
            <td>${entry.adminName || entry.adminEmail}</td>
            <td>${entry.targetName || entry.targetEmail || '-'}</td>
            <td>${entry.details?.email || ''}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : '<p>אין פעולות להצגה. פעולות מנהל כמו איפוס סיסמה, השבתה, שחזור או גיבוי יופיעו כאן.</p>';
}

async function loadInactiveUsers() {
  const response = await fetch('/api/admin/inactive-users');

  if (!response.ok) {
    adminInactiveUsers.innerHTML = '<p>לא ניתן לטעון חשבונות מושבתים.</p>';
    return;
  }

  const data = await response.json();
  adminInactiveUsers.innerHTML = data.users.length
    ? data.users.map((user) => `
      <article class="admin-inactive-user-card">
        <strong>${user.fullName}</strong>
        <div>${user.email}</div>
        <div>${user.schoolName || ''}</div>
        <button type="button" class="back-home-button" data-restore-user-email="${user.email}">שחזור</button>
      </article>
    `).join('')
    : '<p>אין חשבונות מושבתים.</p>';
}

async function restoreInactiveUser(email) {
  adminRestoreMessage.textContent = '';
  const response = await fetch('/api/admin/restore-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    adminRestoreMessage.textContent = response.status === 404
      ? 'לא נמצא חשבון עם הדוא"ל הזה.'
      : 'לא ניתן לשחזר חשבון כרגע.';
    return;
  }

  adminRestoreMessage.textContent = 'החשבון שוחזר.';
  await loadAdminOverview();
}

async function downloadAdminBackup() {
  adminRestoreMessage.textContent = '';
  const response = await fetch('/api/admin/backup');

  if (!response.ok) {
    adminRestoreMessage.textContent = 'לא ניתן להוריד גיבוי כרגע.';
    return;
  }

  const backup = await response.json();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `edufitscore-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  adminRestoreMessage.textContent = 'הגיבוי הורד.';
  await loadAdminAuditLog();
}

async function restoreAdminBackupFromFile(file) {
  if (!file) {
    return;
  }

  adminRestoreMessage.textContent = '';
  try {
    const backup = JSON.parse(await file.text());
    const response = await fetch('/api/admin/backup/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ backup }),
    });

    const responseText = await response.text();
    let result = {};
    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      result = { details: responseText };
    }
    if (!response.ok) {
      throw new Error(result.details || result.error || response.statusText || 'RESTORE_FAILED');
    }

    const summary = result.summary || {};
    openAdminBackupResultModal(`
      <p><strong>הגיבוי יובא בהצלחה.</strong></p>
      <p>משתמשים: ${summary.users ?? '-'}</p>
      <p>כיתות: ${summary.classes ?? '-'}</p>
      <p>רשומות היסטוריה: ${summary.historyRecords ?? '-'}</p>
      <p>קישורי גרפים: ${summary.graphSnapshots ?? '-'}</p>
      <p>אם נותקת, יש להתחבר מחדש.</p>
    `);
    adminRestoreMessage.textContent = 'הגיבוי יובא.';
    await loadAdminDiagnostics();
    await loadAdminUsers();
    await loadInactiveUsers();
    await loadAdminAuditLog();
  } catch (error) {
    openAdminBackupResultModal(`<p><strong>ייבוא הגיבוי נכשל.</strong></p><p>קובץ הגיבוי לא תקין או שלא ניתן לייבא אותו.</p><p class="backup-error-details">פרטים: ${error.message}</p>`);
    adminRestoreMessage.textContent = 'קובץ הגיבוי לא תקין או שלא ניתן לייבא אותו.';
  } finally {
    adminBackupImport.value = '';
  }
}

function openAdminBackupResultModal(messageHtml) {
  adminBackupResultMessage.innerHTML = messageHtml;
  adminBackupResultModal.classList.remove('is-hidden');
  adminBackupResultModal.setAttribute('aria-hidden', 'false');
}

function closeAdminBackupResultModal() {
  adminBackupResultModal.classList.add('is-hidden');
  adminBackupResultModal.setAttribute('aria-hidden', 'true');
}

function openAdminStatusModal(button) {
  const isActive = button.dataset.statusUserActive === 'true';
  const nextIsActive = !isActive;
  pendingAdminStatusChange = {
    userId: Number(button.dataset.statusUserId),
    isActive: nextIsActive,
    name: button.dataset.statusUserName,
  };

  adminStatusMessage.textContent = nextIsActive
    ? `האם להפעיל את החשבון של ${pendingAdminStatusChange.name}?`
    : `האם להשבית את החשבון של ${pendingAdminStatusChange.name}? המשתמש ינותק ולא יוכל להתחבר עד להפעלה מחדש.`;
  adminStatusConfirmButton.textContent = nextIsActive ? 'הפעלה' : 'השבתה';
  adminStatusConfirmButton.classList.toggle('danger-button', !nextIsActive);
  adminStatusConfirmButton.classList.toggle('teacher-panel-button', nextIsActive);
  adminStatusModal.classList.remove('is-hidden');
  adminStatusModal.setAttribute('aria-hidden', 'false');
}

function closeAdminStatusModal() {
  pendingAdminStatusChange = null;
  adminStatusModal.classList.add('is-hidden');
  adminStatusModal.setAttribute('aria-hidden', 'true');
}

async function confirmAdminStatusChange() {
  if (!pendingAdminStatusChange) {
    return;
  }

  const { userId, isActive } = pendingAdminStatusChange;
  const response = await fetch(`/api/admin/users/${userId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    adminRestoreMessage.textContent = 'לא ניתן לעדכן את סטטוס המשתמש.';
    closeAdminStatusModal();
    return;
  }

  adminRestoreMessage.textContent = isActive ? 'החשבון הופעל.' : 'החשבון הושבת.';
  closeAdminStatusModal();
  if (authUser && userId === authUser.id && !isActive) {
    await logoutMember();
    return;
  }

  await loadAdminOverview();
}

window.openAdminStatusModal = openAdminStatusModal;

function openAdminPasswordModal(button) {
  pendingAdminPasswordReset = {
    userId: Number(button.dataset.resetPasswordUserId),
    name: button.dataset.resetPasswordUserName,
  };
  adminPasswordMessage.textContent = `איפוס סיסמה עבור ${pendingAdminPasswordReset.name}.`;
  adminPasswordError.textContent = '';
  adminTemporaryPassword.textContent = '';
  adminPasswordForm.reset();
  adminPasswordModal.classList.remove('is-hidden');
  adminPasswordModal.setAttribute('aria-hidden', 'false');
}

function closeAdminPasswordModal() {
  pendingAdminPasswordReset = null;
  adminPasswordForm.reset();
  adminPasswordError.textContent = '';
  adminTemporaryPassword.textContent = '';
  adminPasswordModal.classList.add('is-hidden');
  adminPasswordModal.setAttribute('aria-hidden', 'true');
}

async function submitAdminPasswordReset(event) {
  event.preventDefault();

  if (!pendingAdminPasswordReset) {
    return;
  }

  const payload = Object.fromEntries(new FormData(adminPasswordForm).entries());
  adminPasswordError.textContent = '';

  if (payload.newPassword !== payload.newPasswordRepeat) {
    adminPasswordError.textContent = 'הסיסמאות אינן זהות.';
    return;
  }

  if (String(payload.newPassword || '').length < 6) {
    adminPasswordError.textContent = 'הסיסמה חייבת לכלול לפחות 6 תווים.';
    return;
  }

  const submitButton = event.submitter;
  if (submitButton) {
    submitButton.disabled = true;
  }

  const response = await fetch(`/api/admin/users/${pendingAdminPasswordReset.userId}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (submitButton) {
    setTimeout(() => {
      submitButton.disabled = false;
    }, 600);
  }

  if (!response.ok) {
    adminPasswordError.textContent = 'לא ניתן לאפס סיסמה כרגע.';
    return;
  }

  adminRestoreMessage.textContent = 'הסיסמה אופסה בהצלחה.';
  closeAdminPasswordModal();
  await loadAdminOverview();
}

function fillGeneratedTemporaryPassword() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const specials = '!@#$%*?';
  const all = `${letters}${numbers}${specials}`;
  const randomFrom = (chars) => chars[crypto.getRandomValues(new Uint8Array(1))[0] % chars.length];
  const required = [randomFrom(letters), randomFrom(numbers), randomFrom(specials)];
  const rest = Array.from(crypto.getRandomValues(new Uint8Array(9))).map((value) => all[value % all.length]);
  const password = [...required, ...rest].sort(() => crypto.getRandomValues(new Uint8Array(1))[0] - 128).join('');
  adminPasswordForm.newPassword.value = password;
  adminPasswordForm.newPasswordRepeat.value = password;
  adminTemporaryPassword.textContent = `סיסמה זמנית: ${password}`;
}

async function handleAdminRestoreUser(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(adminRestoreUserForm).entries());
  await restoreInactiveUser(payload.email);
  adminRestoreUserForm.reset();
}

async function refreshAuthUser() {
  const response = await fetch('/api/auth/me');
  const data = await response.json();
  authUser = data.user;
  syncMemberControls();
}

async function handleMemberLogin(event) {
  event.preventDefault();

  const formData = new FormData(memberLoginForm);
  const payload = Object.fromEntries(formData.entries());
  memberLoginError.textContent = '';

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    memberLoginError.textContent = 'הדוא"ל או הסיסמה שגויים.';
    return;
  }

  const data = await response.json();
  authUser = data.user;
  syncMemberControls();
  await refreshTeacherClasses();
  if (authUser.mustChangePassword) {
    applyRoute('profile');
    return;
  }
  applyRoute(authUser.role === 'admin' ? 'admin' : 'member');
}

async function handleMemberSignup(event) {
  event.preventDefault();
  memberSignupError.textContent = '';

  const formData = new FormData(memberSignupForm);
  const payload = Object.fromEntries(formData.entries());

  const validationError = validateAccountDetails(payload);
  if (validationError) {
    memberSignupError.textContent = validationError;
    return;
  }

  if (payload.password !== payload.passwordRepeat) {
    memberSignupError.textContent = 'הסיסמאות אינן זהות.';
    return;
  }

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    if (errorData.error === 'EMAIL_EXISTS') {
      memberSignupError.textContent = 'כבר קיים חשבון עם הדוא"ל הזה.';
      return;
    }

    if (errorData.error === 'ACCOUNT_INACTIVE') {
      memberSignupError.textContent = 'החשבון הזה הושבת. פנה למנהל לשחזור.';
      return;
    }

    if (errorData.error === 'PASSWORD_MISMATCH') {
      memberSignupError.textContent = 'הסיסמאות אינן זהות.';
      return;
    }

    memberSignupError.textContent = 'לא ניתן ליצור חשבון כרגע.';
    return;
  }

  const data = await response.json();
  authUser = data.user;
  memberSignupForm.reset();
  syncMemberControls();
  await refreshTeacherClasses();
  applyRoute('member');
}

async function handleForgotPassword(event) {
  event.preventDefault();
  forgotPasswordMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(forgotPasswordForm).entries());

  await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => null);

  forgotPasswordForm.reset();
  forgotPasswordMessage.textContent = 'אם קיים חשבון פעיל עם כתובת זו, נשלחו הוראות איפוס סיסמה.';
}

function currentResetPasswordToken() {
  const tokenFromQuery = new URLSearchParams(window.location.search).get('resetToken');
  if (tokenFromQuery) {
    return tokenFromQuery;
  }

  const hash = window.location.hash || '';
  const queryIndex = hash.indexOf('?');

  if (queryIndex === -1) {
    return '';
  }

  return new URLSearchParams(hash.slice(queryIndex + 1)).get('token') || '';
}

async function handleResetPassword(event) {
  event.preventDefault();
  resetPasswordMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(resetPasswordForm).entries());
  payload.token = currentResetPasswordToken();

  if (!payload.token) {
    resetPasswordMessage.textContent = 'קישור האיפוס חסר או לא תקין.';
    return;
  }

  if (payload.newPassword !== payload.newPasswordRepeat) {
    resetPasswordMessage.textContent = 'הסיסמאות אינן זהות.';
    return;
  }

  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    resetPasswordMessage.textContent = 'קישור האיפוס אינו תקין או שפג תוקפו.';
    return;
  }

  resetPasswordForm.reset();
  resetPasswordMessage.textContent = 'הסיסמה נשמרה. אפשר להתחבר עם הסיסמה החדשה.';
  const url = new URL(window.location.href);
  url.searchParams.delete('resetToken');
  window.history.replaceState({ mode: 'member' }, '', `${url.pathname}${url.search}#member`);
  applyRoute('member', true);
}

function validateAccountDetails(payload) {
  const namePattern = /^[\p{L} ]+$/u;
  const phonePattern = /^[0-9+*#]+$/;

  if (!namePattern.test(String(payload.firstName || '').trim())) {
    return 'שם פרטי יכול לכלול אותיות ורווחים בלבד.';
  }

  if (!namePattern.test(String(payload.lastName || '').trim())) {
    return 'שם משפחה יכול לכלול אותיות ורווחים בלבד.';
  }

  if (!String(payload.email || '').includes('@')) {
    return 'כתובת דוא"ל חייבת לכלול @.';
  }

  if (!phonePattern.test(String(payload.phone || '').trim())) {
    return 'טלפון יכול לכלול רק ספרות, +, * ו-#.';
  }

  return '';
}

function restrictPhoneInput(event) {
  const input = event.target;
  input.value = input.value.replace(/[^0-9+*#]/g, '');
}

function preventPasswordPaste(event) {
  event.preventDefault();
}

function preventPasswordCopy(event) {
  event.preventDefault();
}

function fillProfileForm() {
  if (!authUser || !profileDetailsForm) {
    return;
  }

  profileDetailsForm.firstName.value = authUser.firstName || '';
  profileDetailsForm.lastName.value = authUser.lastName || '';
  profileDetailsForm.email.value = authUser.email || '';
  profileDetailsForm.phone.value = authUser.phone || '';
  profileDetailsForm.city.value = authUser.city || '';
  profileDetailsForm.schoolName.value = authUser.schoolName || '';

  const isAdmin = authUser.role === 'admin';
  profileDetailsForm.querySelectorAll('.teacher-profile-only').forEach((item) => {
    item.classList.toggle('is-hidden', isAdmin);
    item.querySelectorAll('input, select, textarea').forEach((input) => {
      input.required = !isAdmin;
    });
  });
  profileDeactivateForm.classList.toggle('is-hidden', isAdmin);
  if (authUser.mustChangePassword) {
    profilePasswordMessage.textContent = 'יש להחליף סיסמה לפני המשך שימוש במערכת.';
  }
}

async function saveProfileDetails(event) {
  event.preventDefault();
  profileDetailsMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(profileDetailsForm).entries());
  const validationError = validateAccountDetails(payload);
  if (validationError) {
    profileDetailsMessage.textContent = validationError;
    return;
  }
  const response = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    profileDetailsMessage.textContent = errorData.error === 'EMAIL_EXISTS'
      ? 'כבר קיים חשבון עם הדוא"ל הזה.'
      : 'לא ניתן לשמור פרטים כרגע.';
    return;
  }

  const data = await response.json();
  authUser = data.user;
  profileDetailsMessage.textContent = 'הפרטים נשמרו.';
  syncMemberControls();
}

async function changeProfilePassword(event) {
  event.preventDefault();
  profilePasswordMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(profilePasswordForm).entries());

  if (payload.newPassword !== payload.newPasswordRepeat) {
    profilePasswordMessage.textContent = 'הסיסמאות החדשות אינן זהות.';
    return;
  }

  const response = await fetch('/api/auth/password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    profilePasswordMessage.textContent = errorData.error === 'INVALID_PASSWORD'
      ? 'הסיסמה הנוכחית שגויה.'
      : 'לא ניתן לשנות סיסמה כרגע.';
    return;
  }

  profilePasswordForm.reset();
  authUser = { ...authUser, mustChangePassword: false };
  profilePasswordMessage.textContent = 'הסיסמה שונתה.';
}

function openDeactivateProfileModal(event) {
  if (event) {
    event.preventDefault();
  }

  profileDeactivateMessage.textContent = '';
  profileDeactivateModalMessage.textContent = '';
  if (!profileDeactivatePasswordInput.value) {
    profileDeactivateMessage.textContent = 'יש להקליד סיסמה לפני המשך.';
    return;
  }

  profileDeactivateConfirmCheckbox.checked = false;
  profileDeactivateConfirmButton.disabled = true;
  profileDeactivateModal.classList.remove('is-hidden');
  profileDeactivateModal.setAttribute('aria-hidden', 'false');
}

function closeDeactivateProfileModal() {
  profileDeactivateModal.classList.add('is-hidden');
  profileDeactivateModal.setAttribute('aria-hidden', 'true');
  profileDeactivateModalMessage.textContent = '';
}

async function deactivateProfileAccount() {
  if (!profileDeactivateConfirmCheckbox.checked) {
    return;
  }

  profileDeactivateMessage.textContent = '';
  profileDeactivateModalMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(profileDeactivateForm).entries());

  if (!payload.password) {
    profileDeactivateModalMessage.textContent = 'יש להקליד סיסמה בפרופיל לפני האישור.';
    return;
  }
  const response = await fetch('/api/auth/deactivate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    profileDeactivateModalMessage.textContent = errorData.error === 'INVALID_PASSWORD'
      ? 'הסיסמה שגויה.'
      : 'לא ניתן להשבית חשבון כרגע.';
    return;
  }

  closeDeactivateProfileModal();
  profileDeactivateForm.reset();
  authUser = null;
  teacherClasses = [];
  activeTeacherClassId = null;
  syncMemberControls();
  applyRoute('home');
}

async function logoutMember() {
  await fetch('/api/auth/logout', { method: 'POST' });
  authUser = null;
  teacherClasses = [];
  activeTeacherClassId = null;
  teacherRoster = [];
  teacherClassValues = {};
  teacherEditMode = false;
  syncMemberControls();
  memberLoginForm.reset();
  memberLoginError.textContent = '';
  applyRoute('home');
}

function renderTeacherEntryTable() {
  const sheet = selectedSheet();
  syncTeacherRoster();

  teacherEntryTable.innerHTML = `
    <table class="teacher-entry-table">
      <caption class="visually-hidden">טבלת הזנת תוצאות למורים</caption>
      <thead>
        <tr>
          <th>${activeTeacherStudentLabel()}</th>
          ${sheet.metrics.map((metric) => `<th>${metric.label}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${teacherRoster.map((student, index) => `
          <tr data-student-row-index="${index}" ${teacherEditMode ? 'draggable="true"' : ''}>
            <td class="student-name-cell teacher-student-cell">
              ${teacherEditMode ? `
                <input
                  class="teacher-student-name-input"
                  data-student-name-index="${index}"
                  value="${student.name}"
                  aria-label="שם ${activeTeacherStudentLabel()} ${index + 1}"
                />
              ` : `<div class="teacher-student-name-text">${student.name}</div>`}
              <div class="teacher-student-order-actions${teacherEditMode ? '' : ' is-hidden'}">
                <button type="button" class="teacher-order-button teacher-drag-handle" data-student-index="${index}" aria-label="גרירת תלמיד לשינוי מיקום">גרירה</button>
              </div>
            </td>
            ${sheet.metrics.map((metric) => `
              <td>
                <input
                  data-student-index="${index}"
                  data-metric-key="${metric.key}"
                  aria-label="${student.name} ${metric.label}"
                  value="${teacherClassValues[student.id]?.[metric.key] || ''}"
                />
              </td>
            `).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderTeacherResultsTable(students = []) {
  const sheet = selectedSheet();
  syncTeacherRoster();

  teacherResultsTable.innerHTML = `
    <table>
      <caption class="visually-hidden">טבלת תוצאות מומרות למורים</caption>
      <thead>
        <tr>
          <th>${activeTeacherStudentLabel()}</th>
          ${sheet.metrics.map((metric) => `<th>${metric.label}</th>`).join('')}
          <th>ממוצע</th>
        </tr>
      </thead>
      <tbody>
        ${students.length ? students.map((student) => `
          <tr>
            <td class="student-name-cell">${student.studentName}</td>
            ${sheet.metrics.map((metric) => {
              const metricResult = student.results.find((item) => item.key === metric.key);
              return `<td>${metricResult?.result?.score ?? ''}</td>`;
            }).join('')}
            <td class="average-cell">${student.averageScore ?? ''}</td>
          </tr>
        `).join('') : `
          ${teacherRoster.map((student) => `
            <tr>
              <td class="student-name-cell">${student.name}</td>
              ${sheet.metrics.map(() => '<td></td>').join('')}
              <td class="average-cell"></td>
            </tr>
          `).join('')}
        `}
      </tbody>
    </table>
  `;
}

function resetTeacherResults() {
  latestTeacherResults = [];
  renderTeacherResultsTable([]);
}

function collectTeacherStudents() {
  const sheet = selectedSheet();
  syncTeacherRoster();

  const rawStudents = teacherRoster.map((student, studentIndex) => ({
    studentName: student.name,
    values: Object.fromEntries(sheet.metrics.map((metric) => {
      const input = teacherEntryTable.querySelector(`[data-student-index="${studentIndex}"][data-metric-key="${metric.key}"]`);
      return [metric.key, input?.value || ''];
    })),
  }));

  return normalizeTeacherTimeInputs(rawStudents);
}

function syncTeacherClassValuesFromInputs() {
  teacherRoster.forEach((student, studentIndex) => {
    const values = {};
    selectedSheet().metrics.forEach((metric) => {
      const input = teacherEntryTable.querySelector(`[data-student-index="${studentIndex}"][data-metric-key="${metric.key}"]`);
      values[metric.key] = input?.value || '';
    });
    teacherClassValues[student.id] = values;
  });
}

function moveTeacherFocus(currentInput) {
  const sheet = selectedSheet();

  if (!sheet || !currentInput) {
    return;
  }

  const studentIndex = Number(currentInput.dataset.studentIndex);
  const metricIndex = sheet.metrics.findIndex((metric) => metric.key === currentInput.dataset.metricKey);
  const studentCount = Number(studentCountSelect.value);

  if (metricIndex === -1) {
    return;
  }

  const nextStudentIndex = studentIndex + 1;
  const nextMetricIndex = nextStudentIndex >= studentCount ? metricIndex + 1 : metricIndex;
  const wrappedStudentIndex = nextStudentIndex >= studentCount ? 0 : nextStudentIndex;

  if (nextMetricIndex >= sheet.metrics.length) {
    return;
  }

  const nextMetricKey = sheet.metrics[nextMetricIndex].key;
  const nextInput = teacherEntryTable.querySelector(
    `[data-student-index="${wrappedStudentIndex}"][data-metric-key="${nextMetricKey}"]`
  );

  if (nextInput) {
    nextInput.focus();
    nextInput.select();
  }
}

function escapeCsvCell(value) {
  const stringValue = value === null || value === undefined ? '' : String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
}

function downloadCsv() {
  const sheet = selectedSheet();

  if (!latestTeacherResults.length) {
    return;
  }

  const rows = [
    ['תלמיד', ...sheet.metrics.map((metric) => metric.label), 'ממוצע'],
    ...latestTeacherResults.map((student) => [
      student.studentName,
      ...sheet.metrics.map((metric) => {
        const metricResult = student.results.find((item) => item.key === metric.key);
        return metricResult?.result?.score ?? '';
      }),
      student.averageScore ?? '',
    ]),
  ];

  const csvContent = rows
    .map((row) => row.map(escapeCsvCell).join(','))
    .join('\r\n');

  const blob = new Blob(['\ufeff', csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `results-${formatClassName(sheet.name)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function shareWhatsapp() {
  const sheet = selectedSheet();

  if (!latestTeacherResults.length) {
    return;
  }

  const studentLines = latestTeacherResults
    .map((student) => {
      const visibleScores = sheet.metrics
        .map((metric) => {
          const metricResult = student.results.find((item) => item.key === metric.key);

          if (!metricResult?.result) {
            return null;
          }

          return `${metric.label} - ${metricResult.result.score}`;
        })
        .filter(Boolean);

      if (!visibleScores.length) {
        return null;
      }

      const parts = [`${student.studentName}: ${visibleScores.join(', ')}`];

      if (visibleScores.length > 1 && student.averageScore !== null) {
        parts.push(`ממוצע - ${student.averageScore}`);
      }

      return parts.join(', ');
    })
    .filter(Boolean);

  if (!studentLines.length) {
    return;
  }

  const lines = [
    `EduFitScore - כיתה ${formatClassName(sheet.name)}`,
    '',
    ...studentLines,
    '',
    window.location.href,
  ];

  const url = `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function downloadHistoryRecordsCsv() {
  const { subjectLabels, studentNames, studentRecords } = getTeacherHistoryRecordsData();

  if (!subjectLabels.length) {
    return;
  }

  const rows = [
    ['תלמיד', ...subjectLabels.flatMap((label) => [`${label} תוצאה`, `${label} ציון`])],
    ...studentNames.map((studentName) => {
      const records = studentRecords.get(studentName) || new Map();
      return [
        studentName,
        ...subjectLabels.flatMap((label) => {
          const record = records.get(label);
          return [record?.enteredValue ?? '', record?.result?.score ?? ''];
        }),
      ];
    }),
  ];
  const csvContent = rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n');
  const blob = new Blob(['\ufeff', csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `history-records-${currentTeacherClass()?.name || 'class'}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function shareHistoryRecordsWhatsapp() {
  const { subjectLabels, studentNames, studentRecords } = getTeacherHistoryRecordsData();

  if (!subjectLabels.length) {
    return;
  }

  const studentLines = studentNames.map((studentName) => {
    const records = studentRecords.get(studentName) || new Map();
    const parts = subjectLabels.map((label) => {
      const record = records.get(label);
      return record ? `${label}: ${record.enteredValue} (${record.result.score})` : null;
    }).filter(Boolean);
    return parts.length ? `${studentName}: ${parts.join(', ')}` : null;
  }).filter(Boolean);

  if (!studentLines.length) {
    return;
  }

  const lines = [
    `EduFitScore - שיאים אישיים ${currentTeacherClass()?.name || ''}`,
    '',
    ...studentLines,
    '',
    window.location.href,
  ];
  const url = `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function buildGraphShareSnapshot() {
  const graphData = getHistoryGraphData();
  return {
    subject: graphData.selectedSubject,
    entries: graphData.entries.map((entry) => ({ date: entry.date })),
    series: graphData.series.filter((item) => visibleHistoryGraphStudents.has(item.name)),
  };
}

async function graphShareUrl() {
  const response = await fetch('/api/graph-snapshots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ snapshot: buildGraphShareSnapshot() }),
  });

  if (!response.ok) {
    throw new Error('GRAPH_SNAPSHOT_FAILED');
  }

  const data = await response.json();
  return `${window.location.origin}${window.location.pathname}?graphId=${data.id}#graph`;
}

function setHistoryGraphMessage(message, isError = false) {
  const messageEl = document.querySelector('#history-graph-message');
  if (!messageEl) {
    return;
  }

  messageEl.textContent = message;
  messageEl.classList.toggle('is-error', isError);
}

async function withBrieflyDisabled(button, action) {
  if (!button) {
    await action();
    return;
  }

  button.disabled = true;
  try {
    await action();
  } finally {
    setTimeout(() => {
      button.disabled = false;
    }, 600);
  }
}

async function shareHistoryGraphWhatsapp() {
  try {
    const url = `https://wa.me/?text=${encodeURIComponent(await graphShareUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setHistoryGraphMessage('קישור שיתוף נוצר ונפתח ב-WhatsApp.');
  } catch (error) {
    setHistoryGraphMessage('לא ניתן ליצור קישור שיתוף כרגע.', true);
  }
}

async function copyHistoryGraphLink() {
  try {
    const url = await graphShareUrl();
    if (!navigator.clipboard) {
      throw new Error('CLIPBOARD_UNAVAILABLE');
    }
    await navigator.clipboard.writeText(url);
    setHistoryGraphMessage('הקישור הועתק.');
  } catch (error) {
    setHistoryGraphMessage('לא ניתן להעתיק קישור כרגע.', true);
  }
}

function downloadHistoryGraphImage() {
  const svg = teacherHistoryGraph.querySelector('.history-graph-svg');
  if (!svg) {
    setHistoryGraphMessage('אין גרף להורדה.', true);
    return;
  }

  const svgClone = svg.cloneNode(true);
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `
    .history-graph-grid { stroke: #c99c78; stroke-width: 1.4; }
    .history-graph-grid-minor { stroke: #f4e8dd; stroke-width: 0.55; }
    .history-graph-axis { stroke: #5e4335; stroke-width: 2; }
    text { fill: #3a2417; font: bold 13px Segoe UI, Arial, sans-serif; }
  `;
  svgClone.insertBefore(style, svgClone.firstChild);
  const serializer = new XMLSerializer();
  const svgText = serializer.serializeToString(svgClone);
  const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const image = new Image();

  image.onload = () => {
    const graphData = getHistoryGraphData();
    const visibleStudents = graphData.series
      .map((student, originalIndex) => ({ ...student, originalIndex }))
      .filter((student) => visibleHistoryGraphStudents.has(student.name));
    const colors = ['#1f77b4', '#d62728', '#2ca02c', '#9467bd', '#ff7f0e', '#17becf', '#8c564b', '#e377c2', '#bcbd22', '#4b5563'];
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 590 + (Math.ceil(visibleStudents.length / 4) * 28);
    const context = canvas.getContext('2d');
    context.fillStyle = '#fffaf5';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, 520);
    context.fillStyle = '#3a2417';
    context.font = 'bold 22px "Segoe UI", Arial, sans-serif';
    context.textAlign = 'right';
    context.fillText('תלמידים', canvas.width - 28, 552);
    context.font = 'bold 18px "Segoe UI", Arial, sans-serif';
    visibleStudents.forEach((student, index) => {
      const x = canvas.width - 28 - ((index % 4) * 260);
      const y = 586 + (Math.floor(index / 4) * 26);
      context.fillStyle = colors[student.originalIndex % colors.length];
      context.beginPath();
      context.arc(x, y - 6, 7, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#3a2417';
      context.fillText(student.name, x - 18, y);
    });
    URL.revokeObjectURL(url);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `history-graph-${currentTeacherClass()?.name || 'class'}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setHistoryGraphMessage('התמונה הורדה.');
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    setHistoryGraphMessage('לא ניתן להוריד תמונה כרגע.', true);
  };

  image.src = url;
}

async function renderSharedHistoryGraph() {
  const params = new URLSearchParams(window.location.search);
  const graphId = params.get('graphId');

  if (window.location.hash !== '#graph' || !graphId) {
    return false;
  }

  try {
    const response = await fetch(`/api/graph-snapshots/${encodeURIComponent(graphId)}`);
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    const payload = data.snapshot;
    visibleHistoryGraphStudents = new Set((payload.series || []).map((item) => item.name));
    document.body.innerHTML = `
      <main class="page shared-graph-page" dir="rtl">
        <section class="panel shared-graph-card">
          <h1>EduFitScore - גרף היסטוריית ציונים</h1>
          ${renderHistoryGraphMarkup({
            subjects: [payload.subject],
            selectedSubject: payload.subject,
            entries: payload.entries || [],
            series: payload.series || [],
          }, true)}
        </section>
      </main>
    `;
    return true;
  } catch (error) {
    return false;
  }
}

async function saveTeacherHistorySnapshot() {
  if (!activeTeacherClassId) {
    teacherClassFormError.textContent = 'יש לבחור או ליצור כיתה לפני שמירה להיסטוריה.';
    return;
  }

  syncTeacherClassValuesFromInputs();
  const rawStudents = collectTeacherStudents();
  const hasAnyValues = rawStudents.some((student) => Object.values(student.values || {}).some(Boolean));

  if (!hasAnyValues) {
    teacherClassFormError.textContent = 'אין ציונים לשמירה בהיסטוריה.';
    return;
  }

  const latestEntry = teacherHistoryEntries[teacherHistoryEntries.length - 1];
  if (latestEntry && JSON.stringify(latestEntry.payload?.rawStudents || []) === JSON.stringify(rawStudents)) {
    teacherClassFormError.textContent = 'הרשומה זהה לרשומה האחרונה ולא נשמרה שוב.';
    return;
  }

  const response = await fetch('/api/bulk-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sheetId: selectedSheet().id,
      gender: activeTeacherGender(),
      classId: activeTeacherClassId,
      students: rawStudents,
    }),
  });

  if (!response.ok) {
    teacherClassFormError.textContent = 'לא ניתן לשמור היסטוריה כרגע.';
    return;
  }

  const data = await response.json();
  latestTeacherResults = data.students;
  renderTeacherResultsTable(data.students);
  await loadTeacherClassHistory(activeTeacherClassId);
  setTeacherSubview('detail', false);
  teacherClassFormError.textContent = 'הרשומה נשמרה בהיסטוריה. ניתן ללחוץ על היסטוריה לצפייה ברשומה האחרונה.';
  openInvalidScoreModal();
}

function renderTeacherView() {
  syncTeacherRoster();
  renderTeacherEntryTable();
  resetTeacherResults();
  renderTeacherClassList();
}

function applyPastedTeacherData() {
  const sheet = selectedSheet();
  const raw = teacherPasteBox.value.replace(/\r/g, '').trim();

  if (!raw || !sheet) {
    return;
  }

  const rows = raw.split('\n').map((line) => line.split('\t'));
  syncTeacherRoster();

  rows.slice(0, teacherRoster.length).forEach((row, rowIndex) => {
    row.slice(0, sheet.metrics.length).forEach((value, columnIndex) => {
      const metric = sheet.metrics[columnIndex];
      const input = teacherEntryTable.querySelector(`[data-student-index="${rowIndex}"][data-metric-key="${metric.key}"]`);

      if (input) {
        const trimmedValue = value.trim();
        input.value = trimmedValue;
        teacherClassValues[teacherRoster[rowIndex].id] = {
          ...(teacherClassValues[teacherRoster[rowIndex].id] || {}),
          [metric.key]: trimmedValue,
        };
      }
    });
  });
}

function clearTeacherValues() {
  teacherEntryTable.querySelectorAll('input[data-student-index][data-metric-key]').forEach((input) => {
    input.value = '';
  });
  teacherPasteBox.value = '';
  teacherClassValues = {};
  resetTeacherResults();
}

function handleTeacherEntryClick(event) {
}

function handleTeacherClassListClick(event) {
  const deleteButton = event.target.closest('[data-delete-class-id]');

  if (deleteButton) {
    openDeleteModal(Number(deleteButton.dataset.deleteClassId));
    return;
  }

  if (teacherClassesEditMode) {
    return;
  }

  const classButton = event.target.closest('[data-open-class-id]');

  if (!classButton) {
    return;
  }

  const teacherClass = teacherClasses.find((item) => item.id === Number(classButton.dataset.openClassId));

  if (teacherClass) {
    loadTeacherClassIntoWorkspace(teacherClass);
  }

}

function handleTeacherClassDragStart(event) {
  const card = event.target.closest('[data-open-class-id]');

  if (!teacherClassesEditMode || !card) {
    event.preventDefault();
    return;
  }

  dragClassSourceId = Number(card.dataset.openClassId);
  card.classList.add('is-dragging');
  event.dataTransfer.effectAllowed = 'move';
}

function handleTeacherClassDragOver(event) {
  const card = event.target.closest('[data-open-class-id]');

  if (!teacherClassesEditMode || !card) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const draggingCard = teacherClassList.querySelector('.teacher-class-card.is-dragging');

  if (draggingCard && draggingCard !== card) {
    const cards = Array.from(teacherClassList.querySelectorAll('.teacher-class-card'));
    const draggingIndex = cards.indexOf(draggingCard);
    const targetIndex = cards.indexOf(card);

    if (draggingIndex < targetIndex) {
      card.after(draggingCard);
    } else {
      card.before(draggingCard);
    }
  }
}

function handleTeacherClassDrop(event) {
  const card = event.target.closest('[data-open-class-id]');

  if (!teacherClassesEditMode || !card || dragClassSourceId === null) {
    return;
  }

  event.preventDefault();
  if (!teacherClassList.querySelector(`.teacher-class-card[data-open-class-id="${dragClassSourceId}"]`)) {
    dragClassSourceId = null;
    return;
  }

  const orderedIds = Array.from(teacherClassList.querySelectorAll('[data-open-class-id]')).map((item) => Number(item.dataset.openClassId));
  const fromIndex = teacherClasses.findIndex((item) => item.id === dragClassSourceId);
  const toIndex = orderedIds.indexOf(dragClassSourceId);

  if (fromIndex < 0 || toIndex < 0) {
    dragClassSourceId = null;
    return;
  }

  const orderedClasses = orderedIds.map((id) => teacherClasses.find((item) => item.id === id)).filter(Boolean);
  teacherClasses = orderedClasses.length === teacherClasses.length ? orderedClasses : teacherClasses;
  teacherClassSortField.value = 'manual';
  writeUiPreference(uiPreferenceKeys.classSortField, teacherClassSortField.value);
  isSavingClassOrder = true;
  dragClassSourceId = null;
  fetch('/api/teacher/classes/reorder', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderedIds: teacherClasses.map((item) => item.id) }),
  }).finally(() => {
    isSavingClassOrder = false;
    renderTeacherClassList();
  });
}

function handleTeacherClassDragEnd() {
  if (dragClassSourceId !== null && !isSavingClassOrder) {
    const orderedIds = Array.from(teacherClassList.querySelectorAll('[data-open-class-id]')).map((item) => Number(item.dataset.openClassId));
    const orderedClasses = orderedIds.map((id) => teacherClasses.find((item) => item.id === id)).filter(Boolean);

    if (orderedClasses.length === teacherClasses.length) {
      teacherClasses = orderedClasses;
      isSavingClassOrder = true;
      fetch('/api/teacher/classes/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds }),
      }).finally(() => {
        isSavingClassOrder = false;
        renderTeacherClassList();
      });
    }
  }

  dragClassSourceId = null;
  teacherClassList.querySelectorAll('.is-dragging').forEach((item) => item.classList.remove('is-dragging'));
}

function commitVisibleTeacherClassOrder() {
  const orderedIds = Array.from(teacherClassList.querySelectorAll('[data-open-class-id]')).map((item) => Number(item.dataset.openClassId));
  const orderedClasses = orderedIds.map((id) => teacherClasses.find((item) => item.id === id)).filter(Boolean);

  if (orderedClasses.length !== teacherClasses.length) {
    return;
  }

  teacherClasses = orderedClasses;
  teacherClassSortField.value = 'manual';
  fetch('/api/teacher/classes/reorder', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderedIds }),
  });
}

function handleTeacherNameKeydown(event) {
  const input = event.target.closest('[data-student-name-index], [data-new-student-index]');

  if (!input || event.key !== 'Enter') {
    return;
  }

  event.preventDefault();
  const container = input.closest('form, .teacher-entry-table, .teacher-class-student-names');
  const allInputs = Array.from(container.querySelectorAll('[data-student-name-index], [data-new-student-index]'));
  const currentIndex = allInputs.indexOf(input);
  const nextInput = allInputs[currentIndex + 1];

  if (nextInput) {
    nextInput.focus();
    nextInput.select();
  }
}

function handleTeacherNameKeydown(event) {
  const input = event.target.closest('[data-student-name-index], [data-new-student-index]');

  if (!input || event.key !== 'Enter') {
    return;
  }

  event.preventDefault();
  const container = input.closest('form, .teacher-entry-table, .teacher-class-student-names');
  const allInputs = Array.from(container.querySelectorAll('[data-student-name-index], [data-new-student-index]'));
  const currentIndex = allInputs.indexOf(input);
  const nextInput = allInputs[currentIndex + 1];

  if (nextInput) {
    nextInput.focus();
    nextInput.select();
  }
}

function handleTeacherNameInput(event) {
  const input = event.target.closest('[data-student-name-index]');

  if (!input) {
    return;
  }

  const index = Number(input.dataset.studentNameIndex);

  if (!teacherRoster[index]) {
    return;
  }

  teacherRoster[index].name = input.value.trim() || `${activeTeacherStudentLabel()} ${index + 1}`;
}

function handleTeacherEntryInput(event) {
  const input = event.target.closest('input[data-student-index][data-metric-key]');

  if (!input) {
    return;
  }

  const studentIndex = Number(input.dataset.studentIndex);
  const student = teacherRoster[studentIndex];

  if (!student) {
    return;
  }

  teacherClassValues[student.id] = {
    ...(teacherClassValues[student.id] || {}),
    [input.dataset.metricKey]: input.value,
  };
}

function handleTeacherDragStart(event) {
  const row = event.target.closest('[data-student-row-index]');

  if (!teacherEditMode || !row) {
    event.preventDefault();
    return;
  }

  dragSourceIndex = Number(row.dataset.studentRowIndex);
  row.classList.add('is-dragging');
  event.dataTransfer.effectAllowed = 'move';
}

function handleTeacherDragOver(event) {
  const row = event.target.closest('[data-student-row-index]');

  if (!teacherEditMode || !row) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const draggingRow = teacherEntryTable.querySelector('tr.is-dragging');

  if (draggingRow && draggingRow !== row) {
    const rows = Array.from(teacherEntryTable.querySelectorAll('[data-student-row-index]'));
    const draggingIndex = rows.indexOf(draggingRow);
    const targetIndex = rows.indexOf(row);

    if (draggingIndex < targetIndex) {
      row.after(draggingRow);
    } else {
      row.before(draggingRow);
    }
  }
}

function handleTeacherDrop(event) {
  const row = event.target.closest('[data-student-row-index]');

  if (!teacherEditMode || !row || dragSourceIndex === null) {
    return;
  }

  event.preventDefault();
  const orderedIndexes = Array.from(teacherEntryTable.querySelectorAll('[data-student-row-index]')).map((item) => Number(item.dataset.studentRowIndex));
  const targetIndex = orderedIndexes.indexOf(dragSourceIndex);

  if (targetIndex === dragSourceIndex) {
    dragSourceIndex = null;
    return;
  }

  const orderedRoster = orderedIndexes.map((index) => teacherRoster[index]).filter(Boolean);
  teacherRoster = orderedRoster.length === teacherRoster.length ? orderedRoster : teacherRoster;
  dragSourceIndex = null;
  renderTeacherView();
}

function handleTeacherDragEnd() {
  dragSourceIndex = null;
  teacherEntryTable.querySelectorAll('.is-dragging').forEach((item) => item.classList.remove('is-dragging'));
}

function setActiveView(viewName) {
  activeView = viewName;
  writeUiPreference(uiPreferenceKeys.activeView, viewName);
  const isStudentView = viewName.startsWith('student');
  const isTeacherMemberMode = currentEntryMode === 'member' || currentEntryMode.startsWith('member-');

  maleStudentTabButton.classList.toggle('is-active', viewName === 'student_male');
  femaleStudentTabButton.classList.toggle('is-active', viewName === 'student_female');
  teacherTabButton.classList.toggle('is-active', viewName === 'teacher');
  studentView.classList.toggle('is-hidden', !isStudentView);
  teacherView.classList.toggle('is-hidden', isStudentView);
  teacherTopControls.classList.toggle('is-hidden', isStudentView || isTeacherMemberMode);
}

async function calculateScore(event) {
  event.preventDefault();

  const formData = new FormData(scoreForm);
  const values = Object.fromEntries(formData.entries());
  const response = await fetch('/api/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sheetId: selectedSheet().id,
      gender: activeStudentGender(),
      values,
    }),
  });

  const data = await response.json();
  renderStudentResults(data);
}

async function calculateTeacherScores() {
  if (!activeTeacherClassId) {
    teacherClassFormError.textContent = 'יש לבחור או ליצור כיתה לפני חישוב.';
    return;
  }

  syncTeacherClassValuesFromInputs();

  const response = await fetch('/api/bulk-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sheetId: selectedSheet().id,
      gender: activeTeacherGender(),
      students: collectTeacherStudents(),
    }),
  });

  const data = await response.json();
  latestTeacherResults = data.students;
  renderTeacherResultsTable(data.students);
  openInvalidScoreModal();
}

async function deleteCurrentTeacherClass() {
  if (!pendingDeleteClassId) {
    return;
  }

  const response = await fetch(`/api/teacher/classes/${pendingDeleteClassId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    teacherClasses = teacherClasses.filter((item) => item.id !== pendingDeleteClassId);

    if (activeTeacherClassId === pendingDeleteClassId) {
      activeTeacherClassId = null;
      setTeacherSubview('home');
      renderTeacherClassList();
    } else {
      renderTeacherClassList();
    }
  }

  closeDeleteModal();
}

function handleTeacherEntryKeydown(event) {
  if (event.key !== 'Enter') {
    return;
  }

  const input = event.target.closest('input[data-student-index][data-metric-key]');

  if (!input) {
    return;
  }

  event.preventDefault();
  moveTeacherFocus(input);
}

function renderCurrentView() {
  renderClassTabs();
  renderStudentForm();
  latestStudentResult = null;
  renderStudentResults({ results: [], averageScore: null });
  if ((teacherSubview === 'detail' || teacherSubview === 'history') && currentTeacherClass()) {
    renderTeacherView();
  }
  renderTeacherClassList();
}

async function init() {
  if (await renderSharedHistoryGraph()) {
    return;
  }

  const response = await fetch('/api/sheets');
  const data = await response.json();
  sheetSets = {
    male: data.maleSheets,
    female: data.femaleSheets,
  };

  sheetSelect.innerHTML = sheetSets.male
    .map((sheet) => `<option value="${sheet.id}">${formatClassName(sheet.name)}</option>`)
    .join('');

  createStudentOptions();
  teacherClassStudentCountSelect.innerHTML = studentCountSelect.innerHTML;
  createTeacherNameInputs();
  applyStoredUiPreferences();
  await refreshAuthUser();
  if (authUser) {
    await refreshTeacherClasses();
  }
  renderCurrentView();
  setActiveView(activeView);
  applyRoute(parseRouteHash(), true);
  syncTeacherGenderTabs();

  sheetSelect.addEventListener('change', renderCurrentView);
  classTabsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sheet-id]');

    if (!button) {
      return;
    }

    sheetSelect.value = button.dataset.sheetId;
    renderCurrentView();
  });
  if (studentCountSelect) { studentCountSelect.addEventListener('change', renderTeacherView); }
  if (scoreForm) { scoreForm.addEventListener('submit', calculateScore); }
  if (studentShareWhatsappButton) { studentShareWhatsappButton.addEventListener('click', shareStudentWhatsapp); }
  if (shareSiteWhatsappButton) { shareSiteWhatsappButton.addEventListener('click', shareSiteWhatsapp); }
  if (teacherCalculateButton) { teacherCalculateButton.addEventListener('click', calculateTeacherScores); }
  if (downloadCsvButton) { downloadCsvButton.addEventListener('click', downloadCsv); }
  if (shareWhatsappButton) { shareWhatsappButton.addEventListener('click', shareWhatsapp); }
  if (teacherEntryTable) {
    teacherEntryTable.addEventListener('keydown', handleTeacherEntryKeydown);
    teacherEntryTable.addEventListener('keydown', handleTeacherNameKeydown);
    teacherEntryTable.addEventListener('input', handleTeacherEntryInput);
    teacherEntryTable.addEventListener('click', handleTeacherEntryClick);
    teacherEntryTable.addEventListener('input', handleTeacherNameInput);
    teacherEntryTable.addEventListener('dragstart', handleTeacherDragStart);
    teacherEntryTable.addEventListener('dragover', handleTeacherDragOver);
    teacherEntryTable.addEventListener('drop', handleTeacherDrop);
    teacherEntryTable.addEventListener('dragend', handleTeacherDragEnd);
  }
  if (teacherClassList) {
    teacherClassList.addEventListener('click', handleTeacherClassListClick);
    teacherClassList.addEventListener('dragstart', handleTeacherClassDragStart);
    teacherClassList.addEventListener('dragover', handleTeacherClassDragOver);
    teacherClassList.addEventListener('drop', handleTeacherClassDrop);
    teacherClassList.addEventListener('dragend', handleTeacherClassDragEnd);
  }
  if (teacherPasteApplyButton) { teacherPasteApplyButton.addEventListener('click', applyPastedTeacherData); }
  if (teacherClearValuesButton) { teacherClearValuesButton.addEventListener('click', clearTeacherValues); }
  if (teacherResetStudentsButton) {
    teacherResetStudentsButton.addEventListener('click', () => {
      resetTeacherRoster();
      renderTeacherView();
    });
  }
  if (teacherEditStudentsButton) {
    teacherEditStudentsButton.addEventListener('click', async () => {
      const wasEditing = teacherEditMode;
      teacherEditMode = !teacherEditMode;
      teacherEditStudentsButton.textContent = teacherEditMode ? 'סיום עריכה' : 'עריכת תלמידים';
      teacherEditStudentsButton.classList.toggle('is-editing-button', teacherEditMode);
      if (wasEditing && !teacherEditMode) {
        teacherEditSaveMessage.textContent = 'שומר...';
        syncTeacherRoster();
        await saveCurrentTeacherClass();
        teacherEditSaveMessage.textContent = 'עריכה נשמרה.';
      }
      renderTeacherView();
    });
  }
  if (teacherSaveClassButton) { teacherSaveClassButton.addEventListener('click', saveCurrentTeacherClass); }
  if (teacherSaveHistoryButton) { teacherSaveHistoryButton.addEventListener('click', saveTeacherHistorySnapshot); }
  if (teacherClassForm) {
    teacherClassForm.addEventListener('submit', createTeacherClassFromForm);
    teacherClassForm.addEventListener('keydown', handleTeacherNameKeydown);
  }
  if (teacherRefreshClassesButton) { teacherRefreshClassesButton.addEventListener('click', refreshTeacherClasses); }
  if (teacherHistoryRefreshButton) { teacherHistoryRefreshButton.addEventListener('click', refreshCurrentTeacherHistory); }
  if (teacherClassViewToggleButton) {
    teacherClassViewToggleButton.addEventListener('click', () => {
      teacherClassListView = teacherClassListView === 'cards' ? 'list' : 'cards';
      writeUiPreference(uiPreferenceKeys.classListView, teacherClassListView);
      renderTeacherClassList();
    });
  }
  if (teacherClassSortField) {
    teacherClassSortField.addEventListener('change', () => {
      writeUiPreference(uiPreferenceKeys.classSortField, teacherClassSortField.value);
      renderTeacherClassList();
    });
  }
  if (teacherClassSortDirection) {
    teacherClassSortDirection.addEventListener('change', () => {
      writeUiPreference(uiPreferenceKeys.classSortDirection, teacherClassSortDirection.value);
      renderTeacherClassList();
    });
  }
  if (teacherNewClassButton) {
    teacherNewClassButton.addEventListener('click', () => {
      teacherClassForm.reset();
      teacherClassGenderSelect.value = activeTeacherGenderValue;
      teacherClassStudentCountSelect.value = studentCountSelect.value;
      createTeacherNameInputs();
      setTeacherSubview('new');
    });
  }
  if (teacherEditClassesButton) {
    teacherEditClassesButton.addEventListener('click', () => {
      teacherClassesEditMode = !teacherClassesEditMode;
      if (!teacherClassesEditMode) {
        commitVisibleTeacherClassOrder();
      }
      teacherEditClassesButton.textContent = teacherClassesEditMode ? 'סיום עריכה' : 'עריכה';
      teacherEditClassesButton.classList.toggle('is-editing-button', teacherClassesEditMode);
      renderTeacherClassList();
    });
  }
  if (teacherBackToClassesButton) {
    teacherBackToClassesButton.addEventListener('click', () => {
      setTeacherSubview('home');
      renderTeacherClassList();
    });
  }
  if (teacherOpenHistoryViewButton) {
    teacherOpenHistoryViewButton.addEventListener('click', () => {
      setTeacherSubview('history');
      renderTeacherHistoryEntry();
    });
  }
  if (teacherBackToClassDetailButton) {
    teacherBackToClassDetailButton.addEventListener('click', () => {
      setTeacherSubview('detail');
    });
  }
  if (teacherHistoryBackToClassesButton) {
    teacherHistoryBackToClassesButton.addEventListener('click', () => {
      setTeacherSubview('home');
      renderTeacherClassList();
    });
  }
  if (teacherHistoryRange) {
    teacherHistoryRange.addEventListener('input', () => {
      selectedTeacherHistoryIndex = Number(teacherHistoryRange.value);
      teacherHistoryEditMode = false;
      renderTeacherHistoryEntry();
    });
  }
  if (teacherHistoryRecordsButton) {
    teacherHistoryRecordsButton.addEventListener('click', () => {
      if (teacherHistoryMode === 'records') {
        renderTeacherHistoryEntry();
        return;
      }

      renderTeacherHistoryRecords();
    });
  }
  if (teacherHistoryRecordsWhatsappButton) { teacherHistoryRecordsWhatsappButton.addEventListener('click', shareHistoryRecordsWhatsapp); }
  if (teacherHistoryRecordsCsvButton) { teacherHistoryRecordsCsvButton.addEventListener('click', downloadHistoryRecordsCsv); }
  if (teacherHistoryGraph) {
    teacherHistoryGraph.addEventListener('change', (event) => {
      if (event.target.id === 'history-graph-subject') {
        activeHistoryGraphSubject = event.target.value;
        renderHistoryGraph();
        return;
      }

      const studentCheckbox = event.target.closest('[data-history-graph-student]');
      if (studentCheckbox) {
        historyGraphSelectionTouched = true;
        if (studentCheckbox.checked) {
          visibleHistoryGraphStudents.add(studentCheckbox.dataset.historyGraphStudent);
        } else {
          visibleHistoryGraphStudents.delete(studentCheckbox.dataset.historyGraphStudent);
        }
        renderHistoryGraph();
      }
    });
    teacherHistoryGraph.addEventListener('click', (event) => {
      const point = event.target.closest('.history-graph-point');
      const shareButton = event.target.closest('[data-history-graph-share]');
      const copyButton = event.target.closest('[data-history-graph-copy]');
      const imageButton = event.target.closest('[data-history-graph-image]');
      const selectAllButton = event.target.closest('[data-history-graph-select-all]');
      const clearAllButton = event.target.closest('[data-history-graph-clear-all]');

      if (point) {
        showHistoryGraphTooltip(point, event);
        return;
      }

      if (shareButton) {
        withBrieflyDisabled(shareButton, shareHistoryGraphWhatsapp);
        return;
      }

      if (copyButton) {
        withBrieflyDisabled(copyButton, copyHistoryGraphLink);
        return;
      }

      if (imageButton) {
        withBrieflyDisabled(imageButton, async () => downloadHistoryGraphImage());
        return;
      }

      if (selectAllButton) {
        historyGraphSelectionTouched = true;
        visibleHistoryGraphStudents = new Set(getHistoryGraphData().series.map((student) => student.name));
        renderHistoryGraph();
        return;
      }

      if (clearAllButton) {
        historyGraphSelectionTouched = true;
        visibleHistoryGraphStudents = new Set();
        renderHistoryGraph();
      }
    });
    teacherHistoryGraph.addEventListener('mousemove', (event) => {
      const point = event.target.closest('.history-graph-point');

      if (point) {
        showHistoryGraphTooltip(point, event);
      }
    });
    teacherHistoryGraph.addEventListener('mouseleave', hideHistoryGraphTooltip);
  }
  if (teacherHistorySelectedDate) {
    teacherHistorySelectedDate.addEventListener('click', (event) => {
      const editButton = event.target.closest('[data-edit-history-entry]');
      const deleteButton = event.target.closest('[data-delete-history-id]');
      const recordsWhatsappButton = event.target.closest('[data-history-records-whatsapp]');
      const recordsCsvButton = event.target.closest('[data-history-records-csv]');

      if (editButton) {
        teacherHistoryEditMode = !teacherHistoryEditMode;
        renderTeacherHistoryEntry();
        return;
      }

      if (recordsWhatsappButton) {
        shareHistoryRecordsWhatsapp();
        return;
      }

      if (recordsCsvButton) {
        downloadHistoryRecordsCsv();
        return;
      }

      if (deleteButton) {
        if (!teacherHistoryEditMode) {
          return;
        }

        openHistoryDeleteModal(Number(deleteButton.dataset.deleteHistoryId));
      }
    });
  }
  if (teacherHistoryConfirmDeleteButton) {
    teacherHistoryConfirmDeleteButton.addEventListener('click', () => {
      deleteSelectedTeacherHistoryEntry(pendingDeleteHistoryId);
    });
  }
  if (teacherHistoryCancelDeleteButton) { teacherHistoryCancelDeleteButton.addEventListener('click', closeHistoryDeleteModal); }
  if (teacherHistoryDeleteCloseButton) { teacherHistoryDeleteCloseButton.addEventListener('click', closeHistoryDeleteModal); }
  if (teacherInvalidScoreOkButton) { teacherInvalidScoreOkButton.addEventListener('click', closeInvalidScoreModal); }
  if (teacherInvalidScoreCloseButton) { teacherInvalidScoreCloseButton.addEventListener('click', closeInvalidScoreModal); }
  if (teacherClassCancelButton) { teacherClassCancelButton.addEventListener('click', () => { setTeacherSubview('home'); }); }
  if (teacherClassStudentCountSelect) { teacherClassStudentCountSelect.addEventListener('change', createTeacherNameInputs); }
  if (teacherConfirmDeleteButton) { teacherConfirmDeleteButton.addEventListener('click', deleteCurrentTeacherClass); }
  if (teacherCancelDeleteButton) { teacherCancelDeleteButton.addEventListener('click', closeDeleteModal); }
  if (teacherDeleteCloseButton) { teacherDeleteCloseButton.addEventListener('click', closeDeleteModal); }
  maleStudentTabButton.addEventListener('click', () => {
    setActiveView('student_male');
    renderCurrentView();
  });
  femaleStudentTabButton.addEventListener('click', () => {
    setActiveView('student_female');
    renderCurrentView();
  });
  teacherTabButton.addEventListener('click', () => {
    setActiveView('teacher');
    renderCurrentView();
  });
  teacherMaleTabButton.addEventListener('click', () => {
    activeTeacherGenderValue = 'male';
    writeUiPreference(uiPreferenceKeys.teacherGender, activeTeacherGenderValue);
    syncTeacherGenderTabs();
    renderTeacherView();
  });
  teacherFemaleTabButton.addEventListener('click', () => {
    activeTeacherGenderValue = 'female';
    writeUiPreference(uiPreferenceKeys.teacherGender, activeTeacherGenderValue);
    syncTeacherGenderTabs();
    renderTeacherView();
  });
  guestEntryButton.addEventListener('click', () => {
    applyRoute('guest');
  });
  memberEntryButton.addEventListener('click', () => {
    applyRoute('member');
  });
  memberLoginForm.addEventListener('submit', handleMemberLogin);
  if (memberSignupButton) { memberSignupButton.addEventListener('click', () => applyRoute('signup')); }
  if (memberSignupBackButton) { memberSignupBackButton.addEventListener('click', () => applyRoute('member')); }
  if (forgotPasswordButton) { forgotPasswordButton.addEventListener('click', () => applyRoute('forgotPassword')); }
  if (forgotPasswordBackButton) { forgotPasswordBackButton.addEventListener('click', () => applyRoute('member')); }
  if (forgotPasswordForm) { forgotPasswordForm.addEventListener('submit', handleForgotPassword); }
  if (resetPasswordBackButton) { resetPasswordBackButton.addEventListener('click', () => applyRoute('member')); }
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', handleResetPassword);
    resetPasswordForm.querySelectorAll('input[type="password"]').forEach((input) => {
      input.addEventListener('paste', preventPasswordPaste);
      input.addEventListener('copy', preventPasswordCopy);
      input.addEventListener('cut', preventPasswordCopy);
    });
  }
  if (memberSignupForm) {
    memberSignupForm.addEventListener('submit', handleMemberSignup);
    memberSignupForm.querySelectorAll('input[type="tel"]').forEach((input) => {
      input.addEventListener('input', restrictPhoneInput);
    });
    memberSignupForm.querySelectorAll('input[type="password"]').forEach((input) => {
      input.addEventListener('paste', preventPasswordPaste);
      input.addEventListener('copy', preventPasswordCopy);
      input.addEventListener('cut', preventPasswordCopy);
    });
  }
  if (memberProfileButton) { memberProfileButton.addEventListener('click', () => applyRoute('profile')); }
  if (profileCloseButton) { profileCloseButton.addEventListener('click', () => applyRoute(authUser?.role === 'admin' ? 'admin' : 'member')); }
  if (profileDetailsForm) {
    profileDetailsForm.addEventListener('submit', saveProfileDetails);
    profileDetailsForm.querySelectorAll('input[type="tel"]').forEach((input) => {
      input.addEventListener('input', restrictPhoneInput);
    });
  }
  if (profilePasswordForm) {
    profilePasswordForm.addEventListener('submit', changeProfilePassword);
    profilePasswordForm.querySelectorAll('input[type="password"]').forEach((input) => {
      input.addEventListener('paste', preventPasswordPaste);
      input.addEventListener('copy', preventPasswordCopy);
      input.addEventListener('cut', preventPasswordCopy);
    });
  }
  if (profileDeactivateForm) { profileDeactivateForm.addEventListener('submit', openDeactivateProfileModal); }
  if (profileDeactivateOpenButton) { profileDeactivateOpenButton.addEventListener('click', openDeactivateProfileModal); }
  if (profileDeactivateConfirmCheckbox) {
    profileDeactivateConfirmCheckbox.addEventListener('change', () => {
      profileDeactivateConfirmButton.disabled = !profileDeactivateConfirmCheckbox.checked;
    });
  }
  if (profileDeactivateConfirmButton) { profileDeactivateConfirmButton.addEventListener('click', deactivateProfileAccount); }
  if (profileDeactivateCancelButton) { profileDeactivateCancelButton.addEventListener('click', closeDeactivateProfileModal); }
  if (profileDeactivateCloseButton) { profileDeactivateCloseButton.addEventListener('click', closeDeactivateProfileModal); }
  if (profileDeactivatePasswordInput) {
    profileDeactivatePasswordInput.addEventListener('paste', preventPasswordPaste);
    profileDeactivatePasswordInput.addEventListener('copy', preventPasswordCopy);
    profileDeactivatePasswordInput.addEventListener('cut', preventPasswordCopy);
  }
  memberLogoutButton.addEventListener('click', logoutMember);
  adminLogoutButton.addEventListener('click', logoutMember);
  if (adminRestoreUserForm) { adminRestoreUserForm.addEventListener('submit', handleAdminRestoreUser); }
  if (adminBackupButton) { adminBackupButton.addEventListener('click', () => withBrieflyDisabled(adminBackupButton, downloadAdminBackup)); }
  if (adminBackupImport) { adminBackupImport.addEventListener('change', () => restoreAdminBackupFromFile(adminBackupImport.files?.[0])); }
  if (adminAuditFilter) { adminAuditFilter.addEventListener('change', renderAdminAuditLogFromFilter); }
  if (adminInactiveUsers) {
    adminInactiveUsers.addEventListener('click', (event) => {
      const button = event.target.closest('[data-restore-user-email]');

      if (!button) {
        return;
      }

      restoreInactiveUser(button.dataset.restoreUserEmail);
    });
  }
  if (adminAllUsers) {
    adminAllUsers.addEventListener('click', (event) => {
      const restoreButton = event.target.closest('[data-restore-user-email]');
      const statusButton = event.target.closest('[data-status-user-id]');
      const passwordButton = event.target.closest('[data-reset-password-user-id]');

      if (restoreButton) {
        restoreInactiveUser(restoreButton.dataset.restoreUserEmail);
        return;
      }

      if (statusButton) {
        openAdminStatusModal(statusButton);
        return;
      }

      if (passwordButton) {
        openAdminPasswordModal(passwordButton);
      }
    });
  }
  if (adminStatusConfirmButton) { adminStatusConfirmButton.addEventListener('click', confirmAdminStatusChange); }
  if (adminStatusCancelButton) { adminStatusCancelButton.addEventListener('click', closeAdminStatusModal); }
  if (adminStatusCloseButton) { adminStatusCloseButton.addEventListener('click', closeAdminStatusModal); }
  if (adminPasswordForm) {
    adminPasswordForm.addEventListener('submit', submitAdminPasswordReset);
    adminPasswordForm.querySelectorAll('input[type="password"]').forEach((input) => {
      input.addEventListener('paste', preventPasswordPaste);
      input.addEventListener('copy', preventPasswordCopy);
      input.addEventListener('cut', preventPasswordCopy);
    });
  }
  if (adminGeneratePasswordButton) { adminGeneratePasswordButton.addEventListener('click', fillGeneratedTemporaryPassword); }
  if (adminPasswordCancelButton) { adminPasswordCancelButton.addEventListener('click', closeAdminPasswordModal); }
  if (adminPasswordCloseButton) { adminPasswordCloseButton.addEventListener('click', closeAdminPasswordModal); }
  if (adminBackupResultOkButton) { adminBackupResultOkButton.addEventListener('click', closeAdminBackupResultModal); }
  if (adminBackupResultCloseButton) { adminBackupResultCloseButton.addEventListener('click', closeAdminBackupResultModal); }
  topHomeButton.addEventListener('click', () => {
    applyRoute('home');
  });
  adminNavButton.addEventListener('click', () => {
    applyRoute('admin');
  });
  heroHomeButton.addEventListener('click', () => {
    applyRoute('home');
  });
  privacyButton.addEventListener('click', () => {
    updateRoute('privacy');
    setEntryMode('privacy');
  });
  privacyCloseButton.addEventListener('click', () => {
    applyRoute(previousEntryMode || 'home');
  });
  termsButton.addEventListener('click', () => {
    updateRoute('terms');
    setEntryMode('terms');
  });
  termsCloseButton.addEventListener('click', () => {
    applyRoute(previousEntryMode || 'home');
  });
  accessibilityButton.addEventListener('click', () => {
    updateRoute('accessibility');
    setEntryMode('accessibility');
  });
  accessibilityCloseButton.addEventListener('click', () => {
    applyRoute(previousEntryMode || 'home');
  });
  contactButton.addEventListener('click', () => {
    updateRoute('contact');
    setEntryMode('contact');
  });
  contactCloseButton.addEventListener('click', () => {
    applyRoute(previousEntryMode || 'home');
  });
  accessibilityFab.addEventListener('click', () => {
    if (accessibilityToolbar.classList.contains('is-hidden')) {
      openAccessibilityToolbar();
    } else {
      closeAccessibilityToolbar();
    }
  });
  accessibilityToolbarClose.addEventListener('click', closeAccessibilityToolbar);
  accessibilityTextPlusButton.addEventListener('click', () => {
    accessibilityTextScale = Math.min(1.4, accessibilityTextScale + 0.1);
    applyAccessibilityTextScale();
  });
  accessibilityTextMinusButton.addEventListener('click', () => {
    accessibilityTextScale = Math.max(0.85, accessibilityTextScale - 0.1);
    applyAccessibilityTextScale();
  });
  accessibilityReadableFontButton.addEventListener('click', () => toggleBodyClass('accessibility-readable-font'));
  accessibilityUnderlineLinksButton.addEventListener('click', () => toggleBodyClass('accessibility-underline-links'));
  accessibilityGrayscaleButton.addEventListener('click', () => toggleBodyClass('accessibility-grayscale'));
  accessibilityHighContrastButton.addEventListener('click', () => {
    document.body.classList.remove('accessibility-negative-contrast');
    toggleBodyClass('accessibility-high-contrast');
  });
  accessibilityNegativeContrastButton.addEventListener('click', () => {
    document.body.classList.remove('accessibility-high-contrast');
    toggleBodyClass('accessibility-negative-contrast');
  });
  accessibilityResetButton.addEventListener('click', resetAccessibilitySettings);
  accessibilityToolbar.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeAccessibilityToolbar();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = Array.from(accessibilityToolbar.querySelectorAll('button:not([disabled])'));

    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  window.addEventListener('popstate', () => {
    const mode = parseRouteHash();
    applyRoute(mode, true);
  });
  applyAccessibilityTextScale();
}

init();
