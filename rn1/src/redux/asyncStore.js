import AsyncStorage from '@react-native-community/async-storage';
import {STORE_ACTIONS_KEY, STORE_FILTER_STATUS_KEY, STORE_GUESTS_KEY} from '../constants/constants';

export const setStoreGuests = async guests => {
    try {
        await AsyncStorage.setItem(STORE_GUESTS_KEY, JSON.stringify(guests));
    } catch (e) {
        console.log(e);
    }
};

export const getStoreGuests = async () => {
    try {
        return JSON.parse(await AsyncStorage.getItem(STORE_GUESTS_KEY));
    } catch (e) {
        console.log(e);
    }
};

export const setStoreFilter = async status => {
    try {
        await AsyncStorage.setItem(STORE_FILTER_STATUS_KEY, status);
    } catch (e) {
        console.log(e);
    }
};

export const getStoreFilter = async () => {
    try {
        return await AsyncStorage.getItem(STORE_FILTER_STATUS_KEY);
    } catch (e) {
        console.log(e);
    }
};

export const setStoreActions = async (action) => {
    try {
        const actions = await getStoreActions() || [];
        actions.push(action);
        await AsyncStorage.setItem(STORE_ACTIONS_KEY, JSON.stringify(actions));
    } catch (e) {
        console.log(e);
    }
};

export const getStoreActions = async () => {
    try {
        return JSON.parse(await AsyncStorage.getItem(STORE_ACTIONS_KEY));
    } catch (e) {
        console.log(e);
    }
};

export const removeStoreActions = async () => {
    try {
        return await AsyncStorage.removeItem(STORE_ACTIONS_KEY);
    } catch (e) {
        console.log(e);
    }
};
