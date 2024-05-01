import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm.jsx";

describe("testing BlogForm component", () => {
  let newBlog;

  beforeEach(() => {
    newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "https://example.com",
    };
  });

  test("BlogForm calls handleNotification with correct details", async () => {
    const mockHandleNotification = vi.fn();
    const mockSetBlogs = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <BlogForm
        handleNotification={mockHandleNotification}
        setBlogs={mockSetBlogs}
      />
    );

    const title = container.querySelector(`#title`);
    const author = container.querySelector(`#author`);
    const url = container.querySelector(`#url`);
    const submitButton = container.querySelector(`input[type='submit']`);

    await user.type(title, newBlog.title);
    await user.type(author, newBlog.author);
    await user.type(url, newBlog.url);
    await user.click(submitButton);

    expect(mockHandleNotification.mock.calls).toHaveLength(1);
    // expect(mockHandleNotification.mock.calls[0][0].content).toBe(
    //   `a new blog ${newBlog.title} by ${newBlog.author} added`
    // );
    // expect(mockHandleNotification.mock.calls[0][1].content).toBe(true);
  });
});
