import React from "react";
import Button from "../../UI/Button/Button";
const orderSummary = (props) => (
  <>
    <h3>Your Order:</h3>
    <p>Delicious burger with the following ingredients:</p>
    <ul>
      {Object.keys(props.order).map((ig) => (
        <li key={ig}>
          <span style={{ textTransform: "capitalize" }}>{ig}</span>:
          {props.order[ig]}
        </li>
      ))}
    </ul>
    <p>
      <strong>Total Price is {props.total.toFixed(2)} $</strong>
    </p>
    <p>Continue to checkout ?</p>
    <Button clicked={props.purchaseCancel} btnType="Danger">
      CANCEL
    </Button>
    <Button clicked={props.purchaseContinue} btnType="Success">
      CONTINUE
    </Button>
  </>
);

export default orderSummary;
