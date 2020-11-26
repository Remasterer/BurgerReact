import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationsItems = () => (
  <ul className={classes.NavigationItems}>
        <NavigationItem
          link="/"
          active={true}>
          Birger builder
        </NavigationItem>
      <NavigationItem
        link="/"
        active={false}>
        Checkout
      </NavigationItem>
  </ul>
);

export default NavigationsItems;
