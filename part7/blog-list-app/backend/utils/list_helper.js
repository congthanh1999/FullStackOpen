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

const mostBlogs = (blogs) => {
  const group = _.groupBy(blogs, "author");
  const author = _.maxBy(_.keys(group), (author) => group[author].length);

  return {
    author: author,
    blogs: group[author].length,
  };
};

const mostLikes = (blogs) => {
  const groups = _.groupBy(blogs, "author");
  const authors = _.keys(groups);
  const mostLikesAuthor = _.maxBy(authors, (author) =>
    groups[author].reduce((sum, curr) => sum + curr.likes, 0)
  );

  return {
    author: mostLikesAuthor,
    likes: _.sumBy(groups[mostLikesAuthor], (blog) => blog.likes),
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
