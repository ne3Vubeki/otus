import {connect} from 'react-redux';
import {Screen} from './Screen';
import {actions} from '../../Actions';

export default connect(
    state =>
        ({
            guests: state.guests,
            filter: state.filter,
            status: state.filterStatus
        }),
    {
        addGuest: (name) => (dispatch) => dispatch(actions.addGuest(name)),
        changeGuest: (guest) => (dispatch) => dispatch(actions.changeGuest(guest)),
        removeGuest: (id) => (dispatch) => dispatch(actions.removeGuest(id)),
        filterGuest: (status) => (dispatch) => dispatch(actions.filterGuest(status)),
        filterStatus: (status) => (dispatch) => dispatch(actions.filterStatus(status))
    }
)(Screen);
