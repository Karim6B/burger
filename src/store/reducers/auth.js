import * as actionTypes from '../actions/actionTypes';
import { update } from '../utility';
const initialState = { token: null, userID: null, error: null, loading: false };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return update(state, { error: null, loading: true });

        case actionTypes.AUTH_SUCCESS:
            return update(state, {
                error: null,
                loading: false,
                token: action.token,
                userID: action.userID,
            });

        case actionTypes.AUTH_FAIL:
            return update(state, { error: action.error, loading: false });

        case actionTypes.AUTH_LOGOUT:
            return update(state, { token: null, userID: null });

        default:
            return state;
    }
};

export default reducer;
