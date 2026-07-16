const sheetSelect = document.querySelector('#sheet-select');
const studentSchoolScoreSourceSelect = document.querySelector('#student-school-score-source');
const studentSchoolGradeCard = document.querySelector('#student-school-grade-card');
const studentSchoolGroupCard = document.querySelector('#student-school-group-card');
const studentDefaultClassCard = document.querySelector('#student-default-class-card');
const studentSchoolGradeButtons = document.querySelector('#student-school-grade-buttons');
const studentSchoolGroupButtons = document.querySelector('#student-school-group-buttons');
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
const topUserLabel = document.querySelector('#top-user-label');
const adminNavButton = document.querySelector('#admin-nav-button');
const adminSecurityNavButton = document.querySelector('#admin-security-nav-button');
const adminSecurityAdminTab = document.querySelector('#admin-security-admin-tab');
const adminSecurityCurrentTab = document.querySelector('#admin-security-current-tab');
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
const memberTwoFactorView = document.querySelector('#member-2fa-view');
const memberTwoFactorForm = document.querySelector('#member-2fa-form');
const memberTwoFactorSubtitle = document.querySelector('#member-2fa-subtitle');
const memberTwoFactorCancelButton = document.querySelector('#member-2fa-cancel');
const memberTwoFactorError = document.querySelector('#member-2fa-error');
const forgotPasswordButton = document.querySelector('#forgot-password-button');
const forgotPasswordView = document.querySelector('#forgot-password-view');
const forgotPasswordForm = document.querySelector('#forgot-password-form');
const forgotPasswordBackButton = document.querySelector('#forgot-password-back');
const forgotPasswordMessage = document.querySelector('#forgot-password-message');
const resetPasswordView = document.querySelector('#reset-password-view');
const resetPasswordForm = document.querySelector('#reset-password-form');
const resetPasswordBackButton = document.querySelector('#reset-password-back');
const resetPasswordMessage = document.querySelector('#reset-password-message');
const verifyEmailView = document.querySelector('#verify-email-view');
const verifyEmailMessage = document.querySelector('#verify-email-message');
const verifyEmailLoginButton = document.querySelector('#verify-email-login');
const memberSignupView = document.querySelector('#member-signup-view');
const memberSignupButton = document.querySelector('#member-signup-button');
const memberSignupForm = document.querySelector('#member-signup-form');
const memberSignupBackButton = document.querySelector('#member-signup-back');
const memberSignupError = document.querySelector('#member-signup-error');
const signupAccountType = document.querySelector('#signup-account-type');
const signupTeacherSchoolFields = document.querySelector('#signup-teacher-school-fields');
const signupAdminSchoolFields = document.querySelector('#signup-admin-school-fields');
const signupSchoolSelect = document.querySelector('#signup-school-select');
const signupSchoolIdInput = document.querySelector('#signup-school-id');
const signupSchoolOptions = document.querySelector('#signup-school-options');
const signupAdminSchoolOptions = document.querySelector('#signup-admin-school-options');
const signupCityOptions = document.querySelector('#signup-city-options');
const signupSchoolNameInput = document.querySelector('#signup-school');
const signupSchoolCityInput = document.querySelector('#signup-school-city');
const signupInviteTokenInput = document.querySelector('#signup-invite-token');
const adminView = document.querySelector('#admin-view');
const adminSecurityView = document.querySelector('#admin-security-view');
const adminSecurityBackButton = document.querySelector('#admin-security-back');
const adminSecurityEvents = document.querySelector('#admin-security-events');
const adminSecuritySummary = document.querySelector('#admin-security-summary');
const adminSecurityExportButton = document.querySelector('#admin-security-export-button');
const adminSecurityExportModal = document.querySelector('#admin-security-export-modal');
const adminSecurityExportCloseButton = document.querySelector('#admin-security-export-close');
const adminSecurityExportCancelButton = document.querySelector('#admin-security-export-cancel');
const adminSecurityExportForm = document.querySelector('#admin-security-export-form');
const adminSecurityExportError = document.querySelector('#admin-security-export-error');
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
const adminTwoFactorStatus = document.querySelector('#admin-2fa-status');
const adminTwoFactorStartForm = document.querySelector('#admin-2fa-start-form');
const adminTwoFactorSetup = document.querySelector('#admin-2fa-setup');
const adminTwoFactorQr = document.querySelector('#admin-2fa-qr');
const adminTwoFactorSecret = document.querySelector('#admin-2fa-secret');
const adminTwoFactorVerifyForm = document.querySelector('#admin-2fa-verify-form');
const adminTwoFactorRecovery = document.querySelector('#admin-2fa-recovery');
const adminTwoFactorRecoveryManagement = document.querySelector('#admin-2fa-recovery-management');
const adminTwoFactorRegenerateRecoveryButton = document.querySelector('#admin-2fa-regenerate-recovery');
const adminTwoFactorDisableForm = document.querySelector('#admin-2fa-disable-form');
const adminTwoFactorMessage = document.querySelector('#admin-2fa-message');
const adminTwoFactorRegenerateModal = document.querySelector('#admin-2fa-regenerate-modal');
const adminTwoFactorRegenerateCloseButton = document.querySelector('#admin-2fa-regenerate-close');
const adminTwoFactorRegenerateCancelButton = document.querySelector('#admin-2fa-regenerate-cancel');
const adminTwoFactorRegenerateForm = document.querySelector('#admin-2fa-regenerate-form');
const adminTwoFactorRegenerateError = document.querySelector('#admin-2fa-regenerate-error');
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
const adminBackupExportModal = document.querySelector('#admin-backup-export-modal');
const adminBackupExportCloseButton = document.querySelector('#admin-backup-export-close');
const adminBackupExportCancelButton = document.querySelector('#admin-backup-export-cancel');
const adminBackupExportForm = document.querySelector('#admin-backup-export-form');
const adminBackupExportError = document.querySelector('#admin-backup-export-error');
const adminBackupConfirmModal = document.querySelector('#admin-backup-confirm-modal');
const adminBackupConfirmCloseButton = document.querySelector('#admin-backup-confirm-close');
const adminBackupConfirmCancelButton = document.querySelector('#admin-backup-confirm-cancel');
const adminBackupConfirmForm = document.querySelector('#admin-backup-confirm-form');
const adminBackupConfirmError = document.querySelector('#admin-backup-confirm-error');
const adminPermanentDeleteModal = document.querySelector('#admin-permanent-delete-modal');
const adminPermanentDeleteCloseButton = document.querySelector('#admin-permanent-delete-close');
const adminPermanentDeleteCancelButton = document.querySelector('#admin-permanent-delete-cancel');
const adminPermanentDeleteForm = document.querySelector('#admin-permanent-delete-form');
const adminPermanentDeleteMessage = document.querySelector('#admin-permanent-delete-message');
const adminPermanentDeleteError = document.querySelector('#admin-permanent-delete-error');
const adminBackupResultModal = document.querySelector('#admin-backup-result-modal');
const adminBackupResultCloseButton = document.querySelector('#admin-backup-result-close');
const adminBackupResultOkButton = document.querySelector('#admin-backup-result-ok');
const adminBackupResultMessage = document.querySelector('#admin-backup-result-message');
const schoolAdminView = document.querySelector('#school-admin-view');
const schoolAdminSummary = document.querySelector('#school-admin-summary');
const schoolAdminTeachers = document.querySelector('#school-admin-teachers');
const schoolAdminTeacherModeButton = document.querySelector('#school-admin-teacher-mode');
const schoolAdminInviteForm = document.querySelector('#school-admin-invite-form');
const schoolAdminInviteResult = document.querySelector('#school-admin-invite-result');
const schoolAdminScoreTablesButton = document.querySelector('#school-admin-score-tables');
const schoolAdminScoreTablesView = document.querySelector('#school-admin-score-tables-view');
const schoolAdminScoreTablesBackButton = document.querySelector('#school-admin-score-tables-back');
const schoolScoreTableSummary = document.querySelector('#school-score-table-summary');
const schoolScoreTableViewToggleButton = document.querySelector('#school-score-table-view-toggle');
const schoolScoreTableSortField = document.querySelector('#school-score-table-sort-field');
const schoolScoreTableSortDirection = document.querySelector('#school-score-table-sort-direction');
const schoolScoreTableNewButton = document.querySelector('#school-score-table-new');
const schoolScoreTableEditButton = document.querySelector('#school-score-table-edit');
const schoolScoreTableRefreshButton = document.querySelector('#school-score-table-refresh');
const schoolScoreTableImportInput = document.querySelector('#school-score-table-import');
const schoolScoreTableRangeForm = document.querySelector('#school-score-table-range-form');
const schoolScoreGradeStartSelect = document.querySelector('#school-score-grade-start');
const schoolScoreGradeEndSelect = document.querySelector('#school-score-grade-end');
const schoolScoreTableRangeCancelButton = document.querySelector('#school-score-table-range-cancel');
const schoolScoreTableMessage = document.querySelector('#school-score-table-message');
const schoolScoreTableCreatePanel = document.querySelector('#school-score-table-create-panel');
const schoolScoreTableCreateForm = document.querySelector('#school-score-table-create-form');
const schoolScoreTableGradeSelect = document.querySelector('#school-score-table-grade');
const schoolScoreTableGenderSelect = document.querySelector('#school-score-table-gender');
const schoolScoreTableStartingScoreInput = document.querySelector('#school-score-table-starting-score');
const schoolScoreTableCreateCancelButton = document.querySelector('#school-score-table-create-cancel');
const schoolScoreTableCards = document.querySelector('#school-score-table-cards');

function readCookie(name) {
  return document.cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))
    ?.slice(name.length + 1) || '';
}

function apiFetch(url, options = {}) {
  const method = String(options.method || 'GET').toUpperCase();
  const headers = new Headers(options.headers || {});
  const csrfToken = readCookie('edufitscore_csrf');
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && csrfToken) {
    headers.set('X-CSRF-Token', decodeURIComponent(csrfToken));
  }

  return fetch(url, { ...options, headers });
}
const schoolScoreTableBuilder = document.querySelector('#school-score-table-builder');
const schoolScoreTableBuilderTitle = document.querySelector('#school-score-table-builder-title');
const schoolScoreTableSaveButton = document.querySelector('#school-score-table-save');
const schoolScoreTableCloseButton = document.querySelector('#school-score-table-close');
const schoolScoreTableDeleteButton = document.querySelector('#school-score-table-delete');
const schoolScoreTableAddSubjectButton = document.querySelector('#school-score-table-add-subject');
const schoolScoreTableGrid = document.querySelector('#school-score-table-grid');
const memberProfileView = document.querySelector('#member-profile-view');
const profileCloseButton = document.querySelector('#profile-close-button');
const profileDetailsForm = document.querySelector('#profile-details-form');
const profileSchoolRequestPanel = document.querySelector('#profile-school-request-panel');
const profileSchoolMemberships = document.querySelector('#profile-school-memberships');
const profileSchoolRequestControls = document.querySelector('#profile-school-request-controls');
const profileSchoolRequestSelect = document.querySelector('#profile-school-request-select');
const profileSchoolRequestButton = document.querySelector('#profile-school-request-button');
const profileSchoolRequestMessage = document.querySelector('#profile-school-request-message');
const profilePasswordForm = document.querySelector('#profile-password-form');
const profileAdminSecurityPanel = document.querySelector('#profile-admin-security-panel');
const profileSessionsList = document.querySelector('#profile-sessions-list');
const profileLogoutOtherSessionsButton = document.querySelector('#profile-logout-other-sessions');
const profileSessionsMessage = document.querySelector('#profile-sessions-message');
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
const teacherSaveStudentNamesButton = document.querySelector('#teacher-save-student-names');
const teacherCancelStudentNamesButton = document.querySelector('#teacher-cancel-student-names');
const teacherSaveClassButton = document.querySelector('#teacher-save-class');
const teacherNewClassButton = document.querySelector('#teacher-new-class-button');
const teacherEditClassesButton = document.querySelector('#teacher-edit-classes-button');
const teacherBackToClassesButton = document.querySelector('#teacher-back-to-classes');
const teacherOpenHistoryViewButton = document.querySelector('#teacher-open-history-view');
const teacherSchoolAdminSwitchButton = document.querySelector('#teacher-school-admin-switch');
const teacherBackToClassDetailButton = document.querySelector('#teacher-back-to-class-detail');
const teacherHistoryBackToClassesButton = document.querySelector('#teacher-history-back-to-classes');
const teacherEntrySemesterButtons = Array.from(document.querySelectorAll('[data-entry-semester]'));
const teacherHistorySemesterButtons = Array.from(document.querySelectorAll('[data-history-semester]'));
const teacherYearlyRatioInput = document.querySelector('#teacher-yearly-ratio');
const teacherYearlyRatioLabel = document.querySelector('#teacher-yearly-ratio-label');
const teacherYearlyRatioValue = document.querySelector('#teacher-yearly-ratio-value');
const teacherYearlyRatioBValue = document.querySelector('#teacher-yearly-ratio-b-value');
const teacherClassForm = document.querySelector('#teacher-class-form');
const teacherClassNameInput = document.querySelector('#teacher-class-name');
const teacherClassSchoolField = document.querySelector('#teacher-class-school-field');
const teacherClassSchoolSelect = document.querySelector('#teacher-class-school');
const teacherClassGradeSelect = document.querySelector('#teacher-class-grade');
const teacherClassGenderSelect = document.querySelector('#teacher-class-gender');
const teacherClassStudentCountSelect = document.querySelector('#teacher-class-student-count');
const teacherClassStudentNames = document.querySelector('#teacher-class-student-names');
const teacherClassRosterImportInput = document.querySelector('#teacher-class-roster-import');
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
const teacherHistoryTimeline = document.querySelector('.teacher-history-timeline');
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
const teacherEntryMessage = document.querySelector('#teacher-entry-message');
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
let activeTeacherSemester = 'a';
let activeTeacherHistorySemester = 'a';
let teacherYearlySemesterARatio = 50;
let teacherEditMode = false;
let dragSourceIndex = null;
let teacherClassesEditMode = false;
let teacherSubview = 'home';
let teacherClassListView = 'cards';
let pendingDeleteClassId = null;
let pendingDeleteHistoryId = null;
let dragClassSourceId = null;
let teacherHistoryEntries = [];
let teacherHistoryCalculatedCount = 0;
let selectedTeacherHistoryIndex = 0;
let isSavingClassOrder = false;
let teacherHistoryMode = 'entry';
let teacherHistoryEditMode = false;
let pendingInvalidScoreWarnings = [];
let pendingAdminStatusChange = null;
let pendingAdminPasswordReset = null;
let pendingAdminBackupRestore = null;
let pendingAdminPermanentDelete = null;
let signupSchools = [];
let activeHistoryGraphSubject = '';
let visibleHistoryGraphStudents = new Set();
let historyGraphSelectionTouched = false;
let adminAuditEntries = [];
let adminUsersSort = { key: '', direction: 'asc' };
let pendingTwoFactorChallengeToken = '';
let teacherEditRosterSnapshot = null;
let schoolScoreTableState = { school: null, settings: { gradeStart: 1, gradeEnd: 6 }, tables: [] };
let activeSchoolScoreTableId = null;
let schoolScoreTablesEditMode = false;
let schoolScoreTableListView = 'cards';
let studentSchoolScoreSources = [];
let selectedStudentSchoolScoreTables = [];
let selectedStudentSchoolGrade = null;
let selectedStudentSchoolGroup = '';
let activeTeacherSchoolScoreTable = null;
let selectedDefaultStudentGrade = '';
let selectedDefaultStudentGroup = 'male';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

const schoolScoreGradeLabels = {
  1: 'א׳',
  2: 'ב׳',
  3: 'ג׳',
  4: 'ד׳',
  5: 'ה׳',
  6: 'ו׳',
  7: 'ז׳',
  8: 'ח׳',
  9: 'ט׳',
  10: 'י׳',
  11: 'י״א',
  12: 'י״ב',
};

const schoolScoreGenderLabels = {
  male: 'בנים',
  female: 'בנות',
  other: 'מעורב',
};

function normalizeSchoolScoreGradeValue(value) {
  const text = String(value || '').trim().replace(/"/g, '״').replace(/'/g, '׳');
  const numeric = Number(text);
  if (Number.isInteger(numeric)) {
    return numeric;
  }
  const match = Object.entries(schoolScoreGradeLabels).find(([, label]) => label === text || label.replace('׳', '') === text);
  return match ? Number(match[0]) : NaN;
}

function addTapFallback(element, handler) {
  if (!element) {
    return;
  }

  element.addEventListener('click', handler);
  element.addEventListener('touchend', (event) => {
    event.preventDefault();
    handler(event);
  }, { passive: false });
}

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
  twoFactor: memberTwoFactorView,
  forgotPassword: forgotPasswordView,
  resetPassword: resetPasswordView,
  verifyEmail: verifyEmailView,
  signup: memberSignupView,
  admin: adminView,
  adminSecurity: adminSecurityView,
  schoolAdmin: schoolAdminView,
  schoolAdminScoreTables: schoolAdminScoreTablesView,
  profile: memberProfileView,
};

