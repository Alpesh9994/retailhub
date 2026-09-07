---
trigger: always_on
---

# RetailHub — Architecture & Development Rules

You are working on RetailHub, an enterprise retail/e-commerce platform built with Angular and Micro-Frontend architecture.

These rules apply to all work in this workspace.

---

## 1. SOURCE OF TRUTH

Use the following priority:

1. Actual current codebase
2. Approved RetailHub architecture documentation
3. These workspace rules
4. Your general engineering knowledge

Before making changes to an existing implementation, inspect the relevant code first.

Do not assume that files, services, APIs, models, routes, or configuration exist without inspecting them.

The architecture documents are the source of truth for architectural decisions.

If the current code conflicts with the approved architecture:

1. Identify the conflict.
2. Explain the impact.
3. Recommend the smallest safe correction.
4. Do not silently redesign the architecture.

When a new feature genuinely requires new files, clearly identify the files as NEW and explain their purpose.

---

## 2. PROJECT ARCHITECTURE

RetailHub uses:

- One root folder
- One Git repository
- One Angular workspace
- Multiple Angular applications
- Shell/Host + Remote MFEs
- Shared Angular libraries

Do not introduce Nx or another monorepo framework unless there is a strong technical justification.

Avoid unnecessary architectural complexity and overengineering.

---

## 3. CURRENT APPLICATIONS

Current applications:

apps/
├── shell/
├── product/
└── purchasing/

### Shell

The Shell is the Host/container application.

It owns global concerns such as:

- application layout
- header
- sidebar
- footer
- top-level navigation
- authentication/session
- global configuration
- remote loading
- global error/fallback handling
- cross-cutting concerns

Do not place Product or Purchasing business logic inside the Shell.

### Product

Product is a Remote MFE responsible for the Product domain.

### Purchasing

Purchasing is a Remote MFE responsible for the Purchasing domain.

Future Remote MFEs:

- inventory
- orders
- customers
- reports
- administration

Do not assume future MFEs already exist.

---

## 4. SHARED LIBRARIES

Current libraries:

libs/
├── shared-ui/
├── shared-models/
├── shared-utils/
├── shared-api/
└── shared-auth/

Use these import scopes:

@retailhub/shared-ui
@retailhub/shared-models
@retailhub/shared-utils
@retailhub/shared-api
@retailhub/shared-auth

Shared UI component selectors use the prefix:

rh

Examples:

rh-button
rh-data-table
rh-input

Shared libraries should contain only genuinely reusable functionality.

Do not move domain-specific business logic into shared libraries just to avoid duplication.

---

## 5. MICRO-FRONTEND BOUNDARIES

Each Remote MFE owns its own:

- domain logic
- domain components
- domain services
- domain routes
- domain state
- domain-specific models

Each Remote should remain independently:

- buildable
- testable
- deployable

Do not create direct internal dependencies between Remote MFEs.

For example:

Product must not depend directly on Purchasing internals.

Purchasing must not depend directly on Product internals.

If communication between MFEs is required, use an explicit and controlled communication mechanism.

---

## 6. ANGULAR STANDARDS

RetailHub targets the current approved Angular version, currently Angular 22.

Before dependency or configuration changes, verify compatibility with the actual installed Angular version.

Use modern Angular:

- standalone components
- standalone routes
- signals where appropriate
- modern Angular control flow
- strict TypeScript
- Reactive Forms
- dependency injection
- lazy loading
- OnPush-compatible patterns
- zoneless-compatible patterns

Avoid unnecessary NgModules.

Avoid using `any` as a shortcut.

Prefer clear interfaces, types, and generics.

---

## 7. ZONELESS

RetailHub uses Zoneless Angular from the beginning.

Do not introduce ZoneJS unless a specific compatibility requirement is identified.

When writing UI code, ensure state changes are expressed through Angular-supported reactive mechanisms such as:

- signals
- template-observable patterns where appropriate
- explicit change detection APIs only when genuinely required

Do not add ZoneJS simply because it is familiar or convenient.

---

## 8. STATE MANAGEMENT

Do not introduce NgRx by default.

Use the simplest solution that correctly solves the problem.

Prefer:

- local component state
- signals
- feature-level services
- RxJS where appropriate

Introduce heavier state management only when there is a clear architectural reason.

---

## 9. APPLICATION DATA FLOW

Prefer this responsibility flow:

Component
    ↓
Feature/Application Service
    ↓
