import React from 'react';
import City from '../city_component'

export const WeatherCityList = ({cities}) =>
    <div style={{width: "30%", float: "right"}}>
        {cities.length ?
            cities.map(city =>
                <City key={city.id} city={city} />) :
                <div>List is empty...</div>}
    </div>;
