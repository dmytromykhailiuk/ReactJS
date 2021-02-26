import React from 'react';
import { Button, Input } from "shared/components";
import { ButtonTypes } from "shared/enums";
import { useInputValue } from 'shared/hooks';
import classes from "./Search.module.scss";

interface SearchPanelProps {
  onChangeSearchingValue?: (searchingValue: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onChangeSearchingValue = () => {} }) => {
  const {value, onChangeValue} = useInputValue('');
  
  return (
    <div className={classes.search}>
      <div className={classes.search__input}>
        <Input 
          value={value} 
          placeholder="What do you want to watch?"
          onChange={onChangeValue}
        />
      </div>
      <div className={classes.search__button}>
        <Button 
          type={ButtonTypes.PRIMARY} 
          onButtonClicked={() => onChangeSearchingValue(value)} 
        >
          SEARCH
        </Button>
      </div>
    </div>
  )
};

export default SearchPanel;
