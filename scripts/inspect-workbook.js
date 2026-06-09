const XLSX = require('xlsx');

const workbookPath = process.argv[2];

if (!workbookPath) {
  throw new Error('Usage: node scripts/inspect-workbook.js <workbook-path>');
}

const workbook = XLSX.readFile(workbookPath, {
  cellFormula: true,
  cellStyles: true,
});

for (const sheetName of workbook.SheetNames) {
  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
    blankrows: false,
  });

  console.log(`SHEET: ${sheetName}`);
  console.log(`RANGE: ${worksheet['!ref'] || ''}`);

  rows.slice(0, 25).forEach((row, index) => {
    console.log(`${String(index + 1).padStart(3, '0')}: ${JSON.stringify(row)}`);
  });

  console.log('---');
}
