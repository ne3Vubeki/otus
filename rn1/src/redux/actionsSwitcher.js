import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {
    getStoreActions,
    removeStoreActions,
    setStoreActions,
} from './asyncStore';
import {ADD_GUEST, CHANGE_GUEST, REMOVE_GUEST} from './types';
import {actions} from './actions';
import NetInfo from '@react-native-community/netinfo';
import {Platform} from 'react-native';

const ref = database().ref(`/guests`);
let netState;

export const addGuest = (guest) => async (dispatch) => {
    const newGuest = {
        id: new Date().getTime(),
        ...guest,
    };
    if (netState.isConnected) {
        ref.push(newGuest);
    } else {
        await setStoreActions({
            type: ADD_GUEST,
            guest: newGuest,
        });
        dispatch(actions.addGuest(newGuest));
    }
};

export const changeGuest = (guest) => async (dispatch) => {
    if (netState.isConnected) {
        updateGuestBase(guest);
    } else {
        await setStoreActions({
            type: CHANGE_GUEST,
            guest,
        });
        dispatch(actions.changeGuest(guest));
    }
};

const updateGuestBase = (guest) => {
    const child = ref.child(guest.path);
    const newGuest = {...guest};
    delete newGuest.path;
    child.set(newGuest);
};

export const removeGuest = (guest) => async (dispatch) => {
    if (netState.isConnected) {
        removeGuestBase(guest.path);
    } else {
        await setStoreActions({
            type: REMOVE_GUEST,
            path: guest.path,
        });
        dispatch(actions.removeGuest(guest.id));
    }
};

const removeGuestBase = (path) => {
    const child = ref.child(path);
    child.remove();
};

export const fetchDatabase = () => async (dispatch) => {
    // const snapshot = await ref.once('value');
    netState = await NetInfo.fetch();
    NetInfo.addEventListener(async state => {
        const queueActions = await getStoreActions();
        netState = state;
        if (netState.isConnected && (queueActions && queueActions.length)) {
            queueActions.map(action => {
                switch (action.type) {
                    case ADD_GUEST:
                        ref.push(action.guest);
                        break;
                    case CHANGE_GUEST:
                        updateGuestBase(action.guest);
                        break;
                    case REMOVE_GUEST:
                        removeGuestBase(action.path);
                        break;
                    default:
                        break;
                }
            });
            await removeStoreActions();
        }
    });

    ref.on('child_added', async (newValue) => {
        const guest = {...newValue.val(), path: newValue.key};
        dispatch(actions.addGuest(guest));
    });

    ref.on('child_changed', (newValue) => {
        const guest = {...newValue.val(), path: newValue.key};
        dispatch(actions.changeGuest(guest));
    });

    ref.on('child_removed', (newValue) => {
        dispatch(actions.removeGuest(newValue.val().id));
    });
};

export const loginUser = (mail, pass, navigation) => async (dispatch) => {
    if (mail && pass) {
        try {
            const {user} = await auth().signInWithEmailAndPassword(mail, pass);
            dispatch(actions.loginUser(user));
            navigation.navigate('Main');
        } catch (e) {
            console.error(e.message);
        }
    }
};

export const logoutUser = (navigation) => async (dispatch) => {
    try {
        await auth().signOut();
        dispatch(actions.logoutUser());
        navigation.navigate('Login');
    } catch (e) {
        console.error(e.message);
    }
};

export const changeUser = (currentUser, type) => async (dispatch) => {
    try {
        const user = await auth().currentUser;
        if (!type || type === -1) {
            await user.updateProfile({
                displayName: currentUser.name,
            });
        }
        if (!type || type === 1) {
            const uploadUri = Platform.OS === 'ios' ? currentUser.avatar.replace('file://', '') : currentUser.avatar;
            const uploadRef = storage().ref(`/${currentUser.email}.jpeg`);
            if(!!uploadUri) {
                await uploadRef.putFile(uploadUri);
                currentUser.avatar = await uploadRef.getDownloadURL();
            } else  {
                await uploadRef.delete();
                currentUser.avatar = '';
            }
            await user.updateProfile({
                photoURL: currentUser.avatar,
            });
        }
        dispatch(actions.changeUser(currentUser));
    } catch (e) {
        console.error(e.message);
    }
};

