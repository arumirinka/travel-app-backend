require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoute = require('./resources/auth/auth.router');
const accountRoute = require('./resources/account/account.router');
const imageRoute = require('./resources/upload/avatar.router');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(fileUpload());

app.use('/favicon.ico', (req, res) => res.sendStatus(StatusCodes.NO_CONTENT));

app.use('/api/user', authRoute);
app.use('/api/user/account', accountRoute);
app.use('/api/user/image', imageRoute);

app.use((req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
});

module.exports = app;
