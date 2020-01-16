import AsyncStorage from '@react-native-community/async-storage';
import {STORE_ACTIONS_KEY} from '../constants/constants';

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
