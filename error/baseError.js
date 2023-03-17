class baseError extends Error {
  constructor(errMessage, statusCode) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

module.exports = baseError;
