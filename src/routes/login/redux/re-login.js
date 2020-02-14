import Cookies from 'universal-cookie';
import {
    LOGIN_HANDLE_STATE, LOGIN_SET_DATA, LOGIN_LOGOUT, LOGIN_SET_LOADER
} from "../../../reduxs/ActionType";

const cookies = new Cookies();
const Token = cookies.get('Token')

const initState = {
    username: '',
    password: '',
    isLoading: false,
    dataLogin: {
        access_token: Token !== undefined ? Token : null,
    }
};

export default function Login(state = initState, action) {
    switch (action.type) {
        case LOGIN_SET_LOADER:
            return {
                ...state,
                isLoading: action.value
            };
        case LOGIN_HANDLE_STATE:
            return {
                ...state,
                [action.field]: action.value
            };
        case LOGIN_LOGOUT:
            return {
                ...state,
                dataLogin: {
                    access_token: null,
                }
            };
        case LOGIN_SET_DATA:
            return {
                ...state,
                dataLogin: {
                    access_token: action.value.access_token,
                }
            };
        default:
    }
    return state;
}