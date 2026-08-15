import { commonObjects } from './common.objects';

/** Objects for the login page (`/`). */
export const loginObjects = Object.freeze({
  username: '[data-test="username"]',
  password: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  error: commonObjects.error,
});

export default loginObjects;
