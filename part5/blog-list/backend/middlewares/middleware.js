const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: `invalid username` });
  } else if (error.name === "MongoServerError") {
    return res.status(400).json({ error: `duplicated username` });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  }

  next(error);
};

// const tokenExtractor = (req, res, next) => {
//   const authorization = req.get("authorization");

//   if (authorization && authorization.startsWith("Bearer ")) {
//     req.token = authorization.replace("Bearer ", "");
//   }

//   next();
// };

// const userExtractor = async (req, res, next) => {
//   const decodedToken = jwt.verify(req.token, config.SECRET);

//   const user = await User.findById(decodedToken.id);
//   req.user = user;

//   next();
// };

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const userExtractor = async (req, response, next) => {
  const token = getTokenFrom(req);

  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(401).json({ error: "user not found" });
  }

  req.user = user;

  next();
};

module.exports = { errorHandler, userExtractor };
