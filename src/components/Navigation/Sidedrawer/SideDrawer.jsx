import React,{Fragment} from 'react';
import Logo from "../../Logo/Logo";
import NavigationsItems from "../NavigationItems/NavigationsItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import  classes from './SideDrawer.module.css'

const SideDrawer = ({closed, open, isAuth}) => {
  let attachedClasses = [classes.SideDrawer, classes.CLose];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={open} clicked={closed}/>
      <div className={attachedClasses.join(' ')} onClick={closed}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationsItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
