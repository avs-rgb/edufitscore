const sheetSelect = document.querySelector('#sheet-select');
const scoreForm = document.querySelector('#score-form');
const averageScore = document.querySelector('#average-score');
const resultsList = document.querySelector('#results-list');
const studentShareWhatsappButton = document.querySelector('#student-share-whatsapp');
const shareSiteWhatsappButton = document.querySelector('#share-site-whatsapp');
const homeView = document.querySelector('#home-view');
const appShell = document.querySelector('#app-shell');
const guestEntryButton = document.querySelector('#guest-entry-button');
const memberEntryButton = document.querySelector('#member-entry-button');
const topHomeButton = document.querySelector('#top-home-button');
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
const downloadCsvButton = document.querySelector('#download-csv');
const shareWhatsappButton = document.querySelector('#share-whatsapp');
const teacherEntryTable = document.querySelector('#teacher-entry-table');
const teacherResultsTable = document.querySelector('#teacher-results-table');

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

const staticViews = {
  privacy: privacyView,
  terms: termsView,
  accessibility: accessibilityView,
  contact: contactView,
};

function parseRouteHash() {
  const hash = window.location.hash.replace('#', '');

  if (hash === 'guest') {
    return 'guest';
  }

  if (hash === 'member') {
    return 'member';
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
  const nextUrl = `${window.location.pathname}${window.location.search}${targetHash}`;

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
  teacherStudentCountLabel.textContent = activeTeacherGenderValue === 'female' ? 'מספר תלמידות' : 'מספר תלמידים';
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
}

function closeAccessibilityToolbar() {
  accessibilityToolbar.classList.add('is-hidden');
  accessibilityFab.setAttribute('aria-expanded', 'false');
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
  if (!staticViews[mode]) {
    previousEntryMode = mode;
  }

  currentEntryMode = mode;
  homeView.classList.toggle('is-hidden', mode !== 'home');
  appShell.classList.toggle('is-hidden', mode === 'home' || Boolean(staticViews[mode]));
  Object.entries(staticViews).forEach(([key, view]) => {
    view.classList.toggle('is-hidden', mode !== key);
  });

  const guestMode = mode === 'guest';
  const memberMode = mode === 'member';

  maleStudentTabButton.classList.toggle('is-hidden', memberMode);
  femaleStudentTabButton.classList.toggle('is-hidden', memberMode);
  teacherTabButton.classList.toggle('is-hidden', guestMode || memberMode);
}

function applyRoute(mode, replace = false) {
  setEntryMode(mode);

  if (mode === 'guest') {
    setActiveView('student_male');
    renderCurrentView();
  } else if (mode === 'member') {
    setActiveView('teacher');
    renderCurrentView();
  }

  updateRoute(mode, replace);
}

function formatCompactEntry(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}${String(remainingSeconds).padStart(2, '0')}`;
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

function createStudentOptions() {
  studentCountSelect.innerHTML = Array.from({ length: 45 }, (_, index) => {
    const value = index + 1;
    const selected = value === 10 ? ' selected' : '';
    return `<option value="${value}"${selected}>${value}</option>`;
  }).join('');
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

function renderTeacherEntryTable() {
  const sheet = selectedSheet();
  const studentCount = Number(studentCountSelect.value);

  teacherEntryTable.innerHTML = `
    <table class="teacher-entry-table">
      <thead>
        <tr>
          <th>${activeTeacherStudentLabel()}</th>
          ${sheet.metrics.map((metric) => `<th>${metric.label}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${Array.from({ length: studentCount }, (_, index) => `
          <tr>
            <td class="student-name-cell">${activeTeacherStudentLabel()} ${index + 1}</td>
            ${sheet.metrics.map((metric) => `
              <td>
                <input
                  data-student-index="${index}"
                  data-metric-key="${metric.key}"
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

  teacherResultsTable.innerHTML = `
    <table>
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
          ${Array.from({ length: Number(studentCountSelect.value) }, (_, index) => `
            <tr>
              <td class="student-name-cell">${activeTeacherStudentLabel()} ${index + 1}</td>
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
  const studentCount = Number(studentCountSelect.value);

  return Array.from({ length: studentCount }, (_, studentIndex) => ({
      studentName: `${activeTeacherStudentLabel()} ${studentIndex + 1}`,
    values: Object.fromEntries(sheet.metrics.map((metric) => {
      const input = teacherEntryTable.querySelector(`[data-student-index="${studentIndex}"][data-metric-key="${metric.key}"]`);
      return [metric.key, input?.value || ''];
    })),
  }));
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

function renderTeacherView() {
  renderTeacherEntryTable();
  resetTeacherResults();
}

function setActiveView(viewName) {
  activeView = viewName;
  const isStudentView = viewName.startsWith('student');

  maleStudentTabButton.classList.toggle('is-active', viewName === 'student_male');
  femaleStudentTabButton.classList.toggle('is-active', viewName === 'student_female');
  teacherTabButton.classList.toggle('is-active', viewName === 'teacher');
  studentView.classList.toggle('is-hidden', !isStudentView);
  teacherView.classList.toggle('is-hidden', isStudentView);
  teacherTopControls.classList.toggle('is-hidden', isStudentView);
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
  renderTeacherView();
}

async function init() {
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
  renderCurrentView();
  setActiveView('student_male');
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
  studentCountSelect.addEventListener('change', renderTeacherView);
  scoreForm.addEventListener('submit', calculateScore);
  studentShareWhatsappButton.addEventListener('click', shareStudentWhatsapp);
  shareSiteWhatsappButton.addEventListener('click', shareSiteWhatsapp);
  teacherCalculateButton.addEventListener('click', calculateTeacherScores);
  downloadCsvButton.addEventListener('click', downloadCsv);
  shareWhatsappButton.addEventListener('click', shareWhatsapp);
  teacherEntryTable.addEventListener('keydown', handleTeacherEntryKeydown);
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
    syncTeacherGenderTabs();
    renderTeacherView();
  });
  teacherFemaleTabButton.addEventListener('click', () => {
    activeTeacherGenderValue = 'female';
    syncTeacherGenderTabs();
    renderTeacherView();
  });
  guestEntryButton.addEventListener('click', () => {
    applyRoute('guest');
  });
  memberEntryButton.addEventListener('click', () => {
    applyRoute('member');
  });
  topHomeButton.addEventListener('click', () => {
    applyRoute('home');
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
  window.addEventListener('popstate', () => {
    const mode = parseRouteHash();
    setEntryMode(mode);

    if (mode === 'guest') {
      setActiveView('student_male');
      renderCurrentView();
    } else if (mode === 'member') {
      setActiveView('teacher');
      renderCurrentView();
    }
  });
  applyAccessibilityTextScale();
}

init();
