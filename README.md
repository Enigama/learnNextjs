# Learn Nx Monorepo + Next.js

Personal learning project for exploring an Nx monorepo with a Next.js app.

## Common commands

| Task               | Command                         |
| ------------------ | ------------------------------- |
| Start dev server   | `npx nx run @learn/web:dev`     |
| Build all projects | `npx nx run-many -t build`      |
| Run all tests      | `npx nx run-many -t test`       |
| Run affected tests | `npx nx affected -t test`       |
| Lint affected      | `npx nx affected -t lint`       |
| View project graph | `npx nx graph`                  |
| E2E tests          | `npx nx run @learn/web-e2e:e2e` |

---

## What's inside

```
nextjs-template/
- apps/
  - food/         Next.js app from learn path
  - web/          Next.js App Router application (scope:web)
  - web-e2e/      Playwright end-to-end tests
- packages/
  - ui/           Shared React component library (scope:shared)
                  -> HeroBanner, FeatureCard (used by web home page)
```

### Key choices

- **Next.js 16 App Router** with `src/` directory layout
- **TypeScript** throughout - strict mode enabled
- **Jest** for unit tests, **Playwright** for e2e
- **ESLint** with module boundary enforcement (tags: `scope:web`, `scope:shared`)
- **npm** as package manager

---

## Featured Nx capabilities

### Computation caching

Every task result is cached locally. Running `npx nx run @nextjs-template/web:build` a second time takes milliseconds.

```sh
npx nx run @learn/web:build        # first run: compiles
npx nx run @learn/web:build        # second run: instant (cache hit)
```

### Affected commands

Only run work that is actually impacted by your changes:

```sh
npx nx affected -t build,test,lint
```

### Module boundaries

Tags on each project enforce architectural rules via ESLint:

- `scope:web` projects can import from `scope:shared`
- `scope:shared` projects cannot import from `scope:web`

Add rules in `eslint.config.mjs` under `@nx/enforce-module-boundaries`.

### Project graph

Visualize the dependency graph of your entire workspace:

```sh
npx nx graph
```

### Code generation

Scaffold new apps, libraries, and components with generators:

```sh
# Add another Next.js app
npx nx g @nx/next:app apps/dashboard

# Add a new shared library
npx nx g @nx/react:lib packages/utils --bundler=none

# Add a component to the UI lib
npx nx g @nx/react:component packages/ui/src/lib/button
```

## 🔗 Learn More

- [Nx Documentation](https://nx.dev/docs)
- [Crafting Your Workspace Tutorial](https://nx.dev/docs/getting-started/tutorials/crafting-your-workspace)
- [Module Boundaries](https://nx.dev/docs/features/enforce-module-boundaries)
- [Next.js Documentation](https://nextjs.org/docs)
- [Playwright Testing](https://nx.dev/docs/technologies/test-tools/playwright)
