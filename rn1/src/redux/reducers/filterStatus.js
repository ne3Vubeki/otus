import {FILTER_STATUS} from '../types';
import {setStoreFilter} from '../asyncStore';

export default (state = 'all', action) => {
    switch (action.type) {
        case FILTER_STATUS:
            const newState = action.status;
            setStoreFilter(newState);
            return newState;
        default:
            return state;
    }
}
