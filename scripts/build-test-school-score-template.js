const path = require('path');
const ExcelJS = require('exceljs');

const outputPath = path.join(process.env.USERPROFILE || 'C:\\Users\\dell', 'Desktop', 'school-score-table-test-template.xlsx');

const sheets = [
  { grade: 'י״ב', group: 'בנים' },
  { grade: 'י״ב', group: 'בנות' },
  { grade: 'י״א', group: 'בנים' },
  { grade: 'י״א', group: 'בנות' },
  { grade: 'י׳', group: 'בנים' },
  { grade: 'י׳', group: 'בנות' },
  { grade: 'ט׳', group: 'בנים' },
  { grade: 'ט׳', group: 'בנות' },
  { grade: 'ח׳', group: 'בנים' },
  { grade: 'ח׳', group: 'בנות' },
  { grade: 'ז׳', group: 'בנים' },
  { grade: 'ז׳', group: 'בנות' },
  { grade: 'ו׳', group: 'מעורב' },
  { grade: 'ה׳', group: 'מעורב' },
  { grade: 'ד׳', group: 'מעורב' },
  { grade: 'ג׳', group: 'מעורב' },
  { grade: 'ב׳', group: 'מעורב' },
  { grade: 'א׳', group: 'מעורב' },
];

const subjects = [
  'בדיקת ניסיון 1',
  'בדיקת ניסיון 2',
  'בדיקת ניסיון 3',
  'בדיקת ניסיון 4',
  'בדיקת ניסיון 5',
  'בדיקת ניסיון 6',
  'בדיקת ניסיון 7',
  'בדיקת ניסיון 8',
  'בדיקת ניסיון 9',
  'בדיקת ניסיון 10',
];

const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9EAF7' } };
const highlightFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF2CC' } };
const border = {
  top: { style: 'thin', color: { argb: 'FFBFBFBF' } },
  left: { style: 'thin', color: { argb: 'FFBFBFBF' } },
  bottom: { style: 'thin', color: { argb: 'FFBFBFBF' } },
  right: { style: 'thin', color: { argb: 'FFBFBFBF' } },
};

function styleRow(row, fill) {
  row.eachCell((cell) => {
    cell.fill = fill;
    cell.border = border;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });
}

function valueFor(score, subjectIndex, sheetIndex) {
  if (score === 0) return 0;
  const base = (sheetIndex + 1) * 7 + subjectIndex * 11;
  return Math.round((score * (subjectIndex + 2)) + base);
}

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'EduFitScore';
  workbook.created = new Date();

  sheets.forEach((sheet, sheetIndex) => {
    const worksheet = workbook.addWorksheet(`${sheet.grade} ${sheet.group}`);
    worksheet.views = [{ rightToLeft: true, state: 'frozen', ySplit: 5 }];
    worksheet.getCell('A1').value = 'שכבה';
    worksheet.getCell('B1').value = sheet.grade;
    worksheet.getCell('A2').value = 'קבוצה';
    worksheet.getCell('B2').value = sheet.group;
    worksheet.getCell('A3').value = 'ציון התחלתי';
    worksheet.getCell('B3').value = 0;
    worksheet.addRow([]);
    worksheet.addRow(['ציון', ...subjects]);

    for (let score = 100; score >= 0; score -= 1) {
      worksheet.addRow([score, ...subjects.map((_, index) => valueFor(score, index, sheetIndex))]);
    }

    [1, 2, 3, 5].forEach((rowNumber) => {
      const row = worksheet.getRow(rowNumber);
      row.font = { bold: true };
      styleRow(row, headerFill);
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber <= 5) return;
      if (row.getCell(1).value % 5 === 0) styleRow(row, highlightFill);
      row.eachCell((cell) => {
        cell.border = border;
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
    });

    worksheet.columns = [{ width: 12 }, ...subjects.map(() => ({ width: 18 }))];
  });

  await workbook.xlsx.writeFile(outputPath);
  console.log(`Created ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
