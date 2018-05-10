/**
 * @flow
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
  // TODO: if necessary, use this to add reducers
});

const middleware = [
  // TODO: if necessary, use this to add middleware
];

const composer = __DEV__ ? composeWithDevTools : compose;
const store = createStore(reducers, composer(applyMiddleware(...middleware)));

export default store;

