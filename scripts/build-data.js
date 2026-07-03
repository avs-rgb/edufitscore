const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const workbookPath = process.argv[2];
const outputPath = path.join(__dirname, '..', 'data', 'score-data.json');

if (!workbookPath) {
  throw new Error('Usage: node scripts/build-data.js <workbook-path>');
}

function parseTimeString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const parts = trimmed.split(':').map(Number);

  if (parts.some(Number.isNaN)) {
    return null;
  }

  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1];
  }

  if (parts.length === 3) {
    return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  }

  return null;
}

function parseCompactTime(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  const raw = String(Math.round(numericValue)).padStart(3, '0');
  const seconds = Number(raw.slice(-2));
  const minutes = Number(raw.slice(0, -2));

  if (seconds >= 60) {
    return null;
  }

  return (minutes * 60) + seconds;
}

function formatBeepLevel(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  const raw = String(Math.round(numericValue)).padStart(2, '0');

  if (raw.length >= 4) {
    return `${raw.slice(0, -2)}-${Number(raw.slice(-2))}`;
  }

  return `${raw.slice(0, -1)}-${Number(raw.slice(-1))}`;
}

function formatSeconds(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function parseBeepsDisplay(value) {
  return Number(String(value).replace('-', ''));
}

function detectValueType(header, values) {
  if (header.includes('ביפים')) {
    return 'beeps';
  }

  if (header.includes('פלאנק')) {
    const hasColon = values.some((value) => typeof value === 'string' && value.includes(':'));
    return hasColon ? 'time_string' : 'time_compact';
  }

  if (header.includes('מטר')) {
    const hasColon = values.some((value) => typeof value === 'string' && value.includes(':'));
    return hasColon ? 'time_string' : 'time_compact';
  }

  return 'number';
}

function normalizeValue(rawValue, valueType) {
  if (rawValue === '' || rawValue === null || rawValue === undefined) {
    return null;
  }

  if (valueType === 'time_string') {
    const seconds = parseTimeString(rawValue);
    return seconds === null ? null : { raw: rawValue, comparable: seconds, display: rawValue };
  }

  if (valueType === 'time_compact') {
    const seconds = parseCompactTime(rawValue);
    return seconds === null ? null : { raw: rawValue, comparable: seconds, display: formatSeconds(seconds) };
  }

  if (valueType === 'beeps') {
    const numericValue = typeof rawValue === 'string' ? parseBeepsDisplay(rawValue) : Number(rawValue);

    if (!Number.isFinite(numericValue)) {
      return null;
    }

    return {
      raw: numericValue,
      comparable: numericValue,
      display: formatBeepLevel(numericValue),
    };
  }

  const numericValue = Number(rawValue);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  return { raw: numericValue, comparable: numericValue, display: String(numericValue) };
}

function cellValue(cell) {
  const value = cell?.value;
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value;
  if (typeof value === 'object') {
    if (value.text !== undefined) return value.text;
    if (value.result !== undefined) return value.result;
    if (Array.isArray(value.richText)) return value.richText.map((part) => part.text || '').join('');
  }
  return value;
}

function worksheetRows(worksheet) {
  const rows = [];
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    rows[rowNumber - 1] = [];
    row.eachCell({ includeEmpty: true }, (cell, columnNumber) => {
      rows[rowNumber - 1][columnNumber - 1] = cellValue(cell);
    });
  });
  return rows.filter(Boolean);
}

function extractMainTableRows(worksheet) {
  const rows = worksheetRows(worksheet);

  if (!rows.length || rows[0][0] !== 'ציון') {
    return null;
  }

  const headerRow = rows[0];
  let lastMainColumn = 0;

  for (let columnIndex = 1; columnIndex < headerRow.length; columnIndex += 1) {
    if (!headerRow[columnIndex]) {
      break;
    }

    lastMainColumn = columnIndex;
  }

  return rows.map((row) => row.slice(0, lastMainColumn + 1));
}

function columnPriority(label) {
  if (label === 'ציון') {
    return 0;
  }

  const priorities = [
    'ביפים',
    'שכיבות סמיכה',
    'פלאנק',
    'דילגית',
    'מתח',
    '1300 מטר',
    '1800 מטר',
    '5000 מטר',
    '3000 מטר',
  ];

  const index = priorities.findIndex((item) => label.includes(item));
  return index === -1 ? 100 : index + 1;
}

function shouldIncludeColumn(label) {
  return !label.includes('כדורעף');
}

function reorderTableRows(rows) {
  const headerRow = rows[0];
  const orderedIndexes = headerRow
    .map((label, index) => ({ label: String(label || '').trim(), index }))
    .filter((item) => shouldIncludeColumn(item.label))
    .sort((left, right) => {
      const priorityDifference = columnPriority(left.label) - columnPriority(right.label);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return left.index - right.index;
    })
    .map((item) => item.index);

  return rows.map((row) => orderedIndexes.map((index) => row[index] ?? ''));
}

function buildMetric(header, rows, columnIndex) {
  const rawValues = rows.map((row) => row[columnIndex]);
  const valueType = detectValueType(header, rawValues);
  const entries = rows
    .map((row) => {
      const normalizedValue = normalizeValue(row[columnIndex], valueType);

      if (!normalizedValue) {
        return null;
      }

      return {
        score: Number(row[0]),
        ...normalizedValue,
      };
    })
    .filter(Boolean);

  if (entries.length < 2) {
    return null;
  }

  const direction = entries[0].comparable > entries[entries.length - 1].comparable ? 'higher_better' : 'lower_better';

  return {
    key: `metric_${columnIndex}`,
    label: header.trim(),
    valueType,
    direction,
    bestDisplay: entries[0].display,
    worstDisplay: entries[entries.length - 1].display,
    entries,
  };
}

async function loadSheets() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);

  return workbook.worksheets.map((worksheet) => {
    const rows = extractMainTableRows(worksheet);

    if (!rows) {
      return null;
    }

    const orderedRows = reorderTableRows(rows);
    const metrics = orderedRows[0]
      .slice(1)
      .map((header, index) => buildMetric(header, orderedRows.slice(1), index + 1))
      .filter(Boolean);

    const displayRows = orderedRows.slice(1).map((row) => row.map((cell, cellIndex) => {
      if (cellIndex === 0) {
        return cell;
      }

      const metric = metrics[cellIndex - 1];

      if (!metric) {
        return cell;
      }

      return normalizeValue(cell, metric.valueType)?.display ?? cell;
    }));

    return {
      id: `sheet_${worksheet.name}`,
      name: worksheet.name,
      scoreRange: {
        max: Number(orderedRows[1][0]),
        min: Number(orderedRows[orderedRows.length - 1][0]),
      },
      table: {
        headers: orderedRows[0],
        rows: displayRows,
      },
      metrics,
    };
  }).filter(Boolean);
}

async function main() {
  const data = {
    generatedAt: new Date().toISOString(),
    sourceWorkbook: path.basename(workbookPath),
    sheets: await loadSheets(),
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
