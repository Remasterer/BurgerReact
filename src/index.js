import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { Provider } from  'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from  'redux';
import orderReducer from './store/reducers/order';
import burgerBuilder from "./store/reducers/burgerBuilder";
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilder,
  order: orderReducer,
  auth: authReducer
});

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null )|| compose;

const rootStore = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={rootStore}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
