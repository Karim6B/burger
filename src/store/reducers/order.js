import { fetchOrders } from '../actions';
import * as actionTypes from '../actions/actionTypes';
import { update } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const order = { ...action.data, id: action.id };
            return update(state, {
                loading: false,
            });

        case actionTypes.PURCHASE_BURGER_FAIL:
            return update(state, { loading: false });

        case actionTypes.PURCHASE_BURGER_LOADING:
            return update(state, { loading: true });

        case actionTypes.FETCH_ORDERS_SUCCESS:
            const fetchedOrders = [];
            for (let key in action.data) {
                fetchedOrders.push({ id: key, ...action.data[key] });
            }
            return update(state, {
                loading: false,
                orders: fetchedOrders,
                error: null,
            });

        case actionTypes.FETCH_ORDERS_LOADING:
            return update(state, { loading: true });

        case actionTypes.FETCH_ORDERS_FAIL:
            return update(state, {
                loading: false,
                error: action.error,
            });

        default:
            return state;
    }
};

export default reducer;
