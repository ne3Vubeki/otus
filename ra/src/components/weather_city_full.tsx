import React from 'react';

interface IProps {
    children: any;
    onAdd: () => void;
    isInCities: boolean;
}

export const WeatherCityFull = ({children, onAdd, isInCities}: IProps) => {

    const ABS_NULL = 273.15;
    if (children) {
        const temp_min = Math.round(children.main.temp_min - ABS_NULL);
        const temp_max = Math.round(children.main.temp_max - ABS_NULL);

        return <div style={{padding: "20px"}}>
            <div style={{background: "#cfcfcf", padding: "20px"}}>
                <h3>
                    {children.name}
                    <button style={{float: "right"}} onClick={onAdd} disabled={isInCities}>
                        +
                    </button>
                </h3>
                <div>
                    <label>{children.weather[0].main}: </label>
                    <span>{children.weather[0].description}</span>
                </div>
                <div>
                    <label>Temperature: </label>
                    <span>{(temp_min > 0 ? '+' : '') + temp_min}C</span>
                    <span>{temp_min !== temp_max ? `...${(temp_max > 0 ? '+' : '') + temp_max}C` : ''}</span>
                </div>
                <div>
                    <label>Pressure: </label>
                    <span>{children.main.pressure}</span>
                </div>
            </div>
        </div>
    }

};
