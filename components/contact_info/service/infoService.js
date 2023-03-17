const contactInfo = require("../../../view/contactInfo");
const Contact = require("../../../view/contact");
const { userDB } = require("../../../db");
const { badRequestError } = require("../../../error");
const db = require("../../../models");

var createContactInfo = async (userId, contactId, Ctype, Cdata) => {
  var contact = await Contact.findContactByUserId(userId, contactId);

  if (!!contact && !!contact.id) {
    var data = await contactInfo.contactInfo(userId, contactId, Ctype, Cdata);
    return data;
  } else {
    throw new badRequestError("Error: Incorrect id!!");
  }
};

var updateContactInfo = async (contactId, contcatInfoId, Obj) => {
  const tran = await db.sequelize.transaction();

  try {
    var data = await contactInfo.updateUserContactInfo(
      tran,
      contactId,
      contcatInfoId,
      Obj
    );
    console.log(data);
    await tran.commit();
  } catch (err) {
    console.log(err);
    await tran.rollback();
    throw new badRequestError(
      "Error: In Deleting Contact; something went wrong!!"
    );
  }
  if (!!data && data > 0) {
    return "Contact Info Updated";
  } else {
    throw new badRequestError("Error: In Updating Contact Info; not found!!");
  }
};

var deleteContactInfo = async (contcatInfoId) => {
  const tran = await db.sequelize.transaction();

  try {
    var data = await contactInfo.deleteUserContactInfo(tran, contcatInfoId);
    console.log(data);
    await tran.commit();
  } catch (err) {
    console.log(err);
    await tran.rollback();
    throw new badRequestError(
      "Error: In Deleting Contact; something went wrong!!"
    );
  }
  if (!!data && data > 0) {
    return "Contact Info Deleted";
  } else {
    throw new badRequestError("Error: In Deleting Contact Info; not found!!");
  }
};

module.exports = { createContactInfo, updateContactInfo, deleteContactInfo };
