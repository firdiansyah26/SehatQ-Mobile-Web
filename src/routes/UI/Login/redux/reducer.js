import {
    LOGIN_SUCCESS,
    HANDLE_CHANGE_HOME
} from '../../../../reduxs/ActionType'


const initState = {
    access_token: null,
    profile: {

    }
}


export default function LoginState(state = initState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('access_token', action.value._token.accessToken)
            return {
                ...state,
                access_token: action.value._token.accessToken,
                profile: action.value._profile
            }
        case HANDLE_CHANGE_HOME:
            if (action.type == 'form') {

            }
            else {
                return ({
                    ...state, [action.field]: action.value
                })
            }

        default:
    }
    return state
}