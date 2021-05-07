import React from 'react';
import classes from './CloseMenuButton.module.scss';
import classnames from 'classnames';

interface CloseMenuButtonProps {
  isSmall?: boolean;
  onCloseButtonClicked?: () => void;
}

const CloseMenuButton: React.FC<CloseMenuButtonProps> = ({ isSmall = false, onCloseButtonClicked = () => {} }) => {
  return (
    <div className={classes['close-menu-button__wrapper']}>
      <div
        className={classnames(classes['close-menu-button__button'], {
          [classes['close-menu-button__button--small']]: isSmall,
        })}
        onClick={onCloseButtonClicked}
      ></div>
    </div>
  );
};

export default CloseMenuButton;
