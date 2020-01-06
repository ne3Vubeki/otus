import {ADD_GUEST, REMOVE_GUEST, CHANGE_GUEST, FILTER_STATUS, FETCH_GUESTS} from './Types';


const add = guest => ({
    id: guest.id,
    name: guest.name,
    pair: guest.pair,
    path: guest.path,
    open: false,
});

export const actions = {
    addGuest: guest =>
        ({
            type: ADD_GUEST,
            ...add(guest),
        }),
    removeGuest: id =>
        ({
            type: REMOVE_GUEST,
            id: id,
        }),
    changeGuest: guest =>
        ({
            type: CHANGE_GUEST,
            ...guest,
        }),
    filterStatus: (status) =>
        ({
            type: FILTER_STATUS,
            status: status,
        }),
    fetchDatabase: (values) =>
        ({
            type: FETCH_GUESTS,
            list: Object.keys(values).map((item) =>
                ({
                    ...add(values[item]),
                }),
            ),
        }),
};
