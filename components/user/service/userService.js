const Users = require("../../../view/user");
var userDB = require("../../../db");

var createUser = (name) => {
  var id = Users.createUser(name);
  return "User Created - " + id;
};

var getUser = () => {
  return Users.getUser();
};

const getUserId = (id) => {
  return Users.getUserId(id);
};

const getUserAll = () => {
  return Users.getUserAll();
};

module.exports = { createUser, getUser, getUserId, getUserAll };
