const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const data_helper = require("../utils/data_helper");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const ObjectId = require("mongoose").Types.ObjectId;

const api = supertest(app);

let token;

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(data_helper.blogs);

    const users = await Promise.all(
      data_helper.users.map(async (user) => ({
        ...user,
        passwordHash: await data_helper.getPasswordHash(user.password),
      }))
    );

    await User.deleteMany({});
    await User.insertMany(users);

    const newUser = {
      username: "testuser",
      name: "Cong Thanh",
      password: "testpassword",
    };

    const loginUser = {
      username: data_helper.users[0].username,
      password: "123455",
    };

    await api.post("/api/users").send(newUser);
    const response = await api.post("/api/login").send(loginUser);

    token = response.body.token;
  });

  test("blogs are returned as json", async () => {
    const res = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("content-type", /application\/json/);

    assert.strictEqual(res.body.length, 6);
  });

  test("blogs id property is named id, not _id", async () => {
    const res = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    const id = res.body[0].id ? true : false;
    const _id = res.body[0]._id ? true : false;

    assert.strictEqual(id, true);
    assert.strictEqual(_id, false);
  });

  describe("When adding a new blog", () => {
    test("blog is saved successfully", async () => {
      const initialBlogs = await Blog.find({});
      const decodedToken = jwt.verify(token, config.SECRET);

      const newBlog = {
        title: "fwfw",
        author: "cong thanh",
        url: "efwf",
        likes: 25,
        user: new ObjectId(decodedToken.id),
      };

      const res = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
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
        .set("Authorization", `Bearer ${token}`)
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
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const result = res.body.title && res.body.url ? true : false;

      assert.strictEqual(result, false);
    });

    test("should response with 401 if the the user is unauthoized", async () => {
      const newBlog = {
        title: "fwefewfewfw",
        author: "Truong Cong Thanh",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("when deleting a blog", () => {
    test("blog is deleted successfully", async () => {
      const initialBlogs = await Blog.find({});

      const res = await api
        .delete(`/api/blogs/${initialBlogs[0].toJSON().id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const updatedBlogs = await Blog.find({});

      assert(updatedBlogs.length, initialBlogs - 1);
    });
  });

  describe("when updating a blog", () => {
    test("blog is updated successfully", async () => {
      const initialBlogs = await Blog.find({});
      const initialBlog = await Blog.findById(initialBlogs[0]._id.toString());
      const initialBlogJSON = initialBlog.toJSON();

      const updateBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Michael Chen",
        url: "https://reactpatterns.com/",
        likes: 7,
      };

      const res = await api
        .put(`/api/blogs/${initialBlogJSON.id}`)
        .set("Authorization", `Bearer ${token}`)
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
