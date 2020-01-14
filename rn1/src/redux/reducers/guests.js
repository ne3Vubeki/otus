import {ADD_GUEST, CHANGE_GUEST, FETCH_GUESTS, REMOVE_GUEST} from '../types';
import {setStoreGuests} from '../asyncStore';

const guest = ({ id, name, pair, path, open, comment }) => ({
    id,
    name,
    pair,
    path,
    comment,
    open
});

export default (state = [], action) => {
    let newState;
    switch (action.type) {
        case ADD_GUEST:
            const isEqual = state.some(item => item.id === action.id);
            newState = !isEqual ? [
                guest(action),
                ...state
            ] : state;
            setStoreGuests(newState);
            return newState;
        case FETCH_GUESTS:
            newState = [
                ...action.list,
            ];
            setStoreGuests(newState);
            return newState;
        case CHANGE_GUEST:
            newState = state.map(item => item.id === action.id ? { ...guest(action) } : item);
            setStoreGuests(newState);
            return newState;
        case REMOVE_GUEST:
            newState = state.filter(item => item.id !== action.id);
            setStoreGuests(newState);
            return newState;
        default:
            return state;
    }

}
