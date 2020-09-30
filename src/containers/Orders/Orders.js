import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userID);
    }
    render() {
        let orders = null;
        if (this.props.loading) {
            orders = <Spinner />;
        } else if (this.props.error) {
            orders = <p>couldn't fetch orders</p>;
        } else {
            orders = this.props.orders.map((order) => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ));
        }
        return <div>{orders}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        error: state.orderReducer.error,
        token: state.authReducer.token,
        userID: state.authReducer.userID,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, id) => {
            dispatch(actions.fetchOrders(token, id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
