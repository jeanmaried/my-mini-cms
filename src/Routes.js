import React, { Component } from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import Layout from './Layout';
import About from './About';
import Projects from './Projects';
import NotFound from './NotFound';
import Test from './Test';
import Login from './Login';
import { connect } from 'react-redux';
import { getUser } from './redux/modules/items';
import firebase, { auth, provider } from './firebase';

class Routes extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (this.props.user) {
        this.props.dispatch(getUser(user));
      }
    });
  }

  render() {
    let authRoutes = this.props.auth ? (
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/projects" component={Projects} />
        <Route component={NotFound} />
      </Switch>
    ) : null;
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={this.props.auth && this.props.user ? Test : Login}
        />
        {authRoutes}}
      </Switch>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated,
  user: stateItems.userInfo
});

export default withRouter(connect(mapStateToProps)(Routes));
