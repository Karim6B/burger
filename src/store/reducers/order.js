import * as actionTypes from '../actions/actionTypes';
import { update } from '../utility';

const initialState = {
    orders: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const order = { ...action.data, id: action.id };
            return update(state, {
                orders: state.orders.concat(order),
                loading: false,
            });

        case actionTypes.PURCHASE_BURGER_FAIL:
            return update(state, { loading: false });

        case actionTypes.PURCHASE_BURGER_LOADING:
            return update(state, { loading: true });

        default:
            return state;
    }
};

export default reducer;
