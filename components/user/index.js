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
userRoute.get("/getAll", getUserAll);
userRoute.get("/id/:userId", getUserId);

module.exports = userRoute;
