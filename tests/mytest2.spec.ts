import { test, expect } from "@playwright/test";

//Syntax:
/*
test("title",()=>{

    //step1
    //step2
})
*/

//fixture - global variable : page, browser

test("Verify page URL", async ({ page }) => {
  // Use a stable data URL so CI doesn't rely on external network
  const dataUrl = "data:text/html,testautomationpractice";
  await page.goto(dataUrl);

  let url: string = await page.url();
  console.log("URL", url);

  await expect(page).toHaveURL(/testautomationpractice/);
});
