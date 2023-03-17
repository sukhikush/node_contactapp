const { badRequestError } = require("../../../error");
const Users = require("../../../view/user");
const JWT = require("../../../middleware/jwt");
const { userDB } = require("../../../db");
const db = require("../../../models");

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
  var data = await Users.getUserId(id);
  if (!data) {
    return "No matching user found";
  } else {
    return data;
  }
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

const updateUserRec = async (userId, name, pass) => {
  const tran = await db.sequelize.transaction();
  try {
    var data = await Users.updateUser(tran, userId, name, pass);
    await tran.commit();
  } catch (err) {
    console.log(err);
    await tran.rollback();
    throw new badRequestError(
      "Error: In Updating Contact; something went wrong!!"
    );
  }
  if (!!data && data > 0) {
    return "Contact Updated";
  } else {
    throw new badRequestError("Error: In Updating Contact; not found!!");
  }
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  getUserAll,
  verifyUsers,
  updateUserRec,
};
