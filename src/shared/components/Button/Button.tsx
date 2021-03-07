import React, { SyntheticEvent } from 'react';
import { ButtonTypes, ButtonSize } from "../../enums";
import classes from "./Button.module.scss";
import classnames from "classnames";

interface ButtonProps {
  type?: ButtonTypes;
  isSubmit?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  onButtonClicked?: (event: SyntheticEvent) => void;
}

const Button:React.FC<ButtonProps> = ({
  children, type = ButtonTypes.PRIMARY, size = ButtonSize.BIG, onButtonClicked = () => {}, isSubmit = false, disabled = false 
}) => {
  return (
    <button 
      disabled={disabled}
      type={isSubmit ? "submit" : "button"}
      className={`
        ${classes.button} 
        ${classnames({[classes["button--disabled"]]: disabled})} 
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
