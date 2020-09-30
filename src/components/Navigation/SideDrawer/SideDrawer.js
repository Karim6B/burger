import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
const sideDrawer = (props) => {
    return (
        <>
            <Backdrop
                show={props.showSideDrawer}
                clicked={props.backdropClicked}
            />
            <div
                className={[
                    classes.SideDrawer,
                    props.showSideDrawer ? classes.Open : classes.Close,
                ].join(' ')}
            >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;
