const Contact = require("../../../view/contact");
const ContactInfo = require("../../../view/contactInfo");
const User = require("../../../view/user");
const { userDB } = require("../../../db");
const { badRequestError } = require("../../../error");
const db = require("../../../models");

var createContact = async (userId, name) => {
  var user = await User.findUsersId(userId);
  if (!!user && !!user.id) {
    var id = await Contact.createContact(userId, name);
    return "Contact Created  |  " + id;
  } else {
    throw new badRequestError("Error: User not found!!");
  }
};

var updateContact = async (userid, contactId, name) => {
  const tran = await db.sequelize.transaction();

  try {
    var data = await Contact.updateUserContact(tran, userid, contactId, name);
    await tran.commit();
  } catch (err) {
    console.log(err);
    await tran.rollback();
    throw new badRequestError(
      "Error: In Deleting Contact; something went wrong!!"
    );
  }
  if (!!data && data > 0) {
    return "Contact Updated";
  } else {
    throw new badRequestError("Error: In Updating Contact; not found!!");
  }
};

var deleteConatct = async (contcatId) => {
  const tran = await db.sequelize.transaction();

  try {
    var data1 = await ContactInfo.deleteUserContactInfoUsingContactId(
      tran,
      contcatId
    );
    var data = await Contact.deleteUserContact(tran, contcatId);

    await tran.commit();
  } catch (err) {
    console.log(err);
    await tran.rollback();
    throw new badRequestError(
      "Error: In Deleting Contact; something went wrong!!"
    );
  }
  if (!!data && data > 0) {
    return "Contact Deleted";
  } else {
    throw new badRequestError("Error: In Deleting Contact; not found!!");
  }
};

module.exports = { createContact, updateContact, deleteConatct };
