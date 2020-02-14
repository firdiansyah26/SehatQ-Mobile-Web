import {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
    MASTER_HANDLE_STATE,
    MASTER_SET_JENKEL
} from "../../../reduxs/ActionType";

const initState = {
    todos: [
        {
            id: 1,
            name: "aa",
            complate: false
        },
        {
            id: 2,
            name: "bb",
            complate: true
        }
    ],
    form: {
        nama: '',
        alamat: '',
        jenkel: null,
        number: null,
        textarea: null,
        date: null,
        daterange: null,
        radio: null,
        checkbox: null,
        switch: false
    },
    sourceJK: []
};

export default function Master(state = initState, { type, payload, value }) {
    switch (type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, payload]
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => (todo.id === payload) ? { ...todo, complate: !todo.complate } : todo)
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== payload)
            };
        case MASTER_HANDLE_STATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    [payload]: value
                }
            };
        case MASTER_SET_JENKEL:
            return {
                ...state,
                sourceJK: value
            };
        default:
    }
    return state;
}