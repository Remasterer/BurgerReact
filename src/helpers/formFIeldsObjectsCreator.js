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
      const argumentsFromFirst = [...arguments].splice(1)
      formField.value = argumentsFromFirst[0];
      formField.elementConfig = {
        options: argumentsFromFirst.map( (item) => {
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
