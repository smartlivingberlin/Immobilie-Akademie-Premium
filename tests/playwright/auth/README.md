# Playwright Auth-State Safety

This folder documents how browser authentication state may be used in local Playwright tests.

## Hard rules

- Never commit Playwright auth-state files.
- Never commit cookies, session tokens, OTP values, owner codes, or browser storage dumps.
- Never paste auth-state contents into ChatGPT, Codex, Cursor, GitHub, Railway, logs, screenshots, or tickets.
- Never use real production owner sessions in Codex Cloud.
- Owner auth-state may only be used locally on the operator's machine.
- Automated tests must not perform production write actions unless explicitly approved.

## Intended local-only auth-state paths

    playwright/.auth/public.json
    playwright/.auth/tester.json
    playwright/.auth/customer.json
    playwright/.auth/admin.json
    playwright/.auth/owner.json
    playwright/.auth/inspect.json

These files are intentionally ignored by Git.

## Roles

| Role | Purpose | Secret level | Cloud agent allowed? | Local Cursor allowed? |
|---|---|---:|---:|---:|
| Public | Public pages, SEO, legal pages, smoke tests | none | yes | yes |
| Tester | Trial/test access | low if staging-only | yes, staging only | yes |
| Customer | Learning area and purchased modules | medium | staging only | yes, preferably staging |
| Admin | Admin dashboard and admin APIs | high | no real production session | local/staging only |
| Owner | Owner dashboard and owner APIs | very high | no | local-only |
| Inspect | Read-only diagnostic mode | limited but sensitive | only if short-lived and read-only | yes |

## Recommended workflow

1. Generate auth-state only locally.
2. Store it only under `playwright/.auth/`.
3. Run read-only smoke tests first.
4. Run write-capable tests only on staging or with explicit approval.
5. Delete or refresh auth-state when access changes.
