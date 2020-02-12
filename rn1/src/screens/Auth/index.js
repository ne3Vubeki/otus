import {Auth} from './Auth';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/actionsSwitcher';

export default connect(
    state =>
        ({
            user: state.user,
        }),
    {
        loginUser,
    },
)(Auth);
