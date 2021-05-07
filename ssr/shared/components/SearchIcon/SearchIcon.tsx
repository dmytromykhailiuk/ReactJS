import React from 'react';
import classes from './SearchIcon.module.scss';

const SearchIcon = () => {
  return (
    <svg className={classes['search-icon']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <path
        className="heroicon-ui"
        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
      />
    </svg>
  );
};

export default SearchIcon;
