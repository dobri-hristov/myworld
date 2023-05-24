import { WIKI_URL, CITIES_URL } from ".";

export const getAllCities = () => {
  return fetch(`${CITIES_URL}`).then((response) => response.json());
};

export const getCityInfo = ({ name }) => {
  return fetch(`${WIKI_URL}/${name}`).then((response) => response.json());
};
