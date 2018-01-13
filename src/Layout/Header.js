import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { withRouter } from 'react-router-dom';
import { getNoAuth } from '../redux/modules/items';
import { connect } from 'react-redux';

const styles = {
  header: {
    padding: '20px 15px 20px 15px'
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
    return (
      <header style={styles.header} className="flex">
        <div className="flex justify-between">
          <i className="fa fa-rocket" aria-hidden="true" />
          <h1>JoDalmasso.com</h1>
        </div>
        {this.props.auth ? (
          <div style={styles.button} className="flex justify-end">
            <button onClick={this.logout}>Log Out</button>
          </div>
        ) : null}
      </header>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated
});

export default withRouter(connect(mapStateToProps)(Header));
