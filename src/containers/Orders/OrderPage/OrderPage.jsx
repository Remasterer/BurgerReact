import React, {Component} from 'react';

import {connect} from "react-redux";
import {fetchOrder} from "../../../store/actions/index";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import axios from "../../../axios-orders";

import classes from './OrderPage.module.css';
import Spinner from "../../../components/UI/Spinner/Spinner";

class OrderPage extends Component {

  componentDidMount() {
    let orderId = this.props.match.params.id;
    this.props.fetchOrderDetails(orderId, this.props.token);
  }

  render() {
    let orderTables = <Spinner />;

    if(Object.keys(this.props.orderDetails).length) {
      orderTables = (
          <table className={classes.orders}>
            <thead>
            <tr>
              <th>Country</th>
              <th>Delivery method</th>
              <th>Mail</th>
              <th>Name</th>
              <th>Street</th>
              <th>Zip code</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              { Object.values(this.props.orderDetails.orderData).map((orderDetail, index) => <td key={index}>{orderDetail}</td>)}
            </tr>
            </tbody>
          </table>
      );
    }
    return (
      <div>
        {orderTables}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orderDetails: state.order.orderDetails,
    loading: state.order.loadingOrder,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderDetails: (orderId, token) => dispatch(fetchOrder(orderId, token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderPage, axios));
