import * as types from '../../../reduxs/ActionType'

export const balik = (data) => {
    return ({
        type: types.BACK_LOGIN,
        payload: data
    })
}