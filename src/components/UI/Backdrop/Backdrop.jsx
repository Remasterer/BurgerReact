import React from 'react';
import classes from './Backdrop.module.css';
import PropTypes from 'prop-types';
const Backdrop = ({ show, clicked }) => (
  show ? <div onClick={clicked} className={classes.Backdrop}>  </div> : null
);
Backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func
}
export default Backdrop;
