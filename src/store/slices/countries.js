import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

const initialState = {
  allCountries: [],
  country: {
    data: {},
    info: {},
  },
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getAllCountries: (state) => state,
    getCountriesByName: (state) => state,
    getExactCountryByName: (state) => state,
    getCountryInfo: (state) => state,
    getCountriesSuccess: (state, { payload: { countries } }) => ({
      ...state,
      allCountries: countries,
    }),
    getExactCountrySuccess: (state, { payload: { data } }) => ({
      ...state,
      country: merge({}, state.country, { data }),
    }),
    getCountryInfoSuccess: (state, { payload: { info } }) => ({
      ...state,
      country: merge({}, state.country, { info }),
    }),
  },
});

export const countriesActions = countriesSlice.actions;

export default countriesSlice.reducer;
