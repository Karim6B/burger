import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosOrders from '../../../axios/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your Name',
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                },
                value: '',
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your address',
                    type: 'text',
                    name: 'address',
                    label: 'Address',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'ZIP Code',
                    type: 'text',
                    name: 'zipcode',
                    label: 'ZIP Code',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your Country',
                    type: 'text',
                    name: 'country',
                    label: 'Country',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your E-mail',
                    type: 'email',
                    name: 'mail',
                    label: 'E-Mail',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ],
                },
                value: 'fastest',
            },
        },
        loading: false,
    };

    orderHandler = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let formData = {};
        for (let formElementID in this.state.orderForm) {
            formData[formElementID] = this.state.orderForm[formElementID].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
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
    inputChangedHandler = (event, id) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[id] };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[id] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    };

    render() {
        let form = (
            <form onSubmit={this.orderHandler}>
                {Object.keys(this.state.orderForm).map((key) => {
                    return (
                        <Input
                            key={key}
                            id={key}
                            inputType={this.state.orderForm[key].elementType}
                            elementConfig={
                                this.state.orderForm[key].elementConfig
                            }
                            value={this.state.orderForm[key].value}
                            changed={(event) =>
                                this.inputChangedHandler(event, key)
                            }
                        />
                    );
                })}

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
