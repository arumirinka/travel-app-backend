require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const countryRouter = require('./resources/countries/country.router');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/countries', countryRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
});

module.exports = app;
