(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.SchoolScore = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function matchSchoolScoreTableResult(table, subjectId, rawValue) {
    const subject = table.subjects.find((item) => item.id === subjectId) || {};
    const subjectName = subject.name || '';
    const measurementType = subject.measurementType || subject.valueType || '';
    const isTimeSubject = measurementType === 'time' || measurementType === 'time_compact' || /פלאנק|3000|5000|1500|1000|ריצ|מטר/.test(subjectName);
    const parseComparable = (value, options = {}) => {
      const text = String(value || '').trim();
      const timeMatch = text.match(/^(\d+):(\d{1,2})$/);
      if (timeMatch) {
        return (Number(timeMatch[1]) * 60) + Number(timeMatch[2]);
      }
      if (options.compactTime && /^\d{2,4}$/.test(text)) {
        if (text.length <= 2) {
          return Number(text);
        }
        const minutes = Number(text.slice(0, -2));
        const seconds = Number(text.slice(-2));
        if (seconds < 60) {
          return (minutes * 60) + seconds;
        }
      }
      return Number(text);
    };
    const entered = parseComparable(rawValue, { compactTime: isTimeSubject });
    if (!Number.isFinite(entered)) {
      return null;
    }

    const includeZeroScore = table.includeZeroScore === true || subject.includeZeroScore === true;
    const thresholds = table.rows
      .map((row) => ({
        score: Number(row.score),
        value: parseComparable(row.values?.[subjectId]),
        matchedValue: String(row.values?.[subjectId] || '').trim(),
      }))
      .filter((row) => (includeZeroScore || row.score !== 0) && Number.isFinite(row.score) && Number.isFinite(row.value));

    if (!thresholds.length) {
      return null;
    }

    const byScore = [...thresholds].sort((a, b) => b.score - a.score);
    const topValues = byScore.slice(0, Math.min(5, byScore.length)).map((row) => row.value);
    const bottomValues = byScore.slice(Math.max(0, byScore.length - 5)).map((row) => row.value);
    const topAverage = topValues.reduce((sum, value) => sum + value, 0) / topValues.length;
    const bottomAverage = bottomValues.reduce((sum, value) => sum + value, 0) / bottomValues.length;
    const explicitDirection = subject.direction || subject.scoringDirection || '';
    const lowerIsBetterSubject = /ריצ|מטר|שניות|זריזות|מסלול/.test(subjectName) && !/פלאנק|בטן|כפיפות|מתח|קפיצה|דילגית/.test(subjectName);
    const higherIsBetter = explicitDirection === 'higher'
      ? true
      : explicitDirection === 'lower'
        ? false
        : lowerIsBetterSubject ? false : topAverage >= bottomAverage;

    if (higherIsBetter) {
      return [...thresholds]
        .filter((row) => row.value <= entered)
        .sort((a, b) => b.value - a.value || b.score - a.score)[0] || null;
    }

    return [...thresholds]
      .filter((row) => row.value >= entered)
      .sort((a, b) => a.value - b.value || b.score - a.score)[0] || null;
  }

  return { matchSchoolScoreTableResult };
}));
