import checkValidity from "./validators";
import {updateObject} from "./utility";

const formChangedHandler = (form, event, inputIdentifier) => {

  const updateFormElement =  updateObject(form[inputIdentifier], {
    value: event.target.value,
    valid: !(typeof checkValidity(event.target.value, form[inputIdentifier].validation) === 'string'),
    errorMessage:  checkValidity(event.target.value, form[inputIdentifier].validation),
    touched: true
  });
  const updateForm = updateObject(form, {
    [inputIdentifier]: updateFormElement
  });


  let formIsValid = true;
  for (const inputId in updateForm) {
    formIsValid = updateForm[inputId].valid && formIsValid;
  }

  return {
    updateForm,
    formIsValid
  };
}

export  default formChangedHandler;
