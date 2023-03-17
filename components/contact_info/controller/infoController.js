const {
  createContactInfo: contactInfoService,
} = require("../service/infoService");
const { badRequestError } = require("../../../error");
const { StatusCodes } = require("http-status-codes");

const createInfoContact = async (req, res, next) => {
  try {
    var { userId, contactId, Ctype, Cdata } = req.body;
    if (!!userId && !!contactId && !!Ctype && !!Cdata) {
      var result = await contactInfoService(userId, contactId, Ctype, Cdata);
      res.status(StatusCodes.OK).send({ result });
    } else {
      throw new badRequestError("Name & id cannot be blank");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = createInfoContact;