API Service
    ↓
HttpClient
    ↓
Backend API

Components should not contain large amounts of business or API logic.

Keep responsibilities focused and testable.

---

## 10. AUTHENTICATION AND AUTHORIZATION

Authentication/session management is a centralized cross-cutting concern owned by the Shell/shared-auth architecture.

Frontend route guards are not the primary security boundary.

Authorization must ultimately be enforced by the backend.

Never expose secrets in frontend code.

Follow secure practices for:

- authentication
- session handling
- token handling
- authorization
- input validation
- XSS prevention
- CSRF protection where applicable
- secure HTTP communication
- least privilege
- error handling

---

## 11. API AND BACKEND

Do not invent backend APIs.

If an API is not present in the current codebase or provided requirements, identify it as a proposed/new API.

Keep API access separate from UI components.

Do not hard-code environment-specific URLs or secrets.

Use appropriate environment/configuration mechanisms.

---

## 12. MICRO-FRONTEND TECHNOLOGY

The approved MFE direction is Native Federation / the latest Angular-compatible federation approach.

Before installing or changing federation packages:

1. Verify Angular compatibility.
2. Verify package compatibility.
3. Inspect the current configuration.
4. Explain compatibility risks.
5. Propose the smallest safe change.

Do not blindly upgrade federation dependencies.

Shared Angular and RxJS dependencies should be handled consistently across MFEs.

---

## 13. CODE ORGANIZATION

Prefer feature/domain-oriented organization.

Keep:

- components focused
- services focused
- models strongly typed
- routes close to their feature
- business logic outside presentation components
- reusable functionality in appropriate shared libraries

Avoid:

- giant components
- giant services
- duplicated business logic
- circular dependencies
- unnecessary abstractions
- premature optimization
- speculative architecture

---

## 14. TESTING

Production-oriented changes should include appropriate tests.

Consider:

- unit tests
- component tests
- service tests
- route/integration tests
- MFE integration validation
- critical user-flow tests

Do not create meaningless tests solely to increase coverage numbers.

---

## 15. PERFORMANCE

Prefer:

- lazy-loaded routes
- lazy-loaded MFEs
- efficient rendering
- signals where appropriate
- avoiding unnecessary subscriptions
- avoiding unnecessary change detection
- sensible bundle sizes
- minimal shared dependencies

Do not optimize prematurely.

Measure or explain performance concerns before introducing complexity.

---

## 16. ACCESSIBILITY

Follow accessible UI practices:

- semantic HTML
- keyboard accessibility
- proper form labels
- focus management
- accessible validation/error messages
- appropriate ARIA usage

Do not use ARIA when native semantic HTML already provides the required behavior.

---

## 17. IMPLEMENTATION WORKFLOW

For significant changes, follow this process:

### Step 1 — Inspect

Inspect the relevant current code before proposing implementation.

### Step 2 — Explain

Explain:

- what currently exists
- what is missing
- any problems
- architectural risks

### Step 3 — Plan

Provide:

- implementation approach
- files to create
- files to modify
- dependencies required
- validation strategy

### Step 4 — Approval

For significant architectural or dependency changes, wait for approval before proceeding.

Do not silently make major architectural changes.

### Step 5 — Implement

Make the smallest clean implementation consistent with the approved architecture.

### Step 6 — Validate

Provide the commands/checks needed to verify:

- build
- tests
- lint/formatting where configured
- application behavior
- MFE integration where relevant

### Step 7 — Summarize

Report:

- what changed
- files changed
- why
- validation performed
- remaining issues

---

## 18. GIT AND FILE SAFETY

Do not delete, rename, or overwrite existing project files without a clear reason.

Preserve existing working functionality.

Do not modify unrelated files.

Do not commit:

- node_modules
- build output
- secrets
- environment credentials
- temporary files

Git is the source of truth for project history.

The repository is:

https://github.com/Alpesh9994/retailhub

The primary branch is:

main

---

## 19. CURRENT PROJECT STATUS

Sprint 01 and Sprint 02 are completed.

Completed:

- RetailHub architecture defined
- MFE architecture defined
- one repository established
- one Angular workspace established
- Shell application created
- Product application created
- Purchasing application created
- shared-ui library created
- shared-models library created
- shared-utils library created
- shared-api library created
- shared-auth library created
- Angular workspace configuration created
- Git repository established
- main branch established
- GitHub repository established
- initial workspace foundation committed
- initial workspace foundation pushed to GitHub
- Native Federation configured (Shell as Host, Product + Purchasing as Remotes)
- federation.manifest.json created for runtime remote URL resolution
- REMOTE_LOADER injection token created for safe lazy loading of remotes
- Shell routes wired to Product (port 4201) and Purchasing (port 4202) remotes

