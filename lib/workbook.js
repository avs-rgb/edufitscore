const scoreData = require('../data/score-data.json');

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

function parseUserValue(value, valueType) {
  if (value === undefined || value === null) {
    return null;
  }

  const trimmed = String(value).trim();

  if (!trimmed) {
    return null;
  }

  if (valueType === 'time_string' || valueType === 'time_compact' || valueType === 'time_fraction') {
    const asColonTime = parseTimeString(trimmed);

    if (asColonTime !== null) {
      return asColonTime;
    }

    const digitsOnly = trimmed.replace(/[^0-9]/g, '');

    if (digitsOnly) {
      return parseCompactTime(Number(digitsOnly));
    }

    return null;
  }

  if (valueType === 'beeps') {
    const numericValue = Number(trimmed.replace('-', ''));
    return Number.isFinite(numericValue) ? numericValue : null;
  }

  const numericValue = Number(trimmed.replace(',', '.'));
  return Number.isFinite(numericValue) ? numericValue : null;
}

function loadSheets() {
  return scoreData.sheets;
}

function scoreMetric(metric, inputValue) {
  const comparableInput = parseUserValue(inputValue, metric.valueType);

  if (comparableInput === null) {
    return null;
  }

  const match = metric.entries.find((entry) => (
    metric.direction === 'higher_better'
      ? comparableInput >= entry.comparable
      : comparableInput <= entry.comparable
  ));

  if (!match) {
    return {
      input: inputValue,
      comparableInput,
      score: 0,
      matchedValue: '0',
    };
  }

  return {
    input: inputValue,
    comparableInput,
    score: match.score,
    matchedValue: match.display,
  };
}

module.exports = {
  loadSheets,
  scoreMetric,
};
