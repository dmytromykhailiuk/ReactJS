import React, { useCallback } from 'react';
import { Button, Input } from "shared/components";
import { ButtonTypes } from "shared/enums";
import { useInputValue } from 'shared/hooks';
import classes from "./Search.module.scss";

interface SearchPanelProps {
  onChangeSearchingValue?: (searchingValue: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onChangeSearchingValue = () => {} }) => {
  const {value, onChangeValue} = useInputValue('');

  const onButtonClicked = useCallback(() => {
    onChangeSearchingValue(value)
  }, [value])
  
  return (
    <div className={classes.search}>
      <form onSubmit={onButtonClicked} className={classes.search__input}>
        <Input 
          value={value} 
          placeholder="What do you want to watch?"
          onChange={onChangeValue}
        />
      </form>
      <div className={classes.search__button}>
        <a href="#movie-board">
          <Button 
            type={ButtonTypes.PRIMARY} 
            onButtonClicked={onButtonClicked} 
          >
            SEARCH
          </Button>
        </a>
      </div>
    </div>
  )
};

export default SearchPanel;
