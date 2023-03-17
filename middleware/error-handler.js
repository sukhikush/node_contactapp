const { StatusCodes } = require("http-status-codes");
const baseError = require("../error/baseError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof baseError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = errorHandlerMiddleware;
