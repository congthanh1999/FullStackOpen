const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return res.status(400).json({ error: `Duplicated username` });
  }

  next(error);
};

module.exports = { errorHandler };
