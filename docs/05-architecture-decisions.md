# RetailHub - Architecture Decision Records

This document records important architectural decisions for the RetailHub platform.

Architectural decisions should be updated when a significant technology, structure, integration, security, deployment, or development decision is made.

---

# ADR-001 - Single Repository and Angular Workspace

## Status

Accepted

## Decision

RetailHub will use:

- One root folder
- One Git repository
- One Angular workspace

All Micro-Frontends and shared libraries will be maintained inside the same repository and workspace.

Example:

```text
retailhub/
├── apps/
├── libs/
├── docs/
├── angular.json
├── package.json
└── tsconfig.json