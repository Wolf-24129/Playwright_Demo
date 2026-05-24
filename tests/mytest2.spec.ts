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
  await page.goto("https://testautomationpractice.blogspot.com//");

  //   let title: string = await page.title();
  //   console.log("Page title is : " + title);
  let url: string = await page.url();
  console.log("URL", url);

  //   await expect(page).toHaveTitle("Automation Testing Practice");
  await expect(page).toHaveURL(/testautomationpractice/);
});
