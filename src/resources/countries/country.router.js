const express = require('express');
const countryService = require('./country.service');
const { DEFAULT_LANG } = require('../../common/config');
const tryCatchErrors = require('../../utils/tryCatchErrors');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const countryRouter = express.Router();

const notFoundErr = new Error(ReasonPhrases.NOT_FOUND);
notFoundErr.code = StatusCodes.NOT_FOUND;

countryRouter.get(
  '/',
  tryCatchErrors(async (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG;
    const data = await countryService.getAll(lang);
    if (!data) {
      throw notFoundErr;
    }
    return res.status(StatusCodes.OK).json(data);
  })
);

countryRouter.get(
  '/:id',
  tryCatchErrors(async (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG;
    const { id } = req.params;
    const data = await countryService.getOne(lang, id);
    if (!data) {
      throw notFoundErr;
    }
    return res.status(StatusCodes.OK).json(data);
  })
);

module.exports = countryRouter;
