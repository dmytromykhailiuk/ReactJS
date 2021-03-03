import React from 'react';
import { CheckboxIcon } from '../';
import classes from "./DropdownOption.module.scss";

interface DropdownOptionProps {
  isSelected?: boolean;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({ isSelected = false, children }) => {
  return (
    <div className={classes["dropdown-option"]}>
      <div 
        className={`${classes["dropdown-option__checkbox"]} ${isSelected ? classes["dropdown-option__checkbox--checked"] : ''}`}
      >
        <div className={classes["dropdown-option__checkbox-icon"]}>
          <CheckboxIcon />
        </div>
      </div>
      <div className={classes["dropdown-option__content"]}>{ children }</div>
    </div>
  )
}

export default DropdownOption;
