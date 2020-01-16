import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import {actions} from '../../redux/actions';
import {Home} from './Home';

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
        filterStatus: actions.filterStatus,
        fetchDatabase
    }
)(Home);
