import {connect} from 'react-redux'
import {actions} from "../../actions/actions";
import {WeatherCityFull} from "./city_full";
import {ApiService} from "../../services/api";

const api = new ApiService();

export default connect(
    (state, props) =>
        ({
            city: state.city,
            newSearch: props.match.params.name,
            oldSearch: state.search,
            status: state.status,
            isInCities: state.city.id ? state.cities.some(city => city.id === state.city.id) : true,
        }),
    {
        onSelect: city => dispatch => {
            dispatch(actions.validCity());
            dispatch(actions.selectCity(city));
            dispatch(actions.searchCity(city.name));
        },
        onAdd: city => dispatch => {
            dispatch(actions.addCity(city));
            dispatch(actions.searchCity(''));
            dispatch(actions.clearCity());
        },
        onSearch: api.getCity
    }
)(WeatherCityFull);
