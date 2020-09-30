import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrders from '../../axios/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import { connect } from 'react-redux';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};
class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
    };
    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key];
            })
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    };

    purchaseHandler = () => {
        return this.props.isAuth
            ? this.setState({ purchasing: true })
            : this.props.history.push('/auth');
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = async () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = { ...this.props.ings };
        let orderSummary = null;

        let burgerComponents = <Spinner />;

        if (this.props.ings) {
            orderSummary = (
                <OrderSummary
                    order={this.props.ings}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    total={this.props.totalPrice}
                />
            );

            burgerComponents = (
                <>
                    <Modal
                        show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}
                    >
                        {orderSummary}
                    </Modal>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isAuth={this.props.isAuth}
                        addIngredient={this.props.addedIngredient}
                        removeIngredient={this.props.removedIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return burgerComponents;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        isAuth: state.authReducer.token,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        addedIngredient: (ingName) =>
            dispatch(
                burgerBuilderActions.addIngredient(
                    ingName,
                    INGREDIENT_PRICES[ingName]
                )
            ),
        removedIngredient: (ingName) =>
            dispatch(
                burgerBuilderActions.removeIngredient(
                    ingName,
                    INGREDIENT_PRICES[ingName]
                )
            ),
        onInitIngredients: () =>
            dispatch(burgerBuilderActions.initIngredients()),
    };
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withErrorHandler(BurgerBuilder, axiosOrders));
