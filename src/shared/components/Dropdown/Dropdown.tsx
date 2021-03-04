import { Categories } from "shared/enums";
import React, { useCallback, useState } from "react";
import classes from "./Dropdown.module.scss";
import { useField } from "formik";
import { DropdownOption } from "../DropdownOption";
import { useClickOutside } from "shared/hooks";

interface DropdownProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: Categories[];
  error?: string | string[];
}

const Dropdown: React.FC<DropdownProps> = ({ name, options, label = '', placeholder = '', error = '' }) => {
  const [isOpened, setIsOpenedValue] = useState(false);
  const [_, { value: selectedValue }, {setTouched, setValue}] = useField(name);

  const onTrigerDropdownOptions = useCallback(() => {
    setIsOpenedValue(!isOpened);
    if (isOpened) {
      setTouched(selectedValue, true);
    }
  }, [isOpened, selectedValue])

  const onHideDropdownOptions = useCallback(() => {
    setIsOpenedValue(false);
    setTouched(selectedValue, true);
  }, [selectedValue])

  useClickOutside(classes.dropdown, onHideDropdownOptions, isOpened);

  const onToggleOption = useCallback((option: Categories) => {
    const index = selectedValue.indexOf(option);
    setValue(index === -1 ? [...selectedValue, option] : [...selectedValue.slice(0, index), ...selectedValue.slice(index + 1)])
  }, [selectedValue])

  return (
    <div className={classes.dropdown}>
      <div onClick={onTrigerDropdownOptions}>
        { label && <div className={classes.dropdown__label}>{ label }</div> }
        <div
          className={`${classes.dropdown__field} ${selectedValue.length ? '' : classes["dropdown__field--placeholder"]} ${!error ? '' : classes["dropdown__field--error"]}`}
        >
          { selectedValue.length ? selectedValue.join(' ') : placeholder }
          <div className={classes[isOpened ? "dropdown__arrow-up" : "dropdown__arrow-down"]}></div>
        </div>
      </div>
      <div className={classes.dropdown__error}>
        {!isOpened && error }
      </div>
      <div className={classes["dropdown__options-wrapper"]}>
        { isOpened && <div className={classes.dropdown__options}>
          { options.map(option => (
            <span key={option} onClick={() => onToggleOption(option)}>
              <DropdownOption
                isSelected={selectedValue.includes(option)}
              >
                { option }
              </DropdownOption>
            </span>
          )) }
        </div> }
      </div>
    </div>
  )
}

export default Dropdown;
