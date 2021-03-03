import React, { useEffect, useMemo } from 'react';
import classes from './MovieMenu.module.scss';
import CloseMenuButton from 'shared/components/CloseMenuButton/CloseMenuButton';
import { clickOutside } from 'shared/helpers';

interface MovieMenuProps {
  uniqueClass: string;
  onCloseButtonClicked?: () => void;
  onEditButtonClicked?: () => void;
  onDeleteButtonClicked?: () => void;
}

const MovieMenu: React.FC<MovieMenuProps> = ({
  uniqueClass,
  onCloseButtonClicked = () => {},
  onEditButtonClicked = () => {},
  onDeleteButtonClicked = () => {},
}) => {
  const clickOutsides = useMemo(() => clickOutside(uniqueClass, onCloseButtonClicked), [])

  useEffect(() => {
    document.addEventListener("click", clickOutsides);
    return () => {
      document.removeEventListener("click", clickOutsides);
    }
  }, [])

  return (
    <div className={`${uniqueClass} ${classes["movie-menu"]}`}>
      <CloseMenuButton isSmall={true} onCloseButtonClicked={onCloseButtonClicked} />
      <div className={classes["movie-menu__button"]} onClick={onEditButtonClicked} >Edit</div>
      <div className={classes["movie-menu__button"]} onClick={onDeleteButtonClicked}>Delete</div>
    </div>
  )
}

export default MovieMenu;
