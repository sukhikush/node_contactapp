const express = require("express")
const userRoute = express.Router();

const createInfoContact = require("./controller/infoController")

userRoute.post('/',createInfoContact)

module.exports = userRoute;