import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import {guests, filterStatus} from './reducers'

export const store = createStore(
    combineReducers({guests, filterStatus}),
    applyMiddleware(thunk, logger),
);
