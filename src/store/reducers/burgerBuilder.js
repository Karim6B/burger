import * as actionTypes from '../actions/actionTypes';
import { update } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    building: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return update(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + action.price,
                building: true,
            });

        case actionTypes.REMOVE_INGREDIENT:
            return update(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - action.price,
                building: true,
            });

        case actionTypes.SET_INGREDIENTS:
            return update(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                building: false,
            });

        default:
            return state;
    }
};

export default reducer;
