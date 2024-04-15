const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );
};

const mostBlog = (blogs) => {
  const group = _.groupBy(blogs, "author");
  const author = _.maxBy(_.keys(group), (author) => group[author].length);

  return {
    author: author,
    blogs: group[author].length,
  };
};

const mostLike = (blogs) => {
  const group = _.groupBy(blogs, "author");
  const author = _.maxBy(_.keys(group));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
};
