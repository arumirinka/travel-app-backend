const { Schema, model } = require('mongoose');

const sightsSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const countrySchema = new Schema({
  _id: false,
  lang: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  capital: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sights: [sightsSchema],
  videoUrl: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  capitalEN: {
    type: String,
    required: true,
  },
  capitalGMT: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  }
});

const Country = model('Country', countrySchema);

module.exports = Country;
