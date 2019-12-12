import React from 'react';
import {Link} from "react-router-dom";

export const WeatherCity = ({city, onRemove}) => {

    const ABS_NULL = 273.15;
    const temp = Math.round(city.temp - ABS_NULL);

    return <div style={{position: "relative", padding: "20px"}} key={city.id}>
        <button style={{position: "absolute", right: "30px", top: "30px"}} onClick={onRemove.bind(city)}>
            x
        </button>
        <Link to={`${city.name}`} style={{display: "block", background: "#cfcfcf", padding: "20px", cursor: "pointer"}}>
            <h3>
                {city.name}
            </h3>
            <div>
                <span>{(temp > 0 ? '+' : '') + temp}C</span>
            </div>
        </Link>
    </div>
};

