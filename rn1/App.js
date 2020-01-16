import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {theme} from './src/constants/theme';
import Home from './src/screens/Home';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Home/>
    </ThemeProvider>
  </Provider>
);
export default App;
