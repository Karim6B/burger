import * as actionTypes from './actionTypes';
import axiosOrders from '../../axios/axios-orders';

export const purchaseBurgerSuccess = (orderID, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: orderID,
        data: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerLoading = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_LOADING,
    };
};

export const purchaseBurger = (orderData, token) => {
    return async (dispatch) => {
        dispatch(purchaseBurgerLoading());
        try {
            const response = await axiosOrders.post(
                `/orders.json?auth=${token.toString()}`,
                orderData
            );

            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        } catch (error) {
            dispatch(purchaseBurgerFail(error));
        }
    };
};

export const fetchOrdersSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        data: data,
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrdersLoading = () => {
    return {
        type: actionTypes.FETCH_ORDERS_LOADING,
    };
};

export const fetchOrders = (token, userID) => {
    return async (dispatch) => {
        dispatch(fetchOrdersLoading());
        const queryParams = `?auth=${token.toString()}&orderBy="userID"&equalTo="${userID.toString()}"`;
        try {
            let orders = await axiosOrders.get('/orders.json' + queryParams);
            console.log(orders.data);
            dispatch(fetchOrdersSuccess(orders.data));
        } catch (error) {
            dispatch(fetchOrdersFail(error));
        }
    };
};
