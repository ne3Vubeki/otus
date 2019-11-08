import React, {Component} from 'react';
import {ApiService} from "../services/api";
import {WeatherLayoutSearch} from "./weather_layout_search";
import {WeatherLayoutCities} from "./weather_layout_cities";

interface IProps {}

interface IState {
    cities: any[],
    city: any
}

export class Weather extends Component<IProps, IState> {

    citiesName: string[];
    citiesJson: any[];
    api: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            cities: [],
            city: undefined
        };
        this.api = new ApiService();
        this.citiesJson = [];
        this.citiesName = ['Moscow', 'Ryazan', 'Voronezh'];
        this.handlerAdd = this.handlerAdd.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.init(this.citiesName);
        // TODO можно включить автообновление
        // setInterval(() => this.init(this.citiesName), 10 * 60 * 1000);
    }

    init(citiesName) {
        let responses: Promise<any>[] = [];
        citiesName.map(async city => responses.push(this.api.getWeather(city)));
        Promise.all(responses)
            .then(res => this.setState({cities: res.map(init => init || {}) }));
    }

    handlerAdd(city) {
        const { name } = city;
        // сохраняем локально город в списке городов (LocalStorage)
        this.citiesName.unshift(name);
        this.setState({
            cities: [city].concat(this.state.cities),
            city: undefined
        });
    }

    handleChoice(city) {
        this.setState({ city })
    }

    render() {
        return <div>
            <WeatherLayoutSearch onAdd={this.handlerAdd} cities={this.state.cities}>{this.state.city}</WeatherLayoutSearch>
            <WeatherLayoutCities onChoice={this.handleChoice}>{this.state.cities}</WeatherLayoutCities>
        </div>
    }

}
