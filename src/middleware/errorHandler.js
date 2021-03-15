const { StatusCodes, ReasonPhrases } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (!err.code) {
    err.code = StatusCodes.INTERNAL_SERVER_ERROR;
    err.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
  }
  res.status(err.code).send(`${err.code} ${err.message}`);
};

module.exports = errorHandler;
