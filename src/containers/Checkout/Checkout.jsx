import React, {Component} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';

class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace(`/checkout/contact-data`)
  }
  render() {
    let summary = <Redirect to='/' />;
    if(this.props.ing) {
    const purchasedRedirect = this.props.purchased ? <Redirect to="/"></Redirect> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={this.props.ing}
          onCheckoutCancel={this.checkoutCancelHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}/>
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </div>)
  }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(withRouter(Checkout));
