import React, { useCallback } from 'react';
import classes from './Banner.module.scss';
import { Logo, Button, SearchIcon } from '../../shared/components';
import { ButtonTypes, ButtonSize, ModalTypes, RouterPaths } from '../../shared/enums';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ModalsAction, Store, MoviesSelector, ModalsSelector, MoviesAction } from '../../store';
import { Movie } from '../../models';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const bluredStyles = {
  filter: 'blur(7px)',
};

interface BannerProps {
  isFirstRenderOnClient: boolean;
}

const Banner: React.FC<BannerProps> = React.memo(({ children, isFirstRenderOnClient }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const movieInOverview = useSelector<Store, Movie>(MoviesSelector.movieInOverviewSelector);
  const modalInView = useSelector<Store, ModalTypes>(ModalsSelector.modalInViewSelector);

  const onCreateMovie = useCallback(() => {
    dispatch(ModalsAction.setModalInViewAction({ modalType: ModalTypes.CREATE }));
  }, []);

  const onLogoClicked = useCallback(() => {
    if (router.pathname !== RouterPaths.HOME) {
      router.push(RouterPaths.HOME);
      if (router.query.SearchQuery) {
        dispatch(MoviesAction.loadMoviesAction({ searchingValue: '', hasSearchingValue: true }));
      }
    }
  }, []);

  const onSearchIconClicked = useCallback(() => {
    router.push(RouterPaths.SEARCH + '?SearchQuery=');
  }, []);

  useEffect(() => {
    if (!isFirstRenderOnClient && router.pathname !== RouterPaths.FILM && movieInOverview) {
      dispatch(MoviesAction.loadMovieInOverviewSuccessAction(null));
    }
  }, [router.pathname, isFirstRenderOnClient, movieInOverview]);

  const contentStyles = modalInView ? bluredStyles : {};

  return (
    <header style={contentStyles}>
      <div className={classnames(classes.banner, { [classes['banner--search-mode']]: !movieInOverview })}>
        <div className={classes.banner__image}></div>
        <div
          className={classnames([
            classes.banner__background,
            { [classes['banner__background--blured']]: movieInOverview },
          ])}
        />
        <div className={classes.banner__content}>
          <div
            className={classnames(classes.banner__header, {
              [classes['banner__header--search-mode']]: !movieInOverview,
            })}
          >
            <div className={classes.banner__logo} onClick={onLogoClicked}>
              <Logo />
            </div>
            {movieInOverview ? (
              <div className={classes['banner__search-icon']} onClick={onSearchIconClicked}>
                <SearchIcon />
              </div>
            ) : (
              <Button type={ButtonTypes.SECONDARY} size={ButtonSize.SMALL} onButtonClicked={onCreateMovie}>
                + ADD MOVIE
              </Button>
            )}
          </div>
          {children}
        </div>
      </div>
    </header>
  );
});

export default Banner;
