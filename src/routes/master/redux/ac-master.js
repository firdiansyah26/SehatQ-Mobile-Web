import * as types from '../../../reduxs/ActionType'

export const addTodoAction = (todo) => {
    return ({
        type: types.ADD_TODO,
        payload: todo
    })
}

export const toggleTodoAction = (todoId) => {
    return ({
        type: types.TOGGLE_TODO,
        payload: todoId
    })
}

export const deleteTodoAction = (todoId) => {
    return ({
        type: types.DELETE_TODO,
        payload: todoId
    })
}

export const handleState = (payload, value) => {
    return ({
        type: types.MASTER_HANDLE_STATE,
        payload, value
    })
}
export const setJK = (value) => {
    return ({
        type: types.MASTER_SET_JENKEL,
        value
    })
}