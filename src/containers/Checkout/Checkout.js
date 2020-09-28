import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                {this.props.ings ? (
                    <>
                        <CheckoutSummary
                            ingredients={this.props.ings}
                            onCheckoutCancel={this.checkoutCancelHandler}
                            onCheckoutContinue={this.checkoutContinueHandler}
                        />
                        <Route
                            path={this.props.match.path + '/contact-data'}
                            component={ContactData}
                        />
                    </>
                ) : (
                    <Redirect to="/" />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { ings: state.burgerBuilderReducer.ingredients };
};

export default connect(mapStateToProps, null)(Checkout);
