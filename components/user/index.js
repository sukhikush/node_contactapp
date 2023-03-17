const express = require("express");
const userRoute = express.Router();

const {
  createUser,
  getUser,
  getUserAll,
  getUserId,
  login,
  updateUserDetails,
} = require("./controller/userController");

userRoute.post("/login", login);
userRoute.post("/create", createUser);
userRoute.put("/update", updateUserDetails);
userRoute.get("/get", getUser);
userRoute.get("/getAll", getUserAll);
userRoute.get("/getId/:userId", getUserId);

module.exports = userRoute;
