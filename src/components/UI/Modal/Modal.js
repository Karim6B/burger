import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
const modal = (props) => {
  let style;
  props.show ? (style = classes.Show) : (style = classes.Hide);
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={`${classes.Modal} ${style}`}>{props.children}</div>
    </>
  );
};

export default modal;
