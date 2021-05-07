import React from 'react';
import classes from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <div className={classes.logo}>
      netflix
      <span className={classes.logo__roulette}>roulette</span>
    </div>
  );
};

export default Logo;
