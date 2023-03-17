const {
  createContactInfo: contactInfoService,
  updateContactInfo,
  deleteContactInfo,
} = require("../service/infoService");
const { badRequestError } = require("../../../error");
const { StatusCodes } = require("http-status-codes");

const createInfoContact = async (req, res, next) => {
  try {
    var { contactId, Ctype, Cdata } = req.body;
    var userId = res.locals.sessionUserId;
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

const updateContactInfoDetails = async (req, res, next) => {
  try {
    var { contactId, contcatInfoId, Ctype, Cdata } = req.body;
    var userid = res.locals.sessionUserId;
    if (!!contactId) {
      var result = await updateContactInfo(contactId, contcatInfoId, {
        conatctInfoType: Ctype,
        conatctInfoData: Cdata,
      });
      res.status(StatusCodes.OK).send(result);
    } else {
      throw new badRequestError("No matching contact found");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const deleteContactInfoDetails = async (req, res, next) => {
  try {
    var { contcatInfoId } = req.body;
    // var userid = res.locals.sessionUserId;
    if (!!contcatInfoId) {
      var result = await deleteContactInfo(contcatInfoId);
      res.status(StatusCodes.OK).send(result);
    } else {
      throw new badRequestError("No matching contact info found");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  createInfoContact,
  updateContactInfoDetails,
  deleteContactInfoDetails,
};
