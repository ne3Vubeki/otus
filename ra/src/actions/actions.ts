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
});

const select = city => ({
    ...city,
});

export const actions = {
    addCity: city =>
        ({
            type: C.ADD_CITY,
            ...select(city)
        }),
    searchCity: search =>
        ({
            type: C.SEARCH_CITY,
            search: search
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
        }),
    clearCity: () =>
        ({
            type: C.CLEAR_CITY,
            isError: false
        }),
    receivedCity: (city) =>
        ({
            type: C.RECEIVED_CITY,
            ...add(city)
        }),
    initCities: (cities) =>
        ({
            type: C.INIT_CITIES,
            cities: cities.map(city => actions.receivedCity(city)),
        }),
    showSearch: (is) =>
        ({
            type: C.SHOW_SEARCH,
            isSearch: is,
        }),
    validCity: () =>
        ({
            type: C.VALID_CITY,
            isError: '',
        }),
    errorCity: (err) =>
        ({
            type: C.ERROR_CITY,
            isError: err,
        })
};
