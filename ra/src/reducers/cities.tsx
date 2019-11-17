import {C} from "../constants";
import city from './city'

export default (state = [], action) => {
    switch (action.type) {
        case C.ADD_CITY:
            return [
                city({}, action),
                ...state
            ];
        case C.REMOVE_CITY:
            return state.filter(item => item.id !== action.id);
        case C.INIT_CITIES:
            return action.cities.map(act => city({}, act));
        default:
            return state;
    }

}
