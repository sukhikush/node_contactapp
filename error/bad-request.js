const { StatusCodes } = require("http-status-codes");
const baseError = require("./baseError");

class badRequest extends baseError {
  constructor(errmessage) {
    super(errmessage, StatusCodes.BAD_REQUEST);
  }
}

module.exports = badRequest;