Sprint 03 is in progress.

Sprint 03 goal: Authentication-first — NestJS backend + JWT auth + Angular login page.

Do not regenerate this workspace.

Continue from the existing implementation.

---

## 20. ARCHITECTURE DOCUMENTATION

The approved architecture documentation includes:

01-project-overview.md
02-micro-frontend-architecture.md
03-workspace-structure.md
04-coding-standards.md
05-architecture-decisions.md

Read and respect these documents when they are available in the workspace.

Do not duplicate or replace their architectural decisions with a different architecture without discussion.

---

## 21. ENGINEERING PRINCIPLE

The goal is:

Production quality without unnecessary complexity.

Always prefer:

simple + maintainable + testable + secure + scalable

over:

complex + over-engineered + speculative

When multiple technically valid solutions exist, recommend the simplest solution that satisfies the current requirements and explain important trade-offs.

---

## 22. BACKEND TECHNOLOGY STACK

RetailHub uses the following approved backend stack:

- **Framework**: NestJS (TypeScript-first, decorator-based, dependency injection — same architectural patterns as Angular)
- **Database**: PostgreSQL (relational, production-grade)
- **ORM**: Prisma (TypeScript-first, schema-driven, generates types automatically)
- **Auth**: Passport.js with Local and JWT strategies
- **Password hashing**: bcrypt
- **Validation**: class-validator + class-transformer on DTOs

The backend lives in:

```
retailhub/
└── api/          ← NestJS backend (separate package.json)
```

The `api/` folder has its own `package.json` and `node_modules`.

Angular dependencies (in the root `package.json`) must not be mixed with NestJS dependencies (in `api/package.json`).

The default development port for the NestJS API is `3000`.

Do not use .NET, Python, or Firebase as the backend.

Do not introduce a different ORM without a clear technical justification.

---

## 23. AUTHENTICATION AND TOKEN STRATEGY

RetailHub uses a JWT access token + refresh token strategy.

### Access Token

- Short-lived: 15 minutes
- Stored **in memory only** (Angular signal in `AuthService`)
- Never stored in localStorage or sessionStorage
- Attached to every API request via an Angular HTTP interceptor as `Authorization: Bearer <token>`

### Refresh Token

- Long-lived: 7 days
- Stored in an **httpOnly, Secure, SameSite=Strict cookie**
- Never accessible from JavaScript
- Used only to obtain a new access token via `POST /auth/refresh`

### Token Security Rules

- JWT secrets must be in environment variables — never hard-coded
- Refresh tokens must be invalidated on logout (server-side tracking or rotation)
- Passwords must be hashed with bcrypt — never stored in plain text
- Passwords must never be returned in any API response
- CORS must be configured to allow only known origins
- Helmet must be applied in NestJS for security headers
- Rate limiting must be applied to `/auth/login` and `/auth/refresh`

### Auth Flow

```
Angular Login Form
    ↓ POST /auth/login { email, password }
NestJS AuthController
    ↓ validates credentials via LocalStrategy
NestJS AuthService
    ↓ bcrypt.compare()
    ↓ returns accessToken + sets httpOnly refresh cookie
Angular AuthService
    ↓ stores accessToken in signal (memory)
    ↓ redirects to Shell layout
Subsequent requests
    ↓ HTTP interceptor adds Authorization: Bearer <accessToken>
    ↓ On 401: POST /auth/refresh → new accessToken
Logout
    ↓ POST /auth/logout
    ↓ Clears httpOnly cookie server-side
    ↓ Angular clears signal, redirects to /login
```

### Angular Auth Responsibilities (`shared-auth`)

- `AuthService` — signals for current user and auth state, `login()`, `logout()`, `refresh()` methods
- `AuthGuard` — redirects unauthenticated users to `/login`
- `AuthInterceptor` — attaches Bearer token to outgoing HTTP requests
- `AuthModels` — `LoginRequest`, `LoginResponse`, `AuthUser` interfaces

Authentication is a Shell concern.

Remote MFEs must not implement their own authentication.

Remote MFEs receive the authenticated user context through the Shell's shared auth service.