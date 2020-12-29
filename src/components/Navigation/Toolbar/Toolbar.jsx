import React from 'react';
import classes from './Toolbar.module.css'
import Logo from "../../Logo/Logo";
import NavigationsItems from "../NavigationItems/NavigationsItems";
import DrawToggle from "./DrawToggler/DrawToggle";

const Toolbar = ({toggleSideDrawer, isAuth}) => (
  <header className={classes.Toolbar}>
    <DrawToggle toggleSideDrawer={toggleSideDrawer}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationsItems isAuthenticated={isAuth} />
    </nav>
  </header>
);

export default Toolbar;
