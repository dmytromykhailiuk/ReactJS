import React, { SyntheticEvent } from 'react';
import { ButtonTypes, ButtonSize } from "../../enums";
import classes from "./Button.module.scss";

interface ButtonProps {
  type?: ButtonTypes;
  size?: ButtonSize;
  onButtonClicked?: (event: SyntheticEvent) => void;
}

const Button:React.FC<ButtonProps> = ({children, type = ButtonTypes.PRIMARY, size = ButtonSize.BIG, onButtonClicked = () => {} }) => {
  return (
    <button 
      className={`
        ${classes.button}
        ${classes[type === ButtonTypes.PRIMARY ? "button--primary": "button--secondary"]}
        ${classes[size === ButtonSize.BIG ? "button--big": "button--small"]}
      `}
      onClick={onButtonClicked}
    >
      {children}
    </button>
  )
}

export default Button;
