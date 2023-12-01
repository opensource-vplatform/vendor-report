import './index.css';
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
import '@grapecity/spread-sheets-resources-zh';

import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import GC from '@grapecity/spread-sheets';

import App from './App.jsx';
import store from './store/store.js';

GC.Spread.Common.CultureManager.culture("zh-cn");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
