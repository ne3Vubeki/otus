import {C} from "../constants";

export default (state = {}, action) => {
        switch (action.type) {
            case C.ADD_CITY:
            case C.RECEIVED_CITY:
            case C.SELECT_CITY:
            case C.SEARCH_CITY:
                return {
                    id: action.id,
                    name: action.name,
                    clouds: action.clouds,
                    clouds_desc: action.clouds_desc,
                    pressure: action.pressure,
                    temp: action.temp,
                    temp_min: action.temp_min,
                    temp_max: action.temp_max,
                };
            case C.CLEAR_CITY:
                return {};
            default:
                return state;
        }
}
