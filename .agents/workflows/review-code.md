---
description: Review RetailHub code for architecture, Angular standards, TypeScript, security, performance, accessibility, testing, and maintainability without making changes.
---

# RetailHub Code Review Workflow

Review the selected or relevant RetailHub code using the current workspace and approved architecture as the source of truth.

## Review Process

1. Inspect the actual current implementation.
2. Read relevant architecture documentation.
3. Understand the purpose and responsibility of the code.
4. Do not assume missing files, APIs, services, models, or configuration.
5. Do not modify files during the review.
6. When reviewing backend code, inspect `api/` alongside the Angular code.

## Review Areas

### Architecture

Check Angular/MFE:

- correct Shell/Remote responsibilities
- proper MFE boundaries
- no direct Remote-to-Remote internal dependencies
- appropriate shared-library usage
- no unnecessary coupling
- no unnecessary abstraction or overengineering

Check Backend (when api/ exists):

- NestJS module boundaries respected (AuthModule, UsersModule, etc. are cohesive)
- Controllers are thin — no business logic in controllers
- Services own business logic
- Prisma access only through dedicated service or repository
- No domain logic leaked into Angular from NestJS or vice versa
- API contracts match what Angular `shared-auth` / `shared-api` expects

### Angular

Check:

- standalone Angular
- zoneless compatibility
- signals where appropriate
- modern control flow
- Reactive Forms where appropriate
- dependency injection
- routing and lazy loading
- appropriate component design
- appropriate service responsibilities

### NestJS

Check:

- modules are cohesive and do not exceed their responsibility
- controllers are thin (delegate to services)
- services contain business logic, not controllers
- DTOs use class-validator decorators
- guards are applied at the correct level (controller or route)
- Prisma queries are in appropriate service, not scattered
- no raw SQL unless Prisma is insufficient
- environment variables accessed via ConfigService, not process.env directly

### Prisma Schema

When reviewing schema changes:

- field types are appropriate
- relations are correctly defined
- indexes exist for frequently queried fields
- migration files exist for every schema change
- no breaking migrations without a migration plan

### TypeScript

Check:

- strict typing (both Angular and NestJS)
- interfaces/types
- unnecessary `any`
- unsafe type assertions
- null/undefined handling
- unnecessary duplication

### API and Data Flow

Check that responsibility follows the preferred pattern:

```
Angular Component
    ↓
Angular Feature Service
    ↓
Angular API Service (HttpClient)
    ↓
NestJS Controller
    ↓
NestJS Service
    ↓
Prisma
    ↓
PostgreSQL
```

Identify business or API logic incorrectly placed in components.

### Security

Check:

- authentication/session handling
- authorization assumptions
- unsafe input handling
- XSS risks (Angular)
- sensitive data exposure
- hard-coded secrets (Angular and NestJS)
- unsafe token handling (access token in memory, refresh token in httpOnly cookie)
- insecure API usage
- JWT secret not exposed in frontend code
- CORS configured to allowed origins only
- Helmet used in NestJS for security headers
- Rate limiting on auth endpoints
- Passwords never returned in API responses
- Prisma queries not vulnerable to injection (Prisma parameterises by default)

### Performance

Check:

- unnecessary rendering
- unnecessary subscriptions
- unnecessary change detection
- inefficient data processing
- inappropriate eager loading
- unnecessary dependencies

### Accessibility

Check:

- semantic HTML
- keyboard accessibility
- labels
- focus management
- validation messages
- appropriate ARIA usage

### Testing

Check whether important behavior is appropriately tested.

Do not recommend meaningless tests only to increase coverage.

## Output

Return:

### 1. Summary

Overall assessment of the reviewed code.

### 2. Critical Issues

Problems that should be fixed immediately.

### 3. High Priority

Important maintainability, architecture, security, or correctness issues.

### 4. Medium Priority

Improvements that should be considered.

### 5. Low Priority

Optional cleanup or refinement.

### 6. Good Practices

Mention things that are already implemented correctly.

### 7. Recommended Changes

For each recommendation include:

- issue
- why it matters
- suggested solution
- affected file(s)

Do not modify files.

Do not generate implementation code unless explicitly requested after the review.