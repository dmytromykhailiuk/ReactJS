import React, { SyntheticEvent } from 'react';
import classnames from 'classnames';
import { ButtonTypes, ButtonSize } from '../../enums';
import classes from './Button.module.scss';

export interface ButtonProps {
  type?: ButtonTypes;
  isSubmit?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  style?: React.CSSProperties;
  onButtonClicked?: (event: SyntheticEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = ButtonTypes.PRIMARY,
  size = ButtonSize.BIG,
  onButtonClicked = () => {},
  isSubmit = false,
  disabled = false,
  style = {},
}) => (
  <button
    disabled={disabled}
    type={isSubmit ? 'submit' : 'button'}
    className={`
        ${classes.button} 
        ${classnames({ [classes['button--disabled']]: disabled })} 
        ${classes[type === ButtonTypes.PRIMARY ? 'button--primary' : 'button--secondary']} 
        ${classes[size === ButtonSize.BIG ? 'button--big' : 'button--small']} 
      `}
    style={style}
    onClick={onButtonClicked}
  >
    {children}
  </button>
);

export default Button;
