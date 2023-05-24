import { all } from "redux-saga/effects";
import countriesSagas from "./countries";
import citiesSagas from "./cities";

export default function* rootSaga() {
  yield all([...countriesSagas, ...citiesSagas]);
}
