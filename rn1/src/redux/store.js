import {combineReducers, createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import {user, guests, filterStatus} from './reducers'

const rootReducer = combineReducers({user, guests, filterStatus});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
    let persistor = persistStore(store);
    return { store, persistor }
};
