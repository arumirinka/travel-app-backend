const express = require('express');
const countryService = require('./country.service');
const { DEFAULT_LANG } = require('../../common/config');

const countryRouter = express.Router();

countryRouter.get(
  '/',
  async (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG;
    const data = await countryService.getAll(lang);
    res.json(data);
  }
);

countryRouter.get(
  '/:id',
  async (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG;
    const { id } = req.params;
    const data = await countryService.getOne(lang, id);
    res.json(data);
  }
);

module.exports = countryRouter;
