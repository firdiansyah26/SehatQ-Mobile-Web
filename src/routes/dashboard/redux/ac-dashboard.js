import * as types from '../../../reduxs/ActionType'

export const handleState = (field, value) => {
    return ({
        type: types.DASHBOARD_HANDLE_STATE,
        field, value
    })
}