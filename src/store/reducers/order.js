import * as actionTypes from  '../actions/actionsTypes';
import { updateObject} from "../../helpers/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  loaded: false,
  loadingOrder: false,
  orderDetails: {}
}

const purchaseInit = (state) => updateObject(state, {purchased: false});

const purchaseStart = (state) => updateObject(state, {loading: true});

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject( action.orderData, { id: action.id });
  return  updateObject(state,{
    loading: false,
    order: state.orders.concat(newOrder),
    purchased: true
  })
}

const purchaseBurgerFail = (state) => updateObject(state, { loading: false });

const fetchOrdersStart = (state) =>  updateObject(state, { loading: true, loaded: false});

const fetchOrdersSuccess = (state, action) => updateObject(state, {orders: action.orders,  loading:  false, loaded: true});

const fetchOrdersFail = (state) => updateObject(state, { loading: false, loaded: true});

const removeOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: state.orders.filter(order => order.id !== action.orderId)
  })
}

const fetchOrderStart = (state) => updateObject(state, {loadingOrder: true});

const fetchOrderFail = (state) => updateObject(state, {loadingOrder: false});

const fetchOrderSuccess = (state, action) => updateObject(state, { orderDetails: action.order, loadingOrder: false })

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.PURCHASE_INIT): return purchaseInit(state);

    case (actionTypes.PURCHASE_BURGER_START): return  purchaseStart(state);
    case (actionTypes.PURCHASE_BURGER_SUCCESS): return  purchaseBurgerSuccess(state, action);
    case (actionTypes.PURCHASE_BURGER_FAIL): return  purchaseBurgerFail(state);

    case (actionTypes.FETCH_ORDERS_START): return fetchOrdersStart(state);
    case (actionTypes.FETCH_ORDERS_SUCCESS): return  fetchOrdersSuccess(state, action);
    case (actionTypes.FETCH_ORDERS_FAIL): return  fetchOrdersFail(state);

    case (actionTypes.REMOVE_ORDER_SUCCESS): return removeOrderSuccess(state, action);

    case (actionTypes.FETCH_ORDER_START ): return fetchOrderStart(state, action);
    case (actionTypes.FETCH_ORDER_FAIL ): return fetchOrderFail(state, action);
    case (actionTypes.FETCH_ORDER_SUCCESS ): return fetchOrderSuccess(state, action);

    default: return state;
  }
}
export default reducer;
