const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: "congthanh1999",
        name: "truong cong thanh",
        password: "truongcongT99",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Login to application")).toBeVisible();
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      const usernameLocator = await page.getByTestId("username");
      const passwordLocator = await page.getByTestId("password");
      const submitLocator = await page.getByTestId("submit-button");

      await usernameLocator.fill("congthanh1999");
      await passwordLocator.fill("truongcongT99");
      await submitLocator.click();

      await expect(page.getByText("blogs")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      const usernameLocator = await page.getByTestId("username");
      const passwordLocator = await page.getByTestId("password");
      const submitLocator = await page.getByTestId("submit-button");

      await usernameLocator.fill("congthanh1999");
      await passwordLocator.fill("wrong");
      await submitLocator.click();

      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      const usernameLocator = await page.getByTestId("username");
      const passwordLocator = await page.getByTestId("password");
      const submitLocator = await page.getByTestId("submit-button");

      await usernameLocator.fill("congthanh1999");
      await passwordLocator.fill("truongcongT99");
      await submitLocator.click();

      const initialBlog = {
        title: "test",
        author: "test",
        url: "http://testing-url.com",
      };

      await page.getByText("new blog").click();
      await page.getByTestId("title").fill(`${initialBlog.title}`);
      await page.getByTestId("author").fill(`${initialBlog.author}`);
      await page.getByTestId("url").fill(`${initialBlog.url}`);
      await page.getByTestId("create-button").click();
    });

    test("a new blog can be created", async ({ page }) => {
      const newBlog = {
        title: "testing blog",
        author: "testing author",
        url: "http://testing-url.com",
      };

      await page.getByText("new blog").click();
      await page.getByTestId("title").fill(`${newBlog.title}`);
      await page.getByTestId("author").fill(`${newBlog.author}`);
      await page.getByTestId("url").fill(`${newBlog.url}`);
      await page.getByTestId("create-button").click();

      await expect(
        page.getByText(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      ).toBeVisible();
    });

    test("a blog can be edited", async ({ page }) => {
      await page.getByText("view").click();
      await page.getByTestId("like-button").click();

      const likeTextElement = await page.getByTestId("like-text");
      const likeText = await likeTextElement.innerText();

      await expect(likeText).toBe(`likes 1`);
    });
  });
});
