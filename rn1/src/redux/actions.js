import {ADD_GUEST, CHANGE_GUEST, FETCH_GUESTS, FILTER_STATUS, REMOVE_GUEST} from './types';

const add = ({ id, name, pair, path, comment }) => ({
    id,
    name,
    pair,
    path,
    comment,
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
            id,
        }),
    changeGuest: guest =>
        ({
            type: CHANGE_GUEST,
            ...guest,
        }),
    filterStatus: (status) =>
        ({
            type: FILTER_STATUS,
            status,
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
