import { test, expect, Page } from "@playwright/test";

class OrangeHRMLoginPage {
  readonly page: Page;
  readonly usernameInput = 'input[name="username"]';
  readonly passwordInput = 'input[name="password"]';
  readonly loginButton = 'button[type="submit"]';
  readonly dashboardHeading = 'h6:has-text("Dashboard")';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/");
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async expectDashboard() {
    await expect(this.page.locator(this.dashboardHeading)).toBeVisible();
  }
}

test.describe("OrangeHRM login", () => {
  test("should login successfully with valid admin credentials", async ({
    page,
  }) => {
    const loginPage = new OrangeHRMLoginPage(page);

    await loginPage.goto();
    await loginPage.login("Admin", "admin123");
    await loginPage.expectDashboard();
  });
});
