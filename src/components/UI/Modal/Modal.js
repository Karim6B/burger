import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }

    render() {
        let style;
        this.props.show ? (style = classes.Show) : (style = classes.Hide);
        return (
            <>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div className={[classes.Modal, style].join(' ')}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;
