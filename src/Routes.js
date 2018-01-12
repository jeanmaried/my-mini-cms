import React, { Component } from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import Layout from './Layout';
import About from './About';
import Projects from './Projects';
import NotFound from './NotFound';
import Login from './Login';
import Home from './Home';
import { connect } from 'react-redux';
import { getUser } from './redux/modules/items';
import firebase, { auth, provider } from './firebase';

class Routes extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        let emailCheck = user.email.endsWith('@jodalmasso.com');
        if (emailCheck) {
          this.props.dispatch(getUser(user));
        }
      }
    });
  }
  // const user = result.user;
  // let emailCheck = user.email.endsWith('@jodalmasso.com');
  // console.log(emailCheck);
  // if (!emailCheck) {
  //   auth.signOut().then(() => {
  //     this.props.dispatch(getNoAuth());
  //   });
  // } else {
  //   this.props.dispatch(getUser(user));
  // }

  render() {
    let authRoutes = this.props.auth ? (
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/projects" component={Projects} />
      </Switch>
    ) : null;
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={this.props.auth && this.props.user ? Home : Login}
        />
        {authRoutes}}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated,
  user: stateItems.userInfo
});

export default withRouter(connect(mapStateToProps)(Routes));
