# EduFitScore Backup Password Procedure

## Purpose

EduFitScore backups are encrypted in the browser before download. The backup password is required to restore the file later. If the password is lost, the backup cannot be restored.

## Password Rules

- Use a unique backup password that is not the admin login password.
- Use at least 12 characters. Prefer a long passphrase.
- Store the password in a password manager or another approved secure vault.
- Do not send backup passwords by email, chat, screenshots, or GitHub.

## Backup Routine

- Before downloading a backup, decide the backup password and record it in the secure vault.
- Name the vault entry with the backup date, for example: `EduFitScore backup 2026-07-21`.
- Download the encrypted backup from the admin area.
- Store the encrypted file outside GitHub in an access-controlled location.
- Confirm the file name ends with `.encrypted.json`.

## Restore Routine

- Retrieve the encrypted backup file and matching backup password from the secure vault.
- In production, enable `ALLOW_ADMIN_RESTORE=true` only for the restore window.
- Select the encrypted backup file in the admin area.
- Enter the backup password, current admin password, and the `delete` confirmation phrase.
- Review the dry-run summary before final import.
- Disable `ALLOW_ADMIN_RESTORE` immediately after verifying the restore.

## Access Control

- Limit backup password access to trusted global admins only.
- Remove access immediately when an admin no longer needs it.
- If a backup password may have been exposed, create a fresh encrypted backup with a new password and delete old exposed copies where possible.
