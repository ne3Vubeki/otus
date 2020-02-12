import {DetailView} from './DetailView';
import {connect} from 'react-redux';
import {changeGuest} from '../../redux/actionsSwitcher';

export default connect(
    undefined,
    {
        changeGuest,
    }
)(DetailView);
