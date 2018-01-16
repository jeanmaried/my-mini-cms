import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

const styles = {
  home: {
    width: '100%',
    margin: '20vh'
  },

  profilePicContainer: {
    padding: 50,
    width: 130,
    height: 130
  },

  img: {
    borderRadius: '50%',
    maxWidth: '100%'
  }
};

class Home extends Component {
  constructor() {
    super();

    this.state = {
      profilePic: ''
    };
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;

    if (user != null) {
      let userInfo = user.providerData[0];
      this.setState({ profilePic: userInfo.photoURL });
    }
  }

  render() {
    return (
      <div
        className="flex direction-column align-items-center justify-center"
        style={styles.home}
      >
        <h1 className="text-align">Welcome to your very own CMS</h1>
        <div style={styles.profilePicContainer}>
          <img
            style={styles.img}
            src={this.state.profilePic}
            alt="profile pic"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  toggle: stateItems.toggleNewProject,
  user: stateItems.userInfo
});

export default connect(mapStateToProps)(Home);
