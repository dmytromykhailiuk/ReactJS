import { Button, Logo } from '../shared/components';
import React, { useCallback, useMemo } from 'react';
import { ButtonTypes, RouterPaths } from '../shared/enums';
import classes from '../styles/pages/ErrorPage.module.scss';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { MoviesAction, MoviesSelector } from '../store';
import { execution } from '../shared/helpers';

const ErrorPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const moviesLoading = useSelector(MoviesSelector.moviesLoadingSelector);

  useMemo(() => {
    if (execution.isClient) {
      if (window.location.pathname !== RouterPaths.ERROR) {
        router.push(RouterPaths.ERROR);
      }
    }
  }, []);

  const navigateToHome = useCallback(() => {
    router.push(RouterPaths.HOME);
    if (moviesLoading) {
      dispatch(MoviesAction.loadMoviesAction({ searchingValue: '', hasSearchingValue: true }));
    }
  }, []);

  return (
    <>
      <div className={classes['error-page']}>
        <h2 className={classes['error-page__title']}>Page Not Found</h2>
        <div className={classes['error-page__error-number']}>404</div>
        <div className={classes['error-page__button']}>
          <Button type={ButtonTypes.SECONDARY} style={{ width: '300px' }} onButtonClicked={navigateToHome}>
            GO BACK TO HOME
          </Button>
        </div>
        <div onClick={navigateToHome} className={classes['error-page__logo']}>
          <Logo />
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
