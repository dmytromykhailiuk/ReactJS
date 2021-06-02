import React from 'react';
import classnames from 'classnames';
import { goUp } from 'shared/helpers';
import classes from './GoUpButton.module.scss';
import { useShowGoUpButton } from '../../hooks';

const GoUpButton: React.FC = () => {
  const showGoUpButton = useShowGoUpButton();

  return (
    <div
      onClick={goUp}
      className={classnames([classes['scroll-btn'], { [classes['scroll-btn--hide']]: !showGoUpButton }])}
    >
      <p>UP</p>
    </div>
  );
};

export default GoUpButton;
