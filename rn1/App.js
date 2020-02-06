import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import storage from './src/redux/store';
import {theme} from './src/constants/theme';
import Navigation from './src/navigation';

const {store, persistor}  = storage();

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
                <Navigation />
            </ThemeProvider>
        </PersistGate>
    </Provider>
);
export default App;
