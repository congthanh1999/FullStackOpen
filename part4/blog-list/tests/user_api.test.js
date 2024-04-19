const supertest = require("supertest");
const app = require("../app");
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const user_helper = require("../utils/user_helper");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe.only("when there is some users added to DB", () => {
  beforeEach(async () => {
    const saltRounds = 10;
    for (const user of user_helper.users) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }

    await User.deleteMany({});
    await User.insertMany(user_helper.users);
  });

  test("users are returned as JSON", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("content-type", /application\/json/);
  });

  describe.only("when creating a user", () => {
    test.only("adding a invalid user", async () => {
      const password = "tr";

      const newUser = {
        username: "tr25324",
        name: "cong thanh",
        password: password,
      };

      const res = await api.post("/api/users").send(newUser).expect(400);

      assert.strictEqual(res.body.error, "invalid password");
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
