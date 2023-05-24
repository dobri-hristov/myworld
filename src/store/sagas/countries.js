import { call, put, takeLatest, fork } from "redux-saga/effects";
import { countriesActions } from "../slices/countries";
import * as api from "../api/countries";
import { getAllCities } from "../api/cities";
import { mergeCountriesData } from "../../utils/countries";
import { loadingActions } from "../slices/loading";
import { toast } from "react-toastify";

function* getAllCountries() {
  try {
    yield put(loadingActions.loadingOn());
    const { data } = yield call(api.getAllCountries);
    const cities = yield call(getAllCities);
    const countries = mergeCountriesData(data, cities);
    yield put(countriesActions.getCountriesSuccess({ countries }));
    yield put(loadingActions.loadingOff());
  } catch (e) {
    toast.error(`Couldn't retrieve countries`);
  }
}

function* getCountriesByName({ payload: { name } }) {
  try {
    yield put(loadingActions.loadingOn());
    const { data } = yield call(api.getCountriesByName, { name });
    const cities = yield call(getAllCities);
    const countries = mergeCountriesData(data, cities);
    yield put(countriesActions.getCountriesSuccess({ countries }));
    yield put(loadingActions.loadingOff());
  } catch (e) {
    toast.error(`Couldn't retrieve country with name ${name}`);
  }
}

function* getExactCountryByName({ payload: { name } }) {
  try {
    const { data } = yield call(api.getExactCountryByName, { name });
    const cities = yield call(getAllCities);
    const country = mergeCountriesData(data, cities);
    yield put(countriesActions.getExactCountrySuccess({ data: country[0] }));
  } catch (e) {
    toast.error(`Couldn't retrieve country with name ${name}`);
  }
}

function* getCountryInfo({ payload: { name } }) {
  try {
    const info = yield call(api.getCountryInfo, { name });
    yield put(countriesActions.getCountryInfoSuccess({ info }));
  } catch (e) {
    toast.error(`Couldn't retrieve country information`);
  }
}

function* watchCountries() {
  yield takeLatest(countriesActions.getAllCountries, getAllCountries);
  yield takeLatest(countriesActions.getCountriesByName, getCountriesByName);
  yield takeLatest(
    countriesActions.getExactCountryByName,
    getExactCountryByName
  );
  yield takeLatest(countriesActions.getCountryInfo, getCountryInfo);
}

const countriesSagas = [fork(watchCountries)];

export default countriesSagas;
