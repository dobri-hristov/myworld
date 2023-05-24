import { call, put, takeLatest, fork } from "redux-saga/effects";
import { citiesActions } from "../slices/cities";
import * as api from "../api/cities";
import * as apiCountries from "../api/countries";
import { filterCities } from "../../utils/cities";
import { mergeCountriesData } from "../../utils/countries";
import { toast } from "react-toastify";
import { loadingActions } from "../slices/loading";

function* getCitiesByRequest({ payload: { city, country } }) {
  try {
    yield put(loadingActions.loadingOn());
    const { data } = yield call(apiCountries.getAllCountries);
    const allCities = yield call(api.getAllCities);
    const countries = mergeCountriesData(data, allCities);
    const cities = city && filterCities(countries, city, country);
    yield put(citiesActions.getCitiesSuccess({ cities }));
    yield put(loadingActions.loadingOff());
  } catch (e) {
    toast.error(`Couldn't retrieve cities`);
  }
}

function* getCityInfo({ payload: { name } }) {
  try {
    yield put(loadingActions.loadingOn());
    const info = yield call(api.getCityInfo, { name });
    yield put(citiesActions.getCityInfoSuccess({ info }));
    yield put(loadingActions.loadingOff());
  } catch (e) {
    toast.error(`Couldn't retrieve city information`);
  }
}

function* watchCities() {
  yield takeLatest(citiesActions.getCitiesByRequest, getCitiesByRequest);
  yield takeLatest(citiesActions.getCityInfo, getCityInfo);
}

const citiesSagas = [fork(watchCities)];

export default citiesSagas;
