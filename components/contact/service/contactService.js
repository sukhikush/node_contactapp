const Contact = require("../../../view/contact");
const User = require("../../../view/user");
const { userDB } = require("../../../db");
const { badRequestError } = require("../../../error");

var createContact = async (userId, name) => {
  var user = await User.findUsersId(userId);
  if (!!user && !!user.id) {
    var id = await Contact.createContact(userId, name);
    return "Contact Created  |  " + id;
  } else {
    throw new badRequestError("Error: User not found!!");
  }
};

module.exports = { createContact };
