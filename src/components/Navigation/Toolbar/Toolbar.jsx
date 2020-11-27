import React from 'react';
import classes from './Toolbar.module.css'
import Logo from "../../Logo/Logo";
import NavigationsItems from "../NavigationItems/NavigationsItems";
import DrawToggle from "./DrawToggler/DrawToggle";
const Toolbar = ({toggleSideDrawer}) => (
  <header className={classes.Toolbar}>
    <DrawToggle toggleSideDrawer={toggleSideDrawer}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationsItems />
    </nav>
  </header>
);

export default Toolbar;
