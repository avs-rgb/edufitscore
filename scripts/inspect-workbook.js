const ExcelJS = require('exceljs');

const workbookPath = process.argv[2];

if (!workbookPath) {
  throw new Error('Usage: node scripts/inspect-workbook.js <workbook-path>');
}

function cellValue(cell) {
  const value = cell?.value;
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') {
    if (value.result !== undefined) return value.result;
    if (value.text !== undefined) return value.text;
    if (Array.isArray(value.richText)) return value.richText.map((part) => part.text || '').join('');
  }
  return value;
}

async function main() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);

  for (const worksheet of workbook.worksheets) {
    const rows = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      rows[rowNumber - 1] = [];
      row.eachCell({ includeEmpty: true }, (cell, columnNumber) => {
        rows[rowNumber - 1][columnNumber - 1] = cellValue(cell);
      });
    });

    console.log(`SHEET: ${worksheet.name}`);
    console.log(`RANGE: ${worksheet.actualRowCount} rows x ${worksheet.actualColumnCount} columns`);

    rows.filter(Boolean).slice(0, 25).forEach((row, index) => {
      console.log(`${String(index + 1).padStart(3, '0')}: ${JSON.stringify(row)}`);
    });

    console.log('---');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
