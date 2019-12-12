import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {Provider} from 'react-redux';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import {guests, filterStatus} from './src/Reducers'
import MainScreen from './src/Components/Screen';

const theme = {
  colors: {
    // primary: 'red',
  },
  Button: {
    raised: true,
    // titleStyle: {
    //   color: 'blue',
    // },
  },
};

const store = createStore(
  combineReducers({guests, filterStatus}),
  applyMiddleware(thunk, logger),
);

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MainScreen/>
    </ThemeProvider>
  </Provider>
);
export default App;
