import blogService from "../services/blogs";

const BlogForm = ({ handleNotification }) => {
  const handleCreate = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };

    const createdBlog = await blogService.create(newBlog);

    handleNotification(
      `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      true
    );

    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreate}>
        <label htmlFor="title">title:</label>
        <input type="text" id="title" name="title" />
        <br />
        <label htmlFor="title">author:</label>
        <input type="text" id="author" name="author" />
        <br />
        <label htmlFor="title">url:</label>
        <input type="text" id="url" name="url" />
        <br />
        <input type="submit" value="create" />
      </form>
    </div>
  );
};

export default BlogForm;
