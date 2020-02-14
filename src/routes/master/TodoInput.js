import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoAction } from './redux/ac-master'

export default () => {
    const [todo, setTodo] = useState('')
    const callAction = useDispatch()
    const onChange = event => {
        setTodo(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (todo.trim() === '') return
        callAction(addTodoAction({
            id: 5,
            name: todo,
            complate: false
        }))
        setTodo('');
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text"
                name="todo"
                placeholder="Add a todo"
                value={todo}
                onChange={onChange}
            />
            <button type="submit">Add Todo</button>
        </form>
    )
}