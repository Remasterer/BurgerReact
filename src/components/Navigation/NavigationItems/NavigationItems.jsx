import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({isAuthenticated}) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/burger">Burger builder</NavigationItem>
    { isAuthenticated
      ?  <NavigationItem link="/orders">Order</NavigationItem>
      : null }

    { !isAuthenticated
      ? <NavigationItem link="/auth">Authentication</NavigationItem>
      :  <NavigationItem link="/logout">Logout</NavigationItem>}
      </ul>
);

export default NavigationItems;
