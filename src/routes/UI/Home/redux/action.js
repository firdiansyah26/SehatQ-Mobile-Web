import * as types from '../../../../reduxs/ActionType'

export const initData = () => {
    return ({
        type: types.INIT_DATA_HOME
    })
}

export const handleState = (field, value) => {
    return ({
        type: types.HANDLE_CHANGE_HOME, value, field
    })
}

export const getDataHome = (field, value) => {
    return ({
        type: types.GET_DATA_HOME, field, value
    })
}

export const dataCart = (value, operator) => {
    return ({
        type: types.DATA_CART_HOME, value, operator
    })
}

export const favData = (value) => {
    return({
        type: types.FAV_DATA_HOME, value
    })
}