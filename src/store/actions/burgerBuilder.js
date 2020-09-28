import * as actionTypes from './actionTypes';
import axiosOrders from '../../axios/axios-orders';

export const addIngredient = (name, price) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
        price: price,
    };
};

export const removeIngredient = (name, price) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
        price: price,
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const initIngredients = () => {
    return async (dispatch) => {
        try {
            const response = await axiosOrders.get('/ingredients.json');
            dispatch(setIngredients(response.data));
        } catch (error) {
            console.log(error);
        }
    };
};
