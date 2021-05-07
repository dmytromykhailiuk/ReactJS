import React from 'react';
import classnames from 'classnames';
import classes from './Loader.module.scss';

const Loader = () => (
  <div className={classes.loader}>
    <div className={classes.loader__text}>Loading...</div>
    <div className={classes['loader__lines-wrapper']}>
      <span className={classnames([classes.loader__line, classes['loader__line--1']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--2']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--3']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--4']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--5']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--6']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--7']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--8']])} />
      <span className={classes.loader__line} />
      <span className={classnames([classes.loader__line, classes['loader__line--10']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--11']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--12']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--13']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--14']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--15']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--16']])} />
      <span className={classnames([classes.loader__line, classes['loader__line--17']])} />
    </div>
  </div>
);

export default Loader;
