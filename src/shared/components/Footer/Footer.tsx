import React from 'react';
import { Logo } from '..';
import classes from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={classes.footer}>
    <Logo />
  </footer>
);

export default Footer;
