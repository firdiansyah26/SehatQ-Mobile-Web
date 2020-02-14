import {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TODO
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
    ]
};

export default function Master(state = initState, {type, payload}) {
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
        default:
    }
    return state;
}