const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.locator('text="Войти"').click();
  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId("login-submit-btn").click();

  const captcha = page
    .frameLocator('[data-testid="advanced-iframe"]')
    .getByRole("dialog");

  await expect(captcha).toBeVisible({ timeout: 15000 });

});

test("Authorization failed", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).fill("fihigoahigi@idjsfi");
  await page.getByTestId("login-submit-btn").click();

  await expect(page.locator("form")).toContainText("Неверный email");
});
