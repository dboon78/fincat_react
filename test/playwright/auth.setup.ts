// import { test as setup, expect } from "@playwright/test";
// import path from "path";

// const authFile = path.join(__dirname, "./.auth/user.json");

// setup("authenticate", async ({ page }) => {
//   // Perform authentication steps. Replace these actions with your own.
//   await page.goto("http://localhost:3000/login");
//   await page.getByPlaceholder("Username").fill("investorman");
//   await page.getByLabel("Password").fill("Password1234!");
//   await page.getByTestId("signin-button").click();
//   // Wait until the page receives the cookies.
//   //
//   // Sometimes login flow sets cookies in the process of several redirects.
//   // Wait for the final URL to ensure that the cookies are actually set.
//   await page.waitForURL("http://localhost:3000/search");
//   // Alternatively, you can wait until the page reaches a state where all cookies are set.
//   await expect(page.getByText("Login Success!")).toBeVisible();
//   // End of authentication steps.

//   await page.context().storageState({ path: authFile });
// });
