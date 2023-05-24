import axios from "axios";
export const COUNTRIES_URL = "https://restcountries.com/v3.1/";
export const WIKI_URL = "https://en.wikipedia.org/api/rest_v1/page/summary";
export const CITIES_URL = "https://countriesnow.space/api/v0.1/countries";

export const countriesDistributorService = axios.create({
  baseURL: COUNTRIES_URL,
  timeout: 5000,
});
