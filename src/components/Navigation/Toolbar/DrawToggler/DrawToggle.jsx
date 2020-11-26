import React from 'react';

import classes from './DrawerToggle.module.css'

const DrawToggle = ({toggleSideDrawer}) => (
  <div className={classes.DrawerToggle} onClick={toggleSideDrawer}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default DrawToggle;
