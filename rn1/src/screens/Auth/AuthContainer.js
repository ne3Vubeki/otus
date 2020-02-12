import {AuthView} from './AuthView';
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
)(AuthView);
