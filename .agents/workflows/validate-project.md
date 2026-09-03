---
description: Validate the current RetailHub workspace for build, type, test, formatting, configuration, dependency, and Micro-Frontend issues.
---

# RetailHub Project Validation Workflow

Validate the current RetailHub workspace without making unnecessary changes.

## Process

1. Inspect the current workspace.
2. Review package.json and Angular configuration.
3. Check the applications and shared libraries.
4. Check relevant TypeScript configuration.
5. Check Micro-Frontend configuration when present.
6. Run appropriate validation commands when safe.
7. Do not modify source files automatically.

## Validate

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

## Commands

Use the project's existing package scripts when available.

Do not invent package scripts.

If a command is required but unavailable, explain what is missing before changing package.json.

## Output

Report:

### Build
- pass/fail
- errors
- affected application

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
- compatibility concerns

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