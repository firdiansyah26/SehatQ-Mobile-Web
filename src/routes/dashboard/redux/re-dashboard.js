import {
    DASHBOARD_HANDLE_STATE,
} from "../../../reduxs/ActionType";

const initState = {
    form: {
        nama: '',
        alamat: ''
    },
    furniture_styles: [],
};

export default function Dashboard(state = initState, action) {
    switch (action.type) {
        case DASHBOARD_HANDLE_STATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field] : action.value
                }
            };
        default:
    }
    return state;
}