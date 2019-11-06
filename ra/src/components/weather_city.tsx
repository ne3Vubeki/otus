import React from 'react';

interface IProps {
    children: any;
    onClick: (city) => void
}

export const WeatherCity = ({children, onClick}: IProps) => {

    const ABS_NULL = 273.15;
    if(children) {
        const temp = Math.round(children.main.temp - ABS_NULL);
        const click = () => onClick(children);

        return <div style={{padding: "20px"}} key={children.id}>
            <div onClick={click} style={{background: "#cfcfcf", padding: "20px", cursor: "pointer"}}>
                <h3>{children.name}</h3>
                <div>
                    <span>{(temp > 0 ? '+' : '') + temp}C</span>
                </div>
            </div>
        </div>
    }
};
