const contactInfo = require("../../../view/contactInfo");
const Contact = require("../../../view/contact");
const { userDB } = require("../../../db");
const { badRequestError } = require("../../../error");

var createContactInfo = async (userId, contactId, Ctype, Cdata) => {
  var contact = await Contact.findContactByUserId(userId, contactId);

  if (!!contact && !!contact.id) {
    var data = await contactInfo.contactInfo(userId, contactId, Ctype, Cdata);
    return data;
  } else {
    throw new badRequestError("Error: Incorrect id!!");
  }
};

module.exports = { createContactInfo };
