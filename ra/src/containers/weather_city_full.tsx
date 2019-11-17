import React from 'react';
import {connect} from 'react-redux'
import {actions} from "../actions/actions";

const WeatherCityFull = ({match, city, isInCities, onAdd }) => {

    const ABS_NULL = 273.15;
    const temp_min = Math.round(city.temp_min - ABS_NULL);
    const temp_max = Math.round(city.temp_max - ABS_NULL);

    if(city.id) {
        return <div style={{padding: "20px"}}>
            <div style={{background: "#cfcfcf", padding: "20px"}}>
                <h3>
                    {city.name}
                    <button style={{float: "right"}} onClick={() => onAdd(city)} disabled={isInCities}>
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
    }
    return null;
};

export const Result = connect(
    (state) =>
        ({
            city: state.city,
            isInCities: state.cities.some(city => city.id === state.city.id)
        }),
    dispatch =>
        ({
            onAdd(city) {
                dispatch(actions.addCity(city));
                dispatch(actions.clearCity());
            }
        })
)(WeatherCityFull);
