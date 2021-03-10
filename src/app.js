require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoute = require('./resources/auth/auth.router');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/favicon.ico', (req, res) => res.sendStatus(StatusCodes.NO_CONTENT));

const jwt = require('jsonwebtoken');

const posts = [
  {
    username: 'User1',
    text: 'post1'
  },
  {
    username: 'Yuretz',
    text: 'post2'
  }
]

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] 
  const token = authHeader &&  authHeader.split(' ')[1]
  if (token == null) res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user;
    next();
  })
}
app.use('/api/user', authRoute);

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
})



app.use((req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
});


module.exports = app;
