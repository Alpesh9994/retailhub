---
description: Validate the current RetailHub workspace for build, type, test, formatting, configuration, dependency, and Micro-Frontend issues.
---

# RetailHub Project Validation Workflow

Validate the current RetailHub workspace without making unnecessary changes.

## Process

### Angular / MFE

1. Inspect the current workspace.
2. Review package.json and Angular configuration.
3. Check the applications and shared libraries.
4. Check relevant TypeScript configuration.
5. Check Micro-Frontend configuration when present.
6. Run appropriate validation commands when safe.

### Backend (when api/ exists)

7. Inspect `api/package.json` and NestJS configuration.
8. Check `api/prisma/schema.prisma` for schema and migration consistency.
9. Verify that `api/.env` or `api/.env.example` exists (never inspect actual secrets).
10. Run NestJS build validation when safe.
11. Check for pending Prisma migrations.

Do not modify source files automatically.

## Validate

### Angular

Check:

- Angular configuration
- TypeScript configuration
- dependency consistency
- npm/package configuration
- application builds
- library builds where applicable
- unit tests
- linting where configured
- formatting where configured
- strict TypeScript errors
- routing configuration
- environment configuration
- federation configuration
- MFE compatibility
- shared dependency consistency

### Backend (NestJS)

Check:

- NestJS build (`npm run build` in `api/`)
- TypeScript strict errors in `api/src/`
- Prisma schema validity (`npx prisma validate` in `api/`)
- Prisma migration status (`npx prisma migrate status` in `api/`)
- Environment variables documented in `.env.example`
- No hard-coded secrets in source files
- `api/` unit tests if present
- CORS configuration appropriate for dev and production

## Commands

Use the project's existing package scripts when available.

Do not invent package scripts.

If a command is required but unavailable, explain what is missing before changing package.json.

## Output

Report:

### Angular Build
- pass/fail
- errors
- affected application

### NestJS Build
- pass/fail
- errors

### Prisma
- schema validity
- pending migrations

### Tests
- pass/fail
- failing tests
- affected project

### Type Checking
- errors
- affected files

### Lint/Formatting
- issues
- affected files

### Dependencies
- outdated or incompatible dependencies
- compatibility concerns (Angular, NestJS, Prisma)

### Micro-Frontend
- federation configuration issues
- shared dependency issues
- remote loading concerns

### Overall Status

Classify the project as:

- PASS
- PASS WITH WARNINGS
- FAIL

For every failure, explain the cause and recommended fix.

Do not automatically fix problems unless explicitly requested.