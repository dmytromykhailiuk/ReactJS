import React from 'react';
import CloseMenuButton from '../CloseMenuButton/CloseMenuButton';
import { useClickOutside } from '../../hooks';
import classes from './MovieMenu.module.scss';

interface MovieMenuProps {
  uniqueClass: number;
  onCloseButtonClicked: () => void;
  onEditButtonClicked: () => void;
  onDeleteButtonClicked: () => void;
}

const MovieMenu: React.FC<MovieMenuProps> = ({
  uniqueClass,
  onCloseButtonClicked,
  onEditButtonClicked,
  onDeleteButtonClicked,
}) => {
  useClickOutside(String(uniqueClass), onCloseButtonClicked);

  return (
    <div className={`${uniqueClass} ${classes['movie-menu']}`}>
      <CloseMenuButton isSmall onCloseButtonClicked={onCloseButtonClicked} />
      <div className={classes['movie-menu__button']} onClick={onEditButtonClicked}>
        Edit
      </div>
      <div className={classes['movie-menu__button']} onClick={onDeleteButtonClicked}>
        Delete
      </div>
    </div>
  );
};

export default MovieMenu;
