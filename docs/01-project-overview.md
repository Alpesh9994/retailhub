# RetailHub - Project Overview

## Project Name

RetailHub

## Project Type

Enterprise Retail / E-Commerce Management Platform

## Purpose

RetailHub is a real-world enterprise application designed to manage retail and e-commerce business operations.

The application is being built to demonstrate and apply production-quality Angular and Micro-Frontend architecture.

## Technology

- Angular - latest stable version
- TypeScript - compatible with the selected Angular version
- RxJS - compatible with Angular
- Node.js - supported version for Angular
- Micro-Frontend technology - latest stable Angular-compatible approach
- Module Federation where appropriate

## Architecture

RetailHub uses a Micro-Frontend architecture.

The platform consists of:

- Shell / Host
- Product MFE
- Purchasing MFE
- Inventory MFE
- Orders MFE
- Customers MFE
- Reports MFE
- Administration MFE

## Repository Strategy

The entire project uses:

- One root folder
- One Git repository
- One Angular workspace

All applications and shared libraries are maintained inside the same repository.

The project does not use separate repositories for individual Micro-Frontends.

## Main Business Areas

### Product Management

- Products
- Categories
- Subcategories
- SKU
- Product attributes
- Product pricing

### Purchasing

- Purchase orders
- Suppliers
- Purchase order items
- Goods receipt
- Purchasing workflow

### Inventory

- Warehouses
- Stock
- Stock movements
- Inventory adjustments

### Orders

- Sales orders
- Order details
- Fulfillment
- Order status

### Customers

- Customer management
- Customer details
- Addresses
- Customer history

### Reports

- Dashboard
- Sales reports
- Inventory reports
- Purchasing reports
- Analytics

### Administration

- Users
- Roles
- Permissions
- Application settings

## Project Goals

The project should demonstrate:

- Modern Angular
- Micro-Frontend architecture
- Module Federation
- Independent application boundaries
- Shared libraries
- Authentication
- Authorization
- API integration
- Testing
- Security
- Performance
- CI/CD
- Independent deployment

## Development Philosophy

This is intended to be a realistic enterprise project.

Prefer simple, maintainable, production-ready solutions.

Avoid unnecessary complexity and over-engineering.