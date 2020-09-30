import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('experationTime');
    localStorage.removeItem('userID');
    return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000);
    };
};

export const authSuccess = (token, userID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userID: userID,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const auth = (email, password, isSignUp) => {
    return async (dispatch) => {
        dispatch(authStart());
        const authdata = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATgF2rXQrQoVgnel1zJpX3S0d50MkKpbU';

        if (!isSignUp) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATgF2rXQrQoVgnel1zJpX3S0d50MkKpbU';
        }

        try {
            const response = await axios.post(url, authdata);
            const expirationTime = new Date(
                new Date().getTime() + response.data.expiresIn * 1000
            );
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('experationTime', expirationTime);
            localStorage.setItem('userID', response.data.localId);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        } catch (error) {
            dispatch(authFail(error.response.data.error));
        }
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const expirationTime = new Date(
                localStorage.getItem('experationTime')
            );
            if (expirationTime > new Date()) {
                dispatch(authSuccess(token, localStorage.getItem('userID')));
                dispatch(
                    checkAuthTimeout((expirationTime - new Date()) / 1000)
                );
            } else {
                dispatch(logOut());
            }
        }
    };
};
