import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
