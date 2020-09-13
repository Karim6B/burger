import React from "react";

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
    <p>Continue to checkout ?</p>
  </>
);

export default orderSummary;
