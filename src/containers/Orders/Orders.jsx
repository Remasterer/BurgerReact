import React, {Component} from 'react';
import axios from "../../axios-orders";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import {Route, Switch, withRouter} from "react-router-dom";

import OrderPage from "./OrderPage/OrderPage";

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders= <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
            <Order
              key={order.id}
              id={order.id}
              ingredients={order.ingredients}
              price={+order.price}
              deleteOrderHandler={this.props.removeOrder.bind(this, order.id, this.props.token)}/>
        ))
    }
    return (
      <div>
        <Switch>
          <Route path='/orders' exact>
            {(orders.length || (!this.props.loaded))? orders :
              <p className="message-global">There is no orders....</p>}
          </Route>
          <Route path={`${this.props.match.path}/:id`} component={OrderPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    loaded: state.order.loaded,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    removeOrder: (orderId, token) => dispatch(actions.removeOrder(orderId, token))
  }
}
export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(Orders, axios)));
