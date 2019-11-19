import {C} from "../constants";

const add = city => ({
    id: city.id,
    name: city.name,
    clouds: city.weather[0] ? city.weather[0].main : '',
    clouds_desc: city.weather[0] ? city.weather[0].description : '',
    pressure: city.main.pressure,
    temp: city.main.temp,
    temp_min: city.main.temp_min,
    temp_max: city.main.temp_max,
    timestamp: new Date().toString()
});

const select = city => ({
    ...city,
    timestamp: new Date().toString()
});

export const actions = {
    addCity: city =>
        ({
            type: C.ADD_CITY,
            ...select(city)
        }),
    searchCity: city =>
        ({
            type: C.SEARCH_CITY,
            ...add(city)
        }),
    selectCity: city =>
        ({
            type: C.SELECT_CITY,
            ...select(city)
        }),
    removeCity: city =>
        ({
            type: C.REMOVE_CITY,
            id: city.id,
            timestamp: new Date().toString()
        }),
    clearCity: () =>
        ({
            type: C.CLEAR_CITY,
            timestamp: new Date().toString()
        }),
    receivedCity: (city) =>
        ({
            type: C.RECEIVED_CITY,
            loading: false,
            ...add(city)
        }),
    initCities: (cities) =>
        ({
            type: C.INIT_CITIES,
            cities: cities.map(city => actions.searchCity(city)),
            timestamp: new Date().toString()
        }),
    showSearch: (is) =>
        ({
            type: C.SHOW_SEARCH,
            isSearch: is,
            timestamp: new Date().toString()
        })
};
