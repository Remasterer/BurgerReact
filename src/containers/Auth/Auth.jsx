import React, {Component} from 'react';
import createFormField from "../../helpers/formFIeldsObjectsCreator";
import formChangedHandler from "../../helpers/formChangeHandler";
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email:  createFormField('input', 'email', 'Your email' , {required: true, minLength: 5, isEmail: true }),
      password:  createFormField('input', 'password', 'Your password' , {required: true, minLength: 6 }),
    },
    isSignup: true
  }

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const {updateForm,  formIsValid} = formChangedHandler(this.state.controls, event, inputIdentifier);
    this.setState({controls: updateForm, formIsValid })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    })
  }

  render() {
    const formElementsArray = [];

    for (const formKey in this.state.controls) {
      formElementsArray.push({
        id: formKey,
        config: this.state.controls[formKey]
      })
    }

    let form = formElementsArray.map(formElement => (
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
    ))

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
        errorMessage = (
          <p className={classes.ErrorMessage}>{this.props.error.message.split('_').join(' ').toLowerCase()}</p>
        )
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirect} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType='Danger'>Switch to {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirect: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
