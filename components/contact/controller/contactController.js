const {
  createContact: contactService,
  updateContact,
  deleteConatct,
} = require("../service/contactService");
const { badRequestError } = require("../../../error");
const { StatusCodes } = require("http-status-codes");

const createContact = async (req, res, next) => {
  try {
    var { name } = req.body;
    var id = res.locals.sessionUserId;
    console.log(id, "Contcat ID");
    if (!!name && !!id) {
      var result = await contactService(id, name);
      res.status(StatusCodes.OK).send(result);
    } else {
      throw new badRequestError("Name & id cannot be blank");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const updateContactDetails = async (req, res, next) => {
  try {
    var { contactId, name } = req.body;
    var userid = res.locals.sessionUserId;
    if (!!contactId) {
      var result = await updateContact(userid, contactId, name);
      res.status(StatusCodes.OK).send(result);
    } else {
      throw new badRequestError("No matching contact found");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const deleteContactDetails = async (req, res, next) => {
  try {
    var { contactId } = req.body;
    // var userid = res.locals.sessionUserId;
    if (!!contactId) {
      var result = await deleteConatct(contactId);
      res.status(StatusCodes.OK).send(result);
    } else {
      throw new badRequestError("No matching contact found");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { createContact, updateContactDetails, deleteContactDetails };
