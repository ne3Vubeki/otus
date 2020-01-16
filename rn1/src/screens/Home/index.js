import {connect} from 'react-redux';
import {actions} from '../../redux/actions';
import {Home} from './Home';
import {addGuest, changeGuest, fetchDatabase, removeGuest} from '../../redux/actionsSwitcher';

export default connect(
    state =>
        ({
            guests: state.guests,
            filter: state.filter,
            status: state.filterStatus
        }),
    {
        addGuest,
        changeGuest,
        removeGuest,
        filterStatus: actions.filterStatus,
        fetchDatabase
    }
)(Home);
