const httpStatusCodes = require("./http-status-codes");

class BaseError extends Error {
  constructor(message, statusCode, isOperational) {
    super(message);

    // Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

class Api404Error extends BaseError {
  constructor(
    message = "Not found.",
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

class Api500Error extends BaseError {
  constructor(
    message = "Server error.",
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

class Api400Error extends BaseError {
  constructor(
    message = "Bad request.",
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

module.exports = { BaseError, Api400Error, Api404Error, Api500Error };
