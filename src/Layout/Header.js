import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { withRouter } from 'react-router-dom';
import { getNoAuth } from '../redux/modules/items';
import { connect } from 'react-redux';

const styles = {
  header: {
    height: '10vh'
  },

  button: {
    width: '100vw'
  }
};

class Header extends Component {
  logout = () => {
    auth.signOut().then(() => {
      this.props.dispatch(getNoAuth());
    });
    this.props.history.push('/');
  };

  render() {
    console.log(this.props.auth);
    return (
      <header>
        <div className="wrapper">
          {this.props.auth ? (
            <div style={styles.button} className="flex justify-end">
              <button onClick={this.logout}>Log Out</button>
            </div>
          ) : null}
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated
});

export default withRouter(connect(mapStateToProps)(Header));
