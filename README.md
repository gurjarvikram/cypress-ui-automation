# Cypress UI Automation Framework

[![CI](https://github.com/gurjarvikram/cypress-ui-automation/actions/workflows/ci.yml/badge.svg)](https://github.com/gurjarvikram/cypress-ui-automation/actions/workflows/ci.yml)
[![Cypress](https://img.shields.io/badge/Cypress-15-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)](https://cucumber.io/)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

End-to-end UI automation for the [Swag Labs](https://www.saucedemo.com) demo shop, built with
**Cypress**, **Cucumber (Gherkin BDD)**, an **Object Repository** and the **Page Object Model**.
Scenarios are tag-driven, run across Chrome, Firefox and Electron in GitHub Actions, and publish
an HTML report plus screenshots and video for every failure.

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
| Maintainability | Object Repository + Page Object Model — a selector is defined exactly once |
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
| [dotenv](https://github.com/motdotla/dotenv) | Loads local `.env` values, keeping secrets out of the repo |
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

Cypress 15 drives browsers over WebDriver BiDi, which sets a floor on local browser versions:

| Browser | Minimum | Notes |
| --- | --- | --- |
| Electron | — | Bundled with Cypress; always works, used by `npm test` |
| Chrome / Edge | Current stable | |
| Firefox | **140**, and **not the snap build** | See [Troubleshooting](#troubleshooting) |

Only Electron is required — the browser-specific scripts are optional locally, and CI runs the
full matrix regardless.

<details>
<summary>Installing a Cypress-compatible Firefox on Linux without root</summary>

Ubuntu ships Firefox as a snap, which Cypress cannot drive. Install the official build into your
home directory and put it first on `PATH`:

```bash
mkdir -p ~/.local/opt
curl -L -o /tmp/firefox.tar.xz \
  "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=en-US"
tar -xJf /tmp/firefox.tar.xz -C ~/.local/opt

# Make it the firefox Cypress finds. ~/.local/bin is usually already on PATH
# ahead of /usr/bin, so this needs no shell-profile edit and no root.
mkdir -p ~/.local/bin
ln -sfn ~/.local/opt/firefox/firefox ~/.local/bin/firefox

firefox --version        # expect 140 or newer
npm run test:firefox
```

Check the ordering first with `echo $PATH | tr ':' '\n' | grep -n -E '\.local/bin|/usr/bin'`. If
`~/.local/bin` comes later, fall back to `export PATH="$HOME/.local/opt/firefox:$PATH"` in your
shell profile.

Or skip `PATH` entirely and point Cypress at the binary for one run:

```bash
npx cypress run --browser ~/.local/opt/firefox/firefox
```

</details>

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
| `npm run test:edge` | Full suite in Edge |
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
│       ├── object-repository/            # Element locators — one file per page
│       │   ├── common.objects.js         # Header, title, cart icon, item tile
│       │   ├── login.objects.js
│       │   ├── inventory.objects.js
│       │   ├── cart.objects.js
│       │   ├── checkout.objects.js
│       │   ├── navigation.objects.js
│       │   └── index.js                  # Barrel — page objects import from here
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
├── config/
│   ├── environments.json                 # baseUrl per environment — no URL in code
│   └── resolve-environment.js            # Picks the environment, fails loudly if unknown
├── .cypress-cucumber-preprocessorrc.json # Step lookup, tag filtering, reporters
├── cypress.config.js                     # Runner configuration
├── .env.example                          # Documented environment variables (copy to .env)
└── .nvmrc                                # Node version used locally and in CI
```

**Layering rule** — four layers, each with one job:

| Layer | Knows about | Never contains |
| --- | --- | --- |
| `e2e/features/` | Business behaviour, in Gherkin | Selectors, code |
| `support/step-definitions/` | Translating a sentence into a page-object call | Selectors, assertions |
| `support/pages/` | How to act on and assert a page | Raw selector strings |
| `support/object-repository/` | Selector strings, and nothing else | Behaviour, assertions |

A selector string appears in exactly one file. When the UI changes, the fix is a one-line edit in
the object repository, and nothing else in the suite moves.

---

## Configuration

No environment value is hard-coded. Copy `.env.example` to `.env` for local overrides — `.env` is
git-ignored and is never read in CI, where GitHub Actions injects the same names from repository
secrets.

| Variable | Default | Purpose |
| --- | --- | --- |
| `TEST_ENV` | `production` | Which entry of `config/environments.json` to run against |
| `CYPRESS_BASE_URL` | _(unset)_ | One-off URL override; wins over the environments file |
| `CYPRESS_RECORD_KEY` | _(unset)_ | Cypress Cloud record key, required only for recorded runs |
| `CYPRESS_PROJECT_ID` | `zyzyfz` | Cypress Cloud project id; override to record into a different project |

### Target environment

The application URL is **not** hard-coded in `cypress.config.js`. It lives in
[`config/environments.json`](config/environments.json):

```json
{
  "production": { "baseUrl": "https://www.saucedemo.com" }
}
```

Add an environment by adding an entry, then select it with `TEST_ENV`:

```json
{
  "production": { "baseUrl": "https://www.saucedemo.com" },
  "staging":    { "baseUrl": "https://staging.example.com" }
}
```

```bash
TEST_ENV=staging npm test                                # named environment
CYPRESS_BASE_URL=https://pr-42.review.example.com npm test  # ad-hoc override
```

Resolution order is `CYPRESS_BASE_URL` → the `TEST_ENV` entry → `production`. An unrecognised
`TEST_ENV` **fails immediately** rather than falling back, because a silent fallback would run the
whole suite against the wrong site and still report green. Every run prints its target in the
header (`Running against "production": https://www.saucedemo.com`) and records it in Cypress Cloud
as `testEnvironment`.

### How the record key reaches Cypress

Two different mechanisms, because the two variables are read at different moments:

- **`CYPRESS_BASE_URL`** — `cypress.config.js` calls `dotenv` at the top of the file and reads
  `process.env.CYPRESS_BASE_URL` when building the config.
- **`CYPRESS_RECORD_KEY`** — the Cypress CLI resolves the record key *before* it loads
  `cypress.config.js`, so calling `dotenv` inside the config is too late and the run fails with
  *"You passed the --record flag but did not provide us your Record Key"*. The `test:record` and
  `test:parallel` scripts therefore preload `dotenv` into the CLI process itself:

  ```jsonc
  "test:record": "node -r dotenv/config ./node_modules/cypress/bin/cypress run --record"
  ```

Either way the key stays out of the repository. If you prefer not to keep a `.env` file, export it
for the shell instead — the scripts work unchanged:

```bash
export CYPRESS_RECORD_KEY=<your-key>
npm run test:record
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

2. **Register the selector** in the object repository, in the file for that page
   (`cypress/support/object-repository/inventory.objects.js`):

   ```js
   export const inventoryObjects = Object.freeze({
     sortContainer: '[data-test="product-sort-container"]',
     activeSortOption: '[data-test="active-option"]',

     // Parameterised entries are plain functions.
     addToCart: (product) => `[data-test="add-to-cart-${product}"]`,
   });
   ```

3. **Add the page interaction** to the matching class in `cypress/support/pages/`, importing the
   objects rather than writing a selector inline:

   ```js
   import { inventoryObjects } from '../object-repository';

   selectSortOption(option) {
     cy.get(inventoryObjects.sortContainer).select(option);
     cy.get(inventoryObjects.activeSortOption).should('have.text', option);
   }
   ```

4. **Wire the step** in `cypress/support/step-definitions/`:

   ```js
   When('the user sorts products by {string}', (option) => {
     inventoryPage.selectSortOption(option);
   });
   ```

5. **Prove the test can fail.** Break the expectation on purpose, confirm a red run, then restore
   it. An assertion that has never failed has never been verified.

---

## Conventions

- **Selectors** — every selector belongs in `cypress/support/object-repository/`, never inline in a
  page object, step definition or feature. Prefer `[data-test="…"]`, which the application owns;
  never select on CSS classes or copy text, which exist for styling and change without notice. The
  few unavoidable exceptions (the third-party burger menu) are commented as such in
  `navigation.objects.js`.
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
| Browser not found | Chrome, Edge and Firefox must be installed locally. Electron always works: `npm run test:electron`. |
| `Cypress does not support running Firefox version <140>` | Cypress 15 needs Firefox 140+ for WebDriver BiDi. Check which binary is first on `PATH` — `readlink -f $(which firefox)` — as an old build in `/opt` or `/usr/local` often shadows a newer one. |
| Firefox: `The browser never connected` | The snap-packaged Firefox cannot be driven by Cypress at any version; snap confinement blocks access to the profile directory Cypress creates. Use a `.deb` or the [official tarball](https://www.mozilla.org/firefox/all/) instead — see the recipe under [Prerequisites](#prerequisites). |
| `allowCypressEnv` warning on every run | Expected. The Cucumber preprocessor reads tags through `Cypress.env()`, so `allowCypressEnv` must stay enabled; setting it to `false` breaks tag filtering. Harmless until the preprocessor migrates to `cy.env()`. |
| Recorded run rejected | `CYPRESS_RECORD_KEY` is unset or was rotated. Export it, or update the GitHub Actions secret. |
| `Unknown TEST_ENV "…"` | The name is not in `config/environments.json`. Add it there, or use `CYPRESS_BASE_URL` for a one-off. |
| Suite passes but proves nothing | Mutate the expectation and confirm it fails. See step 5 of [Writing a new test](#writing-a-new-test). |

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
