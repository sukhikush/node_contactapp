const express = require("express");
const userRoute = express.Router();

const {
  createInfoContact,
  updateContactInfoDetails,
  deleteContactInfoDetails,
} = require("./controller/infoController");

userRoute.post("/", createInfoContact);
userRoute.put("/", updateContactInfoDetails);
userRoute.delete("/", deleteContactInfoDetails);

module.exports = userRoute;
