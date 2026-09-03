# RetailHub - Micro-Frontend Architecture

## Overview

RetailHub uses a Shell/Host and Remote Micro-Frontend architecture.

All applications exist in one repository and Angular workspace.

Repository centralization must not result in architectural coupling.

## Shell

The Shell is responsible for global application concerns.

Responsibilities:

- Login
- Authentication
- Logout
- Session management
- Authorization
- Roles
- Permissions
- Header
- Sidebar
- Footer
- Main layout
- Global navigation
- Top-level routing
- Remote loading
- Global configuration
- Global error handling

The Shell must not own business-domain logic belonging to a Remote.

## Remote Micro-Frontends

### Product MFE

Owns:

- Products
- Categories
- Subcategories
- SKU
- Product pricing
- Product attributes

### Purchasing MFE

Owns:

- Purchase orders
- Suppliers
- PO items
- Goods receipt
- Purchasing workflow

### Inventory MFE

Owns:

- Warehouses
- Stock
- Stock movements
- Inventory adjustments

### Orders MFE

Owns:

- Sales orders
- Order details
- Fulfillment
- Order status

### Customers MFE

Owns:

- Customers
- Customer details
- Addresses
- Customer history

### Reports MFE

Owns:

- Dashboards
- Reports
- Analytics

### Administration MFE

Owns:

- Users
- Roles
- Permissions
- Application settings

## Micro-Frontend Boundaries

Each MFE should:

- Own its business logic.
- Own its feature components.
- Own its feature services.
- Own its feature routes.
- Own its domain-specific state.
- Be independently buildable.
- Be independently testable.
- Be independently deployable.

A Remote must not directly access another Remote's internal implementation.

## Communication

Communication should be explicit and minimal.

Possible mechanisms:

- Shared contracts
- Events
- Router navigation
- URL parameters
- Query parameters
- Shared services where appropriate
- Backend APIs

Avoid direct Remote-to-Remote dependencies.

## Shared Libraries

Shared libraries should contain genuinely reusable functionality.

Examples:

- Shared UI
- Shared models
- Shared utilities
- Shared API infrastructure
- Shared authentication contracts

Business-domain logic must remain inside the appropriate MFE.

## Module Federation

Use the latest stable Module Federation approach compatible with the selected Angular version.

Before introducing packages or configuration, verify compatibility with the Angular version.

## Independent Deployment

All MFEs live in the same repository but should remain independently buildable and deployable.

The architecture should support:

- Independent releases
- Independent rollback
- Remote versioning
- Environment-specific Remote URLs
- Failure handling