import {connect} from 'react-redux'
import {ApiService} from "../../services/api";
import {actions} from "../../actions/actions";
import {CitySearch} from "./search";

export default connect(
    state =>
        ({
            status: state.status,
        }),
    {
        onInput: (isSearch) => (dispatch) => dispatch(actions.showSearch(isSearch))
    }
)(CitySearch);
