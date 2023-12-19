import './index.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { getNamespace } from '@utils/spreadUtil';

import App from './App.jsx';
import store from './store/store.js';

const GC = getNamespace();

GC.Spread.Common.CultureManager.culture("zh-cn");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
