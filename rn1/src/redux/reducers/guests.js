import {ADD_GUEST, CHANGE_GUEST, FETCH_GUESTS, REMOVE_GUEST} from '../types';

const guest = ({ id, name, pair, path, open, comment }) => ({
    id,
    name,
    pair,
    path,
    comment,
    open
});

export default (state = [], action) => {
    switch (action.type) {
        case ADD_GUEST:
            const isEqual = state.some(item => item.id === action.id);
            return !isEqual ? [
                guest(action),
                ...state
            ] : state.map(item => item.id === action.id ? { ...guest(action) } : item);
        case FETCH_GUESTS:
            return [
                ...action.list,
            ];
        case CHANGE_GUEST:
            return state.map(item => item.id === action.id ? { ...guest(action) } : item);
        case REMOVE_GUEST:
            return state.filter(item => item.id !== action.id);
        default:
            return state;
    }

}
