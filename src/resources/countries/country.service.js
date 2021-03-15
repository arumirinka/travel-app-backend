const countryRepo = require('./country.db.repository');

const getAll = async (lang) => {
  const countries = await countryRepo.getAllCountries(lang);
  return countries.reduce((acc, val) => [...acc].concat({name: val.name, capital: val.capital, id: val.country}), []);
};

const getOne = async (lang, id) => {
  const country = await countryRepo.getCountryById(lang, id);
  return country;
};

module.exports = {
  getAll,
  getOne,
};
