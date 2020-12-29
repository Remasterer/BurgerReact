import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'
import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <Link to='/' className={classes.Logo}>
      <img src={ burgerLogo } alt="My burger"/>
    </Link>
  );
};

export default Logo;
