const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const list_helper = require("../utils/list_helper");

const api = supertest(app);

describe.only("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(list_helper.blogs);
  });

  test("blogs are returned as json", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/);

    assert.strictEqual(res.body.length, 6);
  });

  test("blogs id property is named id, not _id", async () => {
    const res = await api.get("/api/blogs");

    const id = res.body[0].id ? true : false;
    const _id = res.body[0]._id ? true : false;

    assert.strictEqual(id, true);
    assert.strictEqual(_id, false);
  });

  describe("When adding a new blog", () => {
    test("blog is saved successfully", async () => {
      const initialBlogs = await Blog.find({});

      const newBlog = {
        title: "fwfw",
        author: "cong thanh",
        url: "efwf",
        likes: 25,
      };

      const res = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const updatedBlogs = await Blog.find({});
      const savedBlog = updatedBlogs
        .find((blog) => blog.id === res.body.id)
        .toJSON();

      assert.strictEqual(updatedBlogs.length, initialBlogs.length + 1);
      assert.deepStrictEqual(savedBlog, { ...newBlog, id: res.body.id });
    });

    test("blog likes count is missing", async () => {
      const newBlog = {
        title: "fwfw",
        author: "cong thanh",
        url: "efwf",
      };

      const res = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(res.body.likes, 0);
    });

    test("should response with status 400 if missing title or url", async () => {
      const newBlog = {
        author: "okkfwe",
        likes: 90,
      };

      const res = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const result = res.body.title && res.body.url ? true : false;

      assert.strictEqual(result, false);
    });
  });

  describe("when deleting a blog", () => {
    test("blog is deleted successfully", async () => {
      const initialBlogs = await Blog.find({});

      const res = await api
        .delete(`/api/blogs/${initialBlogs[0].toJSON().id}`)
        .expect(204);

      const updatedBlogs = await Blog.find({});

      assert(updatedBlogs.length, initialBlogs - 1);
    });
  });

  describe.only("when updating a blog", () => {
    test.only("blog is updated successfully", async () => {
      const initialBlogs = await Blog.find({});
      const initialBlog = await Blog.findById(initialBlogs[0].toJSON().id);
      const initialBlogJSON = initialBlog.toJSON();

      const updateBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Michael Chen",
        url: "https://reactpatterns.com/",
        likes: 7,
      };

      const res = await api
        .put(`/api/blogs/${initialBlogJSON.id}`)
        .send(updateBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.notDeepStrictEqual(res.body, initialBlogJSON);
    });
  });
});

after(async () => {
  await mongoose.disconnect();
});
