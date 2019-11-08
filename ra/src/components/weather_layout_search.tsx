import React, {Component} from 'react';
import {CitySearch} from "./city_search";
import {ApiService} from "../services/api";
import {WeatherCityFull} from "./weather_city_full";

interface IProps {
    onAdd: (city) => void;
    children: any;
    cities: any[];
 }

interface IState {
    city: any;
}


export class WeatherLayoutSearch extends Component<IProps, IState> {

    api: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            city: undefined
        };
        this.api = new ApiService();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    async handleSearch(citySearch) {
        if(citySearch) {
            try {
                const city = await this.api.getWeather(citySearch);
                this.setState({ city });
            } catch (err) {
                console.log(err);
            }
        }
    }

    handleAdd() {
        if(this.state.city) {
            this.props.onAdd(this.state.city);
            this.setState({ city: undefined });
        }
    }

    render() {
        const city: any = this.state.city || this.props.children;
        const isInCities = !!city ? this.props.cities.some(item => item.id === city.id) : false;
        return <div style={{ width: "70%", float: "left" }}>
            <CitySearch onSearch={this.handleSearch} />
            { city ? <WeatherCityFull onAdd={this.handleAdd} isInCities={isInCities}>{city}</WeatherCityFull> : null }
        </div>
    }

}
