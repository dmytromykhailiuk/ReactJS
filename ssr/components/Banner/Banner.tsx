import React, { useCallback } from 'react';
import classes from "./Banner.module.scss";
import { Logo, Button, SearchIcon } from "../../shared/components";
import { ButtonTypes, ButtonSize, ModalTypes, RouterPaths } from "../../shared/enums";
import classnames from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import { ModalsAction, Store, MoviesSelector, ModalsSelector, MoviesAction } from '../../store';
import { Movie } from '../../models';
import Router from "next/router";

const bluredStyles = {
  filter: 'blur(7px)',
}

const Banner = React.memo(({ children }) => {
  const dispatch = useDispatch();
  const movieInOverview = useSelector<Store, Movie>(MoviesSelector.movieInOverviewSelector);
  const modalInView = useSelector<Store, ModalTypes>(ModalsSelector.modalInViewSelector);

  const onCreateMovie = useCallback(() => {
    dispatch(ModalsAction.setModalInViewAction({ modalType: ModalTypes.CREATE }));
  }, []);

  const onLogoClicked = useCallback(() => {
    if (Router.pathname !== RouterPaths.HOME) {
      Router.push(RouterPaths.HOME);
      if (Router.query.SearchQuery) {
        dispatch(MoviesAction.loadMoviesAction({ searchingValue: '', hasSearchingValue: true }));
      }
    }
  }, []);

  const onSearchIconClicked = useCallback(() => {
    Router.push(RouterPaths.SEARCH + "?SearchQuery=");
  }, []);

  const contentStyles = modalInView ? bluredStyles: {};

  return (
    <header style={contentStyles}>
      <div className={classnames(classes.banner, {[classes["banner--search-mode"]] : !movieInOverview})}>
        <div className={classes.banner__image}></div>
        <div
          className={classnames([
            classes.banner__background, 
            {[ classes['banner__background--blured']]: movieInOverview }
          ])}
        />
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
          { children }
        </div>
      </div>
    </header>
  )
})

export default Banner;