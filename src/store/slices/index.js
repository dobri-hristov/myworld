import countriesSlice from "./countries";
import citiesSlice from "./cities";
import loadingSlice from './loading'

const reducers = {
  countries: countriesSlice,
  cities: citiesSlice,
  loading: loadingSlice,
};

export default reducers;
