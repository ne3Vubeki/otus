import React from 'react';

export const WeatherCityFull = ({city, newSearch, oldSearch, cities, status, isInCities, onAdd, onSelect, onSearch }) => {

    const add = () => onAdd(city);
    const stateCity = city.name ? city.name.toLowerCase() : '';
    if(newSearch && newSearch.toLowerCase() !== stateCity && newSearch !== oldSearch) {
        const town = cities.filter(item => item.name.toLowerCase() === newSearch.toLowerCase());
        town.length ? onSelect(town[0]) : onSearch(newSearch);
    }
    if(city.id) {
        const ABS_NULL = 273.15;
        const temp_min = Math.round(city.temp_min - ABS_NULL);
        const temp_max = Math.round(city.temp_max - ABS_NULL);
        return <div style={{padding: "20px"}}>
            <div style={{background: "#cfcfcf", padding: "20px"}}>
                <h3>
                    {city.name}
                    <button style={{float: "right"}} onClick={add} disabled={isInCities}>
                        +
                    </button>
                </h3>
                <div>
                    <label>{city.clouds}: </label>
                    <span>{city.clouds_desc}</span>
                </div>
                <div>
                    <label>Temperature: </label>
                    <span>{(temp_min > 0 ? '+' : '') + temp_min}C</span>
                    <span>{temp_min !== temp_max ? `...${(temp_max > 0 ? '+' : '') + temp_max}C` : ''}</span>
                </div>
                <div>
                    <label>Pressure: </label>
                    <span>{city.pressure}</span>
                </div>
            </div>
        </div>
    } else if(status.isError) {
        return <div style={{margin: "40px", color: "red"}}>{status.isError}</div>
    }
    return null;
};
