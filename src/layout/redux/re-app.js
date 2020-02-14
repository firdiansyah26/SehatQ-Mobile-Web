import { getDefaultPath } from "../../utils/urlSync";
import {
    COLLPSE_CHANGE, COLLPSE_OPEN_DRAWER, TOGGLE_ALL, CHANGE_OPEN_KEYS, CHANGE_CURRENT, CLEAR_MENU
} from "../../reduxs/ActionType";
import { getView } from './ac-app'

const preKeys = getDefaultPath();

const initState = {
    collapsed: window.innerWidth > 1220 ? false : true,
    view: getView(window.innerWidth),
    height: window.innerHeight,
    openDrawer: false,
    openKeys: preKeys,
    current: preKeys
};

export default function App(state = initState, action) {
    switch (action.type) {
        case COLLPSE_CHANGE:
            return {
                ...state,
                collapsed: !state.collapsed
            };
        case COLLPSE_OPEN_DRAWER:
            return {
                ...state,
                openDrawer: !state.openDrawer
            };
        case TOGGLE_ALL:
            if (state.view !== action.view || action.height !== state.height) {
                const height = action.height ? action.height : state.height;
                return {
                    ...state,
                    collapsed: action.collapsed,
                    view: action.view,
                    height
                };
            }
            break;
        case CHANGE_OPEN_KEYS:
            return {
                ...state,
                openKeys: action.openKeys
            };
        case CHANGE_CURRENT:
            return {
                ...state,
                current: action.current
            };
        case CLEAR_MENU:
            return {
                ...state,
                openKeys: [],
                current: []
            };
        default:
            return state;
    }
    return state;
}