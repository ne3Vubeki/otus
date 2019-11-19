import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import {cities, city, status} from "./reducers";
import {Weather} from "./containers/weather";


const store = createStore(
    combineReducers({city, cities, status}),
    applyMiddleware(thunk, logger)
);

export class App extends Component {
    render() {
        return <Provider store={store}>
            <Weather />
        </Provider>
    }
}
