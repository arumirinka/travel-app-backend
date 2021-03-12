const Country = require('./country.model');

const getAllCountries = async lang => {
  const data = Country.find({ lang });
  return data;
};

const getCountryById = async (lang, id) => {
  return Country.findOne({ country: id, lang });
};

module.exports = {
  getAllCountries,
  getCountryById,
};
