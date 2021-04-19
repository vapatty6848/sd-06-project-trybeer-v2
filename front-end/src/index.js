import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { debugContextDevtool } from 'react-context-devtool';
import App from './App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const options = {
  debugReducer: true,
  debugContext: true,
  disable: false,
  disableAutoMode: false,
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
debugContextDevtool(container, options);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
