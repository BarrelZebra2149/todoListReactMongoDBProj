// authReducer.js
import { SIGN_IN, SIGN_OUT } from './authActions';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};
export default authReducer;
