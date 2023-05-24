import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

const initialState = {
  cities: [],
  city: {
    info: {},
  },
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    getCitiesByRequest: (state) => state,
    getCityInfo: (state) => state,
    getCityInfoSuccess: (state, { payload: { info } }) => ({
      ...state,
      city: merge({}, state.city, { info }),
    }),
    getCitiesSuccess: (state, { payload: { cities } }) => [...cities],
  },
});

export const citiesActions = citiesSlice.actions;

export default citiesSlice.reducer;
