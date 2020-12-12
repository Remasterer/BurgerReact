import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { Provider } from  'react-redux';
import { createStore } from  'redux';
import ingredientsReducer from "./store/reducers/ingredientsReducer";


const rootStore = createStore(ingredientsReducer);

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
