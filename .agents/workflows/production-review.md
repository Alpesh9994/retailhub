---
description: Perform a production-readiness review of RetailHub covering security, architecture, performance, testing, deployment, configuration, and reliability.
---

# RetailHub Production Review Workflow

Perform a production-readiness assessment of the current RetailHub workspace.

Do not modify files during the review.

## Review

### Architecture

Check:

- Shell/Remote boundaries
- MFE independence
- shared-library boundaries
- dependency coupling
- scalability
- maintainability
- architectural consistency

### Security

Check:

- authentication
- authorization assumptions
- token/session handling
- secrets
- environment configuration
- XSS risks
- CSRF considerations
- API security assumptions
- sensitive information exposure

### Performance

Check:

- lazy loading
- MFE loading
- bundle size risks
- rendering efficiency
- unnecessary dependencies
- unnecessary subscriptions
- network requests
- caching opportunities

### Reliability

Check:

- remote loading failures
- fallback/error handling
- API failure handling
- loading states
- retry behavior where appropriate
- application recovery behavior

### Testing

Check:

- unit tests
- component tests
- service tests
- integration tests
- MFE integration
- critical user flows

### Configuration

Check:

- environment configuration
- production configuration
- hard-coded URLs
- secrets
- build configuration
- deployment assumptions

### Accessibility

Check:

- keyboard navigation
- forms
- semantic HTML
- focus management
- accessible errors
- ARIA usage

### Dependencies

Check:

- Angular compatibility
- federation compatibility
- dependency consistency
- risky or unnecessary packages

## Output

Provide:

1. Production readiness summary
2. Critical blockers
3. High-priority issues
4. Medium-priority issues
5. Low-priority improvements
6. Security concerns
7. Performance concerns
8. Testing gaps
9. Deployment concerns
10. Recommended release checklist

Do not modify files.

Clearly distinguish actual problems from recommendations.