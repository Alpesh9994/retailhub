# RetailHub - Workspace Structure

## Repository Strategy

RetailHub uses:

- One root folder
- One Git repository
- One Angular workspace

All applications are maintained under the same root.

There must not be separate Git repositories for each Micro-Frontend.

## Root Structure

```text
retailhub/
│
├── apps/
│   ├── shell/
│   ├── product/
│   ├── purchasing/
│   ├── inventory/
│   ├── orders/
│   ├── customers/
│   ├── reports/
│   └── administration/
│
├── libs/
│   ├── shared-ui/
│   ├── shared-models/
│   ├── shared-utils/
│   ├── shared-api/
│   └── shared-auth/
│
├── docs/
│   ├── architecture/
│   ├── adr/
│   └── api/
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md