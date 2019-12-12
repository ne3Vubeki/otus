const guest = (guest) => ({
    id: guest.id,
    name: guest.name,
    pair: guest.pair,
    open: guest.open
});

export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_GUEST':
            return [
                guest(action),
                ...state
            ];
        case 'CHANGE_GUEST':
            return state.map(item => item.id === action.id ? { ...guest(action) } : item);
        case 'REMOVE_GUEST':
            return state.filter(item => item.id !== action.id);
        default:
            return state;
    }

}
