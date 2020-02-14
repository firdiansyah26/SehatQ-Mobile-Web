import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from "history"
import reducers from './Reducers.js';
import rootSaga from './Sagas';
import LogRocket from 'logrocket';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

const composeEnhancers = process.env.NODE_ENV !== 'production' ? typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose : compose 

const store = createStore(
    combineReducers({
        ...reducers
    }),
    composeEnhancers(applyMiddleware(...middlewares, LogRocket.reduxMiddleware()))
);
sagaMiddleware.run(rootSaga);

export { store, history };