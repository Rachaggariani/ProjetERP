import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {store} from './ReduxToolkit/store';
import './index.css';

// Set base URL for axios requests
axios.defaults.baseURL = 'http://localhost:5000/api/v1';

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();