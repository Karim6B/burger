import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('Order summary Did update');
    }

    render() {
        return (
            <>
                <h3>Your Order:</h3>
                <p>Delicious burger with the following ingredients:</p>
                <ul>
                    {Object.keys(this.props.order).map((ig) => (
                        <li key={ig}>
                            <span style={{ textTransform: 'capitalize' }}>
                                {ig}
                            </span>
                            :{this.props.order[ig]}
                        </li>
                    ))}
                </ul>
                <p>
                    <strong>
                        Total Price is {this.props.total.toFixed(2)} $
                    </strong>
                </p>
                <p>Continue to checkout ?</p>
                <Button clicked={this.props.purchaseCancel} btnType="Danger">
                    CANCEL
                </Button>
                <Button clicked={this.props.purchaseContinue} btnType="Success">
                    CONTINUE
                </Button>
            </>
        );
    }
}

export default OrderSummary;
