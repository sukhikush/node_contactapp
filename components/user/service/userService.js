const { badRequestError } = require("../../../error");
const Users = require("../../../view/user");
const JWT = require("../../../middleware/jwt");
const { userDB } = require("../../../db");

var createUser = async (user) => {
  var isExistingUser = await Users.findUsers(user);
  console.log(isExistingUser);
  if (!isExistingUser) {
    var id = await user.createUser();
    return "User Created - " + id;
  } else {
    throw new badRequestError("User Already Exists");
  }
};

var getUser = async () => {
  return await Users.getUser();
};

const getUserId = async (id) => {
  return await Users.getUserId(id);
};

const getUserAll = async () => {
  return await Users.getUserAll();
};

const verifyUsers = async (user) => {
  var isExistUser = await Users.findUsers(user);

  console.log(isExistUser, !isExistUser);
  if (!isExistUser) {
    throw new badRequestError("Incorrect username or password");
  } else {
    if (user.userPass === isExistUser.userPass) {
      console.log("user found");
      var jwt = new JWT(user.userName, user.userEmail);
      var token = jwt.generateToken();
      return { token: token };
    } else {
      throw new badRequestError("Incorrect username or password");
    }
  }
};

module.exports = { createUser, getUser, getUserId, getUserAll, verifyUsers };
