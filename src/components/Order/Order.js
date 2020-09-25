import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    let ingredientsArr = [];
    Object.keys(props.ingredients).map((key) => {
        ingredientsArr.push({ name: key, amount: props.ingredients[key] });
    });

    const ingredientsOutput = ingredientsArr.map((el) => {
        return (
            <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                }}
                key={el.name}
            >
                {el.name} ({el.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>
                Ingredients:
                {ingredientsOutput}
            </p>
            <p>
                Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default Order;
