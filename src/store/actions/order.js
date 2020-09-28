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

export const purchaseBurger = (orderData) => {
    return async (dispatch) => {
        dispatch(purchaseBurgerLoading());
        try {
            const response = await axiosOrders.post('/orders.json', orderData);

            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        } catch (error) {
            dispatch(purchaseBurgerFail(error));
        }
    };
};
