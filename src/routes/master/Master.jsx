import React, { useState, createContext, useReducer } from 'react'

import TodoInput from './TodoInput'
import TodoList from './TodoList'
import HookCounter from './HookCounter';
import HookCounterTwo from './HookCounterTwo';
import HookCounterThree from './HookCounterThree';
import HookCounterFour from './HookCounterFour';
import ClassCounterOne from './ClassCounterOne'
import HookCounterOne from './HookCounterOne';
import ClassMouse from './ClassMouse';
import HookMouse from './HookMouse';
import MouseContainer from './MouseContainer';
import IntervalClassCounter from './IntervalClassCounter';
import IntervalHookContainer from './IntervalHookContainer';
import DataFetching from './DataFetching';
import ComponentC from './ComponentC';
import CounterOne from './CounterOne';
import CounterTwo from './CounterTwo';
import CounterThree from './CounterThree';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import DataFetchingOne from './DataFetchingOne';
import DataFetchingTwo from './DataFetchingTwo';
import ParentComponent from './ParentComponent';
import Counter from './Counter';
import FocusInput from './FocusInput';
import HalamanUtama from './HalamanUtama';

export const UserContext = createContext()
export const ChannelContext = createContext()
export const CountContext = createContext()

const initialState = 0
const reducer = (state, action) => {
    switch (action) {
        case 'increment':
            return state + 1
        case 'decrement':
            return state - 1
        case 'reset':
            return initialState
        default:
            return state
    }
}

function Master() {
    const [count, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            <HalamanUtama />

            {/* <CountContext.Provider value={{countState: count, countDispatch: dispatch}}>
            <div>
                Count - {count}
                <ComponentA />
                <ComponentB />
                <ComponentC />
            </div>
        </CountContext.Provider> */}

            {/* <UserContext.Provider value={'Vishwas'}>
                <ChannelContext.Provider value={'Codevolution'}>
                    <ComponentC />
                </ChannelContext.Provider>
            </UserContext.Provider> */}
            {/* <TodoInput />
                <TodoList /> */}
        </div>
    )
}

export default Master