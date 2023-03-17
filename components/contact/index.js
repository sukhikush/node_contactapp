const express = require("express");
const userRoute = express.Router();

const {
  createContact,
  updateContactDetails,
  deleteContactDetails,
} = require("./controller/contactController");

userRoute.post("/", createContact);
userRoute.put("/", updateContactDetails);
userRoute.delete("/", deleteContactDetails);

module.exports = userRoute;
