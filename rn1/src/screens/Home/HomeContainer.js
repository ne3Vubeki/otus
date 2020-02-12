import {connect} from 'react-redux';
import {actions} from '../../redux/actions';
import {HomeView} from './HomeView';
import {addGuest, changeGuest, fetchDatabase, removeGuest} from '../../redux/actionsSwitcher';

export default connect(
    state =>
        ({
            user: state.user,
            guests: state.guests,
            status: state.filterStatus
        }),
    {
        addGuest,
        changeGuest,
        removeGuest,
        filterStatus: actions.filterStatus,
        fetchDatabase,
    }
)(HomeView);
