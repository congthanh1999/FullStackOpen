const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");

const saltRounds = 10;

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    _id: new ObjectId("6621ee912862da30cb4c43cd"),
    user: new ObjectId("6621ee912862da30cb4c436a"),
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    _id: new ObjectId("6621ee912862da30cb4c43ce"),
    user: new ObjectId("6621ee912862da30cb4c436a"),
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    _id: new ObjectId("6621ee912862da30cb4c43ed"),
    user: new ObjectId("6621ee912862da30cb4c436a"),
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    _id: new ObjectId("6621ee912862da30cb5c43cd"),
    user: new ObjectId("6621ee912862da30cb4c436a"),
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    _id: new ObjectId("6621ee912862da30cb4c45cd"),
    user: new ObjectId("6621ee9b2862da30cb4c43ef"),
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    _id: new ObjectId("6621ee912862da30cb4543cd"),
    user: new ObjectId("6621ee9b2862da30cb4c43ef"),
  },
];

const users = [
  {
    username: "congthanh",
    name: "truong cong than",
    password: "123455",
    _id: new ObjectId("6621ee912862da30cb4c436a"),
    blogs: [blogs[0]._id, blogs[1]._id, blogs[2]._id, blogs[3]._id],
  },
  {
    username: "congthanh99",
    name: "truong cong thanh",
    password: "123409095",
    _id: new ObjectId("6621ee9b2862da30cb4c43ef"),
    blogs: [blogs[4]._id, blogs[5]._id],
  },
];

const getPasswordHash = async (password) => {
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};

module.exports = { saltRounds, blogs, users, getPasswordHash };
