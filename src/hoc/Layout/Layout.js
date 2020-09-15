import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerOpenHandler = () => {
        this.setState({ showSideDrawer: true });
    };

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    render() {
        return (
            <>
                <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
                <SideDrawer
                    showSideDrawer={this.state.showSideDrawer}
                    backdropClicked={this.sideDrawerCloseHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </>
        );
    }
}

export default Layout;
