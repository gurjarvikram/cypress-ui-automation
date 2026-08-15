const environments = require('./environments.json');

const DEFAULT_ENVIRONMENT = 'production';

/**
 * Resolves which environment the suite runs against.
 *
 * Precedence, highest first:
 *   1. CYPRESS_BASE_URL  — one-off override, no config change needed
 *   2. config/environments.json entry selected by TEST_ENV
 *   3. the DEFAULT_ENVIRONMENT entry
 *
 * Failing loudly on an unknown TEST_ENV matters: a silent fall back to the
 * default would run the whole suite against the wrong site and still report
 * green.
 */
function resolveEnvironment() {
  const name = process.env.TEST_ENV || DEFAULT_ENVIRONMENT;
  const environment = environments[name];

  if (!environment) {
    const known = Object.keys(environments).join(', ');
    throw new Error(
      `Unknown TEST_ENV "${name}". Known environments: ${known}. ` +
        'Add it to config/environments.json or set CYPRESS_BASE_URL directly.',
    );
  }

  const baseUrl = process.env.CYPRESS_BASE_URL || environment.baseUrl;

  if (!baseUrl) {
    throw new Error(
      `Environment "${name}" in config/environments.json has no baseUrl.`,
    );
  }

  return { name, baseUrl };
}

module.exports = { resolveEnvironment, DEFAULT_ENVIRONMENT };
