import {Detail} from './Detail';
import {connect} from 'react-redux';
import {actions} from '../../redux/actions';

export default connect(
    state =>
        null,
    {
        changeGuest: (guest) => actions.changeGuest(guest),
    }
)(Detail);
