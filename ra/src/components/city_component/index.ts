import {connect} from 'react-redux'
import {WeatherCity} from "./city";
import {actions} from "../../actions/actions";

export default connect(
    null,
    (dispatch) =>
        ({
            onRemove() {
                dispatch(actions.removeCity(this));
            }
        })
)(WeatherCity);
