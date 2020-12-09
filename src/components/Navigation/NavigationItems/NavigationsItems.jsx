import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationsItems = () => (
  <ul className={classes.NavigationItems}>
        <NavigationItem
          link="/burger">
          Birger builder
        </NavigationItem>
      <NavigationItem
        link="/orders">
        Orders
      </NavigationItem>
  </ul>
);

export default NavigationsItems;
