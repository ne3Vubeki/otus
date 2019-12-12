import React, {Component} from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {WeatherCityList} from "../city_list_component/city_list";
import Result from "../city_full_component";
import Search from "../search_component";

interface IProps {
    cities: any[];
    fetchCities: () => any;
}

export class WeatherInit extends Component<IProps> {

    constructor(props: IProps) {
        super(props);
        props.fetchCities();
    }

    render() {
        return <Router>
            <div style={{width: "70%", float: "left"}}>
                <Search />
                <Switch>
                    <Route path="/:name" children={({match}) => this.props.cities.length ?
                        <Result match={match} cities={this.props.cities}/> : null} />
                </Switch>
            </div>
            <WeatherCityList cities={this.props.cities}/>
        </Router>
    }

}
