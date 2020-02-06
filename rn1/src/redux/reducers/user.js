import {CHANGE_USER, LOGIN_USER, LOGOUT_USER} from '../types';

export default (state = null, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...action.user };
        case CHANGE_USER:
            return { ...action.user };
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
}
