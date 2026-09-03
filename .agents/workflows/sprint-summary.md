---
description: Create a concise RetailHub sprint summary containing completed work, decisions, changed files, validation, known issues, and next steps.
---

# RetailHub Sprint Summary Workflow

Create a sprint summary based on the actual current workspace and the work completed during the sprint.

Inspect the current code and relevant documentation before preparing the summary.

Do not invent completed work.

## Include

### Sprint

Identify the sprint number and goal when available.

### Completed Work

List the features, configuration, applications, libraries, and fixes actually completed.

### Architecture Decisions

List important architecture decisions made during the sprint.

### Files Changed

List:

- created files
- modified files
- deleted files, if any

Group them logically.

### Dependencies

List packages added, removed, or changed and explain why.

### Validation

Include:

- build results
- test results
- type-check results
- lint/format results where applicable
- MFE validation

### Known Issues

List unresolved issues, risks, and technical debt.

### Security

Mention relevant security considerations or remaining concerns.

### Performance

Mention relevant performance considerations or remaining concerns.

### Next Sprint

Provide recommended next steps based on the actual project state.

## Output

Generate a Markdown document suitable for saving as:

SPRINT-SUMMARY.md

Keep the summary factual and concise.

Do not claim something was completed unless it can be verified from the current workspace or sprint context.