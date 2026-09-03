# RetailHub - Coding Standards

## Purpose

This document defines the coding standards and development conventions for the RetailHub Angular Micro-Frontend platform.

All code should be production-oriented, maintainable, readable, testable, secure, and consistent across the entire workspace.

---

# 1. Angular Version

RetailHub must use the **latest stable officially released Angular version** available when the project is created or upgraded.

Before introducing Angular features, APIs, configuration, or third-party packages:

1. Verify compatibility with the current Angular version.
2. Prefer official Angular APIs and documented patterns.
3. Avoid deprecated APIs.
4. Avoid tutorials or examples based on obsolete Angular versions.
5. Do not downgrade Angular merely to support an outdated package unless explicitly approved.

Angular, TypeScript, RxJS, Node.js, and Micro-Frontend tooling must remain compatible.

---

# 2. Angular Development Style

Prefer modern Angular patterns.

Use:

- Standalone components
- Modern Angular control flow
- Signals where appropriate
- Modern dependency injection
- Lazy-loaded routes
- Route-level providers where appropriate
- Reactive Forms
- Strongly typed forms where practical
- `inject()` where it improves clarity
- `OnPush` change detection where appropriate
- Modern Angular template syntax
- Feature-based architecture

Avoid:

- Deprecated APIs
- Unnecessary NgModules
- Large monolithic components
- Excessive inheritance
- Unnecessary abstractions
- Global mutable state
- Business logic inside templates

---

# 3. Standalone Components

Standalone components should be the default approach.

Example:

```ts
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {}