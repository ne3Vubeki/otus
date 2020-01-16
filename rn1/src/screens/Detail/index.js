import {Detail} from './Detail';
import {connect} from 'react-redux';
import {changeGuest} from '../../redux/actionsSwitcher';

export default connect(
    null,
    {
        changeGuest,
    }
)(Detail);
