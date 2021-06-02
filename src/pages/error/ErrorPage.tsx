import { Button, Logo } from 'shared/components';
import React from 'react';
import { ButtonTypes } from 'shared/enums';
import classes from './ErrorPage.module.scss';

interface ErrorPageProps {
  navigateToHome: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ navigateToHome }) => (
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
);

export default ErrorPage;
