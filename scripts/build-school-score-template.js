const path = require('path');
const ExcelJS = require('exceljs');

const outputPath = path.join(__dirname, '..', 'school-score-table-template-all-grades.xlsx');
const publicOutputPath = path.join(__dirname, '..', 'public', 'school-score-table-template-all-grades.xlsx');

const sheetDefinitions = [
  {
    grade: 'י״ב',
    group: 'בנים',
    subjects: ['ריצת 60 מ׳', 'ריצת 100 מ׳', 'ריצת 2000 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 5 ק״ג', 'שכיבות סמיכה', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'י״ב',
    group: 'בנות',
    subjects: ['ריצת 60 מ׳', 'ריצת 100 מ׳', 'ריצת 1500 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 3 ק״ג', 'שכיבות סמיכה ברכיים', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'י״א',
    group: 'בנים',
    subjects: ['ריצת 60 מ׳', 'ריצת 100 מ׳', 'ריצת 2000 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 5 ק״ג', 'שכיבות סמיכה', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'י״א',
    group: 'בנות',
    subjects: ['ריצת 60 מ׳', 'ריצת 100 מ׳', 'ריצת 1500 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 3 ק״ג', 'שכיבות סמיכה ברכיים', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'י׳',
    group: 'בנים',
    subjects: ['ריצת 60 מ׳', 'ריצת 100 מ׳', 'ריצת 1500 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 4 ק״ג', 'שכיבות סמיכה', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'י׳',
    group: 'בנות',
    subjects: ['ריצת 60 מ׳', 'ריצת 100 מ׳', 'ריצת 1200 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 3 ק״ג', 'שכיבות סמיכה ברכיים', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'ט׳',
    group: 'בנים',
    subjects: ['ריצת 60 מ׳', 'ריצת 80 מ׳', 'ריצת 1200 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 3 ק״ג', 'שכיבות סמיכה', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'ט׳',
    group: 'בנות',
    subjects: ['ריצת 60 מ׳', 'ריצת 80 מ׳', 'ריצת 1000 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 3 ק״ג', 'שכיבות סמיכה ברכיים', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'ח׳',
    group: 'בנים',
    subjects: ['ריצת 60 מ׳', 'ריצת 80 מ׳', 'ריצת 1000 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 3 ק״ג', 'שכיבות סמיכה', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'ח׳',
    group: 'בנות',
    subjects: ['ריצת 60 מ׳', 'ריצת 80 מ׳', 'ריצת 800 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 2 ק״ג', 'שכיבות סמיכה ברכיים', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'ז׳',
    group: 'בנים',
    subjects: ['ריצת 60 מ׳', 'ריצת 80 מ׳', 'ריצת 800 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 2 ק״ג', 'שכיבות סמיכה', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'ז׳',
    group: 'בנות',
    subjects: ['ריצת 60 מ׳', 'ריצת 80 מ׳', 'ריצת 600 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'קפיצה לרוחק', 'הדיפת כדור ברזל 2 ק״ג', 'שכיבות סמיכה ברכיים', 'כפיפות בטן בדקה', 'זריזות 4x10'],
  },
  {
    grade: 'ו׳',
    group: 'מעורב',
    subjects: ['ריצת 60 מ׳', 'ריצת 600 מ׳', 'מבחן ביפ', 'קפיצה לרוחק מהמקום', 'מסירת כדור יד למרחק', 'דילגית', 'כפיפות בטן בדקה', 'שכיבות סמיכה ברכיים', 'תפיסה וזריקה', 'זריזות 4x10'],
  },
  {
    grade: 'ה׳',
    group: 'מעורב',
    subjects: ['ריצת 40 מ׳', 'ריצת 500 מ׳', 'ריצת 600 מ׳', 'קפיצה לרוחק מהמקום', 'מסירת כדור יד למרחק', 'דילגית', 'כפיפות בטן בדקה', 'שכיבות סמיכה ברכיים', 'תפיסה וזריקה', 'זריזות 4x10'],
  },
  {
    grade: 'ד׳',
    group: 'מעורב',
    subjects: ['ריצת 40 מ׳', 'ריצת 400 מ׳', 'ריצת 500 מ׳', 'קפיצה לרוחק מהמקום', 'מסירת כדור יד למרחק', 'דילגית', 'כפיפות בטן בדקה', 'שכיבות סמיכה ברכיים', 'תפיסה וזריקה', 'זריזות 4x10'],
  },
  {
    grade: 'ג׳',
    group: 'מעורב',
    subjects: ['ריצת 40 מ׳', 'ריצת 300 מ׳', 'ריצת 400 מ׳', 'קפיצה לרוחק מהמקום', 'מסירת כדור יד למרחק', 'דילגית', 'כפיפות בטן בדקה', 'שיווי משקל על רגל אחת', 'זריזות 4x10', 'תפיסה וזריקה'],
  },
  {
    grade: 'ב׳',
    group: 'מעורב',
    subjects: ['ריצת 40 מ׳', 'ריצת 200 מ׳', 'ריצת 300 מ׳', 'קפיצה לרוחק מהמקום', 'מסירת כדור יד למרחק', 'דילגית', 'כפיפות בטן בדקה', 'שיווי משקל על רגל אחת', 'זריזות 4x10', 'תפיסה וזריקה'],
  },
  {
    grade: 'א׳',
    group: 'מעורב',
    subjects: ['ריצת 40 מ׳', 'ריצת 100 מ׳', 'ריצת 200 מ׳', 'קפיצה לרוחק מהמקום', 'מסירת כדור יד למרחק', 'דילגית', 'כפיפות בטן בדקה', 'שיווי משקל על רגל אחת', 'זריזות 4x10', 'תפיסה וזריקה'],
  },
];

const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9EAF7' } };
const highlightFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF2CC' } };
const border = {
  top: { style: 'thin', color: { argb: 'FFBFBFBF' } },
  left: { style: 'thin', color: { argb: 'FFBFBFBF' } },
  bottom: { style: 'thin', color: { argb: 'FFBFBFBF' } },
  right: { style: 'thin', color: { argb: 'FFBFBFBF' } },
};

const metricConfigs = {
  'ריצת 40 מ׳': { type: 'lower', min: 6.5, max: 11.0, decimals: 1 },
  'ריצת 60 מ׳': { type: 'lower', min: 8.0, max: 13.5, decimals: 1 },
  'ריצת 80 מ׳': { type: 'lower', min: 11.2, max: 17.5, decimals: 1 },
  'ריצת 100 מ׳': { type: 'lower', min: 13.0, max: 21.0, decimals: 1 },
  'ריצת 200 מ׳': { type: 'lower', min: 42, max: 85, decimals: 0, format: 'time' },
  'ריצת 300 מ׳': { type: 'lower', min: 62, max: 125, decimals: 0, format: 'time' },
  'ריצת 400 מ׳': { type: 'lower', min: 85, max: 170, decimals: 0, format: 'time' },
  'ריצת 500 מ׳': { type: 'lower', min: 115, max: 230, decimals: 0, format: 'time' },
  'ריצת 600 מ׳': { type: 'lower', min: 135, max: 280, decimals: 0, format: 'time' },
  'ריצת 800 מ׳': { type: 'lower', min: 185, max: 390, decimals: 0, format: 'time' },
  'ריצת 1000 מ׳': { type: 'lower', min: 235, max: 500, decimals: 0, format: 'time' },
  'ריצת 1200 מ׳': { type: 'lower', min: 300, max: 650, decimals: 0, format: 'time' },
  'ריצת 1500 מ׳': { type: 'lower', min: 390, max: 850, decimals: 0, format: 'time' },
  'ריצת 2000 מ׳': { type: 'lower', min: 530, max: 1120, decimals: 0, format: 'time' },
  'מבחן ביפ': { type: 'higher', min: 2.0, max: 12.5, decimals: 1 },
  'קפיצה לרוחק מהמקום': { type: 'higher', min: 60, max: 265, decimals: 0 },
  'קפיצה לרוחק': { type: 'higher', min: 120, max: 520, decimals: 0 },
  'הדיפת כדור ברזל 5 ק״ג': { type: 'higher', min: 4.0, max: 12.5, decimals: 1 },
  'הדיפת כדור ברזל 4 ק״ג': { type: 'higher', min: 3.5, max: 11.5, decimals: 1 },
  'הדיפת כדור ברזל 3 ק״ג': { type: 'higher', min: 3.0, max: 10.5, decimals: 1 },
  'הדיפת כדור ברזל 2 ק״ג': { type: 'higher', min: 2.5, max: 9.0, decimals: 1 },
  'מסירת כדור יד למרחק': { type: 'higher', min: 5, max: 35, decimals: 0 },
  'שכיבות סמיכה': { type: 'higher', min: 0, max: 55, decimals: 0 },
  'שכיבות סמיכה ברכיים': { type: 'higher', min: 0, max: 45, decimals: 0 },
  'כפיפות בטן בדקה': { type: 'higher', min: 5, max: 60, decimals: 0 },
  'זריזות 4x10': { type: 'lower', min: 9.5, max: 18.0, decimals: 1 },
  'דילגית': { type: 'higher', min: 0, max: 45, decimals: 0 },
  'שיווי משקל על רגל אחת': { type: 'higher', min: 1, max: 45, decimals: 0 },
  'תפיסה וזריקה': { type: 'higher', min: 0, max: 20, decimals: 0 },
};

const sheetAdjustments = {
  'י״ב בנים': { speed: 0.94, endurance: 0.92, power: 1.08, strength: 1.08, agility: 0.94, skill: 1.08 },
  'י״ב בנות': { speed: 1.02, endurance: 1.03, power: 0.95, strength: 0.92, agility: 1.02, skill: 1.02 },
  'י״א בנים': { speed: 0.96, endurance: 0.95, power: 1.05, strength: 1.05, agility: 0.96, skill: 1.05 },
  'י״א בנות': { speed: 1.04, endurance: 1.05, power: 0.93, strength: 0.9, agility: 1.03, skill: 1.02 },
  'י׳ בנים': { speed: 0.98, endurance: 0.98, power: 1.02, strength: 1.02, agility: 0.98, skill: 1.02 },
  'י׳ בנות': { speed: 1.06, endurance: 1.08, power: 0.9, strength: 0.88, agility: 1.04, skill: 1.0 },
  'ט׳ בנים': { speed: 1.0, endurance: 1.02, power: 1.0, strength: 0.98, agility: 1.0, skill: 1.0 },
  'ט׳ בנות': { speed: 1.08, endurance: 1.1, power: 0.88, strength: 0.86, agility: 1.05, skill: 0.98 },
  'ח׳ בנים': { speed: 1.04, endurance: 1.08, power: 0.93, strength: 0.9, agility: 1.04, skill: 0.95 },
  'ח׳ בנות': { speed: 1.1, endurance: 1.14, power: 0.84, strength: 0.82, agility: 1.07, skill: 0.94 },
  'ז׳ בנים': { speed: 1.08, endurance: 1.14, power: 0.88, strength: 0.84, agility: 1.08, skill: 0.92 },
  'ז׳ בנות': { speed: 1.14, endurance: 1.18, power: 0.8, strength: 0.78, agility: 1.1, skill: 0.9 },
  'ו׳ מעורב': { speed: 1.12, endurance: 1.18, power: 0.78, strength: 0.75, agility: 1.12, skill: 0.86 },
  'ה׳ מעורב': { speed: 1.18, endurance: 1.25, power: 0.68, strength: 0.65, agility: 1.18, skill: 0.78 },
  'ד׳ מעורב': { speed: 1.24, endurance: 1.35, power: 0.58, strength: 0.55, agility: 1.25, skill: 0.7 },
  'ג׳ מעורב': { speed: 1.32, endurance: 1.45, power: 0.48, strength: 0.48, agility: 1.34, skill: 0.62 },
  'ב׳ מעורב': { speed: 1.42, endurance: 1.58, power: 0.38, strength: 0.4, agility: 1.46, skill: 0.52 },
  'א׳ מעורב': { speed: 1.55, endurance: 1.75, power: 0.3, strength: 0.35, agility: 1.6, skill: 0.42 },
};

function subjectCategory(subject) {
  if (subject.includes('ריצת') && !subject.includes('שליחים')) return subject.match(/800|1000|1200|1500|2000|600|500|400|300|200/) ? 'endurance' : 'speed';
  if (subject.includes('ביפ')) return 'endurance';
  if (subject.includes('שליחים') || subject.includes('זריזות') || subject.includes('מסלול') || subject.includes('מכשולים') || subject.includes('זחילה')) return 'agility';
  if (subject.includes('קפיצה') || subject.includes('הדיפת') || subject.includes('מסירת')) return 'power';
  if (subject.includes('שכיבות') || subject.includes('כפיפות')) return 'strength';
  return 'skill';
}

function baseMetricConfig(subject) {
  return metricConfigs[subject] || metricConfigs['תפיסה וזריקה'];
}

function adjustedMetricConfig(sheetName, subject) {
  const config = baseMetricConfig(subject);
  const adjustment = sheetAdjustments[sheetName]?.[subjectCategory(subject)] || 1;
  const adjusted = { ...config };

  if (config.type === 'lower') {
    adjusted.min = config.min * adjustment;
    adjusted.max = config.max * adjustment;
  } else {
    adjusted.min = config.min * adjustment;
    adjusted.max = config.max * adjustment;
  }

  return adjusted;
}

function formatValue(value, decimals) {
  const rounded = Number(value.toFixed(decimals));
  return decimals === 0 ? Math.round(rounded) : rounded;
}

function formatTime(totalSeconds) {
  const roundedSeconds = Math.round(totalSeconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const seconds = String(roundedSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function benchmarkValue(sheetName, subject, score) {
  if (score === 0) return 0;
  const config = adjustedMetricConfig(sheetName, subject);
  const ratio = score / 100;
  const value = config.type === 'lower'
    ? config.max - ((config.max - config.min) * ratio)
    : config.min + ((config.max - config.min) * ratio);
  if (config.format === 'time') return formatTime(value);
  return formatValue(value, config.decimals);
}

function benchmarkRows(sheetName, subjects) {
  const lastValues = new Map();
  const rows = [];

  for (let score = 100; score >= 0; score -= 1) {
    const values = subjects.map((subject) => {
      const value = benchmarkValue(sheetName, subject, score);
      if (score === 0) return 0;
      if (lastValues.get(subject) === value) return '';
      lastValues.set(subject, value);
      return value;
    });
    rows.push([score, ...values]);
  }

  return rows;
}

function applyRowStyle(row, fill) {
  row.eachCell((cell) => {
    cell.fill = fill;
    cell.border = border;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });
}

function addSheet(workbook, { grade, group, subjects }) {
  const worksheet = workbook.addWorksheet(`${grade} ${group}`);
  const sheetName = `${grade} ${group}`;
  worksheet.views = [{ rightToLeft: true, state: 'frozen', ySplit: 5 }];

  worksheet.getCell('A1').value = 'שכבה';
  worksheet.getCell('B1').value = grade;
  worksheet.getCell('A2').value = 'קבוצה';
  worksheet.getCell('B2').value = group;
  worksheet.getCell('A3').value = 'ציון התחלתי';
  worksheet.getCell('B3').value = 0;

  worksheet.addRow([]);
  worksheet.addRow(['ציון', ...subjects]);

  benchmarkRows(sheetName, subjects).forEach((row) => worksheet.addRow(row));

  [1, 2, 3, 5].forEach((rowNumber) => {
    const row = worksheet.getRow(rowNumber);
    row.font = { bold: true };
    applyRowStyle(row, headerFill);
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber <= 5) return;
    const score = row.getCell(1).value;
    if (score % 5 === 0) applyRowStyle(row, highlightFill);
    row.eachCell((cell) => {
      cell.border = border;
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  worksheet.columns = [{ width: 12 }, ...subjects.map(() => ({ width: 20 }))];
}

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'EduFitScore';
  workbook.created = new Date();

  sheetDefinitions.forEach((definition) => addSheet(workbook, definition));

  await workbook.xlsx.writeFile(outputPath);
  await workbook.xlsx.writeFile(publicOutputPath);
  console.log(`Created ${outputPath}`);
  console.log(`Created ${publicOutputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
