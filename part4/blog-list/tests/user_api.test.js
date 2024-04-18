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

  describe.only("where creating a user", () => {
    test("adding a valid user", async () => {
      const password = "tr";
      //   const passwordHash = await bcrypt.hash(password, user_helper.saltRounds);

      const newUser = new User({
        username: "co",
        name: "Truong Cong Thanh",
        password: password,
      });

      const res = await api.post("/api/users").send(newUser).expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
