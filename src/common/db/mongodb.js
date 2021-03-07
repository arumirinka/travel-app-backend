const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../config');

const connectToDB = () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => console.error(err.message));

  const db = mongoose.connection;
  db.once('open', () => {
    console.info('Mongo connection success!');
  });
};

module.exports = { connectToDB };
