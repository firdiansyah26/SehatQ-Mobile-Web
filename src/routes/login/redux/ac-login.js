import * as types from '../../../reduxs/ActionType'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setLoader = (value) => {
    return ({
        type: types.LOGIN_SET_LOADER,
        value
    })
}
export const handleState = (field, value) => {
    return ({
        type: types.LOGIN_HANDLE_STATE,
        field, value
    })
}
export const postLogin = () => {
    return ({
        type: types.LOGIN_POST_DATA
    })
}
export const setDataLogin = (data) => {
    return ({
        type: types.LOGIN_SET_DATA,
        value:data
    })
}
export const logout = () => {
    cookies.remove("Token", { path: '/' })
    return ({
        type: types.LOGIN_LOGOUT,
        paylod: null
    })
}