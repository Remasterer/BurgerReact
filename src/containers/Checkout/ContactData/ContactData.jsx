import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from './ContactData.module.css';
import axios from "../../../axios-orders";
import  Input from '../../../components/UI/Input/Input';
import createFormField  from '../../../helpers/formFIeldsObjectsCreator'
import { connect } from "react-redux";
import withErrorHandling from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import formChangedHandler from "../../../helpers/formChangeHandler";

class ContactData extends Component {
  state = {
    orderForm: {
        name: createFormField('input', 'text', 'Your name' , {required: true, minLength: { value: 2, message: 'Name should be at least 2 characters'}}),
        street: createFormField('input', 'text', 'Street',{required: true, minLength: 2}),
        zipCode: createFormField('input', 'text', 'ZIP Code', {required: true, minLength: 3, maxLength: 7, isNumeric: true}),
        country: createFormField('input',  'text','Country',{required: true, minLength: 2}),
        mail: createFormField('input', 'email', 'E-Mail',{required: true, minLength: 5, isEmail: true}),
        deliveryMethod: createFormField('select', 'cheapest', 'fastest'),
    },
    formIsValid: false,
  }

  orderHandler = ( event ) => {
    event.preventDefault();
    const formDate = {};
    for (const formElementIdentifier in this.state.orderForm) {
      formDate[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ing,
      price: this.props.price,
      orderData: formDate,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const {updateForm,  formIsValid} = formChangedHandler(this.state.orderForm, event, inputIdentifier);
    this.setState({orderForm: updateForm, formIsValid })
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
                        validationMessage={formElement.config.errorMessage}
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

    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(ContactData, axios));
