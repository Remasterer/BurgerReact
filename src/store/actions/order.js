import * as actionTypes from '../actions/actionsTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error))
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    axios.get(`/orders.json${queryParams}`)
      .then(res => {
        const fetchOrders = [];
        for (const key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })
  }
}

export const removeOrderSuccess = (orderId) => {
  return {
    type: actionTypes.REMOVE_ORDER_SUCCESS,
    orderId
  }
}

export const removeOrder = (orderId,  token) => {
  return dispatch => {
    axios.delete(`/orders/${orderId}.json?auth=${token}`)
      .then(log => dispatch(removeOrderSuccess(orderId)))
      .catch(err => {
       throw new Error('Cannot load order ' + err);
      })
  }
}

export const fetchOrderSuccess = (order) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    order
  }
}

export const fetchOrderStart = (orderId) => {
  return {
    type: actionTypes.FETCH_ORDER_START,
    orderId
  }
}

export const fetchOrderFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL
  }
}

export const fetchOrder = (orderId, token) => {
  return dispatch => {
    dispatch(fetchOrderStart);
    axios.get(`/orders/${orderId}.json?auth=${token}`)
      .then(log => dispatch(fetchOrderSuccess(log.data)))
      .catch(err => dispatch(fetchOrderFail))
  }
}

