import React, { useCallback } from 'react';
import { Button, Input } from 'shared/components';
import { ButtonTypes } from 'shared/enums';
import { useInputValue } from 'shared/hooks';
import classes from './Search.module.scss';

interface SearchPanelProps {
  onChangeSearchingValue: (searchingValue: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onChangeSearchingValue }) => {
  const { value, onChangeValue } = useInputValue('');

  const onSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      onChangeSearchingValue(value);
    },
    [value],
  );

  return (
    <>
      <h1 className={classes.search__title}>FIND YOUR MOVIE</h1>
      <form className={classes.search} onSubmit={onSubmit}>
        <div className={classes.search__input}>
          <Input value={value} name="search" placeholder="What do you want to watch?" onChange={onChangeValue} />
        </div>
        <div className={classes.search__button}>
          <Button type={ButtonTypes.PRIMARY} isSubmit>
            SEARCH
          </Button>
        </div>
      </form>
    </>
  );
};

export default SearchPanel;
