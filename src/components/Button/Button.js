import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button className="button" onClick={(e) => props.onButtonClick(e)}>
      SUBMIT
    </button>
  );
};

export default Button;
