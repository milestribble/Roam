import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import App from './App';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
  <App store={store} />
, document.querySelector('.container'));
