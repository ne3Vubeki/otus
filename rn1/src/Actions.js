const add = guest => ({
    id: new Date().getTime(),
    name: guest.name,
    pair: guest.pair,
    open: false
});

export const actions = {
    addGuest: guest =>
        ({
            type: 'ADD_GUEST',
            ...add(guest)
        }),
    removeGuest: id =>
        ({
            type: 'REMOVE_GUEST',
            id: id,
        }),
    changeGuest: guest =>
        ({
            type: 'CHANGE_GUEST',
            ...guest,
        }),
    filterGuest: (guests, status) =>
        ({
            type: 'FILTER_GUEST',
            status: status,
            guests: [...guests]
        }),
    filterStatus: (status) =>
        ({
            type: 'FILTER_STATUS',
            status: status,
        })
};
