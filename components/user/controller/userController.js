const {
  createUser: userServiceCreateUser,
  getUser: getUserData,
  getUserId: getUserIdData,
  getUserAll: getUserAllData,
  verifyUsers: verifyUsers,
  updateUserRec,
} = require("../service/userService");

const { badRequestError } = require("../../../error");
const { StatusCodes } = require("http-status-codes");
const Users = require("../../../view/user");

const createUser = async (req, res, next) => {
  try {
    var { name, pass, email } = req.body;
    if (!!name && !!pass && !!email) {
      var user = new Users(name, pass, email);
      var result = await userServiceCreateUser(user);
      res.status(StatusCodes.OK).send(result);
    } else {
      throw new badRequestError("Name, Pass, & email cannot be blank");
    }
  } catch (err) {
    console.log("***********************create user************");
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    var { name, pass, email } = req.body;
    if (!!name && !!pass && !!email) {
      var token = await verifyUsers({
        userName: name,
        userPass: pass,
        userEmail: email,
      });
      if (!!token.token) {
        res.cookie("authorization", token.token);
        res.send("User Authenticated");
      } else {
        throw new badRequestError("Invalid Credentials");
      }
    } else {
      throw new badRequestError("Name and Pass cannot be blank");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  //Only Admin Acess
  var data = await getUserData();
  console.log(data);
  res.status(StatusCodes.OK).send(data);
};

const getUserId = async (req, res, next) => {
  var data = await getUserIdData(req.params.userId);
  res.status(StatusCodes.OK).send(data);
};

const getUserAll = async (req, res, next) => {
  //Only Admin Acess
  var data = await getUserAllData();
  res.status(StatusCodes.OK).send(data);
};

const updateUserDetails = async (req, res, next) => {
  try {
    var { name, pass } = req.body;
    if (!!name && !!pass) {
      console.log(res.locals.sessionUserId, "fdfdfdfd session id");
      var result = await updateUserRec(res.locals.sessionUserId, name, pass);
      res.status(StatusCodes.OK).send(result);
    } else {
      throw new badRequestError("Name, Pass, & email cannot be blank");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  getUserAll,
  login,
  updateUserDetails,
};
