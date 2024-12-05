import { test, expect, Page, APIRequestContext } from "@playwright/test";
import path from "path";
import fs from "fs"; // Ensure fs is imported correctly

const url = "http://localhost:3000/";
const authFile = path.join(__dirname, "./.auth/user.json");

const doDelete = async (request: APIRequestContext, url: string) => {
  const fileContent = fs.readFileSync(authFile, "utf-8");
  console.log("storage: ", fileContent);
  const storageState = JSON.parse(fileContent);

  // Extract the token from localStorage
  const token = storageState.origins[0]?.localStorage?.find(
    (item: { name: string }) => item.name === "token"
  )?.value;

  if (!token) {
    console.error("Token is invalid");
    return;
  }

  const deletion = await request.delete(`${url}account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(deletion.ok()).toBeTruthy();
};

const doLogin = async (page: Page, username: string, password: string) => {
  await page.goto(url + "login");
  await page.getByPlaceholder("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByTestId("signin-button").click();
  await page.waitForURL(url + "dashboard");
  await expect(page.getByText("Login Success!")).toBeVisible();
  await page.context().storageState({ path: authFile });
};

const doRegister = async (
  page: Page,
  username: string,
  password: string,
  email: string
) => {
  await page.goto(url + "register");
  await page.getByPlaceholder("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByLabel("Email").fill(email);
  await page.getByTestId("signup-button").click();
  await page.waitForURL(url + "dashboard");
  await expect(page.getByText("Login Success!")).toBeVisible();
  await page.context().storageState({ path: authFile });
};

test.describe("Unauthenticated", () => {
  test("should have header and title", async ({ page }) => {
    console.log("Page load start");
    await page.goto(url);
    console.log("Page loaded " + page.title);
    await expect(page).toHaveTitle("FinCat");
    await expect(page.getByText("Get Started")).toBeVisible();
  });

  test("should navigate to signup", async ({ page }) => {
    console.log("Page load start");
    await page.goto(url);
    console.log("Page loaded " + page.title);
    await page.getByText("Signup").click();
    await expect(page.getByText("Create your own account")).toBeVisible();
  });

  test("should navigate to login", async ({ page }) => {
    console.log("Page load start");
    await page.goto(url);
    console.log("Page loaded " + page.title);
    await page.getByText("Login").click();
    await expect(page.getByText("Sign in to your account")).toBeVisible();
  });
  test("register bad email", async ({ page }) => {
    await page.goto(url + "register");
    await page.getByPlaceholder("Email").fill("bademail");
    await page.getByPlaceholder("Username").fill("baduser");
    await page.getByLabel("Password").fill("badpassword");
    await page.getByTestId("signup-button").click();
    await expect(
      page.getByText("The Email field is not a valid e-mail address.")
    ).toBeVisible();
  });
  test("register bad password", async ({ page }) => {
    await page.goto(url + "register");
    await page.getByPlaceholder("Email").fill("bademail@email.com");
    await page.getByPlaceholder("Username").fill("baduser");
    await page.getByLabel("Password").fill("badpassword");
    await page.getByTestId("signup-button").click();
    await expect(
      page.getByText("Passwords must be at least 12 characters.")
    ).toBeVisible();
    await expect(
      page.getByText(
        "Passwords must have at least one non alphanumeric character"
      )
    ).toBeVisible();
    await expect(
      page.getByText("Passwords must have at least one digit ('0'-'9').")
    ).toBeVisible();
    await expect(
      page.getByText("Passwords must have at least one uppercase ('A'-'Z').")
    ).toBeVisible();
  });
});

test.describe("Register testuser and search TSLA", () => {
  const username = "testuser";
  const password = "Password1234!";
  const email = "testuser@test.com";

  test("Create new user search TSLA", async ({ page }) => {
    await doRegister(page, username, password, email);
    await page.getByPlaceholder("Search companies").fill("TSLA");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByTestId("search-symbol-TSLA-1")).toHaveText(
      "Tesla, Inc."
    );
    await page.getByTestId("addto-portfolio-TSLA").click();
    await expect(page.getByText("Add TSLA to a Portfolio")).toBeVisible();
    await page.getByText("Submit").click();
    await expect(
      page.getByText("Stock added to portfolio holdings!")
    ).toBeVisible();
    await page.getByText("Dashboard").click();
    await expect(page.getByTestId("tablerow-TSLA")).toBeVisible();
    await page.getByTestId("link-TSLA").click();
    await expect(page.getByText("company name")).toBeVisible();
  });

  test("New user login and removes TSLA", async ({ page }) => {
    await doLogin(page, username, password);
    await expect(page.getByTestId(`rowbutton-TSLA`)).toBeVisible();
    await page.getByTestId(`rowbutton-TSLA`).click();
    await expect(page.getByText("Remove")).toBeVisible();
    await page.getByText("Remove").click();
    await expect(page.getByTestId("link-TSLA")).not.toBeVisible();
  });
  test("New user login and adds AAPL, sets 100 units", async ({ page }) => {
    await doLogin(page, username, password);
    await page.getByPlaceholder("Search companies").fill("AAPL");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByTestId("addto-portfolio-AAPL")).toBeVisible();
    await page.getByTestId("addto-portfolio-AAPL").click();
    await expect(page.getByText("Add AAPL to a Portfolio")).toBeVisible();
    await page.getByText("Submit").click();
    await expect(
      page.getByText("Stock added to portfolio holdings!")
    ).toBeVisible();
    await page.getByText("Dashboard").click();
    await expect(page.getByTestId("link-AAPL")).toBeVisible();
    await page.getByTestId("rowbutton-AAPL").click();
    await expect(page.getByTestId("holding-units-AAPL")).toBeVisible();
    await page.getByTestId("holding-units-AAPL").fill("100");
    await page.getByText("Submit").click();
    await expect(page.getByTestId("Units-col-AAPL")).toBeVisible();
  });
});

test.describe("Remove test user", () => {
  const server = "http://localhost:5230/api/";

  test("API Call to Delete", async ({ request }) => {
    await doDelete(request, server);
  });
});
