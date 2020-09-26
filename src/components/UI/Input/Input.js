import React from 'react';
import classes from './Input.module.css';
const Input = (props) => {
    let inputElement = null;
    let inputClassses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClassses.push(classes.Invalid);
    }
    switch (props.inputType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClassses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClassses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;

        case 'select':
            inputElement = (
                <select
                    className={inputClassses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement = (
                <input
                    className={inputClassses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
