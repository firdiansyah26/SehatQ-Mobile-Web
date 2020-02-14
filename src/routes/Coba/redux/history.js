import { createLink } from 'redux-saga-router/react'
 
// Without React Router v4:
import { createBrowserHistory } from 'redux-saga-router';
 
// With the history npm package:
import createBrowserHistory from 'history/createBrowserHistory';
 
const history = createBrowserHistory();
 
export const Link = createLink(history);
export { history };