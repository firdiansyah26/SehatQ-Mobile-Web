import { all } from 'redux-saga/effects';
import Home from '../routes/UI/Home/redux/sagas'

export default function* rootSaga(getState) {
  yield all([
    Home(),
  ]);
}
