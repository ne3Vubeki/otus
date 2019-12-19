import {connect} from 'react-redux';
import {Screen} from './Screen';
import {actions} from '../../Actions';
import database from '@react-native-firebase/database';

const ref = database().ref(`/guests`);

const addGuest = (guest) => async (dispatch) => {
    ref.push({
        id: new Date().getTime(),
        ...guest
    });
};

const updateGuest = (guest) => async (dispatch) => {
    const child = ref.child(guest.path);
    const newGuest = { ...guest };
    delete newGuest.path;
    delete newGuest.open;
    child.set(newGuest);
};

const removeGuest = (path) => async (dispatch) => {
    const child = ref.child(path);
    child.remove();
};

const fetchDatabase = () => async (dispatch) => {
    // const snapshot = await ref.once('value');
    // console.log(snapshot.val());
    // dispatch(actions.fetchDatabase(snapshot.val() || []));

    ref.on('child_added', (newValue) => {
        const guest = { ...newValue.val(), path: newValue.key };
        dispatch(actions.addGuest(guest))
    });
    ref.on('child_changed', (newValue) => {
        const guest = { ...newValue.val(), path: newValue.key };
        dispatch(actions.changeGuest(guest))
    });
    ref.on('child_removed', (newValue) => dispatch(actions.removeGuest(newValue.val().id)));
};

export default connect(
    state =>
        ({
            guests: state.guests,
            filter: state.filter,
            status: state.filterStatus
        }),
    {
        addGuest: addGuest,
        changeGuest: updateGuest,
        removeGuest: removeGuest,
        filterStatus: (status) => (dispatch) => dispatch(actions.filterStatus(status)),
        fetchDatabase: fetchDatabase
    }
)(Screen);
