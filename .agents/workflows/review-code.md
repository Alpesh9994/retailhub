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

## Review Areas

### Architecture

Check:

- correct Shell/Remote responsibilities
- proper MFE boundaries
- no direct Remote-to-Remote internal dependencies
- appropriate shared-library usage
- no unnecessary coupling
- no unnecessary abstraction or overengineering

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

### TypeScript

Check:

- strict typing
- interfaces/types
- unnecessary `any`
- unsafe type assertions
- null/undefined handling
- unnecessary duplication

### API and Data Flow

Check that responsibility follows the preferred pattern:

Component
↓
Feature/Application Service
↓
API Service
↓
HttpClient
↓
Backend API

Identify business or API logic incorrectly placed in components.

### Security

Check:

- authentication/session handling
- authorization assumptions
- unsafe input handling
- XSS risks
- sensitive data exposure
- hard-coded secrets
- unsafe token handling
- insecure API usage

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