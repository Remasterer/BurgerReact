const checkValidity = (value, rules)  => {
  let isValid = true;

  if(rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if(rules.minLength) {
    if ((value.length >= rules.minLength.value || value.length >= rules.minLength) && isValid) isValid = true
    else return rules.minLength.message || `Your value must be at least ${rules.minLength.value || rules.minLength} long`;
  }

  if(rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (pattern.test(value) && isValid) || rules.isEmail.message || 'Your email is incorrect';
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    return pattern.test(value) && isValid;
  }

  return isValid;
}
export  default  checkValidity;
