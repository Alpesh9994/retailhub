---
description: Start a new RetailHub sprint by inspecting the current codebase, reviewing relevant architecture, and proposing an implementation plan before making changes.
---

# RetailHub Sprint Start Workflow

Start the requested RetailHub sprint using the current workspace as the source of truth.

## Before doing anything

1. Inspect the current workspace and relevant files.
2. Read the relevant RetailHub architecture documentation.
3. Check the current implementation rather than assuming what exists.
4. Review the current Git status when relevant.
5. Identify what has already been completed.
6. Identify what remains to be done for the requested sprint.

## Architecture

Follow the approved RetailHub architecture and the always-on RetailHub architecture rule.

Do not redesign the architecture without first explaining the reason and getting approval.

Respect:

- One Git repository
- One Angular workspace
- Shell + Remote MFEs
- Shared libraries
- Independent MFE boundaries
- No direct Remote-to-Remote internal dependencies
- Angular standalone architecture
- Zoneless Angular
- Strict TypeScript
- Native Federation / approved Angular-compatible MFE approach
- Production quality without unnecessary overengineering

## Current Applications

apps/
- shell
- product
- purchasing

## Current Shared Libraries

libs/
- shared-ui
- shared-models
- shared-utils
- shared-api
- shared-auth

## Required Output

Before making significant changes, provide:

### 1. Current State

Explain what currently exists and what is already completed.

### 2. Sprint Goal

Explain what this sprint should accomplish.

### 3. Findings

Identify:

- missing functionality
- configuration issues
- architecture concerns
- dependency concerns
- risks
- inconsistencies

### 4. Implementation Plan

Provide a clear, ordered implementation plan.

### 5. Files

List:

- files to create
- files to modify
- files that should remain unchanged

Clearly mark new files as NEW.

### 6. Dependencies

If packages need to be installed or changed:

- identify them
- explain why
- verify Angular compatibility
- identify compatibility risks

Do not install or upgrade dependencies without approval for significant changes.

### 7. Validation

Explain how the completed sprint should be validated, including appropriate:

- build checks
- tests
- type checks
- lint/format checks where configured
- MFE integration checks where applicable

## Important

Do not modify files during the planning phase.

Do not generate large amounts of code during the planning phase.

Do not regenerate the RetailHub workspace.

Do not overwrite existing functionality.

Wait for approval before making significant implementation or architectural changes.

After approval, implement incrementally and report what changed.