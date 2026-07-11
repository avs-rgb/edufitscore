const path = require('path');
const ExcelJS = require('exceljs');

const outputPath = path.join(__dirname, '..', 'public', 'teacher-class-roster-template.xlsx');

function addRosterSheet(workbook, name, rows) {
  const worksheet = workbook.addWorksheet(name);
  worksheet.columns = [
    { header: 'first name', key: 'firstName', width: 18 },
    { header: 'last name', key: 'lastName', width: 18 },
  ];
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF1DCCB' },
  };
  rows.forEach((row) => worksheet.addRow(row));
}

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'EduFitScore';
  workbook.created = new Date();
  addRosterSheet(workbook, 'ז1', [
    { firstName: 'David', lastName: 'Cohen' },
    { firstName: 'Noa', lastName: 'Levi' },
  ]);
  addRosterSheet(workbook, 'ז2', [
    { firstName: 'Amit', lastName: 'Mizrahi' },
    { firstName: 'Maya', lastName: 'Avraham' },
  ]);
  await workbook.xlsx.writeFile(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
