import { all, takeEvery, put, select, delay } from 'redux-saga/effects';
import * as types from '../../../reduxs/ActionType';
import { changeCurrent, toggleCollapsed, toggleOpenDrawer } from '../../../layout/redux/ac-app';

const getLoginState = (state) => state.App

export function* test({ payload }) {
  try {
    const appState = yield select(getLoginState)
    yield payload.push('/dashboard/dashboard')
    yield put(changeCurrent(['dashboard']))
    if (appState.view === "MobileView") {
      yield delay(100)
      yield put(toggleCollapsed())
      yield put(toggleOpenDrawer())
    }
  } catch (err) {
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.BACK_LOGIN, test)
  ])
}