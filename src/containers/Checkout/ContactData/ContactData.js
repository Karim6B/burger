import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosOrders from '../../../axios/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: { street: '', postalCode: '' },
        loading: false,
    };

    orderHandler = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Karim',
                address: {
                    street: 'test',
                    zipCode: 35511,
                    country: 'Egypt',
                },
                email: 'asfdas@asfsf.com',
            },
        };
        try {
            const response = await axiosOrders.post('/orders.json', order);
            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
        }
        this.props.history.push('/');
    };

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="your name" />
                <input type="email" name="email" placeholder="your email" />
                <input type="text" name="street" placeholder="your street" />
                <input
                    type="text"
                    name="postal"
                    placeholder="your postal code"
                />

                <Button btnType="Success" clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
