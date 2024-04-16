const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("content-type", /application\/json/);

  assert.strictEqual(res.body.length, 3);
});

after(async () => {
  await mongoose.disconnect();
});
