import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { withRouter } from 'react-router-dom';
import { getNoAuth } from '../redux/modules/items';
import { connect } from 'react-redux';

class Header extends Component {
  logout = () => {
    auth.signOut().then(() => {
      this.props.dispatch(getNoAuth());
    });
  };

  render() {
    return (
      <header>
        <div className="wrapper">
          <h1>Fun Food Friends</h1>
          <button onClick={this.logout}>Log Out</button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems
});

export default withRouter(connect(mapStateToProps)(Header));
