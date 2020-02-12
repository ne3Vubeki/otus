import {ProfileView} from './ProfileView';
import {connect} from 'react-redux';
import {changeUser, logoutUser} from '../../redux/actionsSwitcher';

export default connect(
    state =>
        ({
            user: state.user
        }),
    {
        changeUser,
        logoutUser,
    }
)(ProfileView);
