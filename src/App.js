import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class App extends Component {
    componentDidMount() {
        this.props.onAuthCheck();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" exact component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" exact component={Orders} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/auth" exact component={Auth} />

                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheck: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
