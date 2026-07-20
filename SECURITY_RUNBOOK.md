# EduFitScore Security Runbook

## Deploy Checklist

- Confirm local checks pass before pushing: `node --check server.js`, `node --check public/app.js`, `npm run test:critical`, and `git diff --check`.
- Push only reviewed commits to `master`.
- Trigger Render manual deploy from the dashboard.
- After deploy, hard refresh the production site and verify login, admin diagnostics, and a basic scoring flow.

## Production Restore Gate

- Keep `ALLOW_ADMIN_RESTORE` unset or `false` in production by default.
- Enable `ALLOW_ADMIN_RESTORE=true` only for a planned restore window.
- Disable `ALLOW_ADMIN_RESTORE` immediately after the restore is verified.

## App Backup Routine

- Export an app backup from the admin area before major releases and after important data imports.
- Follow `BACKUP_PROCEDURE.md` for backup password storage and restore handling.
- Store backups outside GitHub in a private, access-controlled location.
- Do not store database URLs, API keys, SMTP passwords, or reset tokens in notes or commits.
- Verify the admin diagnostics panel shows a recent `גיבוי אחרון` timestamp after export.

## Restore Procedure

- Prefer testing restore on a non-production database first.
- In Render, temporarily set `ALLOW_ADMIN_RESTORE=true`.
- In the admin area, choose the backup file, enter the current admin password, and type `delete`.
- Verify diagnostics, users, schools, classes, score tables, and history after restore.
- In Render, remove or disable `ALLOW_ADMIN_RESTORE`.
- Review the admin audit log for the restore entry and timestamp.

## Neon Recovery

- Confirm Neon point-in-time restore availability before relying on it during incidents.
- If production data is corrupted, create a restored Neon branch/database first when possible.
- Test the restored database before switching production traffic.

## Secret Rotation

- Rotate any secret that was pasted into chat, logs, screenshots, or temporary files.
- Rotate Neon database passwords from Neon.
- Rotate Resend/SMTP credentials from the provider dashboard.
- Update Render environment variables after rotation and redeploy.
- Never commit `.env` files, database URLs, API keys, or app passwords.

## Incident Response

- Preserve evidence: do not delete audit logs or backups.
- Disable compromised accounts from the admin area.
- Rotate exposed credentials immediately.
- Export a fresh backup before attempting repairs if the app is stable enough.
- Review admin audit log entries for password resets, backup restores, permanent deletes, and score-table changes.
- Document what happened, when it started, who was affected, and what was restored or rotated.

## Dangerous Admin Actions

- Backup restore requires current admin password, the `delete` confirmation phrase, CSRF, rate limiting, and the production restore gate.
- Permanent user delete requires current admin password, the `delete` confirmation phrase, CSRF, and rate limiting.
- Admin password reset requires current admin password, CSRF, and rate limiting.

## Global Admin 2FA

- 2FA is optional and applies only to global admins (`role = admin`). School admins and teachers are not prompted for 2FA.
- Enable 2FA only after scanning the QR/manual key and successfully verifying a current authenticator code.
- Save recovery codes immediately after setup; each code works once and is stored only as a hash.
- If all global admins are locked out, temporarily set `DISABLE_ADMIN_2FA=true` in Render, log in with password, fix 2FA/recovery codes, then remove the variable and redeploy immediately.
- Review audit log entries for `admin_2fa_enabled`, `admin_2fa_disabled`, failed 2FA attempts, and recovery-code usage.
