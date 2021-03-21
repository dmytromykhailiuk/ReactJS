import React from 'react';
import classnames from "classnames";
import classes from "./Loader.module.scss"

const Loader = () => {
  return (
    <div className={classes["loader"]}>
      <div className={classes["loader__text"]}>Loading...</div>
      <span className={classnames([classes["loader__line"], classes["loader__line--1"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--2"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--3"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--4"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--5"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--6"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--7"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--8"]])}></span>
      <span className={classes["loader__line"]}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--10"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--11"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--12"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--13"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--14"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--15"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--16"]])}></span>
      <span className={classnames([classes["loader__line"], classes["loader__line--17"]])}></span>
    </div>
  )
}

export default Loader;
