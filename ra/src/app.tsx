import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import {cities, city, status, search} from "./reducers";
import Weather from './components/weather_component'


const store = createStore(
    combineReducers({city, cities, status, search}),
    applyMiddleware(thunk, logger)
);

export class App extends Component {
    render() {
        return <Provider store={store}>
            <Weather />
        </Provider>
    }
}
