import React from 'react';
import classes from "./Banner.module.scss";
import { Logo, Button, SearchIcon } from "shared/components";
import { ButtonTypes, ButtonSize } from "shared/enums";
import classnames from "classnames";

interface BannerProps {
  isMovieInOverviewMode: boolean;
  onCreateMovie: () => void;
  onLogoClicked: () => void;
  onSearchIconClicked: () => void;
}

const Banner: React.FC<BannerProps> = React.memo(({ children, isMovieInOverviewMode, onCreateMovie, onSearchIconClicked, onLogoClicked }) => {
  return (
    <div className={classnames(classes.banner, {[classes["banner--search-mode"]] : !isMovieInOverviewMode})}>
      <div className={classes.banner__image}></div>
      <div
        className={classnames([
          classes.banner__background, 
          {[ classes['banner__background--blured']]: isMovieInOverviewMode }
        ])}
      />
      <div className={classes.banner__content}>
        <div className={classnames(
          classes.banner__header, 
          {[classes["banner__header--search-mode"]] : !isMovieInOverviewMode}
        )}>
          <div className={classes.banner__logo} onClick={onLogoClicked} >
            <Logo />
          </div>
          { isMovieInOverviewMode ? (
            <div className={classes["banner__search-icon"]} onClick={onSearchIconClicked}>
              <SearchIcon />
            </div>
          ) : (
            <Button 
              type={ButtonTypes.SECONDARY} 
              size={ButtonSize.SMALL} 
              onButtonClicked={onCreateMovie} 
            >+ ADD MOVIE</Button>
          )}
        </div>
        { children }
      </div>
    </div>
  )
})

export default Banner;