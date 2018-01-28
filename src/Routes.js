import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import About from './About';
import Projects from './Projects';
import NotFound from './NotFound';
import Login from './Login';
import Home from './Home';
import ProjectForm from './ProjectForm';
import { connect } from 'react-redux';
import { getUser } from './redux/modules/items';
import { auth } from './firebase';

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

  render() {
    let authRoutes = this.props.auth ? (
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/addproject" component={ProjectForm} />
        <Route exact path="/editproject/:id" component={ProjectForm} />
        <Route component={NotFound} />
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
      </Switch>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated,
  user: stateItems.userInfo
});

export default withRouter(connect(mapStateToProps)(Routes));
