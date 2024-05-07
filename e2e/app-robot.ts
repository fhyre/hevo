import { Page } from '@playwright/test';
import { testUser } from './test-data';

export class AppRobot {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async clickLoginRoute() {
    await this.page.locator('span:has-text("Log In")').click();
  }

  async clickSignUpRoute() {
    await this.page.locator('span:has-text("Sign Up")').click();
  }

  async clickSubmit() {
    await this.page.locator('button[type="submit"]').click();
  }

  async clickSignOut() {
    await this.page.locator('button:has-text("Sign Out")').click();
  }

  async fillInvalidLoginForm() {
    (await this.page.$('input[name="email"]'))?.fill(testUser.invalidEmail);
    (await this.page.$('input[name="password"]'))?.fill(
      testUser.invalidPassword,
    );
  }

  async fillValidLoginForm() {
    (await this.page.$('input[name="email"]'))?.fill(testUser.email);
    (await this.page.$('input[name="password"]'))?.fill(testUser.password);
  }

  async fillInvalidSignUpForm() {
    (await this.page.$('input[name="email"]'))?.fill(testUser.invalidEmail);
    (await this.page.$('input[name="password"]'))?.fill(
      testUser.invalidPassword,
    );
    (await this.page.$('input[name="confirmPassword"]'))?.fill(
      testUser.invalidPassword + '1',
    );
  }

  async fillValidSignUpForm() {
    (await this.page.$('input[name="firstName"]'))?.fill(testUser.firstName);
    (await this.page.$('input[name="lastName"]'))?.fill(testUser.lastName);
    (await this.page.$('input[name="email"]'))?.fill(testUser.email);
    (await this.page.$('input[name="password"]'))?.fill(testUser.password);
    (await this.page.$('input[name="confirmPassword"]'))?.fill(
      testUser.password,
    );
  }
}
