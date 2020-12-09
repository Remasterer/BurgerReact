import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from './ContactData.module.css';
import axios from "../../../axios-orders";
import  Input from '../../../components/UI/Input/Input';
import createFormField  from '../../../helpers/formFIeldsObjectsCreator'


class ContactData extends Component {
  state = {
    orderForm: {
        name: createFormField('input', 'text', 'Your name' , {required: true, minLength: 5}),
        street: createFormField('input', 'text', 'Street',{required: true, minLength: 5}),
        zipCode: createFormField('input', 'text', 'ZIP Code', { minLength: 5, maxLength: 7}),
        country: createFormField('input',  'text','Country',{required: true, minLength: 5}),
        mail: createFormField('input', 'email', 'E-Mail',{required: true, minLength: 5}),
        deliveryMethod: createFormField('select', 'cheapest', 'fastest'),
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = ( event ) => {
    event.preventDefault();
    const formDate = {};
    for (const formElementIdentifier in this.state.orderForm) {
      formDate[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formDate
    }
    this.setState({loading: true})
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  checkValidity = (value, rules)  => {
    let isValid = true;

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid =  value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updateOrderForm = {
      ...this.state.orderForm
    }
    const updateFormElement = {
      ...updateOrderForm[inputIdentifier]
    };
    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
    updateFormElement.touched = true;
    updateOrderForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for (const inputId in updateOrderForm) {
      formIsValid = updateOrderForm[inputId].valid && formIsValid;
    }

    this.setState({orderForm: updateOrderForm, formIsValid })
  }

  render() {
    const formElementsArray = [];
    for (const formKey in this.state.orderForm) {
      formElementsArray.push({
        id: formKey,
        config: this.state.orderForm[formKey]
      })
    }
    let form = (
            <form onSubmit={this.orderHandler}>
              {formElementsArray.map(formElement => (
                <Input
                       key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validation}
                       touched={formElement.config.touched}
                       changed={(event) =>  this.inputChangedHandler(event, formElement.id)}/>
              ))}
              <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
          </form>);
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        { form }
      </div>
    );
  }
}

export default ContactData;
