import React from 'react';
import classes from './MovieMenu.module.scss';
import { CloseMenuButton } from '../../shared/components';
import { useClickOutside } from '../../shared/hooks';

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
      <CloseMenuButton isSmall={true} onCloseButtonClicked={onCloseButtonClicked} />
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
