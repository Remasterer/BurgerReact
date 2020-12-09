export  default function createFormField(el, elType, elOptions, elValidation = undefined) {
  const formField = {
    elementType: el,
    value: '',
    touched: false,
    validation: {},
    valid: true
  }

  if(elValidation) {
    formField.validation = elValidation;
    formField.valid  = false;
  }

  switch (el) {
    default:
    case 'input':
      formField.elementConfig =  {
        type: elType,
        placeholder: elOptions
      };
      break;
    case 'select':
      formField.elementConfig = {
        options: [...arguments].splice(1).map( (item) => {
          return {
            value: item,
            displayValue: item[0].toUpperCase() + item.slice(1)
          }
        })
      }
      break;
  }



  return formField;
}
