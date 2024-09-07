const { BaseError } = require("../utils/error-classes");

// use this function to send errors to logger service
function logError(err) {
  console.error(err);
}

// middleware to log all errors
function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

// final middleware to return a HTTP response to the client
function returnError(err, req, res, next) {
  // handle expected Custom Errors with custom error messages
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // generic catch-all error handler
  res.status(500).json({
    success: false,
    error: "Server error.",
  });
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
