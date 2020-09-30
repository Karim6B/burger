import React from 'react';
import classes from './BuildContols.module.css';
import BuildContol from './BuildControl/BuildControl';
const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
];
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>
                current price: <strong>{props.price.toFixed(2)}</strong>
            </p>
            {controls.map((ig) => (
                <BuildContol
                    key={ig.label}
                    label={ig.label}
                    addedIngredient={() => props.addIngredient(ig.type)}
                    removedIngredient={() => props.removeIngredient(ig.type)}
                    disable={props.disabled[ig.type]}
                />
            ))}
            <button
                onClick={props.ordered}
                className={classes.OrderButton}
                disabled={!props.purchasable}
            >
                {props.isAuth ? 'ORDER NOW' : 'SIGN-UP to order'}
            </button>
        </div>
    );
};

export default buildControls;
