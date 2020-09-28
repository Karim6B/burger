import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosOrders from '../../../axios/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActionCreator from '../../../store/actions/index';
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
                validation: { required: true },
                valid: false,
                touched: false,
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
                validation: { required: true },
                valid: false,
                touched: false,
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
                validation: { required: true, minLength: 5, maxLength: 5 },
                valid: false,
                touched: false,
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
                validation: { required: true },
                valid: false,
                touched: false,
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
                validation: { required: true },
                valid: false,
                touched: false,
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
                valid: true,
                validation: {},
            },
        },
        formIsValid: false,
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    orderHandler = async (e) => {
        e.preventDefault();
        let formData = {};
        for (let formElementID in this.state.orderForm) {
            formData[formElementID] = this.state.orderForm[formElementID].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
        };
        this.props.onPurchaseBurger(order);
        this.props.history.push('/');
    };
    inputChangedHandler = (event, id) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[id] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedOrderForm[id] = updatedFormElement;
        let formIsValid = true;
        for (let inputID in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputID].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
        });
    };

    render() {
        let form = (
            <form onSubmit={this.orderHandler}>
                {Object.keys(this.state.orderForm).map((key) => {
                    return (
                        <Input
                            invalid={!this.state.orderForm[key].valid}
                            touched={this.state.orderForm[key].touched}
                            shouldValidate={
                                this.state.orderForm[key].validation
                            }
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

                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}
                >
                    ORDER
                </Button>
            </form>
        );
        if (this.props.loading) {
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

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.loading,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        onPurchaseBurger: (order) => {
            return dispatch(orderActionCreator.purchaseBurger(order));
        },
    };
};

export default connect(mapStateToProps, mapActionsToProps)(ContactData);
