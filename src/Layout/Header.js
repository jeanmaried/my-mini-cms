import React, { Component } from 'react';
import firebase from 'firebase';
import { auth } from '../firebase';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = {
  header: {
    padding: '20px 15px 20px 15px'
  },

  profilePicContainer: {
    width: 40,
    height: 40
  },

  img: {
    borderRadius: '50%',
    maxWidth: '100%'
  }
};

class Header extends Component {
  state = {
    profilePic: ''
  };

  componentDidMount() {
    auth.onAuthStateChanged(userData => {
      if (userData) {
        const user = firebase.auth().currentUser;

        if (user != null) {
          let userInfo = user.providerData[0];
          this.setState({ profilePic: userInfo.photoURL });
        }
      }
    });
  }

  render() {
    const { header, profilePicContainer, img } = styles;
    return (
      <header style={header}>
        {this.props.auth ? (
          <div className="flex direction-row justify-between">
            <div className="flex">
              <i className="fa fa-rocket" aria-hidden="true" />
              <Link to="/">
                <h1>JoDalmasso.com</h1>
              </Link>
            </div>

            <div style={profilePicContainer}>
              <img style={img} src={this.state.profilePic} alt="profile pic" />
            </div>
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
