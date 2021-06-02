import React, { useCallback } from 'react';
import { Button, Input } from '../../shared/components';
import { ButtonTypes } from '../../shared/enums';
import { useInputValue } from '../../shared/hooks';
import classes from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { MoviesAction } from '../../store';

const SearchPanel = () => {
  const { value, onChangeValue } = useInputValue('');
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      dispatch(MoviesAction.searchMoviesAction({ searchingValue: value, scrollToMovies: () => {} }));
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
          <Button type={ButtonTypes.PRIMARY} isSubmit={true}>
            SEARCH
          </Button>
        </div>
      </form>
    </>
  );
};

export default SearchPanel;
