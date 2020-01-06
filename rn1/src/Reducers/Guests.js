import {ADD_GUEST, REMOVE_GUEST, CHANGE_GUEST, FETCH_GUESTS} from '../Types';

const guest = (guest) => ({
    id: guest.id,
    name: guest.name,
    pair: guest.pair,
    path: guest.path,
    open: guest.open
});

export default (state = [], action) => {
    switch (action.type) {
        case ADD_GUEST:
            return [
                guest(action),
                ...state
            ];
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
