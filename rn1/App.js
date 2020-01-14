import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {Provider} from 'react-redux';
import {theme} from './src/constants/theme';
import Navigation from './src/navigation';
import {store} from './src/redux/store';

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Navigation/>
        </ThemeProvider>
    </Provider>
);
export default App;
