import React, { Component } from 'react';
import { Header, View } from './containers';
import { Provider } from 'react-redux';

const App = ({store}) => (
  <Provider store={store}>
      <div className="App">
        <Header />
        <View />
      </div>
  </ Provider>
);

export default App;