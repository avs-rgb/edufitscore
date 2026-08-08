const dayMs = 24 * 60 * 60 * 1000;

function toDate(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isFinite(date.getTime()) ? date : new Date();
}

function addDaysIso(value, days) {
  return new Date(toDate(value).getTime() + (Number(days) * dayMs)).toISOString();
}

function minIso(first, second) {
  const firstDate = toDate(first);
  const secondDate = toDate(second);
  return new Date(Math.min(firstDate.getTime(), secondDate.getTime())).toISOString();
}

function academicYearForDate(value = new Date()) {
  const date = toDate(value);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const startYear = month >= 7 ? year : year - 1;
  return `${startYear}-${startYear + 1}`;
}

function academicYearEndForSeason(season) {
  const startYear = Number(String(season || '').split('-')[0]);
  const safeStartYear = Number.isInteger(startYear) ? startYear : Number(academicYearForDate().split('-')[0]);
  return new Date(Date.UTC(safeStartYear + 1, 6, 31, 23, 59, 59, 999)).toISOString();
}

function billingAcademicYearForDate(value = new Date()) {
  const date = toDate(value);
  const current = academicYearForDate(date);
  if (date.getUTCMonth() !== 6) {
    return current;
  }
  const startYear = Number(current.split('-')[0]);
  return `${startYear + 1}-${startYear + 2}`;
}

function billingAcademicYearEndForDate(value = new Date()) {
  return academicYearEndForSeason(billingAcademicYearForDate(value));
}

function renewalStartsAtForDate(value = new Date()) {
  const season = academicYearForDate(value);
  const startYear = Number(season.split('-')[0]);
  return new Date(Date.UTC(startYear + 1, 5, 1, 0, 0, 0, 0));
}

function daysUntil(endIso, value = new Date()) {
  const endMs = Date.parse(endIso || '');
  if (!Number.isFinite(endMs)) {
    return 0;
  }
  return Math.max(0, Math.ceil((endMs - toDate(value).getTime()) / dayMs));
}

function billingStateForUser(user, value = new Date()) {
  const now = toDate(value);
  if (!user) {
    return { status: 'none', accessAllowed: false, exempt: false, daysLeft: 0, showInTopLabel: false };
  }

  const exempt = user.role === 'admin' || Boolean(user.billingExempt ?? user.billing_exempt);
  const trialEndsAt = user.trialEndsAt || user.trial_ends_at || null;
  const paidUntil = user.paidUntil || user.paid_until || null;
  const trialActive = Boolean(trialEndsAt && Date.parse(trialEndsAt) >= now.getTime());
  const paidActive = Boolean(paidUntil && Date.parse(paidUntil) >= now.getTime());
  const accessEndsAt = paidActive ? paidUntil : (trialActive ? trialEndsAt : paidUntil || trialEndsAt || null);
  const status = exempt ? 'exempt' : (paidActive ? 'active' : (trialActive ? 'trialing' : 'expired'));
  const renewalStart = renewalStartsAtForDate(now);
  const renewalEnd = academicYearEndForSeason(academicYearForDate(now));
  const academicYearEnd = billingAcademicYearEndForDate(now);
  const hasAcademicYearAccess = Boolean(paidUntil && Date.parse(paidUntil) >= Date.parse(academicYearEnd));
  const showRenewalCountdown = !exempt && Boolean(paidUntil) && now >= renewalStart && Date.parse(paidUntil) <= Date.parse(renewalEnd);

  return {
    status,
    accessAllowed: exempt || trialActive || paidActive,
    exempt,
    trialStartedAt: user.trialStartedAt || user.trial_started_at || null,
    trialEndsAt,
    paidUntil,
    accessEndsAt,
    academicYearEnd,
    hasAcademicYearAccess,
    daysLeft: accessEndsAt ? daysUntil(accessEndsAt, now) : 0,
    renewalDaysLeft: showRenewalCountdown ? daysUntil(renewalEnd, now) : null,
    showRenewalCountdown,
    showInTopLabel: !exempt,
    updatedAt: user.billingUpdatedAt || user.billing_updated_at || null,
  };
}

module.exports = {
  addDaysIso,
  minIso,
  academicYearForDate,
  academicYearEndForSeason,
  billingAcademicYearForDate,
  billingAcademicYearEndForDate,
  billingStateForUser,
  daysUntil,
};
