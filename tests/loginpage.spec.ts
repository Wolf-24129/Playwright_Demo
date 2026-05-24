import { test, expect, Page } from "@playwright/test";

test.use({
  navigationTimeout: 90000,
  actionTimeout: 60000,
});

class OrangeHRMLoginPage {
  // Increase per-test timeout since this depends on external network/site availability.
  static readonly TEST_TIMEOUT_MS = 120000;
  readonly page: Page;
  readonly usernameInput = 'input[name="username"]';
  readonly passwordInput = 'input[name="password"]';
  readonly loginButton = 'button[type="submit"]';
  readonly dashboardHeading = 'h6:has-text("Dashboard")';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/", {
      waitUntil: "load",
      timeout: 90000,
    });

    // If the page is still loading resources after DOMContentLoaded, allow more time.
    await this.page
      .waitForLoadState("load", { timeout: 60000 })
      .catch(() => undefined);

    // Some runs of this site can be slow/flaky right after DOMContentLoaded.
    // Wait until the network is quiet OR fall back to full load.
    await Promise.race([
      this.page
        .waitForLoadState("networkidle", { timeout: 30000 })
        .catch(() => undefined),
      this.page.waitForLoadState("load", { timeout: 30000 }),
    ]);

    await this.page.waitForSelector(this.usernameInput, {
      state: "visible",
      timeout: 90000,
    });
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);

    await expect(this.page.locator(this.dashboardHeading)).toBeVisible({
      timeout: 90000,
    });
  }

  async expectDashboard() {
    await expect(this.page.locator(this.dashboardHeading)).toBeVisible({
      timeout: 60000,
    });
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
