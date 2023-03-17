const { createContact: contactService } = require("../service/contactService");
const { badRequestError } = require("../../../error");
const { StatusCodes } = require("http-status-codes");

const createContact = async (req, res, next) => {
  try {
    var { id, name } = req.body;
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

module.exports = createContact;
