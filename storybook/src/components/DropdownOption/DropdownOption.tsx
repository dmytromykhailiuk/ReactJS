import React from 'react';
import classnames from 'classnames';
import CheckboxIcon from '../CheckboxIcon/CheckboxIcon';
import classes from './DropdownOption.module.scss';

interface DropdownOptionProps {
  isSelected?: boolean;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({ isSelected = false, children }) => (
  <div className={classes['dropdown-option']}>
    <div
      className={classnames(classes['dropdown-option__checkbox'], {
        [classes['dropdown-option__checkbox--checked']]: isSelected,
      })}
    >
      <div className={classes['dropdown-option__checkbox-icon']}>
        <CheckboxIcon />
      </div>
    </div>
    <div className={classes['dropdown-option__content']}>{children}</div>
  </div>
);

export default DropdownOption;
