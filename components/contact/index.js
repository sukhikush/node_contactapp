const express = require("express")
const userRoute = express.Router();

const contactCreate = require("./controller/contactController")

userRoute.post('/',contactCreate)

module.exports = userRoute;