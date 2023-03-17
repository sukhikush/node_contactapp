const express = require("express");
const userRoute = express.Router();

const {
  createUser,
  getUser,
  getUserAll,
  getUserId,
  login,
} = require("./controller/userController");

userRoute.post("/login", login);
userRoute.post("/create", createUser);
userRoute.get("/get", getUser);
userRoute.get("/getAll", getUserAll);
userRoute.get("/getId/:userId", getUserId);

module.exports = userRoute;
