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

    city: string;
    api: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            city: undefined
        };
        this.api = new ApiService();
        this.handleInput = this.handleInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleInput(event: React.FormEvent<HTMLInputElement>) {
        this.city = event.currentTarget.value;
    }

    async handleSearch() {
        if(this.city) {
            try {
                const city = await this.api.getWeather(this.city);
                this.city = '';
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
            <CitySearch changeInput={this.handleInput} onSearch={this.handleSearch} />
            { city ? <WeatherCityFull onAdd={this.handleAdd} isInCities={isInCities}>{city}</WeatherCityFull> : null }
        </div>
    }

}
