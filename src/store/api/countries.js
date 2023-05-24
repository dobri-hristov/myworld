import { countriesDistributorService, WIKI_URL } from ".";

export const getAllCountries = () => {
  return countriesDistributorService.get("/all");
};

export const getCountriesByName = ({ name }) => {
  return countriesDistributorService.get(`/name/${name}`);
};

export const getExactCountryByName = ({ name }) => {
  return countriesDistributorService.get(`/name/${name}?fullText=true`);
};

export const getCountryInfo = ({ name }) => {
  return fetch(`${WIKI_URL}/${name}`).then((response) => response.json());
};
