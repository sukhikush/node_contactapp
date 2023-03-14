const {
  createUser: userServiceCreateUser,
  getUser: getUserData,
  getUserId: getUserIdData,
  getUserAll: getUserAllData,
} = require("../service/userService");

const createUser = (req, res, next) => {
  console.log("fff", req.body);
  try {
    var { name } = req.body;
    if (!!name) {
      var result = userServiceCreateUser(name);
      res.send(result);
    } else {
      res.status(400);
      res.send("Name cannot be blank");
    }
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const getUser = (req, res, next) => {
  var data = getUserData();
  res.send(data);
};

const getUserId = (req, res, next) => {
  console.log("ff", req.params.userId);
  var data = getUserIdData(req.params.userId);
  res.send(data);
};

const getUserAll = (req, res, next) => {
  var data = getUserAllData();
  res.send(data);
};

module.exports = { createUser, getUser, getUserId, getUserAll };
