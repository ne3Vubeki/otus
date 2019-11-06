import React, {Component} from 'react';
import {WeatherCity} from "./weather_city";

interface IProps {
    children: any;
    onChoice: (city) => void;
}

export class WeatherLayoutCities extends Component<IProps> {

    constructor(props: IProps) {
        super(props);
        this.handleChoice = this.handleChoice.bind(this);
    }

    handleChoice(city) {
        this.props.onChoice(city);
    }

    render() {
        return <div style={{ width: "30%", float: "right" }}>
            {this.props.children.length ?
                this.props.children.map((city, i) => <WeatherCity onClick={this.handleChoice} key={city.id || i}>{city}</WeatherCity>) :
                <div>Loading cities...</div>}
        </div>;
    }
}
