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
  await page.goto("https://testautomationpractice.blogspot.com//");

  // let title: string = await page.title();
  console.log("Page title is : " + (await page.title()));

  await expect(page).toHaveTitle("Automation Testing Practice");
});
