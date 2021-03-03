import React from 'react';
import classes from "./CloseMenuButton.module.scss";

interface CloseMenuButtonProps {
  isSmall?: boolean;
  onCloseButtonClicked?: () => void;
}

const CloseMenuButton: React.FC<CloseMenuButtonProps> = ({ isSmall = false, onCloseButtonClicked = () => {} }) => {
  return (
    <div className={classes['close-menu-button__wrapper']}>
      <div
        className={`${classes['close-menu-button__button']} ${isSmall ? classes['close-menu-button__button--small'] : ''}`}
        onClick={onCloseButtonClicked}
      ></div>
    </div>
  )
}

export default CloseMenuButton;
