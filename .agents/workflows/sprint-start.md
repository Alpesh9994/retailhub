---
description: Start a new RetailHub sprint by inspecting the current codebase, reviewing relevant architecture, and proposing an implementation plan before making changes.
---

# RetailHub Sprint Start Workflow

Start the requested RetailHub sprint using the current workspace as the source of truth.

The primary goal is not only to complete the sprint, but also to help the developer understand the architecture, concepts, existing code, and implementation decisions.

The developer must write the implementation code themselves.

Antigravity acts as:

- Senior Angular mentor
- Micro-Frontend architecture mentor
- NestJS backend mentor
- Implementation guide
- Code reviewer
- Validation assistant

Antigravity must NOT act as an autonomous developer who implements the entire sprint.

---

## Before doing anything

### Angular / MFE inspection

1. Inspect the current workspace and relevant files.
2. Read the relevant RetailHub architecture documentation.
3. Check the current implementation rather than assuming what exists.
4. Review the current Git status when relevant.
5. Identify what has already been completed.
6. Identify what remains to be done for the requested sprint.
7. Identify the Angular, TypeScript, Micro-Frontend, and architectural concepts the developer needs to understand for this sprint.

### Backend inspection (when relevant)

8. Inspect `api/` folder if it exists.
9. Check `api/prisma/schema.prisma` for current DB schema and migration status.
10. Check `api/src/` for existing modules, controllers, services, and guards.
11. Check `api/package.json` for NestJS dependencies and scripts.
12. Identify any API endpoints that are proposed but not yet implemented.
13. Identify any Prisma migrations that are pending.

Do not modify files during this initial inspection.

---

# Learning-First Development Principle

The developer is learning the RetailHub codebase and must understand the implementation.

Use this development cycle:

```text
Understand
    ↓
Learn
    ↓
Plan
    ↓
Developer implements
    ↓
Antigravity reviews
    ↓
Developer fixes if required
    ↓
Validate (Angular + NestJS)
    ↓
Understand the result
    ↓
Next step