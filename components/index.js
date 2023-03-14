const express = require("express")
const route = express.Router();

const user = require("./user");
const contact = require("./contact")
const contact_info = require("./contact_info")

route.use('/user',user);
route.use('/user/contact',contact);
route.use('/user/contact/info',contact_info)

module.exports = route;