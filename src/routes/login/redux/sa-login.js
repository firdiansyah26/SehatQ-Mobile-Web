import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import * as types from '../../../reduxs/ActionType';
import Endpoint from '../../../config/API_Endpoint';
import { setLoader, setDataLogin } from './ac-login';
import { POST } from '../../../config/Api';
import Config from '../../../config/Config';
import Services from '../../../config/AuthenticationService';

const cookies = new Cookies();
const getLoginState = (state) => state.Login

export function* postData() {
  try {
    const loginState = yield select(getLoginState)
    yield put(setLoader(true))
    const data = yield call(POST, Config.API_LOGIN + Endpoint.AUTHLOGIN, Services.Auth_SAMA.getBody(loginState.username, loginState.password), { headers: Services.Auth_SAMA.getHeader() });
    cookies.set('Token', data.data.access_token, { expires: new Date(Date.now() + data.data.expires_in * 1000), path: '/' });
    yield put(setDataLogin(data.data));
    yield put(setLoader(false))
  } catch (err) {
    yield put(setLoader(false))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.LOGIN_POST_DATA, postData)
  ])
}