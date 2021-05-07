import React from 'react';
import classnames from 'classnames';
import classes from './CloseMenuButton.module.scss';

interface CloseMenuButtonProps {
  isSmall?: boolean;
  onCloseButtonClicked?: () => void;
}

const CloseMenuButton: React.FC<CloseMenuButtonProps> = ({ isSmall = false, onCloseButtonClicked = () => {} }) => (
  <div className={classes['close-menu-button__wrapper']}>
    <div
      className={classnames(classes['close-menu-button__button'], {
        [classes['close-menu-button__button--small']]: isSmall,
      })}
      onClick={onCloseButtonClicked}
    />
  </div>
);

export default CloseMenuButton;
