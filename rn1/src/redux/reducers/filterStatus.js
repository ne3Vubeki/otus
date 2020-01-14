import {FILTER_STATUS} from '../types';

export default (state = 'all', action) => {
    switch (action.type) {
        case FILTER_STATUS:
            return action.status;
        default:
            return state;
    }
}
