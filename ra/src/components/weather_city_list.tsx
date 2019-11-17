import React from 'react';
import {City} from "../containers/weather_city";

export const WeatherCityList = ({cities}) =>
    <div style={{width: "30%", float: "right"}}>
        {cities.length ?
            cities.map((city, i) =>
                <City key={city.id || i} city={city} />) :
                <div>List is empty...</div>}
    </div>;
