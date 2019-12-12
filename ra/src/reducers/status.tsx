import {C} from "../constants";

export default (state = {}, action) => {
        switch (action.type) {
            case C.SHOW_SEARCH:
                return {
                    isSearch: action.isSearch
                };
            case C.ERROR_CITY:
                return {
                    isError: action.isError
                };
            default:
                return state;
        }
}
