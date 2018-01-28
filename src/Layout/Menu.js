import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { getNoAuth } from '../redux/modules/items';
import { connect } from 'react-redux';

const styles = {
  menuContainer: {
    minHeight: '100%',
    width: '20vw',
    background: 'red'
  },

  logout: {
    cursor: 'pointer'
  }
};

class Menu extends Component {
  logout = () => {
    auth.signOut().then(() => {
      this.props.dispatch(getNoAuth());
    });
    this.props.history.push('/');
  };
  render() {
    return (
      <nav style={styles.menuContainer}>
        <ul className="menu flex direction-column">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/projects">
            <li>Projects</li>
          </Link>
          {this.props.auth ? (
            <li style={styles.logout} onClick={this.logout} className="flex">
              Log Out
            </li>
          ) : null}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated
});

export default withRouter(connect(mapStateToProps)(Menu));
