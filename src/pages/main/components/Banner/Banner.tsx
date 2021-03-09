import React from 'react';
import classes from "./Banner.module.scss";
import { Logo, Button, SearchIcon } from "shared/components";
import { ButtonTypes, ButtonSize } from "shared/enums";
import { SearchPanel, MovieItemDetails } from "../"
import { Movie } from 'models/movie.model';
import classnames from "classnames";

interface BannerProps {
  movieInOverview: Movie;
  onChangeSearchingValue: (searchingValue: string) => void;
  onCreateMovie: () => void;
  onLogoClicked: () => void;
  onSearchIconClicked: () => void;
}

const Banner: React.FC<BannerProps> = React.memo(({ movieInOverview, onChangeSearchingValue, onCreateMovie, onSearchIconClicked, onLogoClicked }) => {
  return (
    <div className={classnames(classes.banner, {[classes["banner--search-mode"]] : !movieInOverview})}>
      <div className={classes.banner__image}></div>
      <div
        className={classes.banner__background}
        style={{backgroundColor: movieInOverview ? "#000000ee" : "#000000cc"}}
      ></div>
      <div className={classes.banner__content}>
        <div className={classnames(
          classes.banner__header, 
          {[classes["banner__header--search-mode"]] : !movieInOverview}
        )}>
          <div className={classes.banner__logo} onClick={onLogoClicked} >
            <Logo />
          </div>
          { movieInOverview ? (
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
        { movieInOverview ? (
          <MovieItemDetails movie={movieInOverview}/>
        ) : (
          <>
            <h1 className={classes.banner__title}>FIND YOUR MOVIE</h1>
            <SearchPanel onChangeSearchingValue={onChangeSearchingValue} />
          </>
        )}
      </div>
    </div>
  )
})

export default Banner;