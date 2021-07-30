import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import configureStore from './redux/reducers/store';
import { Provider } from 'react-redux';
// import "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

