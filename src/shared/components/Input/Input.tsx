import React, { ChangeEvent } from 'react';
import classes from "./Input.module.scss";

interface InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  value = '', 
  placeholder = '', 
  onChange = () => {}
}) => {
  return (
    <input
      className={classes.input}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
};

export default Input;
