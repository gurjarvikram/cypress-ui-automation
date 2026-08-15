# Cypress UI Automation Framework

[![CI](https://github.com/gurjarvikram/cypress-ui-automation/actions/workflows/ci.yml/badge.svg)](https://github.com/gurjarvikram/cypress-ui-automation/actions/workflows/ci.yml)
[![Cypress](https://img.shields.io/badge/Cypress-15-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)](https://cucumber.io/)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

End-to-end UI automation for the [Swag Labs](https://www.saucedemo.com) demo shop, built with
**Cypress**, **Cucumber (Gherkin BDD)** and the **Page Object Model**. Scenarios are tag-driven,
run across Chrome, Firefox and Electron in GitHub Actions, and publish an HTML report plus
screenshots and video for every failure.

---

## Table of contents

- [Why this framework](#why-this-framework)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Running tests](#running-tests)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Reports and artefacts](#reports-and-artefacts)
- [Continuous integration](#continuous-integration)
- [Writing a new test](#writing-a-new-test)
- [Conventions](#conventions)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Why this framework

| Concern | Approach |
| --- | --- |
| Readability | Business-readable Gherkin scenarios, one feature per user-facing area |
| Maintainability | Page Object Model — selectors live in exactly one place per page |
| Stability | `data-test` attribute selectors, no fixed waits, automatic retries in CI |
| Speed | Tag-driven subsets (`@smoke` runs in seconds) and 3-way parallel cloud runs |
| Diagnosability | Cucumber HTML report, screenshot on failure, video of every spec |

---

## Tech stack

| Tool | Purpose |
| --- | --- |
| [Cypress](https://www.cypress.io/) 15 | Test runner and browser automation |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) 26 | Gherkin support, tag filtering, JSON/HTML reporting |
| [esbuild](https://esbuild.github.io/) | Bundles step definitions ahead of each spec |
| [@faker-js/faker](https://fakerjs.dev/) 10 | Generates checkout customer data per scenario |
| [Cypress Cloud](https://www.cypress.io/cloud) | Recorded, load-balanced parallel runs |
| [GitHub Actions](https://docs.github.com/actions) | CI across three browsers |

---

## Prerequisites

| Requirement | Version |
| --- | --- |
| [Node.js](https://nodejs.org/) | `>= 20` (see [`.nvmrc`](.nvmrc)) |
| npm | `>= 10` (ships with Node 20) |
| OS | Linux, macOS or Windows — plus the Cypress [system dependencies](https://docs.cypress.io/app/get-started/install-cypress#System-requirements) |

```bash
nvm use          # picks up .nvmrc
node --version   # v20.x
```

---

## Getting started

```bash
git clone https://github.com/gurjarvikram/cypress-ui-automation.git
cd cypress-ui-automation

npm ci                    # install exactly what package-lock.json pins
cp .env.example .env      # optional: only needed to override defaults

npm run cy:open           # interactive runner
npm test                  # full suite, headless
```

> Use `npm ci` rather than `npm install`. It installs the locked dependency tree, so a run on
> your machine matches a run in CI.

---

## Running tests

| Command | What it runs |
| --- | --- |
| `npm test` | Full suite, headless, default browser |
| `npm run cy:open` | Interactive Cypress runner (Test Runner UI) |
| `npm run test:smoke` | Only `@smoke` scenarios — the fast confidence check |
| `npm run test:regression` | Only `@regression` scenarios |
| `npm run test:negative` | Only `@negative` scenarios |
| `npm run test:chrome` | Full suite in Chrome |
| `npm run test:firefox` | Full suite in Firefox |
| `npm run test:electron` | Full suite in the bundled Electron browser |
| `npm run test:headed` | Headed run, browser stays open afterwards |
| `npm run test:record` | Records the run to Cypress Cloud |
| `npm run test:parallel` | Recorded run, load-balanced across parallel CI containers |
| `npm run clean` | Deletes `cypress/reports/` |

### Targeting specific scenarios

```bash
# One feature file
npx cypress run --spec "cypress/e2e/features/login.feature"

# Several feature files
npx cypress run --spec "cypress/e2e/features/{login,product}.feature"

# Tag expressions — and / or / not are all supported
npx cypress run --env tags="@smoke and not @negative"
npx cypress run --env tags="@login or @navigation"
```

### Available tags

| Tag | Meaning |
| --- | --- |
| `@smoke` | Critical path — must pass before anything else runs |
| `@regression` | Full functional coverage (applied at feature level) |
| `@negative` | Validation and error-handling scenarios |
| `@login`, `@products`, `@navigation` | Functional area |

---

## Project structure

```
cypress-ui-automation/
├── .github/workflows/
│   ├── ci.yml                            # Smoke, then regression on 3 browsers
│   └── cypress-cloud.yml                 # Recorded 3-container parallel run
├── cypress/
│   ├── e2e/features/                     # Gherkin specs — the executable requirements
│   │   ├── login.feature
│   │   ├── navigation-bar.feature
│   │   └── product.feature
│   ├── fixtures/
│   │   └── users.json                    # Test data, keyed by user role
│   └── support/
│       ├── pages/                        # Page Object Model — one class per page
│       │   ├── LoginPage.js
│       │   ├── InventoryPage.js
│       │   ├── CartPage.js
│       │   ├── CheckoutPage.js
│       │   └── NavigationMenu.js
│       ├── step-definitions/             # Gherkin → page object glue
│       │   ├── common.steps.js           # Steps shared by more than one feature
│       │   ├── login.steps.js
│       │   ├── navigation-bar.steps.js
│       │   └── product.steps.js
│       ├── commands.js                   # Custom commands and overrides
│       └── e2e.js                        # Loaded before every spec
├── .cypress-cucumber-preprocessorrc.json # Step lookup, tag filtering, reporters
├── cypress.config.js                     # Runner configuration
├── .env.example                          # Documented environment variables
└── .nvmrc                                # Node version used locally and in CI
```

**Layering rule:** a feature file describes behaviour, a step definition translates it, and a page
object knows the DOM. Selectors appear only in page objects; assertions about the page live in page
objects too, so step definitions stay one line long.

---

## Configuration

Cypress picks up any `CYPRESS_*` environment variable automatically, so nothing needs to be
hard-coded. Copy `.env.example` to `.env` for local overrides — `.env` is git-ignored.

| Variable | Default | Purpose |
| --- | --- | --- |
| `CYPRESS_BASE_URL` | `https://www.saucedemo.com` | Application under test |
| `CYPRESS_RECORD_KEY` | _(unset)_ | Cypress Cloud record key, required only for recorded runs |

```bash
# Point the suite at another environment for one run
CYPRESS_BASE_URL=https://staging.example.com npm test
```

Runner defaults are set in [`cypress.config.js`](cypress.config.js):

| Setting | Value | Rationale |
| --- | --- | --- |
| `retries` | `2` in run mode, `0` in open mode | Absorbs CI flake without hiding failures while you debug |
| `defaultCommandTimeout` | `10000` | Tolerates the demo site's slower responses |
| `video` / `screenshotOnRunFailure` | enabled | Every CI failure is reproducible from artefacts |
| `viewport` | `1440x900` | Desktop layout, consistent across machines |

> **Never commit a record key.** It belongs in the `CYPRESS_RECORD_KEY` environment variable
> locally and in a GitHub Actions secret in CI. A key committed to a public repository must be
> rotated in Cypress Cloud, because rewriting git history does not invalidate it.

---

## Reports and artefacts

Every run writes to `cypress/reports/` (git-ignored, cleared by `npm run clean`):

| Path | Contents |
| --- | --- |
| `cypress/reports/cucumber/index.html` | Cucumber HTML report — open it in a browser |
| `cypress/reports/cucumber/cucumber-report.json` | Machine-readable results for downstream tooling |
| `cypress/reports/screenshots/` | Screenshot captured at the moment of each failure |
| `cypress/reports/videos/` | Video of every spec |

```bash
npm test
open cypress/reports/cucumber/index.html      # macOS
xdg-open cypress/reports/cucumber/index.html  # Linux
```

In CI these are uploaded as workflow artefacts and kept for 7 days.

---

## Continuous integration

Two workflows, each with a distinct job:

### [`ci.yml`](.github/workflows/ci.yml) — every push to `main` and every pull request

1. **Smoke** — `@smoke` scenarios in Chrome. Fails fast on a broken critical path.
2. **Regression** — runs only if smoke passes, as a matrix across **Chrome, Firefox and Electron**.

Dependencies are installed with `npm ci` and cached between runs. Screenshots, video and the
Cucumber report are uploaded on failure. In-flight runs are cancelled when a newer commit lands on
the same branch. No secrets are required, so the workflow also passes on pull requests from forks.

### [`cypress-cloud.yml`](.github/workflows/cypress-cloud.yml) — pushes to `main`, nightly at 02:00 UTC, or on demand

Records a load-balanced run to Cypress Cloud across **three parallel containers**. Kept off the
pull-request path because recorded runs consume Cloud credits and forked PRs cannot read secrets.

**Required repository secret:** `CYPRESS_RECORD_KEY`
(Settings → Secrets and variables → Actions). The workflow fails with an explicit message if it is
missing, rather than erroring deep inside the Cypress run.

---

## Writing a new test

1. **Describe the behaviour** in a `.feature` file under `cypress/e2e/features/`, and tag it:

   ```gherkin
   @products @regression
   Feature: Product catalogue

     Background:
       Given the standard user is signed in and on the product listing

     @smoke
     Scenario: Sorting products from A to Z
       When the user sorts products by "Name (A to Z)"
       Then the products should be listed in ascending order by name
   ```

2. **Add the page interaction** to the relevant class in `cypress/support/pages/`, registering the
   selector in that class's `selectors` map:

   ```js
   selectSortOption(option) {
     cy.get(this.selectors.sortContainer).select(option);
     cy.get(this.selectors.activeSortOption).should('have.text', option);
   }
   ```

3. **Wire the step** in `cypress/support/step-definitions/`:

   ```js
   When('the user sorts products by {string}', (option) => {
     inventoryPage.selectSortOption(option);
   });
   ```

4. **Prove the test can fail.** Break the expectation on purpose, confirm a red run, then restore
   it. An assertion that has never failed has never been verified.

---

## Conventions

- **Selectors** — prefer `[data-test="…"]`, which the application owns. Never select on CSS classes
  or text that exists for styling or copy reasons. `cy.getByTestId('login-button')` is available as
  a shorthand.
- **Waiting** — never `cy.wait(<number>)`. Cypress retries assertions; assert on the state you are
  waiting for instead.
- **Step uniqueness** — every step definition file is loaded for every feature, so step text must be
  globally unique. Shared steps belong in `common.steps.js`; a duplicate fails the run immediately,
  which is the intended safety net.
- **Assertions** — derive the expected value from the data, not from the DOM you are checking.
  Comparing a page's rendering against itself always passes.
- **Test data** — generate per-scenario data with faker inside a `Before` hook. Module-level data is
  created once per run and leaks between scenarios.
- **Credentials** — these are the demo site's public credentials. Real credentials belong in
  environment variables, and `cy.type(value, { sensitive: true })` masks them in logs and in
  Cypress Cloud.

---

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| `Multiple matching step definitions` | The same step text is defined twice. Move it to `common.steps.js` and delete the copies. |
| `Step implementation missing` | Step text in the feature does not match any definition. Check the wording, including `{string}` and `{int}` placeholders. |
| `cy.visit()` failed … `404: Not Found` | Swag Labs serves only `/`; routes such as `/inventory.html` are client-side. Navigate through the UI rather than deep-linking. |
| Cypress binary missing or corrupt | `npx cypress install --force`, then `npx cypress verify`. |
| Browser not found in the matrix | Chrome and Firefox must be installed locally. Electron ships with Cypress: `npm run test:electron`. |
| Recorded run rejected | `CYPRESS_RECORD_KEY` is unset or was rotated. Export it, or update the GitHub Actions secret. |
| Suite passes but proves nothing | Mutate the expectation and confirm it fails. See step 4 of [Writing a new test](#writing-a-new-test). |

---

## Contributing

1. Branch from `main` (`feat/…`, `fix/…`, `refactor/…`).
2. Keep the layering rule: feature → step definition → page object.
3. Run `npm test` locally and confirm the suite is green.
4. Verify each new assertion by making it fail on purpose at least once.
5. Open a pull request — `ci.yml` must pass on all three browsers before merge.

---

## License

Released under the [MIT License](LICENSE).

Swag Labs is a demo application provided by [Sauce Labs](https://saucelabs.com/) and is used here
purely as a test target.
