import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    componentDidMount() {
        this.props.history.listen(() =>
            this.setState({ showSideDrawer: false })
        );
    }

    sideDrawerOpenHandler = () => {
        this.setState({ showSideDrawer: true });
    };

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    render() {
        return (
            <>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    openSideDrawer={this.sideDrawerOpenHandler}
                />

                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    showSideDrawer={this.state.showSideDrawer}
                    backdropClicked={this.sideDrawerCloseHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token,
    };
};

export default connect(mapStateToProps, null)(withRouter(Layout));
