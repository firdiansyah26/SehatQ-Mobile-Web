import * as types from '../../../../reduxs/ActionType'

export const onLoginSuccess = (value) => {
    return ({
        type: types.LOGIN_SUCCESS, value
    })
}