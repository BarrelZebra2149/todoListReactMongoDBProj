// authActions.js
import axios from "axios";

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

const serverURL = "http://localhost:5000/checkLogOn";
export const checkAuthStatus = () => async dispatch => {
    try {
        const response = await axios.get(serverURL, {withCredentials : true});
        const isAuthenticated = response.data.flag;

        if (isAuthenticated) {
            dispatch(signIn());
        } else {
            dispatch(signOut());
        }
    } catch (error) {
        console.error("Error checking auth status", error);
        dispatch(signOut());  // Handle error by signing out the user
    }
};


export const signIn = (user) => {
    return {
        type: SIGN_IN,
        payload: user,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};
