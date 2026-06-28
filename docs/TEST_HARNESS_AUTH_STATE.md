# Test Harness & Auth-State Concept

## Purpose

This document defines how Cursor, Codex, Playwright and future agents should test the portal without exposing secrets.

Credential rotation is out of scope for this scaffold. If `OWNER_MAGIC_CODE` rotation is needed, handle it in a separate approved rotation step.

## Safety boundary

Allowed in this scaffold:

- Add Git ignore protection for local auth-state directories.
- Add documentation for safe local browser-session testing.
- Define roles and test boundaries.

Not allowed in this scaffold:

- No real login.
- No OTP use.
- No owner code use.
- No Railway ENV change.
- No database command.
- No Stripe live command.
- No auth-state generation.
- No cookies printed.
- No commit, push, pull request, merge, deploy or safety tag unless separately approved.

## Auth-state paths

Auth-state files may contain browser cookies or tokens. They must be treated like passwords.

Target local paths:

    playwright/.auth/public.json
    playwright/.auth/tester.json
    playwright/.auth/customer.json
    playwright/.auth/admin.json
    playwright/.auth/owner.json
    playwright/.auth/inspect.json

These files are local-only and must not be committed.

## Agent policy

### Codex Cloud

Codex Cloud may work on:

- Source analysis
- Unit tests
- Playwright public smoke tests
- Negative auth tests without secrets
- Documentation
- Pull requests

Codex Cloud must not receive:

- Owner code
- OTP code
- Production cookies
- `playwright/.auth/owner.json`
- Railway secrets
- Stripe live secrets
- Gmail codes

### Cursor local

Cursor local may work with local-only auth-state files if the operator created them manually and they remain ignored by Git.

Cursor local still must not print:

- Cookies
- OTP codes
- Owner codes
- Session tokens
- ENV values

## Test package roadmap

### Package A — Public Smoke

No auth, no secrets, no writes.

Examples:

- `/`
- `/kurse`
- `/pakete`
- `/verwalter-suite`
- `/rechenpraxis-preise`
- `/impressum`
- `/datenschutz`
- `/agb`
- `/widerruf`
- `/robots.txt`
- `/sitemap.xml`
- `/api/health`

### Package B — Negative Auth Security

No auth. Protected areas must stay blocked or redirect to login.

Examples:

- `/admin`
- `/owner-dashboard`
- `/modul/1`
- `/app/verwalter`
- `/api/owner/dashboard`
- `/api/owner/stats`
- `/api/owner/revenue`
- `/api/admin/mysql-health`
- `/api/verwalter/dashboard`

### Package C — Staging/Test User

Only staging or safe test users.

Examples:

- Login
- Module access
- Quiz
- Certificates
- Learning progress
- Logout

### Package D — Admin Read-Only

Only staging or local. Production admin write actions require explicit approval.

Examples:

- Admin dashboard loads
- KI monitor loads
- Stripe live checklist read-only
- User list read-only

### Package E — Owner Local-Only

Owner tests require local-only auth-state and must never run in cloud with real production owner cookies.

Examples:

- Owner dashboard loads
- Owner APIs return expected status
- AZAV report read-only
- Monitoring read-only
- Revenue read-only
- Settings read-only

## Next implementation steps

1. Keep this scaffold local until reviewed.
2. If accepted, commit as a small PR in a separate approved step.
3. After merge, create public and negative-auth Playwright tests.
4. Only later add local auth-state generator scripts.
