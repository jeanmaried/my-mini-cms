import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase';
import { withRouter } from 'react-router-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import Routes from './Routes';
import store from './redux/store';
import { Provider } from 'react-redux';
import About from './About';
import Projects from './Projects';
import NotFound from './NotFound';
import Test from './Test';
import Login from './Login';
import './App.css';
import './flex.css';

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: null,
  //     authenticated: false
  //   };
  // }

  // componentDidMount() {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ user });
  //     }
  //   });
  // }

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
