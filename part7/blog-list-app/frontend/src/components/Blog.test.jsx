import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import blogService from "../services/blogs.js";
import userEvent from "@testing-library/user-event";

describe("testing blog component", () => {
  let blog;

  beforeEach(() => {
    blog = {
      title: "Component testing is done with react-testing-library",
      author: "cong thanh",
      url: "fokwjfw",
      likes: 5,
      user: {
        id: "123fiwfj",
        username: "congthanh",
      },
    };
  });

  test("renders content", () => {
    const { container } = render(<Blog blog={blog} />);

    const blogComponent = container.querySelector(".blog");
    const blogDetailsComponent = container.querySelector(".blog-details");

    expect(blogComponent).toHaveTextContent(`${blog.title} ${blog.author}`);
    expect(blogComponent).not.toHaveTextContent(blogDetailsComponent);
  });

  test("renders content after clicking button", async () => {
    const { container } = render(<Blog blog={blog} />);

    const viewButtonElement = container.querySelector(".view-button");
    await userEvent.click(viewButtonElement);

    const blogDetailsComponent = container.querySelector(".blog-details");

    expect(blogDetailsComponent).toHaveTextContent(blog.url);
    expect(blogDetailsComponent).toHaveTextContent(`likes ${blog.likes}`);
  });

  test("like button calls event handler twice when clicked twice", async () => {
    const mockSetBlogs = vi.fn();
    blog = { ...blog, likes: blog.likes + 1 };
    vi.spyOn(blogService, "update").mockResolvedValue(blog);

    const { container } = render(<Blog blog={blog} setBlogs={mockSetBlogs} />);

    const user = userEvent.setup();

    const viewButtonElement = container.querySelector(".view-button");
    await user.click(viewButtonElement);

    const likeButtonElement = container.querySelector(".like-button");
    await user.click(likeButtonElement);
    await user.click(likeButtonElement);

    expect(mockSetBlogs.mock.calls).toHaveLength(2);
  });
});
