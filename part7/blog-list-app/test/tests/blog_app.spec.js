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

    await request.post("/api/users", {
      data: {
        username: "congthanh99",
        name: "cong thanh",
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

      await page.locator("button").and(page.getByText("new blog")).click();
      await page.getByTestId("title").fill(`${newBlog.title}`);
      await page.getByTestId("author").fill(`${newBlog.author}`);
      await page.getByTestId("url").fill(`${newBlog.url}`);
      await page.getByTestId("create-button").click();

      await expect(
        page.getByText(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      ).toBeVisible();
    });

    test("a blog can be edited", async ({ page }) => {
      const viewButton = await page.getByText("view");
      const likeButton = await page.locator(".like-button");

      await viewButton.click();
      await likeButton.click();

      const likeTextElement = await page.getByTestId("like-text");
      const likeText = await likeTextElement.innerText();

      await expect(likeText).toBe(`likes 1`);
    });

    test("a blog can be deleted by user who created it", async ({ page }) => {
      page.on("dialog", async (dialog) => {
        await expect(dialog.type()).toContain("confirm");
        await expect(dialog.message()).toBe("Remove blog test by test");
        await dialog.accept();
      });

      await page.locator(".view-button").click();
      await page.locator(".remove-button").click();

      await page.waitForFunction(
        `document.querySelector('.notification').innerText === 'deleted test by test'`
      );
      const notification = await page.locator(`.notification`).innerText();
      await expect(notification).toBe(`deleted test by test`);
    });

    test("only user who created the blog can see its remove button", async ({
      page,
    }) => {
      await page.locator(".view-button").click();
      await expect(page.locator(".remove-button")).toBeVisible();

      await page.locator(".logout-button").click();
      await page.locator(".username").fill("congthanh99");
      await page.locator(".password").fill("truongcongT99");
      await page.locator(".login-button").click();

      await page.locator(".view-button").click();
      await expect(page.locator(".remove-button")).not.toBeVisible();
    });

    test("blogs are arranged in the descending order of blog's likes", async ({
      page,
    }) => {
      await page.getByText("new blog").click();
      await page.getByTestId("title").fill(`test title`);
      await page.getByTestId("author").fill(`test author`);
      await page.getByTestId("url").fill(`test url`);
      await page.getByTestId("create-button").click();

      await page.waitForFunction(
        "document.querySelectorAll('.blog').length===2"
      );

      const viewButtons = await page.locator(".view-button").all();
      await viewButtons[1].click();

      const likeButtons = await page.locator(".like-button").all();
      await likeButtons[1].click();

      await page.waitForFunction(() => {
        const firstBlogText = document.querySelector(".blog-summary").innerText;
        console.log(firstBlogText);

        return firstBlogText.includes("test title test author");
      });

      const blogs = await page.locator(".blog-summary").all();
      const firstBlogText = await blogs[0].innerText();
      await expect(firstBlogText).toContain("test title test author");
    });
  });
});
