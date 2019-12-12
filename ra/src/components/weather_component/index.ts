import {connect} from 'react-redux';
import {ApiService} from "../../services/api";
import {WeatherInit} from "./weather";

const api = new ApiService();

export default connect(
    state =>
        ({
            cities: state.cities,
            status: state.status
        }),
    {
        fetchCities: api.getCities
    }
)(WeatherInit);
