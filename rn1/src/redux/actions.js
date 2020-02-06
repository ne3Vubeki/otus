import {
    ADD_GUEST,
    CHANGE_GUEST,
    CHANGE_USER,
    FETCH_GUESTS,
    FILTER_STATUS,
    LOGIN_USER,
    LOGOUT_USER,
    REMOVE_GUEST,
} from './types';

const add = ({ id, name, pair, path, comment }) => ({
    id, name, pair, path, comment,
    open: false,
});

const user = (user) => {
    return {
        id: user.uid,
        name: user.displayName || '',
        email: user.email,
        avatar: user.photoURL || ''
    };
};

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
    loginUser: (currentUser) =>
        ({
            type: LOGIN_USER,
            user: user(currentUser)
        }),
    changeUser: (user) =>
        ({
            type: CHANGE_USER,
            user
        }),
    logoutUser: () =>
        ({
            type: LOGOUT_USER
        })
};
