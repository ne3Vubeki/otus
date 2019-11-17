import React from 'react';
import {actions} from "../actions/actions";
import {connect} from 'react-redux'

const WeatherCity = ({city, onSelect, onRemove}) => {

    const ABS_NULL = 273.15;
    const temp = Math.round(city.temp - ABS_NULL);

    return <div style={{position: "relative", padding: "20px"}} key={city.id}>
        <button style={{position: "absolute", right: "30px", top: "30px"}} onClick={() => onRemove(city)}>
            x
        </button>
        <div onClick={() => onSelect(city)} style={{background: "#cfcfcf", padding: "20px", cursor: "pointer"}}>
            <h3>
                {city.name}
            </h3>
            <div>
                <span>{(temp > 0 ? '+' : '') + temp}C</span>
            </div>
        </div>
    </div>
};

export const City = connect(
    null,
    dispatch =>
        ({
            onSelect(city) {
                dispatch(actions.selectCity(city));
            },
            onRemove(city) {
                dispatch(actions.removeCity(city));
            }
        })
)(WeatherCity);