function parseRouteHash() {
  const hash = window.location.hash.replace('#', '');

  if (hash === 'guest') {
    return 'guest';
  }

  if (hash === 'member') {
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

  if (hash.startsWith('verify-email')) {
    return 'verifyEmail';
  }

  if (hash === 'profile') {
    return 'profile';
  }

  if (['member-classes', 'member-new-class', 'member-class', 'member-history'].includes(hash)) {
    return hash;
  }

  if (hash.startsWith('member-')) {
    return 'member';
  }

  if (hash === 'admin') {
    return 'admin';
  }

  if (hash === 'admin-security') {
    return 'adminSecurity';
  }

  if (hash === 'school-admin') {
    return 'schoolAdmin';
  }

  if (hash === 'school-admin-score-tables') {
    return 'schoolAdminScoreTables';
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
  const routeHash = mode === 'schoolAdmin' ? 'school-admin' : mode === 'schoolAdminScoreTables' ? 'school-admin-score-tables' : mode === 'adminSecurity' ? 'admin-security' : mode;
  const targetHash = mode === 'home' ? '' : `#${routeHash}`;
  const url = new URL(window.location.href);

  if (mode !== 'resetPassword') {
    url.searchParams.delete('resetToken');
  }
  if (mode !== 'verifyEmail') {
    url.searchParams.delete('verifyToken');
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
  const numericGrade = Number(value);
  const gradeLabels = {
    1: 'א׳',
    2: 'ב׳',
    3: 'ג׳',
    4: 'ד׳',
    5: 'ה׳',
    6: 'ו׳',
    7: 'ז׳',
    8: 'ח׳',
    9: 'ט׳',
    10: 'י׳',
    11: 'י״א',
    12: 'י״ב',
  };

  if (Number.isFinite(numericGrade) && Number.isInteger(numericGrade) && gradeLabels[numericGrade]) {
    return gradeLabels[numericGrade];
  }

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
  if (!selectedStudentSchoolScoreSource()) {
    return selectedDefaultStudentGroup === 'female' ? 'female' : 'male';
  }
  return activeView === 'student_female' ? 'female' : 'male';
}

function activeTeacherStudentLabel() {
  return activeTeacherGenderValue === 'female' ? 'תלמידה' : 'תלמיד';
}

async function loadStudentSchoolScoreSources() {
  if (!studentSchoolScoreSourceSelect) {
    return;
  }

  const response = await fetch('/api/schools');
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  studentSchoolScoreSources = data.schools || [];
  studentSchoolScoreSourceSelect.innerHTML = `
    <option value="">בחרו בית-ספר</option>
    ${studentSchoolScoreSources.map((school) => `<option value="${escapeAttr(school.id)}">${escapeHtml(school.name)} - ${escapeHtml(school.city)}</option>`).join('')}
  `;
  studentSchoolScoreSourceSelect.value = '';
  renderStudentSchoolScoreFilters();
}

function selectedStudentSchoolScoreSource() {
  return studentSchoolScoreSourceSelect?.value || '';
}

function schoolScoreTableSheetsForStudent() {
  if (!selectedStudentSchoolScoreSource()) {
    return [];
  }
  const selectedGrade = normalizeSchoolScoreGradeValue(selectedStudentSchoolGrade);
  const selectedGroup = selectedStudentSchoolGroup;
  return selectedStudentSchoolScoreTables
    .filter((table) => Number(table.grade) === selectedGrade && table.genderGroup === selectedGroup)
    .map((table) => ({
    id: `school_score_${table.id}`,
    name: `${schoolScoreGradeLabel(table.grade)} ${schoolScoreGenderLabels[table.genderGroup]}`,
    table,
  }));
}

function renderStudentSchoolScoreFilters() {
  const isSchool = Boolean(selectedStudentSchoolScoreSource());
  studentSchoolGradeCard?.classList.remove('is-hidden');
  studentSchoolGroupCard?.classList.remove('is-hidden');
  studentDefaultClassCard?.classList.add('is-hidden');
  classTabsContainer?.classList.add('is-hidden');
  maleStudentTabButton?.classList.add('is-hidden');
  femaleStudentTabButton?.classList.add('is-hidden');
  if (!isSchool) {
    if (studentSchoolGradeButtons) studentSchoolGradeButtons.innerHTML = '<p class="score-empty-state">בחרו בית-ספר כדי לראות שכבות.</p>';
    if (studentSchoolGroupButtons) studentSchoolGroupButtons.innerHTML = '<p class="score-empty-state">בחרו בית-ספר כדי לראות קבוצות.</p>';
    return;
  }
  const grades = Array.from(new Set(selectedStudentSchoolScoreTables.map((table) => normalizeSchoolScoreGradeValue(table.grade)))).sort((a, b) => a - b);
  if (!grades.length) {
    selectedStudentSchoolGrade = null;
    selectedStudentSchoolGroup = '';
    if (studentSchoolGradeButtons) studentSchoolGradeButtons.innerHTML = '<p class="score-empty-state">לא הוגדרו טבלאות ציונים לבית-הספר שנבחר.</p>';
    if (studentSchoolGroupButtons) studentSchoolGroupButtons.innerHTML = '';
    return;
  }
  if (!grades.includes(normalizeSchoolScoreGradeValue(selectedStudentSchoolGrade))) {
    selectedStudentSchoolGrade = grades[0] || null;
  }
  if (studentSchoolGradeButtons) {
    studentSchoolGradeButtons.dataset.gradeCount = String(grades.length);
    studentSchoolGradeButtons.innerHTML = grades.map((grade) => `
      <button type="button" class="class-tab${normalizeSchoolScoreGradeValue(selectedStudentSchoolGrade) === grade ? ' is-active' : ''}" data-student-school-grade="${grade}">${schoolScoreGradeLabel(grade)}</button>
    `).join('');
  }
  const selectedGrade = normalizeSchoolScoreGradeValue(selectedStudentSchoolGrade);
  const groups = selectedStudentSchoolScoreTables.filter((table) => normalizeSchoolScoreGradeValue(table.grade) === selectedGrade).map((table) => table.genderGroup);
  if (!groups.includes(selectedStudentSchoolGroup)) {
    selectedStudentSchoolGroup = groups[0] || '';
  }
  if (studentSchoolGroupButtons) {
    studentSchoolGroupButtons.innerHTML = groups.map((group) => `
      <button type="button" class="class-tab${selectedStudentSchoolGroup === group ? ' is-active' : ''}" data-student-school-group="${group}">${schoolScoreGenderLabels[group]}</button>
    `).join('');
  }
}

async function loadSelectedStudentSchoolScoreTables() {
  const schoolId = selectedStudentSchoolScoreSource();
  selectedStudentSchoolScoreTables = [];
  selectedStudentSchoolGrade = null;
  selectedStudentSchoolGroup = '';
  if (!schoolId) {
    renderStudentSchoolScoreFilters();
    renderCurrentView();
    return;
  }
  const response = await fetch(`/api/schools/${schoolId}/score-tables`);
  if (response.ok) {
    const data = await response.json();
    selectedStudentSchoolScoreTables = (data.tables || []).map(normalizeSchoolScoreTable);
  }
  renderStudentSchoolScoreFilters();
  renderCurrentView();
}

async function syncScoreSourceForTeacherClass(teacherClass) {
  activeTeacherSchoolScoreTable = null;
  if (!teacherClass?.schoolId) {
    return;
  }

  const classId = teacherClass.id;
  const response = await fetch(`/api/teacher/classes/${teacherClass.id}/score-table`);
  if (String(activeTeacherClassId) !== String(classId)) {
    return;
  }
  if (response.ok) {
    const data = await response.json();
    if (data.table) {
      activeTeacherSchoolScoreTable = normalizeSchoolScoreTable(data.table);
      sheetSelect.value = `school_score_${activeTeacherSchoolScoreTable.id}`;
    }
  }
}

function canTeacherEnterScores() {
  return Boolean(authUser?.canEnterScores);
}

function approvedTeacherSchools() {
  return (authUser?.schoolMemberships || [])
    .filter((item) => ['teacher', 'admin'].includes(item.role) && item.status === 'approved')
    .map((item) => item.school)
    .filter(Boolean);
}

function teacherScoreAccessMessage() {
  return 'הזנת ציונים זמינה רק לאחר אישור רכז חנ"ג וחיבור לטבלת ציונים בית ספרית.';
}

function integerOnlyValue(value) {
  return String(value || '').replace(/\D/g, '');
}

function teacherEntryValue(value, sheet = selectedSheet()) {
  if (sheet?.table && !sheet.metrics) {
    return String(value || '').trim();
  }
  return integerOnlyValue(value);
}

function activeTeacherGender() {
  return activeTeacherGenderValue;
}

function syncTeacherGenderTabs() {
  teacherMaleTabButton.classList.toggle('is-active', activeTeacherGenderValue === 'male');
  teacherFemaleTabButton.classList.toggle('is-active', activeTeacherGenderValue === 'female');
  teacherStudentCountLabel.textContent = activeTeacherGenderValue === 'female' ? 'מספר בנות' : 'מספר בנים';
}

let teacherEditSaveMessageTimer = null;

function setTeacherEditSaveMessage(text, autoClear = false) {
  if (!teacherEditSaveMessage) {
    return;
  }

  if (teacherEditSaveMessageTimer) {
    window.clearTimeout(teacherEditSaveMessageTimer);
    teacherEditSaveMessageTimer = null;
  }

  teacherEditSaveMessage.textContent = text;
  if (text && autoClear) {
    teacherEditSaveMessageTimer = window.setTimeout(() => {
      teacherEditSaveMessage.textContent = '';
      teacherEditSaveMessageTimer = null;
    }, 2200);
  }
}

function setTeacherSubview(viewName, updateHistory = true) {
  if (viewName === 'home' || viewName === 'new') {
    activeTeacherSchoolScoreTable = null;
  }
  if (viewName === 'detail' && activeTeacherSemester === 'yearly') {
    activeTeacherSemester = 'a';
    syncSemesterControls();
  }

  teacherSubview = viewName;
  teacherHomeView.classList.toggle('is-hidden', viewName !== 'home');
  teacherNewClassView.classList.toggle('is-hidden', viewName !== 'new');
  teacherClassDetailView.classList.toggle('is-hidden', viewName !== 'detail');
  teacherHistoryView.classList.toggle('is-hidden', viewName !== 'history');
  if (viewName !== 'detail') {
    setTeacherEditSaveMessage('');
    syncTeacherStudentEditControls();
  }

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

function syncTeacherClassSchoolField(selectedSchoolId = '') {
  const schools = approvedTeacherSchools();
  if (!teacherClassSchoolField || !teacherClassSchoolSelect) {
    return;
  }

  teacherClassSchoolField.classList.toggle('is-hidden', !schools.length);
  teacherClassSchoolSelect.innerHTML = schools.map((school) => `<option value="${escapeAttr(school.id)}">${escapeHtml(school.name)} - ${escapeHtml(school.city)}</option>`).join('');
  teacherClassSchoolSelect.required = Boolean(schools.length);
  teacherClassSchoolSelect.value = String(selectedSchoolId || schools[0]?.id || '');
}

function isSemesterValuesPayload(values) {
  return values && typeof values === 'object' && values.semesters && typeof values.semesters === 'object';
}

function normalizeTeacherClassValues(values) {
  if (isSemesterValuesPayload(values)) {
    return {
      semesters: {
        a: values.semesters.a || {},
        b: values.semesters.b || {},
      },
      yearlyRatioA: Number.isFinite(Number(values.yearlyRatioA)) ? Number(values.yearlyRatioA) : 50,
    };
  }

  return {
    semesters: {
      a: values || {},
      b: {},
    },
    yearlyRatioA: 50,
  };
}

function currentSemesterValues() {
  const normalized = normalizeTeacherClassValues(currentTeacherClass()?.values || teacherClassValues || {});
  return activeTeacherSemester === 'b' ? normalized.semesters.b : normalized.semesters.a;
}

function setCurrentSemesterValues(values) {
  if (activeTeacherSemester === 'yearly') {
    return;
  }

  const teacherClass = currentTeacherClass();
  const normalized = normalizeTeacherClassValues(teacherClass?.values || teacherClassValues || {});
  normalized.semesters[activeTeacherSemester === 'b' ? 'b' : 'a'] = values || {};
  normalized.yearlyRatioA = teacherYearlySemesterARatio;
  teacherClassValues = normalized;

  if (teacherClass) {
    teacherClass.values = normalized;
  }
}

function syncSemesterWorkspaceFromClass() {
  const normalized = normalizeTeacherClassValues(currentTeacherClass()?.values || teacherClassValues || {});
  teacherClassValues = normalized;
  teacherYearlySemesterARatio = Number.isFinite(Number(normalized.yearlyRatioA)) ? Number(normalized.yearlyRatioA) : 50;
}

function syncSemesterControls() {
  teacherEntrySemesterButtons.forEach((button) => {
    button.classList.toggle('is-editing-button', button.dataset.entrySemester === activeTeacherSemester);
  });

  teacherHistorySemesterButtons.forEach((button) => {
    button.classList.toggle('is-editing-button', button.dataset.historySemester === activeTeacherHistorySemester);
  });

  const showYearlyRatioEditor = activeTeacherHistorySemester === 'yearly' && teacherHistoryEditMode;
  teacherYearlyRatioInput?.classList.toggle('is-hidden', !showYearlyRatioEditor);
  teacherYearlyRatioLabel?.classList.toggle('is-hidden', activeTeacherHistorySemester !== 'yearly');

  if (teacherYearlyRatioInput) {
    teacherYearlyRatioInput.value = String(teacherYearlySemesterARatio);
  }

  if (teacherYearlyRatioValue) {
    teacherYearlyRatioValue.textContent = `${teacherYearlySemesterARatio}%`;
  }

  if (teacherYearlyRatioBValue) {
    teacherYearlyRatioBValue.textContent = `${100 - teacherYearlySemesterARatio}%`;
  }
}

function computeTeacherClassSummary() {
  const filledScores = Object.values(currentSemesterValues()).reduce((count, studentValues) => (
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
  const teacherClass = currentTeacherClass();
  if (String(teacherClass?.id) === String(classId) && teacherClass.schoolId && !activeTeacherSchoolScoreTable) {
    await syncScoreSourceForTeacherClass(teacherClass);
  }

  const response = await fetch(`/api/teacher/classes/${classId}/history`);

  if (!response.ok) {
    teacherClassHistory.innerHTML = '<p>לא ניתן לטעון היסטוריה כרגע.</p>';
    teacherHistoryDateRange.textContent = '';
    teacherHistorySelectedDate.textContent = '';
    return;
  }

  const data = await response.json();
  const calculatedEntries = [...data.history]
    .filter((entry) => entry.eventType === 'calculated' && historyEntryHasScores(entry));
  teacherHistoryCalculatedCount = calculatedEntries.length;
  teacherHistoryEntries = calculatedEntries
    .filter((entry) => activeTeacherHistorySemester === 'yearly' || (entry.payload?.semester || 'a') === activeTeacherHistorySemester)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  selectedTeacherHistoryIndex = latestScoredHistoryEntryIndex(teacherHistoryEntries);
  updateTeacherClassSummaryCards();
  renderTeacherHistoryEntry();
}

function historyEntrySubjectLabels(entry) {
  const subjectLabels = [];
  const seen = new Set();

  normalizeHistoryStudents(entry).forEach((student) => {
    (student.results || []).forEach((item) => {
      const result = historyItemResult(item);
      const label = item.label || item.key;
      if (!result || !label || seen.has(label)) {
        return;
      }

      seen.add(label);
      subjectLabels.push(label);
    });
  });

  return subjectLabels;
}

function historyItemResult(item) {
  if (item?.result && Number.isFinite(Number(item.result.score))) {
    return item.result;
  }

  const score = item?.score ?? item?.resultScore ?? item?.matchedScore;
  if (Number.isFinite(Number(score))) {
    return {
      score: Number(score),
      matchedValue: item.matchedValue || item.enteredValue || '',
    };
  }

  return null;
}

function latestScoredHistoryEntryIndex(entries) {
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    if (historyEntrySubjectLabels(entries[index]).length) {
      return index;
    }
  }

  return Math.max(entries.length - 1, 0);
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
  const students = normalizeHistoryStudents(entry);
  const hasScoredResults = students.some((student) => (
    Array.isArray(student.results) && student.results.some((item) => item.result)
  ));
  if (hasScoredResults) {
    return true;
  }

  const rawStudents = Array.isArray(entry.payload?.rawStudents) ? entry.payload.rawStudents : [];
  return rawStudents.some((student) => Object.values(student.values || {}).some(Boolean));
}

function normalizeHistoryStudents(entry) {
  const students = Array.isArray(entry.payload?.students) ? entry.payload.students : [];
  const normalizedSavedStudents = students.map((student) => ({
    ...student,
    results: Array.isArray(student.results) ? student.results.map((item) => {
      const result = historyItemResult(item);
      if (result) {
        return { ...item, result };
      }

      if (item.result) {
        return item;
      }

      const score = item.score ?? item.resultScore ?? item.matchedScore;
      if (!Number.isFinite(Number(score))) {
        return item;
      }

      return {
        ...item,
        result: {
          score: Number(score),
          matchedValue: item.matchedValue || item.enteredValue || '',
        },
      };
    }) : [],
  }));
  if (normalizedSavedStudents.some((student) => student.results.some((item) => item.result || Number.isFinite(Number(item.result?.score))))) {
    return normalizedSavedStudents;
  }

  const rawStudents = Array.isArray(entry.payload?.rawStudents) ? entry.payload.rawStudents : [];
  const table = activeTeacherSchoolScoreTable || selectedSheet()?.table;
  if (!table?.subjects?.length || !rawStudents.length) {
    return students;
  }

  return rawStudents.map((student, index) => {
    const values = student.values || {};
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
      studentName: student.studentName || `תלמיד ${index + 1}`,
      averageScore: scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : null,
      results,
    };
  });
}

function currentStudentNameForHistory(studentName, studentIndex) {
  return studentName || activeTeacherClassRoster()[studentIndex]?.name || '';
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

  if (activeTeacherHistorySemester === 'yearly') {
    renderYearlyHistorySummary();
    return;
  }

  teacherHistoryTimeline?.classList.remove('is-hidden');
  teacherHistoryRange?.classList.remove('is-hidden');

  if (!teacherHistoryEntries.length) {
    const semesterLabel = activeTeacherHistorySemester === 'b' ? 'מחצית ב׳' : 'מחצית א׳';
    teacherHistoryDateRange.textContent = '';
    teacherHistorySelectedDate.textContent = '';
    teacherClassHistory.innerHTML = teacherHistoryCalculatedCount
      ? `<p>אין רשומות שמורות עבור ${semesterLabel}. אפשר לעבור מחצית או לשמור רשומה חדשה.</p>`
      : '<p>אין היסטוריה עדיין. שמור תוצאה ראשונה כדי לראות טבלאות וגרפים.</p>';
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

  let entry = teacherHistoryEntries[selectedTeacherHistoryIndex];
  if (!historyEntrySubjectLabels(entry).length) {
    selectedTeacherHistoryIndex = latestScoredHistoryEntryIndex(teacherHistoryEntries);
    teacherHistoryRange.value = String(selectedTeacherHistoryIndex);
    entry = teacherHistoryEntries[selectedTeacherHistoryIndex];
  }
  teacherHistorySelectedDate.innerHTML = `
    <span class="history-selected-label">רשומה נבחרת: ${renderHistoryDateTime(entry.createdAt)}</span>
    <button type="button" class="back-home-button ${teacherHistoryEditMode ? 'is-editing-button' : ''}" data-edit-history-entry>${teacherHistoryEditMode ? 'סיום עריכה' : 'עריכה'}</button>
    ${teacherHistoryEditMode ? `<select class="teacher-sort-select" data-history-semester-edit data-history-id="${entry.id}"><option value="a" ${(entry.payload?.semester || 'a') === 'a' ? 'selected' : ''}>מחצית א׳</option><option value="b" ${entry.payload?.semester === 'b' ? 'selected' : ''}>מחצית ב׳</option></select>` : ''}
    ${teacherHistoryEditMode ? `<button type="button" class="danger-button teacher-history-delete-button" data-delete-history-id="${entry.id}">מחיקת רשומה</button>` : ''}
  `;

  let students = [];
  let subjectLabels = [];
  let rows = '';
  try {
    students = normalizeHistoryStudents(entry);
    subjectLabels = historyEntrySubjectLabels(entry);

    if (!subjectLabels.length) {
      teacherClassHistory.innerHTML = '<p>אין ציונים שמורים ברשומה זו.</p>';
      return;
    }

    rows = students.map((student, studentIndex) => {
      const resultMap = new Map((student.results || [])
        .filter((item) => historyItemResult(item))
        .map((item) => [item.label || item.key, item]));
      const subjectCells = subjectLabels.map((label) => {
        const item = resultMap.get(label);
        const result = historyItemResult(item);
        return `<td class="history-result-cell">${result ? escapeHtml(displayHistoryValue(item.enteredValue || result.matchedValue || '', item)) : ''}</td><td class="history-score-cell">${escapeHtml(result?.score ?? '')}</td>`;
      }).join('');
      return `<tr><td>${escapeHtml(currentStudentNameForHistory(student.studentName, studentIndex))}</td>${subjectCells}</tr>`;
    }).join('');
  } catch (error) {
    console.error('History table render failed', error);
    teacherClassHistory.innerHTML = '<p>לא ניתן להציג את רשומת ההיסטוריה כרגע. נסו לרענן את הדף.</p>';
    return;
  }

  const headers = subjectLabels.map((label) => `<th class="history-subject-header" colspan="2">${escapeHtml(label)}</th>`).join('');
  const subHeaders = subjectLabels.map(() => '<th class="history-result-cell">תוצאה</th><th class="history-score-cell">ציון</th>').join('');
  teacherClassHistory.innerHTML = `
    <div class="teacher-history-results-wrap">
      <table class="teacher-history-results-table">
        <thead>
          <tr><th rowspan="2">תלמיד</th>${headers}</tr>
          <tr>${subHeaders}</tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
  try {
    renderHistoryGraph();
  } catch (error) {
    console.error('History graph render failed', error);
    teacherHistoryGraph.innerHTML = '';
  }
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

  const headers = subjectLabels.map((label) => `<th class="history-subject-header" colspan="2">${escapeHtml(label)}</th>`).join('');
  const subHeaders = subjectLabels.map(() => '<th class="history-result-cell">תוצאה</th><th class="history-score-cell">ציון</th>').join('');
  const rows = studentNames.map((studentName) => {
    const records = studentRecords.get(studentName) || new Map();
    const subjectCells = subjectLabels.map((label) => {
      const record = records.get(label);
      return `<td class="history-result-cell">${escapeHtml(record?.enteredValue ?? '')}</td><td class="history-score-cell">${escapeHtml(record?.result?.score ?? '')}</td>`;
    }).join('');

    return `<tr><td>${escapeHtml(studentName)}</td>${subjectCells}</tr>`;
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
  teacherHistoryGraph.innerHTML = '';
}

function getTeacherHistoryRecordsData() {
  const subjectLabels = [];
  const seenSubjects = new Set();
  const studentRecords = new Map();

  teacherRoster.forEach((student) => {
    studentRecords.set(student.name, new Map());
  });

  teacherHistoryEntries.forEach((entry) => {
    const students = normalizeHistoryStudents(entry);

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
    studentNames: Array.from(studentRecords.keys()),
  };
}

function getHistoryGraphData(subjectLabel = activeHistoryGraphSubject) {
  const subjects = [];
  const seenSubjects = new Set();

  teacherHistoryEntries.forEach((entry) => {
    normalizeHistoryStudents(entry).forEach((student) => {
      (student.results || []).forEach((item) => {
        if (item.result && !seenSubjects.has(item.label)) {
          seenSubjects.add(item.label);
          subjects.push(item.label);
        }
      });
    });
  });

  const selectedSubject = subjects.includes(subjectLabel) ? subjectLabel : subjects[0] || '';
  const studentNames = Array.from(new Set(teacherHistoryEntries.flatMap((entry) => normalizeHistoryStudents(entry).map((student) => student.studentName || '')))).filter(Boolean);
  const relevantHistoryEntries = teacherHistoryEntries.filter((entry) => (
    normalizeHistoryStudents(entry).some((student) => (
      (student.results || []).some((item) => item.label === selectedSubject && item.result)
    ))
  ));
  const entries = relevantHistoryEntries.map((entry) => ({
    date: new Date(entry.createdAt).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: '2-digit' }),
    students: normalizeHistoryStudents(entry),
  }));
  const series = studentNames.map((studentName) => ({
    name: studentName,
    scores: entries.map((entry) => {
      const student = entry.students.find((item) => item.studentName === studentName);
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
  if (teacherHistoryMode === 'records') {
    teacherHistoryGraph.innerHTML = '';
    return;
  }

  if (activeTeacherHistorySemester === 'yearly') {
    teacherHistoryGraph.innerHTML = '';
    return;
  }

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
      ${points.map((point) => (point ? `<g class="history-graph-point" data-tooltip-name="${escapeAttr(student.name)}" data-tooltip-date="${escapeAttr(graphData.entries[point.index].date)}" data-tooltip-subject="${escapeAttr(graphData.selectedSubject)}" data-tooltip-score="${escapeAttr(point.score.score)}" data-tooltip-result="${escapeAttr(point.score.enteredValue)}">${marker(shape, point.x, point.y, color)}</g>` : '')).join('')}
    `;
  }).join('');
  const studentList = graphData.series.map((student, index) => `
    <label class="history-graph-student" style="--student-color: ${colors[index % colors.length]}">
      <span>${escapeHtml(student.name)}</span>
      <input type="checkbox" data-history-graph-student="${escapeAttr(student.name)}" ${visibleHistoryGraphStudents.has(student.name) ? 'checked' : ''} ${readOnly ? 'disabled' : ''} />
    </label>
  `).join('');
  const subjectControl = readOnly
    ? `<strong>${graphData.selectedSubject}</strong>`
    : `<select id="history-graph-subject">${graphData.subjects.map((subject) => `<option value="${escapeAttr(subject)}" ${subject === graphData.selectedSubject ? 'selected' : ''}>${escapeHtml(subject)}</option>`).join('')}</select>`;

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
    <strong>${escapeHtml(point.dataset.tooltipName)}</strong>
    <span>${escapeHtml(point.dataset.tooltipSubject)}</span>
    <span>תאריך: ${escapeHtml(point.dataset.tooltipDate)}</span>
    <span>ציון: ${escapeHtml(point.dataset.tooltipScore)}</span>
    <span>תוצאה: ${escapeHtml(point.dataset.tooltipResult)}</span>
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

  const response = await apiFetch(`/api/teacher/classes/${activeTeacherClassId}/history/${historyId}`, {
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
  const isSchoolAdmin = Boolean(authUser?.isSchoolAdmin);
  adminNavButton.textContent = 'אזור ניהול';
  if (topUserLabel) {
    topUserLabel.textContent = authUser?.email || '';
    topUserLabel.classList.toggle('is-hidden', !authUser?.email);
  }
  adminNavButton.classList.toggle('is-hidden', !isAdmin);
  adminSecurityNavButton?.classList.toggle('is-hidden', !isAdmin);
  adminSecurityAdminTab?.classList.toggle('is-hidden', !isAdmin);
  adminSecurityCurrentTab?.classList.toggle('is-hidden', !isAdmin);
  memberProfileButton.classList.toggle('is-hidden', !authUser);
  memberLogoutButton.classList.toggle('is-hidden', !authUser);
  teacherSchoolAdminSwitchButton?.classList.toggle('is-hidden', !isSchoolAdmin);
}

function currentTeacherClass() {
  return teacherClasses.find((item) => item.id === activeTeacherClassId) || null;
}

function clearTeacherResultState() {
  latestTeacherResults = [];
  if (teacherResultsTable) {
    teacherResultsTable.innerHTML = '';
  }
}

function activeTeacherClassStudentCount() {
  const teacherClass = currentTeacherClass();
  const count = Number(teacherClass?.studentCount ?? studentCountSelect.value);
  return Number.isFinite(count) && count > 0 ? count : 0;
}

function activeTeacherClassRoster() {
  const teacherClass = currentTeacherClass();
  const count = activeTeacherClassStudentCount();
  const roster = Array.isArray(teacherClass?.roster) && teacherClass.roster.length
    ? teacherClass.roster
    : teacherRoster;
  const normalized = roster.slice(0, count);

  while (normalized.length < count) {
    const index = normalized.length;
    normalized.push({
      id: `student-${index + 1}`,
      name: `${activeTeacherStudentLabel()} ${index + 1}`,
    });
  }

  return normalized;
}

function hydrateTeacherRosterFromClass() {
  teacherRoster = activeTeacherClassRoster();
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
  const showAdminSecurity = mode === 'adminSecurity' && authUser?.role === 'admin';
  const showSchoolAdmin = mode === 'schoolAdmin' && authUser?.isSchoolAdmin;
  const showSchoolAdminScoreTables = mode === 'schoolAdminScoreTables' && authUser?.isSchoolAdmin;
  const showTeacherShell = memberMode && authUser?.role === 'teacher' && !showSchoolAdmin;

  memberLoginView.classList.toggle('is-hidden', !showLogin);
  memberSignupView.classList.toggle('is-hidden', !showSignup);
  verifyEmailView?.classList.toggle('is-hidden', mode !== 'verifyEmail');
  adminView.classList.toggle('is-hidden', !showAdmin);
  adminSecurityView?.classList.toggle('is-hidden', !showAdminSecurity);
  adminNavButton?.classList.toggle('is-active', showAdmin);
  adminSecurityNavButton?.classList.toggle('is-active', showAdminSecurity);
  adminSecurityAdminTab?.classList.toggle('is-active', showAdmin);
  adminSecurityCurrentTab?.classList.toggle('is-active', showAdminSecurity);
  adminNavButton?.setAttribute('aria-selected', showAdmin ? 'true' : 'false');
  adminSecurityNavButton?.setAttribute('aria-selected', showAdminSecurity ? 'true' : 'false');
  adminSecurityAdminTab?.setAttribute('aria-selected', showAdmin ? 'true' : 'false');
  adminSecurityCurrentTab?.setAttribute('aria-selected', showAdminSecurity ? 'true' : 'false');
  schoolAdminView?.classList.toggle('is-hidden', !showSchoolAdmin);
  schoolAdminScoreTablesView?.classList.toggle('is-hidden', !showSchoolAdminScoreTables);
  appShell.classList.toggle('is-hidden', mode === 'home' || Boolean(staticViews[mode]) || showLogin || showSignup || showAdmin || showAdminSecurity || showSchoolAdmin || showSchoolAdminScoreTables || (!showTeacherShell && memberMode));
  topControls.classList.toggle('is-hidden', memberMode);
  Object.entries(staticViews).forEach(([key, view]) => {
    if (key === 'login' || key === 'admin' || key === 'adminSecurity' || key === 'schoolAdmin' || key === 'schoolAdminScoreTables') {
      return;
    }

    view.classList.toggle('is-hidden', mode !== key);
  });

  const guestMode = mode === 'guest';
  maleStudentTabButton?.classList.toggle('is-hidden', memberMode);
  femaleStudentTabButton?.classList.toggle('is-hidden', memberMode);
  teacherTabButton.classList.toggle('is-hidden', guestMode || memberMode);
  syncMemberControls();
}

function applyRoute(mode, replace = false) {
  setEntryMode(mode);

  if (mode === 'guest') {
    teacherSubview = 'home';
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
  } else if (mode === 'adminSecurity' && authUser?.role === 'admin') {
    loadAdminSecuritySummary();
    loadAdminSecurityEvents();
  } else if (mode === 'schoolAdmin' && authUser?.isSchoolAdmin) {
    loadSchoolAdminOverview();
  } else if (mode === 'schoolAdminScoreTables' && authUser?.isSchoolAdmin) {
    loadSchoolScoreTables();
  } else if (mode === 'profile' && authUser) {
    fillProfileForm();
  } else if (mode === 'profile') {
    applyRoute('member', true);
    return;
  } else if (mode === 'verifyEmail') {
    verifyEmailFromRoute();
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
  const metrics = sheetMetrics(sheet);
  pendingInvalidScoreWarnings = [];

  return rawStudents.map((student) => {
    const values = { ...(student.values || {}) };

    metrics.forEach((metric) => {
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
  const sheet = selectedSheet();
  const metric = sheet ? sheetMetrics(sheet).find((metricItem) => metricItem.key === item?.key || metricItem.label === item?.label) : null;
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
    <div>תלמיד: ${escapeHtml(warning.studentName)}</div>
    <div>מקצוע: ${escapeHtml(warning.subject)}</div>
    <div>תוצאה לא תקינה: ${escapeHtml(warning.invalidScore)}</div>
    <div>תוקן ל: ${escapeHtml(warning.correctedScore)}</div>
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
  const schoolSheets = schoolScoreTableSheetsForStudent();
  if (activeView === 'teacher') {
    if (activeTeacherSchoolScoreTable) {
      return {
        id: `school_score_${activeTeacherSchoolScoreTable.id}`,
        name: `${schoolScoreGradeLabel(activeTeacherSchoolScoreTable.grade)} ${schoolScoreGenderLabels[activeTeacherSchoolScoreTable.genderGroup]}`,
        table: activeTeacherSchoolScoreTable,
      };
    }
    if (currentTeacherClass()?.schoolId) {
      return null;
    }
  }
  if (activeView.startsWith('student') && schoolSheets.length) {
    return schoolSheets.find((sheet) => sheet.id === sheetSelect.value) || schoolSheets[0];
  }
  if (activeView.startsWith('student') && selectedStudentSchoolScoreSource()) {
    return null;
  }
  if (activeView.startsWith('student')) {
    return null;
  }
  const gender = activeView === 'teacher' ? activeTeacherGender() : activeStudentGender();
  return sheetSets[gender].find((sheet) => sheet.id === sheetSelect.value);
}

function sheetMetrics(sheet = selectedSheet()) {
  if (sheet?.metrics) {
    return sheet.metrics;
  }
  if (sheet?.table?.subjects) {
    return sheet.table.subjects.map((subject) => ({ key: subject.id, label: subject.name }));
  }
  return [];
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
  const count = activeTeacherClassStudentCount() || Number(studentCountSelect.value);
  const teacherClass = currentTeacherClass();

  if (teacherClass && Array.isArray(teacherClass.roster) && teacherClass.roster.length) {
    teacherRoster = activeTeacherClassRoster();
    return;
  }

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
  teacherClassValues = normalizeTeacherClassValues({});
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
    const students = normalizeHistoryStudents(entry);

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
  if (teacherSubview === 'home') {
    setTeacherEditSaveMessage('');
  }

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
      <article class="teacher-class-card${teacherClass.id === activeTeacherClassId ? ' is-active' : ''}" data-open-class-id="${escapeAttr(teacherClass.id)}" ${teacherClassesEditMode ? 'draggable="true"' : ''}>
        <strong>${escapeHtml(teacherClass.name)}</strong>
        <div>שכבה: ${escapeHtml(formatClassName(teacherClass.grade))}</div>
        <div>קבוצה: ${teacherClass.gender === 'female' ? 'בנות' : 'בנים'}</div>
        <div>מספר תלמידים: ${escapeHtml(teacherClass.studentCount)}</div>
        <div class="teacher-class-card-actions">
          ${teacherClassesEditMode ? `
            <button type="button" class="teacher-order-button teacher-drag-handle" data-class-id="${escapeAttr(teacherClass.id)}">גרירה</button>
            <button type="button" class="danger-button teacher-delete-class-button" data-delete-class-id="${escapeAttr(teacherClass.id)}">מחיקת כיתה</button>
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

async function loadTeacherClassIntoWorkspace(teacherClass) {
  activeView = 'teacher';
  const previousTeacherClassId = activeTeacherClassId;
  activeTeacherClassId = teacherClass.id;
  const classId = teacherClass.id;
  if (String(previousTeacherClassId || '') !== String(classId)) {
    clearTeacherResultState();
  }
  activeTeacherGenderValue = teacherClass.gender;
  studentCountSelect.value = String(teacherClass.studentCount);
  const gradeSelectValues = { 7: 'ז', 8: 'ח', 9: 'ט', 10: 'י', 11: 'יא', 12: 'יב' };
  const normalizedClassGrade = normalizeSchoolScoreGradeValue(teacherClass.grade);
  teacherClassGradeSelect.value = gradeSelectValues[normalizedClassGrade] || teacherClass.grade;
  teacherClassNameInput.value = teacherClass.name;
  syncTeacherClassSchoolField(teacherClass.schoolId);
  teacherRoster = teacherClass.roster?.length ? teacherClass.roster.slice(0, teacherClass.studentCount) : createDefaultTeacherRoster(teacherClass.studentCount);
  teacherClass.values = normalizeTeacherClassValues(teacherClass.values || {});
  syncSemesterWorkspaceFromClass();
  teacherEditMode = false;
  activeHistoryGraphSubject = '';
  visibleHistoryGraphStudents = new Set();
  historyGraphSelectionTouched = false;
  teacherHistoryEditMode = false;
  await syncScoreSourceForTeacherClass(teacherClass);
  if (activeTeacherClassId !== classId) {
    return;
  }
  syncTeacherGenderTabs();
  syncSemesterControls();
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
  renderTeacherView();
  await loadTeacherClassHistory(teacherClass.id);
  if (activeTeacherClassId !== classId) {
    return;
  }
  updateTeacherClassSummaryCards();
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
    await loadTeacherClassIntoWorkspace(refreshedClass);
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
    schoolId: teacherClassSchoolSelect?.value || null,
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

  const response = await apiFetch('/api/teacher/classes', {
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
  await loadTeacherClassIntoWorkspace(data.teacherClass);
}

function teacherClassImportErrorMessage(error) {
  const messages = {
    IMPORT_FILE_REQUIRED: 'יש לבחור קובץ Excel.',
    IMPORT_FILE_TOO_LARGE: 'קובץ ה-Excel גדול מדי.',
    IMPORT_READ_FAILED: 'לא ניתן לקרוא את הקובץ.',
    INVALID_SHEET_STRUCTURE: 'מבנה גיליון לא תקין.',
    CLASS_LIMIT_REACHED: 'ניתן ליצור עד 18 כיתות לכל משתמש.',
    SCHOOL_ACCESS_DENIED: 'אין הרשאה ליצור כיתה בבית הספר שנבחר.',
  };
  return messages[error] || 'לא ניתן לייבא כיתות כרגע.';
}

async function importTeacherClassesFromRoster(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  teacherClassFormError.textContent = 'מייבא כיתות מהקובץ...';
  try {
    const params = new URLSearchParams({
      grade: teacherClassGradeSelect.value,
      gender: teacherClassGenderSelect.value,
    });
    if (teacherClassSchoolSelect?.value) {
      params.set('schoolId', teacherClassSchoolSelect.value);
    }

    const response = await apiFetch(`/api/teacher/classes/import?${params.toString()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      body: await file.arrayBuffer(),
    });
    const data = await response.json().catch(() => ({}));
    const skipped = Array.isArray(data.skipped) ? data.skipped : [];
    if (!response.ok) {
      const firstError = skipped[0]?.error || data.error;
      teacherClassFormError.textContent = teacherClassImportErrorMessage(firstError);
      return;
    }

    await refreshTeacherClasses();
    const createdCount = Array.isArray(data.created) ? data.created.length : 0;
    const skippedText = skipped.length ? ` ${skipped.length} גיליונות דולגו.` : '';
    teacherClassFormError.textContent = `יובאו ${createdCount} כיתות.${skippedText}`;
    if (data.created?.[0]) {
      await loadTeacherClassIntoWorkspace(data.created[0]);
    }
  } catch (error) {
    teacherClassFormError.textContent = 'לא ניתן לייבא כיתות כרגע.';
  } finally {
    teacherClassRosterImportInput.value = '';
  }
}

async function saveCurrentTeacherClass(options = {}) {
  if (!activeTeacherClassId) {
    teacherClassFormError.textContent = 'יש לבחור או ליצור כיתה לפני שמירה.';
    return;
  }

  const payload = {
    name: teacherClassNameInput.value.trim() || currentTeacherClass()?.name || 'כיתה ללא שם',
    grade: teacherClassGradeSelect.value,
    gender: activeTeacherGenderValue,
    schoolId: teacherClassSchoolSelect?.value || currentTeacherClass()?.schoolId || null,
    studentCount: Number(studentCountSelect.value),
    roster: teacherRoster,
    values: normalizeTeacherClassValues(teacherClassValues),
  };

  const response = await apiFetch(`/api/teacher/classes/${activeTeacherClassId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    teacherClassFormError.textContent = 'לא ניתן לשמור את הכיתה כרגע.';
    return null;
  }

  const data = await response.json();
  teacherClasses = teacherClasses.map((item) => (item.id === data.teacherClass.id ? data.teacherClass : item));
  teacherClassFormError.textContent = '';
  if (!options.skipWorkspaceReload) {
    await loadTeacherClassIntoWorkspace(data.teacherClass);
  }
  renderTeacherClassList();
  return data.teacherClass;
}

async function saveCurrentTeacherClassQuietly() {
  if (!activeTeacherClassId) {
    return;
  }

  const payload = {
    name: teacherClassNameInput.value.trim() || currentTeacherClass()?.name || 'כיתה ללא שם',
    grade: teacherClassGradeSelect.value,
    gender: activeTeacherGenderValue,
    schoolId: teacherClassSchoolSelect?.value || currentTeacherClass()?.schoolId || null,
    studentCount: Number(studentCountSelect.value),
    roster: teacherRoster,
    values: normalizeTeacherClassValues(teacherClassValues),
  };

  const response = await apiFetch(`/api/teacher/classes/${activeTeacherClassId}`, {
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
  const activeClass = currentTeacherClass();
  if (activeClass) {
    activeClass.values = normalizeTeacherClassValues(data.teacherClass.values || {});
  }
  teacherClassFormError.textContent = '';
}

function renderClassTabs() {
  const schoolSheets = (activeView.startsWith('student') || activeView === 'teacher') ? schoolScoreTableSheetsForStudent() : [];
  const exactTeacherSheet = activeView === 'teacher' ? selectedSheet() : null;
  const sheets = activeView.startsWith('student')
    ? schoolSheets
    : schoolSheets.length ? schoolSheets : sheetSets.male;
  if (exactTeacherSheet?.table && !sheets.some((sheet) => sheet.id === exactTeacherSheet.id)) {
    sheets.unshift(exactTeacherSheet);
  }
  if (sheets.length && !sheets.some((sheet) => sheet.id === sheetSelect.value)) {
    sheetSelect.value = exactTeacherSheet?.id || sheets[0].id;
  }
  sheetSelect.innerHTML = sheets.map((sheet) => `<option value="${escapeAttr(sheet.id)}">${escapeHtml(schoolSheets.length ? sheet.name : formatClassName(sheet.name))}</option>`).join('');
  classTabsContainer.innerHTML = sheets
    .map((sheet) => `
      <button
        type="button"
        class="class-tab${sheet.id === sheetSelect.value ? ' is-active' : ''}"
        data-sheet-id="${escapeAttr(sheet.id)}"
      >${escapeHtml(schoolSheets.length ? sheet.name : formatClassName(sheet.name))}</button>
    `)
    .join('');
}

function renderSchoolScoreMainTable(sheet) {
  const table = sheet.table;
  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th class="school-score-display-grade-header">ציון</th>
          ${table.subjects.map((subject) => `<th>${escapeHtml(subject.name)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${table.rows.map((row) => `
          <tr class="${row.score === 55 ? 'score-55-row' : ''}">
            <td class="school-score-display-grade-cell">${row.score}</td>
            ${table.subjects.map((subject) => `<td>${escapeHtml(row.values?.[subject.id] || '')}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderMainTable(sheet) {
  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          ${sheet.table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${sheet.table.rows.map((row) => `
          <tr class="${String(row[0]).trim() === '55' ? 'score-55-row' : ''}">
            ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderStudentForm() {
  const sheet = selectedSheet();

  if (!sheet) {
    scoreForm.innerHTML = '';
    tableContainer.innerHTML = selectedStudentSchoolScoreSource()
      ? '<p>לא נמצאה טבלת ציונים לבית-הספר, השכבה והקבוצה שנבחרו.</p>'
      : '<p>בחרו בית-ספר, שכבה וקבוצה כדי להציג טבלה.</p>';
    return;
  }

  if (sheet.table && !sheet.metrics) {
    scoreForm.innerHTML = `
      ${sheet.table.subjects.map((subject) => `
        <div class="metric-card">
          <label class="field-label" for="school-${escapeAttr(subject.id)}">${escapeHtml(subject.name)}</label>
          <input id="school-${escapeAttr(subject.id)}" name="${escapeAttr(subject.id)}" />
        </div>
      `).join('')}
      <button type="submit">חשב ציון</button>
    `;
    renderSchoolScoreMainTable(sheet);
    return;
  }

  scoreForm.innerHTML = `
    ${sheet.metrics.map((metric) => `
      <div class="metric-card">
        <label class="field-label" for="${escapeAttr(metric.key)}">${escapeHtml(metric.label)}</label>
        <input id="${escapeAttr(metric.key)}" name="${escapeAttr(metric.key)}" />
        <p class="metric-meta">דוגמה לציון 90: ${escapeHtml(studentExample(metric))}</p>
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
        <strong>${escapeHtml(item.label)}</strong>
        <div>ציון: ${escapeHtml(item.result.score)}</div>
        <div>לפי ערך סף: ${escapeHtml(item.result.matchedValue)}</div>
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
    <span class="admin-name-line">${escapeHtml(user.firstName || user.fullName || '')}</span>
    <span class="admin-name-line">${escapeHtml(user.lastName || '')}</span>
  `;
}

function formatAdminRole(user) {
  if (user.role === 'admin') {
    return 'מנהל';
  }

  return user.isSchoolAdmin ? 'רכז/ת' : 'מורה';
}

function formatAdminPhone(phone) {
  const value = String(phone || '').trim();
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 10) {
    return escapeHtml(value);
  }

  return `<span class="admin-phone-line">${escapeHtml(digits.slice(0, -10))}</span><span class="admin-phone-line">${escapeHtml(digits.slice(-10))}</span>`;
}

function formatAdminEmail(email) {
  const value = String(email || '').trim();
  const atIndex = value.indexOf('@');

  if (atIndex < 0) {
    return escapeHtml(value);
  }

  return `<span class="admin-email-line">${escapeHtml(value.slice(0, atIndex))}</span><span class="admin-email-line">${escapeHtml(value.slice(atIndex))}</span>`;
}

function renderAdminUsersHeader(label, key) {
  if (!key) {
    return `<th>${label}</th>`;
  }

  const isActive = adminUsersSort.key === key;
  const directionLabel = isActive && adminUsersSort.direction === 'desc' ? 'יורד' : 'עולה';
  const marker = isActive ? (adminUsersSort.direction === 'desc' ? '▼' : '▲') : '';

  return `
    <th>
      <button type="button" class="admin-sort-header ${isActive ? 'is-active' : ''}" data-admin-sort-key="${key}" aria-label="מיון לפי ${label}, ${directionLabel}">
        <span>${label}</span>
        ${marker ? `<span class="admin-sort-marker">${marker}</span>` : ''}
      </button>
    </th>
  `;
}

function adminUserSortValue(user, key) {
  const values = {
    status: user.isActive ? 1 : 0,
    name: `${user.firstName || ''} ${user.lastName || ''} ${user.fullName || ''}`,
    email: user.email || '',
    phone: String(user.phone || '').replace(/\D/g, '') || user.phone || '',
    city: user.city || '',
    school: user.schoolName || '',
    role: formatAdminRole(user),
    updatedAt: user.updatedAt || '',
  };

  return values[key] ?? '';
}

function sortAdminUsers(users) {
  if (!adminUsersSort.key) {
    return users;
  }

  const direction = adminUsersSort.direction === 'desc' ? -1 : 1;
  return [...users].sort((a, b) => {
    const valueA = adminUserSortValue(a, adminUsersSort.key);
    const valueB = adminUserSortValue(b, adminUsersSort.key);
    const result = typeof valueA === 'number' && typeof valueB === 'number'
      ? valueA - valueB
      : String(valueA).localeCompare(String(valueB), 'he', { numeric: true, sensitivity: 'base' });

    return result * direction;
  });
}

async function loadSchoolsForSignup() {
  if (!signupSchoolSelect) {
    return;
  }

  const response = await fetch('/api/schools');
  if (!response.ok) {
    signupSchoolSelect.placeholder = 'לא ניתן לטעון בתי ספר';
    return;
  }

  const data = await response.json();
  signupSchools = data.schools || [];
  const schoolOptionsMarkup = signupSchools.map((school) => `<option value="${escapeAttr(`${school.name} - ${school.city}`)}"></option>`).join('');
  const cityOptionsMarkup = Array.from(new Set(signupSchools.map((school) => school.city).filter(Boolean)))
    .map((city) => `<option value="${escapeAttr(city)}"></option>`).join('');
  const schoolNameOptionsMarkup = Array.from(new Set(signupSchools.map((school) => school.name).filter(Boolean)))
    .map((name) => `<option value="${escapeAttr(name)}"></option>`).join('');
  if (signupSchoolOptions) {
    signupSchoolOptions.innerHTML = schoolOptionsMarkup;
  }
  if (signupCityOptions) {
    signupCityOptions.innerHTML = cityOptionsMarkup;
  }
  if (signupAdminSchoolOptions) {
    signupAdminSchoolOptions.innerHTML = schoolNameOptionsMarkup;
  }
}

function syncSelectedSignupSchool() {
  if (!signupSchoolSelect || !signupSchoolIdInput) {
    return;
  }

  const selected = signupSchools.find((school) => `${school.name} - ${school.city}` === signupSchoolSelect.value.trim());
  signupSchoolIdInput.value = selected ? String(selected.id) : '';
}

function syncSignupSchoolFields() {
  const isSchoolAdminSignup = signupAccountType?.value === 'school_admin';
  const hasInvite = Boolean(signupInviteTokenInput?.value);
  signupTeacherSchoolFields?.classList.toggle('is-hidden', isSchoolAdminSignup);
  signupAdminSchoolFields?.classList.toggle('is-hidden', !isSchoolAdminSignup);
  if (signupSchoolNameInput) {
    signupSchoolNameInput.required = isSchoolAdminSignup;
  }
  if (signupSchoolCityInput) {
    signupSchoolCityInput.required = isSchoolAdminSignup;
  }
  if (signupSchoolSelect) {
    signupSchoolSelect.required = !isSchoolAdminSignup && !hasInvite;
  }
}

async function loadSchoolAdminOverview() {
  if (!authUser?.isSchoolAdmin) {
    return;
  }

  if (schoolAdminInviteResult) {
    schoolAdminInviteResult.textContent = '';
  }

  const response = await fetch('/api/school-admin/overview');
  if (!response.ok) {
    schoolAdminSummary.textContent = 'לא ניתן לטעון את אזור ניהול בית הספר כרגע.';
    return;
  }

  const data = await response.json();
  schoolAdminSummary.textContent = `${data.school.name} - ${data.school.city}`;
  schoolAdminTeachers.innerHTML = data.teachers.length ? `
    <div class="school-admin-teacher-cards">
      ${data.teachers.map((teacher) => `
        <article class="school-admin-teacher-card">
          <div class="school-admin-teacher-main">
            <strong>${escapeHtml(teacher.fullName)}</strong>
            <span>${teacher.status === 'approved' ? 'מאושר' : teacher.status === 'rejected' ? 'נדחה' : 'ממתין לאישור'}</span>
            <button type="button" class="back-home-button" data-school-member-edit>עריכה</button>
          </div>
          <div class="school-admin-teacher-details">
            <span>דוא"ל: ${escapeHtml(teacher.email)}</span>
            <span>טלפון: ${escapeHtml(teacher.phone || '-')}</span>
            <span>עיר / רשות: ${escapeHtml(teacher.city || '-')}</span>
          </div>
          <div class="school-admin-teacher-classes">
            <strong>כיתות:</strong>
            ${teacher.classes.length ? teacher.classes.map((item) => `<span>${escapeHtml(item.name)} (${escapeHtml(formatClassName(item.grade))}, ${escapeHtml(item.studentCount)})</span>`).join('') : '<span>-</span>'}
          </div>
          ${teacher.status === 'pending' ? `
            <div class="teacher-entry-actions school-admin-teacher-actions is-hidden">
              <button type="button" class="back-home-button" data-school-member-status="approved" data-school-membership-id="${escapeAttr(teacher.membershipId)}">אישור</button>
              <button type="button" class="danger-button" data-school-member-status="rejected" data-school-membership-id="${escapeAttr(teacher.membershipId)}">דחייה</button>
            </div>
          ` : teacher.status === 'approved' ? `
            <div class="teacher-entry-actions school-admin-teacher-actions is-hidden">
              <button type="button" class="back-home-button" data-school-member-status="rejected" data-school-membership-id="${escapeAttr(teacher.membershipId)}">השעיה</button>
              <button type="button" class="danger-button" data-school-member-remove="true" data-school-membership-id="${escapeAttr(teacher.membershipId)}">הסרה מבית הספר</button>
            </div>
          ` : teacher.status === 'rejected' ? `
            <div class="teacher-entry-actions school-admin-teacher-actions is-hidden">
              <button type="button" class="back-home-button" data-school-member-status="approved" data-school-membership-id="${escapeAttr(teacher.membershipId)}">הפעלה מחדש</button>
              <button type="button" class="danger-button" data-school-member-remove="true" data-school-membership-id="${escapeAttr(teacher.membershipId)}">הסרה מבית הספר</button>
            </div>
          ` : ''}
        </article>
      `).join('')}
    </div>
  ` : '<p>אין עדיין מורים משויכים לבית הספר.</p>';
}

async function createSchoolAdminInvite(event) {
  event.preventDefault();
  schoolAdminInviteResult.textContent = '';
  const payload = Object.fromEntries(new FormData(schoolAdminInviteForm).entries());
  const response = await apiFetch('/api/school-admin/invites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessages = {
      TEACHER_ALREADY_LINKED_PENDING: 'המורה כבר שלח/ה בקשת חיבור לבית הספר וממתין/ה לאישור.',
      TEACHER_ALREADY_LINKED_APPROVED: 'המורה כבר מחובר/ת לבית הספר הזה.',
      TEACHER_ALREADY_LINKED_REJECTED: 'המורה כבר נמצא/ת ברשימת בית הספר במצב מושעה/נדחה. ניתן להפעיל מחדש דרך עריכה ברשימת המורים.',
      INVALID_EMAIL: 'כתובת הדוא"ל להזמנה אינה תקינה.',
    };
    schoolAdminInviteResult.textContent = errorMessages[errorData.error] || 'לא ניתן ליצור הזמנה כרגע. בדקו שהדוא"ל תקין ושהמורה לא כבר מחובר/ת לבית הספר.';
    return;
  }

  const data = await response.json();
  const message = `שלום ${payload.teacherName || ''}, נשלחה אליך הזמנה אישית להצטרף לבית הספר ${data.invite.school.name} ב-EduFitScore. יש להירשם עם הדוא"ל ${data.invite.email}: ${data.inviteUrl}`;
  const whatsappUrl = payload.phone
    ? `https://wa.me/${String(payload.phone).replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;

  schoolAdminInviteResult.innerHTML = `
    <p>הזמנה אישית נוצרה לדוא"ל ${escapeHtml(data.invite.email)}. הקישור תקף ל-14 ימים.</p>
    <p><a class="teacher-panel-button whatsapp-button school-invite-whatsapp" href="${escapeAttr(whatsappUrl)}" target="_blank" rel="noopener">שליחה ב-WhatsApp</a></p>
    <p class="wrap-anywhere">${escapeHtml(data.inviteUrl)}</p>
  `;
  schoolAdminInviteForm.reset();
}

function schoolScoreGradeLabel(grade) {
  return `כיתה ${schoolScoreGradeLabels[Number(grade)] || grade}`;
}

function schoolScoreGradeOptions(start = 1, end = 12, selected = '') {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
    .map((grade) => `<option value="${grade}"${Number(selected) === grade ? ' selected' : ''}>${schoolScoreGradeLabel(grade)}</option>`)
    .join('');
}

function schoolScoreGeneratedRows(startingScore) {
  const start = Math.max(0, Math.min(100, Number(startingScore) || 0));
  const rows = [];
  for (let score = 100; score >= start; score -= 1) {
    rows.push({ score, values: {} });
  }
  if (!rows.some((row) => row.score === 0)) {
    rows.push({ score: 0, values: {} });
  }
  return rows;
}

function normalizeSchoolScoreTable(table) {
  const subjects = Array.isArray(table.subjects) ? table.subjects : [];
  const rows = Array.isArray(table.rows) && table.rows.length ? table.rows : schoolScoreGeneratedRows(table.startingScore);
  return { ...table, subjects, rows };
}

function activeSchoolScoreTable() {
  return schoolScoreTableState.tables.find((table) => table.id === activeSchoolScoreTableId) || null;
}

function renderSchoolScoreTableControls() {
  const { gradeStart, gradeEnd } = schoolScoreTableState.settings;
  if (schoolScoreGradeStartSelect) {
    schoolScoreGradeStartSelect.innerHTML = schoolScoreGradeOptions(1, 12, gradeStart);
  }
  if (schoolScoreGradeEndSelect) {
    schoolScoreGradeEndSelect.innerHTML = schoolScoreGradeOptions(1, 12, gradeEnd);
  }
  if (schoolScoreTableGradeSelect) {
    schoolScoreTableGradeSelect.innerHTML = schoolScoreGradeOptions(gradeStart, gradeEnd, gradeStart);
  }
  syncSchoolScoreCreateAvailability();
}

function selectedSchoolScoreTableCombinationExists() {
  return schoolScoreTableState.tables.some((table) => (
    Number(table.grade) === Number(schoolScoreTableGradeSelect?.value)
      && table.genderGroup === schoolScoreTableGenderSelect?.value
  ));
}

function syncSchoolScoreCreateAvailability() {
  const submitButton = schoolScoreTableCreateForm?.querySelector('button[type="submit"]');
  if (!submitButton) {
    return;
  }
  const exists = selectedSchoolScoreTableCombinationExists();
  submitButton.disabled = exists;
  submitButton.title = exists ? 'כבר קיימת טבלה לשכבה ולקבוצה שנבחרו.' : '';
}

function schoolScoreActualRowCount(table) {
  return (table.rows || []).filter((row) => row.score !== 0).length;
}

function sortedSchoolScoreTables() {
  const field = schoolScoreTableSortField?.value || 'manual';
  const direction = schoolScoreTableSortDirection?.value === 'desc' ? -1 : 1;
  const tables = [...schoolScoreTableState.tables];
  if (field === 'manual') {
    return tables;
  }
  return tables.sort((left, right) => {
    const values = {
      grade: [left.grade, right.grade],
      genderGroup: [schoolScoreGenderLabels[left.genderGroup], schoolScoreGenderLabels[right.genderGroup]],
      subjectCount: [left.subjects.length, right.subjects.length],
    }[field] || [left.grade, right.grade];
    if (typeof values[0] === 'number' && typeof values[1] === 'number') {
      return (values[0] - values[1]) * direction;
    }
    return String(values[0]).localeCompare(String(values[1]), 'he') * direction;
  });
}

function renderSchoolScoreTableCards() {
  if (!schoolScoreTableCards) {
    return;
  }

  schoolScoreTableCards.classList.toggle('teacher-class-list-rows', schoolScoreTableListView === 'list');
  schoolScoreTableCards.classList.toggle('is-editing', schoolScoreTablesEditMode);
  const tables = sortedSchoolScoreTables();
  schoolScoreTableCards.innerHTML = tables.length ? tables.map((table) => `
    <article class="teacher-class-card score-table-card${table.id === activeSchoolScoreTableId ? ' is-active' : ''}" data-school-score-table-id="${escapeAttr(table.id)}">
      <strong>${escapeHtml(schoolScoreGradeLabel(table.grade))} ${escapeHtml(schoolScoreGenderLabels[table.genderGroup])}</strong>
      <div>ציון התחלה: ${escapeHtml(table.startingScore)}</div>
      <div>מקצועות: ${escapeHtml(table.subjects.length)}</div>
      <div class="teacher-class-card-actions">
        <button type="button" class="back-home-button" data-open-school-score-table="${escapeAttr(table.id)}">פתיחה / עריכה</button>
        ${schoolScoreTablesEditMode ? `<button type="button" class="danger-button" data-delete-school-score-table-card="${escapeAttr(table.id)}">מחיקה</button>` : ''}
      </div>
    </article>
  `).join('') : '<p>עדיין אין טבלאות ציונים לבית הספר.</p>';
}

function renderSchoolScoreTableGrid() {
  const table = activeSchoolScoreTable();
  if (!schoolScoreTableGrid || !table) {
    if (schoolScoreTableGrid) {
      schoolScoreTableGrid.innerHTML = '';
    }
    return;
  }

  const subjects = table.subjects.length ? table.subjects : [{ id: 'subject-1', name: '' }];
  table.subjects = subjects;
  table.rows = table.rows.length ? table.rows : schoolScoreGeneratedRows(table.startingScore);
  schoolScoreTableBuilderTitle.textContent = `${schoolScoreGradeLabel(table.grade)} ${schoolScoreGenderLabels[table.genderGroup]}`;
  schoolScoreTableGrid.innerHTML = `
    <table class="school-score-edit-table">
      <thead>
        <tr>
          ${subjects.map((subject, index) => `
            <th>
              <input class="score-table-subject-input" data-score-subject-index="${escapeAttr(index)}" value="${escapeAttr(subject.name || '')}" placeholder="שם מקצוע" />
            </th>
          `).join('')}
          <th class="score-table-add-subject-header"><button id="school-score-table-add-subject" type="button" class="score-table-add-subject-button" aria-label="הוספת מקצוע">+</button></th>
          <th class="score-table-grade-header">ציון</th>
        </tr>
      </thead>
      <tbody>
        ${table.rows.map((row) => `
          <tr>
            ${subjects.map((subject) => `
              <td>
                <div class="score-table-cell-input" data-score-row="${escapeAttr(row.score)}" data-score-subject-id="${escapeAttr(subject.id)}" contenteditable="${row.score === 0 ? 'false' : 'true'}">${escapeHtml(row.values?.[subject.id] || (row.score === 0 ? '0' : ''))}</div>
              </td>
            `).join('')}
            <td class="score-table-add-subject-filler"></td>
            <th class="score-table-grade-cell">${escapeHtml(row.score)}</th>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderSchoolScoreTables() {
  if (schoolScoreTableSummary) {
    schoolScoreTableSummary.textContent = schoolScoreTableState.school ? `${schoolScoreTableState.school.name} - ${schoolScoreTableState.school.city}` : '';
  }
  if (schoolScoreTableViewToggleButton) {
    schoolScoreTableViewToggleButton.textContent = 'תצוגה';
  }
  schoolScoreTableEditButton?.classList.toggle('is-editing-button', schoolScoreTablesEditMode);
  if (schoolScoreTableEditButton) {
    schoolScoreTableEditButton.textContent = schoolScoreTablesEditMode ? 'סיום עריכה' : 'עריכה';
  }
  schoolScoreTableRangeForm?.classList.toggle('is-hidden', !schoolScoreTablesEditMode);
  renderSchoolScoreTableControls();
  renderSchoolScoreTableCards();
  renderSchoolScoreTableGrid();
}

async function loadSchoolScoreTables() {
  if (!authUser?.isSchoolAdmin) {
    return;
  }
  const response = await fetch('/api/school-admin/score-tables');
  if (!response.ok) {
    schoolScoreTableMessage.textContent = 'לא ניתן לטעון טבלאות ציונים כרגע.';
    return;
  }
  const data = await response.json();
  schoolScoreTableState = {
    school: data.school,
    settings: data.settings || { gradeStart: 1, gradeEnd: 6 },
    tables: (data.tables || []).map(normalizeSchoolScoreTable),
  };
  if (activeSchoolScoreTableId && !activeSchoolScoreTable()) {
    activeSchoolScoreTableId = null;
  }
  renderSchoolScoreTables();
}

async function saveSchoolScoreTableSettings(event) {
  event.preventDefault();
  schoolScoreTableMessage.textContent = '';
  const response = await apiFetch('/api/school-admin/score-table-settings', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gradeStart: schoolScoreGradeStartSelect.value, gradeEnd: schoolScoreGradeEndSelect.value }),
  });
  if (!response.ok) {
    schoolScoreTableMessage.textContent = 'טווח השכבות לא תקין.';
    return;
  }
  const data = await response.json();
  schoolScoreTableState.settings = data.settings;
  schoolScoreTableRangeForm.classList.add('is-hidden');
  renderSchoolScoreTables();
}

async function createSchoolScoreTable(event) {
  event.preventDefault();
  schoolScoreTableMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(schoolScoreTableCreateForm).entries());
  const response = await apiFetch('/api/school-admin/score-tables', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const messages = {
      SCORE_TABLE_EXISTS: 'כבר קיימת טבלה לשכבה ולקבוצה שנבחרו.',
      SCORE_TABLE_LIMIT_REACHED: 'ניתן ליצור עד 36 טבלאות ציונים לבית ספר.',
      GRADE_OUT_OF_RANGE: 'השכבה מחוץ לטווח שהוגדר לבית הספר.',
      INVALID_STARTING_SCORE: 'ציון ההתחלה חייב להיות מספר שלם בין 0 ל-100.',
    };
    schoolScoreTableMessage.textContent = messages[errorData.error] || 'לא ניתן ליצור טבלה כרגע.';
    return;
  }
  const data = await response.json();
  const table = normalizeSchoolScoreTable(data.table);
  schoolScoreTableState.tables.push(table);
  activeSchoolScoreTableId = table.id;
  schoolScoreTableCreatePanel.classList.add('is-hidden');
  schoolScoreTableBuilder.classList.remove('is-hidden');
  renderSchoolScoreTables();
}

async function importSchoolScoreTables(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  schoolScoreTableMessage.textContent = 'מייבא טבלאות מהקובץ...';
  try {
    const response = await apiFetch('/api/school-admin/score-tables/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      body: await file.arrayBuffer(),
    });
    const data = await response.json().catch(() => ({}));
    const createdCount = Array.isArray(data.created) ? data.created.length : 0;
    const skippedCount = Array.isArray(data.skipped) ? data.skipped.length : 0;

    if (!response.ok && !createdCount) {
      schoolScoreTableMessage.textContent = schoolScoreImportErrorMessage(data);
      return;
    }

    await loadSchoolScoreTables();
    schoolScoreTableCreatePanel.classList.add('is-hidden');
    activeSchoolScoreTableId = null;
    schoolScoreTableBuilder.classList.add('is-hidden');
    const skippedReasons = Array.isArray(data.skipped)
      ? [...new Set(data.skipped.map((item) => item.error).filter(Boolean))]
      : [];
    const reasonLabels = {
      SCORE_TABLE_EXISTS: 'טבלאות שכבר קיימות',
      GRADE_OUT_OF_RANGE: 'שכבות מחוץ לטווח שהוגדר לבית הספר',
      INVALID_SHEET_STRUCTURE: 'גיליונות במבנה לא תקין',
      INVALID_GRADE: 'שכבות לא תקינות',
      INVALID_GENDER_GROUP: 'קבוצות לא תקינות',
      SCORE_TABLE_LIMIT_REACHED: 'חריגה ממגבלת 36 טבלאות',
    };
    const reasonText = skippedReasons.map((reason) => reasonLabels[reason] || reason).join(', ');
    schoolScoreTableMessage.textContent = skippedCount
      ? `יובאו ${createdCount} טבלאות. ${skippedCount} גיליונות דולגו${reasonText ? `: ${reasonText}.` : '.'}`
      : `יובאו ${createdCount} טבלאות בהצלחה.`;
  } catch (error) {
    schoolScoreTableMessage.textContent = schoolScoreImportErrorMessage();
  } finally {
    schoolScoreTableImportInput.value = '';
  }
}

function schoolScoreImportErrorMessage(data = {}) {
  const reasonLabels = {
    IMPORT_FILE_REQUIRED: 'לא נבחר קובץ לייבוא.',
    IMPORT_FILE_TOO_LARGE: 'הקובץ גדול מדי. נסו קובץ עד 5MB.',
    IMPORT_READ_FAILED: 'לא ניתן לקרוא את הקובץ.',
    IMPORT_FAILED: 'ייבוא הקובץ נכשל.',
    SCORE_TABLE_EXISTS: 'כבר קיימת טבלה לאותה שכבה וקבוצה',
    GRADE_OUT_OF_RANGE: 'השכבה מחוץ לטווח שהוגדר לבית הספר',
    INVALID_SHEET_STRUCTURE: 'מבנה הגיליון לא תקין',
    INVALID_GRADE: 'שכבה לא תקינה',
    INVALID_GENDER_GROUP: 'קבוצה לא תקינה',
    SCORE_TABLE_LIMIT_REACHED: 'חריגה ממגבלת 36 טבלאות',
  };
  const skipped = Array.isArray(data.skipped) ? data.skipped : [];
  if (skipped.length) {
    const details = skipped.slice(0, 4).map((item) => {
      const sheetName = item.sheetName ? `"${item.sheetName}"` : 'גיליון ללא שם';
      return `${sheetName}: ${reasonLabels[item.error] || item.error || 'שגיאה לא ידועה'}`;
    }).join('; ');
    const extra = skipped.length > 4 ? ` ועוד ${skipped.length - 4} גיליונות.` : '';
    return `ייבוא הקובץ נכשל. ${details}${extra}`;
  }
  return reasonLabels[data.error] || 'ייבוא הקובץ נכשל. ודאו שזה קובץ Excel במבנה התבנית: שכבה, קבוצה, ציון התחלתי, שורת ציון ומקצועות.';
}

function syncActiveSchoolScoreTableFromGrid() {
  const table = activeSchoolScoreTable();
  if (!table || !schoolScoreTableGrid) {
    return null;
  }
  const subjects = Array.from(schoolScoreTableGrid.querySelectorAll('[data-score-subject-index]')).map((input, index) => ({
    id: table.subjects[index]?.id || `subject-${index + 1}`,
    name: input.value.trim(),
  })).filter((subject) => subject.name);
  table.subjects = subjects;
  table.rows = schoolScoreGeneratedRows(table.startingScore).map((row) => {
    const values = {};
    subjects.forEach((subject) => {
      const input = schoolScoreTableGrid.querySelector(`[data-score-row="${row.score}"][data-score-subject-id="${subject.id}"]`);
      values[subject.id] = row.score === 0 ? '0' : String(input?.textContent || input?.value || '').trim();
    });
    return { score: row.score, values };
  });
  return table;
}

function addSchoolScoreTableSubject() {
  const table = syncActiveSchoolScoreTableFromGrid();
  if (!table) {
    return;
  }
  const nextIndex = table.subjects.length + 1;
  table.subjects.push({ id: `subject-${nextIndex}`, name: '' });
  renderSchoolScoreTableGrid();
  const inputs = schoolScoreTableGrid.querySelectorAll('[data-score-subject-index]');
  inputs[inputs.length - 1]?.focus();
}

function moveSchoolScoreTableFocusDown(input) {
  const subjectId = input.dataset.scoreSubjectId;
  const inputs = Array.from(schoolScoreTableGrid.querySelectorAll(`[data-score-subject-id="${subjectId}"]`));
  const currentIndex = inputs.indexOf(input);
  const nextInput = inputs[currentIndex + 1];
  if (nextInput) {
    nextInput.focus();
    if (typeof nextInput.select === 'function') {
      nextInput.select();
    } else {
      const range = document.createRange();
      range.selectNodeContents(nextInput);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

function handleSchoolScoreTablePaste(event) {
  const input = event.target.closest('[data-score-row][data-score-subject-id]');
  if (!input) {
    return;
  }
  const text = event.clipboardData?.getData('text') || '';
  if (!text.includes('\n') && !text.includes('\t')) {
    return;
  }
  event.preventDefault();
  const rows = parseClipboardGrid(text);
  const tableRows = Array.from(schoolScoreTableGrid.querySelectorAll('tbody tr'));
  const startRow = tableRows.indexOf(input.closest('tr'));
  const subjectId = input.dataset.scoreSubjectId;
  const isSingleColumnPaste = rows.every((row) => row.length <= 1);

  if (isSingleColumnPaste) {
    const values = rows.map((row) => row[0] || '').filter(Boolean);
    tableRows.slice(startRow, startRow + values.length).forEach((targetRow, index) => {
      const targetInput = targetRow.querySelector(`[data-score-row][data-score-subject-id="${subjectId}"]`);
      if (targetInput && targetInput.contentEditable !== 'false') {
        targetInput.textContent = values[index].trim();
      }
    });
    syncActiveSchoolScoreTableFromGrid();
    return;
  }

  rows.forEach((row, rowOffset) => {
    const targetRow = tableRows[startRow + rowOffset];
    if (!targetRow) {
      return;
    }
    const visualCells = Array.from(targetRow.querySelectorAll('[data-score-row][data-score-subject-id]'))
      .sort((left, right) => right.getBoundingClientRect().left - left.getBoundingClientRect().left);
    const startColumn = visualCells.findIndex((cell) => cell.dataset.scoreSubjectId === subjectId);
    if (startColumn === -1) {
      return;
    }

    row.forEach((value, columnOffset) => {
      const targetInput = visualCells[startColumn + columnOffset];
      if (targetInput && targetInput.contentEditable !== 'false') {
        targetInput.textContent = value.trim();
      }
    });
  });
  syncActiveSchoolScoreTableFromGrid();
}

async function copySchoolScoreTableSelection(button) {
  syncActiveSchoolScoreTableFromGrid();
  const table = activeSchoolScoreTable();
  if (!table || !navigator.clipboard) {
    return;
  }
  if (button.dataset.copyScoreColumn) {
    const subject = table.subjects.find((item) => item.id === button.dataset.copyScoreColumn);
    const lines = [subject?.name || '', ...table.rows.map((row) => row.values?.[button.dataset.copyScoreColumn] || '')];
    await navigator.clipboard.writeText(lines.join('\n'));
    schoolScoreTableMessage.textContent = 'העמודה הועתקה.';
    return;
  }
  if (button.dataset.copyScoreRow) {
    const row = table.rows.find((item) => Number(item.score) === Number(button.dataset.copyScoreRow));
    const values = [row?.score || '', ...table.subjects.map((subject) => row?.values?.[subject.id] || '')];
    await navigator.clipboard.writeText(values.join('\t'));
    schoolScoreTableMessage.textContent = 'השורה הועתקה.';
  }
}

async function saveActiveSchoolScoreTable() {
  const table = syncActiveSchoolScoreTableFromGrid();
  if (!table) {
    return;
  }
  schoolScoreTableSaveButton.textContent = 'שומר...';
  schoolScoreTableSaveButton.disabled = true;
  const response = await apiFetch(`/api/school-admin/score-tables/${table.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startingScore: table.startingScore, subjects: table.subjects, rows: table.rows }),
  });
  schoolScoreTableSaveButton.textContent = 'שמירה';
  schoolScoreTableSaveButton.disabled = false;
  if (!response.ok) {
    schoolScoreTableMessage.textContent = 'לא ניתן לשמור את הטבלה כרגע.';
    return;
  }
  const data = await response.json();
  schoolScoreTableState.tables = schoolScoreTableState.tables.map((item) => (item.id === data.table.id ? normalizeSchoolScoreTable(data.table) : item));
  schoolScoreTableMessage.textContent = 'הטבלה נשמרה.';
  renderSchoolScoreTables();
}

async function deleteActiveSchoolScoreTable() {
  const table = activeSchoolScoreTable();
  if (!table || !window.confirm(`למחוק את ${schoolScoreGradeLabel(table.grade)} ${schoolScoreGenderLabels[table.genderGroup]}?`)) {
    return;
  }
  const response = await apiFetch(`/api/school-admin/score-tables/${table.id}`, { method: 'DELETE' });
  if (!response.ok) {
    schoolScoreTableMessage.textContent = 'לא ניתן למחוק את הטבלה כרגע.';
    return;
  }
  schoolScoreTableState.tables = schoolScoreTableState.tables.filter((item) => item.id !== table.id);
  activeSchoolScoreTableId = null;
  schoolScoreTableBuilder.classList.add('is-hidden');
  renderSchoolScoreTables();
}

async function loadAdminOverview() {
  if (!authUser || authUser.role !== 'admin') {
    return;
  }

  const response = await fetch('/api/admin/overview');

  if (!response.ok) {
    if (adminSummary) {
      adminSummary.textContent = 'לא ניתן לטעון את אזור הניהול כעת.';
    }
    return;
  }

  const data = await response.json();
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
    <div class="teacher-summary-card">שחזור אחרון: ${diagnostics.latestRestore ? new Date(diagnostics.latestRestore).toLocaleString('he-IL') : '-'}</div>
  `;
}

async function loadAdminTwoFactorStatus() {
  const response = await fetch('/api/auth/2fa/status');
  if (!response.ok) {
    adminTwoFactorStatus.textContent = 'לא ניתן לטעון מצב אימות דו-שלבי.';
    return;
  }
  const data = await response.json();
  renderAdminTwoFactorStatus(data);
}

function renderAdminTwoFactorStatus(data) {
  const enabled = Boolean(data.enabled);
  const bypassed = Boolean(data.bypassed);
  adminTwoFactorStatus.innerHTML = enabled
    ? `<p><strong>אימות דו-שלבי פעיל.</strong> קודי שחזור זמינים: ${Number(data.recoveryCodeCount || 0)}.</p>${bypassed ? '<p class="login-error">אזהרה: מעקף חירום DISABLE_ADMIN_2FA פעיל ולכן הכניסה לא תבקש קוד.</p>' : ''}`
    : '<p><strong>אימות דו-שלבי כבוי.</strong> מומלץ להפעיל עבור חשבון מנהל גלובלי.</p>';
  adminTwoFactorStartForm.classList.toggle('is-hidden', enabled);
  adminTwoFactorDisableForm.classList.toggle('is-hidden', !enabled);
  adminTwoFactorRecoveryManagement.classList.toggle('is-hidden', !enabled);
  adminTwoFactorSetup.classList.add('is-hidden');
  if (!enabled) {
    adminTwoFactorRecovery.classList.add('is-hidden');
    adminTwoFactorRecovery.innerHTML = '';
  }
}

async function startAdminTwoFactorSetup(event) {
  event.preventDefault();
  adminTwoFactorMessage.textContent = '';
  adminTwoFactorRecovery.classList.add('is-hidden');
  const payload = Object.fromEntries(new FormData(adminTwoFactorStartForm).entries());
  const response = await apiFetch('/api/auth/2fa/setup/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    adminTwoFactorMessage.textContent = response.status === 403 ? 'סיסמת המנהל שגויה.' : 'לא ניתן להתחיל הפעלת אימות דו-שלבי.';
    return;
  }
  const data = await response.json();
  adminTwoFactorQr.src = data.qrCodeDataUrl;
  adminTwoFactorSecret.textContent = data.secret;
  adminTwoFactorSetup.classList.remove('is-hidden');
  adminTwoFactorStartForm.reset();
  adminTwoFactorMessage.textContent = 'סרקו את הקוד ואז הזינו קוד חד-פעמי לאישור.';
}

async function verifyAdminTwoFactorSetup(event) {
  event.preventDefault();
  adminTwoFactorMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(adminTwoFactorVerifyForm).entries());
  const response = await apiFetch('/api/auth/2fa/setup/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    adminTwoFactorMessage.textContent = 'קוד האימות שגוי. ודאו שהשעה במכשיר מעודכנת ונסו שוב.';
    return;
  }
  const data = await response.json();
  adminTwoFactorSetup.classList.add('is-hidden');
  adminTwoFactorVerifyForm.reset();
  adminTwoFactorRecovery.classList.remove('is-hidden');
  adminTwoFactorRecovery.innerHTML = `
    <p><strong>שמרו את קודי השחזור עכשיו.</strong> כל קוד עובד פעם אחת בלבד ולא יוצג שוב.</p>
    <div class="admin-2fa-code-grid">${data.recoveryCodes.map((code) => `<code>${escapeHtml(code)}</code>`).join('')}</div>
  `;
  adminTwoFactorMessage.textContent = 'אימות דו-שלבי הופעל.';
  renderAdminTwoFactorStatus({ enabled: true, recoveryCodeCount: data.recoveryCodes.length });
  adminTwoFactorRecovery.classList.remove('is-hidden');
  await loadAdminAuditLog();
}

function openAdminTwoFactorRegenerateModal() {
  adminTwoFactorRegenerateError.textContent = '';
  adminTwoFactorRegenerateForm.reset();
  adminTwoFactorRegenerateModal.classList.remove('is-hidden');
  adminTwoFactorRegenerateModal.setAttribute('aria-hidden', 'false');
}

function closeAdminTwoFactorRegenerateModal() {
  adminTwoFactorRegenerateForm.reset();
  adminTwoFactorRegenerateError.textContent = '';
  adminTwoFactorRegenerateModal.classList.add('is-hidden');
  adminTwoFactorRegenerateModal.setAttribute('aria-hidden', 'true');
}

async function requestAdminTwoFactorRecoveryRegeneration(event) {
  event.preventDefault();
  adminTwoFactorRegenerateError.textContent = '';
  adminTwoFactorMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(adminTwoFactorRegenerateForm).entries());
  const submitButton = event.submitter;
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await apiFetch('/api/auth/2fa/recovery/regenerate/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      adminTwoFactorRegenerateError.textContent = data.error === 'INVALID_ADMIN_PASSWORD'
        ? 'סיסמת המנהל שגויה.'
        : data.error === 'TWO_FACTOR_INVALID'
          ? 'קוד האימות שגוי.'
          : data.error === 'EMAIL_NOT_SENT'
            ? 'לא ניתן לשלוח דוא"ל אישור כרגע.'
            : 'לא ניתן לשלוח קישור אישור כרגע.';
      return;
    }
    const data = await response.json();
    closeAdminTwoFactorRegenerateModal();
    adminTwoFactorMessage.textContent = `נשלח קישור אישור לדוא"ל המנהל${data.email ? ` (${data.email})` : ''}. הקישור תקף לזמן קצר.`;
    await loadAdminAuditLog();
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function currentTwoFactorRecoveryRegenerationToken() {
  const tokenFromQuery = new URLSearchParams(window.location.search).get('twoFactorRecoveryToken');
  if (tokenFromQuery) {
    return tokenFromQuery;
  }

  const hash = window.location.hash || '';
  const queryIndex = hash.indexOf('?');
  if (queryIndex === -1) {
    return '';
  }
  return new URLSearchParams(hash.slice(queryIndex + 1)).get('twoFactorRecoveryToken') || '';
}

async function confirmAdminTwoFactorRecoveryRegeneration() {
  if (!authUser || authUser.role !== 'admin' || currentEntryMode !== 'profile') {
    return;
  }
  const token = currentTwoFactorRecoveryRegenerationToken();
  if (!token) {
    return;
  }

  adminTwoFactorMessage.textContent = 'מאשרים יצירת קודי שחזור חדשים...';
  const response = await apiFetch('/api/auth/2fa/recovery/regenerate/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  const url = new URL(window.location.href);
  url.searchParams.delete('twoFactorRecoveryToken');
  window.history.replaceState({ mode: 'profile' }, '', `${url.pathname}${url.search}#profile`);

  if (!response.ok) {
    adminTwoFactorMessage.textContent = 'קישור האישור לא תקף או שפג תוקפו.';
    return;
  }

  const data = await response.json();
  adminTwoFactorRecovery.classList.remove('is-hidden');
  adminTwoFactorRecovery.innerHTML = `
    <p><strong>קודי שחזור חדשים נוצרו.</strong> שמרו אותם עכשיו. לא ניתן יהיה לראות אותם שוב.</p>
    <div class="admin-2fa-code-grid">${data.recoveryCodes.map((code) => `<code>${escapeHtml(code)}</code>`).join('')}</div>
  `;
  adminTwoFactorMessage.textContent = 'קודי השחזור החדשים פעילים. הקודים הישנים אינם תקפים יותר.';
  await loadAdminTwoFactorStatus();
  await loadAdminAuditLog();
}

async function disableAdminTwoFactor(event) {
  event.preventDefault();
  adminTwoFactorMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(adminTwoFactorDisableForm).entries());
  const response = await apiFetch('/api/auth/2fa/disable', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    adminTwoFactorMessage.textContent = response.status === 403 ? 'סיסמת המנהל שגויה.' : 'קוד האימות שגוי או שלא ניתן לכבות כרגע.';
    return;
  }
  adminTwoFactorDisableForm.reset();
  adminTwoFactorMessage.textContent = 'אימות דו-שלבי כובה.';
  await loadAdminTwoFactorStatus();
  await loadAdminAuditLog();
}

async function loadAdminUsers() {
  const response = await fetch('/api/admin/users');

  if (!response.ok) {
    adminAllUsers.innerHTML = '<p>לא ניתן לטעון פרופילים.</p>';
    return;
  }

  const data = await response.json();
  const users = sortAdminUsers(data.users);
  adminAllUsers.innerHTML = users.length ? `
    <table class="admin-users-table compact-admin-users-table">
      <thead>
        <tr>
          ${renderAdminUsersHeader('סטטוס', 'status')}
          ${renderAdminUsersHeader('פעולות', '')}
          ${renderAdminUsersHeader('שם', 'name')}
          ${renderAdminUsersHeader('דוא"ל', 'email')}
          ${renderAdminUsersHeader('טלפון', 'phone')}
          ${renderAdminUsersHeader('עיר', 'city')}
          ${renderAdminUsersHeader('בית ספר', 'school')}
          ${renderAdminUsersHeader('תפקיד', 'role')}
          ${renderAdminUsersHeader('עדכון', 'updatedAt')}
        </tr>
      </thead>
      <tbody>
        ${users.map((user) => `
          <tr>
            <td>${user.isActive ? 'פעיל' : 'מושבת'}</td>
            <td class="admin-actions-cell">
              <div class="admin-actions-stack">
              <button
                type="button"
                class="status-toggle ${user.isActive ? 'is-active' : ''}"
                data-status-user-id="${escapeAttr(user.id)}"
                data-status-user-name="${escapeAttr(user.fullName || user.email)}"
                data-status-user-active="${user.isActive ? 'true' : 'false'}"
              >
                <span class="status-toggle-knob"></span>
                <span class="status-toggle-text">${user.isActive ? 'השבתה' : 'הפעלה'}</span>
              </button>
              <button type="button" class="back-home-button admin-password-button" data-reset-password-user-id="${escapeAttr(user.id)}" data-reset-password-user-name="${escapeAttr(user.fullName || user.email)}">איפוס סיסמה</button>
              ${user.isActive ? '' : `<button type="button" class="danger-button admin-permanent-delete-button" data-permanent-delete-user-id="${escapeAttr(user.id)}" data-permanent-delete-user-name="${escapeAttr(user.fullName || user.email)}">מחיקה</button>`}
              </div>
            </td>
            <td class="admin-name-cell">${formatAdminName(user)}</td>
            <td class="admin-email-cell">${formatAdminEmail(user.email)}</td>
            <td class="admin-phone-cell">${formatAdminPhone(user.phone)}</td>
            <td>${escapeHtml(user.city || '')}</td>
            <td>${escapeHtml(user.schoolName || '')}</td>
            <td>${formatAdminRole(user)}</td>
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

async function loadAdminSecurityEvents() {
  if (!adminSecurityEvents) return;
  const response = await fetch('/api/admin/security-events');
  if (!response.ok) {
    adminSecurityEvents.innerHTML = '<p>לא ניתן לטעון אירועי אבטחה.</p>';
    return;
  }
  const data = await response.json();
  renderSecurityEvents(data.entries || []);
}

async function loadAdminSecuritySummary() {
  if (!adminSecuritySummary) return;
  const response = await fetch('/api/admin/security-summary');
  if (!response.ok) {
    adminSecuritySummary.innerHTML = '<p>לא ניתן לטעון מצב אבטחה.</p>';
    return;
  }
  const data = await response.json();
  renderAdminSecuritySummary(data);
}

function latestSecurityDate(entry) {
  return entry?.createdAt ? formatAdminDateTime(entry.createdAt) : '-';
}

function formatTimeoutMinutes(minutes) {
  const value = Number(minutes || 0);
  if (!value) return '-';
  if (value % 1440 === 0) return `${value / 1440} ימים`;
  if (value % 60 === 0) return `${value / 60} שעות`;
  return `${value} דק׳`;
}

function renderAdminSecuritySummary(summary) {
  const twoFactorText = summary.twoFactor?.enabled
    ? `פעיל (${Number(summary.twoFactor.recoveryCodeCount || 0)} קודי שחזור)`
    : 'כבוי';
  adminSecuritySummary.innerHTML = `
    <div class="admin-security-summary-card"><strong>אימות דו-שלבי</strong><span>${escapeHtml(twoFactorText)}${summary.twoFactor?.bypassed ? ' - מעקף חירום פעיל' : ''}</span></div>
    <div class="admin-security-summary-card"><strong>סשנים פעילים</strong><span>${Number(summary.sessions?.activeCount || 0)}</span></div>
    <div class="admin-security-summary-card"><strong>חוסר פעילות</strong><span>מנהל ${formatTimeoutMinutes(summary.idleTimeout?.adminMinutes)} / משתמש ${formatTimeoutMinutes(summary.idleTimeout?.userMinutes)}</span></div>
    <div class="admin-security-summary-card"><strong>אימות מחדש</strong><span>${Number(summary.reauth?.windowMinutes || 0)} דקות</span></div>
    <div class="admin-security-summary-card"><strong>כניסה כושלת אחרונה</strong><span>${latestSecurityDate(summary.latest?.failedAdminLogin)}</span></div>
    <div class="admin-security-summary-card"><strong>גיבוי אחרון</strong><span>${latestSecurityDate(summary.latest?.backupExport)}</span></div>
    <div class="admin-security-summary-card"><strong>ייצוא יומן אבטחה</strong><span>${latestSecurityDate(summary.latest?.securityLogExport)}</span></div>
    <div class="admin-security-summary-card"><strong>שינוי סיסמה אחרון</strong><span>${latestSecurityDate(summary.latest?.passwordChange)}</span></div>
  `;
}

function renderSecurityEvents(entries) {
  const actionLabels = {
    admin_login_failed: 'כניסת מנהל נכשלה',
    admin_login_alert_sent: 'התראת כניסת מנהל נשלחה',
    admin_login_alert_failed: 'התראת כניסת מנהל נכשלה',
    admin_reauth_success: 'אימות מנהל לפעולה רגישה',
    admin_2fa_login_failed: 'אימות דו-שלבי נכשל',
    admin_2fa_recovery_code_used: 'שימוש בקוד שחזור',
    admin_2fa_enabled: 'אימות דו-שלבי הופעל',
    admin_2fa_disabled: 'אימות דו-שלבי כובה',
    admin_2fa_disable_failed: 'כיבוי אימות נכשל',
    admin_2fa_recovery_regenerate_requested: 'בקשה לקודי שחזור חדשים',
    admin_2fa_recovery_regenerate_confirmed: 'יצירת קודי שחזור חדשים',
    admin_2fa_recovery_regenerate_failed: 'בקשת קודי שחזור נכשלה',
    admin_2fa_recovery_regenerate_confirm_failed: 'אישור קודי שחזור נכשל',
    password_change: 'שינוי סיסמה',
    reset_password: 'איפוס סיסמה',
    reset_password_failed: 'איפוס סיסמה נכשל',
    export_backup: 'הורדת גיבוי',
    export_backup_notification_failed: 'התראת הורדת גיבוי נכשלה',
    restore_backup: 'ייבוא גיבוי',
    restore_backup_failed: 'ייבוא גיבוי נכשל',
    permanent_delete_user: 'מחיקת משתמש',
    permanent_delete_user_failed: 'מחיקת משתמש נכשלה',
    logout_other_sessions: 'ניתוק מכשירים אחרים',
    logout_other_sessions_after_password_change: 'ניתוק מכשירים לאחר שינוי סיסמה',
    export_security_log: 'ייצוא יומן אבטחה',
    export_security_log_failed: 'ייצוא יומן אבטחה נכשל',
    session_idle_timeout: 'ניתוק עקב חוסר פעילות',
  };
  adminSecurityEvents.innerHTML = entries.length ? `
    <table class="admin-audit-table">
      <thead><tr><th>תאריך</th><th>פעולה</th><th>משתמש</th><th>IP</th><th>סיבה</th><th>דפדפן</th></tr></thead>
      <tbody>${entries.map((entry) => {
        const userAgent = entry.details?.userAgent || '';
        return `
        <tr>
          <td>${formatAdminDateTime(entry.createdAt)}</td>
          <td>${escapeHtml(actionLabels[entry.action] || entry.action)}</td>
          <td>${escapeHtml(entry.targetName || entry.targetEmail || entry.adminName || entry.adminEmail || '-')}</td>
          <td>${escapeHtml(entry.details?.ip || '')}</td>
          <td>${escapeHtml(entry.details?.reason || entry.details?.email || '')}</td>
          <td title="${escapeHtml(userAgent)}">${escapeHtml(formatSessionDevice(userAgent))}</td>
        </tr>
      `;
      }).join('')}</tbody>
    </table>
  ` : '<p>אין אירועי אבטחה להצגה.</p>';
}

function openAdminSecurityExportModal() {
  adminSecurityExportError.textContent = '';
  adminSecurityExportForm.reset();
  adminSecurityExportModal.classList.remove('is-hidden');
  adminSecurityExportModal.setAttribute('aria-hidden', 'false');
}

function closeAdminSecurityExportModal() {
  adminSecurityExportForm.reset();
  adminSecurityExportError.textContent = '';
  adminSecurityExportModal.classList.add('is-hidden');
  adminSecurityExportModal.setAttribute('aria-hidden', 'true');
}

async function exportAdminSecurityLog(event) {
  event.preventDefault();
  adminSecurityExportError.textContent = '';
  const payload = Object.fromEntries(new FormData(adminSecurityExportForm).entries());
  const submitButton = event.submitter;
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await apiFetch('/api/admin/security-events/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      adminSecurityExportError.textContent = response.status === 403
        ? 'סיסמת המנהל שגויה.'
        : response.status === 429
          ? 'יותר מדי ניסיונות. נסו שוב מאוחר יותר.'
          : 'לא ניתן לייצא יומן אבטחה כרגע.';
      return;
    }

    const blob = await response.blob();
    const disposition = response.headers.get('Content-Disposition') || '';
    const match = disposition.match(/filename="?([^";]+)"?/i);
    const filename = match?.[1] || `edufitscore-security-log-${new Date().toISOString().slice(0, 10)}.${payload.format === 'json' ? 'json' : 'csv'}`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    closeAdminSecurityExportModal();
    await loadAdminSecuritySummary();
    await loadAdminSecurityEvents();
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function renderAdminAuditLogFromFilter() {
  const actionLabels = {
    enable_user: 'הפעלת משתמש',
    disable_user: 'השבתת משתמש',
    restore_user: 'שחזור משתמש',
    admin_login_failed: 'כניסת מנהל נכשלה',
    admin_login_alert_sent: 'התראת כניסת מנהל נשלחה',
    admin_login_alert_failed: 'התראת כניסת מנהל נכשלה',
    admin_reauth_success: 'אימות מנהל לפעולה רגישה',
    admin_login: 'כניסת מנהל',
    password_change: 'שינוי סיסמה',
    account_deactivate: 'השבתת חשבון עצמי',
    logout_other_sessions_after_password_change: 'ניתוק מכשירים לאחר שינוי סיסמה',
    reset_password: 'איפוס סיסמה',
    reset_password_failed: 'איפוס סיסמה נכשל',
    permanent_delete_user: 'מחיקת משתמש',
    permanent_delete_user_failed: 'מחיקת משתמש נכשלה',
    export_backup: 'הורדת גיבוי',
    export_backup_notification_failed: 'התראת הורדת גיבוי נכשלה',
    export_security_log: 'ייצוא יומן אבטחה',
    export_security_log_failed: 'ייצוא יומן אבטחה נכשל',
    session_idle_timeout: 'ניתוק עקב חוסר פעילות',
    restore_backup: 'ייבוא גיבוי',
    restore_backup_failed: 'ייבוא גיבוי נכשל',
    admin_2fa_setup_started: 'התחלת אימות דו-שלבי',
    admin_2fa_setup_started_failed: 'התחלת אימות נכשלה',
    admin_2fa_setup_failed: 'הפעלת אימות נכשלה',
    admin_2fa_enabled: 'אימות דו-שלבי הופעל',
    admin_2fa_disabled: 'אימות דו-שלבי כובה',
    admin_2fa_disable_failed: 'כיבוי אימות נכשל',
    admin_2fa_login_success: 'כניסה עם אימות דו-שלבי',
    admin_2fa_login_failed: 'אימות דו-שלבי נכשל',
    admin_2fa_recovery_code_used: 'שימוש בקוד שחזור',
    logout_other_sessions: 'ניתוק מכשירים אחרים',
    school_score_table_create: 'יצירת טבלת ציונים',
    school_score_table_create_failed: 'יצירת טבלה נכשלה',
    school_score_table_import: 'ייבוא טבלאות ציונים',
    school_score_table_import_failed: 'ייבוא טבלאות נכשל',
    school_score_table_delete: 'מחיקת טבלת ציונים',
    school_score_table_delete_failed: 'מחיקת טבלה נכשלה',
  };
  const filterValue = adminAuditFilter?.value || 'all';
  const entries = filterValue === 'all'
    ? adminAuditEntries
    : adminAuditEntries.filter((entry) => filterValue === 'admin_2fa' ? entry.action.startsWith('admin_2fa_') : entry.action === filterValue);
  adminAuditLog.innerHTML = entries.length ? `
    <table class="admin-audit-table">
      <thead><tr><th>תאריך</th><th>פעולה</th><th>מנהל</th><th>משתמש</th><th>פרטים</th></tr></thead>
      <tbody>
        ${entries.map((entry) => `
          <tr>
            <td>${formatAdminDateTime(entry.createdAt)}</td>
            <td>${escapeHtml(actionLabels[entry.action] || entry.action)}</td>
            <td>${escapeHtml(entry.adminName || entry.adminEmail)}</td>
            <td>${escapeHtml(entry.targetName || entry.targetEmail || '-')}</td>
            <td>${escapeHtml(entry.details?.email || '')}</td>
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
        <strong>${escapeHtml(user.fullName)}</strong>
        <div>${escapeHtml(user.email)}</div>
        <div>${escapeHtml(user.schoolName || '')}</div>
        <button type="button" class="back-home-button" data-restore-user-email="${escapeAttr(user.email)}">שחזור</button>
      </article>
    `).join('')
    : '<p>אין חשבונות מושבתים.</p>';
}

async function restoreInactiveUser(email) {
  adminRestoreMessage.textContent = '';
  const response = await apiFetch('/api/admin/restore-user', {
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

function openAdminBackupExportModal() {
  adminRestoreMessage.textContent = '';
  adminBackupExportError.textContent = '';
  adminBackupExportForm.reset();
  adminBackupExportModal.classList.remove('is-hidden');
  adminBackupExportModal.setAttribute('aria-hidden', 'false');
}

function closeAdminBackupExportModal() {
  adminBackupExportForm.reset();
  adminBackupExportError.textContent = '';
  adminBackupExportModal.classList.add('is-hidden');
  adminBackupExportModal.setAttribute('aria-hidden', 'true');
}

async function downloadAdminBackup(currentAdminPassword) {
  adminRestoreMessage.textContent = '';
  const response = await apiFetch('/api/admin/backup/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentAdminPassword }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      adminBackupExportError.textContent = 'סיסמת המנהל אינה נכונה.';
    } else if (response.status === 429) {
      adminBackupExportError.textContent = 'יותר מדי ניסיונות. נסו שוב מאוחר יותר.';
    } else {
      adminBackupExportError.textContent = 'לא ניתן להוריד גיבוי כרגע.';
    }
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
  closeAdminBackupExportModal();
  await loadAdminAuditLog();
}

async function confirmAdminBackupExport(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(adminBackupExportForm).entries());
  adminBackupExportError.textContent = '';

  const submitButton = event.submitter;
  if (submitButton) submitButton.disabled = true;

  try {
    await downloadAdminBackup(payload.currentAdminPassword);
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

async function restoreAdminBackupFromFile(file) {
  if (!file) {
    return;
  }

  adminRestoreMessage.textContent = '';
  try {
    const backup = JSON.parse(await file.text());
    pendingAdminBackupRestore = backup;
    adminBackupConfirmError.textContent = '';
    adminBackupConfirmForm.reset();
    adminBackupConfirmModal.classList.remove('is-hidden');
    adminBackupConfirmModal.setAttribute('aria-hidden', 'false');
  } catch (error) {
    openAdminBackupResultModal(`<p><strong>ייבוא הגיבוי נכשל.</strong></p><p>קובץ הגיבוי לא תקין או שלא ניתן לייבא אותו.</p><p class="backup-error-details">פרטים: ${error.message}</p>`);
    adminRestoreMessage.textContent = 'קובץ הגיבוי לא תקין או שלא ניתן לייבא אותו.';
    adminBackupImport.value = '';
  }
}

function closeAdminBackupConfirmModal() {
  pendingAdminBackupRestore = null;
  adminBackupConfirmForm.reset();
  adminBackupConfirmError.textContent = '';
  adminBackupConfirmModal.classList.add('is-hidden');
  adminBackupConfirmModal.setAttribute('aria-hidden', 'true');
  adminBackupImport.value = '';
}

async function confirmAdminBackupRestore(event) {
  event.preventDefault();
  if (!pendingAdminBackupRestore) {
    closeAdminBackupConfirmModal();
    return;
  }

  const payload = Object.fromEntries(new FormData(adminBackupConfirmForm).entries());
  adminBackupConfirmError.textContent = '';
  if (String(payload.confirmation || '').trim() !== 'delete') {
    adminBackupConfirmError.textContent = 'יש להקליד delete כדי להמשיך.';
    return;
  }

  const submitButton = event.submitter;
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await apiFetch('/api/admin/backup/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        backup: pendingAdminBackupRestore,
        currentAdminPassword: payload.currentAdminPassword,
        confirmation: payload.confirmation,
      }),
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
    closeAdminBackupConfirmModal();
    await loadAdminDiagnostics();
    await loadAdminUsers();
    await loadInactiveUsers();
    await loadAdminAuditLog();
  } catch (error) {
    const message = error.message === 'RESTORE_DISABLED'
      ? 'ייבוא גיבוי מושבת בסביבת הייצור.'
      : error.message === 'INVALID_ADMIN_PASSWORD'
        ? 'סיסמת המנהל אינה נכונה.'
        : error.message === 'INVALID_CONFIRMATION'
          ? 'אישור הפעולה אינו תקין.'
          : 'קובץ הגיבוי לא תקין או שלא ניתן לייבא אותו.';
    adminBackupConfirmError.textContent = message;
    openAdminBackupResultModal(`<p><strong>ייבוא הגיבוי נכשל.</strong></p><p>${escapeHtml(message)}</p><p class="backup-error-details">פרטים: ${escapeHtml(error.message)}</p>`);
    adminRestoreMessage.textContent = message;
  } finally {
    if (submitButton) {
      setTimeout(() => { submitButton.disabled = false; }, 600);
    }
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

function openAdminPermanentDeleteModal(button) {
  pendingAdminPermanentDelete = {
    userId: Number(button.dataset.permanentDeleteUserId),
    name: button.dataset.permanentDeleteUserName || '',
  };
  adminPermanentDeleteMessage.textContent = `מחיקה לצמיתות של ${pendingAdminPermanentDelete.name}. פעולה זו מיועדת רק לחשבון מושבת ולא ניתן לבטל אותה.`;
  adminPermanentDeleteError.textContent = '';
  adminPermanentDeleteForm.reset();
  adminPermanentDeleteModal.classList.remove('is-hidden');
  adminPermanentDeleteModal.setAttribute('aria-hidden', 'false');
}

function closeAdminPermanentDeleteModal() {
  pendingAdminPermanentDelete = null;
  adminPermanentDeleteForm.reset();
  adminPermanentDeleteError.textContent = '';
  adminPermanentDeleteModal.classList.add('is-hidden');
  adminPermanentDeleteModal.setAttribute('aria-hidden', 'true');
}

async function submitAdminPermanentDelete(event) {
  event.preventDefault();
  if (!pendingAdminPermanentDelete) {
    closeAdminPermanentDeleteModal();
    return;
  }

  const payload = Object.fromEntries(new FormData(adminPermanentDeleteForm).entries());
  adminPermanentDeleteError.textContent = '';
  if (String(payload.confirmation || '').trim() !== 'delete') {
    adminPermanentDeleteError.textContent = 'יש להקליד delete כדי להמשיך.';
    return;
  }

  const submitButton = event.submitter;
  if (submitButton) submitButton.disabled = true;

  const response = await apiFetch(`/api/admin/users/${pendingAdminPermanentDelete.userId}/permanent`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentAdminPassword: payload.currentAdminPassword, confirmation: payload.confirmation }),
  });

  if (submitButton) {
    setTimeout(() => { submitButton.disabled = false; }, 600);
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    adminPermanentDeleteError.textContent = data.error === 'INVALID_ADMIN_PASSWORD'
      ? 'סיסמת המנהל אינה נכונה.'
      : data.error === 'INVALID_CONFIRMATION'
        ? 'אישור הפעולה אינו תקין.'
        : data.error === 'USER_ACTIVE'
          ? 'יש להשבית את המשתמש לפני מחיקה לצמיתות.'
          : 'לא ניתן למחוק את המשתמש כרגע.';
    return;
  }

  adminRestoreMessage.textContent = 'המשתמש נמחק לצמיתות.';
  closeAdminPermanentDeleteModal();
  await loadAdminOverview();
  await loadAdminUsers();
  await loadInactiveUsers();
  await loadAdminAuditLog();
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
  const response = await apiFetch(`/api/admin/users/${userId}/status`, {
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

function passwordPolicyMessage() {
  return 'הסיסמה חייבת לכלול לפחות 8 תווים, אות קטנה באנגלית, אות גדולה באנגלית, מספר ותו מיוחד.';
}

function validPasswordPolicy(password) {
  const value = String(password || '');
  return value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
}

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

  if (!validPasswordPolicy(payload.newPassword)) {
    adminPasswordError.textContent = passwordPolicyMessage();
    return;
  }

  const submitButton = event.submitter;
  if (submitButton) {
    submitButton.disabled = true;
  }

  const response = await apiFetch(`/api/admin/users/${pendingAdminPasswordReset.userId}/reset-password`, {
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
    const data = await response.json().catch(() => ({}));
    adminPasswordError.textContent = data.error === 'INVALID_ADMIN_PASSWORD'
      ? 'סיסמת המנהל אינה נכונה.'
      : data.error === 'INVALID_PASSWORD' || data.error === 'WEAK_PASSWORD'
        ? passwordPolicyMessage()
        : 'לא ניתן לאפס סיסמה כרגע.';
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
  clearTeacherResultState();
  teacherClasses = [];
  activeTeacherClassId = null;
  authUser = data.user;
  syncMemberControls();
  syncTeacherClassSchoolField();
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
    const errorData = await response.json().catch(() => ({}));
    memberLoginError.textContent = errorData.error === 'EMAIL_NOT_VERIFIED'
      ? 'יש לאמת את כתובת הדוא"ל לפני התחברות. אם מדובר בחשבון קיים או בחשבון מנהל, פנו לתמיכה.'
      : 'הדוא"ל או הסיסמה שגויים.';
    return;
  }

  const data = await response.json();
  if (data.requiresTwoFactor) {
    pendingTwoFactorChallengeToken = data.challengeToken || '';
    memberTwoFactorForm.reset();
    memberTwoFactorError.textContent = '';
    memberTwoFactorSubtitle.textContent = data.email
      ? `הקלידו קוד מאפליקציית אימות עבור ${data.email}, או קוד שחזור.`
      : 'הקלידו קוד מאפליקציית אימות או קוד שחזור.';
    applyRoute('twoFactor');
    return;
  }

  await finishAuthenticatedLogin(data.user);
}

async function finishAuthenticatedLogin(user) {
  clearTeacherResultState();
  teacherClasses = [];
  activeTeacherClassId = null;
  authUser = user;
  syncMemberControls();
  syncTeacherClassSchoolField();
  await refreshTeacherClasses();
  if (authUser.mustChangePassword) {
    applyRoute('profile');
    return;
  }
  applyRoute(authUser.role === 'admin' ? 'admin' : 'member');
}

async function handleMemberTwoFactor(event) {
  event.preventDefault();
  memberTwoFactorError.textContent = '';

  const payload = Object.fromEntries(new FormData(memberTwoFactorForm).entries());
  const response = await fetch('/api/auth/2fa/verify-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ challengeToken: pendingTwoFactorChallengeToken, code: payload.code }),
  });

  if (!response.ok) {
    memberTwoFactorError.textContent = response.status === 429 ? 'יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.' : 'קוד האימות שגוי או שפג תוקף הכניסה.';
    return;
  }

  const data = await response.json();
  pendingTwoFactorChallengeToken = '';
  await finishAuthenticatedLogin(data.user);
}

function cancelMemberTwoFactor() {
  pendingTwoFactorChallengeToken = '';
  memberTwoFactorForm.reset();
  memberTwoFactorError.textContent = '';
  applyRoute('login');
}

async function handleMemberSignup(event) {
  event.preventDefault();
  memberSignupError.textContent = '';

  syncSelectedSignupSchool();
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

  if (!validPasswordPolicy(payload.password)) {
    memberSignupError.textContent = passwordPolicyMessage();
    return;
  }

  if (payload.accountType === 'school_admin' && (!payload.schoolName || !payload.schoolCity)) {
    memberSignupError.textContent = 'יש להזין שם בית ספר ועיר בית ספר.';
    return;
  }

  if (payload.accountType !== 'school_admin' && !payload.schoolId && !payload.inviteToken) {
    memberSignupError.textContent = 'יש לבחור בית ספר קיים או להירשם כמנהל בית ספר חדש.';
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

    if (errorData.error === 'WEAK_PASSWORD') {
      memberSignupError.textContent = passwordPolicyMessage();
      return;
    }

    if (errorData.error === 'EMAIL_SEND_FAILED') {
      memberSignupError.textContent = 'לא ניתן לשלוח כרגע דוא"ל אימות. נסו שוב בעוד כמה דקות.';
      return;
    }

    if (errorData.error === 'SCHOOL_ADMIN_EXISTS') {
      memberSignupError.textContent = 'כבר קיים מנהל לבית הספר הזה.';
      return;
    }

    if (errorData.error === 'MISSING_SCHOOL') {
      memberSignupError.textContent = 'יש להשלים את פרטי בית הספר.';
      return;
    }

    if (errorData.error === 'INVALID_INVITE') {
      memberSignupError.textContent = 'קישור ההזמנה לא תקין או פג תוקף.';
      return;
    }

    if (errorData.error === 'INVITE_EMAIL_MISMATCH') {
      memberSignupError.textContent = 'ההזמנה האישית נשלחה לדוא"ל אחר. יש להירשם עם הדוא"ל שבהזמנה.';
      return;
    }

    memberSignupError.textContent = 'לא ניתן ליצור חשבון כרגע.';
    return;
  }

  await response.json();
  memberSignupForm.reset();
  syncSignupSchoolFields();
  memberSignupError.textContent = 'ההרשמה נקלטה. שלחנו קישור אימות לדוא"ל שלך. יש לאמת את הדוא"ל לפני התחברות.';
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

function currentVerifyEmailToken() {
  const tokenFromQuery = new URLSearchParams(window.location.search).get('verifyToken');
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

async function verifyEmailFromRoute() {
  if (!verifyEmailMessage) return;
  const token = currentVerifyEmailToken();
  if (!token) {
    verifyEmailMessage.textContent = 'קישור האימות חסר או לא תקין.';
    return;
  }

  verifyEmailMessage.textContent = 'מאמתים את כתובת הדוא"ל...';
  const response = await fetch('/api/auth/verify-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    verifyEmailMessage.textContent = 'קישור האימות לא תקף או שפג תוקפו. ניתן לבקש קישור חדש ממסך ההתחברות.';
    return;
  }

  verifyEmailMessage.textContent = 'הדוא"ל אומת בהצלחה. אפשר להתחבר לחשבון.';
  const url = new URL(window.location.href);
  url.searchParams.delete('verifyToken');
  window.history.replaceState({ mode: 'member' }, '', `${url.pathname}${url.search}#member`);
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

  if (!validPasswordPolicy(payload.newPassword)) {
    resetPasswordMessage.textContent = passwordPolicyMessage();
    return;
  }

  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    resetPasswordMessage.textContent = data.error === 'WEAK_PASSWORD' ? passwordPolicyMessage() : 'קישור האיפוס אינו תקין או שפג תוקפו.';
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

function togglePasswordVisibility(button) {
  const input = button.closest('.password-field')?.querySelector('input');
  if (!input) {
    return;
  }

  const shouldShow = input.type === 'password';
  input.type = shouldShow ? 'text' : 'password';
  button.setAttribute('aria-pressed', String(shouldShow));
  button.setAttribute('aria-label', shouldShow ? 'הסתרת סיסמה' : 'הצגת סיסמה');
}

async function fillProfileForm() {
  if (!authUser || !profileDetailsForm) {
    return;
  }

  profileDetailsForm.firstName.value = authUser.firstName || '';
  profileDetailsForm.lastName.value = authUser.lastName || '';
  profileDetailsForm.email.value = authUser.email || '';
  profileDetailsForm.phone.value = authUser.phone || '';
  profileDetailsForm.city.value = authUser.city || '';
  if (profileDetailsForm.schoolName) {
    profileDetailsForm.schoolName.value = authUser.schoolName || '';
  }

  const isAdmin = authUser.role === 'admin';
  profileDetailsForm.querySelectorAll('.teacher-profile-only').forEach((item) => {
    item.classList.toggle('is-hidden', isAdmin);
    item.querySelectorAll('input, select, textarea').forEach((input) => {
      input.required = !isAdmin;
    });
  });
  profileDeactivateForm.classList.toggle('is-hidden', isAdmin);
  profileAdminSecurityPanel?.classList.toggle('is-hidden', !isAdmin);
  if (isAdmin) {
    await loadAdminTwoFactorStatus();
    await confirmAdminTwoFactorRecoveryRegeneration();
  }
  loadProfileSessions();
  loadSchoolsForSignup().then(renderProfileSchoolRequestOptions);
  if (authUser.mustChangePassword) {
    profilePasswordMessage.textContent = 'יש להחליף סיסמה לפני המשך שימוש במערכת.';
  }
}

function formatSessionDevice(userAgent) {
  const text = String(userAgent || '');
  if (/Edg\//.test(text)) return 'Microsoft Edge';
  if (/Chrome\//.test(text)) return 'Chrome';
  if (/Firefox\//.test(text)) return 'Firefox';
  if (/Safari\//.test(text)) return 'Safari';
  return text ? text.slice(0, 80) : 'מכשיר לא ידוע';
}

async function loadProfileSessions() {
  if (!profileSessionsList) return;
  const response = await fetch('/api/auth/sessions');
  if (!response.ok) {
    profileSessionsList.innerHTML = '<p>לא ניתן לטעון פעילות התחברות.</p>';
    return;
  }
  const data = await response.json();
  profileSessionsList.innerHTML = (data.sessions || []).map((session) => `
    <article class="profile-session-card">
      <strong>${session.current ? 'המכשיר הנוכחי' : 'מכשיר נוסף'}</strong>
      <div><span>דפדפן</span><b>${escapeHtml(formatSessionDevice(session.userAgent))}</b></div>
      <div><span>IP</span><b>${escapeHtml(session.ipAddress || '-')}</b></div>
      <div><span>פעילות אחרונה</span><b>${formatAdminDateTime(session.lastSeenAt)}</b></div>
      <div><span>תפוגה</span><b>${formatAdminDateTime(session.expiresAt)}</b></div>
    </article>
  `).join('') || '<p>אין פעילות התחברות להצגה.</p>';
}

async function logoutOtherSessions() {
  profileSessionsMessage.textContent = '';
  const response = await apiFetch('/api/auth/sessions/logout-others', { method: 'POST' });
  if (!response.ok) {
    profileSessionsMessage.textContent = 'לא ניתן לנתק מכשירים אחרים כרגע.';
    return;
  }
  const data = await response.json();
  profileSessionsMessage.textContent = data.deleted ? `נותקו ${data.deleted} מכשירים אחרים.` : 'אין מכשירים אחרים לניתוק.';
  await loadProfileSessions();
}

function renderProfileSchoolRequestOptions() {
  if (!profileSchoolRequestPanel || !profileSchoolRequestSelect) {
    return;
  }

  const memberships = authUser?.schoolMemberships || [];
  const activeMemberships = memberships.filter((item) => ['pending', 'approved'].includes(item.status));
  const statusLabels = {
    approved: 'מאושר',
    pending: 'ממתין לאישור',
    suspended: 'מושעה',
    rejected: 'נדחה',
  };
  const roleLabels = {
    admin: 'רכז/ת חנ"ג',
    teacher: 'מורה',
  };

  if (profileSchoolMemberships) {
    profileSchoolMemberships.innerHTML = memberships.length
      ? memberships.map((item) => `
        <span>
          ${escapeHtml(item.school?.name || 'בית ספר לא ידוע')} - ${escapeHtml(item.school?.city || '')}
          | ${escapeHtml(roleLabels[item.role] || item.role || '')}
          | ${escapeHtml(statusLabels[item.status] || item.status || '')}
        </span>
      `).join('')
      : '<span>אין עדיין חיבור לבית ספר.</span>';
  }
  profileSchoolRequestPanel.classList.toggle('is-hidden', authUser?.role === 'admin');

  const connectedIds = new Set(activeMemberships.map((item) => item.school?.id));
  const availableSchools = signupSchools.filter((school) => !connectedIds.has(school.id));
  profileSchoolRequestControls?.classList.toggle('is-hidden', activeMemberships.length >= 3);
  profileSchoolRequestSelect.innerHTML = availableSchools.length
    ? availableSchools.map((school) => `<option value="${escapeAttr(school.id)}">${escapeHtml(school.name)} - ${escapeHtml(school.city)}</option>`).join('')
    : '<option value="">אין בתי ספר נוספים זמינים</option>';
  profileSchoolRequestButton.disabled = !availableSchools.length;
}

async function requestAdditionalSchool() {
  profileSchoolRequestMessage.textContent = '';
  if (!profileSchoolRequestSelect.value) {
    return;
  }

  const response = await apiFetch('/api/teacher/school-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ schoolId: profileSchoolRequestSelect.value }),
  });

  if (!response.ok) {
    profileSchoolRequestMessage.textContent = 'לא ניתן לשלוח בקשה כרגע או שהגעת למגבלת 3 בתי ספר.';
    return;
  }

  await refreshAuthUser();
  profileSchoolRequestMessage.textContent = 'הבקשה נשלחה לאישור רכז/ת חנ"ג.';
  renderProfileSchoolRequestOptions();
}

async function saveProfileDetails(event) {
  event.preventDefault();
  profileDetailsMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(profileDetailsForm).entries());
  payload.schoolName = authUser.schoolName || '';
  const validationError = validateAccountDetails(payload);
  if (validationError) {
    profileDetailsMessage.textContent = validationError;
    return;
  }
  const response = await apiFetch('/api/auth/profile', {
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
  syncTeacherClassSchoolField();
}

async function changeProfilePassword(event) {
  event.preventDefault();
  profilePasswordMessage.textContent = '';
  const payload = Object.fromEntries(new FormData(profilePasswordForm).entries());

  if (payload.newPassword !== payload.newPasswordRepeat) {
    profilePasswordMessage.textContent = 'הסיסמאות החדשות אינן זהות.';
    return;
  }

  if (!validPasswordPolicy(payload.newPassword)) {
    profilePasswordMessage.textContent = passwordPolicyMessage();
    return;
  }

  const response = await apiFetch('/api/auth/password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    profilePasswordMessage.textContent = errorData.error === 'INVALID_PASSWORD'
      ? 'הסיסמה הנוכחית שגויה.'
      : errorData.error === 'WEAK_PASSWORD'
        ? passwordPolicyMessage()
      : 'לא ניתן לשנות סיסמה כרגע.';
    return;
  }

  profilePasswordForm.reset();
  authUser = { ...authUser, mustChangePassword: false };
  const data = await response.json().catch(() => ({}));
  profilePasswordMessage.textContent = data.revokedOtherSessions
    ? 'הסיסמה שונתה. מכשירים אחרים נותקו מהחשבון.'
    : 'הסיסמה שונתה.';
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
  const response = await apiFetch('/api/auth/deactivate', {
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
  clearTeacherResultState();
  syncMemberControls();
  applyRoute('home');
}

async function logoutMember() {
  await apiFetch('/api/auth/logout', { method: 'POST' });
  authUser = null;
  teacherClasses = [];
  activeTeacherClassId = null;
  teacherRoster = [];
  teacherClassValues = {};
  clearTeacherResultState();
  teacherEditMode = false;
  syncMemberControls();
  memberLoginForm.reset();
  memberLoginError.textContent = '';
  if (schoolAdminInviteResult) {
    schoolAdminInviteResult.textContent = '';
  }
  applyRoute('home');
}

function renderTeacherEntryTable() {
  try {
    const sheet = selectedSheet();
    if (!sheet) {
      teacherEntryTable.innerHTML = '<p>לא נמצאה טבלת ציונים לבית-הספר, השכבה והקבוצה של הכיתה.</p>';
      return;
    }
    const metrics = sheetMetrics(sheet);
    if (!metrics.length) {
      teacherEntryTable.innerHTML = '<p>בטבלת הציונים של הכיתה לא הוגדרו מקצועות להזנה.</p>';
      return;
    }
    syncTeacherRoster();
    const semesterValues = currentSemesterValues();
    const isYearly = activeTeacherSemester === 'yearly';
    const scoreEntryAllowed = canTeacherEnterScores();

    teacherEntryTable.innerHTML = `
      <table class="teacher-entry-table">
        <caption class="visually-hidden">טבלת הזנת תוצאות למורים</caption>
        <thead>
          <tr>
            <th>${escapeHtml(activeTeacherStudentLabel())}</th>
            ${metrics.map((metric) => `<th>${escapeHtml(metric.label)}</th>`).join('')}
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
                    value="${escapeAttr(student.name)}"
                    aria-label="שם ${escapeAttr(activeTeacherStudentLabel())} ${index + 1}"
                  />
                ` : `<div class="teacher-student-name-text">${escapeHtml(student.name)}</div>`}
                <div class="teacher-student-order-actions${teacherEditMode ? '' : ' is-hidden'}">
                  <button type="button" class="teacher-order-button teacher-drag-handle" data-student-index="${index}" aria-label="גרירת תלמיד לשינוי מיקום">גרירה</button>
                </div>
              </td>
              ${metrics.map((metric) => `
                <td>
                  <input
                    data-student-index="${index}"
                    data-metric-key="${escapeAttr(metric.key)}"
                    aria-label="${escapeAttr(`${student.name} ${metric.label}`)}"
                    inputmode="numeric"
                    pattern="[0-9:]*"
                    value="${escapeAttr(teacherEntryValue(semesterValues[student.id]?.[metric.key] || '', sheet))}"
                    ${isYearly || !scoreEntryAllowed ? 'disabled' : ''}
                  />
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    if (!scoreEntryAllowed && teacherEntryMessage) {
      teacherEntryMessage.textContent = teacherScoreAccessMessage();
    } else if (teacherEntryMessage && teacherEntryMessage.textContent === teacherScoreAccessMessage()) {
      teacherEntryMessage.textContent = '';
    }
  } catch (error) {
    console.error('Teacher entry table render failed', error);
    teacherEntryTable.innerHTML = '<p>לא ניתן להציג את טבלת הזנת התוצאות כרגע. נסו לרענן את העמוד.</p>';
  }
}

function renderTeacherResultsTable(students = []) {
  syncTeacherRoster();
  const metrics = sheetMetrics();

  teacherResultsTable.innerHTML = renderTeacherResultsTableMarkup(students.length ? students : teacherRoster.map((student) => ({
    studentName: student.name,
    results: metrics.map((metric) => ({ key: metric.key, label: metric.label, result: null })),
    averageScore: null,
  })));
}

function bestSemesterScoresFromHistory(semester) {
  const sheet = selectedSheet();
  const bestByStudent = new Map();
  teacherHistoryEntries
    .filter((entry) => (entry.payload?.semester || 'a') === semester)
    .forEach((entry) => {
      normalizeHistoryStudents(entry).forEach((student) => {
        const name = currentStudentNameForHistory(student.studentName, teacherRoster.findIndex((item) => item.name === student.studentName)) || student.studentName;
        if (!bestByStudent.has(name)) {
          bestByStudent.set(name, {});
        }

        const scores = bestByStudent.get(name);
        (student.results || []).forEach((item) => {
          const score = Number(item?.result?.score);
          if (!Number.isFinite(score)) {
            return;
          }

          if (!Number.isFinite(scores[item.key]) || score > scores[item.key]) {
            scores[item.key] = score;
          }
        });
      });
    });

  return { sheet, bestByStudent };
}

function calculateYearlyTeacherResults() {
  const ratioA = teacherYearlySemesterARatio / 100;
  const ratioB = 1 - ratioA;
  const semesterA = bestSemesterScoresFromHistory('a');
  const semesterB = bestSemesterScoresFromHistory('b');
  const sheet = semesterA.sheet;
  const metrics = sheetMetrics(sheet);

  return teacherRoster.map((student) => {
    const scoresA = semesterA.bestByStudent.get(student.name) || {};
    const scoresB = semesterB.bestByStudent.get(student.name) || {};
    const results = metrics.map((metric) => {
      const scoreA = Number(scoresA[metric.key]);
      const scoreB = Number(scoresB[metric.key]);
      const parts = [];

      if (Number.isFinite(scoreA)) {
        parts.push({ score: scoreA, ratio: ratioA });
      }

      if (Number.isFinite(scoreB)) {
        parts.push({ score: scoreB, ratio: ratioB });
      }

      const totalRatio = parts.reduce((sum, item) => sum + item.ratio, 0);
      const yearlyScore = totalRatio > 0
        ? Math.round(parts.reduce((sum, item) => sum + (item.score * item.ratio), 0) / totalRatio)
        : null;

      return {
        key: metric.key,
        label: metric.label,
        result: yearlyScore === null ? null : { score: yearlyScore },
      };
    });
    const numericScores = results.map((item) => item.result?.score).filter((score) => Number.isFinite(score));

    return {
      studentName: student.name,
      results,
      averageScore: numericScores.length ? Math.floor(numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length) : null,
    };
  });
}

function bestSemesterResultsForTable(semester) {
  const { sheet, bestByStudent } = bestSemesterScoresFromHistory(semester);
  const metrics = sheetMetrics(sheet);
  return teacherRoster.map((student) => {
    const scores = bestByStudent.get(student.name) || {};
    const results = metrics.map((metric) => {
      const score = Number(scores[metric.key]);
      return {
        key: metric.key,
        label: metric.label,
        result: Number.isFinite(score) ? { score } : null,
      };
    });
    const numericScores = results.map((item) => item.result?.score).filter((score) => Number.isFinite(score));

    return {
      studentName: student.name,
      results,
      averageScore: numericScores.length ? Math.floor(numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length) : null,
    };
  });
}

function renderTeacherResultsTableMarkup(students = []) {
  const sheet = selectedSheet();
  const metrics = sheetMetrics(sheet);
  return `
    <table>
      <caption class="visually-hidden">טבלת תוצאות מומרות למורים</caption>
      <thead>
        <tr>
          <th>${escapeHtml(activeTeacherStudentLabel())}</th>
          ${metrics.map((metric) => `<th>${escapeHtml(metric.label)}</th>`).join('')}
          <th>ממוצע</th>
        </tr>
      </thead>
      <tbody>
        ${students.length ? students.map((student) => `
          <tr>
            <td class="student-name-cell">${escapeHtml(student.studentName)}</td>
            ${metrics.map((metric) => {
              const metricResult = student.results.find((item) => item.key === metric.key);
              return `<td>${escapeHtml(metricResult?.result?.score ?? '')}</td>`;
            }).join('')}
            <td class="average-cell">${escapeHtml(student.averageScore ?? '')}</td>
          </tr>
        `).join('') : ''}
      </tbody>
    </table>
  `;
}

function renderYearlyHistorySummary() {
  syncSemesterControls();
  const semesterAResults = bestSemesterResultsForTable('a');
  const semesterBResults = bestSemesterResultsForTable('b');
  const yearlyResults = calculateYearlyTeacherResults();
  latestTeacherResults = yearlyResults;

  teacherHistoryDateRange.textContent = '';
  teacherHistoryTimeline?.classList.add('is-hidden');
  teacherHistoryRange?.classList.add('is-hidden');
  teacherHistoryGraph.innerHTML = '';
  teacherHistorySelectedDate.innerHTML = `
    <button type="button" class="back-home-button ${teacherHistoryEditMode ? 'is-editing-button' : ''}" data-edit-history-entry>${teacherHistoryEditMode ? 'שמירת יחס' : 'עריכה'}</button>
  `;
  teacherClassHistory.innerHTML = `
    <section class="yearly-history-tables table-container">
      <div class="yearly-history-table-block">
        <h3>מחצית א׳ - שיאים</h3>
        ${renderTeacherResultsTableMarkup(semesterAResults)}
      </div>
      <div class="yearly-history-table-block">
        <h3>מחצית ב׳ - שיאים</h3>
        ${renderTeacherResultsTableMarkup(semesterBResults)}
      </div>
      <div class="yearly-history-table-block">
        <h3>שנתי - יחס ${teacherYearlySemesterARatio}% / ${100 - teacherYearlySemesterARatio}%</h3>
        ${renderTeacherResultsTableMarkup(yearlyResults)}
      </div>
      <div class="teacher-results-actions yearly-history-actions">
        <button type="button" class="teacher-panel-button whatsapp-button" data-yearly-share-whatsapp>שליחה ל-WhatsApp</button>
        <button type="button" class="secondary-button teacher-panel-button" data-yearly-download-csv>הורדת CSV</button>
        <button type="button" class="secondary-button teacher-panel-button" data-yearly-copy>העתקה</button>
      </div>
    </section>
  `;
}

function resetTeacherResults() {
  latestTeacherResults = [];
  renderTeacherResultsTable([]);
}

function collectTeacherStudents() {
  const sheet = selectedSheet();
  if (!sheet) {
    return [];
  }
  const metrics = sheetMetrics(sheet);
  syncTeacherRoster();

  if (activeTeacherSemester === 'yearly') {
    return [];
  }

  const rawStudents = teacherRoster.map((student, studentIndex) => ({
    studentName: student.name,
    values: Object.fromEntries(metrics.map((metric) => {
      const input = teacherEntryTable.querySelector(`[data-student-index="${studentIndex}"][data-metric-key="${metric.key}"]`);
      return [metric.key, teacherEntryValue(input?.value || '', sheet)];
    })),
  }));

  return normalizeTeacherTimeInputs(rawStudents);
}

function syncTeacherClassValuesFromInputs() {
  if (activeTeacherSemester === 'yearly') {
    return;
  }

  const sheet = selectedSheet();
  if (!sheet) {
    return;
  }
  const metrics = sheetMetrics(sheet);
  const nextValues = {};
  teacherRoster.forEach((student, studentIndex) => {
    const values = {};
    metrics.forEach((metric) => {
      const input = teacherEntryTable.querySelector(`[data-student-index="${studentIndex}"][data-metric-key="${metric.key}"]`);
      values[metric.key] = teacherEntryValue(input?.value || '', sheet);
    });
    nextValues[student.id] = values;
  });
  setCurrentSemesterValues(nextValues);
}

function moveTeacherFocus(currentInput) {
  const sheet = selectedSheet();
  const metrics = sheetMetrics(sheet);

  if (!sheet || !currentInput) {
    return;
  }

  const studentIndex = Number(currentInput.dataset.studentIndex);
  const metricIndex = metrics.findIndex((metric) => metric.key === currentInput.dataset.metricKey);
  const studentCount = Number(studentCountSelect.value);

  if (metricIndex === -1) {
    return;
  }

  const nextStudentIndex = studentIndex + 1;
  const nextMetricIndex = nextStudentIndex >= studentCount ? metricIndex + 1 : metricIndex;
  const wrappedStudentIndex = nextStudentIndex >= studentCount ? 0 : nextStudentIndex;

  if (nextMetricIndex >= metrics.length) {
    return;
  }

  const nextMetricKey = metrics[nextMetricIndex].key;
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
  const metrics = sheetMetrics(sheet);

  if (!sheet || !latestTeacherResults.length) {
    return;
  }

  const rows = [
    ['תלמיד', ...metrics.map((metric) => metric.label), 'ממוצע'],
    ...latestTeacherResults.map((student) => [
      student.studentName,
      ...metrics.map((metric) => {
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
  const metrics = sheetMetrics(sheet);

  if (!sheet || !latestTeacherResults.length) {
    return;
  }

  const studentLines = latestTeacherResults
    .map((student) => {
      const visibleScores = metrics
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

async function copyTeacherResults() {
  if (!latestTeacherResults.length || !navigator.clipboard) {
    return;
  }

  const sheet = selectedSheet();
  const metrics = sheetMetrics(sheet);
  if (!sheet) {
    return;
  }
  const lines = [
    `EduFitScore - כיתה ${currentTeacherClass()?.name || formatClassName(sheet.name)}`,
    ['תלמיד', ...metrics.map((metric) => metric.label), 'ממוצע'].join('\t'),
    ...latestTeacherResults.map((student) => [
      student.studentName,
      ...metrics.map((metric) => {
        const metricResult = student.results.find((item) => item.key === metric.key);
        return metricResult?.result?.score ?? '';
      }),
      student.averageScore ?? '',
    ].join('\t')),
  ];
  await navigator.clipboard.writeText(lines.join('\n'));
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
  const response = await apiFetch('/api/graph-snapshots', {
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
  const graphData = getHistoryGraphData();
  const visibleStudents = graphData.series
    .map((student, originalIndex) => ({ ...student, originalIndex }))
    .filter((student) => visibleHistoryGraphStudents.has(student.name));

  if (!graphData.entries.length || !visibleStudents.length) {
    setHistoryGraphMessage('אין גרף להורדה.', true);
    return;
  }

  try {
    const colors = ['#1f77b4', '#d62728', '#2ca02c', '#9467bd', '#ff7f0e', '#17becf', '#8c564b', '#e377c2', '#bcbd22', '#4b5563'];
    const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
    const canvas = document.createElement('canvas');
    const width = 1200;
    const chartHeight = 520;
    const legendRows = Math.max(1, Math.ceil(visibleStudents.length / 4));
    const margin = { top: 38, right: 90, bottom: 70, left: 68 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = chartHeight - margin.top - margin.bottom;
    const xForIndex = (index) => margin.left + (graphData.entries.length === 1 ? plotWidth / 2 : (plotWidth * index) / (graphData.entries.length - 1));
    const yForScore = (score) => margin.top + plotHeight - (plotHeight * Number(score)) / 100;
    const downloadCanvas = (href) => {
      const link = document.createElement('a');
      link.href = href;
      link.download = `history-graph-${currentTeacherClass()?.name || 'class'}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setHistoryGraphMessage('התמונה הורדה.');
    };
    const drawMarker = (shape, x, y, color) => {
      context.fillStyle = color;
      context.beginPath();
      if (shape === 'square') {
        context.fillRect(x - 6, y - 6, 12, 12);
        return;
      }
      if (shape === 'triangle') {
        context.moveTo(x, y - 8);
        context.lineTo(x - 8, y + 7);
        context.lineTo(x + 8, y + 7);
        context.closePath();
        context.fill();
        return;
      }
      if (shape === 'diamond') {
        context.moveTo(x, y - 8);
        context.lineTo(x - 8, y);
        context.lineTo(x, y + 8);
        context.lineTo(x + 8, y);
        context.closePath();
        context.fill();
        return;
      }
      if (shape === 'star') {
        context.font = 'bold 20px "Segoe UI", Arial, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('★', x, y);
        return;
      }
      context.arc(x, y, 7, 0, Math.PI * 2);
      context.fill();
    };

    canvas.width = 1200;
    canvas.height = 590 + (legendRows * 30);
    const context = canvas.getContext('2d');
    context.fillStyle = '#fffaf5';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#d8b38e';
    context.lineWidth = 3;
    context.strokeRect(20, 18, width - 40, chartHeight - 32);

    for (let tick = 0; tick <= 100; tick += 5) {
      const major = tick % 20 === 0;
      context.strokeStyle = major ? '#c99c78' : '#f4e8dd';
      context.lineWidth = major ? 1.4 : 0.55;
      context.beginPath();
      context.moveTo(margin.left, yForScore(tick));
      context.lineTo(width - margin.right, yForScore(tick));
      context.stroke();
    }

    context.strokeStyle = '#5e4335';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(margin.left, margin.top);
    context.lineTo(margin.left, chartHeight - margin.bottom);
    context.lineTo(width - margin.right, chartHeight - margin.bottom);
    context.stroke();

    context.fillStyle = '#3a2417';
    context.font = 'bold 19px "Segoe UI", Arial, sans-serif';
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.fillText('ציון', margin.left, 30);
    context.font = 'bold 16px "Segoe UI", Arial, sans-serif';
    context.textAlign = 'right';
    [0, 20, 40, 60, 80, 100].forEach((tick) => {
      context.fillText(String(tick), margin.left - 16, yForScore(tick) + 5);
    });
    context.textAlign = 'center';
    graphData.entries.forEach((entry, index) => {
      context.fillText(entry.date, xForIndex(index), chartHeight - 28);
    });

    visibleStudents.forEach((student) => {
      const color = colors[student.originalIndex % colors.length];
      const shape = shapes[student.originalIndex % shapes.length];
      let previousPoint = null;
      student.scores.forEach((score, index) => {
        if (score === null) {
          previousPoint = null;
          return;
        }
        const normalizedScore = typeof score === 'number' ? { score } : score;
        const point = { x: xForIndex(index), y: yForScore(normalizedScore.score) };
        if (previousPoint) {
          context.strokeStyle = color;
          context.lineWidth = 4;
          context.beginPath();
          context.moveTo(previousPoint.x, previousPoint.y);
          context.lineTo(point.x, point.y);
          context.stroke();
        }
        drawMarker(shape, point.x, point.y, color);
        previousPoint = point;
      });
    });

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

    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (!blob) {
          try {
            downloadCanvas(canvas.toDataURL('image/png'));
          } catch (error) {
            setHistoryGraphMessage('לא ניתן להוריד תמונה כרגע.', true);
          }
          return;
        }
        const url = URL.createObjectURL(blob);
        downloadCanvas(url);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    } else {
      downloadCanvas(canvas.toDataURL('image/png'));
    }
  } catch (error) {
    setHistoryGraphMessage('לא ניתן להוריד תמונה כרגע.', true);
  }
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
  try {
    if (!canTeacherEnterScores()) {
      teacherClassFormError.textContent = teacherScoreAccessMessage();
      return;
    }

    if (!activeTeacherClassId) {
      teacherClassFormError.textContent = 'יש לבחור או ליצור כיתה לפני שמירה להיסטוריה.';
      return;
    }

    if (activeTeacherSemester === 'yearly') {
      teacherClassFormError.textContent = 'מצב שנתי מחושב ממחציות א׳ וב׳ ולא נשמר כהיסטוריה נפרדת.';
      return;
    }

    teacherClassFormError.textContent = 'שומר היסטוריה...';
    const activeClass = currentTeacherClass();
    if (activeClass?.schoolId && !activeTeacherSchoolScoreTable) {
      await syncScoreSourceForTeacherClass(activeClass);
    }
    const currentSheet = selectedSheet();
    if (!currentSheet) {
      teacherClassFormError.textContent = 'לא נמצאה טבלת ציונים לכיתה. פתחו את הכיתה מחדש או בדקו שהשכבה והקבוצה קיימות בבית-הספר.';
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

    const response = await apiFetch('/api/bulk-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheetId: currentSheet.id,
        gender: activeTeacherGender(),
        classId: activeTeacherClassId,
        semester: activeTeacherSemester,
        students: rawStudents,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const serverError = errorData.error ? ` (${errorData.error})` : '';
      teacherClassFormError.textContent = `לא ניתן לשמור היסטוריה כרגע${serverError}.`;
      return;
    }

    const data = await response.json();
    latestTeacherResults = data.students;
    renderTeacherResultsTable(data.students);
    if (data.historyEntry && historyEntryHasScores(data.historyEntry)) {
      const entrySemester = data.historyEntry.payload?.semester || 'a';
      teacherHistoryCalculatedCount += 1;
      if (entrySemester === activeTeacherSemester) {
        teacherHistoryEntries = [...teacherHistoryEntries, data.historyEntry]
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        selectedTeacherHistoryIndex = teacherHistoryEntries.length - 1;
      }
    } else {
      await loadTeacherClassHistory(activeTeacherClassId);
    }
    setTeacherSubview('detail', false);
    teacherClassFormError.textContent = 'הרשומה נשמרה בהיסטוריה. ניתן ללחוץ על היסטוריה לצפייה ברשומה האחרונה.';
    openInvalidScoreModal();
  } catch (error) {
    teacherClassFormError.textContent = `לא ניתן לשמור היסטוריה כרגע (${error.message || 'שגיאת מערכת'}).`;
  }
}

function renderTeacherView() {
  hydrateTeacherRosterFromClass();
  syncTeacherRoster();
  syncSemesterControls();
  const scoreEntryAllowed = canTeacherEnterScores();
  [teacherCalculateButton, teacherSaveHistoryButton, teacherPasteApplyButton, teacherClearValuesButton].forEach((button) => {
    if (button) {
      button.disabled = !scoreEntryAllowed;
      button.title = scoreEntryAllowed ? '' : teacherScoreAccessMessage();
    }
  });
  renderTeacherEntryTable();
  renderTeacherClassList();
}

function syncTeacherStudentEditControls() {
  teacherEditStudentsButton?.classList.toggle('is-hidden', teacherEditMode);
  teacherSaveStudentNamesButton?.classList.toggle('is-hidden', !teacherEditMode);
  teacherCancelStudentNamesButton?.classList.toggle('is-hidden', !teacherEditMode);
  if (teacherSaveStudentNamesButton && !teacherEditMode) {
    teacherSaveStudentNamesButton.disabled = false;
    teacherSaveStudentNamesButton.textContent = 'שמירה';
  }
}

function startTeacherStudentNameEdit() {
  teacherEditRosterSnapshot = teacherRoster.map((student) => ({ ...student }));
  teacherEditMode = true;
  setTeacherEditSaveMessage('');
  teacherClassFormError.textContent = '';
  syncTeacherStudentEditControls();
  renderTeacherView();
}

async function saveTeacherStudentNameEdit() {
  if (!teacherEditMode) {
    return;
  }

  let savedClass = null;
  if (teacherSaveStudentNamesButton) {
    teacherSaveStudentNamesButton.disabled = true;
    teacherSaveStudentNamesButton.textContent = 'שומר...';
  }
  try {
    setTeacherEditSaveMessage('');
    syncTeacherRoster();
    const activeClass = currentTeacherClass();
    const payload = {
      name: teacherClassNameInput.value.trim() || activeClass?.name || 'כיתה ללא שם',
      grade: teacherClassGradeSelect.value,
      gender: activeTeacherGenderValue,
      studentCount: Number(studentCountSelect.value),
      roster: teacherRoster,
      values: normalizeTeacherClassValues(teacherClassValues),
    };
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);
    let response;
    try {
      response = await apiFetch(`/api/teacher/classes/${activeTeacherClassId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } finally {
      window.clearTimeout(timeoutId);
    }

    if (!response.ok) {
      setTeacherEditSaveMessage('לא ניתן לשמור כרגע.');
      syncTeacherStudentEditControls();
      return;
    }

    const data = await response.json();
    savedClass = data.teacherClass;
    teacherClasses = teacherClasses.map((item) => (item.id === savedClass.id ? savedClass : item));
  } catch (error) {
    console.error('Student name save failed', error);
  } finally {
    if (teacherSaveStudentNamesButton) {
      teacherSaveStudentNamesButton.disabled = false;
      teacherSaveStudentNamesButton.textContent = 'שמירה';
    }
  }

  if (!savedClass) {
    const activeClass = currentTeacherClass();
    if (activeClass) {
      activeClass.roster = teacherRoster;
    }
  }

  if (savedClass || currentTeacherClass()) {
    teacherEditMode = false;
    teacherEditRosterSnapshot = null;
    teacherRoster = savedClass?.roster?.length ? savedClass.roster : teacherRoster;
    syncTeacherStudentEditControls();
    renderTeacherView();
    window.setTimeout(() => {
      setTeacherEditSaveMessage('עריכה נשמרה.', true);
    }, 0);
    return;
  }

  window.setTimeout(() => {
    setTeacherEditSaveMessage('לא ניתן לשמור כרגע.');
  }, 0);
  syncTeacherStudentEditControls();
}

function cancelTeacherStudentNameEdit() {
  if (!teacherEditMode) {
    return;
  }

  if (teacherEditRosterSnapshot) {
    teacherRoster = teacherEditRosterSnapshot.map((student) => ({ ...student }));
  }
  teacherEditMode = false;
  teacherEditRosterSnapshot = null;
  setTeacherEditSaveMessage('העריכה בוטלה.', true);
  syncTeacherStudentEditControls();
  renderTeacherView();
}

async function setTeacherSemester(semester) {
  if (!['a', 'b'].includes(semester)) {
    return;
  }

  syncTeacherClassValuesFromInputs();
  activeTeacherSemester = semester;
  syncSemesterControls();
  renderTeacherView();
}

async function setTeacherHistorySemester(semester) {
  if (!['a', 'b', 'yearly'].includes(semester)) {
    return;
  }

  activeTeacherHistorySemester = semester;
  teacherHistoryEditMode = false;
  syncSemesterControls();
  if (activeTeacherClassId) {
    await loadTeacherClassHistory(activeTeacherClassId);
    return;
  }
  renderTeacherHistoryEntry();
}

function applyPastedTeacherData() {
  if (!canTeacherEnterScores()) {
    teacherClassFormError.textContent = teacherScoreAccessMessage();
    return;
  }

  const sheet = selectedSheet();
  const raw = teacherPasteBox.value.replace(/\r/g, '').trim();

  if (!raw || !sheet) {
    return;
  }

  const rows = raw.split('\n').map((line) => line.split('\t'));
  syncTeacherRoster();
  const metrics = sheetMetrics(sheet);

  rows.slice(0, teacherRoster.length).forEach((row, rowIndex) => {
    row.slice(0, metrics.length).forEach((value, columnIndex) => {
      const metric = metrics[columnIndex];
      const input = teacherEntryTable.querySelector(`[data-student-index="${rowIndex}"][data-metric-key="${metric.key}"]`);

      if (input) {
        const trimmedValue = integerOnlyValue(value);
        input.value = trimmedValue;
        const semesterValues = currentSemesterValues();
        semesterValues[teacherRoster[rowIndex].id] = {
          ...(semesterValues[teacherRoster[rowIndex].id] || {}),
          [metric.key]: trimmedValue,
        };
        setCurrentSemesterValues(semesterValues);
      }
    });
  });
}

function clearTeacherValues() {
  if (!canTeacherEnterScores()) {
    teacherClassFormError.textContent = teacherScoreAccessMessage();
    return;
  }

  if (activeTeacherSemester === 'yearly') {
    teacherClassFormError.textContent = 'מצב שנתי מחושב ממחציות א׳ וב׳ ולא ניתן לנקות בו ציונים.';
    return;
  }

  teacherEntryTable.querySelectorAll('input[data-student-index][data-metric-key]').forEach((input) => {
    input.value = '';
  });
  teacherPasteBox.value = '';
  setCurrentSemesterValues({});
  resetTeacherResults();
}

function handleTeacherEntryClick(event) {
}

async function handleTeacherClassListClick(event) {
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
    await loadTeacherClassIntoWorkspace(teacherClass);
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
  apiFetch('/api/teacher/classes/reorder', {
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
      apiFetch('/api/teacher/classes/reorder', {
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
  apiFetch('/api/teacher/classes/reorder', {
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

function handleTeacherNamePaste(event) {
  const input = event.target.closest('[data-student-name-index], [data-new-student-index]');
  if (!input) {
    return;
  }

  const clipboardText = event.clipboardData?.getData('text') || '';
  const grid = parseClipboardGrid(clipboardText);
  const names = grid.length > 1
    ? grid.map((row) => row.map((cell) => cell.trim()).filter(Boolean).join(' ')).filter(Boolean)
    : clipboardText
      .split(/[,\.\n\r\t]+/)
      .map((name) => name.trim())
      .filter(Boolean);

  if (names.length < 2) {
    return;
  }

  event.preventDefault();
  const container = input.closest('form, .teacher-entry-table, .teacher-class-student-names');
  const allInputs = Array.from(container.querySelectorAll('[data-student-name-index], [data-new-student-index]'));
  const startIndex = allInputs.indexOf(input);
  allInputs.slice(startIndex, startIndex + names.length).forEach((targetInput, index) => {
    targetInput.value = names[index];
    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

function handleTeacherEntryInput(event) {
  const input = event.target.closest('input[data-student-index][data-metric-key]');

  if (!input || !canTeacherEnterScores()) {
    return;
  }

  const sanitizedValue = integerOnlyValue(input.value);
  if (input.value !== sanitizedValue) {
    input.value = sanitizedValue;
  }

  const studentIndex = Number(input.dataset.studentIndex);
  const student = teacherRoster[studentIndex];

  if (!student) {
    return;
  }

  const semesterValues = currentSemesterValues();
  semesterValues[student.id] = {
    ...(semesterValues[student.id] || {}),
    [input.dataset.metricKey]: sanitizedValue,
  };
  setCurrentSemesterValues(semesterValues);
}

function parseClipboardGrid(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .filter((line) => line.length)
    .map((line) => line.split('\t').map((cell) => cell.trim()));
}

function teacherEntryInputsByVisualColumn(studentIndex) {
  return Array.from(teacherEntryTable.querySelectorAll(`input[data-student-index="${studentIndex}"][data-metric-key]`))
    .sort((left, right) => right.getBoundingClientRect().left - left.getBoundingClientRect().left);
}

function handleTeacherEntryPaste(event) {
  const input = event.target.closest('input[data-student-index][data-metric-key]');

  if (!input || activeTeacherSemester === 'yearly' || !canTeacherEnterScores()) {
    return;
  }

  const clipboardText = event.clipboardData?.getData('text') || '';
  const grid = parseClipboardGrid(clipboardText);

  if (!grid.length || !grid.some((row) => row.some(Boolean))) {
    return;
  }

  event.preventDefault();

  const startIndex = Number(input.dataset.studentIndex);
  const metricKey = input.dataset.metricKey;
  const isSingleColumnPaste = grid.every((row) => row.length <= 1);

  if (isSingleColumnPaste) {
    const pastedScores = grid.map((row) => row[0] || '').filter(Boolean);
    const targetInputs = Array.from(teacherEntryTable.querySelectorAll(`input[data-metric-key="${metricKey}"]`))
      .filter((item) => Number(item.dataset.studentIndex) >= startIndex)
      .sort((a, b) => Number(a.dataset.studentIndex) - Number(b.dataset.studentIndex));

    targetInputs.slice(0, pastedScores.length).forEach((targetInput, index) => {
      targetInput.value = teacherEntryValue(pastedScores[index]);
      handleTeacherEntryInput({ target: targetInput });
    });
    return;
  }

  grid.forEach((row, rowOffset) => {
    const studentIndex = startIndex + rowOffset;
    const visualInputs = teacherEntryInputsByVisualColumn(studentIndex);
    const visualStartIndex = visualInputs.findIndex((item) => item.dataset.metricKey === metricKey);

    if (visualStartIndex === -1) {
      return;
    }

    row.forEach((cell, columnOffset) => {
      const targetInput = visualInputs[visualStartIndex + columnOffset];
      if (!targetInput || !cell) {
        return;
      }

      targetInput.value = teacherEntryValue(cell);
      handleTeacherEntryInput({ target: targetInput });
    });
  });
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

  maleStudentTabButton?.classList.toggle('is-active', viewName === 'student_male');
  femaleStudentTabButton?.classList.toggle('is-active', viewName === 'student_female');
  teacherTabButton.classList.toggle('is-active', viewName === 'teacher');
  studentView.classList.toggle('is-hidden', !isStudentView);
  teacherView.classList.toggle('is-hidden', isStudentView);
  teacherTopControls.classList.toggle('is-hidden', isStudentView || isTeacherMemberMode);
}

function matchSchoolScoreTableResult(table, subjectId, rawValue) {
  return window.SchoolScore.matchSchoolScoreTableResult(table, subjectId, rawValue);
}

async function calculateScore(event) {
  event.preventDefault();
  const currentSheet = selectedSheet();
  if (currentSheet?.table && !currentSheet.metrics) {
    const values = Object.fromEntries(new FormData(scoreForm).entries());
    const results = currentSheet.table.subjects.map((subject) => {
      const rawValue = String(values[subject.id] || '').trim();
      const matchedRow = matchSchoolScoreTableResult(currentSheet.table, subject.id, rawValue);
      return {
        key: subject.id,
        label: subject.name,
        result: rawValue ? { score: matchedRow?.score ?? null, matchedValue: matchedRow?.matchedValue || rawValue } : null,
      };
    });
    const scores = results.map((item) => item.result?.score).filter((score) => Number.isFinite(score));
    renderStudentResults({ results, averageScore: scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : null });
    return;
  }

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
  try {
  teacherClassFormError.textContent = 'מחשב ציונים...';
  if (!canTeacherEnterScores()) {
    teacherClassFormError.textContent = teacherScoreAccessMessage();
    return;
  }

  if (!activeTeacherClassId) {
    teacherClassFormError.textContent = 'יש לבחור או ליצור כיתה לפני חישוב.';
    return;
  }

  if (activeTeacherSemester === 'yearly') {
    await loadTeacherClassHistory(activeTeacherClassId);
    latestTeacherResults = calculateYearlyTeacherResults();
    renderTeacherResultsTable(latestTeacherResults);
    teacherClassFormError.textContent = '';
    return;
  }

  syncTeacherClassValuesFromInputs();

  const currentSheet = selectedSheet();
  if (!currentSheet) {
    teacherClassFormError.textContent = 'לא נמצאה טבלת ציונים לבית-הספר, השכבה והקבוצה של הכיתה.';
    return;
  }
  if (currentSheet?.table && !currentSheet.metrics) {
    const students = collectTeacherStudents().map((student) => {
      const results = currentSheet.table.subjects.map((subject) => {
        const rawValue = String(student.values?.[subject.id] || '').trim();
        const matchedRow = matchSchoolScoreTableResult(currentSheet.table, subject.id, rawValue);
        return {
          key: subject.id,
          label: subject.name,
          enteredValue: rawValue,
          result: rawValue ? { score: matchedRow?.score ?? null, matchedValue: matchedRow?.matchedValue || rawValue } : null,
        };
      });
      const numericScores = results.map((item) => item.result?.score).filter((score) => Number.isFinite(score));
      return {
        studentName: student.studentName,
        results,
        averageScore: numericScores.length ? Math.floor(numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length) : null,
      };
    });
    latestTeacherResults = students;
    renderTeacherResultsTable(students);
    teacherClassFormError.textContent = '';
    return;
  }

  const response = await apiFetch('/api/bulk-score', {
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
  teacherClassFormError.textContent = '';
  openInvalidScoreModal();
  } catch (error) {
    teacherClassFormError.textContent = 'לא ניתן להמיר ציונים כרגע. נסו לרענן ולפתוח את הכיתה מחדש.';
  }
}

async function deleteCurrentTeacherClass() {
  if (!pendingDeleteClassId) {
    return;
  }

  const response = await apiFetch(`/api/teacher/classes/${pendingDeleteClassId}`, {
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

function renderStudentCurrentView() {
  renderClassTabs();
  renderStudentForm();
  latestStudentResult = null;
  renderStudentResults({ results: [], averageScore: null });
}

function renderTeacherCurrentView() {
  renderClassTabs();
  if (activeView === 'teacher' && (teacherSubview === 'detail' || teacherSubview === 'history') && currentTeacherClass()) {
    renderTeacherView();
  }
  renderTeacherClassList();
}

function renderCurrentView() {
  if (activeView.startsWith('student')) {
    renderStudentCurrentView();
    return;
  }

  if (activeView === 'teacher') {
    renderTeacherCurrentView();
  }
}

async function init() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-password-toggle]');
    if (button) {
      togglePasswordVisibility(button);
    }
  });

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
    .map((sheet) => `<option value="${escapeAttr(sheet.id)}">${escapeHtml(formatClassName(sheet.name))}</option>`)
    .join('');
  await loadStudentSchoolScoreSources();
  renderStudentSchoolScoreFilters();

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
  if (studentSchoolScoreSourceSelect) {
    studentSchoolScoreSourceSelect.addEventListener('change', loadSelectedStudentSchoolScoreTables);
  }
  studentSchoolGradeButtons?.addEventListener('click', (event) => {
    const defaultButton = event.target.closest('[data-default-student-grade]');
    if (defaultButton) {
      selectedDefaultStudentGrade = defaultButton.dataset.defaultStudentGrade;
      renderStudentSchoolScoreFilters();
      renderCurrentView();
      return;
    }
    const button = event.target.closest('[data-student-school-grade]');
    if (!button) {
      return;
    }
    selectedStudentSchoolGrade = Number(button.dataset.studentSchoolGrade);
    renderStudentSchoolScoreFilters();
    renderCurrentView();
  });
  studentSchoolGroupButtons?.addEventListener('click', (event) => {
    const defaultButton = event.target.closest('[data-default-student-group]');
    if (defaultButton) {
      selectedDefaultStudentGroup = defaultButton.dataset.defaultStudentGroup;
      selectedDefaultStudentGrade = '';
      renderStudentSchoolScoreFilters();
      renderCurrentView();
      return;
    }
    const button = event.target.closest('[data-student-school-group]');
    if (!button) {
      return;
    }
    selectedStudentSchoolGroup = button.dataset.studentSchoolGroup;
    renderStudentSchoolScoreFilters();
    renderCurrentView();
  });
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
    teacherEntryTable.addEventListener('paste', handleTeacherEntryPaste);
    teacherEntryTable.addEventListener('paste', handleTeacherNamePaste);
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
    teacherEditStudentsButton.addEventListener('click', startTeacherStudentNameEdit);
  }
  teacherEditStudentsButton?.closest('.teacher-tools-actions')?.addEventListener('click', (event) => {
    if (event.target.closest('#teacher-save-student-names')) {
      saveTeacherStudentNameEdit();
      return;
    }
    if (event.target.closest('#teacher-cancel-student-names')) {
      cancelTeacherStudentNameEdit();
    }
  });
  syncTeacherStudentEditControls();
  if (teacherSaveClassButton) { teacherSaveClassButton.addEventListener('click', saveCurrentTeacherClass); }
  if (teacherSaveHistoryButton) { teacherSaveHistoryButton.addEventListener('click', saveTeacherHistorySnapshot); }
  teacherEntrySemesterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setTeacherSemester(button.dataset.entrySemester);
    });
  });
  teacherHistorySemesterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setTeacherHistorySemester(button.dataset.historySemester);
    });
  });
  if (teacherYearlyRatioInput) {
    teacherYearlyRatioInput.addEventListener('input', () => {
      teacherYearlySemesterARatio = Number(teacherYearlyRatioInput.value);
      const normalized = normalizeTeacherClassValues(teacherClassValues);
      normalized.yearlyRatioA = teacherYearlySemesterARatio;
      teacherClassValues = normalized;
      if (currentTeacherClass()) {
        currentTeacherClass().values = normalized;
      }
      syncSemesterControls();
      if (activeTeacherHistorySemester === 'yearly') {
        renderYearlyHistorySummary();
      }
    });
  }
  if (teacherClassForm) {
    teacherClassForm.addEventListener('submit', createTeacherClassFromForm);
    teacherClassForm.addEventListener('keydown', handleTeacherNameKeydown);
    teacherClassForm.addEventListener('paste', handleTeacherNamePaste);
  }
  if (teacherClassRosterImportInput) { teacherClassRosterImportInput.addEventListener('change', importTeacherClassesFromRoster); }
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
      syncTeacherClassSchoolField();
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
    teacherOpenHistoryViewButton.addEventListener('click', async () => {
      activeTeacherHistorySemester = activeTeacherSemester === 'b' ? 'b' : 'a';
      syncSemesterControls();
      setTeacherSubview('history');
      if (activeTeacherClassId) {
        await loadTeacherClassHistory(activeTeacherClassId);
        return;
      }
      renderTeacherHistoryEntry();
    });
  }
  if (teacherSchoolAdminSwitchButton) { teacherSchoolAdminSwitchButton.addEventListener('click', () => applyRoute('schoolAdmin')); }
  if (teacherBackToClassDetailButton) {
    teacherBackToClassDetailButton.addEventListener('click', () => {
      setTeacherSubview('detail');
      renderTeacherView();
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
    teacherHistoryRecordsButton.addEventListener('click', async () => {
      if (teacherHistoryMode === 'records') {
        renderTeacherHistoryEntry();
        return;
      }

      if (activeTeacherClassId) {
        await loadTeacherClassHistory(activeTeacherClassId);
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
    teacherHistorySelectedDate.addEventListener('change', async (event) => {
      const semesterSelect = event.target.closest('[data-history-semester-edit]');
      if (!semesterSelect) {
        return;
      }
      const response = await apiFetch(`/api/teacher/classes/${activeTeacherClassId}/history/${semesterSelect.dataset.historyId}/semester`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ semester: semesterSelect.value }),
      });
      if (response.ok) {
        activeTeacherHistorySemester = semesterSelect.value;
        syncSemesterControls();
        await loadTeacherClassHistory(activeTeacherClassId);
      }
    });
    teacherHistorySelectedDate.addEventListener('click', async (event) => {
      const editButton = event.target.closest('[data-edit-history-entry]');
      const deleteButton = event.target.closest('[data-delete-history-id]');
      const recordsWhatsappButton = event.target.closest('[data-history-records-whatsapp]');
      const recordsCsvButton = event.target.closest('[data-history-records-csv]');

      if (editButton) {
        const wasEditing = teacherHistoryEditMode;
        teacherHistoryEditMode = !teacherHistoryEditMode;
        if (activeTeacherHistorySemester === 'yearly' && wasEditing) {
          await saveCurrentTeacherClassQuietly();
        }
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
  if (teacherClassHistory) {
    teacherClassHistory.addEventListener('click', (event) => {
      if (event.target.closest('[data-yearly-share-whatsapp]')) {
        shareWhatsapp();
        return;
      }
      if (event.target.closest('[data-yearly-download-csv]')) {
        downloadCsv();
        return;
      }
      if (event.target.closest('[data-yearly-copy]')) {
        copyTeacherResults();
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
  maleStudentTabButton?.addEventListener('click', () => {
    setActiveView('student_male');
    renderCurrentView();
  });
  femaleStudentTabButton?.addEventListener('click', () => {
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
  addTapFallback(guestEntryButton, () => {
    applyRoute('guest');
  });
  addTapFallback(memberEntryButton, () => {
    applyRoute('member');
  });
  memberLoginForm.addEventListener('submit', handleMemberLogin);
  if (memberTwoFactorForm) { memberTwoFactorForm.addEventListener('submit', handleMemberTwoFactor); }
  if (memberTwoFactorCancelButton) { memberTwoFactorCancelButton.addEventListener('click', cancelMemberTwoFactor); }
  if (memberSignupButton) { memberSignupButton.addEventListener('click', () => applyRoute('signup')); }
  if (memberSignupBackButton) { memberSignupBackButton.addEventListener('click', () => applyRoute('member')); }
  if (forgotPasswordButton) { forgotPasswordButton.addEventListener('click', () => applyRoute('forgotPassword')); }
  if (forgotPasswordBackButton) { forgotPasswordBackButton.addEventListener('click', () => applyRoute('member')); }
  if (forgotPasswordForm) { forgotPasswordForm.addEventListener('submit', handleForgotPassword); }
  if (resetPasswordBackButton) { resetPasswordBackButton.addEventListener('click', () => applyRoute('member')); }
  if (verifyEmailLoginButton) { verifyEmailLoginButton.addEventListener('click', () => applyRoute('member')); }
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
    signupAccountType?.addEventListener('change', syncSignupSchoolFields);
    signupSchoolSelect?.addEventListener('input', syncSelectedSignupSchool);
    syncSignupSchoolFields();
    loadSchoolsForSignup();
    const inviteToken = new URLSearchParams(window.location.search).get('invite') || '';
    if (signupInviteTokenInput && inviteToken) {
      signupInviteTokenInput.value = inviteToken;
      if (signupAccountType) {
        signupAccountType.value = 'teacher';
      }
      syncSignupSchoolFields();
    }
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
  if (adminSecurityNavButton) { adminSecurityNavButton.addEventListener('click', () => applyRoute('adminSecurity')); }
  if (adminSecurityAdminTab) { adminSecurityAdminTab.addEventListener('click', () => applyRoute('admin')); }
  if (adminSecurityCurrentTab) { adminSecurityCurrentTab.addEventListener('click', () => applyRoute('adminSecurity')); }
  if (adminSecurityBackButton) { adminSecurityBackButton.addEventListener('click', () => applyRoute('admin')); }
  if (adminSecurityExportButton) { adminSecurityExportButton.addEventListener('click', openAdminSecurityExportModal); }
  if (adminSecurityExportForm) { adminSecurityExportForm.addEventListener('submit', exportAdminSecurityLog); }
  if (adminSecurityExportCancelButton) { adminSecurityExportCancelButton.addEventListener('click', closeAdminSecurityExportModal); }
  if (adminSecurityExportCloseButton) { adminSecurityExportCloseButton.addEventListener('click', closeAdminSecurityExportModal); }
  if (profileCloseButton) { profileCloseButton.addEventListener('click', () => applyRoute(authUser?.role === 'admin' ? 'admin' : 'member')); }
  if (profileDetailsForm) {
    profileDetailsForm.addEventListener('submit', saveProfileDetails);
    profileDetailsForm.querySelectorAll('input[type="tel"]').forEach((input) => {
      input.addEventListener('input', restrictPhoneInput);
    });
  }
  if (profileSchoolRequestButton) { profileSchoolRequestButton.addEventListener('click', requestAdditionalSchool); }
  if (profileLogoutOtherSessionsButton) { profileLogoutOtherSessionsButton.addEventListener('click', logoutOtherSessions); }
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
  adminLogoutButton?.addEventListener('click', logoutMember);
  if (adminRestoreUserForm) { adminRestoreUserForm.addEventListener('submit', handleAdminRestoreUser); }
  if (adminTwoFactorStartForm) { adminTwoFactorStartForm.addEventListener('submit', startAdminTwoFactorSetup); }
  if (adminTwoFactorVerifyForm) { adminTwoFactorVerifyForm.addEventListener('submit', verifyAdminTwoFactorSetup); }
  if (adminTwoFactorRegenerateRecoveryButton) { adminTwoFactorRegenerateRecoveryButton.addEventListener('click', openAdminTwoFactorRegenerateModal); }
  if (adminTwoFactorRegenerateForm) { adminTwoFactorRegenerateForm.addEventListener('submit', requestAdminTwoFactorRecoveryRegeneration); }
  if (adminTwoFactorRegenerateCancelButton) { adminTwoFactorRegenerateCancelButton.addEventListener('click', closeAdminTwoFactorRegenerateModal); }
  if (adminTwoFactorRegenerateCloseButton) { adminTwoFactorRegenerateCloseButton.addEventListener('click', closeAdminTwoFactorRegenerateModal); }
  if (adminTwoFactorDisableForm) { adminTwoFactorDisableForm.addEventListener('submit', disableAdminTwoFactor); }
  if (adminBackupButton) { adminBackupButton.addEventListener('click', openAdminBackupExportModal); }
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
      const sortButton = event.target.closest('[data-admin-sort-key]');
      const restoreButton = event.target.closest('[data-restore-user-email]');
      const statusButton = event.target.closest('[data-status-user-id]');
      const passwordButton = event.target.closest('[data-reset-password-user-id]');
      const permanentDeleteButton = event.target.closest('[data-permanent-delete-user-id]');

      if (sortButton) {
        const key = sortButton.dataset.adminSortKey;
        adminUsersSort = {
          key,
          direction: adminUsersSort.key === key && adminUsersSort.direction === 'asc' ? 'desc' : 'asc',
        };
        loadAdminUsers();
        return;
      }

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
        return;
      }

      if (permanentDeleteButton) {
        openAdminPermanentDeleteModal(permanentDeleteButton);
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
  if (adminBackupExportForm) { adminBackupExportForm.addEventListener('submit', confirmAdminBackupExport); }
  if (adminBackupExportCancelButton) { adminBackupExportCancelButton.addEventListener('click', closeAdminBackupExportModal); }
  if (adminBackupExportCloseButton) { adminBackupExportCloseButton.addEventListener('click', closeAdminBackupExportModal); }
  if (adminBackupConfirmForm) { adminBackupConfirmForm.addEventListener('submit', confirmAdminBackupRestore); }
  if (adminBackupConfirmCancelButton) { adminBackupConfirmCancelButton.addEventListener('click', closeAdminBackupConfirmModal); }
  if (adminBackupConfirmCloseButton) { adminBackupConfirmCloseButton.addEventListener('click', closeAdminBackupConfirmModal); }
  if (adminPermanentDeleteForm) { adminPermanentDeleteForm.addEventListener('submit', submitAdminPermanentDelete); }
  if (adminPermanentDeleteCancelButton) { adminPermanentDeleteCancelButton.addEventListener('click', closeAdminPermanentDeleteModal); }
  if (adminPermanentDeleteCloseButton) { adminPermanentDeleteCloseButton.addEventListener('click', closeAdminPermanentDeleteModal); }
  if (adminBackupResultOkButton) { adminBackupResultOkButton.addEventListener('click', closeAdminBackupResultModal); }
  if (adminBackupResultCloseButton) { adminBackupResultCloseButton.addEventListener('click', closeAdminBackupResultModal); }
  if (schoolAdminTeacherModeButton) { schoolAdminTeacherModeButton.addEventListener('click', () => applyRoute('member-classes')); }
  if (schoolAdminInviteForm) { schoolAdminInviteForm.addEventListener('submit', createSchoolAdminInvite); }
  if (schoolAdminScoreTablesButton) { schoolAdminScoreTablesButton.addEventListener('click', () => applyRoute('schoolAdminScoreTables')); }
  if (schoolAdminScoreTablesBackButton) { schoolAdminScoreTablesBackButton.addEventListener('click', () => applyRoute('schoolAdmin')); }
  if (schoolScoreTableNewButton) { schoolScoreTableNewButton.addEventListener('click', () => { schoolScoreTableCreatePanel.classList.remove('is-hidden'); schoolScoreTableBuilder.classList.add('is-hidden'); }); }
  if (schoolScoreTableViewToggleButton) {
    schoolScoreTableViewToggleButton.addEventListener('click', () => {
      schoolScoreTableListView = schoolScoreTableListView === 'cards' ? 'list' : 'cards';
      renderSchoolScoreTableCards();
    });
  }
  if (schoolScoreTableSortField) { schoolScoreTableSortField.addEventListener('change', renderSchoolScoreTableCards); }
  if (schoolScoreTableSortDirection) { schoolScoreTableSortDirection.addEventListener('change', renderSchoolScoreTableCards); }
  if (schoolScoreTableEditButton) {
    schoolScoreTableEditButton.addEventListener('click', () => {
      schoolScoreTablesEditMode = !schoolScoreTablesEditMode;
      renderSchoolScoreTables();
    });
  }
  if (schoolScoreTableRefreshButton) { schoolScoreTableRefreshButton.addEventListener('click', loadSchoolScoreTables); }
  if (schoolScoreTableRangeCancelButton) { schoolScoreTableRangeCancelButton.addEventListener('click', () => schoolScoreTableRangeForm.classList.add('is-hidden')); }
  if (schoolScoreTableRangeForm) { schoolScoreTableRangeForm.addEventListener('submit', saveSchoolScoreTableSettings); }
  if (schoolScoreTableCreateForm) { schoolScoreTableCreateForm.addEventListener('submit', createSchoolScoreTable); }
  schoolScoreTableGradeSelect?.addEventListener('change', syncSchoolScoreCreateAvailability);
  schoolScoreTableGenderSelect?.addEventListener('change', syncSchoolScoreCreateAvailability);
  if (schoolScoreTableCreateCancelButton) { schoolScoreTableCreateCancelButton.addEventListener('click', () => schoolScoreTableCreatePanel.classList.add('is-hidden')); }
  if (schoolScoreTableCards) {
    schoolScoreTableCards.addEventListener('click', async (event) => {
      const deleteButton = event.target.closest('[data-delete-school-score-table-card]');
      if (deleteButton) {
        activeSchoolScoreTableId = Number(deleteButton.dataset.deleteSchoolScoreTableCard);
        await deleteActiveSchoolScoreTable();
        return;
      }
      const button = event.target.closest('[data-open-school-score-table]');
      if (!button) {
        return;
      }
      activeSchoolScoreTableId = Number(button.dataset.openSchoolScoreTable);
      schoolScoreTableBuilder.classList.remove('is-hidden');
      schoolScoreTableCreatePanel.classList.add('is-hidden');
      renderSchoolScoreTables();
    });
  }
  if (schoolScoreTableGrid) {
    schoolScoreTableGrid.addEventListener('click', (event) => {
      if (event.target.closest('#school-score-table-add-subject')) {
        addSchoolScoreTableSubject();
      }
    });
    schoolScoreTableGrid.addEventListener('keydown', (event) => {
      const cellInput = event.target.closest('[data-score-row][data-score-subject-id]');
      if (!cellInput || event.key !== 'Enter') {
        return;
      }
      event.preventDefault();
      moveSchoolScoreTableFocusDown(cellInput);
    });
    schoolScoreTableGrid.addEventListener('input', (event) => {
      if (event.target.closest('[data-score-subject-index], [data-score-row]')) {
        syncActiveSchoolScoreTableFromGrid();
      }
    });
    schoolScoreTableGrid.addEventListener('paste', handleSchoolScoreTablePaste);
  }
  if (schoolScoreTableSaveButton) { schoolScoreTableSaveButton.addEventListener('click', saveActiveSchoolScoreTable); }
  if (schoolScoreTableCloseButton) { schoolScoreTableCloseButton.addEventListener('click', () => { activeSchoolScoreTableId = null; schoolScoreTableBuilder.classList.add('is-hidden'); renderSchoolScoreTables(); }); }
  if (schoolScoreTableDeleteButton) { schoolScoreTableDeleteButton.addEventListener('click', deleteActiveSchoolScoreTable); }
  if (schoolScoreTableImportInput) {
    schoolScoreTableImportInput.addEventListener('change', importSchoolScoreTables);
  }
  if (schoolAdminTeachers) {
    schoolAdminTeachers.addEventListener('click', async (event) => {
      const editButton = event.target.closest('[data-school-member-edit]');
      if (editButton) {
        const card = editButton.closest('.school-admin-teacher-card');
        card?.querySelector('.school-admin-teacher-actions')?.classList.toggle('is-hidden');
        return;
      }

      const button = event.target.closest('[data-school-membership-id]');
      if (!button) {
        return;
      }

      if (button.dataset.schoolMemberRemove) {
        if (!window.confirm('להסיר את המורה מבית הספר? החשבון יישאר פעיל אך לא יהיה מחובר לבית הספר הזה.')) {
          return;
        }
        const response = await apiFetch(`/api/school-admin/memberships/${button.dataset.schoolMembershipId}`, { method: 'DELETE' });
        if (response.ok) {
          await loadSchoolAdminOverview();
        }
        return;
      }

      const response = await apiFetch(`/api/school-admin/memberships/${button.dataset.schoolMembershipId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: button.dataset.schoolMemberStatus }),
      });

      if (response.ok) {
        await loadSchoolAdminOverview();
      }
    });
  }
  addTapFallback(topHomeButton, () => {
    applyRoute('home');
  });
  addTapFallback(adminNavButton, () => {
    applyRoute(authUser?.role === 'admin' ? 'admin' : 'member-classes');
  });
  addTapFallback(heroHomeButton, () => {
    applyRoute('home');
  });
  addTapFallback(privacyButton, () => {
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
  addTapFallback(contactButton, () => {
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
