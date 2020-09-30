import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Password',
                    type: 'password',
                    name: 'password',
                    label: 'Password',
                },
                value: '',
                validation: { required: true, minLength: 6 },
                valid: false,
                touched: false,
            },
        },
        isSignUp: true,
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true,
            },
        };
        this.setState({ controls: updatedControls });
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

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp
        );
    };

    switchModeHandler = () => {
        this.setState((prevState) => {
            return { isSignUp: !prevState.isSignUp };
        });
    };

    render() {
        let form = (
            <form onSubmit={this.submitHandler}>
                {Object.keys(this.state.controls).map((key) => {
                    return (
                        <Input
                            invalid={!this.state.controls[key].valid}
                            touched={this.state.controls[key].touched}
                            shouldValidate={this.state.controls[key].validation}
                            key={key}
                            id={key}
                            inputType={this.state.controls[key].elementType}
                            elementConfig={
                                this.state.controls[key].elementConfig
                            }
                            value={this.state.controls[key].value}
                            changed={(event) =>
                                this.inputChangedHandler(event, key)
                            }
                        />
                    );
                })}

                <Button btnType="Success">Submit</Button>
            </form>
        );
        let authForm = this.props.loading ? (
            <Spinner />
        ) : (
            <>
                {form}
                <Button btnType="Danger" clicked={this.switchModeHandler}>
                    Switch to {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
                </Button>
            </>
        );
        let authRedirect = null;
        if (this.props.isAuth && !this.props.building) {
            authRedirect = <Redirect to="/" />;
        } else if (this.props.isAuth && this.props.building) {
            authRedirect = <Redirect to="/checkout" />;
        }
        return (
            <div className={classes.Auth}>
                {this.props.error ? <p>{this.props.error.message}</p> : null}
                {authForm}
                {authRedirect}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuth: state.authReducer.token !== null,
        building: state.burgerBuilderReducer.building,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actionCreators.auth(email, password, isSignup)),
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Auth);
