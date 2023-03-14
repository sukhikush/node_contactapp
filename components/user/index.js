const express = require("express");
const userRoute = express.Router();

const {
  createUser,
  getUser,
  getUserAll,
  getUserId,
} = require("./controller/userController");

userRoute.post("/", createUser);
userRoute.get("/", getUser);
userRoute.get("/id/:userId", getUserId);
userRoute.get("/getAll", getUserAll);

module.exports = userRoute;
