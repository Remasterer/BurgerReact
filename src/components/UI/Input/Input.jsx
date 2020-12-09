import React from 'react';
import classes from './Input.module.css';

const  input = ({elementType,  elementConfig,  value, changed, invalid, shouldValidate, touched}) => {
  let inputElement = null,  validationError = null;
  const inputClasses = [classes.InputElement];

  if(invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }

  if (invalid && touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
  }

  switch (elementType) {
    default:
    case ('input'):
      inputElement = <input
                      className={inputClasses.join(' ')}
                      {...elementConfig}
                      value={value}
                      onChange={changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
                      onChange={changed}/>;
      break;
    case ('select'):
      inputElement = <select
                      className={inputClasses.join(' ')}
                      value={value}
                      onChange={changed}>
                      {elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                      ))}
                    </select>
      break;
  }
  return (
    <div className={classes.Input}>
      { inputElement }
      {validationError}
    </div>
    );
};
export default input;
