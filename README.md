# Balancer pools

Proof of concept for balancer pools

## Development

> **Node version**
> Required node version: >=16.0.0

Install pnpm:

Follow [pnpm installation](https://pnpm.io/installation) instructions

Install dependencies:

```bash
pnpm i
```

Start the application:

```bash
pnpm dev
```

The app should be running at http://localhost:4000

## Code generation

Download list of tokens metadata:

```bash
  pnpm download:tokenlist
```

Generate types for Graphql queries:

```bash
  pnpm generate-gql-types
```

## Tests

Unit tests:

```bash
pnpm test:unit
```

Unit tests with coverage:

```bash
pnpm test:unit:coverage
```

e2e tests (headed):

```bash
pnpm test:e2e
```

e2e tests for ci (headless):

```bash
pnpm test:e2e:ci
```

## Kudos

Initial setup based on [Vite + Vue 3 + Typescript + Tailwind Starter](https://github.com/vincentdoerig/vue3-typescript-tailwind-starter).
