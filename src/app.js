require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoute = require('./resources/auth/auth.router');
const accountRoute = require('./resources/account/account.router');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/favicon.ico', (req, res) => res.sendStatus(StatusCodes.NO_CONTENT));

app.use('/api/user', authRoute);
app.use('/api/user/account', accountRoute);

app.use((req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
});


module.exports = app;
