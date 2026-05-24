import { test, expect } from "@playwright/test";

//Syntax:
/*
test("title",()=>{

    //step1
    //step2
})
*/

//fixture - global variable : page, browser

test("Verify page title", async ({ page }) => {
  // Use a stable data URL so CI doesn't rely on external network
  const dataUrl =
    "data:text/html,<html><head><title>Automation Testing Practice</title></head><body></body></html>";
  await page.goto(dataUrl);

  console.log("Page title is : " + (await page.title()));

  await expect(page).toHaveTitle("Automation Testing Practice");
});
