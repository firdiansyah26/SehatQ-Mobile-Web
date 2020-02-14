import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTodoAction, deleteTodoAction } from './redux/ac-master'

export default () => {
    const todos = useSelector((state) => state.Master.todos);
    const callAction = useDispatch()

    const toggleTodo = (id) =>{
        callAction(toggleTodoAction(id))
    }
    const deleteTodo = (id) =>{
        callAction(deleteTodoAction(id))
    }
    
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id}>
                    <input type="checkbox"
                        checked={todo.complate}
                        onChange={toggleTodo.bind(this, todo.id)}
                    />
                    <span className={todo.complate ? 'complate' : null}>{todo.name}</span>
                    <span className="delete-button" onClick={deleteTodo.bind(this, todo.id)}> X</span>
                </li>
            ))}
        </ul>
    )
}