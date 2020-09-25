import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosOrders from '../../axios/axios-orders';

class Orders extends Component {
    state = {
        loading: true,
        orders: [],
    };

    async componentDidMount() {
        let orders = await axiosOrders.get('/orders.json');
        this.setState({ loading: false });
        const fetchedOrders = [];
        for (let key in orders.data) {
            fetchedOrders.push({ id: key, ...orders.data[key] });
        }
        this.setState({ orders: fetchedOrders });
    }
    render() {
        return (
            <div>
                {this.state.orders.map((order) => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default Orders;
