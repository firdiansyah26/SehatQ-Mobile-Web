import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import { GET } from '../../../../config/Api';
import * as types from '../../../../reduxs/ActionType';

const getHomeState = (state) => state.HomeState

export function* initDataHome() {
    try {
        let _url = 'https://private-4639ce-ecommerce56.apiary-mock.com/home'
        let _response = yield call(GET, _url)
        debugger
        yield put({ type: types.INIT_DATA_HOME_SUCCESS, field: 'dataCategory', value: _response.data[0].data.category })
        yield put({ type: types.HANDLE_CHANGE_HOME, data: { field: 'productPromo', value: _response.data[0].data.productPromo, type: 'dashboard' } })
    } catch (error) {
        console.log('error : ', error)
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(types.INIT_DATA_HOME, initDataHome)
    ])
}