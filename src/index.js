import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'semantic-ui-css/semantic.min.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../node_modules/react-elastic-carousel/dist/index.es'
import configureStore from './redux/reducers/store';
import { Provider } from 'react-redux';
import 'antd-country-phone-input/dist/index.css';
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'
// import 'semantic-ui-css/semantic.min.css'

import 'antd/dist/antd.css';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
   </Provider>, document.getElementById('root')
);

