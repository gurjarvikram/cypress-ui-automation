# cypress-ui-automation

Cypress + Cucumber (BDD) UI suite for the Swag Labs demo shop
(`https://www.saucedemo.com`). Node 20.14.0 (`.nvmrc`), CommonJS config,
ES modules inside `cypress/`.

## Layering — the rule that matters most

```
cypress/e2e/features/*.feature        Gherkin. Business language only.
  └─ support/step-definitions/*.js    Thin glue. Calls page objects.
       └─ support/pages/*.js          Behaviour. Singleton instances.
            └─ support/object-repository/*.objects.js   Selectors. Nothing else.
```

Each layer may only reach into the one directly below it.

- **Selectors live in `object-repository/` and nowhere else.** Never inline a
  selector in a page object, a step definition, or a feature file. Files are
  frozen (`Object.freeze`) and re-exported from `object-repository/index.js`;
  page objects import from the barrel (`import { loginObjects } from
  '../object-repository'`).
- Shared chrome (header, cart badge, item tiles) goes in `common.objects.js`
  and is spread into the page-specific files that need it.
- Page objects export a **singleton**: `export default new LoginPage()`. They
  hold behaviour and assertions (`shouldShowError`, `shouldBeLoaded`); they do
  not know about Gherkin.
- Step definitions stay thin — parse the argument, call the page object.

## Step definitions are globally scoped

`.cypress-cucumber-preprocessorrc.json` loads
`cypress/support/step-definitions/**/*.js` for **every** feature. A step
defined twice fails the run as ambiguous. Steps used by more than one feature
belong in `common.steps.js`; check there before adding a new one.

## Conventions

- Use the `cy.getByTestId('...')` custom command over raw CSS. `data-test` is
  an application contract; classes and DOM structure are not.
- Type credentials with `cy.type(value, { sensitive: true })` — the overwrite
  in `commands.js` masks the value in the command log and in Cypress Cloud.
- `Cypress.on('uncaught:exception')` in `e2e.js` **fails** the test by design.
  Only `ResizeObserver loop` noise is tolerated. If you add an exception,
  scope it narrowly and say why.
- Tags: `@smoke`, `@regression`, `@negative` drive execution; `@login`,
  `@products`, `@navigation` mark the area. Run with `--env tags=@smoke`.
- Demo credentials come from `cypress/fixtures/users.json`
  (`standard`, `lockedOut`, `problem`, `performanceGlitch`) via
  `loginPage.loginAsUser(role)`. These are the demo site's public logins —
  a real application would read them from the environment.

## Configuration

`baseUrl` is **never** a literal in `cypress.config.js`. It is resolved by
`config/resolve-environment.js`, precedence highest first:

1. `CYPRESS_BASE_URL` — one-off override
2. `config/environments.json` entry selected by `TEST_ENV`
3. the `production` default

An unknown `TEST_ENV` throws rather than falling back, so a run cannot
silently target the wrong site and still report green. The resolved
environment is written to `config.env.testEnvironment` and logged in the run
header.

## Two things not to "simplify"

- **`retries: { runMode: 2, openMode: 0 }`.** Retries in interactive mode hide
  real failures. A spec that is only green in CI is flaky, not passing.
- **`test:record` / `test:parallel` shell out through `node -r dotenv/config`.**
  The Cypress CLI reads `CYPRESS_RECORD_KEY` *before* it loads
  `cypress.config.js`, so the `dotenv` call inside the config is too late.
  Reverting these to a plain `cypress run --record` silently breaks recording.

## No `cy.session` for login

Swag Labs serves only `/`; every other route (`/inventory.html`, `/cart.html`)
is resolved client-side and 404s on a direct request. A restored session
therefore cannot be followed by a deep-link `cy.visit()`, so the form submit in
`LoginPage.loginAs()` is the only way to reach an authenticated page. This is
deliberate, not an oversight.

## Commands

```bash
npm run cy:open        # interactive
npm test               # full run; pretest wipes cypress/reports
npm run test:smoke     # also :regression, :negative
npm run test:headed    # --headed --no-exit, for watching a failure
```

Artefacts (screenshots, videos, cucumber JSON/HTML) all land under
`cypress/reports/`, which is git-ignored and uploaded as a CI artefact.

## CI

- `ci.yml` — smoke on chrome, then regression across chrome/firefox/electron
  (`fail-fast: false`). Runs on push/PR to `main`.
- `cypress-cloud.yml` — recorded 3-container parallel run on push to `main`
  and nightly at 02:00 UTC. Kept off the PR path: it burns Cloud credits and
  the secret is unavailable to fork PRs.

## House rules

- Ask before adding an npm dependency.
- Match the existing comment style: explain *why* a non-obvious choice was
  made, not what the line does.
