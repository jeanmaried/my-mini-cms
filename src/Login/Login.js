import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { withRouter } from 'react-router-dom';
import { getUser } from '../redux/modules/items';
import { connect } from 'react-redux';
import { map } from '@firebase/util';

class Login extends Component {
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

  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.props.dispatch(getUser(user));
    });
  };

  render() {
    return (
      <div className="app">
        {!this.props.auth ? (
          <button onClick={this.login}>Log In</button>
        ) : (
          <h1>Welcome</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated
});

export default withRouter(connect(mapStateToProps)(Login));
