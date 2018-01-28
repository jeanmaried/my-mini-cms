import React, { Component } from 'react';
import { auth, provider } from '../firebase';
import { withRouter } from 'react-router-dom';
import { getUser } from '../redux/modules/items';
import { connect } from 'react-redux';

const styles = {
  loginContainer: {
    width: '100vw',
    height: '90vh'
  }
};

class Login extends Component {
  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      let emailCheck = user.email.endsWith('@jodalmasso.com');
      if (emailCheck) {
        this.props.dispatch(getUser(user));
      }
    });
  };

  render() {
    return (
      <div
        style={styles.loginContainer}
        className="flex direction-column align-items-center justify-center"
      >
        <h1>Welcome to your website's CMS</h1>
        <button onClick={this.login}>Log In</button>
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated
});

export default withRouter(connect(mapStateToProps)(Login));
