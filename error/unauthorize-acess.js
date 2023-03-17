const { StatusCodes } = require("http-status-codes");
const baseError = require("./baseError");

class unauthorizeAcess extends baseError {
  constructor(errmessage) {
    super(errmessage, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = unauthorizeAcess;
