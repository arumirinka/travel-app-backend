require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoute = require('./resources/auth/auth.router');
const accountRoute = require('./resources/account/account.router');
const avatarRoute = require('./resources/avatar/avatar.router');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const countryRouter = require('./resources/countries/country.router');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/countries', countryRouter);
app.use('/favicon.ico', (req, res) => res.sendStatus(StatusCodes.NO_CONTENT));

app.use('/user', authRoute);
app.use('/user/account', accountRoute);
app.use('/user/avatar', avatarRoute);

app.use((req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
});

app.use(errorHandler);

module.exports = app;
