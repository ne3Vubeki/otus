import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ApiService} from "../services/api";
import {Search} from "../containers/weather_search";
import {Result} from "../containers/weather_city_full";
import {WeatherCityList} from "../components/weather_city_list";

interface IProps {
    cities: any[];
    fetchCities: () => any;
}

class Init extends Component {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount(): void {
        this.props.fetchCities();
    }

    render() {
        return <div>
            <div style={{width: "70%", float: "left"}}>
                <Search/>
                <Result/>
            </div>
            <WeatherCityList cities={this.props.cities}/>
        </div>
    }

}

const api = new ApiService();

export const Weather = connect(
    state =>
        ({
            cities: state.cities
        }),
    {
        fetchCities: api.getCities
    }
)(Init);
