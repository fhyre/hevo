import { test, expect } from '@playwright/test';
import { AppRobot } from './app-robot';
import { AuthStatus, ValidationError } from '@/utils';
import { testUser } from './test-data';
import { deleteUser } from '@/lib';

const baseURL = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  // always go to the base url before each test
  await page.goto(baseURL);
});

test.afterAll(async () => {
  // delete the test user
  await deleteUser(testUser.email);
});

test('when no user is logged in should redirect to login', async ({ page }) => {
  // page should be on the login page
  await expect(page).toHaveURL(/login/);

  // expect the first button on the page to have the text "Login"
  await expect(page.locator('button').first()).toContainText('Login');
});

test('clicking sign up should redirect to sign up and vice versa', async ({
  page,
}) => {
  const robot = new AppRobot(page);
  // page should be on the login page
  await expect(page).toHaveURL(/login/);

  // click signup
  await robot.clickSignUpRoute();

  // page should now be on the url page
  await expect(page).toHaveURL(/sign-up/);

  // click Login text on
  await robot.clickLoginRoute();

  // page should now be on the login page
  await expect(page).toHaveURL(/login/);
});

test('trying to login with invalid credentials should give back errors', async ({
  page,
}) => {
  const robot = new AppRobot(page);

  // click login button
  await robot.clickSubmit();

  // should see 2 error messages regarding required fields
  await expect(
    page.locator(`p:has-text("${ValidationError.REQUIRED}")`),
  ).toHaveCount(2);

  // fill out an invalid login form
  await robot.fillInvalidLoginForm();

  // click login again
  await robot.clickSubmit();

  // expect to see one invalid email error
  await expect(
    page.locator(`p:has-text("${ValidationError.INVALID_EMAIL}")`),
  ).toHaveCount(1);

  // expect to see one invalid password error
  await expect(
    page.locator(`p:has-text("${ValidationError.PASSWORD_MIN_LENGTH}")`),
  ).toHaveCount(1);

  // fill a valid login form
  await robot.fillValidLoginForm();

  // click login again
  await robot.clickSubmit();

  // expect to receive invalid credentials since user has not been created yet
  await expect(
    page
      .locator(`div:has-text("${AuthStatus.EMAIL_PASSWORD_INCORRECT}")`)
      .first(),
  ).toBeVisible();
});

test('signing up with invalid credentials should give back errors', async ({
  page,
}) => {
  const robot = new AppRobot(page);

  // goto sign up page
  await page.goto(baseURL + '/sign-up');

  // click the sign up button
  await robot.clickSubmit();

  // expect to see 5 error messages regarding required fields
  await expect(
    page.locator(`p:has-text("${ValidationError.REQUIRED}")`),
  ).toHaveCount(5);

  // fill out an invalid sign up form
  await robot.fillInvalidSignUpForm();

  // click sign up again
  await robot.clickSubmit();

  // only see 2 required errors since firstName and lastName are left empty
  await expect(
    page.locator(`p:has-text("${ValidationError.REQUIRED}")`),
  ).toHaveCount(2);

  // only see 1 invalid email error
  await expect(
    page.locator(`p:has-text("${ValidationError.INVALID_EMAIL}")`),
  ).toHaveCount(1);

  // only see 1 invalid password error
  await expect(
    page.locator(`p:has-text("${ValidationError.PASSWORD_MIN_LENGTH}")`),
  ).toHaveCount(1);

  // only see 1 password mismatch error
  await expect(
    page.locator(`p:has-text("${ValidationError.PASSWORD_MISMATCH}")`),
  ).toHaveCount(1);
});

test('after signing up, user should be redirected to a page where they can see their user information', async ({
  page,
}) => {
  const robot = new AppRobot(page);

  // goto sign up page
  await page.goto(baseURL + '/sign-up');

  // fill out valid sign up form
  await robot.fillValidSignUpForm();

  // click submit
  await robot.clickSubmit();

  // should be able to see user's full name
  await expect(
    page.locator(`h1:has-text("${testUser.firstName} ${testUser.lastName}")`),
  ).toHaveCount(1);

  // should be able to see the user's email
  await expect(page.locator(`h2:has-text("${testUser.email}")`)).toHaveCount(1);
});

test('signing up with the same email should give back an error', async ({
  page,
}) => {
  const robot = new AppRobot(page);

  // goto sign up page
  await page.goto(baseURL + '/sign-up');

  // fill out valid sign up form
  await robot.fillValidSignUpForm();

  // click signup
  await robot.clickSubmit();

  // should see an error for email already in use
  await expect(
    page.locator(`div:has-text("${AuthStatus.EMAIL_EXISTS}")`).first(),
  ).toBeVisible();
});

test('user can log in and then log back out', async ({ page }) => {
  const robot = new AppRobot(page);

  // fill out correct login info
  await robot.fillValidLoginForm();

  // click login
  await robot.clickSubmit();

  // sign back out
  await robot.clickSignOut();

  // should be back on the login page
  await expect(page).toHaveURL(/login/);
});
