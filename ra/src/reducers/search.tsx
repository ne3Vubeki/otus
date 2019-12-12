import {C} from "../constants";

export default (state = {}, action) => {
        switch (action.type) {
            case C.SEARCH_CITY:
                return action.search;
            default:
                return state;
        }
}
