const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");
const blogs = require("../utils/list_helper").blogs;

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has more than one blog, equals the likes of that", () => {
    const expected = listHelper.totalLikes(blogs);
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, expected);
  });
});

describe("favorite blog", () => {
  test("when list has more than one blog, the most favorite blog is", () => {
    const result = listHelper.favoriteBlog(blogs);
    const expected = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };
    assert.deepStrictEqual(result, expected);
  });
});

describe("author ", () => {
  test("with most blogs", () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    const actual = listHelper.mostBlogs(blogs);

    assert.deepStrictEqual(actual, expected);
  });

  test("with most likes", () => {
    const expected = { author: "Edsger W. Dijkstra", likes: 17 };

    const actual = listHelper.mostLikes(blogs);

    assert.deepStrictEqual(actual, expected);
  });
});
