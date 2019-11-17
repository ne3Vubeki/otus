import {C} from "../constants";

export default (state = {}, action) => {
        switch (action.type) {
            case C.SHOW_SEARCH:
                return {
                    isSearch: action.isSearch
                };
            default:
                return state;
        }
}
