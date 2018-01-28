import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Layout from './Layout';
import Routes from './Routes';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';
import './flex.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <HashRouter>
          <Provider store={store}>
            <Layout>
              <Routes />
            </Layout>
          </Provider>
        </HashRouter>
      </div>
    );
  }
}

export default App;
